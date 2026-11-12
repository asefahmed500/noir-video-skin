import { MuxData } from '@videojs/react/extensions/mux-data';
import { MuxVideo } from '@videojs/react/media/mux-video';
import { VideoPlayer as VideoPlayerPrimitive } from '@videojs/react/video';
import { NoirSkin } from './NoirSkin';
import { MUX_PLAYBACK_ID, PLAYBACK_RATES, REEL_TITLE } from './media';

export interface VideoPlayerProps {
  /** Title shown in the sheet header above the frame. */
  title?: string;
  /** Poster URL. Mux derives one from the playback id when omitted. */
  poster?: string;
}

/**
 * The NOIR player: a Video.js v10 video preset wearing the NOIR skin.
 */
export function VideoPlayer({ title = REEL_TITLE, poster }: VideoPlayerProps) {
  return (
    <VideoPlayerPrimitive
      title={title}
      {...(poster ? { poster } : {})}
      defaultPlaybackRates={PLAYBACK_RATES}
    >
      <NoirSkin>
        <MuxVideo
          className="noir-video"
          source={{ playbackId: MUX_PLAYBACK_ID }}
          crossOrigin="anonymous"
          playsInline
          preload="metadata"
        />
      </NoirSkin>
      <MuxData
        metadata={{
          player_name: 'NOIR',
          player_version: '1.0.0',
          video_title: title,
          video_stream_type: 'on-demand',
        }}
      />
    </VideoPlayerPrimitive>
  );
}
