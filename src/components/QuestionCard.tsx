import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img } from 'remotion';
import { Question } from '../questions';
import logoPapelcool from '../assets/logo_papelcool.svg';

interface QuestionCardProps {
    question: Question;
    questionNumber: number;
    totalQuestions: number;
    layout: 'horizontal' | 'vertical';
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, questionNumber, totalQuestions, layout }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Timings
    const REVEAL_FRAME = 10 * fps; // Reveal answer after 10 seconds (Strict Timing)

    // Timer Logic
    const progress = interpolate(frame, [30, REVEAL_FRAME], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const isRevealed = frame >= REVEAL_FRAME;

    // Entrance Animation (Bouncy)
    const entrance = spring({
        frame,
        fps,
        config: {
            damping: 12, // Lower damping = more bounce
            stiffness: 100,
            mass: 0.6
        }
    });

    // Exit Animation (Fade out/Zoom out at the end)
    const duration = 15 * fps; // 15 seconds
    const exitFrame = duration - 15; // Start exit 15 frames (0.25s) before end
    const exitProgress = interpolate(frame, [exitFrame, duration], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp'
    });

    const scaleExit = interpolate(exitProgress, [0, 1], [1, 0.8]);
    const opacityExit = interpolate(exitProgress, [0, 1], [1, 0]);

    const scale = interpolate(entrance, [0, 1], [0.5, 1]) * scaleExit;
    const opacity = interpolate(entrance, [0, 1], [0, 1]) * opacityExit;

    // Sway Animation (Frame-based) for Timeline Sync
    // Replaces CSS animation: sway 4s ease-in-out infinite
    // 4s at 30fps = 120 frames per cycle
    const sway = Math.sin(frame / 20) * 1; // +/- 1 degree

    return (
        <AbsoluteFill
            className={`question-card-fill ${layout === 'vertical' ? 'vertical' : ''}`}
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: layout === 'vertical' ? 'flex-start' : 'center',
                alignItems: 'center',
                boxSizing: 'border-box',
                paddingTop: layout === 'vertical' ? '120px' : '0'
            }}
        >
            <img
                src={logoPapelcool}
                className="corner-logo"
                alt="Papelcool logo"
            />
            <div
                className="quiz-content"
                style={{
                    transform: `scale(${scale})`,
                    opacity,
                    width: '100%'
                }}
            >
                {/* Header: Number + Title */}
                <div className="question-header-container" style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <div className="question-number-circle">
                        {questionNumber}
                    </div>
                    <div className="question-title">
                        {question.question}
                    </div>
                </div>

                {/* Left: Image (Polaroid) */}
                <div className="image-column">
                    <div
                        className="polaroid-frame"
                        style={{ transform: `rotate(${sway}deg)` }}
                    >
                        {/* Use Remotion Img for better handling */}
                        <Img src={question.image} alt="Question" />
                    </div>
                </div>

                {/* Right: Options */}
                <div className="options-column">
                    <div className="options-container">
                        {question.options.map((opt, i) => {
                            // Logic for Correct/Incorrect highlighting
                            const isCorrect = i === question.correct;
                            // const isSelected = false; // We don't simulate user selection, just reveal correct

                            let btnClass = "option-btn";
                            if (isRevealed && isCorrect) btnClass += " correct highlight-correct";
                            // Optional: dim others
                            if (isRevealed && !isCorrect) btnClass += " opacity-50";

                            return (
                                <div key={i} className={btnClass}>
                                    <div className="option-letter">
                                        {String.fromCharCode(65 + i)}
                                    </div>
                                    <div className="option-text">{opt}</div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="timer-container">
                        <div
                            className="timer-bar"
                            style={{
                                transform: `scaleX(${progress})`,
                                background: isRevealed ? '#FFA000' : '#FFC83D'
                            }}
                        />
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};
