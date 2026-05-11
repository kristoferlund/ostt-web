# Getting Started

**Open source voice-to-text for developers who want Linux-first support, provider choice, and a scriptable pipeline.**

OSTT is a terminal-native speech-to-text tool for Linux and macOS. It records from your microphone, transcribes with the provider and model you choose, keeps local history, and works from both the shell and a global hotkey popup. Instead of locking you into one vendor, one subscription, or one app-specific workflow, OSTT lets you bring your own API key and choose from OpenAI, Deepgram, Groq, DeepInfra, AssemblyAI, Berget, and ElevenLabs.

OSTT is built for people who treat the terminal as a first-class workspace. You can print to stdout, copy to the clipboard, write to files, retry the same recording with another model, transcribe existing audio, and post-process text with either AI prompts or normal shell commands. The process pipeline is the core differentiator: your voice can become cleaned dictation, a translated note, a generated CLI command, or input to any script you already use.

## Install

```bash
curl -fsSL https://ostt.ai/install | bash
```

The installer detects your platform, installs supported runtime dependencies, downloads the latest release, verifies its checksum, and installs the `ostt` CLI.

## Authenticate

OSTT is bring-your-own-API-key. Run the auth flow once, choose a provider/model, and paste the provider API key.

```bash
ostt auth
```

API keys are stored separately from the main config file at `~/.local/share/ostt/credentials` with restricted permissions.

## Record

```bash
ostt
```

During recording:

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

The first hotkey press opens a popup terminal and starts recording. Pressing the same hotkey again sends a signal to the running OSTT process, which stops recording and transcribes.

See [Platform Setup](./platforms.md) for macOS, Omarchy/Hyprland, GNOME, and KDE setup notes.

## Process the Result

Processing actions transform transcriptions after recording. For example, this records, transcribes, runs the `clean` action, and copies the processed output:

```bash
ostt -p clean -c
```

See [Processing Actions](./processing.md) for action configuration and examples.
