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

## Clipping Indicator Never Lights Up

The red clipping indicator works on the **digital** signal OSTT receives from your microphone. If your system's input/recording volume is set below 100%, the OS applies a digital attenuation *after* the audio card but *before* OSTT sees it — so even when your interface's analog stage is clipping (e.g. the card's red LED is lit), the level reaching OSTT is reduced and never registers as clipping.

For the indicator to reflect reality:

1. Set your **system input/recording volume to 100%** (unity gain). On Linux check `wpctl status` / `pavucontrol`; on macOS check System Settings → Sound → Input.
2. Set your actual recording level using the **gain knob on your microphone or audio interface**, not the system slider.
3. Aim for peaks around `-12` to `-6` dBFS. If the indicator lights, lower the analog gain.

This is standard pro-audio gain staging: a system input slider below 100% is an invisible layer between your hardware and the app, and no application can show accurate clipping through it. Leave the system slider at 100% and adjust gain at the source.

## GPU Build Running on CPU

If you installed a CUDA or Vulkan build but transcription is slow and CPU usage is high, the GPU backend may not have initialised. Check the logs:

```bash
ostt logs
```

A successful GPU run looks like:

```
daemon: loading model 'whisper/large-v3' with Vulkan GPU acceleration
daemon: backend active: Vulkan GPU acceleration using device(s): 0: AMD Radeon RX 7900 XTX (24576 MB VRAM)
```

If you see this instead:

```
daemon: backend active: Vulkan GPU acceleration requested, but no GPU devices were reported by ggml
```

The Vulkan loader is installed but the GPU driver ICD is missing. Install the Mesa Vulkan driver for your hardware — see [GPU Acceleration](/guide/gpu-acceleration#cpu-fallback) for per-distro instructions.

If you see a shared library error on startup, the runtime library itself (`libvulkan.so.1` or `libcuda.so`) is missing. Install the driver packages or reinstall OSTT with `--no-gpu`.

## Transcription Fails

Check authentication and selected model:

```bash
ostt auth
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

On macOS, Terminal.app does not support true color. Install a preferred terminal from the auto-detection list (Ghostty, kitty, or Alacritty).

On Linux, install `notify-send` if you want desktop notifications when a popup launch fails before the terminal window opens.

## Auto-paste Fails on GNOME Wayland

GNOME's Wayland compositor (Mutter) does not support the virtual keyboard protocol that `wtype` needs, and `xdotool` cannot target native Wayland apps. OSTT will copy the transcription to your clipboard and show:

```
Failed to send paste key 'ctrl+v'. Text was copied to the clipboard…
Install ydotool and start ydotoold to enable auto-paste.
```

The simplest workaround is to use `-c` (clipboard mode) and paste manually with Ctrl+V.

If you want automatic paste on GNOME Wayland, install `ydotool`. OSTT will use it automatically when it is available — no configuration needed.

### Ubuntu / Debian

```bash
sudo apt install ydotool
```

Start the daemon (required for ydotool to work):

```bash
sudo systemctl enable --now ydotoold
```

### Arch Linux

```bash
sudo pacman -S ydotool
sudo systemctl enable --now ydotoold
```

### Fedora

```bash
sudo dnf install ydotool
sudo systemctl enable --now ydotoold
```

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
