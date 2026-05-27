#!/usr/bin/env python3
"""
Genera las locuciones del proyecto con Google AI Studio / Gemini TTS.

Instalacion:
    pip install -U google-genai

Uso:
    python scripts/generate_tts_google.py

El script:
    - lee GOOGLE_API_KEY y GEMINI_TTS_MODEL desde .env
    - usa Gemini 3.1 Flash TTS Preview
    - aplica prompting avanzado + audio tags
    - genera intro/outro en ES y EN
    - sube el volumen final un 10%
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


def synthesize_prompt_to_mp3(prompt: str, output_mp3: Path, *, voice_name: str = VOICE_NAME) -> None:
    if not API_KEY:
        raise ValueError("Falta GOOGLE_API_KEY en .env")

    client = genai.Client(api_key=API_KEY)

    response = None
    last_error: Exception | None = None

    for attempt in range(1, 5):
        try:
            response = client.models.generate_content(
                model=MODEL_NAME,
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
            if "RESOURCE_EXHAUSTED" not in message or attempt == 4:
                raise

            retry_match = re.search(r"retry in ([0-9.]+)s", message, re.IGNORECASE)
            detail_match = re.search(r"'retryDelay': '([0-9]+)s'", message)
            wait_seconds = 35.0
            if retry_match:
                wait_seconds = float(retry_match.group(1)) + 2
            elif detail_match:
                wait_seconds = float(detail_match.group(1)) + 2

            print(
                f"Quota temporal alcanzada. Reintentando {output_mp3.name} en {wait_seconds:.1f}s...",
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


def build_spanish_intro_prompt() -> str:
    return """
# AUDIO PROFILE: Nari
## "Geometry Dash Trivia Host"
## THE SCENE: Bright recording booth for a premium gaming trivia video
The host is recording the opening for an energetic Geometry Dash trivia video.
The energy is polished, warm, vibrant, and expressive, like a charismatic presenter
speaking directly to Geometry Dash fans.

### DIRECTOR'S NOTES
Style: confident host, big vocal smile, energetic, expressive, and premium.
 Pacing: energetic and clear, with punchy emphasis on key Geometry Dash words,
but never rushed.
Tone: exciting, natural, inviting, premium, social-media-ready, with bright gaming energy.
Language: neutral Latin American Spanish.
Emotion tags: use at most 3 emotional shifts total. Favor rock-friendly emphasis such as
[hyped], [charged], [victorious], [confidently].
Timing: keep the final spoken audio under 20 seconds. It may be shorter than 17 seconds if needed.

#### TRANSCRIPT
[hyped] Bienvenidos a la gran trivia de Geometry Dash.
[charged] Hoy vas a demostrar cuánto sabes de sus niveles, creadores, secretos, demons y momentos más icónicos del fandom.
[victorious] Tendrás quince segundos por pregunta, así que concéntrate, piensa rápido y prepárate para dashear.
""".strip()


def build_english_intro_prompt() -> str:
    return """
# AUDIO PROFILE: Nari
## "Geometry Dash Trivia Host"
## THE SCENE: Bright recording booth for a premium gaming trivia video
The host is recording the opening for an energetic Geometry Dash trivia video.
The energy is polished, warm, vibrant, and expressive, like a charismatic presenter
speaking directly to Geometry Dash fans.

### DIRECTOR'S NOTES
Style: confident host, big vocal smile, energetic, expressive, and premium.
Pacing: energetic and clear, with punchy emphasis on key Geometry Dash words,
but never rushed.
Tone: exciting, natural, inviting, premium, social-media-ready, with bright gaming energy.
Language: neutral international English.
Emotion tags: use at most 3 emotional shifts total. Favor rock-friendly emphasis such as
[hyped], [charged], [victorious], [confidently].
Timing: keep the final spoken audio under 20 seconds. It may be shorter than 17 seconds if needed.

#### TRANSCRIPT
[hyped] Welcome to the big Geometry Dash trivia challenge.
[charged] Today you'll prove how much you know about the levels, creators, secrets, demons, and the fandom's most iconic moments.
[victorious] You get fifteen seconds per question, so lock in, think fast, and get ready to dash.
""".strip()


def build_spanish_outro_prompt() -> str:
    return """
# AUDIO PROFILE: Nari
## "Geometry Dash Trivia Host"
## THE SCENE: Closing lines after an exciting Geometry Dash challenge
The host is wrapping up a premium Geometry Dash trivia video. The delivery sounds warm,
grateful, energized, and proud of the audience for finishing the challenge.

### DIRECTOR'S NOTES
Style: warm presenter, affectionate, natural, expressive, with a victorious gaming-show afterglow.
Pacing: calm but engaging, with a polished ending cadence.
Tone: celebratory, thankful, emotionally warm, with high-energy arcade spirit.
Language: neutral Latin American Spanish.
Emotion tags: use at most 3 emotional shifts total. Favor tags such as
[triumphant], [amazed], [grateful], [charged].
Timing: keep the final spoken audio under 20 seconds. It may be shorter than 17 seconds if needed.

#### TRANSCRIPT
[triumphant] ¡Felicidades por completar la trivia de Geometry Dash!
[amazed] Esperamos que hayas disfrutado este recorrido por sus niveles, creadores y momentos más legendarios del fandom.
[grateful] Cuéntanos cuántas acertaste, suscríbete a Papel Cool y nos vemos en el próximo reto.
""".strip()


def build_english_outro_prompt() -> str:
    return """
# AUDIO PROFILE: Nari
## "Geometry Dash Trivia Host"
## THE SCENE: Closing lines after an exciting Geometry Dash challenge
The host is wrapping up a premium Geometry Dash trivia video. The delivery sounds warm,
grateful, energized, and proud of the audience for finishing the challenge.

### DIRECTOR'S NOTES
Style: warm presenter, affectionate, natural, expressive, with a victorious gaming-show afterglow.
Pacing: calm but engaging, with a polished ending cadence.
Tone: celebratory, thankful, emotionally warm, with high-energy arcade spirit.
Language: neutral international English.
Emotion tags: use at most 3 emotional shifts total. Favor tags such as
[triumphant], [amazed], [grateful], [charged].
Timing: keep the final spoken audio under 20 seconds. It may be shorter than 17 seconds if needed.

#### TRANSCRIPT
[triumphant] Congratulations on finishing the Geometry Dash trivia.
[amazed] We hope you enjoyed this run through its levels, creators, and the fandom's most legendary moments.
[grateful] Tell us your score, subscribe to Papel Cool, and we will see you in the next challenge.
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
        synthesize_prompt_to_mp3(prompt, output)
        print(f"Listo: {output}")


if __name__ == "__main__":
    generate_project_voiceovers()
