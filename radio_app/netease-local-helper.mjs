#!/usr/bin/env node
import http from "node:http";
import { spawn } from "node:child_process";
import { randomBytes, timingSafeEqual } from "node:crypto";

const publicPort = Number(process.env.PORT || 3000);
const upstreamPort = Number(process.env.NETEASE_UPSTREAM_PORT || 3010);
const upstreamBase = (process.env.NETEASE_UPSTREAM_BASE || `http://127.0.0.1:${upstreamPort}`).replace(/\/$/, "");
const shouldSpawnUpstream = !process.env.NETEASE_UPSTREAM_BASE;
const accessPassword = String(process.env.ECHO_ROOM_PASSWORD || "lumos");
const accessTokenTtlMs = 8 * 60 * 60 * 1000;

let upstreamProcess = null;
let neteaseSessionCookie = "";
const accessTokens = new Map();

if (shouldSpawnUpstream) {
  const npxBin = process.platform === "win32" ? "npx.cmd" : "npx";
  upstreamProcess = spawn(npxBin, ["--yes", "NeteaseCloudMusicApi@latest"], {
    env: { ...process.env, PORT: String(upstreamPort) },
    stdio: ["ignore", "pipe", "pipe"],
  });

  upstreamProcess.stdout.on("data", (chunk) => process.stdout.write(`[netease] ${chunk}`));
  upstreamProcess.stderr.on("data", (chunk) => process.stderr.write(`[netease] ${chunk}`));
  upstreamProcess.on("exit", (code) => {
    if (code !== 0 && code !== null) {
      console.error(`NeteaseCloudMusicApi exited with code ${code}`);
    }
  });
}

const server = http.createServer(async (request, response) => {
  setCorsHeaders(request, response);
  const requestPath = new URL(request.url || "/", "http://127.0.0.1").pathname;

  if (request.method === "OPTIONS") {
    response.writeHead(204);
    response.end();
    return;
  }

  if (requestPath === "/health") {
    response.writeHead(200, { "content-type": "application/json;charset=utf-8" });
    response.end(JSON.stringify({ ok: true, upstreamBase, passwordProtected: true }));
    return;
  }

  if (requestPath === "/echo/auth/unlock") {
    await handleUnlock(request, response);
    return;
  }

  const accessToken = getAccessToken(request);
  if (!isAuthorized(accessToken)) {
    response.writeHead(401, { "content-type": "application/json;charset=utf-8" });
    response.end(JSON.stringify({ code: 401, message: "请先输入私人访问密码解锁" }));
    return;
  }

  if (requestPath === "/echo/auth/logout") {
    accessTokens.delete(accessToken);
    neteaseSessionCookie = "";
    response.writeHead(200, { "content-type": "application/json;charset=utf-8" });
    response.end(JSON.stringify({ ok: true }));
    return;
  }

  try {
    const target = new URL(request.url || "/", upstreamBase);
    target.searchParams.delete("cookie");
    if (neteaseSessionCookie) target.searchParams.set("cookie", neteaseSessionCookie);
    const body = await readRequestBody(request);
    const upstreamResponse = await fetch(target, {
      method: request.method,
      headers: forwardHeaders(request.headers),
      body: body.length && request.method !== "GET" && request.method !== "HEAD" ? body : undefined,
    });
    let upstreamBody = Buffer.from(await upstreamResponse.arrayBuffer());
    const headers = Object.fromEntries(upstreamResponse.headers.entries());
    if (target.pathname === "/login/qr/check") {
      upstreamBody = captureAndSanitizeLoginCookie(upstreamBody);
      delete headers["content-length"];
    }
    delete headers["access-control-allow-origin"];
    delete headers["access-control-allow-credentials"];
    delete headers["access-control-allow-private-network"];
    setCorsHeaders(request, response);
    response.writeHead(upstreamResponse.status, headers);
    response.end(upstreamBody);
  } catch (error) {
    response.writeHead(502, { "content-type": "application/json;charset=utf-8" });
    response.end(JSON.stringify({ code: 502, message: error.message }));
  }
});

server.listen(publicPort, "127.0.0.1", () => {
  console.log(`Echo Room FM NetEase helper is ready: http://127.0.0.1:${publicPort}`);
  console.log("Private access password is enabled. Set ECHO_ROOM_PASSWORD to replace the default.");
  if (shouldSpawnUpstream) {
    console.log(`Proxying to NeteaseCloudMusicApi on http://127.0.0.1:${upstreamPort}`);
  } else {
    console.log(`Proxying to existing upstream: ${upstreamBase}`);
  }
});

function setCorsHeaders(request, response) {
  const origin = request.headers.origin || "*";
  response.setHeader("access-control-allow-origin", origin);
  response.setHeader("access-control-allow-credentials", "true");
  response.setHeader("access-control-allow-methods", "GET,POST,OPTIONS");
  response.setHeader("access-control-allow-headers", "content-type,authorization");
  response.setHeader("access-control-allow-private-network", "true");
  response.setHeader("vary", "origin");
}

function forwardHeaders(headers) {
  const forwarded = { ...headers };
  delete forwarded.host;
  delete forwarded.origin;
  delete forwarded.referer;
  delete forwarded.connection;
  delete forwarded.authorization;
  return forwarded;
}

async function handleUnlock(request, response) {
  if (request.method !== "POST") {
    response.writeHead(405, { "content-type": "application/json;charset=utf-8" });
    response.end(JSON.stringify({ code: 405, message: "Method not allowed" }));
    return;
  }

  try {
    const body = await readRequestBody(request);
    const payload = JSON.parse(body.toString("utf8") || "{}");
    if (!passwordMatches(String(payload.password || ""))) {
      response.writeHead(401, { "content-type": "application/json;charset=utf-8" });
      response.end(JSON.stringify({ code: 401, message: "密码不正确" }));
      return;
    }

    const token = randomBytes(24).toString("base64url");
    const expiresAt = Date.now() + accessTokenTtlMs;
    accessTokens.set(token, expiresAt);
    response.writeHead(200, { "content-type": "application/json;charset=utf-8" });
    response.end(JSON.stringify({ ok: true, token, expiresAt }));
  } catch (error) {
    response.writeHead(400, { "content-type": "application/json;charset=utf-8" });
    response.end(JSON.stringify({ code: 400, message: error.message || "无法读取密码" }));
  }
}

function getAccessToken(request) {
  const authorization = String(request.headers.authorization || "");
  return authorization.startsWith("Bearer ") ? authorization.slice(7).trim() : "";
}

function isAuthorized(token) {
  const expiresAt = accessTokens.get(token);
  if (!expiresAt) return false;
  if (expiresAt <= Date.now()) {
    accessTokens.delete(token);
    return false;
  }
  accessTokens.set(token, Date.now() + accessTokenTtlMs);
  return true;
}

function passwordMatches(candidate) {
  const expected = Buffer.from(accessPassword);
  const actual = Buffer.from(candidate);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

function captureAndSanitizeLoginCookie(body) {
  try {
    const payload = JSON.parse(body.toString("utf8"));
    const code = Number(payload.code || payload.data?.code || 0);
    const cookie = String(payload.cookie || payload.data?.cookie || "");
    if (code === 803 && cookie) neteaseSessionCookie = cookie;
    if (Object.prototype.hasOwnProperty.call(payload, "cookie")) delete payload.cookie;
    if (payload.data && Object.prototype.hasOwnProperty.call(payload.data, "cookie")) delete payload.data.cookie;
    return Buffer.from(JSON.stringify(payload));
  } catch (error) {
    return body;
  }
}

function readRequestBody(request) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    request.on("data", (chunk) => chunks.push(chunk));
    request.on("error", reject);
    request.on("end", () => resolve(Buffer.concat(chunks)));
  });
}

function shutdown() {
  server.close();
  if (upstreamProcess) upstreamProcess.kill("SIGTERM");
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
