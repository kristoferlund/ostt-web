---
description: Configure ElevenLabs Scribe models in OSTT, including Scribe v2, Scribe v1, keyterms, diarization, language code, entity detection, and model_options.
---

# ElevenLabs

ElevenLabs Scribe provides high-accuracy transcription across many languages with keyterm prompting, diarization, non-speech event tagging, and entity options.

API documentation: [ElevenLabs speech-to-text](https://elevenlabs.io/docs/api-reference/speech-to-text/convert)

## Models

| Model ID | Notes |
| --- | --- |
| `elevenlabs/scribe_v2` | Latest Scribe model. Supports v2-only options such as `no_verbatim`, entity options, and speaker role detection. |
| `elevenlabs/scribe_v1` | Previous Scribe model. |

## Model Options

```toml
[model_options."elevenlabs/scribe_v2"]
language_code = "sv"
diarize = true
keyterms = ["OSTT", "Scribe", "Whisper"]
tag_audio_events = true
timestamps_granularity = "word"
```

```bash
ostt transcribe interview.mp3 -m elevenlabs/scribe_v2 --mo diarize=true --mo keyterms=OSTT,Scribe
```

| Option | Type | Description |
| --- | --- | --- |
| `language_code` | string | Optional language code. Set when known to improve accuracy. |
| `keyterms` | string list | Domain vocabulary. Saved `ostt keyword` terms are used as fallback only when `keyterms` is not set. |
| `tag_audio_events` | boolean | Tag non-speech events. |
| `timestamps_granularity` | string | Timestamp granularity: `none`, `word`, or `character`. |
| `diarize` | boolean | Enable speaker diarization. |
| `num_speakers` | integer | Expected number of speakers, from `1` to `32`. |
| `diarization_threshold` | number | Speaker diarization threshold from `0.1` to `0.4`. Requires `diarize = true` and cannot be combined with `num_speakers`. |
| `temperature` | number | Sampling temperature. ElevenLabs accepts `0.0` to `2.0`. |
| `file_format` | string | Input audio format: `other` or `pcm_s16le_16`. |
| `seed` | integer | Deterministic seed. |
| `use_multi_channel` | boolean | Use multi-channel input handling. |
| `detect_speaker_roles` | boolean | Scribe v2 only. Detect speaker roles. Requires `diarize = true` and cannot be combined with `use_multi_channel = true`. |
| `no_verbatim` | boolean | Scribe v2 only. Reduce verbatim artifacts. |
| `entity_detection` | string or string list | Scribe v2 only. Entity detection setting, such as `all`, `pii`, `phi`, `pci`, `other`, or `offensive_language`. |
| `entity_redaction` | string or string list | Scribe v2 only. Entity redaction setting. Must be a subset of `entity_detection`. |
| `entity_redaction_mode` | string | Scribe v2 only. Redaction mode: `redacted`, `entity_type`, or `enumerated_entity_type`. |
