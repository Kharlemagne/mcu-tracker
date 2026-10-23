/* ---------------- DATA ---------------- */
// e(id, phase, type, title, date, eps, note)
export const e = (id, phase, type, title, date, eps = 0, note = "") => ({ id, phase, type, title, date, eps, note });

export const CORE = [
  e("im1", 1, "Film", "Iron Man", "May 2, 2008"),
  e("im2", 1, "Film", "Iron Man 2", "May 7, 2010", 0, "Recommended watch order — precedes Incredible Hulk despite releasing later"),
  e("hulk", 1, "Film", "The Incredible Hulk", "Jun 13, 2008", 0, "Often skipped — but Ross & Abomination pay off in Phase 5"),
  e("thor1", 1, "Film", "Thor", "May 6, 2011"),
  e("cap1", 1, "Film", "Captain America: The First Avenger", "Jul 22, 2011"),
  e("avengers1", 1, "Film", "The Avengers", "May 4, 2012"),
  e("im3", 2, "Film", "Iron Man 3", "May 3, 2013"),
  e("thor2", 2, "Film", "Thor: The Dark World", "Nov 8, 2013"),
  e("cap2", 2, "Film", "Captain America: The Winter Soldier", "Apr 4, 2014", 0, "Agents of S.H.I.E.L.D. S1 syncs directly with this film"),
  e("gotg1", 2, "Film", "Guardians of the Galaxy", "Aug 1, 2014"),
  e("aou", 2, "Film", "Avengers: Age of Ultron", "May 1, 2015"),
  e("antman1", 2, "Film", "Ant-Man", "Jul 17, 2015"),
  e("civilwar", 3, "Film", "Captain America: Civil War", "May 6, 2016"),
  e("drs1", 3, "Film", "Doctor Strange", "Nov 4, 2016"),
  e("gotg2", 3, "Film", "Guardians of the Galaxy Vol. 2", "May 5, 2017"),
  e("smhc", 3, "Film", "Spider-Man: Homecoming", "Jul 7, 2017"),
  e("ragnarok", 3, "Film", "Thor: Ragnarok", "Nov 3, 2017"),
  e("bp1", 3, "Film", "Black Panther", "Feb 16, 2018"),
  { ...e("iw", 3, "Film", "Avengers: Infinity War", "Apr 27, 2018"), parts: 2 },
  e("antman2", 3, "Film", "Ant-Man and the Wasp", "Jul 6, 2018"),
  e("cm", 3, "Film", "Captain Marvel", "Mar 8, 2019", 0, "Set in 1995 — second-earliest story in the saga"),
  e("endgame", 3, "Film", "Avengers: Endgame", "Apr 26, 2019"),
  e("ffh", 3, "Film", "Spider-Man: Far From Home", "Jul 2, 2019"),
  e("wandavision", 4, "Series", "WandaVision", "Jan–Mar 2021", 9),
  e("tfaws", 4, "Series", "The Falcon and the Winter Soldier", "Mar–Apr 2021", 6),
  e("loki1", 4, "Series", "Loki — Season 1", "Jun–Jul 2021", 6, "Establishes the TVA & multiverse — good setup for Doctor Strange 2"),
  e("blackwidow", 4, "Film", "Black Widow", "Jul 9, 2021", 0, "Set between Civil War and Infinity War"),
  e("whatif1", 4, "Animated", "What If...? — Season 1", "Aug–Oct 2021", 9),
  e("shangchi", 4, "Film", "Shang-Chi and the Legend of the Ten Rings", "Sep 3, 2021"),
  e("eternals", 4, "Film", "Eternals", "Nov 5, 2021"),
  e("hawkeye", 4, "Series", "Hawkeye", "Nov–Dec 2021", 6),
  e("nwh", 4, "Film", "Spider-Man: No Way Home", "Dec 17, 2021"),
  e("moonknight", 4, "Series", "Moon Knight", "Mar–May 2022", 6),
  e("mom", 4, "Film", "Doctor Strange in the Multiverse of Madness", "May 6, 2022"),
  e("msmarvel", 4, "Series", "Ms. Marvel", "Jun–Jul 2022", 6, "Watch before The Marvels — it continues Kamala's story"),
  e("lovethunder", 4, "Film", "Thor: Love and Thunder", "Jul 8, 2022"),
  e("groot1", 4, "Animated", "I Am Groot — Season 1", "Aug 10, 2022", 5),
  e("shehulk", 4, "Series", "She-Hulk: Attorney at Law", "Aug–Oct 2022", 9),
  e("wbn", 4, "Special", "Werewolf by Night", "Oct 7, 2022"),
  e("wakandaforever", 4, "Film", "Black Panther: Wakanda Forever", "Nov 11, 2022"),
  e("gotghs", 4, "Special", "The Guardians of the Galaxy Holiday Special", "Nov 25, 2022"),
  e("quantumania", 5, "Film", "Ant-Man and the Wasp: Quantumania", "Feb 17, 2023"),
  e("gotg3", 5, "Film", "Guardians of the Galaxy Vol. 3", "May 5, 2023"),
  e("secretinvasion", 5, "Series", "Secret Invasion", "Jun–Jul 2023", 6),
  e("groot2", 5, "Animated", "I Am Groot — Season 2", "Sep 6, 2023", 5),
  e("loki2", 5, "Series", "Loki — Season 2", "Oct–Nov 2023", 6),
  e("marvels", 5, "Film", "The Marvels", "Nov 10, 2023"),
  e("whatif2", 5, "Animated", "What If...? — Season 2", "Dec 2023", 9),
  e("echo", 5, "Series", "Echo", "Jan 9, 2024", 5, "Story slots best right after Hawkeye and before Daredevil: Born Again"),
  e("dpw", 5, "Film", "Deadpool & Wolverine", "Jul 26, 2024"),
  e("agatha", 5, "Series", "Agatha All Along", "Sep–Oct 2024", 9, "Direct WandaVision sequel"),
  e("whatif3", 5, "Animated", "What If...? — Season 3 (final)", "Dec 2024", 8),
  e("yfnsm", 5, "Animated", "Your Friendly Neighborhood Spider-Man — S1", "Jan–Feb 2025", 10, "Canon, but an alternate MCU reality"),
  e("bravenewworld", 5, "Film", "Captain America: Brave New World", "Feb 14, 2025"),
  e("dbba1", 5, "Series", "Daredevil: Born Again — Season 1", "Mar–Apr 2025", 9, "Continues the Netflix Daredevil story — see Defenders tab"),
  e("thunderbolts", 5, "Film", "Thunderbolts*", "May 2, 2025"),
  e("ironheart", 5, "Series", "Ironheart", "Jun–Jul 2025", 6, "Closes Phase 5"),
  e("ff1", 6, "Film", "The Fantastic Four: First Steps", "Jul 25, 2025"),
  e("eyesofwakanda", 6, "Animated", "Eyes of Wakanda", "Aug 1, 2025", 4, "Sacred Timeline canon — earliest-set MCU stories"),
  e("zombies", 6, "Animated", "Marvel Zombies", "Sep 24, 2025", 4, "What If...? spin-off, TV-MA"),
  e("wonderman", 6, "Series", "Wonder Man", "Jan 27, 2026", 8),
  e("dbba2", 6, "Series", "Daredevil: Born Again — Season 2", "Mar–May 2026", 8),
  e("punisherolk", 6, "Special", "The Punisher: One Last Kill", "May 12, 2026"),
  e("smbnd", 6, "Film", "Spider-Man: Brand New Day", "Jul 31, 2026"),
  e("visionquest", 6, "Series", "VisionQuest", "Oct–Nov 2026", 8, "The final chapter of the WandaVision trilogy"),
];

// Slot markers rendered BEFORE the given core id (multiple allowed).
// (AoS and Defenders are woven inline in the Kontinuity sequence below, so they no longer need markers.)
export const SLOTS = {
  nwh: [{ tab: "spidey", text: "Convergence point — the Maguire (Phase 0) and Garfield (Rapture) Spider-Men both step into the MCU here. Skipped them? Last call" }],
  dpw: [{ tab: "xmen", text: "Convergence point — Blade, Elektra & Johnny Storm (Phase 0), Logan's grave & X-23 (Stream 3) and the Wolverine who failed his team (Stream 1) all meet here. My theory: that Wolverine is the feral one Jean frees in X-Men: Apocalypse" }],
};

// One-Shots — small checkable markers, placed inline by the Kontinuity sequence (see KONT)
export const sh = (id, title, date, note) => ({ id, title, date, note });
export const SHORTS = {
  os2: sh("os2", "A Funny Thing Happened on the Way to Thor's Hammer", "2011", "4 min · prelude to Iron Man 2's post-credits scene, where Coulson finds the hammer"),
  os1: sh("os1", "The Consultant", "2011", "4 min · ties off The Incredible Hulk — works nicely as a stand-in end-credits scene"),
  os4: sh("os4", "Agent Carter", "2013", "15 min · set 1946 — spawned the series"),
  os5: sh("os5", "All Hail the King", "2014", "14 min · Trevor Slattery fallout — the real Mandarin, and it seeds Shang-Chi"),
  os3: sh("os3", "Item 47", "2012", "12 min · the final, direct bridge to the S.H.I.E.L.D. pilot"),
  teamthor: sh("teamthor", "Team Thor / Team Darryl shorts (3)", "2016–18", "Where Thor was during Civil War"),
};

export const PHASES = {
  1: { name: "Phase One", color: "#3E7BFA" },
  2: { name: "Phase Two", color: "#8B5CF6" },
  3: { name: "Phase Three", color: "#F97316" },
  4: { name: "Phase Four", color: "#E23636" },
  5: { name: "Phase Five", color: "#22C55E" },
  6: { name: "Phase Six", color: "#F0B429" },
};

export const SIDE_TABS = {
  spidey: {
    label: "Spider-Man Legacy",
    fit: "Watch any time before Spider-Man: No Way Home",
    sections: [
      { title: "Tobey Maguire trilogy", badge: "Pays off in No Way Home", items: [
        e("sm2002", 0, "Film", "Spider-Man", "2002"),
        e("sm2004", 0, "Film", "Spider-Man 2", "2004"),
        e("sm2007", 0, "Film", "Spider-Man 3", "2007"),
      ]},
      { title: "Andrew Garfield", badge: "Pays off in No Way Home", items: [
        e("tasm1", 0, "Film", "The Amazing Spider-Man", "2012"),
        e("tasm2", 0, "Film", "The Amazing Spider-Man 2", "2014"),
      ]},
      { title: "Sony's Spider-Man Universe", badge: "Standalone — own universe", items: [
        e("venom1", 0, "Film", "Venom", "2018"),
        e("venom2", 0, "Film", "Venom: Let There Be Carnage", "2021", 0, "Post-credits briefly crosses into the MCU (No Way Home tie-in)"),
        e("morbius", 0, "Film", "Morbius", "2022"),
        e("madameweb", 0, "Film", "Madame Web", "2024"),
        e("venom3", 0, "Film", "Venom: The Last Dance", "2024"),
        e("kraven", 0, "Film", "Kraven the Hunter", "2024"),
      ]},
    ],
  },
  defenders: {
    label: "Defenders Saga",
    fit: "Story runs ~2015–2019. In Kharlemagne's Kontinuity it's split around Spider-Man: Homecoming — first half through The Defenders, second half after the film. Re-canonized by Daredevil: Born Again.",
    sections: [
      { title: "Recommended interleaved order", badge: "161 episodes", items: [
        e("dd1", 0, "Series", "Daredevil — Season 1", "2015", 13),
        e("jj1", 0, "Series", "Jessica Jones — Season 1", "2015", 13),
        e("dd2", 0, "Series", "Daredevil — Season 2", "2016", 13),
        e("lc1", 0, "Series", "Luke Cage — Season 1", "2016", 13),
        e("if1", 0, "Series", "Iron Fist — Season 1", "2017", 13),
        e("def", 0, "Series", "The Defenders", "2017", 8),
        e("pun1", 0, "Series", "The Punisher — Season 1", "2017", 13),
        e("jj2", 0, "Series", "Jessica Jones — Season 2", "2018", 13),
        e("lc2", 0, "Series", "Luke Cage — Season 2", "2018", 13),
        e("if2", 0, "Series", "Iron Fist — Season 2", "2018", 10),
        e("dd3", 0, "Series", "Daredevil — Season 3", "2018", 13),
        e("pun2", 0, "Series", "The Punisher — Season 2", "2019", 13),
        e("jj3", 0, "Series", "Jessica Jones — Season 3", "2019", 13),
      ]},
    ],
  },
  abc: {
    label: "ABC / Network",
    fit: "Legacy Marvel Television, semi-canon. Best begun after The Avengers — each S.H.I.E.L.D. season is anchored to a film, so you can interweave: S1→Winter Soldier, S2→Age of Ultron, S3→Civil War, S4→Doctor Strange, S5→Infinity War (split in two), S6–7 stand alone. Kharlemagne's Kontinuity cuts the seasons at the exact episodes.",
    sections: [
      { title: "Agents of S.H.I.E.L.D.", badge: "S1 syncs with Winter Soldier", items: [
        e("aos1", 0, "Series", "Season 1", "2013–14", 22, "Eps 1–16 before Winter Soldier — the HYDRA reveal detonates the show from ep 17 on"),
        e("aos2", 0, "Series", "Season 2", "2014–15", 22, "Ep 19 leads directly into Age of Ultron — finish the season after it"),
        e("aos3", 0, "Series", "Season 3", "2015–16", 22, "Late season syncs with Civil War — the Sokovia Accords hit the team"),
        e("aos4", 0, "Series", "Season 4", "2016–17", 22, "Post-Accords era; Ghost Rider & the Darkhold — pairs with Doctor Strange"),
        e("aos5", 0, "Series", "Season 5", "2017–18", 22, "Finale collides with the events of Infinity War"),
        e("aos6", 0, "Series", "Season 6", "2019", 13, "Released post-Endgame but never mentions the Snap — continuity loosens here"),
        e("aos7", 0, "Series", "Season 7", "2020", 13, "Time-travel farewell tour — effectively its own epilogue"),
      ]},
      { title: "Agent Carter", badge: "Set 1946–47 · after Captain America: The First Avenger", items: [
        e("ac1", 0, "Series", "Season 1", "2015", 8),
        e("ac2", 0, "Series", "Season 2", "2016", 10),
      ]},
      { title: "Inhumans", badge: "Phase 3 era", items: [
        e("inhumans", 0, "Series", "Inhumans", "2017", 8),
      ]},
    ],
  },
  hulu: {
    label: "Hulu / Freeform",
    fit: "Legacy street-level shows, set in the months and weeks before the Blip (2017–2018). In Kharlemagne's Kontinuity: Cloak & Dagger and Runaways S1–2 close the Mystic Saga, and Runaways S3 is split around Thor: Ragnarok in the Infinity War Saga.",
    sections: [
      { title: "Runaways", badge: "Crossed over with Cloak & Dagger", items: [
        e("run1", 0, "Series", "Season 1", "2017–18", 10),
        e("run2", 0, "Series", "Season 2", "2018", 13),
        e("run3", 0, "Series", "Season 3", "2019", 10),
      ]},
      { title: "Cloak & Dagger", badge: "", items: [
        e("cd1", 0, "Series", "Season 1", "2018", 10),
        e("cd2", 0, "Series", "Season 2", "2019", 10),
      ]},
      { title: "Helstrom", badge: "Canon status disputed", items: [
        e("helstrom", 0, "Series", "Helstrom", "2020", 10),
      ]},
    ],
  },
  xmen: {
    label: "X-Men & Fox",
    fit: "Folded into the multiverse by Deadpool & Wolverine. In Kharlemagne's Kontinuity these films are woven in across Phase 0, the Rapture and the four streams — this tab is the browse-by-franchise view.",
    sections: [
      { title: "Essential before Deadpool & Wolverine", badge: "Directly referenced", items: [
        e("deadpool1", 0, "Film", "Deadpool", "2016"),
        e("deadpool2", 0, "Film", "Deadpool 2", "2018"),
        e("logan", 0, "Film", "Logan", "2017"),
      ]},
      { title: "X-Men '97", badge: "Canon-adjacent — not the Sacred Timeline", items: [
        e("x97s1", 0, "Animated", "X-Men '97 — Season 1", "2024", 10),
        e("x97s2", 0, "Animated", "X-Men '97 — Season 2", "Jul–Aug 2026", 9),
      ]},
      { title: "Fox saga — optional deep cuts", badge: "Background context only", items: [
        e("xmen00", 0, "Film", "X-Men", "2000"),
        e("x2", 0, "Film", "X2: X-Men United", "2003"),
        e("x3", 0, "Film", "X-Men: The Last Stand", "2006"),
        e("origins", 0, "Film", "X-Men Origins: Wolverine", "2009"),
        e("firstclass", 0, "Film", "X-Men: First Class", "2011"),
        e("wolverine13", 0, "Film", "The Wolverine", "2013"),
        e("dofp", 0, "Film", "X-Men: Days of Future Past", "2014"),
        e("apocalypse", 0, "Film", "X-Men: Apocalypse", "2016"),
        e("darkphoenix", 0, "Film", "Dark Phoenix", "2019"),
        e("newmutants", 0, "Film", "The New Mutants", "2020"),
      ]},
      { title: "Fox TV — The Gifted & Legion", badge: "Loosely tied to the films", items: [
        e("legion1", 0, "Series", "Legion — Season 1", "2017", 8, "Officially set in a universe parallel to the X-Men films"),
        e("gifted1", 0, "Series", "The Gifted — Season 1", "2017–18", 13, "Officially a timeline branch where the X-Men have vanished"),
        e("legion2", 0, "Series", "Legion — Season 2", "2018", 11),
        e("gifted2", 0, "Series", "The Gifted — Season 2", "2018–19", 16),
        e("legion3", 0, "Series", "Legion — Season 3 (final)", "2019", 8),
      ]},
    ],
  },
  legacy: {
    label: "Legacy Marvel",
    fit: "Pre-MCU Marvel movies — none are canon, but Deadpool & Wolverine resurrects several of these heroes in the Void. Watch any of them whenever; watching before D&W maximizes the payoff.",
    sections: [
      { title: "Blade trilogy", badge: "Snipes' Blade returns in D&W", items: [
        e("blade1", 0, "Film", "Blade", "1998"),
        e("blade2", 0, "Film", "Blade II", "2002"),
        e("blade3", 0, "Film", "Blade: Trinity", "2004"),
      ]},
      { title: "Daredevil & Elektra", badge: "Garner's Elektra returns in D&W", items: [
        e("dd2003", 0, "Film", "Daredevil", "2003", 0, "Affleck's Matt Murdock — the Director's Cut is the version to watch"),
        e("elektra05", 0, "Film", "Elektra", "2005"),
      ]},
      { title: "Fantastic Four before First Steps", badge: "Evans' Johnny Storm cameos in D&W", items: [
        e("ff2005", 0, "Film", "Fantastic Four", "2005"),
        e("ff2007", 0, "Film", "Fantastic Four: Rise of the Silver Surfer", "2007"),
        e("fant4stic", 0, "Film", "Fantastic Four (Fant4stic)", "2015", 0, "The reboot — infamous, but it completes the set"),
      ]},
      { title: "Hulk & Ghost Rider era", badge: "Sony/Universal one-offs", items: [
        e("hulk2003", 0, "Film", "Hulk", "2003", 0, "Ang Lee's take — replaced by The Incredible Hulk"),
        e("gr2007", 0, "Film", "Ghost Rider", "2007"),
        e("gr2011", 0, "Film", "Ghost Rider: Spirit of Vengeance", "2012"),
      ]},
      { title: "Punisher trilogy", badge: "Three Franks, zero continuity", items: [
        e("pun89", 0, "Film", "The Punisher", "1989", 0, "Dolph Lundgren"),
        e("pun04", 0, "Film", "The Punisher", "2004", 0, "Thomas Jane"),
        e("punwz", 0, "Film", "Punisher: War Zone", "2008", 0, "Ray Stevenson"),
      ]},
      { title: "Deep cuts & curiosities", badge: "For the completionists", items: [
        e("howard86", 0, "Film", "Howard the Duck", "1986", 0, "The first Marvel theatrical film — Howard later cameos in Guardians of the Galaxy"),
        e("cap1990", 0, "Film", "Captain America", "1990", 0, "Direct-to-video oddity"),
        e("nickfury98", 0, "Film", "Nick Fury: Agent of S.H.I.E.L.D.", "1998", 0, "TV movie starring David Hasselhoff, yes really"),
        e("manthing", 0, "Film", "Man-Thing", "2005", 0, "Horror obscurity"),
      ]},
    ],
  },
};

/* ---------------- PHASE 0, THE RAPTURE & THE FOUR STREAMS ---------------- */
// Kharlemagne's Kontinuity: a fan-built continuity that threads the pre-MCU films into the Sacred Timeline.
// Entries are shared with the side tabs by id, so checkmarks stay in sync everywhere.
export const ENTRY = {};
Object.values(SIDE_TABS).forEach(t => t.sections.forEach(sec => sec.items.forEach(it => { ENTRY[it.id] = it; })));

// Notes that only apply in the Phase 0 / Rapture context (they override the side-tab note there)
export const P0_NOTES = {
  origins: "Set 1845–1979 — Logan's story starts here",
  wolverine13: "The emotional end of the original line — its mid-credits scene points straight at Days of Future Past",
  firstclass: "Set 1962 — watch it here, not at the start: it exists to set up Days of Future Past",
  dofp: "Set 1973 / 2023 — the shattering point where the legacy timeline fractures",
  fant4stic: "The reboot that recast everybody — exactly the kind of fracture the Rapture explains",
  gr2007: "The Sony thread begins here — the one thing that holds together through the Rapture",
  tasm2: "The anchor point — its fallout stabilizes the Sony stream. Garfield steps into the MCU in No Way Home",
  gifted1: "Officially a timeline branch where the X-Men have vanished — theory: the timeline failing to stop the Sentinel future",
  legion3: "The finale rewrites the past with a fresh start — the thematic fit that settles the Rapture into four streams",
  apocalypse: "Jean frees the feral Logan here — theory: he's the Wolverine who later fails his team in Deadpool & Wolverine",
};

export const P0 = [
  {
    key: "legacy",
    title: "Phase 0 — The Legacy Timestream",
    color: "#14B8A6",
    badge: "Fan theory",
    blurb: "Every pre-MCU Marvel film, interwoven by the period it's set in so they play like one world. It opens with Logan's origin and closes with The Wolverine. This is a fun way to line them up for a good watch — not an official continuity.",
    parts: [{ ids: ["origins", "cap1990", "nickfury98", "blade1", "xmen00", "blade2", "sm2002", "x2", "dd2003", "blade3", "sm2004", "elektra05", "ff2005", "manthing", "x3", "sm2007", "ff2007", "wolverine13"] }],
  },
  {
    key: "rapture",
    title: "Phase −0 — The Rapture",
    color: "#C026D3",
    badge: "Fan theory · thematic fit",
    blurb: "Days of Future Past is the catalyst: the timeline fractures into a fluid soup of recasts and reboots, which is why there are three Franks and zero continuity. I'm establishing a continuity where there isn't one, so this is a thematic fit rather than anything official — Legion's finale, a literal rewrite of the past, is what settles the whole mess into four streams.",
    parts: [
      { title: "The catalyst", ids: ["firstclass", "dofp"] },
      { title: "Part A — The splinter", blurb: "The fickle soup: recasts, reboots and three different Franks, none of them able to hold.", ids: ["howard86", "pun89", "hulk2003", "pun04", "punwz", "fant4stic"] },
      { title: "Part B — The Sony anchor", color: "#A3E635", blurb: "Ghost Rider primes the supernatural, then The Amazing Spider-Man brings the science. This is the one thread that holds steady while everything around it flickers — the seed of the Sony stream, which picks back up in the MCU list below, starting with Venom.", ids: ["gr2007", "gr2011", "tasm1", "tasm2"] },
      { title: "Part C — The dying universes", blurb: "The Gifted is the branch where the X-Men vanish; Legion's finale rewrites the past and closes the Rapture.", ids: ["gifted1", "gifted2", "legion1", "legion2", "legion3"] },
    ],
  },
  {
    key: "stream1",
    title: "The Four Streams — Stream 1",
    color: "#38BDF8",
    badge: "Fan theory",
    blurb: "With the Rapture stabilized, reality settles into four streams. Stream 1 — Apocalypse and Dark Phoenix — comes first. Stream 2 is the MCU itself, next. Streams 3 (Deadpool–Logan) and 4 (the Sony verse) are woven into the MCU list at the points where they cross paths with it.",
    parts: [{ ids: ["apocalypse", "darkphoenix"] }],
  },
];

// Streams 3 and 4, woven into the MCU list: rendered AFTER the given core id's row (inside that id's own phase)
export const STREAM_TAGS = {
  dp: ["Stream 3 · Deadpool–Logan", "#F472B6"],
  sony: ["Stream 4 · Sony Verse", "#A3E635"],
};
export const st = (id, kind, note) => ({ ...ENTRY[id], tag: STREAM_TAGS[kind][0], accent: STREAM_TAGS[kind][1], note });
export const STREAM_AFTER = {
  // (Most stream films are placed inline in their own sagas — see KONT)
  nwh: [st("morbius", "sony", "Vulture's mid-credits scene is fallout from No Way Home's multiverse break")],
};

/* ---------------- THE KONTINUITY SEQUENCE (Phase One → Phase Six) ---------------- */
// Data-driven watch order. Token kinds:
//   core  – a CORE entry (numbered in Kontinuity order), optional note override
//   part  – half of Infinity War (completion of the film is derived from both halves)
//   seg   – an Agents of S.H.I.E.L.D. episode range (shares episode checkmarks with the season in the side tab)
//   def   – an inline group of Netflix Defenders Saga shows
//   short – a One-Shot       slot – a red marker pointing at a side tab
export const CORE_BY_ID = Object.fromEntries(CORE.map(c => [c.id, c]));
export const AOS_BLUE = "#60A5FA";
export const DEF_ROSE = "#FB7185";
export const rg = (parent, from, to, label) => ({ parent, from, to, label });
export const HULU_CYAN = "#22D3EE";
export const seg = (id, title, date, ranges, note, tag = "Agents of S.H.I.E.L.D.", accent = AOS_BLUE) => ({
  id, phase: 0, type: "Series", title, date, ranges, note,
  eps: ranges.reduce((n, r) => n + r.to - r.from + 1, 0),
  tag, accent,
});
export const SEGS = {
  aos1a: seg("aos1a", "Agents of S.H.I.E.L.D. — S1, Eps 1–16", "2013–14", [rg("aos1", 1, 16, "Season 1")], "Starts right after Item 47 — pause at ep 16 and head into Winter Soldier"),
  aos1b: seg("aos1b", "Agents of S.H.I.E.L.D. — S1 Eps 17–22 & S2 Eps 1–19", "2014–15", [rg("aos1", 17, 22, "Season 1"), rg("aos2", 1, 19, "Season 2")], "The HYDRA reveal detonates the show from ep 17 on — S2 ep 19 leads straight into Age of Ultron"),
  aos2b: seg("aos2b", "Agents of S.H.I.E.L.D. — S2, Eps 20–22", "2015", [rg("aos2", 20, 22, "Season 2")], "The aftermath of Ultron — finish the season, then Ant-Man"),
  aos3a: seg("aos3a", "Agents of S.H.I.E.L.D. — S3, Eps 1–19", "2015–16", [rg("aos3", 1, 19, "Season 3")], "Pause at ep 19 — Civil War is next"),
  aos3b: seg("aos3b", "Agents of S.H.I.E.L.D. — S3, Eps 20–22", "2016", [rg("aos3", 20, 22, "Season 3")], "Ep 20 \"Emancipation\" is the direct fallout of the Sokovia Accords"),
  aos4a: seg("aos4a", "Agents of S.H.I.E.L.D. — S4, Eps 1–8", "2016", [rg("aos4", 1, 8, "Season 4")], "Ghost Rider's arc — pause after ep 8 and watch the whole Inhumans series before coming back"),
  aos4b: seg("aos4b", "Agents of S.H.I.E.L.D. — S4, Eps 9–22", "2016–17", [rg("aos4", 9, 22, "Season 4")], "Back to S.H.I.E.L.D. without missing a beat — the LMDs and the Framework"),
  run3a: seg("run3a", "Runaways — S3, Eps 1–5", "2019", [rg("run3", 1, 5, "Season 3")], "Wraps up the Season 2 cliffhangers — ep 5 ends on the six-month jump", "Runaways", HULU_CYAN),
  run3b: seg("run3b", "Runaways — S3, Eps 6–10", "2019", [rg("run3", 6, 10, "Season 3")], "Tandy and Tyrone cross over from Cloak & Dagger in ep 8 — the finale lands just before Infinity War", "Runaways", HULU_CYAN),
  aos5a: seg("aos5a", "Agents of S.H.I.E.L.D. — S5, Eps 1–10", "2017", [rg("aos5", 1, 10, "Season 5")], "The Future Space Arc"),
  aos5b: seg("aos5b", "Agents of S.H.I.E.L.D. — S5, Ep 11", "2018", [rg("aos5", 11, 11, "Season 5")], "The return to 2018 — the Asgardian reference sets up Thor: Ragnarok"),
  aos5c: seg("aos5c", "Agents of S.H.I.E.L.D. — S5, Eps 12–18", "2018", [rg("aos5", 12, 18, "Season 5")], "The pre-invasion countdown"),
  aos5d: seg("aos5d", "Agents of S.H.I.E.L.D. — S5, Eps 19–22", "2018", [rg("aos5", 19, 22, "Season 5")], "The real-time parallel — the fight against Graviton while New York is under attack"),
};
export const DEF_GROUPS = {
  def1: { key: "def1", title: "Defenders Saga — First Half", ids: ["dd1", "jj1", "dd2", "lc1", "if1", "def"],
    blurb: "Fills the gap between Civil War and Homecoming, while Peter is sidelined. Runs through The Defenders — then pause for Spider-Man." },
  def2: { key: "def2", title: "Defenders Saga — Second Half", ids: ["pun1", "jj2", "lc2", "if2", "dd3", "pun2", "jj3"],
    blurb: "Picks back up after Homecoming: The Punisher and the second seasons, closing with Jessica Jones S3." },
};
export const IW_PARTS = [1, 2].map(n => ({ ...CORE_BY_ID.iw, id: `iw#${n}`, partOf: "iw", parts: undefined, title: `${CORE_BY_ID.iw.title} — Part ${n}` }));

export const kc = (id, note) => ({ k: "core", id, note });
export const kp = (n, note) => ({ k: "part", n, note });
export const kg = (id) => ({ k: "seg", id });
export const kd = (id) => ({ k: "def", id });
export const ks = (id) => ({ k: "short", id });
export const kl = (tab, text) => ({ k: "slot", tab, text });
// a whole season/series from a side tab, woven into the sequence (shares checkmarks with that tab)
export const kx = (id, title, tag, accent, note) => ({ k: "side", id, title, tag, accent, note });
// a stream-3 (Deadpool–Logan) or stream-4 (Sony) film placed inline
export const kn = (id, kind, note) => ({ k: "stream", id, kind, note });
// a short aside box (e.g. a fan-theory blurb)
export const kb = (title, text) => ({ k: "blurb", title, text });

export const KONT = [
  { key: "p1", title: PHASES[1].name, color: PHASES[1].color,
    items: [kc("im1"), kc("im2"), ks("os2"), kc("hulk"), ks("os1"), kc("thor1"), kc("cap1"),
      kl("abc", "Agent Carter territory (set 1946) — the one-shot right below now, the series any time after"), ks("os4"), kc("avengers1")] },
  { key: "cosmic", title: "Phase 2: The Cosmic Saga & Earth Setup", color: "#8B5CF6",
    blurb: "Thor: The Dark World gives a cosmic intro after The Avengers and a break from Earth before Iron Man 3. The Guardians films are binged back-to-back while the team is fresh, and Item 47 is the direct bridge into the S.H.I.E.L.D. pilot.",
    items: [
      kc("thor2", "A cosmic intro after The Avengers — a break from Earth before Iron Man 3"),
      kc("gotg1", "The Collector's post-credit scene in Dark World leads you right into deep space"),
      kc("gotg2", "Binge it back-to-back while the team is fresh — it takes place only a few months after the first film, so by timeline this is the natural spot for it"),
      kc("groot1", "Baby Groot shorts — a light follow-up straight after Vol. 2"),
      kc("groot2", "Season 2 of the Groot shorts — keep going before heading back to Earth"),
      kc("im3", "Tony deals with the fallout of New York — introduces Extremis"),
      ks("os5"), ks("os3")] },
  { key: "shield", title: "S.H.I.E.L.D. Fall & The Age of Ultron", color: "#38A3F5",
    blurb: "Agents of S.H.I.E.L.D. woven in at its real cut points — the HYDRA twist lands on the show and the film at the same moment.",
    items: [
      kg("aos1a"),
      kc("cap2", "The HYDRA twist drops"),
      kg("aos1b"),
      kc("aou", "Coulson's Theta Protocol triggers the Helicarrier rescue"),
      kg("aos2b"),
      kc("antman1")] },
  { key: "civil", title: "The Civil War Fallout & Street-Level Era", color: "#F97316",
    blurb: "The Accords fracture the world, and the Netflix street-level heroes fill the gap while Peter is sidelined between Civil War and Homecoming.",
    items: [
      kg("aos3a"),
      kc("civilwar", "The Sokovia Accords fracture the world"),
      kg("aos3b"),
      ks("teamthor"),
      kd("def1"),
      kc("smhc", "Peter deals with the immediate aftermath of Germany"),
      kd("def2"),
      kc("bp1", "Wakanda opens its borders — directly following Civil War"),
      kc("eyesofwakanda")] },
  { key: "mystic", title: "The Mystic Saga", color: "#E879F9",
    blurb: "Doctor Strange teaches the rules of magic and dimensions, then Season 4 runs with them. Inhumans is a single self-contained story, so it drops in whole at the S4 ep 8 break — no bouncing between shows. Cloak & Dagger and Runaways close the saga: all of their seasons are set in the months and weeks before the Blip (Runaways Season 3 finishes in the Infinity War Saga).",
    items: [
      kc("drs1", "The rules of magic, dimensions and the Darkhold"),
      kg("aos4a"),
      kx("inhumans", "Inhumans", "Inhumans", AOS_BLUE, "The entire 8-episode series, start to finish — it's one self-contained story"),
      kg("aos4b"),
      kx("cd1", "Cloak & Dagger — Season 1", "Cloak & Dagger", HULU_CYAN, "Set in 2017 — a self-contained street-level story"),
      kx("cd2", "Cloak & Dagger — Season 2", "Cloak & Dagger", HULU_CYAN, "Ends with them hopping on a bus out of New Orleans"),
      kx("run1", "Runaways — Season 1", "Runaways", HULU_CYAN, "Picks up in late 2017 and runs into 2018"),
      kx("run2", "Runaways — Season 2", "Runaways", HULU_CYAN, "Season 3 picks up in the Infinity War Saga, right after S.H.I.E.L.D. S5 ep 10")] },
  { key: "infinity", title: "The Infinity War Saga", color: "#EF4444",
    blurb: "Season 5 is cut around the Ragnarok tie-in and the film's two halves, so its finale plays in real time alongside the invasion. Runaways Season 3 is split around Ragnarok too, ending just before Infinity War. Infinity War is split in two: pause at the Quinjet departure, finish the season, then resume.",
    items: [
      kg("aos5a"),
      kg("run3a"),
      kg("aos5b"),
      kc("ragnarok", "The mid-season movie break"),
      kg("run3b"),
      kg("aos5c"),
      kp(1, "Watch up to the Scotland rescue / Quinjet departure (~45 min)"),
      kg("aos5d"),
      kp(2, "Resume from the Quinjet scene to the final credits")] },
  { key: "endgame", title: "The Endgame Saga", color: "#F0B429",
    items: [kc("cm"), kc("antman2"), kc("endgame")] },
  { key: "secretinvasion", title: "The Secret Invasion Saga", color: "#84CC16",
    blurb: "A grounded story of political paranoia, shifting global powers and hidden threats on Earth — before the MCU spirals out into multiversal madness. Each piece sets up the finale: Fury comes down from the S.A.B.E.R. space station to a fractured, weaponized world.",
    items: [
      kc("blackwidow", "The starting line for life after Endgame — it resolves Natasha's legacy and introduces Val and Yelena, launching the espionage tone. Set between Civil War and Infinity War, but its after-credits would spoil an Endgame event, so it can't follow its setting"),
      kc("wandavision", "The mental fallout of the Blip — its post-credits has a Skrull telling Monica an old friend wants her in space"),
      kc("tfaws", "Establishes the political power vacuum on Earth: newly weaponized government agencies, with Val rising alongside John Walker"),
      kc("msmarvel", "Sets up the militarized, paranoid Department of Damage Control — and it continues Kamala's story ahead of The Marvels"),
      kc("ffh", "A world still mourning Iron Man and dealing with the DODC — its post-credits twist reveals Talos and Soren impersonating Fury and Maria Hill"),
      kc("secretinvasion", "The payoff: every piece above hits the board here")] },
  { key: "multiverse", title: "Into the Multiverse", color: "#A855F7",
    blurb: "Loki Season 1 brings the multiverse in, and What If...? Season 1 introduces the concept a little more. Deadpool pulls us into the X-Men line, Venom brings us back to the Sony verse, and Agents of S.H.I.E.L.D. Season 6 closes the section as an alternate continuity after the events of Thanos.",
    items: [
      kc("loki1", "Brings the multiverse in — the TVA and the sacred timeline"),
      kc("whatif1", "Introduces the multiverse concept a little more"),
      kn("deadpool1", "dp", "Pulls us into the X-Men line — Stream 3 begins here, Wade's world, the one Deadpool & Wolverine draws from"),
      kn("venom1", "sony", "Brings us back to the Sony verse — Stream 4 picks up here, stable on its own after the Garfield ripple"),
      kx("aos6", "Agents of S.H.I.E.L.D. — Season 6", "Agents of S.H.I.E.L.D.", AOS_BLUE, "An alternate continuity after the events of Thanos — released post-Endgame but never mentions the Snap")] },
  { key: "madness", title: "No Way to Madness", color: "#F43F5E",
    blurb: "Venom's post-credits scene pulls him toward the MCU, and No Way Home breaks the multiverse open. The Sony stream carries on through Morbius and Kraven, and Doctor Strange in the Multiverse of Madness is where it all lands.",
    items: [
      kn("venom2", "sony", "Its post-credits scene pulls Venom toward the MCU — leads straight into No Way Home"),
      kc("nwh", "The multiverse breaks open"),
      kn("kraven", "sony", "The Sony stream's closer before the madness"),
      kc("whatif2"),
      kc("mom","Where the multiverse break lands")] },
  { key: "outmulti", title: "Out of the Multiverse", color: "#10B981",
    blurb: "Stepping back out of the multiverse and into grounded stories: Shang-Chi, Eternals, then Hawkeye, then everything set in the in-universe year 2025, listed by where it falls in that year.",
    items: [
      kc("shangchi"),
      kc("eternals"),
      kc("hawkeye"),
      kc("wakandaforever", "In-universe spring 2025 — Riri Williams is introduced as an MIT student, fights alongside Shuri against Talokan, and leaves her Wakandan suit behind at the end"),
      kc("moonknight", "In-universe March–May 2025 — parallel street-level and mystical events"),
      kc("echo", "In-universe May 2025 — five months after the holiday events of Hawkeye"),
      kc("lovethunder", "In-universe July 2025 — cosmic events taking place in the summer"),
      kc("shehulk", "In-universe August–October 2025 — overlaps slightly with the end of Shang-Chi"),
      kc("ironheart", "In-universe mid-October 2025 — about 5–6 months after Wakanda Forever: Riri has been expelled from MIT, goes home to Chicago and builds a new suit without Wakandan vibranium")] },
  { key: "holiday", title: "Holiday Special", color: "#F59E0B",
    blurb: "Werewolf by Night is a Halloween special, followed by the Guardians of the Galaxy Holiday Special.",
    items: [
      kc("wbn", "A Halloween special — a standalone autumn horror story"),
      kc("gotghs", "A Christmas special bridging into the Guardians' next movie")] },
  { key: "guardians", title: "The Marvelous Guardians", color: "#EC4899",
    blurb: "Our cosmic epic: Guardians of the Galaxy Vol. 3 first, then The Marvels, whose small setup reference leads us into Quantumania.",
    items: [kc("gotg3"), kc("marvels", "Has a small setup reference that gets us into Quantumania")] },
  { key: "backmulti", title: "Back into the Multiverse", color: "#14B8A6",
    blurb: "With the multiverse open, Ant-Man and the Wasp: Quantumania pulls us back in, Loki Season 2 follows, and What If...? Season 3, Your Friendly Neighborhood Spider-Man and Marvel Zombies close the section out.",
    items: [kc("quantumania"), kc("loki2"), kc("whatif3"), kc("yfnsm"), kc("zombies")] },
  { key: "timetravel", title: "Time Travel Shenanigans", color: "#FACC15",
    blurb: "Madame Web and Deadpool 2 open the section, and Agents of S.H.I.E.L.D. finally finishes here with Season 7, its time-travel farewell tour.",
    items: [
      kn("madameweb", "sony", "The Sony stream continues"),
      kn("deadpool2", "dp", "Stream 3 continues"),
      kx("aos7", "Agents of S.H.I.E.L.D. — Season 7", "Agents of S.H.I.E.L.D.", AOS_BLUE, "The time-travel farewell tour — the series' finale")] },
  { key: "doomsday", title: "Path to Doomsday", color: "#DC2626",
    blurb: "Still a multiversal stretch, cleaned up nicely. The Sony stream wraps up, the road to Logan and Deadpool & Wolverine follows, and The Fantastic Four: First Steps closes the section as its own stream in the multiverse.",
    items: [
      kn("venom3", "sony", "The end of Venom's run"),
      kn("newmutants", "dp", "Stream 3 — slotted into Wade's world by the Kontinuity"),
      kb("Fan theory — The New Mutants", "Deadpool 2's Essex home introduces a younger generation of mutants, and The New Mutants primes the cloning behind X-23. I set it after Logan wakes in 2023, closer to 2026, with an unreliable narrator: Logan tells us no mutants have been born naturally since 2004, so the kids' families are false memories, planted so they can be engineered into weapons, with trauma triggering the mutant gene. Join the stories up and Mr. Sinister becomes a background villain working through a corporation, spanning all of it. From here we're on the pathway to Logan. A thematic fit, not canon."),
      kn("logan", "dp", "Set in 2029 — the pathway to Logan that begins when he wakes up in 2023"),
      kc("dpw", "Logan leads directly into Deadpool & Wolverine — my theory: the Wolverine who failed his team could be the one from X-Men: Apocalypse"),
      kc("ff1", "Its own stream in the multiverse")] },
  { key: "nwo", title: "New World Order", color: "#64748B",
    blurb: "Roughly 2026 to 2028: the establishment of all kinds of fallouts and structures as the world tries to reassemble. Ross becomes President of the United States, Kingpin becomes Mayor of New York, and Val — with her dark-ops team, Sentry included — is the closest thing to S.H.I.E.L.D. we have anymore.",
    items: [
      kc("agatha", "Three years after WandaVision"),
      kc("bravenewworld", "Deals with the global fallout of the new world order"),
      kc("dbba1"),
      kc("wonderman"),
      kc("punisherolk"),
      kc("thunderbolts", "Val's black-ops team handles the fallout of Brave New World's events"),
      kc("dbba2", "The political fallout from Thunderbolts*"),
      kc("smbnd"),
      kc("visionquest")] },
  ...[4, 5, 6].map(p => ({ key: `p${p}`, title: PHASES[p].name, color: PHASES[p].color, items: CORE.filter(it => it.phase === p && !["groot1", "groot2", "blackwidow", "wandavision", "tfaws", "msmarvel", "secretinvasion", "loki1", "whatif1", "shangchi", "nwh", "mom", "whatif2", "marvels", "quantumania", "loki2", "whatif3", "zombies", "ff1", "yfnsm", "dpw", "eternals", "echo", "moonknight", "lovethunder", "shehulk", "ironheart", "wbn", "wakandaforever", "gotghs", "hawkeye", "gotg3", "agatha", "bravenewworld", "dbba1", "wonderman", "punisherolk", "thunderbolts", "dbba2", "smbnd", "visionquest", "eyesofwakanda"].includes(it.id)).map(it => kc(it.id)) })).filter(sec => sec.items.length),
];

// numbering by Kontinuity order (core entries only)
export const KONT_NUM = {};
export const ORDERED_CORE = [];
KONT.forEach(sec => sec.items.forEach(t => {
  const id = t.k === "core" ? t.id : t.k === "part" ? "iw" : null;
  if (id && !(id in KONT_NUM)) { ORDERED_CORE.push(CORE_BY_ID[id]); KONT_NUM[id] = ORDERED_CORE.length; }
}));

export const STORAGE_KEY = "mcu-tracker-v1";

/* ---------------- NAVIGATION ---------------- */
export const TOP_TABS = [
  { key: "kontinuity", label: "Kharlemagne's Kontinuity" },
  { key: "release", label: "Canon Release Order" },
  { key: "legacyEra", label: "Legacy Era", subs: ["spidey", "legacy", "xmen"] },
  { key: "series", label: "Series Saga", subs: ["defenders", "abc", "hulu"] },
];
// which top-level tab each side tab lives under (slot markers use this to jump)
export const TAB_HOME = Object.fromEntries(TOP_TABS.flatMap(t => (t.subs || []).map(s => [s, t.key])));
export const SUB_LABELS = Object.fromEntries(Object.entries(SIDE_TABS).map(([k, v]) => [k, v.label]));
export const RELEASE_FILTERS = [
  { key: "all", label: "Everything" },
  { key: "core", label: "Core canon" },
  { key: "series", label: "Series Saga" },
  { key: "legacyEra", label: "Legacy Era" },
];

/* ---------------- RELEASE-ORDER DATA ---------------- */
// Precise sort dates (YYYY-MM or YYYY-MM-DD) where the display text is only a year/range.
// One-Shots sort by their home-video debut.
export const SORT_OVERRIDE = {
  // core series premieres
  wandavision: "2021-01-15", tfaws: "2021-03-19", loki1: "2021-06-09", whatif1: "2021-08-11", hawkeye: "2021-11-24",
  moonknight: "2022-03-30", msmarvel: "2022-06-08", shehulk: "2022-08-18", secretinvasion: "2023-06-21",
  loki2: "2023-10-05", whatif2: "2023-12-22", agatha: "2024-09-18", whatif3: "2024-12-22", yfnsm: "2025-01-29",
  dbba1: "2025-03-04", ironheart: "2025-06-24", dbba2: "2026-03-24", visionquest: "2026-10-13",
  // one-shots
  os1: "2011-09", os2: "2011-10", os3: "2012-09", os4: "2013-09-24", os5: "2014-02", teamthor: "2016-09-13",
  // spider-man
  sm2002: "2002-05", sm2004: "2004-06", sm2007: "2007-05", tasm1: "2012-07", tasm2: "2014-05-02",
  venom1: "2018-10-05", venom2: "2021-10", morbius: "2022-04", madameweb: "2024-02", venom3: "2024-10", kraven: "2024-12-13",
  // netflix defenders
  dd1: "2015-04", jj1: "2015-11", dd2: "2016-03", lc1: "2016-09-30", if1: "2017-03-17", def: "2017-08", pun1: "2017-11-17",
  jj2: "2018-03", lc2: "2018-06-22", if2: "2018-09-07", dd3: "2018-10-19", pun2: "2019-01", jj3: "2019-06-14",
  // abc / network
  aos1: "2013-09-24", aos2: "2014-09", aos3: "2015-09", aos4: "2016-09-20", aos5: "2017-12", aos6: "2019-05", aos7: "2020-05",
  ac1: "2015-01", ac2: "2016-01", inhumans: "2017-09",
  // hulu / freeform
  run1: "2017-11-21", run2: "2018-12", run3: "2019-12", cd1: "2018-06-07", cd2: "2019-04-04", helstrom: "2020-10",
  // x-men & fox
  xmen00: "2000-07", x2: "2003-05", x3: "2006-05", origins: "2009-05", firstclass: "2011-06", wolverine13: "2013-07",
  dofp: "2014-05-23", deadpool1: "2016-02", apocalypse: "2016-05-27", logan: "2017-03-03", deadpool2: "2018-05",
  darkphoenix: "2019-06-07", newmutants: "2020-08", x97s1: "2024-03", x97s2: "2026-07-01",
  legion1: "2017-02", gifted1: "2017-10", legion2: "2018-04-03", gifted2: "2018-09-25", legion3: "2019-06-24",
  // legacy marvel
  howard86: "1986-08", pun89: "1989-10", cap1990: "1990-12", blade1: "1998-08", nickfury98: "1998-05", blade2: "2002-03",
  dd2003: "2003-02", hulk2003: "2003-06", pun04: "2004-04", blade3: "2004-12", elektra05: "2005-01", manthing: "2005-04",
  ff2005: "2005-07", gr2007: "2007-02", ff2007: "2007-06", punwz: "2008-12", gr2011: "2012-02", fant4stic: "2015-08",
};
export const MONTH_IDX = { Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6, Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12 };
export function sortKey(entry) {
  const ov = SORT_OVERRIDE[entry.id];
  if (ov) {
    const [y, m = 6, d = 15] = ov.split("-").map(Number);
    return y * 10000 + m * 100 + d;
  }
  const y = Number((entry.date.match(/\d{4}/) || [0])[0]);
  const mo = entry.date.match(/Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/);
  const d = entry.date.match(/\b(\d{1,2}),/);
  return y * 10000 + (mo ? MONTH_IDX[mo[0]] : 6) * 100 + (d ? Number(d[1]) : 15);
}

// Every title from every tab, merged and sorted by when it actually came out
export const RELEASE_LIST = (() => {
  const all = [];
  CORE.forEach(it => all.push({ ...it, group: "core", tag: "", note: it.id === "im2" ? "" : it.note }));
  Object.values(SHORTS).forEach(s => all.push({ ...s, phase: 0, type: "One-Shot", eps: 0, group: "core", tag: "" }));
  Object.entries(SIDE_TABS).forEach(([k, t]) => t.sections.forEach(sec => sec.items.forEach(it => all.push({
    ...it,
    group: TAB_HOME[k],
    tag: t.label,
    title: /^Season \d/.test(it.title) ? `${sec.title} — ${it.title}` : it.title,
  }))));
  return all
    .map((it, i) => ({ ...it, _key: sortKey(it), _i: i }))
    .sort((a, b) => a._key - b._key || a._i - b._i);
})();

