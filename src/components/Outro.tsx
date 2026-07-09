import { AbsoluteFill, staticFile, useCurrentFrame, interpolate, useVideoConfig, Img, Easing } from 'remotion';
import { promoQrImage } from '../promo';
import qrArrow from '../assets/qr-arrow.svg';

// Translations for multi-language support
const TRANSLATIONS = {
    es: {
        title: '¿CUÁNTAS\nACERTASTE?',
        commentText: 'Comenta cuántas acertaste',
        ctaButton: '¡SUSCRÍBETE!',
        supportText: 'entra aquí para apoyar el canal',
    },
    en: {
        title: 'HOW MANY\nDID YOU GET?',
        commentText: 'Comment how many you got right',
        ctaButton: 'SUBSCRIBE!',
        supportText: 'go here to support the channel',
    },
} as const;

interface OutroProps {
    lang?: 'es' | 'en';
}


export const Outro: React.FC<OutroProps> = ({ lang = 'es' }) => {
    const frame = useCurrentFrame();
    const { durationInFrames } = useVideoConfig();
    const t = TRANSLATIONS[lang];
    const supportText = t.supportText;

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

    const EXIT_START = durationInFrames - 34;

    const logoIn = enter(0, 22);
    const titleLine1In = enter(8, 22);
    const titleLine2In = enter(16, 22);
    const panelIn = enter(28, 22);
    const buttonIn = enter(44, 22);

    const buttonOut = exit(EXIT_START, 14);
    const panelOut = exit(EXIT_START + 5, 14);
    const titleLine2Out = exit(EXIT_START + 10, 14);
    const titleLine1Out = exit(EXIT_START + 15, 14);
    const logoOut = exit(EXIT_START + 22, 14);

    const logoFloat = Math.sin(frame / 36) * 8 + Math.cos(frame / 20) * 3;
    const titleFloat = Math.sin(frame / 21) * 7 + Math.cos(frame / 33) * 3;
    const panelBob = Math.sin(frame / 24) * 6 + Math.cos(frame / 16) * 2;
    const buttonPulse = 1 + Math.sin(frame / 8) * 0.035;
    const buttonSway = Math.sin(frame / 18) * 1.8;
    const titleTilt = Math.sin(frame / 29) * 1.4;
    const calloutTextFloat = Math.sin(frame / 28) * 6 + Math.cos(frame / 47) * 3;
    const calloutTextTilt = Math.sin(frame / 36) * 2.4;
    const calloutTextScale = 1 + Math.sin(frame / 31) * 0.025;
    const calloutArrowFloatX = Math.sin(frame / 24) * 10;
    const calloutArrowFloatY = Math.cos(frame / 19) * 7;
    const calloutArrowTilt = Math.cos(frame / 27) * 5;
    const calloutArrowScale = 1 + Math.sin(frame / 17) * 0.045;

    const titleLines = t.title.split('\n');

    return (
        <AbsoluteFill style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="outro-v3-container" style={{ zIndex: 2, position: 'relative' }}>
                <div
                    className="outro-qr-corner"
                    style={{
                        opacity: panelIn * (1 - panelOut),
                        transform: `translateY(${interpolate(panelIn, [0, 1], [-24, Math.sin(frame / 20) * 4])}px) scale(${interpolate(panelIn, [0, 0.75, 1], [0.84, 1.02, 1]) * interpolate(panelOut, [0, 1], [1, 0.86])})`,
                    }}
                >
                    <div className="outro-qr-callout">
                        <div
                            className="outro-qr-callout-text"
                            style={{
                                transform: `translateY(${calloutTextFloat}px) rotate(${calloutTextTilt}deg) scale(${calloutTextScale})`,
                            }}
                        >
                            {supportText}
                        </div>
                        <Img
                            src={qrArrow}
                            alt=""
                            className="outro-qr-arrow"
                            style={{
                                transform: `rotate(180deg) translate(${calloutArrowFloatX}px, ${calloutArrowFloatY}px) rotate(${calloutArrowTilt}deg) scale(${calloutArrowScale})`,
                            }}
                        />
                    </div>
                    <div className="outro-qr-frame">
                        <Img src={promoQrImage} alt="QR Papelcool" className="outro-qr-image" />
                    </div>
                </div>

                <div
                    style={{
                        transform: `translateX(${interpolate(logoIn, [0, 1], [90, Math.sin(frame / 28) * 6])}px) translateY(${interpolate(logoIn, [0, 1], [-35, logoFloat])}px) scale(${interpolate(logoIn, [0, 0.78, 1], [0.74, 1.04, 1]) * interpolate(logoOut, [0, 1], [1, 0.8])}) rotate(${interpolate(logoIn, [0, 1], [14, 0]) + interpolate(logoOut, [0, 1], [0, -12])}deg)`,
                        opacity: logoIn * (1 - logoOut),
                    }}
                >
                    <Img
                        src={staticFile('logo_papelcool.svg')}
                        className="outro-v3-logo"
                        alt="Papelcool"
                    />
                </div>

                <h1
                    className="outro-v3-title"
                    style={{ margin: 0, transformOrigin: 'center' }}
                >
                    <span
                        style={{
                            display: 'block',
                            transform: `translateX(${interpolate(titleLine1In, [0, 1], [-180, Math.sin(frame / 31) * 10])}px) translateY(${interpolate(titleLine1In, [0, 1], [-45, titleFloat * 0.75])}px) scale(${interpolate(titleLine1In, [0, 0.72, 1], [0.8, 1.03, 1]) * interpolate(titleLine1Out, [0, 1], [1, 0.86])}) rotate(${interpolate(titleLine1In, [0, 1], [-6, 0]) + titleTilt + interpolate(titleLine1Out, [0, 1], [0, 8])}deg)`,
                            opacity: titleLine1In * (1 - titleLine1Out),
                            color: 'var(--kq-charcoal)',
                        }}
                    >
                        {titleLines[0]}
                    </span>
                    <span
                        style={{
                            display: 'block',
                            transform: `translateX(${interpolate(titleLine2In, [0, 1], [180, Math.cos(frame / 26) * 10])}px) translateY(${interpolate(titleLine2In, [0, 1], [35, titleFloat])}px) scale(${interpolate(titleLine2In, [0, 0.72, 1], [0.8, 1.03, 1]) * interpolate(titleLine2Out, [0, 1], [1, 0.84])}) rotate(${interpolate(titleLine2In, [0, 1], [6, 0]) - titleTilt + interpolate(titleLine2Out, [0, 1], [0, -8])}deg)`,
                            opacity: titleLine2In * (1 - titleLine2Out),
                            color: 'var(--kq-amber)',
                            textShadow: '4px 4px 0 #000000, -4px -4px 0 #000000, 4px -4px 0 #000000, -4px 4px 0 #000000, 0px 4px 0 #000000, 0px -4px 0 #000000, 4px 0px 0 #000000, -4px 0px 0 #000000',
                        }}
                    >
                        {titleLines[1]}
                    </span>
                </h1>

                <div
                    className="outro-v3-panel"
                    style={{
                        transform: `translateX(${interpolate(panelIn, [0, 1], [-110, 0])}px) translateY(${interpolate(panelIn, [0, 1], [65, panelBob])}px) scale(${interpolate(panelIn, [0, 0.75, 1], [0.84, 1.03, 1]) * interpolate(panelOut, [0, 1], [1, 0.84])}) rotate(${interpolate(panelIn, [0, 1], [-5, 0]) + Math.sin(frame / 25) * 1.2 + interpolate(panelOut, [0, 1], [0, 6])}deg)`,
                        opacity: panelIn * (1 - panelOut),
                    }}
                >
                    <span className="wiggle" style={{ fontSize: '5rem', transform: `translateY(${Math.sin(frame / 12) * 5}px) rotate(${Math.sin(frame / 8) * 4}deg)` }}>💬</span>
                    <span
                        className="outro-v3-panel-text"
                        style={{
                            transform: `translateY(${Math.cos(frame / 17) * 3}px)`,
                            color: 'var(--kq-charcoal)',
                            textShadow: 'none',
                        }}
                    >
                        {t.commentText}
                    </span>
                </div>

                <div style={{ position: 'relative', display: 'inline-block' }}>
                    <button
                        className="outro-v3-cta-btn"
                        style={{
                            transform: `translateY(${interpolate(buttonIn, [0, 1], [90, Math.sin(frame / 15) * 5])}px) scale(${interpolate(buttonIn, [0, 0.75, 1], [0.76, 1.05, 1]) * buttonPulse * interpolate(buttonOut, [0, 1], [1, 0.76])}) rotate(${interpolate(buttonIn, [0, 1], [7, 0]) + buttonSway + interpolate(buttonOut, [0, 1], [0, -10])}deg)`,
                            opacity: buttonIn * (1 - buttonOut),
                            position: 'relative',
                        }}
                    >
                        {t.ctaButton}
                    </button>
                </div>

            </div>
        </AbsoluteFill>
    );
};
