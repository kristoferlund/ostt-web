---
description: Set up OSTT as a global hotkey popup on KDE Plasma using System Settings > Keyboard > Shortcuts. Includes optional window rules for a borderless popup.
---

# KDE Plasma Setup

KDE Plasma can launch OSTT from a built-in custom shortcut. No third-party hotkey tool is required.

## Install OSTT

```bash
curl -fsSL https://ostt.ai/install | bash
ostt model
```

`ostt model` picks a transcription model. Local models need no account; for a cloud model, run `ostt auth login` first.

Prefer a native `.deb` or `.rpm` package? See [Installation](../installation.md). The install script detects your distribution and CPU architecture automatically, so it is the simplest option for most users.

## Bind a Hotkey

1. Open System Settings > Keyboard > Shortcuts.
2. Click Add New > Command or Script.
3. Enter the full path to the OSTT binary followed by `launch --paste`, and name it `OSTT`. Find your path with:

```bash
which ostt
```

For example:

```bash
/home/you/.local/bin/ostt launch --paste
```

Desktop environments do not always include `~/.local/bin` in the PATH used for hotkey commands, so the full path is required for reliable operation.

4. Click Add, then select the new entry and click Add custom shortcut.
5. Press your preferred key combination, such as `Alt+Space`.
6. Click Apply.

## Usage

1. Press your hotkey to open the popup and start recording.
2. Speak.
3. Press the same hotkey again to stop recording and transcribe.
4. With `--paste`, OSTT inserts the text into the app that regains focus after the popup closes.

## Multiple Hotkeys

Create additional shortcuts for common workflows:

| Name | Command | Example hotkey |
| --- | --- | --- |
| OSTT | `/path/to/ostt launch --paste` | `Alt+Space` |
| OSTT Process | `/path/to/ostt launch --paste -p` | `Alt+Ctrl+Space` |
| OSTT Copy | `/path/to/ostt launch -c` | `Ctrl+Alt+C` |

Replace `/path/to/ostt` with the output of `which ostt`.

## Terminal Selection

`ostt launch` auto-detects a terminal emulator. On stock KDE it may use Konsole, which works well but normally shows a titlebar.

For a borderless popup, install a preferred terminal:

```bash
sudo apt install -y kitty
```

Then optionally set it in `~/.config/ostt/ostt.toml`:

```toml
[popup]
terminal = "kitty"
```

## Optional Window Rules

KDE supports window rules for fine-grained control over popup appearance. Ghostty, Alacritty, and foot open the popup with the window class `ostt-popup`. kitty sets only the window title `ostt`, so match on the title instead.

1. Open System Settings > Apps & Windows > Window Management > Window Rules.
2. Click Add New.
3. Set Window class to `ostt-popup`, or Window title to `ostt` for kitty.
4. Add rules for position, size, no titlebar, and keep above.
5. Click Apply.

## Troubleshooting

Check your session type and install the right clipboard tool:

```bash
echo $XDG_SESSION_TYPE
sudo apt install -y xclip          # X11
sudo apt install -y wl-clipboard   # Wayland
```

Verify the command works from a terminal:

```bash
ostt launch -c
```

Test paste output directly:

```bash
ostt launch --paste
```

On KDE, OSTT defaults to `ctrl+v` for paste. If your target app is a terminal that requires another shortcut, set `[output.paste].paste_key` in `~/.config/ostt/ostt.toml`.

If the shortcut cannot find OSTT, use the absolute path from `which ostt` in the shortcut's command.
