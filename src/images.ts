// Centralized image URLs mapped to the trivia image repo.
export const IMAGE_REPO_BASE = 'https://raw.githubusercontent.com/josanager/Images-Triviaquiz/main';
const imageUrl = (folder: string, filename: string) =>
    `${IMAGE_REPO_BASE}/${folder.split('/').map(encodeURIComponent).join('/')}/${encodeURIComponent(filename)}`;

export const KATSEYE_IMAGES = {
    q1: imageUrl('Geometry Dash', 'Geometry Dash15.jpg'),
    q2: imageUrl('Geometry Dash', 'Geometry Dash6.jpg'),
    q3: imageUrl('Geometry Dash', 'Geometry Dash11.jpg'),
    q4: imageUrl('Geometry Dash', 'Geometry Dash8.jpg'),
    q5: imageUrl('Geometry Dash', 'Geometry Dash26.jpg'),
    q6: imageUrl('Geometry Dash', 'Geometry Dash30.jpg'),
    q7: imageUrl('Geometry Dash', 'Geometry Dash20.jpg'),
    q8: imageUrl('Geometry Dash', 'Geometry Dash24.jpg'),
    q9: imageUrl('Geometry Dash', 'Geometry Dash25.jpg'),
    q10: imageUrl('Geometry Dash', 'Geometry Dash7.jpg'),
    q11: imageUrl('Geometry Dash', 'Geometry Dash19.jpg'),
    q12: imageUrl('Geometry Dash', 'Geometry Dash10.jpg'),
    q13: imageUrl('Geometry Dash', 'Geometry Dash16.jpg'),
    q14: imageUrl('Geometry Dash', 'Geometry Dash22.jpg'),
    q15: imageUrl('Geometry Dash', 'Geometry Dash5.jpg'),
    q16: imageUrl('Geometry Dash', 'Geometry Dash28.jpg'),
    q17: imageUrl('Geometry Dash', 'Geometry Dash3.jpg'),
    q18: imageUrl('Geometry Dash', 'Geometry Dash17.jpg'),
    q19: imageUrl('Geometry Dash', 'Geometry Dash14.jpg'),
    q20: imageUrl('Geometry Dash', 'Geometry Dash18.jpg'),
    q21: imageUrl('Geometry Dash', 'Geometry Dash29.jpg'),
    q22: imageUrl('Geometry Dash', 'Geometry Dash4.jpg'),
    q23: imageUrl('Geometry Dash', 'Geometry Dash21.jpg'),
    q24: imageUrl('Geometry Dash', 'Geometry Dash1.jpg'),
    q25: imageUrl('Geometry Dash', 'Geometry Dash9.jpg'),
    q26: imageUrl('Geometry Dash', 'Geometry Dash13.jpg'),
    q27: imageUrl('Geometry Dash', 'Geometry Dash12.jpg'),
    q28: imageUrl('Geometry Dash', 'Geometry Dash23.jpg'),
    q29: imageUrl('Geometry Dash', 'Geometry Dash2.jpg'),
    q30: imageUrl('Geometry Dash', 'Geometry Dash27.jpg'),
} as const;
