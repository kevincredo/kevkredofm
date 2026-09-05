/* Audio envelopes run on the audio clock when CORS permits Web Audio routing.
   Opaque media keeps the native audio path, never a silent cross-origin graph. */
const EchoTransition = (() => {
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  function gains(progress) {
    const p = clamp(Number(progress) || 0, 0, 1);
    const smooth = p * p * (3 - 2 * p);
    const headroom = 1 - 0.12 * Math.sin(Math.PI * p);
    return [Math.cos(smooth * Math.PI / 2) * headroom, Math.sin(smooth * Math.PI / 2) * headroom];
  }

  function duration({ seconds, remaining, incomingDuration, rate = 1, vocals = false, clash = false, matched = false, manual = false }) {
    let target = Number.isFinite(seconds) ? seconds : 6;
    if (!matched) target = Math.min(target, 6);
    if (vocals || clash) target = Math.min(target, 4);
    if (manual) target = Math.min(target, 1.4);
    if (Number.isFinite(remaining)) target = Math.min(target, Math.max(.08, remaining - .12));
    if (Number.isFinite(incomingDuration)) target = Math.min(target, incomingDuration / rate / 3);
    return clamp(target, .08, 24);
  }

  function waitUntilReady(deck, valid, timeout = 8000) {
    return new Promise((resolve, reject) => {
      let timer;
      let poll;
      const cleanup = () => {
        clearTimeout(timer); clearTimeout(poll);
        ["canplay", "loadeddata", "error"].forEach((type) => deck.removeEventListener(type, check));
      };
      const check = () => {
        clearTimeout(poll);
        if (!valid()) { cleanup(); reject(Object.assign(new Error("Cancelled"), { name: "AbortError" })); }
        else if (deck.error) { cleanup(); reject(new Error("Audio source failed")); }
        else if (deck.readyState >= 3) { cleanup(); resolve(); }
        else poll = setTimeout(check, 100);
      };
      ["canplay", "loadeddata", "error"].forEach((type) => deck.addEventListener(type, check));
      timer = setTimeout(() => { cleanup(); reject(new Error("Audio buffer timeout")); }, timeout);
      check();
    });
  }

  function supportsVolume(deck) {
    const previous = deck.volume;
    try {
      deck.volume = .371;
      const supported = Math.abs(deck.volume - .371) < .001;
      deck.volume = previous;
      return supported;
    } catch { return false; }
  }

  function waitUntilEnded(deck, valid) {
    return new Promise((resolve, reject) => {
      const started = Date.now();
      let lastPosition = deck.currentTime;
      let progressedAt = started;
      const check = () => {
        if (Math.abs(deck.currentTime - lastPosition) > .01) {
          lastPosition = deck.currentTime;
          progressedAt = Date.now();
        }
        if (!valid()) reject(Object.assign(new Error("Cancelled"), { name: "AbortError" }));
        else if (deck.ended) resolve();
        else if (deck.error || Date.now() - progressedAt > 6500 || Date.now() - started > 45000) reject(Object.assign(new Error("Outgoing audio stalled"), { name: "OutgoingStall" }));
        else setTimeout(check, 150);
      };
      check();
    });
  }

  class Output {
    constructor() { this.context = null; this.graphs = new WeakMap(); this.cors = new Map(); }
    unlock() {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!this.context && AudioContext) this.context = new AudioContext();
        return this.context?.resume().catch(() => {});
      } catch { return undefined; }
    }
    async canRoute(url) {
      if (!this.context) return false;
      if (this.cors.has(url)) return this.cors.get(url);
      let allowed = false;
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 1800);
      try {
        const parsed = new URL(url, window.location.href);
        if (["blob:", "data:"].includes(parsed.protocol) || (parsed.origin === window.location.origin && parsed.protocol !== "file:")) allowed = true;
        else {
          const response = await fetch(url, { method: "HEAD", mode: "cors", credentials: "omit", signal: controller.signal });
          allowed = response.ok && response.type !== "opaque";
        }
      } catch { /* Native media can still play without CORS. */ }
      clearTimeout(timer);
      if (this.cors.size > 40) this.cors.delete(this.cors.keys().next().value);
      this.cors.set(url, allowed);
      return allowed;
    }
    has(deck) { return this.graphs.has(deck); }
    attach(deck) {
      if (!this.context || this.has(deck)) return;
      const source = this.context.createMediaElementSource(deck);
      const gain = this.context.createGain();
      gain.gain.value = 0;
      source.connect(gain).connect(this.context.destination);
      deck.volume = 1;
      this.graphs.set(deck, { source, gain });
    }
    disconnect(deck) {
      const graph = this.graphs.get(deck);
      if (graph) { graph.source.disconnect(); graph.gain.disconnect(); this.graphs.delete(deck); }
    }
    set(deck, volume) {
      const value = clamp(Number(volume) || 0, 0, 1);
      const graph = this.graphs.get(deck);
      if (!graph) { deck.volume = value; return; }
      graph.gain.gain.cancelScheduledValues(this.context.currentTime);
      graph.gain.gain.setValueAtTime(value, this.context.currentTime);
    }
    schedule(oldDeck, newDeck, seconds, volume, progress = 0) {
      if (!this.has(oldDeck) || !this.has(newDeck) || this.context.state !== "running") return false;
      const now = this.context.currentTime;
      [oldDeck, newDeck].forEach((deck, index) => {
        const param = this.graphs.get(deck).gain.gain;
        param.cancelScheduledValues(now);
        const curve = Float32Array.from({ length: 129 }, (_, step) => gains(progress + (1 - progress) * step / 128)[index] * volume);
        param.setValueCurveAtTime(curve, now, Math.max(.02, seconds));
      });
      return true;
    }
  }
  return { gains, duration, waitUntilReady, supportsVolume, waitUntilEnded, Output };
})();
