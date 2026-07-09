# Prompt Reutilizable: Cambio De Musicas Y Textos

Usa este prompt cuando debas sustituir el banco de canciones, artista, portadas, textos visibles y locuciones de este proyecto.

## Objetivo

Actualizar este proyecto de trivia musical manteniendo el formato actual del video:

- `3s` de escucha
- `5s` para pensar con barra de tiempo
- `5s` de reveal con nombre de la cancion

## Reglas obligatorias

1. Lee primero `AGENTS.md` y `MD.md`.
2. Trata las reglas de ambos archivos como obligatorias.
3. Usa previews de iTunes, no canciones completas locales.
4. Usa una portada local por cada cancion para el reveal.
5. Mantén sincronizados `src/questionBank.ts`, `src/questions.ts` y `src/questionsEn.ts`.
6. No rompas el flujo listen / think / reveal salvo que se pida expresamente.
7. La unica voz TTS permitida es `gemini-3.1-flash-tts-preview`.
8. Si regeneras intro/outro, mide sus nuevas duraciones y actualiza los valores fijos dependientes.
9. Si tocas la promo, asegúrate de que video y audio terminen exactamente juntos.
10. Si cambias fondos para un nuevo artista, cambia el orden y la progresión de color, pero mantén siempre el centro visual de cada fondo exactamente en el centro de la pantalla y sin cortes raros entre intro y primera pregunta.
11. Al final valida que Remotion abra sin errores y que `npm run lint` pase.

## Pasos exactos

1. Revisar el formato actual del proyecto.
2. Revisar si el usuario quiere cambiar:
   - canciones
   - artista o tema
   - intro
   - outro
   - portadas
   - promo
3. Construir la nueva lista de canciones.
4. Buscar cada cancion en Apple/iTunes y guardar:
   - `audioUrl`
   - `artwork`
   - artista
   - offset de preview si hace falta
5. Descargar las portadas a `public/covers/...`.
6. Actualizar `src/questionBank.ts` con:
   - titulo
   - imagen local
   - `audioUrl`
   - `previewStartSeconds`
   - artista
7. Mantener equivalencia estructural entre español e inglés.
8. Ajustar los textos visibles de intro y outro para el nuevo tema.
9. Ajustar los prompts TTS en `scripts/generate_tts_google.py`.
10. Regenerar:
   - `public/intro_es.mp3`
   - `public/intro_en.mp3`
   - `public/outro_es.mp3`
   - `public/outro_en.mp3`
11. Medir las duraciones de esos audios regenerados.
12. Actualizar el mapa de duraciones en `src/TriviaVideoBase.tsx` si cambió.
13. Ajustar los fondos del nuevo artista para que sí cambien de orden y color, pero sin mover el centro del patrón fuera del centro del frame y sin romper las transiciones ya existentes.
14. Si cambia la promo:
   - medir duración del video
   - fijar duración exacta de la secuencia
   - recortar el audio exactamente a esa duración
   - evitar congelados al final
15. Ejecutar `npm run lint`.
16. Verificar que las composiciones de Remotion abran bien.

## Resultado esperado

El proyecto debe quedar listo con:

- nuevo banco musical
- nuevas portadas
- nuevos textos visibles
- nuevas locuciones de intro y outro
- tiempos sincronizados
- sin errores de composición ni de compilación
