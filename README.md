# Remotion video

<p align="center">
  <a href="https://github.com/remotion-dev/logo">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-dark.apng">
      <img alt="Animated Remotion Logo" src="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-light.gif">
    </picture>
  </a>
</p>

Welcome to your Remotion project!

## Commands

**Install Dependencies**

```console
npm i
```

**Start Preview**

```console
npm run dev
```

**Render video**

```console
npx remotion render
```

**Upgrade Remotion**

```console
npx remotion upgrade
```

## Google TTS

Plantilla base de TTS para este proyecto:

```console
pip install -U google-genai
python scripts/generate_tts_google.py
```

El script usa `GOOGLE_API_KEY` desde `.env` o desde el entorno y guarda el audio en `locucion.wav`.

Para regenerar las locuciones reales del proyecto:

```console
python scripts/generate_tts_google.py
```

Eso regenera `public/intro_es.mp3`, `public/intro_en.mp3`, `public/outro_es.mp3` y `public/outro_en.mp3` usando Gemini TTS.

### Voiceover rules

Preferencias fijadas para futuras regeneraciones de locucion:

- No usar `whispers` en absoluto.
- Se permiten cambios de emocion dentro de un mismo texto.
- Usar como maximo 2 o 3 etiquetas de emocion por audio.
- Mantener el texto suficientemente corto para que no se corte dentro del video.
- Aplicar un aumento final de volumen del 10% a todas las voces.

## Docs

Get started with Remotion by reading the [fundamentals page](https://www.remotion.dev/docs/the-fundamentals).

## Help

We provide help on our [Discord server](https://discord.gg/6VzzNDwUwV).

## Issues

Found an issue with Remotion? [File an issue here](https://github.com/remotion-dev/remotion/issues/new).

## License

Note that for some entities a company license is needed. [Read the terms here](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).
