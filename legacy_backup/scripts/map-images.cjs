const fs = require('fs');
const path = require('path');

// Image Pools (Max Identifier based on file list)
const pools = {
    chaeryeong: { count: 8, current: 1 },
    lia: { count: 11, current: 1 },
    ryujin: { count: 11, current: 1 },
    yeji: { count: 7, current: 1 },
    yuna: { count: 10, current: 1 }
};

// Helper: Get Next Image for Member
function getNextImage(member) {
    const p = pools[member];
    const idx = p.current;

    // Increment and rotate if needed
    p.current = (p.current % p.count) + 1;

    return `https://raw.githubusercontent.com/josanager/Images-Triviaquiz/main/Itzy/${member}%20${idx}.png`;
}

// Helper: Detect Member in Text
function detectMember(text) {
    const t = text.toLowerCase();

    // Explicit mentions (names, characters, traits)
    if (t.includes('ryujin') || t.includes('tuk')) return 'ryujin';
    if (t.includes('yeji') || t.includes('hatt')) return 'yeji';
    if (t.includes('lia') || t.includes('lya') || t.includes('julia')) return 'lia';
    if (t.includes('yuna') || t.includes('cabbit')) return 'yuna';
    if (t.includes('chaeryeong') || t.includes('chung-ee') || t.includes('chaeyeon')) return 'chaeryeong';

    return null;
}

// Global rotation for questions without specific member
const allMembers = ['ryujin', 'yeji', 'lia', 'yuna', 'chaeryeong'];
let globalMemberIdx = 0;

async function generate() {
    const questionsPath = path.join(__dirname, '../src/questions.js');
    const content = fs.readFileSync(questionsPath, 'utf8');

    // Extract questions
    const questionMatches = content.match(/question:\s*"([^"]+)"/g);

    if (!questionMatches) {
        console.error("No questions found!");
        return;
    }

    let output = `// ARCHIVO DE IMÁGENES GENERADO AUTOMÁTICAMENTE
// Fuente: https://github.com/josanager/Images-Triviaquiz
export const questionImages = [\n`;

    questionMatches.forEach((match, index) => {
        const qText = match.match(/"([^"]+)"/)[1];
        let member = detectMember(qText);

        // If no member detected (General ITZY question), rotate
        if (!member) {
            member = allMembers[globalMemberIdx % allMembers.length];
            globalMemberIdx++;
        }

        const url = getNextImage(member);

        output += `    // ${index + 1}. [${member.toUpperCase()}] ${qText}\n`;
        output += `    "${url}",\n\n`;
    });

    output += `];\n`;

    const outputPath = path.join(__dirname, '../src/questionImages.js');
    fs.writeFileSync(outputPath, output);
    console.log(`Generated ${outputPath} with ${questionMatches.length} mapped images.`);
}

generate();
