---
title: "Klang Pianissimo for Swedish and Danish"
description: Run Klang AI's Swedish and Danish Pianissimo speech-to-text models locally with OSTT. Model links, Q8_0 GGUF downloads, language settings, benchmarks, and the Swedish Berget cloud option.
---

# Klang Pianissimo for Swedish and Danish

[Klang AI](https://klang.ai/) trains Pianissimo specifically for Swedish and Danish speech. Both are approximately 600-million-parameter fine-tunes of NVIDIA's Parakeet TDT 0.6B v3, with a FastConformer encoder and a Token-and-Duration Transducer (TDT) decoder. They add punctuation and capitalization and are released with open weights under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

OSTT runs Klang's GGUF versions on your own CPU or GPU through its built-in transcribe.cpp engine. No Python, NeMo, API key, or cloud upload is needed. After the download, transcription works offline on Linux and macOS.

## Models and Official Links

| Language | OSTT model ID | Klang's model page | Hugging Face model card | GGUF files used by OSTT |
| --- | --- | --- | --- | --- |
| Swedish | `parakeet/pianissimo-sv` | [Pianissimo for Swedish](https://klang.ai/pianissimo-sv/) | [KlangAI/pianissimo-sv](https://huggingface.co/KlangAI/pianissimo-sv) | [pianissimo-sv-gguf](https://huggingface.co/KlangAI/pianissimo-sv-gguf) |
| Danish | `parakeet/pianissimo-da` | [Pianissimo for Danish](https://klang.ai/pianissimo-da/) | [KlangAI/pianissimo-da](https://huggingface.co/KlangAI/pianissimo-da) | [pianissimo-da-gguf](https://huggingface.co/KlangAI/pianissimo-da-gguf) |

The curated list offers **Q8_0 GGUF**, Klang's recommended quantization, at **706 MiB (about 740 MB) per model**, with pinned revisions and SHA-256 checksums. These are language-specific Parakeet models, not Whisper variants or general multilingual models. Choose the model for the language you speak.

## What Makes Them Different

- **Swedish speech and dialects.** Klang reports fine-tuning on approximately 50,000 hours of Swedish speech, including RixVox, Common Voice, FLEURS, and its own collection of publicly available speech. Its [model-card evaluation](https://huggingface.co/KlangAI/pianissimo-sv#quality-and-speed) reports 4.46% word error rate (WER) on Common Voice v26, 6.51% on FLEURS, and 4.85% on Klang Dialects. This substantially improves on the base Parakeet v3 in that evaluation; KB-Whisper large still scores lower WER on those three sets.
- **Danish everyday speech.** Klang reports fine-tuning on approximately 70,000 hours of Danish speech, including CoRal, Common Voice, FLEURS, and FT Speech. Its [Danish evaluation](https://huggingface.co/KlangAI/pianissimo-da#danish-speech-recognition) reports 11.8% mean WER across parliamentary speeches, DR television, and spontaneous DanPASS speech—the lowest mean among the models Klang tested, not a universal ranking.
- **An architecture suited to long recordings.** Klang documents local attention with approximately 20.5 seconds of context on each side per layer, keeping attention computation linear in recording length. Both short dictation and longer recordings are supported by the model; available memory and runtime still matter.
- **Speed without a large Whisper download.** Klang reports high server-GPU throughput, but those figures are not OSTT laptop benchmarks. For example, the Swedish model card measures 2,500× realtime on an A100 using optimized batches; the Danish model card reports over 3,600× on an H100. Local Q8_0 latency depends on your hardware, build, and recording length. [Daemon mode](/guide/daemon) avoids reloading the model between recordings.

These figures describe Klang's published evaluations of the original models, not an independent OSTT benchmark of the curated GGUF files. Use [retry comparisons](/guide/choosing-a-model#compare-models-with-retry) on your own microphone, accent, and vocabulary.

## Set Up Local Transcription

::: warning CLI compatibility
Local Parakeet `language` settings require **OSTT 0.0.35 or newer**. Check `ostt model params parakeet/pianissimo-sv`: it must list `language`. Older builds reject `--param language=...` and ignore the saved setting, so a registry refresh alone is not enough.
:::

Klang's GGUF instructions require an explicit language: **`sv` for Swedish and `da` for Danish**. Save model-specific defaults with `ostt config`:

```toml
[parakeet.pianissimo-sv.params]
language = "sv"

[parakeet.pianissimo-da.params]
language = "da"
```

Download and select the model you need:

::: code-group

```bash [Swedish]
ostt model local download parakeet/pianissimo-sv
ostt model select parakeet/pianissimo-sv
ostt -c
```

```bash [Danish]
ostt model local download parakeet/pianissimo-da
ostt model select parakeet/pianissimo-da
ostt -c
```

:::

You can also choose them in the **Local models** section of `ostt model`. Use `ostt daemon start` to keep the selected model loaded. Normal recording, hotkey, clipboard, paste, and processing commands then use that model and its saved language setting.

For a single run, pass the language explicitly instead of saving it:

```bash
ostt -m parakeet/pianissimo-sv --param language=sv -c
ostt -m parakeet/pianissimo-da --param language=da --paste
```

### Transcribe an Existing File

Local models require signed 16-bit PCM WAV at 16 kHz, mono. OSTT records in that format automatically with a local model selected. Convert other files first:

```bash
ffmpeg -i interview.mp3 -ac 1 -ar 16000 -c:a pcm_s16le interview.wav
ostt transcribe interview.wav -m parakeet/pianissimo-sv --param language=sv -o interview.txt
```

For Danish, use `-m parakeet/pianissimo-da --param language=da`. See [Local Models: Audio Format](/guide/local-models#audio-format).

## Precision and Download Size

Klang also publishes Q4_K_M, Q5_K_M, F16, and F32 GGUF files. F16 is about 1.26 GB and F32 about 2.51 GB; these retain more precision but are the same architecture, not larger models. OSTT's curated list offers Q8_0 rather than every precision variant.

Klang's GGUF checks found no accuracy advantage from F16 or F32 over Q8_0 on their small samples: 100 Swedish Common Voice clips and 200 Danish FLEURS clips. That is not proof of equivalence on all recordings. The [Swedish GGUF card](https://huggingface.co/KlangAI/pianissimo-sv-gguf) and [Danish GGUF card](https://huggingface.co/KlangAI/pianissimo-da-gguf) contain the results and all downloads.

## OSTT Features and Limits

- **Plain-text output.** The upstream models support word-level timestamps, but OSTT's local route returns transcript text, not timestamped segments or speaker labels.
- **No vocabulary boosting through OSTT's GGUF route.** Klang documents custom vocabulary in NeMo, ONNX, and MLX implementations. That does not mean OSTT's local Parakeet engine exposes it: saved `ostt keyword` terms and context prompts are not used by these models here. [Text replacements](/guide/configuration#text-replace) and [processing actions](/guide/processing) still apply after transcription.
- **No Whisper decode controls.** The local Parakeet parameter is `language`; Whisper-only controls such as `temperature` and `no_context` are not supported.
- **Not live transcription.** OSTT transcribes after recording stops. It does not display partial text while you speak.
- **Language specialization.** Do not assume reliable code-switching or other-language recognition. Overlapping voices, noise, uncommon names, and specialist terms can still cause errors.

## Swedish Through Berget Instead

For Swedish without a model download, OSTT also supports `berget/klang/pianissimo` through [Berget AI](https://berget.ai/), with your API key. This is a separate cloud route: audio leaves your machine and is sent to Berget after recording stops. It is not the local GGUF model ID, and selecting `language=da` does not turn that hosted Swedish model into Danish Pianissimo.

See the [Berget reference](/reference/providers/berget#pianissimo-params) for authentication, supported parameters, and transport, or the [Swedish Pianissimo overview](/lp/klang-pianissimo-svenska).
