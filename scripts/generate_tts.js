const fs = require('fs');
const path = require('path');
const https = require('https');

const API_KEY = "8746959d057ec689872f0c6d0cd17e7dca49f78d1e6caa5ed0da1a9ef925202c";
const VOICE_ID = "21m00Tcm4TlvDq8ikWAM"; // Rachel (Standard System Voice)
const MODEL_ID = "eleven_v3"; // Eleven v3 Alpha

const textData = [
    { text: "¡Bienvenidos a la trivia definitiva de Morat! Prepárate para poner a prueba tu fanatismo. Te presentaremos 30 preguntas sobre la banda, sus integrantes y su música. Tienes exactamente 15 segundos por cada pregunta para elegir la respuesta correcta. ¿Estás listo? ¡Que comience el juego!", filename: "intro_es.mp3" },
    { text: "Welcome to the ultimate Morat trivia! Get ready to test your fandom. We'll present 30 questions about the band, its members, and their music. You have exactly 15 seconds per question to pick the right answer. Are you ready? Let the game begin!", filename: "intro_en.mp3" },
    { text: "¡Felicidades por completar la trivia de Morat! Esperamos que te hayas divertido recordando sus mejores éxitos y curiosidades. No olvides suscribirte a Papel Cool para más trivias de tus artistas favoritos. ¡Gracias por jugar y nos vemos en el próximo video!", filename: "outro_es.mp3" },
    { text: "Congratulations on completing the Morat trivia! We hope you had fun remembering their greatest hits and fun facts. Don't forget to subscribe to Papel Cool for more trivia about your favorite artists. Thanks for playing, and see you in the next video!", filename: "outro_en.mp3" }
];

async function generate(entry) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({
            text: entry.text,
            model_id: MODEL_ID,
            voice_settings: { stability: 0.5, similarity_boost: 0.75 }
        });

        const options = {
            hostname: 'api.elevenlabs.io',
            path: `/v1/text-to-speech/${VOICE_ID}`,
            method: 'POST',
            headers: {
                'Accept': 'audio/mpeg',
                'Content-Type': 'application/json',
                'xi-api-key': API_KEY,
                'Content-Length': Buffer.byteLength(data)
            }
        };

        const req = https.request(options, (res) => {
            if (res.statusCode !== 200) {
                let errorData = '';
                res.on('data', (chunk) => { errorData += chunk; });
                res.on('end', () => reject(new Error(`Status: ${res.statusCode} - ${errorData}`)));
                return;
            }
            const fileStream = fs.createWriteStream(path.join(__dirname, '..', 'public', entry.filename));
            res.pipe(fileStream);
            fileStream.on('finish', () => {
                fileStream.close();
                console.log(`Saved: ${entry.filename}`);
                resolve();
            });
        });

        req.on('error', reject);
        req.write(data);
        req.end();
    });
}

async function run() {
    for (const entry of textData) {
        try {
            console.log(`Generating ${entry.filename}...`);
            await generate(entry);
        } catch (e) {
            console.error(`Failed ${entry.filename}: ${e.message}`);
        }
    }
}

run();
