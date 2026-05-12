# Platform Setup

The recommended popup command requires the full path to the OSTT binary. Find yours with:

```bash
which ostt
```

Then use that path followed by `launch -c` when binding the hotkey:

```bash
/path/to/ostt launch -c
```

Desktop environments do not always include `~/.local/bin` (the default install location) in the PATH used for hotkey commands, so the full path is required for reliable operation.

## macOS

Use Shortcuts.app and add a shortcut that runs:

```bash
/path/to/ostt launch -c
```

Full setup: [macOS Setup](./platforms/macos.md).

## Omarchy / Hyprland

Add the binding to `~/.config/hypr/bindings.conf`:

```text
bindd = ALT, SPACE, ostt, exec, /path/to/ostt launch -c
```

Full setup: [Omarchy / Hyprland Setup](./platforms/hyprland.md).

## GNOME

Use Settings > Keyboard > Custom Shortcuts and bind:

```bash
/path/to/ostt launch -c
```

GNOME Wayland controls window placement, so popup size works but position may be compositor-controlled.

Full setup: [GNOME Setup](./platforms/gnome.md).

## KDE Plasma

Use System Settings > Shortcuts > Custom Shortcuts and bind:

```bash
/path/to/ostt launch -c
```

Full setup: [KDE Plasma Setup](./platforms/kde.md).

## Suggested Hotkeys

The recommended default key combinations:

- **`Alt+Space`** — Basic popup: `/path/to/ostt launch -c`
- **`Alt+Ctrl+Space`** — Popup with action picker: `/path/to/ostt launch -c -p`

Create separate hotkeys for common workflows:

```bash
/path/to/ostt launch -c                 # Raw transcription to clipboard
/path/to/ostt launch -c -p               # Show action picker
/path/to/ostt launch -c -p translate-en  # Translated transcription to clipboard
```

Replace `/path/to/ostt` with the output of `which ostt`.
