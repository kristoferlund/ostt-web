---
description: Full reference for ostt.toml — audio device, visualization, transcription params, paste output, text replace rules, popup window, processing defaults, and all configuration options with examples.
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

Local models use `output_format = "pcm_s16le -ar 16000"`. Configure it under `[whisper]` or `[whisper."model"]` when you want only local Whisper recordings to use that format.

### visualization

Display mode during recording.

| Value | Description |
| --- | --- |
| `"spectrum"` | Frequency spectrum showing energy distribution across frequency bands, optimized for the human voice range (100--1500 Hz) |
| `"waveform"` | Time-domain waveform showing amplitude over time, classic oscilloscope-style display |

## Transcription Params

Transcription request params are configured under provider tables. Provider params apply to every model for that provider; model params override provider params:

```toml
[deepgram.params]
smart_format = true

[deepgram.nova-3.params]
smart_format = true
diarize = true
keyterm = ["OSTT", "VitePress"]

[openai.gpt-4o-transcribe.params]
language = "en"
prompt = "Technical dictation with project names."

[whisper.turbo.params]
language = "auto"
temperature = 0.0
no_context = true
```

For a single invocation, pass repeatable `--param key=value` overrides:

```bash
ostt record --param smart_format=true --param diarize=true
ostt transcribe meeting.mp3 -m deepgram/nova-3 --param keyterm=OSTT,VitePress
ostt retry 2 -m whisper/turbo --param language=en --param temperature=0.0
```

`--param` overrides apply only to the current command. They do not change `ostt.toml` and they take precedence over persistent params for the selected model.

Validation happens before transcription starts:

- keys must be supported by the selected provider/model
- duplicate `--param` keys fail
- values must match the param type
- provider-specific ranges and conflicts are checked
- unknown keys show the valid param names for that model

CLI list values use commas, for example `--param keyterm=OSTT,VitePress`. TOML list values must use TOML list syntax, for example `keyterm = ["OSTT", "VitePress"]`.

To list supported params for a model, run:

```bash
ostt model params
ostt model params openai/gpt-4o-transcribe
ostt model params whisper/turbo --format json
```

See [Providers and Models](../reference/providers.md) for supported model IDs and provider-specific param tables.

## Text Replace

Text replace rules are deterministic, provider-neutral post-transcription find-and-replace rules. They fix final text casing, acronyms, project names, and common misrecognitions without using AI.

```toml
[text.replace]
"ostt" = "OSTT"
"api" = "API"
"typescript" = "TypeScript"
"github" = "GitHub"
"open ai" = "OpenAI"
```

You can also manage rules interactively:

```bash
ostt replace
```

Replace rules are applied after transcription and before processing actions, output, and history saves. This means a processing action receives already-fixed text such as `OSTT API` when those rules are configured.

Matching behavior:

- keys are literal text, not regex patterns
- matching is case-insensitive
- word boundaries prevent replacing inside larger words, so `api` does not change `capital`
- phrase boundaries apply at phrase edges, so `open ai.` can become `OpenAI.`
- target values are preserved exactly as configured
- replace output is not recursively processed by later rules

Keywords and replace rules have different jobs. Use `ostt keyword` when the model mishears a term. Use `[text.replace]` when the model hears the term but formats it wrong.

## Paste Output

Paste output sends the final transcript into the currently focused application. It is opt-in with `--paste`; stdout remains the default output mode.

```bash
ostt --paste
ostt launch --paste
ostt launch --paste -p clean
ostt transcribe voice.ogg --paste
ostt retry 2 --paste
ostt process clean --paste
```

Configure paste behavior under `[output.paste]`:

```toml
[output.paste]
paste_key = "ctrl+v"
restore_clipboard = true
restore_delay_ms = 750
post_popup_delay_ms = 1000
```

Default `paste_key` values:

- macOS: `cmd+v`
- Omarchy: `shift+insert`
- other Linux desktops: `ctrl+v`

`restore_clipboard` controls whether OSTT restores the previous clipboard contents after pasting. Paste mode uses the clipboard as transport, so disabling restore leaves the transcript on the clipboard.

`restore_delay_ms` gives the focused app time to read the clipboard before OSTT restores the previous contents. Increase it if paste works intermittently or the old clipboard appears instead of the transcript.

`post_popup_delay_ms` is used by `ostt launch --paste`. The popup closes first, then OSTT waits for focus to return before sending the paste shortcut on supported desktops. On desktops where focus return cannot be detected, this value is used as the fallback delay.

Linux paste shortcuts differ by app and desktop. GUI apps commonly use `ctrl+v`; terminals often use `ctrl+shift+v`; Omarchy maps `SUPER+v` to `shift+insert`. OSTT cannot reliably detect whether a paste succeeded, so it does not try multiple shortcuts automatically.

On macOS, paste mode uses `osascript`/System Events to send `cmd+v`. macOS may prompt for Accessibility permission for the terminal app running OSTT, such as Ghostty. If paste does not work, open System Settings > Privacy & Security > Accessibility and enable the app shown in the permission prompt.

## Local Transcription

Local models are selected and managed with `ostt model`. Built-in local Whisper uses the `whisper` provider. `[whisper.params]` controls global Whisper inference defaults; `[whisper."model".params]` overrides them for a specific model. The param meanings are the same in both places.

```toml
[whisper]
output_format = "pcm_s16le -ar 16000"

[whisper.params]
language = "auto"
no_timestamps = true
no_context = true
temperature = 0.0
entropy_thold = 2.4
no_speech_thold = 0.6
```

| Param | Default | Description |
| --- | --- | --- |
| `language` | `"auto"` | Language hint for local inference. Use `"auto"` or an ISO code such as `"en"` or `"sv"`. |
| `no_timestamps` | `true` | Suppress timestamp output. |
| `no_context` | `true` | Do not reuse text context between segments. |
| `temperature` | `0.0` | Sampling temperature. `0.0` uses greedy deterministic decoding. |
| `entropy_thold` | `2.4` | Entropy threshold for fallback behavior. |
| `no_speech_thold` | `0.6` | No-speech probability threshold. |

See [Local Models](./local-models.md) for setup, storage, and audio-format requirements.

## External Engines

External command and HTTP engines are configured as provider/model profiles. Use `command/<profile>` for shell-command wrappers and `http/<profile>` for OpenAI-compatible `/v1/audio/transcriptions` endpoints:

```toml
[command.parakeet-fast]
command = "~/.config/ostt/backends/parakeet-wrapper {audio_path}"
output_format = "pcm_s16le -ar 16000"

[http.cohere-transcribe]
endpoint = "http://localhost:8080/v1/audio/transcriptions"
output_format = "pcm_s16le -ar 16000"

[http.cohere-transcribe.params]
model = "cohere-transcribe"
language = "en"
response_format = "json"
```

See [External Engines](./external-engines.md) for full setup examples and rationale.

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
