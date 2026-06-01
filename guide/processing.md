---
description: Configure AI and bash processing actions to transform transcriptions. Run shell pipelines, invoke AI CLI tools, clean text, translate, or generate commands.
---

# Processing Actions

Processing actions transform transcription text after it has been created. They can run shell commands or call an AI CLI tool such as OpenCode, Claude Code, Gemini CLI, or Codex CLI.

Use processing when you want OSTT to produce the final text you intend to paste: cleaned dictation, a translated version, a generated command, release notes, an email draft, or any other transformation.

## Running Processing Actions

Process immediately after recording, retrying, or transcribing:

```bash
ostt -p clean -c
ostt retry -p clean -c
ostt transcribe meeting.mp3 -p clean -o cleaned.txt
```

Process an existing transcription from history:

```bash
ostt process              # Most recent, show action picker
ostt process clean        # Most recent, run "clean" directly
ostt process 3            # History item #3, show action picker
ostt process 3 clean -c   # History item #3, run "clean", copy to clipboard
```

The `process` subcommand follows the same positional convention as `retry` and `replay`: the first positional argument is the history index (when numeric) or the action ID (when non-numeric). Provide both to target a specific item and action.

If you pass `-p` without an action ID, OSTT shows an action picker. If there is only one configured action, OSTT skips the picker and runs it directly.

```bash
ostt -p              # Show picker after recording
ostt -p clean        # Run clean directly
ostt launch -c -p    # Popup recording, picker, copy result
```

If a processing action is cancelled from a recording flow, OSTT falls back to the raw transcription.

Processing follows the same output rules as transcription:

```bash
ostt -p clean              # Print processed output to stdout
ostt -p clean -c           # Copy processed output to clipboard
ostt -p clean -o clean.txt # Write processed output to file
```

List configured actions:

```bash
ostt process list
```

Each action has an `id` (used on the CLI) and a display `name` (shown in the picker).

## Configure Actions

Edit `~/.config/ostt/ostt.toml`:

```bash
ostt config
```

Actions are defined as named tables under `[process.actions]`. The table key becomes the action's `id`.

### Defaults

Set a default AI tool and model that all AI actions inherit:

```toml
[process]
default_tool = "opencode"
default_model = "anthropic/claude-sonnet-4-6"
```

Set `tool` or `model` on an individual AI action to override the defaults for that action.

### Action Types

Each action type uses its own set of keys:

| Type | Required keys | Optional keys |
| --- | --- | --- |
| `"ai"` | `name`, `type`, `inputs`, plus resolved `tool` and `model` | `tool`, `model`, `tool_binary`, `tool_args` |
| `"bash"` | `name`, `type`, `command` | — |

For AI actions, `tool` and `model` may come from the action itself or from `[process]` defaults. OSTT errors at startup if an AI action has no resolved tool or model.

## Bash Actions

Bash actions receive the transcription on stdin and return stdout as the processed result.

```toml
[process.actions.upper]
name = "UPPERCASE"
type = "bash"
command = "tr '[:lower:]' '[:upper:]'"
```

Run it:

```bash
ostt -p upper
ostt process upper
```

More bash examples:

```toml
[process.actions.wrap]
name = "Wrap at 72 columns"
type = "bash"
command = "fmt -w 72"

[process.actions.append_date]
name = "Append date"
type = "bash"
command = "awk '{print} END {print strftime(\"%Y-%m-%d\")}'"
```

## AI Actions

AI actions build a prompt from one or more input messages and pass it to a configured CLI tool.

Supported `tool` values:

| Tool | Binary |
| --- | --- |
| `opencode` | `opencode` |
| `claude-code` | `claude` |
| `gemini-cli` | `gemini` |
| `codex-cli` | `codex` |

The selected tool must already be installed and authenticated outside OSTT. OpenCode 1.4.3 or newer is required. AI tool invocations have a 300-second (5 minute) timeout.

### Input Sources

An AI action's `inputs` field is an array of inline tables. Each entry has a `role` (`"system"` or `"user"`) and exactly one content source.

Use the transcription:

```toml
inputs = [
  { role = "user", source = "transcription" },
]
```

Use your keyword list:

```toml
inputs = [
  { role = "user", source = "keywords" },
]
```

Use inline content:

```toml
inputs = [
  { role = "system", content = "You are a concise editor." },
]
```

Use a prompt file:

```toml
inputs = [
  { role = "system", file = "~/prompts/meeting-summary.md" },
]
```

Combine multiple inputs in any order:

```toml
inputs = [
  { role = "system", content = "You are a helpful assistant." },
  { role = "user", source = "keywords" },
  { role = "user", content = "The text to process:" },
  { role = "user", source = "transcription" },
]
```

If multiple content sources are given in a single entry, precedence is: `source` > `file` > `content`.

### Custom Tool Binary and Arguments

For AI actions, you can override the binary or append extra CLI arguments:

```toml
[process.actions.clean_local]
name = "Clean with custom opencode"
type = "ai"
tool_binary = "/usr/local/bin/opencode"
tool_args = ["--quiet"]
inputs = [
  { role = "system", content = "Clean up the transcript. Output only the cleaned text." },
  { role = "user", source = "transcription" },
]
```

Extra arguments are appended after OSTT's required arguments for the selected tool.

## Example: Clean Up Text

Removes filler words, fixes grammar, and improves phrasing while preserving meaning and tone.

```toml
[process.actions.clean]
name = "Clean up text"
type = "ai"
inputs = [
  { role = "system", content = "Clean up the following transcribed text. Remove filler words (uh, um, like), fix grammar, improve phrasing, and remove false starts or repetitions. Keep the original meaning and tone. Output only the cleaned text, nothing else." },
  { role = "user", source = "transcription" },
]
```

Run it from a popup hotkey:

```bash
ostt launch -c -p clean
```

## Example: Translate to Japanese

Translates transcription to natural Japanese, preserving technical terms and formatting.

```toml
[process.actions.japanese]
name = "Translate to Japanese"
type = "ai"
inputs = [
  { role = "system", content = "Translate the user's text into natural Japanese. Preserve meaning, tone, names, technical terms, URLs, code, numbers, and formatting. If the input is already Japanese, lightly clean it without changing meaning. Output only the Japanese text, nothing else." },
  { role = "user", source = "transcription" },
]
```

Run it on a transcription from history:

```bash
ostt process japanese
```

## Example: Generate a CLI Command

Converts a spoken description into executable shell command(s).

```toml
[process.actions.cmd]
name = "Generate CLI command"
type = "ai"
inputs = [
  { role = "system", content = "You are an Arch Linux zsh command generator, not an autonomous coding agent. Convert the user's spoken request into shell command(s) only. Do not inspect the repository. Do not claim you are locating, reading, patching, or changing files. Do not explain. Do not write prose. Do not output a plan. Do not invent filenames or paths unless the user explicitly named them. Use GNU coreutils conventions. If a requested tool is not installed by default, output a pacman install command followed by the command. Output only executable command text, one command per line. If the request is not a CLI command request, output: NO_COMMAND" },
  { role = "user", source = "transcription" },
]
```

Run it:

```bash
ostt -p cmd
```

Review generated commands before executing them. OSTT returns text; it does not run generated commands unless your configured action explicitly does so.

## Troubleshooting

If no actions appear, check the config:

```bash
ostt process list
ostt config
```

If an AI action fails, verify the external CLI works independently:

```bash
opencode --version
claude --version
gemini --version
codex --version
```

Use logs for details:

```bash
RUST_LOG=debug ostt -p clean
ostt logs
```
