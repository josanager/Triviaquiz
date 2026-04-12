import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, Easing } from 'remotion';
import { Question } from '../questions';
import logoPapelcool from '../assets/logo_papelcool.svg';

interface QuestionCardProps {
    question: Question;
    questionNumber: number;
    layout: 'horizontal' | 'vertical';
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, questionNumber, layout }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // ── Timings ──────────────────────────────────────────────────────────────
    const REVEAL_FRAME = 10 * fps;   // Answer revealed at 10 seconds
    const URGENCY_START = REVEAL_FRAME - fps * 2; // Last 2 seconds: urgency mode
    const duration = 15 * fps;
    const exitFrame = duration - 24; // Start exit shortly before end

    const isRevealed = frame >= REVEAL_FRAME;

    // ── Timer progress (1 = full, 0 = empty) ─────────────────────────────────
    const progress = interpolate(frame, [8, REVEAL_FRAME], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Timer color: smooth sticker-green → sticker-yellow → sticker-pink transition via RGB interpolation
    const timerR = Math.round(interpolate(frame, [30, REVEAL_FRAME - fps * 3, REVEAL_FRAME], [46, 255, 255], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
    const timerG = Math.round(interpolate(frame, [30, REVEAL_FRAME - fps * 3, REVEAL_FRAME], [204, 230, 77], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
    const timerB = Math.round(interpolate(frame, [30, REVEAL_FRAME - fps * 3, REVEAL_FRAME], [113, 0, 148], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
    const timerLiveColor = `rgb(${timerR}, ${timerG}, ${timerB})`;
    const timerColor = isRevealed ? '#FF4D94' : timerLiveColor;

    // Urgency pulse: subtle scale oscillation in the last 2 seconds
    const urgencyIntensity = (!isRevealed && frame > URGENCY_START)
        ? interpolate(frame, [URGENCY_START, REVEAL_FRAME], [0, 0.05], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
        : 0;
    const urgencyPulse = 1 + Math.sin(frame / 3) * urgencyIntensity;

    // Timer glow: intensifies as time runs out
    const timerGlow = (!isRevealed && frame > URGENCY_START)
        ? interpolate(frame, [URGENCY_START, REVEAL_FRAME], [4, 24], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
        : 0;

    const timerEnter = interpolate(frame, [0, 18], [0, 1], {
        easing: Easing.bezier(0.18, 1, 0.3, 1),
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const timerExit = interpolate(frame, [duration - 18, duration], [0, 1], {
        easing: Easing.bezier(0.7, 0, 0.84, 0),
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const timerWidth = `${Math.max(progress, 0.015) * 100}%`;
    const timerOpacity = timerEnter * (1 - timerExit);

    const stagedEnter = (start: number, durationFrames = 18) =>
        interpolate(frame, [start, start + durationFrames], [0, 1], {
            easing: Easing.bezier(0.18, 1, 0.3, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
        });

    const headerEntrance = stagedEnter(0, 18);
    const imageEntrance = stagedEnter(8, 20);

    const optA = stagedEnter(22, 16);
    const optB = stagedEnter(29, 16);
    const optC = stagedEnter(36, 16);
    const optionEntrances = [optA, optB, optC];
    const timerEntrance = stagedEnter(43, 16);

    // ── Correct answer reveal: pop + continuous pulse ─────────────────────────
    const revealBounce = spring({
        frame: frame - REVEAL_FRAME,
        fps,
        config: { damping: 7, stiffness: 220, mass: 0.35 }, // overshoots = pop!
    });
    const correctPopScale = isRevealed
        ? interpolate(revealBounce, [0, 1], [1, 1.06])
        : 1;
    const correctPulse = isRevealed ? (1 + Math.sin(frame / 9) * 0.027) : 1;

    // Wrong answers: smooth animated fade to dim
    const wrongOpacity = isRevealed
        ? interpolate(frame, [REVEAL_FRAME, REVEAL_FRAME + 30], [1, 0.28], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
        : 1;



    // ── Card exit ─────────────────────────────────────────────────────────────
    const exitProgress = interpolate(frame, [exitFrame, duration], [0, 1], {
        easing: Easing.bezier(0.7, 0, 0.84, 0),
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const scaleExit = interpolate(exitProgress, [0, 1], [1, 0.84]);
    const opacityExit = interpolate(exitProgress, [0, 1], [1, 0]);
    const peelX = interpolate(exitProgress, [0, 1], [0, -70]);
    const peelY = interpolate(exitProgress, [0, 1], [0, -25]);
    const peelRotate = interpolate(exitProgress, [0, 1], [0, -5]);

    const headerScale = interpolate(headerEntrance, [0, 0.78, 1], [0.84, 1.03, 1]);
    const headerOpacity = interpolate(headerEntrance, [0, 1], [0, 1]);
    const headerY = interpolate(headerEntrance, [0, 1], [-45, 0]);
    const headerX = interpolate(headerEntrance, [0, 1], [-90, 0]);
    const headerTilt = interpolate(headerEntrance, [0, 1], [-7, 0]);

    const imageScale = interpolate(imageEntrance, [0, 0.75, 1], [0.72, 1.04, 1]);
    const imageRotate = interpolate(imageEntrance, [0, 1], [-16, 0]);
    const imageX = interpolate(imageEntrance, [0, 1], [-130, 0]);
    const imageY = interpolate(imageEntrance, [0, 1], [35, 0]);

    const contentScale = scaleExit;
    const contentOpacity = opacityExit;

    const swayBase = Math.sin(frame / 22) * 1.6;
    const swayAccent = Math.sin(frame / 7) * 0.45;
    const sway = swayBase + swayAccent;
    const imageFloat = Math.sin(frame / 17) * 8 + Math.cos(frame / 29) * 4;
    const headerFloat = Math.sin(frame / 20) * 4;
    const contentParallaxX = Math.sin(frame / 45) * 8;
    const contentParallaxY = Math.cos(frame / 34) * 5;
    const timerContainerX = interpolate(timerEntrance, [0, 1], [120, 0]);
    const timerContainerY = interpolate(timerEntrance, [0, 1], [28, 0]);
    const timerContainerScale = interpolate(timerEntrance, [0, 0.78, 1], [0.82, 1.04, 1]);
    const timerContainerRotate = interpolate(timerEntrance, [0, 1], [4, 0]);

    return (
        <AbsoluteFill
            className={`question-card-fill ${layout === 'vertical' ? 'vertical' : ''}`}
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: layout === 'vertical' ? 'flex-start' : 'center',
                alignItems: 'center',
                boxSizing: 'border-box',
                paddingTop: layout === 'vertical' ? '120px' : '0',
            }}
        >
            <Img src={logoPapelcool} className="corner-logo" alt="Papelcool logo" />

            <div
                className="quiz-content"
                style={{
                    transform: `translateX(${contentParallaxX + peelX}px) translateY(${contentParallaxY + peelY}px) scale(${contentScale}) rotate(${peelRotate}deg)`,
                    opacity: contentOpacity,
                    width: '100%',
                }}
            >
                <div
                    className="question-header-container"
                    style={{
                        gridColumn: '1 / -1',
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px',
                        transform: `translateX(${headerX}px) translateY(${headerY + headerFloat}px) scale(${headerScale}) rotate(${headerTilt + Math.sin(frame / 23) * 1.2}deg)`,
                        opacity: headerOpacity,
                    }}
                >
                    <div className="question-number-circle">{questionNumber}</div>
                    <div className="question-title">{question.question}</div>
                </div>
 
                <div className="image-column">
                    <div
                        className="polaroid-frame"
                        style={{
                            transform: `translateX(${imageX}px) translateY(${imageY + imageFloat}px) scale(${imageScale}) rotate(${sway + imageRotate}deg)`,
                            opacity: imageEntrance,
                        }}
                    >
                        <Img src={question.image} alt="Question" />
                    </div>
                </div>

                <div className="options-column">
                    <div className="options-container">
                        {question.options.map((opt, i) => {
                            const isCorrect = i === question.correct;
                            const entrance_i = optionEntrances[Math.min(i, 2)];
                            const direction = i % 2 === 0 ? -1 : 1;

                            const optScale = isRevealed && isCorrect
                                ? correctPopScale * correctPulse
                                : isRevealed
                                    ? 1
                                    : interpolate(entrance_i, [0, 0.78, 1], [0.82, 1.04, 1]);

                            const optOpacity = isRevealed && !isCorrect
                                ? wrongOpacity
                                : isRevealed ? 1
                                    : interpolate(entrance_i, [0, 1], [0, 1]);

                            const optRotate = interpolate(entrance_i, [0, 1], [direction * 7, 0]) + Math.sin((frame + i * 6) / 18) * 0.9;
                            const optTranslateX = isRevealed
                                ? Math.sin((frame + i * 8) / 26) * 4
                                : interpolate(entrance_i, [0, 1], [direction * 120, Math.sin((frame + i * 8) / 26) * 4]);
                            const optTranslateY = isRevealed ? 0
                                : interpolate(entrance_i, [0, 1], [28, 0]) + Math.cos((frame + i * 7) / 21) * 3;

                            let btnClass = 'option-btn';
                            if (isRevealed && isCorrect) btnClass += ' correct highlight-correct';
                            if (isRevealed && !isCorrect) btnClass += ' opacity-50';

                            return (
                                <div
                                    key={i}
                                    className={btnClass}
                                    style={{
                                        transform: `translateX(${optTranslateX}px) translateY(${optTranslateY}px) scale(${optScale}) rotate(${optRotate}deg)`,
                                        opacity: optOpacity,
                                    }}
                                >
                                    <div className="option-letter">{String.fromCharCode(65 + i)}</div>
                                    <div className="option-text">{opt}</div>
                                </div>
                            );
                        })}
                    </div>

                    <div
                        className="timer-container"
                        style={{
                            transform: `translateX(${timerContainerX}px) translateY(${timerContainerY}px) scale(${timerContainerScale}) rotate(${timerContainerRotate + Math.sin(frame / 24) * 0.5}deg)`,
                            opacity: timerEntrance,
                        }}
                    >
                        <div
                            className="timer-bar"
                            style={{
                                width: timerWidth,
                                transform: `scaleY(${urgencyPulse}) translateY(${Math.sin(frame / 15) * 0.8}px)`,
                                background: `linear-gradient(90deg, ${timerColor} 0%, ${timerColor} 76%, rgba(255,255,255,0.65) 100%)`,
                                boxShadow: timerGlow > 0
                                    ? `0 0 ${timerGlow}px ${timerColor}, 0 0 ${timerGlow * 2}px ${timerColor}50`
                                    : 'none',
                                opacity: timerOpacity,
                            }}
                        />
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};
