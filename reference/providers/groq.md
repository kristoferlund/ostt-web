---
description: Configure Groq Whisper models in OSTT, including whisper-large-v3, whisper-large-v3-turbo, and OpenAI-compatible model_options.
---

# Groq

Groq runs Whisper models on LPU infrastructure for very fast transcription. OSTT supports Groq’s OpenAI-compatible transcription endpoint.

API documentation: [Groq audio transcriptions](https://console.groq.com/docs/speech-to-text)

## Models

| Model ID | Notes |
| --- | --- |
| `groq/whisper-large-v3` | Full Whisper Large V3. Groq documents this as the accuracy-sensitive choice with transcription and translation support. |
| `groq/whisper-large-v3-turbo` | Fine-tuned, pruned Whisper Large V3 Turbo variant. Groq documents this as the best price/performance choice for multilingual transcription. |

Groq documents `whisper-large-v3` at 189x real-time speed with 10.3% WER, and `whisper-large-v3-turbo` at 216x real-time speed with 12% WER. Turbo does not support translation; OSTT currently uses Groq’s transcription endpoint.

## Model Options

```toml
[model_options."groq/whisper-large-v3-turbo"]
language = "en"
prompt = "Meeting about Rust, OSTT, and terminal transcription."
temperature = 0.0
response_format = "verbose_json"
timestamp_granularities = ["word", "segment"]
```

```bash
ostt transcribe meeting.mp3 -m groq/whisper-large-v3-turbo --mo language=en --mo response_format=verbose_json --mo timestamp_granularities=word,segment
ostt model options groq/whisper-large-v3-turbo --format json
```

OSTT always returns plain transcript text. `verbose_json` and timestamp options are supported because the response still contains a top-level `text` field; timestamp metadata is not emitted in command output.

| Option | Type | Description |
| --- | --- | --- |
| `language` | string | Optional ISO-639-1 language hint such as `en`. Groq documents this as improving accuracy and latency when the source language is known. |
| `prompt` | string | Context prompt for terminology, spelling, or output style. Groq documents a 224-token prompt limit. Saved `ostt keyword` terms are used as fallback only when `prompt` is not set. |
| `temperature` | number | Sampling temperature, `0.0` to `1.0`. Groq recommends the default `0` for transcription. |
| `response_format` | string | Supported values in OSTT: `json`, `verbose_json`. Groq also documents `text`, but OSTT does not expose it because this provider path parses JSON. |
| `timestamp_granularities` | string list | Supported values: `word`, `segment`. Requires `response_format = "verbose_json"`; OSTT sets `verbose_json` automatically if timestamps are set without an explicit response format. |

## Audio Limits

Groq documents direct uploads for `flac`, `mp3`, `mp4`, `mpeg`, `mpga`, `m4a`, `ogg`, `wav`, and `webm`. Current limits are 25 MB on the free tier and 100 MB on the dev tier, with a 10-second minimum billed length. Groq downsamples audio to 16 kHz mono before transcription.
