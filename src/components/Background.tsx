import { AbsoluteFill, useCurrentFrame } from 'remotion';

interface BackgroundProps {
    children?: React.ReactNode;
    theme?: string;
    prevTheme?: string;
    transitionProgress?: number;
}

// Background color palettes – each theme maps to a gradient pair
const BG_PALETTES: Record<string, { from: string; to: string; accent: string }> = {
    'bg-sky':      { from: '#24AEEF', to: '#FFFFFF', accent: '#0A92E8' },
    'bg-peach':    { from: '#FF4CA8', to: '#FFFFFF', accent: '#FFD21F' },
    'bg-mint':     { from: '#37BDF7', to: '#FFFFFF', accent: '#79D64B' },
    'bg-lavender': { from: '#7B4DFF', to: '#FFFFFF', accent: '#37BDF7' },
    'bg-coral':    { from: '#FF4CA8', to: '#37BDF7', accent: '#FFD21F' },
    'bg-lemon':    { from: '#FFD21F', to: '#FFFFFF', accent: '#24AEEF' },
    'bg-rose':     { from: '#FF4CA8', to: '#7B4DFF', accent: '#FFFFFF' },
    'bg-aqua':     { from: '#018CE2', to: '#FFFFFF', accent: '#24AEEF' },
};

const PALETTE_KEYS = Object.keys(BG_PALETTES);
const DEFAULT_PALETTE = BG_PALETTES['bg-sky'];

function getPalette(theme?: string) {
    if (!theme || !BG_PALETTES[theme]) return DEFAULT_PALETTE;
    return BG_PALETTES[theme];
}

function hexToRgb(hex: string) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
}

function lerpColor(a: string, b: string, t: number) {
    const ca = hexToRgb(a);
    const cb = hexToRgb(b);
    const r = Math.round(ca.r + (cb.r - ca.r) * t);
    const g = Math.round(ca.g + (cb.g - ca.g) * t);
    const bl = Math.round(ca.b + (cb.b - ca.b) * t);
    return `rgb(${r}, ${g}, ${bl})`;
}

export const Background: React.FC<BackgroundProps> = ({
    children,
    theme,
    prevTheme,
    transitionProgress = 1,
}) => {
    const frame = useCurrentFrame();

    // Current palette
    const palette = getPalette(theme);
    const prevPalette = prevTheme ? getPalette(prevTheme) : null;

    // Interpolate colors during transitions
    let bgFrom = palette.from;
    let bgTo = palette.to;
    let accentColor = palette.accent;

    if (prevPalette && transitionProgress < 1) {
        bgFrom = lerpColor(prevPalette.from, palette.from, transitionProgress);
        bgTo = lerpColor(prevPalette.to, palette.to, transitionProgress);
        accentColor = lerpColor(prevPalette.accent, palette.accent, transitionProgress);
    }

    // Floating animations
    const f = (speed: number, offset = 0) => Math.sin((frame + offset) / speed);
    const c = (speed: number, offset = 0) => Math.cos((frame + offset) / speed);

    return (
        <AbsoluteFill style={{
            background: `linear-gradient(150deg, ${bgFrom} 0%, ${bgTo} 40%, ${bgFrom} 100%)`,
        }}>
            
            {/* Floating shapes layer */}
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                
                {/* Large soft circles */}
                <div style={{
                    position: 'absolute', top: '5%', left: '5%',
                    width: 380, height: 380, borderRadius: '50%',
                    background: `${accentColor}28`,
                    transform: `translate(${f(80) * 15}px, ${f(60) * 20}px)`,
                }} />
                <div style={{
                    position: 'absolute', bottom: '8%', right: '5%',
                    width: 450, height: 450, borderRadius: '50%',
                    background: `${accentColor}22`,
                    transform: `translate(${c(70) * 12}px, ${c(50) * 18}px)`,
                }} />
                <div style={{
                    position: 'absolute', top: '45%', left: '55%',
                    width: 300, height: 300, borderRadius: '50%',
                    background: `${accentColor}1C`,
                    transform: `translate(${f(90, 20) * 18}px, ${c(65, 10) * 22}px)`,
                }} />
                <div style={{
                    position: 'absolute', top: '15%', right: '25%',
                    width: 220, height: 220, borderRadius: '50%',
                    background: `${accentColor}20`,
                    transform: `translate(${c(55, 30) * 14}px, ${f(75, 15) * 16}px)`,
                }} />
                <div style={{
                    position: 'absolute', bottom: '25%', left: '30%',
                    width: 260, height: 260, borderRadius: '50%',
                    background: `${accentColor}1A`,
                    transform: `translate(${f(85, 50) * 20}px, ${c(60, 40) * 15}px)`,
                }} />

                {/* Rotating geometric shapes */}
                <svg width="220" height="220" viewBox="0 0 100 100" style={{
                    position: 'absolute', top: '12%', right: '12%',
                    transform: `translate(${f(80) * 10}px, ${c(55) * 14}px) rotate(${frame / 4}deg)`,
                    opacity: 0.14,
                }}>
                    <circle cx="50" cy="50" r="45" fill={accentColor} />
                </svg>

                <svg width="180" height="180" viewBox="0 0 100 100" style={{
                    position: 'absolute', bottom: '18%', left: '15%',
                    transform: `translate(${c(70, 10) * 12}px, ${f(50, 20) * 16}px) rotate(${-frame / 5}deg)`,
                    opacity: 0.12,
                }}>
                    <rect x="15" y="15" width="70" height="70" rx="18" fill={accentColor} />
                </svg>

                <svg width="160" height="160" viewBox="0 0 100 100" style={{
                    position: 'absolute', top: '55%', right: '20%',
                    transform: `translate(${f(65, 30) * 14}px, ${c(80, 10) * 18}px) rotate(${frame / 6}deg)`,
                    opacity: 0.12,
                }}>
                    <polygon points="50,10 90,90 10,90" fill={accentColor} />
                </svg>

                <svg width="140" height="140" viewBox="0 0 100 100" style={{
                    position: 'absolute', top: '8%', left: '40%',
                    transform: `translate(${c(75, 40) * 10}px, ${f(55, 25) * 12}px) rotate(${-frame / 7}deg)`,
                    opacity: 0.10,
                }}>
                    <circle cx="50" cy="50" r="40" fill={accentColor} />
                </svg>

                <svg width="200" height="200" viewBox="0 0 100 100" style={{
                    position: 'absolute', bottom: '5%', right: '35%',
                    transform: `translate(${f(90, 15) * 16}px, ${c(60, 35) * 14}px) rotate(${frame / 8}deg)`,
                    opacity: 0.11,
                }}>
                    <rect x="20" y="20" width="60" height="60" rx="14" fill={accentColor} />
                </svg>

                <svg width="120" height="120" viewBox="0 0 100 100" style={{
                    position: 'absolute', top: '70%', left: '8%',
                    transform: `translate(${c(60, 50) * 8}px, ${f(45, 30) * 10}px) rotate(${-frame / 4.5}deg)`,
                    opacity: 0.13,
                }}>
                    <polygon points="50,5 95,37 77,90 23,90 5,37" fill={accentColor} />
                </svg>

                <svg width="100" height="100" viewBox="0 0 100 100" style={{
                    position: 'absolute', top: '30%', left: '85%',
                    transform: `translate(${f(50, 60) * 6}px, ${c(70, 45) * 8}px) rotate(${frame / 5.5}deg)`,
                    opacity: 0.10,
                }}>
                    <circle cx="50" cy="50" r="35" fill={accentColor} />
                </svg>

                {/* Small floating dots */}
                {[
                    { x: '92%', y: '18%', size: 16, sp: 30, off: 0 },
                    { x: '4%', y: '42%', size: 12, sp: 25, off: 10 },
                    { x: '76%', y: '78%', size: 14, sp: 35, off: 20 },
                    { x: '38%', y: '12%', size: 10, sp: 28, off: 30 },
                    { x: '62%', y: '90%', size: 12, sp: 32, off: 40 },
                    { x: '18%', y: '68%', size: 11, sp: 22, off: 50 },
                    { x: '85%', y: '45%', size: 13, sp: 27, off: 60 },
                    { x: '50%', y: '5%',  size: 9,  sp: 33, off: 70 },
                    { x: '28%', y: '88%', size: 10, sp: 26, off: 80 },
                    { x: '72%', y: '30%', size: 11, sp: 29, off: 90 },
                ].map((dot, i) => (
                    <div key={i} style={{
                        position: 'absolute', left: dot.x, top: dot.y,
                        width: dot.size, height: dot.size, borderRadius: '50%',
                        background: accentColor, opacity: 0.25,
                        transform: `translateY(${f(dot.sp, dot.off) * 10}px)`,
                    }} />
                ))}

            </div>

            {/* Content container */}
            <div style={{ position: 'relative', width: '100%', height: '100%', zIndex: 10 }}>
                {children}
            </div>
        </AbsoluteFill>
    );
};

// Export palette keys for use in TriviaVideoBase
export { PALETTE_KEYS };
