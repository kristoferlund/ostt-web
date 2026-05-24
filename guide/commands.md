---
description: "Complete reference for all OSTT CLI commands: record, transcribe, retry, replay, process, auth, model, history, keywords, and shell completions."
---

# Commands

If no command is specified, `record` is used by default. Global flags (`-c`, `-o`, `-p`) can be used without explicitly typing `record`.

## Default: Record

```bash
ostt                    # Record with real-time visualization, print to stdout
ostt record             # Explicit record command
ostt -c                 # Record and copy to clipboard
ostt -o notes.txt       # Record and write to file
ostt -p clean           # Record and process with "clean" action
ostt -p clean -c        # Record, process, copy result
```

Alias: `ostt r`.

### Flags

| Flag | Description |
| --- | --- |
| `-c` / `--clipboard` | Copy transcription to clipboard |
| `-o FILE` / `--output FILE` | Write transcription to file |
| `-p [ACTION]` / `--process [ACTION]` | Enable processing. Optionally specify action ID to skip picker. |

## Launch (Popup)

```bash
ostt launch -c              # Open popup, record, copy to clipboard
ostt launch -c -p clean     # Popup, record, process with "clean", copy
ostt launch -- -c -p cmd    # Pass flags through to the instance
```

`launch` spawns a popup terminal with `ostt` running inside. If a recording process is already running, pressing the hotkey again sends `SIGUSR1`, which stops recording and triggers transcription.

Configure popup window settings in `~/.config/ostt/ostt.toml` under `[popup]`.

Alias: `ostt l`.

## Transcribe

Transcribe pre-recorded audio files using the configured provider/model.

```bash
ostt transcribe recording.ogg              # Transcribe to stdout
ostt transcribe voice-memo.mp3 -c          # Transcribe and copy to clipboard
ostt transcribe meeting.wav -o transcript.txt   # Transcribe to file
ostt transcribe audio.ogg -p clean -c      # Transcribe, process, copy
ostt transcribe audio.ogg | grep keyword   # Pipe to other commands
```

### Flags

Same as record: `-c`, `-o`, `-p`.

Alias: `ostt t`.

## Retry

Re-transcribe a previous recording using the current model/provider settings. Useful when transcription failed or you want to try a different model.

```bash
ostt retry              # Re-transcribe most recent recording
ostt retry 3            # Re-transcribe recording #3
ostt retry -c           # Re-transcribe and copy to clipboard
ostt retry -p clean     # Re-transcribe and process
```

Recording indexes are 1-based, with `1` being the most recent.

### Flags

| Flag | Description |
| --- | --- |
| `N` | Recording index (1 = most recent) |
| `-c` / `--clipboard` | Copy to clipboard |
| `-o FILE` / `--output FILE` | Write to file |
| `-p [ACTION]` / `--process [ACTION]` | Enable processing |

## Replay

Play back the audio of a previous recording without transcribing.

```bash
ostt replay             # Play most recent recording
ostt replay 2           # Play recording #2
```

Uses `mpv` if available, with fallbacks to `vlc`, `ffplay`, `paplay` (Linux), or `afplay` (macOS).

Alias: `ostt rp`.

## Process

Run a processing action on an existing transcription from history. The first argument is the history index (if numeric) or the action ID (if non-numeric). Provide both to target a specific item.

```bash
ostt process                    # Process most recent, show action picker
ostt process clean              # Process most recent with "clean" action
ostt process 3                  # Process #3, show picker
ostt process 3 clean -c         # Process #3 with "clean", copy to clipboard
ostt process --list             # List configured actions
```

Alias: `ostt p`.

### Flags

| Flag | Description |
| --- | --- |
| `N` | History index (1 = most recent) |
| `ACTION` | Action ID to run directly, skip picker |
| `--list` | List all configured actions |
| `-c` / `--clipboard` | Copy result to clipboard |
| `-o FILE` / `--output FILE` | Write result to file |

## Auth

Add or remove cloud provider credentials.

```bash
ostt auth login       # Add or update a cloud provider API key
ostt auth logout      # Remove a cloud provider API key
```

`ostt auth` without a subcommand defaults to `ostt auth login`. API keys are stored securely outside the main config file.

Alias: `ostt a`.

## Model

Choose and manage the active transcription model.

```bash
ostt model
```

The model picker lets you choose between cloud and local providers. Cloud models are shown for providers with saved credentials. Local models can be downloaded, activated, deleted, inspected, or added from a custom Hugging Face/direct model URL.

See [Local Models](./local-models.md) for offline model setup.

## History

Browse previous transcriptions. Use arrow keys to navigate, Enter to copy, Esc to exit.

```bash
ostt history
```

Alias: `ostt h`.

## Keywords

Manage keywords for improved transcription accuracy. Add technical terms, names, or domain-specific vocabulary.

```bash
ostt keywords
```

Alias: `ostt k`.

## Config

Open `~/.config/ostt/ostt.toml` in your preferred editor.

```bash
ostt config
```

Uses `$EDITOR` environment variable or falls back to nano/vim.

Alias: `ostt c`.

## List Devices

List available audio input devices with IDs, names, and configurations.

```bash
ostt list-devices
```

## Logs

Show the last 50 lines of the most recent log file. Useful for troubleshooting.

```bash
ostt logs
```

## Shell Completions

Generate shell completion scripts for tab completion of commands and options.

Install directly to the standard location for your shell:

```bash
ostt completions bash --install          # requires sudo
ostt completions zsh --install           # requires sudo
ostt completions fish --install          # no sudo needed, uses ~/.config/fish
```

Or generate and place the file manually:

```bash
ostt completions bash > ostt.bash
ostt completions zsh > _ostt
ostt completions fish > ostt.fish
```

### Bash

```bash
sudo cp ostt.bash /etc/bash_completion.d/
```

### Zsh

```bash
sudo cp _ostt /usr/local/share/zsh/site-functions/
# Linux: /usr/share/zsh/site-functions/
```

### Fish

```bash
cp ostt.fish ~/.config/fish/completions/
```

After installation, restart your shell or source the completion file to enable completions.

## Version and Help

```bash
ostt --version        # Show version information
ostt --help           # Detailed help with examples
ostt -h               # Quick help
```

## Exit Codes

| Code | Meaning |
| --- | --- |
| `0` | Success |
| `1` | General error |
| `2` | Usage error (invalid arguments) |

## Command Aliases

| Alias | Command |
| --- | --- |
| `r` | record |
| `t` | transcribe |
| `l` | launch |
| `p` | process |
| `a` | auth |
| `h` | history |
| `k` | keywords |
| `c` | config |
| `rp` | replay |

```bash
ostt r -c            # Same as: ostt record -c
ostt l -c            # Same as: ostt launch -c
ostt a               # Same as: ostt auth login
```
