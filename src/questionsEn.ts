import { Question } from './questions';
import { KATSEYE_IMAGES } from './images';
import { validateUniqueQuestionImages } from './validateQuestionImages';

// Guardrail: TriviaVideoEn must stay fully in English.
// Any future content swap needs a proper English adaptation here,
// not a copy of the Spanish source text.
export const questionsEn: Question[] = validateUniqueQuestionImages([
    {
        question: 'What was the game\'s original name during its beta development phase?',
        options: ['Block Jump', 'Neon Dash', 'Geometry Jump'],
        correct: 2,
        image: KATSEYE_IMAGES.q1,
    },
    {
        question: 'Who designed "Demon Park", the level that inspired the creation of the "Demon" rank?',
        options: ['Darnoc', 'M2coL', 'Riot'],
        correct: 1,
        image: KATSEYE_IMAGES.q2,
    },
    {
        question: 'Which platformer level received the first rated "Legendary" rank?',
        options: ['Snowy Night', 'White Space', 'Coaster Mountain'],
        correct: 2,
        image: KATSEYE_IMAGES.q3,
    },
    {
        question: 'Which classic-style progression level was the first to be rated "Mythic"?',
        options: ['Astralith', 'ORBIT', 'LIMBO'],
        correct: 0,
        image: KATSEYE_IMAGES.q4,
    },
    {
        question: 'Which platformer level earned the first worldwide "Mythic" distinction?',
        options: ['The Towerverse', 'Coaster Mountain', 'Aperture'],
        correct: 0,
        image: KATSEYE_IMAGES.q5,
    },
    {
        question: 'What is the name of the Swedish developer who founded RobTop Games?',
        options: ['Richard Topala', 'Robert Topala', 'Ruben Topala'],
        correct: 1,
        image: KATSEYE_IMAGES.q6,
    },
    {
        question: 'What was Robert Topala\'s first game released on Newgrounds in 2010?',
        options: ['Memory Mastermind', 'Bounce Ball Thingy', 'Boomlings'],
        correct: 1,
        image: KATSEYE_IMAGES.q7,
    },
    {
        question: 'What base programming language was Geometry Dash\'s core coded in?',
        options: ['Java', 'C#', 'C++'],
        correct: 2,
        image: KATSEYE_IMAGES.q8,
    },
    {
        question: 'Who created "Nine Circles", the level that spawned its own flashing visual style?',
        options: ['Zobros', 'Cyclic', 'Riot'],
        correct: 0,
        image: KATSEYE_IMAGES.q9,
    },
    {
        question: 'Who legitimately verified the famous Extreme Demon "Silent Clubstep"?',
        options: ['Zoink', 'paqoe', 'Sunix'],
        correct: 1,
        image: KATSEYE_IMAGES.q10,
    },
    {
        question: 'Who solo-created the beach-themed Extreme Demon "Tidal Wave"?',
        options: ['Zoink', 'Knobbelboy', 'OniLink'],
        correct: 2,
        image: KATSEYE_IMAGES.q11,
    },
    {
        question: 'Which elite player officially verified "Tidal Wave"?',
        options: ['Zoink', 'Trick', 'wPopoff'],
        correct: 0,
        image: KATSEYE_IMAGES.q12,
    },
    {
        question: 'Which player coordinated and verified the famous mega-collab "Bloodbath" in 2015?',
        options: ['Michigun', 'Riot', 'TrusTa'],
        correct: 1,
        image: KATSEYE_IMAGES.q13,
    },
    {
        question: 'What was the original name of the Extreme Demon "Astral Divinity" before the cease-and-desist notice?',
        options: ['Devil Vortex', 'Bloodlust', 'God Eater'],
        correct: 2,
        image: KATSEYE_IMAGES.q14,
    },
    {
        question: 'Who designed the historic and influential Easy Demon "The Nightmare" in version 1.2?',
        options: ['Serponge', 'Jax', 'FunnyGame'],
        correct: 1,
        image: KATSEYE_IMAGES.q15,
    },
    {
        question: 'Which Ocular Nebula track plays when entering Practice Mode?',
        options: ['Stay Inside Me', 'Snowy Night', 'BossaBossa'],
        correct: 0,
        image: KATSEYE_IMAGES.q16,
    },
    {
        question: 'In what year was the game originally released for iOS and Android mobile platforms?',
        options: ['2012', '2013', '2014'],
        correct: 1,
        image: KATSEYE_IMAGES.q17,
    },
    {
        question: 'Which Egyptian creator coordinated the memory-based Extreme Demon "LIMBO"?',
        options: ['CuLuC', 'Djoxy', 'MindCap'],
        correct: 2,
        image: KATSEYE_IMAGES.q18,
    },
    {
        question: 'Which code in the first Vault of Secrets grants a hidden silver coin icon?',
        options: ['Sparky', 'Lenny', 'Robotop'],
        correct: 0,
        image: KATSEYE_IMAGES.q19,
    },
    {
        question: 'Which code unlocks Sparky\'s stolen coin in the second Vault of Secrets?',
        options: ['Seven', 'Glubfub', 'Octocube'],
        correct: 1,
        image: KATSEYE_IMAGES.q20,
    },
    {
        question: 'To how many ticks per second was the avatar physics rigidly capped in version 2.2?',
        options: ['120 TPS', '360 TPS', '240 TPS'],
        correct: 2,
        image: KATSEYE_IMAGES.q21,
    },
    {
        question: 'Which Auto level was the first to receive a "Mythic" rating?',
        options: ['Voyager One', 'Hyperluminal', 'Aperture'],
        correct: 1,
        image: KATSEYE_IMAGES.q22,
    },
    {
        question: 'What is the absolute maximum number of levels the server allows to be uploaded per day?',
        options: ['120 levels', '60 levels', '240 levels'],
        correct: 0,
        image: KATSEYE_IMAGES.q23,
    },
    {
        question: 'What hidden word appears at the start of "Bloodbath" if you hold press there?',
        options: ['Michigun', 'Ggb0y', 'Rotasini'],
        correct: 2,
        image: KATSEYE_IMAGES.q24,
    },
    {
        question: 'Which C++ software library was used to structure the game\'s development?',
        options: ['Cocos2d', 'Unity', 'Unreal Engine'],
        correct: 0,
        image: KATSEYE_IMAGES.q25,
    },
    {
        question: 'What are community-created levels shorter than ten seconds commonly called?',
        options: ['Short', 'Mini', 'Tiny'],
        correct: 2,
        image: KATSEYE_IMAGES.q26,
    },
    {
        question: 'Which custom level has the most likes in the game\'s history?',
        options: ['The Nightmare', 'ReTraY', 'Bloodbath'],
        correct: 1,
        image: KATSEYE_IMAGES.q27,
    },
    {
        question: 'Which animated Auto level earned the first Legendary status in its category?',
        options: ['The Topala Prelude', 'Coaster Mountain', 'Snowy Night'],
        correct: 0,
        image: KATSEYE_IMAGES.q28,
    },
    {
        question: 'Which secret extra-type level can be accessed directly in Geometry Dash Lite?',
        options: ['Fingerdash', 'The challenge', 'Clubstep'],
        correct: 1,
        image: KATSEYE_IMAGES.q29,
    },
    {
        question: 'Who formally designed the official Creeper creature icon for Robert Topala?',
        options: ['Jens', 'Notch', 'Jeb'],
        correct: 1,
        image: KATSEYE_IMAGES.q30,
    },
], 'questionsEn.ts');

export const verticalQuestions: Question[] = questionsEn.slice(-5);
