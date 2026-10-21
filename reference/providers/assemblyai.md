---
description: Configure AssemblyAI Universal 3.5 Pro and Universal 2 in OSTT, including promptable transcription, keyterms_prompt, diarization, language detection, and params.
---

# AssemblyAI

AssemblyAI Universal 3.5 Pro is a promptable speech-to-text model with language detection, formatting, speaker labels, and vocabulary guidance. Universal 2 covers 99 languages with keyterm prompting.

AssemblyAI documentation:

- [Models](https://www.assemblyai.com/docs/getting-started/models)
- [Select the speech model](https://www.assemblyai.com/docs/pre-recorded-audio/select-the-speech-model)
- [Submit a transcript API](https://www.assemblyai.com/docs/api-reference/transcripts/submit)

## Models

| Model ID | Notes |
| --- | --- |
| `assemblyai/universal-3-5-pro` | Recommended. Native code-switching and contextual prompting in 18 languages. OSTT sends `speech_models = ["universal-3-5-pro", "universal-2"]`, so other languages fall back to Universal 2. |
| `assemblyai/universal-2` | 99 languages with keyterm prompting. Does not support `prompt` or `temperature`. |

## Params

```toml
[assemblyai.universal-3-5-pro.params]
language_detection = true
format_text = true
speaker_labels = true
keyterms_prompt = ["OSTT", "Whisper", "Rust"]
```

```bash
ostt transcribe meeting.mp3 -m assemblyai/universal-3-5-pro --param speaker_labels=true --param keyterms_prompt=OSTT,Whisper
ostt model params assemblyai/universal-3-5-pro --format json
```

Do not set `prompt` and `keyterms_prompt` together. AssemblyAI documents them as alternatives: use `prompt` for transcription style and behavior, and `keyterms_prompt` when you know the specific terms that should be recognized. OSTT validates this before sending a request.

| Param | Type | Description |
| --- | --- | --- |
| `prompt` | string | Natural-language instruction for transcription style, vocabulary, speaker roles, or domain context. Universal 3.5 Pro only. |
| `keyterms_prompt` | string list | Terms to bias recognition. Saved `ostt keyword` terms are used as fallback only when `keyterms_prompt` and `prompt` are not set. |
| `language_code` | string | Known source language code. Setting it turns off language detection unless `language_detection` is set. |
| `language_detection` | boolean | Detect language automatically. Defaults to `true` when `language_code` is not set. |
| `format_text` | boolean | Apply punctuation, casing, and numeric formatting. OSTT sends `true` by default. |
| `punctuate` | boolean | Add punctuation. OSTT sends `true` by default. |
| `disfluencies` | boolean | Include filler words and false starts. OSTT sends `false` by default. |
| `filter_profanity` | boolean | Mask profanity. OSTT sends `false` by default. |
| `speaker_labels` | boolean | Enable speaker labels. |
| `speakers_expected` | integer | Expected speaker count. |
| `speech_threshold` | number | Threshold for speech detection. |
| `temperature` | number | Universal 3.5 Pro only. Sampling temperature, `0.0` to `1.0`. |
| `word_boost` | string list | Vocabulary boost terms. |
| `boost_param` | string | Boost strength parameter. |
