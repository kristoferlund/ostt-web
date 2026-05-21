# Local Models

OSTT can transcribe with local Whisper-compatible models. Local models run on your machine, do not require an API key, and can work offline after the model file has been downloaded.

Use local models when you want privacy, predictable cost, or offline transcription. Use cloud providers when you prefer hosted accuracy, lower local CPU load, or no large model downloads.

Local transcription supports GPU acceleration on all major platforms. See [GPU Acceleration](./gpu-acceleration) for setup details. To avoid model load time on repeated use, see [Daemon Mode](./daemon).

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

## Audio Format

Local transcription requires WAV audio in signed 16-bit PCM, 16 kHz, mono. OSTT records mono automatically, but the local provider needs this audio config:

```toml
[audio]
sample_rate = 16000
output_format = "pcm_s16le -ar 16000"
```

If your current config is not compatible, the local model flow prompts to update it when you activate a local model.

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

Model downloads can be hundreds of megabytes or several gigabytes. Delete unused models from `ostt model` to reclaim space.

## Curated Model List

OSTT's built-in local model list is maintained outside the CLI in the [kristoferlund/ostt-models](https://github.com/kristoferlund/ostt-models) repository. This keeps the curated list updateable without changing the application code.

To suggest a model for everyone, open a pull request in that repository. Include the model URL, display name, size, language coverage, and any useful hardware or accuracy notes.

## Current Limitations

Local transcription currently expects already-compatible WAV/PCM input. For `ostt transcribe <FILE>`, use a compatible `.wav` file when the active model is local.
