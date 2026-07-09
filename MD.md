# Artist Change Checklist

These instructions are mandatory for any agent making a project-wide artist or song-bank change.

## When the user asks to replace the emoji songs

- Do not only replace the questions.
- Also update the visible intro and outro text so the artist name, fan label, and challenge wording match the new artist.
- Also update the TTS prompt text used to generate `intro_es.mp3`, `intro_en.mp3`, `outro_es.mp3`, and `outro_en.mp3`.
- After regenerating those audios, re-check their durations and update any hardcoded timing values that depend on them.

## Text Surfaces That Must Be Checked

- [src/components/Intro.tsx](/Users/josanestrellaflores/Antigravity/Adivina%20con%20Emojis/src/components/Intro.tsx)
- [src/components/Outro.tsx](/Users/josanestrellaflores/Antigravity/Adivina%20con%20Emojis/src/components/Outro.tsx)
- [scripts/generate_tts_google.py](/Users/josanestrellaflores/Antigravity/Adivina%20con%20Emojis/scripts/generate_tts_google.py)
- [src/TriviaVideoBase.tsx](/Users/josanestrellaflores/Antigravity/Adivina%20con%20Emojis/src/TriviaVideoBase.tsx)

## Audio Preview Rule

- The correct-answer audio must keep using iTunes preview URLs.
- The playable clip must stay 6 seconds long.
- Do not default to the very beginning of the preview if that part is too empty or too slow.
- Prefer starting the 6-second clip from a more recognizable section of the preview, such as a chorus-like or mid-preview segment, unless the user explicitly asks for the intro.
- For standard iTunes previews of about 30 seconds, prefer a start point around 14 seconds or later if needed, not around the opening seconds.

## Language Consistency

- Keep [src/questions.ts](/Users/josanestrellaflores/Antigravity/Adivina%20con%20Emojis/src/questions.ts) and [src/questionsEn.ts](/Users/josanestrellaflores/Antigravity/Adivina%20con%20Emojis/src/questionsEn.ts) aligned in song order, emoji order, and preview behavior.
- If the artist changes, both language versions must reference that same artist consistently in visible text and voiceover prompts.
