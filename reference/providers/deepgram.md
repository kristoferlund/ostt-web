---
description: Configure Deepgram Nova models in OSTT, including Nova-3, Nova-2, Deepgram model_options, diarization, language detection, formatting, topics, and keyword prompting.
---

# Deepgram

Deepgram Nova models are fast cloud speech-to-text models with rich pre-recorded audio options: language detection, diarization, formatting, redaction, search, topic detection, sentiment, and keyword/keyterm prompting.

API documentation: [Deepgram pre-recorded listen API](https://developers.deepgram.com/reference/speech-to-text/listen-pre-recorded)

## Models

| Model ID | Notes |
| --- | --- |
| `deepgram/nova-3` | Latest Nova model. Supports `keyterm` prompting. |
| `deepgram/nova-2` | Previous Nova generation. Uses `keywords` prompting. |

## Select A Model

```bash
ostt model select deepgram/nova-3
```

Per command:

```bash
ostt transcribe meeting.mp3 -m deepgram/nova-3
```

## Model Options

Persistent config:

```toml
[model_options."deepgram/nova-3"]
detect_language = ["en", "sv"]
diarize = true
smart_format = true
keyterm = ["OSTT", "Whisper", "Deepgram"]
```

Per invocation:

```bash
ostt transcribe meeting.mp3 -m deepgram/nova-3 --mo diarize=true --mo smart_format=true --mo detect_language=en,sv
ostt model options deepgram/nova-3 --format json
```

TOML lists must use TOML list syntax (`["en", "sv"]`). CLI `--mo` list values use commas (`--mo detect_language=en,sv`).

## Options

| Option | Type | Description |
| --- | --- | --- |
| `detect_language` | boolean or string list | `true` detects the dominant language. A list restricts detection to given BCP-47 language codes, e.g. `["en", "sv"]`. |
| `language` | string | Primary language hint. Use when the language is known instead of detection. |
| `diarize` | boolean | Assign speaker numbers to words. |
| `diarize_model` | string | Select a batch diarization model: `latest`, `v1`, or `v2`. Do not combine with `diarize=true` unless Deepgram documents support for that combination. |
| `dictation` | boolean | Enable spoken formatting commands. |
| `filler_words` | boolean | Include filler words such as “uh” and “um”. |
| `measurements` | boolean | Convert spoken measurements to abbreviations. |
| `multichannel` | boolean | Transcribe each audio channel independently. |
| `numerals` | boolean | Convert spoken numbers to numeric form. |
| `paragraphs` | boolean | Add paragraph structure to the transcript. |
| `profanity_filter` | boolean | Mask or remove profanity. |
| `punctuate` | boolean | Add punctuation and capitalization. |
| `smart_format` | boolean | Format dates, times, currency, phone numbers, emails, URLs, and related text. |
| `utterances` | boolean | Segment speech into meaningful utterances. |
| `utt_split` | number | Pause duration in seconds before a new utterance. |
| `mip_opt_out` | boolean | Opt out of the Deepgram Model Improvement Program. |
| `keyterm` | string list | Nova-3 keyterm prompting. Saved `ostt keyword` terms are used as fallback only when `keyterm` is not set. |
| `keywords` | string list | Keyword boosting. Nova-2 uses this for saved `ostt keyword` fallback when `keywords` is not set. |
| `search` | string list | Search for terms in submitted audio. |
| `replace` | string list | Search and replace terms or phrases. |
| `redact` | string list | Redact sensitive information, such as `pci`, `pii`, or `numbers`. |
| `tag` | string list | Attach labels for reporting. |
| `extra` | string list | Attach arbitrary key-value metadata to the response. |
| `detect_entities` | boolean | Extract named entities. |
| `sentiment` | boolean | Detect sentiment. |
| `summarize` | boolean or string | Enable summarization. Deepgram also supports version strings such as `v2`. |
| `topics` | boolean | Detect topics. |
| `custom_topic` | string list | Topics to detect. |
| `custom_topic_mode` | string | Topic mode: `extended` or `strict`. |
| `intents` | boolean | Detect speaker intent. |
| `custom_intent` | string list | Intents to detect. |
| `custom_intent_mode` | string | Intent mode: `extended` or `strict`. |
| `encoding` | string | Expected submitted audio encoding, e.g. `linear16`, `flac`, `opus`. Usually unnecessary because OSTT submits encoded audio. |
| `version` | string | Model version, such as `latest`. |
