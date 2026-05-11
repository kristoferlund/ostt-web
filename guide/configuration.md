# Configuration

OSTT stores its main configuration at:

```text
~/.config/ostt/ostt.toml
```

Open it with:

```bash
ostt config
```

The default config is generated on first run and includes comments for the available options.

## Audio

```toml
[audio]
device = "default"
sample_rate = 16000
peak_volume_threshold = 90
reference_level_db = -20
output_format = "mp3 -ab 16k -ar 12000"
visualization = "spectrum"
```

Run `ostt list-devices` to see available audio input devices. `device` can be `default`, a device index, or a device name.

## Popup

```toml
[popup]
terminal = "ghostty"
width = 90
height = 15
font_size = 6
borderless = true
```

If `terminal` is unset, OSTT auto-detects a supported terminal in this order: Ghostty, kitty, Alacritty, foot, Konsole, GNOME Terminal, Xfce Terminal.

Some compositors ignore client-side position settings. Platform guides describe the relevant desktop behavior.

## Providers

Provider sections contain provider-specific transcription options. Authentication and model selection are handled by:

```bash
ostt auth
```

API keys are stored separately at `~/.local/share/ostt/credentials`, not in `ostt.toml`.

## Processing

Processing actions are configured under `[[process.actions]]`.

```toml
[[process.actions]]
id = "clean"
name = "Clean up text"
type = "ai"
tool = "opencode"
model = "anthropic/claude-sonnet-4-6"

[[process.actions.inputs]]
role = "system"
content = "Clean up the transcript and output only the result."

[[process.actions.inputs]]
role = "user"
source = "transcription"
```

See [Processing Actions](./processing.md) for full examples.

## File Locations

```text
~/.config/ostt/ostt.toml       # Main config
~/.local/share/ostt/credentials # API keys
~/.local/share/ostt/recordings  # Saved recordings
~/.local/state/ostt/ostt.log.*  # Logs
```
