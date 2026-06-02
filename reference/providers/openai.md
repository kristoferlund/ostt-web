---
description: Configure OpenAI transcription models in OSTT, including gpt-4o-transcribe, gpt-4o-mini-transcribe, gpt-4o-transcribe-diarize, whisper-1, and params.
---

# OpenAI

OpenAI provides speech-to-text models through its audio transcription API. OSTT supports the newer GPT-4o transcription models, GPT-4o diarization, and the legacy hosted Whisper model.

API documentation: [OpenAI create transcription](https://developers.openai.com/api/reference/resources/audio/subresources/transcriptions/methods/create)

## Models

| Model ID | Notes |
| --- | --- |
| `openai/gpt-4o-transcribe` | Higher-quality GPT-4o transcription model. Good default when accuracy matters. |
| `openai/gpt-4o-mini-transcribe` | Faster, lighter GPT-4o transcription model. Good for high-volume use. |
| `openai/gpt-4o-transcribe-diarize` | GPT-4o transcription with diarized JSON output and speaker-segment annotations. |
| `openai/whisper-1` | Legacy hosted Whisper model. Broad compatibility. |

## Select A Model

```bash
ostt model select openai/gpt-4o-transcribe
```

Per command:

```bash
ostt transcribe meeting.mp3 -m openai/gpt-4o-transcribe
```

## Params

Configure persistent params in `~/.config/ostt/ostt.toml`:

```toml
[openai.gpt-4o-transcribe.params]
language = "sv"
prompt = "Technical meeting about OSTT, Whisper, and Rust."
temperature = 0.0
include = ["logprobs"]

[openai.whisper-1.params]
response_format = "verbose_json"
timestamp_granularities = ["word"]

[openai.gpt-4o-transcribe-diarize.params]
response_format = "diarized_json"
chunking_strategy = "auto"
known_speaker_names = ["agent"]
```

Override for one invocation with `--param key=value`:

```bash
ostt transcribe meeting.mp3 -m openai/gpt-4o-transcribe --param language=sv --param temperature=0
ostt transcribe meeting.wav -m openai/gpt-4o-transcribe-diarize --param chunking_strategy=auto
```

List supported params for any model:

```bash
ostt model params openai/gpt-4o-transcribe --format json
```

OSTT always returns plain transcript text. Params that require a JSON response are supported only when the response still contains a top-level `text` field.

## GPT-4o Params

| Param | Type | Description |
| --- | --- | --- |
| `language` | string | Optional language hint, such as `en` or `sv`. Use when you know the source language. |
| `prompt` | string | Context text that guides spelling, terminology, names, and writing style. Saved `ostt keyword` terms are used as fallback only when `prompt` is not set. |
| `temperature` | number | Sampling temperature, `0.0` to `1.0`. Lower values are more deterministic. |
| `include` | string list | `logprobs` returns token log probabilities from `gpt-4o-transcribe` and `gpt-4o-mini-transcribe`. OSTT still outputs only transcript text. |

## Diarization Params

Use `openai/gpt-4o-transcribe-diarize` for diarization. OSTT sends `response_format = "diarized_json"` by default for this model and returns the combined `text` field.

| Param | Type | Description |
| --- | --- | --- |
| `language` | string | Optional language hint. |
| `prompt` | string | Context text that guides vocabulary and style. |
| `temperature` | number | Sampling temperature, `0.0` to `1.0`. |
| `response_format` | string | Supported values in OSTT: `json`, `diarized_json`. Defaults to `diarized_json`. |
| `chunking_strategy` | string | Supported value: `auto`. Used by OpenAI's diarization flow. |
| `known_speaker_names` | string list | Optional known speaker labels, sent as repeated `known_speaker_names[]` form fields. |
| `known_speaker_references` | string list | Optional data URL audio references, sent as repeated `known_speaker_references[]` form fields. |

## Whisper Params

`whisper-1` supports timestamp metadata through `verbose_json`. OSTT parses the `text` field and does not expose word or segment metadata in command output.

| Param | Type | Description |
| --- | --- | --- |
| `language` | string | Optional language hint. |
| `prompt` | string | Context text for names and vocabulary. Saved `ostt keyword` terms are used as fallback only when `prompt` is not set. |
| `temperature` | number | Sampling temperature, `0.0` to `1.0`. |
| `response_format` | string | Supported values in OSTT: `json`, `verbose_json`. `text`, `srt`, and `vtt` are not exposed because OSTT's OpenAI path parses JSON. |
| `timestamp_granularities` | string list | Supported values: `word`, `segment`. Requires `response_format = "verbose_json"`; OSTT sets `verbose_json` automatically if timestamps are set without an explicit response format. |

## Not Exposed

OSTT does not expose OpenAI `stream=true` because this provider path expects a single JSON response. It also does not expose non-JSON response formats (`text`, `srt`, `vtt`) because they would bypass OSTT's JSON parsing path.
