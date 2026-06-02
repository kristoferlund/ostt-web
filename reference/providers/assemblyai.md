---
description: Configure AssemblyAI Universal-3 Pro in OSTT, including promptable transcription, keyterms_prompt, diarization, language detection, and model_options.
---

# AssemblyAI

AssemblyAI Universal-3 Pro is a promptable speech-to-text model with language detection, formatting, speaker labels, and vocabulary guidance.

AssemblyAI documentation:

- [Universal-3 Pro](https://www.assemblyai.com/docs/pre-recorded-audio/universal-3-pro)
- [Submit a transcript API](https://www.assemblyai.com/docs/api-reference/transcripts/submit)

## Model

| Model ID | Notes |
| --- | --- |
| `assemblyai/universal-3-pro` | Universal-3 Pro cloud transcription model. OSTT sends this as `speech_models = ["universal-3-pro"]`. |

## Model Options

```toml
[model_options."assemblyai/universal-3-pro"]
language_detection = true
format_text = true
speaker_labels = true
keyterms_prompt = ["OSTT", "Whisper", "Rust"]
```

```bash
ostt transcribe meeting.mp3 -m assemblyai/universal-3-pro --mo speaker_labels=true --mo keyterms_prompt=OSTT,Whisper
ostt model options assemblyai/universal-3-pro --format json
```

Do not set `prompt` and `keyterms_prompt` together. AssemblyAI documents them as alternatives: use `prompt` for transcription style and behavior, and `keyterms_prompt` when you know the specific terms that should be recognized. OSTT validates this before sending a request.

| Option | Type | Description |
| --- | --- | --- |
| `prompt` | string | Natural-language instruction for transcription style, vocabulary, speaker roles, or domain context. AssemblyAI supports up to 1,500 words for Universal-3 Pro. |
| `keyterms_prompt` | string list | Terms to bias recognition. AssemblyAI supports up to 1,000 words or phrases for Universal-3 Pro, with a maximum of 6 words per phrase. Saved `ostt keyword` terms are used as fallback only when `keyterms_prompt` and `prompt` are not set. |
| `language_code` | string | Known source language code. |
| `language_detection` | boolean | Detect language automatically. |
| `format_text` | boolean | Apply punctuation, casing, and numeric formatting. |
| `punctuate` | boolean | Add punctuation. |
| `disfluencies` | boolean | Include filler words and false starts. |
| `filter_profanity` | boolean | Mask profanity. |
| `speaker_labels` | boolean | Enable speaker labels. |
| `speakers_expected` | integer | Expected speaker count. |
| `speech_threshold` | number | Threshold for speech detection. |
| `temperature` | number | Sampling temperature, `0.0` to `1.0`. |
| `word_boost` | string list | Vocabulary boost terms. |
| `boost_param` | string | Boost strength parameter. |
