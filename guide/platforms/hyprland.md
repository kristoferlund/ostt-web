---
description: Set up OSTT on Omarchy and Hyprland. The installer binds ALT+SPACE for clipboard dictation and ALT+SHIFT+SPACE for spoken prompts to your default coding agent, and adds the floating popup rule.
---

# Omarchy / Hyprland Setup

Omarchy is an Arch-based desktop built on Hyprland. There are two ways to use OSTT on it, and they work side by side:

- **The dictation plugin** (Omarchy 4.5 or later) makes OSTT the program behind Omarchy's own dictation keys. Hold a key, speak, and the text is pasted into the focused app, with no terminal. See [Omarchy Dictation](./omarchy-dictation.md).
- **The OSTT popup**, covered on this page, opens a small floating terminal from a hotkey on any workspace. It copies the transcript to the clipboard, or opens Omarchy's default coding agent with your spoken prompt.

## Install

```bash
curl -fsSL https://ostt.ai/install | bash
```

On Omarchy 4, the installer sets everything on this page up for you:

- `ALT+SPACE` records and copies the transcript to the clipboard (`ostt launch -c`).
- `ALT+SHIFT+SPACE` records, then opens Omarchy's default coding agent with the transcript as its prompt (`ostt launch -p agent`).
- A window rule keeps the popup floating, pinned, and near the bottom of every workspace.
- The `agent` processing action in `~/.config/ostt/ostt.toml` that hands the transcript to the agent.

It then reloads Hyprland. The changes are appended to `~/.config/hypr/bindings.lua`, `~/.config/hypr/hyprland.lua` and `ostt.toml`. Running the installer again changes nothing that is already there, and a hotkey you have already bound to something else is kept and reported. Pass `--no-omarchy-setup` to skip this part.

If you have not chosen a default coding agent yet, the installer says so. Choose one with:

```bash
omarchy agent --pick
```

OSTT also needs a transcription model. When none is active, the installer offers a small local Whisper model; [Choosing a Model](/guide/choosing-a-model) helps you pick a better one for your language and hardware:

```bash
ostt model
```

## Use the Hotkeys

1. Press `ALT+SPACE` to start dictating.
2. Press `ALT+SPACE` again, or `Enter` in the popup, to stop. OSTT copies the transcript to the clipboard.
3. Press `ALT+SHIFT+SPACE` to start a spoken coding prompt.
4. Press `ALT+SHIFT+SPACE` again, or `Enter` in the popup, to stop. The popup closes and Omarchy opens your default agent with the transcription as its prompt.

## Manual Setup

Set the popup up by hand when you installed OSTT from the AUR, ran the installer with `--no-omarchy-setup`, or want to change what it added. Omarchy 4 loads personal overrides from `~/.config/hypr/bindings.lua` and `~/.config/hypr/hyprland.lua`. Do not edit packaged Omarchy files under `/usr/share/omarchy`.

Add the processing action to `~/.config/ostt/ostt.toml`:

```toml
[process.actions.agent]
name = "Send to default agent"
type = "bash"
command = "setsid -f omarchy agent prompt \"$(cat)\" </dev/null >/dev/null 2>&1"
```

OSTT supplies the transcription on standard input; `$(cat)` passes it as one prompt to `omarchy agent prompt`. `setsid` and the stream redirections let the popup close immediately while Omarchy starts the agent in its normal terminal window.

Find OSTT's full path with `command -v ostt`, then add the bindings to `~/.config/hypr/bindings.lua`:

```lua
o.bind("ALT + SPACE", "OSTT", "/home/you/.local/bin/ostt launch -c")
o.bind("ALT + SHIFT + SPACE", "OSTT to default agent", "/home/you/.local/bin/ostt launch -p agent")
```

Use the full path. Hyprland hotkeys do not always inherit the shell `PATH`, including `~/.local/bin`.

Add the window rule after `require("default.hypr.omarchy")` in `~/.config/hypr/hyprland.lua`, so no catch-all rule overrides it:

```lua
-- Keep the OSTT popup floating, pinned, and near the bottom edge of every
-- workspace.
o.window({ title = "^ostt$" }, {
  float = true,
  move = { "((monitor_w*0.5)-(window_w*0.5))", "(monitor_h*0.85)" },
  pin = true,
})
```

The title rule matches Ghostty and kitty, which OSTT opens with the window title `ostt`. Alacritty and foot get the window class `ostt-popup` instead. If your popup terminal is one of those, match the class:

```lua
o.window({ class = "^ostt-popup$" }, {
  float = true,
  move = { "((monitor_w*0.5)-(window_w*0.5))", "(monitor_h*0.85)" },
  pin = true,
})
```

Apply the configuration:

```bash
hyprctl reload
hyprctl configerrors
```

## Output Options

Use these commands as the third argument to `o.bind(...)` for a different workflow. Replace `/path/to/ostt` with the output of `command -v ostt`.

```lua
-- Paste into the app you were typing in
o.bind("ALT + SPACE", "OSTT speech-to-text", "/path/to/ostt launch --paste")
-- Print to stdout
o.bind("ALT + SPACE", "OSTT speech-to-text", "/path/to/ostt launch")
-- Write to a file
o.bind("ALT + SPACE", "OSTT speech-to-text", "/path/to/ostt launch -o ~/transcription.txt")
-- Pick a processing action, then paste the result
o.bind("ALT + CTRL + SPACE", "OSTT process", "/path/to/ostt launch --paste -p")
```

### Paste Shortcut on Omarchy

Omarchy's `SUPER+V` universal paste binding sends `SHIFT+Insert` to the focused app. OSTT uses `shift+insert` as the default paste key on Omarchy for the same reason.

```toml
[output.paste]
paste_key = "shift+insert"
```

Do not set `paste_key = "super+v"`. `SUPER+V` is a Hyprland binding, not the shortcut most apps receive for paste.

## Popup Appearance

On Hyprland, use window rules to control popup placement; Wayland compositors can ignore a terminal's requested coordinates. Change the rule's `move` values for a different position. Terminal, size, font size, and borders are set in `~/.config/ostt/ostt.toml`:

```toml
[popup]
terminal = "ghostty"
width = 90
height = 15
font_size = 6
borderless = true
```

## Troubleshooting

Run the popup from a terminal to see any error:

```bash
ostt launch -c
ostt launch --paste
```

Check the Hyprland configuration after editing it:

```bash
hyprctl reload
hyprctl configerrors
```

If the popup appears in the wrong position, make sure the OSTT window rule comes after `require("default.hypr.omarchy")` and any catch-all rules in `hyprland.lua`.
