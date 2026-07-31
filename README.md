# Handoff: Praying You Into Forty

A twenty-eight morning prayer app, written by Wangui for Macharia's fortieth birthday.
One prayer unlocks each morning from **1 August 2026** to **28 August 2026**.

---

## About the design files

The files in this bundle are **design references built in HTML**. They are a prototype of the
intended look and behaviour — not production code to lift. The job is to **recreate these screens
in a real app**, using the target environment's own patterns.

There is no existing codebase, so pick the stack. Recommendation, in order:

1. **Expo (React Native)** — it is an iPhone app, it was designed as one, and Expo gets it onto his
   phone without an App Store review (TestFlight or a dev build). Fonts, local storage
   (`expo-font`, `AsyncStorage`) and local notifications are all one dependency each.
2. **A PWA** (plain React/Vite + `manifest.json`) — "Add to Home Screen" gives a full-screen,
   offline, icon-on-the-springboard app with no build tooling and no Apple account. Cheapest path
   to something real in his hand. Loses local notifications on iOS.
3. **SwiftUI** — best long-term feel, most work.

Nothing here needs a server, an account, or a network call. All 28 prayers ship inside the bundle;
his reflections stay on the device.

## Fidelity

**High fidelity.** Colours, type, spacing and motion in the prototype are final and are specified
exactly below. Recreate faithfully.

---

## Content

**`prayers.json`** in this folder is the whole book: 28 entries, each with

| key | meaning |
|---|---|
| `day` | 1–28 |
| `date` | ISO date it unlocks (`2026-08-01` … `2026-08-28`) |
| `topic` | display title, e.g. `Rest & Peace`, `His Calling` |
| `prayer` | array of paragraphs (day 1 and day 28 have two; the rest have one) |
| `thought` | the "A Thought to Carry" line |
| `thoughtSource` | e.g. `Tao Te Ching, 16` |
| `reflectionPrompt` | the question shown on the Reflections page |
| `closingBenediction` | day 28 only — the final blessing, shown on a plum panel |

The prayers are the author's own words. **Do not reword, re-punctuate or "tidy" them.**
The Taoist lines are plain-English renderings of Tao Te Ching / Zhuangzi passages, listed in
`Thoughts to Carry.md`; the chapter numbers are the source passages.

---

## Design tokens

### Colour
| token | hex | used for |
|---|---|---|
| paper | `#F4EEE1` | page background |
| paper raised | `#FBF7EE` | cards, unlocked calendar cells |
| paper nav | `#EFE7D6` | tab bar |
| cover | `#EDE3CF` | the cover (book board) |
| ink | `#2B2724` | headings, prayer titles |
| ink body | `#403A32` | prayer body text |
| ink soft | `#5E5749` | secondary italic serif |
| ochre | `#A9622C` | accent: day labels, rules, today, record label |
| olive | `#6B7250` | "A Thought to Carry" mark + label, ruled writing lines |
| plum | `#4E2B3B` | signature, day-28 benediction panel |
| muted 1 | `#8A8172` | captions |
| muted 2 | `#9C9385` | dates, small labels |
| muted 3 | `#A79E8E` | source lines |
| muted 4 | `#B3A995` | hints |
| locked 1 | `#C4BAA8` | locked numerals |
| locked 2 | `#CFC5B2` | padlock glyph |
| locked 3 | `#AEA492` | locked topic text |
| hairline | `rgba(150,132,100,.34)` | 1px rules and cell borders |
| scrim | `rgba(43,39,36,.30)` | behind modals |

Paper warmth has two alternates (a tweak in the prototype; ship the middle one unless asked):
bleached linen `#FBF8F1`, **cream stock `#F4EEE1` (default)**, aged foolscap `#EBE0C9`.

### Paper grain
Every paper surface carries a fractal-noise texture. In the prototype it is an inline SVG
`feTurbulence` (`baseFrequency 0.9`, `numOctaves 4`, desaturated, `opacity .062`, tiled 150×150).
In a native app, export that as a 150×150 PNG and tile it, or use a single 750×1624 grain overlay
at 6% opacity. Cover/foolscap use a heavier version (`baseFrequency .68`, `opacity .135`); cards use
a lighter one (`baseFrequency 1.1`, `opacity .028`).

### Type
- **Display / serif:** Newsreader (Google Fonts), weight 300. Headings, topics, all italic voice.
- **Body / sans:** Libre Franklin (Google Fonts), weights 300/400/500.
- Alternates explored and rejected: Cormorant Garamond + Karla; Spectral throughout.

| role | spec |
|---|---|
| prayer topic (h1) | Newsreader 300, 56px, line-height .98, letter-spacing −.018em, `#2B2724` |
| page title (h2) | Newsreader 300, 32px/1, letter-spacing −.01em |
| prayer body | Libre Franklin 300, 16.5px, line-height 1.86, `#403A32`, `text-wrap: pretty` |
| "A Thought to Carry" line | Newsreader italic 300, 19.5px/1.62, centred |
| its label | Libre Franklin 500, 9px, letter-spacing .28em, uppercase, `#6B7250` |
| its source | Libre Franklin 400, 9px, letter-spacing .18em, uppercase, `#A79E8E` |
| day label / dates | Libre Franklin 500 / 400, 9.5px, letter-spacing .24em, uppercase |
| calendar cell numeral | Libre Franklin 500, 8px, letter-spacing .1em |
| calendar cell topic | Newsreader 400, 10.5px, line-height 1.1 |
| tab label | Newsreader 400, 13px |
| signature | Newsreader italic 300, 22px, `#4E2B3B` |

Minimum tap target 44×44pt. Calendar cells are ~68×68 at iPhone width, so they clear it.

### Spacing & shape
- Page padding: 32px horizontal for the prayer and Old Love, 30px Reflections, 16px the calendar.
- Content starts 66–70px from the top (below the status bar).
- Tab bar: 15px top padding, 36px bottom (home-indicator inset).
- **No rounded corners anywhere.** Cards, cells and panels are square-cornered — it is paper, not glass.
- Rules are 1px `rgba(150,132,100,.34)`; the ochre accent rule is 36×1px.
- Card shadow: `0 26px 64px rgba(43,39,36,.26)` (modals), `0 10px 26px rgba(43,39,36,.07)` (resting).
- The recurring divider mark is a 5×5px olive square rotated 45°, centred between two hairlines.

---

## Screens

### 1. Cover (first launch, and on demand)
**Purpose:** the ritual. This is the "putting a record on" moment.

Full-screen cover board (`#EDE3CF` + heavy grain), a soft inner shadow down the left edge (26px,
`rgba(43,39,36,.14)` → transparent) so it reads as a bound board. Centred column:

1. `TWENTY-EIGHT MORNINGS` — Libre Franklin 400, 9px, letter-spacing .34em, uppercase, `#8E8471`
2. `Praying You / Into Forty` — Newsreader 300, 40px/1.06, two lines, centred
3. **the record** — a 216px disc, 42px above/38px below
4. `for Macharia` — Newsreader italic 300, 18px, `#5E5749`

Pinned 54px from the bottom: `~ Wangui waku, always.` (Newsreader italic 20px, plum) and
`LIFT THE NEEDLE` (9px, letter-spacing .3em, uppercase, `#9C9385`) breathing between 32% and 75%
opacity on a 3.4s ease-in-out loop.

**The record:** concentric black grooves — repeating radial gradient, `#2B2724` 0→1.6px,
`#332E29` 1.6→3.2px — rotating a full turn every **9 seconds**, forever. Shadow
`0 18px 44px rgba(43,39,36,.34)`. Inset 56px is the ochre label (`#A9622C`) carrying, centred and
rotating with the disc: `DAY 1` (7.5px, .26em, uppercase, 72% white), the topic (Newsreader 300,
26px, `#FBF7EE`), the date (7px, .2em, uppercase, 60% white). A 9px spindle hole in the middle,
paper-coloured.

**Tap anywhere:**
1. `0ms` — disc fades to 0 and scales to .74 over 900ms/1000ms; the footer fades over 700ms
2. `950ms` — the whole cover turns on its **left** edge: `rotateY(0 → −174°)`, 1150ms,
   `cubic-bezier(.5,.03,.28,1)`, with `0 0 60px rgba(43,39,36,.25)` under it and
   `backface-visibility: hidden`; perspective 1500px on the parent
3. `2070ms` — cover removed; today's prayer is underneath

Show the cover on first launch of the day (or every launch — it is the nicest part). It is also
reachable any time from the Calendar.

### 2. Prayer — the main screen
Scrolling page on paper. Top to bottom:

- Row: `DAY 1` (ochre) left / `SAT 1 AUGUST` (`#9C9385`) right — both 9.5px, .24em, uppercase
- Topic — Newsreader 300, 56px, 22px below the row
- 36×1px ochre rule, 24px below
- Prayer paragraphs — 22px apart
- Day 28 only: the benediction on a plum `#4E2B3B` panel, 30px/26px padding, text in
  Newsreader italic 300 20px/1.62 `#F5EFE2`, signed `~ Wangui waku, always.` at 72% opacity
- 46px gap, then the **Thought to Carry** block: hairline · olive diamond · hairline, the label,
  the italic serif line (centred), the source
- Nothing below it. He knows where Reflections is.

### 3. The Journey (calendar)
- `The Journey` (h2) · `1 — 28 AUGUST · 28 MORNINGS` · hairline
- **5 cells per row**, 4px gaps, 16px page padding → cells ≈68px square, `aspect-ratio: 1`
- Each cell: day numeral top-left (`01`…), topic bottom-left (Newsreader 10.5px, 2 lines allowed).
  Long words break on **soft hyphens** (`Relation\u00ADships`, `Thanks\u00ADgiving`, etc.) — never
  mid-word without a hyphen, and never truncate the author's topic names.
- **Unlocked past day:** `#FBF7EE` fill, hairline border, ochre numeral, ink topic
- **Today:** same, but a 1px ochre border and a 4px ochre diamond top-right
- **Locked:** transparent, `rgba(150,132,100,.2)` border, `#C4BAA8` numeral, `#AEA492` topic, and a
  7×8px padlock glyph top-right (a `#CFC5B2` body with a 1.2px shackle arc)
- **Day 28** spans the last three columns of the final row as a band: numeral + padlock on the top
  line, `Blessing` (Newsreader 17px) and `FORTY` (8px, .24em, uppercase) on the bottom. It must
  match the square rows' height — do not let its content force it taller.
- Tapping an unlocked day opens that prayer. Tapping a locked day raises the **locked sheet** (below).
- Below the grid, above the tab bar: a hairline, then a **34px spinning record** (same groove
  gradient, 11px ochre label, 4px paper spindle, 9s rotation), the line
  *"Put today's record back on"* (Newsreader italic 16px, `#5E5749`) and `PLAY` in ochre.
  Tapping it returns to the Cover and replays the whole opening.

### 4. Reflections
- `Reflections` (h2) · *"Yours alone. Nothing here leaves this phone."* (Libre Franklin 300, 13px)
- hairline
- `TODAY` (ochre) · `WED 12 AUGUST · RELATIONSHIPS` (`#9C9385`)
- Today's prompt — Newsreader italic 300, 21px/1.45
- **The writing area:** a borderless multiline field on ruled paper — a repeating linear gradient,
  transparent 0→27px then `rgba(107,114,80,.2)` 27→28px, with 28px line-height so the text sits on
  the rules. 200px minimum, grows. Saves as he types (debounce ~400ms).
- **`EARLIER · 5`** — a collapsed row between two hairlines with a 7px ochre chevron
  (rotates 45° → −135° over 260ms). The count is the number of days he has actually written on.
- Expanded (fade+rise, `inkUp` 320ms): a **7-column August month grid**, `M T W T F S S` headers
  (8px, .1em, uppercase, `#B3A995`), leading blanks so 1 August lands on Saturday. Cells:
  - written: ink numeral, `rgba(169,98,44,.42)` border, 3px ochre dot at the bottom
  - blank but past: `#A79E8E` numeral, faint border
  - selected: solid ochre fill, `#FBF7EE` numeral
  - today and later: `#D4CBBA`, not tappable
- Tapping a day opens the **entry card over the calendar** (see modals). Below the grid when
  nothing is selected: *"Tap a day to read what you wrote."*
- Before there is any history: *"This is the first page. Whatever you write will still be here on
  the last one."*

### 5. Old Love
The letter. Centred display lines at the top (`Truly. Madly. Deeply.` at 28px italic serif, and the
small-caps legend line beneath it), then the letter body left-aligned in Libre Franklin 300
15.5px/1.85, opening on *"This isn't a countdown. It's a pause."* in italic serif 20px and lifting
again for *"Happy almost fortieth, my love."* in italic serif 23px plum.
Closes with the diamond divider, `~ Wangui waku, always.` (plum italic serif, centred) and
`MADE FOR MACHARIA · 2026`.

Exact copy is in `old-love.md`.

### 6. Tab bar
Four tabs, equal columns, hairline on top, `#EFE7D6`: **Calendar · Prayer · Reflections · Old Love**.
Newsreader 13px; active is `#2B2724` with a 4px ochre diamond 7px beneath, inactive `#A29887`.
Prayer is the default tab and always opens **today**.

### 7. Modals
Both are a full-bleed scrim (`rgba(43,39,36,.3)`, fade in 220–260ms) with a square-cornered
`#FBF7EE` card rising into place (`inkUp`: 9px up + fade, 320–380ms, `cubic-bezier(.2,.7,.3,1)`).
Tapping the scrim or `CLOSE` dismisses.

- **Locked day** — bottom-anchored, 104px above the bottom. Padlock glyph + `DAY 21 · CREATIVITY`,
  then *"This prayer will be waiting for you on 21 August."* in Newsreader italic 21px.
- **Reflection entry** — centred, max 74% height, scrolls if long. `FRI 7 AUGUST` (ochre) and
  `DAY 7` on one row, topic at Newsreader 34px, 30px ochre rule, the prompt in italic serif
  `#8A8172`, then the entry in Libre Franklin 15px/1.85. If that day was left blank:
  *"Left blank that day."* in `#B3A995`.

---

## Behaviour

### Unlocking
```
unlocked(day) = startOfToday >= startOfDay(day.date)   // device local time
```
Day 1 unlocks on 1 August 2026, day 28 on the 28th. Nothing ever re-locks, nothing expires, no
streaks, no "you missed a day". Before 1 August, show day 1 as the coming day. After the 28th,
everything stays open forever — this is meant to be re-read for years.

For his sake, guard against the phone's clock being wrong in the other direction: never unlock more
than the calendar date allows, but if he opens it on 3 August having missed two mornings, days 1–3
are all simply there.

### Page turn
Moving between prayers turns a leaf: a copy of the outgoing page pinned over the incoming one,
`rotateY` to ∓176° over **880ms** `cubic-bezier(.5,.03,.28,1)`, transform origin on the left going
forward / right going back, `backface-visibility: hidden`, a `0 0 50px rgba(43,39,36,.22)` edge
shadow, and a `rgba(43,39,36,.16) → transparent` gradient across the leading 42% so the paper looks
lifted. Parent needs `perspective: 1600px`. In React Native this is an `Animated` rotateY on an
absolutely-positioned snapshot view.

### Storage
- `reflections` — `{ [day: number]: string }`, written on every keystroke (debounced), read on
  launch. `AsyncStorage` / `localStorage`. **Never clear it.**
- Nothing else needs persisting. Current day is derived from the date, not stored.
- Worth adding for a real build: an export/share of all his entries as text, so twenty years of
  notebook isn't trapped in one app. Ask him first.

### Optional
A single local notification at ~6:30am each morning: *"Day 12 · Relationships"* — no badge, no
nudging, no second reminder. Ask before shipping it.

---

## State

| state | type | notes |
|---|---|---|
| `today` | 1–28 (derived) | from the device date; clamp to the range |
| `day` | 1–28 | which prayer is showing; resets to `today` when the Prayer tab is tapped |
| `tab` | `calendar` \| `prayer` \| `reflections` \| `oldLove` | default `prayer` |
| `coverUp` | bool | plus `lifting` / `turning` sub-states for the two-part animation |
| `turning`, `dir`, `fromDay` | | drives the page-turn leaf |
| `lockedDay` | 1–28 \| null | the locked sheet |
| `archiveOpen` | bool | the Earlier dropdown |
| `selectedEntry` | 1–28 \| null | the entry card |
| `entries` | `{[day]: string}` | persisted |

The prototype also has a **review slider** under the phone that moves "today" around so the locked
and unlocked states can be seen side by side. **That is a review tool — it is not part of the app.**
The real app must take the date from the device.

---

## Not built, and worth a decision

- **Old Love** is one long scroll. Fine at this length; if it grows, break it into pages.
- No settings, no font-size control. iOS Dynamic Type is the honest fix — the type scale above is
  the 100% baseline; let it scale and the layout will hold if nothing is height-fixed.
- No dark mode. It is a morning app on cream paper. If he reads at night, dim the paper rather than
  inverting to black — inverted, the grain and the ochre both die.
- Accessibility: check the muted greys against paper (`#B3A995` on `#F4EEE1` is ~2.2:1 — decorative
  labels only, never information). `#403A32` on `#F4EEE1` is ~9:1 and is where all the reading happens.

---

## Files in this bundle

| file | what it is |
|---|---|
| `prayers.json` | all 28 days — the actual content, ready to import |
| `Thoughts to Carry.md` | the 28 Taoist lines with their chapter references |
| `old-love.md` | the Old Love letter, verbatim |
| `Praying You Into Forty.dc.html` | the working prototype — open it in a browser to see every screen and animation |
| `ios-frame.jsx`, `support.js` | support files the prototype needs to run; **not** part of the app |
