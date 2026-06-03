---
description: Connect OSTT to custom local or remote transcription engines with command profiles and OpenAI-compatible HTTP endpoints.
---

# External Engines

OSTT can call transcription engines that it does not bundle. Use this when you already run another ASR engine locally, on another machine, or behind an OpenAI-compatible API.

OSTT keeps built-in local support focused on Whisper via `whisper-rs` and GGUF model files. Other engines such as faster-whisper, Parakeet/onnx-asr, Cohere Transcribe, Moonshine, SenseVoice, Paraformer, Dolphin, Omnilingual, Speaches, LocalAI, and custom wrappers all have different runtimes, model formats, GPU stacks, and setup requirements. Bundling them would make OSTT larger and harder to package. External engines keep OSTT small while still giving power users an integration path.

There are two external engine types:

- `command/<profile>` runs a configured shell command, passes it an audio file path, and reads the transcript from stdout.
- `http/<profile>` posts audio to an OpenAI-compatible `/v1/audio/transcriptions` endpoint and reads `text` from the JSON response.

## Command Engines

Use command engines when the ASR tool has a CLI, Python API, wrapper script, or custom runtime. OSTT only requires one contract: the command receives `{audio_path}` and prints the final transcript to stdout.

```toml
[transcription]
provider = "command"
model = "parakeet"

[command.parakeet]
display_name = "Parakeet"
command = "/Users/you/models/parakeet-transcribe/transcribe.sh {audio_path}"
output_format = "pcm_s16le -ar 16000"
timeout_secs = 300
```

`{audio_path}` is the only command template value. OSTT shell-escapes it before running the command. Unknown `{...}` placeholders fail config validation.

For tools that need virtualenv activation, model paths, GPU flags, or environment variables, put that setup in your wrapper script:

```bash
#!/usr/bin/env bash
set -euo pipefail

source "$HOME/.venvs/parakeet/bin/activate"
python "$HOME/asr/parakeet.py" "$1"
```

The wrapper should print only the transcript to stdout. Error details should go to stderr.

[kristoferlund/parakeet-transcribe](https://github.com/kristoferlund/parakeet-transcribe) is an example repository that exposes NVIDIA Parakeet both as a shell script and as an OpenAI-compatible HTTP server. After following that repository's setup instructions, the command profile can call its `transcribe.sh` entrypoint directly.

## HTTP Engines

Use HTTP engines when the ASR service exposes an OpenAI-compatible transcription endpoint. The endpoint can be localhost, another machine on your network, or a remote API.

Backend settings live under `[http.<profile>]`. OpenAI request fields live under `[http.<profile>.params]`.

```toml
[transcription]
provider = "http"
model = "parakeet"

[http.parakeet]
display_name = "Parakeet HTTP"
endpoint = "http://127.0.0.1:8000/v1/audio/transcriptions"
output_format = "pcm_s16le -ar 16000"
timeout_secs = 300

[http.parakeet.params]
model = "nvidia/parakeet-tdt-0.6b-v3"
response_format = "json"
```

Supported v1 request params:

| Param | Type | Description |
| --- | --- | --- |
| `model` | string | Required multipart `model` field for the endpoint. |
| `language` | string | Optional language hint, such as `en` or `sv`. |
| `prompt` | string | Optional prompt/context if the server supports it. |
| `temperature` | number | Optional sampling temperature. |
| `response_format` | string | Currently `json` only. |

If `api_key` is omitted, OSTT sends no `Authorization` header. If `api_key = ""` is configured, OSTT sends an empty bearer header. Set a real key only when your endpoint requires it:

```toml
[http.remote-asr]
endpoint = "https://asr.example.com/v1/audio/transcriptions"
api_key = "your-token"

[http.remote-asr.params]
model = "custom-asr"
response_format = "json"
```

## Cohere Transcribe Example

[cohere-transcribe-rs](https://lib.rs/crates/cohere-transcribe-rs) includes an OpenAI-compatible API server for CohereLabs/cohere-transcribe-03-2026. Follow that project's setup instructions to start its server, then connect OSTT like this:

```toml
[transcription]
provider = "http"
model = "cohere-transcribe"

[http.cohere-transcribe]
display_name = "Cohere Transcribe"
endpoint = "http://localhost:8080/v1/audio/transcriptions"
output_format = "pcm_s16le -ar 16000"
timeout_secs = 120

[http.cohere-transcribe.params]
model = "cohere-transcribe"
language = "en"
response_format = "json"
```

After saving the config, normal OSTT commands use the external engine:

```bash
ostt
ostt -c
ostt transcribe recording.wav
ostt retry -m http/cohere-transcribe
```

## Selecting Profiles

External profiles use the same provider/model identity format as built-in providers:

```bash
ostt model list --provider command
ostt model list --provider http
ostt model select command/parakeet
ostt model select http/parakeet
ostt -m http/parakeet -c
```

Configured command and HTTP profiles also appear in `ostt model`.

## Audio Format

External engines can request their own recording format with `output_format`. This only applies when that profile is selected for recording. For example:

```toml
[command.parakeet-fast]
output_format = "pcm_s16le -ar 16000"

[http.parakeet]
output_format = "mp3 -ab 16k -ar 12000"
```

For `ostt transcribe <FILE>` and `ostt retry`, OSTT sends the existing file as-is. If an engine is sensitive to format, record new audio with that engine selected or convert the file before transcribing.
