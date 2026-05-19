import { TriviaVideoBase } from './TriviaVideoBase';
import { questionsEn, verticalQuestions } from './questionsEn';
import { Intro } from './components/Intro';
import { Outro } from './components/Outro';

// English Intro/Outro wrappers (pass lang='en' to the shared components)
const IntroEn: React.FC<{ layout?: 'horizontal' | 'vertical' }> = ({ layout }) => (
    <Intro layout={layout} lang="en" />
);
const OutroEn: React.FC = () => <Outro lang="en" />;

export const TriviaVideoEn: React.FC<{ layout?: 'horizontal' | 'vertical' }> = ({ layout = 'horizontal' }) => {
    return (
        <TriviaVideoBase
            layout={layout}
            questions={questionsEn}
            verticalQuestions={verticalQuestions}
            IntroComponent={IntroEn}
            OutroComponent={OutroEn}
            subscribeLang="en"
            introAudio="intro_en.mp3"
            outroAudio="outro_en.mp3"
        />
    );
};
