import { useEffect, useState } from 'react';

const STORAGE_KEY = 'noir.splash.seen';

/**
 * A loading screen shown on the first visit to the site. It types out the
 * wordmark, reveals the collaboration line, and then lifts away to reveal
 * the player.
 *
 * `force` (via the `?splash=1` query parameter) replays it on demand.
 */
export function Splash() {
  const [visible, setVisible] = useState(true);
  const [typed, setTyped] = useState(0);
  const [showLine, setShowLine] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const force = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('splash');

  useEffect(() => {
    if (!force && window.sessionStorage.getItem(STORAGE_KEY) === '1') {
      setVisible(false);
      return;
    }

    const timers: number[] = [];
    const type = (n: number) => {
      if (n > 4) return;
      timers.push(window.setTimeout(() => setTyped(n), n * 160));
    };
    for (let i = 1; i <= 4; i += 1) type(i);

    timers.push(window.setTimeout(() => setShowLine(true), 4 * 160 + 220));
    timers.push(window.setTimeout(() => setLeaving(true), 4 * 160 + 1200));
    timers.push(
      window.setTimeout(() => {
        setVisible(false);
        window.sessionStorage.setItem(STORAGE_KEY, '1');
      }, 4 * 160 + 1900),
    );

    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [force]);

  if (!visible) return null;

  const word = 'NOIR'.slice(0, typed);

  return (
    <div
      className={`splash${leaving ? ' splash--leaving' : ''}`}
      role="status"
      aria-live="polite"
      onClick={() => {
        setLeaving(true);
        window.setTimeout(() => {
          setVisible(false);
          window.sessionStorage.setItem(STORAGE_KEY, '1');
        }, 260);
      }}
    >
      <div className="splash__inner">
        <p className="splash__eyebrow">[ Loading ]</p>
        <h1 className="splash__word">
          {word}
          <span className="typing-cursor" aria-hidden="true">
            _
          </span>
        </h1>
        <p className={`splash__line${showLine ? ' splash__line--visible' : ''}`}>
          NOIR <span className="splash__cross">×</span> Contra{' '}
          <span className="splash__cross">×</span> Video.js
        </p>
      </div>
      <div className="splash__bar" aria-hidden="true">
        <span className="splash__bar-fill" />
      </div>
      <p className="splash__hint">Click anywhere to skip</p>
    </div>
  );
}
