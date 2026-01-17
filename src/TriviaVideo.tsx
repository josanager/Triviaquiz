import { AbsoluteFill, Sequence, useCurrentFrame } from 'remotion';
import { questions, Question } from './questions';
import { Intro } from './components/Intro';
import { Outro } from './components/Outro';
import { QuestionCard } from './components/QuestionCard';
import { Background } from './components/Background';

import { FPS, SECONDS_PER_QUESTION } from './constants';

const INTRO_DURATION = 20 * FPS;
const QUESTION_DURATION = SECONDS_PER_QUESTION * FPS;

const THEMES = ['theme-purple', 'theme-cyan', 'theme-green', 'theme-pink', 'theme-gold'];

export const TriviaVideo: React.FC = () => {
    const frame = useCurrentFrame();

    let activeTheme = "theme-purple";
    if (frame > INTRO_DURATION) {
        const timeInQuestions = frame - INTRO_DURATION;
        const index = Math.floor(timeInQuestions / QUESTION_DURATION);
        if (index >= 0 && index < questions.length) {
            // Cycle through themes
            activeTheme = THEMES[index % THEMES.length];
        } else if (index >= questions.length) {
            activeTheme = "theme-gold"; // Outro
        }
    }

    return (
        <AbsoluteFill className="bg-black text-white font-sans">
            <Background theme={activeTheme} />

            <Sequence from={0} durationInFrames={INTRO_DURATION}>
                <Intro />
            </Sequence>

            {questions.map((question: Question, index: number) => {
                const startFrame = INTRO_DURATION + (index * QUESTION_DURATION);
                return (
                    <Sequence
                        key={index}
                        from={startFrame}
                        durationInFrames={QUESTION_DURATION}
                    >
                        <QuestionCard
                            question={question}
                            questionNumber={index + 1}
                            totalQuestions={questions.length}
                        />
                    </Sequence>
                );
            })}

            <Sequence from={INTRO_DURATION + (questions.length * QUESTION_DURATION)}>
                <Outro />
            </Sequence>
        </AbsoluteFill>
    );
};
