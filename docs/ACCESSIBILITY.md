# NOIR — Accessibility

Accessibility is part of the skin, not a pass applied afterwards. Video.js v10
already owns playback state, keyboard handling, ARIA and announcements; the
skin keeps all of it and adds its own visual layer on top.

---

## 1. What Video.js provides (and is preserved)

The skin uses the official UI components, so the following behaviour is
inherited rather than reimplemented:

- `Container` renders a focusable, labelled region that owns focus, fullscreen,
  gestures and user activity.
- `PlayButton`, `MuteButton`, `FullscreenButton`, `PiPButton`,
  `CaptionsButton` and `PlaybackRateButton` are real buttons with accessible
  names and correct `aria-*` state.
- `TimeSlider` and `VolumeSlider` render `role="slider"` with
  `aria-valuemin`, `aria-valuemax`, `aria-valuenow` and `aria-valuetext`, and
  handle arrows, Page Up/Down, Home and End.
- `Menu` renders `role="menu"` with `menuitem`, `menuitemradio` and
  `menuitemcheckbox` items, roving focus, type-ahead and Escape handling.
- `Time` renders a native `<time datetime>` element with a spoken label and no
  live region (time updates would overwhelm a screen reader).
- `StatusAnnouncer` provides a persistent `role="status"` live region that
  announces play/pause, caption, fullscreen, picture-in-picture, playback-rate,
  volume and seek changes.
- `ErrorDialog` is an alert dialog confined to the player, with a labelled
  title and description.

**No Video.js behaviour was removed, reimplemented or shadowed.**

---

## 2. Keyboard

### Tab order

Source order matches visual order, so focus follows the layout:

1. Player container
2. Seek line (slider)
3. Play / pause
4. Elapsed time (toggle to remaining)
5. Mute
6. Captions
7. Speed
8. Settings
9. Fullscreen

Arrow-key seeking and volume are bound at the container. When a slider itself
has focus, the slider consumes the arrow key and the container hotkey stands
down, so one key press never causes two actions.

### Shortcuts

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
| `Escape` | Close menus and popovers |

Shortcuts do not fire while the user is typing in a form field, and they do not
fire when the key press is already handled by an interactive element.

### Focus visibility

Every control has a 2px `--red` focus ring. Inside the control sheet the ring is
inset (`outline-offset: -2px`) so it never escapes the paper. The seek line
shows its ring around the track rather than around the whole strip.

The controls stay visible whenever something inside them holds focus, so a
keyboard user never loses the control they are operating.

---

## 3. Screen readers

- The player is a labelled region; each instance announces as "Video player".
- The sheet header over the picture is `aria-hidden` — it is decorative
  branding and repeats information available elsewhere.
- The oversized play mark carries the real accessible name from
  `PlayButton` ("Play" / "Replay"), and the visible caption repeats the same
  word so the accessible name contains the visible label (WCAG 2.5.3).
- The elapsed time is a real toggle: it announces its action and its value,
  and explains which values it toggles between.
- The status announcer reports state changes in the active locale.
- The error dialog is an alert dialog with a title, a description and a
  dismiss button.

---

## 4. Contrast

| Element | Foreground | Background | Ratio |
| --- | --- | --- | --- |
| Body copy | `#525252` | `#ffffff` | 7.5:1 |
| Supporting copy | `#737373` | `#ffffff` | 4.8:1 |
| Control labels | `#171717` | `#ffffff` | 17:1 |
| Eyebrow | `#f53003` | `#ffffff` | 3.6:1 *(large text only)* |
| Red primary button | `#ffffff` | `#f53003` | 3.9:1 *(large text only)* |
| Focus ring | `#f53003` | `#ffffff` / footage | 3.6:1+ |

The red is reserved for large text, marks and controls. Body copy never uses
it. Every text element inside the player sits on the opaque paper sheet, so
contrast does not depend on the footage — a problem a translucent control bar
cannot avoid.

Timestamps use tabular numerals so they do not jitter while playing.

---

## 5. Touch

- The control sheet is a full-width strip; the play button is a 40px target on
  desktop and 34px on narrow players.
- Double-tap on the left or right third of the frame seeks ∓10 seconds.
- The volume popover opens on hover **and** on focus, so it is reachable by
  touch and by keyboard.
- Below 560px the secondary controls are simplified rather than shrunk below a
  usable size; the seek line and play button always remain.

---

## 6. Motion and forced colours

- `prefers-reduced-motion: reduce` collapses every transition and animation.
  The loading spinner stops turning rather than continuing to spin, and the
  scroll reveals are disabled.
- `forced-colors` is not overridden: the skin does not set `forced-color-adjust`,
  so the operating system's own palette wins. Icons use `currentColor`, so they
  follow the forced text colour.

---

## 7. Checklist

- [x] All controls reachable with Tab
- [x] Enter and Space operate the appropriate control
- [x] Arrow keys operate the sliders
- [x] Escape closes menus and popovers
- [x] Visible focus indicator on every control
- [x] Accessible names on every button
- [x] Text readable over bright footage (opaque sheet)
- [x] Icons readable over dark footage (opaque sheet)
- [x] Comfortable mobile touch targets
- [x] Reduced-motion support
- [x] Screen-reader announcements for state changes
- [x] Captions support with a real track
- [x] Chapter markers with readable titles
- [x] Error state announced through an alert dialog

---

## 8. Known limitations

- Picture in picture is shown only where the platform supports it; the button
  hides itself elsewhere rather than offering a dead control.
- The quality menu lists the renditions the current stream exposes. A
  progressive MP4 source would not offer one, so the row disappears.
- The caption track shipped with the demo is an audio-description track written
  for the Video.js demo reel. A production site should ship its own captions.
