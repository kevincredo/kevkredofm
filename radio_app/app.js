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

const TAXONOMY = {
  genre: {
    title: "Genre",
    order: [
      "house",
      "deep_house",
      "tech_house",
      "progressive_house",
      "melodic_house",
      "afro_house",
      "techno",
      "acid_techno",
      "minimal",
      "nu_disco",
      "indie_dance",
      "downtempo",
      "ambient",
      "electronica",
      "edm",
      "synthwave",
      "lofi",
      "breakbeat",
      "garage",
      "drum_bass",
      "pop",
      "indie_rock",
      "rock",
      "rnb_soul",
      "hiphop_rap",
      "jazz",
      "funk_soul",
      "latin_world",
      "classical",
    ],
    labels: {
      house: "House",
      deep_house: "Deep House",
      tech_house: "Tech House",
      progressive_house: "Progressive House",
      melodic_house: "Melodic House",
      afro_house: "Afro House",
      techno: "Techno",
      acid_techno: "Acid Techno",
      minimal: "Minimal",
      nu_disco: "Nu-Disco",
      indie_dance: "Indie Dance",
      downtempo: "Downtempo",
      ambient: "Ambient",
      electronica: "Electronica",
      edm: "EDM",
      synthwave: "Synth / Retro",
      lofi: "Lo-fi",
      breakbeat: "Breakbeat",
      garage: "Garage",
      drum_bass: "Drum & Bass",
      pop: "Pop",
      indie_rock: "Indie Rock",
      rock: "Rock",
      rnb_soul: "R&B / Soul",
      hiphop_rap: "Hip-hop / Rap",
      jazz: "Jazz",
      funk_soul: "Funk / Soul",
      latin_world: "Latin / World",
      classical: "Classical",
    },
  },
  mood: {
    title: "Mood",
    order: [
      "chill",
      "groovy",
      "warm",
      "euphoric",
      "dark",
      "hypnotic",
      "atmospheric",
      "dreamy",
      "melancholic",
      "romantic",
      "energetic",
      "playful",
    ],
    labels: {
      chill: "Chill",
      groovy: "Groovy",
      warm: "Warm",
      euphoric: "Euphoric",
      dark: "Dark",
      hypnotic: "Hypnotic",
      atmospheric: "Atmospheric",
      dreamy: "Dreamy",
      melancholic: "Melancholic",
      romantic: "Romantic",
      energetic: "Energetic",
      playful: "Playful",
    },
  },
  context: {
    title: "Context",
    order: [
      "club",
      "lounge",
      "night_drive",
      "afterhours",
      "dinner",
      "focus",
      "workout",
      "sunset",
      "summer",
      "travel",
      "holiday",
    ],
    labels: {
      club: "Club",
      lounge: "Lounge",
      night_drive: "Night Drive",
      afterhours: "After Hours",
      dinner: "Dinner",
      focus: "Focus",
      workout: "Workout",
      sunset: "Sunset",
      summer: "Summer",
      travel: "Travel",
      holiday: "Holiday",
    },
  },
  era: {
    title: "Era",
    order: ["70s", "80s", "90s"],
    labels: {
      "70s": "70s",
      "80s": "80s",
      "90s": "90s",
    },
  },
};

const STYLE_TO_TAXONOMY = {
  chill_downtempo: { genre: ["downtempo"], mood: ["chill"], context: ["lounge"] },
  house: { genre: ["house"], mood: ["groovy"], context: ["club"] },
  deep_house: { genre: ["deep_house", "house"], mood: ["warm", "groovy"], context: ["lounge", "club"] },
  tech_house: { genre: ["tech_house", "house"], mood: ["groovy", "energetic"], context: ["club"] },
  progressive_house: { genre: ["progressive_house", "house"], mood: ["euphoric", "hypnotic"], context: ["club"] },
  melodic_house: { genre: ["melodic_house", "house"], mood: ["euphoric", "melancholic"], context: ["club"] },
  afro_melodic: { genre: ["afro_house", "melodic_house"], mood: ["warm", "groovy"], context: ["sunset", "club"] },
  afro_house: { genre: ["afro_house", "house"], mood: ["warm", "groovy"], context: ["club"] },
  disco_nu_disco: { genre: ["nu_disco"], mood: ["groovy", "playful"], context: ["club"] },
  indie_dance: { genre: ["indie_dance"], mood: ["dark", "groovy"], context: ["club", "night_drive"] },
  edm: { genre: ["edm"], mood: ["energetic", "euphoric"], context: ["club", "workout"] },
  techno: { genre: ["techno"], mood: ["dark", "hypnotic"], context: ["club"] },
  acid_techno: { genre: ["acid_techno", "techno"], mood: ["hypnotic", "energetic"], context: ["club"] },
  minimal: { genre: ["minimal", "techno"], mood: ["hypnotic"], context: ["club", "afterhours"] },
  electronic: { genre: ["electronica"], mood: [], context: [] },
  ambient: { genre: ["ambient"], mood: ["atmospheric", "chill"], context: ["focus"] },
  lofi: { genre: ["lofi"], mood: ["chill", "dreamy"], context: ["focus"] },
  retro_synth: { genre: ["synthwave"], mood: ["dreamy"], context: ["night_drive"] },
  pop: { genre: ["pop"], mood: ["playful"], context: [] },
  rock: { genre: ["rock"], mood: ["energetic"], context: [] },
  indie_rock: { genre: ["indie_rock", "rock"], mood: ["melancholic"], context: [] },
  rnb_soul: { genre: ["rnb_soul"], mood: ["romantic", "warm"], context: ["dinner"] },
  hiphop_jazzhop: { genre: ["hiphop_rap"], mood: ["groovy"], context: [] },
  jazz: { genre: ["jazz"], mood: ["warm"], context: ["dinner", "lounge"] },
  funk: { genre: ["funk_soul"], mood: ["groovy", "warm"], context: ["club"] },
  world_latin: { genre: ["latin_world"], mood: ["warm", "groovy"], context: ["summer"] },
  classical: { genre: ["classical"], mood: ["atmospheric"], context: ["focus"] },
  holiday: { genre: [], mood: ["warm", "playful"], context: ["holiday"] },
};

const KEYWORD_TAXONOMY_RULES = {
  genre: [
    ["progressive_house", ["progressive house", "progressive trance", "progressive"]],
    ["melodic_house", ["melodic house", "melodic techno", "melodic"]],
    ["deep_house", ["deep house", "deep-house"]],
    ["tech_house", ["tech house", "tech-house"]],
    ["afro_house", ["afro house", "afro-house", "organic house", "afrobeats", "afrobeat", "amapiano"]],
    ["acid_techno", ["acid techno", "acid house", "acid"]],
    ["minimal", ["minimal techno", "minimal", "high-tech minimal", "high tech minimal"]],
    ["techno", ["detroit techno", "hard techno", "raw techno", "techno"]],
    ["nu_disco", ["nu disco", "nu-disco", "disco", "french touch", "boogie"]],
    ["indie_dance", ["indie dance", "dance-punk", "dark disco"]],
    ["house", ["classic house", "vocal house", "garage house", "house"]],
    ["breakbeat", ["breakbeat", "breaks", "big beat"]],
    ["garage", ["uk garage", "2-step", "2 step", "garage"]],
    ["drum_bass", ["drum and bass", "drum & bass", "dnb", "jungle"]],
    ["downtempo", ["downtempo", "trip hop", "trip-hop", "lounge", "chillout"]],
    ["ambient", ["ambient", "new age"]],
    ["synthwave", ["synthwave", "synth-pop", "synth pop", "retrowave", "new wave"]],
    ["lofi", ["lo-fi", "lofi", "lo fi"]],
    ["edm", ["edm", "big room", "future house", "electro house", "dance-pop"]],
    ["electronica", ["electronica", "electronic", "electro"]],
    ["indie_rock", ["indie rock", "alternative rock", "alt rock"]],
    ["rock", ["classic rock", "hard rock", "britpop", "punk", "rock"]],
    ["rnb_soul", ["neo soul", "neo-soul", "r&b", "rnb"]],
    ["hiphop_rap", ["hip hop", "hip-hop", "rap", "trap"]],
    ["jazz", ["jazz", "bossa nova", "swing"]],
    ["funk_soul", ["funk", "boogie"]],
    ["latin_world", ["latin", "samba", "reggae", "world"]],
    ["classical", ["classical", "orchestral", "piano", "violin"]],
    ["pop", ["k-pop", "j-pop", "cantopop", "mandopop", "pop"]],
  ],
  mood: [
    ["chill", ["chill", "chillout", "mellow", "laid back", "laid-back", "soft", "calm"]],
    ["groovy", ["groove", "groovy", "funky", "disco", "boogie"]],
    ["warm", ["warm", "soulful", "organic", "sunny", "balearic"]],
    ["euphoric", ["euphoric", "uplifting", "anthem", "hands up"]],
    ["dark", ["dark", "noir", "industrial", "goth", "warehouse"]],
    ["hypnotic", ["hypnotic", "minimal", "trance", "acid", "driving"]],
    ["atmospheric", ["atmospheric", "ambient", "cinematic", "space", "ethereal"]],
    ["dreamy", ["dreamy", "dream pop", "shoegaze", "nostalgic"]],
    ["melancholic", ["melancholy", "melancholic", "sad", "blue", "heartbreak"]],
    ["romantic", ["romantic", "love", "sexy", "slow jam"]],
    ["energetic", ["energetic", "energy", "banger", "peak time", "peak-time", "rave"]],
    ["playful", ["fun", "playful", "party", "happy"]],
  ],
  context: [
    ["club", ["club", "dancefloor", "dance floor", "dj set", "rave", "warehouse", "party"]],
    ["lounge", ["lounge", "bar", "cafe", "cocktail", "hotel"]],
    ["night_drive", ["night drive", "driving", "drive", "midnight", "neon"]],
    ["afterhours", ["after hours", "afterhours", "late night", "late-night"]],
    ["dinner", ["dinner", "supper", "restaurant", "date night"]],
    ["focus", ["focus", "study", "work", "reading", "sleep"]],
    ["workout", ["workout", "gym", "running", "run", "fitness"]],
    ["sunset", ["sunset", "sunrise", "beach", "balearic"]],
    ["summer", ["summer", "pool", "tropical"]],
    ["travel", ["travel", "road trip", "journey"]],
    ["holiday", ["christmas", "xmas", "holiday", "santa", "nye", "new year"]],
  ],
};

const ARTIST_TAXONOMY_RULES = [
  [["zhu", "nicolas jaar", "darkside"], { genre: ["electronica", "downtempo"], mood: ["dark", "hypnotic"], context: ["afterhours"] }],
  [["âme", "ame", "recondite", "adriatique", "colyn", "innellea", "artbat", "argy", "anyma", "massano", "kevin de vries"], { genre: ["melodic_house", "techno"], mood: ["euphoric", "hypnotic"], context: ["club"] }],
  [["fred again..", "jamie xx", "floating points", "jon hopkins", "romy"], { genre: ["electronica", "house"], mood: ["euphoric", "melancholic"], context: ["club", "afterhours"] }],
  [["xique-xique", "kyong sono", "kora (ca)", "mita gami", "antaares", "maz", "vxsion"], { genre: ["afro_house", "downtempo"], mood: ["warm", "groovy"], context: ["sunset"] }],
  [["gorgon city", "hot since 82", "john summit", "chris lake", "oliver heldens", "me & my toothbrush"], { genre: ["house"], mood: ["groovy", "energetic"], context: ["club"] }],
  [["deadmau5", "lane 8", "sultan + shepard", "armin van buuren", "tiësto", "tiesto"], { genre: ["progressive_house", "edm"], mood: ["euphoric", "energetic"], context: ["club"] }],
  [["layton giordani", "hi-lo", "julian jeweil", "mathew jonson", "dusty kid"], { genre: ["techno"], mood: ["dark", "hypnotic"], context: ["club"] }],
  [["boris brejcha"], { genre: ["minimal", "techno"], mood: ["hypnotic"], context: ["club"] }],
  [["the chemical brothers", "skrillex", "chace"], { genre: ["electronica", "edm"], mood: ["energetic"], context: ["club"] }],
  [["hvob", "bob moses", "monolink", "whomadewho", "kerala dust", "rüfüs du sol", "rufus du sol"], { genre: ["indie_dance", "electronica"], mood: ["dark", "melancholic"], context: ["night_drive", "club"] }],
  [["l'impératrice", "l'imperatrice", "lewis ofman", "tame impala", "channel tres"], { genre: ["nu_disco", "indie_dance"], mood: ["groovy", "playful"], context: ["club"] }],
  [["kaytranada", "kaytraminé", "kaytramine", "pharrell williams"], { genre: ["funk_soul", "hiphop_rap"], mood: ["groovy"], context: ["club"] }],
  [["ed sheeran", "jason mraz", "lauv", "justin bieber", "charlie puth", "taylor swift", "selena gomez", "ellie goulding", "coldplay", "maroon 5", "finneas"], { genre: ["pop"], mood: ["romantic", "playful"], context: [] }],
  [["陈奕迅", "刘德华", "周柏豪", "杨千嬅", "蔡徐坤", "宇多田ヒカル"], { genre: ["pop"], mood: ["romantic"], context: [] }],
  [["john legend", "erykah badu", "tinashe", "jeff bernat", "miso", "the marías", "the marias"], { genre: ["rnb_soul"], mood: ["romantic", "warm"], context: ["dinner"] }],
  [["kendrick lamar", "drake", "future", "travis scott", "rich brian", "n.w.a", "amini", "aminé", "amine"], { genre: ["hiphop_rap"], mood: ["groovy"], context: [] }],
  [["oasis", "radiohead", "green day", "fleetwood mac", "bob dylan", "the velvet underground", "liam gallagher", "belle & sebastian"], { genre: ["rock"], mood: ["melancholic"], context: [] }],
  [["clairo", "cuco", "billie eilish", "the xx", "bahamas", "novo amor", "damien rice", "rachael yamagata"], { genre: ["indie_rock", "pop"], mood: ["dreamy", "melancholic"], context: [] }],
  [["norah jones", "pink martini", "kokoroko", "jacob collier", "larry carlton"], { genre: ["jazz"], mood: ["warm"], context: ["dinner", "lounge"] }],
  [["ólafur arnalds", "olafur arnalds", "rené aubry", "rene aubry", "ozymandias"], { genre: ["classical", "ambient"], mood: ["atmospheric", "melancholic"], context: ["focus"] }],
  [["michael mayer", "gui boratto", "ben böhmer", "ben bohmer", "marsh", "coeus"], { genre: ["progressive_house", "melodic_house"], mood: ["euphoric", "hypnotic"], context: ["club"] }],
  [["sam paganini", "tale of us", "fisher", "kydus", "dennis cruz"], { genre: ["techno", "house"], mood: ["energetic", "hypnotic"], context: ["club"] }],
  [["massive attack", "the blaze", "pantha du prince", "yosi horikawa", "koan sound", "high tone"], { genre: ["electronica", "downtempo"], mood: ["dark", "atmospheric"], context: ["afterhours"] }],
  [["fkj", "rhye", "paradis", "darius", "moullinex", "hercules & love affair", "laid back"], { genre: ["nu_disco", "funk_soul"], mood: ["groovy", "warm"], context: ["lounge", "club"] }],
  [["berlioz", "melody gardot", "kamasi washington"], { genre: ["jazz"], mood: ["warm"], context: ["dinner", "lounge"] }],
  [["sapientdream", "shiloh dynasty", "rook1e", "timmies", "snøw", "snow", "teqkoi", "kina", "malte marten"], { genre: ["lofi"], mood: ["chill", "dreamy"], context: ["focus"] }],
  [["keshi", "sofi de la torre", "safia", "alberto dimeo"], { genre: ["rnb_soul", "pop"], mood: ["romantic", "chill"], context: [] }],
  [["john lennon", "paul mccartney", "the beach boys", "noel gallagher", "sting", "beck", "i dont know how but they found me"], { genre: ["rock"], mood: ["melancholic"], context: [] }],
  [["glass animals", "sales", "forester"], { genre: ["indie_rock", "pop"], mood: ["dreamy", "playful"], context: [] }],
  [["the chainsmokers", "lost frequencies"], { genre: ["edm", "pop"], mood: ["energetic", "playful"], context: ["club"] }],
  [["dr. dre", "rae sremmurd", "bbno$"], { genre: ["hiphop_rap"], mood: ["groovy"], context: [] }],
  [["justin hurwitz"], { genre: ["classical", "jazz"], mood: ["romantic"], context: ["dinner"] }],
  [["josé gonzález", "jose gonzalez", "passenger", "billy raffoul", "stephen sanchez"], { genre: ["pop"], mood: ["romantic", "melancholic"], context: [] }],
  [["boy harsher"], { genre: ["synthwave", "indie_dance"], mood: ["dark"], context: ["night_drive"] }],
  [["glass beams"], { genre: ["funk_soul", "latin_world"], mood: ["groovy", "warm"], context: ["sunset"] }],
  [["black loops", "umami"], { genre: ["deep_house", "house"], mood: ["groovy", "warm"], context: ["club"] }],
  [["delta funktionen", "nina kraviz"], { genre: ["techno"], mood: ["dark", "hypnotic"], context: ["club"] }],
  [["tinlicker"], { genre: ["progressive_house", "melodic_house"], mood: ["euphoric"], context: ["club"] }],
  [["bicep", "yaeji", "soulwax"], { genre: ["house", "electronica"], mood: ["groovy"], context: ["club"] }],
  [["pet shop boys"], { genre: ["synthwave", "pop"], mood: ["playful"], context: ["night_drive"] }],
  [["polo & pan", "zimmer"], { genre: ["nu_disco", "electronica"], mood: ["warm", "playful"], context: ["sunset"] }],
  [["alesso", "kream"], { genre: ["edm", "house"], mood: ["energetic", "euphoric"], context: ["club"] }],
  [["tom misch", "alfa mist", "craig ruhnke"], { genre: ["jazz", "funk_soul"], mood: ["warm", "groovy"], context: ["dinner", "lounge"] }],
  [["hans zimmer", "binaryh"], { genre: ["classical", "electronica"], mood: ["atmospheric"], context: ["focus"] }],
  [["don mclean", "eagles", "creedence clearwater revival", "john mayer", "mcfly", "imagine dragons"], { genre: ["rock"], mood: ["melancholic"], context: [] }],
  [["kanye west", "yg"], { genre: ["hiphop_rap"], mood: ["groovy"], context: [] }],
  [["kokia", "大橋トリオ", "余佳运", "mokita", "gnash", "chelsea lankes"], { genre: ["pop"], mood: ["romantic"], context: [] }],
  [["jacoo", "aso", "jobii"], { genre: ["lofi"], mood: ["chill", "dreamy"], context: ["focus"] }],
  [["la femme", "tristesse contemporaine", "vox low"], { genre: ["indie_dance", "synthwave"], mood: ["dark", "playful"], context: ["night_drive"] }],
  [["tep no"], { genre: ["electronica", "downtempo"], mood: ["chill", "warm"], context: ["lounge", "summer"] }],
  [["skinshape"], { genre: ["funk_soul", "downtempo", "indie_rock"], mood: ["groovy", "warm", "dreamy"], context: ["lounge", "sunset"] }],
  [["ezra collective"], { genre: ["jazz", "funk_soul", "latin_world"], mood: ["groovy", "warm"], context: ["dinner", "lounge"] }],
  [["chon"], { genre: ["indie_rock", "rock"], mood: ["energetic", "dreamy"], context: ["focus"] }],
  [["bobby puma"], { genre: ["house", "edm"], mood: ["energetic", "euphoric"], context: ["club", "workout"] }],
];

const STRICT_JAZZ_ARTISTS = [
  "alfa mist",
  "berlioz",
  "bobby caldwell",
  "craig ruhnke",
  "ella fitzgerald",
  "emma-jean thackray",
  "halie loren",
  "jacob collier",
  "john coltrane",
  "kamasi washington",
  "kokoroko",
  "larry carlton",
  "melody gardot",
  "nat king cole",
  "norah jones",
  "pink martini",
  "tom misch",
];

const JAZZ_DANCE_OR_RAP_TAGS = new Set([
  "hiphop_jazzhop",
  "house",
  "deep_house",
  "tech_house",
  "progressive_house",
  "melodic_house",
  "afro_house",
  "disco_nu_disco",
  "edm",
  "electronic",
  "techno",
  "acid_techno",
  "minimal",
  "indie_dance",
]);

const JAZZ_DISQUALIFYING_GENRES = new Set([
  "hiphop_rap",
  "house",
  "deep_house",
  "tech_house",
  "progressive_house",
  "melodic_house",
  "afro_house",
  "nu_disco",
  "indie_dance",
  "electronica",
  "edm",
  "techno",
  "acid_techno",
  "minimal",
]);

const GENRE_MATCH_GROUPS = {
  house: new Set(["house", "deep_house", "tech_house", "progressive_house", "melodic_house", "afro_house", "garage"]),
  techno: new Set(["techno", "acid_techno", "minimal"]),
  rock: new Set(["rock", "indie_rock"]),
  electronica: new Set(["electronica", "indie_dance", "synthwave", "breakbeat", "garage", "drum_bass"]),
};

const RADIO_PROGRAMS = [
  {
    id: "day_cafe",
    name: "DAY CAFÉ",
    schedule: "10:00–18:00",
    bpmLabel: "82–118 BPM",
    minBpm: 82,
    maxBpm: 118,
    vocalPreference: true,
    facets: {
      genre: ["pop", "rnb_soul", "funk_soul", "jazz", "nu_disco", "indie_rock", "deep_house", "house", "latin_world"],
      mood: ["warm", "groovy", "playful", "romantic", "chill"],
      context: ["lounge", "dinner", "summer", "travel"],
    },
  },
  {
    id: "blue_hour",
    name: "BLUE HOUR",
    schedule: "18:00–21:00",
    bpmLabel: "90–116 BPM",
    minBpm: 90,
    maxBpm: 116,
    facets: {
      genre: ["deep_house", "melodic_house", "afro_house", "nu_disco", "indie_dance", "electronica", "downtempo"],
      mood: ["warm", "groovy", "dreamy", "romantic", "melancholic"],
      context: ["sunset", "lounge", "dinner", "night_drive"],
    },
  },
  {
    id: "cocktail",
    name: "COCKTAIL",
    schedule: "21:00–23:00",
    bpmLabel: "115–120 BPM",
    minBpm: 115,
    maxBpm: 120,
    facets: {
      genre: ["house", "deep_house", "nu_disco", "indie_dance", "afro_house", "melodic_house", "tech_house"],
      mood: ["groovy", "warm", "playful", "euphoric"],
      context: ["lounge", "club", "night_drive"],
    },
  },
  {
    id: "after_hours",
    name: "AFTER HOURS",
    schedule: "23:00–10:00",
    bpmLabel: "75–118 BPM",
    minBpm: 70,
    maxBpm: 118,
    facets: {
      genre: ["ambient", "downtempo", "electronica", "minimal", "indie_dance", "synthwave", "lofi"],
      mood: ["dark", "hypnotic", "atmospheric", "dreamy", "chill"],
      context: ["afterhours", "night_drive", "focus"],
    },
  },
  {
    id: "peak_crowd",
    name: "PEAK CROWD",
    schedule: "MANUAL",
    bpmLabel: "125+ BPM",
    minBpm: 125,
    maxBpm: Infinity,
    noisePolicy: "allow_high",
    facets: {
      genre: ["house", "tech_house", "techno", "acid_techno", "edm", "progressive_house", "melodic_house", "afro_house", "indie_dance", "drum_bass"],
      mood: ["energetic", "euphoric", "hypnotic"],
      context: ["club", "workout"],
    },
  },
];

const QUEUE_TARGET = 18;
const DJ_MIN_MIX_SECONDS = 3;
const DJ_MAX_MIX_SECONDS = 28;
const DJ_PHRASE_BEAT_OPTIONS = [8, 16, 24, 32];
const DJ_EIGHT_COUNT_BEATS = 8;
const DJ_DEFAULT_EIGHT_COUNTS = 1;
const DJ_FALLBACK_BPM = 100;
const DJ_DEFAULT_BEATS_PER_BAR = 4;
const DJ_TEMPO_RATE_LIMIT = 0.04;
const KEY_TO_SEMITONE = {
  c: 0,
  "c#": 1,
  db: 1,
  d: 2,
  "d#": 3,
  eb: 3,
  e: 4,
  f: 5,
  "f#": 6,
  gb: 6,
  g: 7,
  "g#": 8,
  ab: 8,
  a: 9,
  "a#": 10,
  bb: 10,
  b: 11,
};
const CAMELOT_MAJOR = ["8B", "3B", "10B", "5B", "12B", "7B", "2B", "9B", "4B", "11B", "6B", "1B"];
const CAMELOT_MINOR = ["5A", "12A", "7A", "2A", "9A", "4A", "11A", "6A", "1A", "8A", "3A", "10A"];
const LOVED_STORAGE_KEY = "kevincredo-fm-loved-track-ids";
const PROFILE_USERNAME_STORAGE_KEY = "kevincredo-fm-profile-username";
const SYNC_PROXY_STORAGE_KEY = "kevincredo-fm-sync-proxy";
const NETEASE_EXPORT_DRAFT_STORAGE_KEY = "kevincredo-fm-netease-export-draft";
const NETEASE_EXPORT_API_STORAGE_KEY = "kevincredo-fm-netease-export-api";
const AUTO_PROGRAM_STORAGE_KEY = "echo-room-fm-auto-program";
const ACTIVE_PROGRAM_STORAGE_KEY = "echo-room-fm-active-program";
const PROGRAM_OVERRIDES_STORAGE_KEY = "echo-room-fm-program-overrides";
const ENTRY_MODE_STORAGE_KEY = "echo-room-fm-entry-mode-version";
const ENTRY_MODE_VERSION = "style-first-20260610";
const ONBOARDING_STORAGE_KEY = "echo-room-fm-first-playlist-guide-v2";
const NETEASE_ORIGIN = "https://music.163.com";
const NETEASE_DEFAULT_EXPORT_API_BASE = "http://127.0.0.1:3000";
const CLOUD_LOVED_ENDPOINT = "/.netlify/functions/loved";
const USERNAME_PATTERN = /^[a-z0-9_-]{2,24}$/;
const CLOUD_SAVE_DEBOUNCE_MS = 650;
const NETEASE_EXPORT_CHUNK_SIZE = 80;

const elements = {};
const state = {
  allTracks: [],
  tracks: [],
  filters: [],
  filterGroups: {},
  selectedFacets: {
    genre: new Set(),
    mood: new Set(),
    context: new Set(),
  },
  activeProgramId: "",
  autoProgram: false,
  programTimer: null,
  programOverrides: {},
  activeProgramEditorFacet: "genre",
  activeFacet: "genre",
  lovedIds: new Set(),
  lovedOnly: false,
  profileUsername: "",
  profileSaving: false,
  profileSaveTimer: null,
  libraryMeta: null,
  syncUserId: "",
  syncing: false,
  lastNeteaseExport: null,
  exportingToNetease: false,
  neteaseQrKey: "",
  neteaseQrTimer: null,
  neteaseLoginCookie: "",
  neteaseLoggedIn: false,
  queue: [],
  history: [],
  current: null,
  previous: null,
  currentMixPlan: null,
  activeMixTransition: null,
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
  setStatus("正在读取 3841 首基准曲库");
  let libraryLoaded = false;

  try {
    const library = await loadLibrary();
    libraryLoaded = true;
    state.libraryMeta = library;
    state.styleLabels = { ...STYLE_LABELS, ...(library.styleLabels || {}) };
    state.allTracks = (library.tracks || []).map(hydrateTrackTaxonomy);
    state.tracks = state.allTracks.filter(isFrontendPlayable);
    state.lovedIds = loadLovedIds();
    state.programOverrides = loadProgramOverrides();
    state.profileUsername = window.localStorage.getItem(PROFILE_USERNAME_STORAGE_KEY) || "";
    if (state.profileUsername) {
      elements.profileUsernameInput.value = state.profileUsername;
    }
    state.syncUserId = String(library.scope?.user_id || "");
    elements.syncUserIdInput.value = state.syncUserId;
    elements.syncProxyInput.value = window.localStorage.getItem(SYNC_PROXY_STORAGE_KEY) || "";
    elements.exportPlaylistNameInput.value = defaultExportPlaylistName();
    elements.exportApiInput.value = window.localStorage.getItem(NETEASE_EXPORT_API_STORAGE_KEY) || NETEASE_DEFAULT_EXPORT_API_BASE;
    state.lastNeteaseExport = loadLastNeteaseExport();
    renderExportRuntimeNote();
    updateLibraryCount();
    elements.statTracks.textContent = String(state.tracks.length);
    applyEntryModeMigration();
    buildFilters(library);
    restoreProgramState();
    if (hasPlaybackScope()) fillQueue(true);
    renderAll();
    maybeShowOnboardingGuide();
    if (state.profileUsername) {
      activateProfile(state.profileUsername, { restore: true });
    }
    if (hasPlaybackScope()) {
      setStatus("电台已就绪");
      window.setTimeout(() => playNext({ automatic: true, reason: "startup" }), 350);
    } else {
      setStatus("选择喜欢的风格后生成第一条播放列表");
    }
  } catch (error) {
    console.error("Echo Room FM initialization failed", error);
    setStatus(libraryLoaded ? "界面初始化失败" : "曲库加载失败");
    elements.trackTitle.textContent = libraryLoaded ? "曲库已读取，界面启动失败" : "曲库没有加载成功";
    elements.trackArtist.textContent = error?.message || String(error);
  }
}

async function loadLibrary() {
  if (window.RADIO_LIBRARY) return window.RADIO_LIBRARY;
  const response = await fetch("./library.json", { cache: "no-store" });
  if (!response.ok) throw new Error(`Library load failed: ${response.status}`);
  return response.json();
}

function isFrontendPlayable(track) {
  return track && track.playable !== false && track.hiddenFromRadio !== true;
}

function bindElements() {
  [
    "libraryCount",
    "onAirState",
    "statusLine",
    "openNeteaseBtn",
    "reloadBtn",
    "onboardingGuide",
    "onboardingStartBtn",
    "onboardingDismissBtn",
    "styleFilters",
    "facetTabs",
    "selectedFacetList",
    "channelName",
    "selectedStylesSummary",
    "autoProgramToggle",
    "programList",
    "programStatus",
    "programEditorPanel",
    "programEditorTitle",
    "programMinBpmInput",
    "programMaxBpmInput",
    "programVocalToggle",
    "programFacetTabs",
    "programTagEditor",
    "saveProgramBtn",
    "resetProgramBtn",
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
    "exportPanel",
    "exportSummaryText",
    "exportPlaylistNameInput",
    "exportApiInput",
    "exportDraftBtn",
    "copyTrackIdsBtn",
    "downloadExportBtn",
    "exportCreateBtn",
    "exportStatus",
    "exportPreview",
    "exportRuntimeNote",
    "uploadStatus",
    "importLoginStep",
    "importDraftStep",
    "importUploadStep",
    "checkNeteaseApiBtn",
    "neteaseQrLoginBtn",
    "checkNeteaseLoginBtn",
    "neteaseLoginStatus",
    "neteaseQrBox",
    "neteaseQrImage",
    "neteaseQrText",
    "loveCurrentBtn",
    "miniPlayer",
    "miniInfoBtn",
    "miniCoverArt",
    "miniFallbackCover",
    "miniTrackTitle",
    "miniTrackMeta",
    "miniLoveBtn",
    "miniPrevBtn",
    "miniPlayPauseBtn",
    "miniNextBtn",
    "miniProgressBar",
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
  elements.miniPrevBtn.addEventListener("click", playPrevious);
  elements.miniPlayPauseBtn.addEventListener("click", togglePlayPause);
  elements.miniLoveBtn.addEventListener("click", toggleLoveCurrent);
  elements.miniInfoBtn.addEventListener("click", scrollToNowPlaying);
  elements.gatePlayBtn.addEventListener("click", startFromGate);
  elements.onboardingStartBtn.addEventListener("click", startOnboardingSelection);
  elements.onboardingDismissBtn.addEventListener("click", dismissOnboardingGuide);
  elements.generateMixBtn.addEventListener("click", generateStyleSequence);
  elements.clearMixBtn.addEventListener("click", clearStyleMix);
  elements.autoProgramToggle.addEventListener("change", toggleAutoProgram);
  elements.programMinBpmInput.addEventListener("change", updateActiveProgramBpm);
  elements.programMaxBpmInput.addEventListener("change", updateActiveProgramBpm);
  elements.programVocalToggle.addEventListener("change", updateActiveProgramVocalPreference);
  elements.saveProgramBtn.addEventListener("click", saveActiveProgramPreset);
  elements.resetProgramBtn.addEventListener("click", resetActiveProgramPreset);
  elements.programFacetTabs.querySelectorAll("[data-program-facet]").forEach((button) => {
    button.addEventListener("click", () => switchProgramEditorFacet(button.dataset.programFacet));
  });
  elements.facetTabs.querySelectorAll("[data-facet]").forEach((button) => {
    button.addEventListener("click", () => switchFacet(button.dataset.facet));
  });
  elements.profileLoginBtn.addEventListener("click", () => activateProfile(elements.profileUsernameInput.value));
  elements.profileUsernameInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") activateProfile(elements.profileUsernameInput.value);
  });
  elements.profileLocalBtn.addEventListener("click", useLocalProfile);
  elements.syncNeteaseBtn.addEventListener("click", syncNeteaseLibrary);
  elements.syncProxyInput.addEventListener("change", () => {
    window.localStorage.setItem(SYNC_PROXY_STORAGE_KEY, elements.syncProxyInput.value.trim());
  });
  elements.exportApiInput.addEventListener("change", () => {
    elements.exportApiInput.value = getExportApiBase();
    window.localStorage.setItem(NETEASE_EXPORT_API_STORAGE_KEY, elements.exportApiInput.value);
    renderExportRuntimeNote();
  });
  elements.exportPlaylistNameInput.addEventListener("input", renderNeteaseExport);
  elements.checkNeteaseApiBtn.addEventListener("click", checkNeteaseApi);
  elements.neteaseQrLoginBtn.addEventListener("click", startNeteaseQrLogin);
  elements.checkNeteaseLoginBtn.addEventListener("click", () => checkNeteaseLoginStatus({ manual: true }));
  elements.exportDraftBtn.addEventListener("click", () => generateNeteaseExportDraft());
  elements.copyTrackIdsBtn.addEventListener("click", copyNeteaseExportIds);
  elements.downloadExportBtn.addEventListener("click", downloadNeteaseExportDraft);
  elements.exportCreateBtn.addEventListener("click", createNeteasePlaylistFromLoved);
  elements.loveCurrentBtn.addEventListener("click", toggleLoveCurrent);
  elements.lovedOnlyBtn.addEventListener("click", toggleLovedOnly);
  elements.reloadBtn.addEventListener("click", () => {
    if (!state.current && !hasPlaybackScope()) {
      setStatus("先选择 Genre / Mood / Context，再生成播放列表");
      maybeShowOnboardingGuide();
      return;
    }
    fillQueue(true);
    renderAll();
    setStatus("播放列表已按当前曲风组合重新生成");
  });
  elements.openNeteaseBtn.addEventListener("click", openCurrentInNetease);
  elements.mixToggle.addEventListener("change", () => {
    setStatus(elements.mixToggle.checked ? "DJ 平滑接歌已开启" : "DJ 平滑接歌已关闭");
    updateMixText(state.current, state.queue[0]);
  });
  elements.crossfadeSlider.addEventListener("input", () => {
    elements.crossfadeValue.textContent = getTransitionControlLabel();
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
  document.addEventListener("visibilitychange", handleVisibilityChange);
  elements.coverArt.addEventListener("error", () => {
    elements.albumStage.classList.add("no-cover");
    elements.coverArt.removeAttribute("src");
  });
  elements.miniCoverArt.addEventListener("error", () => {
    elements.miniPlayer.classList.add("no-cover");
    elements.miniCoverArt.removeAttribute("src");
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

function scrollToNowPlaying() {
  const target = document.querySelector(".now-panel");
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

function maybeShowOnboardingGuide() {
  if (!elements.onboardingGuide) return;
  const hasSeenGuide = readLocalPreference(ONBOARDING_STORAGE_KEY) === "1";
  const shouldShow = !hasSeenGuide && !hasPlaybackScope();
  elements.onboardingGuide.hidden = !shouldShow;
  document.body.classList.toggle("show-onboarding", shouldShow);
}

function markOnboardingComplete() {
  try {
    window.localStorage.setItem(ONBOARDING_STORAGE_KEY, "1");
  } catch (error) {
    console.warn("First-run guide preference is unavailable for this browser.", error);
  }
  if (elements.onboardingGuide) elements.onboardingGuide.hidden = true;
  document.body.classList.remove("show-onboarding");
}

function dismissOnboardingGuide() {
  markOnboardingComplete();
}

function startOnboardingSelection() {
  markOnboardingComplete();
  const target = document.querySelector(".music-control-section");
  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  elements.generateMixBtn.classList.add("guide-pulse");
  window.setTimeout(() => elements.generateMixBtn.classList.remove("guide-pulse"), 1800);
}

function hydrateTrackTaxonomy(track) {
  const taxonomy = normalizeTaxonomy(track.taxonomy || {});
  const lockedPrimaryGenres = uniqueStrings(track.primaryGenres || track.taxonomy?.primaryGenres || [])
    .filter((key) => TAXONOMY.genre.order.includes(key))
    .slice(0, 3);
  const lockGenres = lockedPrimaryGenres.length > 0;
  if (lockGenres) taxonomy.genre = lockedPrimaryGenres.slice();
  const text = searchableTrackText(track);

  (track.styleTags || []).forEach((tag) => {
    const mapped = STYLE_TO_TAXONOMY[tag];
    if (!mapped) return;
    if (!lockGenres) addMany(taxonomy.genre, mapped.genre);
    addMany(taxonomy.mood, mapped.mood);
    addMany(taxonomy.context, mapped.context);
  });

  Object.entries(KEYWORD_TAXONOMY_RULES).forEach(([dimension, rules]) => {
    if (dimension === "genre" && lockGenres) return;
    rules.forEach(([key, needles]) => {
      if (needles.some((needle) => keywordTaxonomyNeedleMatches(track, dimension, key, needle, text))) {
        addUnique(taxonomy[dimension], key);
      }
    });
  });

  applyArtistTaxonomy(track, taxonomy, { lockGenres });
  inferEnergyTaxonomy(track, taxonomy);
  inferEraTaxonomy(track, taxonomy, text);
  sortTaxonomy(taxonomy);
  if (lockGenres) taxonomy.genre = lockedPrimaryGenres.slice();
  return {
    ...track,
    taxonomy,
    primaryGenres: lockGenres ? lockedPrimaryGenres : uniqueStrings(taxonomy.genre).slice(0, 3),
  };
}

function normalizeTaxonomy(value) {
  return {
    genre: uniqueStrings(value.genre),
    mood: uniqueStrings(value.mood),
    context: uniqueStrings(value.context),
    era: uniqueStrings(value.era),
  };
}

function searchableTrackText(track) {
  return [
    track.name,
    ...(track.artists || []),
    track.album,
    ...(track.playlistNames || []),
    ...(track.onlineGenres || []),
    ...(track.onlineTags || []),
  ].filter(Boolean).join(" ").toLowerCase();
}

function keywordTaxonomyNeedleMatches(track, dimension, key, needle, text) {
  if (dimension === "genre" && key === "jazz") return jazzTaxonomyNeedleMatches(track, needle);
  return taxonomyNeedleMatches(text, needle);
}

function jazzTaxonomyNeedleMatches(track, needle) {
  const value = String(needle || "").trim().toLowerCase();
  if (!value) return false;
  const trustedGenreText = [
    ...(track.onlineGenres || []),
    ...(track.onlineTags || []),
  ].filter(Boolean).join(" ").toLowerCase().replace(/\bjazz[-\s]?hop\b/g, " ");

  if (value === "jazz") {
    return taxonomyNeedleMatches(trustedGenreText, "jazz");
  }

  const descriptiveText = [
    track.name,
    track.album,
    ...(track.playlistNames || []),
    trustedGenreText,
  ].filter(Boolean).join(" ").toLowerCase();
  return taxonomyNeedleMatches(descriptiveText, value);
}

function inferEnergyTaxonomy(track, taxonomy) {
  const bpm = Number(track.estimatedBpm);
  const energy = Number(track.energy);
  const genres = new Set(taxonomy.genre);
  if ((genres.has("house") || genres.has("techno") || genres.has("edm") || genres.has("nu_disco")) && bpm >= 118) {
    addUnique(taxonomy.context, "club");
  }
  if (Number.isFinite(bpm) && bpm >= 124 && Number.isFinite(energy) && energy >= 0.72) {
    addUnique(taxonomy.mood, "energetic");
  }
  if (Number.isFinite(energy) && energy <= 0.42) {
    addUnique(taxonomy.mood, "chill");
  }
  if ((genres.has("ambient") || genres.has("downtempo") || genres.has("lofi")) && !taxonomy.context.length) {
    addUnique(taxonomy.context, "focus");
  }
}

function applyArtistTaxonomy(track, taxonomy, options = {}) {
  const artists = (track.artists || []).map((artist) => String(artist || "").toLowerCase());
  if (!artists.length) return;
  ARTIST_TAXONOMY_RULES.forEach(([needles, mapping]) => {
    const matched = needles.some((needle) => artists.some((artist) => artistRuleMatches(artist, needle)));
    if (!matched) return;
    Object.entries(mapping).forEach(([dimension, values]) => {
      if (dimension === "genre" && options.lockGenres) return;
      addMany(taxonomy[dimension], values);
    });
  });
}

function artistRuleMatches(artist, needle) {
  const value = String(needle || "").toLowerCase();
  if (!value) return false;
  if (value.length <= 6) return artist === value;
  return artist === value || artist.includes(value);
}

function taxonomyNeedleMatches(text, needle) {
  const value = String(needle || "").trim().toLowerCase();
  if (!value) return false;
  if (/^[a-z0-9]+(?: [a-z0-9]+)*$/.test(value)) {
    const escaped = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`).test(text);
  }
  return text.includes(value);
}

function inferEraTaxonomy(track, taxonomy, text) {
  const candidates = [
    [/\b(70s|1970s|197[0-9]|seventies)\b/, "70s"],
    [/\b(80s|1980s|198[0-9]|eighties)\b/, "80s"],
    [/\b(90s|1990s|199[0-9]|nineties)\b/, "90s"],
  ];
  candidates.forEach(([pattern, key]) => {
    if (pattern.test(text)) addUnique(taxonomy.era, key);
  });
}

function addMany(target, values) {
  (values || []).forEach((value) => addUnique(target, value));
}

function addUnique(target, value) {
  const key = String(value || "").trim();
  if (key && !target.includes(key)) target.push(key);
}

function uniqueStrings(values) {
  const seen = new Set();
  const result = [];
  (Array.isArray(values) ? values : []).forEach((value) => {
    const key = String(value || "").trim();
    if (!key || seen.has(key)) return;
    seen.add(key);
    result.push(key);
  });
  return result;
}

function sortTaxonomy(taxonomy) {
  Object.keys(taxonomy).forEach((dimension) => {
    const order = TAXONOMY[dimension]?.order || [];
    taxonomy[dimension].sort((a, b) => {
      const ai = order.indexOf(a);
      const bi = order.indexOf(b);
      if (ai === -1 && bi === -1) return a.localeCompare(b);
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    });
  });
}

function buildFilters(library) {
  state.filterGroups = buildFacetFilters(library);
  state.filters = Object.values(state.filterGroups).flat();
  state.activeFacet = "genre";
  renderFacetTabs();
  renderFacetFilters();
  renderSelectedFacetList();
  syncFilterButtons();
}

function restoreProgramState() {
  const savedAuto = readLocalPreference(AUTO_PROGRAM_STORAGE_KEY);
  state.autoProgram = savedAuto === null ? false : savedAuto === "true";
  const savedProgramId = readLocalPreference(ACTIVE_PROGRAM_STORAGE_KEY) || "";
  const initialProgram = state.autoProgram
    ? getScheduledProgram()
    : getProgramById(savedProgramId);

  if (initialProgram) {
    state.activeProgramId = initialProgram.id;
    Object.values(state.selectedFacets).forEach((set) => set.clear());
  }
  elements.autoProgramToggle.checked = state.autoProgram;
  persistProgramState();
  startProgramClock();
}

function applyEntryModeMigration() {
  try {
    if (window.localStorage.getItem(ENTRY_MODE_STORAGE_KEY) === ENTRY_MODE_VERSION) return;
    window.localStorage.removeItem(AUTO_PROGRAM_STORAGE_KEY);
    window.localStorage.removeItem(ACTIVE_PROGRAM_STORAGE_KEY);
    window.localStorage.setItem(ENTRY_MODE_STORAGE_KEY, ENTRY_MODE_VERSION);
  } catch (error) {
    console.warn("Entry mode migration is unavailable for this browser.", error);
  }
}

function startProgramClock() {
  if (state.programTimer) window.clearInterval(state.programTimer);
  state.programTimer = window.setInterval(() => {
    if (!state.autoProgram) return;
    const scheduled = getScheduledProgram();
    if (!scheduled || scheduled.id === state.activeProgramId) {
      renderPrograms();
      return;
    }
    activateProgram(scheduled.id, { automatic: true, play: false });
  }, 60_000);
}

function toggleAutoProgram() {
  state.autoProgram = elements.autoProgramToggle.checked;
  if (state.autoProgram) {
    const scheduled = getScheduledProgram();
    if (scheduled) {
      activateProgram(scheduled.id, { automatic: true, play: false });
      setStatus(`自动时段已开启 · 当前为 ${scheduled.name}`);
      return;
    }
  }
  persistProgramState();
  renderAll();
  setStatus(state.autoProgram ? "自动时段已开启" : "自动时段已暂停，保留当前节目");
}

function activateProgram(programId, options = {}) {
  const program = getProgramById(programId);
  if (!program) return;
  markOnboardingComplete();
  if (!options.automatic) state.autoProgram = false;
  state.activeProgramId = program.id;
  state.lovedOnly = false;
  Object.values(state.selectedFacets).forEach((set) => set.clear());
  state.failedIds.clear();
  elements.autoProgramToggle.checked = state.autoProgram;
  persistProgramState();
  fillQueue(true);
  renderAll();
  setStatus(`${program.name} · ${program.bpmLabel} · 播放列表已生成`);
  if (options.play) playNext({ user: true, reason: "program", force: true });
}

function setCustomProgramMode() {
  state.activeProgramId = "";
  state.autoProgram = false;
  elements.autoProgramToggle.checked = false;
  persistProgramState();
}

function persistProgramState() {
  try {
    window.localStorage.setItem(AUTO_PROGRAM_STORAGE_KEY, String(state.autoProgram));
    if (state.activeProgramId) {
      window.localStorage.setItem(ACTIVE_PROGRAM_STORAGE_KEY, state.activeProgramId);
    } else {
      window.localStorage.removeItem(ACTIVE_PROGRAM_STORAGE_KEY);
    }
  } catch (error) {
    console.warn("Program preferences are unavailable for this local file.", error);
  }
}

function readLocalPreference(key) {
  try {
    return window.localStorage.getItem(key);
  } catch (error) {
    return null;
  }
}

function loadProgramOverrides() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(PROGRAM_OVERRIDES_STORAGE_KEY) || "{}");
    if (!parsed || typeof parsed !== "object") return {};
    return Object.entries(parsed).reduce((overrides, [programId, value]) => {
      const normalized = normalizeProgramOverride(value);
      if (normalized) overrides[programId] = normalized;
      return overrides;
    }, {});
  } catch (error) {
    return {};
  }
}

function persistProgramOverrides() {
  try {
    window.localStorage.setItem(PROGRAM_OVERRIDES_STORAGE_KEY, JSON.stringify(state.programOverrides));
  } catch (error) {
    console.warn("Program overrides are unavailable for this browser.", error);
  }
}

function normalizeProgramOverride(value) {
  if (!value || typeof value !== "object") return null;
  const override = {};
  if (Object.prototype.hasOwnProperty.call(value, "minBpm")) {
    const minBpm = Number(value.minBpm);
    if (Number.isFinite(minBpm)) override.minBpm = clamp(Math.round(minBpm), 40, 220);
  }
  if (Object.prototype.hasOwnProperty.call(value, "maxBpm")) {
    const maxBpm = value.maxBpm === null || value.maxBpm === "" || value.maxBpm === "Infinity"
      ? Infinity
      : Number(value.maxBpm);
    override.maxBpm = Number.isFinite(maxBpm) ? clamp(Math.round(maxBpm), 40, 220) : Infinity;
  }
  if (Object.prototype.hasOwnProperty.call(value, "vocalPreference")) {
    override.vocalPreference = Boolean(value.vocalPreference);
  }
  if (value.facets && typeof value.facets === "object") {
    override.facets = normalizeProgramFacets(value.facets);
  }
  if (Number.isFinite(override.minBpm) && Number.isFinite(override.maxBpm) && override.maxBpm < override.minBpm) {
    override.maxBpm = override.minBpm;
  }
  return override;
}

function normalizeProgramFacets(facets) {
  return ["genre", "mood", "context"].reduce((result, dimension) => {
    if (!Array.isArray(facets[dimension])) return result;
    const allowed = new Set(TAXONOMY[dimension]?.order || []);
    result[dimension] = uniqueStrings(facets[dimension]).filter((key) => allowed.has(key));
    return result;
  }, {});
}

function getProgramList() {
  return RADIO_PROGRAMS.map((program) => applyProgramOverride(program));
}

function getBaseProgramById(programId) {
  return RADIO_PROGRAMS.find((program) => program.id === programId) || null;
}

function getProgramById(programId) {
  const base = getBaseProgramById(programId);
  return base ? applyProgramOverride(base) : null;
}

function applyProgramOverride(program) {
  const override = normalizeProgramOverride(state.programOverrides[program.id]) || {};
  const merged = {
    ...program,
    ...override,
    facets: {
      genre: Object.prototype.hasOwnProperty.call(override.facets || {}, "genre")
        ? uniqueStrings(override.facets.genre)
        : uniqueStrings(program.facets.genre),
      mood: Object.prototype.hasOwnProperty.call(override.facets || {}, "mood")
        ? uniqueStrings(override.facets.mood)
        : uniqueStrings(program.facets.mood),
      context: Object.prototype.hasOwnProperty.call(override.facets || {}, "context")
        ? uniqueStrings(override.facets.context)
        : uniqueStrings(program.facets.context),
    },
  };
  merged.minBpm = Number.isFinite(Number(merged.minBpm)) ? Number(merged.minBpm) : 70;
  merged.maxBpm = Number.isFinite(Number(merged.maxBpm)) ? Number(merged.maxBpm) : Infinity;
  if (merged.maxBpm < merged.minBpm) merged.maxBpm = merged.minBpm;
  merged.bpmLabel = formatProgramBpm(merged);
  return merged;
}

function formatProgramBpm(program) {
  if (!Number.isFinite(program.maxBpm)) return `${Math.round(program.minBpm)}+ BPM`;
  return `${Math.round(program.minBpm)}–${Math.round(program.maxBpm)} BPM`;
}

function getActiveProgram() {
  return getProgramById(state.activeProgramId);
}

function getScheduledProgram(now = new Date()) {
  const hour = now.getHours();
  if (hour >= 10 && hour < 18) return getProgramById("day_cafe");
  if (hour >= 18 && hour < 21) return getProgramById("blue_hour");
  if (hour >= 21 && hour < 23) return getProgramById("cocktail");
  return getProgramById("after_hours");
}

function programFacetMatches(track, program) {
  return ["genre", "mood", "context"].filter((dimension) => {
    const accepted = program.facets[dimension] || [];
    return accepted.some((key) => facetValueMatches(track, dimension, key));
  });
}

function vocalAffinityScore(track) {
  const genres = new Set(getTrackFacetValues(track, "genre"));
  const text = searchableTrackText(track);
  let score = 0;

  ["pop", "rnb_soul", "funk_soul", "indie_rock", "rock", "hiphop_rap", "latin_world"].forEach((key) => {
    if (genres.has(key)) score += 2;
  });
  ["jazz", "nu_disco", "house", "deep_house", "indie_dance"].forEach((key) => {
    if (genres.has(key)) score += 1;
  });
  ["ambient", "lofi", "classical", "downtempo"].forEach((key) => {
    if (genres.has(key)) score -= 2;
  });

  if (/\b(vocal|feat\.?|ft\.?|featuring|with)\b/i.test(text)) score += 1;
  if (/\b(instrumental|ambient|sleep|study|meditation|piano solo)\b/i.test(text)) score -= 2;
  return score;
}

function programMatchesTrack(track, program) {
  const bpm = Number(track.estimatedBpm);
  if (!Number.isFinite(bpm) || bpm < program.minBpm || bpm > program.maxBpm) return false;
  if (!programAllowsTrackNoise(track, program)) return false;
  if (program.vocalPreference && vocalAffinityScore(track) < 1) return false;
  return programFacetMatches(track, program).length >= 2;
}

function programAllowsTrackNoise(track, program) {
  if (program?.noisePolicy === "allow_high") return true;
  const level = track?.barNoiseRisk?.level || "";
  return level !== "high";
}

function renderPrograms() {
  const activeProgram = getActiveProgram();
  elements.autoProgramToggle.checked = state.autoProgram;
  elements.programList.innerHTML = getProgramList().map((program) => {
    const active = program.id === state.activeProgramId;
    const count = state.tracks.filter((track) => programMatchesTrack(track, program)).length;
    const customized = Boolean(state.programOverrides[program.id]);
    return `
      <button
        type="button"
        class="program-button${active ? " active" : ""}${customized ? " customized" : ""}"
        data-program="${escapeHtml(program.id)}"
        aria-pressed="${String(active)}"
      >
        <strong>${escapeHtml(program.name)}</strong>
        <small>${escapeHtml(program.schedule)} · ${escapeHtml(program.bpmLabel)}${program.vocalPreference ? " · vocal" : ""}</small>
        <em>${count}</em>
      </button>
    `;
  }).join("");
  elements.programList.querySelectorAll("[data-program]").forEach((button) => {
    button.addEventListener("click", () => activateProgram(button.dataset.program, { play: true }));
  });

  if (!activeProgram) {
    elements.programStatus.textContent = "STYLE MIX · 自由选择风格";
    renderProgramEditor(null);
    return;
  }
  const prefix = state.autoProgram ? "AUTO" : "MANUAL";
  const vocal = activeProgram.vocalPreference ? " · vocal-friendly" : "";
  elements.programStatus.textContent = `${prefix} · ${activeProgram.name} · ${activeProgram.bpmLabel}${vocal}`;
  renderProgramEditor(activeProgram);
}

function renderProgramEditor(program = getActiveProgram()) {
  if (!elements.programEditorPanel) return;
  const active = program || getActiveProgram();
  elements.programEditorPanel.hidden = !active;
  if (!active) return;

  const customized = Boolean(state.programOverrides[active.id]);
  elements.programEditorTitle.textContent = `${active.name}${customized ? " *" : ""}`;
  elements.programMinBpmInput.value = Math.round(active.minBpm);
  elements.programMaxBpmInput.value = Number.isFinite(active.maxBpm) ? Math.round(active.maxBpm) : "";
  elements.programVocalToggle.checked = Boolean(active.vocalPreference);

  elements.programFacetTabs.querySelectorAll("[data-program-facet]").forEach((button) => {
    const isActive = button.dataset.programFacet === state.activeProgramEditorFacet;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  const dimension = state.activeProgramEditorFacet;
  const selected = new Set(active.facets[dimension] || []);
  const filters = state.filterGroups[dimension] || [];
  elements.programTagEditor.innerHTML = filters.map((filter) => `
    <button
      type="button"
      class="program-tag-chip${selected.has(filter.key) ? " active" : ""}"
      data-program-tag="${escapeHtml(filter.key)}"
      aria-pressed="${String(selected.has(filter.key))}"
    >
      <span>${escapeHtml(filter.label)}</span>
      <em>${filter.count}</em>
    </button>
  `).join("");
  elements.programTagEditor.querySelectorAll("[data-program-tag]").forEach((button) => {
    button.addEventListener("click", () => toggleActiveProgramFacet(dimension, button.dataset.programTag));
  });
}

function switchProgramEditorFacet(dimension) {
  if (!TAXONOMY[dimension] || dimension === "era") return;
  state.activeProgramEditorFacet = dimension;
  renderProgramEditor();
}

function toggleActiveProgramFacet(dimension, key) {
  const program = getActiveProgram();
  if (!program || !program.facets[dimension]) return;
  const next = cloneProgramConfig(program);
  const values = new Set(next.facets[dimension]);
  if (values.has(key)) {
    values.delete(key);
  } else {
    values.add(key);
  }
  next.facets[dimension] = Array.from(values);
  applyProgramConfig(next, `${program.name} · ${getFacetLabel(dimension, key)} 已更新`);
}

function updateActiveProgramBpm() {
  const program = getActiveProgram();
  if (!program) return;
  const next = cloneProgramConfig(program);
  const minBpm = clamp(Math.round(Number(elements.programMinBpmInput.value) || program.minBpm), 40, 220);
  const rawMax = String(elements.programMaxBpmInput.value || "").trim();
  const maxBpm = rawMax ? clamp(Math.round(Number(rawMax) || program.maxBpm), 40, 220) : Infinity;
  next.minBpm = minBpm;
  next.maxBpm = Number.isFinite(maxBpm) ? Math.max(minBpm, maxBpm) : Infinity;
  applyProgramConfig(next, `${program.name} · BPM 已更新`);
}

function updateActiveProgramVocalPreference() {
  const program = getActiveProgram();
  if (!program) return;
  const next = cloneProgramConfig(program);
  next.vocalPreference = elements.programVocalToggle.checked;
  applyProgramConfig(next, `${program.name} · ${next.vocalPreference ? "已开启人声优先" : "已关闭人声优先"}`);
}

function saveActiveProgramPreset() {
  const program = getActiveProgram();
  if (!program) return;
  writeProgramOverride(program);
  persistProgramOverrides();
  renderAll();
  setStatus(`${program.name} 预设已保存`);
}

function resetActiveProgramPreset() {
  const program = getActiveProgram();
  if (!program) return;
  delete state.programOverrides[program.id];
  persistProgramOverrides();
  state.failedIds.clear();
  fillQueue(true);
  renderAll();
  setStatus(`${program.name} 已恢复默认预设`);
}

function applyProgramConfig(program, statusText) {
  writeProgramOverride(program);
  persistProgramOverrides();
  state.failedIds.clear();
  fillQueue(true);
  renderAll();
  setStatus(statusText);
}

function writeProgramOverride(program) {
  state.programOverrides[program.id] = {
    minBpm: Math.round(program.minBpm),
    maxBpm: Number.isFinite(program.maxBpm) ? Math.round(program.maxBpm) : null,
    vocalPreference: Boolean(program.vocalPreference),
    facets: normalizeProgramFacets(program.facets),
  };
}

function cloneProgramConfig(program) {
  return {
    ...program,
    facets: {
      genre: uniqueStrings(program.facets.genre),
      mood: uniqueStrings(program.facets.mood),
      context: uniqueStrings(program.facets.context),
    },
  };
}

function buildFacetFilters() {
  return Object.keys(TAXONOMY).reduce((groups, dimension) => {
    if (dimension === "era") return groups;
    const counts = new Map();
    if (dimension === "genre") {
      const knownKeys = new Set(TAXONOMY.genre.order || []);
      (TAXONOMY.genre.order || []).forEach((key) => {
        const count = state.tracks.filter((track) => facetValueMatches(track, "genre", key)).length;
        if (count > 0) counts.set(key, count);
      });
      state.tracks.forEach((track) => {
        getTrackFacetValues(track, "genre").forEach((key) => {
          if (!knownKeys.has(key)) counts.set(key, (counts.get(key) || 0) + 1);
        });
      });
    } else {
      state.tracks.forEach((track) => {
        (getTrackFacetValues(track, dimension) || []).forEach((key) => {
          counts.set(key, (counts.get(key) || 0) + 1);
        });
      });
    }
    const order = TAXONOMY[dimension].order || [];
    groups[dimension] = Array.from(counts.entries())
      .map(([key, count]) => ({
        dimension,
        key,
        count,
        label: getFacetLabel(dimension, key),
      }))
      .sort((a, b) => {
        const ai = order.indexOf(a.key);
        const bi = order.indexOf(b.key);
        if (ai !== -1 || bi !== -1) {
          if (ai === -1) return 1;
          if (bi === -1) return -1;
          return ai - bi;
        }
        return b.count - a.count || a.label.localeCompare(b.label);
      });
    return groups;
  }, {});
}

function renderFacetTabs() {
  elements.facetTabs.querySelectorAll("[data-facet]").forEach((button) => {
    const active = button.dataset.facet === state.activeFacet;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
}

function renderFacetFilters() {
  const filters = state.filterGroups[state.activeFacet] || [];
  elements.styleFilters.innerHTML = "";
  filters.forEach((filter) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "filter-chip";
    button.dataset.facet = filter.dimension;
    button.dataset.filter = filter.key;
    button.setAttribute("aria-pressed", "false");
    button.innerHTML = `<span>${escapeHtml(filter.label)}</span><span>${filter.count}</span>`;
    button.addEventListener("click", () => toggleFacetFilter(filter.dimension, filter.key));
    elements.styleFilters.appendChild(button);
  });
}

function renderSelectedFacetList() {
  const selected = getSelectedFacetPairs();
  elements.selectedFacetList.classList.toggle("has-selections", selected.length > 0);
  elements.selectedFacetList.classList.toggle("many-selections", selected.length > 4);
  if (!selected.length) {
    elements.selectedFacetList.innerHTML = getActiveProgram()
      ? `<span class="empty-selected">由节目预设控制</span>`
      : `<span class="empty-selected">选择标签生成播放列表</span>`;
    return;
  }
  elements.selectedFacetList.innerHTML = selected.map(({ dimension, key }) => `
    <button type="button" class="selected-facet" data-facet="${escapeHtml(dimension)}" data-filter="${escapeHtml(key)}">
      <span>${escapeHtml(TAXONOMY[dimension].title)}</span>
      <strong>${escapeHtml(getFacetLabel(dimension, key))}</strong>
    </button>
  `).join("");
  elements.selectedFacetList.querySelectorAll(".selected-facet").forEach((button) => {
    button.addEventListener("click", () => toggleFacetFilter(button.dataset.facet, button.dataset.filter));
  });
}

function switchFacet(dimension) {
  if (!TAXONOMY[dimension] || dimension === state.activeFacet) return;
  state.activeFacet = dimension;
  renderFacetTabs();
  renderFacetFilters();
  syncFilterButtons();
}

function toggleFacetFilter(dimension, key) {
  if (!state.selectedFacets[dimension]) return;
  setCustomProgramMode();
  state.lovedOnly = false;
  if (state.selectedFacets[dimension].has(key)) {
    state.selectedFacets[dimension].delete(key);
  } else {
    state.selectedFacets[dimension].add(key);
  }
  state.failedIds.clear();
  const currentIsOutOfScope = state.current && hasPlaybackScope() && !trackMatchesPlaybackScope(state.current);
  if (hasPlaybackScope()) {
    fillQueue(true);
  } else {
    state.queue = [];
  }
  renderAll();
  if (currentIsOutOfScope) {
    setStatus(`已选择 ${getMixLabel()}，正在切换到匹配歌曲`);
    playNext({ user: state.userStarted, reason: "scope-change", force: true });
    return;
  }
  setStatus(hasPlaybackScope() ? `已选择 ${getMixLabel()}` : "已取消全部标签");
}

function clearStyleMix() {
  setCustomProgramMode();
  Object.values(state.selectedFacets).forEach((set) => set.clear());
  state.failedIds.clear();
  state.queue = [];
  renderAll();
  setStatus("已清空曲风选择");
}

function generateStyleSequence() {
  if (!hasPlaybackScope()) {
    setStatus("先选择一个或多个风格标签");
    maybeShowOnboardingGuide();
    return;
  }
  markOnboardingComplete();
  state.lovedOnly = false;
  if (!state.activeProgramId) persistProgramState();
  state.failedIds.clear();
  fillQueue(true);
  renderAll();
  setStatus(`已按 ${getMixLabel()} 生成播放列表`);
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

async function fetchJson(url, options = {}) {
  const response = await fetch(url, {
    method: options.method || "GET",
    cache: "no-store",
    credentials: options.credentials || "omit",
    headers: options.headers,
    body: options.body,
  });
  if (!response.ok) {
    const detail = await readErrorResponse(response);
    throw new Error(detail || `HTTP ${response.status}`);
  }
  return response.json();
}

async function readErrorResponse(response) {
  try {
    const text = await response.text();
    if (!text) return "";
    try {
      const payload = JSON.parse(text);
      return payload.message || payload.msg || payload.error || `HTTP ${response.status}`;
    } catch (error) {
      return text.slice(0, 160);
    }
  } catch (error) {
    return "";
  }
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
  const trackMap = new Map(state.allTracks.map((track) => [trackId(track), track]));
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
    state.allTracks.push(track);
    if (isFrontendPlayable(track)) state.tracks.push(track);
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
  track.taxonomy = hydrateTrackTaxonomy(track).taxonomy;
}

function normalizeSyncedTrack(song, playlist) {
  const album = song.al || song.album || {};
  const artists = song.ar || song.artists || [];
  const styleTags = inferStyleTagsFromText(`${playlist.name} ${song.name || ""}`);
  const track = {
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
  return hydrateTrackTaxonomy(track);
}

function inferStyleTagsFromText(value) {
  const text = String(value || "").toLowerCase();
  const tags = [];
  const add = (tag, needles) => {
    if (needles.some((needle) => taxonomyNeedleMatches(text, needle)) && !tags.includes(tag)) tags.push(tag);
  };
  add("chill_downtempo", ["chill", "downtempo", "lounge", "morning", "早场", "夜间", "sleep", "ambient"]);
  add("house", ["house", "garage"]);
  add("deep_house", ["deep house"]);
  add("progressive_house", ["progressive house", "progressive"]);
  add("tech_house", ["tech house"]);
  add("melodic_house", ["melodic house", "melodic"]);
  add("afro_melodic", ["afro", "organic"]);
  add("disco_nu_disco", ["disco", "nu-disco", "nu disco", "funk"]);
  add("edm", ["edm", "dance", "electro"]);
  add("techno", ["techno"]);
  add("minimal", ["minimal", "boris"]);
  add("rock", ["indie rock", "classic rock", "rock", "punk", "oasis", "beatles"]);
  add("retro_synth", ["synth", "retro", "wave", "80s", "1980"]);
  add("hiphop_jazzhop", ["hip hop", "hip-hop", "rap", "jazz hop", "jazz-hop"]);
  add("rnb_soul", ["r&b", "rnb", "soul"]);
  add("jazz", ["jazz"]);
  add("pop", ["pop", "流行"]);
  add("classical", ["classical", "piano", "钢琴"]);
  add("world_latin", ["latin", "world", "bossa", "samba"]);
  add("holiday", ["christmas", "xmas", "holiday", "圣诞", "nye"]);
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
  const total = Number(state.libraryMeta?.trackCount || state.allTracks.length || state.tracks.length);
  const playable = state.tracks.length;
  const blocked = Number(state.libraryMeta?.blockedTrackCount || Math.max(0, total - playable));
  elements.libraryCount.textContent = blocked
    ? `${playable} playable tracks · ${total} archived`
    : `${playable} tracks from your archive`;
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

async function checkNeteaseApi() {
  const apiBase = getExportApiBase();
  if (!apiBase) return;
  if (!isAllowedLocalApiBase(apiBase)) {
    setNeteaseLoginStatus("真实导入只允许本机 API 地址，避免把登录态和红心列表发到外部。");
    return;
  }

  setNeteaseLoginStatus("正在检测本机助手...");
  try {
    await requestLocalNetease(apiBase, "/login/status");
    setNeteaseLoginStatus(`本机助手已连接。下一步扫码登录。`);
  } catch (error) {
    setNeteaseLoginStatus(`没有连上本机助手：${error.message}。请先运行 npm run netease:api。`);
  }
}

async function startNeteaseQrLogin() {
  const apiBase = getExportApiBase();
  if (!apiBase || !isAllowedLocalApiBase(apiBase)) {
    setNeteaseLoginStatus("请先填写本机助手地址，例如 http://127.0.0.1:3000。");
    return;
  }

  stopNeteaseQrPolling();
  state.neteaseQrKey = "";
  state.neteaseLoginCookie = "";
  state.neteaseLoggedIn = false;
  elements.neteaseQrBox.hidden = false;
  elements.neteaseQrImage.removeAttribute("src");
  elements.neteaseQrText.textContent = "正在向本机 API 申请二维码...";
  setNeteaseLoginStatus("正在生成登录二维码...");

  try {
    const keyPayload = await requestLocalNetease(apiBase, "/login/qr/key");
    const key = String(keyPayload.data?.unikey || keyPayload.unikey || "");
    if (!key) throw new Error("二维码 key 为空");
    state.neteaseQrKey = key;

    const qrPayload = await requestLocalNetease(apiBase, "/login/qr/create", {
      key,
      qrimg: "true",
    });
    const qrImage = qrPayload.data?.qrimg || qrPayload.qrimg || "";
    const qrUrl = qrPayload.data?.qrurl || qrPayload.qrurl || "";
    if (qrImage) {
      elements.neteaseQrImage.src = qrImage;
    } else if (qrUrl) {
      elements.neteaseQrText.textContent = qrUrl;
    } else {
      throw new Error("二维码图片为空");
    }

    elements.neteaseQrText.textContent = "扫码后在手机上确认登录。";
    setNeteaseLoginStatus("等待网易云 App 扫码确认...");
    state.neteaseQrTimer = window.setInterval(() => checkNeteaseQrStatus({ silent: true }), 2400);
  } catch (error) {
    elements.neteaseQrBox.hidden = true;
    setNeteaseLoginStatus(`二维码登录失败：${error.message}。`);
  }
}

async function checkNeteaseQrStatus(options = {}) {
  const apiBase = getExportApiBase();
  if (!state.neteaseQrKey) {
    if (!options.silent) setNeteaseLoginStatus("还没有登录二维码，请先点击扫码登录。");
    return;
  }

  try {
    const payload = await requestLocalNetease(apiBase, "/login/qr/check", {
      key: state.neteaseQrKey,
    });
    const code = Number(payload.code || payload.data?.code || 0);
    if (code === 800) {
      stopNeteaseQrPolling();
      setNeteaseLoginStatus("二维码已过期，请重新扫码登录。");
      elements.neteaseQrText.textContent = "二维码已过期。";
      return;
    }
    if (code === 801) {
      if (!options.silent) setNeteaseLoginStatus("等待扫码...");
      return;
    }
    if (code === 802) {
      setNeteaseLoginStatus("已扫码，请在手机上确认登录。");
      elements.neteaseQrText.textContent = "已扫码，等待手机确认。";
      return;
    }
    if (code === 803) {
      stopNeteaseQrPolling();
      state.neteaseLoginCookie = String(payload.cookie || payload.data?.cookie || "");
      state.neteaseLoggedIn = true;
      elements.neteaseQrBox.hidden = true;
      setNeteaseLoginStatus("扫码登录成功，正在读取账号状态...");
      await checkNeteaseLoginStatus({ manual: false });
      return;
    }
    if (!options.silent) {
      setNeteaseLoginStatus(payload.message || payload.msg || `二维码状态：${code || "unknown"}`);
    }
  } catch (error) {
    if (!options.silent) setNeteaseLoginStatus(`二维码状态读取失败：${error.message}。`);
  }
}

async function checkNeteaseLoginStatus(options = {}) {
  const apiBase = getExportApiBase();
  if (!apiBase || !isAllowedLocalApiBase(apiBase)) {
    setNeteaseLoginStatus("请先填写本机助手地址，例如 http://127.0.0.1:3000。");
    return false;
  }

  if (options.manual) setNeteaseLoginStatus("正在读取网易云登录状态...");
  try {
    const payload = await requestLocalNetease(apiBase, "/login/status");
    const profile = extractNeteaseProfile(payload);
    if (profile) {
      state.neteaseLoggedIn = true;
      setNeteaseLoginStatus(`已登录网易云：${profile.nickname || profile.userId || "当前账号"}。`);
      renderNeteaseExport();
      return true;
    }
    if (state.neteaseLoginCookie) {
      state.neteaseLoggedIn = true;
      setNeteaseLoginStatus("已完成扫码授权，可以生成草稿。");
      renderNeteaseExport();
      return true;
    }
    state.neteaseLoggedIn = false;
    setNeteaseLoginStatus("尚未登录网易云，请先扫码登录。");
    renderNeteaseExport();
    return false;
  } catch (error) {
    state.neteaseLoggedIn = false;
    setNeteaseLoginStatus(`登录状态读取失败：${error.message}。`);
    renderNeteaseExport();
    return false;
  }
}

function stopNeteaseQrPolling() {
  if (state.neteaseQrTimer) {
    window.clearInterval(state.neteaseQrTimer);
    state.neteaseQrTimer = null;
  }
}

function generateNeteaseExportDraft(options = {}) {
  const lovedTracks = getLovedTracks();
  const trackIds = lovedTracks.map(trackId);

  if (!trackIds.length) {
    setExportStatus("还没有红心歌曲，先给喜欢的歌点红心。");
    return null;
  }

  const playlistName = currentExportPlaylistName();
  elements.exportPlaylistNameInput.value = playlistName;
  const draft = {
    version: 1,
    generatedAt: new Date().toISOString(),
    source: "Echo Room FM local loved export",
    profileUsername: state.profileUsername || "",
    playlistName,
    lovedSignature: getLovedSignature(),
    trackCount: trackIds.length,
    knownTrackCount: lovedTracks.length,
    unknownTrackCount: 0,
    trackIds,
    tracks: lovedTracks.map((track, index) => formatTrackForExport(track, index + 1)),
  };

  state.lastNeteaseExport = draft;
  saveLastNeteaseExport(draft);
  renderNeteaseExport();
  if (!options.silent) {
    setExportStatus(`已生成草稿：${draft.trackCount} 首，歌单名「${draft.playlistName}」。`);
    setStatus("红心歌单草稿已生成");
  }
  return draft;
}

async function copyNeteaseExportIds() {
  const draft = ensureNeteaseExportDraft();
  if (!draft) return;
  const text = draft.trackIds.join(",");
  try {
    await copyText(text);
    setExportStatus(`已复制 ${draft.trackCount} 个网易云歌曲 ID。`);
    setStatus("网易云歌曲 ID 已复制");
  } catch (error) {
    setExportStatus("复制失败，浏览器没有开放剪贴板权限。");
  }
}

function downloadNeteaseExportDraft() {
  const draft = ensureNeteaseExportDraft();
  if (!draft) return;
  const blob = new Blob([JSON.stringify(draft, null, 2)], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${safeFileName(draft.playlistName)}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  setExportStatus("草稿 JSON 已下载到浏览器下载目录。");
}

async function createNeteasePlaylistFromLoved() {
  if (state.exportingToNetease) return;
  const draft = ensureNeteaseExportDraft();
  if (!draft) return;

  const apiBase = getExportApiBase();
  if (!apiBase) {
    setExportStatus("请先填写本机网易云 API，例如 http://127.0.0.1:3000。");
    elements.exportPanel.open = true;
    return;
  }
  if (!isAllowedLocalApiBase(apiBase)) {
    setExportStatus("真实导入只允许 localhost、127.0.0.1 或 ::1，避免把红心数据发到外部。");
    return;
  }

  const loggedIn = state.neteaseLoggedIn || await checkNeteaseLoginStatus({ manual: false });
  if (!loggedIn) {
    setExportStatus("请先在 NETEASE OUT 区域扫码登录网易云。");
    return;
  }

  const ok = window.confirm(
    `将通过本机 API ${apiBase}，在已登录的网易云账号中创建歌单「${draft.playlistName}」，并添加 ${draft.trackCount} 首红心歌曲。继续吗？`
  );
  if (!ok) {
    setExportStatus("已取消写入，草稿仍保留在本机。");
    return;
  }

  state.exportingToNetease = true;
  elements.exportCreateBtn.disabled = true;
  elements.exportCreateBtn.textContent = "上传中";
  setUploadStatus("正在创建网易云歌单...");

  try {
    const created = await requestLocalNeteaseWrite(apiBase, "/playlist/create", {
      name: draft.playlistName,
      privacy: "0",
    });
    assertNeteaseApiSuccess(created, "创建歌单");
    const playlistId = extractCreatedPlaylistId(created);
    if (!playlistId) throw new Error("创建接口没有返回歌单 ID");

    const chunks = chunkArray(draft.trackIds, NETEASE_EXPORT_CHUNK_SIZE);
    for (let index = 0; index < chunks.length; index += 1) {
      setUploadStatus(`歌单已创建，正在上传歌曲 ${index + 1}/${chunks.length}...`);
      const added = await requestLocalNeteaseWrite(apiBase, "/playlist/tracks", {
        op: "add",
        pid: playlistId,
        tracks: chunks[index].join(","),
      });
      assertNeteaseApiSuccess(added, "添加歌曲");
    }

    setExportStatus(`已写入网易云歌单：${draft.playlistName}（ID ${playlistId}）。`);
    setUploadStatus(`上传完成：网易云歌单 ID ${playlistId}。`);
    setStatus("红心歌单已写入网易云");
  } catch (error) {
    setExportStatus(`写入失败：${error.message}。草稿已保留，可先复制 ID 或下载 JSON。`);
    setUploadStatus("上传失败，可以重新扫码或稍后再试。");
    setStatus("网易云写入失败");
  } finally {
    state.exportingToNetease = false;
    elements.exportCreateBtn.disabled = false;
    elements.exportCreateBtn.textContent = "确认上传";
    updateImportFlowState();
  }
}

function renderNeteaseExport() {
  if (!elements.exportPanel) return;
  const lovedCount = getLovedTracks().length;
  const draft = isCurrentNeteaseDraft(state.lastNeteaseExport) ? state.lastNeteaseExport : null;
  elements.exportSummaryText.textContent = lovedCount ? `${lovedCount} 首待导出` : "暂无红心";
  [elements.exportDraftBtn, elements.copyTrackIdsBtn, elements.downloadExportBtn, elements.exportCreateBtn].forEach((button) => {
    button.disabled = lovedCount === 0;
  });

  if (!lovedCount) {
    elements.exportPreview.innerHTML = "";
    setExportStatus("先给歌曲点红心，再生成可导入网易云的歌单草稿。");
    setUploadStatus("红心列表为空，暂时不能上传。");
    updateImportFlowState();
    return;
  }

  if (!draft) {
    elements.exportPreview.innerHTML = "";
    setExportStatus(`当前有 ${lovedCount} 首红心，点击生成草稿。`);
    setUploadStatus("生成草稿后，再确认上传到网易云。");
    updateImportFlowState();
    return;
  }

  setExportStatus(`已生成草稿：${draft.trackCount} 首，歌单名「${draft.playlistName}」。`);
  setUploadStatus(
    state.neteaseLoggedIn
      ? `准备创建「${draft.playlistName}」，共 ${draft.trackCount} 首。`
      : "草稿已准备好，扫码登录后即可上传。"
  );
  const previewRows = draft.tracks.slice(0, 5).map((track) => `
    <div class="export-preview-row">
      <strong>${escapeHtml(track.name || track.id)}</strong>
      <span>${escapeHtml((track.artists || []).join(" / ") || "Unknown Artist")}</span>
    </div>
  `).join("");
  const moreText = draft.trackCount > 5 ? `<em>还有 ${draft.trackCount - 5} 首会一起导出</em>` : "";
  const unknownText = draft.unknownTrackCount
    ? `<em>${draft.unknownTrackCount} 个 ID 暂时只有编号，没有本地曲目信息</em>`
    : "";
  elements.exportPreview.innerHTML = `
    <div class="export-preview-head">
      <strong>${escapeHtml(draft.playlistName)}</strong>
      <span>${draft.trackCount} tracks</span>
    </div>
    ${previewRows}
    ${moreText}
    ${unknownText}
  `;
  updateImportFlowState();
}

function ensureNeteaseExportDraft() {
  if (isCurrentNeteaseDraft(state.lastNeteaseExport)) return state.lastNeteaseExport;
  return generateNeteaseExportDraft({ silent: true });
}

function isCurrentNeteaseDraft(draft) {
  const lovedTracks = getLovedTracks();
  return Boolean(
    draft
    && draft.lovedSignature === getLovedSignature()
    && draft.trackCount === lovedTracks.length
    && draft.playlistName === currentExportPlaylistName()
  );
}

function getLovedSignature() {
  return getLovedTracks().map(trackId).filter(Boolean).join("|");
}

function formatTrackForExport(track, position) {
  return {
    position,
    id: trackId(track),
    name: track.name || "",
    artists: track.artists || [],
    album: track.album || "",
    durationMs: Number.isFinite(track.durationMs) ? track.durationMs : null,
    styleLabels: track.styleLabels || [],
    bpm: track.estimatedBpm || null,
    neteaseUrl: neteaseSongUrl(trackId(track)),
  };
}

function loadLastNeteaseExport() {
  try {
    const raw = window.localStorage.getItem(NETEASE_EXPORT_DRAFT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && Array.isArray(parsed.trackIds) ? parsed : null;
  } catch (error) {
    return null;
  }
}

function saveLastNeteaseExport(draft) {
  try {
    window.localStorage.setItem(NETEASE_EXPORT_DRAFT_STORAGE_KEY, JSON.stringify(draft));
  } catch (error) {
    setExportStatus("草稿已生成，但浏览器本地存储空间不足，无法长期保留。");
  }
}

function setExportStatus(text) {
  elements.exportStatus.textContent = text;
}

function setUploadStatus(text) {
  elements.uploadStatus.textContent = text;
}

function setNeteaseLoginStatus(text) {
  elements.neteaseLoginStatus.textContent = text;
  updateImportFlowState();
}

function renderExportRuntimeNote() {
  if (!elements.exportRuntimeNote) return;
  const apiBase = getExportApiBase();
  const pageMode = window.location.protocol === "https:" ? "Netlify 云端页面" : "本地页面";
  elements.exportRuntimeNote.textContent = `${pageMode}会连接这台设备上的本机助手：${apiBase}`;
}

function updateImportFlowState() {
  if (!elements.importLoginStep) return;
  const hasLoved = getLovedTracks().length > 0;
  const hasDraft = isCurrentNeteaseDraft(state.lastNeteaseExport);
  const canUpload = hasLoved && hasDraft && state.neteaseLoggedIn;
  elements.importLoginStep.classList.toggle("done", state.neteaseLoggedIn);
  elements.importLoginStep.classList.toggle("active", !state.neteaseLoggedIn);
  elements.importDraftStep.classList.toggle("done", hasDraft);
  elements.importDraftStep.classList.toggle("active", state.neteaseLoggedIn && !hasDraft);
  elements.importDraftStep.classList.toggle("disabled", !hasLoved);
  elements.importUploadStep.classList.toggle("active", canUpload);
  elements.importUploadStep.classList.toggle("disabled", !canUpload);
  elements.exportCreateBtn.disabled = !canUpload || state.exportingToNetease;
  elements.exportDraftBtn.disabled = !hasLoved;
  elements.copyTrackIdsBtn.disabled = !hasDraft;
  elements.downloadExportBtn.disabled = !hasDraft;
}

function defaultExportPlaylistName() {
  const date = new Date().toISOString().slice(0, 10);
  return `Echo Room FM 红心 ${date}`;
}

function currentExportPlaylistName() {
  return cleanPlaylistName(elements.exportPlaylistNameInput.value) || defaultExportPlaylistName();
}

function cleanPlaylistName(value) {
  return String(value || "").trim().replace(/\s+/g, " ").slice(0, 40);
}

function safeFileName(value) {
  return cleanPlaylistName(value).replace(/[^\w.-]+/g, "_").replace(/^_+|_+$/g, "") || "echo_room_fm_loved";
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const input = document.createElement("textarea");
  input.value = text;
  input.setAttribute("readonly", "");
  input.style.position = "fixed";
  input.style.left = "-9999px";
  document.body.appendChild(input);
  input.select();
  const copied = document.execCommand("copy");
  input.remove();
  if (!copied) throw new Error("copy failed");
}

function normalizeExportApiBase(value) {
  const raw = String(value || "").trim().replace(/\/$/, "");
  if (!raw) return "";
  try {
    const url = new URL(raw);
    if (url.hostname === "localhost") {
      url.hostname = "127.0.0.1";
      return url.toString().replace(/\/$/, "");
    }
  } catch (error) {
    return raw;
  }
  return raw;
}

function getExportApiBase() {
  const normalized = normalizeExportApiBase(elements.exportApiInput.value || NETEASE_DEFAULT_EXPORT_API_BASE);
  if (elements.exportApiInput.value !== normalized) elements.exportApiInput.value = normalized;
  try {
    window.localStorage.setItem(NETEASE_EXPORT_API_STORAGE_KEY, normalized);
  } catch (error) {
    // Ignore storage restrictions; the current input value is still usable.
  }
  return normalized;
}

function isAllowedLocalApiBase(value) {
  try {
    const url = new URL(value);
    return ["localhost", "127.0.0.1", "0.0.0.0", "::1", "[::1]"].includes(url.hostname);
  } catch (error) {
    return false;
  }
}

async function requestLocalNeteaseWrite(apiBase, route, params) {
  return requestLocalNetease(apiBase, route, params, { method: "POST", withLoginCookie: true });
}

async function requestLocalNetease(apiBase, route, params = {}, options = {}) {
  const query = new URLSearchParams({ ...params, timestamp: Date.now() });
  if (options.withLoginCookie && state.neteaseLoginCookie) {
    query.set("cookie", state.neteaseLoginCookie);
  }
  try {
    return await fetchJson(`${apiBase}${route}?${query}`, {
      method: options.method || "GET",
      credentials: "include",
    });
  } catch (error) {
    throw new Error(describeLocalNeteaseError(error, apiBase));
  }
}

function describeLocalNeteaseError(error, apiBase) {
  const message = String(error?.message || error || "未知错误");
  if (/failed to fetch|networkerror|load failed/i.test(message)) {
    return `没有连上本机助手（${apiBase}）。请在当前打开网页的这台电脑上运行 npm run netease:api，并保持终端窗口打开；如果是在手机或另一台电脑上打开网页，127.0.0.1 指向的是那台设备，不能连接这台电脑的助手`;
  }
  if (/econnrefused|fetch failed|socket|connection|502/i.test(message)) {
    return `本机助手已启动但网易云接口还没准备好：${message}。请等终端显示 NeteaseCloudMusicApi 启动完成后再重试`;
  }
  return message;
}

function extractCreatedPlaylistId(response) {
  return String(response?.id || response?.playlist?.id || response?.data?.id || response?.data?.playlist?.id || "");
}

function extractNeteaseProfile(response) {
  const profile = response?.data?.profile || response?.profile || response?.body?.profile || null;
  if (profile) return profile;
  const account = response?.data?.account || response?.account || null;
  if (!account) return null;
  return {
    userId: account.id || account.userId,
    nickname: account.userName || account.nickname || "",
  };
}

function assertNeteaseApiSuccess(response, action) {
  const code = Number(response?.code || response?.body?.code || response?.data?.code || 200);
  if (code === 200 || code === 201) return;
  if (code === 301) throw new Error("网易云登录已失效，请重新扫码登录");
  throw new Error(response?.message || response?.msg || `${action}失败，网易云返回 code ${code}`);
}

function chunkArray(items, size) {
  const chunks = [];
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }
  return chunks;
}

function getFilteredTracks() {
  if (state.lovedOnly) return getLovedTracks();
  const program = getActiveProgram();
  if (program) return state.tracks.filter((track) => programMatchesTrack(track, program));
  const selected = getSelectedFacetPairs();
  if (!selected.length) return state.tracks;
  return state.tracks.filter((track) => selectedFacetMatches(track).length > 0);
}

function getWeightedFilteredTracks() {
  if (state.lovedOnly) return getLovedTracks();
  const program = getActiveProgram();
  if (program) {
    return state.tracks.flatMap((track) => {
      if (!programMatchesTrack(track, program)) return [];
      const weight = Math.max(1, programFacetMatches(track, program).length);
      return Array.from({ length: weight }, () => track);
    });
  }
  const selected = getSelectedFacetPairs();
  if (!selected.length) return state.tracks;
  return state.tracks.flatMap((track) => {
    const matches = selectedFacetMatches(track);
    return matches.length ? Array.from({ length: matches.length }, () => track) : [];
  });
}

function trackMatchesPlaybackScope(track) {
  if (!track) return false;
  if (state.lovedOnly) return state.lovedIds.has(trackId(track));
  const program = getActiveProgram();
  if (program) return programMatchesTrack(track, program);
  const selected = getSelectedFacetPairs();
  if (!selected.length) return true;
  return selectedFacetMatches(track).length > 0;
}

function fillQueue(reset = false) {
  if (reset) state.queue = [];
  if (!reset && hasPlaybackScope()) {
    state.queue = state.queue.filter((track) => trackMatchesPlaybackScope(track));
  }
  let reference = state.queue[state.queue.length - 1] || state.current;
  while (state.queue.length < QUEUE_TARGET) {
    const track = pickTrack(reference);
    if (!track) break;
    state.queue.push(track);
    reference = track;
  }
  if (hasPlaybackScope()) {
    state.queue = state.queue.filter((track) => trackMatchesPlaybackScope(track));
  }
  elements.statQueue.textContent = String(state.queue.length);
}

function pickTrack(reference = null) {
  const source = getWeightedFilteredTracks();
  const pool = source.filter((track) => {
    const id = trackId(track);
    if (state.failedIds.has(id)) return false;
    if (state.current && trackId(state.current) === id) return false;
    if (state.queue.some((queued) => trackId(queued) === id)) return false;
    if (state.recentIds.includes(id)) return false;
    return true;
  });
  const fallback = getFilteredTracks().filter((track) => !state.failedIds.has(trackId(track)));
  const candidates = pool.length ? pool : fallback;
  if (!candidates.length) return null;

  if (!reference) {
    const weighted = [];
    candidates.forEach((track) => {
      const weight = Math.max(1, Math.min(9, (track.playlistCount || 1) + selectedFacetMatches(track).length * 2));
      for (let i = 0; i < weight; i += 1) weighted.push(track);
    });
    return weighted[Math.floor(Math.random() * weighted.length)];
  }

  const ranked = uniqueTracksById(candidates)
    .map((track) => ({ track, score: mixScore(reference, track) + selectionScore(track) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 12);
  const pick = weightedRankedChoice(ranked);
  return pick || ranked[0]?.track || candidates[0];
}

async function playNext(options = {}) {
  if (state.isMixing) return;
  if (!state.current && !state.queue.length && !hasPlaybackScope()) {
    elements.autoplayGate.hidden = true;
    setStatus("先选择 Genre / Mood / Context，再生成播放列表");
    maybeShowOnboardingGuide();
    return;
  }
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

  await crossfadeToTrack(nextTrack, getTransitionEightCounts());
}

async function switchToTrack(track, options = {}) {
  const oldTrack = state.current;
  const deck = getActiveDeck();
  getInactiveDeck().pause();
  getInactiveDeck().removeAttribute("src");
  setDeckPlaybackRate(getInactiveDeck(), 1);
  getInactiveDeck().load();
  setDeckPlaybackRate(deck, 1);
  state.currentMixPlan = null;

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

async function crossfadeToTrack(nextTrack, eightCounts) {
  const oldDeck = getActiveDeck();
  const newDeckIndex = 1 - state.activeDeckIndex;
  const newDeck = state.decks[newDeckIndex];
  const oldTrack = state.current;
  const plan = getMixPlan(oldTrack, nextTrack, eightCounts);

  state.isMixing = true;
  state.current = nextTrack;
  state.currentMixPlan = plan;
  state.activeMixTransition = { oldDeck, newDeck, newDeckIndex, oldTrack, nextTrack, playStarted: false };
  rememberRecent(nextTrack.id);
  renderTrack(nextTrack, "MIXING IN");
  updateMixText(oldTrack, nextTrack, "crossfade", plan);
  renderQueue();
  setStatus(`正在按 ${plan.phraseLabel} 对齐过渡 · ${formatSeconds(plan.transitionSeconds)}`);

  newDeck.src = neteaseAudioUrl(nextTrack.id);
  newDeck.currentTime = 0;
  newDeck.volume = 0;
  setDeckPlaybackRate(oldDeck, 1);
  setDeckPlaybackRate(newDeck, plan.playbackRate);
  newDeck.load();

  try {
    await newDeck.play();
    if (state.activeMixTransition) state.activeMixTransition.playStarted = true;
  } catch (error) {
    state.isMixing = false;
    state.current = oldTrack;
    state.currentMixPlan = null;
    state.activeMixTransition = null;
    state.failedIds.add(nextTrack.id);
    setStatus("下一首无法直接播放，正在重新选歌");
    playNext({ automatic: true, reason: "error" });
    return;
  }

  if (document.hidden) {
    completeMixTransition({ background: true });
    return;
  }

  const start = performance.now();
  const durationMs = Math.max(1, plan.transitionSeconds) * 1000;
  const fade = () => {
    if (document.hidden) {
      completeMixTransition({ background: true });
      return;
    }
    const ratio = Math.min(1, (performance.now() - start) / durationMs);
    oldDeck.volume = state.masterVolume * Math.cos((ratio * Math.PI) / 2);
    newDeck.volume = state.masterVolume * Math.sin((ratio * Math.PI) / 2);

    if (ratio < 1) {
      window.requestAnimationFrame(fade);
      return;
    }

    completeMixTransition({ background: false });
  };
  window.requestAnimationFrame(fade);
}

function completeMixTransition(options = {}) {
  const transition = state.activeMixTransition;
  if (!transition) return;
  const { oldDeck, newDeck, newDeckIndex, oldTrack, nextTrack } = transition;
  oldDeck.pause();
  oldDeck.removeAttribute("src");
  oldDeck.volume = 0;
  setDeckPlaybackRate(oldDeck, 1);
  oldDeck.load();
  newDeck.volume = state.masterVolume;
  state.activeDeckIndex = newDeckIndex;
  state.isMixing = false;
  state.activeMixTransition = null;
  if (oldTrack) pushHistory(oldTrack);
  renderTrack(nextTrack, "NOW PLAYING");
  renderHistory();
  updateProgress();
  setPlaying(true);
  if (options.background) {
    setDeckPlaybackRate(newDeck, 1);
    setStatus("后台播放中");
  } else {
    easeDeckRateTo(newDeck, 1, 12000);
    setStatus("正在播放");
  }
}

function handleVisibilityChange() {
  if (document.hidden && state.isMixing && state.activeMixTransition?.playStarted) {
    completeMixTransition({ background: true });
  }
}

function startFromGate() {
  state.userStarted = true;
  elements.autoplayGate.hidden = true;
  if (!state.current && !state.queue.length && !hasPlaybackScope()) {
    setStatus("先选择 Genre / Mood / Context，再生成播放列表");
    maybeShowOnboardingGuide();
    return;
  }
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
  if (!state.queue.length) fillQueue();
  const nextTrack = state.queue[0];
  if (!nextTrack) return;
  const plan = getMixPlan(state.current, nextTrack);
  if (shouldStartAutoMix(deck, plan)) {
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
  if (elements.miniProgressBar) {
    elements.miniProgressBar.style.width = `${Math.min(100, Math.max(0, percent))}%`;
  }
}

function renderAll() {
  renderPrograms();
  renderFacetTabs();
  renderSelectedFacetList();
  syncFilterButtons();
  renderProfile();
  renderNeteaseExport();
  renderQueue();
  renderLoved();
  renderHistory();
  elements.channelName.textContent = getMixLabel();
  const mixSummary = getMixSummary();
  elements.selectedStylesSummary.textContent = mixSummary;
  elements.selectedStylesSummary.title = getMixSummaryDetails() || mixSummary;
  elements.statTracks.textContent = String(getFilteredTracks().length);
  elements.crossfadeValue.textContent = getTransitionControlLabel();
  renderMiniPlayer();
}

function syncFilterButtons() {
  elements.styleFilters.querySelectorAll(".filter-chip").forEach((button) => {
    const active = Boolean(state.selectedFacets[button.dataset.facet]?.has(button.dataset.filter));
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function renderTrack(track, mode) {
  elements.trackMode.textContent = mode;
  elements.trackTitle.textContent = track.name || "Untitled";
  elements.trackArtist.textContent = artistLine(track);
  elements.trackAlbum.textContent = track.album ? `Album: ${track.album}` : "";
  const keyTag = getTrackKeyTag(track);
  const tags = getDisplayTags(track)
    .concat(keyTag ? [keyTag] : [])
    .concat(`${formatBpm(getTrackBpm(track))} BPM`);
  elements.genreTags.innerHTML = tags
    .map((label) => `<span>${escapeHtml(label)}</span>`)
    .join("");
  elements.albumStage.classList.toggle("no-cover", !track.picUrl);
  elements.coverArt.src = track.picUrl || "";
  elements.coverArt.alt = track.album ? `${track.album} cover` : "";
  elements.backdrop.style.backgroundImage = track.picUrl ? `url("${track.picUrl}")` : "none";
  renderMiniPlayer(track);
  updateLoveButton();
}

function renderMiniPlayer(track = state.current) {
  if (!elements.miniPlayer) return;
  const hasTrack = Boolean(track);
  elements.miniPlayer.classList.toggle("has-track", hasTrack);
  elements.miniTrackTitle.textContent = hasTrack ? (track.name || "Untitled") : "Echo Room FM";
  elements.miniTrackMeta.textContent = hasTrack
    ? `${artistLine(track)}${track.estimatedBpm ? ` · ${formatBpm(getTrackBpm(track))} BPM` : ""}`
    : "选择风格后开始播放";
  elements.miniInfoBtn.setAttribute("aria-label", hasTrack ? `查看正在播放：${track.name || "Untitled"}，${artistLine(track)}` : "查看播放器");
  elements.miniCoverArt.src = hasTrack && track.picUrl ? track.picUrl : "";
  elements.miniCoverArt.alt = hasTrack && track.album ? `${track.album} cover` : "";
  elements.miniPlayer.classList.toggle("no-cover", !hasTrack || !track.picUrl);
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
  const loved = Boolean(state.current && state.lovedIds.has(trackId(state.current)));
  [elements.loveCurrentBtn, elements.miniLoveBtn].filter(Boolean).forEach((button) => {
    button.classList.toggle("active", loved);
    button.setAttribute("aria-pressed", String(loved));
    button.textContent = loved ? "♥" : "♡";
    button.title = loved ? "取消红心" : "红心收藏当前歌曲";
  });
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

function updateMixText(fromTrack, toTrack, mode = "planned", plan = null) {
  if (!toTrack) {
    elements.mixText.textContent = "正在按 BPM、调式、曲风和能量选择下一首。";
    return;
  }
  if (!fromTrack) {
    const key = getTrackKeyTag(toTrack);
    elements.mixText.textContent = `${formatBpm(getTrackBpm(toTrack))} BPM${key ? ` · ${key}` : ""} · ${labelLine(toTrack)} · 首曲直接进歌。`;
    return;
  }

  const mixPlan = plan || getMixPlan(fromTrack, toTrack);
  const shared = sharedStyleLabels(fromTrack, toTrack);
  const transition = mode === "crossfade"
    ? `${mixPlan.phraseLabel} / ${formatSeconds(mixPlan.transitionSeconds)}`
    : mode === "manual cut"
      ? "manual cut"
      : `${mixPlan.phraseLabel} planned`;
  elements.mixText.textContent = `${formatBpm(mixPlan.fromBpm)} → ${formatBpm(mixPlan.toBpm)} BPM · Δ${formatBpm(mixPlan.bpmDelta)} · ${mixPlan.tempoShiftLabel} · ${mixPlan.harmonicLabel} · ${shared || getMixLabel()} · ${transition} · ${mixPlan.gridLabel}。`;
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
  if (elements.miniPlayPauseBtn) elements.miniPlayPauseBtn.textContent = isPlaying ? "Ⅱ" : "▶";
  elements.onAirState.textContent = isPlaying ? "ON AIR" : "STANDBY";
}

function setStatus(text) {
  elements.statusLine.textContent = text;
}

function getMixPlan(fromTrack, toTrack, targetEightCounts = getTransitionEightCounts()) {
  const tempo = getTempoMatch(fromTrack, toTrack);
  const phrase = choosePhraseTransition(tempo.fromBpm, targetEightCounts);
  const harmonic = getHarmonicScore(fromTrack, toTrack);
  const playbackRate = tempo.hasTempo
    ? clamp(tempo.rate, 1 - DJ_TEMPO_RATE_LIMIT, 1 + DJ_TEMPO_RATE_LIMIT)
    : 1;
  const shiftPercent = (playbackRate - 1) * 100;
  const gridLabel = fromTrack?.beatGridAvailable && toTrack?.beatGridAvailable
    ? "beat grid"
    : "estimated phrase grid";

  return {
    fromBpm: tempo.fromBpm,
    toBpm: tempo.toBpm,
    bpmDelta: tempo.delta,
    hasTempo: tempo.hasTempo,
    playbackRate,
    tempoShiftPercent: shiftPercent,
    tempoShiftLabel: Math.abs(shiftPercent) < 0.1 ? "tempo locked" : `tempo ${formatSignedPercent(shiftPercent)}`,
    transitionSeconds: phrase.seconds,
    phraseBeats: phrase.beats,
    eightCounts: phrase.eightCounts,
    beatSeconds: phrase.beatSeconds,
    phraseLabel: phrase.label,
    harmonic,
    harmonicLabel: harmonic.label,
    gridLabel,
  };
}

function getTempoMatch(fromTrack, toTrack) {
  return getTempoMatchFromValues(getTrackBpm(fromTrack), getTrackBpm(toTrack));
}

function getTempoMatchFromValues(fromValue, toValue) {
  const fromCandidates = getBpmCandidates(fromValue);
  const toCandidates = getBpmCandidates(toValue);
  if (!fromCandidates.length || !toCandidates.length) {
    return {
      fromBpm: Number(fromValue),
      toBpm: Number(toValue),
      delta: 24,
      rate: 1,
      hasTempo: false,
    };
  }

  const fromBpm = choosePrimaryDjBpm(fromCandidates);
  const toBpm = toCandidates
    .slice()
    .sort((a, b) => Math.abs(a - fromBpm) - Math.abs(b - fromBpm))[0];
  return {
    fromBpm,
    toBpm,
    delta: Math.abs(fromBpm - toBpm),
    rate: toBpm > 0 ? fromBpm / toBpm : 1,
    hasTempo: true,
  };
}

function getTrackBpm(trackOrValue) {
  const value = typeof trackOrValue === "object"
    ? Number(trackOrValue?.estimatedBpm)
    : Number(trackOrValue);
  return Number.isFinite(value) && value > 0 ? value : NaN;
}

function getBpmCandidates(value) {
  const raw = Number(value);
  if (!Number.isFinite(raw) || raw <= 0) return [];
  const candidates = [raw, raw * 2, raw / 2]
    .filter((bpm) => bpm >= 55 && bpm <= 190)
    .map((bpm) => Math.round(bpm * 10) / 10);
  return Array.from(new Set(candidates));
}

function choosePrimaryDjBpm(candidates) {
  const playableRange = candidates.filter((bpm) => bpm >= 70 && bpm <= 155);
  const source = playableRange.length ? playableRange : candidates;
  return source
    .slice()
    .sort((a, b) => Math.abs(a - 118) - Math.abs(b - 118))[0];
}

function choosePhraseTransition(bpm, targetEightCounts = DJ_DEFAULT_EIGHT_COUNTS) {
  const eightCounts = chooseEightCountsForTarget(targetEightCounts);
  const beats = eightCounts * DJ_EIGHT_COUNT_BEATS;
  if (!Number.isFinite(bpm) || bpm <= 0) {
    const fallbackBeatSeconds = 60 / DJ_FALLBACK_BPM;
    return {
      beats,
      eightCounts,
      seconds: roundTo(clamp(beats * fallbackBeatSeconds, DJ_MIN_MIX_SECONDS, DJ_MAX_MIX_SECONDS), 0.1),
      beatSeconds: fallbackBeatSeconds,
      label: formatEightCountLabel(eightCounts),
    };
  }

  const beatSeconds = 60 / bpm;
  const phraseOption = DJ_PHRASE_BEAT_OPTIONS.includes(beats)
    ? beats
    : DJ_PHRASE_BEAT_OPTIONS[0];
  const rawSeconds = phraseOption * beatSeconds;

  return {
    beats: phraseOption,
    eightCounts: phraseOption / DJ_EIGHT_COUNT_BEATS,
    seconds: roundTo(clamp(rawSeconds, DJ_MIN_MIX_SECONDS, DJ_MAX_MIX_SECONDS), 0.1),
    beatSeconds,
    label: formatEightCountLabel(phraseOption / DJ_EIGHT_COUNT_BEATS),
  };
}

function chooseEightCountsForTarget(value = DJ_DEFAULT_EIGHT_COUNTS) {
  return clamp(Math.round(Number(value) || DJ_DEFAULT_EIGHT_COUNTS), 1, 4);
}

function formatEightCountLabel(eightCounts = 1) {
  return `${Math.max(1, Math.round(eightCounts))} x 8拍`;
}

function shouldStartAutoMix(deck, plan) {
  if (!Number.isFinite(deck.duration) || deck.duration <= 0 || deck.currentTime <= 12) return false;
  const remaining = deck.duration - deck.currentTime;
  if (remaining <= plan.transitionSeconds + 0.15) return true;
  if (!Number.isFinite(plan.beatSeconds) || plan.beatSeconds <= 0) return false;

  const phraseLookahead = plan.transitionSeconds + plan.beatSeconds * DJ_DEFAULT_BEATS_PER_BAR;
  if (remaining > phraseLookahead) return false;
  return isNearPhraseBoundary(deck.currentTime, plan);
}

function isNearPhraseBoundary(currentTime, plan) {
  const phraseSeconds = plan.beatSeconds * plan.phraseBeats;
  if (!Number.isFinite(phraseSeconds) || phraseSeconds <= 0) return false;
  const phase = currentTime % phraseSeconds;
  const tolerance = Math.min(0.35, plan.beatSeconds * 0.45);
  return phase <= tolerance || phraseSeconds - phase <= tolerance;
}

function parseMusicalKey(track) {
  const rawKey = String(track?.musicalKey || "").trim();
  const rawMode = String(track?.mode || "").trim().toLowerCase();
  if (!rawKey) return { label: "", root: "", semitone: null, mode: "", camelot: "" };

  const camelot = rawKey.match(/^([1-9]|1[0-2])\s*([ab])$/i);
  if (camelot) {
    const normalized = `${Number(camelot[1])}${camelot[2].toUpperCase()}`;
    return { label: normalized, root: "", semitone: null, mode: camelot[2].toUpperCase() === "A" ? "minor" : "major", camelot: normalized };
  }

  const normalized = rawKey
    .replace(/♯/g, "#")
    .replace(/♭/g, "b")
    .replace(/\s+/g, " ")
    .trim();
  const match = normalized.match(/^([A-Ga-g])([#b]?)(?:\s*(major|minor|maj|min|m))?$/);
  if (!match) return { label: rawKey, root: rawKey, semitone: null, mode: rawMode, camelot: "" };

  const root = `${match[1].toUpperCase()}${match[2] || ""}`;
  const modeToken = (match[3] || rawMode || "").toLowerCase();
  const mode = modeToken.startsWith("min") || modeToken === "m" ? "minor" : "major";
  const semitone = KEY_TO_SEMITONE[root.toLowerCase()];
  if (!Number.isFinite(semitone)) return { label: `${root} ${mode}`, root, semitone: null, mode, camelot: "" };
  const camelotCode = mode === "minor" ? CAMELOT_MINOR[semitone] : CAMELOT_MAJOR[semitone];
  return {
    label: `${root} ${mode}`,
    root,
    semitone,
    mode,
    camelot: camelotCode || "",
  };
}

function getHarmonicScore(fromTrack, toTrack) {
  const fromKey = parseMusicalKey(fromTrack);
  const toKey = parseMusicalKey(toTrack);
  if (!fromKey.camelot || !toKey.camelot) {
    const label = toKey.camelot ? `${toKey.camelot} ${toKey.label}` : "key pending";
    return { score: 8, label };
  }

  const fromCamelot = parseCamelot(fromKey.camelot);
  const toCamelot = parseCamelot(toKey.camelot);
  const numberDistance = camelotNumberDistance(fromCamelot.number, toCamelot.number);
  const sameMode = fromCamelot.mode === toCamelot.mode;
  const semitoneDistance = Number.isFinite(fromKey.semitone) && Number.isFinite(toKey.semitone)
    ? circularDistance(fromKey.semitone, toKey.semitone, 12)
    : null;
  const label = `${fromKey.camelot} → ${toKey.camelot}`;

  if (numberDistance === 0 && sameMode) return { score: 36, label: `${label} same key` };
  if (numberDistance === 0) return { score: 33, label: `${label} relative` };
  if (numberDistance === 1 && sameMode) return { score: 29, label: `${label} adjacent` };
  if (numberDistance === 1) return { score: 22, label: `${label} soft shift` };
  if (semitoneDistance === 5 || semitoneDistance === 7) return { score: 18, label: `${label} fifth` };
  if (semitoneDistance === 0) return { score: 16, label: `${label} parallel` };
  return { score: -16, label: `${label} clash` };
}

function parseCamelot(value) {
  const match = String(value || "").match(/^([1-9]|1[0-2])([AB])$/i);
  return {
    number: match ? Number(match[1]) : 0,
    mode: match ? match[2].toUpperCase() : "",
  };
}

function camelotNumberDistance(a, b) {
  if (!a || !b) return 12;
  return circularDistance(a, b, 12);
}

function circularDistance(a, b, size) {
  const diff = Math.abs(a - b);
  return Math.min(diff, size - diff);
}

function getTrackKeyTag(track) {
  const key = parseMusicalKey(track);
  if (!key.camelot) return "";
  return `${key.camelot} ${key.root || ""}`.trim();
}

function setDeckPlaybackRate(deck, rate = 1) {
  if (!deck) return;
  const safeRate = clamp(Number(rate) || 1, 0.75, 1.25);
  try {
    if ("preservesPitch" in deck) deck.preservesPitch = true;
    if ("mozPreservesPitch" in deck) deck.mozPreservesPitch = true;
    if ("webkitPreservesPitch" in deck) deck.webkitPreservesPitch = true;
    deck.playbackRate = safeRate;
    deck.defaultPlaybackRate = safeRate;
  } catch (error) {
    deck.playbackRate = 1;
  }
}

function easeDeckRateTo(deck, targetRate = 1, durationMs = 12000) {
  if (!deck) return;
  const startRate = Number(deck.playbackRate) || 1;
  const target = clamp(Number(targetRate) || 1, 0.75, 1.25);
  if (Math.abs(startRate - target) < 0.003) {
    setDeckPlaybackRate(deck, target);
    return;
  }

  const startedAt = performance.now();
  const step = () => {
    if (deck !== getActiveDeck() || deck.paused) {
      setDeckPlaybackRate(deck, target);
      return;
    }
    const ratio = Math.min(1, (performance.now() - startedAt) / durationMs);
    const eased = 1 - Math.pow(1 - ratio, 3);
    setDeckPlaybackRate(deck, startRate + (target - startRate) * eased);
    if (ratio < 1) window.requestAnimationFrame(step);
  };
  window.requestAnimationFrame(step);
}

function mixScore(fromTrack, toTrack) {
  if (trackId(fromTrack) && trackId(fromTrack) === trackId(toTrack)) return -999;
  const plan = getMixPlan(fromTrack, toTrack);
  const shared = sharedStyles(fromTrack, toTrack).length;
  const fromEnergy = Number.isFinite(Number(fromTrack.energy)) ? Number(fromTrack.energy) : 0.5;
  const toEnergy = Number.isFinite(Number(toTrack.energy)) ? Number(toTrack.energy) : 0.5;
  const energyDelta = Math.abs(fromEnergy - toEnergy);
  const energyFlow = toEnergy >= fromEnergy - 0.08 ? 4 : 0;
  const tempoScore = plan.hasTempo ? Math.max(0, 50 - plan.bpmDelta * 9) : 7;
  const harmonicScoreValue = plan.harmonic.score;
  const sharedScore = Math.min(28, shared * 9);
  const energyScore = Math.max(0, 20 - energyDelta * 52) + energyFlow;
  const metadataBoost = getMetadataConfidenceBoost(toTrack);
  const playlistBoost = Math.min(4, toTrack.playlistCount || 1);
  return tempoScore + harmonicScoreValue + sharedScore + energyScore + metadataBoost + playlistBoost;
}

function selectionScore(track) {
  const program = getActiveProgram();
  if (program) {
    const matches = programFacetMatches(track, program).length;
    const bpm = Number(track.estimatedBpm);
    const midpoint = Number.isFinite(program.maxBpm)
      ? (program.minBpm + program.maxBpm) / 2
      : program.minBpm + 4;
    const bpmFit = Number.isFinite(bpm) ? Math.max(0, 18 - Math.abs(bpm - midpoint) * 1.5) : 0;
    const vocalBoost = program.vocalPreference ? clamp(vocalAffinityScore(track) * 4, -8, 14) : 0;
    return matches * 18 + bpmFit + vocalBoost;
  }
  const selected = getSelectedFacetPairs();
  if (!selected.length) return 0;
  const matched = selectedFacetMatches(track).length;
  if (!matched) return -100;
  return matched * 14 + (matched / selected.length) * 18;
}

function uniqueTracksById(tracks) {
  const seen = new Set();
  return tracks.filter((track) => {
    const id = trackId(track);
    if (!id || seen.has(id)) return false;
    seen.add(id);
    return true;
  });
}

function weightedRankedChoice(ranked) {
  if (!ranked.length) return null;
  const topScore = ranked[0].score;
  const weighted = ranked.map((item, index) => ({
    track: item.track,
    weight: Math.max(1, 16 - index * 1.7 + Math.max(0, item.score - topScore + 8) / 2),
  }));
  const total = weighted.reduce((sum, item) => sum + item.weight, 0);
  let cursor = Math.random() * total;
  for (const item of weighted) {
    cursor -= item.weight;
    if (cursor <= 0) return item.track;
  }
  return weighted[0].track;
}

function getMetadataConfidenceBoost(track) {
  let boost = 0;
  if (track?.tempoConfidence && track.tempoConfidence !== "genre-estimated") boost += 5;
  if (track?.beatGridAvailable) boost += 3;
  if (parseMusicalKey(track).camelot) boost += 5;
  if (track?.genreConfidence && !String(track.genreConfidence).includes("low")) boost += 2;
  return boost;
}

function bpmDistance(a, b) {
  const match = getTempoMatchFromValues(a, b);
  return match.delta;
}

function sharedStyles(a, b) {
  const left = new Set(getTrackMixKeys(a).map((item) => `${item.dimension}:${item.key}`));
  return getTrackMixKeys(b).filter((item) => left.has(`${item.dimension}:${item.key}`));
}

function sharedStyleLabels(a, b) {
  return sharedStyles(a, b).slice(0, 3).map((item) => getFacetLabel(item.dimension, item.key)).join(" · ");
}

function labelLine(track) {
  const labels = [
    ...getOrderedTrackFacetValues(track, "genre").slice(0, 2).map((key) => getFacetLabel("genre", key)),
    ...getOrderedTrackFacetValues(track, "mood").slice(0, 1).map((key) => getFacetLabel("mood", key)),
  ];
  return labels.slice(0, 3).join(" · ") || getMixLabel();
}

function getDisplayTags(track) {
  return [
    ...getOrderedTrackFacetValues(track, "genre").slice(0, 2).map((key) => getFacetLabel("genre", key)),
    ...getOrderedTrackFacetValues(track, "mood").slice(0, 2).map((key) => getFacetLabel("mood", key)),
    ...getOrderedTrackFacetValues(track, "context").slice(0, 1).map((key) => getFacetLabel("context", key)),
  ].slice(0, 5);
}

function queueMeta(track) {
  const labels = labelLine(track);
  const key = getTrackKeyTag(track);
  return `${labels}${labels ? " · " : ""}${formatBpm(getTrackBpm(track))} BPM${key ? ` · ${key}` : ""}`;
}

function getTrackFacetValues(track, dimension) {
  return uniqueStrings(track?.taxonomy?.[dimension] || []);
}

function getOrderedTrackFacetValues(track, dimension) {
  const values = getTrackFacetValues(track, dimension);
  const selected = state.selectedFacets[dimension];
  if (!selected || !selected.size) return values;
  return values.slice().sort((a, b) => {
    const ai = selected.has(a) ? 0 : 1;
    const bi = selected.has(b) ? 0 : 1;
    if (ai !== bi) return ai - bi;
    return values.indexOf(a) - values.indexOf(b);
  });
}

function getTrackMixKeys(track) {
  return ["genre", "mood", "context"].flatMap((dimension) => (
    getTrackFacetValues(track, dimension).map((key) => ({ dimension, key }))
  ));
}

function getSelectedFacetPairs() {
  return ["genre", "mood", "context"].flatMap((dimension) => (
    Array.from(state.selectedFacets[dimension] || []).map((key) => ({ dimension, key }))
  ));
}

function hasPlaybackScope() {
  return state.lovedOnly || Boolean(state.activeProgramId) || getSelectedFacetPairs().length > 0;
}

function selectedFacetMatches(track) {
  const selected = getSelectedFacetPairs();
  if (!selected.length) return [];
  return selected.filter(({ dimension, key }) => facetValueMatches(track, dimension, key));
}

function facetValueMatches(track, dimension, key) {
  if (dimension === "genre" && key === "jazz") return isStrictJazzTrack(track);
  if (dimension === "genre" && GENRE_MATCH_GROUPS[key]) {
    const values = getTrackFacetValues(track, dimension);
    return values.some((value) => GENRE_MATCH_GROUPS[key].has(value));
  }
  return getTrackFacetValues(track, dimension).includes(key);
}

function isStrictJazzTrack(track) {
  if (!getTrackFacetValues(track, "genre").includes("jazz")) return false;
  if (isHolidayTrack(track)) return false;
  const trustedJazzGenre = hasTrustedJazzGenreText(track);
  const strictArtist = hasStrictJazzArtist(track);
  const hasDanceOrRapSignal = hasJazzDisqualifyingSignal(track);
  if (trustedJazzGenre || strictArtist) return true;
  if (hasDanceOrRapSignal) return false;
  const tags = new Set(uniqueStrings(track.styleTags || []));
  return tags.has("jazz");
}

function hasJazzDisqualifyingSignal(track) {
  const tags = uniqueStrings(track.styleTags || []);
  const genres = getTrackFacetValues(track, "genre");
  return tags.some((tag) => JAZZ_DANCE_OR_RAP_TAGS.has(tag))
    || genres.some((genre) => JAZZ_DISQUALIFYING_GENRES.has(genre));
}

function hasTrustedJazzGenreText(track) {
  const text = [
    ...(track.onlineGenres || []),
    ...(track.onlineTags || []),
  ].filter(Boolean).join(" ").toLowerCase()
    .replace(/\bjazz[-\s]*(?:hip[-\s]*)?hop\b/g, " ")
    .replace(/\bjazz[-\s]*rap\b/g, " ");
  return /\b(jazz|bossa nova|bebop|swing|smooth jazz|jazz fusion)\b/.test(text) || /ジャズ/.test(text);
}

function hasStrictJazzArtist(track) {
  const artists = (track.artists || []).map((artist) => String(artist || "").toLowerCase());
  return STRICT_JAZZ_ARTISTS.some((needle) => artists.some((artist) => artistRuleMatches(artist, needle)));
}

function isHolidayTrack(track) {
  const text = [
    track.name,
    track.album,
    ...(track.playlistNames || []),
    ...(track.styleTags || []),
    ...getTrackFacetValues(track, "context"),
  ].filter(Boolean).join(" ").toLowerCase();
  return /christmas|xmas|holiday|santa|jingle|sleigh|let it snow|圣诞|chirsmas/.test(text);
}

function getFacetLabel(dimension, key) {
  return TAXONOMY[dimension]?.labels?.[key]
    || state.styleLabels[key]
    || titleCase(key);
}

function getMixLabel() {
  if (state.lovedOnly) return "Loved Tracks";
  const program = getActiveProgram();
  if (program) return program.name;
  const selected = getSelectedFacetPairs();
  if (!selected.length) return "Choose Styles";
  const labels = selected.map(({ dimension, key }) => getFacetLabel(dimension, key));
  if (labels.length <= 2) return labels.join(" + ");
  return `${labels.slice(0, 2).join(" + ")} +${labels.length - 2}`;
}

function getMixSummary() {
  if (state.lovedOnly) return `${getLovedTracks().length} 首红心 · 只播红心`;
  const program = getActiveProgram();
  if (program) {
    const mode = state.autoProgram ? "AUTO SCHEDULE" : "MANUAL PROGRAM";
    return `${program.schedule} · ${program.bpmLabel} · ${getFilteredTracks().length} 首唯一歌曲 · ${mode}`;
  }
  const selected = getSelectedFacetPairs();
  const poolCount = getFilteredTracks().length;
  if (!selected.length) return `${poolCount} 首唯一歌曲 · 选择 Genre / Mood / Context 生成第一条播放列表`;
  return `${selected.length} 个标签 · ${poolCount} 首唯一歌曲 · 队列已去重 · ${getCompactFacetSummary(selected)}`;
}

function getMixSummaryDetails() {
  if (state.lovedOnly) return "";
  const selected = getSelectedFacetPairs();
  if (!selected.length) return "";
  return selected
    .map(({ dimension, key }) => `${TAXONOMY[dimension].title}: ${getFacetLabel(dimension, key)}`)
    .join(" · ");
}

function getCompactFacetSummary(selected) {
  const groups = ["genre", "mood", "context"].map((dimension) => {
    const labels = selected
      .filter((item) => item.dimension === dimension)
      .map(({ key }) => getFacetLabel(dimension, key));
    if (!labels.length) return "";
    const title = TAXONOMY[dimension].title;
    if (labels.length === 1) return `${title}: ${labels[0]}`;
    if (labels.length === 2) return `${title}: ${labels.join(" + ")}`;
    return `${title}: ${labels[0]} +${labels.length - 1}`;
  }).filter(Boolean);
  return groups.join(" · ");
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

function getTransitionEightCounts() {
  return chooseEightCountsForTarget(elements.crossfadeSlider?.value || DJ_DEFAULT_EIGHT_COUNTS);
}

function getTransitionControlLabel() {
  const currentTarget = getTransitionEightCounts();
  const plan = state.current && state.queue[0]
    ? getMixPlan(state.current, state.queue[0], currentTarget)
    : choosePhraseTransition(getTrackBpm(state.current), currentTarget);
  const label = plan.phraseLabel || plan.label || formatEightCountLabel(currentTarget);
  const transitionSeconds = Number(plan.transitionSeconds ?? plan.seconds);
  const seconds = Number.isFinite(transitionSeconds) && transitionSeconds > 0
    ? ` / ${formatSeconds(transitionSeconds)}`
    : "";
  return `${label}${seconds}`;
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

function formatSeconds(seconds) {
  if (!Number.isFinite(seconds)) return "--s";
  return `${Number.isInteger(seconds) ? seconds : seconds.toFixed(1)}s`;
}

function formatBpm(value) {
  const bpm = Number(value);
  if (!Number.isFinite(bpm)) return "--";
  return Number.isInteger(bpm) ? String(bpm) : bpm.toFixed(1);
}

function formatSignedPercent(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return "+0.0%";
  return `${number >= 0 ? "+" : ""}${number.toFixed(1)}%`;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function roundTo(value, step) {
  return Number((Math.round(value / step) * step).toFixed(3));
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
