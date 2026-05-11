# Providers and Models

OSTT is bring-your-own-API-key. Run `ostt auth` to select a provider/model and save credentials.

## OpenAI

| Model ID | Notes |
| --- | --- |
| `gpt-4o-transcribe` | Latest OpenAI transcription model |
| `gpt-4o-mini-transcribe` | Faster, lighter OpenAI model |
| `whisper-1` | Legacy Whisper model |

No additional [providers.openai] configuration options are currently available.

## Deepgram

| Model ID | Notes |
| --- | --- |
| `nova-3` | Latest generation, fast processing |
| `nova-2` | Previous generation |

Deepgram has extensive configuration options under `[providers.deepgram]`:

| Option | Default | Description |
| --- | --- | --- |
| `filler_words` | `false` | Include filler words (uh, um, mhmm) in transcript. Nova models only. |
| `measurements` | `false` | Convert spoken measurements to abbreviations (mg, km, etc.). English only. |
| `numerals` | `false` | Convert spoken numbers to numerical format (900). Multiple languages. |
| `paragraphs` | `false` | Split transcript into paragraphs. Enables punctuation automatically. |
| `profanity_filter` | `false` | Mask offensive language with asterisks. |
| `punctuate` | `true` | Add punctuation and capitalization. All languages. |
| `smart_format` | `false` | Comprehensive formatting: dates, times, currency, phone numbers, emails, URLs. |
| `utterances` | `false` | Segment speech into semantic units. Pre-recorded, Nova models. |
| `utt_split` | `0.8` | Silence (seconds) to trigger a new utterance (0.5--3.0). |
| `mip_opt_out` | `false` | Opt out from Deepgram Model Improvement Program. |
| `detect_language` | `true` | Automatically detect spoken language. |
| `detect_language_codes` | `[]` | Restrict detection to specific languages, e.g. `["en", "es"]`. |

## DeepInfra

| Model ID | Notes |
| --- | --- |
| `deepinfra-whisper-large-v3` | High-accuracy hosted Whisper model |
| `deepinfra-whisper-base` | Lightweight hosted Whisper model |

## Groq

| Model ID | Notes |
| --- | --- |
| `groq-whisper-large-v3` | High-accuracy Whisper model |
| `groq-whisper-large-v3-turbo` | Fast transcription model |

## AssemblyAI

| Model ID | Notes |
| --- | --- |
| `assemblyai-universal-3-pro` | Latest AssemblyAI Universal model |

Configuration under `[providers.assemblyai]`:

| Option | Default | Description |
| --- | --- | --- |
| `format_text` | `true` | Format text with punctuation, casing, numeral conversion. |
| `punctuate` | `true` | Automatic punctuation. |
| `disfluencies` | `false` | Include filler words (uh, um) and false starts. |
| `filter_profanity` | `false` | Replace profane words with asterisks. |
| `language_detection` | `true` | Automatic language detection (99+ languages). |

Optional language detection fine-tuning:

```toml
[providers.assemblyai.language_detection_options]
expected_languages = ["en", "es", "fr"]
fallback_language = "auto"
```

## Berget

Berget is a Swedish cloud provider. These models are hosted in Sweden.

| Model ID | Notes |
| --- | --- |
| `berget-whisper-kb-large` | KB Whisper Large, optimized for Swedish. Trained on 50,000+ hours of Swedish speech. 47% lower WER than whisper-large-v3 on Swedish. |
| `berget-whisper-nb-large` | NB Whisper Large, optimized for Norwegian. Trained on 66,000 hours of Norwegian speech. |
| `berget-whisper-large-v3` | General-purpose Whisper Large V3 hosted on Berget infrastructure. |

## ElevenLabs

| Model ID | Notes |
| --- | --- |
| `elevenlabs-scribe-v2` | Highest accuracy, supports 99 languages |
| `elevenlabs-scribe-v1` | Previous generation Scribe model |

Optional configuration under `[providers.elevenlabs]`:

| Option | Description |
| --- | --- |
| `language_code` | ISO-639-1 or ISO-639-3 code (e.g. `"eng"`, `"swe"`). Leave unset to auto-detect. |
