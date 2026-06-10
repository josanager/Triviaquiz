import { KATSEYE_IMAGES } from './images';
import { validateUniqueQuestionImages } from './validateQuestionImages';

export interface Question {
    question: string;
    options: string[];
    correct: number;
    image: string;
}

export const questions: Question[] = validateUniqueQuestionImages([
    {
        question: '¿Qué país tiene más pirámides registradas en su territorio?',
        options: ['Egipto', 'Sudán', 'México'],
        correct: 1,
        image: KATSEYE_IMAGES.q1,
    },
    {
        question: '¿Cuál es el océano más profundo de la Tierra?',
        options: ['Índico', 'Atlántico', 'Pacífico'],
        correct: 2,
        image: KATSEYE_IMAGES.q2,
    },
    {
        question: '¿Qué director de cine británico firmó las obras maestras Inception e Interstellar?',
        options: ['Christopher Nolan', 'Steven Spielberg', 'Denis Villeneuve'],
        correct: 0,
        image: KATSEYE_IMAGES.q3,
    },
    {
        question: '¿En qué año se produjo la histórica caída del Muro de Berlín?',
        options: ['1989', '1991', '1985'],
        correct: 0,
        image: KATSEYE_IMAGES.q4,
    },
    {
        question: '¿Qué banda británica lanzó el legendario álbum The Dark Side of the Moon?',
        options: ['Pink Floyd', 'Led Zeppelin', 'The Beatles'],
        correct: 0,
        image: KATSEYE_IMAGES.q5,
    },
    {
        question: '¿Qué elemento químico está representado en la tabla periódica con el símbolo \'Au\'?',
        options: ['Plata', 'Oro', 'Cobre'],
        correct: 1,
        image: KATSEYE_IMAGES.q6,
    },
    {
        question: '¿Cuál es la capital oficial de Australia?',
        options: ['Sídney', 'Melbourne', 'Canberra'],
        correct: 2,
        image: KATSEYE_IMAGES.q7,
    },
    {
        question: '¿Qué maestro holandés pintó la icónica obra La joven de la perla?',
        options: ['Johannes Vermeer', 'Rembrandt', 'Vincent van Gogh'],
        correct: 0,
        image: KATSEYE_IMAGES.q8,
    },
    {
        question: '¿Qué criatura marina es conocida por tener tres corazones latiendo a la vez?',
        options: ['El pulpo', 'La ballena', 'El tiburón'],
        correct: 0,
        image: KATSEYE_IMAGES.q9,
    },
    {
        question: '¿Qué exitosa serie de televisión de ciencia ficción se ambienta en el pueblo de Hawkins?',
        options: ['Dark', 'Stranger Things', 'Twin Peaks'],
        correct: 1,
        image: KATSEYE_IMAGES.q10,
    },
    {
        question: '¿Cuál es la novela de ficción más vendida de la historia de la literatura?',
        options: ['Don Quijote', 'Harry Potter', 'El Principito'],
        correct: 0,
        image: KATSEYE_IMAGES.q11,
    },
    {
        question: '¿Qué genio musical compuso su Novena Sinfonía estando completamente sordo?',
        options: ['Mozart', 'Bach', 'Beethoven'],
        correct: 2,
        image: KATSEYE_IMAGES.q12,
    },
    {
        question: '¿En qué territorio geopolítico nació el adictivo videojuego Tetris?',
        options: ['Japón', 'Unión Soviética', 'Estados Unidos'],
        correct: 1,
        image: KATSEYE_IMAGES.q13,
    },
    {
        question: '¿Cuál es el único mamífero del planeta capaz de volar de forma activa?',
        options: ['El murciélago', 'La ardilla voladora', 'El ornitorrinco'],
        correct: 0,
        image: KATSEYE_IMAGES.q14,
    },
    {
        question: '¿Qué actor dio vida al inolvidable personaje de Jack Dawson en Titanic?',
        options: ['Brad Pitt', 'Leonardo DiCaprio', 'Matt Damon'],
        correct: 1,
        image: KATSEYE_IMAGES.q15,
    },
    {
        question: '¿Cuál es el río más largo y caudaloso del mundo?',
        options: ['Amazonas', 'Nilo', 'Misisipi'],
        correct: 0,
        image: KATSEYE_IMAGES.q16,
    },
    {
        question: '¿Qué científica polaca hizo historia al ganar dos Premios Nobel en distintas disciplinas?',
        options: ['Marie Curie', 'Rosalind Franklin', 'Lise Meitner'],
        correct: 0,
        image: KATSEYE_IMAGES.q17,
    },
    {
        question: '¿Cuál es la montaña o volcán más alto conocido en todo el sistema solar?',
        options: ['Monte Everest', 'Monte Olimpo', 'Mauna Kea'],
        correct: 1,
        image: KATSEYE_IMAGES.q18,
    },
    {
        question: '¿En qué histórica ciudad europea se encuentra el imponente Coliseo?',
        options: ['Florencia', 'Venecia', 'Roma'],
        correct: 2,
        image: KATSEYE_IMAGES.q19,
    },
    {
        question: '¿Qué mítica banda de rock compuso e interpretó la compleja pieza Bohemian Rhapsody?',
        options: ['Queen', 'AC/DC', 'The Who'],
        correct: 0,
        image: KATSEYE_IMAGES.q20,
    },
    {
        question: '¿Qué componente gaseoso representa la mayor parte del aire que respiramos?',
        options: ['Oxígeno', 'Nitrógeno', 'Dióxido de carbono'],
        correct: 1,
        image: KATSEYE_IMAGES.q21,
    },
    {
        question: '¿Quién es el autor de la influyente novela de crítica política 1984?',
        options: ['Aldous Huxley', 'George Orwell', 'Ray Bradbury'],
        correct: 1,
        image: KATSEYE_IMAGES.q22,
    },
    {
        question: '¿Qué país europeo popularizó la tradición global del árbol de Navidad?',
        options: ['Alemania', 'Noruega', 'Inglaterra'],
        correct: 0,
        image: KATSEYE_IMAGES.q23,
    },
    {
        question: '¿A qué velocidad aproximada viaja la luz en el vacío?',
        options: ['300.000 km/s', '150.000 km/s', '500.000 km/s'],
        correct: 0,
        image: KATSEYE_IMAGES.q24,
    },
    {
        question: '¿Qué célebre saga del cine de ciencia ficción incluye el planeta desértico Tatooine?',
        options: ['Star Trek', 'Star Wars', 'Dune'],
        correct: 1,
        image: KATSEYE_IMAGES.q25,
    },
    {
        question: '¿Qué maestro malagueño colideró la revolución del movimiento cubista?',
        options: ['Salvador Dalí', 'Pablo Picasso', 'Joan Miró'],
        correct: 1,
        image: KATSEYE_IMAGES.q26,
    },
    {
        question: '¿Cuál es el órgano de mayor extensión en el cuerpo humano?',
        options: ['El hígado', 'El cerebro', 'La piel'],
        correct: 2,
        image: KATSEYE_IMAGES.q27,
    },
    {
        question: '¿En qué año revolucionó Apple el mercado telefónico con el primer iPhone?',
        options: ['2005', '2007', '2009'],
        correct: 1,
        image: KATSEYE_IMAGES.q28,
    },
    {
        question: '¿Qué deidad de la mitología nórdica empuña el devastador martillo Mjolnir?',
        options: ['Odín', 'Loki', 'Thor'],
        correct: 2,
        image: KATSEYE_IMAGES.q29,
    },
    {
        question: '¿Qué obra de ingeniería conecta directamente el océano Atlántico con el Pacífico?',
        options: ['Canal de Suez', 'Canal de Panamá', 'Canal de Corinto'],
        correct: 1,
        image: KATSEYE_IMAGES.q30,
    },
], 'questions.ts');

export const verticalQuestions: Question[] = questions.slice(-5);
