import { Controls } from '@videojs/react';
import { CaptionsControl } from './CaptionsControl';
import { FullscreenButton } from './FullscreenButton';
import { PlayButton } from './PlayButton';
import { SettingsMenu } from './SettingsMenu';
import { SpeedControl } from './SpeedControl';
import { TimeDisplay } from './TimeDisplay';
import { Timeline } from './Timeline';
import { VolumeControl } from './VolumeControl';

/**
 * The control bar, laid out as a drafting sheet: the seek line runs across
 * the top edge, the controls sit beneath it.
 */
export function PlayerControls() {
  return (
    <div className="noir-sheet">
      <Timeline />

      <div className="noir-row">
        <Controls.Group className="noir-group" aria-label="Playback controls">
          <PlayButton />
          <TimeDisplay />
        </Controls.Group>

        <Controls.Group className="noir-group noir-group--end" aria-label="Audio and display controls">
          <VolumeControl />
          <CaptionsControl />
          <SpeedControl />
          <SettingsMenu />
          <FullscreenButton />
        </Controls.Group>
      </div>
    </div>
  );
}
