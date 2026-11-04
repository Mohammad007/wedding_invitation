import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BlessingCarousel } from './Blessings.jsx';
import './style.css';

const WEDDING = new Date('2026-12-15T00:00:00+05:30');
const DIRECTIONS = 'https://www.google.com/maps/search/?api=1&query=Chand+Banquet+Hall+Near+Double+Fatak+Najibabad';
const SECTIONS = [
  { id: 'welcome', label: 'Welcome' },
  { id: 'couples', label: 'The couples' },
  { id: 'date', label: 'The date' },
  { id: 'venue', label: 'The venue' },
  { id: 'blessing', label: 'A blessing' },
  { id: 'farewell', label: 'With love' },
];
const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const rnd = (i, s) => { const x = Math.sin(i * 12.9898 + s * 78.233) * 43758.5453; return x - Math.floor(x); };

/* ---------- Kinetic text: every letter animates in ---------- */
function Split({ text, className = '', delay = 0, step = 0.035, as: Tag = 'span' }) {
  let n = 0;
  return <Tag className={'split ' + className}>
    <span className="sr-only">{text}</span>
    <span aria-hidden="true">{text.split(' ').map((word, wi) => <React.Fragment key={wi}>
      {wi > 0 && ' '}
      <span className="word">{[...word].map((c, ci) => <span key={ci} className="char" style={{ '--d': (delay + n++ * step).toFixed(3) + 's' }}>{c}</span>)}</span>
    </React.Fragment>)}</span>
  </Tag>;
}

/* ---------- The palace doors (replaces the envelope) ---------- */
function Leaf({ side }) {
  return <span className={'leaf ' + side}>
    <span className="leaf-panel arch" />
    <span className="leaf-panel" />
    <span className="leaf-panel" />
    <span className="ring"><i /></span>
  </span>;
}
function Lantern({ side }) {
  return <span className={'lantern ' + side} aria-hidden="true">
    <svg viewBox="0 0 40 110" fill="none">
      <path d="M20 0V26" stroke="#c99a3f" strokeWidth="1.4" />
      <path d="M12 30H28L31 38H9Z" fill="#c99a3f" />
      <path className="lantern-glass" d="M10 38H30L33 70Q20 82 7 70Z" fill="#ffd77a" stroke="#c99a3f" strokeWidth="1.6" />
      <path d="M14 40V72M20 38V78M26 40V72" stroke="#a5752a" strokeWidth=".8" />
      <path d="M13 78H27L20 92Z" fill="#c99a3f" /><circle cx="20" cy="96" r="2.5" fill="#c99a3f" />
    </svg>
  </span>;
}
function Gate({ state, onOpen }) {
  const stars = Array.from({ length: 46 }, (_, i) => ({ left: rnd(i, 1) * 100 + '%', top: rnd(i, 2) * 70 + '%', size: 1 + rnd(i, 3) * 2.2, delay: -rnd(i, 4) * 4 + 's' }));
  const burst = Array.from({ length: 34 }, (_, i) => { const a = (i / 34) * Math.PI * 2 + rnd(i, 5); const r = 40 + rnd(i, 6) * 60; return { x: Math.cos(a) * r + 'vmax', y: Math.sin(a) * r + 'vmax', rot: rnd(i, 7) * 720 + 'deg', delay: 1 + rnd(i, 8) * .5 + 's', hue: i % 3 }; });
  return <div className={'gate ' + state} role="dialog" aria-label="Invitation entrance">
    <div className="gate-sky" aria-hidden="true">{stars.map((s, i) => <i key={i} style={{ left: s.left, top: s.top, width: s.size, height: s.size, animationDelay: s.delay }} />)}</div>
    <div className="gate-moon" aria-hidden="true" />
    <div className="gate-stage">
      <p className="gate-kicker"><Split text="AN INVITATION AWAITS" step={0.05} delay={0.2} /></p>
      <div className="portal-wrap">
        <div className="rays" aria-hidden="true" />
        <Lantern side="left" /><Lantern side="right" />
        <svg className="frame" viewBox="-14 -30 128 196" fill="none" aria-hidden="true">
          <path className="frame-glow" d="M-7 166V50C-7 20 26 8 50 -12C74 8 107 20 107 50V166" />
          <path d="M-7 166V50C-7 20 26 8 50 -12C74 8 107 20 107 50V166" stroke="#e3b958" strokeWidth="2.2" />
          <path d="M-3 166V51C-3 24 28 13 50 -6C72 13 103 24 103 51V166" stroke="#e3b958" strokeWidth=".8" strokeDasharray="1.5 2.5" />
          <path d="M50 -12V-22M46 -20Q50 -30 54 -20Z" stroke="#e3b958" strokeWidth="1.2" fill="#e3b958" />
          <circle cx="50" cy="-26" r="1.6" fill="#ffe7a3" />
          <path d="M-14 160H114V166H-14Z" fill="#c99a3f" />
          <path d="M-10 160V60M110 160V60" stroke="#e3b958" strokeWidth="3" />
          <circle cx="-10" cy="58" r="2.5" fill="#e3b958" /><circle cx="110" cy="58" r="2.5" fill="#e3b958" />
        </svg>
        <div className="portal">
          <div className="portal-light" aria-hidden="true" />
          <button className="doors" onClick={onOpen} disabled={state !== 'closed'} aria-label="Open the palace doors to enter the invitation">
            <Leaf side="left" /><Leaf side="right" />
            <span className="seal" aria-hidden="true"><b>S</b><em>&amp;</em><b>S</b></span>
          </button>
        </div>
      </div>
      <p className="gate-hint"><span className="tap-dot" aria-hidden="true" />TAP THE DOORS TO ENTER</p>
    </div>
    <div className="burst" aria-hidden="true">{burst.map((b, i) => <i key={i} className={'h' + b.hue} style={{ '--x': b.x, '--y': b.y, '--r': b.rot, animationDelay: b.delay }} />)}</div>
    <div className="flash" aria-hidden="true" />
  </div>;
}

/* ---------- Ambient petals over the site ---------- */
function Petals() {
  return <div className="petals" aria-hidden="true">{Array.from({ length: 16 }, (_, i) => <i key={i} className={'p' + (i % 3)} style={{ left: rnd(i, 9) * 100 + '%', animationDuration: 11 + rnd(i, 10) * 10 + 's', animationDelay: -rnd(i, 11) * 20 + 's', '--s': 0.6 + rnd(i, 12) * 0.9, '--sway': (rnd(i, 13) * 120 - 60) + 'px' }} />)}</div>;
}

function Mandala({ className }) {
  return <svg className={'mandala ' + className} viewBox="-100 -100 200 200" fill="none" aria-hidden="true">
    {Array.from({ length: 16 }, (_, i) => <g key={i} transform={`rotate(${i * 22.5})`}>
      <path d="M0 -92Q14 -70 0 -48Q-14 -70 0 -92Z" stroke="currentColor" strokeWidth=".7" />
      <path d="M0 -44Q8 -32 0 -20Q-8 -32 0 -44Z" stroke="currentColor" strokeWidth=".6" />
      <circle cy="-98" r="1.3" fill="currentColor" />
    </g>)}
    <circle r="96" stroke="currentColor" strokeWidth=".4" strokeDasharray="2 3" />
    <circle r="46" stroke="currentColor" strokeWidth=".5" /><circle r="16" stroke="currentColor" strokeWidth=".5" />
  </svg>;
}

/* ---------- Sections ---------- */
function Welcome() {
  return <div className="welcome">
    <Mandala className="spin-slow" />
    <p className="bismillah" lang="ar" dir="rtl" data-r style={{ '--d': '.1s' }}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
    <p className="bismillah-en" data-r style={{ '--d': '.35s' }}>In the name of Allah, the Most Beneficent, the Most Merciful</p>
    <h1 className="mega">
      <Split text="TWO WEDDINGS." delay={0.5} className="line ivory" />
      <Split text="ONE CELEBRATION." delay={0.95} className="line gold" />
    </h1>
    <p className="remembrance" data-r style={{ '--d': '1.7s' }}>
      In loving remembrance of <strong>Mr. Mohd Irfan (Late)</strong>, we joyfully invite you to celebrate the marriages of his beloved sons. Your presence and duas will make our happiness complete.
    </p>
    <span className="scroll-cue" data-r style={{ '--d': '2.1s' }} aria-hidden="true"><i /></span>
  </div>;
}

const COUPLES = [
  { no: '01', groom: 'Mohd Subhan', bride: 'Iqra Kousar', from: 'Moh. Muneer Ganj, Near Besatiyaam Masjid' },
  { no: '02', groom: 'Mohd Sheeraz', bride: 'Afreen', from: 'Kaze Sarah, Nagina' },
];
function Couples() {
  return <div className="couples">
    <h2 className="title"><Split text="TWO HEARTS," /> <Split text="TWICE OVER." className="gold" delay={0.4} /></h2>
    <p className="family-home" data-r style={{ '--d': '.8s' }}>The grooms’ family home · <strong>Moh. Sewaram Kuwa, Najibabad</strong></p>
    <div className="couple-grid">
      {COUPLES.map((c, i) => <article key={c.no} className={'couple-card ' + (i ? 'from-right' : 'from-left')} style={{ '--d': 0.9 + i * 0.25 + 's' }}>
        <span className="couple-no" aria-hidden="true">{c.no}</span>
        <span className="role">THE GROOM</span>
        <h3 className="name">{c.groom}</h3>
        <span className="heart" aria-label="weds">♥</span>
        <span className="role">THE BRIDE</span>
        <h3 className="name bride">{c.bride}</h3>
        <p className="origin">{c.from}</p>
      </article>)}
    </div>
  </div>;
}

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
function TheDate({ active }) {
  const [day, setDay] = useState(1);
  useEffect(() => {
    if (!active) return;
    if (reducedMotion()) { setDay(15); return; }
    let raf; const start = performance.now();
    const tick = t => { const p = Math.min(1, (t - start) / 1400); setDay(Math.max(1, Math.round(15 * (1 - Math.pow(1 - p, 3))))); if (p < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf);
  }, [active]);
  const gcal = 'https://calendar.google.com/calendar/render?' + new URLSearchParams({ action: 'TEMPLATE', text: 'Wedding: Subhan & Iqra and Sheeraz & Afreen', dates: '20261215/20261216', details: 'Join our family to celebrate. Ceremony timings to be confirmed.', location: 'Chand Banquet Hall, Near Double Fatak, Najibabad', ctz: 'Asia/Kolkata' });
  return <div className="the-date">
    <h2 className="sr-only">Tuesday, 15 December 2026</h2>
    <p className="weekday outline" data-r aria-hidden="true">TUESDAY</p>
    <div className="day-wrap" aria-hidden="true">
      <span className="orbit o1" /><span className="orbit o2" /><span className="orbit-dot" />
      <span className="day gold">{String(day).padStart(2, '0')}</span>
    </div>
    <p className="month" aria-hidden="true"><Split text="DECEMBER 2026" delay={0.3} step={0.06} /></p>
    <Countdown />
    <div className="actions" data-r style={{ '--d': '.9s' }}>
      <a className="btn" href={gcal} target="_blank" rel="noreferrer">＋ Google Calendar</a>
      <button className="btn ghost" onClick={downloadIcs}>＋ Apple / Outlook</button>
    </div>
    <p className="fine" data-r style={{ '--d': '1.1s' }}>All-day entry · ceremony timings to be shared by the family</p>
  </div>;
}

function Palace() {
  const lines = ['M10 205H390', 'M40 205V190H360V205', 'M90 190V110H310V190', 'M145 110H255', 'M150 110Q150 62 200 45Q250 62 250 110', 'M200 45V28', 'M178 190V150Q200 122 222 150V190', 'M110 175V140Q122 124 134 140V175', 'M266 175V140Q278 124 290 140V175', 'M95 110Q95 92 112 86Q129 92 129 110', 'M271 110Q271 92 288 86Q305 92 305 110', 'M50 190V72H64V190', 'M336 190V72H350V190', 'M46 72Q57 44 68 72', 'M332 72Q343 44 354 72', 'M57 46V34', 'M343 46V34', 'M46 112H68M46 150H68', 'M332 112H354M332 150H354', 'M150 140H166V170H150ZM234 140H250V170H234Z'];
  return <svg className="palace" viewBox="0 0 400 215" fill="none" role="img" aria-label="Line drawing of a banquet palace">
    <path className="palace-fill" d="M90 190V110H145Q150 62 200 45Q250 62 255 110H310V190Z" />
    <path className="door-glow" d="M178 190V150Q200 122 222 150V190Z" />
    {lines.map((d, i) => <path key={i} className="draw" d={d} pathLength="1" style={{ '--d': (i * 0.07).toFixed(2) + 's' }} />)}
    <circle className="pop" cx="200" cy="24" r="3.5" /><circle className="pop" cx="57" cy="31" r="2.5" /><circle className="pop" cx="343" cy="31" r="2.5" />
    <path className="pop moon" d="M330 18A14 14 0 1 0 344 38A11 11 0 1 1 330 18Z" />
  </svg>;
}
function Venue() {
  return <div className="venue">
    <p className="eyebrow" data-r>THE VENUE</p>
    <Palace />
    <h2 className="venue-name"><Split text="CHAND" className="ivory" delay={1.2} /> <Split text="BANQUET HALL" className="gold" delay={1.4} /></h2>
    <p className="address" data-r style={{ '--d': '1.9s' }}>Near Double Fatak · Najibabad, Uttar Pradesh</p>
    <a className="btn big" data-r style={{ '--d': '2.1s' }} href={DIRECTIONS} target="_blank" rel="noreferrer">Get directions <span className="arrow">→</span></a>
  </div>;
}

function Farewell({ onReplay }) {
  const [copied, setCopied] = useState(false);
  async function share() {
    if (!/^https?:$/.test(location.protocol)) { alert('To share this invitation, open it from a hosted website link.'); return; }
    if (navigator.share) { try { await navigator.share({ title: document.title, url: location.href }); return; } catch (e) { if (e.name === 'AbortError') return; } }
    try { await navigator.clipboard.writeText(location.href); setCopied(true); setTimeout(() => setCopied(false), 2500); }
    catch { prompt('Copy the invitation link', location.href); }
  }
  return <div className="farewell">
    <Mandala className="spin-rev" />
    <p className="eyebrow" data-r>THE BEST PART?</p>
    <h2 className="mega"><Split text="HAVING YOU" className="line ivory" delay={0.2} /><Split text="THERE." className="line gold huge" delay={0.6} step={0.09} /></h2>
    <p className="closing" data-r style={{ '--d': '1.2s' }}>Come with your love and duas — leave with memories to cherish forever.</p>
    <p className="signature" data-r style={{ '--d': '1.45s' }}>With love, our family</p>
    <div className="actions" data-r style={{ '--d': '1.7s' }}>
      <button className="btn" onClick={share}>{copied ? 'Link copied ✓' : 'Share invitation ↗'}</button>
      <button className="btn ghost" onClick={onReplay}>Close the doors ⟲</button>
    </div>
    <span className="sr-only" role="status">{copied ? 'Invitation link copied' : ''}</span>
  </div>;
}

/* ---------- App ---------- */
function App() {
  const [gate, setGate] = useState('closed'); // closed → opening → gone
  const [seen, setSeen] = useState(() => new Set());
  const [active, setActive] = useState('welcome');
  const scroller = useRef(); const root = useRef(); const timer = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);

  function openGate() {
    if (gate !== 'closed') return;
    setGate('opening');
    timer.current = setTimeout(() => { setGate('gone'); scroller.current?.focus({ preventScroll: true }); }, reducedMotion() ? 60 : 3100);
  }
  function replay() {
    clearTimeout(timer.current);
    scroller.current?.scrollTo({ top: 0 });
    setSeen(new Set()); setActive('welcome'); setGate('closed');
  }

  useEffect(() => {
    if (gate !== 'gone') return;
    const el = scroller.current; const sections = [...el.querySelectorAll('section')];
    const reveal = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) setSeen(s => s.has(e.target.id) ? s : new Set(s).add(e.target.id)); }), { root: el, threshold: 0.22 });
    const spy = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }), { root: el, rootMargin: '-48% 0px -48% 0px' });
    sections.forEach(s => { reveal.observe(s); spy.observe(s); });
    const onScroll = () => root.current.style.setProperty('--progress', (el.scrollTop / Math.max(1, el.scrollHeight - el.clientHeight)).toFixed(4));
    el.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    return () => { reveal.disconnect(); spy.disconnect(); el.removeEventListener('scroll', onScroll); };
  }, [gate]);

  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth' });
  const cls = id => 'panel ' + id + (seen.has(id) ? ' is-in' : '');

  return <div ref={root} className={'app gate-' + gate}>
    <div className="bg" aria-hidden="true" />
    {gate !== 'closed' && <Petals />}
    <div className="progress" aria-hidden="true" />
    <nav className="dots" aria-label="Invitation sections" inert={gate !== 'gone'}>
      {SECTIONS.map(s => <button key={s.id} className={active === s.id ? 'on' : ''} onClick={() => go(s.id)} aria-label={s.label} aria-current={active === s.id ? 'true' : undefined}><span>{s.label}</span></button>)}
    </nav>
    <main ref={scroller} className="scroller" tabIndex={-1} inert={gate !== 'gone'}>
      <section id="welcome" className={cls('welcome')}><Welcome /></section>
      <section id="couples" className={cls('couples')}><Couples /></section>
      <section id="date" className={cls('date')}><TheDate active={seen.has('date')} /></section>
      <section id="venue" className={cls('venue')}><Venue /></section>
      <section id="blessing" className={cls('blessing')}><BlessingCarousel active={seen.has('blessing')} /></section>
      <section id="farewell" className={cls('farewell')}><Farewell onReplay={replay} /></section>
    </main>
    {gate !== 'gone' && <Gate state={gate} onOpen={openGate} />}
  </div>;
}

createRoot(document.getElementById('root')).render(<App />);
