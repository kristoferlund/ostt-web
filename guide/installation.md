# Installation

## Recommended Installer

```bash
curl -fsSL https://ostt.ai/install | bash
```

Use this unless you specifically prefer a platform package manager. It handles the common path across Linux and macOS, including dependency installation where supported.

## Native Package Options

Some platforms also support normal package-manager installs. These are useful if you prefer package-manager dependency handling and uninstall behavior.

| Platform | Method |
| --- | --- |
| macOS | Homebrew |
| Arch / Omarchy | AUR via `paru` or `yay` |
| Debian / Ubuntu / Mint | `.deb` package |
| Fedora / RHEL / Rocky | `.rpm` package via `dnf` |
| openSUSE | `.rpm` package via `zypper` |

See the platform setup pages for exact desktop-specific setup:

- [macOS](./platforms/macos.md)
- [Omarchy / Hyprland](./platforms/hyprland.md)
- [GNOME](./platforms/gnome.md)
- [KDE Plasma](./platforms/kde.md)

## Runtime Dependencies

Supported installers and native packages install dependencies where possible. If you install from source or a release archive, make sure these are available:

| Dependency | Purpose |
| --- | --- |
| `ffmpeg` | Audio conversion before transcription |
| `wl-clipboard` | Clipboard output on Wayland |
| `xclip` | Clipboard output on X11 |
| `mpv` | Recommended audio playback for `ostt replay` |

## Build From Source

```bash
git clone https://github.com/kristoferlund/ostt.git
cd ostt
cargo build --profile dist --locked
```

The optimized binary is written to `target/dist/ostt`.
