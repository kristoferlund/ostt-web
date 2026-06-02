---
description: Full reference for ostt.toml — audio device, visualization, model options, popup window, processing defaults, and all configuration options with examples.
---

# Configuration

OSTT stores its main configuration at `~/.config/ostt/ostt.toml`. The default config is generated on first run with inline documentation for every option.

Open it with:

```bash
ostt config
```

API keys are stored separately at `~/.local/share/ostt/credentials` with restricted permissions (0600). They are not part of `ostt.toml`.

## Audio

```toml
[audio]
device = "default"
peak_volume_threshold = 90
reference_level_db = -20
output_format = "mp3 -ab 16k -ar 12000"
visualization = "spectrum"
```

### device

Audio input device. Run `ostt config list-devices` to see available options.

```
ostt config list-devices

Available audio input devices:

  ID: 0
    Name: default [DEFAULT]
    Config: (44100Hz, 2 channels)

  ID: 2
    Name: USB Microphone
    Config: (48000Hz, 1 channels)
```

`device` accepts:

| Value | Example | Description |
| --- | --- | --- |
| `"default"` | `device = "default"` | System default input device |
| Numeric index | `device = "0"` | Device by index from `config list-devices` |
| Device name | `device = "USB Microphone"` | Device by name from `config list-devices` |

### peak_volume_threshold

Peak volume threshold for the red clipping indicator (0--100, percentage of reference level). Default `90` means the indicator activates at 90% of `reference_level_db`, giving 10% headroom before clipping.

### reference_level_db

Reference level in dBFS for the 100% meter display. Set this to your audio card's maximum input level for accurate metering.

| Value | Description |
| --- | --- |
| `-6` | Very hot recording (near clipping) |
| `-12` | Hot recording (professional standard) |
| `-18` | Moderate recording level |
| `-20` | Conservative level, typical audio card max |

If your volume meter never reaches 100%, run `ostt record`, maximize your microphone gain, note the peak dBFS value, and set `reference_level_db` to match.

### output_format

Output audio format for API calls. All audio is saved as mono with ffmpeg handling resampling and compression. Format: `"codec [ffmpeg_options]"`.

| Format string | Bitrate | Size | Use case |
| --- | --- | --- | --- |
| `"mp3 -ab 16k -ar 12000"` | 16 kbps | ~1.8 MB/hour | Whisper API optimal (default) |
| `"libopus -ab 32k -ar 16000"` | 32 kbps | ~3.6 MB/hour | Better quality, smaller than AAC |
| `"aac -ab 32k -ar 16000"` | 32 kbps | ~3.6 MB/hour | Good quality, wide support |
| `"flac -ar 16000"` | Lossless | ~20 MB/hour | Lossless, no quality loss |
| `"pcm_s16le -ar 16000"` | Uncompressed | Largest | Required for local transcription |

Local models require `output_format = "pcm_s16le -ar 16000"`. The local model activation flow can update this setting for you.

### visualization

Display mode during recording.

| Value | Description |
| --- | --- |
| `"spectrum"` | Frequency spectrum showing energy distribution across frequency bands, optimized for the human voice range (100--1500 Hz) |
| `"waveform"` | Time-domain waveform showing amplitude over time, classic oscilloscope-style display |

## Model Options

Provider request options are model-scoped. Put persistent options under `[model_options."provider/model"]`:

```toml
[model_options."deepgram/nova-3"]
smart_format = true
diarize = true
keyterm = ["OSTT", "VitePress"]

[model_options."openai/gpt-4o-transcribe"]
language = "en"
prompt = "Technical dictation with project names."

[model_options."local/turbo"]
language = "auto"
temperature = 0.0
no_context = true
```

For a single invocation, pass `--mo key=value`:

```bash
ostt record --mo smart_format=true --mo diarize=true
ostt transcribe meeting.mp3 -m deepgram/nova-3 --mo keyterm=OSTT,VitePress
```

`--mo` values are validated against the selected model. Duplicate keys and unsupported options fail before the request is sent.

See [Providers and Models](../reference/providers.md) for supported model IDs and provider-specific option tables.

## Local Transcription

Local models are selected and managed with `ostt model`. The `[providers.local]` section controls global local Whisper inference defaults. Per-model overrides use the same `[model_options."provider/model"]` format as cloud models, for example `[model_options."local/turbo"]`. The option meanings are the same in both places.

```toml
[providers.local]
language = "auto"
no_timestamps = true
no_context = true
temperature = 0.0
entropy_thold = 2.4
no_speech_thold = 0.6
```

| Option | Default | Description |
| --- | --- | --- |
| `language` | `"auto"` | Language hint for local inference. Use `"auto"` or an ISO code such as `"en"` or `"sv"`. |
| `no_timestamps` | `true` | Suppress timestamp output. |
| `no_context` | `true` | Do not reuse text context between segments. |
| `temperature` | `0.0` | Sampling temperature. `0.0` uses greedy deterministic decoding. |
| `entropy_thold` | `2.4` | Entropy threshold for fallback behavior. |
| `no_speech_thold` | `0.6` | No-speech probability threshold. |

See [Local Models](./local-models.md) for setup, storage, and audio-format requirements.

## Processing Actions

Actions are defined as named tables under `[process.actions]`. The table key becomes the action's `id` on the CLI. Each action has a `type` of either `"ai"` (runs an AI CLI tool) or `"bash"` (runs a shell command).

AI actions can inherit their tool and model from `[process]` defaults. Set `tool` or `model` on an individual action only when that action should override the default.

See [Processing Actions](./processing.md) for full examples and common recipes.

### AI Actions

```toml
[process]
default_tool = "opencode"
default_model = "anthropic/claude-sonnet-4-6"

[process.actions.clean]
name = "Clean up text"
type = "ai"
# tool_binary = "/usr/local/bin/opencode"  # Override binary path
# tool_args = ["--quiet"]                   # Extra CLI arguments
inputs = [
  { role = "system", content = "Clean up the transcribed text." },
  { role = "user", source = "transcription" },
]
```

For every AI action, OSTT must resolve both a `tool` and a `model` from either the action itself or `[process]` defaults. If either value is missing, config validation fails.

The `inputs` field is an array of inline tables. Each entry has a `role` and exactly one content source.

Supported AI tools:

| `tool` | Binary | Required arguments |
| --- | --- | --- |
| `opencode` | `opencode` | `--pure run --model <model>` |
| `claude-code` | `claude` | `-p --model <model> --no-session-persistence --mcp-config <json> --strict-mcp-config --allowedTools ""` |
| `gemini-cli` | `gemini` | `-p -m <model>` |
| `codex-cli` | `codex` | `exec --model <model>` |

The selected tool must be installed and authenticated outside OSTT.

### Bash Actions

```toml
[process.actions.upper]
name = "UPPERCASE"
type = "bash"
command = "tr '[:lower:]' '[:upper:]'"
```

Bash actions receive the transcription on stdin and return stdout as the processed result.

### Input Sources

Each AI input entry has a `role` (`"system"` or `"user"`) and exactly one content source. If multiple sources are specified in the same entry, precedence is: `source` > `file` > `content`.

| Source | Example | Description |
| --- | --- | --- |
| `source = "transcription"` | `{ role = "user", source = "transcription" }` | Dynamic content: the recorded transcription |
| `source = "keywords"` | `{ role = "user", source = "keywords" }` | Dynamic content: the keyword list |
| `content = "..."` | `{ role = "system", content = "You are a helpful assistant." }` | Literal inline text |
| `file = "..."` | `{ role = "system", file = "~/prompts/clean.txt" }` | Path to a file whose contents become the message |

## Popup

Popup window settings for `ostt launch`.

```toml
[popup]
# terminal = "ghostty"
# x = 630
# y = 790
width = 90
height = 15
font_size = 6
borderless = true
```

| Option | Default | Description |
| --- | --- | --- |
| `terminal` | auto-detect | Terminal emulator for popup. Skips auto-detection if set (faster startup). |
| `x` | `630` | Window position in pixels from left of screen. Ignored on GNOME Wayland (compositor controls placement). |
| `y` | `790` | Window position in pixels from top of screen. Ignored on GNOME Wayland. |
| `width` | `90` | Window width in terminal columns. |
| `height` | `15` | Window height in terminal rows. |
| `font_size` | `6` | Font size for the popup terminal. |
| `borderless` | `true` | Hide window decorations (titlebar, borders) when supported. |

### Terminal Auto-Detection

If `terminal` is unset, OSTT probes terminals in this order:

1. **Preferred:** ghostty, kitty, alacritty
2. **Fallbacks:** foot, konsole, gnome-terminal, xfce4-terminal

On macOS, Terminal.app does not support true color. Install a preferred terminal from the supported list.

## Logging

OSTT logs all activity to daily-rotated log files. Logs are kept for the 7 most recent days; older logs are automatically cleaned up on startup.

| Command | Description |
| --- | --- |
| `ostt logs` | Show the last 50 lines of the most recent log |
| `RUST_LOG=debug ostt record` | Enable debug output for troubleshooting |

Available log levels: `error`, `warn`, `info` (default), `debug`, `trace`.

## Recording Controls

During recording:

| Key | Action |
| --- | --- |
| `Enter` | Stop recording and transcribe |
| `Space` | Pause or resume recording |
| `Esc`, `q`, `Ctrl+C` | Cancel without saving |

Display elements visible during recording:

- **Visualization**: Real-time audio display (spectrum or waveform)
  - **Spectrum mode**: Frequency distribution across the voice range (100--1500 Hz focus)
  - **Waveform mode**: Amplitude envelope over time
- **Vol %**: Current volume level
- **Peak %**: Maximum volume in the last 3 seconds
- **Red indicator**: Clipping warning when volume exceeds `peak_volume_threshold`

## File Locations

```
~/.config/ostt/
├── ostt.toml              # Main configuration

~/.local/share/ostt/
├── credentials            # API keys (0600 permissions)
├── recordings/            # Saved recordings
├── models/                # Local model files and metadata

~/.local/state/ostt/
├── ostt.log.*             # Daily-rotated logs (7-day retention)
```
