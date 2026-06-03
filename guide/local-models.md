---
description: Run offline transcription with local Whisper-compatible models. No API key required. Download curated models or add custom Hugging Face model files.
---

# Local Models

OSTT can transcribe with local Whisper-compatible models. Local models run on your machine, do not require an API key, and can work offline after the model file has been downloaded.

Use local models when you want privacy, predictable cost, or offline transcription. Use cloud providers when you prefer hosted accuracy, lower local CPU load, or no large model downloads.

Local transcription supports GPU acceleration on all major platforms. See [GPU Acceleration](./gpu-acceleration) for setup details. To avoid model load time on repeated use, see [Daemon Mode](./daemon).

If you already run another local ASR engine or OpenAI-compatible transcription server, see [External Engines](./external-engines) for command and HTTP profiles.

## Choose Local

Open the model picker:

```bash
ostt model
```

Choose **Local provider**. The local model screen can:

- download curated registry models
- activate a downloaded model
- delete downloaded model files
- inspect model metadata
- add a custom Hugging Face or direct model URL

The curated model list comes from the [OSTT models repository](https://github.com/kristoferlund/ostt-models). If you want a model to appear by default for all OSTT users, open a pull request there with the model metadata.

The active model is saved in OSTT's selected-model state. After activation, normal commands use the local model:

```bash
ostt
ostt -c
ostt transcribe recording.wav
ostt retry 2
```

You can also manage curated local models from scripts:

```bash
ostt model list --provider whisper
ostt model local download turbo
ostt model local download whisper/turbo
ostt model select whisper/turbo
ostt model local remove turbo
```

`ostt model local download` shows download progress in the terminal. Local download and remove commands accept either the short model ID (`turbo`) or full provider/model ID (`whisper/turbo`).

## Whisper Params

All local models use the same Whisper inference params. Set global local defaults under `[whisper.params]`, or override them for a specific model under `[whisper.<model-id>.params]`:

```toml
[whisper]
output_format = "pcm_s16le -ar 16000"

[whisper.params]
language = "auto"
no_timestamps = true
no_context = true
temperature = 0.0
entropy_thold = 2.4
no_speech_thold = 0.6

[whisper.turbo.params]
language = "en"
temperature = 0.2

[whisper.tiny.params]
language = "sv"
temperature = 0.0
```

Per-run overrides use the same `--param key=value` flag as cloud models:

```bash
ostt transcribe recording.wav -m whisper/turbo --param language=sv --param temperature=0.0
ostt model params whisper/turbo
```

The same param meanings apply whether the param is set globally in `[whisper.params]`, per model in `[whisper.<model-id>.params]`, or for one run with `--param`.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| `language` | string | `"auto"` | Language hint for Whisper. Use `"auto"` for language detection or an ISO language code such as `"en"`, `"sv"`, or `"no"` when the language is known. |
| `no_timestamps` | boolean | `true` | Suppress timestamp output from Whisper. OSTT returns plain transcript text, so this is normally left enabled. |
| `no_context` | boolean | `true` | Prevent Whisper from conditioning each segment on previously decoded text. This can reduce repetition and hallucinated carry-over between segments. |
| `temperature` | number | `0.0` | Sampling temperature. `0.0` uses deterministic greedy decoding; higher values make decoding less deterministic. Valid range: `0.0` to `1.0`. |
| `entropy_thold` | number | `2.4` | Entropy threshold used by Whisper fallback behavior. Higher entropy indicates uncertain decoding. Must be `>= 0.0`. |
| `no_speech_thold` | number | `0.6` | No-speech probability threshold. Higher values make Whisper less likely to treat audio as silence. Valid range: `0.0` to `1.0`. |

## Audio Format

Local transcription requires WAV audio in signed 16-bit PCM, 16 kHz, mono. OSTT records mono automatically, and ffmpeg handles resampling through this audio config:

```toml
[audio]
output_format = "pcm_s16le -ar 16000"
```

For recordings, OSTT uses the `[whisper].output_format` default when the active model provider is `whisper`, so cloud-friendly global `[audio].output_format` can remain unchanged.

The default cloud-friendly MP3 setting still works for cloud providers. Switch to the WAV/PCM setting when using local models.

## Custom Models

Press `c` in the local model screen to add a custom model. OSTT accepts:

- Hugging Face model pages, for example `https://huggingface.co/Supertone/supertonic-3`
- direct model file URLs

Supported file names are `.gguf` and `ggml-*.bin`. After the URL resolves, OSTT asks for the model ID and display name, downloads the file, and stores the custom entry with the other local models.

Use safe model IDs containing lowercase letters, numbers, `.`, `_`, or `-`.

## Storage

Local model files and custom model metadata are stored under:

```text
~/.local/share/ostt/models/
```

Model downloads can be hundreds of megabytes or several gigabytes. Delete unused models from `ostt model` or `ostt model local remove <MODEL_ID>` to reclaim space.

## Curated Model List

OSTT's built-in local model list is maintained outside the CLI in the [kristoferlund/ostt-models](https://github.com/kristoferlund/ostt-models) repository. This keeps the curated list updateable without changing the application code.

To suggest a model for everyone, open a pull request in that repository. Include the model URL, display name, size, language coverage, and any useful hardware or accuracy notes.

## Current Limitations

Local transcription currently expects already-compatible WAV/PCM input. For `ostt transcribe <FILE>`, use a compatible `.wav` file when the active model is local.
