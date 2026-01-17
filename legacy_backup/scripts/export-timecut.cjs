const timecut = require('timecut');
const path = require('path');
const fs = require('fs');

// =====================================================
// FRAME-BY-FRAME VIDEO EXPORT (TIMECUT)
// =====================================================
// This script captures the web animation frame-by-frame to guarantee
// perfectly smooth 60fps video, regardless of computer speed.
// =====================================================

const EXPORT_URL = 'http://localhost:5173/?export=true';
const OUTPUT_FILE = path.resolve(__dirname, '../trivia-video-timecut.mp4');

// Video configuration - 1080p @ 60fps
const VIDEO_WIDTH = 1920;
const VIDEO_HEIGHT = 1080;
const FPS = 60;

// Duration calculation
// Intro (15s) + 50 Questions x 15s (750s) + Result (10s) = 775s
// Adding a small buffer to be safe -> 780s
const DURATION_SECONDS = 780;

(async () => {
    console.log('🚀 Starting Frame-by-Frame Video Export (TimeCut)...');
    console.log(`📐 Resolution: ${VIDEO_WIDTH}x${VIDEO_HEIGHT}`);
    console.log(`⏱️  Duration: ${DURATION_SECONDS} seconds (~${(DURATION_SECONDS / 60).toFixed(1)} mins)`);
    console.log(`🎞️  FPS: ${FPS}`);
    console.log(`🌐 Target: ${EXPORT_URL}`);
    console.log('⏳ This process will take time (rendering frame by frame)...');

    try {
        await timecut({
            url: EXPORT_URL,
            viewport: {
                width: VIDEO_WIDTH,
                height: VIDEO_HEIGHT
            },
            selector: '#app', // Capture the application container
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            fps: FPS,
            duration: DURATION_SECONDS,
            output: OUTPUT_FILE,
            // Optimized FFmpeg settings for high quality & compatibility
            outputOptions: [
                '-c:v libx264',   // H.264 codec
                '-preset slow',   // Better compression/quality tradeoff
                '-crf 18',        // High quality (lower is better, 18 is visually lossless)
                '-pix_fmt yuv420p' // Max compatibility with players
            ],
            // Puppeteer launch arguments for stability
            launchArguments: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                `--window-size=${VIDEO_WIDTH},${VIDEO_HEIGHT}`,
                '--hide-scrollbars',
                '--disable-web-security',
                '--disable-features=IsolateOrigins,site-per-process'
            ],
            // Inject CSS to ensure everything looks correct in headless mode
            preparePage: async (page) => {
                await page.addStyleTag({
                    content: `
                        /* FORCE LAYOUT */
                        html, body {
                            width: ${VIDEO_WIDTH}px !important;
                            height: ${VIDEO_HEIGHT}px !important;
                            margin: 0 !important;
                            padding: 0 !important;
                            overflow: hidden !important;
                            background: #0d001a !important; /* aespa purple */
                        }
                        #app, .workspace {
                            width: ${VIDEO_WIDTH}px !important;
                            height: ${VIDEO_HEIGHT}px !important;
                            position: absolute;
                            top: 0;
                            left: 0;
                            margin: 0 !important;
                        }
                        /* Hide scrollbars */
                        ::-webkit-scrollbar { display: none !important; }
                    `
                });
            }
        });

        console.log('');
        console.log('✅ Export Complete!');
        console.log(`💾 Video saved to: ${OUTPUT_FILE}`);

    } catch (err) {
        console.error('❌ Error during export:', err);
    }
})();
