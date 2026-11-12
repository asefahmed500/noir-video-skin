import {
  BufferingIndicator,
  Container,
  Controls,
  ErrorDialog,
  Gesture,
  Hotkey,
  Poster,
  SeekIndicator,
  StatusAnnouncer,
  StatusIndicator,
  VolumeIndicator,
} from '@videojs/react';
import type { ReactNode } from 'react';
import { BigPlayButton } from './BigPlayButton';
import { PlayerControls } from './PlayerControls';
import { SpecLabel } from './SpecLabel';

/**
 * The NOIR skin.
 *
 * A Video.js v10 skin is a `Container` plus the UI components arranged
 * inside it. The components own playback state, keyboard handling and
 * accessibility; everything below is layout and styling.
 */
export function NoirSkin({ children }: { children: ReactNode }) {
  return (
    <Container className="noir" aria-label="Video player">
      {children}

      <Poster.Root className="noir-poster">
        <Poster.Image className="noir-poster__image" />
      </Poster.Root>

      <Controls.Root>
        <Controls.Backdrop className="noir-scrim" />
        <Controls.Content className="noir-controls">
          <SpecLabel />
          <PlayerControls />
        </Controls.Content>
      </Controls.Root>

      <BigPlayButton />

      <BufferingIndicator className="noir-buffering" />

      <SeekIndicator.Root className="noir-readout">
        <SeekIndicator.Value className="noir-readout__value" />
      </SeekIndicator.Root>

      <StatusIndicator.Root className="noir-readout">
        <StatusIndicator.Value className="noir-readout__value" />
      </StatusIndicator.Root>

      <VolumeIndicator.Root className="noir-readout noir-readout--volume">
        <VolumeIndicator.Fill className="noir-readout__bar" />
        <VolumeIndicator.Value className="noir-readout__value" />
      </VolumeIndicator.Root>

      {/* --- Keyboard ---------------------------------------------------- */}
      <Hotkey keys="Space" action="togglePaused" />
      <Hotkey keys="k" action="togglePaused" />
      <Hotkey keys="ArrowLeft" action="seekStep" />
      <Hotkey keys="j" action="seekStep" />
      <Hotkey keys="ArrowRight" action="seekStep" />
      <Hotkey keys="l" action="seekStep" />
      <Hotkey keys="ArrowUp" action="volumeStep" />
      <Hotkey keys="ArrowDown" action="volumeStep" />
      <Hotkey keys="m" action="toggleMuted" />
      <Hotkey keys="f" action="toggleFullscreen" />
      <Hotkey keys="c" action="toggleSubtitles" />
      <Hotkey keys="p" action="togglePictureInPicture" />

      {/* --- Touch ------------------------------------------------------- */}
      <Gesture type="doubletap" region="left" pointer="touch" action="seekStep" value={-10} />
      <Gesture type="doubletap" region="right" pointer="touch" action="seekStep" value={10} />

      <StatusAnnouncer className="visually-hidden" />

      <ErrorDialog.Root>
        <ErrorDialog.Backdrop className="noir-error__backdrop" />
        <ErrorDialog.Popup className="noir-error">
          <span className="noir-error__mark" aria-hidden="true" />
          <ErrorDialog.Title className="noir-error__title" />
          <ErrorDialog.Description className="noir-error__description" />
          <ErrorDialog.Close className="noir-btn noir-btn--primary noir-error__close">
            Dismiss
          </ErrorDialog.Close>
        </ErrorDialog.Popup>
      </ErrorDialog.Root>
    </Container>
  );
}
