import { CaptionsButton as CaptionsButtonPrimitive } from '@videojs/react';
import { CaptionsIcon } from './Icons';

/** Toggles the available caption or subtitle track. */
export function CaptionsControl() {
  return (
    <CaptionsButtonPrimitive
      className="noir-btn"
      render={(props) => (
        <button {...props} type="button">
          <CaptionsIcon size={18} />
        </button>
      )}
    />
  );
}
