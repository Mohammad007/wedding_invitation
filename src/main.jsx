import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BlessingCarousel } from './Blessings.jsx';
import { QrCode, ScratchCard } from './Extras.jsx';
import './style.css';

const WEDDING = new Date('2026-12-15T00:00:00+05:30');
const DIRECTIONS = 'https://www.google.com/maps/search/?api=1&query=Chand+Banquet+Hall+Near+Double+Fatak+Najibabad';
// Put your own MP3 at public/music.mp3; the music button appears only once the file loads.
// Shorter link for the QR code, so its dots are larger and easier for phone cameras to read
const QR_DIRECTIONS = 'https://maps.google.com/?q=Chand+Banquet+Hall+Near+Double+Fatak+Najibabad';
const MUSIC_SRC = 'https://pub-717179bab2d447a1a4a8b832b13d0e04.r2.dev/template-assets/emerald-qasr/music.mp3';
const GROOM_HOME = 'Moh. Sewaram Kuwa, Najibabad';
const COUPLES = [
  { groom: ['Mohd', 'Subhan'], bride: 'Iqra Kousar', brideHome: ['Moh. Muneer Ganj,', 'Near Besatiyaam Masjid'] },
  { groom: ['Mohd', 'Sheeraz'], bride: 'Afreen', brideHome: ['Kaze Sarah,', 'Nagina'] },
];
const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const rnd = (i, s) => { const x = Math.sin(i * 12.9898 + s * 78.233) * 43758.5453; return x - Math.floor(x); };

/* =========================================================
   Artwork (all drawn in SVG)
   ========================================================= */
function Magnolia({ x, y, r = 0, s = 1 }) {
  const petals = [-58, -30, 0, 30, 58];
  return <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    {petals.map((a, i) => <path key={i} transform={`rotate(${a}) scale(${i % 2 ? .82 : 1})`} d="M0 0C15-8 17-33 0-46C-17-33-15-8 0 0Z" fill="url(#petalPink)" stroke="#c9a24a" strokeWidth=".9" />)}
    <path d="M-7 2Q0 8 7 2" stroke="#7f9a5d" strokeWidth="2" />
  </g>;
}
function Leaf({ x, y, r = 0, s = 1, fill = '#9dbd84', vein = '#c9a24a' }) {
  return <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <path d="M0 0C11-12 12-40 0-58C-12-40-11-12 0 0Z" fill={fill} stroke={vein} strokeWidth=".9" />
    <path d="M0-4V-52" stroke={vein} strokeWidth=".7" />
  </g>;
}
function MagnoliaCorner({ className }) {
  return <svg className={className} viewBox="0 0 160 160" fill="none" aria-hidden="true">
    <path d="M0 18C40 30 70 62 92 110M30 0C46 40 82 60 140 70" stroke="#c9a24a" strokeWidth="1.6" />
    <Leaf x={30} y={40} r={120} s={.8} /><Leaf x={70} y={30} r={60} s={.7} /><Leaf x={62} y={86} r={150} s={.75} /><Leaf x={110} y={66} r={40} s={.6} /><Leaf x={20} y={92} r={170} s={.6} />
    <Magnolia x={44} y={60} r={150} s={.75} /><Magnolia x={100} y={44} r={110} s={.62} /><Magnolia x={74} y={112} r={170} s={.6} /><Magnolia x={18} y={20} r={135} s={.5} />
  </svg>;
}
function Lily({ x, y, r = 0, s = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    {[0, 60, 120, 180, 240, 300].map((a, i) => <path key={a} transform={`rotate(${a}) scale(${i % 2 ? .85 : 1})`} d="M0 0C9-10 8-34 0-46C-8-34-9-10 0 0Z" fill="url(#petalCream)" stroke="#c49a3c" strokeWidth=".9" />)}
    {[20, 80, 140, 200, 260, 320].map(a => <g key={a} transform={`rotate(${a})`}><path d="M0 0V-16" stroke="#b07f25" strokeWidth=".9" /><circle cy="-17" r="1.8" fill="#d9a53a" /></g>)}
  </g>;
}
function LilyCorner({ className }) {
  return <svg className={className} viewBox="0 0 170 170" fill="none" aria-hidden="true">
    <path d="M4 6C50 20 66 60 70 100M6 4C40 34 90 40 140 30" stroke="url(#goldStroke)" strokeWidth="2.2" />
    <path d="M10 60C24 52 30 40 28 26M60 12C52 26 40 32 26 30" stroke="url(#goldStroke)" strokeWidth="1.4" />
    <Leaf x={40} y={52} r={130} s={.95} fill="#1d2f63" vein="#d4ad55" /><Leaf x={82} y={34} r={70} s={.85} fill="#1d2f63" vein="#d4ad55" />
    <Leaf x={36} y={98} r={175} s={.8} fill="#1d2f63" vein="#d4ad55" /><Leaf x={112} y={52} r={50} s={.7} fill="#d4ad55" vein="#9a6f1f" />
    <Leaf x={64} y={92} r={145} s={.62} fill="#d4ad55" vein="#9a6f1f" /><Leaf x={14} y={120} r={185} s={.5} fill="#d4ad55" vein="#9a6f1f" />
    <Lily x={62} y={62} s={.95} r={15} /><Lily x={122} y={28} s={.6} r={40} /><Lily x={22} y={118} s={.55} r={-10} />
  </svg>;
}
function Flourish({ className = '', width = 200 }) {
  const half = <g>
    <path d="M86 10C76 2 66 2 62 8C59 13 66 16 69 11" />
    <path d="M86 10C76 18 66 18 62 12" />
    <path d="M60 10H8" strokeWidth=".9" />
    <circle cx="6" cy="10" r="1.6" fill="currentColor" />
    <path d="M58 10C50 4 42 5 40 10C42 15 50 16 58 10Z" fill="currentColor" opacity=".25" />
  </g>;
  return <svg className={'flourish ' + className} viewBox="0 0 200 20" width={width} fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
    {half}<g transform="translate(200 0) scale(-1 1)">{half}</g>
    <path d="M100 2L108 10L100 18L92 10Z" fill="currentColor" />
    <circle cx="100" cy="10" r="2" fill="#fff6dc" stroke="none" />
  </svg>;
}
function Fleur({ className = '' }) {
  return <svg className={'fleur ' + className} viewBox="0 0 90 30" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
    <path d="M45 2C50 9 50 15 45 22C40 15 40 9 45 2Z" fill="currentColor" />
    <path d="M42 22C30 26 18 22 16 14C15 8 23 7 24 13M48 22C60 26 72 22 74 14C75 8 67 7 66 13" />
    <path d="M36 16C28 10 30 4 36 6M54 16C62 10 60 4 54 6" />
    <circle cx="45" cy="27" r="2" fill="currentColor" /><circle cx="8" cy="18" r="1.5" fill="currentColor" /><circle cx="82" cy="18" r="1.5" fill="currentColor" />
  </svg>;
}
function Lantern({ className }) {
  return <svg className={'lantern ' + className} viewBox="0 0 40 150" fill="none" aria-hidden="true">
    <path d="M20 0V40" stroke="#c49a3c" strokeWidth="1.2" strokeDasharray="3 2" />
    <path d="M14 40H26L28 46H12Z" fill="#c49a3c" /><circle cx="20" cy="38" r="2.4" fill="#c49a3c" />
    <path className="glass" d="M11 46H29L31 76Q20 86 9 76Z" fill="#ffd779" stroke="#b9892c" strokeWidth="1.5" />
    <path d="M15 48V80M20 46V84M25 48V80" stroke="#a5752a" strokeWidth=".7" />
    <path d="M12 84H28L20 98Z" fill="#c49a3c" /><path d="M20 98V112" stroke="#c49a3c" /><circle cx="20" cy="115" r="2.6" fill="#c49a3c" />
    <path d="M17 118L20 130L23 118" fill="#c49a3c" />
  </svg>;
}
function Defs() {
  return <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
    <defs>
      <linearGradient id="petalPink" x1="0" y1="0" x2="0" y2="-46" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#e9a2b7" /><stop offset=".55" stopColor="#f8dbe4" /><stop offset="1" stopColor="#fffafb" /></linearGradient>
      <linearGradient id="petalCream" x1="0" y1="0" x2="0" y2="-46" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#f0d89a" /><stop offset=".5" stopColor="#fbf1dc" /><stop offset="1" stopColor="#fffdf7" /></linearGradient>
      <linearGradient id="goldStroke" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#9a6f1f" /><stop offset=".5" stopColor="#f3d27d" /><stop offset="1" stopColor="#b9892c" /></linearGradient>
    </defs>
  </svg>;
}

/* =========================================================
   Opening: laser-cut jali pocket tied with a ribbon
   ========================================================= */
function Jali() {
  const shape = 'M0-12Q6-12 6-6Q12-6 12 0Q12 6 6 6Q6 12 0 12Q-6 12-6 6Q-12 6-12 0Q-12-6-6-6Q-6-12 0-12Z';
  const cells = [];
  for (let row = 0; row < 4; row++) for (let col = -3; col <= 3; col++) {
    const x = 150 + col * 28 + (row % 2 ? 14 : 0), y = 120 + row * 22;
    if (Math.abs(x - 150) / 28 + row * .62 < 3.4 && x > 60 && x < 240) cells.push([x, y]);
  }
  return <g>{cells.map(([x, y], i) => <path key={i} d={shape} transform={`translate(${x} ${y})`} fill="#273230" />)}</g>;
}
function Pocket({ state, onOpen }) {
  return <div className={'pocket-scene ' + state}>
    <div className="table-glow" aria-hidden="true" />
    <button className="pocket" onClick={onOpen} disabled={state !== 'closed'} aria-label="Untie the ribbon to open the wedding invitation">
      <span className="pocket-body" aria-hidden="true">
        <svg className="pocket-art" viewBox="0 0 300 220" fill="none">
          <Jali />
          <g transform="translate(150 50)">
            <circle r="34" fill="none" stroke="#c9a24a" strokeWidth="1.2" strokeDasharray="2 3" />
            {Array.from({ length: 16 }, (_, i) => <path key={i} transform={`rotate(${i * 22.5})`} d="M0-30Q5-36 0-42Q-5-36 0-30Z" fill="#d4ad55" />)}
            <rect x="-22" y="-22" width="44" height="44" rx="11" transform="rotate(45)" fill="#e7f0e4" stroke="#d4ad55" strokeWidth="2.2" />
            <text className="monogram" y="7" textAnchor="middle">S&amp;S</text>
          </g>
        </svg>
        <MagnoliaCorner className="corner tl" />
        <MagnoliaCorner className="corner tr" />
      </span>
      <span className="insert" aria-hidden="true">
        <MagnoliaCorner className="mini bl" /><MagnoliaCorner className="mini br" />
        <span className="insert-text">
          <span className="insert-ar" lang="ar" dir="rtl">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
          <span className="insert-title">You are cordially invited</span>
          <span className="insert-sub">to a wedding celebration</span>
        </span>
        <span className="holes"><i /><i /></span>
        <svg className="ribbon" viewBox="0 0 140 170" fill="none">
          <path className="strand" d="M-60 36L104 70" stroke="#f5e08e" strokeWidth="7" />
          <path className="strand" d="M-60 22L104 82" stroke="#ecd172" strokeWidth="7" />
          <g className="bow" transform="translate(104 76)">
            <path className="loop l" d="M0 0C-26-30-46-10-30 6C-20 16-8 6 0 0Z" fill="#f6e392" stroke="#d9bd57" strokeWidth="1.4" />
            <path className="loop r" d="M0 0C24-32 46-14 32 4C22 16 8 6 0 0Z" fill="#f6e392" stroke="#d9bd57" strokeWidth="1.4" />
            <path className="tail l" d="M-2 2C-10 30-22 56-30 84L-20 82C-12 56-4 30 2 4Z" fill="#f1da7c" />
            <path className="tail r" d="M2 2C14 26 26 48 40 72L30 76C18 52 8 28-1 4Z" fill="#f1da7c" />
            <ellipse className="knot" rx="7" ry="6" fill="#f3dc80" stroke="#d9bd57" strokeWidth="1.2" />
          </g>
        </svg>
      </span>
    </button>
    <p className="pocket-hint"><span className="tap" aria-hidden="true" />Tap the ribbon to open</p>
    <div className="ivory-flash" aria-hidden="true" />
  </div>;
}

/* =========================================================
   The invitation card
   ========================================================= */
function Card() {
  return <article className="card" aria-label="Wedding invitation">
    <span className="foil-sweep" aria-hidden="true" />
    <LilyCorner className="lily tl" /><LilyCorner className="lily tr" /><LilyCorner className="lily bl" /><LilyCorner className="lily br" />
    <div className="sheet">
      <section className="page p-intro" aria-label="Invitation"><div className="page-in">
      <PageLilies a="tl" b="tr" />
      <Lantern className="left" /><Lantern className="right" />
      <Fleur className="finial" />
      <p className="bismillah" lang="ar" dir="rtl" data-r style={{ '--d': '.15s' }}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
      <p className="italic-line" data-r style={{ '--d': '.35s' }}>In the Name of Allah,<br />the Most Beneficent and the Most Merciful</p>
      <span data-r="draw" style={{ '--d': '.55s' }}><Flourish /></span>
      <h1 className="host" data-r style={{ '--d': '.7s' }}>Mr. Mohd Irfan</h1>
      <p className="late" data-r style={{ '--d': '.8s' }}>(Late)</p>
      <p className="italic-line invites" data-r style={{ '--d': '.95s' }}>Cordially invites you to the<br />Wedding Ceremony of their beloved sons</p>
      <span data-r="draw" style={{ '--d': '1.1s' }}><Flourish /></span>
      <p className="swipe-hint" aria-hidden="true"><span>⌃</span>Swipe up</p>
      </div></section>

      <section className="page p-couples" aria-label="The couples"><div className="page-in">
      <PageLilies a="tr" b="bl" />
      <div className="couples">
        {COUPLES.map((c, i) => <section key={c.bride} className="frame" data-r="rise" style={{ '--d': i * .25 + 's' }} aria-label={`${c.groom.join(' ')} weds ${c.bride}`}>
          <Fleur className="frame-top" />
          <h2 className="script write" style={{ '--d': .45 + 's' }}>{c.groom[0]}<br />{c.groom[1]}</h2>
          <p className="addr"><b>Address:</b><br />{GROOM_HOME}</p>
          <p className="weds pop-in" style={{ '--d': '1s' }}><span>WEDS</span></p>
          <h2 className="script bride write" style={{ '--d': '1.3s' }}>{c.bride}</h2>
          <p className="addr"><b>Address:</b><br />{c.brideHome[0]}<br />{c.brideHome[1]}</p>
          <Fleur className="frame-bottom" />
        </section>)}
        <span className="divider-v" aria-hidden="true" />
      </div>
      </div></section>

      <section className="page p-venue" aria-label="Date and venue"><div className="page-in">
      <PageLilies a="bl" b="br" />
      <div className="programme" data-r style={{ '--d': '.1s' }}>
        <span className="wing" aria-hidden="true" /><span className="programme-label">Programme</span><span className="wing r" aria-hidden="true" />
      </div>
      <div className="date-scratch" data-r="rise" style={{ '--d': '.25s' }}>
        <ScratchCard>
          <p className="sd-label">Save the Date</p>
          <p className="sd-day">Tuesday</p>
          <p className="sd-date"><strong>15<sup>th</sup></strong> December 2026</p>
          <Flourish className="sd-flourish" />
          <p className="sd-line">Mark your calendar — we await you</p>
        </ScratchCard>
      </div>
      <div className="venue" data-r="rise" style={{ '--d': '.4s' }}>
        <span className="pin" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 22S5 14.5 5 9.5A7 7 0 0 1 19 9.5C19 14.5 12 22 12 22Z" /><circle cx="12" cy="9.5" r="2.6" /></svg></span>
        <div className="venue-body">
          <div className="venue-text">
            <h2 className="venue-name">Chand Banquet Hall</h2>
            <p className="venue-addr">Near Double Fatak,<br />Najibabad</p>
            <a className="maps-btn" href={DIRECTIONS} target="_blank" rel="noreferrer">Open in Maps ↗</a>
          </div>
          <figure className="venue-qr">
            <QrCode value={QR_DIRECTIONS} label="QR code that opens directions to Chand Banquet Hall in Google Maps" />
            <figcaption>Scan for directions</figcaption>
          </figure>
        </div>
      </div>
      <span data-r="draw" style={{ '--d': '.2s' }}><Flourish className="end" /></span>
      </div></section>
    </div>
  </article>;
}
function PageLilies({ a, b }) {
  return <><LilyCorner className={'page-lily ' + a} /><LilyCorner className={'page-lily ' + b} /></>;
}

/* ---------- Extras below the card ---------- */
function Countdown() {
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const id = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(id); }, []);
  const d = Math.max(0, WEDDING - now);
  const units = [[Math.floor(d / 86400000), 'Days'], [Math.floor(d / 3600000) % 24, 'Hours'], [Math.floor(d / 60000) % 60, 'Minutes'], [Math.floor(d / 1000) % 60, 'Seconds']];
  return <div className="countdown" role="timer" aria-label={`${units[0][0]} days, ${units[1][0]} hours and ${units[2][0]} minutes to go`}>
    {units.map(([v, l]) => <div key={l} className="unit"><span className="digits" aria-hidden="true"><b key={v}>{String(v).padStart(2, '0')}</b></span><small>{l}</small></div>)}
  </div>;
}
function downloadIcs() {
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Family Wedding Invitation//EN', 'BEGIN:VEVENT', 'UID:subhan-sheeraz-20261215@wedding-invitation', 'DTSTAMP:20261102T000000Z', 'DTSTART;VALUE=DATE:20261215', 'DTEND;VALUE=DATE:20261216', 'SUMMARY:Wedding Celebration — Subhan & Iqra and Sheeraz & Afreen', 'LOCATION:Chand Banquet Hall\\, Near Double Fatak\\, Najibabad', 'DESCRIPTION:Join our family to celebrate. Please confirm ceremony timings with the family.', 'END:VEVENT', 'END:VCALENDAR'];
  const enc = new TextEncoder();
  const text = lines.flatMap(line => { const parts = []; let part = ''; for (const ch of line) { if (enc.encode(part + ch).length > 74) { parts.push(part); part = ' ' + ch; } else part += ch; } parts.push(part); return parts; }).join('\r\n');
  const url = URL.createObjectURL(new Blob([text], { type: 'text/calendar;charset=utf-8' }));
  const a = document.createElement('a'); a.href = url; a.download = 'wedding-15-december-2026.ics'; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function Extras({ onReplay }) {
  const [copied, setCopied] = useState(false);
  async function share() {
    if (!/^https?:$/.test(location.protocol)) { alert('To share this invitation, open it from a hosted website link.'); return; }
    if (navigator.share) { try { await navigator.share({ title: document.title, url: location.href }); return; } catch (e) { if (e.name === 'AbortError') return; } }
    try { await navigator.clipboard.writeText(location.href); setCopied(true); setTimeout(() => setCopied(false), 2500); }
    catch { prompt('Copy the invitation link', location.href); }
  }
  const gcal = 'https://calendar.google.com/calendar/render?' + new URLSearchParams({ action: 'TEMPLATE', text: 'Wedding: Subhan & Iqra and Sheeraz & Afreen', dates: '20261215/20261216', details: 'Join our family to celebrate. Ceremony timings to be confirmed.', location: 'Chand Banquet Hall, Near Double Fatak, Najibabad', ctz: 'Asia/Kolkata' });
  return <div className="extras">
    <section className="page" aria-label="Countdown"><div className="page-in panel" data-r>
      <PageLilies a="tl" b="br" />
      <Flourish className="light" />
      <p className="panel-title">Counting the days</p>
      <Countdown />
      <div className="actions">
        <a className="btn" href={gcal} target="_blank" rel="noreferrer">＋ Google Calendar</a>
        <button className="btn ghost" onClick={downloadIcs}>＋ Apple / Outlook</button>
        <a className="btn ghost" href={DIRECTIONS} target="_blank" rel="noreferrer">⌖ Directions</a>
      </div>
      <p className="fine">All-day entry · ceremony timings to be shared by the family</p>
    </div></section>
    <section className="page" aria-label="A blessing"><div className="page-in panel" data-r><PageLilies a="tr" b="bl" /><BlessingCarousel active /></div></section>
    <section className="page" aria-label="With love"><div className="page-in panel closing" data-r>
      <PageLilies a="bl" b="br" />
      <p className="closing-script">With love &amp; duas</p>
      <p className="closing-copy">Your presence will make our happiness complete.</p>
      <div className="actions">
        <button className="btn" onClick={share}>{copied ? 'Link copied ✓' : 'Share invitation ↗'}</button>
        <button className="btn ghost" onClick={onReplay}>Tie the ribbon again ⟲</button>
      </div>
      <span className="sr-only" role="status">{copied ? 'Invitation link copied' : ''}</span>
    </div></section>
  </div>;
}

function Sparkles() {
  return <div className="sparkles" aria-hidden="true">{Array.from({ length: 22 }, (_, i) => <i key={i} className={'k' + (i % 3)} style={{ left: rnd(i, 1) * 100 + '%', animationDuration: 12 + rnd(i, 2) * 12 + 's', animationDelay: -rnd(i, 3) * 24 + 's', '--s': .5 + rnd(i, 4) * .9, '--sway': (rnd(i, 5) * 100 - 50) + 'px' }} />)}</div>;
}

/* =========================================================
   App
   ========================================================= */
function App() {
  const [stage, setStage] = useState('closed'); // closed → opening → card
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [hasMusic, setHasMusic] = useState(false);
  const [playing, setPlaying] = useState(false);
  const scroller = useRef(); const timer = useRef(); const audio = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);
  function toggleMusic() {
    const a = audio.current; if (!a) return;
    if (a.paused) a.play().catch(() => setPlaying(false)); else a.pause();
  }

  function open() {
    if (stage !== 'closed') return;
    setStage('opening');
    audio.current?.play().catch(() => {});
    timer.current = setTimeout(() => { setStage('card'); scroller.current?.focus({ preventScroll: true }); }, reducedMotion() ? 60 : 2900);
  }
  function replay() { clearTimeout(timer.current); scroller.current?.scrollTo({ top: 0 }); setStage('closed'); }

  useEffect(() => {
    if (stage !== 'card') return;
    const root = scroller.current;
    root.querySelectorAll('[data-r]').forEach(el => el.classList.remove('in'));
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { root, threshold: .15 });
    root.querySelectorAll('[data-r]').forEach(el => io.observe(el));
    const pages = [...root.querySelectorAll('.page')]; setPageCount(pages.length);
    const spy = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) setPage(pages.indexOf(e.target)); }), { root, rootMargin: '-49% 0px -49% 0px' });
    pages.forEach(p => spy.observe(p));
    return () => { io.disconnect(); spy.disconnect(); };
  }, [stage]);

  return <div className={'app stage-' + stage}>
    <Defs />
    <div className="backdrop" aria-hidden="true" />
    {stage !== 'closed' && <Sparkles />}
    <main ref={scroller} className="scroller" tabIndex={-1} inert={stage !== 'card'}>
      <Card />
      <Extras onReplay={replay} />
    </main>
    <nav className="page-dots" aria-label="Sections" inert={stage !== 'card'}>{Array.from({ length: pageCount }, (_, i) => <button key={i} className={i === page ? 'on' : ''} aria-label={'Go to section ' + (i + 1)} aria-current={i === page ? 'true' : undefined} onClick={() => scroller.current.querySelectorAll('.page')[i]?.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth' })} />)}</nav>
    <audio ref={audio} src={MUSIC_SRC} loop preload="auto" onLoadedMetadata={() => setHasMusic(true)} onError={() => setHasMusic(false)} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
    {hasMusic && stage === 'card' && <button className={'music' + (playing ? ' on' : '')} onClick={toggleMusic} aria-label={playing ? 'Pause music' : 'Play music'} aria-pressed={playing}><span className="bars" aria-hidden="true"><i /><i /><i /><i /></span><span className="note" aria-hidden="true">♪</span></button>}
    {stage !== 'card' && <Pocket state={stage} onOpen={open} />}
  </div>;
}

createRoot(document.getElementById('root')).render(<App />);
