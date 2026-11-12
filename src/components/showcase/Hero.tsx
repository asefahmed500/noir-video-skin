import { VideoPlayer } from '../player/VideoPlayer';
import { TypingNoir } from './TypingNoir';

export function Hero() {
  return (
    <section className="hero hero--minimal" id="top">
      <div className="plate plate--player">
        <VideoPlayer title="The Internet's Video Infrastructure" />
      </div>
      <p className="hero__note">
        <span className="hero__note-dot" aria-hidden="true" />
        <TypingNoir /> — a Video.js v10 skin
      </p>
    </section>
  );
}
