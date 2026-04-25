const STYLE_LABELS = {
  chill_downtempo: "Chill / Downtempo",
  house: "House",
  disco_nu_disco: "Disco / Nu-disco",
  edm: "EDM",
  rock: "Rock",
  deep_house: "Deep House",
  retro_synth: "Retro / Synth",
  holiday: "Holiday / Event",
  afro_melodic: "Afro / Melodic",
  progressive_house: "Progressive",
  minimal: "Minimal",
  melodic_house: "Melodic House",
  afro_house: "Afro House",
  indie_dance: "Indie Dance",
  techno: "Techno",
  electronic: "Electronic",
  indie_rock: "Indie Rock",
  pop: "Pop",
  rnb_soul: "R&B / Soul",
  jazz: "Jazz",
  funk: "Funk",
  ambient: "Ambient",
  lofi: "Lo-fi",
  classical: "Classical",
  world_latin: "World / Latin",
  acid_techno: "Acid / Techno",
  hiphop_jazzhop: "Hip-hop / Jazz-hop",
  tech_house: "Tech House",
};

const QUEUE_TARGET = 18;
const LOVED_STORAGE_KEY = "kevincredo-fm-loved-track-ids";
const PROFILE_USERNAME_STORAGE_KEY = "kevincredo-fm-profile-username";
const SYNC_PROXY_STORAGE_KEY = "kevincredo-fm-sync-proxy";
const NETEASE_ORIGIN = "https://music.163.com";
const CLOUD_LOVED_ENDPOINT = "/.netlify/functions/loved";
const USERNAME_PATTERN = /^[a-z0-9_-]{2,24}$/;
const CLOUD_SAVE_DEBOUNCE_MS = 650;

const elements = {};
const state = {
  tracks: [],
  filters: [],
  selectedTags: new Set(),
  lovedIds: new Set(),
  lovedOnly: false,
  profileUsername: "",
  profileSaving: false,
  profileSaveTimer: null,
  libraryMeta: null,
  syncUserId: "",
  syncing: false,
  queue: [],
  history: [],
  current: null,
  previous: null,
  decks: [],
  activeDeckIndex: 0,
  isPlaying: false,
  isMixing: false,
  userStarted: false,
  failedIds: new Set(),
  recentIds: [],
  styleLabels: { ...STYLE_LABELS },
  masterVolume: 0.78,
};

document.addEventListener("DOMContentLoaded", init);

async function init() {
  bindElements();
  wireEvents();
  setStatus("正在读取 3826 首基准曲库");

  try {
    const library = await loadLibrary();
    state.libraryMeta = library;
    state.styleLabels = { ...STYLE_LABELS, ...(library.styleLabels || {}) };
    state.tracks = library.tracks || [];
    state.lovedIds = loadLovedIds();
    state.profileUsername = window.localStorage.getItem(PROFILE_USERNAME_STORAGE_KEY) || "";
    if (state.profileUsername) {
      elements.profileUsernameInput.value = state.profileUsername;
    }
    state.syncUserId = String(library.scope?.user_id || "");
    elements.syncUserIdInput.value = state.syncUserId;
    elements.syncProxyInput.value = window.localStorage.getItem(SYNC_PROXY_STORAGE_KEY) || "";
    elements.libraryCount.textContent = `${library.trackCount || state.tracks.length} tracks from your archive`;
    elements.statTracks.textContent = String(state.tracks.length);
    buildFilters(library);
    fillQueue(true);
    renderAll();
    if (state.profileUsername) {
      activateProfile(state.profileUsername, { restore: true });
    }
    setStatus("电台已就绪");
    window.setTimeout(() => playNext({ automatic: true, reason: "startup" }), 350);
  } catch (error) {
    setStatus("曲库加载失败");
    elements.trackTitle.textContent = "曲库没有加载成功";
    elements.trackArtist.textContent = error.message;
  }
}

async function loadLibrary() {
  if (window.RADIO_LIBRARY) return window.RADIO_LIBRARY;
  const response = await fetch("./library.json", { cache: "no-store" });
  if (!response.ok) throw new Error(`Library load failed: ${response.status}`);
  return response.json();
}

function bindElements() {
  [
    "libraryCount",
    "onAirState",
    "statusLine",
    "openNeteaseBtn",
    "reloadBtn",
    "styleFilters",
    "channelName",
    "selectedStylesSummary",
    "generateMixBtn",
    "clearMixBtn",
    "profileStatus",
    "profileUsernameInput",
    "profileLoginBtn",
    "profileLocalBtn",
    "profileHelp",
    "syncPanel",
    "syncSummaryText",
    "syncUserIdInput",
    "syncProxyInput",
    "syncNeteaseBtn",
    "syncStatus",
    "loveCurrentBtn",
    "statTracks",
    "statQueue",
    "mixToggle",
    "crossfadeSlider",
    "crossfadeValue",
    "volumeSlider",
    "coverArt",
    "albumStage",
    "trackMode",
    "trackTitle",
    "trackArtist",
    "trackAlbum",
    "genreTags",
    "mixText",
    "elapsedTime",
    "durationTime",
    "progressTrack",
    "progressBar",
    "prevBtn",
    "playPauseBtn",
    "nextBtn",
    "queueList",
    "lovedSection",
    "lovedCount",
    "lovedOnlyBtn",
    "lovedList",
    "historyList",
    "autoplayGate",
    "gatePlayBtn",
    "audioDeckA",
    "audioDeckB",
    "backdrop",
  ].forEach((id) => {
    elements[id] = document.getElementById(id);
  });

  state.decks = [elements.audioDeckA, elements.audioDeckB];
}

function wireEvents() {
  document.querySelectorAll("[data-action='next']").forEach((button) => {
    button.addEventListener("click", () => playNext({ user: true, reason: "skip", force: true }));
  });
  elements.prevBtn.addEventListener("click", playPrevious);
  elements.playPauseBtn.addEventListener("click", togglePlayPause);
  elements.gatePlayBtn.addEventListener("click", startFromGate);
  elements.generateMixBtn.addEventListener("click", generateStyleSequence);
  elements.clearMixBtn.addEventListener("click", clearStyleMix);
  elements.profileLoginBtn.addEventListener("click", () => activateProfile(elements.profileUsernameInput.value));
  elements.profileUsernameInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") activateProfile(elements.profileUsernameInput.value);
  });
  elements.profileLocalBtn.addEventListener("click", useLocalProfile);
  elements.syncNeteaseBtn.addEventListener("click", syncNeteaseLibrary);
  elements.syncProxyInput.addEventListener("change", () => {
    window.localStorage.setItem(SYNC_PROXY_STORAGE_KEY, elements.syncProxyInput.value.trim());
  });
  elements.loveCurrentBtn.addEventListener("click", toggleLoveCurrent);
  elements.lovedOnlyBtn.addEventListener("click", toggleLovedOnly);
  elements.reloadBtn.addEventListener("click", () => {
    fillQueue(true);
    renderAll();
    setStatus("播放序列已按当前曲风组合重新生成");
  });
  elements.openNeteaseBtn.addEventListener("click", openCurrentInNetease);
  elements.mixToggle.addEventListener("change", () => {
    setStatus(elements.mixToggle.checked ? "DJ 平滑接歌已开启" : "DJ 平滑接歌已关闭");
    updateMixText(state.current, state.queue[0]);
  });
  elements.crossfadeSlider.addEventListener("input", () => {
    elements.crossfadeValue.textContent = `${getCrossfadeSeconds()}s`;
    updateMixText(state.current, state.queue[0]);
  });
  elements.volumeSlider.addEventListener("input", () => {
    state.masterVolume = Number(elements.volumeSlider.value);
    if (!state.isMixing) {
      getActiveDeck().volume = state.masterVolume;
      getInactiveDeck().volume = 0;
    }
  });
  elements.progressTrack.addEventListener("click", seekAudio);
  elements.coverArt.addEventListener("error", () => {
    elements.albumStage.classList.add("no-cover");
    elements.coverArt.removeAttribute("src");
  });

  state.decks.forEach((deck, index) => {
    deck.volume = index === state.activeDeckIndex ? state.masterVolume : 0;
    deck.addEventListener("play", () => {
      if (index === state.activeDeckIndex) setPlaying(true);
    });
    deck.addEventListener("pause", () => {
      if (index === state.activeDeckIndex && !state.isMixing) setPlaying(false);
    });
    deck.addEventListener("timeupdate", () => {
      if (index !== state.activeDeckIndex) return;
      updateProgress();
      maybeAutoMix();
    });
    deck.addEventListener("loadedmetadata", () => {
      if (index === state.activeDeckIndex) updateProgress();
    });
    deck.addEventListener("ended", () => {
      if (index === state.activeDeckIndex && !state.isMixing) {
        playNext({ automatic: true, reason: "ended" });
      }
    });
    deck.addEventListener("error", () => {
      if (index === state.activeDeckIndex && state.current) {
        handleAudioError(state.current);
      }
    });
  });
}

function buildFilters(library) {
  const styleCounts = new Map();
  state.tracks.forEach((track) => {
    (track.styleTags || []).forEach((tag) => {
      styleCounts.set(tag, (styleCounts.get(tag) || 0) + 1);
    });
  });

  const archiveOrder = (library.styleStats || []).map(([tag]) => tag);
  const orderedTags = [...new Set([...archiveOrder, ...styleCounts.keys()])]
    .filter((tag) => styleCounts.has(tag))
    .sort((a, b) => {
      const ai = archiveOrder.indexOf(a);
      const bi = archiveOrder.indexOf(b);
      if (ai === -1 && bi === -1) return styleCounts.get(b) - styleCounts.get(a);
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    });

  state.filters = orderedTags.map((tag) => ({
    key: tag,
    label: state.styleLabels[tag] || titleCase(tag),
    count: styleCounts.get(tag),
  }));
  if (!state.selectedTags.size && state.filters[0]) {
    state.selectedTags.add(state.filters[0].key);
  }

  elements.styleFilters.innerHTML = "";
  state.filters.forEach((filter) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "filter-chip";
    button.dataset.filter = filter.key;
    button.setAttribute("aria-pressed", "false");
    button.innerHTML = `<span>${escapeHtml(filter.label)}</span><span>${filter.count}</span>`;
    button.addEventListener("click", () => toggleStyleFilter(filter.key));
    elements.styleFilters.appendChild(button);
  });
  syncFilterButtons();
}

function toggleStyleFilter(key) {
  if (state.selectedTags.has(key)) {
    state.selectedTags.delete(key);
  } else {
    state.selectedTags.add(key);
  }
  state.failedIds.clear();
  fillQueue(true);
  renderAll();
  setStatus(`已选择 ${getMixLabel()}`);
}

function clearStyleMix() {
  state.selectedTags.clear();
  state.failedIds.clear();
  fillQueue(true);
  renderAll();
  setStatus("已清空曲风选择，使用完整曲库");
}

function generateStyleSequence() {
  state.failedIds.clear();
  fillQueue(true);
  renderAll();
  setStatus(`已按 ${getMixLabel()} 生成播放序列`);
  playNext({ user: true, reason: "style-sequence", force: true });
}

async function syncNeteaseLibrary() {
  if (state.syncing) return;
  const uid = elements.syncUserIdInput.value.trim() || state.syncUserId;
  if (!uid) {
    setSyncStatus("缺少网易云用户 ID，无法同步。");
    return;
  }

  state.syncing = true;
  elements.syncPanel.open = true;
  elements.syncNeteaseBtn.disabled = true;
  elements.syncNeteaseBtn.textContent = "同步中";
  setSyncStatus("正在读取网易云歌单列表...");

  try {
    state.syncUserId = uid;
    window.localStorage.setItem(SYNC_PROXY_STORAGE_KEY, elements.syncProxyInput.value.trim());
    const playlistResponse = await requestNeteaseJson(`/user/playlist?uid=${encodeURIComponent(uid)}&limit=1000&offset=0`);
    const playlists = normalizePlaylistList(playlistResponse, uid);
    const ownedPlaylists = playlists.filter((playlist) => isOwnedPlaylist(playlist, uid));

    if (!ownedPlaylists.length) {
      throw new Error("没有读取到公开的创建歌单或我喜欢的音乐");
    }

    let seenTracks = 0;
    let newTracks = 0;
    let updatedTracks = 0;
    for (let index = 0; index < ownedPlaylists.length; index += 1) {
      const playlist = ownedPlaylists[index];
      setSyncStatus(`正在同步 ${index + 1}/${ownedPlaylists.length}: ${playlist.name}`);
      const tracks = await fetchPlaylistTracks(playlist);
      const merged = mergeSyncedTracks(tracks, playlist);
      seenTracks += merged.seenTracks;
      newTracks += merged.newTracks;
      updatedTracks += merged.updatedTracks;
    }

    rebuildFiltersAfterSync();
    updateLibraryCount();
    renderAll();
    setSyncStatus(`同步完成：${ownedPlaylists.length} 个歌单，读取 ${seenTracks} 首，新增 ${newTracks} 首，更新 ${updatedTracks} 首。`);
    setStatus("网易云歌单同步完成，当前队列保持不变");
  } catch (error) {
    const hint = getSyncProxyBase()
      ? "请检查同步线路是否可用。"
      : "浏览器可能拦截了网易云跨域请求；可部署或填写一个网易云同步 API 线路后再试。";
    setSyncStatus(`同步失败：${error.message}。${hint}`);
    setStatus("网易云同步失败");
  } finally {
    state.syncing = false;
    elements.syncNeteaseBtn.disabled = false;
    elements.syncNeteaseBtn.textContent = "同步歌单";
  }
}

async function fetchPlaylistTracks(playlist) {
  const id = encodeURIComponent(playlist.id);
  if (getSyncProxyBase()) {
    try {
      const fullResponse = await requestNeteaseJson(`/playlist/track/all?id=${id}&limit=1000&offset=0`);
      const fullTracks = normalizeTrackList(fullResponse);
      if (fullTracks.length) return fullTracks;
    } catch (error) {
      // Fall back to playlist detail below. Some self-hosted APIs disable track/all.
    }
  }

  const detailResponse = await requestNeteaseJson(`/playlist/detail?id=${id}`);
  return normalizeTrackList(detailResponse);
}

async function requestNeteaseJson(route) {
  const proxyBase = getSyncProxyBase();
  if (proxyBase) {
    return fetchJson(`${proxyBase}${route}`);
  }

  const directPath = route.startsWith("/playlist/detail")
    ? `/api/v6${route}`
    : `/api${route}`;
  const directUrl = `${NETEASE_ORIGIN}${directPath}`;
  try {
    return await fetchJson(directUrl);
  } catch (fetchError) {
    try {
      return await fetchJsonp(directUrl);
    } catch (jsonpError) {
      throw new Error("无法直接读取网易云公开接口");
    }
  }
}

async function fetchJson(url) {
  const response = await fetch(url, { cache: "no-store", credentials: "omit" });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

function fetchJsonp(url) {
  return new Promise((resolve, reject) => {
    const callbackName = `kcNeteaseSync${Date.now()}${Math.floor(Math.random() * 10000)}`;
    const script = document.createElement("script");
    const separator = url.includes("?") ? "&" : "?";
    const timeout = window.setTimeout(() => {
      cleanup();
      reject(new Error("JSONP timeout"));
    }, 12000);

    function cleanup() {
      window.clearTimeout(timeout);
      delete window[callbackName];
      script.remove();
    }

    window[callbackName] = (payload) => {
      cleanup();
      resolve(payload);
    };
    script.onerror = () => {
      cleanup();
      reject(new Error("JSONP failed"));
    };
    script.src = `${url}${separator}callback=${callbackName}`;
    document.head.appendChild(script);
  });
}

function normalizePlaylistList(response, uid) {
  const rawPlaylists = response.playlist || response.playlists || response.data?.playlist || [];
  return rawPlaylists.map((playlist) => ({
    id: String(playlist.id || ""),
    name: playlist.name || "Untitled Playlist",
    userId: String(playlist.userId || playlist.creator?.userId || ""),
    subscribed: Boolean(playlist.subscribed),
    specialType: Number(playlist.specialType || 0),
    trackCount: Number(playlist.trackCount || 0),
    isLikedMusic: Number(playlist.specialType || 0) === 5 || /喜欢的音乐|liked music/i.test(playlist.name || ""),
  })).filter((playlist) => playlist.id && (playlist.userId === String(uid) || playlist.isLikedMusic));
}

function isOwnedPlaylist(playlist, uid) {
  if (playlist.isLikedMusic) return playlist.userId === String(uid);
  return playlist.userId === String(uid) && !playlist.subscribed;
}

function normalizeTrackList(response) {
  const tracks = response.songs
    || response.playlist?.tracks
    || response.data?.songs
    || response.data?.playlist?.tracks
    || [];
  return tracks.filter((track) => track && track.id && track.name);
}

function mergeSyncedTracks(tracks, playlist) {
  const trackMap = new Map(state.tracks.map((track) => [trackId(track), track]));
  let seenTracks = 0;
  let newTracks = 0;
  let updatedTracks = 0;

  tracks.forEach((song) => {
    const id = String(song.id || "");
    if (!id) return;
    seenTracks += 1;
    const existing = trackMap.get(id);
    if (existing) {
      mergePlaylistMembership(existing, playlist);
      updatedTracks += 1;
      return;
    }

    const track = normalizeSyncedTrack(song, playlist);
    state.tracks.push(track);
    trackMap.set(id, track);
    newTracks += 1;
  });

  return { seenTracks, newTracks, updatedTracks };
}

function mergePlaylistMembership(track, playlist) {
  const names = new Set(track.playlistNames || []);
  names.add(playlist.name);
  track.playlistNames = Array.from(names);
  track.playlistCount = Math.max(track.playlistCount || 1, track.playlistNames.length);
  if (playlist.isLikedMusic) track.inLikedMusic = true;
}

function normalizeSyncedTrack(song, playlist) {
  const album = song.al || song.album || {};
  const artists = song.ar || song.artists || [];
  const styleTags = inferStyleTagsFromText(`${playlist.name} ${song.name || ""}`);
  return {
    id: String(song.id || ""),
    name: song.name || "Untitled",
    artists: artists.map((artist) => artist.name).filter(Boolean),
    album: album.name || "",
    durationMs: Number(song.dt || song.duration || song.durationMs || 0),
    popularity: Number(song.pop || song.popularity || 0),
    fee: Number(song.fee || 0),
    picUrl: album.picUrl || album.pic_str || "",
    styleTags,
    styleLabels: styleTags.map((tag) => state.styleLabels[tag] || titleCase(tag)),
    estimatedBpm: estimateBpmForStyles(styleTags),
    tempoConfidence: styleTags.length ? "playlist-estimated" : "unknown",
    tempoSources: [],
    musicalKey: "",
    mode: "",
    keyConfidence: "",
    keySources: [],
    energy: estimateEnergyForStyles(styleTags),
    beatGridAvailable: false,
    onlineGenres: [],
    onlineTags: [],
    genreSources: ["netease-sync"],
    genreConfidence: styleTags.length ? "playlist-name" : "unknown",
    playlistNames: [playlist.name],
    playlistCount: 1,
    createdPlaylistCount: playlist.isLikedMusic ? 0 : 1,
    inLikedMusic: Boolean(playlist.isLikedMusic),
  };
}

function inferStyleTagsFromText(value) {
  const text = String(value || "").toLowerCase();
  const tags = [];
  const add = (tag, pattern) => {
    if (pattern.test(text) && !tags.includes(tag)) tags.push(tag);
  };
  add("chill_downtempo", /chill|downtempo|lounge|morning|早场|夜间|sleep|ambient/);
  add("house", /house|garage/);
  add("deep_house", /deep/);
  add("progressive_house", /progressive/);
  add("tech_house", /tech house/);
  add("melodic_house", /melodic/);
  add("afro_melodic", /afro|organic/);
  add("disco_nu_disco", /disco|nu-disco|nu disco|funk/);
  add("edm", /edm|dance|electro/);
  add("techno", /techno/);
  add("minimal", /minimal|boris/);
  add("rock", /rock|indie rock|punk|oasis|beatles/);
  add("retro_synth", /synth|retro|wave|80s|1980/);
  add("hiphop_jazzhop", /hip.?hop|rap|jazz.?hop/);
  add("rnb_soul", /r&b|rnb|soul/);
  add("jazz", /jazz/);
  add("pop", /pop|流行/);
  add("classical", /classical|piano|钢琴/);
  add("world_latin", /latin|world|bossa|samba/);
  add("holiday", /christmas|xmas|holiday|圣诞|nye/);
  return tags;
}

function estimateBpmForStyles(styleTags) {
  const bpmByStyle = {
    chill_downtempo: 94,
    deep_house: 120,
    house: 122,
    tech_house: 125,
    progressive_house: 123,
    melodic_house: 122,
    afro_melodic: 112,
    disco_nu_disco: 116,
    edm: 126,
    techno: 128,
    minimal: 124,
    rock: 126,
    retro_synth: 108,
    hiphop_jazzhop: 92,
    rnb_soul: 96,
    jazz: 104,
    pop: 112,
    classical: 86,
    world_latin: 105,
    holiday: 100,
  };
  const values = styleTags.map((tag) => bpmByStyle[tag]).filter(Number.isFinite);
  if (!values.length) return 114;
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function estimateEnergyForStyles(styleTags) {
  if (!styleTags.length) return 0.5;
  if (styleTags.some((tag) => /techno|edm|house/.test(tag))) return 0.72;
  if (styleTags.some((tag) => /chill|classical|jazz/.test(tag))) return 0.42;
  return 0.56;
}

function rebuildFiltersAfterSync() {
  buildFilters({ styleStats: buildStyleStatsFromTracks(), styleLabels: state.styleLabels });
}

function buildStyleStatsFromTracks() {
  const counts = new Map();
  state.tracks.forEach((track) => {
    (track.styleTags || []).forEach((tag) => counts.set(tag, (counts.get(tag) || 0) + 1));
  });
  return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
}

function updateLibraryCount() {
  elements.libraryCount.textContent = `${state.tracks.length} tracks from your archive`;
}

function getSyncProxyBase() {
  return elements.syncProxyInput.value.trim().replace(/\/$/, "");
}

function setSyncStatus(text) {
  elements.syncStatus.textContent = text;
  if (text.includes("失败")) {
    elements.syncSummaryText.textContent = "同步失败";
  } else if (text.includes("完成")) {
    elements.syncSummaryText.textContent = "同步完成";
  } else if (text.includes("正在")) {
    elements.syncSummaryText.textContent = "同步中";
  } else {
    elements.syncSummaryText.textContent = "同步设置";
  }
}

function getFilteredTracks() {
  if (state.lovedOnly) return getLovedTracks();
  const selected = getSelectedTags();
  if (!selected.length) return state.tracks;
  return state.tracks.filter((track) => selectedStyleMatches(track).length > 0);
}

function fillQueue(reset = false) {
  if (reset) state.queue = [];
  let reference = state.queue[state.queue.length - 1] || state.current;
  while (state.queue.length < QUEUE_TARGET) {
    const track = pickTrack(reference);
    if (!track) break;
    state.queue.push(track);
    reference = track;
  }
  elements.statQueue.textContent = String(state.queue.length);
}

function pickTrack(reference = null) {
  const pool = getFilteredTracks().filter((track) => {
    if (state.failedIds.has(track.id)) return false;
    if (state.current && state.current.id === track.id) return false;
    if (state.queue.some((queued) => queued.id === track.id)) return false;
    if (state.recentIds.includes(track.id)) return false;
    return true;
  });
  const fallback = getFilteredTracks().filter((track) => !state.failedIds.has(track.id));
  const candidates = pool.length ? pool : fallback;
  if (!candidates.length) return null;

  if (!reference) {
    const weighted = [];
    candidates.forEach((track) => {
      const weight = Math.max(1, Math.min(9, (track.playlistCount || 1) + selectedStyleMatches(track).length * 2));
      for (let i = 0; i < weight; i += 1) weighted.push(track);
    });
    return weighted[Math.floor(Math.random() * weighted.length)];
  }

  const ranked = candidates
    .map((track) => ({ track, score: mixScore(reference, track) + selectionScore(track) + Math.random() * 4 }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 24);
  const pick = ranked[Math.floor(Math.random() * Math.min(8, ranked.length))] || ranked[0];
  return pick?.track || candidates[0];
}

async function playNext(options = {}) {
  if (state.isMixing) return;
  if (options.user) state.userStarted = true;
  elements.autoplayGate.hidden = true;

  fillQueue();
  const nextTrack = state.queue.shift() || pickTrack(state.current);
  fillQueue();
  if (!nextTrack) {
    setStatus(state.lovedOnly ? "红心列表里还没有可播放歌曲" : "当前频道没有可播放歌曲");
    return;
  }

  if (!state.current || options.force || !elements.mixToggle.checked) {
    await switchToTrack(nextTrack, options);
    return;
  }

  await crossfadeToTrack(nextTrack, options.reason === "skip" ? 3 : getCrossfadeSeconds());
}

async function switchToTrack(track, options = {}) {
  const oldTrack = state.current;
  const deck = getActiveDeck();
  getInactiveDeck().pause();
  getInactiveDeck().removeAttribute("src");
  getInactiveDeck().load();

  if (oldTrack) pushHistory(oldTrack);
  state.current = track;
  rememberRecent(track.id);
  renderTrack(track, "NOW PLAYING");
  updateMixText(oldTrack, track, options.force ? "manual cut" : "direct");
  renderQueue();
  renderHistory();

  deck.src = neteaseAudioUrl(track.id);
  deck.volume = state.masterVolume;
  deck.load();
  setStatus("正在连接网易云音源");

  try {
    await deck.play();
    elements.autoplayGate.hidden = true;
    setStatus("正在播放");
    setPlaying(true);
  } catch (error) {
    if (!options.user && !state.userStarted) {
      elements.autoplayGate.hidden = false;
      setStatus("等待点击启动声音");
      return;
    }
    handleAudioError(track);
  }
}

async function crossfadeToTrack(nextTrack, seconds) {
  const oldDeck = getActiveDeck();
  const newDeckIndex = 1 - state.activeDeckIndex;
  const newDeck = state.decks[newDeckIndex];
  const oldTrack = state.current;

  state.isMixing = true;
  state.current = nextTrack;
  rememberRecent(nextTrack.id);
  renderTrack(nextTrack, "MIXING IN");
  updateMixText(oldTrack, nextTrack, "crossfade");
  renderQueue();
  setStatus(`正在平滑接歌 · ${seconds}s crossfade`);

  newDeck.src = neteaseAudioUrl(nextTrack.id);
  newDeck.currentTime = 0;
  newDeck.volume = 0;
  newDeck.load();

  try {
    await newDeck.play();
  } catch (error) {
    state.isMixing = false;
    state.current = oldTrack;
    state.failedIds.add(nextTrack.id);
    setStatus("下一首无法直接播放，正在重新选歌");
    playNext({ automatic: true, reason: "error" });
    return;
  }

  const start = performance.now();
  const durationMs = Math.max(1, seconds) * 1000;
  const fade = () => {
    const ratio = Math.min(1, (performance.now() - start) / durationMs);
    oldDeck.volume = state.masterVolume * (1 - ratio);
    newDeck.volume = state.masterVolume * ratio;

    if (ratio < 1) {
      window.requestAnimationFrame(fade);
      return;
    }

    oldDeck.pause();
    oldDeck.removeAttribute("src");
    oldDeck.load();
    state.activeDeckIndex = newDeckIndex;
    state.isMixing = false;
    if (oldTrack) pushHistory(oldTrack);
    renderTrack(nextTrack, "NOW PLAYING");
    renderHistory();
    updateProgress();
    setPlaying(true);
    setStatus("正在播放");
  };
  window.requestAnimationFrame(fade);
}

function startFromGate() {
  state.userStarted = true;
  elements.autoplayGate.hidden = true;
  const active = getActiveDeck();
  if (state.current && active.src && active.paused) {
    active.play().then(() => {
      setPlaying(true);
      setStatus("正在播放");
    }).catch(() => playNext({ user: true, reason: "gate", force: true }));
    return;
  }
  playNext({ user: true, reason: "gate" });
}

function maybeAutoMix() {
  if (!elements.mixToggle.checked || state.isMixing || !state.current) return;
  const deck = getActiveDeck();
  if (!Number.isFinite(deck.duration) || deck.duration <= 0) return;
  const remaining = deck.duration - deck.currentTime;
  if (remaining <= getCrossfadeSeconds() + 0.15 && deck.currentTime > 12) {
    playNext({ automatic: true, reason: "auto-mix" });
  }
}

function handleAudioError(track) {
  if (track) state.failedIds.add(track.id);
  setStatus("当前歌曲无法直接播放，正在换下一首");
  window.setTimeout(() => playNext({ automatic: true, reason: "error", force: true }), 700);
}

function togglePlayPause() {
  state.userStarted = true;
  const active = getActiveDeck();
  if (!state.current) {
    playNext({ user: true, reason: "play" });
    return;
  }

  if (active.paused) {
    active.play().then(() => {
      setPlaying(true);
      setStatus("正在播放");
    }).catch(() => {
      elements.autoplayGate.hidden = false;
      setStatus("需要点击启动声音");
    });
  } else {
    state.decks.forEach((deck) => deck.pause());
    setStatus("已暂停");
    setPlaying(false);
  }
}

function playPrevious() {
  if (!state.previous) return;
  state.queue.unshift(state.current);
  const target = state.previous;
  state.previous = null;
  playSpecific(target);
}

function playSpecific(track) {
  state.queue = state.queue.filter((item) => item.id !== track.id);
  state.queue.unshift(track);
  playNext({ user: true, reason: "previous", force: true });
}

function openCurrentInNetease() {
  if (!state.current) return;
  window.open(neteaseSongUrl(state.current.id), "_blank", "noopener,noreferrer");
}

function toggleLoveCurrent() {
  if (!state.current) {
    setStatus("还没有正在播放的歌曲");
    return;
  }

  const id = trackId(state.current);
  let statusText = "已加入红心歌曲";
  if (state.lovedIds.has(id)) {
    state.lovedIds.delete(id);
    statusText = "已取消红心";
    if (state.lovedOnly && !state.lovedIds.size) {
      state.lovedOnly = false;
      statusText = "已取消最后一首红心，回到曲风混音池";
    }
  } else {
    state.lovedIds.add(id);
  }

  saveLovedIds();
  renderAll();
  updateLoveButton();
  setStatus(statusText);
}

function toggleLovedOnly() {
  if (!state.lovedOnly && !state.lovedIds.size) {
    setStatus("还没有红心歌曲，先给当前喜欢的歌点红心");
    return;
  }

  state.lovedOnly = !state.lovedOnly;
  state.failedIds.clear();
  fillQueue(true);
  renderAll();
  setStatus(state.lovedOnly ? "只播放红心歌曲" : "已回到曲风混音池");
  if (state.lovedOnly) {
    playNext({ user: true, reason: "loved-only", force: true });
  }
}

function seekAudio(event) {
  const active = getActiveDeck();
  if (!Number.isFinite(active.duration)) return;
  const rect = elements.progressTrack.getBoundingClientRect();
  const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
  active.currentTime = ratio * active.duration;
}

function updateProgress() {
  const active = getActiveDeck();
  const current = active.currentTime || 0;
  const duration = active.duration || 0;
  elements.elapsedTime.textContent = formatTime(current);
  elements.durationTime.textContent = Number.isFinite(duration) && duration > 0 ? formatTime(duration) : "--:--";
  const percent = Number.isFinite(duration) && duration > 0 ? (current / duration) * 100 : 0;
  elements.progressBar.style.width = `${Math.min(100, Math.max(0, percent))}%`;
}

function renderAll() {
  syncFilterButtons();
  renderProfile();
  renderQueue();
  renderLoved();
  renderHistory();
  elements.channelName.textContent = getMixLabel();
  elements.selectedStylesSummary.textContent = getMixSummary();
  elements.statTracks.textContent = String(getFilteredTracks().length);
  elements.crossfadeValue.textContent = `${getCrossfadeSeconds()}s`;
}

function syncFilterButtons() {
  elements.styleFilters.querySelectorAll(".filter-chip").forEach((button) => {
    const active = state.selectedTags.has(button.dataset.filter);
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function renderTrack(track, mode) {
  elements.trackMode.textContent = mode;
  elements.trackTitle.textContent = track.name || "Untitled";
  elements.trackArtist.textContent = artistLine(track);
  elements.trackAlbum.textContent = track.album ? `Album: ${track.album}` : "";
  elements.genreTags.innerHTML = [
    ...(track.styleLabels || (track.styleTags || []).map((tag) => state.styleLabels[tag] || titleCase(tag))).slice(0, 4),
    `${track.estimatedBpm || "--"} BPM`,
  ].map((label) => `<span>${escapeHtml(label)}</span>`).join("");
  elements.albumStage.classList.toggle("no-cover", !track.picUrl);
  elements.coverArt.src = track.picUrl || "";
  elements.coverArt.alt = track.album ? `${track.album} cover` : "";
  elements.backdrop.style.backgroundImage = track.picUrl ? `url("${track.picUrl}")` : "none";
  updateLoveButton();
}

function renderQueue() {
  elements.statQueue.textContent = String(state.queue.length);
  elements.queueList.innerHTML = state.queue.map(renderSmallTrack).join("");
}

function renderHistory() {
  elements.historyList.innerHTML = state.history.slice(0, 5).map(renderSmallTrack).join("");
}

function renderLoved() {
  const lovedTracks = getLovedTracks();
  elements.lovedSection.hidden = lovedTracks.length === 0;
  elements.lovedCount.textContent = String(lovedTracks.length);
  elements.lovedOnlyBtn.classList.toggle("active", state.lovedOnly);
  elements.lovedOnlyBtn.setAttribute("aria-pressed", String(state.lovedOnly));
  elements.lovedOnlyBtn.textContent = state.lovedOnly ? "红心播放中" : "只播红心";
  elements.lovedList.innerHTML = lovedTracks.length
    ? lovedTracks.map(renderSmallTrack).join("")
    : "";
  updateLoveButton();
}

function renderProfile() {
  if (!elements.profileStatus) return;
  const username = state.profileUsername;
  elements.profileLocalBtn.hidden = !username;
  elements.profileLoginBtn.textContent = username ? "切换" : "进入";
  if (username && !elements.profileStatus.textContent.includes("同步")) {
    elements.profileStatus.textContent = `@${username}`;
  } else if (!username && !state.profileSaving) {
    elements.profileStatus.textContent = "本地模式";
  }
}

function updateLoveButton() {
  if (!elements.loveCurrentBtn) return;
  const loved = Boolean(state.current && state.lovedIds.has(trackId(state.current)));
  elements.loveCurrentBtn.classList.toggle("active", loved);
  elements.loveCurrentBtn.setAttribute("aria-pressed", String(loved));
  elements.loveCurrentBtn.textContent = loved ? "♥" : "♡";
  elements.loveCurrentBtn.title = loved ? "取消红心" : "红心收藏当前歌曲";
}

function renderSmallTrack(track) {
  const image = track.picUrl
    ? `<img alt="" src="${escapeHtml(track.picUrl)}">`
    : `<div class="small-fallback">KC</div>`;
  return `
    <div class="queue-item">
      ${image}
      <div>
        <strong>${escapeHtml(track.name || "Untitled")}</strong>
        <span>${escapeHtml(artistLine(track))}</span>
        <em>${escapeHtml(queueMeta(track))}</em>
      </div>
    </div>
  `;
}

function updateMixText(fromTrack, toTrack, mode = "planned") {
  if (!toTrack) {
    elements.mixText.textContent = "正在按多选曲风和估算 BPM 选择下一首。";
    return;
  }
  if (!fromTrack) {
    elements.mixText.textContent = `${toTrack.estimatedBpm || "--"} BPM · ${labelLine(toTrack)} · 首曲直接进歌。`;
    return;
  }

  const delta = bpmDistance(fromTrack.estimatedBpm, toTrack.estimatedBpm);
  const shared = sharedStyleLabels(fromTrack, toTrack);
  const transition = mode === "crossfade"
    ? `${getCrossfadeSeconds()}s crossfade`
    : mode === "manual cut"
      ? "manual cut"
      : "planned mix";
  elements.mixText.textContent = `${fromTrack.estimatedBpm || "--"} → ${toTrack.estimatedBpm || "--"} BPM · Δ${delta.toFixed(0)} · ${shared || getMixLabel()} · ${transition}。`;
}

function pushHistory(track) {
  if (!track) return;
  state.previous = track;
  state.history = [track, ...state.history.filter((item) => item.id !== track.id)].slice(0, 8);
}

function rememberRecent(id) {
  state.recentIds = [id, ...state.recentIds.filter((item) => item !== id)].slice(0, 40);
}

function setPlaying(isPlaying) {
  state.isPlaying = isPlaying;
  if (isPlaying) elements.autoplayGate.hidden = true;
  document.body.classList.toggle("is-playing", isPlaying);
  elements.playPauseBtn.textContent = isPlaying ? "Ⅱ" : "▶";
  elements.onAirState.textContent = isPlaying ? "ON AIR" : "STANDBY";
}

function setStatus(text) {
  elements.statusLine.textContent = text;
}

function mixScore(fromTrack, toTrack) {
  const delta = bpmDistance(fromTrack.estimatedBpm, toTrack.estimatedBpm);
  const shared = sharedStyles(fromTrack, toTrack).length;
  const energyDelta = Math.abs((fromTrack.energy || 0.5) - (toTrack.energy || 0.5));
  const playlistBoost = Math.min(4, toTrack.playlistCount || 1);
  return 100 - delta * 4.5 + shared * 12 - energyDelta * 24 + playlistBoost;
}

function selectionScore(track) {
  const selected = getSelectedTags();
  if (!selected.length) return 0;
  const matched = selectedStyleMatches(track).length;
  if (!matched) return -100;
  return matched * 14 + (matched / selected.length) * 18;
}

function bpmDistance(a, b) {
  if (!Number.isFinite(a) || !Number.isFinite(b)) return 24;
  return Math.min(Math.abs(a - b), Math.abs(a * 2 - b), Math.abs(a - b * 2));
}

function sharedStyles(a, b) {
  const left = new Set(a.styleTags || []);
  return (b.styleTags || []).filter((tag) => left.has(tag));
}

function sharedStyleLabels(a, b) {
  return sharedStyles(a, b).slice(0, 3).map((tag) => state.styleLabels[tag] || titleCase(tag)).join(" · ");
}

function labelLine(track) {
  return (track.styleLabels || []).slice(0, 2).join(" · ") || getMixLabel();
}

function queueMeta(track) {
  const labels = labelLine(track);
  return `${labels}${labels ? " · " : ""}${track.estimatedBpm || "--"} BPM`;
}

function getSelectedTags() {
  return Array.from(state.selectedTags);
}

function selectedStyleMatches(track) {
  const tags = new Set(track.styleTags || []);
  return getSelectedTags().filter((tag) => tags.has(tag));
}

function getStyleLabel(key) {
  return (state.filters.find((filter) => filter.key === key) || {}).label || titleCase(key);
}

function getMixLabel() {
  if (state.lovedOnly) return "Loved Tracks";
  const selected = getSelectedTags();
  if (!selected.length) return "All Styles";
  const labels = selected.map(getStyleLabel);
  if (labels.length <= 2) return labels.join(" + ");
  return `${labels.slice(0, 2).join(" + ")} +${labels.length - 2}`;
}

function getMixSummary() {
  if (state.lovedOnly) return `${getLovedTracks().length} loved tracks · heart-only mode`;
  const selected = getSelectedTags();
  const poolCount = getFilteredTracks().length;
  if (!selected.length) return `${poolCount} tracks · full archive`;
  const labels = selected.map(getStyleLabel).join(" · ");
  return `${selected.length} selected · ${poolCount} tracks · ${labels}`;
}

function getLovedTracks() {
  if (!state.lovedIds.size) return [];
  const order = new Map(Array.from(state.lovedIds).map((id, index) => [id, index]));
  return state.tracks
    .filter((track) => state.lovedIds.has(trackId(track)))
    .sort((a, b) => (order.get(trackId(b)) || 0) - (order.get(trackId(a)) || 0));
}

function getLovedStorageKey(username = state.profileUsername) {
  return username ? `${LOVED_STORAGE_KEY}:${username}` : LOVED_STORAGE_KEY;
}

function loadLovedIds(username = state.profileUsername) {
  try {
    const raw = window.localStorage.getItem(getLovedStorageKey(username));
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.map(String).filter(Boolean));
  } catch (error) {
    return new Set();
  }
}

function saveLovedIds({ cloud = true } = {}) {
  try {
    window.localStorage.setItem(getLovedStorageKey(), JSON.stringify(Array.from(state.lovedIds)));
  } catch (error) {
    setStatus("红心歌曲暂时无法保存到浏览器本地");
  }
  if (cloud) scheduleCloudLovedSave();
}

function normalizeUsername(value) {
  return String(value || "").trim().toLowerCase();
}

function validateUsername(username) {
  return USERNAME_PATTERN.test(username);
}

function canUseCloudStorage() {
  return window.location.protocol === "http:" || window.location.protocol === "https:";
}

async function activateProfile(rawUsername, options = {}) {
  const username = normalizeUsername(rawUsername);
  if (!validateUsername(username)) {
    setProfileMessage("用户名需为 2-24 位小写字母、数字、_ 或 -。", "用户名无效");
    return;
  }

  state.profileUsername = username;
  elements.profileUsernameInput.value = username;
  window.localStorage.setItem(PROFILE_USERNAME_STORAGE_KEY, username);
  state.lovedIds = loadLovedIds(username);
  renderAll();

  if (!canUseCloudStorage()) {
    setProfileMessage(`@${username} 已启用本机存档；部署到 Netlify 后会自动云同步。`, `@${username}`);
    return;
  }

  setProfileMessage(`正在读取 @${username} 的红心歌单...`, "同步中");
  try {
    const profile = await fetchLovedProfile(username);
    state.lovedIds = new Set((profile.lovedIds || []).map(String).filter(Boolean));
    saveLovedIds({ cloud: false });
    renderAll();
    setProfileMessage(`已进入 @${username}，读取 ${state.lovedIds.size} 首红心。`, `@${username}`);
    setStatus(`已载入 @${username} 的红心歌单`);
    if (state.lovedOnly) fillQueue(true);
  } catch (error) {
    const fallback = options.restore ? "继续使用上次缓存在本机的红心。" : "先使用本机缓存，云端稍后可重试。";
    setProfileMessage(`云端读取失败：${error.message}。${fallback}`, `@${username}`);
  }
}

function useLocalProfile() {
  state.profileUsername = "";
  window.localStorage.removeItem(PROFILE_USERNAME_STORAGE_KEY);
  state.lovedIds = loadLovedIds("");
  elements.profileUsernameInput.value = "";
  setProfileMessage("已切回本地模式。红心只保存在这台设备。", "本地模式");
  renderAll();
  if (state.lovedOnly) fillQueue(true);
}

async function fetchLovedProfile(username) {
  const response = await fetch(`${CLOUD_LOVED_ENDPOINT}?user=${encodeURIComponent(username)}`, {
    headers: { "Accept": "application/json" },
    cache: "no-store",
  });
  if (!response.ok) {
    const payload = await readJsonSafely(response);
    throw new Error(payload.error || `HTTP ${response.status}`);
  }
  return response.json();
}

function scheduleCloudLovedSave() {
  if (!state.profileUsername || !canUseCloudStorage()) return;
  window.clearTimeout(state.profileSaveTimer);
  setProfileMessage("红心变更待同步...", "待同步");
  state.profileSaveTimer = window.setTimeout(saveCloudLovedProfile, CLOUD_SAVE_DEBOUNCE_MS);
}

async function saveCloudLovedProfile() {
  if (!state.profileUsername || state.profileSaving) return;
  state.profileSaving = true;
  setProfileMessage("正在保存红心...", "同步中");
  try {
    const response = await fetch(CLOUD_LOVED_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({
        username: state.profileUsername,
        lovedIds: Array.from(state.lovedIds),
      }),
    });
    if (!response.ok) {
      const payload = await readJsonSafely(response);
      throw new Error(payload.error || `HTTP ${response.status}`);
    }
    setProfileMessage(`@${state.profileUsername} 的红心已云端保存。`, `@${state.profileUsername}`);
  } catch (error) {
    setProfileMessage(`云端保存失败：${error.message}。本机已保存。`, `@${state.profileUsername}`);
  } finally {
    state.profileSaving = false;
  }
}

async function readJsonSafely(response) {
  try {
    return await response.json();
  } catch (error) {
    return {};
  }
}

function setProfileMessage(helpText, statusText) {
  elements.profileHelp.textContent = helpText;
  elements.profileStatus.textContent = statusText;
}

function trackId(track) {
  return String(track?.id || "");
}

function getCrossfadeSeconds() {
  return Number(elements.crossfadeSlider.value || 10);
}

function getActiveDeck() {
  return state.decks[state.activeDeckIndex];
}

function getInactiveDeck() {
  return state.decks[1 - state.activeDeckIndex];
}

function artistLine(track) {
  return (track.artists && track.artists.length ? track.artists.join(" / ") : "Unknown Artist");
}

function neteaseAudioUrl(id) {
  return `https://music.163.com/song/media/outer/url?id=${encodeURIComponent(id)}.mp3`;
}

function neteaseSongUrl(id) {
  return `https://music.163.com/#/song?id=${encodeURIComponent(id)}`;
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function titleCase(value) {
  return String(value)
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
