---
description: Supported OSTT transcription providers, cloud models, local models, and links to provider-specific configuration guides.
---

# Providers and Models

OSTT can use cloud providers or local Parakeet and Whisper models. Run `ostt model` to choose the active model. Run `ostt auth login` first when you want to use a cloud provider.

Transcription request params are configured under `[provider.params]` or `[provider."model".params]`, or passed per invocation with `--param key=value`. Use `ostt model params PROVIDER/MODEL` to list supported params for a cloud or local model. Params under `[provider.params]` apply to every model of that provider, so each one must be supported by the model you select; put model-specific params under `[provider."model".params]`.

For practical recommendations by use case, see [Choosing a Transcription Model or Provider](/guide/choosing-a-model).

## Local

Local models run on your machine and do not require an API key. Open the local model manager with:

```bash
ostt model
```

Choose **Local models** to download curated models, activate downloaded models, delete model files, inspect metadata, or add a custom Hugging Face/direct model URL.

The curated model list is maintained in the [kristoferlund/ostt-models](https://github.com/kristoferlund/ostt-models) repository. Open a pull request there to suggest a model for inclusion in the default list shown to all users.

Local transcription supports GPU acceleration through Metal on macOS and CUDA or Vulkan builds on Linux.

| Provider | Models | Params |
| --- | --- | --- |
| `parakeet` | `parakeet/parakeet-ultra`, `parakeet/parakeet-tdt-0.6b-v3`, `parakeet/parakeet-tdt-0.6b-v2`, `parakeet/parakeet-tdt_ctc-110m` | None; the language is detected automatically |
| `whisper` | `whisper/turbo`, `whisper/large-v3`, regional KB-Whisper and NB-Whisper models, and more | `language`, `no_context`, `temperature`, `no_speech_thold`, `prompt` |

Local models need 16 kHz mono 16-bit WAV. OSTT records in that format automatically when a local model is active; files you pass to `ostt transcribe` must already be in it. See [Local Models](../guide/local-models.md#audio-format).

Local Whisper params use the same provider/model format as cloud providers, for example `[whisper.params]`, `[whisper.turbo.params]`, or `--param language=sv`. Use model IDs such as `whisper/turbo` or `parakeet/parakeet-ultra`. See [Local Models](../guide/local-models.md) for setup details and local param descriptions.

## Cloud Provider Guides

| Provider | Models | Guide |
| --- | --- | --- |
| OpenAI | `openai/gpt-transcribe`, `openai/gpt-4o-transcribe`, `openai/gpt-4o-mini-transcribe`, `openai/gpt-4o-transcribe-diarize`, `openai/whisper-1` | [OpenAI](./providers/openai.md) |
| Deepgram | `deepgram/nova-3`, `deepgram/nova-3-medical`, `deepgram/nova-3-pharma`, `deepgram/nova-2` | [Deepgram](./providers/deepgram.md) |
| Groq | `groq/whisper-large-v3`, `groq/whisper-large-v3-turbo` | [Groq](./providers/groq.md) |
| DeepInfra | Whisper Large V3, Whisper Large V3 Turbo, Qwen3 ASR, Nemotron, and Voxtral speech-recognition models | [DeepInfra](./providers/deepinfra.md) |
| AssemblyAI | `assemblyai/universal-3-5-pro`, `assemblyai/universal-2` | [AssemblyAI](./providers/assemblyai.md) |
| Berget | `berget/klang/pianissimo`, `berget/KBLab/kb-whisper-large`, `berget/NbAiLab/nb-whisper-large`, `berget/openai/whisper-large-v3` | [Berget](./providers/berget.md) |
| ElevenLabs | `elevenlabs/scribe_v2`, `elevenlabs/scribe_v2_medical`, `elevenlabs/scribe_v1` | [ElevenLabs](./providers/elevenlabs.md) |
| Mistral | `mistral/voxtral-mini-latest`, `mistral/voxtral-mini-2602` | [Mistral](./providers/mistral.md) |

To run another engine yourself, such as faster-whisper or an OpenAI-compatible server, use the `command` and `http` providers described in [External Engines](../guide/external-engines.md).

## Landing Pages

These pages are broader introductions and workflow overviews:

- [OpenAI Whisper CLI](/lp/openai-whisper-cli)
- [GPT-4o Transcribe on Linux](/lp/gpt-4o-transcribe-linux)
- [Deepgram Nova 3 CLI](/lp/deepgram-nova-3-cli)
- [Groq Whisper CLI](/lp/groq-whisper-cli)
- [AssemblyAI CLI on Linux](/lp/assemblyai-cli-linux)
- [ElevenLabs Transcription CLI](/lp/elevenlabs-transcription-cli)
- [Mistral Voxtral CLI](/lp/mistral-voxtral-cli)
- [Berget Whisper for Swedish](/lp/berget-whisper-svenska)
- [Klang Pianissimo for Swedish](/lp/klang-pianissimo-svenska)
- [Berget Whisper for Norwegian](/lp/berget-whisper-norsk)
