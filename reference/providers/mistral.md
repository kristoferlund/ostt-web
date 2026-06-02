---
description: Configure Mistral Voxtral transcription models in OSTT, including language, diarization, timestamp_granularities, context_bias, temperature, and model_options.
---

# Mistral

Mistral Voxtral Mini Transcribe is a speech-to-text model with diarization, timestamp granularity controls, context biasing for vocabulary, and optional language selection.

API documentation:

- [Speech to Text overview](https://docs.mistral.ai/studio-api/audio/speech_to_text)
- [Offline transcription guide](https://docs.mistral.ai/studio-api/audio/speech_to_text/offline_transcription)
- [Audio transcriptions API](https://docs.mistral.ai/api/endpoint/audio/transcriptions#operation-audio_api_v1_transcriptions_post)

## Models

| Model ID | Notes |
| --- | --- |
| `mistral/voxtral-mini-latest` | Latest Voxtral Mini transcription model. |
| `mistral/voxtral-mini-2602` | Pinned Voxtral Mini 2602 model. |

## Model Options

```toml
[model_options."mistral/voxtral-mini-latest"]
language = "en"
diarize = true
context_bias = ["OSTT", "Voxtral", "Rust"]
temperature = 0.2
```

```bash
ostt transcribe lecture.mp3 -m mistral/voxtral-mini-latest --mo language=en --mo context_bias=OSTT,Voxtral
```

| Option | Type | Description |
| --- | --- | --- |
| `language` | string | Language code, for example `en`. Providing the language can improve accuracy. Cannot be combined with `timestamp_granularities`. |
| `diarize` | boolean | Enable speaker diarization. |
| `timestamp_granularities` | string list | Requested timestamp granularity: `segment` or `word`. Cannot be combined with `language`. |
| `context_bias` | string list | Vocabulary hints. Saved `ostt keyword` terms are used as fallback only when `context_bias` is not set. |
| `temperature` | number | Sampling temperature. |

OSTT uses the synchronous `/v1/audio/transcriptions` endpoint with local file uploads. It does not expose Mistral streaming, `file_url`, or uploaded file IDs.
