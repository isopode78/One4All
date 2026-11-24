import { cfg } from "./firebase-config.js";
import { Q, MODES, SUBJECTS } from "./questions.js";
import { X } from "./lessons.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, addDoc, collection, query, where, getDocs, limit, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const $ = s => document.querySelector(s), v = $("#v"), hd = $("#h");
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
let me = null, vt = null, vp = false, vv = false, prof = {}, g = null, lang = localStorage.lang || "it";

const SUBJ_META = {
 italiano: { icon: "✒️", color: "var(--c-italiano)" },
 matematica: { icon: "📐", color: "var(--c-matematica)" },
 fisica: { icon: "⚡", color: "var(--c-fisica)" },
 chimica: { icon: "🧪", color: "var(--c-chimica)" },
 religione: { icon: "🕊️", color: "var(--c-religione)" },
 arte: { icon: "🎨", color: "var(--c-arte)" },
 storia: { icon: "🏛️", color: "var(--c-storia)" },
 geografia: { icon: "🌍", color: "var(--c-geografia)" },
 filosofia: { icon: "🦉", color: "var(--c-filosofia)" },
 politica: { icon: "⚖️", color: "var(--c-politica)" },
 lingue: { icon: "🗣️", color: "var(--c-lingue)" },
 scienze: { icon: "🌱", color: "var(--c-scienze)" }
};
["matematica", "fisica", "chimica", "scienze"].forEach(k => SUBJ_META[k].paper = "quadretti");

const T = {
 it: { easy: "Facile", mid: "Medio", hard: "Difficile", soon: "In arrivo", today: "Oggi", hint: "Indizio (pubblicità)", ad: "Pubblicità: guarda per sbloccare", ok: "Esatto!", ko: "Non esatto.", pts: "Voto", avg: "Media voti", rank: "Classifica", home: "Home", exam: "Esame", fb: "Feedback", login: "Accedi", reg: "Registrati", out: "Esci", vid: "Video di spiegazione in arrivo", watch: "Guarda la lezione animata", replay: "Rivedi", ex: "Esempio", lessonAd: "Lezione prima di rispondere (pubblicità)", streak: "Giorni di fila", playedAll: "Hai già completato la sfida di oggi per questa materia!", guest: "Accedi per salvare progressi e classifica.", send: "Invia", save: "Salva", more: "Altre 10 domande (pubblicità)", free: "Domande gratuite oggi", wait: "Allenamento con domande d'esame: in arrivo.", nextLvl: "Prossimo livello", doneAll: "Sfida completata!", mHome: "Scegli una materia e mettiamoci alla prova!", mPlay: "Pensa con calma: io tengo il segno tra le pagine!", mThink: "Ahi, sbirciamo tra le pagine per un indizio!", mWin: "Che colpo di penna! Capitolo superato!", mLose: "Niente paura, anche i grandi libri si rileggono!" },
 en: { easy: "Easy", mid: "Medium", hard: "Hard", soon: "Coming soon", today: "Today", hint: "Hint (ad)", ad: "Ad: watch to unlock", ok: "Correct!", ko: "Not quite.", pts: "Grade", avg: "Average grade", rank: "Leaderboard", home: "Home", exam: "Exam", fb: "Feedback", login: "Log in", reg: "Sign up", out: "Log out", vid: "Explanation video coming soon", watch: "Watch the animated lesson", replay: "Replay", ex: "Example", lessonAd: "Lesson before answering (ad)", streak: "Day streak", playedAll: "You already completed today's challenge for this subject!", guest: "Log in to save progress and rank.", send: "Send", save: "Save", more: "10 more questions (ad)", free: "Free questions today", wait: "Exam practice: coming soon.", nextLvl: "Next level", doneAll: "Challenge completed!", mHome: "Pick a subject and let's test your knowledge!", mPlay: "Take your time—I'm keeping my bookmark ready!", mThink: "Aha! Let's peek between the pages for a clue!", mWin: "Plot twist: you nailed it!", mLose: "No worries, even great books get a second read!" }
};
const t = k => T[lang][k] || T.it[k] || k;
const LV = () => [t("easy"), t("mid"), t("hard")];

// Mascotte libro umanizzato in stile cartoon
const bookMascot = (mood = "idle", cls = "") => {
 const mouth = mood === "happy"
  ? `<path d="M40 50q8 9 16 0z" fill="#ff4d6d" stroke="#171d2f" stroke-width="2.6" stroke-linejoin="round"/>`
  : mood === "oops"
   ? `<path d="M41 53q7-6 14 0" fill="none" stroke="#171d2f" stroke-width="2.8" stroke-linecap="round"/>`
   : mood === "think"
    ? `<circle cx="48" cy="51" r="4.2" fill="#ff4d6d" stroke="#171d2f" stroke-width="2.4"/>`
    : `<path d="M41 50q7 6 14 0" fill="none" stroke="#171d2f" stroke-width="2.8" stroke-linecap="round"/>`;
 const leftEye = mood === "happy"
  ? `<path d="M36 42q4-5 8 0" fill="none" stroke="#171d2f" stroke-width="2.8" stroke-linecap="round"/>`
  : `<circle cx="40" cy="42" r="4.3" fill="#171d2f"/><circle cx="38.8" cy="40.5" r="1.4" fill="#fff"/>`;
 const rightEye = mood === "happy"
  ? `<path d="M52 42q4-5 8 0" fill="none" stroke="#171d2f" stroke-width="2.8" stroke-linecap="round"/>`
  : mood === "think"
   ? `<circle cx="56" cy="41" r="5" fill="#171d2f"/><circle cx="54.5" cy="39.3" r="1.6" fill="#fff"/>`
   : `<circle cx="56" cy="42" r="4.3" fill="#171d2f"/><circle cx="54.8" cy="40.5" r="1.4" fill="#fff"/>`;
 const bulb = mood === "think"
  ? `<circle cx="48" cy="4" r="5" fill="#ffd23f" stroke="#171d2f" stroke-width="2.4"/><path d="M48 -4v2M40 4h2M54 4h2" stroke="#171d2f" stroke-width="2" stroke-linecap="round"/>`
  : "";
 return `<svg class="book-mascot ${cls}" viewBox="0 0 96 104" role="img" aria-label="Libro mascotte">
  ${bulb}
  <g stroke="#171d2f" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none">
   <path d="M26 68l-11 11-7-5"/>
   <path d="M70 68l11 11 7-5"/>
   <path d="M38 82v16h-8"/>
   <path d="M58 82v16h8"/>
  </g>
  <rect x="20" y="16" width="56" height="66" rx="9" fill="#ff6b35" stroke="#171d2f" stroke-width="3.2"/>
  <path d="M26 16v66" stroke="#171d2f" stroke-width="3.2"/>
  <rect x="29" y="22" width="43" height="54" rx="5" fill="#fffdf7" stroke="#171d2f" stroke-width="2.5"/>
  <path d="M35 28h26M35 68h20" stroke="#cfd8df" stroke-width="3" stroke-linecap="round"/>
  <circle cx="34" cy="49" r="3.6" fill="#ff85a1" opacity=".85"/>
  <circle cx="62" cy="49" r="3.6" fill="#ff85a1" opacity=".85"/>
  ${leftEye}${rightEye}${mouth}
  <path d="M69 13l9-5-2 9z" fill="#00b894" stroke="#171d2f" stroke-width="2.4" stroke-linejoin="round"/>
 </svg>`;
};

// ---- data/ora e casualità condivisa (stessa per tutti) ----
const rome = () => new Date().toLocaleDateString("sv", { timeZone: "Europe/Rome" });
const hash = s => { let h = 2166136261; for (const c of s) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return h >>> 0; };
const rng = a => () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
const shuf = (arr, r) => { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
// modalità del giorno: ciclo casuale (ogni N giorni tutte le modalità escono una volta)
const modeOf = (s, d) => { const ms = Object.keys(Q[s]), n = Math.floor(Date.parse(d) / 864e5), b = Math.floor(n / ms.length); return shuf(ms, rng(hash(s + b)))[n % ms.length]; };
const pick = (s, d, m, l) => { const p = Q[s][m][l]; return p[hash(d + s + m + l) % p.length]; };

const ad = cb => { // SOSTITUISCI con AdSense/AdMob: chiama cb() a fine annuncio
 const o = document.createElement("div"); o.className = "ad"; o.innerHTML = `<div>${bookMascot("think", "think")}<p>${t("ad")}</p><h1 id="n">3</h1></div>`; document.body.append(o);
 let n = 3; const i = setInterval(() => { n--; o.querySelector("#n").textContent = n; if (!n) { clearInterval(i); o.remove(); cb(); } }, 1000);
};
const show = h => { clearTimeout(vt); window.speechSynthesis?.cancel(); v.innerHTML = h; v.focus?.(); };
const head = () => { hd.innerHTML = `<b><span class="brand-dot"></span>Cultura Quotidiana</b><nav><button data-a="home">${t("home")}</button><button data-a="exam">${t("exam")}</button><button data-a="fb">${t("fb")}</button>${me ? `<button data-a="prof">${prof.photo ? `<img class="avatar" src="${prof.photo}" alt="">` : ""} ${esc(prof.username || "")} · 🔥${prof.streak || 0}</button>` : `<button data-a="auth">${t("login")}</button>`}</nav>`; };

// ---- schermate ----
function home() {
 document.body.className = "paper-righe";
 document.body.style.removeProperty("--subj");
 head();
 const d = rome();
 show(`<h2>${t("today")} · ${d}</h2>
  <div class="mascot-banner">${bookMascot("idle")}<div class="speech">${esc(t("mHome"))}${me ? "" : `<br><small>${esc(t("guest"))}</small>`}</div></div>
  <div class="grid">${Object.entries(SUBJECTS).map(([s, on]) => {
  const label = s[0].toUpperCase() + s.slice(1);
  const meta = SUBJ_META[s] || { icon: "📘", color: "var(--pop)" };
  if (!on) return `<div class="card off" style="--subj:${meta.color}"><span class="subj-badge" style="--subj:${meta.color}">${meta.icon}</span><h3>${label}</h3><p>${t("soon")}</p></div>`;
  return `<button class="subj-card" style="--subj:${meta.color}" data-a="startRun" data-s="${s}">
   <span class="subj-badge" style="--subj:${meta.color}">${meta.icon}</span>
   <span class="subj-title">${label}</span>
   <span class="subj-sub">${MODES[modeOf(s, d)]}</span>
  </button>`;
 }).join("")}</div>`);
}

function game() {
 const meta = SUBJ_META[g.s] || { icon: "📘", color: "var(--pop)" };
 document.body.className = "has-subj paper-" + (meta.paper || "righe");
 document.body.style.setProperty("--subj", meta.color);
 head();
 const lvl = LV()[g.l];
 const subjName = g.s[0].toUpperCase() + g.s.slice(1);
 const mood = g.fin ? (g.pts > 0 ? "happy" : "oops") : (g.hints > 0 && g.err === 0 ? "think" : (g.err > 0 ? "oops" : "idle"));
 const anim = g.fin ? (g.pts > 0 ? "happy" : "oops") : (g.hints > 0 && g.err === 0 ? "think" : "");
 const msg = g.fin ? (g.pts > 0 ? t("mWin") : t("mLose")) : (g.hints > 0 && g.err === 0 ? t("mThink") : g.q);
 let h = `<span class="step-pill">${esc(subjName)} · ${g.l + 1}/3 · ${lvl}</span><div class="stepper">${[0, 1, 2].map(i => `<i class="${i < g.l ? "d" : i === g.l ? "c" : ""}"></i>`).join("")}</div><h2>${MODES[g.m]}</h2>
  <div class="mascot-stage">${bookMascot(mood, anim)}<div class="speech">${esc(msg)}</div></div>`;
 if (g.p) {
  const chars = [...g.p].map(c => c === " " ? `<span class="ch sp"></span>` : `<span class="ch">${g.g.includes(c) || g.fin ? c : ""}</span>`).join("");
  const parts = ["M10 190h120", "M40 190V20", "M40 20h80", "M120 20v30", "M120 50m-15 0a15 15 0 1 0 30 0a15 15 0 1 0-30 0", "M120 80v60M95 100h50", "M120 140l-25 40M120 140l25 40"];
  h += `<div class="hangman-wrap"><div class="hangman-box"><svg viewBox="0 0 150 200" width="120" role="img" aria-label="${g.err}/7"><g fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round">${parts.slice(0, g.err).map(p => `<path d="${p}"/>`).join("")}</g></svg></div><div class="word" aria-live="polite">${chars}</div></div>
  <div class="keys">${[..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"].map(c => `<button data-a="key" data-c="${c}" ${g.g.includes(c) || g.fin ? "disabled" : ""}>${c}</button>`).join("")}</div>`;
 } else if (g.o) h += fig(g) + g.o.map((o, i) => `<button class="opt ${g.fin ? (o === g.c ? "ok" : i === g.pick ? "ko" : "") : ""}" data-a="ans" data-i="${i}" ${g.fin ? "disabled" : ""}><b class="lt">${"ABCD"[i]}</b>${esc(o)}</button>`).join(""); else h += extra(g);
 if (!g.p) h += g.h.slice(0, g.hints).map((x, i) => `<div class="hint">💡 ${i + 1}/3 — ${esc(x)}</div>`).join("");
 if (!g.fin) h += `<div class="row">${g.hints < 3 ? `<button data-a="hint">${t("hint")} (${g.hints}/3) −1,5</button>` : ""}${g.les ? "" : `<button data-a="pre">🎬 ${t("lessonAd")} −2,5</button>`}</div>${g.les ? `<div class="vid" id="lesson"></div>` : ""}`;
 if (g.fin) {
  const nextBtn = g.l < 2 ? `<button data-a="nextLvl">${t("nextLvl")}</button>` : `<span>✨ ${t("doneAll")}</span>`;
  h += `<h3>${g.pts > 0 ? t("ok") : t("ko")} ${t("pts")}: ${fmt(g.pts)}/10</h3><p><small>${g.hints ? `💡 −${fmt(1.5 * g.hints)} ` : ""}${g.les ? "🎬 −2,5" : ""}</small></p><p>${esc(g.e)}</p><div class="vid" id="lesson"><button data-a="vid">▶ ${t("watch")}</button></div>${g.pts > 0 ? `<div class="confetti" aria-hidden="true">${[..."🎉⭐✨🎊🎉⭐✨🎊🎉⭐✨🎊"].map((c, i) => `<span style="left:${i * 8}%;animation-delay:${i * 0.07}s">${c}</span>`).join("")}</div>` : ""}<div class="row">${nextBtn}<button data-a="lb" data-s="${g.s}" data-l="${g.l}">${t("rank")}</button><button data-a="home">${t("home")}</button></div>`;
 }
 show(h);
 if (g.les && !g.fin && $("#lesson")) { vp = true; lesson(g.li || 0); }
}

// Voto in decimi: perf (0-1) × 10, −1,5 per indizio, −2,5 se guardi la lezione prima di rispondere; risposta giusta = almeno 1
const fmt = n => (Math.round(n * 10) / 10).toFixed(1).replace(".", ",");
const sc = p => p <= 0 ? 0 : Math.round(Math.max(1, p * 10 - 1.5 * g.hints - 2.5 * (g.les ? 1 : 0)) * 10) / 10;
const GRID = () => `<g stroke="currentColor" opacity=".18">${Array.from({ length: 11 }, (_, i) => `<path d="M${10 + i * 20} 10V210M10 ${10 + i * 20}H210"/>`).join("")}</g><path d="M110 10V210M10 110H210" stroke="currentColor" stroke-width="2"/>`;
const fig = g => {
 if (!g.fig) return "";
 const f = new Function("x", "return " + g.fig); let d = "", pv = null;
 for (let i = 0; i <= 200; i++) { const x = -5 + i / 20, y = f(x); if (!isFinite(y) || Math.abs(y) > 6) { pv = null; continue; } d += (pv === null || Math.abs(y - pv) > 1.5 ? "M" : "L") + (110 + x * 20).toFixed(1) + " " + (110 - y * 20).toFixed(1); pv = y; }
 return `<svg class="plane fig" viewBox="0 0 220 220" role="img" aria-label="grafico">${GRID()}<path d="${d}" fill="none" stroke="#ff6b35" stroke-width="3.5" stroke-linecap="round"/></svg>`;
};
const extra = g => {
 if (g.tg) {
  const dot = (p, c) => `<circle cx="${110 + p[0] * 20}" cy="${110 - p[1] * 20}" r="7" fill="${c}" stroke="#171d2f" stroke-width="2"/>`;
  return `<svg class="plane" viewBox="0 0 220 220" role="img" aria-label="piano cartesiano">${GRID()}${g.fin ? g.tg.map(p => dot(p, "#7fd8be")).join("") : ""}${g.sel.map(p => dot(p, "#ffb38a")).join("")}</svg><p>📍 ${g.sel.length}/${g.tg.length} · ❌ ${g.err}/3</p>${g.fin ? "" : `<div class="row"><button data-a="chk">✔ Verifica</button></div>`}`;
 }
 if (g.n !== undefined) { const m = (g.min + g.max) / 2; return g.fin ? `<p>🎯 <b>${g.val}</b> → <b>${g.n}</b></p>` : `<input id="sl" type="range" min="${g.min}" max="${g.max}" step="${g.st}" value="${m}"><p class="big" id="sv">${m}</p><div class="row"><button data-a="chk">🎯 OK</button></div>`; }
 return `<p>❌ ${g.err}/3</p>` + g.rows.map((r, i) => `<div class="mz ${i < g.row ? "past" : ""}">${r.map((c, j) => `<button data-a="cell" data-i="${j}" class="${i < g.row && g.sel[i] === j ? "ok" : ""}" ${i !== g.row || g.fin ? "disabled" : ""}>${esc(c[0])}</button>`).join("")}</div>`).join("");
};

// Lezione animata: scene con Tomo, didascalia, esempio extra e voce opzionale
const scenes = () => [["🎯", `${MODES[g.m]} · ${LV()[g.l]}`], ["🧠", g.e], ...(g.x || "").split(" | ").map((p, i) => [i ? "👉" : "✨", i ? p : `${t("ex")}: ${p}`])].filter(x => x[1]);
function lesson(i = 0) {
 clearTimeout(vt); window.speechSynthesis?.cancel();
 const S = scenes(), box = $("#lesson"); if (!box) return;
 i = Math.max(0, Math.min(i, S.length - 1)); g.li = i;
 box.innerHTML = `<div class="lsn"><div class="lsn-top">${bookMascot(i % 2 ? "happy" : "think", "")}<span class="lsn-ico">${S[i][0]}</span></div><p class="cap">${esc(S[i][1])}</p><div class="dots">${S.map((_, j) => `<i class="${j <= i ? "d" : ""}"></i>`).join("")}</div><div class="row"><button data-a="vgo" data-i="${i - 1}">⏮</button><button data-a="vpl" data-i="${i}">${vp ? "▶" : "⏸"}</button><button data-a="vgo" data-i="${i + 1}">⏭</button><button data-a="vgo" data-i="0">${t("replay")}</button><button data-a="vvo" data-i="${i}">${vv ? "🔊" : "🔇"}</button></div></div>`;
 if (vv && window.speechSynthesis) { const u = new SpeechSynthesisUtterance(S[i][1]); u.lang = "it-IT"; speechSynthesis.speak(u); }
 if (!vp && i < S.length - 1) vt = setTimeout(() => lesson(i + 1), Math.max(4000, S[i][1].length * 70));
}

// Avanza in sequenza dal livello 0 al livello 2
async function runStep(s, startL = 0) {
 const date = rome(), m = modeOf(s, date);
 for (let l = startL; l < 3; l++) {
  if (me) {
   const x = await getDoc(doc(db, "scores", `${date}_${s}_${l}_${me.uid}`));
   if (x.exists()) continue;
  }
  const it = pick(s, date, m, l);
  g = it.p
   ? { ...it, s, l, m, date, g: [], err: 0, hints: 0 }
   : it.o ? { ...it, s, l, m, date, hints: 0, c: it.o[0], o: shuf(it.o, rng(hash(date + it.q))) }
   : { ...it, s, l, m, date, hints: 0, err: 0, sel: [], row: 0 };
  const L = X[s]?.[m]?.[l]; if (L && !it.own) { g.e = L.e; g.x = L.x; if (!g.p) g.h = L.h; }
  game();
  return;
 }
 alert(t("playedAll"));
 lb({ s, l: 2 });
}

async function finish(pts) {
 g.fin = true; g.pts = pts; game();
 if (!me) return;
 try {
  const uid = me.uid, key = `${g.date}_${g.s}_${g.l}`;
  await setDoc(doc(db, "scores", `${key}_${uid}`), { key, uid, username: prof.username, points: pts, mode: g.m, ts: serverTimestamp() });
  const y = new Date(Date.parse(g.date) - 864e5).toISOString().slice(0, 10);
  let st = prof.streak || 0; if (prof.last !== g.date) st = prof.last === y ? st + 1 : 1;
  prof = { ...prof, streak: st, last: g.date, total: (prof.total || 0) + pts, n: (prof.n || 0) + 1 };
  await setDoc(doc(db, "users", uid), prof, { merge: true }); head();
 } catch (e) { console.error(e); }
}
const check = () => {
 const won = [...g.p].every(c => c === " " || g.g.includes(c));
 if (won || g.err >= 7) finish(sc(won ? 1 - 0.08 * g.err : 0));
 else game();
};

async function lb(d) {
 const key = `${rome()}_${d.s}_${d.l}`;
 const snap = await getDocs(query(collection(db, "scores"), where("key", "==", key), limit(50)));
 const rows = snap.docs.map(x => x.data()).sort((a, b) => b.points - a.points).slice(0, 10);
 show(`<h2>${t("rank")} · ${LV()[d.l]}</h2><table><tr><th>#</th><th></th><th>${t("pts")}</th></tr>${rows.map((r, i) => `<tr class="${r.uid === me?.uid ? "me" : ""}"><td>${i + 1}</td><td>${esc(r.username)}</td><td>${fmt(r.points)}</td></tr>`).join("")}</table><div class="row"><button data-a="home">${t("home")}</button></div>`);
}

function authScreen(mode = "login") {
 const f = (n, l, ty = "text", req = true) => `<label>${l}${req ? " *" : ""}<input name="${n}" type="${ty}" ${req ? "required" : ""}></label>`;
 show(mode === "login" ? `<h2>${t("login")}</h2><form data-f="login">${f("email", "Email", "email")}${f("password", "Password", "password")}<p class="err" id="er"></p><button>${t("login")}</button></form><p><button data-a="reg">${t("reg")}</button></p>` :
  `<h2>${t("reg")}</h2><form data-f="reg"><label>Lingua / Language<select name="lang"><option value="it">Italiano</option><option value="en">English</option></select></label>${f("nome", "Nome")}${f("cognome", "Cognome")}${f("username", "Username")}${f("email", "Email", "email")}${f("password", "Password (min 6)", "password")}${f("dob", "Data di nascita", "date", false)}${f("city", "Città", "text", false)}<p class="err" id="er"></p><button>${t("reg")}</button></form>`);
}

function profile() {
 head();
 show(`<h2>${esc(prof.nome)} ${esc(prof.cognome)} (@${esc(prof.username)})</h2><p>${t("streak")}: 🔥 ${prof.streak || 0} · ${t("avg")}: ${fmt((prof.total || 0) / (prof.n || 1))}</p>${prof.photo ? `<img class="avatar" style="width:96px;height:96px" src="${prof.photo}" alt="">` : ""}<label>Foto profilo<input id="ph" type="file" accept="image/*"></label><label>Lingua<select id="lg"><option value="it" ${lang == "it" ? "selected" : ""}>Italiano</option><option value="en" ${lang == "en" ? "selected" : ""}>English</option></select></label><div class="row"><button data-a="out">${t("out")}</button></div>`);
}

function exam() {
 head();
 const d = rome(), e = prof.exam?.d === d ? prof.exam : { d, used: 0, extra: 0 }, left = 15 + e.extra - e.used;
 show(`<h2>${t("exam")}</h2><p>${t("wait")}</p><p>${t("free")}: <b>${left}</b></p><div class="row"><button data-a="more" ${me ? "" : "disabled"}>${t("more")}</button></div>${me ? "" : `<p>${t("guest")}</p>`}`);
}

function feedback() {
 head();
 show(`<h2>${t("fb")}</h2>${me ? `<form data-f="fb"><label>Tipo<select name="type"><option>Miglioria</option><option>Problema</option><option>Errore in una domanda</option></select></label><label>Messaggio<textarea name="text" rows="5" required maxlength="1500"></textarea></label><button>${t("send")}</button></form>` : `<p>${t("guest")}</p>`}`);
}

// ---- azioni ----
const act = {
 home, exam, fb: feedback, prof: profile, lb, auth: () => authScreen("login"), reg: () => authScreen("reg"),
 startRun(d) { runStep(d.s, 0); },
 nextLvl() { if (g && g.l < 2) runStep(g.s, g.l + 1); },
 play(d) { runStep(d.s, +d.l || 0); },
 ans(d) { g.pick = +d.i; finish(sc(g.o[g.pick] === g.c ? 1 : 0)); },
 key(d) { if (g.fin) return; g.g.push(d.c); if (!g.p.includes(d.c)) g.err++; check(); },
 hint() { ad(() => { if (g.p) g.g.push(g.h[g.hints]); g.hints++; g.p ? check() : game(); }); },
 more() { ad(async () => { const d = rome(), e = prof.exam?.d === d ? prof.exam : { d, used: 0, extra: 0 }; prof.exam = { ...e, extra: e.extra + 10 }; await setDoc(doc(db, "users", me.uid), { exam: prof.exam }, { merge: true }); exam(); }); },
 pre() { ad(() => { g.les = true; g.li = 0; game(); vp = false; lesson(0); }); },
 vid() { vp = false; lesson(0); },
 vgo(d) { lesson(+d.i); },
 vpl(d) { vp = !vp; lesson(+d.i); },
 vvo(d) { vv = !vv; lesson(+d.i); },
 chk() {
  if (g.fin) return;
  if (g.n !== undefined) { g.val = +$("#sl").value; return finish(sc(Math.max(0, 1 - 4 * Math.abs(g.val - g.n) / (g.max - g.min)))); }
  const k = a => a.map(p => p.join(",")).sort().join(";");
  if (k(g.sel) === k(g.tg)) return finish(sc(1 - 0.2 * g.err));
  g.err++; g.err >= 3 ? finish(0) : game();
 },
 cell(d) {
  if (g.fin) return; const j = +d.i;
  if (g.rows[g.row][j][1]) { g.sel[g.row] = j; g.row++; if (g.row >= g.rows.length) return finish(sc(1 - 0.2 * g.err)); }
  else { g.err++; if (g.err >= 3) return finish(0); }
  game();
 },
 out: () => signOut(auth)
};
v.oninput = e => { if (e.target.id === "sl") $("#sv").textContent = e.target.value; };
v.onclick = e => {
 const pl = e.target.closest("svg.plane");
 if (pl && g?.tg && !g.fin) {
  const r = pl.getBoundingClientRect(), k = 220 / r.width, c = n => Math.max(-5, Math.min(5, n)), x = c(Math.round(((e.clientX - r.left) * k - 110) / 20)), y = c(Math.round((110 - (e.clientY - r.top) * k) / 20));
  const i = g.sel.findIndex(p => p[0] === x && p[1] === y); i < 0 ? g.sel.push([x, y]) : g.sel.splice(i, 1); return game();
 }
 const b = e.target.closest("[data-a]"); if (b) act[b.dataset.a]?.(b.dataset); };
hd.onclick = v.onclick;
v.onchange = async e => {
 if (e.target.id === "lg") { lang = e.target.value; localStorage.lang = lang; await setDoc(doc(db, "users", me.uid), { lang }, { merge: true }); profile(); }
 if (e.target.id === "ph") { // foto ridotta 128px salvata nel documento utente (niente Storage)
  const im = await createImageBitmap(e.target.files[0]), c = document.createElement("canvas"), s = Math.min(im.width, im.height);
  c.width = c.height = 128; c.getContext("2d").drawImage(im, (im.width - s) / 2, (im.height - s) / 2, s, s, 0, 0, 128, 128);
  prof.photo = c.toDataURL("image/jpeg", .7); await setDoc(doc(db, "users", me.uid), { photo: prof.photo }, { merge: true }); profile(); }
};
v.onsubmit = async e => {
 e.preventDefault();
 const f = Object.fromEntries(new FormData(e.target)), er = $("#er");
 try {
  if (e.target.dataset.f === "login") await signInWithEmailAndPassword(auth, f.email, f.password);
  if (e.target.dataset.f === "reg") {
   const un = f.username.trim().toLowerCase();
   if (!/^[a-z0-9_.]{3,20}$/.test(un)) throw { message: "Username: 3-20 caratteri (a-z, 0-9, _ .)" };
   if ((await getDoc(doc(db, "usernames", un))).exists()) throw { message: "Username già in uso" };
   lang = f.lang; localStorage.lang = lang;
   const c = await createUserWithEmailAndPassword(auth, f.email, f.password);
   await setDoc(doc(db, "usernames", un), { uid: c.user.uid });
   await setDoc(doc(db, "users", c.user.uid), { nome: f.nome, cognome: f.cognome, username: un, email: f.email, dob: f.dob || "", city: f.city || "", lang, streak: 0, total: 0 });
   sendEmailVerification(c.user); // email con link di conferma
  }
  if (e.target.dataset.f === "fb") { await addDoc(collection(db, "feedback"), { uid: me.uid, type: f.type, text: f.text, ts: serverTimestamp() }); alert("✔"); home(); }
 } catch (x) { if (er) er.textContent = x.message; }
};

if (cfg.apiKey === "INCOLLA") show("<h2>Configura Firebase</h2><p>Apri <code>firebase-config.js</code> e incolla la configurazione del tuo progetto (vedi README).</p>");
const app = cfg.apiKey === "INCOLLA" ? null : initializeApp(cfg), auth = app && getAuth(app), db = app && getFirestore(app);
if (auth) onAuthStateChanged(auth, async u => {
 me = u; prof = {};
 if (u) { try { prof = (await getDoc(doc(db, "users", u.uid))).data() || {}; if (prof.lang) lang = prof.lang; } catch (e) { console.error(e); } }
 home();
});