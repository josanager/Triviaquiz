import { Composition } from 'remotion';
import { TriviaVideo } from './TriviaVideo';
import { TriviaVideoEn } from './TriviaVideoEn';
import { questions, verticalQuestions } from './questions';
import { questionsEn } from './questionsEn';
import { PROMO_DURATION_SECONDS } from './promo';
import './style.css';

// Import constants
import { FPS, VIDEO_WIDTH, VIDEO_HEIGHT, VERTICAL_WIDTH, VERTICAL_HEIGHT, SECONDS_PER_QUESTION } from './constants';

const BONUS_REVEAL_ES_SECONDS = 4.56;
const BONUS_REVEAL_EN_SECONDS = 3.36;
const OUTRO_AND_INTRO_SECONDS = 45;

// Horizontal Spanish: 30 base questions + 1 bonus question + bonus reveal audio + 20s promo + 20s intro + 20s outro + 4.5s channel intro
export const DURATION_IN_FRAMES = Math.ceil(
  (
    ((questions.length + 1) * SECONDS_PER_QUESTION)
    + PROMO_DURATION_SECONDS
    + BONUS_REVEAL_ES_SECONDS
    + OUTRO_AND_INTRO_SECONDS
  ) * FPS
);

// Horizontal English: 30 base questions + 1 bonus question + bonus reveal audio + 20s promo + 20s intro + 20s outro + 4.5s channel intro
const DURATION_EN_FRAMES = Math.ceil(
  (
    ((questionsEn.length + 1) * SECONDS_PER_QUESTION)
    + PROMO_DURATION_SECONDS
    + BONUS_REVEAL_EN_SECONDS
    + OUTRO_AND_INTRO_SECONDS
  ) * FPS
);

// Vertical: 5 questions only (no intro video, no trivia intro, no outro)
const VERTICAL_DURATION = (verticalQuestions.length * SECONDS_PER_QUESTION) * FPS;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Spanish Horizontal */}
      <Composition
        id="TriviaVideo"
        component={TriviaVideo}
        durationInFrames={DURATION_IN_FRAMES}
        fps={FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
      {/* English Horizontal */}
      <Composition
        id="TriviaVideoEn"
        component={TriviaVideoEn}
        durationInFrames={DURATION_EN_FRAMES}
        fps={FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
      {/* Spanish Vertical */}
      <Composition
        id="TriviaVideoVertical"
        component={TriviaVideo}
        durationInFrames={VERTICAL_DURATION}
        fps={FPS}
        width={VERTICAL_WIDTH}
        height={VERTICAL_HEIGHT}
        defaultProps={{
          layout: 'vertical'
        }}
      />
      {/* English Vertical */}
      <Composition
        id="TriviaVideoVerticalEn"
        component={TriviaVideoEn}
        durationInFrames={VERTICAL_DURATION}
        fps={FPS}
        width={VERTICAL_WIDTH}
        height={VERTICAL_HEIGHT}
        defaultProps={{
          layout: 'vertical'
        }}
      />
    </>
  );
};
