---
description: Keep a local model loaded in a background process to eliminate per-transcription load time. Install as a systemd or launchd login service.
---

# Daemon Mode

When OSTT transcribes with a local model, it loads the model from disk on every call and releases it when done. Loading takes from under a second for small models to several seconds for large ones.

Daemon mode keeps the model loaded in a background process. Start it manually, or install it as a login service.

The daemon has no `ostt.toml` settings. It serves the active local model selected with `ostt model`. Without a running daemon, local transcription loads the model in the OSTT process. Cloud providers are not affected.

The daemon only serves the model it has loaded. A run with `-m` set to a different local model loads that model in-process.

## Daemon Commands

All daemon commands are under `ostt daemon` (alias: `ostt d`).

### `ostt daemon start`

Starts the daemon for the currently active local model. If a daemon is already running for a different model, it is stopped first.

```bash
ostt daemon start
```

The daemon runs until stopped or the machine reboots.

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

**macOS:** writes a launchd plist to `~/Library/LaunchAgents/ai.ostt.daemon.plist` and loads it immediately.

**Linux:** writes a systemd user unit to `~/.config/systemd/user/ostt-daemon.service`, then enables and starts it with `systemctl --user`.

Daemon logs go to `ostt logs`.

To remove the service:

```bash
ostt daemon uninstall
```

The service loads the model that is active when it starts. Selecting another local model restarts the daemon outside the service manager, so the service takes over again at the next login.

## Model Screen

Press `s` on the `ostt model` screen to start or stop the daemon. Starting needs an active local model.

The footer shows the daemon's state, the model it has loaded and its backend, for example `daemon on · parakeet-ultra · CUDA0`. It updates every two seconds, so a daemon started or stopped elsewhere shows up too.

A running daemon follows your selection: activating another local model, here or with `ostt model select`, reloads the daemon with it. Selecting a cloud model leaves the daemon running with its local model, so switching back is instant. Press `s` to stop it and free the memory. Deleting the model the daemon has loaded also stops the daemon.
