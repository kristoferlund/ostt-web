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

Use this unless you specifically prefer a platform package manager. It detects your platform, installs missing runtime dependencies (ffmpeg, clipboard tools) where supported, selects the right CPU/GPU build, downloads the latest release, verifies its checksum, and installs the `ostt` CLI. On Omarchy 4, it also configures `ALT+SPACE` for clipboard dictation, `ALT+SHIFT+SPACE` for spoken prompts to the default agent, and the floating OSTT popup. In most cases you do not need to install dependencies or desktop integration manually.

The installer runs non-interactively. When no transcription model is active at the end of the install, it offers to download the local Whisper base model (142 MB) so you can start transcribing immediately -- accepting the offer leaves a fully working setup with nothing else to configure.

It uses native `.deb` or `.rpm` packages on supported Linux distributions when possible. Otherwise, including macOS, it installs the binary to `~/.local/bin` by default. If that directory is not already on your `PATH`, the installer adds it to your shell profile (`.bashrc`, `.zshrc`, or `config.fish`) so `ostt` works in your next shell with no manual steps. Pass `--no-modify-path` to opt out and get printed instructions instead.

Shell completions are installed to user-owned directories -- no `sudo` required. For zsh, the installer also adds the completions directory to `fpath` in your `.zshrc`, since zsh's default `fpath` contains no directory under `$HOME`.

Download URLs and checksums come from a release manifest at [ostt.ai/latest.json](https://ostt.ai/latest.json), so the installer never guesses filenames. If the manifest is unreachable the install fails with an explicit error rather than falling back to a guess. Installing a pinned release with `--version` bypasses the manifest, since it only ever describes the latest release.

On macOS, the installer uses the Metal-enabled build. On Linux x86_64 it installs a CUDA build when a usable NVIDIA CUDA runtime is detected — `cuda` for a CUDA 12 toolkit, `cuda13` for CUDA 13 — the Vulkan build when Vulkan support is detected, and the CPU build otherwise. An NVIDIA GPU with no usable CUDA toolkit gets the Vulkan build rather than the CPU build. See [GPU Acceleration](/guide/gpu-acceleration) for how the choice is made. To force the CPU build:

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
| `--gpu MODE` | Force a build instead of detecting one: `auto` (default), `cuda` (CUDA 12), `cuda13` (CUDA 13), `vulkan`, or `cpu`. Linux x86_64 only. |
| `--no-gpu` | Install the CPU build even if GPU support is detected. |
| `--no-modify-path` | Do not add the install directory to your shell profile. |
| `--no-omarchy-setup` | Do not configure Omarchy hotkeys, popup rules, or the default-agent action. |
| `--no-model-download` | Do not offer to download the Whisper base model when none is active. |
| `--version VERSION` | Install a specific release, for example `--version v0.0.20`. |
| `--install-dir DIR` | Install `ostt` to `DIR` instead of `~/.local/bin`. |
| `-y`, `--yes` | Accepted for compatibility; non-interactive is now the default. |
| `-h`, `--help` | Show usage and exit. |

The install directory can also be set with the `OSTT_INSTALL_DIR` environment variable. When `--install-dir` is left at the default and a native `.deb`/`.rpm` package is available for your system, the installer uses that package (installing to `/usr/bin`) instead of the release archive.

### First Run

OSTT requires an active transcription model before recording. When none is active, the installer ends by offering to download the local Whisper base model (142 MB) and selecting it for you. If the base model is already on disk from an earlier install, it is selected without asking. Accept the offer and OSTT is ready to transcribe -- no further setup needed.

If you decline (or ran the installer with `--no-model-download` or without a terminal), pick a model yourself:

```bash
ostt model
```

You can select and download a local model directly. To use a cloud provider, authenticate it first and then select one of its models:

```bash
ostt auth login
ostt model
```

On Omarchy, also select the coding agent used by the voice-to-agent hotkey if you have not already done so:

```bash
omarchy agent --pick
```

The Omarchy installer changes are append-only and idempotent. Existing bindings, OSTT window rules, and `[process.actions.agent]` definitions are preserved instead of overwritten. See [Omarchy / Hyprland Setup](./platforms/hyprland.md) for the generated configuration and manual setup.

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
yay -S ostt-cuda-bin     # NVIDIA CUDA build (x86_64), matches the `cuda` package in Arch's repos
yay -S ostt-vulkan-bin   # AMD / Intel / NVIDIA Vulkan build (x86_64)
```

These packages download the official release binary and install it directly. They conflict with each other and with the source package, so only one can be installed at a time.

To build from source instead:

```bash
yay -S ostt
```

`paru` works in place of `yay` for any of the above.

### Debian / Ubuntu / Mint -- .deb

```bash
# Set this to the release you want, for example 0.0.25
VERSION=<VERSION>
BASE=https://github.com/kristoferlund/ostt/releases/download/v${VERSION}

# x86_64 CPU build
curl -sLO ${BASE}/ostt_${VERSION}-1_amd64.deb && sudo apt install ./ostt_${VERSION}-1_amd64.deb

# x86_64 NVIDIA, CUDA 12 toolkit
curl -sLO ${BASE}/ostt-cuda_${VERSION}-1_amd64.deb && sudo apt install ./ostt-cuda_${VERSION}-1_amd64.deb

# x86_64 NVIDIA, CUDA 13 toolkit
curl -sLO ${BASE}/ostt-cuda13_${VERSION}-1_amd64.deb && sudo apt install ./ostt-cuda13_${VERSION}-1_amd64.deb

# x86_64 AMD/Intel/NVIDIA Vulkan build
curl -sLO ${BASE}/ostt-vulkan_${VERSION}-1_amd64.deb && sudo apt install ./ostt-vulkan_${VERSION}-1_amd64.deb

# ARM64 (Raspberry Pi, etc.)
curl -sLO ${BASE}/ostt_${VERSION}-1_arm64.deb && sudo apt install ./ostt_${VERSION}-1_arm64.deb
```

### Fedora / RHEL -- .rpm

```bash
VERSION=<VERSION>
BASE=https://github.com/kristoferlund/ostt/releases/download/v${VERSION}

# x86_64 CPU build
sudo dnf install ${BASE}/ostt-${VERSION}-1.x86_64.rpm

# x86_64 NVIDIA, CUDA 12 toolkit
sudo dnf install ${BASE}/ostt-cuda-${VERSION}-1.x86_64.rpm

# x86_64 NVIDIA, CUDA 13 toolkit
sudo dnf install ${BASE}/ostt-cuda13-${VERSION}-1.x86_64.rpm

# x86_64 AMD/Intel/NVIDIA Vulkan build
sudo dnf install ${BASE}/ostt-vulkan-${VERSION}-1.x86_64.rpm

# ARM64
sudo dnf install ${BASE}/ostt-${VERSION}-1.aarch64.rpm
```

### openSUSE -- .rpm

```bash
VERSION=<VERSION>
BASE=https://github.com/kristoferlund/ostt/releases/download/v${VERSION}

# x86_64 CPU build
sudo zypper install ${BASE}/ostt-${VERSION}-1.x86_64.rpm

# x86_64 NVIDIA, CUDA 12 toolkit
sudo zypper install ${BASE}/ostt-cuda-${VERSION}-1.x86_64.rpm

# x86_64 NVIDIA, CUDA 13 toolkit
sudo zypper install ${BASE}/ostt-cuda13-${VERSION}-1.x86_64.rpm

# x86_64 AMD/Intel/NVIDIA Vulkan build
sudo zypper install ${BASE}/ostt-vulkan-${VERSION}-1.x86_64.rpm

# ARM64
sudo zypper install ${BASE}/ostt-${VERSION}-1.aarch64.rpm
```

Find the current `<VERSION>` on the [releases page](https://github.com/kristoferlund/ostt/releases/latest). Run `uname -m` to check your architecture (`x86_64` or `aarch64`). CUDA and Vulkan packages are currently only published for Linux x86_64. Use the CPU package on ARM64.

The `ostt`, `ostt-cuda`, `ostt-cuda13` and `ostt-vulkan` packages all provide `/usr/bin/ostt` and conflict with each other, so installing one replaces any other that is present.

Choose the package variant by hardware:

| Hardware | Package |
| --- | --- |
| No local models, no supported GPU, or ARM64 Linux | `ostt` CPU build |
| NVIDIA GPU, CUDA 12 toolkit installed | `ostt-cuda` |
| NVIDIA GPU, CUDA 13 toolkit installed | `ostt-cuda13` |
| AMD, Intel, or NVIDIA GPU with a Vulkan driver | `ostt-vulkan` |
| macOS | Homebrew or direct macOS archive; Metal is built in |

### Direct Binary Download

Download from [GitHub Releases](https://github.com/kristoferlund/ostt/releases):

```bash
# CPU archives:  ostt-x86_64-unknown-linux-gnu.tar.gz, ostt-aarch64-unknown-linux-gnu.tar.gz,
#                ostt-x86_64-apple-darwin.tar.gz, ostt-aarch64-apple-darwin.tar.gz
# GPU archives:  ostt-<version>-x86_64-unknown-linux-gnu-{cuda,cuda13,vulkan}.tar.gz
#                (GPU archives carry the version in the filename, CPU archives do not)
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
