import { AbsoluteFill, Img, interpolate, useCurrentFrame, Video } from 'remotion';
import logoPapelcool from '../assets/logo_papelcool.svg';
import { PromoContent, promoBackgroundVideo, promoQrImage } from '../promo';

interface PromoCardProps {
    content: PromoContent;
    layout: 'horizontal' | 'vertical';
}

export const PromoCard: React.FC<PromoCardProps> = ({ content, layout }) => {
    const frame = useCurrentFrame();
    const duration = 20 * 60;
    const transitionFrames = 12;
    const titleMotionFrames = 18;
    const sceneOpacity = interpolate(frame, [0, transitionFrames, duration - transitionFrames, duration], [0, 1, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const videoScale = interpolate(frame, [0, transitionFrames, duration - transitionFrames, duration], [1.03, 1, 1, 1.02], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const titleOpacity = interpolate(frame, [4, titleMotionFrames, duration - titleMotionFrames, duration - 4], [0, 1, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const titleY = interpolate(frame, [4, titleMotionFrames, duration - titleMotionFrames, duration - 4], [-26, 0, 0, -18], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const qrOpacity = interpolate(frame, [8, 24, duration - 18, duration - 2], [0, 1, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const qrY = interpolate(frame, [8, 24, duration - 18, duration - 2], [30, 0, 0, 18], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const qrFloat = Math.sin(frame / 22) * 4;
    const logoOpacity = interpolate(frame, [10, 28, duration - 20, duration - 2], [0, 1, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const logoY = interpolate(frame, [10, 28, duration - 20, duration - 2], [16, 0, 0, 12], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <AbsoluteFill
            className={`question-card-fill promo-card-fill ${layout === 'vertical' ? 'vertical' : ''}`}
            style={{ overflow: 'hidden', padding: 0 }}
        >
            <AbsoluteFill
                className="promo-background-layer"
                style={{
                    opacity: sceneOpacity,
                    transform: `scale(${videoScale})`,
                }}
            >
                <Video
                    src={promoBackgroundVideo}
                    volume={0}
                    className="promo-background-video"
                />
                <div className="promo-background-scrim" />
            </AbsoluteFill>

            <AbsoluteFill
                className="promo-foreground-layer"
                style={{ opacity: sceneOpacity }}
            >
                <div
                    className="promo-title-banner"
                    style={{
                        opacity: titleOpacity,
                        transform: `translate(-50%, ${titleY}px)`,
                    }}
                >
                    <div className="promo-title-text">{content.title}</div>
                </div>

                <div
                    className="promo-qr-corner"
                    style={{
                        opacity: qrOpacity,
                        transform: `translateY(${qrY + qrFloat}px)`,
                    }}
                >
                    <div className="promo-qr-frame">
                        <Img src={promoQrImage} alt="QR Papelcool" className="promo-qr-image" />
                    </div>
                </div>

                <div
                    className="promo-bottom-logo"
                    style={{
                        opacity: logoOpacity,
                        transform: `translate(-50%, ${logoY}px)`,
                    }}
                >
                    <Img src={logoPapelcool} className="promo-logo-image" alt="Papelcool logo" />
                </div>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
