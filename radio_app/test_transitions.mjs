import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const timers = new Map();
let timerId = 0;
const timer = (fn) => { timers.set(++timerId, fn); return timerId; };
const clear = (id) => timers.delete(id);
const element = () => ({ textContent: "", hidden: true, style: {}, setAttribute() {}, classList: { add() {}, remove() {}, toggle() {} } });
function deck(id) {
  const events = new Map();
  return {
    id, dataset: {}, readyState: 4, paused: false, error: null, duration: 240,
    currentTime: 225, playbackRate: 1, volume: .78, src: "https://test.invalid/song.mp3",
    ended: false, loadCount: 0,
    play() { this.paused = false; return Promise.resolve(); },
    pause() { this.paused = true; },
    load() { this.loadCount += 1; },
    removeAttribute(name) { if (name === "src") this.src = ""; },
    addEventListener(name, fn) { if (!events.has(name)) events.set(name, new Set()); events.get(name).add(fn); },
    removeEventListener(name, fn) { events.get(name)?.delete(fn); },
  };
}
const context = vm.createContext({
  console, setTimeout: timer, clearTimeout: clear, URL, URLSearchParams, AbortController, performance,
  document: { hidden: false, addEventListener() {}, body: element() }, navigator: { onLine: true },
  window: { setTimeout: timer, clearTimeout: clear, location: { protocol: "https:", href: "https://test.invalid", origin: "https://test.invalid" } },
});
for (const name of ["transition-engine.js", "app.js"]) vm.runInContext(fs.readFileSync(new URL(name, import.meta.url), "utf8"), context);
vm.runInContext(`
  renderTrack = renderQueue = renderHistory = updateProgress = setAudioQualityBadge = () => {};
  fillQueue = () => {};
  hasPlaybackScope = () => true;
  resolveNeteasePlaybackSource = async (track) => ({ trackId: String(track.id), url: 'https://test.invalid/' + track.id + '.mp3' });
  globalThis.api = { state, elements, crossfadeToTrack, tickMixTransition, cancelMixTransition,
    pauseFromMediaSession, playNext, applyAudioSourceToDeck, prefetchNextNeteaseSource,
    handleVisibilityChange, getMixPlan, shouldStartAutoMix, EchoTransition, audioOutput };
`, context);
const api = context.api;
const a = { id: 1, name: "First", artists: ["A"], estimatedBpm: 120, musicalKey: "8A", taxonomy: { genre: ["house"], mood: [], context: [] } };
const b = { ...a, id: 2, name: "Second", artists: ["B"], estimatedBpm: 122 };
function setup() {
  api.cancelMixTransition();
  timers.clear();
  const decks = [deck("audioDeckA"), deck("audioDeckB")];
  decks[0].dataset.audioTrackId = "1";
  decks[1].paused = true;
  Object.assign(api.state, { decks, current: a, activeDeckIndex: 0, shouldBePlaying: true,
    isPlaying: true, isMixing: false, currentAudioSource: { trackId: "1" }, queue: [],
    history: [], recentIds: [], failedIds: new Set(), blockedIds: new Set(), preloaded: null,
    activeMixTransition: null, audioRecoveryInFlight: false, audioRecoveryTimer: null, masterVolume: .78 });
  for (const key of ["statusLine", "autoplayGate", "playPauseBtn", "miniPlayPauseBtn", "onAirState", "mixText"]) api.elements[key] = element();
  api.elements.mixToggle = { checked: true };
  api.elements.crossfadeSlider = { value: 2 };
  return decks;
}

assert.equal(api.EchoTransition.gains(0)[0], 1);
assert.equal(api.EchoTransition.gains(1)[1], 1);
for (let p = 0; p <= 1; p += .01) {
  const gains = api.EchoTransition.gains(p);
  assert(gains.every((x) => Number.isFinite(x) && x >= 0 && x <= 1));
  assert(gains[0] ** 2 + gains[1] ** 2 <= 1.000001, "envelope must reserve headroom");
}
assert(api.EchoTransition.duration({ seconds: 12, remaining: 2 }) < 2);
assert(api.EchoTransition.duration({ seconds: 12, vocals: true, matched: true }) <= 4);
assert(api.EchoTransition.duration({ seconds: 12, clash: true, matched: true }) <= 4);
assert(api.EchoTransition.duration({ seconds: 12, manual: true }) <= 1.4);
assert.equal(api.EchoTransition.supportsVolume({ get volume() { return 1; }, set volume(_) {} }), false, "iOS fixed-volume paths must use a non-overlapping handoff");

setup();
assert.equal(api.getMixPlan(a, { ...b, estimatedBpm: 100 }).playbackRate, 1, "incompatible tempo must not be partially forced");
assert(Math.abs(api.getMixPlan(a, b).playbackRate - 120 / 122) < .001);
assert(!api.getMixPlan(a, b).gridLabel.includes("estimated phrase grid"), "no claim of detected beats");

{
  const [old, incoming] = setup();
  await api.crossfadeToTrack(b, 2);
  assert.equal(api.state.isMixing, true);
  assert.equal(old.paused, false, "old audio stays alive while incoming loads");
  assert.equal(incoming.volume, 0, "incoming begins at zero gain");
  const t = api.state.activeMixTransition;
  incoming.currentTime = t.duration * incoming.playbackRate * .5;
  api.tickMixTransition();
  assert(old.volume > 0 && incoming.volume > 0, "both streams overlap");
  context.document.hidden = true;
  api.handleVisibilityChange();
  assert.equal(api.state.isMixing, true, "backgrounding must not hard-cut the fade");
  incoming.currentTime = t.duration * incoming.playbackRate + .1;
  api.tickMixTransition();
  assert.equal(api.state.activeDeckIndex, 1);
  assert.equal(old.paused, true);
  assert.equal(incoming.volume, .78);
  assert.equal(api.state.current, b);
  context.document.hidden = false;
}
{
  const [old, incoming] = setup();
  await api.crossfadeToTrack(b, 2);
  api.pauseFromMediaSession();
  api.tickMixTransition();
  assert(old.paused && incoming.paused);
  assert.equal(api.state.shouldBePlaying, false, "fade callbacks must never override pause");
  assert.equal(api.state.activeMixTransition, null);
}
{
  const [old, incoming] = setup();
  await api.crossfadeToTrack(b, 2);
  incoming.readyState = 2;
  api.tickMixTransition();
  assert.equal(api.state.current, a, "buffer failure rolls back to the audible song");
  assert.equal(old.volume, .78);
  assert.equal(incoming.paused, true);
  assert.equal(api.state.queue[0], b);
}
{
  const [old, incoming] = setup();
  let resolveSource;
  context.pendingSource = new Promise((resolve) => { resolveSource = resolve; });
  vm.runInContext("resolveNeteasePlaybackSource = () => pendingSource", context);
  const request = api.crossfadeToTrack(b, 2);
  api.pauseFromMediaSession();
  resolveSource({ trackId: "2", url: "https://test.invalid/2.mp3" });
  await request;
  assert(old.paused && incoming.paused);
  assert.equal(api.state.current, a, "a late source response must not resurrect a cancelled transition");
  vm.runInContext("resolveNeteasePlaybackSource = async track => ({ trackId: String(track.id), url: 'https://test.invalid/' + track.id + '.mp3' })", context);
}
{
  const [, incoming] = setup();
  api.state.queue = [b];
  api.prefetchNextNeteaseSource();
  await api.state.preloaded.promise;
  assert.equal(incoming.autoplay, false);
  assert.equal(incoming.paused, true);
  assert.equal(incoming.currentTime, 0, "preloading must not consume the song intro");
  const loads = incoming.loadCount;
  api.state.queue = [];
  await api.crossfadeToTrack(b, 2);
  assert.equal(incoming.loadCount, loads, "prefetched media must be reused without load() resetting its buffer");
}
api.cancelMixTransition();
timers.clear();
console.log("Transition tests passed: envelope, tempo limits, adaptive duration, overlap, background, pause, buffering rollback, stale requests, preloading.");
