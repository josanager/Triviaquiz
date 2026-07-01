import { TriviaVideoBase } from './TriviaVideoBase';
import { bonusQuestionEn, questionsEn, verticalQuestions } from './questionsEn';
import { Intro } from './components/Intro';
import { BonusReveal } from './components/BonusReveal';
import { Outro } from './components/Outro';
import { promoContentEn } from './promo';

// English Intro/Outro wrappers (pass lang='en' to the shared components)
const IntroEn: React.FC<{ layout?: 'horizontal' | 'vertical' }> = ({ layout }) => (
    <Intro layout={layout} lang="en" />
);
const BonusRevealEn: React.FC = () => <BonusReveal lang="en" />;
const OutroEn: React.FC = () => <Outro lang="en" />;

export const TriviaVideoEn: React.FC<{ layout?: 'horizontal' | 'vertical' }> = ({ layout = 'horizontal' }) => {
    return (
        <TriviaVideoBase
            layout={layout}
            questions={questionsEn}
            verticalQuestions={verticalQuestions}
            IntroComponent={IntroEn}
            BonusRevealComponent={BonusRevealEn}
            OutroComponent={OutroEn}
            subscribeLang="en"
            introAudio="intro_en.mp3"
            promoContent={promoContentEn}
            promoAudio="promo_en.mp3"
            bonusQuestion={bonusQuestionEn}
            bonusQuestionNumber={31}
            bonusRevealAudio="bonus_reveal_en.mp3"
            outroAudio="outro_en.mp3"
        />
    );
};
