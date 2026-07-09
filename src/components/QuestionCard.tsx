import { AbsoluteFill, Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { Question } from '../questions';

import { SECONDS_PER_QUESTION } from '../constants';

interface QuestionCardProps {
    question: Question;
    questionNumber: number | string;
    layout: 'horizontal' | 'vertical';
    lang?: 'es' | 'en';
}

const AUDIO_RING_PALETTES = [
    {primary: '#ff4fa3', secondary: '#ffcf2f'},
    {primary: '#34d399', secondary: '#60a5fa'},
    {primary: '#fb7185', secondary: '#f59e0b'},
    {primary: '#a78bfa', secondary: '#22d3ee'},
    {primary: '#f97316', secondary: '#facc15'},
    {primary: '#2dd4bf', secondary: '#f472b6'},
];

const truncateRevealTitle = (title: string, maxChars: number) => {
    if (title.length <= maxChars) {
        return title;
    }

    const shortened = title.slice(0, maxChars).trimEnd();
    const lastSpace = shortened.lastIndexOf(' ');

    if (lastSpace > Math.floor(maxChars * 0.55)) {
        return `${shortened.slice(0, lastSpace)}...`;
    }

    return `${shortened}...`;
};

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, questionNumber, layout, lang = 'es' }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const numericQuestionNumber = typeof questionNumber === 'number'
        ? questionNumber
        : Number.parseInt(String(questionNumber), 10) || 1;
    const ringPalette = AUDIO_RING_PALETTES[(numericQuestionNumber - 1) % AUDIO_RING_PALETTES.length];

    const duration = SECONDS_PER_QUESTION * fps;
    const LISTEN_END_FRAME = 3 * fps;
    const THINK_END_FRAME = 8 * fps;
    const REVEAL_START_FRAME = THINK_END_FRAME;
    const EXIT_START_FRAME = duration - 24;

    const isListening = frame < LISTEN_END_FRAME;
    const isThinking = frame >= LISTEN_END_FRAME && frame < THINK_END_FRAME;
    const isRevealed = frame >= REVEAL_START_FRAME;

    const stagedEnter = (start: number, durationFrames = 18) =>
        interpolate(frame, [start, start + durationFrames], [0, 1], {
            easing: Easing.bezier(0.18, 1, 0.3, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
        });

    const headerEntrance = stagedEnter(0, 18);
    const bodyEntrance = stagedEnter(8, 22);

    const exitProgress = interpolate(frame, [EXIT_START_FRAME, duration], [0, 1], {
        easing: Easing.bezier(0.7, 0, 0.84, 0),
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const contentScale = interpolate(exitProgress, [0, 1], [1, 0.86]);
    const contentOpacity = interpolate(exitProgress, [0, 1], [1, 0]);
    const contentX = interpolate(exitProgress, [0, 1], [0, -70]);
    const contentY = interpolate(exitProgress, [0, 1], [0, -28]);
    const contentRotate = interpolate(exitProgress, [0, 1], [0, -4]);

    const headerScale = interpolate(headerEntrance, [0, 0.78, 1], [0.84, 1.03, 1]);
    const headerOpacity = interpolate(headerEntrance, [0, 1], [0, 1]);
    const headerY = interpolate(headerEntrance, [0, 1], [-45, 0]);
    const bodyOpacity = interpolate(bodyEntrance, [0, 1], [0, 1]);
    const bodyScale = interpolate(bodyEntrance, [0, 0.75, 1], [0.82, 1.03, 1]);
    const bodyY = interpolate(bodyEntrance, [0, 1], [55, 0]);

    const timerProgress = interpolate(frame, [LISTEN_END_FRAME, THINK_END_FRAME], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const timerWidth = `${Math.max(timerProgress, 0.02) * 100}%`;
    const timerRed = Math.round(interpolate(timerProgress, [0, 1], [255, 120], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    }));
    const timerGreen = Math.round(interpolate(timerProgress, [0, 1], [59, 214], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    }));
    const timerBlue = Math.round(interpolate(timerProgress, [0, 1], [48, 60], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    }));
    const timerColor = `rgb(${timerRed}, ${timerGreen}, ${timerBlue})`;
    const timerOpacity = isThinking
        ? interpolate(frame, [LISTEN_END_FRAME, LISTEN_END_FRAME + 12], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
          })
        : 0;
    const timerGlow = isThinking ? 14 + Math.sin(frame / 4) * 6 : 0;

    const revealPop = spring({
        frame: frame - REVEAL_START_FRAME,
        fps,
        config: { damping: 9, stiffness: 200, mass: 0.4 },
    });
    const revealScale = isRevealed ? interpolate(revealPop, [0, 1], [0.92, 1.04]) : 1;
    const revealPulse = isRevealed ? 1 + Math.sin(frame / 12) * 0.02 : 1;
    const revealTitleFloatY = isRevealed ? Math.sin(frame / 11) * 12 + Math.cos(frame / 19) * 5 : 0;
    const revealTitleRotate = isRevealed ? Math.sin(frame / 18) * 1.6 : 0;
    const revealTitleScale = isRevealed
        ? interpolate(revealPop, [0, 1], [0.88, 1.02]) + Math.sin(frame / 14) * 0.015
        : 1;
    const revealTitleMaxChars = layout === 'vertical' ? 22 : 26;
    const revealTitle = truncateRevealTitle(question.title, revealTitleMaxChars);
    const revealTitleLength = revealTitle.length;
    const revealTitleFontSize = layout === 'vertical'
        ? revealTitleLength > 18 ? '4.1rem' : '4.4rem'
        : revealTitleLength > 22 ? '6.2rem' : '6.8rem';

    const vinylPulseBase = isListening ? 1 : isThinking ? 0.97 : 1.02;
    const vinylPulse = vinylPulseBase + Math.sin(frame / 5) * (isListening ? 0.035 : 0.018);
    const ringRotation = frame * (isListening ? 1.9 : isThinking ? 0.8 : 1.2);
    const ringAccent = isListening ? ringPalette.primary : isThinking ? ringPalette.secondary : 'var(--kq-green)';

    const headerTitle = isRevealed
        ? (lang === 'en' ? 'The song is...' : 'La canción es...')
        : isThinking
            ? (lang === 'en' ? 'Time to think' : 'Tiempo para pensar')
            : (lang === 'en' ? 'Listen closely' : 'Escucha bien');



    const centerCardWidth = layout === 'vertical' ? 880 : 1900;

    const phaseTransitionProgress = isRevealed
        ? interpolate(frame, [REVEAL_START_FRAME, REVEAL_START_FRAME + 12], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
          })
        : 0;

    const showListenThink = frame < REVEAL_START_FRAME + 12;
    const showReveal = frame >= REVEAL_START_FRAME;

    const listenThinkOpacity = isRevealed ? 1 - phaseTransitionProgress : 1;
    const listenThinkBlur = isRevealed ? phaseTransitionProgress * 24 : 0;
    const listenThinkScale = isRevealed ? 1 + phaseTransitionProgress * 0.1 : 1;

    const revealOpacity = phaseTransitionProgress;
    const revealBlur = (1 - phaseTransitionProgress) * 24;

    const headerEntranceBlur = (1 - headerEntrance) * 14;
    const bodyEntranceBlur = (1 - bodyEntrance) * 14;
    const cardExitBlur = exitProgress > 0 && exitProgress < 1 ? Math.sin(exitProgress * Math.PI) * 16 : 0;

    const headerBlur = headerEntranceBlur + cardExitBlur;
    const generalBodyBlur = bodyEntranceBlur + cardExitBlur;

    return (
        <AbsoluteFill
            className={`question-card-fill ${layout === 'vertical' ? 'vertical' : ''}`}
            style={{ overflow: 'hidden' }}
        >
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    transform: `translateX(${contentX}px) translateY(${contentY}px) scale(${contentScale}) rotate(${contentRotate}deg)`,
                    opacity: contentOpacity,
                }}
            >
                <div
                    className={`question-header-container ${isRevealed ? 'revealed' : ''}`}
                    style={{
                        position: 'absolute',
                        top: layout === 'vertical' ? '120px' : '80px',
                        left: '50%',
                        transform: `translateX(-50%) translateY(${headerY}px) scale(${headerScale})`,
                        opacity: headerOpacity,
                        filter: headerBlur > 0.1 ? `blur(${headerBlur}px)` : undefined,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: isRevealed ? 'var(--kq-green)' : 'var(--kq-amber)',
                        borderColor: isRevealed ? 'var(--kq-green-deep)' : 'var(--kq-outline)',
                        padding: '18px 45px',
                        zIndex: 20,
                    }}
                >
                    <div
                        className={`question-title ${isRevealed ? 'revealed' : ''}`}
                        style={{
                            fontSize: layout === 'vertical' ? '2.4rem' : '3.6rem',
                            color: isRevealed ? '#ffffff' : 'var(--kq-charcoal)',
                        }}
                    >
                        {headerTitle}
                    </div>
                </div>

                <div
                    className="question-number-circle"
                    style={{
                        position: 'absolute',
                        top: layout === 'vertical' ? '40px' : '35px',
                        right: layout === 'vertical' ? '45px' : '40px',
                        zIndex: 25,
                        width: layout === 'vertical' ? '110px' : '145px',
                        height: layout === 'vertical' ? '110px' : '145px',
                        fontSize: layout === 'vertical' ? '3.6rem' : '5.2rem',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        transform: `scale(${headerScale})`,
                        opacity: headerOpacity,
                        filter: headerBlur > 0.1 ? `blur(${headerBlur}px)` : undefined,
                    }}
                >
                    {questionNumber}
                </div>

                <div
                    style={{
                        position: 'absolute',
                        top: layout === 'vertical' ? '250px' : '205px',
                        bottom: layout === 'vertical' ? '210px' : '175px',
                        left: '40px',
                        right: '40px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 10,
                    }}
                >
                    {showListenThink && (
                        <div
                            style={{
                                position: 'absolute',
                                width: `${centerCardWidth}px`,
                                maxWidth: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: layout === 'vertical' ? '22px' : '28px',
                                transform: `translateY(${bodyY}px) scale(${bodyScale * listenThinkScale})`,
                                opacity: bodyOpacity * listenThinkOpacity,
                                filter: (generalBodyBlur + listenThinkBlur) > 0.1 ? `blur(${generalBodyBlur + listenThinkBlur}px)` : undefined,
                            }}
                        >
                            {isListening && (
                                <div
                                    style={{
                                        position: 'relative',
                                        width: layout === 'vertical' ? '560px' : '760px',
                                        height: layout === 'vertical' ? '560px' : '760px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {Array.from({length: 18}).map((_, index) => {
                                        const angle = (360 / 18) * index;
                                        const distance = layout === 'vertical' ? 214 : 286;
                                        const barHeight = (layout === 'vertical' ? 76 : 102) + Math.abs(Math.sin((frame / 7) + index)) * (layout === 'vertical' ? 68 : 92);
                                        return (
                                            <div
                                                key={index}
                                                style={{
                                                    position: 'absolute',
                                                    left: '50%',
                                                    top: '50%',
                                                    width: layout === 'vertical' ? '22px' : '32px',
                                                    height: `${barHeight}px`,
                                                    borderRadius: '999px',
                                                    background: index % 2 === 0 ? ringPalette.secondary : ringPalette.primary,
                                                    border: '3px solid #000000',
                                                    opacity: 0.92,
                                                    transform: `translate(-50%, -50%) rotate(${angle + ringRotation}deg) translateY(-${distance}px)`,
                                                    transformOrigin: 'center center',
                                                }}
                                            />
                                        );
                                    })}

                                    {/* DETAILED SVG VINYL RECORD */}
                                    <svg
                                        width={layout === 'vertical' ? 392 : 520}
                                        height={layout === 'vertical' ? 392 : 520}
                                        viewBox="0 0 200 200"
                                        style={{
                                            position: 'absolute',
                                            transform: `scale(${vinylPulse})`,
                                            filter: 'drop-shadow(0 24px 60px rgba(0,0,0,0.32))',
                                            overflow: 'visible',
                                        }}
                                    >
                                        {/* Entire disc rotates as one unit */}
                                        <g transform={`rotate(${-ringRotation} 100 100)`}>
                                            {/* Outer rim */}
                                            <circle cx="100" cy="100" r="99" fill="none" stroke="#000000" strokeWidth="3" />
                                            <circle cx="100" cy="100" r="97.5" fill="none" stroke="#ffffff" strokeWidth="2" />

                                            {/* Main vinyl body */}
                                            <circle cx="100" cy="100" r="96" fill="#161616" stroke="#0e0e0e" strokeWidth="1" />

                                            {/* Concentric grooves */}
                                            {[92, 88, 84, 80, 76, 72, 68, 64, 60, 56, 52, 48].map((r, i) => (
                                                <circle key={i} cx="100" cy="100" r={r}
                                                    fill="none" stroke="rgba(255, 255, 255, 0.06)"
                                                    strokeWidth={i % 3 === 0 ? '0.9' : '0.45'}
                                                />
                                            ))}

                                            {/* Light sheen wedges (rotate with the disc) */}
                                            <path d="M 100 100 L 45 -5 A 110 110 0 0 1 155 -5 Z"
                                                fill="rgba(255, 255, 255, 0.07)" />
                                            <path d="M 100 100 L 155 205 A 110 110 0 0 1 45 205 Z"
                                                fill="rgba(255, 255, 255, 0.07)" />

                                            {/* Paper center label */}
                                            <circle cx="100" cy="100" r="38" fill={ringAccent}
                                                stroke="#ffffff" strokeWidth="3.5" />
                                            <circle cx="100" cy="100" r="32" fill="none"
                                                stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1.5"
                                                strokeDasharray="4 2" />
                                            <circle cx="100" cy="100" r="22" fill="none"
                                                stroke="rgba(0, 0, 0, 0.15)" strokeWidth="1" />
                                        </g>

                                        {/* Center spindle hole (stays static) */}
                                        <circle cx="100" cy="100" r="8" fill="#ffffff"
                                            stroke="#000000" strokeWidth="3.5" />
                                    </svg>
                                </div>
                            )}

                            {isThinking && (
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '100%',
                                        minHeight: layout === 'vertical' ? '340px' : '420px',
                                        textAlign: 'center',
                                        padding: layout === 'vertical' ? '0 40px' : '0 80px',
                                    }}
                                >
                                    <div
                                        style={{
                                            fontFamily: "'DynaPuff', sans-serif",
                                            fontSize: layout === 'vertical' ? '5.4rem' : '8.5rem',
                                            lineHeight: 1,
                                            color: '#ffffff',
                                            textTransform: 'uppercase',
                                            fontWeight: 900,
                                            textShadow: '5px 5px 0 #000000, -5px -5px 0 #000000, 5px -5px 0 #000000, -5px 5px 0 #000000, 0 5px 0 #000000, 0 -5px 0 #000000, 5px 0 0 #000000, -5px 0 0 #000000',
                                            transform: `translateY(${Math.sin(frame / 10) * 10 + Math.cos(frame / 21) * 4}px) rotate(${Math.sin(frame / 15) * 1.5}deg) scale(${interpolate(bodyEntrance, [0, 0.8, 1], [0.82, 1.05, 1]) * interpolate(exitProgress, [0, 1], [1, 0.9])})`,
                                            opacity: bodyOpacity * interpolate(exitProgress, [0, 1], [1, 0]),
                                        }}
                                    >
                                        {lang === 'en' ? 'What song is it?' : '¿Que cancion es?'}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {showReveal && (
                        <div
                            style={{
                                position: 'absolute',
                                width: layout === 'vertical' ? '100%' : '2100px',
                                maxWidth: '100%',
                                display: 'flex',
                                flexDirection: layout === 'vertical' ? 'column' : 'row',
                                alignItems: 'center',
                                justifyContent: layout === 'vertical' ? 'center' : 'space-between',
                                gap: layout === 'vertical' ? '34px' : '120px',
                                padding: layout === 'vertical' ? '42px' : '30px 120px',
                                opacity: revealOpacity,
                                filter: (generalBodyBlur + revealBlur) > 0.1 ? `blur(${generalBodyBlur + revealBlur}px)` : undefined,
                            }}
                        >
                            <div
                                style={{
                                    width: layout === 'vertical' ? '450px' : '760px',
                                    height: layout === 'vertical' ? '450px' : '760px',
                                    borderRadius: layout === 'vertical' ? '38px' : '42px',
                                    overflow: 'hidden',
                                    flexShrink: 0,
                                    background: '#f4f4f4',
                                    boxShadow: '0 18px 42px rgba(0,0,0,0.18)',
                                    transform: `scale(${revealScale * revealPulse})`,
                                }}
                            >
                                <Img
                                    src={staticFile(question.image)}
                                    alt={question.title}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                            </div>

                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                    width: layout === 'vertical' ? '100%' : '820px',
                                    maxWidth: layout === 'vertical' ? '100%' : '820px',
                                    minWidth: layout === 'vertical' ? undefined : '820px',
                                    minHeight: layout === 'vertical' ? 'auto' : '760px',
                                    padding: layout === 'vertical' ? '0 20px' : '0 30px',
                                }}
                            >
                                <div
                                    style={{
                                        fontFamily: "'DynaPuff', sans-serif",
                                        fontSize: revealTitleFontSize,
                                        lineHeight: 1.05,
                                        color: '#ffffff',
                                        textShadow: '5px 5px 0 #000000, -5px -5px 0 #000000, 5px -5px 0 #000000, -5px 5px 0 #000000, 0 5px 0 #000000, 0 -5px 0 #000000, 5px 0 0 #000000, -5px 0 0 #000000',
                                        transform: `translateY(${revealTitleFloatY}px) rotate(${revealTitleRotate}deg) scale(${revealTitleScale})`,
                                        width: '100%',
                                        overflowWrap: 'anywhere',
                                    }}
                                >
                                    {revealTitle}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div
                    className="timer-container"
                    style={{
                        position: 'absolute',
                        bottom: layout === 'vertical' ? '125px' : '105px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: layout === 'vertical' ? '960px' : '2360px',
                        height: layout === 'vertical' ? '35px' : '45px',
                        border: layout === 'vertical' ? '4px solid #000000' : '5px solid #000000',
                        borderRadius: '50px',
                        background: 'rgba(255, 255, 255, 0.36)',
                        overflow: 'hidden',
                        zIndex: 100,
                        opacity: timerOpacity,
                    }}
                >
                    <div
                        className="timer-bar"
                        style={{
                            width: timerWidth,
                            height: '100%',
                            background: timerColor,
                            boxShadow: `0 0 ${timerGlow}px ${timerColor}`,
                        }}
                    />
                </div>

            </div>
        </AbsoluteFill>
    );
};
