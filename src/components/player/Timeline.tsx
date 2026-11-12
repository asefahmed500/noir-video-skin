import { TimeSlider } from '@videojs/react';

/**
 * The seek timeline. The unplayed portion stays dashed like an undrawn line;
 * the played portion is drawn solid in the signal red.
 */
export function Timeline() {
  return (
    <TimeSlider.Root
      className="noir-timeline"
      label="Seek"
      step={1}
      largeStep={5}
      pauseOnDrag
    >
      <TimeSlider.Track className="noir-timeline__track">
        <TimeSlider.Buffer className="noir-timeline__buffer" />
        <TimeSlider.Fill className="noir-timeline__fill" />
      </TimeSlider.Track>
      <TimeSlider.Thumb className="noir-timeline__thumb" />
      <TimeSlider.Preview className="noir-timeline__preview" overflow="clamp">
        <TimeSlider.Value type="pointer" className="noir-timeline__value" />
      </TimeSlider.Preview>
    </TimeSlider.Root>
  );
}
