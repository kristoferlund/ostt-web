---
description: Configure DeepInfra-hosted speech recognition models in OSTT, including Whisper Large V3, Whisper Large V3 Turbo, Qwen3 ASR, Nemotron ASR, Voxtral, and params.
---

# DeepInfra

DeepInfra hosts open speech recognition models behind its inference API. OSTT supports DeepInfra-hosted Whisper, Qwen3 ASR, Nemotron, and Voxtral speech-recognition models.

DeepInfra documentation:

- [Speech Recognition API](https://docs.deepinfra.com/apis/speech)
- [Automatic speech recognition models](https://deepinfra.com/models/automatic-speech-recognition)

## Models

| Model ID | Notes |
| --- | --- |
| `deepinfra/openai/whisper-large-v3` | High-accuracy multilingual Whisper Large V3 model. |
| `deepinfra/openai/whisper-large-v3-turbo` | Faster pruned Whisper Large V3 Turbo model. DeepInfra lists this at `$0.00020 / minute`. |
| `deepinfra/Qwen/Qwen3-ASR-0.6B` | Compact Qwen3 speech recognition model. Language identification and transcription across 30 languages and 22 Chinese dialects. |
| `deepinfra/Qwen/Qwen3-ASR-1.7B` | Larger Qwen3 speech recognition model with multilingual transcription and optional word timestamps. |
| `deepinfra/nvidia/Nemotron-3.5-ASR-Streaming-Multilingual-0.6b` | NVIDIA's 0.6B multilingual ASR model. OSTT uses DeepInfra's completed-file inference endpoint despite the streaming name. |
| `deepinfra/mistralai/Voxtral-Mini-3B-2507` | Voxtral Mini speech-recognition model for transcription, translation, and audio understanding. |
| `deepinfra/mistralai/Voxtral-Small-24B-2507` | Larger Voxtral speech-recognition model. |

## Params

```toml
[deepinfra."openai/whisper-large-v3".params]
language = "sv"
initial_prompt = "Names: OSTT, DeepInfra, Whisper."
temperature = 0.0
task = "transcribe"
chunk_level = "segment"
chunk_length_s = 30
```

```bash
ostt transcribe meeting.mp3 -m deepinfra/openai/whisper-large-v3 --param language=sv --param initial_prompt=OSTT
ostt model params deepinfra/openai/whisper-large-v3-turbo --format json
```

| Param | Type | Description |
| --- | --- | --- |
| `language` | string | Optional language hint. |
| `initial_prompt` | string | Optional text prompt for the first transcription window. Saved `ostt keyword` terms are used as fallback only when `initial_prompt` is not set. |
| `temperature` | number | Sampling temperature, `0.0` to `1.0`. |
| `task` | string | Supported values: `transcribe`, `translate`. |
| `chunk_level` | string | Supported values: `segment`, `word`. DeepInfra documents this as the chunk level for timestamp segmentation. |
| `chunk_length_s` | integer | Chunk length in seconds. DeepInfra documents `1` to `30`, default `30`. |

## Audio Formats

DeepInfra's speech API documents direct upload support for `mp3` and `wav`. Responses include a top-level `text` field and segment timestamps; OSTT returns the transcript text.
