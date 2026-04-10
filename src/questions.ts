export interface Question {
    question: string;
    options: string[];
    correct: number;
    image: string;
}

// Base URL for Morat images
const MORAT_BASE = "https://raw.githubusercontent.com/josanager/Images-Triviaquiz/main/Morat";

export const questions: Question[] = [
    {
        // Q1: Origen del nombre "Malta" - Grupo
        question: "¿Cuál es el origen exacto del nombre original 'Malta'?",
        options: ["Nombre de la perra de un integrante", "Acrónimo de sus padres", "Una bebida tradicional"],
        correct: 0,
        image: `${MORAT_BASE}/21_morat_group_1_studio_1769894262327.png`
    },
    {
        // Q2: Por qué abandonaron "Malta" - Grupo
        question: "¿Por qué tuvieron que abandonar el nombre 'Malta'?",
        options: ["Marca de refrescos en España", "Banda brasileña con nombre registrado", "Sugerencia de Pedro Malaver"],
        correct: 1,
        image: `${MORAT_BASE}/22_morat_group_2_urban_fisheye_1769894280704.png`
    },
    {
        // Q3: Dueño de "La Morat" - Grupo/backstage
        question: "¿Quién era el dueño de la finca 'La Morat'?",
        options: ["Padre de Juan Pablo Isaza", "Antonio de Morat (familiar de Alejandro Posada)", "Familia Vargas Morales"],
        correct: 1,
        image: `${MORAT_BASE}/24_morat_group_4_cases_backstage_1769894313221.png`
    },
    {
        // Q4: Primer concierto en Bogotá - Concierto
        question: "¿Dónde fue su primer concierto oficial en Bogotá?",
        options: ["Bar La Tea", "Restaurante vegano", "Universidad de los Andes"],
        correct: 0,
        image: `${MORAT_BASE}/16_morat_concert_1_stage_performance_1769894820157.png`
    },
    {
        // Q5: Podcast de Simón - Simón
        question: "¿Cómo se llama el podcast de Simón Vargas y Nath Campos?",
        options: ["Simón dice, Nath contradice", "Relatos de la orilla de la luz", "Entre cuentos y música"],
        correct: 0,
        image: `${MORAT_BASE}/26_simon_vargas_1_striped_1769839280150.png`
    },
    {
        // Q6: Productora "Mapache" - Isaza
        question: "¿Qué integrante fundó la productora 'Mapache'?",
        options: ["Juan Pablo Villamil", "Simón Vargas", "Juan Pablo Isaza"],
        correct: 2,
        image: `${MORAT_BASE}/1_juan_pablo_isaza_1_1769837971258.png`
    },
    {
        // Q7: Marca del banjo - Villamil con banjo
        question: "¿Cuál es la marca del banjo que usa Juan Pablo Villamil?",
        options: ["Gibson", "Deering", "Fender"],
        correct: 1,
        image: `${MORAT_BASE}/6_juan_pablo_villamil_banjo_1_1769838813929.png`
    },
    {
        // Q8: Alejandro Posada arquitecto - Grupo
        question: "¿A qué se dedica Alejandro Posada tras dejar la banda?",
        options: ["Productor en Miami", "Arquitecto", "Director de cine"],
        correct: 1,
        image: `${MORAT_BASE}/23_morat_group_3_couch_1769894297139.png`
    },
    {
        // Q9: Marca de diseño de Martín - Martín
        question: "¿Cómo se llama la marca de diseño de Martín Vargas?",
        options: ["GNrL Studios", "Mapache Wear", "Morat Fashion Lab"],
        correct: 0,
        image: `${MORAT_BASE}/11_martin_vargas_1_leather_cap_1769888969671.png`
    },
    {
        // Q10: Canción en 30 min (Mi nuevo vicio) - Concierto
        question: "¿Qué canción se compuso en solo 30 minutos?",
        options: ["Cómo te atreves", "Besos en guerra", "Mi nuevo vicio"],
        correct: 2,
        image: `${MORAT_BASE}/17_morat_concert_2_live_wide_1769894844050.png`
    },
    {
        // Q11: Libro de Simón - Simón
        question: "¿Cuál es el título del libro de relatos de Simón Vargas?",
        options: ["Las canciones que no escribimos", "A la orilla de la luz", "Bajo la mesa de Bogotá"],
        correct: 1,
        image: `${MORAT_BASE}/27_simon_vargas_2_bw_1769839297049.png`
    },
    {
        // Q12: Colegio a los 5 años - Grupo
        question: "¿En qué colegio se conocieron los integrantes a los 5 años?",
        options: ["Gimnasio Moderno", "Gimnasio La Montaña", "Colegio Anglo Colombiano"],
        correct: 1,
        image: `${MORAT_BASE}/25_morat_group_5_leather_graffiti_1769894328631.png`
    },
    {
        // Q13: Objeto incendiado Argentina - Concierto
        question: "¿Qué objeto se incendió en una caja en Argentina (2024)?",
        options: ["Amplificador de Simón", "El telón principal", "Maleta de Isaza"],
        correct: 1,
        image: `${MORAT_BASE}/18_morat_concert_3_stage_steps_posing_1769894863230.png`
    },
    {
        // Q14: Ritual antes del escenario - Concierto
        question: "¿Qué ritual hacen antes de salir al escenario?",
        options: ["Lanzar gominolas y atraparlas con la boca", "Cantar a Joaquín Sabina", "Brindis con mezcal"],
        correct: 0,
        image: `${MORAT_BASE}/19_morat_concert_4_awards_red_bg_1769894882373.png`
    },
    {
        // Q15: Récord personas en pijama - Concierto
        question: "¿En qué ciudad rompieron el récord de personas en pijama?",
        options: ["Bogotá", "Ciudad de México", "Madrid"],
        correct: 1,
        image: `${MORAT_BASE}/20_morat_concert_5_awards_hug_purple_1769894899110.png`
    },
    {
        // Q16: Aficionado al ilusionismo - Isaza
        question: "¿Quién es aficionado al ilusionismo y la magia?",
        options: ["Juan Pablo Isaza", "Juan Pablo Villamil", "Martín Vargas"],
        correct: 0,
        image: `${MORAT_BASE}/2_juan_pablo_isaza_2_1769837994200.png`
    },
    {
        // Q17: Colección de Villamil - Villamil
        question: "¿Qué artículos deportivos colecciona Villamil?",
        options: ["Gorras de béisbol", "Camisetas de fútbol", "Zapatillas de edición limitada"],
        correct: 1,
        image: `${MORAT_BASE}/8_juan_pablo_villamil_bw_3_1769838853294.png`
    },
    {
        // Q18: Perrita de Martín - Martín
        question: "¿Cómo se llamaba la perrita de infancia de Martín?",
        options: ["Malta", "Rita la perrita", "Nicolás López"],
        correct: 1,
        image: `${MORAT_BASE}/12_martin_vargas_2_leather_sideways_1769888990084.png`
    },
    {
        // Q19: Diseño Gráfico - Martín
        question: "¿Qué integrante estudió Diseño Gráfico?",
        options: ["Simón Vargas", "Juan Pablo Isaza", "Martín Vargas"],
        correct: 2,
        image: `${MORAT_BASE}/13_martin_vargas_3_flowers_orange_1769889008963.png`
    },
    {
        // Q20: Primer beso de Villamil - Villamil
        question: "¿A qué edad fue el primer beso de Villamil?",
        options: ["13 años", "15 años", "18 años"],
        correct: 0,
        image: `${MORAT_BASE}/9_juan_pablo_villamil_guitar_4_1769838932576.png`
    },
    {
        // Q21: Hábito de Simón en librerías - Simón
        question: "¿Qué hábito tiene Simón en las librerías?",
        options: ["Leer la última página", "Oler los libros", "Contar la palabra 'amor'"],
        correct: 1,
        image: `${MORAT_BASE}/28_simon_vargas_3_green_1769839315370.png`
    },
    {
        // Q22: Paulina Rubio cantó - Concierto/performance
        question: "¿Qué tema cantó Paulina Rubio antes de que ellos fueran famosos?",
        options: ["Cómo te atreves", "Cuánto me duele", "Mi nuevo vicio"],
        correct: 2,
        image: `${MORAT_BASE}/10_juan_pablo_villamil_theater_2_1769838832435.png`
    },
    {
        // Q23: Espectadores en La Tea - Grupo
        question: "¿Quiénes eran los únicos espectadores en sus inicios en La Tea?",
        options: ["Sus padres", "El personal de seguridad", "Estudiantes de Uniandes"],
        correct: 1,
        image: `${MORAT_BASE}/21_morat_group_1_studio_1769894262327.png`
    },
    {
        // Q24: Fecha de formación - Grupo
        question: "¿Qué fecha se considera la formación oficial (como Malta)?",
        options: ["13 de diciembre de 2011", "20 de mayo de 2015", "16 de junio de 2016"],
        correct: 0,
        image: `${MORAT_BASE}/22_morat_group_2_urban_fisheye_1769894280704.png`
    },
    {
        // Q25: Carrera de Isaza - Isaza
        question: "¿Qué carrera estudió Juan Pablo Isaza?",
        options: ["Ingeniería Industrial", "Administración de Empresas", "Música"],
        correct: 1,
        image: `${MORAT_BASE}/3_juan_pablo_isaza_3_1769838016662.png`
    },
    {
        // Q26: Filtración de Martín en México - Martín
        question: "¿Qué dato filtró Martín Vargas por error en México?",
        options: ["Fecha y nombre de 'París'", "Boda de Simón", "Nombre del álbum 'Ya es mañana'"],
        correct: 0,
        image: `${MORAT_BASE}/14_martin_vargas_4_adidas_black_1769889026458.png`
    },
    {
        // Q27: Reto técnico Guatemala - Concierto
        question: "¿Qué reto técnico mayor enfrentaron en Guatemala?",
        options: ["Se quemó una pantalla", "Apagón total una hora antes", "Banjo roto de Villamil"],
        correct: 1,
        image: `${MORAT_BASE}/7_juan_pablo_villamil_banjo_5_bw_1769838954841.png`
    },
    {
        // Q28: Colaboración Mariachi - Grupo/awards
        question: "¿Quién colaboró en la versión Mariachi de 'Debí Suponerlo'?",
        options: ["Alejandro Fernández", "Camila Fernández", "Christian Nodal"],
        correct: 1,
        image: `${MORAT_BASE}/15_martin_vargas_5_smile_isaza_genuine_1769889125581.png`
    },
    {
        // Q29: Tatuaje de Simón - Simón
        question: "¿Qué significa el tatuaje del símbolo creado por Simón?",
        options: ["Concepto de 'la mala suerte'", "Tributo a Martín", "Constelación de La Morat"],
        correct: 0,
        image: `${MORAT_BASE}/29_simon_vargas_5_misfits_1769839411064.png`
    },
    {
        // Q30: Guitarra de Isaza - Isaza
        question: "¿Qué modelo de guitarra eléctrica usa Isaza en 'Los Estadios'?",
        options: ["Fender Player Telecaster", "Gibson Custom 1959 ES-335", "Martin D-42"],
        correct: 1,
        image: `${MORAT_BASE}/4_juan_pablo_isaza_5_1769838091861.png`
    }
];

// 5 questions for vertical version (Spanish - MORAT) - Synced with Horizontal (Batch 6: Q26-Q30)
export const verticalQuestions: Question[] = questions.slice(25, 30);
