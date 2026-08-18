---
description: Configure OSTT on Omarchy with hotkeys for clipboard dictation and opening your default coding agent with a spoken prompt.
---

# Omarchy / Hyprland Setup

Omarchy is an Arch-based desktop built on Hyprland. Use OSTT as a floating voice-to-text popup from any workspace, either to copy a transcript to the clipboard or to open Omarchy's default coding agent with your spoken prompt.

## Install OSTT

```bash
curl -fsSL https://ostt.ai/install | bash
```

On Omarchy 4, the installer configures the two recommended hotkeys, the floating popup rule, and the default-agent processing action. Its final message reminds you to configure a transcription model when one is still needed.

Prefer the Arch package route? Use an AUR helper:

```bash
paru -S ostt
# or
yay -S ostt
```

`pacman` does not install AUR packages directly unless you build them manually.

## Omarchy 4.x

Omarchy 4.x loads personal overrides from `~/.config/hypr/bindings.lua` and `~/.config/hypr/hyprland.lua`. Use this format when those files exist. Do not edit packaged Omarchy files under `/usr/share/omarchy`.

### Clipboard Dictation And Default Agent

The recommended setup uses two hotkeys:

- `ALT+SPACE` records and copies the raw transcript to the clipboard.
- `ALT+SHIFT+SPACE` records, transcribes, then opens Omarchy's selected coding agent with the transcript as its initial prompt.

The one-line installer adds this configuration automatically. Use the manual steps below when you installed OSTT through the AUR, opted out with `--no-omarchy-setup`, or want to inspect the setup.

First, choose a default agent:

```bash
omarchy agent --pick
```

Then add this processing action to `~/.config/ostt/ostt.toml`:

```toml
[process.actions.agent]
name = "Send to default agent"
type = "bash"
command = "setsid -f omarchy agent prompt \"$(cat)\" </dev/null >/dev/null 2>&1"
```

OSTT supplies the transcription on standard input; `$(cat)` passes it as one prompt to `omarchy agent prompt`. `setsid` and the stream redirections let the OSTT popup close immediately while Omarchy starts the agent in its normal terminal window.

Find OSTT's full path with `command -v ostt`, then add these bindings to `~/.config/hypr/bindings.lua`:

```lua
o.bind("ALT + SPACE", "OSTT", "/home/you/.local/bin/ostt launch -c")
o.bind("ALT + SHIFT + SPACE", "OSTT to default agent", "/home/you/.local/bin/ostt launch -p agent")
```

Use the full OSTT path. Hyprland hotkeys do not always inherit the shell `PATH`, including `~/.local/bin`.

### Use The Hotkeys

1. Press `ALT+SPACE` to start dictating.
2. Press `ALT+SPACE` again, or `Enter` in the popup, to stop. OSTT copies the transcript to the clipboard.
3. Press `ALT+SHIFT+SPACE` to start a spoken coding prompt.
4. Press `ALT+SHIFT+SPACE` again, or `Enter` in the popup, to stop. The OSTT popup closes and Omarchy opens your default agent with the transcription as its prompt.

### Select A Transcription Model

OSTT needs an active model before either hotkey can transcribe. When no model is selected, the installer tells you to run:

```bash
ostt model
```

Local models can be selected and downloaded directly. For a cloud model, authenticate first, then reopen the selector:

```bash
ostt auth login
ostt model
```

### Window Rules

Add this rule after the default imports in `~/.config/hypr/hyprland.lua`:

```lua
-- OSTT names every popup window "ostt". Keep it floating, pinned, and near
-- the bottom edge of every workspace.
o.window({ title = "^ostt$" }, {
  float = true,
  move = { "((monitor_w*0.5)-(window_w*0.5))", "(monitor_h*0.85)" },
  pin = true,
})
```

`pin = true` keeps the floating popup visible when switching workspaces.

### Apply the configuration

```bash
hyprctl reload
hyprctl configerrors
```

## Output Options

Use these commands as the third argument to `o.bind(...)` when you need a different workflow:

Paste output:

```lua
o.bind("ALT + SPACE", "OSTT speech-to-text", "/path/to/ostt launch --paste")
```

Clipboard output:

```lua
o.bind("ALT + SPACE", "OSTT speech-to-text", "/path/to/ostt launch -c")
```

Stdout output:

```lua
o.bind("ALT + SPACE", "OSTT speech-to-text", "/path/to/ostt launch")
```

File output:

```lua
o.bind("ALT + SPACE", "OSTT speech-to-text", "/path/to/ostt launch -o ~/transcription.txt")
```

Processing output:

```lua
o.bind("ALT + CTRL + SPACE", "OSTT process", "/path/to/ostt launch --paste -p")
```

Replace `/path/to/ostt` with the output of `command -v ostt`.

### Paste Shortcut On Omarchy

Omarchy's `SUPER+V` universal paste binding sends `SHIFT+Insert` to the focused app. OSTT uses `shift+insert` as the default paste key on Omarchy for the same reason.

```toml
[output.paste]
paste_key = "shift+insert"
```

Do not set `paste_key = "super+v"` for this workflow. `SUPER+V` is a Hyprland binding, not the shortcut most apps receive for paste.

## Popup Appearance

On Hyprland, use window rules to reliably control popup placement; Wayland compositors can ignore a terminal's requested coordinates. Terminal selection, size, font size, and borderless behavior are configured in `~/.config/ostt/ostt.toml`:

```toml
[popup]
terminal = "ghostty"
width = 90
height = 15
font_size = 6
borderless = true
```

The `o.window(...)` configuration above keeps the popup floating, centered near the bottom of the current monitor, and visible across workspaces. Change its `move` values when you want a different position.

## Troubleshooting

Test launch directly:

```bash
ostt launch -c
```

Test paste directly:

```bash
ostt launch --paste
```

Reload Hyprland config:

```bash
hyprctl reload
```

If the popup appears in the wrong position, make sure the OSTT window rules are placed after any catch-all rules that might override them. Add the Lua rule after `require("default.hypr.omarchy")` in `hyprland.lua`.

## Omarchy 3.x And Hyprland (`.conf`)

Omarchy 3.x remains supported and uses Hyprlang `.conf` files. Use this legacy format only when your installation does not load the Lua files above. Do not configure the same hotkey in both formats.

Add a basic dictation binding to `~/.config/hypr/bindings.conf`:

```text
bindd = ALT, SPACE, OSTT speech-to-text, exec, /home/you/.local/bin/ostt launch --paste
```

Use `launch -c` instead of `launch --paste` for clipboard output and manual paste. Add window rules to `~/.config/hypr/hyprland.conf`:

```text
windowrule = float on, match:title ostt
windowrule = move ((monitor_w*0.5)-(window_w*0.5)) (monitor_h*0.85), match:title ostt
windowrule = pin on, match:title ostt
```

Apply either configuration with:

```bash
hyprctl reload
hyprctl configerrors
```
