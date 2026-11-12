import { Title } from '@videojs/react';

/**
 * The sheet header drawn over the frame: the skin's name and the title of
 * the media currently loaded.
 */
export function SpecLabel() {
  return (
    <div className="noir-spec" aria-hidden="true">
      <span className="noir-spec__mark" />
      <span className="noir-spec__name">NOIR</span>
      <span className="noir-spec__sep">/</span>
      <Title className="noir-spec__title" />
    </div>
  );
}
