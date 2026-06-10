import { Audio, staticFile, useCurrentFrame, interpolate, Sequence, useVideoConfig } from 'remotion';
import { FPS } from '../constants';

interface BgmSequenceProps {
    volume: number;
}

const FADE = 5 * FPS;
const TRACKS = [
    { src: 'world-cup-bgm-1.mp3', duration: 8177 }, // 136.28s
    { src: 'world-cup-bgm-2.mp3', duration: 4858 }, // 80.96s
    { src: 'world-cup-bgm-3.mp3', duration: 7798 }, // 129.96s
    { src: 'world-cup-bgm-4.mp3', duration: 3290 }, // 54.84s
] as const;

export const BgmSequence: React.FC<BgmSequenceProps> = ({ volume }) => {
    const frame = useCurrentFrame();
    const { durationInFrames } = useVideoConfig();

    const playlist: Array<{ src: string; start: number; duration: number }> = [];
    let start = 0;
    let index = 0;

    while (start < durationInFrames) {
        const track = TRACKS[index % TRACKS.length];
        playlist.push({
            src: track.src,
            start,
            duration: track.duration,
        });
        start += track.duration - FADE;
        index += 1;
    }

    return (
        <>
            {playlist.map((track, idx) => {
                const end = track.start + track.duration;
                const hasPrev = idx > 0;
                const hasNext = idx < playlist.length - 1;
                const fadeIn = hasPrev
                    ? interpolate(frame, [track.start, track.start + FADE], [0, 1], {
                        extrapolateLeft: 'clamp',
                        extrapolateRight: 'clamp',
                    })
                    : 1;
                const fadeOut = hasNext
                    ? interpolate(frame, [end - FADE, end], [1, 0], {
                        extrapolateLeft: 'clamp',
                        extrapolateRight: 'clamp',
                    })
                    : 1;

                return (
                    <Sequence key={`${track.src}-${track.start}`} from={track.start} durationInFrames={track.duration}>
                        <Audio
                            src={staticFile(track.src)}
                            volume={() => volume * Math.min(fadeIn, fadeOut)}
                        />
                    </Sequence>
                );
            })}
        </>
    );
};
