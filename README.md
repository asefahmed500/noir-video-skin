# NOIR — Video.js v10 Skin

A cinematic Video.js v10 skin drawn on paper: one signal red marks every action,
marker and wordmark.

NOIR is a complete, production-quality player skin for the official
**Video.js Skins Design Challenge**. It is composed from Video.js v10 UI
components — it is not a fork, a patch, or a re-implementation of the player.

```
╭──────────────────────────────────────────────╮
│  ▪ NOIR / REEL 01 — GOLDEN HOUR              │
│                                              │
│              ▪                              │   ← red square = one signal
│              ▶                              │
│             PLAY                             │
├╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┤   ← dashed = not yet drawn
├──────────────────────────────────────────────┤
│  ▶  0:22 / 0:35              ♪  CC  1×  ⚙  ⛶ │
└──────────────────────────────────────────────┘
```

---

## The idea

A drafting sheet draws a line before it is built. NOIR borrows that grammar:

| State | Treatment |
| --- | --- |
| Not yet played | Dashed hairline — the line is still to be drawn |
| Buffered | Dotted hairline in ash |
| Played | Solid red — the line has been drawn |
| Seek handle | A solid red square, the marker used everywhere else |
| Chapter boundary | A thin tick in the same pen |

Every other mark on the sheet — the wordmark, the primary button, the selected
check, the focus ring — is the same red. Nothing else is allowed to be red.

---

## Stack

| Layer | Choice |
| --- | --- |
| Player | Video.js v10 (`@videojs/react` 10.3.0) |
| UI | React 19 + TypeScript |
| Build | Vite 8 |
| Media | Mux (HLS via hls.js) |
| Type | Saira (display) · Inter (UI) · Geist Mono (technical) |
| Licence | Apache 2.0 |

The skin adds **no runtime dependencies** beyond Video.js itself. Icons are
hand-drawn SVGs on a 24-pixel grid; all styling is plain CSS driven by custom
properties.

---

## Running it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build to dist/
npm run preview    # serve the production build
npm run typecheck  # tsc --noEmit
npm run lint       # oxlint
```

### Point it at your own media

The demo ships with Video.js's public Mux demo asset so the player works out of
the box. To use your own upload:

```bash
# .env.local
VITE_MUX_PLAYBACK_ID=your_playback_id
```

The playback id is read in `src/components/player/media.ts` and used to build
both the HLS manifest and the derived poster and storyboard.

---

## Project layout

```
src/
├── components/
│   ├── layout/          Navbar, Footer
│   ├── player/          The skin itself
│   │   ├── NoirSkin.tsx       Container + composition root
│   │   ├── VideoPlayer.tsx    Video.js preset + Mux media
│   │   ├── PlayerControls.tsx Control bar layout
│   │   ├── Timeline.tsx       Seek line, chapters, hover preview
│   │   ├── PlayButton.tsx     Transport button
│   │   ├── BigPlayButton.tsx  Oversized play / replay mark
│   │   ├── TimeDisplay.tsx    Elapsed / duration, toggling to remaining
│   │   ├── VolumeControl.tsx  Mute + vertical volume popover
│   │   ├── SettingsMenu.tsx   Speed / quality / captions radio groups
│   │   ├── SpeedControl.tsx   Direct playback-rate cycle
│   │   ├── CaptionsControl.tsx
│   │   ├── FullscreenButton.tsx
│   │   ├── SpecLabel.tsx      Sheet header over the frame
│   │   ├── Icons.tsx          Custom 24px icon set
│   │   └── media.ts           Mux + playback configuration
│   └── showcase/        The presentation site
├── hooks/               useReveal (IntersectionObserver)
└── styles/
    ├── globals.css      Tokens, type scale, site shell
    ├── player.css       The frame: poster, scrim, readouts, error
    ├── controls.css     The control sheet: timeline, buttons, menus
    └── animations.css   Motion + reduced-motion
```

---

## The skin's controls

Every control performs its real function. There are no decorative buttons.

| Control | Behaviour |
| --- | --- |
| Play / pause | Starts and stops playback |
| Seek line | Scrubs the media; drag to seek, click to jump |
| Chapters | Five chapter cues divide the line and name themselves on hover |
| Hover preview | Mux storyboard thumbnail, chapter title and time at the pointer |
| Time | Elapsed and total; click the elapsed value to toggle to remaining |
| Volume | Vertical popover slider, opens on hover or focus |
| Mute | Toggles audio; the icon reflects the volume level |
| Captions | Toggles the caption track |
| Speed | Cycles 0.5× / 1× / 1.5× / 2×; the settings menu offers the same list |
| Settings | Speed, quality and captions as radio groups |
| Quality | Reads the real HLS renditions (five in the demo asset) |
| Picture in picture | Shown only where the platform supports it |
| Fullscreen | Enters and exits fullscreen |

### Keyboard

| Key | Action |
| --- | --- |
| `Space` / `K` | Play / pause |
| `←` / `J` | Back 10 seconds |
| `→` / `L` | Forward 10 seconds |
| `↑` / `↓` | Volume up / down |
| `M` | Mute |
| `F` | Fullscreen |
| `C` | Captions |
| `P` | Picture in picture |
| `Tab` | Move through the control bar |
| `Escape` | Close menus and popovers |
| Double tap left / right | Back / forward 10 seconds (touch) |

---

## Documentation

- [`docs/DESIGN.md`](docs/DESIGN.md) — the design system and the decisions behind it
- [`docs/ACCESSIBILITY.md`](docs/ACCESSIBILITY.md) — the accessibility contract and how it is met
- [`docs/TESTING.md`](docs/TESTING.md) — the manual test matrix and what was verified

---

## Licence

Apache License 2.0 — see [`LICENSE`](LICENSE).

Video.js is a trademark of Video.js LLC. NOIR is an independent skin and is
not affiliated with or endorsed by Video.js LLC.
