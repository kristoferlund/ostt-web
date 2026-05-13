# Processing Actions

Processing actions transform transcription text after it has been created. They can run shell commands or call an AI CLI tool such as OpenCode, Claude Code, Gemini CLI, or Codex CLI.

Use processing when you want OSTT to produce the final text you intend to paste: cleaned dictation, a translated version, a generated command, release notes, an email draft, or any other transformation.

## Two Ways to Process

Process immediately after recording, retrying, or transcribing:

```bash
ostt -p clean -c
ostt retry -p clean -c
ostt transcribe meeting.mp3 -p summary -o summary.txt
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

## List Actions

```bash
ostt process --list
```

Each action has an `id` (used on the CLI) and a display `name` (shown in the picker).

## Output Rules

Processing follows the same output rules as transcription:

```bash
ostt -p clean              # Print processed output to stdout
ostt -p clean -c           # Copy processed output to clipboard
ostt -p clean -o clean.txt # Write processed output to file
```

If a processing action is cancelled from a recording flow, OSTT falls back to the raw transcription.

## Configure Actions

Edit `~/.config/ostt/ostt.toml`:

```bash
ostt config
```

Actions are defined as named tables under `[process.actions]`. The table key becomes the action's `id`. AI actions can inherit `tool` and `model` from `[process]` defaults:

```toml
[process]
default_tool = "opencode"
default_model = "anthropic/claude-sonnet-4-6"

[process.actions.clean]
name = "Clean up text"
type = "ai"
inputs = [
  { role = "system", content = "Clean up the transcript. Remove filler words, fix grammar, and preserve meaning. Output only the cleaned text." },
  { role = "user", source = "transcription" },
]
```

Set `tool` or `model` on an individual AI action only when you want to override the defaults.

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

## Input Sources

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

## Example: Translate to English

```toml
[process.actions.translate_en]
name = "Translate to English"
type = "ai"
inputs = [
  { role = "system", content = "Translate the user's transcript to natural English. Keep names and technical terms intact. Output only the translation." },
  { role = "user", source = "transcription" },
]
```

Run it from a popup hotkey:

```bash
ostt launch -c -p translate_en
```

## Example: Meeting Summary

```toml
[process.actions.summary]
name = "Meeting summary"
type = "ai"
inputs = [
  { role = "system", content = "Summarize the transcript into decisions, action items, and open questions. Use concise bullets." },
  { role = "user", source = "transcription" },
]
```

Run it on an audio file:

```bash
ostt transcribe meeting.mp3 -p summary -o meeting-summary.md
```

## Example: Generate a CLI Command

```toml
[process.actions.cmd]
name = "Generate CLI command"
type = "ai"
inputs = [
  { role = "system", content = "The user described a task via voice. Generate the exact CLI command to accomplish it. Output only the command, no markdown and no explanation." },
  { role = "user", source = "transcription" },
]
```

Run it:

```bash
ostt -p cmd
```

Review generated commands before executing them. OSTT returns text; it does not run generated commands unless your configured action explicitly does so.

## Custom Tool Binary and Arguments

For AI actions, you can override the binary or append extra CLI arguments.

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

If you need this action to use a different model or tool than the `[process]` defaults, add `tool = "..."` and/or `model = "..."` to the action.

## Troubleshooting Processing

If no actions appear, check the config:

```bash
ostt process --list
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
