# Troubleshooting

## View Logs

```bash
ostt logs
```

Logs are stored at `~/.local/state/ostt/ostt.log.*` with daily rotation.

For more detail:

```bash
RUST_LOG=debug ostt record
RUST_LOG=debug ostt -p clean
```

## No Audio Input

List devices:

```bash
ostt list-devices
```

Open config and set the audio device:

```bash
ostt config
```

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

Linux clipboard output requires one of these tools:

```bash
wl-copy  # Wayland, from wl-clipboard
xclip    # X11
```

macOS uses `pbcopy`.

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

## Process Action Fails

List configured actions:

```bash
ostt process --list
```

For AI actions, check that the external tool is installed and authenticated:

```bash
opencode --version
claude --version
gemini --version
codex --version
```

Run with debug logs:

```bash
RUST_LOG=debug ostt process -a clean
```
