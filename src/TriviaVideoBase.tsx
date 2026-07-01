import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, Video, staticFile, Audio } from 'remotion';
import { Question } from './questions';
import { QuestionCard } from './components/QuestionCard';
import { PromoCard } from './components/PromoCard';
import { Background, PALETTE_KEYS } from './components/Background';
import { SubscribeAnimation } from './components/SubscribeAnimation';
import { BgmSequence } from './components/BgmSequence';
import { PROMO_DURATION_SECONDS, PROMO_INSERT_AFTER_QUESTION, PromoContent } from './promo';

import { FPS, SECONDS_PER_QUESTION } from './constants';

const QUESTION_DURATION = SECONDS_PER_QUESTION * FPS;
const PROMO_DURATION = PROMO_DURATION_SECONDS * FPS;
const TRANSITION_FRAMES = FPS * 1.5;
const CHANNEL_INTRO_DURATION = 270;
const DUCK_RAMP_FRAMES = 6;
const AUDIO_DURATIONS_IN_FRAMES: Record<string, number> = {
    'intro_es.mp3': 907, // 15.12s
    'intro_en.mp3': 883, // 14.72s
    'promo_es.mp3': 1198, // 19.96s
    'promo_en.mp3': 1116, // 18.60s
    'bonus_reveal_es.mp3': 274, // 4.56s
    'bonus_reveal_en.mp3': 202, // 3.36s
    'outro_es.mp3': 838, // 13.96s
    'outro_en.mp3': 866, // 14.44s
};

const DEFAULT_THEMES = PALETTE_KEYS;

type TimelineItem =
    | { kind: 'question'; question: Question; questionNumber: number | string; duration: number }
    | { kind: 'bonus-reveal'; duration: number }
    | { kind: 'promo'; content: PromoContent; duration: number };

export interface TriviaVideoBaseProps {
    layout?: 'horizontal' | 'vertical';
    questions: Question[];
    verticalQuestions: Question[];
    IntroComponent: React.FC<{ layout?: 'horizontal' | 'vertical' }>;
    BonusRevealComponent?: React.FC;
    OutroComponent: React.FC;
    subscribeLang: 'es' | 'en';
    introAudio: string;
    promoContent?: PromoContent;
    promoAudio?: string;
    bonusQuestion?: Question;
    bonusQuestionNumber?: number | string;
    bonusRevealAudio?: string;
    outroAudio: string;
    themes?: string[];
}

export const TriviaVideoBase: React.FC<TriviaVideoBaseProps> = ({
    layout = 'horizontal',
    questions: horizontalQuestions,
    verticalQuestions: vertQuestions,
    IntroComponent,
    BonusRevealComponent,
    OutroComponent,
    subscribeLang,
    introAudio,
    promoContent,
    promoAudio,
    bonusQuestion,
    bonusQuestionNumber = 'EXTRA',
    bonusRevealAudio,
    outroAudio,
    themes,
}) => {
    const THEMES = themes || DEFAULT_THEMES;
    const frame = useCurrentFrame();
    const hasPromoSlot = layout === 'horizontal' && Boolean(promoContent && promoAudio);

    const effectiveChannelIntroDuration = layout === 'vertical' ? 0 : CHANNEL_INTRO_DURATION;
    const INTRO_DURATION = layout === 'vertical' ? 0 : 20 * FPS;
    const introAudioDuration = AUDIO_DURATIONS_IN_FRAMES[introAudio] ?? INTRO_DURATION;
    const promoAudioDuration = hasPromoSlot
        ? (AUDIO_DURATIONS_IN_FRAMES[promoAudio as string] ?? PROMO_DURATION)
        : 0;
    const bonusRevealAudioDuration = bonusQuestion && bonusRevealAudio
        ? (AUDIO_DURATIONS_IN_FRAMES[bonusRevealAudio] ?? QUESTION_DURATION)
        : 0;
    const outroAudioDuration = AUDIO_DURATIONS_IN_FRAMES[outroAudio] ?? INTRO_DURATION;

    const contentFrame = frame - effectiveChannelIntroDuration;
    const baseQuestions = layout === 'vertical' ? vertQuestions : horizontalQuestions;

    const coreTimelineItems: TimelineItem[] = hasPromoSlot
        ? [
            ...horizontalQuestions.slice(0, PROMO_INSERT_AFTER_QUESTION).map((question, index) => ({
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
            ...horizontalQuestions.slice(PROMO_INSERT_AFTER_QUESTION).map((question, index) => ({
                kind: 'question' as const,
                question,
                questionNumber: PROMO_INSERT_AFTER_QUESTION + index + 1,
                duration: QUESTION_DURATION,
            })),
        ]
        : baseQuestions.map((question, index) => ({
            kind: 'question' as const,
            question,
            questionNumber: index + 1,
            duration: QUESTION_DURATION,
        }));

    const timelineItems: TimelineItem[] = [
        ...coreTimelineItems,
        ...(bonusQuestion && bonusRevealAudioDuration > 0
            ? [{ kind: 'bonus-reveal' as const, duration: bonusRevealAudioDuration }]
            : []),
        ...(bonusQuestion
            ? [{
                kind: 'question' as const,
                question: bonusQuestion,
                questionNumber: bonusQuestionNumber,
                duration: QUESTION_DURATION,
            }]
            : []),
    ];

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
                activeTheme = THEMES[0];
                transitionProgress = interpolate(
                    contentFrame,
                    [introEndTransitionStart, INTRO_DURATION],
                    [0, 1],
                    { extrapolateRight: 'clamp' }
                );
            }
        } else {
            activeTheme = THEMES[0];
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
            activeTheme = THEMES[activeIndex % THEMES.length];
            if (frameInItem < TRANSITION_FRAMES && activeIndex > 0) {
                prevTheme = THEMES[(activeIndex - 1) % THEMES.length];
                transitionProgress = interpolate(
                    frameInItem,
                    [0, TRANSITION_FRAMES],
                    [0, 1],
                    { extrapolateRight: 'clamp' }
                );
            }
        } else if (timeInTimeline >= totalTimelineDuration) {
            activeTheme = 'bg-coral';
            const outroStartFrame = INTRO_DURATION + totalTimelineDuration;
            const frameInOutro = contentFrame - outroStartFrame;
            if (frameInOutro < TRANSITION_FRAMES) {
                prevTheme = THEMES[(timelineItems.length - 1) % THEMES.length];
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
    const bonusRevealIndex = timelineItems.findIndex((item) => item.kind === 'bonus-reveal');
    const bonusRevealStart = bonusRevealIndex >= 0
        ? effectiveChannelIntroDuration + INTRO_DURATION + timelineStarts[bonusRevealIndex]
        : -1;
    const bonusRevealEnd = bonusRevealStart >= 0
        ? bonusRevealStart + bonusRevealAudioDuration
        : -1;
    const outroDuckingEnd = outroStart + outroAudioDuration;

    const introDuckCurve = INTRO_DURATION > 0
        ? interpolate(
            contentFrame,
            [0, 15, Math.max(15, introDuckingEnd - 15), introDuckingEnd],
            [0.3, 0.3, 0.3, 0.9],
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
    const bonusRevealDuckCurve = bonusRevealStart >= 0
        ? interpolate(
            frame,
            [
                bonusRevealStart,
                bonusRevealStart + DUCK_RAMP_FRAMES,
                Math.max(bonusRevealStart + DUCK_RAMP_FRAMES, bonusRevealEnd - DUCK_RAMP_FRAMES),
                bonusRevealEnd,
            ],
            [0.9, 0.3, 0.3, 0.9],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        )
        : 0.9;
    const bgmVolume = layout === 'horizontal'
        ? Math.min(introDuckCurve, promoDuckCurve, bonusRevealDuckCurve, outroDuckCurve)
        : 0.9;

    return (
        <AbsoluteFill className={`bg-black text-white font-sans ${layout}`}>
            {layout === 'horizontal' && (
                <Sequence durationInFrames={CHANNEL_INTRO_DURATION}>
                    <Video src={staticFile('video_intro.mov')} />
                </Sequence>
            )}

            <Sequence from={effectiveChannelIntroDuration}>
                <Background
                    theme={activeTheme}
                    prevTheme={prevTheme}
                    transitionProgress={transitionProgress}
                />
            </Sequence>

            {layout === 'horizontal' && (
                <Sequence from={effectiveChannelIntroDuration} durationInFrames={INTRO_DURATION}>
                    <IntroComponent layout={layout} />
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
                        ) : item.kind === 'bonus-reveal' ? (
                            BonusRevealComponent ? <BonusRevealComponent /> : null
                        ) : (
                            <QuestionCard
                                question={item.question}
                                questionNumber={item.questionNumber}
                                layout={layout}
                            />
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

            {layout === 'horizontal' && (
                <>
                    <BgmSequence volume={bgmVolume} />

                    <Sequence from={effectiveChannelIntroDuration} durationInFrames={introAudioDuration}>
                        <Audio src={staticFile(introAudio)} volume={0.9} />
                    </Sequence>

                    {hasPromoSlot && promoAudio && promoStart >= 0 && (
                        <Sequence
                            from={effectiveChannelIntroDuration + INTRO_DURATION + promoStart}
                            durationInFrames={promoAudioDuration}
                        >
                            <Audio src={staticFile(promoAudio)} volume={0.9} />
                        </Sequence>
                    )}

                    {bonusRevealAudio && bonusRevealStart >= 0 && (
                        <Sequence
                            from={bonusRevealStart}
                            durationInFrames={bonusRevealAudioDuration}
                        >
                            <Audio src={staticFile(bonusRevealAudio)} volume={0.9} />
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

            {layout === 'vertical' && <BgmSequence volume={0.9} />}
        </AbsoluteFill>
    );
};
