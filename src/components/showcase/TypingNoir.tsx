import { useEffect, useState } from 'react';

const WORD = 'NOIR';

/**
 * A huge word typed out letter by letter, like a terminal prompt.
 * The cursor keeps blinking after the word is complete.
 */
export function TypingNoir({ className }: { className?: string }) {
  const [shown, setShown] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (shown >= WORD.length) {
      setDone(true);
      return;
    }
    const id = window.setTimeout(() => setShown((n) => n + 1), 180);
    return () => window.clearTimeout(id);
  }, [shown]);

  return (
    <span className={className} aria-label={WORD}>
      {WORD.slice(0, shown)}
      <span
        className={`typing-cursor${done ? ' typing-cursor--idle' : ''}`}
        aria-hidden="true"
      >
        _
      </span>
    </span>
  );
}
