# Project Instructions

These rules are mandatory for any agent editing this project.

## Trivia Answer Distribution

- Never leave all or most correct answers in the same option slot.
- Correct answers must be deliberately distributed across `A`, `B`, and `C`.
- Avoid obvious patterns such as all `A`, all `B`, alternating only `A/B`, or long repeated runs.
- When rewriting or replacing questions, update both [src/questions.ts](/Users/josanestrellaflores/Antigravity/Triviaquiz/src/questions.ts) and [src/questionsEn.ts](/Users/josanestrellaflores/Antigravity/Triviaquiz/src/questionsEn.ts) so the correct option position stays aligned between languages.
- Before finishing, verify that the `correct` indexes are varied across the full set.

## Content Consistency

- Spanish and English trivia banks must represent the same question set.
- If option order changes in one language, mirror that change in the other language.
- Do not change a correct answer just to vary letters; reorder options instead.
