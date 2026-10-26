---
description: How OSTT runs each AI agent for processing actions, with its tools switched off, and the trade-offs per agent. Claude Code, Codex, OpenCode, Gemini CLI, Pi, Oh My Pi, Hermes, GitHub Copilot, Grok, Cursor and OpenClaw.
---

# Agents

An AI [processing action](/guide/processing) runs an agent CLI you already use and are signed in to. OSTT starts it without a session, gives it the prompt, and pastes or prints its answer. The action's `tool` names the agent.

Every built-in agent runs with all of its tools switched off. A transcript or a screenshot can contain text written by someone else, and that text must not be able to make the agent run commands or read and change your files. How each agent is run is data, in OSTT's [`agents.toml`](https://github.com/kristoferlund/ostt/blob/main/src/config/agents.toml).

## Overview

| `tool` | Agent | Prompt | Images | Model list | Tested |
| --- | --- | --- | --- | --- | --- |
| `claude-code` | Claude Code | stdin | yes | `haiku`, `sonnet`, `opus` | run |
| `codex-cli` | Codex | stdin | yes | type the name | run |
| `opencode` | OpenCode 2.0 or later | stdin | yes | `opencode models` | run |
| `gemini-cli` | Gemini CLI | stdin | yes | type the name | run |
| `pi` | Pi | stdin | yes | type the name | run against a test server |
| `oh-my-pi` | Oh My Pi | stdin | yes | type the name | run against a test server |
| `hermes` | Hermes | stdin | no | type the name | run |
| `copilot` | GitHub Copilot | argument | yes | type the name | run |
| `grok` | Grok | stdin | no | `grok models` | run |
| `cursor` | Cursor | stdin | no | `cursor-agent models` | run |
| `openclaw` | OpenClaw | stdin | no | type the name | from its documentation |

- **Prompt.** Most agents read the prompt from stdin. GitHub Copilot takes it as a command-line argument, which other users on the same computer can read (in `/proc`) while it runs, and which is limited to 128 KB.
- **Images.** An agent with images receives the screenshot or `--attach` file. Asking an agent without images to take one is an error.
- **Model list.** `ostt agent models <tool>` prints the models OSTT can offer when you set up an action. For the others, use the model name the agent itself takes.
- **Tested.** "Run" means the agent was run through OSTT with a text prompt, an image where it takes one, and an attempt to make it create a file and read `/etc/hostname`, which it could not. Pi and Oh My Pi were run against a test server instead of a live model. OpenClaw was configured from its documentation and has not been run.

`ostt agent list` shows which agents are installed. `--format json` adds `images` and `prompt_in_args` for each.

## How Every Agent Runs

- In a new empty working directory, which is removed when it finishes. Files an agent needs, such as a policy file, are written there first, and so is the image.
- With `TERM=dumb` and `NO_COLOR=1`, so its answer has no terminal colours.
- With the action's `timeout_secs`, 300 seconds by default. An agent past its time limit is stopped, together with any processes it started.
- The prompt is the action's system instructions followed by your text in `<text>` tags, which the agent is told to treat as data.

If the agent fails or times out, `record`, `transcribe` and `retry` output your words as they were transcribed, and exit with status 3.

## Per Agent

### Claude Code

Runs `claude -p` with no session persistence. The prompt and the image go in as one stream-json message on stdin, and OSTT reads the answer from the stream-json output, so a failure shows Claude's reason. `--tools ""` removes every built-in tool, an empty strict MCP config removes MCP servers, and slash commands are disabled.

### Codex

Runs `codex exec` as an ephemeral session with a read-only sandbox. Codex has no single switch for tools, so every feature that provides one is disabled, and web search is off. What the model can still call: a JavaScript runtime with no file system or network, whose file edits the read-only sandbox stops; the clock; and sub-agents with the same settings.

`--ignore-user-config` and `--ignore-rules` keep your Codex configuration out, so `model_provider` and profiles in `~/.codex/config.toml` do not apply. To use them, replace the agent in `[process.agents.codex-cli]`.

### OpenCode

Needs OpenCode 2.0 or later. Runs `opencode run --standalone` with an agent, defined in `OPENCODE_CONFIG_CONTENT`, that denies every permission. `--standalone` keeps it from using an OpenCode server you have running.

### Gemini CLI

Runs `gemini -p` with a policy file that denies every tool and every MCP tool. The image is attached by an `@path` in the prompt, which the CLI reads itself rather than through a tool. An `@path` in your dictated text is read the same way, but only inside the working directory, which holds just the policy and the image.

### Pi and Oh My Pi

Run with `--no-tools`, and without sessions, extensions, skills or context files. For Oh My Pi, `--no-tools` keeps MCP tools, so a config file in the working directory also turns off MCP and every source of extensions and context.

### Hermes

Runs `hermes chat` with the `bot_room` toolset, which has no tools and keeps MCP servers out. Text only: whether Hermes sends an image to the model depends on your Hermes config, and otherwise it silently replaces it with a description.

### GitHub Copilot

Runs `copilot -p` with the prompt as an argument. Copilot reads a piped prompt only without `-p`, and without `-p` it refuses `-s`, so the answer would come after a list of the disabled tools. `--available-tools=ask_user` leaves the model only that tool, which `--no-ask-user` then disables. Deny rules cover the rest; non-interactive mode requires `--allow-all-tools`, and the deny rules win over it. Built-in MCP servers and custom instructions are off.

Because the prompt is visible to other local users, the [Omarchy dictation](/guide/platforms/omarchy-dictation) setup does not offer Copilot.

### Grok

Runs `grok --prompt-file /dev/stdin`. A deny rule for every tool (`--deny "*"`), with sub-agents, planning and web search off, and the strict sandbox, which limits reads to the working directory and system paths. Text only: Grok takes images only as base64 in an argument.

### Cursor

Runs `cursor-agent -p` in ask mode, which is read-only, in its sandbox, with the working directory as its workspace. A project permissions file there denies every tool kind, MCP included. Text only: Cursor reads images through its file tool, which is denied.

### OpenClaw

Runs `openclaw agent exec`, which takes one turn in a temporary state directory and prints only the answer. A deny list covers every tool, and plugin tools, which include MCP servers. Text only: OpenClaw has no documented way to attach an image. Configured from docs.openclaw.ai and not yet run.

## Not Included

- **Crush.** `crush run` approves every tool, and switching off all MCP servers also drops your credentials.
- **Muse Code.** Its headless mode has no official documentation.

## Add or Replace an Agent

`[process.agents.<id>]` in `ostt.toml` adds an agent, or replaces a built-in one with the same id. See [Processing Actions](/guide/processing#add-or-replace-an-agent) for the fields. Switching off the tools of an agent you add is up to you.
