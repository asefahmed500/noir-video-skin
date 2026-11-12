# NOIR — Testing

What was verified, how, and what remains to check by hand.

---

## 1. Environment

| Item | Value |
| --- | --- |
| Node | 24.18.1 |
| Package manager | npm 11 |
| Video.js | `@videojs/react` 10.3.0 |
| React | 19.3 |
| TypeScript | 7.0 (strict) |
| Vite | 8.3 |
| Browser | Chromium (headless, via `agent-browser` / CDP) |
| Viewports | 1440×900, 1024×900, 390×844, plus in-page widths 720 / 380 / 320 |

---

## 2. Automated checks

```bash
npm run typecheck    # tsc --noEmit, 0 errors
npm run lint         # oxlint, 0 warnings
npm run build        # production build, 0 errors
```

Console was inspected in the browser during every interaction pass: **no errors,
no warnings** from React, Video.js or the application.

---

## 3. Functional matrix

Each row was exercised in a real browser against the live Mux HLS stream.

| # | Control | Expected | Result |
| --- | --- | --- | --- |
| 1 | Play (oversized mark) | Playback starts | ✅ `paused: false`, `currentTime` advancing |
| 2 | Play (control bar) | Toggles playback | ✅ |
| 3 | Pause | Playback stops | ✅ |
| 4 | Seek line click | Jumps to the pointer position | ✅ |
| 5 | Seek line drag | Scrubs, then seeks on release | ✅ `pauseOnDrag` verified |
| 6 | Elapsed / duration | `0:22 / 0:35` | ✅ |
| 7 | Elapsed value click | Toggles to remaining time | ✅ |
| 8 | Volume popover | Opens on hover, vertical slider | ✅ |
| 9 | Mute | Toggles audio | ✅ `muted: true` |
| 10 | Mute icon | Reflects volume level | ✅ three icon states |
| 11 | Captions | Toggles the caption track | ✅ `mode: "showing"` |
| 12 | Speed button | Cycles 0.5× / 1× / 1.5× / 2× | ✅ `playbackRate: 1.5` |
| 13 | Settings → Speed | Radio group selects a rate | ✅ `playbackRate: 1.5` |
| 14 | Settings → Quality | Lists the HLS renditions | ✅ "Auto (720p)" + five options |
| 15 | Settings → Captions | Lists caption tracks | ✅ "Off" + track |
| 16 | Fullscreen | Enters and exits fullscreen | ✅ |
| 17 | Picture in picture | Button present where supported | ✅ |
| 18 | Chapters | Five ranges divide the seek line | ✅ 5 chapter elements, correct geometry |
| 19 | Hover preview | Thumbnail, chapter title and time | ✅ "SIDEWALK" at 0:22 |
| 20 | Storyboard thumbnails | Mux storyboard renders | ✅ sprite tile displayed |
| 21 | End of reel | Replay mark appears | ✅ `data-ended`, replay icon |
| 22 | Replay | Restarts playback | ✅ |

---

## 4. Keyboard matrix

| Key | Expected | Result |
| --- | --- | --- |
| `K` | Play | ✅ `paused: false` |
| `→` | Forward 10 seconds | ✅ 5.00s → 15.00s exactly |
| `←` | Back 10 seconds | ✅ 15.00s → 5.00s exactly |
| `↓` | Volume down | ✅ `1` → `0.95` |
| `M` | Mute | ✅ `muted: true` |
| `Tab` | Moves through the control bar | ✅ focus ring visible on the mute button |
| `Escape` | Closes menus | ✅ |

The seek indicator showed `10s` on an arrow-key seek, confirming the keyboard
feedback path works.

---

## 5. Visual and responsive matrix

| Check | Result |
| --- | --- |
| Desktop 1440px | Full control sheet, 96px play mark ✅ |
| Tablet 720px (in page) | Full control row, 76px play mark ✅ |
| Phone 390px (viewport) | Compact row, speed button hidden, header title dropped ✅ |
| Embedded 320px (in page) | No overflow, all controls reachable ✅ |
| Bright footage (daylight tricycle scene) | Controls sit on opaque paper, fully legible ✅ |
| Dark footage (night fireworks) | Same ✅ |
| Controls idle | Sheet slides down, scrim fades ✅ |
| Menu over bright frame | Paper panel with hairline border ✅ |

---

## 6. Accessibility checks

| Check | Result |
| --- | --- |
| Focus ring visible on every control | ✅ 2px red, inset inside the sheet |
| Controls stay visible while focused | ✅ `:has(:focus-visible)` guard |
| Menu roles | ✅ `menu` / `menuitemradio`, `aria-checked` reflects selection |
| Slider roles | ✅ `role="slider"` with valuemin/max/now/text |
| Status announcer | ✅ present, `role="status"`, visually hidden |
| Caption track announced | ✅ track present with a label |
| Error dialog | ✅ alert dialog with title, description and dismiss |
| Touch targets | ✅ 34–40px in the sheet |

---

## 7. Manual checks still to do

These need a physical device or a human eye and were not fully automatable:

- [ ] Touch the volume popover and drag the vertical slider on a real phone
- [ ] Double-tap seek on a real touch device
- [ ] Native HLS path on Safari (the demo uses hls.js; Safari native HLS is untested)
- [ ] Screen-reader pass with VoiceOver and NVDA
- [ ] `forced-colors` / Windows High Contrast rendering
- [ ] Picture in picture on Safari, which supports it differently from Chromium
- [ ] Audit the rendered page with axe-core or Lighthouse

---

## 8. Known issues

| Issue | Severity | Note |
| --- | --- | --- |
| The bundle is 331 kB gzipped | Low | hls.js is the bulk of it. A progressive MP4 source would be far smaller. The skin itself adds no dependencies. |
| The demo reel's poster is a daylight frame | Cosmetic | Mux derives the poster from the asset. A custom poster can be passed to `VideoPlayer`. |
| The caption track is descriptive, not dialogue | Low | The Video.js demo reel has no dialogue; the track describes what is on screen. A production site should ship its own captions. |
