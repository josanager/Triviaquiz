import { Question } from './questions';
import { KATSEYE_IMAGES } from './images';
import { validateUniqueQuestionImages } from './validateQuestionImages';

// Guardrail: TriviaVideoEn must stay fully in English.
// Any future content swap needs a proper English adaptation here,
// not a copy of the Spanish source text.
export const questionsEn: Question[] = validateUniqueQuestionImages([
    {
        question: 'Which country has the most pyramids officially recorded within its territory?',
        options: ['Egypt', 'Sudan', 'Mexico'],
        correct: 1,
        image: KATSEYE_IMAGES.q1,
    },
    {
        question: 'Which is the deepest ocean on Earth?',
        options: ['Indian', 'Atlantic', 'Pacific'],
        correct: 2,
        image: KATSEYE_IMAGES.q2,
    },
    {
        question: 'Which British film director made the acclaimed films Inception and Interstellar?',
        options: ['Christopher Nolan', 'Steven Spielberg', 'Denis Villeneuve'],
        correct: 0,
        image: KATSEYE_IMAGES.q3,
    },
    {
        question: 'In what year did the historic fall of the Berlin Wall take place?',
        options: ['1989', '1991', '1985'],
        correct: 0,
        image: KATSEYE_IMAGES.q4,
    },
    {
        question: 'Which British band released the legendary album The Dark Side of the Moon?',
        options: ['Pink Floyd', 'Led Zeppelin', 'The Beatles'],
        correct: 0,
        image: KATSEYE_IMAGES.q5,
    },
    {
        question: 'Which chemical element is represented on the periodic table by the symbol \'Au\'?',
        options: ['Silver', 'Gold', 'Copper'],
        correct: 1,
        image: KATSEYE_IMAGES.q6,
    },
    {
        question: 'What is the official capital of Australia?',
        options: ['Sydney', 'Melbourne', 'Canberra'],
        correct: 2,
        image: KATSEYE_IMAGES.q7,
    },
    {
        question: 'Which Dutch master painted the iconic work Girl with a Pearl Earring?',
        options: ['Johannes Vermeer', 'Rembrandt', 'Vincent van Gogh'],
        correct: 0,
        image: KATSEYE_IMAGES.q8,
    },
    {
        question: 'Which marine creature is known for having three hearts beating at once?',
        options: ['Octopus', 'Whale', 'Shark'],
        correct: 0,
        image: KATSEYE_IMAGES.q9,
    },
    {
        question: 'Which hit science fiction television series is set in the town of Hawkins?',
        options: ['Dark', 'Stranger Things', 'Twin Peaks'],
        correct: 1,
        image: KATSEYE_IMAGES.q10,
    },
    {
        question: 'Which is the best-selling fiction novel in literary history?',
        options: ['Don Quixote', 'Harry Potter', 'The Little Prince'],
        correct: 0,
        image: KATSEYE_IMAGES.q11,
    },
    {
        question: 'Which musical genius composed his Ninth Symphony while completely deaf?',
        options: ['Mozart', 'Bach', 'Beethoven'],
        correct: 2,
        image: KATSEYE_IMAGES.q12,
    },
    {
        question: 'In which geopolitical territory was the addictive video game Tetris born?',
        options: ['Japan', 'Soviet Union', 'United States'],
        correct: 1,
        image: KATSEYE_IMAGES.q13,
    },
    {
        question: 'Which is the only mammal on the planet capable of true active flight?',
        options: ['Bat', 'Flying squirrel', 'Platypus'],
        correct: 0,
        image: KATSEYE_IMAGES.q14,
    },
    {
        question: 'Which actor played the unforgettable Jack Dawson in Titanic?',
        options: ['Brad Pitt', 'Leonardo DiCaprio', 'Matt Damon'],
        correct: 1,
        image: KATSEYE_IMAGES.q15,
    },
    {
        question: 'Which is the longest and most voluminous river in the world?',
        options: ['Amazon', 'Nile', 'Mississippi'],
        correct: 0,
        image: KATSEYE_IMAGES.q16,
    },
    {
        question: 'Which Polish scientist made history by winning two Nobel Prizes in different disciplines?',
        options: ['Marie Curie', 'Rosalind Franklin', 'Lise Meitner'],
        correct: 0,
        image: KATSEYE_IMAGES.q17,
    },
    {
        question: 'What is the highest mountain or volcano known anywhere in the solar system?',
        options: ['Mount Everest', 'Olympus Mons', 'Mauna Kea'],
        correct: 1,
        image: KATSEYE_IMAGES.q18,
    },
    {
        question: 'In which historic European city is the imposing Colosseum located?',
        options: ['Florence', 'Venice', 'Rome'],
        correct: 2,
        image: KATSEYE_IMAGES.q19,
    },
    {
        question: 'Which legendary rock band wrote and performed the complex piece Bohemian Rhapsody?',
        options: ['Queen', 'AC/DC', 'The Who'],
        correct: 0,
        image: KATSEYE_IMAGES.q20,
    },
    {
        question: 'Which gaseous component makes up most of the air we breathe?',
        options: ['Oxygen', 'Nitrogen', 'Carbon dioxide'],
        correct: 1,
        image: KATSEYE_IMAGES.q21,
    },
    {
        question: 'Who is the author of the influential political critique novel 1984?',
        options: ['Aldous Huxley', 'George Orwell', 'Ray Bradbury'],
        correct: 1,
        image: KATSEYE_IMAGES.q22,
    },
    {
        question: 'Which European country popularized the global tradition of the Christmas tree?',
        options: ['Germany', 'Norway', 'England'],
        correct: 0,
        image: KATSEYE_IMAGES.q23,
    },
    {
        question: 'At what approximate speed does light travel in a vacuum?',
        options: ['300,000 km/s', '150,000 km/s', '500,000 km/s'],
        correct: 0,
        image: KATSEYE_IMAGES.q24,
    },
    {
        question: 'Which famous science fiction film saga includes the desert planet Tatooine?',
        options: ['Star Trek', 'Star Wars', 'Dune'],
        correct: 1,
        image: KATSEYE_IMAGES.q25,
    },
    {
        question: 'Which master from Malaga co-led the revolution of the Cubist movement?',
        options: ['Salvador Dali', 'Pablo Picasso', 'Joan Miro'],
        correct: 1,
        image: KATSEYE_IMAGES.q26,
    },
    {
        question: 'Which is the largest organ in the human body?',
        options: ['Liver', 'Brain', 'Skin'],
        correct: 2,
        image: KATSEYE_IMAGES.q27,
    },
    {
        question: 'In what year did Apple reshape the phone market with the first iPhone?',
        options: ['2005', '2007', '2009'],
        correct: 1,
        image: KATSEYE_IMAGES.q28,
    },
    {
        question: 'Which deity from Norse mythology wields the devastating hammer Mjolnir?',
        options: ['Odin', 'Loki', 'Thor'],
        correct: 2,
        image: KATSEYE_IMAGES.q29,
    },
    {
        question: 'Which engineering work directly connects the Atlantic Ocean with the Pacific Ocean?',
        options: ['Suez Canal', 'Panama Canal', 'Corinth Canal'],
        correct: 1,
        image: KATSEYE_IMAGES.q30,
    },
], 'questionsEn.ts');

export const verticalQuestions: Question[] = questionsEn.slice(-5);
