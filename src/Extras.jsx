import React, { useEffect, useMemo, useRef, useState } from 'react';
import qrcode from 'qrcode-generator';

/* ---------- QR code (rendered as crisp SVG) ---------- */
export function QrCode({ value, label }) {
  const path = useMemo(() => {
    const qr = qrcode(0, 'M'); qr.addData(value); qr.make();
    const n = qr.getModuleCount(); let d = '';
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (qr.isDark(r, c)) d += `M${c} ${r}h1v1h-1z`;
    return { d, n };
  }, [value]);
  return <svg className="qr" viewBox={`-2 -2 ${path.n + 4} ${path.n + 4}`} role="img" aria-label={label} shapeRendering="crispEdges">
    <rect x="-2" y="-2" width={path.n + 4} height={path.n + 4} fill="#fffaf0" />
    <path d={path.d} fill="#14234f" />
  </svg>;
}

/* ---------- Scratch-to-reveal gold foil ---------- */
export function ScratchCard({ children, onReveal }) {
  const wrap = useRef(); const canvas = useRef();
  const [revealed, setRevealed] = useState(false);
  const [started, setStarted] = useState(false);
  const state = useRef({ drawing: false, last: null, moves: 0 });

  function paint() {
    const cv = canvas.current, box = wrap.current; if (!cv || !box) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const w = box.clientWidth, h = box.clientHeight;
    cv.width = w * dpr; cv.height = h * dpr;
    const ctx = cv.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = 'source-over';
    const g = ctx.createLinearGradient(0, 0, w, h);
    [['#9a6f1f', 0], ['#e9c66a', .22], ['#c4952f', .42], ['#fff0bf', .55], ['#b9892c', .75], ['#f3d27d', 1]].forEach(([c, o]) => g.addColorStop(o, c));
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(255, 246, 214, .28)'; ctx.lineWidth = 1.2;
    for (let x = -h; x < w; x += 11) { ctx.beginPath(); ctx.moveTo(x, h); ctx.lineTo(x + h, 0); ctx.stroke(); }
    for (let i = 0; i < 40; i++) { ctx.fillStyle = `rgba(255,255,255,${.25 + Math.random() * .4})`; ctx.beginPath(); ctx.arc(Math.random() * w, Math.random() * h, Math.random() * 1.6, 0, 7); ctx.fill(); }
    ctx.fillStyle = '#14234f'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.font = `700 ${Math.max(13, w * .045)}px Cinzel, Georgia, serif`;
    ctx.fillText('S C R A T C H   H E R E', w / 2, h / 2 - 12);
    ctx.strokeStyle = '#14234f'; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(w / 2 - 70, h / 2 + 10); ctx.lineTo(w / 2 - 10, h / 2 + 10); ctx.moveTo(w / 2 + 10, h / 2 + 10); ctx.lineTo(w / 2 + 70, h / 2 + 10); ctx.stroke();
    ctx.save(); ctx.translate(w / 2, h / 2 + 10); ctx.rotate(Math.PI / 4); ctx.fillStyle = '#14234f'; ctx.fillRect(-4, -4, 8, 8); ctx.restore();
    ctx.font = `italic 600 ${Math.max(12, w * .036)}px "Cormorant Garamond", Georgia, serif`;
    ctx.fillText('to reveal the date', w / 2, h / 2 + 34);
  }

  useEffect(() => {
    if (revealed) return;
    paint();
    document.fonts?.ready.then(() => { if (!state.current.moves) paint(); });
    const ro = new ResizeObserver(() => { if (!state.current.moves) paint(); });
    ro.observe(wrap.current);
    return () => ro.disconnect();
  }, [revealed]);

  function point(e) { const r = canvas.current.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; }
  function scratch(from, to) {
    const ctx = canvas.current.getContext('2d');
    const size = Math.max(26, wrap.current.clientWidth * .09);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = size;
    ctx.beginPath(); ctx.moveTo(from.x, from.y); ctx.lineTo(to.x + .01, to.y); ctx.stroke();
  }
  function cleared() {
    const cv = canvas.current; const ctx = cv.getContext('2d');
    const { data } = ctx.getImageData(0, 0, cv.width, cv.height);
    let clear = 0, total = 0;
    for (let i = 3; i < data.length; i += 4 * 24) { total++; if (data[i] < 40) clear++; }
    return clear / total;
  }
  function reveal() { setRevealed(true); onReveal?.(); }
  function down(e) { if (revealed) return; e.preventDefault(); canvas.current.setPointerCapture?.(e.pointerId); const p = point(e); state.current.drawing = true; state.current.last = p; setStarted(true); scratch(p, p); }
  function move(e) {
    const s = state.current; if (!s.drawing) return;
    const p = point(e); scratch(s.last, p); s.last = p;
    if (++s.moves % 12 === 0 && cleared() > .5) reveal();
  }
  function up() { const s = state.current; s.drawing = false; if (s.moves > 4 && cleared() > .5) reveal(); }

  return <div className="scratch-block">
    <div ref={wrap} className={'scratch' + (revealed ? ' revealed' : '')}>
      <div className="scratch-content">{children}</div>
      {<canvas ref={canvas} className={'foil' + (revealed ? ' gone' : '')} aria-hidden="true" onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} onPointerLeave={up} />}
      {revealed && <span className="confetti" aria-hidden="true">{Array.from({ length: 18 }, (_, i) => <i key={i} style={{ '--a': i * 20 + 'deg', '--r': 60 + (i % 4) * 22 + 'px', animationDelay: (i % 3) * .05 + 's' }} />)}</span>}
    </div>
    <p className="scratch-hint" role="status">{revealed ? '✦ Save the date ✦' : started ? 'Keep rubbing…' : 'Rub the gold foil with your finger or cursor'}
      {!revealed && <button className="scratch-skip" onClick={reveal}>Reveal</button>}</p>
  </div>;
}
