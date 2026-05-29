---
description: Install OSTT, choose a transcription model, record from the terminal, and set up a global hotkey. The quickest path from zero to working voice input.
---

# Getting Started

**Open source speech-to-text for the terminal: Linux-first, provider-agnostic, and scriptable.**

OSTT records from your microphone, transcribes with the provider and model you choose, keeps local history, and works from both the shell and a global hotkey popup. It does not assume one vendor, one subscription, or one app-specific workflow: bring your own API key and choose from OpenAI, Deepgram, Groq, DeepInfra, AssemblyAI, Berget, ElevenLabs, or local Whisper-compatible models.

OSTT is built for people who treat the terminal as a normal place for voice input to land. You can print to stdout, copy to the clipboard, write to files, retry the same recording with another model, transcribe existing audio, and post-process text with AI prompts or shell commands. Voice becomes text that can move through the same tools as everything else.

## Core Features

- **Linux-first voice input** - Global hotkey setup for Omarchy/Hyprland, GNOME, KDE, and other Linux desktops, with macOS support too.
- **Provider choice** - Bring your own API key and switch between OpenAI, Deepgram, Groq, DeepInfra, AssemblyAI, Berget, ElevenLabs, and local models.
- **Local transcription** - Download curated local models or add custom Hugging Face/direct model files for offline transcription.
- **Terminal-native workflow** - Use stdout, clipboard, files, aliases, shell completions, logs, and pipes.
- **Scriptable post-processing** - Transform transcripts with AI prompts or bash commands using `ostt -p` and `ostt process`.
- **Retry without re-recording** - Save recordings locally, then re-transcribe them with a different provider or model.
- **File transcription and replay** - Transcribe existing audio files and replay saved recordings from history.
- **Keywords and custom vocabulary** - Improve recognition for names, technical terms, and project-specific language.
- **Open source, no subscription** - Public code, local configuration, and no vendor lock-in beyond the providers you choose.

## Install

```bash
curl -fsSL https://ostt.ai/install | bash
```

The installer detects your platform, installs supported runtime dependencies, downloads the latest release, verifies its checksum, and installs the `ostt` CLI.

See the [Installation](./installation.md) page for alternative install methods and per-platform dependency setup.

## Choose A Model

Run the model picker to choose the transcription model OSTT should use:

```bash
ostt model
```

Choose **Cloud provider** for hosted models or **Local provider** for offline models. Local models can be downloaded and activated from the same screen.

Cloud providers require credentials first:

```bash
ostt auth login
```

API keys are stored separately from the main config file at `~/.local/share/ostt/credentials` with restricted permissions (0600). See [Local Models](./local-models.md) for offline setup.

## Record

```bash
ostt
```

During recording, the terminal shows:

- **Visualization**: Real-time audio display (spectrum or waveform, configurable)
  - **Spectrum mode** (default): Frequency distribution across the voice range (100--1500 Hz focus), with noise gating that suppresses background noise automatically
  - **Waveform mode**: Amplitude envelope over time, classic oscilloscope-style display
- **Vol %**: Current volume level
- **Peak %**: Maximum volume in the last 3 seconds
- **Red indicator**: Clipping warning when volume exceeds the configured threshold

### Controls

| Key | Action |
| --- | --- |
| `Enter` | Stop recording and transcribe |
| `Space` | Pause or resume recording |
| `Esc`, `q`, `Ctrl+C` | Cancel without transcribing |

By default, the transcription is printed to stdout.

```bash
ostt -c              # Copy to clipboard
ostt -o notes.txt    # Write to file
```

## Use a Global Hotkey

Bind this command in your desktop environment or macOS Shortcuts.app:

```bash
ostt launch -c
```

The first hotkey press opens a popup terminal and starts recording. Pressing the same hotkey again sends a signal (`SIGUSR1`) to the running OSTT process, which stops recording and transcribes.

See [Platform Setup](./platforms.md) for macOS, Omarchy/Hyprland, GNOME, and KDE setup notes.

## Process the Result

Processing actions transform transcriptions after recording. For example, this records, transcribes, runs the `clean` action, and copies the processed output:

```bash
ostt -p clean -c
```

See [Processing Actions](./processing.md) for action configuration and examples.
