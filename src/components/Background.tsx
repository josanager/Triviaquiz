import { AbsoluteFill, useCurrentFrame } from 'remotion';

interface BackgroundProps {
    children?: React.ReactNode;
    theme?: string; // Kept for backwards compatibility but ignored
    prevTheme?: string;
    transitionProgress?: number;
}

export const Background: React.FC<BackgroundProps> = ({ children }) => {
    const frame = useCurrentFrame();

    // Floating animation for polygons
    const float1 = Math.sin(frame / 60) * 20;
    const float2 = Math.cos(frame / 50) * 15;
    const float3 = Math.sin(frame / 70) * 25;

    const rot1 = frame / 4;
    const rot2 = -frame / 5;
    const rot3 = frame / 6;

    return (
        <AbsoluteFill style={{ background: 'linear-gradient(135deg, #BAE6FD 0%, #E0F2FE 100%)' }}>
            
            {/* Background floating Sticker Polygons */}
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                
                {/* Pink Polygon */}
                <svg
                    width="400" height="400" viewBox="0 0 100 100"
                    style={{
                        position: 'absolute', top: '10%', left: '10%',
                        transform: `translate(0, ${float1}px) rotate(${rot1}deg)`,
                        opacity: 0.15
                    }}
                >
                    <polygon points="50,5 95,90 5,90" fill="#FF4D94" />
                </svg>

                {/* Blue Polygon */}
                <svg
                    width="500" height="500" viewBox="0 0 100 100"
                    style={{
                        position: 'absolute', bottom: '5%', right: '5%',
                        transform: `translate(0, ${float2}px) rotate(${rot2}deg)`,
                        opacity: 0.15
                    }}
                >
                    <polygon points="20,10 80,10 100,50 80,90 20,90 0,50" fill="#407BFF" />
                </svg>

                {/* Yellow Polygon */}
                <svg
                    width="350" height="350" viewBox="0 0 100 100"
                    style={{
                        position: 'absolute', top: '40%', left: '70%',
                        transform: `translate(0, ${float3}px) rotate(${rot3}deg)`,
                        opacity: 0.15
                    }}
                >
                    <polygon points="50,5 61,35 95,35 68,55 78,85 50,65 22,85 32,55 5,35 39,35" fill="#FFE600" />
                </svg>

            </div>

            {/* Content container */}
            <div style={{ position: 'relative', width: '100%', height: '100%', zIndex: 10 }}>
                {children}
            </div>
        </AbsoluteFill>
    );
};
