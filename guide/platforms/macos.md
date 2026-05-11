# macOS Setup

The recommended macOS setup uses Shortcuts.app. It is built into macOS and does not require a third-party automation tool.

## Install OSTT

```bash
curl -fsSL https://ostt.ai/install | bash
ostt auth
```

Prefer Homebrew?

```bash
brew install kristoferlund/ostt/ostt
ostt auth
```

Homebrew installs OSTT as a managed package and supports normal uninstall with `brew uninstall ostt`.

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
4. Replace the default script with:

```bash
ostt launch -c
```

5. Name the shortcut `OSTT`.
6. Open the shortcut details and select `Add Keyboard Shortcut`.
7. Press your preferred key combination, for example `Option+Space`.

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
| OSTT | `ostt launch -c` | Record, transcribe, copy |
| OSTT Clean | `ostt launch -c -p clean` | Record, clean up text, copy |
| OSTT Translate | `ostt launch -c -p translate-en` | Record, translate, copy |

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

If clipboard output is missing, make sure `-c` is in the shortcut command. Without `-c`, output goes to stdout inside the popup.

macOS full-screen apps run in their own Space. Other windows cannot appear on top of a full-screen Space, so switch out of full-screen mode if the popup is hidden.
