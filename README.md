# A Celebration of Love

Envelope-first React wedding invitation. Only one invitation card is rendered at a time. The opening screen is a full-viewport envelope with no visible text. Tap the seal (or scroll down) to open it over 2.4 seconds. It stays open until a fresh downward scroll/upward swipe; then a 1.2-second transition reveals the white invitation card. scroll down/up or swipe up/down to move between sections. Up/Down and PageUp/PageDown keys also work when a link or button is not focused. Progress indicators are informational. A gesture lock prevents accidental section skipping; overflowing cards scroll internally before changing section. Close returns to the envelope. Includes generated floral artwork, animated flap and wax seal, floating particles, vertical card transitions, animated couple illustrations and a line-drawn banquet palace, reduced-motion support, countdown, calendar download, directions and link copying.

## Run

```sh
npm install
npm run dev
```

Open http://127.0.0.1:5173. Source edits rebuild; refresh the browser.

```sh
npm run build
npm run preview
```

Deploy dist to a static host. dist/invitation.html is a standalone version with embedded artwork, JS and CSS. Sharing requires a hosted URL. Fonts use Google Fonts with local fallbacks.

## Content

Edit names, date, addresses and directions in src/main.jsx. Generated artwork is src/assets/wedding-botanical.png. Wedding date is 15 December 2026 in India time. Ceremony timings have not been supplied, so the calendar entry is all-day. Directions open a venue search. On unusually short screens, the current card can scroll internally to keep all details accessible.

## Blessings

The date section contains four selectable Quran blessing cards and a shuffle control. Each opens a native modal with Arabic, translation attribution, verse reference, and source link. Ar-Rum 30:21 and Al-Furqan 25:74 are clearly marked excerpts; An-Naba 78:8 and Ash-Sharh 94:5 are complete short verses. Sources: https://quran.com/30/21, https://quran.com/25/74, https://quran.com/78/8, https://quran.com/94/5.

Google Calendar opens an all-day event draft; Apple/Outlook downloads an ICS file. Both use the existing 15 December 2026 date and Chand Banquet Hall venue.

The original sage-green full-screen envelope, gold botanical wax seal and ivory/sage theme are restored. The envelope opens slowly and waits for a fresh scroll before revealing the invitation. Sound and all audio controls have been removed. Blessing cards, Quran modals and calendar options remain available in the original palette.

## Compact envelope

The envelope is centered at approximately 50% viewport width on desktop, with generous surrounding space. Mobile uses 82% width for legibility. Opening reveals the invitation text, both couples, date and venue on the white letter; the letter stays visible until the user scrolls.
