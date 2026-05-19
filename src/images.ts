// Centralized image URLs mapped to the Metallica set.
export const IMAGE_REPO_BASE = "https://raw.githubusercontent.com/josanager/Images-Triviaquiz/main";
const imageUrl = (folder: string, filename: string) =>
    `${IMAGE_REPO_BASE}/${folder}/${encodeURIComponent(filename)}`;

export const METALLICA_IMAGES = {
    q1: imageUrl("Metallica", "10 lars ulrich.png"),
    q2: imageUrl("Metallica", "21 metallica.png"),
    q3: imageUrl("Metallica", "6 lars ulrich.png"),
    q4: imageUrl("Metallica", "1 james hetfield.png"),
    q5: imageUrl("Metallica", "22 metallica.png"),
    q6: imageUrl("Metallica", "23 metallica.png"),
    q7: imageUrl("Metallica", "26 metallica concert.png"),
    q8: imageUrl("Metallica", "11 kirk hammett.png"),
    q9: imageUrl("Metallica", "2 james hetfield.png"),
    q10: imageUrl("Metallica", "7 lars ulrich.png"),
    q11: imageUrl("Metallica", "24 metallica.png"),
    q12: imageUrl("Metallica", "25 metallica.png"),
    q13: imageUrl("Metallica", "27 metallica concert.png"),
    q14: imageUrl("Metallica", "28 metallica concert.png"),
    q15: imageUrl("Metallica", "29 metallica concert.png"),
    q16: imageUrl("Metallica", "8 lars ulrich.png"),
    q17: imageUrl("Metallica", "3 james hetfield.png"),
    q18: imageUrl("Metallica", "30 metallica concert.png"),
    q19: imageUrl("Metallica", "20 robert trujillo.png"),
    q20: imageUrl("Metallica", "4 james hetfield.png"),
    q21: imageUrl("Metallica", "5 james hetfield.png"),
    q22: imageUrl("Metallica", "9 lars ulrich.png"),
    q23: imageUrl("Metallica", "12 kirk hammett.png"),
    q24: imageUrl("Metallica", "13 kirk hammett.png"),
    q25: imageUrl("Metallica", "14 kirk hammett.png"),
    q26: imageUrl("Metallica", "15 kirk hammett.png"),
    q27: imageUrl("Metallica", "16 robert trujillo.png"),
    q28: imageUrl("Metallica", "17 robert trujillo.png"),
    q29: imageUrl("Metallica", "18 robert trujillo.png"),
    q30: imageUrl("Metallica", "19 robert trujillo.png"),
} as const;
