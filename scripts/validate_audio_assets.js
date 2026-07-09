#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const {execFileSync} = require('child_process');

const ROOT = process.cwd();
const QUESTION_BANK_PATH = path.join(ROOT, 'src', 'questionBank.ts');
const PUBLIC_DIR = path.join(ROOT, 'public');

const questionsSource = fs.readFileSync(QUESTION_BANK_PATH, 'utf8');
const songArrayMatch = questionsSource.match(/const\s+\w+_SONGS:\s+SongDefinition\[]\s*=\s*\[([\s\S]*?)\];/);
const songArraySource = songArrayMatch?.[1] ?? '';

const songBlockPattern = /\{[^{}]*\}/g;
const extractField = (block, fieldName) => {
	const singleQuoted = new RegExp(String.raw`${fieldName}:\s*'((?:\\'|[^'])*)'`);
	const doubleQuoted = new RegExp(String.raw`${fieldName}:\s*"((?:\\"|[^"])*)"`);
	return block.match(singleQuoted)?.[1] ?? block.match(doubleQuoted)?.[1] ?? null;
};

const questions = [...songArraySource.matchAll(songBlockPattern)]
	.map((match) => match[0])
	.map((block) => {
		const title = extractField(block, 'title');
		const audioUrl = extractField(block, 'audioUrl');
		const audioFile = extractField(block, 'audioFile');

		if (!title || !audioUrl || !audioFile) {
			return null;
		}

		return {
			title,
			audioUrl,
			audioFile,
		};
	})
	.filter(Boolean)
	.map((question, index) => ({
		...question,
		index: index + 1,
	}));

const publicAudioFiles = fs
	.readdirSync(PUBLIC_DIR)
	.filter((file) => file.endsWith('.mp3') || file.endsWith('.wav'))
	.sort();

const probeDuration = (target) =>
	execFileSync(
		'ffprobe',
		['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', target],
		{encoding: 'utf8'}
	).trim();

(async () => {
	let hasErrors = false;

console.log(`Checking ${questions.length} cached previews...`);
for (const question of questions) {
    const absolutePath = path.join(PUBLIC_DIR, question.audioFile);
    try {
        const duration = probeDuration(absolutePath);
        console.log(`OK cached [${question.index}] ${question.title}: ${duration}s`);
    } catch (error) {
        hasErrors = true;
        console.error(`FAIL cached [${question.index}] ${question.title}: ${error.message}`);
    }
}

	console.log(`Checking ${publicAudioFiles.length} local audio files...`);
	for (const file of publicAudioFiles) {
		const absolutePath = path.join(PUBLIC_DIR, file);
		try {
			const duration = probeDuration(absolutePath);
			console.log(`OK local ${file}: ${duration}s`);
		} catch (error) {
			hasErrors = true;
			console.error(`FAIL local ${file}: ${error.message}`);
		}
	}

	if (hasErrors) {
		process.exitCode = 1;
		return;
	}

	console.log('Audio validation passed.');
})();
