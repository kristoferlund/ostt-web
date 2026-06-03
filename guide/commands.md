---
description: "Complete reference for all OSTT CLI commands and output modes: record, transcribe, retry, replay, process, paste, auth, model, history, keyword, replace, config, logs, and shell completions."
---

# Commands

If no command is specified, `record` is used by default. Record flags (`-c`, `--paste`, `-o`, `-p`, `-m`, `--param`) can be used without explicitly typing `record`.

## Default: Record

```bash
ostt                    # Record with real-time visualization, print to stdout
ostt record             # Explicit record command
ostt -c                 # Record and copy to clipboard
ostt --paste            # Record and paste into the focused app
ostt -o notes.txt       # Record and write to file
ostt -p clean           # Record and process with "clean" action
ostt -p clean -c        # Record, process, copy result
ostt -m deepgram/nova-3 # Override model for this run
ostt --param language=sv # Override a transcription param for this run
```

Alias: `ostt r`.

### Flags

| Flag | Description |
| --- | --- |
| `-c` / `--clipboard` | Copy transcription to clipboard |
| `--paste` | Paste transcription into the focused app using `[output.paste]` settings |
| `-o FILE` / `--output FILE` | Write transcription to file |
| `-p [ACTION]` / `--process [ACTION]` | Enable processing. Optionally specify action ID to skip picker. |
| `-m PROVIDER/MODEL` / `--model PROVIDER/MODEL` | Override transcription model for this run. |
| `--param KEY=VALUE` | Override one supported transcription param for this run. Repeat for multiple params. |

## Launch (Popup)

```bash
ostt launch -c              # Open popup, record, copy to clipboard
ostt launch --paste         # Open popup, record, paste into focused app
ostt launch --paste -p clean # Popup, process with "clean", paste
ostt launch -c -p clean     # Popup, record, process with "clean", copy
ostt launch -m whisper/turbo -c # Popup, override model, copy
ostt launch -m whisper/turbo --param language=sv -c
ostt launch -- -c -p cmd    # Pass flags through to the instance
```

`launch` spawns a popup terminal with `ostt` running inside. If a recording process is already running, pressing the hotkey again sends `SIGUSR1`, which stops recording and triggers transcription.

With `--paste`, the popup closes before OSTT sends the configured paste shortcut. This lets the desktop return focus to the previous app first.

Configure popup window settings in `~/.config/ostt/ostt.toml` under `[popup]`.

Alias: `ostt l`.

## Transcribe

Transcribe pre-recorded audio files using the configured provider/model.

```bash
ostt transcribe recording.ogg              # Transcribe to stdout
ostt transcribe voice-memo.mp3 -c          # Transcribe and copy to clipboard
ostt transcribe voice-memo.mp3 --paste     # Transcribe and paste into focused app
ostt transcribe meeting.wav -o transcript.txt   # Transcribe to file
ostt transcribe audio.ogg -p clean -c      # Transcribe, process, copy
ostt transcribe audio.ogg -m openai/whisper-1 # Override model for this run
ostt transcribe audio.ogg -m deepgram/nova-3 --param diarize=true
ostt transcribe audio.ogg | grep keyword   # Pipe to other commands
```

### Flags

Same as record: `-c`, `--paste`, `-o`, `-p`, `-m`, `--param`.

Alias: `ostt t`.

## Retry

Re-transcribe a previous recording using the current model/provider settings. Useful when transcription failed or you want to try a different model.

```bash
ostt retry              # Re-transcribe most recent recording
ostt retry 3            # Re-transcribe recording #3
ostt retry -c           # Re-transcribe and copy to clipboard
ostt retry --paste      # Re-transcribe and paste into focused app
ostt retry -p clean     # Re-transcribe and process
ostt retry -m groq/whisper-large-v3 # Override model for this run
ostt retry -m openai/gpt-4o-transcribe --param prompt=ProjectName -c
```

Recording indexes are 1-based, with `1` being the most recent.

### Flags

| Flag | Description |
| --- | --- |
| `N` | Recording index (1 = most recent) |
| `-c` / `--clipboard` | Copy to clipboard |
| `--paste` | Paste into the focused app |
| `-o FILE` / `--output FILE` | Write to file |
| `-p [ACTION]` / `--process [ACTION]` | Enable processing |
| `-m PROVIDER/MODEL` / `--model PROVIDER/MODEL` | Override transcription model for this run |
| `--param KEY=VALUE` | Override one supported transcription param for this run. Repeat for multiple params. |

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
ostt process 3 clean --paste    # Process #3 with "clean", paste into focused app
ostt process list               # List configured actions
ostt process list --format json # List configured actions as JSON
```

Alias: `ostt p`.

### Flags

| Flag | Description |
| --- | --- |
| `N` | History index (1 = most recent) |
| `ACTION` | Action ID to run directly, skip picker |
| `list` | List all configured actions |
| `-c` / `--clipboard` | Copy result to clipboard |
| `--paste` | Paste result into the focused app |
| `-o FILE` / `--output FILE` | Write result to file |
| `--format table\|json` | Output format for `ostt process list` |

## Auth

Add or remove cloud provider credentials.

```bash
ostt auth login       # Add or update a cloud provider API key
ostt auth logout      # Remove a cloud provider API key
ostt auth list        # List authenticated providers
ostt auth status      # Show authentication status
```

`ostt auth` without a subcommand defaults to `ostt auth login`. API keys are stored securely outside the main config file.

Alias: `ostt a`.

## Model

Choose and manage the active transcription model.

```bash
ostt model                              # Interactive model picker
ostt model list                         # List available models
ostt model list --provider openai       # Filter by provider
ostt model list --installed             # Show downloaded local models
ostt model current                      # Show active model
ostt model params                       # List params for active model
ostt model params openai/gpt-4o-transcribe --format json
ostt model select deepgram/nova-3       # Select active cloud model
ostt model select http/cohere-transcribe # Select configured HTTP engine
ostt model local download turbo         # Download local model
ostt model local download whisper/turbo # Download local model by full ID
ostt model local remove turbo           # Remove local model
```

The model picker lets you choose between cloud, built-in local, and configured external providers. Cloud models are shown for providers with saved credentials. Local models can be downloaded, activated, deleted, inspected, or added from a custom Hugging Face/direct model URL. Configured `command/*` and `http/*` external profiles are selectable too.

`ostt model params [PROVIDER/MODEL]` lists supported `--param` keys for a model. If no model is passed, it uses the active model. It supports the same list formatting flag as other list commands: `--format table|json`.

## Param Overrides

`--param KEY=VALUE` is a per-invocation transcription param override. It applies to the selected model for that command, whether the model comes from saved config or `-m PROVIDER/MODEL`.

```bash
ostt -m openai/gpt-4o-transcribe --param language=sv --param prompt=OSTT -c
ostt transcribe meeting.mp3 -m deepgram/nova-3 --param diarize=true --param keyterm=OSTT,VitePress
ostt retry 2 -m whisper/turbo --param language=en --param temperature=0.0
```

Rules:

- `--param` can be repeated.
- Each value must use `KEY=VALUE`.
- Duplicate keys fail before transcription starts.
- Unknown keys fail and show the valid params for the selected model.
- Values are validated against the selected provider/model, including type, ranges, and provider-specific conflicts.
- For list params on the CLI, separate values with commas, for example `--param keyterm=OSTT,VitePress`.

Use `ostt model params PROVIDER/MODEL` to list supported keys, and use persistent `[provider.params]` or `[provider."model".params]` config for defaults that should apply every run.

See [Local Models](./local-models.md) for offline model setup.

## History

Browse previous transcriptions. Use arrow keys to navigate, Enter to copy, Esc to exit.

```bash
ostt history                 # Interactive history browser
ostt history list            # List history
ostt history list --limit 10 # List recent entries
ostt history show 3          # Print history item #3
ostt history copy 3          # Copy history item #3
```

Alias: `ostt h`.

## Keyword

Manage keywords for improved transcription accuracy. Add technical terms, names, or domain-specific vocabulary.

```bash
ostt keyword                 # Interactive keyword manager
ostt keyword list            # List keywords
ostt keyword add Kubernetes  # Add a keyword
ostt keyword remove Kubernetes # Remove a keyword
```

Alias: `ostt k`.

## Replace

Manage deterministic, non-AI text replace rules for final transcript cleanup. Use replace for casing, acronyms, product names, and common misrecognitions after the model has already transcribed the audio.

```bash
ostt replace # Interactive replace manager
```

Replace rules are configured under `[text.replace]` in `~/.config/ostt/ostt.toml`:

```toml
[text.replace]
"ostt" = "OSTT"
"api" = "API"
"typescript" = "TypeScript"
"open ai" = "OpenAI"
```

Rules are literal, case-insensitive, word-boundary aware, provider-neutral, and applied before processing actions, output, and history saves.

Keywords and replace rules solve different problems:

- `ostt keyword` helps providers recognize terms during transcription.
- `ostt replace` fixes final text after transcription, provider-independently.

## Paste Output

Paste mode is an explicit output mode for sending the final transcript directly into the currently focused app:

```bash
ostt --paste
ostt launch --paste
ostt launch --paste -p clean
ostt transcribe voice.ogg --paste
ostt retry 2 --paste
ostt process clean --paste
```

It is mutually exclusive with clipboard and file output:

```bash
ostt --paste -c           # error: choose one output mode
ostt --paste -o notes.txt # error: choose one output mode
```

Paste uses the clipboard as transport: OSTT saves the current clipboard when possible, copies the final text, sends the configured paste shortcut, then restores the previous clipboard when enabled.

Defaults:

- macOS: `cmd+v`
- Omarchy: `shift+insert`
- other Linux desktops: `ctrl+v`

Configure paste under `[output.paste]`:

```toml
[output.paste]
paste_key = "ctrl+v"
restore_clipboard = true
restore_delay_ms = 750
post_popup_delay_ms = 1000
```

Linux does not have one universal paste shortcut. GUI apps usually accept `ctrl+v`; terminals often use `ctrl+shift+v`; Omarchy's `SUPER+v` binding sends `shift+insert` to the focused app. If paste works in one app class but not another, set `paste_key` for the workflow you bind to that hotkey.

On macOS, paste mode sends `cmd+v` with system automation. macOS may ask for Accessibility permission for the terminal app running OSTT, such as Ghostty. Approve it in System Settings > Privacy & Security > Accessibility.

## Config

Open `~/.config/ostt/ostt.toml` in your preferred editor.

```bash
ostt config              # Open config in editor
ostt config path         # Print config file path
ostt config list-devices # List audio input devices
```

Uses `$EDITOR` environment variable or falls back to nano/vim.

Alias: `ostt c`.

## Logs

Show the last 50 lines of the most recent log file. Useful for troubleshooting.

```bash
ostt logs        # Show recent logs
ostt logs path   # Print latest log file path
ostt logs follow # Follow latest log file
```

## Shell Completions

Generate shell completion scripts for tab completion of commands and options.

Install directly to the standard location for your shell:

```bash
ostt completions install bash            # requires sudo
ostt completions install zsh             # requires sudo
ostt completions install fish            # no sudo needed, uses ~/.config/fish
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
| `k` | keyword |
| `c` | config |
| `rp` | replay |

```bash
ostt r -c            # Same as: ostt record -c
ostt l -c            # Same as: ostt launch -c
ostt a               # Same as: ostt auth login
```
