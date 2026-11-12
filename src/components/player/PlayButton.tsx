import { PlayButton as PlayButtonPrimitive } from '@videojs/react';
import { PauseIcon, PlayIcon } from './Icons';

/** Primary transport button in the control bar. */
export function PlayButton() {
  return (
    <PlayButtonPrimitive
      className="noir-btn noir-btn--primary"
      render={(props, state) => (
        <button {...props} type="button">
          {state.paused ? <PlayIcon size={16} /> : <PauseIcon size={16} />}
        </button>
      )}
    />
  );
}
