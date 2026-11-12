import { Time } from '@videojs/react';

/**
 * Elapsed and total time. The elapsed value toggles to the remaining time
 * when activated, so the viewer can read either without a settings detour.
 */
export function TimeDisplay() {
  return (
    <Time.Group className="noir-time">
      <Time.Value type="current" toggle className="noir-time__value" />
      <Time.Separator className="noir-time__sep">/</Time.Separator>
      <Time.Value type="duration" className="noir-time__value" />
    </Time.Group>
  );
}
