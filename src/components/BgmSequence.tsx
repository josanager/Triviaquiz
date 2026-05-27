import { Audio, staticFile, useCurrentFrame, interpolate, Sequence } from 'remotion';
import { FPS } from '../constants';

interface BgmSequenceProps {
    volume: number;
}

export const BgmSequence: React.FC<BgmSequenceProps> = ({ volume }) => {
    const frame = useCurrentFrame();

    // Durations in frames for the three current BGM tracks in public/
    const D0 = 17328; // audio1 ~288.80s
    const D1 = 9206; // audio 2 ~153.44s
    const D2 = 16476; // audio 3 ~274.60s
    const FADE = 5 * FPS; // 300 frames

    // Offsets
    const start1 = D0 - FADE;
    const start2 = start1 + D1 - FADE;

    // Volume curves
    const v0 = interpolate(frame, [start1, D0], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const v1 = interpolate(frame, [start1, start1 + FADE, start2, start2 + FADE], [0, 1, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const v2 = interpolate(frame, [start2, start2 + FADE], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <>
            <Sequence durationInFrames={D0}>
                <Audio
                    src={staticFile("audio1.mp3")}
                    volume={() => volume * v0}
                />
            </Sequence>
            <Sequence from={start1} durationInFrames={D1}>
                <Audio
                    src={staticFile("audio 2.mp3")}
                    volume={() => volume * v1}
                />
            </Sequence>
            <Sequence from={start2} durationInFrames={D2}>
                <Audio
                    src={staticFile("audio 3.mp3")}
                    volume={() => volume * v2}
                />
            </Sequence>
        </>
    );
};
