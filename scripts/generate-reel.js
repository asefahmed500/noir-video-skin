import { copyFileSync, unlinkSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const fontSrc = 'C:\\Windows\\Fonts\\consola.ttf';
const fontLocal = resolve(__dirname, 'consola.ttf');
const outputVideo = resolve(projectRoot, 'public/media/noir-reel.mp4');
const outputPoster = resolve(projectRoot, 'public/media/poster.jpg');

console.log('--- Generating NOIR Cinematic Video Reel ---');

// 1. Ensure local font exists
if (existsSync(fontSrc)) {
  copyFileSync(fontSrc, fontLocal);
} else {
  console.error('System font not found:', fontSrc);
  process.exit(1);
}

// 2. Build multi-segment FFmpeg filtergraph
// 5 scenes matching chapters.vtt:
// Scene 1: Tape Deck (0s - 5s)
// Scene 2: Arcade (5s - 12s)
// Scene 3: Neon (12s - 20s)
// Scene 4: Sidewalk / Golden Hour (20s - 28s) [Bright footage test]
// Scene 5: Fireworks (28s - 36s) + Noir Title Finale

// Normalize font path for ffmpeg filter
const fontArg = 'scripts/consola.ttf';

const filterComplex = [
  // Scene 1: Tape Deck (0 - 5s = 5s) - Deep Charcoal Noir + Analogue UI
  `color=c=0x0a0a0c:s=1280x720:d=5:r=30,` +
  `drawgrid=width=80:height=80:thickness=1:color=0x18181f@0.5,` +
  `drawbox=x=80:y=60:w=14:h=14:color=0xe53935:t=fill,` +
  `drawtext=fontfile=${fontArg}:text='ACT 01 // TAPE DECK':fontsize=22:fontcolor=0xe0e0e0:x=110:y=58,` +
  `drawtext=fontfile=${fontArg}:text='NOIR REEL 01':fontsize=14:fontcolor=0x888888:x=110:y=84,` +
  `drawtext=fontfile=${fontArg}:text='[ DARK FOOTAGE CONTRAST TEST ]':fontsize=16:fontcolor=0xe53935:x=80:y=140,` +
  `drawbox=x=80:y=240:w=1120:h=2:color=0x22222a:t=fill,` +
  `drawbox=x=80:y=480:w=1120:h=2:color=0x22222a:t=fill,` +
  `drawbox=x=320:y=280:w=180:h=160:color=0x1a1a22:t=fill,` +
  `drawbox=x=780:y=280:w=180:h=160:color=0x1a1a22:t=fill,` +
  `drawbox=x=380:y=330:w=60:h=60:color=0xe53935:t=2,` +
  `drawbox=x=840:y=330:w=60:h=60:color=0xe53935:t=2,` +
  `drawbox=x=540:y=340:w=200:h=40:color=0x14141c:t=fill,` +
  `drawtext=fontfile=${fontArg}:text='ANALOGUE TRANSPORT':fontsize=14:fontcolor=0xaaaaaa:x=560:y=352,` +
  `drawtext=fontfile=${fontArg}:text='TC 00\\:00\\:%{eif\\:t\\:d\\:2}\\:%{eif\\:mod(t*30,30)\\:d\\:2}':fontsize=20:fontcolor=0xe53935:x=80:y=620,` +
  `drawtext=fontfile=${fontArg}:text='CUE\\: A hand reaches for the transport controls of a cassette deck.':fontsize=15:fontcolor=0x777777:x=80:y=652[v1]`,

  // Scene 2: Arcade (5 - 12s = 7s) - Neon Cyber Grid
  `color=c=0x080d1a:s=1280x720:d=7:r=30,` +
  `drawgrid=width=60:height=60:thickness=1:color=0x00e5ff@0.2,` +
  `drawbox=x=80:y=60:w=14:h=14:color=0xe53935:t=fill,` +
  `drawtext=fontfile=${fontArg}:text='ACT 02 // ARCADE':fontsize=22:fontcolor=0x00e5ff:x=110:y=58,` +
  `drawtext=fontfile=${fontArg}:text='NEON PERSPECTIVE & REFLECTIONS':fontsize=14:fontcolor=0x6688aa:x=110:y=84,` +
  `drawbox=x=200:y=200:w=880:h=320:color=0x00e5ff@0.4:t=1,` +
  `drawbox=x=300:y=240:w=680:h=240:color=0xff007f@0.4:t=1,` +
  `drawbox=x=420:y=280:w=440:h=160:color=0xe53935@0.6:t=2,` +
  `drawbox=x=635:y=355:w=10:h=10:color=0x00e5ff:t=fill,` +
  `drawtext=fontfile=${fontArg}:text='TC 00\\:00\\:%{eif\\:t+5\\:d\\:2}\\:%{eif\\:mod(t*30,30)\\:d\\:2}':fontsize=20:fontcolor=0x00e5ff:x=80:y=620,` +
  `drawtext=fontfile=${fontArg}:text='CUE\\: Neon arcade light reflects off the glass of a pinball machine.':fontsize=15:fontcolor=0x778899:x=80:y=652[v2]`,

  // Scene 3: Neon (12 - 20s = 8s) - Deep Shadows with Red Accent
  `color=c=0x12080a:s=1280x720:d=8:r=30,` +
  `drawgrid=width=120:height=120:thickness=1:color=0xe53935@0.15,` +
  `drawbox=x=80:y=60:w=14:h=14:color=0xe53935:t=fill,` +
  `drawtext=fontfile=${fontArg}:text='ACT 03 // NEON':fontsize=22:fontcolor=0xffffff:x=110:y=58,` +
  `drawtext=fontfile=${fontArg}:text='SIGNAL RED APERTURE':fontsize=14:fontcolor=0xaa6666:x=110:y=84,` +
  `drawbox=x=540:y=260:w=200:h=200:color=0xe53935:t=2,` +
  `drawbox=x=590:y=310:w=100:h=100:color=0xe53935:t=fill,` +
  `drawbox=x=140:y=359:w=380:h=2:color=0x331114:t=fill,` +
  `drawbox=x=760:y=359:w=380:h=2:color=0x331114:t=fill,` +
  `drawtext=fontfile=${fontArg}:text='TC 00\\:00\\:%{eif\\:t+12\\:d\\:2}\\:%{eif\\:mod(t*30,30)\\:d\\:2}':fontsize=20:fontcolor=0xe53935:x=80:y=620,` +
  `drawtext=fontfile=${fontArg}:text='CUE\\: A dancer turns under red and teal light.':fontsize=15:fontcolor=0x885555:x=80:y=652[v3]`,

  // Scene 4: Sidewalk (20 - 28s = 8s) - HIGH-BRIGHTNESS GOLDEN HOUR TEST
  // This explicitly validates the accessibility criteria: readable over bright footage!
  `color=c=0xf5eedc:s=1280x720:d=8:r=30,` +
  `drawgrid=width=80:height=80:thickness=1:color=0xd4c8b0@0.6,` +
  `drawbox=x=80:y=60:w=14:h=14:color=0xe53935:t=fill,` +
  `drawtext=fontfile=${fontArg}:text='ACT 04 // SIDEWALK — GOLDEN HOUR':fontsize=22:fontcolor=0x1a1a1a:x=110:y=58,` +
  `drawtext=fontfile=${fontArg}:text='[ HIGH-BRIGHTNESS ACCESSIBILITY TEST ]':fontsize=14:fontcolor=0xe53935:x=110:y=84,` +
  `drawbox=x=80:y=200:w=480:h=300:color=0xe8dcc2:t=fill,` +
  `drawbox=x=80:y=200:w=480:h=300:color=0xbba88a:t=1,` +
  `drawbox=x=600:y=240:w=600:h=260:color=0xded0b4:t=fill,` +
  `drawbox=x=600:y=240:w=600:h=260:color=0xbba88a:t=1,` +
  `drawtext=fontfile=${fontArg}:text='ARCHITECTURAL DRAFTING // SUNLIGHT':fontsize=18:fontcolor=0x333333:x=120:y=340,` +
  `drawtext=fontfile=${fontArg}:text='Player controls remain completely legible over 90 percent luminance.':fontsize=15:fontcolor=0x555555:x=120:y=380,` +
  `drawtext=fontfile=${fontArg}:text='TC 00\\:00\\:%{eif\\:t+20\\:d\\:2}\\:%{eif\\:mod(t*30,30)\\:d\\:2}':fontsize=20:fontcolor=0x1a1a1a:x=80:y=620,` +
  `drawtext=fontfile=${fontArg}:text='CUE\\: A child rides a tricycle along a sunlit sidewalk.':fontsize=15:fontcolor=0x777777:x=80:y=652[v4]`,

  // Scene 5: Fireworks & Noir Finale (28 - 36s = 8s)
  `color=c=0x070709:s=1280x720:d=8:r=30,` +
  `drawgrid=width=100:height=100:thickness=1:color=0x1f1f26@0.4,` +
  `drawbox=x=80:y=60:w=14:h=14:color=0xe53935:t=fill,` +
  `drawtext=fontfile=${fontArg}:text='ACT 05 // FIREWORKS':fontsize=22:fontcolor=0xffffff:x=110:y=58,` +
  `drawtext=fontfile=${fontArg}:text='FINALE & BRAND REEL':fontsize=14:fontcolor=0x888888:x=110:y=84,` +
  // Fireworks burst boxes
  `drawbox=x=440:y=200:w=8:h=8:color=0xffd700:t=fill,` +
  `drawbox=x=540:y=180:w=6:h=6:color=0xe53935:t=fill,` +
  `drawbox=x=640:y=220:w=10:h=10:color=0xffffff:t=fill,` +
  `drawbox=x=740:y=170:w=6:h=6:color=0xffd700:t=fill,` +
  `drawbox=x=840:y=210:w=8:h=8:color=0xe53935:t=fill,` +
  // Grand brand resolve
  `drawbox=x=560:y=280:w=24:h=24:color=0xe53935:t=fill,` +
  `drawtext=fontfile=${fontArg}:text='N O I R':fontsize=64:fontcolor=0xffffff:x=604:y=256,` +
  `drawtext=fontfile=${fontArg}:text='VIDEO.JS V10 SKIN':fontsize=20:fontcolor=0xaaaaaa:x=560:y=340,` +
  `drawtext=fontfile=${fontArg}:text='A player drawn on paper. One signal red.':fontsize=16:fontcolor=0x666666:x=560:y=376,` +
  `drawtext=fontfile=${fontArg}:text='TC 00\\:00\\:%{eif\\:t+28\\:d\\:2}\\:%{eif\\:mod(t*30,30)\\:d\\:2}':fontsize=20:fontcolor=0xe53935:x=80:y=620,` +
  `drawtext=fontfile=${fontArg}:text='CUE\\: Fireworks burst over a night sky.':fontsize=15:fontcolor=0x666666:x=80:y=652,` +
  `fade=t=out:st=6.5:d=1.5[v5]`,

  // Concatenate all 5 video streams
  `[v1][v2][v3][v4][v5]concat=n=5:v=1:a=0[v]`
].join(';');

// Rich ambient cinematic synth soundtrack (36s)
// Uses layered sine oscillators with harmonic intervals + chord modulation
const audioFilter = [
  // Low root drone (55 Hz = A1)
  `sine=f=55:d=36[a_sub]`,
  // Chord pad root (110 Hz = A2)
  `sine=f=110:d=36[a_root]`,
  // Harmony fifth (165 Hz = E3)
  `sine=f=165:d=36[a_fifth]`,
  // Melodic upper tone (220 Hz = A3)
  `sine=f=220:d=36[a_oct]`,
  // Mix and shape with volume, lowpass warmth, and fade in/out
  `[a_sub][a_root][a_fifth][a_oct]amix=inputs=4:weights=0.35 0.3 0.2 0.15[amixed]`,
  `[amixed]lowpass=f=600,afade=t=in:st=0:d=1.5,afade=t=out:st=34:d=2[a]`
].join(';');

// Combine both video and audio into a single filter_complex
const combinedFilterComplex = `${filterComplex};${audioFilter}`;

console.log('Rendering 36s cinematic video to', outputVideo);

const ffmpegArgs = [
  '-y',
  '-filter_complex', combinedFilterComplex,
  '-map', '[v]',
  '-map', '[a]',
  '-c:v', 'libx264',
  '-preset', 'fast',
  '-crf', '20',
  '-pix_fmt', 'yuv420p',
  '-c:a', 'aac',
  '-b:a', '160k',
  '-movflags', '+faststart',
  outputVideo
];

const res = spawnSync('ffmpeg', ffmpegArgs, { stdio: 'inherit' });

if (res.status === 0) {
  console.log('Video reel successfully generated at:', outputVideo);

  // Generate poster frame from second 1.0
  console.log('Generating poster frame to:', outputPoster);
  spawnSync('ffmpeg', [
    '-y',
    '-ss', '1.0',
    '-i', outputVideo,
    '-vframes', '1',
    '-q:v', '2',
    outputPoster
  ], { stdio: 'inherit' });
  console.log('Poster generated!');
} else {
  console.error('FFmpeg failed with exit code', res.status);
}

// Cleanup local font copy
if (existsSync(fontLocal)) {
  try {
    unlinkSync(fontLocal);
  } catch {
    // ignore
  }
}
