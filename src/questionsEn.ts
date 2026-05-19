import { Question } from './questions';
import { METALLICA_IMAGES } from './images';
import { validateUniqueQuestionImages } from './validateQuestionImages';

export const questionsEn: Question[] = validateUniqueQuestionImages([
    {
        question: '¿Quién propuso originalmente el nombre "Metallica" antes de que Lars Ulrich lo convenciera de usarlo para la banda?',
        options: ['James Hetfield', 'Ron Quintana', 'Dave Mustaine'],
        correct: 1,
        image: METALLICA_IMAGES.q1,
    },
    {
        question: '¿Qué errata apareció en el nombre de la banda en los créditos de "Hit the Lights" en el compilatorio Metal Massacre (1982)?',
        options: ['Metalica', 'Mettallica', 'Metallika'],
        correct: 1,
        image: METALLICA_IMAGES.q2,
    },
    {
        question: 'En su primer ensayo en 1981, ¿qué deficiencia técnica de la batería de Lars frustró inicialmente a James Hetfield?',
        options: ['Pedal del bombo oxidado', 'Platillos agrietados e inestables', 'Parche de caja roto'],
        correct: 1,
        image: METALLICA_IMAGES.q3,
    },
    {
        question: '¿Qué instrumento estudió formalmente James Hetfield a los 9 años por imposición de su madre?',
        options: ['El piano', 'El violín', 'La batería'],
        correct: 0,
        image: METALLICA_IMAGES.q4,
    },
    {
        question: '¿Qué condición puso Cliff Burton en 1982 para unirse formalmente a Metallica?',
        options: ['Coautoría instrumental total', 'Que la banda se mudara a San Francisco', 'Un contrato exclusivo con Megaforce'],
        correct: 1,
        image: METALLICA_IMAGES.q5,
    },
    {
        question: '¿De qué color inusual se imprimió la carátula de Ride the Lightning en Francia (1984) por un error de distribución?',
        options: ['Verde', 'Rojo metálico', 'Amarillo mostaza'],
        correct: 0,
        image: METALLICA_IMAGES.q6,
    },
    {
        question: '¿Quién exclamó "Whoa, that\'s like creeping death!" viendo la película Los diez mandamientos en casa de Cliff Burton?',
        options: ['James Hetfield', 'Lars Ulrich', 'Cliff Burton'],
        correct: 2,
        image: METALLICA_IMAGES.q7,
    },
    {
        question: 'El riff de "Die by my hand" (en "Creeping Death") era originalmente de un tema de Kirk Hammett en Exodus. ¿Cómo se titulaba?',
        options: ['Impaler', 'Die by His Hand', 'Bonded by Blood'],
        correct: 1,
        image: METALLICA_IMAGES.q8,
    },
    {
        question: 'Sin contar "(Anesthesia)", ¿cuál es la única canción de Kill \'Em All acreditada exclusivamente a James Hetfield?',
        options: ['Motorbreath', 'Whiplash', 'Seek & Destroy'],
        correct: 0,
        image: METALLICA_IMAGES.q9,
    },
    {
        question: '¿Cuál fue el primer álbum de rock que compró Lars Ulrich tras asistir a un concierto en 1973?',
        options: ['In Rock (Deep Purple)', 'Fireball (Deep Purple)', 'Paranoid (Black Sabbath)'],
        correct: 1,
        image: METALLICA_IMAGES.q10,
    },
    {
        question: 'En su audición de 1986, ¿qué propuesta cómica de improvisación de Les Claypool fue recibida con total seriedad por la banda?',
        options: ['Un jam de los Isley Brothers', 'Tocar "Orion" en funk slap', 'Invertir las líneas de guitarra'],
        correct: 0,
        image: METALLICA_IMAGES.q11,
    },
    {
        question: '¿Cómo iba vestido Les Claypool a su audición con Metallica en 1986, contrastando con el estilo del grupo?',
        options: ['Traje formal negro', 'Mohawk rubio, pantalones skater y tenis desiguales', 'Chaleco de cuero con remaches'],
        correct: 1,
        image: METALLICA_IMAGES.q12,
    },
    {
        question: 'Como rito de iniciación a finales de 1986, ¿qué alimento picante obligaron a consumir a Jason Newsted?',
        options: ['Una cucharada de wasabi puro', 'Chiles jalapeños en vinagre', 'Curry tailandés concentrado'],
        correct: 0,
        image: METALLICA_IMAGES.q13,
    },
    {
        question: 'El pasaje recitado al final de "To Live Is to Die" ("When a man lies...") es una adaptación de versos de:',
        options: ['El clérigo alemán Paul Gerhardt', 'El filósofo Friedrich Nietzsche', 'El poeta inglés John Donne'],
        correct: 0,
        image: METALLICA_IMAGES.q14,
    },
    {
        question: '¿Qué medida tomó la banda con la película Johnny Got His Gun para evitar los altos costes de licencia del video de "One"?',
        options: ['Compraron los derechos de la película', 'Firmaron regalías de por vida', 'Recrearon las escenas con actores'],
        correct: 0,
        image: METALLICA_IMAGES.q15,
    },
    {
        question: '¿Qué baterista de thrash bromeaba con que el pasaje de doble bombo en "One" era un plagio de su banda?',
        options: ['Mick Hughes', 'Gene Hoglan (Dark Angel)', 'Tom Hunting'],
        correct: 1,
        image: METALLICA_IMAGES.q16,
    },
    {
        question: '¿A quién perteneció originalmente el icónico anillo plateado de calavera que James Hetfield usa habitualmente en vivo?',
        options: ['A su abuelo paterno', 'A Cliff Burton', 'A su primer mentor de guitarra'],
        correct: 1,
        image: METALLICA_IMAGES.q17,
    },
    {
        question: 'Lanzada en 72 Seasons (2023), ¿cuál es la canción de estudio original más larga en la discografía de Metallica?',
        options: ['Suicide & Redemption', 'Inamorata', 'To Live Is to Die'],
        correct: 1,
        image: METALLICA_IMAGES.q18,
    },
    {
        question: '¿En qué base científica de la Antártida tocó Metallica su histórico concierto "Freeze \'Em All" en 2013?',
        options: ['Base McMurdo', 'Base Carlini (argentina)', 'Base Amundsen-Scott'],
        correct: 1,
        image: METALLICA_IMAGES.q19,
    },
    {
        question: '¿De dónde proviene la madera con la que Ken Lawrence construyó "Carl", la emblemática guitarra de James Hetfield?',
        options: ['Del garaje de Carlson Blvd', 'Del autobús del accidente de 1986', 'Del escenario del club "The Stone"'],
        correct: 0,
        image: METALLICA_IMAGES.q20,
    },
    {
        question: '¿En qué famosa obra pictórica del siglo XV se inspira estéticamente el videoclip de "Until It Sleeps" (1996)?',
        options: ['El jardín de las delicias (El Bosco)', 'El grito (Edvard Munch)', 'El triunfo de la muerte (Brueghel)'],
        correct: 0,
        image: METALLICA_IMAGES.q21,
    },
    {
        question: 'En el proyecto humorístico Spastik Children, ¿qué instrumento tocaba James Hetfield bajo el alias "Bobby Brady"?',
        options: ['El bajo eléctrico y coros', 'La batería y coros', 'El saxofón tenor'],
        correct: 1,
        image: METALLICA_IMAGES.q22,
    },
    {
        question: '¿Qué alias profano usó Kirk Hammett al tocar el bajo en Spastik Children tras el fallecimiento de Cliff Burton?',
        options: ['Johnny Problem', 'Goddamn It', 'Slucky McDonald'],
        correct: 1,
        image: METALLICA_IMAGES.q23,
    },
    {
        question: '¿Cuál es el título real de la polémica foto de Andrés Serrano usada en la portada del álbum Load (1996)?',
        options: ['Blood and Sperm III', 'Piss and Blood', 'Immersion (Piss Christ)'],
        correct: 0,
        image: METALLICA_IMAGES.q24,
    },
    {
        question: 'Siguiendo el concepto de Load, ¿qué obra del fotógrafo Andrés Serrano ilustra la carátula de Reload (1997)?',
        options: ['Piss and Blood', 'Blood and Urine I', 'Bovine Infusion'],
        correct: 0,
        image: METALLICA_IMAGES.q25,
    },
    {
        question: '¿En qué canción de Reload colaboró la cantante británica Marianne Faithfull aportando texturas vocales?',
        options: ['The Unforgiven II', 'The Memory Remains', 'Fixxxer'],
        correct: 1,
        image: METALLICA_IMAGES.q26,
    },
    {
        question: '¿Qué crítica sarcástica hizo Jason Newsted sobre "The Memory Remains" al cuestionar el giro de Reload?',
        options: [
            'Dijo que jamás habría comprado el CD si lo oía antes en la radio',
            'Denunció que silenciaron su bajo',
            'Dijo que el videoclip parecía una burla',
        ],
        correct: 0,
        image: METALLICA_IMAGES.q27,
    },
    {
        question: '¿En qué festival europeo interpretó Metallica "The Frayed Ends of Sanity" completa por primera vez en vivo (2014)?',
        options: ['30º Aniversario en el Fillmore', 'Sonisphere (Helsinki)', 'Rock in Rio'],
        correct: 1,
        image: METALLICA_IMAGES.q28,
    },
    {
        question: 'En 2004, ¿en qué serie animada de Disney hicieron voces James Hetfield y Lars Ulrich como dragones adolescentes?',
        options: ['Dave, el bárbaro', 'Jake Long: El dragón occidental', 'Gárgolas'],
        correct: 0,
        image: METALLICA_IMAGES.q29,
    },
    {
        question: '¿Qué suceso familiar inspiró la letra de la devastadora canción "The God That Failed"?',
        options: [
            'El abandono de su padre a los 13 años',
            'La muerte de su madre por cáncer al rechazar medicina por dogma religioso',
            'La muerte de su mejor amigo de infancia',
        ],
        correct: 1,
        image: METALLICA_IMAGES.q30,
    },
], 'questionsEn.ts');

export const verticalQuestions: Question[] = questionsEn.slice(-5);
