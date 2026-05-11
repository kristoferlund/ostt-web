# Platform Setup

The recommended popup command is the same everywhere:

```bash
ostt launch -c
```

Bind that command to a global keyboard shortcut. The first press starts recording in a popup; the second press stops recording and transcribes.

## macOS

Use Shortcuts.app and add a shortcut that runs:

```bash
ostt launch -c
```

Full setup: [macOS Setup](./platforms/macos.md).

## Omarchy / Hyprland

Add the binding to `~/.config/hypr/bindings.conf`:

```text
bindd = SUPER, R, ostt, exec, ostt launch -c
```

Add window rules to `~/.config/hypr/hyprland.conf`:

```text
windowrule = float on, match:title ostt
windowrule = move ((monitor_w*0.5)-(window_w*0.5)) (monitor_h*0.85), match:title ostt
```

Full setup: [Omarchy / Hyprland Setup](./platforms/hyprland.md).

## GNOME

Use Settings > Keyboard > Custom Shortcuts and bind:

```bash
ostt launch -c
```

GNOME Wayland controls window placement, so popup size works but position may be compositor-controlled.

Full setup: [GNOME Setup](./platforms/gnome.md).

## KDE Plasma

Use System Settings > Shortcuts > Custom Shortcuts and bind:

```bash
ostt launch -c
```

Full setup: [KDE Plasma Setup](./platforms/kde.md).

## Processing Hotkeys

Create separate hotkeys for common workflows:

```bash
ostt launch -c                 # Raw transcription to clipboard
ostt launch -c -p clean         # Cleaned transcription to clipboard
ostt launch -c -p translate-en  # Translated transcription to clipboard
```
