---
description: Install OSTT via the one-line shell script, Homebrew, AUR, .deb, .rpm, or from source. Covers runtime dependencies for macOS, Debian, Arch, and Fedora.
---

# Installation

## Recommended Installer

```bash
curl -fsSL https://ostt.ai/install | bash
```

Use this unless you specifically prefer a platform package manager. It detects your platform, installs missing runtime dependencies (ffmpeg, clipboard tools) where supported, selects the right CPU/GPU build, downloads the latest release, verifies its checksum, and installs the `ostt` CLI. In most cases you do not need to install dependencies manually -- the installer handles them for you.

On macOS, the installer uses the Metal-enabled build. On Linux x86_64, it installs the CUDA build when a usable NVIDIA CUDA runtime is detected, the Vulkan build when AMD/Intel Vulkan support is detected, and the CPU build otherwise. To force the CPU build:

```bash
curl -fsSL https://ostt.ai/install | bash -s -- --no-gpu
```

## Native Package Options

### macOS -- Homebrew

```bash
brew tap kristoferlund/ostt
brew install ostt
```

### Arch / Omarchy -- AUR

```bash
# Using yay
yay -S ostt

# Using paru
paru -S ostt
```

### Debian / Ubuntu / Mint -- .deb

```bash
# x86_64 CPU build
curl -sLO https://github.com/kristoferlund/ostt/releases/latest/download/ostt_latest_amd64.deb
sudo apt install ./ostt_latest_amd64.deb

# x86_64 NVIDIA CUDA build
curl -sLO https://github.com/kristoferlund/ostt/releases/latest/download/ostt-cuda_latest_amd64.deb
sudo apt install ./ostt-cuda_latest_amd64.deb

# x86_64 AMD/Intel Vulkan build
curl -sLO https://github.com/kristoferlund/ostt/releases/latest/download/ostt-vulkan_latest_amd64.deb
sudo apt install ./ostt-vulkan_latest_amd64.deb

# ARM64 (Raspberry Pi, etc.)
curl -sLO https://github.com/kristoferlund/ostt/releases/latest/download/ostt_latest_arm64.deb
sudo apt install ./ostt_latest_arm64.deb
```

### Fedora / RHEL -- .rpm

```bash
# x86_64 CPU build
sudo dnf install https://github.com/kristoferlund/ostt/releases/latest/download/ostt-latest.x86_64.rpm

# x86_64 NVIDIA CUDA build
sudo dnf install https://github.com/kristoferlund/ostt/releases/latest/download/ostt-cuda-latest.x86_64.rpm

# x86_64 AMD/Intel Vulkan build
sudo dnf install https://github.com/kristoferlund/ostt/releases/latest/download/ostt-vulkan-latest.x86_64.rpm

# ARM64
sudo dnf install https://github.com/kristoferlund/ostt/releases/latest/download/ostt-latest.aarch64.rpm
```

### openSUSE -- .rpm

```bash
# x86_64 CPU build
sudo zypper install https://github.com/kristoferlund/ostt/releases/latest/download/ostt-latest.x86_64.rpm

# x86_64 NVIDIA CUDA build
sudo zypper install https://github.com/kristoferlund/ostt/releases/latest/download/ostt-cuda-latest.x86_64.rpm

# x86_64 AMD/Intel Vulkan build
sudo zypper install https://github.com/kristoferlund/ostt/releases/latest/download/ostt-vulkan-latest.x86_64.rpm

# ARM64
sudo zypper install https://github.com/kristoferlund/ostt/releases/latest/download/ostt-latest.aarch64.rpm
```

Run `uname -m` to check your architecture (`x86_64` or `aarch64`). CUDA and Vulkan packages are currently only published for Linux x86_64. Use the CPU package on ARM64.

Choose the package variant by hardware:

| Hardware | Package |
| --- | --- |
| No local models, no supported GPU, or ARM64 Linux | `ostt` CPU build |
| NVIDIA GPU with CUDA runtime libraries | `ostt-cuda` |
| AMD or Intel GPU with Vulkan runtime library | `ostt-vulkan` |
| macOS | Homebrew or direct macOS archive; Metal is built in |

### Direct Binary Download

Download from [GitHub Releases](https://github.com/kristoferlund/ostt/releases):

```bash
# CPU archives: x86_64-linux, aarch64-linux, x86_64-macos, aarch64-macos
# GPU archives: x86_64-linux-cuda, x86_64-linux-vulkan
tar -xzf ostt-<platform>.tar.gz
sudo cp <extracted-path>/ostt /usr/local/bin/
```

### Compile from Source

```bash
git clone https://github.com/kristoferlund/ostt.git
cd ostt
cargo build --profile dist --locked
# Binary at target/dist/ostt
```

## Runtime Dependencies

| Dependency | Purpose | Required |
| --- | --- | --- |
| `ffmpeg` | Audio format conversion before transcription | Yes |
| `wl-clipboard` | Clipboard support on Linux Wayland | Recommended |
| `xclip` | Clipboard support on Linux X11 | Recommended |
| `mpv` | Best audio playback for `ostt replay` | Optional |

### macOS

```bash
brew install ffmpeg       # ffmpeg
# pbcopy is built-in for clipboard
brew install mpv          # Optional: better audio playback
```

### Debian / Ubuntu

```bash
sudo apt install ffmpeg wl-clipboard   # Wayland
# OR
sudo apt install ffmpeg xclip          # X11
sudo apt install mpv                   # Optional: better audio playback
```

### Arch / Omarchy

```bash
sudo pacman -S ffmpeg wl-clipboard     # Wayland
# OR
sudo pacman -S ffmpeg xclip            # X11
sudo pacman -S mpv                     # Optional: better audio playback
```

### Fedora

```bash
sudo dnf install ffmpeg wl-clipboard   # Wayland
# OR
sudo dnf install ffmpeg xclip          # X11
sudo dnf install mpv                   # Optional: better audio playback
```

Native package managers (Homebrew, AUR, .deb, .rpm) declare these dependencies and install most of them automatically.
