---
description: Run offline transcription with local Parakeet and Whisper models. No API key required. Download curated models or add custom Hugging Face model files.
---

# Local Models

OSTT can transcribe with local Parakeet and Whisper models. Local models run on your machine, do not require an API key, and can work offline after the model file has been downloaded.

Both model families run on the same built-in engine, [transcribe.cpp](https://github.com/handy-computer/transcribe.cpp), with the same GPU support, daemon mode and model picker. Choose per model:

- **Parakeet** (`parakeet/...`) is fast and accurate, adds punctuation and capitalization, and detects the language by itself. Good default for English and the 25 European languages it covers.
- **Whisper** (`whisper/...`) covers around 100 languages and has regional fine-tunes such as KB-Whisper for Swedish and NB-Whisper for Norwegian.

For when to pick local, cloud, or an external engine, see [Choosing a Transcription Model](/guide/choosing-a-model).

Local transcription can run on the GPU on macOS (Metal) and Linux x86_64 (CUDA, Vulkan). See [GPU Acceleration](./gpu-acceleration) for setup details. To avoid model load time on repeated use, see [Daemon Mode](./daemon).

If you already run another local ASR engine or OpenAI-compatible transcription server, see [External Engines](./external-engines) for command and HTTP profiles.

## Choose Local

Open the model picker:

```bash
ostt model
```

In the **Local models** section of the list you can:

- download curated registry models
- activate a downloaded model
- delete downloaded model files
- inspect model metadata
- add a custom Hugging Face or direct model URL

Once a model is active, normal commands use it:

```bash
ostt
ostt -c
ostt transcribe recording.wav
ostt retry 2
```

You can also manage curated local models from scripts:

```bash
ostt model list --provider parakeet
ostt model local download parakeet-ultra
ostt model select parakeet/parakeet-ultra
ostt model list --provider whisper
ostt model local download whisper/turbo
ostt model select whisper/turbo
ostt model local remove turbo
```

`ostt model local download` shows download progress in the terminal and verifies the file's checksum when the registry lists one. Local download and remove commands accept either the short model ID (`turbo`) or full provider/model ID (`whisper/turbo`). Select commands need the full ID.

## Parakeet Models

The curated list includes these Parakeet models. All are Q8_0 GGUF files pinned to a fixed revision and verified by checksum.

| Model ID | Download | Languages | Notes |
| --- | ---: | --- | --- |
| `parakeet/parakeet-ultra` | 707 MiB | 25 European languages, auto-detected | Most accurate multilingual Parakeet. Moondream's post-trained version of TDT 0.6B v3. |
| `parakeet/parakeet-tdt-0.6b-v3` | 706 MiB | 25 European languages, auto-detected | NVIDIA's original multilingual release. |
| `parakeet/parakeet-tdt-0.6b-v2` | 696 MiB | English | NVIDIA's English model. |
| `parakeet/parakeet-tdt_ctc-110m` | 130 MiB | English | Small and very fast, for low-power machines, at somewhat lower accuracy. |

The 25 languages are Bulgarian, Croatian, Czech, Danish, Dutch, English, Estonian, Finnish, French, German, Greek, Hungarian, Italian, Latvian, Lithuanian, Maltese, Polish, Portuguese, Romanian, Russian, Slovak, Slovenian, Spanish, Swedish and Ukrainian. English-only models produce nonsense for other languages.

Parakeet models take no params. They detect the language themselves, and OSTT rejects `--param` values for them. Keyword boosting is not supported; [text replacements](/guide/configuration#text-replace) still apply.

## Whisper Models

The curated list includes these Whisper families. Run `ostt model list --provider whisper` for the full list with sizes.

| Model IDs | Languages | Notes |
| --- | --- | --- |
| `whisper/tiny`, `base`, `small`, `medium`, `large-v3`, `turbo` | Multilingual | OpenAI's Whisper models, 75 MB to 2.9 GB. `turbo` is a faster version of `large-v3`. |
| `whisper/tiny.en`, `base.en`, `small.en`, `medium.en`, `distil-large-v3.5` | English | English-only variants. |
| `whisper/small-q5_1`, `medium-q5_0`, `large-v3-q5_0`, `turbo-q5_0`, `turbo-q8_0` | Multilingual | Quantized, smaller downloads. |
| `whisper/kb-whisper-tiny` to `kb-whisper-large`, `kb-whisper-large-q5_0` | Swedish | KBLab's Swedish fine-tunes. |
| `whisper/nb-whisper-tiny` to `nb-whisper-large`, `nb-whisper-large-q5_0` | Norwegian | NbAiLab's Norwegian fine-tunes. |

## Whisper Params

Whisper models share these inference params. Set global defaults under `[whisper.params]`, or override them for a specific model under `[whisper.<model-id>.params]`:

```toml
[whisper.params]
language = "auto"
no_context = true
temperature = 0.0
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
| `no_context` | boolean | `true` | Prevent Whisper from conditioning each segment on previously decoded text. This can reduce repetition and hallucinated carry-over between segments. |
| `temperature` | number | `0.0` | Sampling temperature. `0.0` uses deterministic greedy decoding; higher values make decoding less deterministic. Valid range: `0.0` to `1.0`. |
| `no_speech_thold` | number | `0.6` | No-speech probability threshold. Higher values make Whisper less likely to treat audio as silence. Valid range: `0.0` to `1.0`. |
| `prompt` | string | none | Context that steers transcription, such as the topic or a sentence with the right spellings: `--param prompt="A Rust code review."` |

Saved [keywords](./commands#keyword) are passed to local Whisper models as a glossary, so names and terms come out spelled right. Keywords and `prompt` can be combined. They share Whisper's prompt window of about 220 tokens; if they don't fit, OSTT's engine shortens the prompt first, then drops keywords from the end of the list, and notes it in the log.

`no_timestamps` and `entropy_thold` have no effect. If they are set, OSTT ignores them and logs a warning.

## Audio Format

Local models need WAV audio in signed 16-bit PCM, 16 kHz, mono. When the active model is local, OSTT records in that format automatically, so `[audio].output_format` can stay on the cloud-friendly MP3 default. To override the local format, set `output_format` under `[whisper]` or `[parakeet]`.

Other audio is not converted. Recordings made while a cloud model was active are MP3, so `ostt retry -m whisper/turbo` on one of them fails, and `ostt transcribe` needs a compatible WAV file. Convert a file with ffmpeg first:

```bash
ffmpeg -i meeting.mp3 -ac 1 -ar 16000 -c:a pcm_s16le meeting.wav
ostt transcribe meeting.wav
```

## Custom Models

Press `c` in the local model screen to add a custom model. OSTT accepts:

- Hugging Face model pages, for example `https://huggingface.co/KBLab/kb-whisper-large`
- direct model file URLs

Supported files are Whisper models (`.gguf` or `ggml-*.bin`) and Parakeet models (`.gguf`). After the URL resolves, OSTT asks for the model ID and display name, downloads the file, and loads it once to check that it works and whether it is a Whisper or Parakeet model. The model is then listed under **Custom models**. Other model types are refused.

Use safe model IDs containing lowercase letters, numbers, `.`, `_`, or `-`.

## Storage

Local model files, custom model metadata and a cached copy of the curated list are stored under:

```text
~/.local/share/ostt/models/
```

Model downloads can be hundreds of megabytes or several gigabytes. Delete unused models from `ostt model` or `ostt model local remove <MODEL_ID>` to reclaim space.

## Curated Model List

OSTT's built-in local model list is maintained outside the CLI in the [kristoferlund/ostt-models](https://github.com/kristoferlund/ostt-models) repository. This keeps the curated list updateable without changing the application code. OSTT keeps the last downloaded copy, so downloaded models stay usable offline.

To suggest a model for everyone, open a pull request in that repository. Include the model URL, display name, size, language coverage, and any useful hardware or accuracy notes.

## Limitations

Local models accept only 16 kHz mono WAV input; see [Audio Format](#audio-format).
