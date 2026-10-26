---
description: "Full reference for ostt.toml: audio device, transcription model and params, keywords, text replace rules, paste output, popup window, processing defaults and agents, and file locations."
---

# Configuration

OSTT stores its main configuration at `~/.config/ostt/ostt.toml`. On first run OSTT writes a minimal `ostt.toml` with the `[audio]` section. `[audio]` is the only required section; every other section is optional and uses the defaults below.

Open it with:

```bash
ostt config
```

OSTT ignores unknown sections, keys, and params and notes them in the log (`ostt logs`). Only invalid TOML or an invalid value for a known setting stops it from starting.

API keys are stored separately at `~/.local/share/ostt/credentials` with restricted permissions (0600). They are not part of `ostt.toml`.

## Audio

```toml
[audio]
device = "default"
reference_level_db = "auto"
peak_volume_threshold = 90
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

### reference_level_db

Reference level for the 100% meter display.

`"auto"` (default) scales the meter to your speech level, so it works regardless of OS input gain. Set a dBFS number for a fixed reference:

| Value | Description |
| --- | --- |
| `-6` | Very hot recording (near clipping) |
| `-12` | Hot recording (professional standard) |
| `-18` | Moderate recording level |
| `-20` | Conservative level, typical audio card max |

With a fixed value, if the meter never reaches 100%, run `ostt record`, maximize your microphone gain, note the peak dBFS value, and set `reference_level_db` to match.

### peak_volume_threshold

Only used with a numeric `reference_level_db`. The footer turns red when the peak reaches this percentage of the reference level (0 to 100, default `90`).

In auto mode the footer turns red when the signal is within 3 dB of full scale.

### output_format

Audio format for recordings sent to cloud providers. All audio is saved as mono with ffmpeg handling resampling and compression. Format: `"codec [ffmpeg_options]"`.

| Format string | Bitrate | Size | Use case |
| --- | --- | --- | --- |
| `"mp3 -ab 16k -ar 12000"` | 16 kbps | ~1.8 MB/hour | Whisper API optimal (default) |
| `"libopus -ab 32k -ar 16000"` | 32 kbps | ~3.6 MB/hour | Better quality, smaller than AAC |
| `"aac -ab 32k -ar 16000"` | 32 kbps | ~3.6 MB/hour | Good quality, wide support |
| `"flac -ar 16000"` | Lossless | ~20 MB/hour | Lossless, no quality loss |
| `"pcm_s16le -ar 16000"` | Uncompressed | Largest | Used automatically for local models |

Local Whisper and Parakeet models record as `pcm_s16le -ar 16000` automatically, so `[audio].output_format` only affects cloud providers. To override the format for one provider or model, set `output_format` under `[provider]` or `[provider."model"]`. A model setting wins over a provider setting, which wins over `[audio]`.

### visualization

Display mode during recording.

| Value | Description |
| --- | --- |
| `"spectrum"` | Frequency spectrum showing energy distribution across frequency bands, optimized for the human voice range (100 to 1500 Hz) |
| `"waveform"` | Time-domain waveform showing amplitude over time, classic oscilloscope-style display |

## Transcription

The `[transcription]` section holds the selected model and your keywords. `ostt model` sets `provider` and `model`; `ostt keyword` edits `keywords`.

```toml
[transcription]
provider = "deepgram"
model = "nova-3"
keywords = [
    "OSTT",
    "Kubernetes",
    "Rödeby",
]
```

### Keywords

Keywords are names and terms the model should recognize, highest priority first. Edit the list here or with [`ostt keyword`](./commands#keyword); both change the same list. Providers that support keyword boosting receive it with each transcription, and local Whisper models use it as a glossary.

A `keywords.txt` in the config directory is moved into this list on first run and renamed `keywords.txt.migrated`.

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

Model IDs that contain `/` or `.` need quoted keys, for example `[deepinfra."openai/whisper-large-v3".params]`.

TOML list values use TOML list syntax, for example `keyterm = ["OSTT", "VitePress"]`. To override params for a single run, use `--param`; see [Param Overrides](./commands#param-overrides).

List supported params for a model with `ostt model params [PROVIDER/MODEL]`. See [Providers and Models](../reference/providers.md) for supported model IDs and provider-specific param tables.

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

Paste output sends the final transcript into the currently focused application. It is opt-in with `--paste`; stdout remains the default output mode. See [Paste Output](./commands#paste-output) for the commands that accept it.

Paste uses the clipboard as transport: OSTT saves the current clipboard when possible, copies the final text, sends the configured paste shortcut, then restores the previous clipboard when enabled.

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

`restore_clipboard` controls whether OSTT restores the previous clipboard contents after pasting. Disabling restore leaves the transcript on the clipboard.

`restore_delay_ms` gives the focused app time to read the clipboard before OSTT restores the previous contents. Increase it if paste works intermittently or the old clipboard appears instead of the transcript.

`post_popup_delay_ms` is used by `ostt launch --paste`. The popup closes first, then OSTT waits for focus to return before sending the paste shortcut on supported desktops. On desktops where focus return cannot be detected, this value is used as the fallback delay.

### Linux

On Linux, OSTT sends the paste shortcut with a key-sending tool. On Wayland it tries `wtype`, then `ydotool`; on X11 it uses `xdotool`. Install one that works on your desktop. GNOME Wayland needs `ydotool`; see [Auto-paste Fails on GNOME Wayland](./troubleshooting#auto-paste-fails-on-gnome-wayland).

Linux paste shortcuts differ by app and desktop. GUI apps commonly use `ctrl+v`; terminals often use `ctrl+shift+v`; Omarchy maps `SUPER+v` to `shift+insert`. OSTT cannot reliably detect whether a paste succeeded, so it does not try multiple shortcuts automatically. If paste works in one app class but not another, set `paste_key` for the workflow you bind to that hotkey.

### macOS

On macOS, paste mode uses `osascript`/System Events to send `cmd+v`. macOS may prompt for Accessibility permission for the terminal app running OSTT, such as Ghostty. If paste does not work, open System Settings > Privacy & Security > Accessibility and enable the app shown in the permission prompt.

## Local Transcription

Local Whisper (`whisper/*`) and Parakeet (`parakeet/*`) models are configured like other providers, with `[whisper.params]` for all Whisper models and `[whisper."model".params]` for one model. Parakeet takes no params. See [Local Models](./local-models.md#whisper-params) for the Whisper params.

## External Engines

External command and HTTP engines are configured as provider/model profiles. Use `command/<profile>` for shell-command wrappers and `http/<profile>` for OpenAI-compatible `/v1/audio/transcriptions` endpoints:

```toml
[command.my-engine]
command = "~/.config/ostt/backends/my-engine-wrapper {audio_path}"
output_format = "pcm_s16le -ar 16000"

[http.cohere-transcribe]
endpoint = "http://localhost:8080/v1/audio/transcriptions"
output_format = "pcm_s16le -ar 16000"

[http.cohere-transcribe.params]
model = "cohere-transcribe"
language = "en"
response_format = "json"
```

See [External Engines](./external-engines.md) for full setup examples.

## Processing Actions

Actions are named tables under `[process.actions]`; the table key is the action ID used on the CLI. Each action has `type = "ai"` or `type = "bash"`. AI actions inherit `tool` and `model` from `[process]` defaults:

```toml
[process]
default_tool = "opencode"
default_model = "anthropic/claude-sonnet-4-6"

[process.actions.clean]
name = "Clean up text"
type = "ai"
inputs = [
  { role = "system", content = "Clean up the transcribed text." },
  { role = "user", source = "transcription" },
]
```

`[process.agents.<id>]` adds an agent for AI actions or replaces a built-in one. See [Processing Actions](./processing.md) for action types, the built-in agents, input sources, and examples.

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

## File Locations

```
~/.config/ostt/
├── ostt.toml                  # Main configuration

~/.local/share/ostt/
├── credentials                # API keys (0600 permissions)
├── transcription_history.db   # Transcription history
├── recordings/                # Saved recordings
├── models/                    # Local model files and metadata
├── ostt-daemon.sock           # Local model daemon socket
├── ostt-daemon.pid            # Local model daemon PID

~/.local/state/ostt/
├── ostt.log.*                 # Daily-rotated logs (7-day retention)
```

Paths follow `XDG_CONFIG_HOME`, `XDG_DATA_HOME`, and `XDG_STATE_HOME` when set. See [View Logs](./troubleshooting#view-logs) for reading logs.
