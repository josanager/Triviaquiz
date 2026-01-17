import { Composition } from 'remotion';
import { TriviaVideo } from './TriviaVideo';
import { questions } from './questions';
import './style.css';

// 15 seconds per question + 20s intro + 20s outro
import { FPS, VIDEO_WIDTH, VIDEO_HEIGHT, SECONDS_PER_QUESTION } from './constants';

export const DURATION_IN_FRAMES = ((questions.length * SECONDS_PER_QUESTION) + 40) * FPS;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="TriviaVideo"
        component={TriviaVideo}
        durationInFrames={DURATION_IN_FRAMES}
        fps={FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
    </>
  );
};
