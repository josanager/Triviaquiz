import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, staticFile, Audio, useVideoConfig, Img } from 'remotion';
import { Question } from './questions';
import { QuestionCard } from './components/QuestionCard';
import { PromoCard } from './components/PromoCard';
import { Background, PALETTE_KEYS } from './components/Background';
import { SubscribeAnimation } from './components/SubscribeAnimation';
import { BgmSequence } from './components/BgmSequence';
import logoPapelcool from './assets/logo_papelcool.svg';
import { getPromoInsertAfterQuestion, PROMO_DURATION_SECONDS, PromoContent } from './promo';

import { FPS, SECONDS_PER_QUESTION, HORIZONTAL_DESIGN_WIDTH, HORIZONTAL_DESIGN_HEIGHT } from './constants';

const QUESTION_DURATION = SECONDS_PER_QUESTION * FPS;
const PROMO_DURATION = Math.round(PROMO_DURATION_SECONDS * FPS);
const TRANSITION_FRAMES = FPS * 1.5;
const CHANNEL_INTRO_DURATION = 0;
const DUCK_RAMP_FRAMES = 6;
const LISTEN_PREVIEW_DURATION_FRAMES = 3 * FPS;
const REVEAL_PREVIEW_DURATION_FRAMES = 5 * FPS;
const REVEAL_PREVIEW_OFFSET_SECONDS = 3;
const DEFAULT_PREVIEW_START_SECONDS = 14;
const AUDIO_DURATIONS_IN_FRAMES: Record<string, number> = {
    'intro_es.mp3': 1176, // 19.60s intro
    'intro_en.mp3': 1092, // 18.20s intro
    'promo_es.mp3': 1231, // 20.52s
    'promo_en.mp3': 1039, // 17.32s
    'outro_es.mp3': 838, // 13.96s outro
    'outro_en.mp3': 898, // 14.96s outro
};

const DEFAULT_THEMES = PALETTE_KEYS;

const hashString = (value: string) => {
    let hash = 0;
    for (let index = 0; index < value.length; index += 1) {
        hash = ((hash << 5) - hash + value.charCodeAt(index)) | 0;
    }
    return Math.abs(hash);
};

const buildThemeSequence = (themes: string[], seed: string) => {
    const pool = [...themes];
    const hashedSeed = hashString(seed);

    for (let index = pool.length - 1; index > 0; index -= 1) {
        const swapIndex = (hashedSeed + (index * 17)) % (index + 1);
        [pool[index], pool[swapIndex]] = [pool[swapIndex], pool[index]];
    }

    const rotation = pool.length === 0 ? 0 : hashedSeed % pool.length;
    return pool.map((_, index) => pool[(index + rotation) % pool.length]);
};

type TimelineItem =
    | { kind: 'question'; question: Question; questionNumber: number | string; duration: number }
    | { kind: 'promo'; content: PromoContent; duration: number };

export interface TriviaVideoBaseProps {
    layout?: 'horizontal' | 'vertical';
    questions: Question[];
    verticalQuestions: Question[];
    IntroComponent: React.FC<{ layout?: 'horizontal' | 'vertical'; questionCount?: number }>;
    OutroComponent: React.FC;
    subscribeLang: 'es' | 'en';
    introAudio: string;
    promoContent?: PromoContent;
    promoAudio?: string;
    outroAudio: string;
    themes?: string[];
}

export const TriviaVideoBase: React.FC<TriviaVideoBaseProps> = ({
    layout = 'horizontal',
    questions: horizontalQuestions,
    verticalQuestions: vertQuestions,
    IntroComponent,
    OutroComponent,
    subscribeLang,
    introAudio,
    promoContent,
    promoAudio,
    outroAudio,
    themes,
}) => {
    const THEMES = themes || DEFAULT_THEMES;
    const frame = useCurrentFrame();
    const { width, height } = useVideoConfig();
    const themeSeed = horizontalQuestions.map((question) => `${question.artist}-${question.title}`).join('|');
    const themeSequence = buildThemeSequence(THEMES, themeSeed || 'default-theme-seed');
    const hasPromoSlot = layout === 'horizontal' && Boolean(promoContent && promoAudio);
    const promoInsertAfterQuestion = getPromoInsertAfterQuestion(horizontalQuestions.length);

    const effectiveChannelIntroDuration = layout === 'vertical' ? 0 : CHANNEL_INTRO_DURATION;
    const INTRO_DURATION = layout === 'vertical' ? 0 : 20 * FPS;
    const introAudioDuration = AUDIO_DURATIONS_IN_FRAMES[introAudio] ?? INTRO_DURATION;
    const promoAudioDuration = hasPromoSlot
        ? (AUDIO_DURATIONS_IN_FRAMES[promoAudio as string] ?? PROMO_DURATION)
        : 0;
    const outroAudioDuration = AUDIO_DURATIONS_IN_FRAMES[outroAudio] ?? INTRO_DURATION;

    const contentFrame = frame - effectiveChannelIntroDuration;
    const baseQuestions = layout === 'vertical' ? vertQuestions : horizontalQuestions;

    const timelineItems: TimelineItem[] = hasPromoSlot
        ? [
            ...horizontalQuestions.slice(0, promoInsertAfterQuestion).map((question, index) => ({
                kind: 'question' as const,
                question,
                questionNumber: index + 1,
                duration: QUESTION_DURATION,
            })),
            {
                kind: 'promo' as const,
                content: promoContent as PromoContent,
                duration: PROMO_DURATION,
            },
            ...horizontalQuestions.slice(promoInsertAfterQuestion).map((question, index) => ({
                kind: 'question' as const,
                question,
                questionNumber: promoInsertAfterQuestion + index + 1,
                duration: QUESTION_DURATION,
            })),
        ]
        : baseQuestions.map((question, index) => ({
            kind: 'question' as const,
            question,
            questionNumber: index + 1,
            duration: QUESTION_DURATION,
        }));

    const timelineStarts = timelineItems.map((_, index) => {
        let start = 0;
        for (let i = 0; i < index; i += 1) {
            start += timelineItems[i].duration;
        }
        return start;
    });

    const totalTimelineDuration = timelineItems.reduce((sum, item) => sum + item.duration, 0);
    const promoIndex = timelineItems.findIndex((item) => item.kind === 'promo');
    const promoStart = promoIndex >= 0 ? timelineStarts[promoIndex] : -1;

    let activeTheme = 'theme-purple';
    let prevTheme: string | undefined;
    let transitionProgress = 1;

    if (contentFrame < 0) {
        // Channel intro video
    } else if (contentFrame <= INTRO_DURATION) {
        activeTheme = 'bg-lavender';
        if (INTRO_DURATION > 0) {
            const introEndTransitionStart = INTRO_DURATION - TRANSITION_FRAMES;
            if (contentFrame >= introEndTransitionStart) {
                prevTheme = 'bg-lavender';
                activeTheme = themeSequence[0] ?? 'bg-lavender';
                transitionProgress = interpolate(
                    contentFrame,
                    [introEndTransitionStart, INTRO_DURATION],
                    [0, 1],
                    { extrapolateRight: 'clamp' }
                );
            }
        } else {
            activeTheme = themeSequence[0] ?? 'bg-lavender';
        }
    } else {
        const timeInTimeline = contentFrame - INTRO_DURATION;
        let activeIndex = -1;
        let frameInItem = 0;

        for (let i = 0; i < timelineItems.length; i += 1) {
            const start = timelineStarts[i];
            const end = start + timelineItems[i].duration;
            if (timeInTimeline >= start && timeInTimeline < end) {
                activeIndex = i;
                frameInItem = timeInTimeline - start;
                break;
            }
        }

        if (activeIndex >= 0) {
            activeTheme = themeSequence[activeIndex % themeSequence.length];
            if (frameInItem < TRANSITION_FRAMES && activeIndex > 0) {
                prevTheme = themeSequence[(activeIndex - 1) % themeSequence.length];
                transitionProgress = interpolate(
                    frameInItem,
                    [0, TRANSITION_FRAMES],
                    [0, 1],
                    { extrapolateRight: 'clamp' }
                );
            }
        } else if (timeInTimeline >= totalTimelineDuration) {
            activeTheme = themeSequence[(timelineItems.length + 1) % themeSequence.length] ?? 'bg-coral';
            const outroStartFrame = INTRO_DURATION + totalTimelineDuration;
            const frameInOutro = contentFrame - outroStartFrame;
            if (frameInOutro < TRANSITION_FRAMES) {
                prevTheme = themeSequence[(timelineItems.length - 1) % themeSequence.length];
                transitionProgress = interpolate(
                    frameInOutro,
                    [0, TRANSITION_FRAMES],
                    [0, 1],
                    { extrapolateRight: 'clamp' }
                );
            }
        }
    }

    const promoStartInContent = promoStart >= 0 ? INTRO_DURATION + promoStart : -1;
    const promoStartAbsolute = promoStartInContent >= 0
        ? effectiveChannelIntroDuration + promoStartInContent
        : -1;
    const outroStart = INTRO_DURATION + totalTimelineDuration;
    const introDuckingEnd = Math.min(introAudioDuration, INTRO_DURATION);
    const promoVoiceStart = promoStartAbsolute;
    const promoVoiceEnd = promoStartAbsolute >= 0
        ? promoStartAbsolute + promoAudioDuration
        : -1;
    const outroDuckingEnd = outroStart + outroAudioDuration;

    const introVoiceStart = effectiveChannelIntroDuration;
    const introVoiceEnd = effectiveChannelIntroDuration + introDuckingEnd;
    const introDuckCurve = INTRO_DURATION > 0
        ? interpolate(
            frame,
            [
                introVoiceStart,
                introVoiceStart + 15,
                Math.max(introVoiceStart + 15, introVoiceEnd - 15),
                introVoiceEnd,
            ],
            [0.9, 0.3, 0.3, 0.9],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        )
        : 0.9;
    const promoDuckCurve = hasPromoSlot
        ? interpolate(
            frame,
            [
                promoVoiceStart,
                promoVoiceStart + DUCK_RAMP_FRAMES,
                Math.max(promoVoiceStart + DUCK_RAMP_FRAMES, promoVoiceEnd - DUCK_RAMP_FRAMES),
                promoVoiceEnd,
            ],
            [0.9, 0.3, 0.3, 0.9],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        )
        : 0.9;
    const outroDuckCurve = interpolate(
        contentFrame,
        [outroStart, outroStart + 15, Math.max(outroStart + 15, outroDuckingEnd - 15), outroDuckingEnd],
        [0.9, 0.3, 0.3, 0.9],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );
    let questionSongDucking = 1.0;
    if (contentFrame > INTRO_DURATION) {
        const timeInTimeline = contentFrame - INTRO_DURATION;
        let activeIndex = -1;
        let frameInItem = 0;

        for (let i = 0; i < timelineItems.length; i += 1) {
            const start = timelineStarts[i];
            const end = start + timelineItems[i].duration;
            if (timeInTimeline >= start && timeInTimeline < end) {
                activeIndex = i;
                frameInItem = timeInTimeline - start;
                break;
            }
        }

        if (activeIndex >= 0 && timelineItems[activeIndex].kind === 'question') {
            const isListenWindow = frameInItem < LISTEN_PREVIEW_DURATION_FRAMES;
            const isRevealWindow = frameInItem >= (8 * FPS);

            if (isListenWindow || isRevealWindow) {
                questionSongDucking = 0.05;
            } else {
                questionSongDucking = 0.92;
            }
        }
    }

    const bgmVolume = (layout === 'horizontal'
        ? Math.min(introDuckCurve, promoDuckCurve, outroDuckCurve)
        : 0.9) * questionSongDucking;
    const horizontalScale = layout === 'horizontal'
        ? Math.min(width / HORIZONTAL_DESIGN_WIDTH, height / HORIZONTAL_DESIGN_HEIGHT)
        : 1;

    const visualContent = (
        <>
            <Sequence from={effectiveChannelIntroDuration}>
                <Background
                    theme={activeTheme}
                    prevTheme={prevTheme}
                    transitionProgress={transitionProgress}
                />
            </Sequence>

            {layout === 'horizontal' && (
                <Sequence from={effectiveChannelIntroDuration} durationInFrames={INTRO_DURATION}>
                    <IntroComponent
                        layout={layout}
                        questionCount={horizontalQuestions.length}
                    />
                </Sequence>
            )}

            {timelineItems.map((item, index) => {
                const startFrame = effectiveChannelIntroDuration + INTRO_DURATION + timelineStarts[index];
                return (
                    <Sequence
                        key={`${item.kind}-${startFrame}`}
                        from={startFrame}
                        durationInFrames={item.duration}
                    >
                        {item.kind === 'promo' ? (
                            <PromoCard content={item.content} layout={layout} />
                        ) : (
                            <>
                                <QuestionCard
                                    question={item.question}
                                    questionNumber={item.questionNumber}
                                    layout={layout}
                                    lang={subscribeLang}
                                />
                                {item.question.audioFile && (
                                    <>
                                        <Audio
                                            src={staticFile(item.question.audioFile)}
                                            startFrom={Math.round((item.question.previewStartSeconds ?? DEFAULT_PREVIEW_START_SECONDS) * FPS)}
                                            endAt={Math.round((item.question.previewStartSeconds ?? DEFAULT_PREVIEW_START_SECONDS) * FPS) + LISTEN_PREVIEW_DURATION_FRAMES}
                                            volume={(f) => {
                                                const fadeIn = interpolate(f, [0, 10], [0, 1.0], {
                                                    extrapolateLeft: 'clamp',
                                                    extrapolateRight: 'clamp',
                                                });
                                                const fadeOut = interpolate(f, [LISTEN_PREVIEW_DURATION_FRAMES - 10, LISTEN_PREVIEW_DURATION_FRAMES], [1.0, 0], {
                                                    extrapolateLeft: 'clamp',
                                                    extrapolateRight: 'clamp',
                                                });
                                                return 0.95 * Math.min(fadeIn, fadeOut);
                                            }}
                                        />
                                        <Sequence from={8 * FPS} durationInFrames={REVEAL_PREVIEW_DURATION_FRAMES}>
                                            <Audio
                                                src={staticFile(item.question.audioFile)}
                                                startFrom={Math.round(((item.question.previewStartSeconds ?? DEFAULT_PREVIEW_START_SECONDS) + REVEAL_PREVIEW_OFFSET_SECONDS) * FPS)}
                                                endAt={Math.round(((item.question.previewStartSeconds ?? DEFAULT_PREVIEW_START_SECONDS) + REVEAL_PREVIEW_OFFSET_SECONDS) * FPS) + REVEAL_PREVIEW_DURATION_FRAMES}
                                                volume={(f) => {
                                                    const fadeIn = interpolate(f, [0, 10], [0, 1.0], {
                                                        extrapolateLeft: 'clamp',
                                                        extrapolateRight: 'clamp',
                                                    });
                                                    const fadeOut = interpolate(f, [REVEAL_PREVIEW_DURATION_FRAMES - 12, REVEAL_PREVIEW_DURATION_FRAMES], [1.0, 0], {
                                                        extrapolateLeft: 'clamp',
                                                        extrapolateRight: 'clamp',
                                                    });
                                                    return 0.95 * Math.min(fadeIn, fadeOut);
                                                }}
                                            />
                                        </Sequence>
                                    </>
                                )}
                            </>
                        )}
                    </Sequence>
                );
            })}

            {layout === 'horizontal' && (
                <Sequence from={effectiveChannelIntroDuration + INTRO_DURATION + totalTimelineDuration}>
                    <OutroComponent />
                </Sequence>
            )}

            {(layout === 'horizontal' ? [7, 23, 30] : [1, 2, 4]).map((slotIndex, i) => {
                const clampedSlot = Math.min(slotIndex, timelineItems.length - 1);
                const showAt = effectiveChannelIntroDuration
                    + INTRO_DURATION
                    + timelineStarts[clampedSlot]
                    + Math.floor(timelineItems[clampedSlot].duration * 0.55);
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

            {/* Persistent bottom logo — visible during all questions, hidden during intro/outro */}
            <Sequence
                from={effectiveChannelIntroDuration + INTRO_DURATION}
                durationInFrames={totalTimelineDuration}
                style={{ zIndex: 30 }}
            >
                <Img
                    src={logoPapelcool}
                    className="corner-logo perspective-logo"
                    style={{
                        position: 'absolute',
                        bottom: layout === 'vertical' ? '55px' : '30px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        height: layout === 'vertical' ? '40px' : '35px',
                        opacity: 1,
                    }}
                    alt="Papelcool logo"
                />
            </Sequence>
        </>
    );

    return (
        <AbsoluteFill className={`bg-black text-white font-sans ${layout}`}>
            {layout === 'horizontal' ? (
                <div
                    style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        width: HORIZONTAL_DESIGN_WIDTH,
                        height: HORIZONTAL_DESIGN_HEIGHT,
                        transform: `translate(-50%, -50%) scale(${horizontalScale})`,
                        transformOrigin: 'center center',
                        overflow: 'hidden',
                    }}
                >
                    {visualContent}
                </div>
            ) : visualContent}

            {layout === 'horizontal' && (
                <>
                    <BgmSequence volume={bgmVolume} />

                    <Sequence from={effectiveChannelIntroDuration} durationInFrames={introAudioDuration}>
                        <Audio src={staticFile(introAudio)} volume={0.9} />
                    </Sequence>

                    {hasPromoSlot && promoAudio && promoStart >= 0 && (
                        <Sequence
                            from={effectiveChannelIntroDuration + INTRO_DURATION + promoStart}
                            durationInFrames={PROMO_DURATION}
                        >
                            <Audio
                                src={staticFile(promoAudio)}
                                endAt={PROMO_DURATION}
                                volume={0.9}
                            />
                        </Sequence>
                    )}

                    <Sequence
                        from={effectiveChannelIntroDuration + INTRO_DURATION + totalTimelineDuration}
                        durationInFrames={outroAudioDuration}
                    >
                        <Audio src={staticFile(outroAudio)} volume={0.9} />
                    </Sequence>
                </>
            )}

            {layout === 'vertical' && <BgmSequence volume={bgmVolume} />}
        </AbsoluteFill>
    );
};
