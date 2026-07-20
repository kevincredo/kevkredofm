import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const appSource = fs.readFileSync(new URL("./app.js", import.meta.url), "utf8");
const library = JSON.parse(fs.readFileSync(new URL("./library.json", import.meta.url), "utf8"));

function classListStub() {
  return {
    add() {},
    remove() {},
    toggle() {},
    contains() { return false; },
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
    setInterval,
    clearInterval,
    location: { protocol: "https:" },
  },
  setTimeout,
  clearTimeout,
  setInterval,
  clearInterval,
  URL,
  URLSearchParams,
  structuredClone,
};

vm.createContext(context);
vm.runInContext(`${appSource}\n;globalThis.__programTest = {
  state,
  RADIO_PROGRAMS,
  PROGRAM_BLOCKED_GENRES,
  hydrateTrackTaxonomy,
  isFrontendPlayable,
  getProgramList,
  getScheduledProgram,
  getTrackFacetValues,
  programFacetMatches,
  programFacetValueMatches,
  programMatchesTrack,
  programTrackHasBlockedStyle,
};`, context, { filename: "app.js" });

const api = context.__programTest;
api.state.programOverrides = {};
api.state.blockedIds = new Set();
api.state.loudnessGuardEnabled = false;
api.state.energyCeiling = 0.9;
api.state.allTracks = library.tracks.map((track) => api.hydrateTrackTaxonomy(track));
api.state.tracks = api.state.allTracks.filter((track) => api.isFrontendPlayable(track));

const programs = api.getProgramList();
assert.deepEqual(
  Array.from(programs, (program) => program.id),
  ["day_cafe", "cocktail", "after_hours"],
  "the interface must expose exactly the three requested programs"
);

const expectedSchedule = new Map([
  [9, "after_hours"],
  [10, "day_cafe"],
  [17, "day_cafe"],
  [18, "cocktail"],
  [22, "cocktail"],
  [23, "after_hours"],
]);
expectedSchedule.forEach((programId, hour) => {
  const scheduled = api.getScheduledProgram(new Date(2026, 6, 20, hour, 0, 0));
  assert.equal(scheduled?.id, programId, `hour ${hour} must select ${programId}`);
});

const counts = {};
programs.forEach((program) => {
  const matches = api.state.tracks.filter((track) => api.programMatchesTrack(track, program));
  counts[program.id] = matches.length;
  assert.ok(matches.length >= 20, `${program.name} needs a useful playable pool`);

  matches.forEach((track) => {
    assert.equal(api.programTrackHasBlockedStyle(track), false, `${program.name} admitted a blocked style: ${track.name}`);
    const genres = api.getTrackFacetValues(track, "genre");
    assert.equal(
      genres.some((genre) => api.PROGRAM_BLOCKED_GENRES.has(genre)),
      false,
      `${program.name} admitted a blocked genre: ${track.name}`
    );
    const energy = Number(track.energy);
    if (Number.isFinite(energy)) {
      assert.ok(energy >= program.minEnergy, `${program.name} admitted energy below its floor: ${track.name}`);
      assert.ok(energy <= program.maxEnergy, `${program.name} admitted energy above its ceiling: ${track.name}`);
    }
    const facetMatches = api.programFacetMatches(track, program);
    assert.ok(facetMatches.includes("genre"), `${program.name} admitted a track without an allowed genre: ${track.name}`);
    assert.ok(facetMatches.length >= 2, `${program.name} admitted a track without mood/context support: ${track.name}`);
  });
});

const exactGenreTrack = {
  taxonomy: { genre: ["tech_house"], mood: ["groovy"], context: ["lounge"], era: [] },
};
assert.equal(
  api.programFacetValueMatches(exactGenreTrack, "genre", "house"),
  false,
  "program House must not silently expand to Tech House"
);
assert.equal(
  api.programTrackHasBlockedStyle({ artists: ["GRIZ"], taxonomy: { genre: ["nu_disco"] } }),
  true,
  "known dubstep/bass artists must remain blocked when a track is mislabeled"
);

console.log(`Program preset tests passed: ${JSON.stringify(counts)}; exact genres, schedule, energy and blocked-style guards verified.`);
