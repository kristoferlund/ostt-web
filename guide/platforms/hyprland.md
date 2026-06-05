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

## Keybinding

Add the binding to `~/.config/hypr/bindings.conf`. Use the full path to the OSTT binary -- find it with `which ostt`:

```text
# OSTT speech-to-text hotkey, paste into focused app
bindd = ALT, SPACE, ostt, exec, /home/you/.local/bin/ostt launch --paste
```

Use `launch -c` instead if you want clipboard output and manual paste.

## Window Rules

Add window rules to `~/.config/hypr/hyprland.conf`:

```text
# OSTT window overrides
windowrule = float on, match:title ostt
windowrule = move ((monitor_w*0.5)-(window_w*0.5)) (monitor_h*0.85), match:title ostt
```

Reload Hyprland:

```bash
hyprctl reload
```

## Usage

1. Press `Alt+Space` to open the popup and start recording.
2. Speak.
3. Press `Alt+Space` again, or press `Enter` in the popup, to stop recording and transcribe.
4. With `--paste`, OSTT inserts the text into the app that regains focus after the popup closes.

On Hyprland, OSTT waits for the previous app to regain focus before sending the paste shortcut.

## Output Options

Paste output:

```text
bindd = ALT, SPACE, ostt, exec, /path/to/ostt launch --paste
```

Clipboard output:

```text
bindd = ALT, SPACE, ostt, exec, /path/to/ostt launch -c
```

Stdout output:

```text
bindd = ALT, SPACE, ostt, exec, /path/to/ostt launch
```

File output:

```text
bindd = ALT, SPACE, ostt, exec, /path/to/ostt launch -o ~/transcription.txt
```

Processing output:

```text
bindd = ALT CTRL, SPACE, ostt process, exec, /path/to/ostt launch --paste -p
```

Replace `/path/to/ostt` with the output of `which ostt`.

### Paste Shortcut On Omarchy

Omarchy's `SUPER+V` universal paste binding sends `SHIFT+Insert` to the focused app. OSTT uses `shift+insert` as the default paste key on Omarchy for the same reason.

```toml
[output.paste]
paste_key = "shift+insert"
```

Do not set `paste_key = "super+v"` for this workflow. `SUPER+V` is a Hyprland binding, not the shortcut most apps receive for paste.

## Popup Appearance

On Hyprland, position is controlled by Hyprland window rules. Terminal selection, size, font size, and borderless behavior are configured in `~/.config/ostt/ostt.toml`:

```toml
[popup]
terminal = "ghostty"
width = 90
height = 15
font_size = 6
borderless = true
```

Change the move rule to adjust position:

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

If the popup appears in the wrong position, make sure the OSTT window rules are placed before catch-all rules that might override them.
