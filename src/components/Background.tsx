import { AbsoluteFill, useCurrentFrame } from 'remotion';

interface BackgroundProps {
    children?: React.ReactNode;
    theme?: string;
    prevTheme?: string;
    transitionProgress?: number;
}

type Palette = {
    base: string;
    surface: string;
    shadow: string;
    glow: string;
};

const BG_PALETTES: Record<string, Palette> = {
    'bg-sky':      { base: '#67C7FF', surface: '#91DBFF', shadow: '#2E9CDE', glow: '#C9F0FF' },
    'bg-peach':    { base: '#FF8BC1', surface: '#FFC0DD', shadow: '#E45A99', glow: '#FFE0F0' },
    'bg-mint':     { base: '#63DABF', surface: '#8BE9D1', shadow: '#2BAA93', glow: '#C8FFF0' },
    'bg-lavender': { base: '#9C83FF', surface: '#C7BAFF', shadow: '#7157DC', glow: '#ECE7FF' },
    'bg-coral':    { base: '#FF7DA0', surface: '#FFB1C3', shadow: '#E35176', glow: '#FFE1E7' },
    'bg-lemon':    { base: '#FFD54F', surface: '#FFE48A', shadow: '#E8B929', glow: '#FFF4C5' },
    'bg-rose':     { base: '#F58BD7', surface: '#FBC0EA', shadow: '#D864B6', glow: '#FFE2F8' },
    'bg-aqua':     { base: '#57B6F2', surface: '#89D4FF', shadow: '#248ECF', glow: '#D6F2FF' },
};

const PALETTE_KEYS = Object.keys(BG_PALETTES);
const DEFAULT_PALETTE = BG_PALETTES['bg-sky'];

function getPalette(theme?: string) {
    if (!theme || !BG_PALETTES[theme]) {
        return DEFAULT_PALETTE;
    }
    return BG_PALETTES[theme];
}

function hexToRgb(hex: string) {
    const clean = hex.replace('#', '');
    const r = parseInt(clean.slice(0, 2), 16);
    const g = parseInt(clean.slice(2, 4), 16);
    const b = parseInt(clean.slice(4, 6), 16);
    return { r, g, b };
}

function lerpColor(a: string, b: string, t: number) {
    const from = hexToRgb(a);
    const to = hexToRgb(b);
    const r = Math.round(from.r + (to.r - from.r) * t);
    const g = Math.round(from.g + (to.g - from.g) * t);
    const bValue = Math.round(from.b + (to.b - from.b) * t);
    return `rgb(${r}, ${g}, ${bValue})`;
}

// 8 unique pattern styles — one per palette
type PatternStyle =
    | 'topography'
    | 'papercut'
    | 'ripples'
    | 'burst'
    | 'waves-vertical'
    | 'stripes-diagonal'
    | 'zigzag'
    | 'dots-wave';

function getPatternStyle(themeName?: string): PatternStyle {
    if (!themeName) return 'topography';
    if (themeName === 'bg-sky') return 'topography';
    if (themeName === 'bg-peach') return 'papercut';
    if (themeName === 'bg-mint') return 'ripples';
    if (themeName === 'bg-lavender') return 'zigzag';
    if (themeName === 'bg-coral') return 'burst';
    if (themeName === 'bg-lemon') return 'stripes-diagonal';
    if (themeName === 'bg-rose') return 'waves-vertical';
    if (themeName === 'bg-aqua') return 'dots-wave';
    return 'topography';
}

// ── STYLE 1: Topography — thick wavy horizontal bands ──
const renderTopography = (palette: Palette, t: number) => (
    <>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
            const phase = t * 1.8 + i * 0.7;
            const yOff = -50 + i * 280;
            const amp = 55 + Math.sin(t * 1.2 + i) * 22;
            const p1 = yOff + Math.sin(phase) * amp;
            const c1 = yOff + Math.cos(phase + 1) * amp - 70;
            const c2 = yOff + Math.sin(phase + 2) * amp + 70;
            const p2 = yOff + Math.sin(phase + 3.5) * amp;
            return (
                <path key={i}
                    d={`M -200,${p1} C 360,${c1} 720,${c2} 1280,${p2}`}
                    fill="none" stroke={palette.surface}
                    strokeWidth="105" strokeLinecap="round" opacity="0.95"
                />
            );
        })}
    </>
);

// ── STYLE 2: Paper-cut — horizontal wave bands, many and bold ──
const renderPapercut = (palette: Palette, t: number) => (
    <>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
            const phase = t * 2 + i * 0.65;
            const yOff = -80 + i * 260;
            const amp = 70 + Math.sin(t * 1.5 + i * 0.8) * 30;
            const p1 = yOff + Math.sin(phase) * amp;
            const c1 = yOff + Math.cos(phase + 0.8) * amp - 80;
            const c2 = yOff + Math.sin(phase + 1.6) * amp + 80;
            const p2 = yOff + Math.cos(phase + 2.4) * amp;
            return (
                <path key={i}
                    d={`M -200,${p1} C 360,${c1} 720,${c2} 1280,${p2}`}
                    fill="none" stroke={palette.surface}
                    strokeWidth="115" strokeLinecap="round" opacity="0.95"
                />
            );
        })}
    </>
);

// ── STYLE 3: Ripples — expanding concentric rings from center ──
const renderRipples = (palette: Palette, t: number) => (
    <>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => {
            const progress = ((t * 0.3 + i / 7) % 1);
            const r = progress * 1400;
            const opacity = Math.sin(progress * Math.PI) * 0.92;
            return (
                <circle key={i} cx="540" cy="960" r={r}
                    fill="none" stroke={palette.surface}
                    strokeWidth="100" opacity={opacity}
                />
            );
        })}
    </>
);

// ── STYLE 4: Burst — alternating ray sectors, slow rotation ──
const renderBurst = (palette: Palette, t: number) => {
    const rayCount = 16;
    const step = 360 / rayCount;
    const rot = t * 10;
    return (
        <g transform={`rotate(${rot} 540 960)`}>
            {Array.from({ length: rayCount }).map((_, i) => {
                if (i % 2 === 0) return null;
                const a1 = i * step;
                const a2 = a1 + step;
                const r1 = (a1 * Math.PI) / 180;
                const r2 = (a2 * Math.PI) / 180;
                const R = 2500;
                const x1 = 540 + Math.cos(r1) * R;
                const y1 = 960 + Math.sin(r1) * R;
                const x2 = 540 + Math.cos(r2) * R;
                const y2 = 960 + Math.sin(r2) * R;
                return (
                    <polygon key={i}
                        points={`540,960 ${x1},${y1} ${x2},${y2}`}
                        fill={palette.surface} opacity="0.95"
                    />
                );
            })}
        </g>
    );
};

// ── STYLE 5: Vertical waves — serpentine vertical lines ──
const renderWavesVertical = (palette: Palette, t: number) => (
    <>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
            const phase = t * 1.6 + i * 0.8;
            const xOff = -50 + i * 170;
            const amp = 50 + Math.sin(t + i) * 18;
            const p1 = xOff + Math.sin(phase) * amp;
            const c1 = xOff + Math.cos(phase + 1) * amp - 60;
            const c2 = xOff + Math.sin(phase + 2) * amp + 60;
            const p2 = xOff + Math.cos(phase + 3) * amp;
            return (
                <path key={i}
                    d={`M ${p1},-200 C ${c1},640 ${c2},1280 ${p2},2120`}
                    fill="none" stroke={palette.surface}
                    strokeWidth="105" strokeLinecap="round" opacity="0.95"
                />
            );
        })}
    </>
);

// ── STYLE 6: Diagonal stripes — clean parallel lines, constant motion ──
const renderStripesDiagonal = (palette: Palette, t: number) => {
    const spacing = 300;
    const move = (t * 40) % spacing;
    const count = 14;
    const startOffset = -2000;
    return (
        <>
            {Array.from({ length: count }).map((_, i) => {
                const offset = startOffset + i * spacing + move;
                return (
                    <line key={i}
                        x1={offset} y1="-400"
                        x2={offset + 2400} y2="2400"
                        stroke={palette.surface} strokeWidth="120"
                        strokeLinecap="round" opacity="0.95"
                    />
                );
            })}
        </>
    );
};

// ── STYLE 7: Zigzag — continuous zigzag bands across the screen ──
const renderZigzag = (palette: Palette, t: number) => (
    <>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
            const yOff = -50 + i * 280;
            const shift = Math.sin(t * 1.5 + i) * 40;
            const points: string[] = [];
            for (let x = -200; x <= 1280; x += 140) {
                const peak = (Math.floor((x + 200) / 140) % 2 === 0) ? -80 : 80;
                points.push(`${x + shift},${yOff + peak}`);
            }
            return (
                <polyline key={i}
                    points={points.join(' ')}
                    fill="none" stroke={palette.surface}
                    strokeWidth="105" strokeLinejoin="round" strokeLinecap="round"
                    opacity="0.95"
                />
            );
        })}
    </>
);

// ── STYLE 8: Dot waves — rows of large circles that undulate ──
const renderDotsWave = (palette: Palette, t: number) => {
    const dots: React.ReactNode[] = [];
    const cols = 6;
    const rows = 10;
    const spacingX = 1280 / (cols - 1);
    const spacingY = 2120 / (rows - 1);
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const cx = -100 + col * spacingX;
            const cy = -100 + row * spacingY;
            const wave = Math.sin(t * 1.5 + col * 0.5 + row * 0.3) * 35;
            dots.push(
                <circle key={`${row}-${col}`}
                    cx={cx + wave} cy={cy + wave}
                    r="80" fill={palette.surface} opacity="0.85"
                />
            );
        }
    }
    return <>{dots}</>;
};

// ── Render dispatcher ──
const renderPattern = (style: PatternStyle, palette: Palette, t: number) => {
    switch (style) {
        case 'topography': return renderTopography(palette, t);
        case 'papercut': return renderPapercut(palette, t);
        case 'ripples': return renderRipples(palette, t);
        case 'burst': return renderBurst(palette, t);
        case 'waves-vertical': return renderWavesVertical(palette, t);
        case 'stripes-diagonal': return renderStripesDiagonal(palette, t);
        case 'zigzag': return renderZigzag(palette, t);
        case 'dots-wave': return renderDotsWave(palette, t);
    }
};

export const Background: React.FC<BackgroundProps> = ({
    children,
    theme,
    prevTheme,
    transitionProgress = 1,
}) => {
    const frame = useCurrentFrame();

    const activePalette = getPalette(theme);
    const activeStyle = getPatternStyle(theme);

    const prevPalette = prevTheme ? getPalette(prevTheme) : null;
    const prevStyle = prevTheme ? getPatternStyle(prevTheme) : null;

    const baseColor = prevPalette && transitionProgress < 1
        ? lerpColor(prevPalette.base, activePalette.base, transitionProgress)
        : activePalette.base;

    // Continuous time value — slow enough to feel relaxing
    const t = frame * 0.008;

    return (
        <AbsoluteFill style={{ backgroundColor: baseColor }}>
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                {/* Prev theme pattern during cross-fade */}
                {prevPalette && prevStyle && transitionProgress < 1 && (
                    <svg width="100%" height="100%" viewBox="0 0 1080 1920"
                        preserveAspectRatio="none"
                        style={{ position: 'absolute', inset: 0, opacity: 1 - transitionProgress }}
                    >
                        {renderPattern(prevStyle, prevPalette, t)}
                    </svg>
                )}

                {/* Active theme pattern */}
                <svg width="100%" height="100%" viewBox="0 0 1080 1920"
                    preserveAspectRatio="none"
                    style={{ position: 'absolute', inset: 0, opacity: prevPalette ? transitionProgress : 1 }}
                >
                    {renderPattern(activeStyle, activePalette, t)}
                </svg>
            </div>

            <div style={{ position: 'relative', width: '100%', height: '100%', zIndex: 10 }}>
                {children}
            </div>
        </AbsoluteFill>
    );
};

export { PALETTE_KEYS };
