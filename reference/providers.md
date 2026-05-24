---
description: All supported transcription providers and models — OpenAI, Deepgram, Groq, DeepInfra, AssemblyAI, Berget, ElevenLabs, Mistral, and local Whisper models.
---

# Providers and Models

OSTT can use cloud providers or local Whisper-compatible models. Run `ostt model` to choose the active model. Run `ostt auth login` first when you want to use a cloud provider.

## Local

Local models run on your machine and do not require an API key. Open the local model manager with:

```bash
ostt model
```

Choose **Local provider** to download curated models, activate downloaded models, delete model files, inspect metadata, or add a custom Hugging Face/direct model URL.

The curated model list is maintained in the [kristoferlund/ostt-models](https://github.com/kristoferlund/ostt-models) repository. Open a pull request there to suggest a model for inclusion in the default list shown to all users.

Local transcription is CPU-only for now. GPU backends such as Vulkan, Metal, and CUDA are planned but not currently supported.

Local transcription requires WAV signed 16-bit PCM, 16 kHz, mono audio:

```toml
[audio]
sample_rate = 16000
output_format = "pcm_s16le -ar 16000"
```

See [Local Models](../guide/local-models.md) for setup details.

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

## Mistral

| Model ID | Notes |
| --- | --- |
| `mistral-voxtral-mini` | Voxtral Mini Transcribe, fast and efficient with support for 13 languages |
| `mistral-voxtral-mini-v2` | Voxtral Mini 2602, pinned version |

Keywords are sent as Mistral `context_bias` terms to improve recognition of names, technical terms, and domain-specific vocabulary.

Optional configuration under `[providers.mistral]`:

| Option | Description |
| --- | --- |
| `language` | Optional two-letter language code (e.g. `"en"`, `"sv"`, `"fr"`). Leave unset to auto-detect. |
