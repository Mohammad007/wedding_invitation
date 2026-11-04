import React, { useEffect, useState } from 'react';

// Translations: Dr. Mustafa Khattab, The Clear Quran (quran.com)
export const blessings = [
  { title: 'Love & mercy', surah: 'Ar-Rum', verse: '30:21', excerpt: true, arabic: 'وَجَعَلَ بَيْنَكُمْ مَوَدَّةً وَرَحْمَةً', meaning: 'And He has placed between you compassion and mercy.' },
  { title: 'Joy of our hearts', surah: 'Al-Furqan', verse: '25:74', excerpt: true, arabic: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ', meaning: 'Our Lord! Bless us with ˹pious˺ spouses and offspring who will be the joy of our hearts' },
  { title: 'Created in pairs', surah: 'An-Naba', verse: '78:8', arabic: 'وَخَلَقْنَاكُمْ أَزْوَاجًا', meaning: 'and created you in pairs,' },
  { title: 'A promise of ease', surah: 'Ash-Sharh', verse: '94:5', arabic: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا', meaning: 'So, surely with hardship comes ease.' },
];

export function BlessingCarousel({ active }) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const [manual, setManual] = useState(false);
  const move = (step, byUser = true) => { setDir(step); setIndex(i => (i + step + blessings.length) % blessings.length); if (byUser) setManual(true); };

  useEffect(() => {
    if (!active || paused || manual || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => move(1, false), 7000);
    return () => clearInterval(id);
  }, [active, paused, manual]);

  const b = blessings[index];
  return <div className="blessings" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
    <p className="eyebrow" data-r>A BLESSING FROM THE QURAN</p>
    <div className="ayah-stage" aria-live={manual ? 'polite' : 'off'}>
      <article key={index} className={'ayah ' + (dir > 0 ? 'next' : 'prev')} aria-roledescription="slide" aria-label={`${index + 1} of ${blessings.length}: ${b.title}`}>
        <span className="ayah-count" aria-hidden="true">{String(index + 1).padStart(2, '0')}<small>/{String(blessings.length).padStart(2, '0')}</small></span>
        <h2 className="ayah-title">{b.title}</h2>
        <p className="ayah-arabic" lang="ar" dir="rtl">{b.arabic}</p>
        <p className="ayah-meaning">“{b.meaning}”</p>
        <p className="ayah-ref">Surah {b.surah} · {b.verse}{b.excerpt ? ' · excerpt' : ''} — Dr. Mustafa Khattab, <i>The Clear Quran</i></p>
        <a className="ayah-link" href={'https://quran.com/' + b.verse.replace(':', '/')} target="_blank" rel="noreferrer">Read the complete ayah ↗</a>
      </article>
    </div>
    <div className="ayah-controls" data-r style={{ '--d': '.5s' }}>
      <button className="round" onClick={() => move(-1)} aria-label="Previous blessing">←</button>
      <div className="ayah-dots">{blessings.map((x, i) => <button key={x.verse} className={i === index ? 'on' : ''} aria-label={'Show blessing: ' + x.title} aria-current={i === index ? 'true' : undefined} onClick={() => { if (i !== index) { setDir(i > index ? 1 : -1); setIndex(i); setManual(true); } }} />)}</div>
      <button className="round" onClick={() => move(1)} aria-label="Next blessing">→</button>
    </div>
  </div>;
}
