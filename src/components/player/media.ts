/**
 * Media configuration for the NOIR skin.
 *
 * Provides both the locally generated 36-second cinematic reel
 * and the public Mux stream for the challenge bonus point.
 */
export const LOCAL_VIDEO_URL = '/media/noir-reel.mp4';
export const LOCAL_POSTER_URL = '/media/poster.jpg';

export const MUX_PLAYBACK_ID =
  import.meta.env.VITE_MUX_PLAYBACK_ID ?? 'pLNSZ9Ng0217QWsAa004fs3hEiKdCVVON2Wd02pVjTeS8U';

export const MUX_STREAM_URL = `https://stream.mux.com/${MUX_PLAYBACK_ID}.m3u8`;

/** Playback rates offered by the speed control and the settings menu. */
export const PLAYBACK_RATES = [0.5, 1, 1.5, 2] as const;

/** Title shown in the player's spec label. */
export const REEL_TITLE = 'NOIR — Demo Reel';
