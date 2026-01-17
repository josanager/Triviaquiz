import { AbsoluteFill } from 'remotion';

interface BackgroundProps {
    children?: React.ReactNode;
    theme?: string;
}

export const Background: React.FC<BackgroundProps> = ({ children, theme = "theme-purple" }) => {
    return (
        <AbsoluteFill className={`preview-frame ${theme}`}>
            <div className="background-blobs">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>
            </div>
            <div className="glass-container">
                {children}
            </div>
        </AbsoluteFill>
    );
};
