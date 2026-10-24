---
description: Use hosted transcription from OpenAI, Deepgram, Groq, DeepInfra, AssemblyAI, Berget, ElevenLabs, and Mistral with OSTT, using your own API key. When the cloud fits and what each provider is good for.
---

# Cloud Models

OSTT works with eight cloud transcription providers, each with your own API key: OpenAI, Deepgram, Groq, DeepInfra, AssemblyAI, Berget, ElevenLabs, and Mistral. Audio is sent to the provider you choose, and usage is billed by that provider.

[Local models](/guide/local-models) are the default recommendation: they run offline with full GPU support and keep audio on your machine. The cloud is the better fit when you need provider features such as speaker labels, a hosted model with no local equivalent, or transcription on a machine without the hardware for a large local model. See [Choosing a Model](/guide/choosing-a-model) for the comparison.

## Set Up

Save an API key, then pick a model:

```bash
ostt auth login
ostt model
```

Models from providers you have a key for are listed in the **Cloud models** section of the picker. Keys are stored apart from the config, in `~/.local/share/ostt/credentials` with `0600` permissions.

## When the Cloud Fits

| Need | Good starting point | Why |
| --- | --- | --- |
| No model download | OpenAI `openai/gpt-4o-transcribe` or Deepgram `deepgram/nova-3` | Hosted APIs need only an API key. |
| Strong general quality | OpenAI `openai/gpt-transcribe`, Deepgram `deepgram/nova-3`, or AssemblyAI `assemblyai/universal-3-5-pro` | Current general-purpose models with useful params for language, formatting, prompts, or keyterms. |
| Speaker labels and long meetings | Providers with diarization and formatting params | Long files often benefit from provider-specific params such as diarization, formatting, language hints, and prompts. |
| Swedish or EU hosting | Berget `berget/KBLab/kb-whisper-large`; `berget/klang/pianissimo` | Swedish-focused models hosted in Europe. Pianissimo transcribes after recording stops and does not support keyword boosting. |
| Norwegian | Berget `berget/NbAiLab/nb-whisper-large` | NB-Whisper is documented for Norwegian, Bokmål, Nynorsk, and English. |

## Providers

| Provider | Good for | Watch out for |
| --- | --- | --- |
| [OpenAI](/reference/providers/openai) | GPT Transcribe, GPT-4o transcription, GPT-4o Mini, hosted Whisper, prompt hints, diarization model | OSTT returns plain text even when JSON metadata is requested. |
| [Deepgram](/reference/providers/deepgram) | Nova models, low-latency cloud transcription, formatting, diarization, language detection, keyterms | Advanced params are provider-specific. Pick `nova-3` or `nova-2` intentionally. |
| [Groq](/reference/providers/groq) | Very fast hosted Whisper variants and OpenAI-compatible request shape | Groq model choices differ in accuracy, cost, and translation support. |
| [DeepInfra](/reference/providers/deepinfra) | Hosted open speech-recognition models, including Whisper, Qwen3 ASR, Nemotron, and Voxtral options | Model availability and pricing can change. Check the provider docs. |
| [AssemblyAI](/reference/providers/assemblyai) | Universal 3.5 Pro, Universal 2, promptable transcription, speaker labels, language detection, keyterms | Async-provider behavior and params differ from OpenAI-style endpoints. |
| [Berget](/reference/providers/berget) | Swedish Pianissimo, Swedish and Norwegian optimized Whisper models, European hosting | Choose model-specific params: Pianissimo does not support Whisper prompts or hotwords. |
| [ElevenLabs](/reference/providers/elevenlabs) | Scribe transcription and multilingual speech-to-text workflows | Advanced diarization and role params have provider-specific constraints. |
| [Mistral](/reference/providers/mistral) | Voxtral transcription, context bias, diarization, timestamp granularity | OSTT uses the synchronous transcription endpoint, not streaming. |

Each provider page lists its models and params. [Providers and Models](/reference/providers) explains how params are set in the config and per run.

## Compare With a Local Model

Recordings made with a cloud model active are MP3 by default, which local models cannot read. To compare a cloud model with a local one on the same audio, record with the local model active and retry with the cloud model:

```bash
ostt -o local.txt
ostt retry -m deepgram/nova-3 -o deepgram.txt
```

See [Audio Format](/guide/local-models#audio-format).

## Related Pages

- [Choosing a Model](/guide/choosing-a-model)
- [Local Models](/guide/local-models)
- [Providers and Models](/reference/providers)
- [Commands: auth](/guide/commands#auth)
