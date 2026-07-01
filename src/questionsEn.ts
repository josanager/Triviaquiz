import { Question } from './questions';
import { KATSEYE_IMAGES } from './images';
import { validateUniqueQuestionImages } from './validateQuestionImages';

// Guardrail: TriviaVideoEn must stay fully in English.
// Any future content swap needs a proper English adaptation here,
// not a copy of the Spanish source text.
export const questionsEn: Question[] = validateUniqueQuestionImages([
    {
        question: 'What occupation did Matthew have before following Jesus as a disciple?',
        options: ['Fisherman', 'Tax collector', 'Carpenter'],
        correct: 1,
        image: KATSEYE_IMAGES.q1,
    },
    {
        question: 'In which city was Jesus of Nazareth born according to the Gospel accounts?',
        options: ['Nazareth', 'Jerusalem', 'Bethlehem'],
        correct: 2,
        image: KATSEYE_IMAGES.q2,
    },
    {
        question: 'Who betrayed Jesus by handing him over for thirty pieces of silver?',
        options: ['Thomas Didymus', 'Judas Iscariot', 'Simon Peter'],
        correct: 1,
        image: KATSEYE_IMAGES.q3,
    },
    {
        question: 'What miracle did Jesus perform at the wedding at Cana?',
        options: ['Turning water into wine', 'Multiplying bread', 'Healing a blind man'],
        correct: 0,
        image: KATSEYE_IMAGES.q4,
    },
    {
        question: 'Which New Testament figure wrote the greatest number of epistles?',
        options: ['John the Apostle', 'Simon Peter', 'Paul of Tarsus'],
        correct: 2,
        image: KATSEYE_IMAGES.q5,
    },
    {
        question: 'How did King Herod Agrippa I die according to the book of Acts?',
        options: ['Eaten by worms', 'Falling from a horse', 'Beheaded in prison'],
        correct: 0,
        image: KATSEYE_IMAGES.q6,
    },
    {
        question: 'On what island was John exiled when he wrote Revelation?',
        options: ['Malta', 'Cyprus', 'Patmos'],
        correct: 2,
        image: KATSEYE_IMAGES.q7,
    },
    {
        question: 'What nickname did Jesus give to the brothers James and John?',
        options: ['Fishers of men', 'Pillars of faith', 'Sons of Thunder'],
        correct: 2,
        image: KATSEYE_IMAGES.q8,
    },
    {
        question: 'Whom did Jesus raise in Bethany after he had been dead for four days?',
        options: ['Jairus', 'Lazarus', 'Bartimaeus'],
        correct: 1,
        image: KATSEYE_IMAGES.q9,
    },
    {
        question: 'What animal spoke miraculously to Balaam to rebuke him on his journey?',
        options: ['A serpent', 'A great fish', 'A donkey'],
        correct: 2,
        image: KATSEYE_IMAGES.q10,
    },
    {
        question: 'Who was the first martyr of the early Christian church in Acts?',
        options: ['Philip', 'James', 'Stephen'],
        correct: 2,
        image: KATSEYE_IMAGES.q11,
    },
    {
        question: 'What specific sign did Gideon ask God for to confirm his military victory?',
        options: ['Fire from heaven', 'A wet fleece', 'A shadow moving backward'],
        correct: 1,
        image: KATSEYE_IMAGES.q12,
    },
    {
        question: 'What was the original trade of the brothers Simon Peter and Andrew?',
        options: ['Shepherds', 'Carpenters', 'Fishermen'],
        correct: 2,
        image: KATSEYE_IMAGES.q13,
    },
    {
        question: 'Which Pharisee and Jewish leader visited Jesus at night to question him?',
        options: ['Nicodemus', 'Gamaliel', 'Caiaphas'],
        correct: 0,
        image: KATSEYE_IMAGES.q14,
    },
    {
        question: 'On which mountain did Moses receive the Tablets of the Law with the Ten Commandments?',
        options: ['Nebo', 'Carmel', 'Sinai'],
        correct: 2,
        image: KATSEYE_IMAGES.q15,
    },
    {
        question: 'Which famous judge of Israel led an army alongside General Barak?',
        options: ['Deborah', 'Jael', 'Ruth'],
        correct: 0,
        image: KATSEYE_IMAGES.q16,
    },
    {
        question: 'How many people in total survived inside the ark during the Flood?',
        options: ['Eight', 'Twelve', 'Four'],
        correct: 0,
        image: KATSEYE_IMAGES.q17,
    },
    {
        question: 'Who became the direct successor of the prophet Elijah?',
        options: ['Jeremiah', 'Elisha', 'Isaiah'],
        correct: 1,
        image: KATSEYE_IMAGES.q18,
    },
    {
        question: 'Which Roman governor washed his hands during the trial of Jesus?',
        options: ['Pontius Pilate', 'Herod Antipas', 'Felix the governor'],
        correct: 0,
        image: KATSEYE_IMAGES.q19,
    },
    {
        question: 'Which ancient city saw its walls fall after the sound of trumpets?',
        options: ['Jericho', 'Nineveh', 'Babylon'],
        correct: 0,
        image: KATSEYE_IMAGES.q20,
    },
    {
        question: 'In what language was most of the New Testament originally written?',
        options: ['Hebrew', 'Latin', 'Ancient Greek'],
        correct: 2,
        image: KATSEYE_IMAGES.q21,
    },
    {
        question: 'Who prophetically recognized Jesus as the Messiah while he was still a baby?',
        options: ['Zechariah', 'Simeon', 'Cornelius'],
        correct: 1,
        image: KATSEYE_IMAGES.q22,
    },
    {
        question: 'Which apostle refused to believe in the resurrection until he touched the wounds?',
        options: ['Thomas', 'Philip', 'Thaddeus'],
        correct: 0,
        image: KATSEYE_IMAGES.q23,
    },
    {
        question: 'Toward which city was Saul traveling when he experienced his miraculous conversion?',
        options: ['Antioch', 'Damascus', 'Tarsus'],
        correct: 1,
        image: KATSEYE_IMAGES.q24,
    },
    {
        question: 'What lavish main gift did the Queen of Sheba bring to King Solomon?',
        options: ['Gold and spices', 'Precious stones', 'Fine silks'],
        correct: 0,
        image: KATSEYE_IMAGES.q25,
    },
    {
        question: 'Who were thrown into the fiery furnace by order of Nebuchadnezzar?',
        options: ['Aaron\'s sons', 'Daniel\'s friends', 'Joseph\'s brothers'],
        correct: 1,
        image: KATSEYE_IMAGES.q26,
    },
    {
        question: 'Which prophet spent three days inside a great fish because of disobedience?',
        options: ['Jonah', 'Micah', 'Hosea'],
        correct: 0,
        image: KATSEYE_IMAGES.q27,
    },
    {
        question: 'How many times did Peter deny knowing Jesus before the rooster crowed?',
        options: ['Four times', 'Three times', 'Two times'],
        correct: 1,
        image: KATSEYE_IMAGES.q28,
    },
    {
        question: 'Which biblical figure is the greatest example of patience in suffering?',
        options: ['Isaac', 'Job', 'Abraham'],
        correct: 1,
        image: KATSEYE_IMAGES.q29,
    },
    {
        question: 'Who was the youngest king to begin his reign in Judah?',
        options: ['Josiah', 'Hezekiah', 'Joash'],
        correct: 2,
        image: KATSEYE_IMAGES.q30,
    },
], 'questionsEn.ts');

export const bonusQuestionEn: Question = {
    question: 'Who fell asleep during a long speech by Paul and fell from a third story window?',
    options: ['Onesimus', 'Eutychus', 'Timothy'],
    correct: 1,
    image: KATSEYE_IMAGES.q31,
};

export const verticalQuestions: Question[] = questionsEn.slice(-5);
