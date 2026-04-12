import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, Video, staticFile, Audio } from 'remotion';
import { Question } from './questions';
import { QuestionCard } from './components/QuestionCard';
import { Background } from './components/Background';
import { SubscribeAnimation } from './components/SubscribeAnimation';
import { BgmSequence } from './components/BgmSequence';

import { FPS, SECONDS_PER_QUESTION } from './constants';

const QUESTION_DURATION = SECONDS_PER_QUESTION * FPS;
const TRANSITION_FRAMES = FPS * 1.5; // 1.5 seconds for fade transition
const CHANNEL_INTRO_DURATION = 270; // Intro video duration (~4.5s at 60 FPS)

const DEFAULT_THEMES = ['theme-pink', 'theme-rose-gradient', 'theme-blue', 'theme-dark-elegant', 'theme-yellow', 'theme-contrast', 'theme-mint', 'theme-lavender'];

export interface TriviaVideoBaseProps {
    layout?: 'horizontal' | 'vertical';
    questions: Question[];
    verticalQuestions: Question[];
    IntroComponent: React.FC<{ layout?: 'horizontal' | 'vertical' }>;
    OutroComponent: React.FC;
    subscribeLang: 'es' | 'en';
    introAudio: string;   // e.g. "intro_es.mp3"
    outroAudio: string;   // e.g. "outro_es.mp3"
    themes?: string[];    // Optional custom theme array for per-artist colors
}

export const TriviaVideoBase: React.FC<TriviaVideoBaseProps> = ({
    layout = 'horizontal',
    questions: horizontalQuestions,
    verticalQuestions: vertQuestions,
    IntroComponent,
    OutroComponent,
    subscribeLang,
    introAudio,
    outroAudio,
    themes,
}) => {
    const THEMES = themes || DEFAULT_THEMES;
    const frame = useCurrentFrame();

    // Adjust durations based on layout
    const effectiveChannelIntroDuration = layout === 'vertical' ? 0 : CHANNEL_INTRO_DURATION;
    const INTRO_DURATION = layout === 'vertical' ? 0 : 20 * FPS;

    // Calculate frame relative to the start of the trivia content (after video intro)
    const contentFrame = frame - effectiveChannelIntroDuration;

    // Use different questions based on layout
    const activeQuestions = layout === 'vertical' ? vertQuestions : horizontalQuestions;

    // Calculate current and previous theme with transition
    let activeTheme = "theme-purple";
    let prevTheme: string | undefined = undefined;
    let transitionProgress = 1;

    // Logic based on contentFrame
    if (contentFrame < 0) {
        // During Channel Intro Video
    } else if (contentFrame <= INTRO_DURATION) {
        // During intro (only horizontal)
        activeTheme = "theme-purple";
        if (INTRO_DURATION > 0) {
            const introEndTransitionStart = INTRO_DURATION - TRANSITION_FRAMES;
            if (contentFrame >= introEndTransitionStart) {
                prevTheme = "theme-purple";
                activeTheme = THEMES[0];
                transitionProgress = interpolate(
                    contentFrame,
                    [introEndTransitionStart, INTRO_DURATION],
                    [0, 1],
                    { extrapolateRight: 'clamp' }
                );
            }
        } else {
            activeTheme = THEMES[0]; // Immediate start for vertical
        }
    } else {
        const timeInQuestions = contentFrame - INTRO_DURATION;
        const index = Math.floor(timeInQuestions / QUESTION_DURATION);
        const frameInQuestion = timeInQuestions % QUESTION_DURATION;

        if (index >= 0 && index < activeQuestions.length) {
            activeTheme = THEMES[index % THEMES.length];

            // At the START of each question, fade from previous theme
            if (frameInQuestion < TRANSITION_FRAMES && index > 0) {
                prevTheme = THEMES[(index - 1) % THEMES.length];
                transitionProgress = interpolate(
                    frameInQuestion,
                    [0, TRANSITION_FRAMES],
                    [0, 1],
                    { extrapolateRight: 'clamp' }
                );
            }
        } else if (index >= activeQuestions.length) {
            // Outro logic
            activeTheme = "theme-gold";
            const outroStartFrame = INTRO_DURATION + (activeQuestions.length * QUESTION_DURATION);
            const frameInOutro = contentFrame - outroStartFrame;
            if (frameInOutro < TRANSITION_FRAMES) {
                prevTheme = THEMES[(activeQuestions.length - 1) % THEMES.length];
                transitionProgress = interpolate(
                    frameInOutro,
                    [0, TRANSITION_FRAMES],
                    [0, 1],
                    { extrapolateRight: 'clamp' }
                );
            }
        }
    }

    // Calculate dynamic BGM volume for horizontal layout (Audio Ducking)
    // Only used for horizontal — vertical uses constant volume via its own Audio element
    const outroStart = INTRO_DURATION + (activeQuestions.length * QUESTION_DURATION);

    // Build a safe interpolation range (must be strictly monotonically increasing)
    // When INTRO_DURATION is 0 (vertical), skip the intro ducking range entirely
    const bgmVolume = INTRO_DURATION > 0
        ? interpolate(
            contentFrame,
            [0, 15, INTRO_DURATION - 15, INTRO_DURATION, outroStart, outroStart + 15],
            [0.3, 0.3, 0.3, 0.9, 0.9, 0.3],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        )
        : 0.9; // Vertical: constant volume (no intro/outro ducking needed)

    return (
        <AbsoluteFill className={`bg-black text-white font-sans ${layout}`}>
            {/* 1. Channel Intro Video (Horizontal Only) */}
            {layout === 'horizontal' && (
                    <Sequence durationInFrames={CHANNEL_INTRO_DURATION}>
                    <Video src={staticFile("video_intro.mov")} />
                </Sequence>
            )}

            {/* 2. Main Content Background */}
            <Sequence from={effectiveChannelIntroDuration}>
                <Background
                    theme={activeTheme}
                    prevTheme={prevTheme}
                    transitionProgress={transitionProgress}
                />
            </Sequence>

            {/* 3. Trivia Intro (Horizontal Only) */}
            {layout === 'horizontal' && (
                <Sequence from={effectiveChannelIntroDuration} durationInFrames={INTRO_DURATION}>
                    <IntroComponent layout={layout} />
                </Sequence>
            )}

            {/* 4. Questions */}
            {activeQuestions.map((question: Question, index: number) => {
                const startFrame = effectiveChannelIntroDuration + INTRO_DURATION + (index * QUESTION_DURATION);
                return (
                    <Sequence
                        key={index}
                        from={startFrame}
                        durationInFrames={QUESTION_DURATION}
                    >
                        <QuestionCard
                            question={question}
                            questionNumber={index + 1}
                            layout={layout}
                        />
                    </Sequence>
                );
            })}

            {/* 5. Outro (Horizontal Only) */}
            {layout === 'horizontal' && (
                <Sequence from={effectiveChannelIntroDuration + INTRO_DURATION + (activeQuestions.length * QUESTION_DURATION)}>
                    <OutroComponent />
                </Sequence>
            )}

            {/* Subscribe Overlays */}
            {[0.25, 0.5, 0.75].map((progress, i) => {
                const totalDuration = activeQuestions.length * QUESTION_DURATION;
                const showAt = effectiveChannelIntroDuration + INTRO_DURATION + (totalDuration * progress);
                return (
                    <Sequence
                        key={`sub-${i}`}
                        from={showAt}
                        durationInFrames={250}
                        style={{ zIndex: 2000 }}
                    >
                        <SubscribeAnimation lang={subscribeLang} />
                    </Sequence>
                );
            })}

            {/* Audio Layers */}
            {layout === 'horizontal' && (
                <>
                    <BgmSequence volume={bgmVolume} />

                    {/* AI Intro Voice (20s) */}
                    <Sequence from={effectiveChannelIntroDuration} durationInFrames={INTRO_DURATION}>
                        <Audio src={staticFile(introAudio)} volume={0.9} />
                    </Sequence>

                    {/* AI Outro Voice (20s) */}
                    <Sequence from={effectiveChannelIntroDuration + INTRO_DURATION + (activeQuestions.length * QUESTION_DURATION)}>
                        <Audio src={staticFile(outroAudio)} volume={0.9} />
                    </Sequence>
                </>
            )}

            {/* Vertical Audio Tracks */}
            {layout === 'vertical' && (
                <>
                    <BgmSequence volume={0.9} />
                </>
            )}
        </AbsoluteFill>
    );
};
