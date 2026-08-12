---
description: Install OSTT via the one-line shell script, Homebrew, AUR, .deb, .rpm, or from source. Covers runtime dependencies for macOS, Debian, Arch, and Fedora.
---

# Installation

::: tip Install with an AI agent
Prefer to let an AI coding agent do it? Run `npx skills add https://github.com/kristoferlund/ostt-skill` and your agent (Claude Code and other skill-aware tools) can install, configure, and troubleshoot OSTT for you. See [Install with an AI Agent](/guide/ai-skill).
:::

## Recommended Installer

```bash
curl -fsSL https://ostt.ai/install | bash
```

Use this unless you specifically prefer a platform package manager. It detects your platform, installs missing runtime dependencies (ffmpeg, clipboard tools) where supported, selects the right CPU/GPU build, downloads the latest release, verifies its checksum, and installs the `ostt` CLI. In most cases you do not need to install dependencies manually -- the installer handles them for you.

The installer runs non-interactively: it prints what it is about to do, then does it. No prompts.

It uses native `.deb` or `.rpm` packages on supported Linux distributions when possible. Otherwise, including macOS, it installs the binary to `~/.local/bin` by default. If that directory is not already on your `PATH`, the installer adds it to your shell profile (`.bashrc`, `.zshrc`, or `config.fish`) so `ostt` works in your next shell with no manual steps. Pass `--no-modify-path` to opt out and get printed instructions instead.

Shell completions are installed to user-owned directories -- no `sudo` required. For zsh, the installer also adds the completions directory to `fpath` in your `.zshrc`, since zsh's default `fpath` contains no directory under `$HOME`.

Download URLs and checksums come from a release manifest at [ostt.ai/latest.json](https://ostt.ai/latest.json), so the installer never guesses filenames. If the manifest is unreachable the install fails with an explicit error rather than falling back to a guess. Installing a pinned release with `--version` bypasses the manifest, since it only ever describes the latest release.

On macOS, the installer uses the Metal-enabled build. On Linux x86_64, it installs the CUDA build when a usable NVIDIA CUDA runtime is detected, the Vulkan build when AMD/Intel Vulkan support is detected, and the CPU build otherwise. To force the CPU build:

```bash
curl -fsSL https://ostt.ai/install | bash -s -- --no-gpu
```

### Installer options

Pass options after `-s --`. For example, an install that keeps the CPU build and leaves your shell profile alone:

```bash
curl -fsSL https://ostt.ai/install | bash -s -- --no-gpu --no-modify-path
```

| Option | Description |
| --- | --- |
| `-i`, `--interactive` | Ask for confirmation before installing. |
| `--no-deps` | Do not install system dependencies (ffmpeg, clipboard tools). |
| `--no-gpu` | Install the CPU build even if GPU support is detected. |
| `--no-modify-path` | Do not add the install directory to your shell profile. |
| `--version VERSION` | Install a specific release, for example `--version v0.0.20`. |
| `--install-dir DIR` | Install `ostt` to `DIR` instead of `~/.local/bin`. |
| `-y`, `--yes` | Accepted for compatibility; non-interactive is now the default. |
| `-h`, `--help` | Show usage and exit. |

The install directory can also be set with the `OSTT_INSTALL_DIR` environment variable. When `--install-dir` is left at the default and a native `.deb`/`.rpm` package is available for your system, the installer uses that package (installing to `/usr/bin`) instead of the release archive.

## Native Package Options

### macOS -- Homebrew

```bash
brew tap kristoferlund/ostt
brew install ostt
```

### Arch / Omarchy -- AUR

Prebuilt binary packages (recommended -- no compilation, no Rust toolchain). Pick the one that matches your hardware:

```bash
yay -S ostt-bin          # CPU build (x86_64, aarch64)
yay -S ostt-cuda-bin     # NVIDIA CUDA build (x86_64)
yay -S ostt-vulkan-bin   # AMD / Intel Vulkan build (x86_64)
```

These packages download the official release binary and install it directly. They conflict with each other and with the source package, so only one can be installed at a time.

To build from source instead:

```bash
yay -S ostt
```

`paru` works in place of `yay` for any of the above.

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
