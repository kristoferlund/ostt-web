# macOS Setup

The recommended macOS setup uses Shortcuts.app. It is built into macOS and does not require a third-party automation tool.

## Install OSTT

```bash
curl -fsSL https://ostt.ai/install | bash
ostt auth
```

Prefer Homebrew?

```bash
brew tap kristoferlund/ostt
brew install ostt
ostt auth
```

Homebrew installs OSTT as a managed package and supports normal uninstall with `brew uninstall ostt`. The install script (`curl -fsSL https://ostt.ai/install | bash`) detects your platform and architecture automatically and is the simplest option.

## Locate the Binary

Shortcuts.app requires the full path to the OSTT binary. Find it with:

```bash
which ostt
```

Typical locations:

| Install method | Path |
| --- | --- |
| Install script | `~/.local/bin/ostt` |
| Homebrew (Intel) | `/usr/local/bin/ostt` |
| Homebrew (Apple Silicon) | `/opt/homebrew/bin/ostt` |

## Terminal Requirement

For popup mode, OSTT auto-detects Ghostty, kitty, or Alacritty. The installer warns you if none are installed. Ghostty is recommended on macOS.

Set a terminal explicitly if needed:

```toml
[popup]
terminal = "ghostty"
```

## Bind a Hotkey

1. Open Shortcuts.app.
2. Click `+` to create a new shortcut.
3. Add the `Run Shell Script` action.
4. Replace the default script with the full path to OSTT:

```bash
/opt/homebrew/bin/ostt launch -c
```

Use the path from `which ostt` if yours differs.

5. Name the shortcut `OSTT`.
6. Open the shortcut details (click the info button, the encircled `i`) and select **Add Keyboard Shortcut**.
7. Press `Control+Space`.

> **Note:** `Control+Space` is the suggested default for macOS because many other key combinations are reserved by the system. If you choose a different shortcut, verify it does not collide with an existing system or application hotkey.

The suggested hotkey differs from the one used on Linux platforms because macOS reserves more keyboard shortcuts at the system level.

## Usage

1. Press your hotkey to open the popup and start recording.
2. Speak.
3. Press the same hotkey again to stop recording and transcribe.
4. Paste with `Cmd+V`.

The second hotkey press runs `ostt launch` again. OSTT detects the existing recording process and sends it a signal to finish recording.

## Multiple Shortcuts

Create additional Shortcuts.app shortcuts for different workflows:

| Shortcut | Shell command | Result |
| --- | --- | --- |
| OSTT | `/path/to/ostt launch -c` | Record, transcribe, copy |
| OSTT Clean | `/path/to/ostt launch -c -p clean` | Record, clean up text, copy |
| OSTT Translate | `/path/to/ostt launch -c -p translate-en` | Record, translate, copy |

## Output Options

```bash
ostt launch -c              # Copy to clipboard
ostt launch -o file.txt     # Write to file
ostt launch -c -p clean     # Process and copy
```

## Troubleshooting

Verify OSTT and a supported terminal are installed:

```bash
which ostt
which ghostty || which kitty || which alacritty
```

Test launch directly:

```bash
ostt launch -c
```

If clipboard output is missing, make sure `-c` is in the shell command. Without `-c`, output goes to stdout inside the popup.

macOS full-screen apps run in their own Space. Other windows cannot appear on top of a full-screen Space, so switch out of full-screen mode if the popup is hidden.
