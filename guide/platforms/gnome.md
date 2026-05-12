# GNOME Setup

GNOME can launch OSTT from a built-in custom keyboard shortcut. No third-party hotkey tool is required.

## Install OSTT

```bash
curl -fsSL https://ostt.ai/install | bash
ostt auth
```

Prefer a native package on supported x86_64 Linux distributions?

```bash
# Debian, Ubuntu, Mint, Pop!_OS
curl -sLO https://github.com/kristoferlund/ostt/releases/latest/download/ostt_latest_amd64.deb
sudo apt install ./ostt_latest_amd64.deb

# Fedora, RHEL, Rocky Linux
sudo dnf install https://github.com/kristoferlund/ostt/releases/latest/download/ostt-latest.x86_64.rpm
```

Native packages install declared dependencies and support normal uninstall commands such as `sudo apt remove ostt` or `sudo dnf remove ostt`.

## Bind a Hotkey

1. Open Settings > Keyboard > View and Customize Shortcuts.
2. Scroll to the bottom and open Custom Shortcuts.
3. Click `+`.
4. Use name `OSTT`.
5. Use the full path to the OSTT binary. First find it with `which ostt`, then enter the path followed by `launch -c`:

```bash
# Example -- run this in a terminal to get your path:
which ostt
# Then enter the full path in the command field:
/Users/kristoferlund/.local/bin/ostt launch -c
```

Desktop environments do not always include `~/.local/bin` in the PATH used for hotkey commands, so the full path is required for reliable operation.

6. Click Set Shortcut and press your preferred key combination, such as `Alt+Space`.
7. Click Add.

## Usage

1. Press your hotkey to open the popup and start recording.
2. Speak.
3. Press the same hotkey again to stop recording and transcribe.
4. Paste with `Ctrl+V`.

## Multiple Hotkeys

Create multiple GNOME custom shortcuts for common workflows:

| Name | Command | Example hotkey |
| --- | --- | --- |
| OSTT | `/path/to/ostt launch -c` | `Alt+Space` |
| OSTT Process | `/path/to/ostt launch -c -p` | `Alt+Ctrl+Space` |
| OSTT Translate | `/path/to/ostt launch -c -p translate-en` | `Ctrl+Alt+T` |

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

If clipboard output does not work, install the right clipboard tool:

```bash
echo $XDG_SESSION_TYPE
sudo apt install -y wl-clipboard   # Wayland
sudo apt install -y xclip          # X11
```

GNOME custom shortcuts sometimes need a logout/login before they take effect.
