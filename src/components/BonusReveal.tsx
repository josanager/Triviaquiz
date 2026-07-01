import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

const TRANSLATIONS = {
    es: {
        title: 'PREGUNTA\nEXTRA',
    },
    en: {
        title: 'BONUS\nQUESTION',
    },
} as const;

export const BonusReveal: React.FC<{ lang: 'es' | 'en' }> = ({ lang }) => {
    const frame = useCurrentFrame();
    const { durationInFrames } = useVideoConfig();
    const t = TRANSLATIONS[lang];
    const lines = t.title.split('\n');

    const enter = interpolate(frame, [0, 10], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const exit = interpolate(frame, [Math.max(0, durationInFrames - 10), durationInFrames], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const pulse = 1 + Math.sin(frame / 6) * 0.035;
    const opacity = enter * (1 - exit);

    return (
        <AbsoluteFill
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'radial-gradient(circle at 50% 35%, rgba(255,230,0,0.24) 0%, rgba(255,76,148,0.18) 36%, rgba(0,0,0,0.12) 100%)',
                zIndex: 50,
                overflow: 'hidden',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(64,123,255,0.1) 50%, rgba(255,77,148,0.08) 100%)',
                    opacity,
                }}
            />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    width: '100%',
                    transform: `scale(${interpolate(enter, [0, 1], [0.86, 1]) * pulse * interpolate(exit, [0, 1], [1, 0.88])}) rotate(${Math.sin(frame / 12) * 1.2}deg)`,
                    opacity,
                    lineHeight: 0.82,
                }}
            >
                <div
                    style={{
                        fontFamily: 'DynaPuff, sans-serif',
                        fontWeight: 700,
                        fontSize: '10.8rem',
                        color: '#111111',
                        letterSpacing: '0.04em',
                        textShadow: '6px 6px 0 rgba(255,255,255,0.22)',
                    }}
                >
                    {lines[0]}
                </div>
                <div
                    style={{
                        fontFamily: 'DynaPuff, sans-serif',
                        fontWeight: 700,
                        fontSize: lang === 'es' ? '11.2rem' : '8.8rem',
                        color: '#ffe600',
                        letterSpacing: '0.04em',
                        textShadow: '6px 6px 0 #000000, -6px -6px 0 #000000, 6px -6px 0 #000000, -6px 6px 0 #000000, 0 6px 0 #000000, 0 -6px 0 #000000, 6px 0 0 #000000, -6px 0 0 #000000',
                    }}
                >
                    {lines[1]}
                </div>
            </div>
        </AbsoluteFill>
    );
};
