---
description: Set up OSTT as a global hotkey popup on GNOME using Settings > Keyboard > Custom Shortcuts. No third-party hotkey tools required.
---

# GNOME Setup

GNOME can launch OSTT from a built-in custom keyboard shortcut. No third-party hotkey tool is required.

## Install OSTT

```bash
curl -fsSL https://ostt.ai/install | bash
ostt auth
```

Prefer a native `.deb` or `.rpm` package? See [Installation](../installation.md). The install script detects your distribution and CPU architecture automatically, so it is the simplest option for most users.

## Bind a Hotkey

1. Open Settings > Keyboard > View and Customize Shortcuts.
2. Scroll to the bottom and open Custom Shortcuts.
3. Click `+`.
4. Use name `OSTT`.
5. Use the full path to the OSTT binary. First find it with `which ostt`, then enter the path followed by `launch --paste`:

```bash
# Example -- run this in a terminal to get your path:
which ostt
# Then enter the full path in the command field, for example:
/home/you/.local/bin/ostt launch --paste
```

Desktop environments do not always include `~/.local/bin` in the PATH used for hotkey commands, so the full path is required for reliable operation.

6. Click Set Shortcut and press your preferred key combination, such as `Alt+Space`.
7. Click Add.

## Usage

1. Press your hotkey to open the popup and start recording.
2. Speak.
3. Press the same hotkey again to stop recording and transcribe.
4. With `--paste`, OSTT inserts the text into the app that regains focus after the popup closes.

## Multiple Hotkeys

Create multiple GNOME custom shortcuts for common workflows:

| Name | Command | Example hotkey |
| --- | --- | --- |
| OSTT | `/path/to/ostt launch --paste` | `Alt+Space` |
| OSTT Process | `/path/to/ostt launch --paste -p` | `Alt+Ctrl+Space` |
| OSTT Copy | `/path/to/ostt launch -c` | `Ctrl+Alt+T` |

Replace `/path/to/ostt` with the output of `which ostt`.

## Terminal Selection

`ostt launch` auto-detects a terminal emulator. On stock GNOME it may use GNOME Terminal, which works but shows a titlebar.

For a cleaner borderless popup, install one of the preferred terminals:

```bash
sudo apt install -y kitty
sudo apt install -y alacritty
```

If Ghostty is available in your distribution repositories, it is also recommended.

Set a terminal explicitly:

```toml
[popup]
terminal = "kitty"
```

## Popup Behavior

GNOME Wayland ignores client-side window positioning. OSTT popup size works as expected, but GNOME decides where the window appears.

## Troubleshooting

Verify OSTT is installed:

```bash
which ostt
```

Test the launch command directly:

```bash
ostt launch -c
```

Test paste output directly:

```bash
ostt launch --paste
```

On GNOME, OSTT defaults to `ctrl+v` for paste. If your target app is a terminal that requires another shortcut, set `[output.paste].paste_key` in `~/.config/ostt/ostt.toml`.

If clipboard output does not work, install the right clipboard tool:

```bash
echo $XDG_SESSION_TYPE
sudo apt install -y wl-clipboard   # Wayland
sudo apt install -y xclip          # X11
```

GNOME custom shortcuts sometimes need a logout/login before they take effect.
