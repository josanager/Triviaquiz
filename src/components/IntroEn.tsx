import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig } from 'remotion';
import logoPapelcool from '../assets/logo_papelcool.svg';

interface IntroEnProps {
    layout?: 'horizontal' | 'vertical';
}

export const IntroEn: React.FC<IntroEnProps> = ({ layout = 'horizontal' }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // 1. Staggered Bounce Entrance (Top to Bottom)
    const springConfig = { damping: 12, stiffness: 100, mass: 0.6 };

    const d1 = spring({ frame: frame - 0, fps, config: springConfig }); // Logo
    const d2 = spring({ frame: frame - 8, fps, config: springConfig }); // Title
    const d3 = spring({ frame: frame - 16, fps, config: springConfig }); // Banner
    const d4 = spring({ frame: frame - 24, fps, config: springConfig }); // Panel
    const d5 = spring({ frame: frame - 32, fps, config: springConfig }); // Button

    // 2. Continuous "Heartbeat" for key elements
    const heartbeat = 1 + Math.sin(frame / 10) * 0.03;

    // 3. Specific movement for "MORAT" (Wiggle/Shake)
    const wiggle = Math.sin(frame / 8) * 3; // +/- 3 degrees

    // 4. Gentle float for Banner
    const float = Math.sin(frame / 40) * 5;

    return (
        <AbsoluteFill style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="intro-v3-container">

                {/* 1. TOP LOGO (Bounce In) */}
                <div style={{ transform: `scale(${d1})` }}>
                    <img
                        src={logoPapelcool}
                        className="intro-v3-logo"
                        alt="Papelcool"
                    />
                </div>

                {/* 2. TITLE (Bounce In + MORAT Wiggle) */}
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
                        <span className="text-yellow">MORAT</span>
                    </div>
                    <div className="intro-v3-title-2" style={{ display: 'inline-block', marginLeft: '1rem' }}>
                        FOR MORATISTAS
                    </div>
                </div>

                {/* 3. BANNER (Bounce In + Float) */}
                <div
                    className="intro-v3-pill"
                    style={{ transform: `scale(${d3}) translateY(${float}px)` }}
                >
                    <span className="intro-v3-pill-text">{layout === 'vertical' ? '5 Questions' : '30 Questions'}</span>
                    <span className="intro-v3-pill-text text-yellow" style={{ fontSize: '1.8rem' }}>+15s each</span>
                </div>

                {/* 4. SCORE PANEL (Bounce In) */}
                {layout === 'vertical' ? (
                    <div
                        className="intro-v3-panel"
                        style={{ transform: `scale(${d4})`, justifyContent: 'center', gap: '1rem', padding: '2rem' }}
                    >
                        <span className="intro-v3-emoji wiggle" style={{ fontSize: '6rem' }}>🎸</span>
                        <span style={{ fontSize: '2.5rem', fontWeight: 900, color: 'white', textAlign: 'center' }}>5/5 = True MORATISTA!</span>
                    </div>
                ) : (
                    <div
                        className="intro-v3-panel"
                        style={{ transform: `scale(${d4})` }}
                    >
                        <div className="intro-v3-panel-item">
                            <span className="intro-v3-emoji wiggle">🤔</span>
                            <span className="intro-v3-score">+8</span>
                            <span className="intro-v3-rank">Casual</span>
                        </div>
                        <div className="intro-v3-divider"></div>
                        <div className="intro-v3-panel-item">
                            <span className="intro-v3-emoji wiggle" style={{ animationDelay: '0.3s' }}>🎤</span>
                            <span className="intro-v3-score">+18</span>
                            <span className="intro-v3-rank">Fan</span>
                        </div>
                        <div className="intro-v3-divider"></div>
                        <div className="intro-v3-panel-item">
                            <span className="intro-v3-emoji wiggle" style={{ animationDelay: '0.6s' }}>🎸</span>
                            <span className="intro-v3-score">+28</span>
                            <span className="intro-v3-rank">MORATISTA</span>
                        </div>
                    </div>
                )}

                {/* 5. START BUTTON (Bounce In + Heartbeat) */}
                <div
                    className="intro-v3-start-btn"
                    style={{ transform: `scale(${d5}) scale(${heartbeat})` }}
                >
                    LET'S GO!
                </div>

            </div>
        </AbsoluteFill>
    );
};
