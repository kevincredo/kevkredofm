import { getStore } from "@netlify/blobs";
import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
  timingSafeEqual,
} from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import loginQrKey from "NeteaseCloudMusicApi/module/login_qr_key.js";
import loginQrCreate from "NeteaseCloudMusicApi/module/login_qr_create.js";
import loginQrCheck from "NeteaseCloudMusicApi/module/login_qr_check.js";
import loginStatus from "NeteaseCloudMusicApi/module/login_status.js";
import logout from "NeteaseCloudMusicApi/module/logout.js";
import songUrlV1 from "NeteaseCloudMusicApi/module/song_url_v1.js";
import playlistCreate from "NeteaseCloudMusicApi/module/playlist_create.js";
import playlistTracks from "NeteaseCloudMusicApi/module/playlist_tracks.js";
import neteaseUtils from "NeteaseCloudMusicApi/util/index.js";

const { cookieToJson } = neteaseUtils;

const STORE_NAME = "echo-room-netease-sessions";
const SESSION_COOKIE = "echo_ncm_session";
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000;
const MAX_REQUEST_BYTES = 96 * 1024;
const MAX_NETEASE_COOKIE_BYTES = 24 * 1024;
const UNLOCK_WINDOW_MS = 15 * 60 * 1000;
const MAX_UNLOCK_FAILURES = 8;

const BASE_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store, private",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "no-referrer",
};

const ROUTES = new Map([
  ["/login/qr/key", loginQrKey],
  ["/login/qr/create", loginQrCreate],
  ["/login/qr/check", loginQrCheck],
  ["/login/status", loginStatus],
  ["/song/url/v1", songUrlV1],
  ["/playlist/create", playlistCreate],
  ["/playlist/tracks", playlistTracks],
]);

let neteaseRequestPromise = null;

export default async (request, context) => {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: BASE_HEADERS });
  }
  if (request.method !== "POST") {
    return json({ code: 405, message: "Method not allowed" }, 405);
  }

  try {
    const payload = await readPayload(request);
    const route = normalizeRoute(payload.route);

    if (route === "/health") {
      return json({ ok: true, mode: "cloud", passwordProtected: true });
    }
    if (route === "/echo/auth/unlock") {
      return unlock(payload.password, request, context);
    }

    const sessionId = readCookie(request.headers.get("cookie"), SESSION_COOKIE);
    const session = await loadSession(sessionId, context);
    if (!session) {
      return unauthorized("私人会话已过期，请重新输入密码");
    }

    if (route === "/echo/auth/status") {
      return json({
        ok: true,
        unlocked: true,
        loggedIn: Boolean(session.neteaseCookie),
        expiresAt: session.expiresAt,
      });
    }
    if (route === "/echo/auth/logout" || route === "/logout") {
      return clearSession(sessionId, session, context);
    }

    const handler = ROUTES.get(route);
    if (!handler) return json({ code: 404, message: "Unsupported NetEase route" }, 404);

    const params = sanitizeRouteParams(route, payload.params);
    const neteaseCookie = session.neteaseCookie
      ? decryptCookie(session.neteaseCookie, context)
      : "";
    const query = {
      ...params,
      cookie: cookieToJson(neteaseCookie),
      realIP: normalizeIp(context.ip),
    };
    const neteaseRequest = await getNeteaseRequest();
    const result = await handler(query, neteaseRequest);
    const body = normalizeNeteaseBody(result);

    if (route === "/login/qr/check") {
      const loginCookie = extractNeteaseCookie(result, body);
      const code = Number(body?.code || body?.data?.code || 0);
      removeSensitiveCookie(body);
      if (code === 803 && loginCookie) {
        await saveSession(sessionId, {
          ...session,
          neteaseCookie: encryptCookie(loginCookie, context),
          updatedAt: new Date().toISOString(),
        });
      }
    }

    return json(body);
  } catch (error) {
    console.error("Echo Room NetEase function failed", error);
    return json({ code: 502, message: publicErrorMessage(error) }, 502);
  }
};

async function unlock(candidate, request, context) {
  const store = sessionStore();
  const rateKey = unlockRateKey(context.ip);
  const rate = await store.get(rateKey, { type: "json" });
  const now = Date.now();
  if (rate && rate.resetAt > now && rate.failures >= MAX_UNLOCK_FAILURES) {
    return json({ code: 429, message: "尝试次数过多，请稍后再试" }, 429);
  }

  if (!passwordMatches(String(candidate || ""), accessPassword())) {
    const nextRate = rate && rate.resetAt > now
      ? { failures: Number(rate.failures || 0) + 1, resetAt: rate.resetAt }
      : { failures: 1, resetAt: now + UNLOCK_WINDOW_MS };
    await store.setJSON(rateKey, nextRate);
    return unauthorized("密码不正确");
  }

  await store.delete(rateKey);
  const previousId = readCookie(request.headers.get("cookie"), SESSION_COOKIE);
  if (previousId) await store.delete(sessionKey(previousId));

  const sessionId = randomBytes(32).toString("base64url");
  const session = {
    version: 1,
    createdAt: new Date(now).toISOString(),
    updatedAt: new Date(now).toISOString(),
    expiresAt: now + SESSION_TTL_MS,
    neteaseCookie: "",
  };
  await saveSession(sessionId, session);
  return json(
    { ok: true, mode: "cloud", expiresAt: session.expiresAt },
    200,
    { "Set-Cookie": sessionCookieHeader(sessionId, SESSION_TTL_MS) },
  );
}

async function clearSession(sessionId, session, context) {
  if (session?.neteaseCookie) {
    try {
      const neteaseRequest = await getNeteaseRequest();
      await logout({
        cookie: cookieToJson(decryptCookie(session.neteaseCookie, context)),
        realIP: normalizeIp(context.ip),
      }, neteaseRequest);
    } catch (error) {
      console.warn("NetEase logout request failed", error);
    }
  }
  if (sessionId) await sessionStore().delete(sessionKey(sessionId));
  return json(
    { ok: true },
    200,
    { "Set-Cookie": sessionCookieHeader("", 0) },
  );
}

function getNeteaseRequest() {
  if (!neteaseRequestPromise) {
    neteaseRequestPromise = (async () => {
      const temporaryDirectory = tmpdir();
      await mkdir(temporaryDirectory, { recursive: true });
      await writeFile(join(temporaryDirectory, "anonymous_token"), "", { flag: "a" });
      const module = await import("NeteaseCloudMusicApi/util/request.js");
      return module.default;
    })();
  }
  return neteaseRequestPromise;
}

async function loadSession(sessionId, context) {
  if (!validSessionId(sessionId)) return null;
  const stored = await sessionStore().get(sessionKey(sessionId), { type: "json" });
  if (!stored || Number(stored.expiresAt) <= Date.now()) {
    if (stored) await sessionStore().delete(sessionKey(sessionId));
    return null;
  }
  if (stored.neteaseCookie) {
    try {
      decryptCookie(stored.neteaseCookie, context);
    } catch (error) {
      await sessionStore().delete(sessionKey(sessionId));
      return null;
    }
  }
  return stored;
}

function sessionStore() {
  return getStore({ name: STORE_NAME, consistency: "strong" });
}

function saveSession(sessionId, session) {
  return sessionStore().setJSON(sessionKey(sessionId), session);
}

function sessionKey(sessionId) {
  return `sessions/${sha256(sessionId)}.json`;
}

function unlockRateKey(ip) {
  return `unlock-rate/${sha256(normalizeIp(ip) || "unknown")}.json`;
}

function sanitizeRouteParams(route, rawParams) {
  const params = rawParams && typeof rawParams === "object" && !Array.isArray(rawParams)
    ? rawParams
    : {};
  const timestamp = String(params.timestamp || Date.now()).slice(0, 20);

  if (route === "/login/qr/create" || route === "/login/qr/check") {
    const key = String(params.key || "");
    if (!/^[a-zA-Z0-9_-]{8,256}$/.test(key)) throw new Error("Invalid QR key");
    return { key, qrimg: route === "/login/qr/create" ? "true" : undefined, timestamp };
  }
  if (route === "/song/url/v1") {
    const id = String(params.id || "");
    if (!/^\d{1,20}$/.test(id)) throw new Error("Invalid track ID");
    const level = ["standard", "exhigh", "lossless"].includes(params.level)
      ? params.level
      : "exhigh";
    return { id, level, timestamp };
  }
  if (route === "/playlist/create") {
    const name = String(params.name || "").trim().replace(/\s+/g, " ").slice(0, 40);
    if (!name) throw new Error("Playlist name is required");
    return { name, privacy: params.privacy === "10" ? "10" : "0", timestamp };
  }
  if (route === "/playlist/tracks") {
    const pid = String(params.pid || "");
    const tracks = String(params.tracks || "");
    if (!/^\d{1,20}$/.test(pid)) throw new Error("Invalid playlist ID");
    if (!/^\d{1,20}(,\d{1,20}){0,79}$/.test(tracks)) throw new Error("Invalid track list");
    return { pid, tracks, op: params.op === "del" ? "del" : "add", timestamp };
  }
  return { timestamp };
}

async function readPayload(request) {
  const text = await request.text();
  if (text.length > MAX_REQUEST_BYTES) throw new Error("Request is too large");
  if (!text) return {};
  const payload = JSON.parse(text);
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw new Error("Invalid request body");
  }
  return payload;
}

function normalizeRoute(value) {
  const route = String(value || "").trim();
  return route.startsWith("/") ? route : `/${route}`;
}

function normalizeNeteaseBody(result) {
  const body = result?.body ?? result ?? {};
  if (body && typeof body === "object") return structuredClone(body);
  return { code: 200, data: body };
}

function extractNeteaseCookie(result, body) {
  const candidates = [
    body?.cookie,
    body?.data?.cookie,
    Array.isArray(result?.cookie) ? result.cookie.join(";") : result?.cookie,
  ];
  const cookie = String(candidates.find(Boolean) || "");
  if (Buffer.byteLength(cookie, "utf8") > MAX_NETEASE_COOKIE_BYTES) {
    throw new Error("NetEase session cookie is too large");
  }
  return cookie;
}

function removeSensitiveCookie(body) {
  if (!body || typeof body !== "object") return;
  delete body.cookie;
  if (body.data && typeof body.data === "object") delete body.data.cookie;
}

function encryptCookie(value, context) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", sessionEncryptionKey(context), iv);
  const encrypted = Buffer.concat([cipher.update(value, "utf8"), cipher.final()]);
  return {
    iv: iv.toString("base64url"),
    tag: cipher.getAuthTag().toString("base64url"),
    data: encrypted.toString("base64url"),
  };
}

function decryptCookie(envelope, context) {
  if (!envelope?.iv || !envelope?.tag || !envelope?.data) throw new Error("Invalid session data");
  const decipher = createDecipheriv(
    "aes-256-gcm",
    sessionEncryptionKey(context),
    Buffer.from(envelope.iv, "base64url"),
  );
  decipher.setAuthTag(Buffer.from(envelope.tag, "base64url"));
  return Buffer.concat([
    decipher.update(Buffer.from(envelope.data, "base64url")),
    decipher.final(),
  ]).toString("utf8");
}

function sessionEncryptionKey(context) {
  const secret = environmentValue("ECHO_ROOM_SESSION_SECRET")
    || `${accessPassword()}:${context?.site?.id || "local-development"}`;
  return createHash("sha256").update(secret).digest();
}

function accessPassword() {
  return environmentValue("ECHO_ROOM_PASSWORD") || "lumos";
}

function environmentValue(name) {
  return globalThis.Netlify?.env?.get?.(name) || "";
}

function passwordMatches(candidate, expectedValue) {
  const expected = Buffer.from(expectedValue);
  const actual = Buffer.from(candidate);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

function validSessionId(value) {
  return /^[a-zA-Z0-9_-]{40,64}$/.test(String(value || ""));
}

function readCookie(header, name) {
  const match = String(header || "").match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : "";
}

function sessionCookieHeader(value, ttlMs) {
  const maxAge = Math.max(0, Math.floor(ttlMs / 1000));
  return [
    `${SESSION_COOKIE}=${encodeURIComponent(value)}`,
    "Path=/",
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
    `Max-Age=${maxAge}`,
  ].join("; ");
}

function normalizeIp(value) {
  return String(value || "").trim().slice(0, 64);
}

function sha256(value) {
  return createHash("sha256").update(String(value || "")).digest("hex");
}

function publicErrorMessage(error) {
  const message = String(error?.body?.message || error?.message || "网易云接口暂时不可用");
  if (/decrypt|cipher|session data/i.test(message)) return "私人会话已失效，请重新登录";
  return message.slice(0, 180);
}

function unauthorized(message) {
  return json({ code: 401, message }, 401);
}

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...BASE_HEADERS, ...extraHeaders },
  });
}
