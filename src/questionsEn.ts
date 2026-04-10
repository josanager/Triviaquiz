import { Question } from './questions';

// Base URL for Morat images
const MORAT_BASE = "https://raw.githubusercontent.com/josanager/Images-Triviaquiz/main/Morat";

// English translations of MORAT trivia questions
export const questionsEn: Question[] = [
    {
        question: "What is the exact origin of the original name 'Malta'?",
        options: ["Name of a band member's dog", "Acronym of their parents", "A traditional drink"],
        correct: 0,
        image: `${MORAT_BASE}/21_morat_group_1_studio_1769894262327.png`
    },
    {
        question: "Why did they have to abandon the name 'Malta'?",
        options: ["Soft drink brand in Spain", "Brazilian band with registered name", "Suggestion from Pedro Malaver"],
        correct: 1,
        image: `${MORAT_BASE}/22_morat_group_2_urban_fisheye_1769894280704.png`
    },
    {
        question: "Who was the owner of the 'La Morat' farm?",
        options: ["Juan Pablo Isaza's father", "Antonio de Morat (relative of Alejandro Posada)", "Vargas Morales family"],
        correct: 1,
        image: `${MORAT_BASE}/24_morat_group_4_cases_backstage_1769894313221.png`
    },
    {
        question: "Where was their first official concert in Bogotá?",
        options: ["Bar La Tea", "Vegan restaurant", "Universidad de los Andes"],
        correct: 0,
        image: `${MORAT_BASE}/16_morat_concert_1_stage_performance_1769894820157.png`
    },
    {
        question: "What is the name of Simón Vargas and Nath Campos' podcast?",
        options: ["Simón dice, Nath contradice", "Relatos de la orilla de la luz", "Entre cuentos y música"],
        correct: 0,
        image: `${MORAT_BASE}/26_simon_vargas_1_striped_1769839280150.png`
    },
    {
        question: "Which member founded the production company 'Mapache'?",
        options: ["Juan Pablo Villamil", "Simón Vargas", "Juan Pablo Isaza"],
        correct: 2,
        image: `${MORAT_BASE}/1_juan_pablo_isaza_1_1769837971258.png`
    },
    {
        question: "What brand of banjo does Juan Pablo Villamil use?",
        options: ["Gibson", "Deering", "Fender"],
        correct: 1,
        image: `${MORAT_BASE}/6_juan_pablo_villamil_banjo_1_1769838813929.png`
    },
    {
        question: "What does Alejandro Posada do after leaving the band?",
        options: ["Producer in Miami", "Architect", "Film director"],
        correct: 1,
        image: `${MORAT_BASE}/23_morat_group_3_couch_1769894297139.png`
    },
    {
        question: "What is Martín Vargas' design brand called?",
        options: ["GNrL Studios", "Mapache Wear", "Morat Fashion Lab"],
        correct: 0,
        image: `${MORAT_BASE}/11_martin_vargas_1_leather_cap_1769888969671.png`
    },
    {
        question: "Which song was composed in just 30 minutes?",
        options: ["Cómo te atreves", "Besos en guerra", "Mi nuevo vicio"],
        correct: 2,
        image: `${MORAT_BASE}/17_morat_concert_2_live_wide_1769894844050.png`
    },
    {
        question: "What is the title of Simón Vargas' book of stories?",
        options: ["Las canciones que no escribimos", "A la orilla de la luz", "Bajo la mesa de Bogotá"],
        correct: 1,
        image: `${MORAT_BASE}/27_simon_vargas_2_bw_1769839297049.png`
    },
    {
        question: "At which school did the members meet at age 5?",
        options: ["Gimnasio Moderno", "Gimnasio La Montaña", "Colegio Anglo Colombiano"],
        correct: 1,
        image: `${MORAT_BASE}/25_morat_group_5_leather_graffiti_1769894328631.png`
    },
    {
        question: "What object caught fire in a box in Argentina (2024)?",
        options: ["Simón's amplifier", "The main curtain", "Isaza's suitcase"],
        correct: 1,
        image: `${MORAT_BASE}/18_morat_concert_3_stage_steps_posing_1769894863230.png`
    },
    {
        question: "What ritual do they perform before going on stage?",
        options: ["Throw gummy bears and catch them with their mouths", "Sing Joaquín Sabina", "Toast with mezcal"],
        correct: 0,
        image: `${MORAT_BASE}/19_morat_concert_4_awards_red_bg_1769894882373.png`
    },
    {
        question: "In which city did they break the record for people in pajamas?",
        options: ["Bogotá", "Mexico City", "Madrid"],
        correct: 1,
        image: `${MORAT_BASE}/20_morat_concert_5_awards_hug_purple_1769894899110.png`
    },
    {
        question: "Who is a fan of illusionism and magic?",
        options: ["Juan Pablo Isaza", "Juan Pablo Villamil", "Martín Vargas"],
        correct: 0,
        image: `${MORAT_BASE}/2_juan_pablo_isaza_2_1769837994200.png`
    },
    {
        question: "What sports items does Villamil collect?",
        options: ["Baseball caps", "Soccer jerseys", "Limited edition sneakers"],
        correct: 1,
        image: `${MORAT_BASE}/8_juan_pablo_villamil_bw_3_1769838853294.png`
    },
    {
        question: "What was Martín's childhood dog called?",
        options: ["Malta", "Rita la perrita", "Nicolás López"],
        correct: 1,
        image: `${MORAT_BASE}/12_martin_vargas_2_leather_sideways_1769888990084.png`
    },
    {
        question: "Which member studied Graphic Design?",
        options: ["Simón Vargas", "Juan Pablo Isaza", "Martín Vargas"],
        correct: 2,
        image: `${MORAT_BASE}/13_martin_vargas_3_flowers_orange_1769889008963.png`
    },
    {
        question: "At what age was Villamil's first kiss?",
        options: ["13 years old", "15 years old", "18 years old"],
        correct: 0,
        image: `${MORAT_BASE}/9_juan_pablo_villamil_guitar_4_1769838932576.png`
    },
    {
        question: "What habit does Simón have in bookstores?",
        options: ["Read the last page", "Smell the books", "Count the word 'love'"],
        correct: 1,
        image: `${MORAT_BASE}/28_simon_vargas_3_green_1769839315370.png`
    },
    {
        question: "Which song did Paulina Rubio sing before they became famous?",
        options: ["Cómo te atreves", "Cuánto me duele", "Mi nuevo vicio"],
        correct: 2,
        image: `${MORAT_BASE}/10_juan_pablo_villamil_theater_2_1769838832435.png`
    },
    {
        question: "Who were the only spectators at their beginnings in La Tea?",
        options: ["Their parents", "Security staff", "Uniandes students"],
        correct: 1,
        image: `${MORAT_BASE}/21_morat_group_1_studio_1769894262327.png`
    },
    {
        question: "What date is considered the official formation (as Malta)?",
        options: ["December 13, 2011", "May 20, 2015", "June 16, 2016"],
        correct: 0,
        image: `${MORAT_BASE}/22_morat_group_2_urban_fisheye_1769894280704.png`
    },
    {
        question: "What degree did Juan Pablo Isaza study?",
        options: ["Industrial Engineering", "Business Administration", "Music"],
        correct: 1,
        image: `${MORAT_BASE}/3_juan_pablo_isaza_3_1769838016662.png`
    },
    {
        question: "What information did Martín Vargas accidentally leak in Mexico?",
        options: ["Date and name of 'París'", "Simón's wedding", "Album name 'Ya es mañana'"],
        correct: 0,
        image: `${MORAT_BASE}/14_martin_vargas_4_adidas_black_1769889026458.png`
    },
    {
        question: "What major technical challenge did they face in Guatemala?",
        options: ["A screen burned", "Total blackout an hour before", "Villamil's broken banjo"],
        correct: 1,
        image: `${MORAT_BASE}/7_juan_pablo_villamil_banjo_5_bw_1769838954841.png`
    },
    {
        question: "Who collaborated on the Mariachi version of 'Debí Suponerlo'?",
        options: ["Alejandro Fernández", "Camila Fernández", "Christian Nodal"],
        correct: 1,
        image: `${MORAT_BASE}/15_martin_vargas_5_smile_isaza_genuine_1769889125581.png`
    },
    {
        question: "What does the tattoo of the symbol created by Simón mean?",
        options: ["Concept of 'bad luck'", "Tribute to Martín", "Constellation of La Morat"],
        correct: 0,
        image: `${MORAT_BASE}/29_simon_vargas_5_misfits_1769839411064.png`
    },
    {
        question: "What electric guitar model does Isaza use in 'Los Estadios'?",
        options: ["Fender Player Telecaster", "Gibson Custom 1959 ES-335", "Martin D-42"],
        correct: 1,
        image: `${MORAT_BASE}/4_juan_pablo_isaza_5_1769838091861.png`
    }
];

// Vertical questions (English) - First 5 questions for Short format
// Vertical questions (English) - First 5 questions for Short format
export const verticalQuestions: Question[] = questionsEn.slice(25, 30);
