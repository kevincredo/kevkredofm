#!/usr/bin/env node
import http from "node:http";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const outDir = path.join(rootDir, "output", "netease_music_archive");
const reportPath = path.join(outDir, "playability_browser_report.json");
const jsonlPath = path.join(outDir, "playability_browser_results.jsonl");
const port = Number(process.env.PORT || 3898);

const results = new Map();
let startedAt = "";
let finishedAt = "";

await mkdir(outDir, { recursive: true });

const server = http.createServer(async (request, response) => {
  setCors(response);
  if (request.method === "OPTIONS") {
    response.writeHead(204);
    response.end();
    return;
  }

  try {
    const url = new URL(request.url || "/", `http://127.0.0.1:${port}`);
    if (request.method === "GET" && (url.pathname === "/" || url.pathname === "/audit")) {
      return sendFile(response, path.join(__dirname, "playability_browser_audit.html"), "text/html;charset=utf-8");
    }
    if (request.method === "GET" && url.pathname === "/library-data.js") {
      return sendFile(response, path.join(__dirname, "library-data.js"), "text/javascript;charset=utf-8");
    }
    if (request.method === "GET" && url.pathname === "/status") {
      return json(response, await makeReport(false));
    }
    if (request.method === "POST" && url.pathname === "/reset") {
      results.clear();
      startedAt = new Date().toISOString();
      finishedAt = "";
      await persist(false);
      return json(response, { ok: true, startedAt });
    }
    if (request.method === "POST" && url.pathname === "/result") {
      const payload = await readJson(request);
      if (payload && payload.id) {
        results.set(String(payload.id), { ...payload, receivedAt: new Date().toISOString() });
        await persist(false);
      }
      return json(response, { ok: true, count: results.size });
    }
    if (request.method === "POST" && url.pathname === "/finish") {
      finishedAt = new Date().toISOString();
      await persist(true);
      return json(response, { ok: true, ...(await makeReport(true)) });
    }
    response.writeHead(404, { "content-type": "application/json;charset=utf-8" });
    response.end(JSON.stringify({ error: "not found" }));
  } catch (error) {
    response.writeHead(500, { "content-type": "application/json;charset=utf-8" });
    response.end(JSON.stringify({ error: error.message }));
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`KevinCredo FM browser playability audit: http://127.0.0.1:${port}/audit?autostart=1`);
  console.log(`Report: ${reportPath}`);
});

async function persist(final) {
  const report = await makeReport(final);
  await writeFile(reportPath, JSON.stringify(report, null, 2), "utf8");
  await writeFile(jsonlPath, report.results.map((item) => JSON.stringify(item)).join("\n") + "\n", "utf8");
}

async function makeReport(final) {
  const rows = Array.from(results.values()).sort((a, b) => Number(a.index) - Number(b.index));
  const byStatus = {};
  const byFee = {};
  for (const row of rows) {
    byStatus[row.status] = (byStatus[row.status] || 0) + 1;
    const fee = String(row.fee ?? "missing");
    byFee[fee] ||= {};
    byFee[fee][row.status] = (byFee[fee][row.status] || 0) + 1;
  }
  const playable = (byStatus.playable_full_probe || 0) + (byStatus.playable_initial_probe || 0);
  const blocked = (byStatus.blocked_audio_error || 0) + (byStatus.blocked_no_metadata || 0) + (byStatus.blocked_tail_error || 0);
  const unknown = rows.length - playable - blocked;
  return {
    generatedAt: new Date().toISOString(),
    startedAt,
    finishedAt,
    final,
    method: "Browser Audio probe. Each track is loaded as an HTMLAudioElement, then the audit attempts metadata load, muted playback, and tail seek where possible. It does not play every song end-to-end in real time.",
    reportPath,
    checked: rows.length,
    summary: { playable, blocked, unknown, byStatus, byFee },
    results: rows,
  };
}

async function sendFile(response, filePath, contentType) {
  const content = await readFile(filePath);
  response.writeHead(200, {
    "content-type": contentType,
    "cache-control": "no-store",
  });
  response.end(content);
}

function json(response, payload) {
  response.writeHead(200, {
    "content-type": "application/json;charset=utf-8",
    "cache-control": "no-store",
  });
  response.end(JSON.stringify(payload));
}

function readJson(request) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    request.on("data", (chunk) => chunks.push(chunk));
    request.on("error", reject);
    request.on("end", () => {
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}"));
      } catch (error) {
        reject(error);
      }
    });
  });
}

function setCors(response) {
  response.setHeader("access-control-allow-origin", "*");
  response.setHeader("access-control-allow-methods", "GET,POST,OPTIONS");
  response.setHeader("access-control-allow-headers", "content-type");
}
