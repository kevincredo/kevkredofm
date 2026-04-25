import { getStore } from "@netlify/blobs";

const STORE_NAME = "kevincredo-loved";
const USERNAME_PATTERN = /^[a-z0-9_-]{2,24}$/;
const TRACK_ID_PATTERN = /^[a-zA-Z0-9_.:-]{1,80}$/;
const MAX_LOVED_IDS = 10000;

const headers = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default async (request) => {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  try {
    if (request.method === "GET") return handleGet(request);
    if (request.method === "POST") return handlePost(request);
    return json({ error: "Method not allowed" }, 405);
  } catch (error) {
    return json({ error: error.message || "Unexpected server error" }, 500);
  }
};

async function handleGet(request) {
  const url = new URL(request.url);
  const username = normalizeUsername(url.searchParams.get("user"));
  assertUsername(username);

  const store = getStore({ name: STORE_NAME, consistency: "strong" });
  const profile = await store.get(profileKey(username), { type: "json" });
  return json(normalizeProfile(profile, username));
}

async function handlePost(request) {
  const payload = await request.json();
  const username = normalizeUsername(payload.username);
  assertUsername(username);

  const lovedIds = sanitizeLovedIds(payload.lovedIds);
  const profile = {
    username,
    lovedIds,
    updatedAt: new Date().toISOString(),
  };

  const store = getStore({ name: STORE_NAME, consistency: "strong" });
  await store.setJSON(profileKey(username), profile);
  return json(profile);
}

function normalizeProfile(profile, username) {
  if (!profile || typeof profile !== "object") {
    return { username, lovedIds: [], updatedAt: null };
  }
  return {
    username,
    lovedIds: sanitizeLovedIds(profile.lovedIds),
    updatedAt: typeof profile.updatedAt === "string" ? profile.updatedAt : null,
  };
}

function sanitizeLovedIds(ids) {
  if (!Array.isArray(ids)) return [];
  const clean = [];
  const seen = new Set();
  for (const raw of ids) {
    const id = String(raw || "").trim();
    if (!TRACK_ID_PATTERN.test(id) || seen.has(id)) continue;
    seen.add(id);
    clean.push(id);
    if (clean.length >= MAX_LOVED_IDS) break;
  }
  return clean;
}

function normalizeUsername(username) {
  return String(username || "").trim().toLowerCase();
}

function assertUsername(username) {
  if (!USERNAME_PATTERN.test(username)) {
    throw new Error("Invalid username. Use 2-24 lowercase letters, numbers, underscores, or hyphens.");
  }
}

function profileKey(username) {
  return `users/${username}.json`;
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers });
}
