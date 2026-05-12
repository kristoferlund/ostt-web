# KDE Plasma Setup

KDE Plasma can launch OSTT from built-in Custom Shortcuts. No third-party hotkey tool is required.

## Install OSTT

```bash
curl -fsSL https://ostt.ai/install | bash
ostt auth
```

Prefer a native package on supported x86_64 Linux distributions?

```bash
# Debian, Ubuntu, Kubuntu
curl -sLO https://github.com/kristoferlund/ostt/releases/latest/download/ostt_latest_amd64.deb
sudo apt install ./ostt_latest_amd64.deb

# Fedora KDE, RHEL, Rocky Linux
sudo dnf install https://github.com/kristoferlund/ostt/releases/latest/download/ostt-latest.x86_64.rpm

# openSUSE
sudo zypper install https://github.com/kristoferlund/ostt/releases/latest/download/ostt-latest.x86_64.rpm
```

Native packages install declared dependencies and support normal uninstall commands such as `sudo apt remove ostt`, `sudo dnf remove ostt`, or `sudo zypper remove ostt`.

## Bind a Hotkey

1. Open System Settings > Shortcuts > Custom Shortcuts.
2. Click Edit > New > Global Shortcut > Command/URL.
3. Name it `OSTT`.
4. In the Trigger tab, press your preferred key combination, such as `Alt+Space`.
5. In the Action tab, enter:

```bash
ostt launch -c
```

If KDE cannot find `ostt`, use the full path from `which ostt`.

6. Click Apply.

## Usage

1. Press your hotkey to open the popup and start recording.
2. Speak.
3. Press the same hotkey again to stop recording and transcribe.
4. Paste with `Ctrl+V`.

## Multiple Hotkeys

Create additional Custom Shortcuts for common workflows:

| Name | Command | Example hotkey |
| --- | --- | --- |
| OSTT | `ostt launch -c` | `Alt+Space` |
| OSTT Process | `ostt launch -c -p` | `Alt+Ctrl+Space` |
| OSTT Translate | `ostt launch -c -p translate-en` | `Ctrl+Alt+T` |

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

KDE supports window rules for fine-grained control over popup appearance. If you use kitty, Alacritty, or foot, which set window class `ostt-popup`, create a KDE window rule:

1. Open System Settings > Window Management > Window Rules.
2. Click Add New.
3. Set Window class to `ostt-popup`.
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

If the shortcut cannot find OSTT, use the absolute path from `which ostt` in the Custom Shortcut action.
