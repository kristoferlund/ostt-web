---
title: "Choosing a Transcription Model or Provider"
description: Choose the right OSTT transcription model or provider for cloud quality, local privacy, Swedish and EU workflows, fast dictation, long recordings, custom local engines, and retry comparisons.
---

# Choosing a Transcription Model or Provider

OSTT is provider-neutral. You can use hosted cloud transcription, built-in local Parakeet and Whisper models, or your own external command or HTTP engine. The right choice depends on privacy, language, latency, cost, hardware, and how much setup you want to own.

If you are unsure, start with one good default and let OSTT make comparison practical: record once, then use `ostt retry -m PROVIDER/MODEL` to transcribe the same audio with another model.

## Quick Recommendations

| Need | Good starting point | Why |
| --- | --- | --- |
| Fastest setup | OpenAI `openai/gpt-4o-transcribe` or Deepgram `deepgram/nova-3` | Hosted APIs avoid local model downloads and local runtime setup. |
| Strong general cloud quality | OpenAI `openai/gpt-transcribe`, Deepgram `deepgram/nova-3`, or AssemblyAI `assemblyai/universal-3-5-pro` | These are current general-purpose cloud transcription models with useful params for language, formatting, prompts, or keyterms. |
| Swedish or EU-focused work | Berget `berget/KBLab/kb-whisper-large`; `berget/klang/pianissimo` | Swedish-focused cloud options. Pianissimo transcribes after recording stops and does not support keyword boosting. |
| Norwegian work | Berget `berget/NbAiLab/nb-whisper-large` | NB-Whisper is documented for Norwegian, Bokmal, Nynorsk, and English. |
| Offline or privacy-sensitive work | Built-in local Parakeet, such as `parakeet/parakeet-ultra`, or Whisper such as `whisper/turbo` | Audio stays on your machine after the model file is downloaded. |
| Fast local dictation | Built-in local Parakeet with daemon mode | Parakeet is fast even on CPU, and daemon mode avoids reloading the model every call. |
| Other local ASR engines | `command/<profile>` or `http/<profile>` external engines | Run faster-whisper, Cohere Transcribe, Speaches, LocalAI, or your own wrapper without making OSTT bundle every runtime. |
| Long recordings or meetings | Cloud providers with diarization/formatting params, or local batch engines if privacy matters | Long files often benefit from provider-specific params such as diarization, formatting, language hints, and prompts. |
| Developer dictation | Any accurate model plus `ostt keyword`, `ostt replace`, and processing actions | Technical terms need vocabulary hints and deterministic cleanup as much as raw model accuracy. |

These are starting points, not benchmark rankings. Hardware, microphone quality, language, accent, noise, pricing, and provider policies change over time.

## Compare Models With Retry

Most dictation tools hide model choice behind a global setting. OSTT saves recordings locally, so model choice becomes testable instead of theoretical.

```bash
# Record once with your current default
ostt -o first.txt

# Retry the same audio with different providers
ostt retry -m deepgram/nova-3 -o deepgram.txt
ostt retry -m openai/gpt-4o-transcribe -o openai.txt
ostt retry -m berget/KBLab/kb-whisper-large -o berget.txt
ostt retry -m parakeet/parakeet-ultra -o local.txt
```

Use this for real audio from your microphone, your accent, your room, and your vocabulary. That is more useful than a generic benchmark table.

## Cloud Providers

Cloud providers are usually easiest when you want strong transcription without downloading local models. They also move local CPU/GPU load off your machine.

| Provider | Good for | Watch out for |
| --- | --- | --- |
| [OpenAI](/reference/providers/openai) | GPT Transcribe, GPT-4o transcription, GPT-4o Mini, hosted Whisper, prompt hints, diarization model | Audio leaves your machine. OSTT returns plain text even when JSON metadata is requested. |
| [Deepgram](/reference/providers/deepgram) | Nova models, low-latency cloud transcription, formatting, diarization, language detection, keyterms | Advanced params are provider-specific. Pick `nova-3` or `nova-2` intentionally. |
| [Groq](/reference/providers/groq) | Very fast hosted Whisper variants and OpenAI-compatible request shape | Groq model choices differ in accuracy, cost, and translation support. |
| [DeepInfra](/reference/providers/deepinfra) | Hosted open speech-recognition models, including Whisper, Qwen3 ASR, Nemotron, and Voxtral options | Model availability and pricing can change. Check the provider docs. |
| [AssemblyAI](/reference/providers/assemblyai) | Universal 3.5 Pro, Universal 2, promptable transcription, speaker labels, language detection, keyterms | Async-provider behavior and params differ from OpenAI-style endpoints. |
| [Berget](/reference/providers/berget) | Swedish Pianissimo, Swedish and Norwegian optimized Whisper models, European hosting | Choose model-specific params: Pianissimo does not support Whisper prompts or hotwords. |
| [ElevenLabs](/reference/providers/elevenlabs) | Scribe transcription and multilingual speech-to-text workflows | Advanced diarization and role params have provider-specific constraints. |
| [Mistral](/reference/providers/mistral) | Voxtral transcription, context bias, diarization, timestamp granularity | OSTT uses the synchronous transcription endpoint, not streaming. |

Run `ostt auth login` before selecting a cloud provider:

```bash
ostt auth login
ostt model
```

## Built-In Local Models

Use local models when privacy, offline use, or predictable cost matters. OSTT runs Parakeet and Whisper models on its built-in engine, [transcribe.cpp](https://github.com/handy-computer/transcribe.cpp), with GGUF or `ggml-*.bin` model files.

Start with **Parakeet** when your language is English or one of the 25 European languages it covers. It adds punctuation and capitalization, detects the language itself, and in our tests transcribed about three times faster than Whisper turbo on the same hardware. Use **Whisper** for other languages, for regional fine-tunes such as KB-Whisper (Swedish) and NB-Whisper (Norwegian), or when you need Whisper params such as a fixed language.

Open the model picker:

```bash
ostt model
```

Choose **Local provider** to download curated models, activate a downloaded model, inspect metadata, delete model files, or add a custom Hugging Face/direct model URL.

| Hardware | Suggested starting point | Notes |
| --- | --- | --- |
| Low-end CPU | `parakeet-tdt_ctc-110m` (English), or Whisper tiny, base, or small | Faster, lower accuracy. Good for quick notes and testing. |
| Modern laptop CPU | `parakeet-ultra`, or Whisper small, medium, or turbo | Parakeet Ultra runs well on CPU alone. |
| Apple Silicon | `parakeet-ultra`, or Whisper turbo or large | Metal acceleration is enabled on macOS builds. |
| NVIDIA Linux GPU | `parakeet-ultra`, or Whisper turbo or large | Use the CUDA build when the NVIDIA driver and cuBLAS runtime are available. |
| AMD/Intel Linux GPU | `parakeet-ultra` or Whisper turbo with the Vulkan build | Vulkan support is useful but hardware-dependent. |
| Privacy-sensitive work | Largest model that feels fast enough | No audio leaves the machine, but local performance depends on hardware. |

For repeated local dictation, start [Daemon Mode](/guide/daemon):

```bash
ostt daemon start
ostt launch --paste
```

Daemon mode keeps the active local model loaded so each transcription avoids model load time.

## External Local Engines

Built-in local support covers Parakeet and Whisper models. If you want faster-whisper, Cohere Transcribe, Speaches, LocalAI, onnx-asr, or a custom research model, run that engine yourself and let OSTT call it.

Use `command/<profile>` when you have a CLI or wrapper script:

```toml
[transcription]
provider = "command"
model = "parakeet"

[command.parakeet]
display_name = "Parakeet"
command = "/home/you/asr/parakeet-transcribe.sh {audio_path}"
output_format = "pcm_s16le -ar 16000"
timeout_secs = 300
```

Use `http/<profile>` when your engine exposes an OpenAI-compatible `/v1/audio/transcriptions` endpoint:

```toml
[transcription]
provider = "http"
model = "speaches"

[http.speaches]
display_name = "Speaches"
endpoint = "http://127.0.0.1:8000/v1/audio/transcriptions"
output_format = "pcm_s16le -ar 16000"
timeout_secs = 300

[http.speaches.params]
model = "Systran/faster-whisper-large-v3"
response_format = "json"
```

Then select or use it like any other model:

```bash
ostt model select http/speaches
ostt -m http/speaches --paste
ostt retry -m command/parakeet
```

See [External Engines](/guide/external-engines) for the full contract.

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
| Built-in local models | Best | Medium | Hardware-dependent | Free after hardware | Low |
| Cloud STT | Audio leaves your machine | Easy once key exists | Usually good | Usage-based | Low |
| External command engine | Local if the command is local | Advanced | Depends on engine startup | Free after hardware | User-managed |
| External HTTP engine | Local if endpoint is local | Advanced | Good when server stays hot | Free after hardware | User-managed |

## Related Pages

- [Providers and Models](/reference/providers)
- [Local Models](/guide/local-models)
- [External Engines](/guide/external-engines)
- [GPU Acceleration](/guide/gpu-acceleration)
- [Daemon Mode](/guide/daemon)
