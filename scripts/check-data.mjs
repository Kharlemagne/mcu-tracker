// Sanity-checks the tracker data so a typo in src/data.js fails the build
// instead of silently breaking the live site. Run with: npm run check
import * as D from "../src/data.js";

const errors = [];
const err = (m) => errors.push(m);

// 1. every id must be unique across all lists that share checkmarks
const seen = new Map();
const note = (id, where) => {
  if (seen.has(id)) err(`Duplicate id "${id}" in ${where} (also in ${seen.get(id)})`);
  else seen.set(id, where);
};
D.CORE.forEach((c) => note(c.id, "CORE"));
Object.values(D.SHORTS).forEach((s) => note(s.id, "SHORTS"));
Object.entries(D.SIDE_TABS).forEach(([k, t]) =>
  t.sections.forEach((sec) => sec.items.forEach((it) => note(it.id, `SIDE_TABS.${k}`)))
);

// 2. every reference in the Kontinuity order must point at something real
const need = (ok, msg) => { if (!ok) err(msg); };
D.KONT.forEach((sec) =>
  sec.items.forEach((t) => {
    const w = `KONT "${sec.key}"`;
    if (t.k === "core") need(D.CORE_BY_ID[t.id], `${w}: unknown core id "${t.id}"`);
    else if (t.k === "side" || t.k === "stream") need(D.ENTRY[t.id], `${w}: unknown side-tab id "${t.id}"`);
    else if (t.k === "seg") need(D.SEGS[t.id], `${w}: unknown segment "${t.id}"`);
    else if (t.k === "short") need(D.SHORTS[t.id], `${w}: unknown one-shot "${t.id}"`);
    else if (t.k === "def") need(D.DEF_GROUPS[t.id], `${w}: unknown Defenders group "${t.id}"`);
    else if (t.k === "part") need(t.n === 1 || t.n === 2, `${w}: bad Infinity War part ${t.n}`);
  })
);
D.P0.forEach((g) => g.parts.forEach((p) => p.ids.forEach((id) => need(D.ENTRY[id], `P0 "${g.key}": unknown id "${id}"`))));
Object.values(D.DEF_GROUPS).forEach((g) => g.ids.forEach((id) => need(D.ENTRY[id], `DEF_GROUPS "${g.key}": unknown id "${id}"`)));
Object.entries(D.SLOTS).forEach(([id, list]) => {
  need(D.CORE_BY_ID[id], `SLOTS: unknown core id "${id}"`);
  list.forEach((s) => need(D.SIDE_TABS[s.tab], `SLOTS "${id}": unknown tab "${s.tab}"`));
});

// 3. every core title should be numbered in the Kontinuity order exactly once
const coreSeen = new Map();
D.KONT.forEach((sec) =>
  sec.items.forEach((t) => {
    const id = t.k === "core" ? t.id : t.k === "part" && t.n === 1 ? "iw" : null; // Infinity War is split into two "part" entries
    if (id) coreSeen.set(id, (coreSeen.get(id) || 0) + 1);
  })
);
D.CORE.forEach((c) => {
  const n = coreSeen.get(c.id) || 0;
  if (n === 0) err(`Core title "${c.id}" never appears in the Kontinuity order`);
  if (n > 1) err(`Core title "${c.id}" appears ${n} times in the Kontinuity order`);
});

// 4. split-season segments must cover each season's episodes with no gaps or overlaps
const cover = {};
const addRanges = (ranges) =>
  ranges.forEach((r) => {
    const p = D.ENTRY[r.parent];
    if (!p) return err(`Episode range points at unknown series "${r.parent}"`);
    if (r.from < 1 || r.to > p.eps || r.from > r.to) err(`Range ${r.from}-${r.to} is outside "${r.parent}" (${p.eps} eps)`);
    cover[r.parent] = cover[r.parent] || new Array(p.eps + 1).fill(0);
    for (let i = r.from; i <= r.to && i <= p.eps; i++) cover[r.parent][i]++;
  });
const segUsed = new Set();
D.KONT.forEach((sec) => sec.items.forEach((t) => { if (t.k === "seg") { segUsed.add(t.id); addRanges(D.SEGS[t.id].ranges); } }));
Object.keys(cover).forEach((parent) => {
  for (let i = 1; i < cover[parent].length; i++) {
    if (cover[parent][i] !== 1) err(`"${parent}" episode ${i} is covered ${cover[parent][i]} times by the split segments`);
  }
});

// 5. release-order warning: titles from the same month need an exact day in SORT_OVERRIDE
//    (e.g. "2026-07-01"), otherwise their order in Canon Release Order is a guess.
const hasExactDay = (r) => {
  const o = D.SORT_OVERRIDE[r.id];
  return o ? o.split("-").length === 3 : /\b\d{1,2},/.test(r.date);
};
const byMonth = {};
D.RELEASE_LIST.forEach((r) => { (byMonth[Math.floor(r._key / 100)] ||= []).push(r); });
Object.entries(byMonth).forEach(([m, list]) => {
  if (list.length > 1 && list.some((r) => !hasExactDay(r))) {
    console.warn(`Warning: release order for ${m.slice(0, 4)}-${m.slice(4)} may be off. Add exact days for: ${list.filter((r) => !hasExactDay(r)).map((r) => r.id).join(", ")}`);
  }
});

if (errors.length) {
  console.error(`\nData check FAILED (${errors.length} problem${errors.length === 1 ? "" : "s"}):\n`);
  errors.forEach((e) => console.error("  - " + e));
  process.exit(1);
}
console.log(`Data check passed: ${D.CORE.length} core titles, ${seen.size} tracked entries, ${segUsed.size} split segments.`);
