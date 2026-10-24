---
description: Configure AI and bash processing actions to transform transcriptions. Run shell pipelines, or the Claude Code, Codex, OpenCode, Gemini CLI or other agent you already use, with its tools switched off, to clean text, translate, or follow spoken instructions with a screenshot as context.
---

# Processing Actions

Processing actions transform transcription text after it has been created. They can run shell commands, or an AI agent you already use, such as Claude Code, Codex, OpenCode or Gemini CLI, signed in as you and with its tools switched off.

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

The first argument is a history index when numeric, otherwise an action ID. Pass both to pick the item and the action.

If you pass `-p` without an action ID, OSTT shows the action picker.

```bash
ostt -p              # Show picker after recording
ostt -p clean        # Run clean directly
ostt launch -c -p    # Popup recording, picker, copy result
```

If a processing action is cancelled from a recording flow, OSTT falls back to the raw transcription.

If a processing action fails while recording, transcribing or retrying, OSTT outputs the unprocessed transcription instead, so the words are not lost, and exits with status 3. `ostt process` reports the failure instead; the text is still in `ostt history`.

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

Each action has an `id` (used on the CLI), a display `name` (shown in the picker) and an optional one-line `description`, shown under the name in the picker and in `ostt process list --format json`.

### Attach an Image

`--attach <image>` sends an image to the action along with the text. It works wherever `--process` does, and with `ostt process`:

```bash
ostt transcribe rec.wav -p assistant --attach window.png
ostt process 1 assistant --attach window.png
```

AI actions send it to their agent, if the agent takes images (see [Agents](#agents)); bash actions get its path in `$OSTT_ATTACHMENT`. PNG, JPEG, GIF and WebP work. The [Omarchy dictation plugin](/omarchy) uses this to send a screenshot of the window you are dictating into.

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
| `"ai"` | `name`, `type`, `inputs`, plus resolved `tool` and `model` | `description`, `tool`, `model`, `tool_binary`, `tool_args`, `timeout_secs` |
| `"bash"` | `name`, `type`, `command` | `description` |

For AI actions, `tool` and `model` may come from the action itself or from `[process]` defaults. OSTT errors at startup if an AI action has no resolved tool or model.

## Bash Actions

Bash actions receive the transcription on stdin and return stdout as the processed result. Commands run with `sh -c` and time out after 30 seconds.

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

AI actions build a prompt from one or more input messages and pass it to an agent's command-line tool. The agent must already be installed and signed in; OSTT uses your existing subscription and needs no API key of its own.

```toml
[process.actions.clean]
name = "Text cleanup"
description = "Fixes misheard words, punctuation and filler"
type = "ai"
tool = "claude-code"
model = "haiku"
timeout_secs = 60
inputs = [
  { role = "system", content = "Fix misheard words, punctuation and filler. Output only the text." },
  { role = "user", source = "transcription" },
]
```

An AI action may take `timeout_secs` seconds, 300 by default. A slow or hung agent is stopped, together with any processes it started.

### Agents

`tool` names the agent. These are built in:

| `tool` | Agent | Takes images |
| --- | --- | --- |
| `claude-code` | Claude Code | yes |
| `codex-cli` | Codex | yes |
| `opencode` | OpenCode (2.0 or later) | yes |
| `gemini-cli` | Gemini CLI | yes |
| `pi` | Pi | yes |
| `oh-my-pi` | Oh My Pi | yes |
| `hermes` | Hermes | no |
| `copilot` | GitHub Copilot | yes |
| `grok` | Grok | no |
| `cursor` | Cursor | no |
| `openclaw` | OpenClaw | no |

List them, with which are installed, and an agent's models:

```bash
ostt agent list
ostt agent models claude-code
```

Every built-in agent runs with all of its tools switched off, in a new empty working directory. A transcript or a screenshot can contain text written by someone else, and that text must not be able to make the agent run commands or read and change your files. How each agent is run is data, in OSTT's [`agents.toml`](https://github.com/kristoferlund/ostt/blob/main/src/config/agents.toml), with notes on how each one was checked.

### Add or Replace an Agent

`[process.agents.<id>]` adds an agent, or replaces a built-in one with the same id:

```toml
[process.agents.llm]
name = "llm"
command = ["llm", "-m", "{model}"]

[process.actions.tidy]
name = "Tidy"
type = "ai"
tool = "llm"
model = "gpt-4o-mini"
inputs = [{ role = "user", source = "transcription" }]
```

OSTT writes the prompt to the program's stdin and reads the answer from its stdout. In `command`, `{model}` is the action's model, `{workdir}` the agent's empty working directory, and `{prompt}` the prompt, for a program that takes it as an argument instead. `image_args` (arguments with an `{image}` path) or `image_prompt` (text added to the prompt) let it take an image; `env` and `files` set environment variables and write files into the working directory before it runs. Switching off the agent's tools is up to you for an agent you add.

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

### Custom Program and Arguments

For AI actions, you can run the agent from another path or append extra arguments:

```toml
[process.actions.clean_local]
name = "Clean with custom opencode"
type = "ai"
tool = "opencode"
model = "anthropic/claude-sonnet-4-6"
tool_binary = "/usr/local/bin/opencode"
tool_args = ["--print-logs"]
inputs = [
  { role = "system", content = "Clean up the transcript. Output only the cleaned text." },
  { role = "user", source = "transcription" },
]
```

Extra arguments are appended after the agent's own. They run in the agent's empty working directory, so relative paths don't point into your project.

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

If an AI action fails, check that OSTT finds the agent, and that the agent works and is signed in on its own:

```bash
ostt agent list
claude -p "Say hi"
```

The error OSTT prints includes the agent's own message, such as a sign-in prompt or an unknown model.

Use logs for details:

```bash
RUST_LOG=debug ostt -p clean
ostt logs
```
