---
description: Configure Berget-hosted Klang Pianissimo and Whisper models in OSTT, including Swedish transcription, realtime API transport, supported parameters, keywords, and limitations.
---

# Berget

Berget is a Swedish cloud provider. OSTT uses Berget for Klang Pianissimo, Swedish and Norwegian optimized Whisper models, and general-purpose Whisper Large V3, with processing hosted on European infrastructure.

Berget documentation:

- [Models overview](https://docs.berget.ai/models/overview)
- [API reference](https://api.berget.ai/)
- [Realtime transcription API](https://api.berget.ai/#tag/audio/GET/v1/realtime)
- [Pianissimo realtime launch and file-transcription example](https://berget.ai/en/blog/realtime-transcription-launch)

## Models

| Model ID | Notes |
| --- | --- |
| `berget/klang/pianissimo` | Swedish Parakeet-based model by Klang AI, published as `KlangAI/pianissimo-sv` on Hugging Face. Uses Berget's realtime API. OSTT support is unreleased. |
| `berget/KBLab/kb-whisper-large` | Swedish-optimized KB Whisper Large. KBLab reports 50,000+ hours of Swedish speech training and 47% average WER reduction versus OpenAI Whisper Large V3 across FLEURS, CommonVoice, and NST. |
| `berget/NbAiLab/nb-whisper-large` | Norwegian-optimized NB-Whisper Large. NbAiLab reports 66,000 hours of training data and support for Norwegian, Bokmal, Nynorsk, and English. |
| `berget/openai/whisper-large-v3` | General-purpose multilingual Whisper Large V3. |

Check [Berget's pricing](https://berget.ai/en/pricing) for current model-specific rates.

## Pianissimo params

Pianissimo support is currently unreleased. Use a build containing this addition; older releases will report an unknown model. Authenticate with `ostt auth login`, choose Berget, then use `ostt model` to select Pianissimo.

```bash
ostt transcribe recording.mp3 -m berget/klang/pianissimo
ostt record -m berget/klang/pianissimo -c
ostt model params berget/klang/pianissimo
```

OSTT waits until recording stops, converts the saved audio with ffmpeg to 24 kHz mono PCM16, sends it in chunks to `wss://api.berget.ai/v1/realtime?intent=transcription`, and commits one turn. It returns only the final transcript. **Microphone audio is not sent during recording, and partial transcripts are not displayed.** Berget documents this file-over-WebSocket workflow; Pianissimo is not sent to the Whisper `/v1/audio/transcriptions` endpoint.

```toml
[berget."klang/pianissimo".params]
language = "sv"
chunk_seconds = 3
```

| Param | Type | Description |
| --- | --- | --- |
| `language` | string | Defaults to `sv`. Sent as Berget's `languages` array; Pianissimo is a Swedish model. |
| `chunk_seconds` | number | Positive, finite server-side target segment length in seconds; defaults to `3`. Smaller segments can reduce context. This does not control recording duration or enable live output. |

For example, use `--param chunk_seconds=2` to change the server segmentation. This is distinct from Whisper's `chunk_size` parameter.

Berget states that Pianissimo ignores prompts, temperature, and keywords. OSTT does not send saved `ostt keyword` terms to this model and rejects unsupported params, including `hotwords`, `prompt`, `temperature`, alignment, diarization, and response-format options. Keep Whisper-specific settings under `[berget."KBLab/kb-whisper-large".params]` or another Whisper model's section, rather than `[berget.params]`, because provider-wide settings also apply to Pianissimo.

Requires a Berget API key, network access to the WebSocket endpoint, and ffmpeg. This is cloud transcription, not local inference. Connection errors, server errors, and a connection closing before a final transcript are reported as failures rather than returning partial text.

See [Pianissimo Swedish transcription with OSTT](/lp/klang-pianissimo-svenska) for a workflow overview.

## Whisper params

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

## Whisper file-upload limits

Berget documents supported upload formats `mp3`, `mp4`, `mpeg`, `mpga`, `m4a`, `wav`, and `webm`, with a maximum file size of 100 MB and a maximum processing time of 30 minutes per request. These limits describe the Whisper file-upload route, not Pianissimo's WebSocket transport. OSTT does not expose a `stream` param for either route.
