import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig, Img, Easing } from 'remotion';
import logoPapelcool from '../assets/logo_papelcool.svg';
import { HORIZONTAL_DESIGN_WIDTH } from '../constants';

let measurementCanvas: HTMLCanvasElement | null = null;

const measureTextWidth = (text: string, fontSizePx: number, fontWeight: number) => {
    if (typeof document === 'undefined') {
        return text.length * fontSizePx * 0.62;
    }

    measurementCanvas ??= document.createElement('canvas');
    const context = measurementCanvas.getContext('2d');

    if (!context) {
        return text.length * fontSizePx * 0.62;
    }

    context.font = `${fontWeight} ${fontSizePx}px Arial`;
    return context.measureText(text).width;
};

// Translations for multi-language support
const TRANSLATIONS = {
    es: {
        title: 'BAD BUNNY',
        subtitle: 'ADIVINALA EN 3 SEGUNDOS',
        questionsLabel: (n: number) => `${n} canciones para reconocer`,
        verticalScore: '5/5 = oido de oro',
        startButton: '¡DALE PLAY AL RETO!',
        stepOne: 'ESCUCHA',
        stepTwo: 'PIENSA',
        stepThree: 'REVEAL',
    },
    en: {
        title: 'BAD BUNNY',
        subtitle: 'GUESS IT IN 3 SECONDS',
        questionsLabel: (n: number) => `${n} songs to recognize`,
        verticalScore: '5/5 = golden ear',
        startButton: 'START THE AUDIO CHALLENGE!',
        stepOne: 'LISTEN',
        stepTwo: 'THINK',
        stepThree: 'REVEAL',
    },
} as const;

interface IntroProps {
    layout?: 'horizontal' | 'vertical';
    lang?: 'es' | 'en';
    questionCount?: number;
}


export const Intro: React.FC<IntroProps> = ({ layout = 'horizontal', lang = 'es', questionCount = 63 }) => {
    const frame = useCurrentFrame();
    const { durationInFrames, width } = useVideoConfig();
    const t = TRANSLATIONS[lang];
    const effectiveWidth = layout === 'horizontal' ? HORIZONTAL_DESIGN_WIDTH : width;

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

    const scoreItems = [
        { emoji: '🎧', score: '3s', rank: t.stepOne, inProgress: itemAIn, transform: `translateX(${interpolate(itemAIn, [0, 1], [-100, 0])}px) translateY(${Math.sin(frame / 18) * 4}px) scale(${interpolate(itemAIn, [0, 1], [0.78, 1])}) rotate(${interpolate(itemAIn, [0, 1], [-8, 0]) + Math.sin(frame / 19) * 1.2}deg)` },
        { emoji: '⏱️', score: '5s', rank: t.stepTwo, inProgress: itemBIn, transform: `translateY(${Math.cos(frame / 17) * 4}px) scale(${interpolate(itemBIn, [0, 1], [0.82, 1])}) rotate(${Math.sin(frame / 20) * 1.1}deg)` },
        { emoji: '💿', score: '5s', rank: t.stepThree, inProgress: itemCIn, transform: `translateX(${interpolate(itemCIn, [0, 1], [100, 0])}px) translateY(${Math.sin(frame / 21) * 4}px) scale(${interpolate(itemCIn, [0, 1], [0.78, 1])}) rotate(${interpolate(itemCIn, [0, 1], [8, 0]) - Math.sin(frame / 22) * 1.2}deg)` },
    ];

    const panelItemWidths = scoreItems.map((item) => {
        const rankWidth = measureTextWidth(item.rank, 19, 700);
        const scoreWidth = measureTextWidth(item.score, 54, 900);
        return Math.max(360, Math.ceil(rankWidth + scoreWidth + 220));
    });
    const panelGap = 16;
    const dividerWidth = 2;
    const dividerCount = scoreItems.length - 1;
    const totalMeasuredWidth = panelItemWidths.reduce((sum, itemWidth) => sum + itemWidth, 0)
        + (panelGap * dividerCount * 2)
        + (dividerWidth * dividerCount);
    const panelHorizontalPadding = 56;
    const maxPanelContentWidth = Math.min(1340, effectiveWidth * 0.92) - panelHorizontalPadding;
    const panelFitScale = Math.min(1, maxPanelContentWidth / totalMeasuredWidth);

    return (
        <AbsoluteFill style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                        marginBottom: '0.35rem',
                        transform: `translateX(${interpolate(titleIn, [0, 1], [120, titleDriftX])}px) translateY(${interpolate(titleIn, [0, 1], [-65, titleFloat])}px) scale(${titleScale * interpolate(titleOut, [0, 1], [1, 0.84])}) rotate(${interpolate(titleIn, [0, 1], [7, 0]) + titleTilt + interpolate(titleOut, [0, 1], [0, -8])}deg)`,
                        opacity: titleIn * (1 - titleOut),
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <div className="intro-v3-title-1" style={{ color: 'var(--kq-charcoal)', textShadow: '3px 3px 0 rgba(0,0,0,0.1)' }}>
                        TRIVIA
                    </div>
                    <div
                        className="intro-v3-title-2"
                        style={{ display: 'inline-block', transform: `rotate(${wiggle}deg)` }}
                    >
                        <span style={{ color: 'var(--kq-amber)', textShadow: '4px 4px 0 #000000, -4px -4px 0 #000000, 4px -4px 0 #000000, -4px 4px 0 #000000, 0px 4px 0 #000000, 0px -4px 0 #000000, 4px 0px 0 #000000, -4px 0px 0 #000000' }}>{t.title}</span>
                    </div>
                    <div
                        className="intro-v3-title-2 intro-v3-title-subtitle"
                        style={{
                            display: 'block',
                            marginTop: '0.45rem',
                            transform: `translateY(${Math.cos(frame / 18) * 4}px)`,
                            color: 'var(--kq-charcoal)',
                            opacity: 1,
                        }}
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
                    <span
                        className="intro-v3-pill-text"
                        style={{
                            fontSize: layout === 'vertical' ? '2.3rem' : '2.75rem',
                            lineHeight: 1.05,
                            textAlign: 'center',
                        }}
                    >
                        {t.questionsLabel(questionCount)}
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
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: `${panelGap}px`,
                                transform: `scale(${panelFitScale})`,
                                transformOrigin: 'center center',
                            }}
                        >
                            {scoreItems.map((item, index) => (
                                <div
                                    key={`${lang}-${item.score}-${item.rank}`}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        minWidth: 0,
                                        gap: `${panelGap}px`,
                                    }}
                                >
                                    <div
                                        className="intro-v3-panel-item"
                                        style={{
                                            width: `${panelItemWidths[index]}px`,
                                            transform: item.transform,
                                            opacity: item.inProgress,
                                        }}
                                    >
                                        <span className="intro-v3-emoji wiggle">{item.emoji}</span>
                                        <span className="intro-v3-score">{item.score}</span>
                                        <span className="intro-v3-rank">{item.rank}</span>
                                    </div>
                                    {index < scoreItems.length - 1 ? <div className="intro-v3-divider" /> : null}
                                </div>
                            ))}
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
