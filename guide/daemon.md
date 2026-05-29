---
description: Keep a local Whisper model loaded in a background process to eliminate per-transcription load time. Install as a systemd or launchd login service.
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

Stops the running daemon and starts a fresh one for the currently active model. Use this after switching models with `ostt model` if you want to pre-warm the new model.

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
Service: installed (~/.config/systemd/user/ostt-daemon.service)
Log:     ostt logs
```

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

The service always loads the model that is active in config at the time it runs. After switching models with `ostt model`, run `ostt daemon restart` to load the new model.

## Model Screen

The `ostt model` screen shows a `run` badge next to any model currently loaded in the daemon. The badge updates every two seconds. After switching models, run `ostt daemon restart` to load the new active model.
