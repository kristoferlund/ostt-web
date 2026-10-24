---
description: Make OSTT the dictation backend on Omarchy 4.5 with the OSTT dictation plugin. Hold a key, speak, and the text is pasted into the focused app, with optional context-aware dictation per app through your own AI agent.
---

# Omarchy Dictation

On Omarchy 4.5 or later, the [OSTT dictation plugin](https://github.com/kristoferlund/ostt-omarchy-dictate) makes OSTT the program behind Omarchy's own dictation keys. Hold a key and speak; OSTT transcribes with the model you chose, local or cloud, and pastes the text into the focused app. No terminal opens. The plugin installs OSTT for you, so you do not need the [installer](/guide/installation) first.

| Key | Action |
| --- | --- |
| Hold `Right Alt` or `F9` | Record while held, paste on release |
| `Super + Ctrl + X` | Start recording, or stop and paste |
| `Super + Ctrl + Alt + X` | Cancel without pasting |

In apps you choose, dictation can also take instructions. Say "reply saying I can't make it" in Slack, and an AI agent you already use writes the reply. See [Context-Aware Dictation](#context-aware-dictation).

## Install

Add the plugin:

```bash
omarchy plugin add https://github.com/kristoferlund/ostt-omarchy-dictate.git --enable
```

Then click the microphone that appears in the bar. The setup opens in a terminal and:

- installs OSTT if it is missing, with the Vulkan build (`ostt-vulkan-bin` from the AUR) where Vulkan works and `ostt-bin` otherwise, plus `ffmpeg`, `python`, `wtype` and `grim`;
- asks you to choose a transcription model if none is selected, and for a local model offers to keep it loaded with the [daemon](/guide/daemon) so dictation starts instantly;
- offers context-aware dictation;
- makes OSTT Omarchy's dictation backend.

Afterwards OSTT is listed in **Setup > Defaults > Dictation**. Selecting it there runs the setup again, to finish one you stopped or to change your answers.

On an NVIDIA GPU, `ostt-cuda-bin` is the faster build for local models, but it pulls in CUDA, which is several GB. See [GPU Acceleration](/guide/gpu-acceleration).

## Dictate

OSTT records from the default input device; pick it in Omarchy's audio settings. While you speak, a pill at the bottom of the screen shows your level between two buttons: ✕ cancels, and ✓ stops and transcribes. The pill never takes keyboard focus, so the text lands in the app you were typing in.

The microphone in the bar shows the state:

| State | Icon |
| --- | --- |
| Not set up | Microphone; click it to run the setup |
| Idle | Dimmed microphone |
| Recording | Microphone in the bar's alert color |
| Transcribing | Hourglass |
| Failed | Crossed-out microphone for 15 seconds; the tooltip has the error |

Left-click starts dictation, or stops it and pastes. Right-click cancels a recording or a pending transcription, and otherwise opens the per-app settings.

Dictated text is saved to `ostt history`. If a transcription fails, the recording is kept and the notification shows how to retry it.

## Context-Aware Dictation

In apps you choose, dictation goes through a [processing action](/guide/processing) that runs an AI agent you already use, such as Claude Code, Codex or OpenCode. The agent tidies up your words and carries out spoken instructions. If you allow it for that app, the agent also gets a screenshot of the window, so it can match names, terms and tone on screen. Every other app keeps plain transcription.

The agent runs with its tools switched off, so text on screen cannot make it run commands or touch files. `ostt agent list` shows the agents OSTT can run this way, which are installed, and which take images.

The setup adds two actions to `~/.config/ostt/ostt.toml`, using the agent and model you pick. Edit their prompts there:

- **Ghostwriter** (`ghostwriter`) tidies up your words and carries out spoken instructions.
- **Text cleanup** (`clean`) only fixes misheard words, punctuation and filler.

If you already have an action with one of those ids, the setup uses it as it is.

### Choose the Apps

Right-click the microphone in the bar. The card lists the apps on the visible workspaces, and any already set up. Expand a row to choose one of your processing actions for that app, and whether to send a screenshot. The screenshot is off unless you turn it on, and it is offered only for actions that can use it.

The choices are saved in `~/.config/ostt/dictate.toml` by Hyprland window class, which you can also edit by hand:

```toml
[apps]
"Slack" = { action = "ghostwriter", screenshot = true }
"obsidian" = { action = "clean" }
```

Any processing action works, including your own. A bash action gets the screenshot's path in `$OSTT_ATTACHMENT`.

### When the Agent Fails

The agent takes a few seconds, and the text is pasted into whichever window is focused when it finishes. `Super + Ctrl + Alt + X` cancels a dictation that is taking too long.

If the agent fails or runs past its time limit (60 seconds for the actions the setup adds), OSTT pastes your words as it heard them, and a notification says why. If an app's entry is wrong or the screenshot fails, that dictation falls back to plain transcription, also with a notification.

The screenshot is a capture of the window's area of the screen, so anything on top of it, such as a notification, is included. It is kept in `$XDG_RUNTIME_DIR/ostt-dictate`, readable only by you, until the dictation finishes.

## Update and Remove

Update the plugin:

```bash
omarchy plugin update io.github.kristoferlund.ostt-dictate --yes
```

Remove it:

```bash
~/.config/omarchy/plugins/io.github.kristoferlund.ostt-dictate/uninstall
omarchy plugin remove io.github.kristoferlund.ostt-dictate
```

`uninstall` switches dictation away from OSTT and removes the plugin's scripts. OSTT itself stays installed, and so do `~/.config/ostt/dictate.toml` and the `ghostwriter` and `clean` actions.

## The OSTT Popup on Omarchy

The plugin and the [installer's popup hotkeys](./hyprland.md) use different keys and can be used together: the plugin for dictating into apps, and `ALT+SPACE` or `ALT+SHIFT+SPACE` for the OSTT popup, clipboard output, or a spoken prompt to your default coding agent.

The [plugin's README](https://github.com/kristoferlund/ostt-omarchy-dictate#readme) covers the `ostt-dictate` command and the bar widget settings.
