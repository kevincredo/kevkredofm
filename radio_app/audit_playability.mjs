#!/usr/bin/env node
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const libraryPath = path.join(__dirname, "library.json");
const outDir = path.join(rootDir, "output", "netease_music_archive");
const reportPath = path.join(outDir, "playability_probe_report.json");
const jsonlPath = path.join(outDir, "playability_probe_results.jsonl");

const args = parseArgs(process.argv.slice(2));
const timeoutMs = Number(args.timeout || 12000);
const sleepMs = Number(args.sleep || 180);
const maxBytes = Number(args.bytes || 16384);
const limit = args.limit ? Number(args.limit) : null;
const offset = args.offset ? Number(args.offset) : 0;
const probeTail = args.tail !== "false";

const library = JSON.parse(await readFile(libraryPath, "utf8"));
const tracks = library.tracks.slice(offset, limit ? offset + limit : undefined);
const results = [];

await mkdir(outDir, { recursive: true });

for (let index = 0; index < tracks.length; index += 1) {
  const track = tracks[index];
  const result = await probeTrack(track);
  results.push(result);
  await writeProgress(results, index + 1, tracks.length);
  console.log(JSON.stringify({
    checked: index + 1,
    total: tracks.length,
    id: track.id,
    name: track.name,
    status: result.status,
    reason: result.reason,
    httpStatus: result.initial?.httpStatus || null,
  }, null, 0));
  if (sleepMs > 0) await sleep(sleepMs);
}

await writeProgress(results, tracks.length, tracks.length, true);

async function probeTrack(track) {
  const targetUrl = neteaseAudioUrl(track.id);
  const base = {
    id: track.id,
    name: track.name,
    artists: track.artists || [],
    album: track.album || "",
    fee: track.fee,
    targetUrl,
  };

  try {
    const initial = await probeRange(targetUrl, "bytes=0-16383");
    const initialAudio = isReadableAudio(initial);
    const totalBytes = parseTotalBytes(initial);

    let tail = null;
    if (probeTail && initialAudio && totalBytes && totalBytes > maxBytes * 2) {
      const start = Math.max(0, totalBytes - maxBytes);
      tail = await probeRange(targetUrl, `bytes=${start}-${totalBytes - 1}`);
    }

    const tailAudio = tail ? isReadableAudio(tail) : false;
    const status = classify(initial, initialAudio, tail, tailAudio, totalBytes);
    return {
      ...base,
      status,
      reason: explainStatus(status, initial, tail, totalBytes),
      checkedAt: new Date().toISOString(),
      totalBytes,
      initial,
      tail,
    };
  } catch (error) {
    return {
      ...base,
      status: "unknown_probe_error",
      reason: error.message || String(error),
      checkedAt: new Date().toISOString(),
      totalBytes: null,
      initial: null,
      tail: null,
    };
  }
}

async function probeRange(url, range) {
  const response = await fetchWithTimeout(url, {
    method: "GET",
    redirect: "follow",
    headers: {
      "User-Agent": "Mozilla/5.0 KevinCredoFM/1.1 playability-audit",
      "Referer": "https://music.163.com/",
      "Range": range,
      "Accept": "audio/*,*/*;q=0.8",
    },
  });

  const info = {
    httpStatus: response.status,
    ok: response.ok,
    finalUrl: response.url,
    finalHost: safeHost(response.url),
    contentType: response.headers.get("content-type") || "",
    contentLength: response.headers.get("content-length") || "",
    contentRange: response.headers.get("content-range") || "",
    acceptRanges: response.headers.get("accept-ranges") || "",
    bytesRead: 0,
    firstBytesHex: "",
  };

  if (response.body) {
    const reader = response.body.getReader();
    const chunks = [];
    try {
      while (info.bytesRead < maxBytes) {
        const { done, value } = await reader.read();
        if (done || !value) break;
        chunks.push(value);
        info.bytesRead += value.byteLength;
      }
    } finally {
      await reader.cancel().catch(() => {});
    }
    const head = Buffer.concat(chunks.map((chunk) => Buffer.from(chunk))).subarray(0, 16);
    info.firstBytesHex = head.toString("hex");
  }

  return info;
}

async function fetchWithTimeout(url, options) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

function classify(initial, initialAudio, tail, tailAudio, totalBytes) {
  if (!initial.ok) return "blocked_http";
  if (!initialAudio) return "blocked_not_audio";
  if (tail && tailAudio) return "playable_full_probe";
  if (tail && !tailAudio) return "partial_only_tail_failed";
  if (totalBytes && totalBytes > 128000) return "playable_initial_probe";
  return "unknown_short_or_no_length";
}

function explainStatus(status, initial, tail, totalBytes) {
  if (status === "playable_full_probe") return "开头和尾段都能读取，按当前外链方式大概率可完整播放";
  if (status === "playable_initial_probe") return "开头可读取且有正常音频长度，但未能做尾段验证";
  if (status === "blocked_http") return `网易云外链返回 HTTP ${initial.httpStatus}`;
  if (status === "blocked_not_audio") return `返回内容不是音频：${initial.contentType || "unknown"}`;
  if (status === "partial_only_tail_failed") return `开头可播，但尾段读取失败：HTTP ${tail?.httpStatus || "unknown"}`;
  if (status === "unknown_short_or_no_length") return `能读取开头，但缺少可靠总长度或文件过短：${totalBytes || "unknown"} bytes`;
  return status;
}

function isReadableAudio(probe) {
  if (!probe || !probe.ok || probe.bytesRead <= 0) return false;
  const type = probe.contentType.toLowerCase();
  if (type.includes("text/html") || type.includes("application/json")) return false;
  if (type.startsWith("audio/")) return true;
  if (type.includes("application/octet-stream")) return true;
  if (/\.(mp3|m4a|aac|flac)(\?|$)/i.test(probe.finalUrl)) return true;
  if (/music\.126\.net|m7c?\.music\.126\.net|m8c?\.music\.126\.net/i.test(probe.finalHost)) return true;
  const hex = probe.firstBytesHex || "";
  return hex.startsWith("494433") || hex.startsWith("fffb") || hex.startsWith("fff3") || hex.startsWith("fff2");
}

function parseTotalBytes(probe) {
  if (!probe) return null;
  const rangeMatch = String(probe.contentRange || "").match(/\/(\d+)$/);
  if (rangeMatch) return Number(rangeMatch[1]);
  const length = Number(probe.contentLength || 0);
  return Number.isFinite(length) && length > 0 ? length : null;
}

async function writeProgress(results, checked, total, final = false) {
  const summary = summarize(results);
  const payload = {
    generatedAt: new Date().toISOString(),
    final,
    method: "NetEase outer URL range probe: read first audio bytes and, when length is known, tail bytes. Does not download full songs.",
    sourceLibraryGeneratedAt: library.generatedAt,
    libraryTrackCount: library.tracks.length,
    offset,
    checked,
    total,
    summary,
    results,
  };
  await writeFile(reportPath, JSON.stringify(payload, null, 2), "utf8");
  await writeFile(jsonlPath, results.map((item) => JSON.stringify(item)).join("\n") + "\n", "utf8");
}

function summarize(rows) {
  const byStatus = {};
  const byFee = {};
  for (const row of rows) {
    byStatus[row.status] = (byStatus[row.status] || 0) + 1;
    const fee = String(row.fee ?? "missing");
    byFee[fee] ||= {};
    byFee[fee][row.status] = (byFee[fee][row.status] || 0) + 1;
  }
  const playable = (byStatus.playable_full_probe || 0) + (byStatus.playable_initial_probe || 0);
  const blocked = (byStatus.blocked_http || 0) + (byStatus.blocked_not_audio || 0) + (byStatus.partial_only_tail_failed || 0);
  const unknown = rows.length - playable - blocked;
  return {
    checked: rows.length,
    playable,
    blocked,
    unknown,
    byStatus,
    byFee,
  };
}

function neteaseAudioUrl(id) {
  return `https://music.163.com/song/media/outer/url?id=${encodeURIComponent(id)}.mp3`;
}

function safeHost(url) {
  try {
    return new URL(url).host;
  } catch (error) {
    return "";
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseArgs(values) {
  const parsed = {};
  for (let index = 0; index < values.length; index += 1) {
    const value = values[index];
    if (!value.startsWith("--")) continue;
    const [key, inline] = value.slice(2).split("=");
    parsed[key] = inline ?? values[index + 1] ?? "true";
    if (inline === undefined && values[index + 1] && !values[index + 1].startsWith("--")) index += 1;
  }
  return parsed;
}
