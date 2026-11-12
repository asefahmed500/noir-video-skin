# NOIR — Design System

A drafting sheet: white paper, hairline rules, one red signal.

---

## 1. The concept

The reference is technical drawing rather than streaming chrome. A drafting
sheet is quiet, gridded and precise; the only loud thing on it is the mark the
drafter made by hand. NOIR applies that literally:

- **The page is paper.** White, never grey.
- **The grid is dashed.** Column rails and section rules are hairlines.
- **One red marks every action.** The wordmark, the primary button, the seek
  handle, the selected check, the focus ring, the corner markers.
- **Type is annotation.** Bracketed mono eyebrows label sections the way a
  drawing is annotated.

The player is the centrepiece, and it carries the same grammar: a solid sheet of
paper laid across the foot of the picture, with red markers where it meets each
edge.

---

## 2. Tokens

All tokens live in `src/styles/globals.css` under `:root`. Nothing in the
project hardcodes a colour or a size.

### Colour

| Token | Value | Role |
| --- | --- | --- |
| `--paper` | `#ffffff` | Page canvas, control sheet, menus |
| `--ink` | `#171717` | Headlines, labels, icons |
| `--red` | `#f53003` | **The signal.** One colour, every action |
| `--red-deep` | `#d62800` | Primary button hover |
| `--rail` | `#e5e5e5` | Dashed rails, section rules, hairlines |
| `--field` | `#d4d4d4` | Undrawn line, input borders |
| `--ash` | `#a1a1a1` | Inactive labels, buffered range |
| `--stone` | `#737373` | Supporting copy, footer links |
| `--graphite` | `#525252` | Feature copy that needs one more step of contrast |
| `--smoke` | `#f5f5f5` | Hover fills, thumbnail backing |
| `--ember` | radial red haze | Atmosphere behind selected sections |

The red is used at three intensities only: solid fill (`--red`), deep fill on
press/hover (`--red-deep`), and the `--ember` haze at 20% opacity. There is no
second accent anywhere in the project.

### Type

| Role | Family | Weight | Size | Tracking |
| --- | --- | --- | --- | --- |
| Display | Saira | 400 | 60 / 72px | `-0.05em` |
| Section heading | Saira | 400 | 36px | `-0.05em` |
| Card title | Saira | 600 | 24px | `-0.025em` |
| Lead | Inter | 400 | 20px | `-0.025em` |
| Body | Inter | 400 | 16px | `0` |
| Navigation | Inter | 500 | 15px | `-0.025em` |
| Button label | Inter | 500 | 14px | `-0.025em` |
| Eyebrow | Geist Mono | 400 | 14px | `0.02em`, uppercase |
| Timestamp | Geist Mono | 400 | 12px | tabular numerals |

Display headlines stay at weight 400 with tight negative tracking so they read
compressed and calm rather than shouted. The mono layer is the engineering
annotation and is never used for running copy.

### Space, radius, elevation

- Base unit **4px**; section gap **80px**; card padding **24px**; element gap **8px**
- Page column **1280px**, gutters **24px**
- Radius: buttons and cards **8px**, inputs **6px**, tags **4px**, images **2px**, pills **9999px**
- Elevation is deliberately shallow — a control hairline lift and a panel lift, nothing heavier

---

## 3. The page

```
┌────────────────────────────────────────────────────┐
│ announcement strip — blush → paper gradient, 44px  │
├────────────────────────────────────────────────────┤
│ navbar — 64px, paper, 1px bottom rule              │
├┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┤  ← dashed rail + red square
│ hero — copy left, mounted player right              │
├────────────────────────────────────────────────────┤
│ trust strip — mono caption cell + five cells        │
├┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┤
│ [ THE PLAYER ] — full-width player + spec tables    │
├────────────────────────────────────────────────────┤
│ [ PHILOSOPHY ] — centred statement with a switch   │
├────────────────────────────────────────────────────┤
│ [ ANATOMY ] — two-column feature splits             │
├────────────────────────────────────────────────────┤
│ [ RESPONSIVE ] — the same skin at three widths      │
├────────────────────────────────────────────────────┤
│ [ CREDITS ] — skin, media, licence                  │
├────────────────────────────────────────────────────┤
│ footer — four link columns                          │
│ ████ giant cropped NOIR wordmark in red ████       │
└────────────────────────────────────────────────────┘
```

Every horizontal rule meets the dashed rails, and a 6px red square marks each
intersection. The squares are the same shape as the seek handle and the brand
mark, so the motif repeats at three scales.

---

## 4. The player

### Anatomy

```
┌─ .noir ────────────────────────────────────────────┐
│ ▪ NOIR / REEL 01 — GOLDEN HOUR        (sheet header)│
│                                                   │
│                  ▪                                │
│                  ▶         (oversized play mark)   │
│                 PLAY                               │
│                                                   │
├╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┤  ← seek line, dashed
│ ▶  0:22 / 0:35            ♪  CC  1×  ⚙  ⛶        │  ← control sheet
└───────────────────────────────────────────────────┘
```

### The seek line

The single most important idea in the skin.

| Element | Treatment |
| --- | --- |
| Unplayed | `repeating-linear-gradient` — a 5px dash, 5px gap, `--field` |
| Buffered | 3px dots in `--ash` at 60% opacity |
| Played | Solid 2–3px `--red` |
| Handle | 12px solid red square, 14px on hover/focus, `translate: -50% -50%` |
| Chapter tick | 2px × 14px `--ash` rule at each chapter boundary |

Each chapter range is clipped to its own bounds, so the dashes and the red fill
run continuously across chapter edges while the geometry stays correct.

### The control sheet

A solid `--paper` strip across the foot of the picture, with a 1px `--rail`
top border and a red square at each end. It slides down out of frame when the
player goes idle and returns on any activity or focus.

The sheet is deliberately **not** a translucent scrim. A translucent bar is the
default in every streaming player; an opaque sheet laid across the picture is
the thing that makes this skin recognisable.

### The oversized play mark

A 76px red square (60px narrow, 96px on large players) with a hairline lift and
a red glow, plus a small paper caption reading `PLAY` or `REPLAY`. It is the
same shape as the brand mark and the chapter markers.

### Menus

The settings menu is a paper panel with a 1px hairline and a shallow lift. Rows
use mono group labels (`PLAYBACK RATE`), a right-aligned mono value, and a red
chevron. Selected options are marked with a red check and red text.

Submenus slide horizontally with a blur, mirroring a sheet being pulled aside.

---

## 5. States

Every state was designed, not inherited:

| State | Treatment |
| --- | --- |
| Loading | Red arc spinner, centre of the picture area |
| Paused | Oversized red play mark |
| Playing | Controls auto-hide after idle |
| Controls visible | Sheet slides up, scrim fades in |
| Controls idle | Sheet slides down, scrim fades out |
| Seeking | Red line follows the pointer, preview appears above the sheet |
| Muted | Speaker icon with a strike |
| Volume | Vertical popover, red fill, square red handle |
| Settings open | Paper panel, red chevrons, red checks |
| Fullscreen | Sheet stays, picture fills the screen |
| Ended | Oversized red replay mark |
| Error | Paper dialog over a blurred backdrop, red mark, dismiss button |

---

## 6. Motion

Motion marks a state change and never decorates.

| Motion | Duration | Easing |
| --- | --- | --- |
| Sheet show / hide | 320ms | `cubic-bezier(.2,.7,.3,1)` |
| Menu open / close | 200ms | `cubic-bezier(.2,.7,.3,1)` |
| Hover and press feedback | 120ms | `cubic-bezier(.2,.7,.3,1)` |
| Spinner | 900ms linear loop | — |
| Section reveal | 320ms, 70ms stagger | `cubic-bezier(.16,1,.3,1)` |

Under `prefers-reduced-motion: reduce` every transition collapses to 0.01ms,
the spinner stops turning, and scroll reveals are disabled.

---

## 7. Responsive

Container queries drive the player, so an embedded player adapts to **its own**
width, not the viewport's.

| Container width | Change |
| --- | --- |
| ≤ 560px | Padding 18 → 12px, sheet 79 → 68px, icons 36 → 32px, play mark 96 → 60px, speed button hidden |
| ≤ 420px | Sheet header keeps the skin name, drops the title |
| ≥ 900px | Play mark grows to 96px |

The page itself uses ordinary media queries at 1080px and 760px.

Nothing ever overflows the frame. The control groups simplify rather than
collide, and the seek line and play button always remain.

---

## 8. Decisions and trade-offs

- **Opaque control sheet over a translucent scrim.** A white sheet is
  unusual and high-contrast over any footage. It also guarantees the controls
  are readable over bright daylight scenes, which a translucent bar is not.
- **The whole sheet slides, not just the controls.** Sliding the sheet out of
  frame reads as a physical strip of paper being lifted, which matches the
  concept better than a fade.
- **Custom icons rather than the packaged set.** The Video.js icon set is
  18px and filled; a thin-line 24px set matches the drafting language. They are
  ~90 lines of SVG and cost nothing at runtime.
- **Chapters and storyboard thumbnails.** Both come from the media, so they
  are real metadata rather than decoration — and they make the seek line
  genuinely useful.
- **Plain CSS, no Tailwind.** The skin needs precise control over a handful of
  bespoke shapes. A token-driven stylesheet is smaller, has no build-time
  dependency, and matches how Video.js ships its own skins.
