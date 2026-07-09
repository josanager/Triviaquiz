# Project Instructions

These rules are mandatory for any agent editing this project.

## Read First

- Before changing songs, artist, emoji bank, intro copy, or outro copy, read [MD.md](/Users/josanestrellaflores/Antigravity/Adivina%20con%20Emojis/MD.md).
- Treat the instructions in `MD.md` as mandatory project context for any artist swap or question-bank replacement.

## Project Scope

- This project is now an audio-based song trivia video, not a general multiple-choice quiz.
- The core gameplay is: play 3 seconds of a song preview, show 5 seconds to think with a countdown bar, then reveal the song name while playing 5 more seconds of the preview.
- Do not add rules or validations that assume the project is primarily about answer letters like `A`, `B`, or `C`.

## Question Bank Consistency

- Keep [src/questions.ts](/Users/josanestrellaflores/Antigravity/ADIVINA%203%20SEGUNDOS/src/questions.ts) and [src/questionsEn.ts](/Users/josanestrellaflores/Antigravity/ADIVINA%203%20SEGUNDOS/src/questionsEn.ts) aligned to the same set of songs, same order, same artwork mapping, and same preview behavior.
- If you change song title, order, cover image, artist, preview URL, or preview offsets in one language path, mirror that same structural change in the other file.
- The English file must stay adapted for English UI usage, but the song list, order, and reveal behavior must remain equivalent to the Spanish file.
- Do not leave one language with missing songs, different ordering, or different reveal behavior.

## Audio Preview Rules

- Correct-answer reveals must keep using the iTunes preview URL pattern already used by the project.
- The current question flow is:
  - `3s` listen phase from the selected iTunes preview segment
  - `5s` think phase with no song audio
  - `5s` reveal phase with the song title on screen and another short preview segment
- When replacing songs, update the `audioUrl` for the matching correct answer and verify it points to the intended track.
- Keep preview timing recognizable. Do not default to a dead intro section if the preview has a stronger middle section.
- Do not replace the current preview-based flow with local full-song files unless the user explicitly asks for that change.

## TTS Model Rule

- The only allowed audio-generation model for this project is `gemini-3.1-flash-tts-preview`.
- Never use fallback TTS models, older TTS models, or alternate audio-generation models for intro, promo, or outro voiceovers.
- If `gemini-3.1-flash-tts-preview` is unavailable, rate-limited, or over quota, keep the existing project audio file already present in the repo instead of regenerating that file with any other model.
- If some voiceovers were already regenerated with `gemini-3.1-flash-tts-preview`, keep those regenerated files; only leave unchanged the file that could not be regenerated with the approved model.

## Current Video Format

- The current intro message is concise and challenge-first.
- The current question design is:
  - listen phase: only animated record/disc plus sound-wave rays
  - think phase: large centered text asking the viewer to guess the song
  - reveal phase: large album cover on the left and large song name on the right
- Keep the countdown bar visible only in the think phase.
- Keep the record/disc dark gray in the listen phase even if the accent colors around it change by question.
- Do not reintroduce dense instruction cards unless the user explicitly asks for them.

## Background Rules

- Every background pattern must keep its visual center aligned to the exact center of the frame.
- Do not offset, translate, or recenter the focal point of a background pattern away from the screen center.
- Keep the existing smooth background transition behavior intact. Do not introduce a jump, duplicate-looking cut, or snap between the intro background and the first question background.
- When doing a new artist swap, the background system should still change the order of themes and the color progression so each artist package feels different.
- Artist swaps may vary background order and palette usage, but must preserve centered composition and seamless transitions.

## Intro Layout

- In both language versions, the gray intro subtitle must always be placed below the main large yellow title, never on the same line.
- Preserve that stacked title order in future intro edits for both horizontal and vertical layouts.
- When resizing intro text or UI elements, keep the composition filling the frame cleanly without overflow or crowding.
- The intro info pill currently shows only the song-count line. Do not re-add extra timing text there unless explicitly requested.

## Copy Coherence

- Do not change visible intro or outro copy just to mention the current artist, song bank, or challenge theme if that makes the wording less natural.
- Outro headlines and CTA text must read like clear viewer-facing prompts with standalone meaning, not like awkward artist-specific slogans.
- Prefer generic, natural phrases such as asking whether the viewer beat the challenge and inviting them to write their score in the comments unless the user explicitly asks for a more artist-specific line.

## Fixed Outro White Box

- The white comment box in the outro must keep a fixed short message and must not be rewritten during artist swaps, song-bank swaps, or copy refreshes.
- The only allowed text in that white box is:
  - Spanish: `Comenta cuántas acertaste`
  - English: `Comment how many you got right`
- Keep that white-box copy short so the panel does not grow unnecessarily.
- Any agent reading these instructions must treat that white-box outro text as locked and must explicitly note that it cannot be changed unless the user directly requests it.

## Promo Sync Rule

- The promo must not outlive or underrun its background video.
- The promo sequence duration, promo card timing, and promo audio playback must stay synchronized.
- If promo timing changes, verify:
  - composition frame counts are integers
  - the promo card does not freeze at the end
  - the promo audio does not continue past the promo video

## Song And Text Replacement Workflow

Use this workflow whenever the user wants to swap songs, artist theme, visible texts, or voiceovers:

1. Read `AGENTS.md` and `MD.md` first.
2. Identify the current gameplay format before editing. In this project it is audio-based, not emoji-based.
3. Build the new song list first.
4. Verify each song against Apple/iTunes preview data.
5. Download or map one local cover image per song for the reveal screen.
6. Update the central song bank in `src/questionBank.ts`.
7. Keep `src/questions.ts` and `src/questionsEn.ts` aligned structurally.
8. Preserve the listen/think/reveal timing flow unless the user asks to change it.
9. Update the background ordering/colors for the new artist while keeping every pattern centered on screen and keeping intro-to-question transitions seamless.
10. Update intro and outro visible copy to match the new challenge theme.
11. Update the Gemini TTS prompts in `scripts/generate_tts_google.py` to match the same theme and rules.
12. Regenerate `intro_es.mp3`, `intro_en.mp3`, `outro_es.mp3`, and `outro_en.mp3` only with `gemini-3.1-flash-tts-preview`.
13. Measure the regenerated audio durations and update any hardcoded frame-duration map that depends on them.
14. If promo timing is involved, re-check promo duration against both video and audio.
15. Run validation after changes.
16. Confirm the project still opens in Remotion without composition or frame-count errors.

## Reusable Deliverable

- A reusable handoff prompt for future song/text swaps lives in [PROMPT_CAMBIO_SONGS_Y_TEXTOS.md](/Users/josanestrellaflores/Antigravity/ADIVINA%203%20SEGUNDOS/PROMPT_CAMBIO_SONGS_Y_TEXTOS.md).
