import { AbsoluteFill, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const Intro: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // 1. Staggered Bounce Entrance (Top to Bottom)
    // Delay each element by ~8 frames for clear "step-by-step" appear
    const springConfig = { damping: 12, stiffness: 100, mass: 0.6 };

    // Ordered sequences: 0 -> 8 -> 16 -> 24 -> 32
    const d1 = spring({ frame: frame - 0, fps, config: springConfig }); // Logo
    const d2 = spring({ frame: frame - 8, fps, config: springConfig }); // Title
    const d3 = spring({ frame: frame - 16, fps, config: springConfig }); // Banner
    const d4 = spring({ frame: frame - 24, fps, config: springConfig }); // Panel
    const d5 = spring({ frame: frame - 32, fps, config: springConfig }); // Button

    // 2. Continuous "Heartbeat" (Latido) for key elements
    // Slower pulse for 30fps stability
    const heartbeat = 1 + Math.sin(frame / 10) * 0.03;

    // 3. Specific movement for "AESPA" (Wiggle/Shake)
    // Slower, more controlled wiggle
    const wiggle = Math.sin(frame / 8) * 3; // +/- 3 degrees

    // 4. Gentle float for Banner
    const float = Math.sin(frame / 40) * 5;

    return (
        <AbsoluteFill style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="intro-v3-container">

                {/* 1. TOP LOGO (Bounce In) */}
                <div style={{ transform: `scale(${d1})` }}>
                    <img
                        src={staticFile("logo_papelcool.svg")}
                        className="intro-v3-logo"
                        alt="Papelcool"
                    />
                </div>

                {/* 2. TITLE (Bounce In + AESPA Wiggle) */}
                <div style={{ textAlign: 'center', marginBottom: '0.5rem', transform: `scale(${d2})` }}>
                    <div className="intro-v3-title-1">
                        TRIVIA
                    </div>
                    <div
                        className="intro-v3-title-2"
                        style={{
                            display: 'inline-block',
                            transform: `rotate(${wiggle}deg)`
                        }}
                    >
                        <span className="text-yellow">AESPA</span>
                    </div>
                    <div className="intro-v3-title-2" style={{ display: 'inline-block', marginLeft: '1rem' }}>
                        FOR MYs
                    </div>
                </div>

                {/* 3. BANNER (Bounce In + Float) */}
                <div
                    className="intro-v3-pill"
                    style={{ transform: `scale(${d3}) translateY(${float}px)` }}
                >
                    <span className="intro-v3-pill-text">50 Questions</span>
                    <span className="intro-v3-pill-text text-yellow" style={{ fontSize: '1.8rem' }}>+15s each</span>
                </div>

                {/* 4. SCORE PANEL (Bounce In) */}
                <div
                    className="intro-v3-panel"
                    style={{ transform: `scale(${d4})` }}
                >
                    <div className="intro-v3-panel-item">
                        <span className="intro-v3-emoji wiggle">🤔</span>
                        <span className="intro-v3-score">+12</span>
                        <span className="intro-v3-rank">Expert</span>
                    </div>
                    <div className="intro-v3-divider"></div>
                    <div className="intro-v3-panel-item">
                        <span className="intro-v3-emoji wiggle" style={{ animationDelay: '0.3s' }}>🙂</span>
                        <span className="intro-v3-score">+33</span>
                        <span className="intro-v3-rank">Fan</span>
                    </div>
                    <div className="intro-v3-divider"></div>
                    <div className="intro-v3-panel-item">
                        <span className="intro-v3-emoji wiggle" style={{ animationDelay: '0.6s' }}>🥳</span>
                        <span className="intro-v3-score">+45</span>
                        <span className="intro-v3-rank">MY!</span>
                    </div>
                </div>

                {/* 5. START BUTTON (Bounce In + Heartbeat) */}
                <div
                    className="intro-v3-start-btn"
                    style={{ transform: `scale(${d5}) scale(${heartbeat})` }}
                >
                    START!
                </div>

            </div>
        </AbsoluteFill>
    );
};
