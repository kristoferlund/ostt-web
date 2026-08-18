---
description: Bind OSTT to a global hotkey on macOS, Hyprland, GNOME, and KDE Plasma. Overview with quick setup snippets and links to per-platform guides.
---

# Platform Setup

The recommended popup command requires the full path to the OSTT binary. Find yours with:

```bash
which ostt
```

Then use that path followed by `launch --paste` when binding a direct-dictation hotkey:

```bash
/path/to/ostt launch --paste
```

Desktop environments do not always include `~/.local/bin` (the default install location) in the PATH used for hotkey commands, so the full path is required for reliable operation.

Use `launch -c` when you want clipboard output instead of automatic paste.

## macOS

Use Shortcuts.app and add a shortcut that runs:

```bash
/path/to/ostt launch --paste
```

Full setup: [macOS Setup](./platforms/macos.md).

## Omarchy / Hyprland

On Omarchy 4, the one-line installer configures separate hotkeys for clipboard dictation and coding prompts:

```lua
o.bind("ALT + SPACE", "OSTT", "/path/to/ostt launch -c")
o.bind("ALT + SHIFT + SPACE", "OSTT to default agent", "/path/to/ostt launch -p agent")
```

The second binding turns a spoken request into a new prompt for Omarchy's default coding agent. OSTT closes when transcription finishes, then Omarchy opens the agent normally with the transcript ready to use. [Configure the complete Omarchy voice-to-agent setup.](./platforms/hyprland.md)

## GNOME

Use Settings > Keyboard > Custom Shortcuts and bind:

```bash
/path/to/ostt launch --paste
```

GNOME Wayland controls window placement, so popup size works but position may be compositor-controlled.

Full setup: [GNOME Setup](./platforms/gnome.md).

## KDE Plasma

Use System Settings > Shortcuts > Custom Shortcuts and bind:

```bash
/path/to/ostt launch --paste
```

Full setup: [KDE Plasma Setup](./platforms/kde.md).

## Suggested Hotkeys

The recommended default key combinations:

- **`Alt+Space`** — Basic popup: `/path/to/ostt launch --paste`
- **`Alt+Ctrl+Space`** — Popup with action picker: `/path/to/ostt launch --paste -p`

Create separate hotkeys for common workflows:

```bash
/path/to/ostt launch --paste             # Raw transcription, pasted
/path/to/ostt launch --paste -p          # Show action picker, paste result
/path/to/ostt launch -c                  # Raw transcription to clipboard
/path/to/ostt launch -c -p translate-en  # Translated transcription to clipboard
```

On Linux, paste shortcuts vary between GUI apps and terminals. OSTT defaults to `shift+insert` on Omarchy and `ctrl+v` on other Linux desktops. Change `[output.paste].paste_key` if your target app needs a different shortcut.

Replace `/path/to/ostt` with the output of `which ostt`.
