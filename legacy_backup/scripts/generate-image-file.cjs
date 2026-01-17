const fs = require('fs');
const path = require('path');

async function generate() {
    // Read the questions file
    // Since it's an ES module, we might need to parse it or just import it if we were in module mode.
    // But simplest is to regex parse since the structure is simple JSON-like objects.

    const questionsPath = path.join(__dirname, '../src/questions.js');
    const content = fs.readFileSync(questionsPath, 'utf8');

    // Extract questions using regex
    // Looks for question: "..."
    const questionMatches = content.match(/question:\s*"([^"]+)"/g);

    if (!questionMatches) {
        console.error("No questions found!");
        return;
    }

    let output = `// ARCHIVO DE IMÁGENES
// Coloca el link de la imagen entre las comillas para cada pregunta.
// Asegúrate de que sean enlaces directos (que terminen en .jpg, .png, etc.)

export const questionImages = [
`;

    questionMatches.forEach((match, index) => {
        // Extract just the text inside quotes
        const qText = match.match(/"([^"]+)"/)[1];
        output += `    // ${index + 1}. ${qText}\n`;
        output += `    "",\n\n`;
    });

    output += `];\n`;

    const outputPath = path.join(__dirname, '../src/questionImages.js');
    fs.writeFileSync(outputPath, output);
    console.log(`Generated ${outputPath} with ${questionMatches.length} entries.`);
}

generate();
