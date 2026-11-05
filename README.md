# Wedding Invitation · 15 December 2026

A React wedding invitation in ivory, navy and gold, opening from a sage-green jali pocket.

## How it works

- **Opening:** a sage-green laser-cut jali pocket with magnolia flowers and a gold S&S monogram. An ivory insert card is tied in with a yellow satin ribbon. When a guest taps it, the bow unties, the ribbon slides away, and the card pulls out of the pocket and fades into the invitation.
- **Invitation card:** an ivory sheet with an arched top inside a navy and gold frame, with lily corners and swinging lanterns. It shows the Bismillah, Mr. Mohd Irfan (Late), and the two couples in arched frames with their names and addresses. Below them are the Programme banner, the date (Tuesday, 15th December 2026), and a Chand Banquet Hall plaque that opens directions.
- **Animations:** names appear as if being handwritten, gold flourishes draw themselves, the WEDS tags pop in, a gold foil shine passes across the card, and petals and sparkles fall in the background.
- **Scratch to reveal the date:** under the Programme banner, the date sits behind gold foil. Guests rub it with a finger or the cursor; once about half is cleared, the foil fades away and confetti bursts out. A "Reveal" link does the same for keyboard users. The code is in `src/Extras.jsx`.
- **Directions QR code:** the venue plaque has a QR code that opens Google Maps (made with `qrcode-generator`), plus an "Open in Maps" button.
- **Mobile:** each part is its own full-screen page (intro, couples, date & venue, countdown, blessing, closing). One swipe moves exactly one page, and small dots on the right show the current page.
- **Music:** starts when the ribbon is tapped and loops. A round button at the bottom right mutes or unmutes it. The track is set by `MUSIC_SRC` in `src/main.jsx`, and a file placed at `public/music.mp3` is copied into `dist/` on build. The button appears only after the track loads.
- **Below the card:** a countdown, calendar buttons, directions, the Quran blessing carousel, a share button, and "Tie the ribbon again".

## Run

```sh
npm install
npm run dev      # http://127.0.0.1:5173
npm run build    # dist/ and the standalone dist/invitation.html
```

## Content

Names, addresses, date and directions are in `src/main.jsx`. The Quran blessings are in `src/Blessings.jsx`. Translations are by Dr. Mustafa Khattab (*The Clear Quran*), with links to quran.com. Ceremony timings have not been supplied yet, so the calendar entry is all day.
