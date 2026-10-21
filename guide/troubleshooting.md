---
description: "Fix common OSTT issues: no audio input, transcription failures, clipboard problems, popup not appearing, binary not found, and unsupported architecture."
---

# Troubleshooting

## View Logs

```bash
ostt logs
```

Logs are stored at `~/.local/state/ostt/ostt.log.*` with daily rotation and 7-day retention.

For more detail, raise the log level. `RUST_LOG` sets the level written to the log file; read the result with `ostt logs`:

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

## Volume Meter Looks Wrong With a Fixed Reference Level

With `reference_level_db = "auto"` (default) the meter adapts to your voice and needs no setup. If you set a number and the meter never reaches 100%, run `ostt record`, maximize your microphone gain, and note the peak dBFS value. Then set `reference_level_db` in `~/.config/ostt/ostt.toml` to match your audio card's actual maximum:

```toml
[audio]
reference_level_db = -12   # Adjust based on observed peak
```

Common values: `-6` (very hot, near clipping), `-12` (professional standard), `-20` (conservative, typical card max).

## Clipping Indicator Never Lights Up

The red clipping indicator works on the **digital** signal OSTT receives from your microphone. If your system's input/recording volume is set below 100%, the OS applies a digital attenuation *after* the audio card but *before* OSTT sees it. Even when your interface's analog stage is clipping (e.g. the card's red LED is lit), the level reaching OSTT is reduced and never registers as clipping.

For the indicator to reflect reality:

1. Set your **system input/recording volume to 100%** (unity gain). On Linux check `wpctl status` / `pavucontrol`; on macOS check System Settings → Sound → Input.
2. Set your actual recording level using the **gain knob on your microphone or audio interface**, not the system slider.
3. Aim for peaks around `-12` to `-6` dBFS. If the indicator lights, lower the analog gain.

This is standard pro-audio gain staging: a system input slider below 100% is an invisible layer between your hardware and the app, and no application can show accurate clipping through it. Leave the system slider at 100% and adjust gain at the source.

## GPU Build Running on CPU

If you installed a CUDA or Vulkan build but transcription is slow and CPU usage is high, check which backend the model runs on: `ostt daemon status` with the daemon running, or the `backend active:` line in `ostt logs`. See [Verify the Backend](./gpu-acceleration#verify-the-backend) for example output and [GPU Acceleration: Troubleshooting](./gpu-acceleration#cpu-fallback) for driver fixes.

If you see a shared library error on startup, the runtime library (`libvulkan.so.1` or `libcuda.so`) is missing. Install the driver packages or reinstall OSTT with `--no-gpu`.

## Transcription Fails

Check authentication and the selected model:

```bash
ostt auth status
ostt model current
```

Then retry with debug logs:

```bash
RUST_LOG=debug ostt record
```

When recording from a popup, OSTT shows setup, microphone, model, API key, local model file, and ffmpeg errors inside the popup. Use the message shown there first; it usually includes the next command to run.

If the message mentions ffmpeg, install ffmpeg with your system package manager, then run `ostt record` again.

## Clipboard Does Not Work

OSTT copies text using the first available clipboard tool. macOS uses `pbcopy` (built-in). Linux checks `wl-copy` (Wayland) then `xclip` (X11).

Clipboard and paste errors are shown directly when you use `--clipboard` or `--paste`. If popup output disappears without text being inserted, run `ostt launch --paste` from a terminal to see the same error in your shell.

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

On macOS, Terminal.app is not supported; see [Terminal Auto-Detection](./configuration#terminal-auto-detection).

On Linux, install `notify-send` if you want desktop notifications when a popup launch fails before the terminal window opens.

## Auto-paste Fails on GNOME Wayland

GNOME's Wayland compositor (Mutter) does not support the virtual keyboard protocol that `wtype` needs, and `xdotool` cannot target native Wayland apps. OSTT will copy the transcription to your clipboard and show:

```
Failed to send paste key 'ctrl+v'. Text was copied to the clipboard…
Install ydotool and start ydotoold to enable auto-paste.
```

The simplest workaround is to use `-c` (clipboard mode) and paste manually with Ctrl+V.

If you want automatic paste on GNOME Wayland, install `ydotool`. OSTT uses it automatically when it is available.

### Ubuntu / Debian

```bash
sudo apt install ydotool
```

### Arch Linux

```bash
sudo pacman -S ydotool
```

### Fedora

```bash
sudo dnf install ydotool
```

Then start `ydotoold`, which ydotool needs to send keys. How to start it depends on your distro's ydotool package.

## Process Action Fails

See [Processing Actions: Troubleshooting](./processing#troubleshooting).

## Binary Not Found After Install

### Shell Installer

The installer places the binary in `~/.local/bin` by default (or the directory passed to `--install-dir`). Ensure that directory is in your PATH:

```bash
export PATH="$HOME/.local/bin:$PATH"
```

Add the same line to your shell profile (`~/.bashrc`, `~/.zshrc`, or `fish_add_path ~/.local/bin`) to make it permanent.

### Homebrew

Ensure Homebrew bin is in PATH:

```bash
export PATH="$(brew --prefix)/bin:$PATH"
```

### Permission Denied

```bash
chmod +x "$(command -v ostt)"
```

## Unsupported Architecture

Pre-built binaries support `x86_64` (Intel/AMD 64-bit) and `aarch64` (ARM 64-bit, Apple Silicon, Raspberry Pi 4+). For other architectures, compile from source:

```bash
git clone https://github.com/kristoferlund/ostt.git
cd ostt
cargo build --profile dist
sudo cp target/dist/ostt /usr/local/bin/
```
