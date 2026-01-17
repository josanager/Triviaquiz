const fs = require('fs');
const path = require('path');

// Image Ranges based on file listing:
// Chaeryeong: 1-8
// Lia: 9-19
// Ryujin: 20-30
// Yeji: 31-37
// Yuna: 38-53
const imageRepoBase = "https://raw.githubusercontent.com/josanager/Images-Triviaquiz/main/Itzy";

// Helper to generate list
function generateImages(member, start, end) {
    const images = [];
    for (let i = start; i <= end; i++) {
        images.push({
            url: `${imageRepoBase}/${member}%20${i}.png`,
            member: member,
            id: `${member}-${i}`
        });
    }
    return images;
}

const allImages = [
    ...generateImages('chaeryeong', 1, 8),
    ...generateImages('lia', 9, 19),
    ...generateImages('ryujin', 20, 30),
    ...generateImages('yeji', 31, 37),
    ...generateImages('yuna', 38, 53)
];

// Shuffle helper (optional, for randomness in general pool)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Helper: Detect Member
function detectMember(text) {
    const t = text.toLowerCase();
    if (t.includes('ryujin') || t.includes('tuk')) return 'ryujin';
    if (t.includes('yeji') || t.includes('hatt')) return 'yeji';
    if (t.includes('lia') || t.includes('lya') || t.includes('julia')) return 'lia';
    if (t.includes('yuna') || t.includes('cabbit')) return 'yuna';
    if (t.includes('chaeryeong') || t.includes('chung-ee') || t.includes('chaeyeon')) return 'chaeryeong';
    return null; // General or Group
}

async function generate() {
    const questionsPath = path.join(__dirname, '../src/questions.js');
    const content = fs.readFileSync(questionsPath, 'utf8');
    const questionMatches = content.match(/question:\s*"([^"]+)"/g);

    if (!questionMatches) { console.error("No questions found!"); return; }

    const questions = questionMatches.map(m => m.match(/"([^"]+)"/)[1]);

    // Mapping arrays
    const finalMapping = new Array(questions.length).fill(null);
    const usedImageIds = new Set();

    // --- PASS 1: Assign Specific Member Questions ---
    questions.forEach((qText, index) => {
        const member = detectMember(qText);
        if (member) {
            // Find available image for this member
            // We shuffle to pick random available one
            const pool = allImages.filter(img => img.member === member && !usedImageIds.has(img.id));

            if (pool.length > 0) {
                // Pick one (randomly or first?) Random is better for variety
                // Actually, simple shift is deterministic.
                // Let's pick first.
                const selected = pool[0];
                finalMapping[index] = selected;
                usedImageIds.add(selected.id);
            } else {
                // Pool exhausted for this member? 
                // We will fill in Pass 2 with whatever is left (General pool)
                console.warn(`Warning: Run out of specific images for ${member} at Q${index + 1}`);
            }
        }
    });

    // --- PASS 2: Fill Remaining (General/Unmatched) ---
    // Get all unused images
    let remainingImages = allImages.filter(img => !usedImageIds.has(img.id));
    // Shuffle them to mix members for general questions
    remainingImages = shuffle(remainingImages);

    for (let i = 0; i < finalMapping.length; i++) {
        if (finalMapping[i] === null) {
            if (remainingImages.length > 0) {
                const selected = remainingImages.shift(); // Take one
                finalMapping[i] = selected;
                usedImageIds.add(selected.id);
            } else {
                console.error("CRITICAL: Not enough images for 50 questions!");
                // Fallback: Reuse general? (Should not happen as we have 53)
            }
        }
    }

    // Output Generation
    let output = `// ARCHIVO DE IMÁGENES GENERADO AUTOMÁTICAMENTE (V2)
// Fuente: https://github.com/josanager/Images-Triviaquiz
// Estrategia: ÚNICAS (Sin repeticiones). Total imágenes usadas: ${usedImageIds.size}
export const questionImages = [\n`;

    questions.forEach((qText, index) => {
        const img = finalMapping[index];
        if (img) {
            output += `    // ${index + 1}. [${img.member.toUpperCase()}] ${qText}\n`;
            output += `    "${img.url}",\n\n`;
        } else {
            output += `    // ${index + 1}. [ERROR] ${qText}\n`;
            output += `    "",\n\n`;
        }
    });

    output += `];\n`;

    const outputPath = path.join(__dirname, '../src/questionImages.js');
    fs.writeFileSync(outputPath, output);
    console.log(`Generated ${outputPath}. Used ${usedImageIds.size} images.`);
    if (remainingImages.length > 0) {
        console.log(`Leftover images (${remainingImages.length}):`, remainingImages.map(i => i.id).join(', '));
    }
}

generate();
