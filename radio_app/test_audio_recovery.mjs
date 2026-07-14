import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const appSource = fs.readFileSync(new URL("./app.js", import.meta.url), "utf8");

function classListStub() {
  return {
    add() {},
    remove() {},
    toggle() {},
    contains() { return false; },
  };
}

function elementStub() {
  return {
    hidden: true,
    textContent: "",
    title: "",
    classList: classListStub(),
  };
}

function createDeck(playImplementation = null) {
  const listeners = new Map();
  return {
    dataset: {
      audioTrackId: "42",
      audioSourceKind: "public",
      fallbackAttempted: "true",
    },
    currentTime: 75,
    duration: 240,
    readyState: 4,
    paused: false,
    ended: false,
    error: null,
    volume: 0.78,
    playbackRate: 1,
    defaultPlaybackRate: 1,
    src: "https://example.test/audio.mp3",
    pause() { this.paused = true; },
    load() {},
    play() {
      if (playImplementation) return playImplementation.call(this);
      this.paused = false;
      return Promise.resolve();
    },
    addEventListener(type, listener) { listeners.set(type, listener); },
    removeEventListener(type) { listeners.delete(type); },
    removeAttribute(name) {
      if (name === "src") this.src = "";
    },
  };
}

const context = {
  console: {
    log() {},
    warn() {},
    error() {},
  },
  document: {
    hidden: false,
    addEventListener() {},
    body: { classList: classListStub() },
  },
  navigator: { onLine: true },
  window: {
    setTimeout,
    clearTimeout,
    location: { protocol: "https:" },
  },
  setTimeout,
  clearTimeout,
  URL,
  URLSearchParams,
  structuredClone,
};

vm.createContext(context);
vm.runInContext(`${appSource}\n;globalThis.__audioRecoveryTest = {
  state,
  elements,
  recoverCurrentTrack,
  handleAudioError,
  checkAudioContinuity,
  clearAudioRecovery,
  clearAudioRecoveryTimer,
};`, context, { filename: "app.js" });

const api = context.__audioRecoveryTest;
const track = { id: 42, name: "Recovery Test", artists: ["Echo Room"] };

function configureTestState(deck) {
  api.clearAudioRecovery();
  Object.assign(api.elements, {
    statusLine: elementStub(),
    autoplayGate: elementStub(),
    playPauseBtn: elementStub(),
    miniPlayPauseBtn: elementStub(),
    onAirState: elementStub(),
    audioQualityBadge: elementStub(),
  });
  Object.assign(api.state, {
    current: track,
    currentAudioSource: {
      trackId: "42",
      url: "https://example.test/audio.mp3",
      member: false,
      bitrate: 128000,
      format: "mp3",
      level: "standard",
      trial: false,
    },
    decks: [deck, createDeck()],
    activeDeckIndex: 0,
    shouldBePlaying: true,
    isPlaying: true,
    isMixing: false,
    audioSourceRequestId: 0,
    lastAudioTrackId: "42",
    lastAudioPosition: 75,
    lastAudioProgressAt: Date.now(),
    failedIds: new Set(),
    neteaseHelperUnlocked: false,
    neteaseLoggedIn: false,
  });
  context.navigator.onLine = true;
}

{
  const deck = createDeck();
  configureTestState(deck);
  await api.recoverCurrentTrack(track, "test");
  assert.equal(api.state.current, track, "recovery must keep the current track");
  assert.equal(deck.currentTime, 74, "recovery must resume one second before the interruption");
  assert.equal(api.state.failedIds.has("42"), false, "a recovered track must not be marked failed");
  assert.equal(api.state.isPlaying, true, "successful recovery must restore playing state");
}

{
  const deck = createDeck();
  configureTestState(deck);
  context.navigator.onLine = false;
  api.handleAudioError(track);
  assert.equal(api.state.audioAwaitingOnline, true, "offline interruption must wait for connectivity");
  assert.equal(api.state.audioRecoveryAttempt, 0, "offline waiting must not consume a retry");
  assert.equal(api.state.failedIds.has("42"), false, "offline interruption must not blacklist the track");
  assert.equal(api.state.current, track, "offline interruption must keep the current track");
}

{
  const deck = createDeck();
  configureTestState(deck);
  api.state.lastAudioProgressAt = Date.now() - 12000;
  api.state.audioHealthySince = 0;
  api.checkAudioContinuity();
  assert.notEqual(api.state.audioRecoveryTimer, null, "a silent active deck must trigger the watchdog");
  assert.equal(api.state.current, track, "the watchdog must recover before changing tracks");
  api.clearAudioRecoveryTimer();
}

{
  const networkError = new Error("network reset");
  const deck = createDeck(function rejectPlayback() {
    this.paused = true;
    return Promise.reject(networkError);
  });
  configureTestState(deck);
  await api.recoverCurrentTrack(track, "test");
  api.clearAudioRecoveryTimer();
  assert.equal(api.state.failedIds.has("42"), false, "the first retry must not skip the track");
  await api.recoverCurrentTrack(track, "test");
  api.clearAudioRecoveryTimer();
  assert.equal(api.state.failedIds.has("42"), false, "the second retry must not skip the track");
  await api.recoverCurrentTrack(track, "test");
  assert.equal(api.state.failedIds.has("42"), true, "only three failed retries may skip the track");
  api.clearAudioRecoveryTimer();
}

{
  const autoplayError = new Error("play() requires a user gesture");
  autoplayError.name = "NotAllowedError";
  const deck = createDeck(function rejectAutoplay() {
    this.paused = true;
    return Promise.reject(autoplayError);
  });
  configureTestState(deck);
  await api.recoverCurrentTrack(track, "test");
  assert.equal(api.state.failedIds.has("42"), false, "autoplay policy must not blacklist a track");
  assert.equal(api.elements.autoplayGate.hidden, false, "autoplay policy must expose the resume control");
  api.clearAudioRecoveryTimer();
}

console.log("Audio recovery tests passed: resume, offline wait, watchdog, retry limit, autoplay gate.");
