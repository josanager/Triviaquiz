// Centralized image URLs mapped to the trivia image repo.
export const IMAGE_REPO_BASE = 'https://raw.githubusercontent.com/josanager/Images-Triviaquiz/main';
const imageUrl = (folder: string, filename: string) =>
    `${IMAGE_REPO_BASE}/${folder.split('/').map(encodeURIComponent).join('/')}/${encodeURIComponent(filename)}`;

export const KATSEYE_IMAGES = {
    q1: imageUrl('Cultura General 1', '1.png'),
    q2: imageUrl('Cultura General 1', '2.png'),
    q3: imageUrl('Cultura General 1', '3.png'),
    q4: imageUrl('Cultura General 1', '4.png'),
    q5: imageUrl('Cultura General 1', '5.png'),
    q6: imageUrl('Cultura General 1', '6.png'),
    q7: imageUrl('Cultura General 1', '7.png'),
    q8: imageUrl('Cultura General 1', '8.png'),
    q9: imageUrl('Cultura General 1', '9.png'),
    q10: imageUrl('Cultura General 1', '10.png'),
    q11: imageUrl('Cultura General 1', '11.png'),
    q12: imageUrl('Cultura General 1', '12.png'),
    q13: imageUrl('Cultura General 1', '13.png'),
    q14: imageUrl('Cultura General 1', '14.png'),
    q15: imageUrl('Cultura General 1', '15.png'),
    q16: imageUrl('Cultura General 1', '16.png'),
    q17: imageUrl('Cultura General 1', '17.png'),
    q18: imageUrl('Cultura General 1', '18.png'),
    q19: imageUrl('Cultura General 1', '19.png'),
    q20: imageUrl('Cultura General 1', '20.png'),
    q21: imageUrl('Cultura General 1', '21.png'),
    q22: imageUrl('Cultura General 1', '22.png'),
    q23: imageUrl('Cultura General 1', '23.png'),
    q24: imageUrl('Cultura General 1', '24.png'),
    q25: imageUrl('Cultura General 1', '25.png'),
    q26: imageUrl('Cultura General 1', '26.png'),
    q27: imageUrl('Cultura General 1', '27.png'),
    q28: imageUrl('Cultura General 1', '28.png'),
    q29: imageUrl('Cultura General 1', '29.png'),
    q30: imageUrl('Cultura General 1', '30.png'),
} as const;
