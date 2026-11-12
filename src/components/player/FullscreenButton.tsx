import { FullscreenButton as FullscreenButtonPrimitive } from '@videojs/react';
import { FullscreenExitIcon, FullscreenIcon } from './Icons';

/** Toggles fullscreen. Hidden when the platform cannot offer it. */
export function FullscreenButton() {
  return (
    <FullscreenButtonPrimitive
      className="noir-btn"
      render={(props, state) => (
        <button {...props} type="button">
          {state.fullscreen ? <FullscreenExitIcon size={18} /> : <FullscreenIcon size={18} />}
        </button>
      )}
    />
  );
}
