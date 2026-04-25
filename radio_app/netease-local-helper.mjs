#!/usr/bin/env node
import http from "node:http";
import { spawn } from "node:child_process";

const publicPort = Number(process.env.PORT || 3000);
const upstreamPort = Number(process.env.NETEASE_UPSTREAM_PORT || 3010);
const upstreamBase = (process.env.NETEASE_UPSTREAM_BASE || `http://127.0.0.1:${upstreamPort}`).replace(/\/$/, "");
const shouldSpawnUpstream = !process.env.NETEASE_UPSTREAM_BASE;

let upstreamProcess = null;

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

  if (request.method === "OPTIONS") {
    response.writeHead(204);
    response.end();
    return;
  }

  if (request.url === "/health") {
    response.writeHead(200, { "content-type": "application/json;charset=utf-8" });
    response.end(JSON.stringify({ ok: true, upstreamBase }));
    return;
  }

  try {
    const target = new URL(request.url || "/", upstreamBase);
    const body = await readRequestBody(request);
    const upstreamResponse = await fetch(target, {
      method: request.method,
      headers: forwardHeaders(request.headers),
      body: body.length && request.method !== "GET" && request.method !== "HEAD" ? body : undefined,
    });
    const upstreamBody = Buffer.from(await upstreamResponse.arrayBuffer());
    const headers = Object.fromEntries(upstreamResponse.headers.entries());
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
  console.log(`KevinCredo FM NetEase helper is ready: http://localhost:${publicPort}`);
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
  return forwarded;
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
