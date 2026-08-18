---
description: Set up OSTT as a floating popup on Omarchy or Hyprland. Add a keybinding and window rules to launch voice-to-text from any Hyprland workspace.
---

# Omarchy / Hyprland Setup

Omarchy is an Arch-based desktop built on Hyprland. OSTT works well as a floating voice-to-text popup triggered by a Hyprland keybinding.

## Install OSTT

```bash
curl -fsSL https://ostt.ai/install | bash
ostt auth
```

Prefer the Arch package route? Use an AUR helper:

```bash
paru -S ostt
# or
yay -S ostt
```

`pacman` does not install AUR packages directly unless you build them manually.

## Omarchy 4.x (Lua)

Omarchy 4.x loads personal overrides from `~/.config/hypr/bindings.lua` and `~/.config/hypr/hyprland.lua`. Use this format when those files exist. Do not edit packaged Omarchy files under `/usr/share/omarchy`.

### Keybinding

Add the binding to `~/.config/hypr/bindings.lua`. Use the full path to the OSTT binary -- find it with `command -v ostt`:

```lua
-- OSTT speech-to-text hotkey, paste into focused app
o.bind("ALT + SPACE", "OSTT speech-to-text", "/home/you/.local/bin/ostt launch --paste")
```

Use `launch -c` instead if you want clipboard output and manual paste.

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

## Omarchy 3.x And Hyprland (`.conf`)

Omarchy 3.x remains a supported release and uses Hyprlang `.conf` files. Use this format when your installation does not load the Lua files above. Do not configure the same hotkey in both formats.

### Keybinding

Add the binding to `~/.config/hypr/bindings.conf`. Use the full path to the OSTT binary -- find it with `which ostt`:

```text
# OSTT speech-to-text hotkey, paste into focused app
bindd = ALT, SPACE, ostt, exec, /home/you/.local/bin/ostt launch --paste
```

Use `launch -c` instead if you want clipboard output and manual paste.

### Window Rules

Add window rules to `~/.config/hypr/hyprland.conf`:

```text
# OSTT window overrides
windowrule = float on, match:title ostt
windowrule = move ((monitor_w*0.5)-(window_w*0.5)) (monitor_h*0.85), match:title ostt
windowrule = pin on, match:title ostt
```

### Apply the configuration

```bash
hyprctl reload
hyprctl configerrors
```

## Usage

1. Press `Alt+Space` to open the popup and start recording.
2. Speak.
3. Press `Alt+Space` again, or press `Enter` in the popup, to stop recording and transcribe.
4. With `--paste`, OSTT inserts the text into the app that regains focus after the popup closes.

On Hyprland, OSTT waits for the previous app to regain focus before sending the paste shortcut.

## Output Options

For Omarchy 4.x, use these commands as the third argument to `o.bind(...)`:

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

For an Omarchy 4.x installation, change the `move` values in the `o.window(...)` rule above. For Omarchy 3.x and other `.conf` installations, use these move rules instead:

```text
# Centered horizontally near the bottom
windowrule = move ((monitor_w*0.5)-(window_w*0.5)) (monitor_h*0.85), match:title ostt

# Centered on screen
windowrule = move ((monitor_w*0.5)-(window_w*0.5)) ((monitor_h*0.5)-(window_h*0.5)), match:title ostt
```

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

If the popup appears in the wrong position, make sure the OSTT window rules are placed after any catch-all rules that might override them. In Omarchy 4.x, add the Lua rule after `require("default.hypr.omarchy")` in `hyprland.lua`.
