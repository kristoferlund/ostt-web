# Commands

## Recording

```bash
ostt                 # Same as ostt record
ostt record          # Record and print transcription to stdout
ostt -c              # Record and copy to clipboard
ostt -o notes.txt    # Record and write to file
```

`record` is the default command, so `ostt -c` and `ostt record -c` are equivalent.

## Popup Launch

```bash
ostt launch -c
ostt launch -c -p clean
```

`launch` opens OSTT in a popup terminal. If an OSTT recording process is already running, running `ostt launch` again stops that recording and triggers transcription.

Alias: `ostt l`.

## Transcribe Existing Audio

```bash
ostt transcribe recording.ogg
ostt transcribe voice-memo.mp3 -c
ostt transcribe meeting.wav -o transcript.txt
ostt transcribe audio.ogg -p clean -c
```

Alias: `ostt t`.

## Retry and Replay

```bash
ostt retry           # Re-transcribe the most recent recording
ostt retry 3         # Re-transcribe recording #3
ostt retry -p clean  # Re-transcribe, process, print result
ostt replay          # Play most recent recording
ostt replay 2        # Play recording #2
```

Recording indexes are 1-based, with `1` being the most recent recording.

## Processing

```bash
ostt process                 # Process most recent history item, show picker
ostt process 3               # Process history item #3, show picker
ostt process -a clean -c     # Run clean action and copy result
ostt process --list          # List configured process actions
```

Alias: `ostt p`.

See [Processing Actions](./processing.md) for configuration.

## Setup and Utilities

```bash
ostt auth                    # Select provider/model and save API key
ostt history                 # Browse transcription history
ostt keywords                # Manage transcription keywords
ostt config                  # Open ~/.config/ostt/ostt.toml
ostt list-devices            # List audio input devices
ostt logs                    # Show recent logs
ostt completions zsh         # Generate shell completions
ostt --version               # Show version
ostt --help                  # Detailed help
```

Common aliases: `r` for `record`, `t` for `transcribe`, `l` for `launch`, `p` for `process`, `a` for `auth`, `h` for `history`, `k` for `keywords`, `c` for `config`, and `rp` for `replay`.
