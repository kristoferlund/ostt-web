---
title: "Choosing a Transcription Model"
description: Choose an OSTT transcription model. Start with built-in local Parakeet and Whisper models with full GPU support, then add a cloud provider or an external engine when you need one.
---

# Choosing a Transcription Model

Start local. OSTT's built-in engine runs NVIDIA Parakeet and OpenAI Whisper models on your own machine, with full GPU support through Metal on macOS and CUDA or Vulkan on Linux. Once a model is downloaded, transcription works offline, needs no account or API key, costs nothing per minute, and no audio leaves your machine.

Cloud providers and external engines are there when local is not the right fit: a language no local model handles well, provider features such as speaker labels, or a machine too slow for the model you want.

Comparing is cheap either way. Record once, then use `ostt retry -m PROVIDER/MODEL` to transcribe the same audio with another model.

## Start With a Local Model

Download a model, select it, and keep it loaded between recordings:

```bash
ostt model local download parakeet-ultra
ostt model select parakeet/parakeet-ultra
ostt daemon start
```

Or run `ostt model` and pick from the **Local models** section.

Start with **Parakeet** when your language is English or one of the 25 European languages it covers. It adds punctuation and capitalization and detects the language itself. Use **Whisper** for other languages, for regional fine-tunes such as KB-Whisper (Swedish) and NB-Whisper (Norwegian), or when you need Whisper params such as a fixed language. [Local Models](/guide/local-models) lists every model and command.

The installer picks the GPU build for your hardware, so in most cases local models run on the GPU without extra setup. [Daemon Mode](/guide/daemon) keeps the model loaded, so each recording starts transcribing straight away.

| Hardware | Suggested starting point | Notes |
| --- | --- | --- |
| NVIDIA GPU on Linux | `parakeet-ultra`, or Whisper turbo or large-v3 | The CUDA build when a CUDA toolkit is installed, otherwise the Vulkan build. |
| AMD or Intel GPU on Linux | `parakeet-ultra`, or Whisper turbo | The Vulkan build. |
| Mac | `parakeet-ultra`, or Whisper turbo or large-v3 | Metal is enabled on every macOS build. |
| Modern laptop CPU | `parakeet-ultra`, or Whisper small, medium, or turbo | Try a model and use `ostt retry` to compare. |
| Low-end CPU | `parakeet-tdt_ctc-110m` (English), or Whisper tiny, base, or small | Smaller models, lower accuracy. |

See [GPU Acceleration](/guide/gpu-acceleration) for how the build is chosen.

## Quick Recommendations

| Need | Good starting point | Why |
| --- | --- | --- |
| Everyday dictation | Local `parakeet/parakeet-ultra` with daemon mode | Fast and accurate on a GPU, with punctuation and language detection built in. |
| Languages Parakeet does not cover | Local `whisper/turbo` or `whisper/large-v3` | Whisper covers around 100 languages. |
| Swedish | Local `whisper/kb-whisper-large`, or Berget `berget/KBLab/kb-whisper-large` and `berget/klang/pianissimo` in the cloud | KB-Whisper is KBLab's Swedish fine-tune. Pianissimo transcribes after recording stops and does not support keyword boosting. |
| Norwegian | Local `whisper/nb-whisper-large`, or Berget `berget/NbAiLab/nb-whisper-large` in the cloud | NB-Whisper is documented for Norwegian, Bokmål, Nynorsk, and English. |
| Other local ASR engines | `command/<profile>` or `http/<profile>` external engines | Run faster-whisper, Cohere Transcribe, Speaches, LocalAI, or your own wrapper without making OSTT bundle every runtime. |
| Speaker labels and long meetings | Cloud providers with diarization and formatting params | Long files often benefit from provider-specific params such as diarization, formatting, language hints, and prompts. |
| No model download | OpenAI `openai/gpt-4o-transcribe` or Deepgram `deepgram/nova-3` | Hosted APIs need only an API key. See [Cloud Models](/guide/cloud-models). |
| Developer dictation | Any accurate model plus `ostt keyword`, `ostt replace`, and processing actions | Technical terms need vocabulary hints and deterministic cleanup as much as raw model accuracy. |

These are starting points, not benchmark rankings. Hardware, microphone quality, language, accent, noise, pricing, and provider policies change over time.

## Compare Models With Retry

OSTT saves recordings, so you can compare models on your own audio. With a local model active, recordings are 16 kHz mono WAV, which local and cloud models both accept:

```bash
# Record once with your local default
ostt -o parakeet.txt

# Retry the same audio with other models
ostt retry -m whisper/turbo -o whisper.txt
ostt retry -m deepgram/nova-3 -o deepgram.txt
```

A recording made with a cloud model active is MP3 by default and cannot be retried locally. See [Audio Format](/guide/local-models#audio-format).

Use this for real audio from your microphone, your accent, your room, and your vocabulary. That is more useful than a generic benchmark table.

## When to Use the Cloud

OSTT works with eight cloud providers: OpenAI, Deepgram, Groq, DeepInfra, AssemblyAI, Berget, ElevenLabs, and Mistral, each with your own API key. The cloud is the better fit when you need provider features such as speaker labels, a hosted model with no local equivalent, or transcription on a machine without the hardware for a large local model. Audio is sent to the provider you choose.

See [Cloud Models](/guide/cloud-models) for setup and what each provider is good for.

## External Local Engines

Built-in local support covers Parakeet and Whisper. For faster-whisper, Cohere Transcribe, Speaches, LocalAI, onnx-asr, or your own wrapper, run that engine yourself and connect it as a `command/<profile>` or `http/<profile>` engine. See [External Engines](/guide/external-engines) for setup.

## Developer Dictation Needs More Than a Model

For code, product names, acronyms, APIs, and unusual proper nouns, combine model choice with OSTT's transcript cleanup tools.

Add recognition hints before transcription:

```bash
ostt keyword add Kubernetes
ostt keyword add VitePress
```

Fix final casing and common misrecognitions after transcription:

```toml
[text.replace]
"ostt" = "OSTT"
"api" = "API"
"github" = "GitHub"
"open ai" = "OpenAI"
```

Then use processing actions for transformations that need AI or shell commands:

```bash
ostt launch --paste -p clean
ostt transcribe meeting.mp3 -p summary -o summary.md
```

## Tradeoffs

| Path | Privacy | Setup | Latency | Cost | Maintenance |
| --- | --- | --- | --- | --- | --- |
| Built-in local models | Best | One download | Fast on a GPU, hardware-dependent | Free | Low |
| Cloud STT | Audio leaves your machine | Easy once a key exists | Usually good | Usage-based | Low |
| External command engine | Local if the command is local | Advanced | Depends on engine startup | Free after hardware | User-managed |
| External HTTP engine | Local if endpoint is local | Advanced | Good when server stays hot | Free after hardware | User-managed |

## Related Pages

- [Local Models](/guide/local-models)
- [GPU Acceleration](/guide/gpu-acceleration)
- [Daemon Mode](/guide/daemon)
- [Cloud Models](/guide/cloud-models)
- [External Engines](/guide/external-engines)
- [Providers and Models](/reference/providers)
