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
        question: '¿Qué ocupación tenía Mateo antes de seguir a Jesús como discípulo?',
        options: ['Pescador', 'Cobrador de impuestos', 'Carpintero'],
        correct: 1,
        image: KATSEYE_IMAGES.q1,
    },
    {
        question: '¿En qué ciudad nació Jesús de Nazaret según los relatos de los Evangelios?',
        options: ['Nazaret', 'Jerusalén', 'Belén'],
        correct: 2,
        image: KATSEYE_IMAGES.q2,
    },
    {
        question: '¿Quién traicionó a Jesús entregándolo por treinta monedas de plata?',
        options: ['Tomás el Dídimo', 'Judas Iscariote', 'Simón Pedro'],
        correct: 1,
        image: KATSEYE_IMAGES.q3,
    },
    {
        question: '¿Qué milagro realiza Jesús durante las bodas de Caná?',
        options: ['Agua en vino', 'Multiplicar panes', 'Curar un ciego'],
        correct: 0,
        image: KATSEYE_IMAGES.q4,
    },
    {
        question: '¿Qué personaje del Nuevo Testamento escribió la mayor cantidad de epístolas?',
        options: ['Juan el Apóstol', 'Simón Pedro', 'Pablo de Tarso'],
        correct: 2,
        image: KATSEYE_IMAGES.q5,
    },
    {
        question: '¿Cómo murió el rey Herodes Agripa I según el libro de Hechos?',
        options: ['Comido por gusanos', 'Caída de caballo', 'Decapitado en prisión'],
        correct: 0,
        image: KATSEYE_IMAGES.q6,
    },
    {
        question: '¿En qué isla estaba desterrado Juan cuando escribió el Apocalipsis?',
        options: ['Malta', 'Chipre', 'Patmos'],
        correct: 2,
        image: KATSEYE_IMAGES.q7,
    },
    {
        question: '¿Qué sobrenombre les dio Jesús a los hermanos Jacobo y Juan?',
        options: ['Pescadores de hombres', 'Columnas de fe', 'Hijos del trueno'],
        correct: 2,
        image: KATSEYE_IMAGES.q8,
    },
    {
        question: '¿A qué personaje resucitó Jesús en Betania tras llevar cuatro días muerto?',
        options: ['Jairo', 'Lázaro', 'Bartimeo'],
        correct: 1,
        image: KATSEYE_IMAGES.q9,
    },
    {
        question: '¿Qué animal habló milagrosamente a Balaam para reprenderlo en su camino?',
        options: ['Una serpiente', 'Un gran pez', 'Una burra'],
        correct: 2,
        image: KATSEYE_IMAGES.q10,
    },
    {
        question: '¿Quién fue el primer mártir de la iglesia cristiana primitiva en Hechos?',
        options: ['Felipe', 'Santiago', 'Esteban'],
        correct: 2,
        image: KATSEYE_IMAGES.q11,
    },
    {
        question: '¿Qué señal específica pidió Gedeón a Dios para confirmar su victoria militar?',
        options: ['Fuego del cielo', 'Un vellón mojado', 'Sombra que retrocede'],
        correct: 1,
        image: KATSEYE_IMAGES.q12,
    },
    {
        question: '¿Cuál era el oficio original de los hermanos Simón Pedro y Andrés?',
        options: ['Pastores', 'Carpinteros', 'Pescadores'],
        correct: 2,
        image: KATSEYE_IMAGES.q13,
    },
    {
        question: '¿Qué fariseo y líder judío visitó a Jesús de noche para interrogarlo?',
        options: ['Nicodemo', 'Gamaliel', 'Caifás'],
        correct: 0,
        image: KATSEYE_IMAGES.q14,
    },
    {
        question: '¿En qué monte recibió Moisés las Tablas de la Ley con los Diez Mandamientos?',
        options: ['Nebo', 'Carmelo', 'Sinaí'],
        correct: 2,
        image: KATSEYE_IMAGES.q15,
    },
    {
        question: '¿Qué célebre jueza de Israel lideró un ejército junto al general Barac?',
        options: ['Débora', 'Jael', 'Rut'],
        correct: 0,
        image: KATSEYE_IMAGES.q16,
    },
    {
        question: '¿Cuántas personas sobrevivieron en total dentro del arca durante el Diluvio?',
        options: ['Ocho', 'Doce', 'Cuatro'],
        correct: 0,
        image: KATSEYE_IMAGES.q17,
    },
    {
        question: '¿Quién se convirtió en el sucesor directo del profeta Elías?',
        options: ['Jeremías', 'Eliseo', 'Isaías'],
        correct: 1,
        image: KATSEYE_IMAGES.q18,
    },
    {
        question: '¿Qué gobernador romano se lavó las manos durante el juicio contra Jesús?',
        options: ['Poncio Pilato', 'Herodes Antipas', 'Félix el gobernador'],
        correct: 0,
        image: KATSEYE_IMAGES.q19,
    },
    {
        question: '¿Qué antigua ciudad vio caer sus murallas tras el sonido de las trompetas?',
        options: ['Jericó', 'Nínive', 'Babilonia'],
        correct: 0,
        image: KATSEYE_IMAGES.q20,
    },
    {
        question: '¿En qué idioma se redactó originalmente la mayor parte del Nuevo Testamento?',
        options: ['Hebreo', 'Latín', 'Griego antiguo'],
        correct: 2,
        image: KATSEYE_IMAGES.q21,
    },
    {
        question: '¿Quién reconoció proféticamente a Jesús como el Mesías siendo este un bebé?',
        options: ['Zacarías', 'Simeón', 'Cornelio'],
        correct: 1,
        image: KATSEYE_IMAGES.q22,
    },
    {
        question: '¿Qué apóstol se negó a creer en la resurrección hasta tocar las heridas?',
        options: ['Tomás', 'Felipe', 'Tadeo'],
        correct: 0,
        image: KATSEYE_IMAGES.q23,
    },
    {
        question: '¿Hacia qué ciudad viajaba Saulo cuando experimentó su milagrosa conversión?',
        options: ['Antioquía', 'Damasco', 'Tarso'],
        correct: 1,
        image: KATSEYE_IMAGES.q24,
    },
    {
        question: '¿Qué suntuoso regalo principal le llevó la reina de Sabá al rey Salomón?',
        options: ['Oro y especias', 'Piedras preciosas', 'Sedas finas'],
        correct: 0,
        image: KATSEYE_IMAGES.q25,
    },
    {
        question: '¿Quiénes fueron arrojados al horno de fuego por orden de Nabucodonosor?',
        options: ['Hijos de Aarón', 'Amigos de Daniel', 'Hermanos de José'],
        correct: 1,
        image: KATSEYE_IMAGES.q26,
    },
    {
        question: '¿Qué profeta pasó tres días dentro de un gran pez por desobediencia?',
        options: ['Jonás', 'Miqueas', 'Oseas'],
        correct: 0,
        image: KATSEYE_IMAGES.q27,
    },
    {
        question: '¿Cuántas veces negó Pedro conocer a Jesús antes del canto del gallo?',
        options: ['Cuatro veces', 'Tres veces', 'Dos veces'],
        correct: 1,
        image: KATSEYE_IMAGES.q28,
    },
    {
        question: '¿Qué personaje bíblico es el máximo referente de paciencia ante la desgracia?',
        options: ['Isaac', 'Job', 'Abraham'],
        correct: 1,
        image: KATSEYE_IMAGES.q29,
    },
    {
        question: '¿Quién fue el monarca más joven en comenzar su reinado en Judá?',
        options: ['Josías', 'Ezequías', 'Joás'],
        correct: 2,
        image: KATSEYE_IMAGES.q30,
    },
], 'questions.ts');

export const bonusQuestion: Question = {
    question: '¿Quién se quedó dormido durante un largo discurso de Pablo y cayó desde un tercer piso?',
    options: ['Onésimo', 'Éutico', 'Timoteo'],
    correct: 1,
    image: KATSEYE_IMAGES.q31,
};

export const verticalQuestions: Question[] = questions.slice(-5);
