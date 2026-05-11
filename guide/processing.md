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
ostt process
ostt process 3
ostt process -a clean -c
```

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

Each action has an `id` and a display `name`. The `id` is what you pass to `-p` or `--action`.

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

Actions live under `[[process.actions]]`.

```toml
[[process.actions]]
id = "clean"
name = "Clean up text"
type = "ai"
tool = "opencode"
model = "anthropic/claude-sonnet-4-6"

[[process.actions.inputs]]
role = "system"
content = "Clean up the transcript. Remove filler words, fix grammar, and preserve meaning. Output only the cleaned text."

[[process.actions.inputs]]
role = "user"
source = "transcription"
```

## Bash Actions

Bash actions receive the transcription on stdin and return stdout as the processed result.

```toml
[[process.actions]]
id = "upper"
name = "UPPERCASE"
type = "bash"
command = "tr '[:lower:]' '[:upper:]'"
```

Run it:

```bash
ostt -p upper
ostt process -a upper -c
```

More bash examples:

```toml
[[process.actions]]
id = "wrap"
name = "Wrap at 72 columns"
type = "bash"
command = "fmt -w 72"

[[process.actions]]
id = "append-date"
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

Each AI input has a `role` and exactly one content source.

Use the transcription:

```toml
[[process.actions.inputs]]
role = "user"
source = "transcription"
```

Use your keyword list:

```toml
[[process.actions.inputs]]
role = "user"
source = "keywords"
```

Use inline content:

```toml
[[process.actions.inputs]]
role = "system"
content = "You are a concise editor."
```

Use a prompt file:

```toml
[[process.actions.inputs]]
role = "system"
file = "~/prompts/meeting-summary.md"
```

## Example: Translate to English

```toml
[[process.actions]]
id = "translate-en"
name = "Translate to English"
type = "ai"
tool = "opencode"
model = "anthropic/claude-sonnet-4-6"

[[process.actions.inputs]]
role = "system"
content = "Translate the user's transcript to natural English. Keep names and technical terms intact. Output only the translation."

[[process.actions.inputs]]
role = "user"
source = "transcription"
```

Run it from a popup hotkey:

```bash
ostt launch -c -p translate-en
```

## Example: Meeting Summary

```toml
[[process.actions]]
id = "summary"
name = "Meeting summary"
type = "ai"
tool = "opencode"
model = "anthropic/claude-sonnet-4-6"

[[process.actions.inputs]]
role = "system"
content = "Summarize the transcript into decisions, action items, and open questions. Use concise bullets."

[[process.actions.inputs]]
role = "user"
source = "transcription"
```

Run it on an audio file:

```bash
ostt transcribe meeting.mp3 -p summary -o meeting-summary.md
```

## Example: Generate a CLI Command

```toml
[[process.actions]]
id = "cmd"
name = "Generate CLI command"
type = "ai"
tool = "opencode"
model = "anthropic/claude-sonnet-4-6"

[[process.actions.inputs]]
role = "system"
content = "The user described a task via voice. Generate the exact CLI command to accomplish it. Output only the command, no markdown and no explanation."

[[process.actions.inputs]]
role = "user"
source = "transcription"
```

Run it:

```bash
ostt -p cmd
```

Review generated commands before executing them. OSTT returns text; it does not run generated commands unless your configured action explicitly does so.

## Custom Tool Binary and Arguments

For AI actions, you can override the binary or append extra CLI arguments.

```toml
[[process.actions]]
id = "clean-local"
name = "Clean with custom opencode"
type = "ai"
tool = "opencode"
tool_binary = "/usr/local/bin/opencode"
tool_args = ["--quiet"]
model = "anthropic/claude-sonnet-4-6"

[[process.actions.inputs]]
role = "system"
content = "Clean up the transcript. Output only the cleaned text."

[[process.actions.inputs]]
role = "user"
source = "transcription"
```

Extra arguments are appended after OSTT's required arguments for the selected tool.

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
