import { TriviaVideoBase } from './TriviaVideoBase';
import { questions, verticalQuestions } from './questions';
import { Intro } from './components/Intro';
import { Outro } from './components/Outro';
import { promoContentEs } from './promo';

// Spanish Intro/Outro wrappers (pass lang='es' to the shared components)
const IntroEs: React.FC<{ layout?: 'horizontal' | 'vertical' }> = ({ layout }) => (
    <Intro layout={layout} lang="es" />
);
const OutroEs: React.FC = () => <Outro lang="es" />;

export const TriviaVideo: React.FC<{ layout?: 'horizontal' | 'vertical' }> = ({ layout = 'horizontal' }) => {
    return (
        <TriviaVideoBase
            layout={layout}
            questions={questions}
            verticalQuestions={verticalQuestions}
            IntroComponent={IntroEs}
            OutroComponent={OutroEs}
            subscribeLang="es"
            introAudio="intro_es.mp3"
            promoContent={promoContentEs}
            promoAudio="promo_es.mp3"
            outroAudio="outro_es.mp3"
        />
    );
};
