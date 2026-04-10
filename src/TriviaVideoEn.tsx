import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, Video, staticFile, Audio } from 'remotion';
import { IntroEn } from './components/IntroEn';
import { OutroEn } from './components/OutroEn';
import { QuestionCard } from './components/QuestionCard';
import { Background } from './components/Background';
import { SubscribeAnimation } from './components/SubscribeAnimation';
import { questionsEn, verticalQuestions } from './questionsEn';

// Constants
import { FPS, SECONDS_PER_QUESTION } from './constants';

const QUESTION_DURATION = SECONDS_PER_QUESTION * FPS;
const TRANSITION_FRAMES = FPS * 1.5; // 1.5 seconds for fade transition
const CHANNEL_INTRO_DURATION = 270; // Intro video duration (~4.5s at 60 FPS)

const THEMES = ['theme-pink', 'theme-rose-gradient', 'theme-blue', 'theme-dark-elegant', 'theme-yellow', 'theme-contrast', 'theme-mint', 'theme-lavender'];

interface TriviaVideoEnProps {
    layout?: 'horizontal' | 'vertical';
}

export const TriviaVideoEn: React.FC<TriviaVideoEnProps> = ({ layout = 'horizontal' }) => {
    const frame = useCurrentFrame();


    // Adjust durations based on layout
    const effectiveChannelIntroDuration = layout === 'vertical' ? 0 : CHANNEL_INTRO_DURATION;
    const INTRO_DURATION = layout === 'vertical' ? 0 : 20 * FPS;

    // Calculate frame relative to the start of the trivia content (after video intro)
    const contentFrame = frame - effectiveChannelIntroDuration;

    const questionList = layout === 'vertical' ? verticalQuestions : questionsEn;

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
            activeTheme = THEMES[0]; // Immediate
        }
    } else {
        const timeInQuestions = contentFrame - INTRO_DURATION;
        const index = Math.floor(timeInQuestions / QUESTION_DURATION);
        const frameInQuestion = timeInQuestions % QUESTION_DURATION;

        if (index >= 0 && index < questionList.length) {
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
        } else if (index >= questionList.length) {
            // Outro logic
            activeTheme = "theme-gold";
            const outroStart = INTRO_DURATION + (questionList.length * QUESTION_DURATION);
            const frameInOutro = contentFrame - outroStart;
            if (frameInOutro < TRANSITION_FRAMES) {
                prevTheme = THEMES[(questionList.length - 1) % THEMES.length];
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
    const outroStart = INTRO_DURATION + (questionList.length * QUESTION_DURATION);

    const bgmVolume = interpolate(
        contentFrame,
        [0, 15, INTRO_DURATION - 15, INTRO_DURATION, outroStart, outroStart + 15],
        [0.3, 0.3, 0.3, 0.9, 0.9, 0.3],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

    return (
        <AbsoluteFill className={`bg-black text-white font-sans ${layout}`}>
            {/* 1. Channel Intro Video (Horizontal Only) */}
            {layout === 'horizontal' && (
                <Sequence from={0} durationInFrames={CHANNEL_INTRO_DURATION}>
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
                    <IntroEn layout={layout} />
                </Sequence>
            )}

            {/* 4. Questions */}
            {questionList.map((q, i) => {
                const startFrame = effectiveChannelIntroDuration + INTRO_DURATION + (i * QUESTION_DURATION);
                return (
                    <Sequence
                        key={i}
                        from={startFrame}
                        durationInFrames={QUESTION_DURATION}
                    >
                        <QuestionCard
                            question={q}
                            questionNumber={i + 1}
                            totalQuestions={questionList.length}
                            layout={layout}
                        />
                    </Sequence>
                );
            })}

            {/* 5. Outro (Horizontal Only) */}
            {layout === 'horizontal' && (
                <Sequence from={effectiveChannelIntroDuration + INTRO_DURATION + (questionList.length * QUESTION_DURATION)}>
                    <OutroEn />
                </Sequence>
            )}

            {/* Subscribe Overlays */}
            {[0.25, 0.5, 0.75].map((progress, i) => {
                const totalDuration = questionList.length * QUESTION_DURATION;
                const showAt = effectiveChannelIntroDuration + INTRO_DURATION + (totalDuration * progress);
                return (
                    <Sequence
                        key={`sub-${i}`}
                        from={showAt}
                        durationInFrames={250}
                        style={{ zIndex: 2000 }}
                    >
                        <SubscribeAnimation lang="en" />
                    </Sequence>
                );
            })}
            {/* Horizontal Audio Tracks */}
            {layout === 'horizontal' && (
                <Sequence from={CHANNEL_INTRO_DURATION}>
                    <Audio src={staticFile("audio horizontal.wav")} />
                    <Audio src={staticFile("bgm_horizontal.mp3")} volume={bgmVolume} loop />

                    {/* AI Intro Voice (20s) */}
                    <Sequence from={0} durationInFrames={INTRO_DURATION}>
                        <Audio src={staticFile("intro_en.mp3")} volume={0.9} />
                    </Sequence>

                    {/* AI Outro Voice (20s) */}
                    <Sequence from={INTRO_DURATION + (questionList.length * QUESTION_DURATION)}>
                        <Audio src={staticFile("outro_en.mp3")} volume={0.9} />
                    </Sequence>
                </Sequence>
            )}

            {/* Vertical Audio Track */}
            {layout === 'vertical' && (
                <>
                    <Audio src={staticFile("audio vertical.wav")} />
                    <Audio src={staticFile("bgm_horizontal.mp3")} volume={0.9} loop />
                </>
            )}
        </AbsoluteFill>
    );
};
