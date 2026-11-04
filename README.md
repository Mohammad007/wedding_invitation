# Two Weddings · One Celebration

A React wedding invitation with a royal emerald and gold theme.

## How it works

- **Palace doors intro** (this replaces the envelope). Two carved doors sit under a Mughal arch, with swinging lanterns, twinkling stars and a wax seal. When a guest taps the doors, the seal bursts, both doors swing inward, light rays pour out, petals explode outward, and the view zooms through the doorway into the invitation.
- **Six sections, scrolled normally.** Each section shows different information, so nothing is repeated:
  1. **Welcome:** Bismillah, the headline "Two weddings. One celebration.", and the remembrance of Mr. Mohd Irfan (Late).
  2. **Couples:** two cards with animated gold borders. Each shows the groom, the bride and the bride's address. The grooms' family home appears once, above the cards.
  3. **Date:** "Tuesday" in outline letters, a large "15" that counts up from 01 inside orbiting rings, "December 2026", a live countdown, and Google or Apple/Outlook calendar buttons.
  4. **Venue:** a palace line drawing that draws itself, Chand Banquet Hall, the address, and a directions button.
  5. **Blessing:** a carousel of four Quran ayahs that flips between them. It advances on its own and pauses on hover or focus.
  6. **Farewell:** "Having you there.", the share button, and a button that closes the doors again.
- Large bold type (Cinzel 900, Playfair Display 900, Manrope 800) where letters animate in one by one, with gold shimmer, falling petals, a progress bar at the top, and section dots on desktop.
- Animations turn off when the visitor's device asks for reduced motion.

## Run

```sh
npm install
npm run dev      # http://127.0.0.1:5173
npm run build    # dist/ and the standalone dist/invitation.html
```

## Content

Names, addresses, date and directions are in `src/main.jsx`. The Quran blessings are in `src/Blessings.jsx`. Translations are by Dr. Mustafa Khattab (*The Clear Quran*), with links to quran.com. Ceremony timings have not been supplied yet, so the calendar entry is all day.
