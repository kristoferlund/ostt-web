---
description: Keep a local model loaded in a background process to eliminate per-transcription load time. Install as a systemd or launchd login service.
---

# Daemon Mode

When OSTT transcribes with a local model, it loads the model from disk on every call and releases it when done. For small models this adds half a second or so. For large models it can add 5–15 seconds — a noticeable pause before every transcription.

Daemon mode keeps the model loaded in a background process. Start it manually, or install it as a login service, when you want local transcriptions to avoid loading the model each time.

Daemon mode only applies to local models. It has no effect when using cloud providers.

## How It Works

Daemon mode is controlled with `ostt daemon` commands, not with `ostt.toml` settings:

- `ostt daemon start` starts a background daemon for the active local model.
- `ostt daemon stop` stops it.
- `ostt daemon install` installs it as a login service.
- If you do not start or install the daemon, local transcription runs directly in the OSTT process.

## Configuration

There are no daemon settings in `ostt.toml`. Daemon mode uses the currently active local model selected with `ostt model`.

## Daemon Commands

All daemon commands are under `ostt daemon` (alias: `ostt d`).

### `ostt daemon start`

Starts the daemon for the currently active local model. If a daemon is already running for a different model, it is stopped first.

```bash
ostt daemon start
```

Daemons started this way have no idle timeout and run until explicitly stopped or the machine reboots.

### `ostt daemon stop`

Stops the running daemon gracefully.

```bash
ostt daemon stop
```

### `ostt daemon restart`

Stops the running daemon and starts a fresh one for the currently active model. Use this after upgrading OSTT so the daemon runs the new version.

```bash
ostt daemon restart
```

### `ostt daemon status`

Shows the current state of the daemon.

```
Status:  running
PID:     72233
Socket:  /home/you/.local/share/ostt/ostt-daemon.sock
Model:   turbo
Backend: CUDA0 (NVIDIA GeForce RTX 4080, 16376 MB)
Service: installed (~/.config/systemd/user/ostt-daemon.service)
Log:     ostt logs
```

`Backend` shows where the model runs: `CUDA0`, `Vulkan0` or `MTL0` for a GPU, `CPU` otherwise. See [GPU Acceleration](./gpu-acceleration).

If the daemon is loaded with a different model than the currently active one:

```
Status:  running
Model:   tiny (active: turbo)
Warning: run 'ostt daemon restart' to load the active model
```

## Install as a Login Service

To have the daemon start automatically at login and restart on crash, install it as a service:

```bash
ostt daemon install
```

**macOS** — writes a launchd plist to `~/Library/LaunchAgents/ai.ostt.daemon.plist` and loads it immediately.

**Linux** — writes a systemd user unit to `~/.config/systemd/user/ostt-daemon.service` and runs `systemctl --user enable --now ostt-daemon`. Logs are also available via journald:

```bash
journalctl --user -u ostt-daemon -f
```

To remove the service:

```bash
ostt daemon uninstall
```

The service loads the model that is active when it starts. While it runs, it follows the local model you select with `ostt model`.

## Model Screen

Press `s` on the `ostt model` screen to start or stop the daemon. Starting needs a local model to be selected.

The footer shows the daemon's state, the model it has loaded and its backend, for example `daemon on · parakeet-ultra · CUDA0`. It updates every two seconds, so a daemon started or stopped elsewhere shows up too.

A running daemon follows your selection: activating another local model reloads the daemon with it, with no restart needed. Selecting a cloud model leaves the daemon running with its local model, so switching back is instant. Press `s` to stop it and free the memory.
