---
description: Install OSTT, choose a transcription model, record from the terminal, set up paste output, and bind a global hotkey. The quickest path from zero to working voice input.
---

# Getting Started

OSTT is an open source speech-to-text tool for the terminal. It records from your microphone and transcribes on your own machine with local Parakeet and Whisper models, with full GPU support and no account or API key. A cloud provider is an option when you want one. The text goes wherever you need it: stdout, the clipboard, a file, the app you were typing in, or an AI prompt or shell command first.

This page takes you from install to dictating with a hotkey. [Why OSTT?](./why-ostt.md) explains how it compares with other dictation tools.

## Install

```bash
curl -fsSL https://ostt.ai/install | bash
```

The installer detects your platform and GPU, installs runtime dependencies, downloads and verifies the latest release, and installs the `ostt` CLI. If no model is active at the end, it offers to download the local Whisper base model so you can start transcribing straight away.

See [Installation](./installation.md) for package managers, installer options, and per-platform dependencies.

## Choose A Model

Parakeet is the recommended local model for English and 25 European languages. Download it, select it, and keep it loaded between recordings:

```bash
ostt model local download parakeet-ultra
ostt model select parakeet/parakeet-ultra
ostt daemon start
```

To browse every model, open the model picker:

```bash
ostt model
```

The **Local models** section downloads and activates offline models. [Choosing a Model](./choosing-a-model.md) helps you pick one for your language and hardware.

To use a [cloud model](./cloud-models.md) instead, save the provider's API key first:

```bash
ostt auth login
```

Keys are stored apart from the config, in `~/.local/share/ostt/credentials` with `0600` permissions.

## Record

```bash
ostt
```

The terminal shows a live audio visualization (a voice-range spectrum by default, or a waveform), the current and peak volume, and a red clipping warning when you are too loud. See [Configuration](./configuration.md) to change the visualization.

### Controls

| Key | Action |
| --- | --- |
| `Enter` | Stop recording and transcribe |
| `Space` | Pause or resume recording |
| `Esc`, `q`, `Ctrl+C` | Cancel without transcribing |

By default, the transcription is printed to stdout.

```bash
ostt -c              # Copy to clipboard
ostt --paste         # Paste into the focused app
ostt -o notes.txt    # Write to file
```

## Use a Global Hotkey

On Omarchy 4.5 or later, the [dictation plugin](./platforms/omarchy-dictation.md) makes OSTT the program behind Omarchy's own dictation keys, with no popup. On Omarchy 4, the installer also binds `ALT+SPACE` to clipboard dictation in the popup. Elsewhere, bind this command in your desktop environment or in macOS Shortcuts.app:

```bash
ostt launch --paste
```

The first hotkey press opens a popup terminal and starts recording. Pressing the same hotkey again sends a signal (`SIGUSR1`) to the running OSTT process, which stops recording and transcribes.

With `--paste`, the popup closes and OSTT pastes the transcript into the app that regains focus. Use `ostt launch -c` instead to copy it and paste yourself.

See the setup guide for [macOS](./platforms/macos.md), [Omarchy dictation](./platforms/omarchy-dictation.md), [Omarchy/Hyprland](./platforms/hyprland.md), [GNOME](./platforms/gnome.md), or [KDE Plasma](./platforms/kde.md) for hotkey setup and for changing the paste shortcut when an app needs a different one.

## Process the Result

Processing actions transform transcriptions after recording. For example, this records, transcribes, runs the `clean` action, and copies the processed output:

```bash
ostt -p clean -c
```

See [Processing Actions](./processing.md) for action configuration and examples.

## Fix Casing and Product Names

Use `ostt replace` when the model hears a term correctly but formats it wrong:

```bash
ostt replace
```

Rules are saved in `~/.config/ostt/ostt.toml` under `[text.replace]`:

```toml
[text.replace]
"ostt" = "OSTT"
"api" = "API"
"github" = "GitHub"
```

Replace runs before processing actions, output, and history saves, so downstream commands receive the fixed text.

## Next Steps

- [Keep a local model loaded](./daemon.md) so each transcription starts without loading the model.
- [Add keywords](./commands.md#keyword) for names and terms the model gets wrong.
- [Use the GPU](./gpu-acceleration.md) for faster local transcription.
- [Browse every command](./commands.md) and [configuration option](./configuration.md).
