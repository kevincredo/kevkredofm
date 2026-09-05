# Echo Room UI and Transition Refactor

Build: `20260905-room-v2`. No catalogue, hidden-track rules, user profiles, or Netlify functions were changed.

## Interface

- Three music views on phone/tablet: selection, now playing, and queue. Desktop keeps all three columns.
- Account, NetEase login/sync/export, and sound preferences have separate accessible native dialogs.
- Persistent compact player; the header is not fixed. Lucide icons are bundled locally with their license.
- Genre combinations and time-of-day programs have separate tabs. Generation is above the tag list so it is reachable without scrolling to its end.
- Existing cloud Loved, saved mixes, exclusions, three safe bar programs, and first-use guidance remain available.
- New presentation/navigation is isolated in `room.css` and `room-ui.js`. Older form styles are isolated in a CSS cascade layer.

## Playback

- The inactive media element preloads the upcoming audio, including anonymous playback. A cached URL alone is not considered preloaded audio.
- Preloaded tracks cannot autoplay. Their position stays at zero until a transition starts.
- The old track remains audible while the new source resolves and buffers. State is committed only after the incoming `play()` succeeds.
- Transition duration follows the selected count of eight beats, bounded by the actual remaining audio. Incompatible tempo/key and two likely vocal tracks shorten the overlap; manual skips use a short fade.
- Tempo adjustment is limited to compatible pairs within 4%, with pitch preservation. Distant tempos are not partially forced to match.
- CORS-authorized media can use Web Audio gain automation. Cross-origin native media is not attached to a graph that would silence it. An opaque successor replaces a previously routed deck with a fresh native element.
- The audio-clock curve is smooth and reserves overlap headroom. Native fallback follows media time, using both media events and a timer, not animation frames alone.
- Backgrounding no longer deliberately completes the fade immediately. Pause, seek, manual skip, failed buffering, and stale async responses cancel or finish one consistent transition.
- Where a native media path ignores volume control, use a sequential handoff instead of overlapping two full-volume tracks.

## Boundaries

This is not a claim of Spotify Automix parity. This catalogue does not have verified full-track downbeats, phrase markers, vocal segmentation, or sample-accurate beat grids. BPM/key metadata can be estimated. The UI no longer describes those estimates as verified alignment. No track is cut to an invented intro cue.

Audio-clock routing depends on the CDN's CORS policy and a running AudioContext. Native fallback cannot guarantee native-app-grade locked-screen crossfades on every iOS/browser version. No real iPhone/Android hardware or fresh paid NetEase account login was available for this verification. Long-running background playback and real FLAC/VIP streams still require device listening tests. Copyright and subscription restrictions are unchanged.

## Verification

Commands:

```
npm run test:audio-recovery
npm run test:programs
npm run test:transitions
npm run build
```

- Recovery: same-song resume, offline waiting, silent-stream watchdog, bounded retries, autoplay rejection.
- Programs: 389 / 347 / 495 candidates, schedule boundaries, exact genres, exclusions and energy rules.
- Transitions: envelopes, duration caps, compatible/incompatible tempo, overlapping playback, background continuation, pause, incoming buffering rollback, cancellation during source resolution, reusing buffers, zero-position preloads, fixed-volume fallback detection.
- Browser-generated local test tones: 48 observations through an actual Web Audio crossfade, minimum RMS 0.02709, final gains approximately 0 and 0.12. This validates the output envelope, not a real-song beat match.
- Live public NetEase source: running active deck and paused, fully buffered standby deck at position 0; manual next/pause checked in browser.
- Responsive checks: desktop 1440 x 960, phone 390 x 844, tablet 768 x 1024. No horizontal overflow in these viewports. Account and sound dialogs are reachable from the now-playing mobile view.

Screenshots and audio check output: `audit/20260905/`. Original source snapshots are in `audit/20260905/source-backup/`.

## References

- [Spotify: transitions between tracks](https://support.spotify.com/is-en/article/tracks-transitions/) distinguishes crossfade from beat-matched Automix on selected playlists.
- [MDN: AudioParam.setValueCurveAtTime](https://developer.mozilla.org/en-US/docs/Web/API/AudioParam/setValueCurveAtTime) documents audio-clock gain envelopes.
- [Web Audio specification: media-element security](https://www.w3.org/TR/webaudio-1.1/#MediaElementAudioSourceNode-security) explains why unauthorized cross-origin media must not be routed into Web Audio.
