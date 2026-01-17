import { AbsoluteFill, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const Outro: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // 1. Staggered Bounce Entrance (Top to Bottom)
    const springConfig = { damping: 12, stiffness: 100, mass: 0.6 };

    // Ordered sequences: 0 -> 8 -> 16 -> 24
    const d1 = spring({ frame: frame - 0, fps, config: springConfig }); // Logo
    const d2 = spring({ frame: frame - 8, fps, config: springConfig }); // Title
    const d3 = spring({ frame: frame - 16, fps, config: springConfig }); // Comment Panel
    const d4 = spring({ frame: frame - 24, fps, config: springConfig }); // Subscribe Button

    // 2. Heartbeat (Latido) for Button
    // Matching the Intro's energy (slower for 30fps)
    const heartbeat = 1 + Math.sin(frame / 10) * 0.03;

    // 3. Gentle Float for Title
    const float = Math.sin(frame / 40) * 5;

    return (
        <AbsoluteFill style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="outro-v3-container">

                {/* 1. LOGO */}
                <div style={{ transform: `scale(${d1})` }}>
                    <img
                        src={staticFile("logo_papelcool.svg")}
                        className="outro-v3-logo"
                        alt="Papelcool"
                    />
                </div>

                {/* 2. TITLE (Bounce + Float) */}
                <h1
                    className="outro-v3-title"
                    style={{ transform: `scale(${d2}) translateY(${float}px)` }}
                >
                    HOW MANY<br />DID YOU GET?
                </h1>

                {/* 3. COMMENT PANEL (Bounce) */}
                <div
                    className="outro-v3-panel"
                    style={{ transform: `scale(${d3})` }}
                >
                    <span className="wiggle" style={{ fontSize: '5rem' }}>💬</span>
                    <span className="outro-v3-panel-text">Leave it in the comments!</span>
                </div>

                {/* 4. SUBSCRIBE BUTTON (Bounce + Heartbeat) */}
                <button
                    className="outro-v3-cta-btn"
                    style={{
                        transform: `scale(${d4}) scale(${heartbeat})`
                    }}
                >
                    SUBSCRIBE FOR MORE!
                </button>

            </div>
        </AbsoluteFill>
    );
};
