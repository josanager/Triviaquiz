import { AbsoluteFill } from 'remotion';

// Theme color definitions for gradient backgrounds
// Theme color definitions for gradient backgrounds - MORAT PALETTE
const THEME_COLORS: { [key: string]: string } = {
    'theme-pink': 'linear-gradient(135deg, #263238 0%, #546E7A 100%)', // Urban Concrete
    'theme-rose-gradient': 'linear-gradient(135deg, #263238 0%, #FF6F00 100%)', // Sunset
    'theme-blue': 'linear-gradient(135deg, #102027 0%, #FFC83D 100%)', // Golden Hour
    'theme-dark-elegant': 'linear-gradient(135deg, #424242 0%, #607D8B 100%)', // Industrial
    'theme-yellow': 'linear-gradient(135deg, #37474F 0%, #FFA000 100%)', // Faltas Tu
    'theme-contrast': 'linear-gradient(135deg, #000000 0%, #FFEA00 50%, #000000 100%)', // Stark
    'theme-mint': 'linear-gradient(135deg, #212121 0%, #455A64 50%, #263238 100%)', // Denim
    'theme-lavender': 'linear-gradient(135deg, #000000 0%, #37474F 100%)', // Night
    'theme-purple': 'linear-gradient(135deg, #263238 0%, #78909C 100%)', // Steel
    'theme-gold': 'linear-gradient(135deg, #263238 0%, #FFC83D 50%, #263238 100%)', // Gold Focus
};

interface BackgroundProps {
    children?: React.ReactNode;
    theme?: string;
    prevTheme?: string;
    transitionProgress?: number;
}

export const Background: React.FC<BackgroundProps> = ({
    children,
    theme = "theme-purple",
    prevTheme,
    transitionProgress = 1
}) => {
    const currentBackground = THEME_COLORS[theme] || THEME_COLORS['theme-purple'];
    const previousBackground = prevTheme ? (THEME_COLORS[prevTheme] || currentBackground) : currentBackground;

    // Opacity for crossfade effect
    const newLayerOpacity = transitionProgress;

    return (
        <AbsoluteFill style={{ background: '#000' }}>
            {/* Previous theme layer (fades out) */}
            {prevTheme && transitionProgress < 1 && (
                <AbsoluteFill
                    style={{
                        background: previousBackground,
                        opacity: 1 - newLayerOpacity,
                    }}
                />
            )}

            {/* Current theme layer (fades in) */}
            <AbsoluteFill
                style={{
                    background: currentBackground,
                    opacity: prevTheme ? newLayerOpacity : 1,
                }}
            />

            {/* Blobs - static for performance */}
            <div className="background-blobs">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>
            </div>

            {/* Content container */}
            <div className="glass-container">
                {children}
            </div>
        </AbsoluteFill>
    );
};
