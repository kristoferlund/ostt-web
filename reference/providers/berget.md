---
description: Configure Berget-hosted Whisper models in OSTT, including KB Whisper Large, NB Whisper Large, Whisper Large V3, hotwords, diarization, alignment, and params.
---

# Berget

Berget is a Swedish cloud provider. OSTT uses Berget for Swedish and Norwegian optimized Whisper models as well as general-purpose Whisper Large V3, with processing hosted on European infrastructure.

Berget documentation:

- [Models overview](https://docs.berget.ai/models/overview)
- [API reference](https://api.berget.ai/)

## Models

| Model ID | Notes |
| --- | --- |
| `berget/KBLab/kb-whisper-large` | Swedish-optimized KB Whisper Large. KBLab reports 50,000+ hours of Swedish speech training and 47% average WER reduction versus OpenAI Whisper Large V3 across FLEURS, CommonVoice, and NST. |
| `berget/NbAiLab/nb-whisper-large` | Norwegian-optimized NB-Whisper Large. NbAiLab reports 66,000 hours of training data and support for Norwegian, Bokmal, Nynorsk, and English. |
| `berget/openai/whisper-large-v3` | General-purpose multilingual Whisper Large V3. |

Berget lists all three speech-to-text models at `€3.00 / 1,000 min`.

## Params

```toml
[berget."KBLab/kb-whisper-large".params]
language = "sv"
hotwords = ["OSTT", "KBLab", "Berget"]
prompt = "Swedish technical dictation."
temperature = 0.0
response_format = "verbose_json"
align = true
diarize = true
```

```bash
ostt transcribe meeting.mp3 -m berget/KBLab/kb-whisper-large --param language=sv --param hotwords=OSTT,KBLab --param align=true
ostt model params berget/KBLab/kb-whisper-large --format json
```

OSTT always returns plain transcript text. `verbose_json`, word alignment, and diarization params are supported because Berget responses still include a top-level `text` field; metadata is not emitted in command output.

| Param | Type | Description |
| --- | --- | --- |
| `language` | string | Optional language hint, such as `sv` or `no`. |
| `hotwords` | string list | Berget keyword boosting terms. Saved `ostt keyword` terms are used as fallback only when `hotwords` is not set. |
| `prompt` | string | Whisper-compatible context prompt. Saved `ostt keyword` terms are used as fallback only when `prompt` is not set. |
| `temperature` | number | Sampling temperature, `0.0` to `1.0`. |
| `response_format` | string | Supported values in OSTT: `json`, `verbose_json`. Berget also documents `text`, `srt`, and `vtt`, but OSTT does not expose them because this provider path parses JSON. |
| `timestamp_granularities` | string list | Supported values: `word`, `segment`. |
| `align` | boolean | Enable word-level timestamp alignment. Berget documents this as adding word start/end timestamps and confidence scores. |
| `diarize` | boolean | Enable speaker diarization with automatic speaker labels. |
| `speaker_embeddings` | boolean | Enable speaker embeddings. |
| `chunk_size` | integer | Chunk size in seconds, `1` to `60`. |
| `batch_size` | integer | Processing batch size, `1` to `32`. |

## Limits

Berget documents supported upload formats `mp3`, `mp4`, `mpeg`, `mpga`, `m4a`, `wav`, and `webm`, with a maximum file size of 100 MB and a maximum processing time of 30 minutes per request. Streaming is documented as not yet implemented, so OSTT does not expose `stream`.
