import { MORAT_IMAGES } from './images';

export interface Question {
    question: string;
    options: string[];
    correct: number;
    image: string;
}

export const questions: Question[] = [
    {
        // Q1: Origen del nombre "Malta" - Grupo
        question: "¿Cuál es el origen exacto del nombre original 'Malta'?",
        options: ["Nombre de la perra de un integrante", "Acrónimo de sus padres", "Una bebida tradicional"],
        correct: 0,
        image: MORAT_IMAGES.group_1_studio
    },
    {
        // Q2: Por qué abandonaron "Malta" - Grupo
        question: "¿Por qué tuvieron que abandonar el nombre 'Malta'?",
        options: ["Marca de refrescos en España", "Banda brasileña con nombre registrado", "Sugerencia de Pedro Malaver"],
        correct: 1,
        image: MORAT_IMAGES.group_2_urban
    },
    {
        // Q3: Dueño de "La Morat" - Grupo/backstage
        question: "¿Quién era el dueño de la finca 'La Morat'?",
        options: ["Padre de Juan Pablo Isaza", "Antonio de Morat (familiar de Alejandro Posada)", "Familia Vargas Morales"],
        correct: 1,
        image: MORAT_IMAGES.group_4_backstage
    },
    {
        // Q4: Primer concierto en Bogotá - Concierto
        question: "¿Dónde fue su primer concierto oficial en Bogotá?",
        options: ["Bar La Tea", "Restaurante vegano", "Universidad de los Andes"],
        correct: 0,
        image: MORAT_IMAGES.concert_1_stage
    },
    {
        // Q5: Podcast de Simón - Simón
        question: "¿Cómo se llama el podcast de Simón Vargas y Nath Campos?",
        options: ["Simón dice, Nath contradice", "Relatos de la orilla de la luz", "Entre cuentos y música"],
        correct: 0,
        image: MORAT_IMAGES.simon_1_striped
    },
    {
        // Q6: Productora "Mapache" - Isaza
        question: "¿Qué integrante fundó la productora 'Mapache'?",
        options: ["Juan Pablo Villamil", "Simón Vargas", "Juan Pablo Isaza"],
        correct: 2,
        image: MORAT_IMAGES.isaza_1
    },
    {
        // Q7: Marca del banjo - Villamil con banjo
        question: "¿Cuál es la marca del banjo que usa Juan Pablo Villamil?",
        options: ["Gibson", "Deering", "Fender"],
        correct: 1,
        image: MORAT_IMAGES.villamil_banjo_1
    },
    {
        // Q8: Alejandro Posada arquitecto - Grupo
        question: "¿A qué se dedica Alejandro Posada tras dejar la banda?",
        options: ["Productor en Miami", "Arquitecto", "Director de cine"],
        correct: 1,
        image: MORAT_IMAGES.group_3_couch
    },
    {
        // Q9: Marca de diseño de Martín - Martín
        question: "¿Cómo se llama la marca de diseño de Martín Vargas?",
        options: ["GNrL Studios", "Mapache Wear", "Morat Fashion Lab"],
        correct: 0,
        image: MORAT_IMAGES.martin_1_cap
    },
    {
        // Q10: Canción en 30 min (Mi nuevo vicio) - Concierto
        question: "¿Qué canción se compuso en solo 30 minutos?",
        options: ["Cómo te atreves", "Besos en guerra", "Mi nuevo vicio"],
        correct: 2,
        image: MORAT_IMAGES.concert_2_wide
    },
    {
        // Q11: Libro de Simón - Simón
        question: "¿Cuál es el título del libro de relatos de Simón Vargas?",
        options: ["Las canciones que no escribimos", "A la orilla de la luz", "Bajo la mesa de Bogotá"],
        correct: 1,
        image: MORAT_IMAGES.simon_2_bw
    },
    {
        // Q12: Colegio a los 5 años - Grupo
        question: "¿En qué colegio se conocieron los integrantes a los 5 años?",
        options: ["Gimnasio Moderno", "Gimnasio La Montaña", "Colegio Anglo Colombiano"],
        correct: 1,
        image: MORAT_IMAGES.group_5_graffiti
    },
    {
        // Q13: Objeto incendiado Argentina - Concierto
        question: "¿Qué objeto se incendió en una caja en Argentina (2024)?",
        options: ["Amplificador de Simón", "El telón principal", "Maleta de Isaza"],
        correct: 1,
        image: MORAT_IMAGES.concert_3_steps
    },
    {
        // Q14: Ritual antes del escenario - Concierto
        question: "¿Qué ritual hacen antes de salir al escenario?",
        options: ["Lanzar gominolas y atraparlas con la boca", "Cantar a Joaquín Sabina", "Brindis con mezcal"],
        correct: 0,
        image: MORAT_IMAGES.concert_4_awards
    },
    {
        // Q15: Récord personas en pijama - Concierto
        question: "¿En qué ciudad rompieron el récord de personas en pijama?",
        options: ["Bogotá", "Ciudad de México", "Madrid"],
        correct: 1,
        image: MORAT_IMAGES.concert_5_hug
    },
    {
        // Q16: Aficionado al ilusionismo - Isaza
        question: "¿Quién es aficionado al ilusionismo y la magia?",
        options: ["Juan Pablo Isaza", "Juan Pablo Villamil", "Martín Vargas"],
        correct: 0,
        image: MORAT_IMAGES.isaza_2
    },
    {
        // Q17: Colección de Villamil - Villamil
        question: "¿Qué artículos deportivos colecciona Villamil?",
        options: ["Gorras de béisbol", "Camisetas de fútbol", "Zapatillas de edición limitada"],
        correct: 1,
        image: MORAT_IMAGES.villamil_bw_3
    },
    {
        // Q18: Perrita de Martín - Martín
        question: "¿Cómo se llamaba la perrita de infancia de Martín?",
        options: ["Malta", "Rita la perrita", "Nicolás López"],
        correct: 1,
        image: MORAT_IMAGES.martin_2_sideways
    },
    {
        // Q19: Diseño Gráfico - Martín
        question: "¿Qué integrante estudió Diseño Gráfico?",
        options: ["Simón Vargas", "Juan Pablo Isaza", "Martín Vargas"],
        correct: 2,
        image: MORAT_IMAGES.martin_3_flowers
    },
    {
        // Q20: Primer beso de Villamil - Villamil
        question: "¿A qué edad fue el primer beso de Villamil?",
        options: ["13 años", "15 años", "18 años"],
        correct: 0,
        image: MORAT_IMAGES.villamil_guitar_4
    },
    {
        // Q21: Hábito de Simón en librerías - Simón
        question: "¿Qué hábito tiene Simón en las librerías?",
        options: ["Leer la última página", "Oler los libros", "Contar la palabra 'amor'"],
        correct: 1,
        image: MORAT_IMAGES.simon_3_green
    },
    {
        // Q22: Paulina Rubio cantó - Concierto/performance
        question: "¿Qué tema cantó Paulina Rubio antes de que ellos fueran famosos?",
        options: ["Cómo te atreves", "Cuánto me duele", "Mi nuevo vicio"],
        correct: 2,
        image: MORAT_IMAGES.villamil_theater_2
    },
    {
        // Q23: Espectadores en La Tea - Grupo
        question: "¿Quiénes eran los únicos espectadores en sus inicios en La Tea?",
        options: ["Sus padres", "El personal de seguridad", "Estudiantes de Uniandes"],
        correct: 1,
        image: MORAT_IMAGES.group_1_studio
    },
    {
        // Q24: Fecha de formación - Grupo
        question: "¿Qué fecha se considera la formación oficial (como Malta)?",
        options: ["13 de diciembre de 2011", "20 de mayo de 2015", "16 de junio de 2016"],
        correct: 0,
        image: MORAT_IMAGES.group_2_urban
    },
    {
        // Q25: Carrera de Isaza - Isaza
        question: "¿Qué carrera estudió Juan Pablo Isaza?",
        options: ["Ingeniería Industrial", "Administración de Empresas", "Música"],
        correct: 1,
        image: MORAT_IMAGES.isaza_3
    },
    {
        // Q26: Filtración de Martín en México - Martín
        question: "¿Qué dato filtró Martín Vargas por error en México?",
        options: ["Fecha y nombre de 'París'", "Boda de Simón", "Nombre del álbum 'Ya es mañana'"],
        correct: 0,
        image: MORAT_IMAGES.martin_4_adidas
    },
    {
        // Q27: Reto técnico Guatemala - Concierto
        question: "¿Qué reto técnico mayor enfrentaron en Guatemala?",
        options: ["Se quemó una pantalla", "Apagón total una hora antes", "Banjo roto de Villamil"],
        correct: 1,
        image: MORAT_IMAGES.villamil_banjo_5_bw
    },
    {
        // Q28: Colaboración Mariachi - Grupo/awards
        question: "¿Quién colaboró en la versión Mariachi de 'Debí Suponerlo'?",
        options: ["Alejandro Fernández", "Camila Fernández", "Christian Nodal"],
        correct: 1,
        image: MORAT_IMAGES.martin_5_smile
    },
    {
        // Q29: Tatuaje de Simón - Simón
        question: "¿Qué significa el tatuaje del símbolo creado por Simón?",
        options: ["Concepto de 'la mala suerte'", "Tributo a Martín", "Constelación de La Morat"],
        correct: 0,
        image: MORAT_IMAGES.simon_5_misfits
    },
    {
        // Q30: Guitarra de Isaza - Isaza
        question: "¿Qué modelo de guitarra eléctrica usa Isaza en 'Los Estadios'?",
        options: ["Fender Player Telecaster", "Gibson Custom 1959 ES-335", "Martin D-42"],
        correct: 1,
        image: MORAT_IMAGES.isaza_5
    }
];

// Dynamic: always takes the last 5 questions for vertical format
export const verticalQuestions: Question[] = questions.slice(-5);
