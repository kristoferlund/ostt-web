---
description: Install and use OSTT through an AI coding agent. Add the official OSTT agent skill with one npx command and let Claude Code or other skill-aware tools install, configure, and troubleshoot OSTT for you.
---

# Install with an AI Agent

OSTT ships an official **agent skill** &mdash; a single instruction file that teaches AI coding agents how to install, configure, and troubleshoot OSTT. Instead of following these docs by hand, you can let your agent do the work.

## What is an agent skill?

A skill is a portable instruction file (`SKILL.md`) in the open [skills](https://skills.sh) ecosystem. When you add it to a skill-aware agent (such as [Claude Code](https://claude.com/claude-code)), the agent gains OSTT-specific knowledge: installation steps, provider and model setup, hotkey configuration, processing actions, local models, and troubleshooting. The agent can then give you accurate commands and run them for you.

You do not need to know anything about the skills system to use it &mdash; the one command below is all it takes.

## Add the skill

The skill is distributed with the `skills` CLI from Vercel Labs. There is **nothing to install first**: `npx` downloads and runs the CLI on demand.

```bash
npx skills add https://github.com/kristoferlund/ostt-skill
```

This installs the OSTT skill into the skills directory of every skill-aware agent `npx skills` detects on your machine. The first time you run it, `npx` will ask to download the `skills` package &mdash; accept, and it handles the rest.

## Use it

Once the skill is added, talk to your agent in plain language. For example:

- "Install OSTT and set up Deepgram as the provider."
- "Bind OSTT to `Alt+Space` on Hyprland with paste output."
- "Upgrade my Omarchy 3.x OSTT hotkey and popup rules to the Omarchy 4.x Lua config."
- "OSTT says `command not found` after install &mdash; fix my PATH."
- "Download a local Whisper model and run it with GPU acceleration."
- "Add a processing action that cleans up filler words."

The agent uses the skill to respond with correct OSTT commands and configuration, and can apply them for you.

## Keeping it up to date

Re-run the same command to pull the latest version of the skill:

```bash
npx skills add https://github.com/kristoferlund/ostt-skill
```

## Source

The skill is open source. Browse or contribute at [github.com/kristoferlund/ostt-skill](https://github.com/kristoferlund/ostt-skill). For the `skills` CLI itself &mdash; supported agents, options, and how the ecosystem works &mdash; see [skills.sh](https://skills.sh).
