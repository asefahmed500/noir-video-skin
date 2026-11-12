import { PlaybackRateButton as PlaybackRateButtonPrimitive } from '@videojs/react';
import { PLAYBACK_RATES } from './media';

/**
 * Direct speed control. Clicking cycles through the offered rates; the
 * settings menu offers the same rates as an explicit list.
 */
export function SpeedControl() {
  return (
    <PlaybackRateButtonPrimitive
      className="noir-btn noir-btn--rate"
      rates={PLAYBACK_RATES}
      render={(props, state) => (
        <button {...props} type="button">
          <span className="noir-rate">{state.rate}×</span>
        </button>
      )}
    />
  );
}
