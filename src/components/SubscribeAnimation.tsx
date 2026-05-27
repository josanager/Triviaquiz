import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, Img, staticFile } from 'remotion';

interface SubscribeAnimationProps {
    lang?: 'es' | 'en';
}

export const SubscribeAnimation: React.FC<SubscribeAnimationProps> = ({ lang = 'es' }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Text translations
    const subscribeText = lang === 'en' ? 'SUBSCRIBE' : 'SUSCRIBIRSE';
    const subscribedText = lang === 'en' ? 'SUBSCRIBED' : 'SUSCRITO';

    // Animation phases (Total ~250 frames / 4.1s)
    // 0-30: Scale In (Slower)
    // 30-80: Wait
    // 80-90: Click
    // 90-130: Wait
    // 130-180: Bell
    // 210-240: Exit

    const scaleIn = spring({
        frame,
        fps,
        config: { damping: 20, mass: 2.0 }, // Much slower/smoother
    });

    const clickFrame = 80;
    const isClicked = frame >= clickFrame;
    const bellStartFrame = 130;
    const isBellActive = frame >= bellStartFrame;

    // Button Click Effect
    const clickScale = interpolate(
        frame,
        [clickFrame - 10, clickFrame, clickFrame + 10],
        [1, 0.85, 1],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

    // Bell Ring Effect
    const bellRotation = interpolate(
        frame,
        [bellStartFrame, bellStartFrame + 10, bellStartFrame + 20, bellStartFrame + 30, bellStartFrame + 40],
        [0, -25, 25, -15, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

    // Scale out at the end
    const exitFrame = 210;
    const scaleOut = interpolate(
        frame,
        [exitFrame, exitFrame + 20],
        [1, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

    const overallScale = scaleIn * clickScale * scaleOut;

    return (
        <div style={{
            position: 'absolute',
            bottom: '60px',
            left: '50%',
            transform: `translateX(-50%) scale(${overallScale})`,
            display: 'flex',
            alignItems: 'center',
            gap: '30px',
            padding: '25px 50px',
            background: '#FFFFFF',
            border: '3.5px solid #000000',
            borderRadius: '50px',
            boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
            zIndex: 2000,
            fontFamily: "'DynaPuff', sans-serif",
            textTransform: 'uppercase' as const,
        }}>
            {/* User Uploaded Logo */}
            <Img
                src={staticFile("Logo de la notificacion.jpg")}
                style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '3px solid #000000'
                }}
            />

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827' }}>Papelcool</span>
            </div>

            {/* Subscribe Button */}
            <div style={{
                padding: '18px 40px',
                background: isClicked ? '#D4D4D8' : '#FFE600',
                color: isClicked ? '#334155' : '#111827',
                border: '3px solid #000000',
                borderRadius: '50px',
                boxShadow: isClicked ? '0 2px 6px rgba(0,0,0,0.1)' : '0 4px 0 #FFD400, 0 6px 12px rgba(0,0,0,0.12)',
                transform: isClicked ? 'translate(2px, 2px)' : 'none',
                fontWeight: 'bold',
                fontSize: '26px', // Increased font size
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                cursor: 'pointer',
                minWidth: '220px',
                justifyContent: 'center'
            }}>
                {isClicked ? subscribedText : subscribeText}
            </div>

            {/* Notification Bell */}
            <div style={{
                fontSize: '50px',
                transform: `rotate(${isBellActive ? bellRotation : 0}deg)`,
                color: isBellActive ? '#111827' : '#D4D4D8'
            }}>
                {isBellActive ? '🔔' : '🔕'}
            </div>
        </div>
    );
};
