---
description: Fix common OSTT issues — no audio input, transcription failures, clipboard problems, popup not appearing, binary not found, and unsupported architecture.
---

# Troubleshooting

## View Logs

```bash
ostt logs
```

Logs are stored at `~/.local/state/ostt/ostt.log.*` with daily rotation and 7-day retention.

For more detail:

```bash
RUST_LOG=debug ostt record
RUST_LOG=debug ostt -p clean
```

Available log levels: `error`, `warn`, `info` (default), `debug`, `trace`.

## No Audio Input

List devices:

```bash
ostt config list-devices
```

Open config and set the audio device:

```bash
ostt config
```

## Volume Meter Never Reaches 100%

Run `ostt record`, maximize your microphone gain, and note the peak dBFS value. Then set `reference_level_db` in `~/.config/ostt/ostt.toml` to match your audio card's actual maximum:

```toml
[audio]
reference_level_db = -12   # Adjust based on observed peak
```

Common values: `-6` (very hot, near clipping), `-12` (professional standard), `-20` (conservative, typical card max).

## Transcription Fails

Check authentication and selected model:

```bash
ostt auth
```

Then retry with debug logs:

```bash
RUST_LOG=debug ostt record
```

## Clipboard Does Not Work

OSTT copies text using the first available clipboard tool. macOS uses `pbcopy` (built-in). Linux checks `wl-copy` (Wayland) then `xclip` (X11).

If clipboard output fails, install the appropriate tool for your platform:

### macOS

`pbcopy` is built into macOS. No installation needed.

### Debian / Ubuntu

```bash
sudo apt install wl-clipboard    # Wayland
# OR
sudo apt install xclip            # X11
```

### Arch / Omarchy

```bash
sudo pacman -S wl-clipboard      # Wayland
# OR
sudo pacman -S xclip              # X11
```

### Fedora

```bash
sudo dnf install wl-clipboard    # Wayland
# OR
sudo dnf install xclip            # X11
```

## Popup Does Not Appear

Test the launch command directly:

```bash
ostt launch -c
```

Verify a supported terminal is installed:

```bash
which ghostty || which kitty || which alacritty || which foot || which konsole || which gnome-terminal || which xfce4-terminal
```

Set one explicitly if needed:

```toml
[popup]
terminal = "ghostty"
```

On GNOME Wayland, the compositor controls window placement so the `x` and `y` popup positions are ignored. The popup size (`width`, `height`) still works.

On macOS, Terminal.app does not support true color. Install a preferred terminal from the auto-detection list (Ghostty, kitty, or Alacritty).

## Process Action Fails

List configured actions:

```bash
ostt process list
```

For AI actions, check that the external tool is installed and authenticated:

```bash
opencode --version   # Requires 1.4.3 or newer
claude --version
gemini --version
codex --version
```

Run with debug logs:

```bash
RUST_LOG=debug ostt process clean
```

## Binary Not Found After Install

### Shell Installer

Ensure `~/.cargo/bin` is in your PATH:

```bash
export PATH="$HOME/.cargo/bin:$PATH"
```

### Homebrew

Ensure Homebrew bin is in PATH:

```bash
export PATH="$(brew --prefix)/bin:$PATH"
```

### Permission Denied

```bash
chmod +x /usr/local/bin/ostt
```

## Unsupported Architecture

Pre-built binaries support `x86_64` (Intel/AMD 64-bit) and `aarch64` (ARM 64-bit, Apple Silicon, Raspberry Pi 4+). For other architectures, compile from source:

```bash
git clone https://github.com/kristoferlund/ostt.git
cd ostt
cargo build --profile dist
sudo cp target/dist/ostt /usr/local/bin/
```
