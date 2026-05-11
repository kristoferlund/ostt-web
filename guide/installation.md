# Installation

## Recommended Installer

```bash
curl -fsSL https://ostt.ai/install | bash
```

Use this unless you specifically prefer a platform package manager. It detects your platform, installs missing runtime dependencies (ffmpeg, clipboard tools) where supported, downloads the latest release, verifies its checksum, and installs the `ostt` CLI. In most cases you do not need to install dependencies manually -- the installer handles them for you.

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
curl -sLO https://github.com/kristoferlund/ostt/releases/latest/download/ostt_latest_amd64.deb
sudo apt install ./ostt_latest_amd64.deb
```

### Fedora / RHEL -- .rpm

```bash
sudo dnf install https://github.com/kristoferlund/ostt/releases/latest/download/ostt-latest.x86_64.rpm
```

### openSUSE -- .rpm

```bash
sudo zypper install https://github.com/kristoferlund/ostt/releases/latest/download/ostt-latest.x86_64.rpm
```

### Direct Binary Download

Download from [GitHub Releases](https://github.com/kristoferlund/ostt/releases):

```bash
# Available: x86_64-linux, aarch64-linux, x86_64-macos, aarch64-macos
tar -xzf ostt-<platform>.tar.gz
sudo cp ostt-<platform>/ostt /usr/local/bin/
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
