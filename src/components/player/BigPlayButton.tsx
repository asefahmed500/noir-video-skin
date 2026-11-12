import { PlayButton as PlayButtonPrimitive } from '@videojs/react';
import { PlayIcon, ReplayIcon } from './Icons';

/**
 * The oversized play control drawn over the frame while playback is paused.
 * It doubles as the replay affordance once the reel has ended.
 */
export function BigPlayButton() {
  return (
    <PlayButtonPrimitive
      className="noir-bigplay"
      label={(state) => (state.ended ? 'Replay' : 'Play')}
      render={(props, state) => (
        <button {...props} type="button">
          <span className="noir-bigplay__mark" aria-hidden="true">
            {state.ended ? <ReplayIcon size={26} /> : <PlayIcon size={26} />}
          </span>
          <span className="noir-bigplay__caption" aria-hidden="true">
            {state.ended ? 'Replay' : 'Play'}
          </span>
        </button>
      )}
    />
  );
}
