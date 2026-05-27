import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig, Img, Easing } from 'remotion';
import logoPapelcool from '../assets/logo_papelcool.svg';

// Translations for multi-language support
const TRANSLATIONS = {
    es: {
        subtitle: 'PARA FANS DEL FANDOM DE GEOMETRY DASH',
        questionsLabel: (n: number) => `${n} Preguntas`,
        timeLabel: '+15s c/u',
        verticalScore: '5/5 = ¡Fan total de Geometry Dash!',
        startButton: '¡A DASHEAR!',
        casualRank: 'Cube',
        fanRank: 'Dasher',
        topRank: 'LEYENDA',
    },
    en: {
        subtitle: 'FOR THE GEOMETRY DASH FANDOM',
        questionsLabel: (n: number) => `${n} Questions`,
        timeLabel: '+15s each',
        verticalScore: '5/5 = True Geometry Dash fan!',
        startButton: 'START DASHING!',
        casualRank: 'Cube',
        fanRank: 'Dasher',
        topRank: 'LEGEND',
    },
} as const;

interface IntroProps {
    layout?: 'horizontal' | 'vertical';
    lang?: 'es' | 'en';
}


export const Intro: React.FC<IntroProps> = ({ layout = 'horizontal', lang = 'es' }) => {
    const frame = useCurrentFrame();
    const { durationInFrames } = useVideoConfig();
    const t = TRANSLATIONS[lang];

    const enter = (start: number, duration = 24) =>
        interpolate(frame, [start, start + duration], [0, 1], {
            easing: Easing.bezier(0.18, 1, 0.3, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
        });

    const exit = (start: number, duration = 18) =>
        interpolate(frame, [start, start + duration], [0, 1], {
            easing: Easing.bezier(0.7, 0, 0.84, 0),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
        });

    const EXIT_START = durationInFrames - 36;

    const logoIn = enter(0, 22);
    const titleIn = enter(8, 24);
    const pillIn = enter(18, 22);
    const panelIn = enter(30, 24);
    const itemAIn = enter(38, 18);
    const itemBIn = enter(45, 18);
    const itemCIn = enter(52, 18);
    const buttonIn = enter(60, 22);

    const buttonOut = exit(EXIT_START, 14);
    const panelOut = exit(EXIT_START + 5, 14);
    const pillOut = exit(EXIT_START + 10, 14);
    const titleOut = exit(EXIT_START + 16, 14);
    const logoOut = exit(EXIT_START + 22, 14);

    const logoFloat = Math.sin(frame / 34) * 8 + Math.cos(frame / 19) * 3;
    const logoDriftX = Math.sin(frame / 28) * 6;
    const titleFloat = Math.sin(frame / 24) * 6 + Math.cos(frame / 40) * 3;
    const titleDriftX = Math.sin(frame / 33) * 10;
    const titleTilt = Math.sin(frame / 27) * 1.8;
    const wiggleAmplitude = interpolate(frame, [8, 90], [7, 2.5], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const wiggle = Math.sin(frame / 7) * wiggleAmplitude;
    const pillFloat = Math.sin(frame / 20) * 5 + Math.cos(frame / 37) * 4;
    const panelFloat = Math.sin(frame / 26) * 5 + Math.cos(frame / 31) * 2;
    const heartbeatPrimary = Math.max(0, Math.sin(frame / 7));
    const heartbeatSecondary = Math.max(0, Math.sin((frame - 3) / 7));
    const heartbeat = 1 + heartbeatPrimary * 0.06 + heartbeatSecondary * 0.03;

    const titleScale = interpolate(titleIn, [0, 0.7, 1], [0.78, 1.04, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const pillScale = interpolate(pillIn, [0, 0.75, 1], [0.82, 1.03, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const panelScale = interpolate(panelIn, [0, 0.8, 1], [0.9, 1.02, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const buttonScale = interpolate(buttonIn, [0, 0.75, 1], [0.76, 1.05, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Helper for floating shapes
    const f = (speed: number, offset = 0) => Math.sin((frame + offset) / speed);
    const c = (speed: number, offset = 0) => Math.cos((frame + offset) / speed);

    return (
        <AbsoluteFill style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* Floating decorative shapes */}
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
                <svg width="280" height="280" viewBox="0 0 100 100" style={{
                    position: 'absolute', top: '5%', left: '2%',
                    transform: `translate(${f(60) * 15}px, ${c(45) * 20}px) rotate(${frame / 5}deg)`,
                    opacity: 0.35,
                }}><circle cx="50" cy="50" r="42" fill="#FFE600" /></svg>

                <svg width="250" height="250" viewBox="0 0 100 100" style={{
                    position: 'absolute', top: '8%', right: '4%',
                    transform: `translate(${c(55, 20) * 12}px, ${f(70, 15) * 18}px) rotate(${-frame / 6}deg)`,
                    opacity: 0.30,
                }}><rect x="18" y="18" width="64" height="64" rx="16" fill="#D1E9FF" /></svg>

                <svg width="220" height="220" viewBox="0 0 100 100" style={{
                    position: 'absolute', bottom: '8%', left: '5%',
                    transform: `translate(${f(75, 30) * 18}px, ${c(50, 25) * 15}px) rotate(${frame / 7}deg)`,
                    opacity: 0.32,
                }}><polygon points="50,10 90,90 10,90" fill="#FF4D94" /></svg>

                <svg width="260" height="260" viewBox="0 0 100 100" style={{
                    position: 'absolute', bottom: '5%', right: '5%',
                    transform: `translate(${c(65, 40) * 15}px, ${f(55, 35) * 20}px) rotate(${-frame / 4.5}deg)`,
                    opacity: 0.34,
                }}><circle cx="50" cy="50" r="38" fill="#407BFF" /></svg>

                <svg width="180" height="180" viewBox="0 0 100 100" style={{
                    position: 'absolute', top: '40%', left: '0%',
                    transform: `translate(${f(50, 50) * 10}px, ${c(70, 20) * 12}px) rotate(${frame / 8}deg)`,
                    opacity: 0.28,
                }}><rect x="20" y="20" width="60" height="60" rx="12" fill="#FFE600" /></svg>

                <svg width="160" height="160" viewBox="0 0 100 100" style={{
                    position: 'absolute', top: '35%', right: '2%',
                    transform: `translate(${c(80, 10) * 10}px, ${f(60, 45) * 12}px) rotate(${-frame / 6.5}deg)`,
                    opacity: 0.30,
                }}><polygon points="50,5 95,37 77,90 23,90 5,37" fill="#D1E9FF" /></svg>
                
                {/* Nuevas formas añadidas */}
                <svg width="200" height="200" viewBox="0 0 100 100" style={{
                    position: 'absolute', top: '65%', left: '20%',
                    transform: `translate(${c(45, 15) * 12}px, ${f(55, 10) * 14}px) rotate(${frame / 5.5}deg)`,
                    opacity: 0.31,
                }}><circle cx="50" cy="50" r="40" fill="#E0F2FE" /></svg>
                
                <svg width="190" height="190" viewBox="0 0 100 100" style={{
                    position: 'absolute', top: '70%', right: '25%',
                    transform: `translate(${f(65, 20) * 15}px, ${c(50, 30) * 10}px) rotate(${-frame / 7.5}deg)`,
                    opacity: 0.29,
                }}><rect x="25" y="25" width="50" height="50" rx="10" fill="#FF4D94" /></svg>
                
                <svg width="240" height="240" viewBox="0 0 100 100" style={{
                    position: 'absolute', top: '25%', left: '30%',
                    transform: `translate(${c(75, 40) * 14}px, ${f(65, 25) * 18}px) rotate(${frame / 6}deg)`,
                    opacity: 0.33,
                }}><polygon points="50,15 85,85 15,85" fill="#407BFF" /></svg>
                
                <svg width="210" height="210" viewBox="0 0 100 100" style={{
                    position: 'absolute', top: '20%', right: '35%',
                    transform: `translate(${f(55, 30) * 16}px, ${c(45, 10) * 12}px) rotate(${-frame / 5}deg)`,
                    opacity: 0.27,
                }}><circle cx="50" cy="50" r="35" fill="#FFE600" /></svg>
            </div>

            <div className="intro-v3-container" style={{ zIndex: 2, position: 'relative' }}>
                <div
                    style={{
                        transform: `translateX(${interpolate(logoIn, [0, 1], [-90, logoDriftX])}px) translateY(${interpolate(logoIn, [0, 1], [-40, logoFloat])}px) scale(${interpolate(logoIn, [0, 0.78, 1], [0.72, 1.05, 1]) * interpolate(logoOut, [0, 1], [1, 0.78])}) rotate(${interpolate(logoIn, [0, 1], [-18, 0]) + interpolate(logoOut, [0, 1], [0, 14])}deg)`,
                        opacity: logoIn * (1 - logoOut),
                    }}
                >
                    <Img src={logoPapelcool} className="intro-v3-logo" alt="Papelcool" />
                </div>

                <div
                    style={{
                        textAlign: 'center',
                        marginBottom: '0.5rem',
                        transform: `translateX(${interpolate(titleIn, [0, 1], [120, titleDriftX])}px) translateY(${interpolate(titleIn, [0, 1], [-65, titleFloat])}px) scale(${titleScale * interpolate(titleOut, [0, 1], [1, 0.84])}) rotate(${interpolate(titleIn, [0, 1], [7, 0]) + titleTilt + interpolate(titleOut, [0, 1], [0, -8])}deg)`,
                        opacity: titleIn * (1 - titleOut),
                    }}
                >
                    <div className="intro-v3-title-1" style={{ color: 'var(--kq-charcoal)', textShadow: '3px 3px 0 rgba(0,0,0,0.1)' }}>
                        TRIVIA
                    </div>
                    <div
                        className="intro-v3-title-2"
                        style={{ display: 'inline-block', transform: `rotate(${wiggle}deg)` }}
                    >
                        <span style={{ color: 'var(--kq-amber)', textShadow: '4px 4px 0 #000000, -4px -4px 0 #000000, 4px -4px 0 #000000, -4px 4px 0 #000000, 0px 4px 0 #000000, 0px -4px 0 #000000, 4px 0px 0 #000000, -4px 0px 0 #000000' }}>GEOMETRY DASH</span>
                    </div>
                    <div
                        className="intro-v3-title-2 intro-v3-title-subtitle"
                        style={{ display: 'inline-block', marginLeft: '1rem', transform: `translateY(${Math.cos(frame / 18) * 4}px)`, fontSize: '4rem', color: 'var(--kq-charcoal)', opacity: 0.7 }}
                    >
                        {t.subtitle}
                    </div>
                </div>

                <div
                    className="intro-v3-pill"
                    style={{
                        transform: `translateX(${interpolate(pillIn, [0, 1], [-140, 0])}px) translateY(${interpolate(pillIn, [0, 1], [25, pillFloat])}px) scale(${pillScale * interpolate(pillOut, [0, 1], [1, 0.88])}) rotate(${interpolate(pillIn, [0, 1], [-6, 0]) + Math.sin(frame / 25) * 1.2 + interpolate(pillOut, [0, 1], [0, 5])}deg)`,
                        opacity: pillIn * (1 - pillOut),
                    }}
                >
                    <span className="intro-v3-pill-text">{t.questionsLabel(layout === 'vertical' ? 5 : 30)}</span>
                    <span
                        className="intro-v3-pill-text intro-v3-time-text"
                        style={{ fontSize: '1.8rem', textShadow: '3px 3px 0 #000000, -3px -3px 0 #000000, 3px -3px 0 #000000, -3px 3px 0 #000000, 0px 3px 0 #000000, 0px -3px 0 #000000, 3px 0px 0 #000000, -3px 0px 0 #000000', transform: `translateY(${Math.sin(frame / 16) * 2}px)` }}
                    >
                        {t.timeLabel}
                    </span>
                </div>

                {layout === 'vertical' ? (
                    <div
                        className="intro-v3-panel"
                        style={{
                            transform: `translateX(${interpolate(panelIn, [0, 1], [120, 0])}px) translateY(${interpolate(panelIn, [0, 1], [50, panelFloat])}px) scale(${panelScale * interpolate(panelOut, [0, 1], [1, 0.85])}) rotate(${interpolate(panelIn, [0, 1], [5, 0]) + Math.sin(frame / 29) * 1.4 + interpolate(panelOut, [0, 1], [0, -6])}deg)`,
                            opacity: panelIn * (1 - panelOut),
                            justifyContent: 'center',
                            gap: '1rem',
                            padding: '2rem',
                        }}
                    >
                        <span className="intro-v3-emoji wiggle" style={{ fontSize: '6rem', transform: `translateY(${Math.sin(frame / 11) * 6}px) rotate(${Math.sin(frame / 8) * 4}deg)` }}>✨</span>
                        <span style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--kq-charcoal)', textAlign: 'center', transform: `translateY(${Math.cos(frame / 18) * 3}px)` }}>
                            {t.verticalScore}
                        </span>
                    </div>
                ) : (
                    <div
                        className="intro-v3-panel"
                        style={{
                            transform: `translateX(${interpolate(panelIn, [0, 1], [0, 0])}px) translateY(${interpolate(panelIn, [0, 1], [70, panelFloat])}px) scale(${panelScale * interpolate(panelOut, [0, 1], [1, 0.85])}) rotate(${Math.sin(frame / 32) * 0.8 + interpolate(panelOut, [0, 1], [0, -5])}deg)`,
                            opacity: panelIn * (1 - panelOut),
                        }}
                    >
                        <div
                            className="intro-v3-panel-item"
                            style={{
                                transform: `translateX(${interpolate(itemAIn, [0, 1], [-100, 0])}px) translateY(${Math.sin(frame / 18) * 4}px) scale(${interpolate(itemAIn, [0, 1], [0.78, 1])}) rotate(${interpolate(itemAIn, [0, 1], [-8, 0]) + Math.sin(frame / 19) * 1.2}deg)`,
                                opacity: itemAIn,
                            }}
                        >
                            <span className="intro-v3-emoji wiggle">🤔</span>
                            <span className="intro-v3-score">+8</span>
                            <span className="intro-v3-rank">{t.casualRank}</span>
                        </div>

                        <div className="intro-v3-divider" />

                        <div
                            className="intro-v3-panel-item"
                            style={{
                                transform: `translateY(${Math.cos(frame / 17) * 4}px) scale(${interpolate(itemBIn, [0, 1], [0.82, 1])}) rotate(${Math.sin(frame / 20) * 1.1}deg)`,
                                opacity: itemBIn,
                            }}
                        >
                            <span className="intro-v3-emoji wiggle">🎤</span>
                            <span className="intro-v3-score">+18</span>
                            <span className="intro-v3-rank">{t.fanRank}</span>
                        </div>

                        <div className="intro-v3-divider" />

                        <div
                            className="intro-v3-panel-item"
                            style={{
                                transform: `translateX(${interpolate(itemCIn, [0, 1], [100, 0])}px) translateY(${Math.sin(frame / 21) * 4}px) scale(${interpolate(itemCIn, [0, 1], [0.78, 1])}) rotate(${interpolate(itemCIn, [0, 1], [8, 0]) - Math.sin(frame / 22) * 1.2}deg)`,
                                opacity: itemCIn,
                            }}
                        >
                            <span className="intro-v3-emoji wiggle">✨</span>
                            <span className="intro-v3-score">+28</span>
                            <span className="intro-v3-rank">{t.topRank}</span>
                        </div>
                    </div>
                )}

                <div style={{ position: 'relative', display: 'inline-block' }}>
                    <div
                        className="intro-v3-start-btn"
                        style={{
                            transform: `translateX(${interpolate(buttonIn, [0, 1], [0, 0])}px) translateY(${interpolate(buttonIn, [0, 1], [85, Math.sin(frame / 14) * 5])}px) scale(${buttonScale * heartbeat * interpolate(buttonOut, [0, 1], [1, 0.78])}) rotate(${interpolate(buttonIn, [0, 1], [-7, 0]) + Math.sin(frame / 15) * 1.8 + interpolate(buttonOut, [0, 1], [0, 9])}deg)`,
                            opacity: buttonIn * (1 - buttonOut),
                            position: 'relative',
                        }}
                    >
                        {t.startButton}
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};
