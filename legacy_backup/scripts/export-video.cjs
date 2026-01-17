const puppeteer = require('puppeteer');
const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');
const path = require('path');

// =====================================================
// OPTIMIZED VIDEO EXPORT - 2K (2560x1440) @ 60fps
// =====================================================

const EXPORT_URL = 'http://localhost:5173/?export=true';
const OUTPUT_FILE = path.resolve(__dirname, '../trivia-video.mp4');

// Video dimensions - 1080p (16:9)
const VIDEO_WIDTH = 1920;
const VIDEO_HEIGHT = 1080;

(async () => {
    console.log('🎬 Starting Video Export...');
    console.log(`📐 Resolution: ${VIDEO_WIDTH}x${VIDEO_HEIGHT} (1080p/Full HD)`);
    console.log('🎯 Target FPS: 60');
    console.log('Target URL:', EXPORT_URL);

    // Launch browser with advanced performance and fluidity optimizations
    const browser = await puppeteer.launch({
        headless: 'new',
        args: [
            // Basic required flags
            '--no-sandbox',
            '--disable-setuid-sandbox',
            `--window-size=${VIDEO_WIDTH},${VIDEO_HEIGHT}`,
            '--hide-scrollbars',
            '--no-first-run',

            // FLUIDITY: Enable deterministic rendering
            // This forces Puppeteer to wait for each frame to be fully drawn
            '--run-all-compositor-stages-before-draw',
            '--disable-new-content-rendering-timeout',
            '--disable-frame-rate-limit', // Don't cap FPS at monitor refresh rate

            // Performance: Disable throttling (CRITICAL for smooth recording)
            '--disable-dev-shm-usage',
            '--disable-background-timer-throttling',
            '--disable-backgrounding-occluded-windows',
            '--disable-renderer-backgrounding',
            '--disable-ipc-flooding-protection',
            '--disable-hang-monitor',

            // GPU acceleration
            '--enable-gpu-rasterization',
            '--enable-zero-copy',
            '--ignore-gpu-blocklist',
            '--enable-accelerated-2d-canvas',
            '--enable-accelerated-video-decode',

            // Memory optimization for 2K
            '--js-flags=--max-old-space-size=4096',
            '--memory-pressure-off',
            '--disable-component-update',

            // Disable unnecessary features to save RAM
            '--disable-features=TranslateUI',
            '--disable-extensions',
            '--disable-sync',
            '--disable-default-apps',
            '--mute-audio',

            // Force consistent rendering
            '--force-color-profile=srgb',
            '--force-device-scale-factor=1',
        ]
    });

    const page = await browser.newPage();

    // Set viewport EXACTLY to 2K (2560x1440)
    await page.setViewport({
        width: VIDEO_WIDTH,
        height: VIDEO_HEIGHT,
        deviceScaleFactor: 1,
    });

    // Setup Recorder with optimized settings for 2K 60fps
    const recorder = new PuppeteerScreenRecorder(page, {
        followNewTab: false,
        fps: 60,
        ffmpeg_Path: null,
        videoFrame: {
            width: VIDEO_WIDTH,
            height: VIDEO_HEIGHT,
        },
        videoCrf: 20,          // Balanced quality/performance for 1080p
        videoBitrate: 12000,   // 12 Mbps (YouTube standard for 1080p60)
        aspectRatio: '16:9',
    });

    // BEST PRACTICE: Start recording FIRST, then navigate
    console.log('🎥 Starting recording...');
    await recorder.start(OUTPUT_FILE);

    // Navigate to page
    console.log('🌐 Loading page...');
    await page.goto(EXPORT_URL, { waitUntil: 'networkidle0', timeout: 90000 });

    // Inject CSS to GUARANTEE 2K layout fills the viewport
    await page.addStyleTag({
        content: `
            /* FORCE EXACT 1920x1080 ON ALL CONTAINERS */
            html, body {
                width: ${VIDEO_WIDTH}px !important;
                height: ${VIDEO_HEIGHT}px !important;
                margin: 0 !important;
                padding: 0 !important;
                overflow: hidden !important;
                background: #0d001a !important;
            }
            
            #app, 
            #app.video-player-layout,
            .workspace, 
            .preview-container, 
            .preview-frame {
                width: ${VIDEO_WIDTH}px !important;
                height: ${VIDEO_HEIGHT}px !important;
                min-width: ${VIDEO_WIDTH}px !important;
                min-height: ${VIDEO_HEIGHT}px !important;
                max-width: ${VIDEO_WIDTH}px !important;
                max-height: ${VIDEO_HEIGHT}px !important;
                margin: 0 !important;
                padding: 0 !important;
                overflow: hidden !important;
                box-sizing: border-box !important;
            }
            
            /* Ensure preview-frame gradient fills everything */
            .preview-frame {
                position: absolute !important;
                top: 0 !important;
                left: 0 !important;
                border-radius: 0 !important;
                box-shadow: none !important;
            }
            
            /* Hide scrollbars */
            ::-webkit-scrollbar { display: none !important; }
            
            /* GPU acceleration for smooth 60fps animations */
            .blob, 
            .animate-bounce-in, 
            .wiggle, 
            .float, 
            .pulse-text, 
            .pulse-button,
            .polaroid-frame, 
            .option-btn, 
            .timer-bar, 
            .quiz-content,
            .glass-container, 
            .screen, 
            .background-blobs,
            .preview-frame {
                will-change: transform, opacity;
                transform: translateZ(0);
                backface-visibility: hidden;
                -webkit-font-smoothing: antialiased;
            }
        `
    });

    // Verify dimensions
    const dimensions = await page.evaluate(() => {
        return {
            bodyWidth: document.body.offsetWidth,
            bodyHeight: document.body.offsetHeight,
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
            previewFrame: document.querySelector('.preview-frame')
                ? {
                    width: document.querySelector('.preview-frame').offsetWidth,
                    height: document.querySelector('.preview-frame').offsetHeight
                }
                : null
        };
    });
    console.log('📏 Viewport Dimensions:', dimensions);
    console.log(`📐 Aspect Ratio: ${(dimensions.windowWidth / dimensions.windowHeight).toFixed(4)}`);

    // Wait for quiz to finish
    const MAX_EXPORT_TIME = 25 * 60 * 1000; // 25 minutes (2K might be slower)

    console.log('⏳ Waiting for quiz to complete...');

    try {
        await page.waitForSelector('#export-finished', { timeout: MAX_EXPORT_TIME });
        console.log('✅ Quiz finished!');
    } catch (e) {
        console.log('⏱️ Max time reached or error, stopping recording...');
    }

    // Wait for final animations
    await new Promise(r => setTimeout(r, 2000));

    await recorder.stop();
    console.log('💾 Video saved to:', OUTPUT_FILE);
    console.log(`✨ Export complete! Resolution: ${VIDEO_WIDTH}x${VIDEO_HEIGHT} @ 60fps`);

    await browser.close();
    process.exit(0);
})();
