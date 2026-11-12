import { MuteButton, VolumePopover, VolumeSlider } from '@videojs/react';
import { VolumeHighIcon, VolumeLowIcon, VolumeOffIcon } from './Icons';

/**
 * Mute toggle plus a vertical volume slider that opens on hover or focus.
 * The popover hides itself when the media cannot change its volume level.
 */
export function VolumeControl() {
  return (
    <div className="noir-volume">
      <VolumePopover.Root side="top" align="center" openOnHover delay={100} closeDelay={160}>
        <VolumePopover.Trigger
          className="noir-btn"
          render={
            <MuteButton
              className="noir-btn"
              render={(props, state) => (
                <button {...props} type="button">
                  {state.muted || state.volumeLevel === 'off' ? (
                    <VolumeOffIcon size={18} />
                  ) : state.volumeLevel === 'low' ? (
                    <VolumeLowIcon size={18} />
                  ) : (
                    <VolumeHighIcon size={18} />
                  )}
                </button>
              )}
            />
          }
        />
        <VolumePopover.Popup className="noir-volume__popup">
          <VolumeSlider.Root
            orientation="vertical"
            className="noir-volume__slider"
            label="Volume"
          >
            <VolumeSlider.Track className="noir-volume__track">
              <VolumeSlider.Fill className="noir-volume__fill" />
            </VolumeSlider.Track>
            <VolumeSlider.Thumb className="noir-volume__thumb" />
          </VolumeSlider.Root>
        </VolumePopover.Popup>
      </VolumePopover.Root>
    </div>
  );
}
