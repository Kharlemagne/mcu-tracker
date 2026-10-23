import { useState, useEffect, useMemo, Fragment } from "react";
import {
  SLOTS,
  SHORTS,
  PHASES,
  SIDE_TABS,
  ENTRY,
  P0_NOTES,
  P0,
  st,
  STREAM_AFTER,
  CORE_BY_ID,
  DEF_ROSE,
  seg,
  SEGS,
  DEF_GROUPS,
  IW_PARTS,
  KONT,
  KONT_NUM,
  STORAGE_KEY,
  TOP_TABS,
  TAB_HOME,
  SUB_LABELS,
  RELEASE_FILTERS,
  RELEASE_LIST,
} from "./data.js";
import { KOFI_URL, GITHUB_REPO_URL, APP_VERSION } from "./config.js";

/* ---------------- HELPERS ---------------- */
const allSideItems = Object.values(SIDE_TABS).flatMap(t => t.sections.flatMap(s => s.items));

// A series entry covers one or more episode ranges; ranges point at the season's own id, so every tab shares checkmarks.
const rangesOf = (entry) => entry.ranges || [{ parent: entry.id, from: 1, to: entry.eps }];

function isComplete(entry, state) {
  if (entry.partOf) return !!(state.done[entry.id] || state.done[entry.partOf]);
  if (entry.parts) return !!(state.done[entry.id] || (state.done[`${entry.id}#1`] && state.done[`${entry.id}#2`]));
  if (entry.eps > 0) {
    return rangesOf(entry).every(r => {
      const set = state.eps[r.parent] || {};
      for (let i = r.from; i <= r.to; i++) if (!set[i]) return false;
      return true;
    });
  }
  return !!state.done[entry.id];
}
const epCount = (entry, state) => {
  let n = 0;
  rangesOf(entry).forEach(r => {
    const set = state.eps[r.parent] || {};
    for (let i = r.from; i <= r.to; i++) if (set[i]) n++;
  });
  return n;
};
const listProgress = (items, state) => {
  const done = items.filter(it => isComplete(it, state)).length;
  return { done, total: items.length, pct: items.length ? Math.round((done / items.length) * 100) : 0 };
};

/* ---------------- KONTINUITY SECTIONS (for the gems and the big bar) ---------------- */
// Every section on the Kontinuity tab, top to bottom, with every watchable row inside it
// (films, seasons, episode blocks, one-shots, crossovers). Crossovers placed after a film are included.
const SECTIONS = (() => {
  const out = [];
  const build = (key, title, color, collect) => {
    const entries = [];
    const seen = new Set();
    collect(en => { if (en && !seen.has(en.id)) { seen.add(en.id); entries.push(en); } });
    out.push({ key, title, color, entries });
  };
  P0.forEach(g => build(g.key, g.title, g.color, add => g.parts.forEach(part => part.ids.forEach(id => add(ENTRY[id])))));
  KONT.forEach(sec => build(sec.key, sec.title, sec.color, add => sec.items.forEach(t => {
    if (t.k === "core") { add(CORE_BY_ID[t.id]); (STREAM_AFTER[t.id] || []).forEach(add); }
    else if (t.k === "part") { add(CORE_BY_ID.iw); if (t.n === 2) (STREAM_AFTER.iw || []).forEach(add); }
    else if (t.k === "seg") add(SEGS[t.id]);
    else if (t.k === "side" || t.k === "stream") add(ENTRY[t.id]);
    else if (t.k === "short") add(SHORTS[t.id]);
    else if (t.k === "def") DEF_GROUPS[t.id].ids.forEach(id => add(ENTRY[id]));
  })));
  return out;
})();
// Everything on the tab, once each, in watch order
const ALL_ENTRIES = (() => {
  const seen = new Set();
  return SECTIONS.flatMap(sec => sec.entries).filter(en => (seen.has(en.id) ? false : (seen.add(en.id), true)));
})();

/* ---------------- COMPONENT ---------------- */
export default function MCUTracker() {
  const [state, setState] = useState({ done: {}, eps: {} });
  const [loaded, setLoaded] = useState(false);
  const [top, setTop] = useState("kontinuity");
  const [subSel, setSubSel] = useState({ legacyEra: "spidey", series: "defenders" });
  const [relFilter, setRelFilter] = useState("all");
  const [p0Open, setP0Open] = useState({});
  const activeTop = TOP_TABS.find(t => t.key === top);
  const goTo = (sideKey) => {
    const home = TAB_HOME[sideKey];
    setTop(home);
    setSubSel(s => ({ ...s, [home]: sideKey }));
    window.scrollTo({ top: 0 });
  };
  const [expanded, setExpanded] = useState({});
  const [resetArm, setResetArm] = useState(false);
  const [backupMsg, setBackupMsg] = useState("");
  const [pendingJump, setPendingJump] = useState(null);
  const [flashKey, setFlashKey] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const r = await window.storage.get(STORAGE_KEY);
        if (r && r.value) {
          const parsed = JSON.parse(r.value);
          if (parsed && parsed.done && parsed.eps) setState(parsed);
        }
      } catch (err) { /* first visit — nothing saved yet */ }
      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const t = setTimeout(() => {
      window.storage.set(STORAGE_KEY, JSON.stringify(state)).catch(() => {});
    }, 400);
    return () => clearTimeout(t);
  }, [state, loaded]);

  const toggleEntry = (entry) => {
    setState(prev => {
      if (entry.eps > 0) {
        const full = isComplete(entry, prev);
        const eps = { ...prev.eps };
        rangesOf(entry).forEach(r => {
          const set = { ...(eps[r.parent] || {}) };
          for (let i = r.from; i <= r.to; i++) { if (full) delete set[i]; else set[i] = true; }
          if (Object.keys(set).length === 0) delete eps[r.parent]; else eps[r.parent] = set;
        });
        return { ...prev, eps };
      }
      const done = { ...prev.done };
      if (entry.partOf) {
        // one half of a two-part film: if the whole film was ticked, split it into its halves first
        const p = entry.partOf;
        if (done[p]) { delete done[p]; done[`${p}#1`] = true; done[`${p}#2`] = true; }
        if (done[entry.id]) delete done[entry.id]; else done[entry.id] = true;
      } else if (entry.parts) {
        if (isComplete(entry, prev)) { delete done[entry.id]; delete done[`${entry.id}#1`]; delete done[`${entry.id}#2`]; }
        else done[entry.id] = true;
      } else if (done[entry.id]) delete done[entry.id]; else done[entry.id] = true;
      return { ...prev, done };
    });
  };

  const toggleEp = (key, n) => {
    setState(prev => {
      const eps = { ...prev.eps };
      const set = { ...(eps[key] || {}) };
      if (set[n]) delete set[n]; else set[n] = true;
      if (Object.keys(set).length === 0) delete eps[key]; else eps[key] = set;
      return { ...prev, eps };
    });
  };

  const purge = () => {
    setState({ done: {}, eps: {} });
    setResetArm(false);
    window.storage.delete(STORAGE_KEY).catch(() => {});
  };

  const exportProgress = () => {
    try {
      const payload = { app: "mcu-tracker", version: 1, exportedAt: new Date().toISOString(), state };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "mcu-tracker-progress.json";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setBackupMsg("Progress exported.");
    } catch (err) {
      setBackupMsg("Export failed.");
    }
  };

  const importProgress = (ev) => {
    const file = ev.target.files && ev.target.files[0];
    ev.target.value = "";
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const s = JSON.parse(String(reader.result)).state;
        if (!s || typeof s.done !== "object" || typeof s.eps !== "object" || !s.done || !s.eps) throw new Error("bad file");
        const done = {};
        Object.keys(s.done).forEach(k => { if (s.done[k] === true) done[k] = true; });
        const eps = {};
        Object.keys(s.eps).forEach(k => {
          const set = {};
          Object.keys(s.eps[k] || {}).forEach(n => { if (s.eps[k][n] === true) set[n] = true; });
          if (Object.keys(set).length) eps[k] = set;
        });
        setState({ done, eps });
        setBackupMsg("Progress imported.");
      } catch (err) {
        setBackupMsg("That file isn't a valid progress export.");
      }
    };
    reader.onerror = () => setBackupMsg("Couldn't read that file.");
    reader.readAsText(file);
  };

  const overall = useMemo(() => listProgress(ALL_ENTRIES, state), [state]);
  // "Up next" follows your furthest point in whichever list is open, so skipping ahead is fine.
  // Furthest point = the last item in the list that is finished or partly watched.
  const upNextInfo = useMemo(() => {
    let list, label;
    if (top === "kontinuity") { list = ALL_ENTRIES; label = "Kontinuity"; }
    else if (top === "release") {
      list = RELEASE_LIST.filter(it => relFilter === "all" || it.group === relFilter);
      label = relFilter === "all" ? "Release order" : `Release order · ${RELEASE_FILTERS.find(f => f.key === relFilter).label}`;
    } else {
      const t = SIDE_TABS[subSel[top]];
      // bare "Season 1" titles get their show name so the chip reads clearly
      list = t.sections.flatMap(sec => sec.items.map(it => (/^Season \d/.test(it.title) ? { ...it, title: `${sec.title} — ${it.title}` } : it)));
      label = t.label;
    }
    const isPartial = (en) => {
      if (isComplete(en, state)) return false;
      if (en.eps > 0) return epCount(en, state) > 0;
      if (en.parts) return !!(state.done[`${en.id}#1`] || state.done[`${en.id}#2`]);
      return false;
    };
    let last = -1;
    let lastPartial = false;
    list.forEach((en, i) => {
      if (isComplete(en, state)) { last = i; lastPartial = false; }
      else if (isPartial(en)) { last = i; lastPartial = true; }
    });
    if (!list.length) return { mode: "end", label };
    if (last === -1) return { mode: "start", entry: list[0], label };
    if (lastPartial) return { mode: "continue", entry: list[last], label, eps: list[last].eps > 0 ? `${epCount(list[last], state)}/${list[last].eps} eps` : "" };
    if (last + 1 < list.length) return { mode: "next", entry: list[last + 1], label };
    return { mode: "end", label };
  }, [state, top, subSel, relFilter]);
  // One gem per section of the Kontinuity tab, counting every item inside it
  const sagaProg = useMemo(() => SECTIONS.map(sec => ({ key: sec.key, title: sec.title, color: sec.color, ...listProgress(sec.entries, state) })), [state]);
  const progByKey = useMemo(() => Object.fromEntries(sagaProg.map(g => [g.key, g])), [sagaProg]);

  // Gem tap: switch to the Kontinuity tab, open the section if it is hidden, then jump to it
  const jumpToSaga = (key) => {
    setTop("kontinuity");
    setP0Open(x => ({ ...x, [key]: true }));
    setPendingJump(key);
  };
  useEffect(() => {
    if (!pendingJump || top !== "kontinuity") return;
    const el = document.getElementById(`kont-${pendingJump}`);
    if (el) el.scrollIntoView({ block: "start" });
    const key = pendingJump;
    setFlashKey(key);
    setPendingJump(null);
    setTimeout(() => setFlashKey(k => (k === key ? null : k)), 1500);
  }, [pendingJump, top, p0Open]);

  /* ---- row renderer ---- */
  const Row = (entry, label) => {
    const complete = isComplete(entry, state);
    const isSeries = entry.eps > 0;
    const open = !!expanded[entry.id];
    const watched = isSeries ? epCount(entry, state) : 0;
    const partial = isSeries && watched > 0 && !complete;
    const phaseColor = entry.accent || (entry.phase ? PHASES[entry.phase].color : "#5B6588");
    return (
      <div key={entry.id} className={`row ${complete ? "rowDone" : ""}`} style={entry.accent ? { borderLeft: `3px solid ${entry.accent}` } : undefined}>
        <div className="rowMain" onClick={() => isSeries && setExpanded(x => ({ ...x, [entry.id]: !open }))}>
          <div className="rail">
            {label != null && <span className="num">{label}</span>}
            <span className="node" style={{ background: complete ? "#F0B429" : partial ? phaseColor : "#232B45", boxShadow: complete ? "0 0 8px rgba(240,180,41,.55)" : "none" }} />
          </div>
          <div className="info">
            <div className="titleLine">
              <span className="title">{entry.title}</span>
              <span className="badge" style={{ borderColor: phaseColor, color: phaseColor }}>{entry.type}</span>
              {entry.tag && <span className="srcTag">{entry.tag}</span>}
            </div>
            <div className="meta">
              {entry.date}
              {isSeries && <span className="metaSep">·</span>}
              {isSeries && <span className={partial || complete ? "metaHot" : ""}>{watched}/{entry.eps} eps</span>}
              {isSeries && <span className="chev">{open ? "▾" : "▸"}</span>}
            </div>
            {entry.note && <div className="note">↳ {entry.note}</div>}
          </div>
          <button
            className={`check ${complete ? "checkOn" : ""}`}
            aria-label={complete ? `Mark ${entry.title} unwatched` : `Mark ${entry.title} watched`}
            onClick={(ev) => { ev.stopPropagation(); toggleEntry(entry); }}
          >
            {complete ? "✓" : ""}
          </button>
        </div>
        {isSeries && open && (
          <div className="epGrid">
            {rangesOf(entry).map((r, ri) => (
              <Fragment key={ri}>
                {entry.ranges && entry.ranges.length > 1 && <span className="epLabel">{r.label}</span>}
                {Array.from({ length: r.to - r.from + 1 }, (_, i) => r.from + i).map(n => {
                  const on = !!(state.eps[r.parent] || {})[n];
                  return (
                    <button key={n} className={`ep ${on ? "epOn" : ""}`} onClick={() => toggleEp(r.parent, n)} aria-label={`Episode ${n}`}>
                      {n}
                    </button>
                  );
                })}
              </Fragment>
            ))}
            <button className="epAll" onClick={() => toggleEntry(entry)}>{entry.ranges ? (complete ? "Clear these" : "Mark these") : (complete ? "Clear season" : "Mark season")}</button>
          </div>
        )}
      </div>
    );
  };

  const SlotMarker = ({ slot }) => (
    <button className="slot" onClick={() => goTo(slot.tab)}>
      <span className="slotIcon">⤷</span>
      <span>{slot.text}</span>
      <span className="slotGo">{SUB_LABELS[slot.tab]} →</span>
    </button>
  );

  const ShortRow = ({ item }) => {
    const on = !!state.done[item.id];
    return (
      <div className={`shortRow ${on ? "shortOn" : ""}`}>
        <span className="shortTag">One-Shot</span>
        <div className="shortInfo">
          <span className="shortTitle">{item.title}</span>
          <span className="shortMeta">{item.date} · {item.note}</span>
        </div>
        <button
          className={`checkMini ${on ? "checkMiniOn" : ""}`}
          aria-label={on ? `Mark ${item.title} unwatched` : `Mark ${item.title} watched`}
          onClick={() => setState(prev => {
            const done = { ...prev.done };
            if (done[item.id]) delete done[item.id]; else done[item.id] = true;
            return { ...prev, done };
          })}
        >
          {on ? "✓" : ""}
        </button>
      </div>
    );
  };

  /* ---- Phase 0 / Rapture / Stream 1 sections (Kharlemagne's Kontinuity) ---- */
  const p0Sections = P0.map(g => {
    const entries = g.parts.map(part => part.ids.map(id => ({
      ...ENTRY[id],
      ...(P0_NOTES[id] !== undefined ? { note: P0_NOTES[id] } : {}),
      accent: part.color || g.color,
    })));
    const prog = listProgress(entries.flat(), state);
    const open = p0Open[g.key] !== false;
    return (
      <section key={g.key} id={`kont-${g.key}`} className={`phase${flashKey === g.key ? " flash" : ""}`}>
        <div className="phaseHead">
          <h2 style={{ color: g.color }}>{g.title}</h2>
          <span className="phaseCount">{prog.done}/{prog.total}</span>
          {g.badge && <span className="secBadge">{g.badge}</span>}
          <button className="p0Toggle" aria-expanded={open} onClick={() => setP0Open(x => ({ ...x, [g.key]: !open }))}>{open ? "Hide" : "Show"}</button>
        </div>
        <p className="p0Blurb">{g.blurb}</p>
        {open && g.parts.map((part, pi) => (
          <div key={pi}>
            {part.title && <div className="partTitle" style={{ color: part.color || g.color }}>{part.title}</div>}
            {part.blurb && <p className="partBlurb">{part.blurb}</p>}
            {entries[pi].map(en => Row(en, null))}
          </div>
        ))}
      </section>
    );
  });

  /* ---- Kontinuity sequence: Phase One → Phase Six ---- */
  const numLabel = (id) => String(KONT_NUM[id]).padStart(2, "0");

  const renderDef = (g) => {
    const entries = g.ids.map(id => ({ ...ENTRY[id], accent: DEF_ROSE, tag: "Defenders Saga" }));
    const prog = listProgress(entries, state);
    const open = p0Open[g.key] !== false;
    return (
      <div key={g.key} className="subGroup">
        <div className="subHead">
          <span className="subTitle" style={{ color: DEF_ROSE }}>{g.title}</span>
          <span className="phaseCount">{prog.done}/{prog.total}</span>
          <button className="p0Toggle" onClick={() => goTo("defenders")}>Series Saga →</button>
          <button className="p0Toggle" style={{ marginLeft: 6 }} aria-expanded={open} onClick={() => setP0Open(x => ({ ...x, [g.key]: !open }))}>{open ? "Hide" : "Show"}</button>
        </div>
        <p className="partBlurb">{g.blurb}</p>
        {open && entries.map(en => Row(en, null))}
      </div>
    );
  };

  const renderK = (t, i) => {
    if (t.k === "core") {
      const base = CORE_BY_ID[t.id];
      const en = t.note !== undefined ? { ...base, note: t.note } : base;
      return (
        <div key={t.id}>
          {(SLOTS[t.id] || []).map((sl, j) => <SlotMarker key={j} slot={sl} />)}
          {Row(en, numLabel(t.id))}
          {(STREAM_AFTER[t.id] || []).map(s => Row(s, null))}
        </div>
      );
    }
    if (t.k === "part") {
      const en = { ...IW_PARTS[t.n - 1], note: t.note };
      return (
        <div key={en.id}>
          {Row(en, t.n === 1 ? numLabel("iw") : "↳")}
          {t.n === 2 && (STREAM_AFTER.iw || []).map(s => Row(s, null))}
        </div>
      );
    }
    if (t.k === "seg") return <div key={t.id}>{Row(SEGS[t.id], null)}</div>;
    if (t.k === "side") return <div key={t.id}>{Row({ ...ENTRY[t.id], title: t.title, tag: t.tag, accent: t.accent, note: t.note }, null)}</div>;
    if (t.k === "stream") return <div key={t.id}>{Row(st(t.id, t.kind, t.note), null)}</div>;
    if (t.k === "blurb") return <div key={`blurb${i}`} className="streamDivider" style={{ margin: "12px 0" }}><b>{t.title}</b> — {t.text}</div>;
    if (t.k === "def") return renderDef(DEF_GROUPS[t.id]);
    if (t.k === "short") return <ShortRow key={t.id} item={SHORTS[t.id]} />;
    return <SlotMarker key={`slot${i}`} slot={t} />;
  };

  const kontSections = KONT.map(sec => {
    const prog = progByKey[sec.key];
    const open = p0Open[sec.key] !== false;
    return (
      <section key={sec.key} id={`kont-${sec.key}`} className={`phase${flashKey === sec.key ? " flash" : ""}`}>
        <div className="phaseHead">
          <h2 style={{ color: sec.color }}>{sec.title}</h2>
          <span className="phaseCount">{prog.done}/{prog.total}</span>
          <button className="p0Toggle" aria-expanded={open} onClick={() => setP0Open(x => ({ ...x, [sec.key]: !open }))}>{open ? "Hide" : "Show"}</button>
        </div>
        {sec.blurb && <p className="p0Blurb">{sec.blurb}</p>}
        {open && sec.items.map(renderK)}
      </section>
    );
  });

  /* ---- tab content ---- */
  let content;
  if (top === "kontinuity") {
    content = [
      <div key="banner" className="fitBanner">
        <span className="fitLabel">The Kontinuity</span>
        <p>A fun watch order, not an official one. Where Marvel never established a continuity, Kharlemagne's Kontinuity builds one so the whole saga flows: Phase 0 and the Rapture are my theory for how the legacy films lead into the Sacred Timeline — a thematic fit, not canon. From Phase One on it's the real MCU, regrouped into sagas so you aren't jumping back and forth: Agents of S.H.I.E.L.D. and the Defenders are cut in at the exact points they collide with the films, and the Sony and Deadpool–Logan films slot in where they cross paths with it. Red markers point to side sagas; gold cards are One-Shots to watch right at that spot.</p>
      </div>,
      ...p0Sections,
      <div key="streamDivider" className="streamDivider">
        <b>Stream 2 — the MCU</b> begins below: the Sacred Timeline, starting with Iron Man. Streams 3 (Deadpool–Logan) and 4 (the Sony verse) are woven into the list at the points where they cross paths with it — look for the colored stripes.
      </div>,
      ...kontSections];
  } else if (top === "release") {
    const filtered = RELEASE_LIST.filter(it => relFilter === "all" || it.group === relFilter);
    const prog = listProgress(filtered, state);
    const years = [];
    filtered.forEach(it => {
      const y = Math.floor(it._key / 10000);
      const last = years[years.length - 1];
      if (last && last.year === y) last.items.push(it); else years.push({ year: y, items: [it] });
    });
    content = (
      <div>
        <div className="fitBanner">
          <span className="fitLabel">Canon Release Order</span>
          <p>Every title from every tab, in the exact order it came out — for experiencing it the way audiences originally did. Checkmarks are shared, so ticking something here ticks it everywhere else too.</p>
          <div className="chips">
            {RELEASE_FILTERS.map(f => (
              <button key={f.key} className={`chip ${relFilter === f.key ? "chipOn" : ""}`} onClick={() => setRelFilter(f.key)}>{f.label}</button>
            ))}
          </div>
          <div className="miniBar"><div style={{ width: `${prog.pct}%` }} /></div>
          <span className="miniBarLabel">{prog.done}/{prog.total} complete</span>
        </div>
        {years.map(y => {
          const yp = listProgress(y.items, state);
          return (
            <section key={y.year} className="phase">
              <div className="phaseHead">
                <h2>{y.year}</h2>
                <span className="phaseCount">{yp.done}/{yp.total}</span>
              </div>
              {y.items.map(it => Row(it, null))}
            </section>
          );
        })}
      </div>
    );
  } else {
    const t = SIDE_TABS[subSel[top]];
    const items = t.sections.flatMap(s => s.items);
    const prog = listProgress(items, state);
    content = (
      <div>
        <div className="fitBanner">
          <span className="fitLabel">Where it fits</span>
          <p>{t.fit}</p>
          <div className="miniBar"><div style={{ width: `${prog.pct}%` }} /></div>
          <span className="miniBarLabel">{prog.done}/{prog.total} complete</span>
        </div>
        {t.sections.map(sec => (
          <section key={sec.title} className="phase">
            <div className="phaseHead">
              <h2>{sec.title}</h2>
              {sec.badge && <span className="secBadge">{sec.badge}</span>}
            </div>
            {sec.items.map(it => Row(it, null))}
          </section>
        ))}
      </div>
    );
  }

  const saga = overall.pct === 100;

  return (
    <div className="app">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Archivo:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .app {
          min-height: 100vh; background: #0B0E1A; color: #EDEEF4;
          font-family: 'Archivo', system-ui, sans-serif;
          background-image: radial-gradient(1200px 500px at 50% -10%, rgba(226,54,54,0.10), transparent 60%);
        }
        .wrap { max-width: 760px; margin: 0 auto; padding: 28px 16px 80px; }
        /* header */
        .kicker { font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase; color: #8B93AD; }
        h1 {
          font-family: 'Anton', 'Archivo Black', sans-serif; font-weight: 400;
          font-size: clamp(34px, 8vw, 56px); line-height: 1.02; letter-spacing: 0.01em;
          text-transform: uppercase; margin: 6px 0 4px;
        }
        h1 em { font-style: normal; color: #E23636; }
        .sub { color: #8B93AD; font-size: 13px; margin-bottom: 18px; }
        .gems { display: grid; grid-template-columns: repeat(10, minmax(0, 1fr)); gap: 18px 4px; justify-items: center; margin: 18px 0 6px; }
        .gemHint { font-size: 11px; color: #5B6588; margin-top: 4px; }
        .phase { scroll-margin-top: 120px; border-radius: 12px; }
        .phase.flash { animation: sagaFlash 1.5s ease-out; }
        @keyframes sagaFlash { 0% { background: rgba(240,180,41,.16); box-shadow: 0 0 0 6px rgba(240,180,41,.16); } 100% { background: transparent; box-shadow: 0 0 0 6px transparent; } }
        .gem { position: relative; width: 22px; height: 22px; border-radius: 7px; transform: rotate(45deg);
               border: 1.5px solid; overflow: hidden; background: #10152A; flex: none; }
        .gem i { position: absolute; left: 0; right: 0; bottom: 0; display: block; }
        .gemWrap { display: flex; flex-direction: column; align-items: center; gap: 9px; background: none; border: 0; padding: 4px 0 0; margin: 0; cursor: pointer; font: inherit; color: inherit; }
        .gemWrap:hover .gem { filter: brightness(1.25); }
        .gemWrap:focus-visible { outline: 2px solid #F0B429; outline-offset: 3px; border-radius: 8px; }
        @media (max-width: 560px) { .gems { grid-template-columns: repeat(7, minmax(0, 1fr)); } }
        .gemLabel { font-size: 10px; color: #8B93AD; font-variant-numeric: tabular-nums; }
        .bigBar { height: 10px; background: #131829; border: 1px solid #232B45; border-radius: 99px; overflow: hidden; margin-top: 14px; }
        .bigBar div { height: 100%; background: linear-gradient(90deg, #E23636, #F0B429); border-radius: 99px; transition: width .5s cubic-bezier(.2,.8,.2,1); }
        .barMeta { display: flex; justify-content: space-between; font-size: 12px; color: #8B93AD; margin-top: 6px; font-variant-numeric: tabular-nums; }
        .upNext { display: inline-flex; align-items: center; gap: 8px; margin-top: 14px; padding: 8px 14px;
                  background: #131829; border: 1px solid #232B45; border-radius: 99px; font-size: 13px; }
        .upNext b { color: #F0B429; font-weight: 600; }
        .upNext { flex-wrap: wrap; border-radius: 14px; row-gap: 2px; }
        .upNextList { color: #8B93AD; font-size: 12px; }
        .sagaDone { margin-top: 14px; padding: 10px 14px; border-radius: 12px; font-size: 14px;
                    background: linear-gradient(90deg, rgba(226,54,54,.18), rgba(240,180,41,.18)); border: 1px solid #F0B429; }
        /* tabs */
        .navWrap { position: sticky; top: 0; z-index: 5; padding-bottom: 8px;
                   background: linear-gradient(#0B0E1A 85%, transparent); }
        .tabs { display: flex; gap: 8px; overflow-x: auto; padding: 18px 0 4px; scrollbar-width: none; }
        .tabs::-webkit-scrollbar, .subTabs::-webkit-scrollbar { display: none; }
        .tab { flex: none; white-space: nowrap; padding: 8px 14px; border-radius: 99px; border: 1px solid #232B45; background: #10152A;
               color: #8B93AD; font-size: 13px; font-weight: 600; cursor: pointer; font-family: inherit; }
        .tab:hover { border-color: #3a4468; }
        .tabOn { background: #E23636; border-color: #E23636; color: #fff; }
        .subTabs { display: flex; gap: 6px; overflow-x: auto; padding: 8px 0 2px; scrollbar-width: none; }
        .subTab { flex: none; white-space: nowrap; padding: 6px 12px; border-radius: 8px; border: 1px solid #232B45; background: transparent;
                  color: #8B93AD; font-size: 12.5px; font-weight: 600; cursor: pointer; font-family: inherit; }
        .subTab:hover { border-color: #3a4468; }
        .subTabOn { border-color: #E23636; color: #fff; background: rgba(226,54,54,.16); }
        .chips { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px; }
        .chip { padding: 5px 11px; border-radius: 99px; border: 1px solid #232B45; background: transparent; color: #8B93AD;
                font-size: 12px; font-weight: 600; cursor: pointer; font-family: inherit; }
        .chip:hover { border-color: #3a4468; }
        .chipOn { border-color: #F0B429; color: #F0B429; }
        .srcTag { font-size: 10px; color: #8B93AD; border: 1px solid #232B45; border-radius: 5px; padding: 1px 6px; flex: none; }
        .p0Blurb { font-size: 13px; color: #A9B0C8; line-height: 1.55; margin: -2px 0 12px; }
        .partTitle { font-size: 11px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; margin: 16px 0 6px; }
        .partBlurb { font-size: 12.5px; color: #8B93AD; line-height: 1.5; margin: 0 0 8px; }
        .p0Toggle { margin-left: auto; padding: 3px 10px; border-radius: 99px; border: 1px solid #232B45; background: transparent;
                    color: #8B93AD; font-size: 11px; font-weight: 600; cursor: pointer; font-family: inherit; }
        .p0Toggle:hover { border-color: #3a4468; color: #EDEEF4; }
        .streamDivider { margin: 26px 0 0; padding: 12px 14px; border: 1px solid #232B45; border-radius: 12px; background: #10152A;
                         font-size: 12.5px; color: #C6CBDD; line-height: 1.5; }
        .streamDivider b { color: #F0B429; }
        .tab:focus-visible, .subTab:focus-visible, .p0Toggle:focus-visible, .chip:focus-visible, .check:focus-visible, .ep:focus-visible, .slot:focus-visible, .reset:focus-visible, .epAll:focus-visible
          { outline: 2px solid #F0B429; outline-offset: 2px; }
        /* phases + rows */
        .phase { margin-top: 26px; }
        .phaseHead { display: flex; align-items: baseline; gap: 10px; margin-bottom: 10px; }
        .phaseHead h2 { font-family: 'Anton', sans-serif; font-weight: 400; font-size: 19px; letter-spacing: .06em; text-transform: uppercase; }
        .phaseCount { font-size: 12px; color: #8B93AD; font-variant-numeric: tabular-nums; }
        .secBadge { font-size: 11px; color: #8B93AD; border: 1px solid #232B45; padding: 2px 8px; border-radius: 99px; }
        .row { background: #10152A; border: 1px solid #1B2340; border-radius: 14px; margin-bottom: 8px; overflow: hidden;
               transition: border-color .2s; }
        .row:hover { border-color: #2C3760; }
        .rowDone { opacity: .62; }
        .rowMain { display: flex; align-items: center; gap: 12px; padding: 12px 12px 12px 10px; cursor: pointer; }
        .rail { display: flex; flex-direction: column; align-items: center; gap: 4px; width: 30px; flex: none; }
        .num { font-size: 10px; color: #5B6588; font-variant-numeric: tabular-nums; letter-spacing: .05em; }
        .node { width: 10px; height: 10px; border-radius: 99px; transition: background .25s, box-shadow .25s; }
        .info { flex: 1; min-width: 0; }
        .titleLine { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .title { font-weight: 600; font-size: 15px; }
        .badge { font-size: 10px; letter-spacing: .08em; text-transform: uppercase; border: 1px solid; border-radius: 5px; padding: 1px 6px; flex: none; }
        .meta { font-size: 12px; color: #8B93AD; margin-top: 3px; display: flex; gap: 6px; align-items: center; font-variant-numeric: tabular-nums; }
        .metaHot { color: #F0B429; }
        .metaSep { color: #3a4468; }
        .chev { color: #5B6588; font-size: 10px; }
        .note { font-size: 12px; color: #B48A2E; margin-top: 5px; }
        .check { width: 34px; height: 34px; flex: none; border-radius: 99px; border: 1.5px solid #2C3760; background: transparent;
                 color: #0B0E1A; font-size: 16px; font-weight: 700; cursor: pointer; transition: all .18s; }
        .check:hover { border-color: #F0B429; }
        .checkOn { background: #F0B429; border-color: #F0B429; box-shadow: 0 0 10px rgba(240,180,41,.4); }
        /* episodes */
        .epGrid { display: flex; flex-wrap: wrap; gap: 6px; padding: 0 12px 14px 52px; }
        .ep { width: 32px; height: 32px; border-radius: 8px; border: 1px solid #232B45; background: #0D1122; color: #8B93AD;
              font-size: 12px; font-weight: 600; cursor: pointer; font-variant-numeric: tabular-nums; font-family: inherit; transition: all .15s; }
        .ep:hover { border-color: #F0B429; color: #EDEEF4; }
        .epOn { background: #F0B429; border-color: #F0B429; color: #0B0E1A; }
        .epLabel { flex-basis: 100%; font-size: 11px; color: #8B93AD; letter-spacing: .08em; text-transform: uppercase; margin-top: 4px; }
        .subGroup { margin: 12px 0 14px; padding: 12px 10px 4px; border: 1px solid rgba(251,113,133,.35); border-radius: 14px; background: rgba(251,113,133,.04); }
        .subHead { display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap; margin-bottom: 6px; }
        .subTitle { font-size: 11px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; }
        .epAll { height: 32px; padding: 0 12px; border-radius: 8px; border: 1px dashed #3a4468; background: transparent;
                 color: #8B93AD; font-size: 12px; font-weight: 600; cursor: pointer; font-family: inherit; }
        .epAll:hover { color: #F0B429; border-color: #F0B429; }
        /* slot markers */
        .slot { display: flex; align-items: center; gap: 10px; width: 100%; text-align: left; margin: 14px 0;
                padding: 10px 14px; background: rgba(226,54,54,0.06); border: 1px dashed rgba(226,54,54,0.5);
                border-radius: 12px; color: #EDA0A0; font-size: 12.5px; cursor: pointer; font-family: inherit; }
        .slot:hover { background: rgba(226,54,54,0.12); }
        .slotIcon { font-size: 15px; flex: none; }
        .slotGo { margin-left: auto; flex: none; color: #E23636; font-weight: 700; }
        /* inline one-shots */
        .shortRow { display: flex; align-items: center; gap: 10px; margin: 8px 0 8px 20px; padding: 8px 10px 8px 12px;
                    background: rgba(240,180,41,0.05); border: 1px dashed rgba(240,180,41,0.45); border-radius: 10px; }
        .shortOn { opacity: .6; }
        .shortTag { flex: none; font-size: 9px; letter-spacing: .14em; text-transform: uppercase; color: #F0B429;
                    border: 1px solid rgba(240,180,41,0.5); border-radius: 4px; padding: 2px 5px; }
        .shortInfo { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 1px; }
        .shortTitle { font-size: 13px; font-weight: 600; }
        .shortMeta { font-size: 11px; color: #8B93AD; }
        .checkMini { width: 26px; height: 26px; flex: none; border-radius: 99px; border: 1.5px solid rgba(240,180,41,0.5);
                     background: transparent; color: #0B0E1A; font-size: 13px; font-weight: 700; cursor: pointer; transition: all .18s; }
        .checkMini:hover { border-color: #F0B429; }
        .checkMiniOn { background: #F0B429; border-color: #F0B429; }
        .checkMini:focus-visible { outline: 2px solid #F0B429; outline-offset: 2px; }
        /* side tab banner */
        .fitBanner { margin-top: 20px; padding: 14px 16px; background: #10152A; border: 1px solid #232B45; border-radius: 14px; }
        .fitLabel { font-size: 10px; letter-spacing: .22em; text-transform: uppercase; color: #E23636; }
        .fitBanner p { font-size: 13.5px; color: #C6CBDD; margin-top: 6px; line-height: 1.5; }
        .miniBar { height: 6px; background: #0D1122; border-radius: 99px; overflow: hidden; margin-top: 10px; }
        .miniBar div { height: 100%; background: #F0B429; border-radius: 99px; transition: width .4s; }
        .miniBarLabel { font-size: 11px; color: #8B93AD; margin-top: 5px; display: inline-block; font-variant-numeric: tabular-nums; }
        /* footer */
        .foot { margin-top: 40px; display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
        .footNote { font-size: 11.5px; color: #5B6588; max-width: 420px; line-height: 1.5; }
        .reset { padding: 9px 16px; border-radius: 99px; border: 1px solid #232B45; background: transparent; color: #8B93AD;
                 font-size: 12.5px; font-weight: 600; cursor: pointer; font-family: inherit; }
        .reset:hover { border-color: #E23636; color: #E23636; }
        .resetArmed { background: #E23636; border-color: #E23636; color: #fff; }
        .betaBar { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin: 14px 0 4px; padding: 9px 12px;
                   background: #10152A; border: 1px solid #232B45; border-radius: 12px; font-size: 12.5px; color: #A9B0C8; }
        .betaPill { font-size: 10px; font-weight: 700; letter-spacing: .14em; color: #0B0E1A; background: #F0B429; border-radius: 5px; padding: 2px 7px; }
        .betaText a { color: #F0B429; }
        .kofi { margin-left: auto; padding: 6px 13px; border-radius: 99px; background: #FF5E5B; color: #fff; font-size: 12.5px;
                font-weight: 700; text-decoration: none; white-space: nowrap; }
        .kofi:hover { filter: brightness(1.1); }
        .kofi:focus-visible, .betaText a:focus-visible { outline: 2px solid #F0B429; outline-offset: 2px; }
        .backup { margin-top: 22px; display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .backup .kofi { margin-left: 0; }
        .importLbl { display: inline-block; cursor: pointer; }
        .backupMsg { font-size: 12px; color: #8B93AD; }
        .disclaimer { margin-top: 18px; font-size: 11px; color: #5B6588; line-height: 1.55; }
        @media (prefers-reduced-motion: reduce) { * { transition: none !important; animation: none !important; } }
      `}</style>

      <div className="wrap">
        <header>
          <div className="kicker">Watch orders · through Oct 2026</div>
          <h1>The Ultimate <em>MCU</em> Tracker</h1>
          <p className="sub">{ALL_ENTRIES.length} things to watch across {SECTIONS.length} Kontinuity sections — check off films, tap a series to track every episode. Progress saves automatically.</p>

          <div className="betaBar">
            <span className="betaPill">BETA {APP_VERSION}</span>
            <span className="betaText">Free fan project — bugs expected. <a href={`${GITHUB_REPO_URL}/issues`} target="_blank" rel="noopener noreferrer">Report one</a></span>
            <a className="kofi" href={KOFI_URL} target="_blank" rel="noopener noreferrer">☕ Support on Ko-fi</a>
          </div>

          <div className="gems">
            {sagaProg.map(g => (
              <button
                className="gemWrap"
                key={g.key}
                title={`${g.title}: ${g.done}/${g.total}`}
                aria-label={`${g.title}: ${g.done} of ${g.total} watched. Jump to this saga.`}
                onClick={() => jumpToSaga(g.key)}
              >
                <span className="gem" style={{ borderColor: g.color, boxShadow: g.pct === 100 ? `0 0 10px ${g.color}` : "none" }}>
                  <i style={{ height: `${g.pct}%`, background: g.color, opacity: 0.85 }} />
                </span>
                <span className="gemLabel">{g.done}/{g.total}</span>
              </button>
            ))}
          </div>
          <div className="gemHint">Tap a gem to jump to that saga</div>

          <div className="bigBar"><div style={{ width: `${overall.pct}%` }} /></div>
          <div className="barMeta"><span>{overall.done} of {overall.total} watched</span><span>{overall.pct}%</span></div>

          {saga
            ? <div className="sagaDone">🏆 Kontinuity complete. You've watched everything on the list.</div>
            : <div className="upNext">
                {upNextInfo.mode === "end" ? (
                  <span>You've reached the end of this list</span>
                ) : (
                  <span>
                    {{ start: "Start with", continue: "Continue", next: "Up next" }[upNextInfo.mode]}:{" "}
                    <b>{top === "kontinuity" && KONT_NUM[upNextInfo.entry.id] ? `#${KONT_NUM[upNextInfo.entry.id]} ` : ""}{upNextInfo.entry.title}</b>
                    {upNextInfo.eps ? ` (${upNextInfo.eps})` : ""}
                  </span>
                )}
                <span className="upNextList">· {upNextInfo.label}</span>
              </div>}
        </header>

        <div className="navWrap">
          <nav className="tabs">
            {TOP_TABS.map(t => (
              <button key={t.key} className={`tab ${top === t.key ? "tabOn" : ""}`} onClick={() => setTop(t.key)}>{t.label}</button>
            ))}
          </nav>
          {activeTop.subs && (
            <nav className="subTabs">
              {activeTop.subs.map(s => (
                <button key={s} className={`subTab ${subSel[top] === s ? "subTabOn" : ""}`} onClick={() => setSubSel(x => ({ ...x, [top]: s }))}>{SUB_LABELS[s]}</button>
              ))}
            </nav>
          )}
        </div>

        {content}

        <div className="foot">
          <p className="footNote">Progress is saved in this browser on this device — it stays until you clear it here or clear your browser's site data. Use Export to back it up or move it to another device. Phase 0, stream, side-tab and One-Shot progress doesn't count toward the core canon bar, but every tab shares the same checkmarks.</p>
          {resetArm ? (
            <span>
              <button className="reset resetArmed" onClick={purge}>Yes, erase everything</button>{" "}
              <button className="reset" onClick={() => setResetArm(false)}>Keep my progress</button>
            </span>
          ) : (
            <button className="reset" onClick={() => setResetArm(true)}>Clear all progress</button>
          )}
        </div>

        <div className="backup">
          <button className="reset" onClick={exportProgress}>Export progress</button>
          <label className="reset importLbl">
            Import progress
            <input type="file" accept="application/json,.json" hidden onChange={importProgress} />
          </label>
          <a className="kofi" href={KOFI_URL} target="_blank" rel="noopener noreferrer">☕ Support on Ko-fi</a>
          <span className="backupMsg" role="status">{backupMsg}</span>
        </div>
        <p className="disclaimer">
          Fan-made and unofficial. Not affiliated with, endorsed by, or sponsored by Marvel, Marvel Studios, or Disney. All titles and trademarks belong to their respective owners. This tracker is free; Ko-fi support goes to the developer and is not payment for any Marvel content. v{APP_VERSION}
        </p>
      </div>
    </div>
  );
}
