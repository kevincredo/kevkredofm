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

const PROGRAM_BLOCKED_GENRES = new Set([
  "hiphop_rap",
  "techno",
  "acid_techno",
  "drum_bass",
  "edm",
]);
const PROGRAM_BLOCKED_ARTISTS = new Set([
  "bassnectar",
  "chase & status",
  "excision",
  "flux pavilion",
  "griz",
  "knife party",
  "modestep",
  "nero",
  "netsky",
  "noisia",
  "pendulum",
  "rezz",
  "rusko",
  "skrillex",
  "sub focus",
  "the glitch mob",
  "virtual riot",
  "zeds dead",
]);
const PROGRAM_BLOCKED_STYLE_PATTERN = /\b(hip[\s_-]?hop|rap|trap|drill|dubstep|brostep|riddim|drumstep|deep[\s_-]?techno|hard[\s_-]?techno|industrial[\s_-]?techno|raw[\s_-]?techno|peak[\s_-]?time|hardstyle|gabber|big[\s_-]?room|bass[\s_-]?music|rave)\b/i;

const RADIO_PROGRAMS = [
  {
    id: "day_cafe",
    name: "DAY CAFÉ",
    schedule: "10:00–18:00",
    bpmLabel: "84–118 BPM",
    minBpm: 84,
    maxBpm: 118,
    minEnergy: 0.32,
    maxEnergy: 0.68,
    vocalPreference: true,
    facets: {
      genre: ["pop", "rnb_soul", "funk_soul", "jazz", "nu_disco", "indie_rock", "house", "latin_world"],
      mood: ["warm", "groovy", "playful", "romantic"],
      context: ["lounge", "dinner", "summer", "travel"],
    },
  },
  {
    id: "cocktail",
    name: "COCKTAIL",
    schedule: "18:00–23:00",
    bpmLabel: "96–122 BPM",
    minBpm: 96,
    maxBpm: 122,
    minEnergy: 0.34,
    maxEnergy: 0.70,
    facets: {
      genre: ["house", "deep_house", "nu_disco", "indie_dance", "afro_house", "melodic_house", "funk_soul", "jazz", "latin_world"],
      mood: ["groovy", "warm", "playful", "romantic", "dreamy", "hypnotic"],
      context: ["sunset", "lounge", "dinner", "night_drive", "club"],
    },
  },
  {
    id: "after_hours",
    name: "AFTER HOURS",
    schedule: "23:00–10:00",
    bpmLabel: "72–118 BPM",
    minBpm: 72,
    maxBpm: 118,
    minEnergy: 0.20,
    maxEnergy: 0.64,
    facets: {
      genre: ["deep_house", "melodic_house", "afro_house", "indie_dance", "electronica", "downtempo", "ambient", "synthwave", "lofi", "jazz"],
      mood: ["dark", "hypnotic", "atmospheric", "dreamy", "chill"],
      context: ["afterhours", "night_drive", "lounge", "focus"],
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
const NETEASE_AUDIO_QUALITY_STORAGE_KEY = "echo-room-fm-netease-audio-quality-v1";
const NETEASE_HELPER_TOKEN_SESSION_KEY = "echo-room-fm-netease-helper-token-v1";
const AUTO_PROGRAM_STORAGE_KEY = "echo-room-fm-auto-program";
const ACTIVE_PROGRAM_STORAGE_KEY = "echo-room-fm-active-program";
const PROGRAM_OVERRIDES_STORAGE_KEY = "echo-room-fm-program-overrides";
const PROGRAM_PRESET_VERSION_STORAGE_KEY = "echo-room-fm-program-preset-version";
const PROGRAM_PRESET_VERSION = "three-period-bar-safe-20260720";
const SAVED_MIXES_STORAGE_KEY = "echo-room-fm-saved-mixes-v1";
const SOUND_PROFILE_STORAGE_KEY = "echo-room-fm-sound-profile-v1";
const BLOCKED_TRACKS_STORAGE_KEY = "echo-room-fm-user-blocked-track-ids-v1";
const ENTRY_MODE_STORAGE_KEY = "echo-room-fm-entry-mode-version";
const ENTRY_MODE_VERSION = "style-first-20260610";
const ONBOARDING_STORAGE_KEY = "echo-room-fm-first-playlist-guide-v2";
const NETEASE_ORIGIN = "https://music.163.com";
const NETEASE_CLOUD_API_BASE = "/.netlify/functions/netease";
const NETEASE_LOCAL_API_BASE = "http://127.0.0.1:3000";
const CLOUD_LOVED_ENDPOINT = "/.netlify/functions/loved";
const USERNAME_PATTERN = /^[a-z0-9_-]{2,24}$/;
const CLOUD_SAVE_DEBOUNCE_MS = 650;
const NETEASE_EXPORT_CHUNK_SIZE = 80;
const NETEASE_AUDIO_SOURCE_CACHE_MS = 12 * 60 * 1000;
const AUDIO_STALL_GRACE_MS = 6500;
const AUDIO_RECOVERY_MAX_ATTEMPTS = 3;
const AUDIO_RECOVERY_RETRY_DELAYS_MS = [500, 1800, 4500];
const AUDIO_RECOVERY_METADATA_TIMEOUT_MS = 5500;
const AUDIO_RECOVERY_REWIND_SECONDS = 1;
const AUDIO_RECOVERY_HEALTHY_MS = 5000;
const AUDIO_PROGRESS_WATCHDOG_MS = 11000;
const MAX_SAVED_MIXES = 8;
const ENERGY_CEILING_MIN = 0.60;
const ENERGY_CEILING_MAX = 0.90;
const DEFAULT_SOUND_PROFILE = Object.freeze({
  loudnessGuardEnabled: true,
  energyCeiling: 0.78,
  vocalTarget: 0,
});

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
  savedMixes: [],
  loudnessGuardEnabled: DEFAULT_SOUND_PROFILE.loudnessGuardEnabled,
  energyCeiling: DEFAULT_SOUND_PROFILE.energyCeiling,
  vocalTarget: DEFAULT_SOUND_PROFILE.vocalTarget,
  blockedIds: new Set(),
  activeProgramEditorFacet: "genre",
  activeFacet: "genre",
  lovedIds: new Set(),
  lovedOnly: false,
  profileUsername: "",
  profileSaving: false,
  profileSaveTimer: null,
  profileRequestId: 0,
  pendingCloudLovedSaves: new Map(),
  libraryMeta: null,
  syncUserId: "",
  syncing: false,
  lastNeteaseExport: null,
  exportingToNetease: false,
  neteaseQrKey: "",
  neteaseQrTimer: null,
  neteaseHelperToken: "",
  neteaseHelperUnlocked: false,
  neteaseLoggedIn: false,
  neteaseAudioQuality: "auto",
  neteaseAudioSourceCache: new Map(),
  currentAudioSource: null,
  audioSourceRequestId: 0,
  audioRecoveryTimer: null,
  audioStallTimer: null,
  audioRecoveryTrackId: "",
  audioRecoveryAttempt: 0,
  audioRecoveryInFlight: false,
  audioRecoveryPosition: 0,
  audioAwaitingOnline: false,
  lastAudioTrackId: "",
  lastAudioPosition: 0,
  lastAudioProgressAt: 0,
  audioHealthySince: 0,
  queue: [],
  history: [],
  current: null,
  previous: null,
  currentMixPlan: null,
  activeMixTransition: null,
  decks: [],
  activeDeckIndex: 0,
  isPlaying: false,
  shouldBePlaying: false,
  isMixing: false,
  userStarted: false,
  failedIds: new Set(),
  recentIds: [],
  styleLabels: { ...STYLE_LABELS },
  masterVolume: 0.78,
  onboardingReturnFocus: null,
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
    applyProgramPresetMigration();
    state.savedMixes = loadSavedMixes();
    Object.assign(state, loadSoundProfile());
    state.blockedIds = loadBlockedIds();
    state.profileUsername = readLocalPreference(PROFILE_USERNAME_STORAGE_KEY) || "";
    if (state.profileUsername) {
      elements.profileUsernameInput.value = state.profileUsername;
    }
    state.syncUserId = String(library.scope?.user_id || "");
    elements.syncUserIdInput.value = state.syncUserId;
    elements.syncProxyInput.value = readLocalPreference(SYNC_PROXY_STORAGE_KEY) || "";
    elements.exportPlaylistNameInput.value = defaultExportPlaylistName();
    elements.exportApiInput.value = initialNeteaseApiBase();
    state.neteaseAudioQuality = normalizeNeteaseAudioQuality(readLocalPreference(NETEASE_AUDIO_QUALITY_STORAGE_KEY));
    elements.neteaseAudioQualitySelect.value = state.neteaseAudioQuality;
    state.neteaseHelperToken = readSessionPreference(NETEASE_HELPER_TOKEN_SESSION_KEY);
    state.neteaseHelperUnlocked = Boolean(state.neteaseHelperToken);
    state.lastNeteaseExport = loadLastNeteaseExport();
    renderExportRuntimeNote();
    renderNeteaseAudioAuth();
    updateLibraryCount();
    elements.statTracks.textContent = String(state.tracks.length);
    applyEntryModeMigration();
    buildFilters(library);
    restoreProgramState();
    if (hasPlaybackScope()) fillQueue(true);
    renderAll();
    maybeShowOnboardingGuide();
    if (isCloudNeteaseApiBase(getExportApiBase())) {
      window.setTimeout(restoreCloudNeteaseSession, 120);
    } else if (state.neteaseHelperUnlocked) {
      window.setTimeout(() => checkNeteaseLoginStatus({ manual: false }), 120);
    }
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
    "saveMixBtn",
    "clearMixBtn",
    "savedMixesSection",
    "savedMixesCount",
    "savedMixesList",
    "soundProfilePanel",
    "soundProfileSummary",
    "loudnessGuardToggle",
    "energyCeilingSlider",
    "energyCeilingValue",
    "vocalRatioSlider",
    "vocalRatioValue",
    "restoreBlockedBtn",
    "profileStatus",
    "profileUsernameInput",
    "profileLoginBtn",
    "profileLocalBtn",
    "profileHelp",
    "accountPanel",
    "syncPanel",
    "syncSummaryText",
    "syncUserIdInput",
    "syncProxyInput",
    "syncNeteaseBtn",
    "syncStatus",
    "exportPanel",
    "neteaseAudioPanel",
    "neteaseAudioSummary",
    "neteaseAudioLock",
    "neteaseAudioPasswordInput",
    "neteaseAudioUnlockBtn",
    "neteaseAudioLockStatus",
    "neteaseAudioControls",
    "neteaseAudioSessionState",
    "neteaseAudioLogoutBtn",
    "neteaseAudioQualitySelect",
    "exportOpenLoginBtn",
    "exportLoginStatus",
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
    "neteaseQrOpenLink",
    "loveCurrentBtn",
    "blockCurrentBtn",
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
    "audioQualityBadge",
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
  elements.saveMixBtn.addEventListener("click", saveCurrentMix);
  elements.clearMixBtn.addEventListener("click", clearStyleMix);
  elements.loudnessGuardToggle.addEventListener("change", applySoundProfileControls);
  elements.energyCeilingSlider.addEventListener("input", previewSoundProfileControls);
  elements.energyCeilingSlider.addEventListener("change", applySoundProfileControls);
  elements.energyCeilingSlider.addEventListener("click", applySoundProfileControls);
  elements.vocalRatioSlider.addEventListener("input", previewSoundProfileControls);
  elements.vocalRatioSlider.addEventListener("change", applySoundProfileControls);
  elements.vocalRatioSlider.addEventListener("click", applySoundProfileControls);
  elements.restoreBlockedBtn.addEventListener("click", restoreBlockedTracks);
  elements.autoProgramToggle.addEventListener("change", toggleAutoProgram);
  elements.programMinBpmInput.addEventListener("change", updateActiveProgramBpm);
  elements.programMaxBpmInput.addEventListener("change", updateActiveProgramBpm);
  elements.programVocalToggle.addEventListener("change", updateActiveProgramVocalPreference);
  elements.saveProgramBtn.addEventListener("click", saveActiveProgramPreset);
  elements.resetProgramBtn.addEventListener("click", resetActiveProgramPreset);
  elements.programFacetTabs.querySelectorAll("[data-program-facet]").forEach((button) => {
    button.addEventListener("click", () => switchProgramEditorFacet(button.dataset.programFacet));
  });
  elements.programFacetTabs.addEventListener("keydown", handleFacetTabKeydown);
  elements.facetTabs.querySelectorAll("[data-facet]").forEach((button) => {
    button.addEventListener("click", () => switchFacet(button.dataset.facet));
  });
  elements.facetTabs.addEventListener("keydown", handleFacetTabKeydown);
  elements.profileLoginBtn.addEventListener("click", () => activateProfile(elements.profileUsernameInput.value));
  elements.profileUsernameInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") activateProfile(elements.profileUsernameInput.value);
  });
  elements.profileLocalBtn.addEventListener("click", useLocalProfile);
  elements.syncNeteaseBtn.addEventListener("click", syncNeteaseLibrary);
  elements.syncProxyInput.addEventListener("change", () => {
    writeLocalPreference(SYNC_PROXY_STORAGE_KEY, elements.syncProxyInput.value.trim());
  });
  elements.exportApiInput.addEventListener("change", () => {
    elements.exportApiInput.value = getExportApiBase();
    writeLocalPreference(NETEASE_EXPORT_API_STORAGE_KEY, elements.exportApiInput.value);
    renderExportRuntimeNote();
  });
  elements.exportPlaylistNameInput.addEventListener("input", renderNeteaseExport);
  elements.neteaseAudioUnlockBtn.addEventListener("click", unlockNeteaseAudio);
  elements.neteaseAudioPasswordInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") unlockNeteaseAudio();
  });
  elements.neteaseAudioLogoutBtn.addEventListener("click", logoutNeteaseAudio);
  elements.neteaseAudioQualitySelect.addEventListener("change", changeNeteaseAudioQuality);
  elements.exportOpenLoginBtn.addEventListener("click", focusNeteaseAudioPanel);
  elements.checkNeteaseApiBtn.addEventListener("click", checkNeteaseApi);
  elements.neteaseQrLoginBtn.addEventListener("click", startNeteaseQrLogin);
  elements.checkNeteaseLoginBtn.addEventListener("click", () => checkNeteaseLoginStatus({ manual: true }));
  elements.exportDraftBtn.addEventListener("click", () => generateNeteaseExportDraft());
  elements.copyTrackIdsBtn.addEventListener("click", copyNeteaseExportIds);
  elements.downloadExportBtn.addEventListener("click", downloadNeteaseExportDraft);
  elements.exportCreateBtn.addEventListener("click", createNeteasePlaylistFromLoved);
  elements.loveCurrentBtn.addEventListener("click", toggleLoveCurrent);
  elements.blockCurrentBtn.addEventListener("click", blockCurrentTrack);
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
  elements.volumeSlider.addEventListener("input", applyVolumeControl);
  elements.volumeSlider.addEventListener("click", applyVolumeControl);
  elements.progressTrack.addEventListener("click", seekAudio);
  elements.progressTrack.addEventListener("keydown", seekAudioWithKeyboard);
  [elements.queueList, elements.lovedList, elements.historyList].forEach((list) => {
    list.addEventListener("click", playListedTrack);
  });
  document.addEventListener("visibilitychange", handleVisibilityChange);
  window.addEventListener("online", handleNetworkOnline);
  window.addEventListener("offline", handleNetworkOffline);
  window.setInterval(checkAudioContinuity, 5000);
  document.addEventListener("keydown", handleGlobalKeydown);
  configureMediaSession();
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
    deck.addEventListener("playing", () => {
      if (index === state.activeDeckIndex) handleAudioPlaying(deck);
    });
    deck.addEventListener("pause", () => {
      if (index === state.activeDeckIndex && !state.isMixing) setPlaying(false);
    });
    deck.addEventListener("timeupdate", () => {
      if (index !== state.activeDeckIndex) return;
      recordAudioProgress(deck);
      updateProgress();
      maybeAutoMix();
    });
    deck.addEventListener("loadedmetadata", () => {
      if (index === state.activeDeckIndex) updateProgress();
    });
    deck.addEventListener("waiting", () => {
      if (index === state.activeDeckIndex) handleAudioBuffering("waiting");
    });
    deck.addEventListener("stalled", () => {
      if (index === state.activeDeckIndex) handleAudioBuffering("stalled");
    });
    deck.addEventListener("canplay", () => {
      if (index === state.activeDeckIndex) clearAudioStallTimer();
    });
    deck.addEventListener("ended", () => {
      if (index === state.activeDeckIndex && !state.isMixing) {
        clearAudioRecovery();
        playNext({ automatic: true, reason: "ended" });
      }
    });
    deck.addEventListener("error", () => {
      if (index === state.activeDeckIndex && state.current && !state.isMixing) {
        handleAudioError(state.current);
      }
    });
  });
}

function applyVolumeControl() {
  state.masterVolume = Number(elements.volumeSlider.value);
  if (!state.isMixing) {
    getActiveDeck().volume = state.masterVolume;
    getInactiveDeck().volume = 0;
  }
}

function scrollToNowPlaying() {
  const target = document.querySelector(".now-panel");
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

function handleFacetTabKeydown(event) {
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
  const tabs = Array.from(event.currentTarget.querySelectorAll('[role="tab"]'));
  const currentIndex = tabs.indexOf(event.target);
  if (currentIndex < 0 || !tabs.length) return;
  event.preventDefault();
  let nextIndex = currentIndex;
  if (event.key === 'Home') nextIndex = 0;
  if (event.key === 'End') nextIndex = tabs.length - 1;
  if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
  if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % tabs.length;
  tabs[nextIndex].focus();
  tabs[nextIndex].click();
}

function maybeShowOnboardingGuide() {
  if (!elements.onboardingGuide) return;
  const hasSeenGuide = readLocalPreference(ONBOARDING_STORAGE_KEY) === "1";
  const forceGuide = new URLSearchParams(window.location.search).get("onboarding") === "1";
  const shouldShow = forceGuide || (!hasSeenGuide && !hasPlaybackScope());
  if (shouldShow && elements.onboardingGuide.hidden) {
    state.onboardingReturnFocus = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
  }
  elements.onboardingGuide.hidden = !shouldShow;
  document.body.classList.toggle("show-onboarding", shouldShow);
  if (shouldShow) {
    window.requestAnimationFrame(() => elements.onboardingStartBtn.focus());
  }
}

function handleGlobalKeydown(event) {
  const guideIsOpen = elements.onboardingGuide && !elements.onboardingGuide.hidden;
  if (!guideIsOpen) return;
  if (event.key === "Escape") {
    dismissOnboardingGuide();
    return;
  }
  if (event.key !== "Tab") return;
  const focusable = Array.from(elements.onboardingGuide.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'));
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function markOnboardingComplete({ restoreFocus = true } = {}) {
  writeLocalPreference(ONBOARDING_STORAGE_KEY, "1");
  if (elements.onboardingGuide) elements.onboardingGuide.hidden = true;
  document.body.classList.remove("show-onboarding");
  const returnFocus = state.onboardingReturnFocus;
  state.onboardingReturnFocus = null;
  if (restoreFocus && returnFocus?.isConnected && returnFocus !== document.body) {
    window.requestAnimationFrame(() => returnFocus.focus());
  }
}

function dismissOnboardingGuide() {
  markOnboardingComplete();
}

function startOnboardingSelection() {
  markOnboardingComplete({ restoreFocus: false });
  const target = document.querySelector(".music-control-section");
  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  elements.generateMixBtn.classList.add("guide-pulse");
  window.setTimeout(() => elements.generateMixBtn.classList.remove("guide-pulse"), 1800);
  window.setTimeout(() => {
    elements.facetTabs.querySelector('[role="tab"][aria-selected="true"]')?.focus();
  }, 350);
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
    picUrl: normalizeRemoteImageUrl(track.picUrl),
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

function applyProgramPresetMigration() {
  const validProgramIds = new Set(RADIO_PROGRAMS.map((program) => program.id));
  const savedVersion = readLocalPreference(PROGRAM_PRESET_VERSION_STORAGE_KEY);
  if (savedVersion !== PROGRAM_PRESET_VERSION) {
    state.programOverrides = {};
    persistProgramOverrides();
    const activeProgramId = readLocalPreference(ACTIVE_PROGRAM_STORAGE_KEY) || "";
    if (activeProgramId && !validProgramIds.has(activeProgramId)) {
      removeLocalPreference(ACTIVE_PROGRAM_STORAGE_KEY);
    }
    writeLocalPreference(PROGRAM_PRESET_VERSION_STORAGE_KEY, PROGRAM_PRESET_VERSION);
    return;
  }

  const validOverrides = Object.fromEntries(
    Object.entries(state.programOverrides).filter(([programId]) => validProgramIds.has(programId))
  );
  if (Object.keys(validOverrides).length !== Object.keys(state.programOverrides).length) {
    state.programOverrides = validOverrides;
    persistProgramOverrides();
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

function writeLocalPreference(key, value) {
  try {
    window.localStorage.setItem(key, String(value));
    return true;
  } catch (error) {
    console.warn(`Unable to save browser preference: ${key}`, error);
    return false;
  }
}

function removeLocalPreference(key) {
  try {
    window.localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.warn(`Unable to remove browser preference: ${key}`, error);
    return false;
  }
}

function readSessionPreference(key) {
  try {
    return window.sessionStorage.getItem(key) || "";
  } catch (error) {
    return "";
  }
}

function writeSessionPreference(key, value) {
  try {
    window.sessionStorage.setItem(key, String(value));
  } catch (error) {
    // A private browsing policy may disable session storage; the in-memory token still works.
  }
}

function removeSessionPreference(key) {
  try {
    window.sessionStorage.removeItem(key);
  } catch (error) {
    // The current in-memory session is cleared even when storage is unavailable.
  }
}

function loadSavedMixes() {
  try {
    const parsed = JSON.parse(readLocalPreference(SAVED_MIXES_STORAGE_KEY) || "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.map(normalizeSavedMix).filter(Boolean).slice(0, MAX_SAVED_MIXES);
  } catch (error) {
    return [];
  }
}

function normalizeSavedMix(value) {
  if (!value || typeof value !== "object") return null;
  const facets = normalizeProgramFacets(value.facets || {});
  const selectedCount = Object.values(facets).reduce((total, keys) => total + keys.length, 0);
  if (!selectedCount) return null;
  const signature = getFacetSelectionSignature(facets);
  return {
    id: String(value.id || signature),
    name: String(value.name || getFacetSelectionName(facets)).trim().slice(0, 80),
    facets,
    signature,
    soundProfile: value.soundProfile && typeof value.soundProfile === "object"
      ? normalizeSoundProfile(value.soundProfile)
      : null,
    savedAt: Number(value.savedAt) || Date.now(),
  };
}

function persistSavedMixes() {
  writeLocalPreference(SAVED_MIXES_STORAGE_KEY, JSON.stringify(state.savedMixes.slice(0, MAX_SAVED_MIXES)));
}

function loadSoundProfile() {
  try {
    const parsed = JSON.parse(readLocalPreference(SOUND_PROFILE_STORAGE_KEY) || "null");
    return normalizeSoundProfile(parsed);
  } catch (error) {
    return { ...DEFAULT_SOUND_PROFILE };
  }
}

function normalizeSoundProfile(value) {
  const source = value && typeof value === "object" ? value : DEFAULT_SOUND_PROFILE;
  const rawCeiling = Number(source.energyCeiling);
  const rawVocalTarget = Number(source.vocalTarget);
  return {
    loudnessGuardEnabled: source.loudnessGuardEnabled !== false,
    energyCeiling: roundTo(
      clamp(Number.isFinite(rawCeiling) ? rawCeiling : DEFAULT_SOUND_PROFILE.energyCeiling, ENERGY_CEILING_MIN, ENERGY_CEILING_MAX),
      0.01
    ),
    vocalTarget: clamp(
      Math.round((Number.isFinite(rawVocalTarget) ? rawVocalTarget : DEFAULT_SOUND_PROFILE.vocalTarget) / 10) * 10,
      0,
      100
    ),
  };
}

function getSoundProfileSnapshot() {
  return normalizeSoundProfile({
    loudnessGuardEnabled: state.loudnessGuardEnabled,
    energyCeiling: state.energyCeiling,
    vocalTarget: state.vocalTarget,
  });
}

function persistSoundProfile() {
  writeLocalPreference(SOUND_PROFILE_STORAGE_KEY, JSON.stringify(getSoundProfileSnapshot()));
}

function loadBlockedIds() {
  try {
    const parsed = JSON.parse(readLocalPreference(BLOCKED_TRACKS_STORAGE_KEY) || "[]");
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.map(String).filter(Boolean));
  } catch (error) {
    return new Set();
  }
}

function persistBlockedIds() {
  writeLocalPreference(BLOCKED_TRACKS_STORAGE_KEY, JSON.stringify(Array.from(state.blockedIds)));
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
    result[dimension] = uniqueStrings(facets[dimension]).filter((key) => (
      allowed.has(key) && (dimension !== "genre" || !PROGRAM_BLOCKED_GENRES.has(key))
    ));
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
  merged.facets.genre = merged.facets.genre.filter((key) => !PROGRAM_BLOCKED_GENRES.has(key));
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
  if (hour >= 18 && hour < 23) return getProgramById("cocktail");
  return getProgramById("after_hours");
}

function programFacetMatches(track, program) {
  return ["genre", "mood", "context"].filter((dimension) => {
    const accepted = program.facets[dimension] || [];
    return accepted.some((key) => programFacetValueMatches(track, dimension, key));
  });
}

function programFacetValueMatches(track, dimension, key) {
  if (dimension === "genre") {
    if (key === "jazz") return isStrictJazzTrack(track);
    return getTrackFacetValues(track, dimension).includes(key);
  }
  return facetValueMatches(track, dimension, key);
}

function programTrackHasBlockedStyle(track) {
  const artists = (track.artists || []).map((artist) => String(artist || "").trim().toLowerCase());
  if (artists.some((artist) => PROGRAM_BLOCKED_ARTISTS.has(artist))) return true;
  if (getTrackFacetValues(track, "genre").some((key) => PROGRAM_BLOCKED_GENRES.has(key))) return true;
  const styleText = [
    ...(track.styleTags || []),
    ...(track.onlineGenres || []),
    ...(track.onlineTags || []),
    ...(track.barNoiseRisk?.reasons || []),
  ].filter(Boolean).join(" ").toLowerCase().replace(/[_-]+/g, " ");
  return PROGRAM_BLOCKED_STYLE_PATTERN.test(styleText);
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

function isLikelyVocal(track) {
  return vocalAffinityScore(track) >= 1;
}

function getVocalBalanceScore(track) {
  const target = clamp(Number(state.vocalTarget) || 0, 0, 100) / 100;
  if (target <= 0) return 0;
  const queuedVocalCount = state.queue.reduce((count, queued) => count + (isLikelyVocal(queued) ? 1 : 0), 0);
  const desiredVocalCount = Math.round((state.queue.length + 1) * target);
  const needsVocal = queuedVocalCount < desiredVocalCount;
  return isLikelyVocal(track) === needsVocal ? 24 : -12;
}

function programMatchesTrack(track, program) {
  if (!trackPassesPlaybackGuards(track)) return false;
  if (programTrackHasBlockedStyle(track)) return false;
  const bpm = Number(track.estimatedBpm);
  if (!Number.isFinite(bpm) || bpm < program.minBpm || bpm > program.maxBpm) return false;
  const energy = Number(track.energy);
  if (Number.isFinite(energy) && Number.isFinite(program.minEnergy) && energy < program.minEnergy) return false;
  if (Number.isFinite(energy) && Number.isFinite(program.maxEnergy) && energy > program.maxEnergy) return false;
  if (!programAllowsTrackNoise(track, program)) return false;
  if (program.vocalPreference && vocalAffinityScore(track) < 1) return false;
  const facetMatches = programFacetMatches(track, program);
  return facetMatches.includes("genre") && facetMatches.length >= 2;
}

function programAllowsTrackNoise(track) {
  const level = track?.barNoiseRisk?.level || "";
  return level !== "high";
}

function trackPassesPlaybackGuards(track, profile = getSoundProfileSnapshot()) {
  if (!track || state.blockedIds.has(trackId(track))) return false;
  const normalized = normalizeSoundProfile(profile);
  if (!normalized.loudnessGuardEnabled) return true;
  if (track?.barNoiseRisk?.level === "high") return false;
  const energy = Number(track.energy);
  return !Number.isFinite(energy) || energy <= normalized.energyCeiling;
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
    button.tabIndex = isActive ? 0 : -1;
    if (isActive) elements.programTagEditor.setAttribute("aria-labelledby", button.id);
  });

  const dimension = state.activeProgramEditorFacet;
  const selected = new Set(active.facets[dimension] || []);
  const filters = (state.filterGroups[dimension] || []).filter((filter) => (
    dimension !== "genre" || !PROGRAM_BLOCKED_GENRES.has(filter.key)
  ));
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
  if (dimension === "genre" && PROGRAM_BLOCKED_GENRES.has(key)) return;
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
    button.tabIndex = active ? 0 : -1;
    if (active) elements.styleFilters.setAttribute("aria-labelledby", button.id);
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

function renderSavedMixes() {
  if (!elements.savedMixesSection) return;
  const hasSavedMixes = state.savedMixes.length > 0;
  elements.savedMixesSection.hidden = !hasSavedMixes;
  elements.savedMixesCount.textContent = String(state.savedMixes.length);
  elements.saveMixBtn.disabled = getSelectedFacetPairs().length === 0 || Boolean(state.activeProgramId) || state.lovedOnly;
  if (!hasSavedMixes) {
    elements.savedMixesList.innerHTML = "";
    return;
  }

  elements.savedMixesList.innerHTML = state.savedMixes.map((mix) => {
    const profile = mix.soundProfile || getSoundProfileSnapshot();
    const poolCount = state.tracks.filter((track) => (
      trackPassesPlaybackGuards(track, profile) && trackMatchesFacetSelection(track, mix.facets)
    )).length;
    return `
      <div class="saved-mix-row">
        <button class="saved-mix-load" type="button" data-saved-mix-load="${escapeHtml(mix.id)}">
          <strong>${escapeHtml(mix.name)}</strong>
          <span>${poolCount} tracks · ${escapeHtml(formatSoundProfileShort(profile))}</span>
        </button>
        <button class="saved-mix-delete" type="button" data-saved-mix-delete="${escapeHtml(mix.id)}" aria-label="删除 ${escapeHtml(mix.name)}" title="删除组合">×</button>
      </div>
    `;
  }).join("");
  elements.savedMixesList.querySelectorAll("[data-saved-mix-load]").forEach((button) => {
    button.addEventListener("click", () => applySavedMix(button.dataset.savedMixLoad));
  });
  elements.savedMixesList.querySelectorAll("[data-saved-mix-delete]").forEach((button) => {
    button.addEventListener("click", () => deleteSavedMix(button.dataset.savedMixDelete));
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

function previewSoundProfileControls() {
  const profile = normalizeSoundProfile({
    loudnessGuardEnabled: elements.loudnessGuardToggle.checked,
    energyCeiling: elements.energyCeilingSlider.value,
    vocalTarget: elements.vocalRatioSlider.value,
  });
  elements.energyCeilingSlider.disabled = !profile.loudnessGuardEnabled;
  elements.energyCeilingValue.textContent = profile.loudnessGuardEnabled
    ? `${Math.round(profile.energyCeiling * 100)}%`
    : "关闭";
  elements.vocalRatioValue.textContent = profile.vocalTarget > 0 ? `${profile.vocalTarget}%` : "自动";
  elements.soundProfileSummary.textContent = formatSoundProfileShort(profile);
}

function applySoundProfileControls() {
  const nextProfile = normalizeSoundProfile({
    loudnessGuardEnabled: elements.loudnessGuardToggle.checked,
    energyCeiling: elements.energyCeilingSlider.value,
    vocalTarget: elements.vocalRatioSlider.value,
  });
  const currentProfile = getSoundProfileSnapshot();
  const profileChanged = nextProfile.loudnessGuardEnabled !== currentProfile.loudnessGuardEnabled
    || nextProfile.energyCeiling !== currentProfile.energyCeiling
    || nextProfile.vocalTarget !== currentProfile.vocalTarget;
  if (!profileChanged) {
    renderSoundProfile();
    return;
  }
  Object.assign(state, nextProfile);
  persistSoundProfile();
  state.failedIds.clear();
  const currentIsOutOfScope = state.current && !trackPassesPlaybackGuards(state.current);
  if (hasPlaybackScope()) {
    fillQueue(true);
  } else {
    state.queue = [];
  }
  renderAll();
  setStatus(`现场声音已更新 · ${formatSoundProfileShort(nextProfile)}`);
  if (currentIsOutOfScope) {
    playNext({ user: state.userStarted, reason: "sound-profile", force: true });
  }
}

function renderSoundProfile() {
  const profile = getSoundProfileSnapshot();
  elements.loudnessGuardToggle.checked = profile.loudnessGuardEnabled;
  elements.energyCeilingSlider.value = String(profile.energyCeiling);
  elements.vocalRatioSlider.value = String(profile.vocalTarget);
  elements.energyCeilingSlider.disabled = !profile.loudnessGuardEnabled;
  elements.energyCeilingValue.textContent = profile.loudnessGuardEnabled
    ? `${Math.round(profile.energyCeiling * 100)}%`
    : "关闭";
  elements.vocalRatioValue.textContent = profile.vocalTarget > 0 ? `${profile.vocalTarget}%` : "自动";
  const hiddenCount = state.blockedIds.size;
  elements.soundProfileSummary.textContent = `${formatSoundProfileShort(profile)}${hiddenCount ? ` · 隐藏 ${hiddenCount}` : ""}`;
  elements.restoreBlockedBtn.hidden = hiddenCount === 0;
  elements.restoreBlockedBtn.textContent = hiddenCount ? `恢复已隐藏歌曲（${hiddenCount}）` : "恢复已隐藏歌曲";
  elements.blockCurrentBtn.disabled = !state.current;
}

function formatSoundProfileShort(profile = getSoundProfileSnapshot()) {
  const normalized = normalizeSoundProfile(profile);
  const guard = normalized.loudnessGuardEnabled
    ? `Guard ${Math.round(normalized.energyCeiling * 100)}%`
    : "Guard Off";
  const vocal = normalized.vocalTarget > 0 ? `Vocal ${normalized.vocalTarget}%` : "Vocal Auto";
  return `${guard} · ${vocal}`;
}

async function blockCurrentTrack() {
  if (!state.current) {
    setStatus("还没有正在播放的歌曲");
    return;
  }
  const blockedTrack = state.current;
  state.blockedIds.add(trackId(blockedTrack));
  persistBlockedIds();
  state.queue = state.queue.filter((track) => trackId(track) !== trackId(blockedTrack));
  state.history = state.history.filter((track) => trackId(track) !== trackId(blockedTrack));
  state.failedIds.delete(trackId(blockedTrack));
  setStatus(`已隐藏 ${blockedTrack.name || "当前歌曲"}，以后不会自动播放`);
  await playNext({ user: true, reason: "user-blocked", force: true });
  renderAll();
}

function restoreBlockedTracks() {
  const restoredCount = state.blockedIds.size;
  state.blockedIds.clear();
  persistBlockedIds();
  state.failedIds.clear();
  if (hasPlaybackScope()) fillQueue(true);
  renderAll();
  setStatus(restoredCount ? `已恢复 ${restoredCount} 首手动隐藏的歌曲` : "没有需要恢复的歌曲");
}

function saveCurrentMix() {
  const facets = getCurrentFacetSnapshot();
  const selectedCount = Object.values(facets).reduce((total, keys) => total + keys.length, 0);
  if (!selectedCount || state.activeProgramId || state.lovedOnly) {
    setStatus("先在 Genre / Mood / Context 里选择要保存的组合");
    return;
  }

  const signature = getFacetSelectionSignature(facets);
  const existing = state.savedMixes.find((mix) => mix.signature === signature);
  const savedMix = {
    id: existing?.id || `mix-${Date.now().toString(36)}`,
    name: getFacetSelectionName(facets),
    facets,
    signature,
    soundProfile: getSoundProfileSnapshot(),
    savedAt: Date.now(),
  };
  state.savedMixes = [savedMix, ...state.savedMixes.filter((mix) => mix.signature !== signature)]
    .slice(0, MAX_SAVED_MIXES);
  persistSavedMixes();
  renderSavedMixes();
  setStatus(existing ? `已更新常用组合：${savedMix.name}` : `已保存常用组合：${savedMix.name}`);
}

function applySavedMix(mixId) {
  const mix = state.savedMixes.find((item) => item.id === mixId);
  if (!mix) return;
  setCustomProgramMode();
  state.lovedOnly = false;
  ["genre", "mood", "context"].forEach((dimension) => {
    state.selectedFacets[dimension] = new Set(mix.facets[dimension] || []);
  });
  if (mix.soundProfile) {
    Object.assign(state, normalizeSoundProfile(mix.soundProfile));
    persistSoundProfile();
  }
  state.failedIds.clear();
  const currentIsOutOfScope = state.current && !trackMatchesPlaybackScope(state.current);
  fillQueue(true);
  renderAll();
  setStatus(`已载入常用组合：${mix.name}`);
  if (currentIsOutOfScope) playNext({ user: state.userStarted, reason: "saved-mix", force: true });
}

function deleteSavedMix(mixId) {
  const mix = state.savedMixes.find((item) => item.id === mixId);
  state.savedMixes = state.savedMixes.filter((item) => item.id !== mixId);
  persistSavedMixes();
  renderSavedMixes();
  setStatus(mix ? `已删除常用组合：${mix.name}` : "已删除常用组合");
}

function getCurrentFacetSnapshot() {
  return ["genre", "mood", "context"].reduce((facets, dimension) => {
    facets[dimension] = Array.from(state.selectedFacets[dimension] || []);
    return facets;
  }, {});
}

function getFacetSelectionSignature(facets) {
  return ["genre", "mood", "context"].map((dimension) => {
    const keys = uniqueStrings(facets?.[dimension]).sort();
    return keys.length ? `${dimension}:${keys.join(",")}` : "";
  }).filter(Boolean).join("|");
}

function getFacetSelectionName(facets) {
  const labels = ["genre", "mood", "context"].flatMap((dimension) => (
    uniqueStrings(facets?.[dimension]).map((key) => getFacetLabel(dimension, key))
  ));
  if (labels.length <= 3) return labels.join(" + ");
  return `${labels.slice(0, 3).join(" + ")} +${labels.length - 3}`;
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
    writeLocalPreference(SYNC_PROXY_STORAGE_KEY, elements.syncProxyInput.value.trim());
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
    signal: options.signal,
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
  if (!isAllowedNeteaseApiBase(apiBase)) {
    setNeteaseLoginStatus("只允许同站点云端服务或本机开发助手。");
    return;
  }

  setNeteaseLoginStatus("正在检测网易云服务...");
  try {
    await requestNeteaseSession(apiBase, "/health");
    setNeteaseLoginStatus(state.neteaseHelperUnlocked
      ? "网易云服务已连接，可以扫码登录。"
      : "网易云服务已连接，请先输入私人访问密码。");
  } catch (error) {
    setNeteaseLoginStatus(`网易云服务暂时不可用：${error.message}。`);
  }
}

async function restoreCloudNeteaseSession() {
  const apiBase = getExportApiBase();
  if (!isCloudNeteaseApiBase(apiBase)) return;
  try {
    const session = await requestNeteaseSession(apiBase, "/echo/auth/status");
    if (!session?.unlocked) return;
    state.neteaseHelperToken = "cloud-session";
    state.neteaseHelperUnlocked = true;
    writeSessionPreference(NETEASE_HELPER_TOKEN_SESSION_KEY, state.neteaseHelperToken);
    renderNeteaseAudioAuth();
    if (session.loggedIn) await checkNeteaseLoginStatus({ manual: false });
  } catch (error) {
    clearNeteaseHelperSession();
    state.neteaseLoggedIn = false;
    renderNeteaseAudioAuth();
  }
}

async function unlockNeteaseAudio() {
  const apiBase = getExportApiBase();
  const password = elements.neteaseAudioPasswordInput.value;
  if (!apiBase || !isAllowedNeteaseApiBase(apiBase)) {
    setNeteaseAudioLockStatus("网易云服务地址无效，请恢复为同站点云端服务。", true);
    return;
  }
  if (!password) {
    setNeteaseAudioLockStatus("请输入私人访问密码。", true);
    elements.neteaseAudioPasswordInput.focus();
    return;
  }

  elements.neteaseAudioUnlockBtn.disabled = true;
  elements.neteaseAudioUnlockBtn.textContent = "验证中";
  setNeteaseAudioLockStatus("正在建立私人云端会话...");
  try {
    const payload = await unlockNeteaseSession(apiBase, password);
    const token = String(payload.token || "");
    if (!isCloudNeteaseApiBase(apiBase) && !token) throw new Error("本机助手没有返回访问令牌");
    state.neteaseHelperToken = token || "cloud-session";
    state.neteaseHelperUnlocked = true;
    writeSessionPreference(NETEASE_HELPER_TOKEN_SESSION_KEY, state.neteaseHelperToken);
    elements.neteaseAudioPasswordInput.value = "";
    renderNeteaseAudioAuth();
    setNeteaseLoginStatus("私人区域已解锁，正在检查网易云登录状态...");
    await checkNeteaseLoginStatus({ manual: false });
  } catch (error) {
    clearNeteaseHelperSession();
    setNeteaseAudioLockStatus(`解锁失败：${describeNeteaseServiceError(error, apiBase)}。`, true);
  } finally {
    elements.neteaseAudioUnlockBtn.disabled = false;
    elements.neteaseAudioUnlockBtn.textContent = "解锁";
  }
}

async function logoutNeteaseAudio() {
  const apiBase = getExportApiBase();
  stopNeteaseQrPolling();
  try {
    if (state.neteaseHelperUnlocked && apiBase) {
      await requestNeteaseSession(apiBase, "/echo/auth/logout", {}, { method: "POST" });
    }
  } catch (error) {
    // The local UI can still forget an unavailable or expired server session.
  }
  clearNeteaseHelperSession();
  state.neteaseLoggedIn = false;
  state.neteaseQrKey = "";
  state.neteaseAudioSourceCache.clear();
  renderNeteaseAudioAuth();
  setNeteaseAudioLockStatus("已退出授权。重新输入密码后可以再次扫码。");
  setStatus("网易云会员播放授权已退出");
}

function clearNeteaseHelperSession() {
  state.neteaseHelperToken = "";
  state.neteaseHelperUnlocked = false;
  removeSessionPreference(NETEASE_HELPER_TOKEN_SESSION_KEY);
}

function changeNeteaseAudioQuality() {
  state.neteaseAudioQuality = normalizeNeteaseAudioQuality(elements.neteaseAudioQualitySelect.value);
  writeLocalPreference(NETEASE_AUDIO_QUALITY_STORAGE_KEY, state.neteaseAudioQuality);
  state.neteaseAudioSourceCache.clear();
  renderNeteaseAudioAuth();
  setStatus(`音质已切换为${neteaseAudioQualityLabel(state.neteaseAudioQuality)}，下一首生效`);
}

function normalizeNeteaseAudioQuality(value) {
  return ["auto", "exhigh", "lossless"].includes(value) ? value : "auto";
}

function neteaseAudioQualityLabel(value) {
  if (value === "exhigh") return "极高 320K";
  if (value === "lossless") return "无损 FLAC";
  return "自动无损优先";
}

function setNeteaseAudioLockStatus(text, isError = false) {
  elements.neteaseAudioLockStatus.textContent = text;
  elements.neteaseAudioLockStatus.classList.toggle("error", isError);
}

function renderNeteaseAudioAuth() {
  const unlocked = state.neteaseHelperUnlocked;
  elements.neteaseAudioLock.hidden = unlocked;
  elements.neteaseAudioControls.hidden = !unlocked;
  elements.neteaseAudioLogoutBtn.hidden = !unlocked;
  elements.neteaseAudioQualitySelect.value = normalizeNeteaseAudioQuality(state.neteaseAudioQuality);
  elements.neteaseAudioSummary.textContent = state.neteaseLoggedIn
    ? `已登录 · ${neteaseAudioQualityLabel(state.neteaseAudioQuality)}`
    : unlocked
      ? "已解锁 · 等待扫码"
      : "会员音质未授权";
  elements.neteaseAudioSessionState.textContent = state.neteaseLoggedIn
    ? `网易云已登录，下一首优先使用${neteaseAudioQualityLabel(state.neteaseAudioQuality)}。`
    : "私人区域已解锁，尚未登录网易云。";
  updateImportFlowState();
}

function focusNeteaseAudioPanel() {
  elements.accountPanel.open = true;
  elements.neteaseAudioPanel.open = true;
  elements.neteaseAudioPanel.scrollIntoView({ behavior: "smooth", block: "center" });
  window.setTimeout(() => {
    const target = state.neteaseHelperUnlocked ? elements.neteaseQrLoginBtn : elements.neteaseAudioPasswordInput;
    target.focus();
  }, 350);
}

async function startNeteaseQrLogin() {
  const apiBase = getExportApiBase();
  if (!state.neteaseHelperUnlocked) {
    setNeteaseLoginStatus("请先输入私人访问密码解锁。 ");
    focusNeteaseAudioPanel();
    return;
  }
  if (!apiBase || !isAllowedNeteaseApiBase(apiBase)) {
    setNeteaseLoginStatus("网易云服务地址无效，请恢复默认设置。");
    return;
  }

  stopNeteaseQrPolling();
  state.neteaseQrKey = "";
  state.neteaseLoggedIn = false;
  elements.neteaseQrBox.hidden = false;
  elements.neteaseQrImage.removeAttribute("src");
  elements.neteaseQrOpenLink.hidden = true;
  elements.neteaseQrOpenLink.removeAttribute("href");
  elements.neteaseQrText.textContent = "正在生成安全登录二维码...";
  setNeteaseLoginStatus("正在生成登录二维码...");

  try {
    const keyPayload = await requestNeteaseSession(apiBase, "/login/qr/key");
    const key = String(keyPayload.data?.unikey || keyPayload.unikey || "");
    if (!key) throw new Error("二维码 key 为空");
    state.neteaseQrKey = key;

    const qrPayload = await requestNeteaseSession(apiBase, "/login/qr/create", {
      key,
      qrimg: "true",
    });
    const qrImage = qrPayload.data?.qrimg || qrPayload.qrimg || "";
    const qrUrl = qrPayload.data?.qrurl || qrPayload.qrurl || "";
    if (qrImage) {
      elements.neteaseQrImage.src = qrImage;
    } else if (!qrUrl) {
      throw new Error("二维码图片为空");
    }

    if (qrUrl) {
      elements.neteaseQrOpenLink.href = qrUrl;
      elements.neteaseQrOpenLink.hidden = false;
    }

    elements.neteaseQrText.textContent = qrUrl
      ? "同一台手机可点下方按钮；未自动跳转时，截图后从网易云扫一扫的相册中识别。"
      : "扫码后在手机上确认登录。";
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
    const payload = await requestNeteaseSession(apiBase, "/login/qr/check", {
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
  if (!apiBase || !isAllowedNeteaseApiBase(apiBase)) {
    setNeteaseLoginStatus("网易云服务地址无效，请恢复默认设置。");
    return false;
  }

  if (options.manual) setNeteaseLoginStatus("正在读取网易云登录状态...");
  try {
    const payload = await requestNeteaseSession(apiBase, "/login/status");
    const profile = extractNeteaseProfile(payload);
    if (profile) {
      state.neteaseLoggedIn = true;
      setNeteaseLoginStatus(`已登录网易云：${profile.nickname || profile.userId || "当前账号"}。`);
      renderNeteaseExport();
      return true;
    }
    if (state.neteaseLoggedIn) {
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
    setExportStatus("请先恢复网易云服务地址。");
    elements.exportPanel.open = true;
    return;
  }
  if (!isAllowedNeteaseApiBase(apiBase)) {
    setExportStatus("真实导入只允许同站点云端服务或本机开发助手。");
    return;
  }

  const loggedIn = state.neteaseLoggedIn || await checkNeteaseLoginStatus({ manual: false });
  if (!loggedIn) {
    setExportStatus("请先在 NETEASE OUT 区域扫码登录网易云。");
    return;
  }

  const ok = window.confirm(
    `将在已登录的网易云账号中创建歌单「${draft.playlistName}」，并添加 ${draft.trackCount} 首红心歌曲。继续吗？`
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
    const created = await requestNeteaseSessionWrite(apiBase, "/playlist/create", {
      name: draft.playlistName,
      privacy: "0",
    });
    assertNeteaseApiSuccess(created, "创建歌单");
    const playlistId = extractCreatedPlaylistId(created);
    if (!playlistId) throw new Error("创建接口没有返回歌单 ID");

    const chunks = chunkArray(draft.trackIds, NETEASE_EXPORT_CHUNK_SIZE);
    for (let index = 0; index < chunks.length; index += 1) {
      setUploadStatus(`歌单已创建，正在上传歌曲 ${index + 1}/${chunks.length}...`);
      const added = await requestNeteaseSessionWrite(apiBase, "/playlist/tracks", {
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
  renderNeteaseAudioAuth();
  updateImportFlowState();
}

function renderExportRuntimeNote() {
  if (!elements.exportRuntimeNote) return;
  const apiBase = getExportApiBase();
  elements.exportRuntimeNote.textContent = isCloudNeteaseApiBase(apiBase)
    ? "当前使用同站点加密云端会话，可在 iPhone、安卓和电脑独立登录。"
    : `当前使用本机开发助手：${apiBase}`;
}

function updateImportFlowState() {
  if (!elements.importLoginStep) return;
  const hasLoved = getLovedTracks().length > 0;
  const hasDraft = isCurrentNeteaseDraft(state.lastNeteaseExport);
  const canUpload = hasLoved && hasDraft && state.neteaseLoggedIn;
  elements.exportLoginStatus.textContent = state.neteaseLoggedIn
    ? "网易云已授权，会员播放与歌单上传共用当前会话。"
    : "先在 NETEASE AUDIO 中解锁并扫码登录。";
  elements.exportOpenLoginBtn.textContent = state.neteaseLoggedIn ? "已授权" : "前往授权";
  elements.exportOpenLoginBtn.disabled = state.neteaseLoggedIn;
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
  if (raw === NETEASE_CLOUD_API_BASE) return raw;
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

function initialNeteaseApiBase() {
  const fallback = defaultNeteaseApiBase();
  const saved = normalizeExportApiBase(readLocalPreference(NETEASE_EXPORT_API_STORAGE_KEY));
  if (!saved) return fallback;
  if (fallback === NETEASE_CLOUD_API_BASE && saved === NETEASE_LOCAL_API_BASE) return fallback;
  return saved;
}

function defaultNeteaseApiBase() {
  const hostname = window.location.hostname;
  const usesHostedFunctions = window.location.protocol === "https:"
    || hostname.endsWith(".netlify.app")
    || window.location.port === "8888";
  return usesHostedFunctions ? NETEASE_CLOUD_API_BASE : NETEASE_LOCAL_API_BASE;
}

function getExportApiBase() {
  const normalized = normalizeExportApiBase(elements.exportApiInput.value || defaultNeteaseApiBase());
  if (elements.exportApiInput.value !== normalized) elements.exportApiInput.value = normalized;
  try {
    window.localStorage.setItem(NETEASE_EXPORT_API_STORAGE_KEY, normalized);
  } catch (error) {
    // Ignore storage restrictions; the current input value is still usable.
  }
  return normalized;
}

function isCloudNeteaseApiBase(value) {
  const raw = normalizeExportApiBase(value);
  if (raw === NETEASE_CLOUD_API_BASE) return true;
  try {
    const url = new URL(raw, window.location.href);
    return url.origin === window.location.origin && url.pathname === NETEASE_CLOUD_API_BASE;
  } catch (error) {
    return false;
  }
}

function isLocalNeteaseApiBase(value) {
  try {
    const url = new URL(value);
    return ["localhost", "127.0.0.1", "0.0.0.0", "::1", "[::1]"].includes(url.hostname);
  } catch (error) {
    return false;
  }
}

function isAllowedNeteaseApiBase(value) {
  return isCloudNeteaseApiBase(value) || isLocalNeteaseApiBase(value);
}

async function unlockNeteaseSession(apiBase, password) {
  if (isCloudNeteaseApiBase(apiBase)) {
    return fetchJson(apiBase, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ route: "/echo/auth/unlock", password }),
    });
  }
  return fetchJson(`${apiBase}/echo/auth/unlock`, {
    method: "POST",
    credentials: "omit",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
}

async function requestNeteaseSessionWrite(apiBase, route, params) {
  return requestNeteaseSession(apiBase, route, params, { method: "POST" });
}

async function requestNeteaseSession(apiBase, route, params = {}, options = {}) {
  const query = new URLSearchParams({ ...params, timestamp: Date.now() });
  const controller = options.timeoutMs ? new AbortController() : null;
  const timeout = controller
    ? window.setTimeout(() => controller.abort(), options.timeoutMs)
    : null;
  try {
    if (isCloudNeteaseApiBase(apiBase)) {
      return await fetchJson(apiBase, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          route,
          params: Object.fromEntries(query),
          method: options.method || "GET",
        }),
        signal: controller?.signal,
      });
    }
    return await fetchJson(`${apiBase}${route}?${query}`, {
      method: options.method || "GET",
      credentials: "include",
      headers: state.neteaseHelperToken
        ? { "Authorization": `Bearer ${state.neteaseHelperToken}` }
        : undefined,
      signal: controller?.signal,
    });
  } catch (error) {
    if (/私人访问密码|HTTP 401|unauthorized/i.test(String(error?.message || error))) {
      clearNeteaseHelperSession();
      state.neteaseLoggedIn = false;
      renderNeteaseAudioAuth();
    }
    throw new Error(describeNeteaseServiceError(error, apiBase));
  } finally {
    if (timeout) window.clearTimeout(timeout);
  }
}

function describeNeteaseServiceError(error, apiBase) {
  const message = String(error?.message || error || "未知错误");
  if (isCloudNeteaseApiBase(apiBase)) {
    if (/failed to fetch|networkerror|load failed/i.test(message)) {
      return "没有连上云端网易云服务，请检查网络后重试";
    }
    return message;
  }
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
  if (
    !account
    || account.anonimousUser === true
    || Number(account.type) === 1000
    || Number(account.status) === -10
  ) return null;
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
  if (state.lovedOnly) return getLovedTracks().filter((track) => trackPassesPlaybackGuards(track));
  const program = getActiveProgram();
  if (program) return state.tracks.filter((track) => programMatchesTrack(track, program));
  const selected = getSelectedFacetPairs();
  if (!selected.length) return state.tracks.filter((track) => trackPassesPlaybackGuards(track));
  return state.tracks.filter((track) => (
    trackPassesPlaybackGuards(track) && trackMatchesFacetSelection(track)
  ));
}

function getWeightedFilteredTracks() {
  if (state.lovedOnly) return getLovedTracks().filter((track) => trackPassesPlaybackGuards(track));
  const program = getActiveProgram();
  if (program) {
    return state.tracks.flatMap((track) => {
      if (!programMatchesTrack(track, program)) return [];
      const weight = Math.max(1, programFacetMatches(track, program).length);
      return Array.from({ length: weight }, () => track);
    });
  }
  const selected = getSelectedFacetPairs();
  if (!selected.length) return state.tracks.filter((track) => trackPassesPlaybackGuards(track));
  return state.tracks.flatMap((track) => {
    if (!trackPassesPlaybackGuards(track)) return [];
    if (!trackMatchesFacetSelection(track)) return [];
    const matches = selectedFacetMatches(track);
    return matches.length ? Array.from({ length: matches.length }, () => track) : [];
  });
}

function trackMatchesPlaybackScope(track) {
  if (!track) return false;
  if (!trackPassesPlaybackGuards(track)) return false;
  if (state.lovedOnly) return state.lovedIds.has(trackId(track));
  const program = getActiveProgram();
  if (program) return programMatchesTrack(track, program);
  const selected = getSelectedFacetPairs();
  if (!selected.length) return true;
  return trackMatchesFacetSelection(track);
}

function fillQueue(reset = false) {
  if (reset) state.queue = [];
  if (!reset && hasPlaybackScope()) {
    state.queue = state.queue.filter((track) => trackMatchesPlaybackScope(track));
  }
  state.queue = uniqueTracksById(state.queue);
  let reference = state.queue[state.queue.length - 1] || state.current;
  while (state.queue.length < QUEUE_TARGET) {
    const track = pickTrack(reference);
    if (!track) break;
    state.queue.push(track);
    reference = track;
  }
  if (hasPlaybackScope()) {
    state.queue = uniqueTracksById(state.queue.filter((track) => trackMatchesPlaybackScope(track)));
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
  const unusedFallback = fallback.filter((track) => {
    const id = trackId(track);
    if (state.current && trackId(state.current) === id) return false;
    return !state.queue.some((queued) => trackId(queued) === id);
  });
  const candidates = pool.length ? pool : unusedFallback;
  if (!candidates.length) return null;

  if (!reference) {
    const weighted = [];
    candidates.forEach((track) => {
      const vocalWeight = Math.round(getVocalBalanceScore(track) / 4);
      const weight = Math.max(1, Math.min(15, (track.playlistCount || 1) + selectedFacetMatches(track).length * 2 + vocalWeight));
      for (let i = 0; i < weight; i += 1) weighted.push(track);
    });
    return weighted[Math.floor(Math.random() * weighted.length)];
  }

  const ranked = uniqueTracksById(candidates)
    .map((track) => ({
      track,
      score: mixScore(reference, track) + selectionScore(track) + getVocalBalanceScore(track),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 12);
  const pick = weightedRankedChoice(ranked);
  return pick || ranked[0]?.track || candidates[0];
}

async function playNext(options = {}) {
  if (state.isMixing) return;
  if (!hasPlaybackScope()) {
    state.shouldBePlaying = false;
    state.queue = [];
    renderQueue();
    elements.autoplayGate.hidden = true;
    setStatus("先选择 Genre / Mood / Context，再生成播放列表");
    maybeShowOnboardingGuide();
    return;
  }
  if (options.user) state.userStarted = true;
  state.shouldBePlaying = true;
  elements.autoplayGate.hidden = true;

  fillQueue();
  const nextTrack = state.queue.shift() || pickTrack(state.current);
  fillQueue();
  if (!nextTrack) {
    state.shouldBePlaying = false;
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
  clearAudioRecovery();
  state.shouldBePlaying = true;
  const sourceRequestId = ++state.audioSourceRequestId;
  const oldTrack = state.current;
  const deck = getActiveDeck();
  deck.pause();
  delete deck.dataset.audioTrackId;
  delete deck.dataset.audioSourceKind;
  delete deck.dataset.fallbackAttempted;
  deck.removeAttribute("src");
  deck.load();
  getInactiveDeck().pause();
  getInactiveDeck().removeAttribute("src");
  setDeckPlaybackRate(getInactiveDeck(), 1);
  getInactiveDeck().load();
  setDeckPlaybackRate(deck, 1);
  state.currentMixPlan = null;

  if (oldTrack) pushHistory(oldTrack);
  state.current = track;
  state.lastAudioTrackId = trackId(track);
  state.lastAudioPosition = 0;
  state.lastAudioProgressAt = 0;
  rememberRecent(track.id);
  renderTrack(track, "NOW PLAYING");
  updateMixText(oldTrack, track, options.force ? "manual cut" : "direct");
  updateProgress();
  renderQueue();
  renderHistory();

  setStatus("正在连接网易云音源");
  const audioSource = await resolveNeteasePlaybackSource(track);
  if (sourceRequestId !== state.audioSourceRequestId || state.current !== track) return;
  state.currentAudioSource = audioSource;
  applyAudioSourceToDeck(deck, audioSource);
  deck.volume = state.masterVolume;
  setAudioQualityBadge(audioSource);

  try {
    await deck.play();
    clearAudioRecovery();
    elements.autoplayGate.hidden = true;
    setStatus("正在播放");
    setPlaying(true);
    prefetchNextNeteaseSource();
  } catch (error) {
    if (audioSource.member && deck.dataset.audioSourceKind === "member" && !isAutoplayRejection(error)) {
      const fallbackSource = publicNeteasePlaybackSource(track);
      state.currentAudioSource = fallbackSource;
      applyAudioSourceToDeck(deck, fallbackSource);
      setAudioQualityBadge(fallbackSource, "会员音源不可用，已降级");
      try {
        await deck.play();
        clearAudioRecovery();
        setStatus("会员音源不可用，已降级到 MP3 128K");
        setPlaying(true);
        prefetchNextNeteaseSource();
        return;
      } catch (fallbackError) {
        error = fallbackError;
      }
    }
    if (!options.user && !state.userStarted) {
      elements.autoplayGate.hidden = false;
      setStatus("等待点击启动声音");
      return;
    }
    if (isAutoplayRejection(error)) {
      elements.autoplayGate.hidden = false;
      setStatus("需要点击一次继续播放");
      return;
    }
    handleAudioError(track);
  }
}

async function crossfadeToTrack(nextTrack, eightCounts) {
  clearAudioRecovery();
  state.shouldBePlaying = true;
  const oldDeck = getActiveDeck();
  const newDeckIndex = 1 - state.activeDeckIndex;
  const newDeck = state.decks[newDeckIndex];
  const oldTrack = state.current;
  const oldAudioSource = state.currentAudioSource;
  const plan = getMixPlan(oldTrack, nextTrack, eightCounts);

  state.isMixing = true;
  state.current = nextTrack;
  state.currentMixPlan = plan;
  state.activeMixTransition = {
    oldDeck,
    newDeck,
    newDeckIndex,
    oldTrack,
    oldAudioSource,
    nextTrack,
    playStarted: false,
  };
  rememberRecent(nextTrack.id);
  renderTrack(nextTrack, "MIXING IN");
  updateMixText(oldTrack, nextTrack, "crossfade", plan);
  renderQueue();
  setStatus(`正在按 ${plan.phraseLabel} 对齐过渡 · ${formatSeconds(plan.transitionSeconds)}`);

  let audioSource = await resolveNeteasePlaybackSource(nextTrack);
  state.currentAudioSource = audioSource;
  applyAudioSourceToDeck(newDeck, audioSource);
  newDeck.volume = 0;
  setDeckPlaybackRate(oldDeck, 1);
  setDeckPlaybackRate(newDeck, plan.playbackRate);
  setAudioQualityBadge(audioSource);

  try {
    await newDeck.play();
    if (state.activeMixTransition) state.activeMixTransition.playStarted = true;
  } catch (error) {
    if (audioSource.member && !isAutoplayRejection(error)) {
      audioSource = publicNeteasePlaybackSource(nextTrack);
      state.currentAudioSource = audioSource;
      applyAudioSourceToDeck(newDeck, audioSource);
      newDeck.volume = 0;
      setDeckPlaybackRate(newDeck, plan.playbackRate);
      setAudioQualityBadge(audioSource, "会员音源不可用，已降级");
      try {
        await newDeck.play();
        if (state.activeMixTransition) state.activeMixTransition.playStarted = true;
      } catch (fallbackError) {
        error = fallbackError;
      }
    }
    if (!newDeck.paused) {
      // The fallback source started successfully; continue with the transition.
    } else {
      state.isMixing = false;
      state.current = oldTrack;
      state.currentAudioSource = oldAudioSource;
      state.currentMixPlan = null;
      state.activeMixTransition = null;
      renderTrack(oldTrack, "NOW PLAYING");
      setAudioQualityBadge(oldAudioSource);
      if (!navigator.onLine) {
        state.queue = uniqueTracksById([nextTrack, ...state.queue]);
        renderQueue();
        captureAudioRecoveryPosition(oldTrack, oldDeck);
        waitForNetworkRecovery(oldTrack);
        return;
      }
      state.failedIds.add(trackId(nextTrack));
      setStatus("下一首无法直接播放，正在重新选歌");
      playNext({ automatic: true, reason: "error" });
      return;
    }
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
  clearAudioRecovery();
  const { oldDeck, newDeck, newDeckIndex, oldTrack, nextTrack } = transition;
  oldDeck.pause();
  oldDeck.removeAttribute("src");
  oldDeck.volume = 0;
  setDeckPlaybackRate(oldDeck, 1);
  oldDeck.load();
  newDeck.volume = state.masterVolume;
  state.activeDeckIndex = newDeckIndex;
  state.isMixing = false;
  state.shouldBePlaying = true;
  state.lastAudioTrackId = trackId(nextTrack);
  state.lastAudioPosition = Number.isFinite(newDeck.currentTime) ? newDeck.currentTime : 0;
  state.lastAudioProgressAt = Date.now();
  state.activeMixTransition = null;
  if (oldTrack) pushHistory(oldTrack);
  renderTrack(nextTrack, "NOW PLAYING");
  renderHistory();
  updateProgress();
  setPlaying(true);
  prefetchNextNeteaseSource();
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
    return;
  }
  if (!document.hidden) {
    window.setTimeout(() => ensurePlaybackContinuity("foreground"), 250);
  }
}

function configureMediaSession() {
  if (!("mediaSession" in navigator)) return;
  const handlers = {
    play: () => resumeFromMediaSession(),
    pause: () => pauseFromMediaSession(),
    previoustrack: () => playPrevious(),
    nexttrack: () => playNext({ user: true, reason: "media-session-next", force: true }),
    seekbackward: (details) => seekFromMediaSession(-(details.seekOffset || 10)),
    seekforward: (details) => seekFromMediaSession(details.seekOffset || 10),
    seekto: (details) => seekToFromMediaSession(details.seekTime),
  };
  Object.entries(handlers).forEach(([action, handler]) => {
    try {
      navigator.mediaSession.setActionHandler(action, handler);
    } catch (error) {
      // Some browsers expose Media Session but support only a subset of actions.
    }
  });
}

function resumeFromMediaSession() {
  state.userStarted = true;
  state.shouldBePlaying = true;
  const deck = getActiveDeck();
  if (!state.current || !deck.src) {
    playNext({ user: true, reason: "media-session-play" });
    return;
  }
  deck.play().then(() => {
    setPlaying(true);
    setStatus("正在播放");
  }).catch((error) => {
    handlePlaybackRequestFailure(error, "media-session");
  });
}

function pauseFromMediaSession() {
  state.shouldBePlaying = false;
  clearAudioRecovery();
  state.decks.forEach((deck) => deck.pause());
  setPlaying(false);
  setStatus("已暂停");
}

function seekFromMediaSession(offset) {
  const deck = getActiveDeck();
  if (!Number.isFinite(deck.duration)) return;
  deck.currentTime = clamp((deck.currentTime || 0) + offset, 0, deck.duration);
}

function seekToFromMediaSession(time) {
  const deck = getActiveDeck();
  if (!Number.isFinite(deck.duration) || !Number.isFinite(time)) return;
  deck.currentTime = clamp(time, 0, deck.duration);
}

function updateMediaSessionMetadata(track) {
  if (!("mediaSession" in navigator) || typeof window.MediaMetadata !== "function" || !track) return;
  const artwork = track.picUrl
    ? [{ src: track.picUrl, sizes: "512x512", type: "image/jpeg" }]
    : [];
  try {
    navigator.mediaSession.metadata = new window.MediaMetadata({
      title: track.name || "Untitled",
      artist: artistLine(track),
      album: track.album || "Echo Room Music FM",
      artwork,
    });
  } catch (error) {
    // Remote artwork metadata is optional and can be rejected by stricter browsers.
  }
}

function updateMediaSessionPosition(current, duration) {
  if (!("mediaSession" in navigator) || typeof navigator.mediaSession.setPositionState !== "function") return;
  if (!Number.isFinite(duration) || duration <= 0 || !Number.isFinite(current)) return;
  try {
    navigator.mediaSession.setPositionState({
      duration,
      playbackRate: getActiveDeck().playbackRate || 1,
      position: clamp(current, 0, Math.max(0, duration - 0.01)),
    });
  } catch (error) {
    // Position state is a progressive enhancement.
  }
}

function startFromGate() {
  state.userStarted = true;
  state.shouldBePlaying = true;
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
    }).catch((error) => handlePlaybackRequestFailure(error, "gate"));
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
  const deck = getActiveDeck();
  if (!track || !state.shouldBePlaying || state.current !== track || deck.dataset.audioTrackId !== trackId(track)) return;
  captureAudioRecoveryPosition(track, deck);
  setPlaying(false);
  if (!navigator.onLine) {
    waitForNetworkRecovery(track);
    return;
  }
  scheduleAudioRecovery(track, "error", 300);
}

function handleAudioBuffering(reason) {
  const track = state.current;
  const deck = getActiveDeck();
  if (!track || !state.shouldBePlaying || state.isMixing) return;
  if (deck.dataset.audioTrackId !== trackId(track)) return;
  captureAudioRecoveryPosition(track, deck);
  if (!navigator.onLine) {
    waitForNetworkRecovery(track);
    return;
  }
  if (state.audioRecoveryInFlight || state.audioStallTimer) return;
  setStatus(reason === "stalled" ? "音源连接停滞，正在等待恢复" : "网络波动，正在缓冲当前歌曲");
  state.audioStallTimer = window.setTimeout(() => {
    state.audioStallTimer = null;
    if (!state.shouldBePlaying || state.isMixing || state.current !== track) return;
    scheduleAudioRecovery(track, reason, 0);
  }, AUDIO_STALL_GRACE_MS);
}

function handleAudioPlaying(deck) {
  if (!state.shouldBePlaying) {
    deck.pause();
    return;
  }
  clearAudioStallTimer();
  state.audioAwaitingOnline = false;
  state.audioHealthySince = Date.now();
  setPlaying(true);
  if (state.audioRecoveryAttempt > 0) {
    setStatus(`已恢复当前歌曲 · ${formatTime(deck.currentTime || state.audioRecoveryPosition)}`);
  }
}

function recordAudioProgress(deck) {
  if (!state.current || deck.dataset.audioTrackId !== trackId(state.current)) return;
  const position = Number(deck.currentTime);
  if (!Number.isFinite(position) || position < 0) return;
  const currentTrackId = trackId(state.current);
  const moved = state.lastAudioTrackId !== currentTrackId
    || Math.abs(position - state.lastAudioPosition) >= 0.02;
  state.lastAudioTrackId = currentTrackId;
  state.lastAudioPosition = position;
  if (!moved) return;
  state.lastAudioProgressAt = Date.now();
  clearAudioStallTimer();
  if (
    state.audioRecoveryAttempt > 0
    && !deck.paused
    && state.isPlaying
    && state.audioHealthySince
    && Date.now() - state.audioHealthySince >= AUDIO_RECOVERY_HEALTHY_MS
  ) {
    resetAudioRecoveryAttempts();
    setStatus(document.hidden ? "后台播放中" : "正在播放");
  }
}

function scheduleAudioRecovery(track, reason = "error", delayOverride = null) {
  const id = trackId(track);
  if (!id || !state.shouldBePlaying || state.isMixing) return;
  captureAudioRecoveryPosition(track, getActiveDeck());
  if (!navigator.onLine) {
    waitForNetworkRecovery(track);
    return;
  }
  if (state.audioRecoveryInFlight) return;
  if (state.audioRecoveryTimer && state.audioRecoveryTrackId === id) return;
  clearAudioRecoveryTimer();
  state.audioRecoveryTrackId = id;
  const retryIndex = Math.min(state.audioRecoveryAttempt, AUDIO_RECOVERY_RETRY_DELAYS_MS.length - 1);
  const delay = Number.isFinite(delayOverride)
    ? Math.max(0, delayOverride)
    : AUDIO_RECOVERY_RETRY_DELAYS_MS[retryIndex];
  state.audioRecoveryTimer = window.setTimeout(() => {
    state.audioRecoveryTimer = null;
    if (!state.current || trackId(state.current) !== id || state.isMixing || !state.shouldBePlaying) return;
    recoverCurrentTrack(track, reason);
  }, delay);
}

async function recoverCurrentTrack(track, reason) {
  const id = trackId(track);
  if (!id || state.audioRecoveryInFlight || !state.shouldBePlaying || state.isMixing) return;
  if (!navigator.onLine) {
    waitForNetworkRecovery(track);
    return;
  }
  if (state.audioRecoveryAttempt >= AUDIO_RECOVERY_MAX_ATTEMPTS) {
    skipAfterRecoveryFailure(track);
    return;
  }

  const deck = getActiveDeck();
  const resumeAt = captureAudioRecoveryPosition(track, deck);
  const wasMemberSource = deck.dataset.audioSourceKind === "member" || Boolean(state.currentAudioSource?.member);
  const attempt = state.audioRecoveryAttempt + 1;
  const sourceRequestId = ++state.audioSourceRequestId;
  state.audioRecoveryAttempt = attempt;
  state.audioRecoveryInFlight = true;
  state.audioRecoveryTrackId = id;
  state.audioHealthySince = 0;
  setPlaying(false);
  setStatus(`连接中断，正在恢复当前歌曲 (${attempt}/${AUDIO_RECOVERY_MAX_ATTEMPTS})`);

  try {
    let source;
    if (wasMemberSource && attempt >= 2) {
      source = publicNeteasePlaybackSource(track);
    } else {
      if (wasMemberSource) clearNeteaseSourceCacheForTrack(track);
      source = await resolveNeteasePlaybackSource(track);
    }
    if (!isCurrentAudioRequest(track, sourceRequestId)) return;

    state.currentAudioSource = source;
    applyAudioSourceToDeck(deck, source);
    deck.volume = state.masterVolume;
    setDeckPlaybackRate(deck, 1);
    setAudioQualityBadge(source, attempt > 1 && !source.member ? "恢复时已切换到兼容音源" : "正在恢复当前歌曲");
    await waitForAudioMetadata(deck, id, AUDIO_RECOVERY_METADATA_TIMEOUT_MS);
    if (!isCurrentAudioRequest(track, sourceRequestId)) return;
    restoreAudioPosition(deck, resumeAt);
    await deck.play();
    if (!isCurrentAudioRequest(track, sourceRequestId)) return;

    state.audioRecoveryInFlight = false;
    state.audioAwaitingOnline = false;
    state.audioHealthySince = Date.now();
    state.failedIds.delete(id);
    elements.autoplayGate.hidden = true;
    setPlaying(true);
    setStatus(`已恢复当前歌曲 · 从 ${formatTime(resumeAt)} 继续`);
  } catch (error) {
    if (!isCurrentAudioRequest(track, sourceRequestId)) return;
    state.audioRecoveryInFlight = false;
    if (isAutoplayRejection(error)) {
      elements.autoplayGate.hidden = false;
      setStatus("音源已恢复，需要点击一次继续播放");
      return;
    }
    if (!navigator.onLine) {
      waitForNetworkRecovery(track);
      return;
    }
    if (attempt >= AUDIO_RECOVERY_MAX_ATTEMPTS) {
      skipAfterRecoveryFailure(track);
      return;
    }
    scheduleAudioRecovery(track, reason);
  } finally {
    if (sourceRequestId === state.audioSourceRequestId && state.audioRecoveryInFlight) {
      state.audioRecoveryInFlight = false;
    }
  }
}

function waitForAudioMetadata(deck, expectedTrackId, timeoutMs) {
  if (deck.dataset.audioTrackId !== expectedTrackId) return Promise.resolve(false);
  if (deck.readyState >= 1) return Promise.resolve(true);
  return new Promise((resolve) => {
    let settled = false;
    const finish = (ready) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      deck.removeEventListener("loadedmetadata", onMetadata);
      deck.removeEventListener("error", onError);
      resolve(ready);
    };
    const onMetadata = () => finish(true);
    const onError = () => finish(false);
    const timer = window.setTimeout(() => finish(false), timeoutMs);
    deck.addEventListener("loadedmetadata", onMetadata, { once: true });
    deck.addEventListener("error", onError, { once: true });
  });
}

function restoreAudioPosition(deck, position) {
  if (!Number.isFinite(position) || position <= 0) return;
  const duration = Number(deck.duration);
  const target = Number.isFinite(duration) && duration > 1
    ? clamp(position, 0, duration - 0.5)
    : position;
  try {
    deck.currentTime = target;
    state.lastAudioPosition = target;
  } catch (error) {
    // Some non-seekable streams can only restart from the beginning.
  }
}

function captureAudioRecoveryPosition(track, deck) {
  const id = trackId(track);
  const deckPosition = Number(deck?.currentTime);
  const remembered = state.lastAudioTrackId === id ? Number(state.lastAudioPosition) : 0;
  const position = Number.isFinite(deckPosition) && deckPosition > 0 ? deckPosition : remembered;
  if (state.audioRecoveryTrackId !== id || state.audioRecoveryPosition <= 0) {
    state.audioRecoveryPosition = Math.max(0, (Number.isFinite(position) ? position : 0) - AUDIO_RECOVERY_REWIND_SECONDS);
  }
  state.audioRecoveryTrackId = id;
  return state.audioRecoveryPosition;
}

function isCurrentAudioRequest(track, requestId) {
  return requestId === state.audioSourceRequestId
    && state.current === track
    && trackId(state.current) === trackId(track)
    && state.shouldBePlaying;
}

function clearNeteaseSourceCacheForTrack(track) {
  const cachePrefix = `${trackId(track)}:`;
  Array.from(state.neteaseAudioSourceCache.keys())
    .filter((key) => key.startsWith(cachePrefix))
    .forEach((key) => state.neteaseAudioSourceCache.delete(key));
}

function skipAfterRecoveryFailure(track) {
  const id = trackId(track);
  if (!id || !state.current || trackId(state.current) !== id || !state.shouldBePlaying) return;
  state.audioRecoveryInFlight = false;
  state.failedIds.add(id);
  setStatus("当前歌曲连续恢复失败，正在换下一首");
  clearAudioRecoveryTimer();
  state.audioRecoveryTrackId = id;
  state.audioRecoveryTimer = window.setTimeout(() => {
    state.audioRecoveryTimer = null;
    if (!state.current || trackId(state.current) !== id || state.isMixing || !state.shouldBePlaying) return;
    playNext({ automatic: true, reason: "recovery-exhausted", force: true });
  }, 900);
}

function waitForNetworkRecovery(track) {
  clearAudioRecoveryTimer();
  clearAudioStallTimer();
  if (state.audioRecoveryInFlight) state.audioSourceRequestId += 1;
  state.audioRecoveryInFlight = false;
  state.audioAwaitingOnline = true;
  state.audioRecoveryTrackId = trackId(track);
  setPlaying(false);
  setStatus(`网络已断开，已保留 ${formatTime(state.audioRecoveryPosition)} 的播放进度`);
}

function handleNetworkOffline() {
  if (!state.current || !state.shouldBePlaying) return;
  captureAudioRecoveryPosition(state.current, getActiveDeck());
  waitForNetworkRecovery(state.current);
}

function handleNetworkOnline() {
  if (!state.current || !state.shouldBePlaying) return;
  setStatus("网络已恢复，正在继续当前歌曲");
  ensurePlaybackContinuity("online");
}

function ensurePlaybackContinuity(reason) {
  if (!state.current || !state.shouldBePlaying || state.isMixing) return;
  const deck = getActiveDeck();
  if (deck.ended) {
    playNext({ automatic: true, reason: `${reason}-ended`, force: true });
    return;
  }
  if (deck.dataset.audioTrackId !== trackId(state.current) || deck.error) {
    scheduleAudioRecovery(state.current, reason, 0);
    return;
  }
  const progressFresh = state.lastAudioTrackId === trackId(state.current)
    && Date.now() - state.lastAudioProgressAt < 3000;
  if (!deck.paused && deck.readyState >= 3 && progressFresh) {
    state.audioAwaitingOnline = false;
    clearAudioStallTimer();
    setPlaying(true);
    setStatus(document.hidden ? "后台播放中" : "正在播放");
    return;
  }
  if (deck.paused && !deck.ended && !deck.error) {
    deck.play().then(() => {
      state.audioAwaitingOnline = false;
      setPlaying(true);
      setStatus(document.hidden ? "后台播放中" : "正在播放");
    }).catch((error) => handlePlaybackRequestFailure(error, reason));
    return;
  }
  scheduleAudioRecovery(state.current, reason, 0);
}

function checkAudioContinuity() {
  if (document.hidden || !state.current || !state.shouldBePlaying || state.isMixing) return;
  if (state.audioRecoveryInFlight || state.audioRecoveryTimer || state.audioStallTimer) return;
  const deck = getActiveDeck();
  if (deck.seeking || deck.ended) return;
  const position = Number(deck.currentTime);
  if (Number.isFinite(position) && Math.abs(position - state.lastAudioPosition) >= 0.1) {
    recordAudioProgress(deck);
    return;
  }
  const lastHealthyAt = Math.max(state.lastAudioProgressAt || 0, state.audioHealthySince || 0);
  if (!lastHealthyAt || Date.now() - lastHealthyAt < AUDIO_PROGRESS_WATCHDOG_MS) return;
  if (deck.paused || deck.readyState < 3 || !state.isPlaying) {
    ensurePlaybackContinuity("watchdog");
    return;
  }
  scheduleAudioRecovery(state.current, "watchdog", 0);
}

function handlePlaybackRequestFailure(error, reason) {
  if (isAutoplayRejection(error)) {
    elements.autoplayGate.hidden = false;
    setStatus("需要点击一次继续播放");
    return;
  }
  if (state.current && state.shouldBePlaying) scheduleAudioRecovery(state.current, reason, 0);
}

function clearAudioRecoveryTimer() {
  if (state.audioRecoveryTimer) window.clearTimeout(state.audioRecoveryTimer);
  state.audioRecoveryTimer = null;
}

function clearAudioStallTimer() {
  if (state.audioStallTimer) window.clearTimeout(state.audioStallTimer);
  state.audioStallTimer = null;
}

function resetAudioRecoveryAttempts() {
  state.audioRecoveryAttempt = 0;
  state.audioRecoveryPosition = 0;
  state.audioRecoveryTrackId = trackId(state.current);
  state.audioHealthySince = 0;
}

function clearAudioRecovery() {
  if (state.audioRecoveryInFlight) state.audioSourceRequestId += 1;
  clearAudioRecoveryTimer();
  clearAudioStallTimer();
  state.audioRecoveryTrackId = "";
  state.audioRecoveryAttempt = 0;
  state.audioRecoveryInFlight = false;
  state.audioRecoveryPosition = 0;
  state.audioAwaitingOnline = false;
  state.audioHealthySince = 0;
}

function togglePlayPause() {
  state.userStarted = true;
  const active = getActiveDeck();
  if (!state.current) {
    state.shouldBePlaying = true;
    playNext({ user: true, reason: "play" });
    return;
  }

  if (active.paused) {
    state.shouldBePlaying = true;
    active.play().then(() => {
      setPlaying(true);
      setStatus("正在播放");
    }).catch((error) => handlePlaybackRequestFailure(error, "play-button"));
  } else {
    state.shouldBePlaying = false;
    clearAudioRecovery();
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

async function playListedTrack(event) {
  const item = event.target.closest("[data-track-id]");
  if (!item || !event.currentTarget.contains(item)) return;
  if (state.isMixing) {
    setStatus("正在完成当前过渡，请稍候再选歌");
    return;
  }
  const track = state.tracks.find((candidate) => trackId(candidate) === item.dataset.trackId);
  if (!track) return;
  if (state.blockedIds.has(trackId(track))) {
    setStatus("这首歌已被手动隐藏，请先在 LIVE SOUND 中恢复");
    return;
  }
  if (state.current && trackId(state.current) === trackId(track)) {
    scrollToNowPlaying();
    return;
  }

  state.userStarted = true;
  state.queue = state.queue.filter((queued) => trackId(queued) !== trackId(track));
  await switchToTrack(track, { user: true, force: true, reason: "list-select" });
  fillQueue();
  renderAll();
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
  if (rect.width <= 0) return;
  const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
  active.currentTime = ratio * active.duration;
}

function seekAudioWithKeyboard(event) {
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
  const active = getActiveDeck();
  if (!Number.isFinite(active.duration) || active.duration <= 0) return;
  event.preventDefault();
  if (event.key === 'Home') active.currentTime = 0;
  if (event.key === 'End') active.currentTime = active.duration;
  if (event.key === 'ArrowLeft') active.currentTime = clamp((active.currentTime || 0) - 5, 0, active.duration);
  if (event.key === 'ArrowRight') active.currentTime = clamp((active.currentTime || 0) + 5, 0, active.duration);
  updateProgress();
}

function updateProgress() {
  const active = getActiveDeck();
  const current = active.currentTime || 0;
  const duration = active.duration || 0;
  elements.elapsedTime.textContent = formatTime(current);
  elements.durationTime.textContent = Number.isFinite(duration) && duration > 0 ? formatTime(duration) : "--:--";
  const percent = Number.isFinite(duration) && duration > 0 ? (current / duration) * 100 : 0;
  elements.progressBar.style.width = `${Math.min(100, Math.max(0, percent))}%`;
  elements.progressTrack.setAttribute("aria-valuemax", String(Math.max(0, Math.round(duration))));
  elements.progressTrack.setAttribute("aria-valuenow", String(Math.max(0, Math.round(current))));
  elements.progressTrack.setAttribute("aria-valuetext", `${formatTime(current)} / ${duration > 0 ? formatTime(duration) : "--:--"}`);
  elements.progressTrack.setAttribute("aria-disabled", String(!(Number.isFinite(duration) && duration > 0)));
  if (elements.miniProgressBar) {
    elements.miniProgressBar.style.width = `${Math.min(100, Math.max(0, percent))}%`;
  }
  updateMediaSessionPosition(current, duration);
}

function renderAll() {
  renderPrograms();
  renderFacetTabs();
  renderSelectedFacetList();
  renderSavedMixes();
  renderSoundProfile();
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
    const count = getContextualFacetCount(button.dataset.facet, button.dataset.filter);
    const countNode = button.querySelector("span:last-child");
    if (countNode) countNode.textContent = String(count);
    button.disabled = count === 0 && !active;
  });
}

function getContextualFacetCount(dimension, key) {
  const selection = ["genre", "mood", "context"].reduce((facets, currentDimension) => {
    facets[currentDimension] = currentDimension === dimension
      ? [key]
      : Array.from(state.selectedFacets[currentDimension] || []);
    return facets;
  }, {});
  return state.tracks.filter((track) => (
    trackPassesPlaybackGuards(track) && trackMatchesFacetSelection(track, selection)
  )).length;
}

function renderTrack(track, mode) {
  elements.trackMode.textContent = mode;
  elements.trackTitle.textContent = track.name || "Untitled";
  elements.trackArtist.textContent = artistLine(track);
  elements.trackAlbum.textContent = track.album ? `Album: ${track.album}` : "";
  if (state.currentAudioSource?.trackId === trackId(track)) {
    setAudioQualityBadge(state.currentAudioSource);
  } else if (state.neteaseLoggedIn && state.neteaseHelperUnlocked) {
    elements.audioQualityBadge.textContent = "CHECKING SOURCE";
    elements.audioQualityBadge.classList.add("member-source");
    elements.audioQualityBadge.title = `正在请求${neteaseAudioQualityLabel(state.neteaseAudioQuality)}`;
  } else {
    setAudioQualityBadge(publicNeteasePlaybackSource(track));
  }
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
  elements.blockCurrentBtn.disabled = false;
  updateMediaSessionMetadata(track);
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
  elements.queueList.innerHTML = state.queue.length
    ? state.queue.map(renderSmallTrack).join("")
    : `<div class="empty-list">选择音乐标签并生成播放列表，接下来播放的歌曲会出现在这里。</div>`;
}

function renderHistory() {
  elements.historyList.innerHTML = state.history.length
    ? state.history.slice(0, 5).map(renderSmallTrack).join("")
    : `<div class="empty-list compact-empty-list">播放过的歌曲会保留在这里。</div>`;
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
    button.setAttribute("aria-label", loved ? "取消当前歌曲红心" : "红心收藏当前歌曲");
    button.textContent = loved ? "♥" : "♡";
    button.title = loved ? "取消红心" : "红心收藏当前歌曲";
  });
}

function renderSmallTrack(track) {
  const image = track.picUrl
    ? `<img alt="" src="${escapeHtml(track.picUrl)}">`
    : `<div class="small-fallback">ER</div>`;
  return `
    <button
      class="queue-item"
      type="button"
      data-track-id="${escapeHtml(trackId(track))}"
      data-track-energy="${Number.isFinite(Number(track.energy)) ? Number(track.energy) : ""}"
      data-track-vocal="${String(isLikelyVocal(track))}"
      aria-label="播放 ${escapeHtml(track.name || "Untitled")}，${escapeHtml(artistLine(track))}"
    >
      ${image}
      <div>
        <strong>${escapeHtml(track.name || "Untitled")}</strong>
        <span>${escapeHtml(artistLine(track))}</span>
        <em>${escapeHtml(queueMeta(track))}</em>
      </div>
    </button>
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
  if (!track || state.blockedIds.has(trackId(track))) return;
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
  if ("mediaSession" in navigator) {
    try {
      navigator.mediaSession.playbackState = isPlaying ? "playing" : "paused";
    } catch (error) {
      // Playback state is optional on older Media Session implementations.
    }
  }
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
  if (!trackMatchesFacetSelection(track)) return -100;
  const matched = selectedFacetMatches(track).length;
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

function trackMatchesFacetSelection(track, selection = state.selectedFacets) {
  const activeDimensions = ["genre", "mood", "context"].filter((dimension) => {
    const values = selection?.[dimension];
    return values && Array.from(values).length > 0;
  });
  if (!activeDimensions.length) return true;
  return activeDimensions.every((dimension) => (
    Array.from(selection[dimension]).some((key) => facetValueMatches(track, dimension, key))
  ));
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
  return `${selected.length} 个标签 · ${poolCount} 首唯一歌曲 · 跨维度交集 · ${getCompactFacetSummary(selected)}`;
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

  const requestId = ++state.profileRequestId;
  state.profileUsername = username;
  elements.profileUsernameInput.value = username;
  writeLocalPreference(PROFILE_USERNAME_STORAGE_KEY, username);
  if (elements.accountPanel) elements.accountPanel.open = false;
  state.lovedIds = loadLovedIds(username);
  renderAll();

  if (!canUseCloudStorage()) {
    setProfileMessage(`@${username} 已启用本机存档；部署到 Netlify 后会自动云同步。`, `@${username}`);
    return;
  }

  setProfileMessage(`正在读取 @${username} 的红心歌单...`, "同步中");
  try {
    const profile = await fetchLovedProfile(username);
    if (requestId !== state.profileRequestId || state.profileUsername !== username) return;
    state.lovedIds = new Set((profile.lovedIds || []).map(String).filter(Boolean));
    saveLovedIds({ cloud: false });
    renderAll();
    setProfileMessage(`已进入 @${username}，读取 ${state.lovedIds.size} 首红心。`, `@${username}`);
    setStatus(`已载入 @${username} 的红心歌单`);
    if (state.lovedOnly) fillQueue(true);
  } catch (error) {
    if (requestId !== state.profileRequestId || state.profileUsername !== username) return;
    const fallback = options.restore ? "继续使用上次缓存在本机的红心。" : "先使用本机缓存，云端稍后可重试。";
    setProfileMessage(`云端读取失败：${error.message}。${fallback}`, `@${username}`);
  }
}

function useLocalProfile() {
  state.profileRequestId += 1;
  state.profileUsername = "";
  removeLocalPreference(PROFILE_USERNAME_STORAGE_KEY);
  if (elements.accountPanel) elements.accountPanel.open = true;
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
  const username = state.profileUsername;
  if (!username || !canUseCloudStorage()) return;
  state.pendingCloudLovedSaves.set(username, Array.from(state.lovedIds));
  window.clearTimeout(state.profileSaveTimer);
  if (state.profileUsername === username) setProfileMessage("红心变更待同步...", "待同步");
  state.profileSaveTimer = window.setTimeout(saveCloudLovedProfile, CLOUD_SAVE_DEBOUNCE_MS);
}

async function saveCloudLovedProfile() {
  if (state.profileSaving || !state.pendingCloudLovedSaves.size) return;
  const [username, lovedIds] = state.pendingCloudLovedSaves.entries().next().value;
  state.pendingCloudLovedSaves.delete(username);
  state.profileSaving = true;
  if (state.profileUsername === username) setProfileMessage("正在保存红心...", "同步中");
  try {
    const response = await fetch(CLOUD_LOVED_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({
        username,
        lovedIds,
      }),
    });
    if (!response.ok) {
      const payload = await readJsonSafely(response);
      throw new Error(payload.error || `HTTP ${response.status}`);
    }
    if (state.profileUsername === username) {
      setProfileMessage(`@${username} 的红心已云端保存。`, `@${username}`);
    }
  } catch (error) {
    if (state.profileUsername === username) {
      setProfileMessage(`云端保存失败：${error.message}。本机已保存。`, `@${username}`);
    }
  } finally {
    state.profileSaving = false;
    if (state.pendingCloudLovedSaves.size) {
      window.clearTimeout(state.profileSaveTimer);
      state.profileSaveTimer = window.setTimeout(saveCloudLovedProfile, 0);
    }
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

async function resolveNeteasePlaybackSource(track) {
  const fallback = publicNeteasePlaybackSource(track);
  if (!state.neteaseHelperUnlocked || !state.neteaseLoggedIn) return fallback;

  const apiBase = getExportApiBase();
  if (!apiBase || !isAllowedNeteaseApiBase(apiBase)) return fallback;
  const requestedQuality = normalizeNeteaseAudioQuality(state.neteaseAudioQuality);
  const cacheKey = `${trackId(track)}:${requestedQuality}`;
  const cached = state.neteaseAudioSourceCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) return cached.source;
  if (cached) state.neteaseAudioSourceCache.delete(cacheKey);

  const levels = requestedQuality === "auto" ? ["lossless", "exhigh"] : [requestedQuality, "exhigh"];
  for (const level of uniqueStrings(levels)) {
    try {
      const payload = await requestNeteaseSession(apiBase, "/song/url/v1", {
        id: trackId(track),
        level,
      }, { timeoutMs: 7000 });
      const item = Array.isArray(payload?.data) ? payload.data[0] : payload?.data;
      if (!item?.url) continue;
      const source = {
        trackId: trackId(track),
        url: normalizeRemoteAudioUrl(item.url),
        member: true,
        bitrate: Number(item.br) || 0,
        format: String(item.type || item.encodeType || "audio").toLowerCase(),
        level: String(item.level || level),
        trial: isNeteaseTrialSource(item),
      };
      state.neteaseAudioSourceCache.set(cacheKey, {
        source,
        expiresAt: Date.now() + NETEASE_AUDIO_SOURCE_CACHE_MS,
      });
      return source;
    } catch (error) {
      console.warn(`High-quality source failed for ${trackId(track)} at ${level}`, error);
      if (!state.neteaseHelperUnlocked) break;
    }
  }
  return fallback;
}

function prefetchNextNeteaseSource() {
  if (!state.neteaseLoggedIn || !state.neteaseHelperUnlocked || !state.queue.length) return;
  const nextTrack = state.queue[0];
  window.setTimeout(() => {
    resolveNeteasePlaybackSource(nextTrack).catch(() => {});
  }, 0);
}

function isNeteaseTrialSource(item) {
  if (item?.freeTrialInfo) return true;
  const privilege = item?.freeTimeTrialPrivilege;
  return Boolean(
    privilege
    && (
      privilege.resConsumable
      || privilege.userConsumable
      || Number(privilege.type) > 0
      || Number(privilege.remainTime) > 0
    )
  );
}

function publicNeteasePlaybackSource(track) {
  return {
    trackId: trackId(track),
    url: neteaseAudioUrl(trackId(track)),
    member: false,
    bitrate: 128000,
    format: "mp3",
    level: "standard",
    trial: false,
  };
}

function normalizeRemoteAudioUrl(value) {
  const url = String(value || "");
  return window.location.protocol === "https:" && url.startsWith("http://")
    ? `https://${url.slice(7)}`
    : url;
}

function normalizeRemoteImageUrl(value) {
  const url = String(value || "").trim();
  return url.startsWith("http://") ? `https://${url.slice(7)}` : url;
}

function applyAudioSourceToDeck(deck, source) {
  deck.pause();
  deck.src = source.url;
  deck.currentTime = 0;
  deck.dataset.audioSourceKind = source.member ? "member" : "public";
  deck.dataset.audioTrackId = source.trackId;
  deck.dataset.fallbackAttempted = source.member ? "false" : "true";
  deck.load();
}

function setAudioQualityBadge(source, note = "") {
  if (!elements.audioQualityBadge) return;
  const resolved = source || publicNeteasePlaybackSource(state.current || {});
  const kbps = resolved.bitrate > 0 ? Math.round(resolved.bitrate / 1000) : 0;
  const format = String(resolved.format || "audio").toUpperCase();
  let label = resolved.member
    ? (format === "FLAC" ? "FLAC LOSSLESS" : `${format}${kbps ? ` ${kbps}K` : ""}`)
    : "MP3 128K";
  if (resolved.trial) label += " TRIAL";
  elements.audioQualityBadge.textContent = label;
  elements.audioQualityBadge.classList.toggle("member-source", resolved.member);
  elements.audioQualityBadge.title = note || (resolved.member
    ? `网易云会员音源 · ${resolved.level}${kbps ? ` · ${kbps} kbps` : ""}`
    : "匿名兼容音源 · 约 128 kbps");
}

function isAutoplayRejection(error) {
  return /notallowed|user.*gesture|play\(\).*request/i.test(`${error?.name || ""} ${error?.message || ""}`);
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
