---
description: Supported OSTT transcription providers, cloud models, local models, and links to provider-specific configuration guides.
---

# Providers and Models

OSTT can use cloud providers or local Whisper-compatible models. Run `ostt model` to choose the active model. Run `ostt auth login` first when you want to use a cloud provider.

Provider-specific request options are configured under `[model_options."provider/model"]` or passed per invocation with `--mo key=value`.

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
output_format = "pcm_s16le -ar 16000"
```

See [Local Models](../guide/local-models.md) for setup details.

## Cloud Provider Guides

| Provider | Models | Guide |
| --- | --- | --- |
| OpenAI | `openai/gpt-4o-transcribe`, `openai/gpt-4o-mini-transcribe`, `openai/gpt-4o-transcribe-diarize`, `openai/whisper-1` | [OpenAI](./providers/openai.md) |
| Deepgram | `deepgram/nova-3`, `deepgram/nova-2` | [Deepgram](./providers/deepgram.md) |
| Groq | `groq/whisper-large-v3`, `groq/whisper-large-v3-turbo` | [Groq](./providers/groq.md) |
| DeepInfra | Whisper, Whisper Large V3 Turbo, and Voxtral speech-recognition models | [DeepInfra](./providers/deepinfra.md) |
| AssemblyAI | `assemblyai/universal-3-pro` | [AssemblyAI](./providers/assemblyai.md) |
| Berget | `berget/KBLab/kb-whisper-large`, `berget/NbAiLab/nb-whisper-large`, `berget/openai/whisper-large-v3` | [Berget](./providers/berget.md) |
| ElevenLabs | `elevenlabs/scribe_v2`, `elevenlabs/scribe_v1` | [ElevenLabs](./providers/elevenlabs.md) |
| Mistral | `mistral/voxtral-mini-latest`, `mistral/voxtral-mini-2602` | [Mistral](./providers/mistral.md) |

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
- [Berget Whisper for Norwegian](/lp/berget-whisper-norsk)
