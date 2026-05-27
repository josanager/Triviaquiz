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
        question: '¿Cuál fue el nombre original del juego durante su fase de desarrollo beta?',
        options: ['Block Jump', 'Neon Dash', 'Geometry Jump'],
        correct: 2,
        image: KATSEYE_IMAGES.q1,
    },
    {
        question: '¿Quién diseñó "Demon Park", el nivel que impulsó la creación del rango "Demon"?',
        options: ['Darnoc', 'M2coL', 'Riot'],
        correct: 1,
        image: KATSEYE_IMAGES.q2,
    },
    {
        question: '¿Qué nivel de plataformas obtuvo el primer rango calificado de "Legendary"?',
        options: ['Snowy Night', 'White Space', 'Coaster Mountain'],
        correct: 2,
        image: KATSEYE_IMAGES.q3,
    },
    {
        question: '¿Cuál fue el primer nivel de estilo de avance clásico calificado como "Mythic"?',
        options: ['Astralith', 'ORBIT', 'LIMBO'],
        correct: 0,
        image: KATSEYE_IMAGES.q4,
    },
    {
        question: '¿Qué nivel de plataformas obtuvo la primera condecoración mundial de rango "Mythic"?',
        options: ['The Towerverse', 'Coaster Mountain', 'Aperture'],
        correct: 0,
        image: KATSEYE_IMAGES.q5,
    },
    {
        question: '¿Cómo se llama el desarrollador sueco fundador de la empresa RobTop Games?',
        options: ['Richard Topala', 'Robert Topala', 'Ruben Topala'],
        correct: 1,
        image: KATSEYE_IMAGES.q6,
    },
    {
        question: '¿Cuál fue el primer juego de Robert Topala lanzado en la plataforma Newgrounds en 2010?',
        options: ['Memory Mastermind', 'Bounce Ball Thingy', 'Boomlings'],
        correct: 1,
        image: KATSEYE_IMAGES.q7,
    },
    {
        question: '¿En qué lenguaje de programación base se codificó el núcleo de Geometry Dash?',
        options: ['Java', 'C#', 'C++'],
        correct: 2,
        image: KATSEYE_IMAGES.q8,
    },
    {
        question: '¿Quién creó "Nine Circles", el nivel que generó su propio estilo estético parpadeante?',
        options: ['Zobros', 'Cyclic', 'Riot'],
        correct: 0,
        image: KATSEYE_IMAGES.q9,
    },
    {
        question: '¿Quién completó la verificación legítima del célebre Extreme Demon "Silent Clubstep"?',
        options: ['Zoink', 'paqoe', 'Sunix'],
        correct: 1,
        image: KATSEYE_IMAGES.q10,
    },
    {
        question: '¿Quién creó en solitario el Extreme Demon de temática de playa "Tidal Wave"?',
        options: ['Zoink', 'Knobbelboy', 'OniLink'],
        correct: 2,
        image: KATSEYE_IMAGES.q11,
    },
    {
        question: '¿Qué jugador de élite completó de forma oficial la verificación de "Tidal Wave"?',
        options: ['Zoink', 'Trick', 'wPopoff'],
        correct: 0,
        image: KATSEYE_IMAGES.q12,
    },
    {
        question: '¿Qué jugador coordinó y verificó la célebre mega-colaboración "Bloodbath" en 2015?',
        options: ['Michigun', 'Riot', 'TrusTa'],
        correct: 1,
        image: KATSEYE_IMAGES.q13,
    },
    {
        question: '¿Cuál era el nombre original del Extreme Demon "Astral Divinity" antes del aviso de cese?',
        options: ['Devil Vortex', 'Bloodlust', 'God Eater'],
        correct: 2,
        image: KATSEYE_IMAGES.q14,
    },
    {
        question: '¿Quién diseñó el histórico e influyente Easy Demon "The Nightmare" en la versión 1.2?',
        options: ['Serponge', 'Jax', 'FunnyGame'],
        correct: 1,
        image: KATSEYE_IMAGES.q15,
    },
    {
        question: '¿Qué composición de Ocular Nebula suena al entrar en el Modo Práctica?',
        options: ['Stay Inside Me', 'Snowy Night', 'BossaBossa'],
        correct: 0,
        image: KATSEYE_IMAGES.q16,
    },
    {
        question: '¿En qué año se lanzó el juego originalmente para plataformas móviles iOS y Android?',
        options: ['2012', '2013', '2014'],
        correct: 1,
        image: KATSEYE_IMAGES.q17,
    },
    {
        question: '¿Qué creador de origen egipcio coordinó el Extreme Demon de memoria "LIMBO"?',
        options: ['CuLuC', 'Djoxy', 'MindCap'],
        correct: 2,
        image: KATSEYE_IMAGES.q18,
    },
    {
        question: '¿Qué código de la primera bóveda de secretos otorga un icono oculto de moneda de plata?',
        options: ['Sparky', 'Lenny', 'Robotop'],
        correct: 0,
        image: KATSEYE_IMAGES.q19,
    },
    {
        question: '¿Qué código libera la moneda robada de Sparky en la segunda bóveda de secretos?',
        options: ['Seven', 'Glubfub', 'Octocube'],
        correct: 1,
        image: KATSEYE_IMAGES.q20,
    },
    {
        question: '¿A cuántos ticks por segundo se limitó rígidamente la física del avatar en la versión 2.2?',
        options: ['120 TPS', '360 TPS', '240 TPS'],
        correct: 2,
        image: KATSEYE_IMAGES.q21,
    },
    {
        question: '¿Cuál fue el primer nivel de tipo automático (Auto) calificado como "Mythic"?',
        options: ['Voyager One', 'Hyperluminal', 'Aperture'],
        correct: 1,
        image: KATSEYE_IMAGES.q22,
    },
    {
        question: '¿Cuál es el límite máximo absoluto de subida de niveles que el servidor admite por día?',
        options: ['120 niveles', '60 niveles', '240 niveles'],
        correct: 0,
        image: KATSEYE_IMAGES.q23,
    },
    {
        question: '¿Qué palabra oculta aparece al inicio del nivel "Bloodbath" si se mantiene presionado?',
        options: ['Michigun', 'Ggb0y', 'Rotasini'],
        correct: 2,
        image: KATSEYE_IMAGES.q24,
    },
    {
        question: '¿Qué librería de software en lenguaje C++ sirvió para estructurar el desarrollo del juego?',
        options: ['Cocos2d', 'Unity', 'Unreal Engine'],
        correct: 0,
        image: KATSEYE_IMAGES.q25,
    },
    {
        question: '¿Cómo se denominan los niveles creados por la comunidad de menos de diez segundos?',
        options: ['Short', 'Mini', 'Tiny'],
        correct: 2,
        image: KATSEYE_IMAGES.q26,
    },
    {
        question: '¿Cuál es el nivel personalizado con más "me gusta" en la historia del juego?',
        options: ['The Nightmare', 'ReTraY', 'Bloodbath'],
        correct: 1,
        image: KATSEYE_IMAGES.q27,
    },
    {
        question: '¿Qué nivel de animación (Auto) obtuvo el primer estatus Legendary de su categoría?',
        options: ['The Topala Prelude', 'Coaster Mountain', 'Snowy Night'],
        correct: 0,
        image: KATSEYE_IMAGES.q28,
    },
    {
        question: '¿Qué nivel secreto de tipo extra se puede acceder de forma directa en Geometry Dash Lite?',
        options: ['Fingerdash', 'The challenge', 'Clubstep'],
        correct: 1,
        image: KATSEYE_IMAGES.q29,
    },
    {
        question: '¿Quién diseñó formalmente el icono oficial de la criatura Creeper para Robert Topala?',
        options: ['Jens', 'Notch', 'Jeb'],
        correct: 1,
        image: KATSEYE_IMAGES.q30,
    },
], 'questions.ts');

export const verticalQuestions: Question[] = questions.slice(-5);
