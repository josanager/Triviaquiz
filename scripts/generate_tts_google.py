#!/usr/bin/env python3
"""
Genera las locuciones del proyecto con Google AI Studio / Gemini TTS.

Instalacion:
    pip install -U google-genai

Uso:
    python scripts/generate_tts_google.py

El script:
    - lee GOOGLE_API_KEY y GEMINI_TTS_MODEL desde .env
    - usa solo Gemini 3.1 Flash TTS Preview
    - aplica prompting avanzado + audio tags
    - genera solo intro/outro en ES y EN
    - sube el volumen final un 10%
    - si hay cuota agotada, conserva el audio existente en lugar de usar otro modelo
    - guarda WAV temporal y exporta MP3 final en public/
"""

from __future__ import annotations

import os
import re
import shutil
import subprocess
import tempfile
import time
import wave
from pathlib import Path

from google import genai
from google.genai import types


ROOT_DIR = Path(__file__).resolve().parent.parent
PUBLIC_DIR = ROOT_DIR / "public"


def load_dotenv(dotenv_path: str | Path = ROOT_DIR / ".env") -> None:
    env_file = Path(dotenv_path)
    if not env_file.exists():
        return

    for raw_line in env_file.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip().strip("\"'"))


load_dotenv()

API_KEY = os.getenv("GOOGLE_API_KEY", "")
MODEL_NAME = os.getenv("GEMINI_TTS_MODEL", "gemini-3.1-flash-tts-preview")
VOICE_NAME = os.getenv("GEMINI_TTS_VOICE", "Leda")
VOLUME_MULTIPLIER = 1.1


def save_wave_file(
    filename: str | Path,
    pcm_data: bytes,
    *,
    channels: int = 1,
    sample_rate: int = 24000,
    sample_width: int = 2,
) -> None:
    with wave.open(str(filename), "wb") as wav_file:
        wav_file.setnchannels(channels)
        wav_file.setsampwidth(sample_width)
        wav_file.setframerate(sample_rate)
        wav_file.writeframes(pcm_data)


def wav_to_mp3(wav_path: Path, mp3_path: Path, *, volume_multiplier: float = VOLUME_MULTIPLIER) -> None:
    if shutil.which("ffmpeg") is None:
        raise RuntimeError("ffmpeg no esta disponible en el sistema.")

    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-i",
            str(wav_path),
            "-filter:a",
            f"volume={volume_multiplier}",
            "-codec:a",
            "libmp3lame",
            "-q:a",
            "2",
            str(mp3_path),
        ],
        check=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )


def _synthesize_with_model(
    prompt: str,
    output_mp3: Path,
    *,
    model_name: str,
    voice_name: str = VOICE_NAME,
) -> None:
    if not API_KEY:
        raise ValueError("Falta GOOGLE_API_KEY en .env")

    client = genai.Client(api_key=API_KEY)

    response = None
    last_error: Exception | None = None

    for attempt in range(1, 5):
        try:
            response = client.models.generate_content(
                model=model_name,
                contents=prompt,
                config=types.GenerateContentConfig(
                    response_modalities=["AUDIO"],
                    speech_config=types.SpeechConfig(
                        voice_config=types.VoiceConfig(
                            prebuilt_voice_config=types.PrebuiltVoiceConfig(
                                voice_name=voice_name,
                            )
                        )
                    ),
                ),
            )
            break
        except Exception as exc:  # SDK envuelve errores HTTP en ClientError
            last_error = exc
            message = str(exc)
            is_quota = "RESOURCE_EXHAUSTED" in message
            is_internal = "500" in message or "INTERNAL" in message
            if (not is_quota and not is_internal) or attempt == 4:
                raise

            retry_match = re.search(r"retry in ([0-9.]+)s", message, re.IGNORECASE)
            detail_match = re.search(r"'retryDelay': '([0-9]+)s'", message)
            wait_seconds = 35.0 if is_quota else 8.0 * attempt
            if retry_match:
                wait_seconds = float(retry_match.group(1)) + 2
            elif detail_match:
                wait_seconds = float(detail_match.group(1)) + 2

            print(
                f"Error transitorio al generar {output_mp3.name}. Reintentando en {wait_seconds:.1f}s...",
                flush=True,
            )
            time.sleep(wait_seconds)

    if response is None:
        raise RuntimeError(f"No se pudo generar {output_mp3.name}") from last_error

    audio_part = response.candidates[0].content.parts[0]
    pcm_data = audio_part.inline_data.data

    with tempfile.TemporaryDirectory() as tmpdir:
        wav_path = Path(tmpdir) / f"{output_mp3.stem}.wav"
        save_wave_file(wav_path, pcm_data)
        wav_to_mp3(wav_path, output_mp3)


def synthesize_prompt_to_mp3(prompt: str, output_mp3: Path, *, voice_name: str = VOICE_NAME) -> None:
    _synthesize_with_model(prompt, output_mp3, model_name=MODEL_NAME, voice_name=voice_name)


def build_spanish_intro_prompt() -> str:
    return """
# AUDIO PROFILE: Leda
## "Nuevo Testamento Trivia Host"
## THE SCENE: Bright recording booth for a premium Bible trivia challenge about the New Testament
The host is recording the opening for a fast, exciting New Testament trivia challenge.
The energy is polished, vibrant, bold, uplifting, and expressive, like a charismatic presenter
launching a high-energy Bible challenge for viewers who want to prove what they know.

### DIRECTOR'S NOTES
Style: magnetic host, big vocal smile, energetic, expressive, premium, and full of momentum.
Pacing: dynamic. Hit the welcome line hard, explain the rules fast and clearly, then launch the challenge with a victorious finish.
Do not keep the same cadence across all 3 lines.
Delivery notes:
- Line 1 should sound like an exciting welcome with instant impact.
- Line 2 should explain the rule quickly and still feel lively.
- Line 3 should sound punchy, triumphant, and like the challenge is officially starting.
Emphasis words: Nuevo Testamento, quince segundos, pregunta, reto, Biblia.
Avoid: flat reading, sleepy delivery, teacher voice, calm narration, or repeating the same melody in each line.
Use short pauses for impact, especially after Nuevo Testamento and before the final launch line.
Tone: exciting, natural, inviting, social-media-ready, with premium game-show energy.
Language: neutral Latin American Spanish.
Emotion tags: use at most 3 emotional shifts total. Favor energetic emphasis such as
[hyped], [charged], [victorious].
Timing: keep the final spoken audio under 20 seconds. Aim for 13 to 17 seconds total.

#### TRANSCRIPT
[hyped] ¡Ey! Ya llegó la trivia del Nuevo Testamento.
[charged] Tienes quince segundos por pregunta para pensar rápido y elegir la respuesta correcta.
[victorious] Quédate hasta el final y demuestra si de verdad tienes nivel experto en la Biblia.
""".strip()


def build_english_intro_prompt() -> str:
    return """
# AUDIO PROFILE: Leda
## "New Testament Trivia Host"
## THE SCENE: Bright recording booth for a premium Bible trivia challenge about the New Testament
The host is recording the opening for a fast, exciting New Testament trivia challenge.
The energy is polished, vibrant, bold, uplifting, and expressive, like a charismatic presenter
launching a high-energy Bible challenge for viewers ready to prove what they know.

### DIRECTOR'S NOTES
Style: magnetic host, big vocal smile, energetic, expressive, premium, and full of momentum.
Pacing: dynamic. Open with a sharp hook, explain the rule quickly, and land with a victorious launch.
Do not keep the same melody or sentence shape on every line.
Delivery notes:
- Line 1 should feel like a strong welcome with instant energy.
- Line 2 should explain the rule quickly and still sound lively.
- Line 3 should sound victorious and make the challenge feel live.
Emphasis words: New Testament, fifteen seconds, question, challenge, Bible.
Avoid: flat reading, polished-but-boring delivery, sleepy narration, or the same tone repeated 3 times.
Use short pauses for impact, especially after New Testament and before the final launch line.
Tone: exciting, natural, inviting, social-media-ready, with premium game-show energy.
Language: neutral international English.
Emotion tags: use at most 3 emotional shifts total. Favor energetic emphasis such as
[hyped], [charged], [victorious].
Timing: keep the final spoken audio under 20 seconds. Aim for 13 to 17 seconds total.

#### TRANSCRIPT
[hyped] Hey! The New Testament trivia challenge is here.
[charged] You get fifteen seconds for each question, so think fast and pick the right answer.
[victorious] Stay to the end and prove you really have expert-level Bible knowledge.
""".strip()


def build_spanish_promo_prompt() -> str:
    return """
# AUDIO PROFILE: Nari
## "Adventure Time Trivia Host"
## THE SCENE: Mid-roll promo inside a premium fandom trivia video
The host is delivering a fast, exciting promotional break for Papelcool in the middle
of the trivia. The energy is upbeat, confident, and inviting, like a creator showing
something genuinely fun and worth opening right now.

### DIRECTOR'S NOTES
Style: confident host, big vocal smile, energetic, expressive, and premium.
Pacing: fast, clear, persuasive, and easy to follow without sounding rushed.
Tone: playful, exciting, sales-ready, and warm.
Language: neutral Latin American Spanish.
Emotion tags: use at most 3 emotional shifts total. Favor rock-friendly emphasis such as
[hyped], [charged], [victorious].
Timing: keep the final spoken audio under 20 seconds.

#### TRANSCRIPT
[hyped] ¿Quieres descargar papercraft gratis de tus personajes favoritos?
[charged] Escanea este QR o entra a papel punto cool y descubre plantillas listas para armar, nuevas colecciones y la pestaña CUSTOM para crear tu propio Papelcool.
[victorious] Entra ahora, disfruta todo lo que tenemos para ti y ahora sí, volvamos con el juego.
""".strip()


def build_english_promo_prompt() -> str:
    return """
# AUDIO PROFILE: Nari
## "Adventure Time Trivia Host"
## THE SCENE: Mid-roll promo inside a premium fandom trivia video
The host is delivering a fast, exciting promotional break for Papelcool in the middle
of the trivia. The energy is upbeat, confident, and inviting, like a creator showing
something genuinely fun and worth opening right now.

### DIRECTOR'S NOTES
Style: confident host, big vocal smile, energetic, expressive, and premium.
Pacing: fast, clear, persuasive, and easy to follow without sounding rushed.
Tone: playful, exciting, sales-ready, and warm.
Language: neutral international English.
Emotion tags: use at most 3 emotional shifts total. Favor rock-friendly emphasis such as
[hyped], [charged], [victorious].
Timing: keep the final spoken audio under 20 seconds.

#### TRANSCRIPT
[hyped] Want free papercraft templates of your favorite characters?
[charged] Scan this QR or visit papel dot cool to find ready-to-build templates, fresh collections, and the CUSTOM tab where you can create your own Papelcool.
[victorious] Jump in now, enjoy everything we made for you, and now let’s get back to the game.
""".strip()


def build_spanish_bonus_reveal_prompt() -> str:
    return """
# AUDIO PROFILE: Nari
## "Digital Circus Trivia Host"
## THE SCENE: Surprise twist right after question thirty
The host is delivering a very short, energetic surprise line right after question thirty.
The performance should feel explosive, playful, and punchy, like a fast game show fake-out.

### DIRECTOR'S NOTES
Style: mischievous host, huge vocal smile, energetic, dramatic, premium.
Pacing: very fast, punchy, and crystal clear.
Tone: teasing, triumphant, playful, and high-energy.
Language: neutral Latin American Spanish.
Emotion tags: use at most 3 emotional shifts total. Favor tags such as
[playful], [charged], [victorious].
Timing: keep the final spoken audio under 5 seconds.

#### TRANSCRIPT
[playful] Y por quedarte hasta el final,
[victorious] pregunta extra.
""".strip()


def build_english_bonus_reveal_prompt() -> str:
    return """
# AUDIO PROFILE: Nari
## "Digital Circus Trivia Host"
## THE SCENE: Surprise twist right after question thirty
The host is delivering a very short, energetic surprise line right after question thirty.
The performance should feel explosive, playful, and punchy, like a fast game show fake-out.

### DIRECTOR'S NOTES
Style: mischievous host, huge vocal smile, energetic, dramatic, premium.
Pacing: very fast, punchy, and crystal clear.
Tone: teasing, triumphant, playful, and high-energy.
Language: neutral international English.
Emotion tags: use at most 3 emotional shifts total. Favor tags such as
[playful], [charged], [victorious].
Timing: keep the final spoken audio under 5 seconds.

#### TRANSCRIPT
[playful] And for staying till the end,
[victorious] bonus question.
""".strip()


def build_spanish_outro_prompt() -> str:
    return """
# AUDIO PROFILE: Leda
## "Nuevo Testamento Trivia Host"
## THE SCENE: Closing lines after an exciting Bible challenge about the New Testament
The host is wrapping up a premium New Testament trivia video. The delivery should sound warm,
grateful, energized, and proud of the audience for finishing the challenge.

### DIRECTOR'S NOTES
Style: confident host, warm presenter, expressive, proud, and slightly playful on the close.
Pacing: shaped ending. Start strong, soften the middle line a little, then rise again on the sign-off.
Do not read all 3 lines with the same intensity.
Delivery notes:
- Line 1 should sound celebratory and impressed.
- Line 2 should feel direct and conversational.
- Line 3 should lift again and close with bright creator energy.
Emphasis words: Nuevo Testamento, comentarios, suscríbete, Biblia, reto.
Avoid: sleepy gratitude, flat politeness, or a generic corporate outro.
Use one or two intentional pauses to give the outro emotional shape.
Tone: celebratory, thankful, warm, and high-energy without sounding robotic.
Language: neutral Latin American Spanish.
Emotion tags: use at most 3 emotional shifts total. Favor tags such as
[triumphant], [warm], [grateful].
Timing: keep the final spoken audio under 20 seconds. Aim for 11 to 15 seconds total.

#### TRANSCRIPT
[triumphant] ¡Increíble! Ya terminaste este reto del Nuevo Testamento.
[warm] Cuéntame en los comentarios cuántas respuestas acertaste.
[grateful] Suscríbete a Papel Cool y nos vemos en la próxima trivia bíblica.
""".strip()


def build_english_outro_prompt() -> str:
    return """
# AUDIO PROFILE: Leda
## "New Testament Trivia Host"
## THE SCENE: Closing lines after an exciting Bible challenge about the New Testament
The host is wrapping up a premium New Testament trivia video. The delivery should sound warm,
grateful, energized, and proud of the audience for finishing the challenge.

### DIRECTOR'S NOTES
Style: confident host, warm presenter, expressive, proud, and slightly playful on the close.
Pacing: shaped ending. Hit the first line strong, soften the middle line, then rise again for the sign-off.
Do not read all 3 lines with the same energy curve.
Delivery notes:
- Line 1 should sound celebratory and impressed.
- Line 2 should feel direct and conversational.
- Line 3 should lift again and end with a bright creator-style finish.
Emphasis words: New Testament, comments, subscribe, Bible, challenge.
Avoid: monotone gratitude, calm narration, or repeating the same upbeat rhythm every time.
Use brief pauses to create contrast and make the outro feel alive.
Tone: celebratory, thankful, warm, and high-energy without sounding stiff.
Language: neutral international English.
Emotion tags: use at most 3 emotional shifts total. Favor tags such as
[triumphant], [warm], [grateful].
Timing: keep the final spoken audio under 20 seconds. Aim for 11 to 15 seconds total.

#### TRANSCRIPT
[triumphant] Incredible! You just finished this New Testament challenge.
[warm] Tell me in the comments how many answers you got right.
[grateful] Subscribe to Papel Cool, and I will see you in the next Bible trivia challenge.
""".strip()


def generate_project_voiceovers() -> None:
    jobs = [
        (build_spanish_intro_prompt(), PUBLIC_DIR / "intro_es.mp3"),
        (build_english_intro_prompt(), PUBLIC_DIR / "intro_en.mp3"),
        (build_spanish_outro_prompt(), PUBLIC_DIR / "outro_es.mp3"),
        (build_english_outro_prompt(), PUBLIC_DIR / "outro_en.mp3"),
    ]

    for prompt, output in jobs:
        print(f"Generando {output.name} con {MODEL_NAME} / voz {VOICE_NAME}...")
        try:
            synthesize_prompt_to_mp3(prompt, output)
            print(f"Listo: {output}")
        except Exception as exc:
            message = str(exc)
            is_quota = "RESOURCE_EXHAUSTED" in message or "429" in message
            if is_quota and output.exists():
                print(
                    f"Cuota agotada para {output.name}. "
                    f"Se conserva el audio existente porque este proyecto solo permite {MODEL_NAME}.",
                    flush=True,
                )
                continue
            raise


if __name__ == "__main__":
    generate_project_voiceovers()
