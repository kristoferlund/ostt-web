# Why OSTT?

OSTT exists for developers and power users who want speech-to-text to behave like the rest of their toolchain: transparent, scriptable, provider-agnostic, and comfortable on Linux.

Many dictation apps are polished GUI products built around a proprietary cloud, a subscription, or a Mac-first workflow. OSTT takes a smaller approach. It is open source, terminal-native, bring-your-own-key, and designed so transcription output can move through shell pipelines, AI prompts, files, clipboards, hotkeys, and scripts.

## Where OSTT Is Different

### Linux Is a First-Class Target

Many popular dictation tools focus on macOS, Windows, and mobile. OSTT is built with Linux desktop workflows in mind: Wayland clipboard handling, Omarchy/Hyprland setup, GNOME and KDE guides, AUR packaging, native Linux packages, and a popup launcher that works from global hotkeys.

### Provider Choice

OSTT does not force one transcription backend. You can choose from OpenAI, Deepgram, Groq, DeepInfra, AssemblyAI, Berget, and ElevenLabs, then switch models when your needs change.

This matters for quality, latency, price, language support, and regulatory requirements. For example, Berget provides Swedish/EU-hosted transcription options for users who care about data residency.

### Retry With Another Model

OSTT stores recordings locally so you can re-transcribe the same audio later.

```bash
ostt retry
ostt retry 3 -c
```

If one model gets a term wrong, switch provider/model with `ostt auth` and retry the same recording without speaking again.

### Scriptable Post-Processing

OSTT can run processing actions after transcription. AI actions work like configurable dictation modes in GUI tools: transcription goes into a prompt, processed text comes out.

Bash actions are the unusual part. They let you pipe transcribed text through any command or script, so processing can be as simple as text cleanup or as specific as your own local workflow.

### Terminal-Native Workflow

OSTT treats stdout, files, clipboard output, command aliases, logs, shell completions, and pipelines as core features rather than afterthoughts.

```bash
ostt | grep invoice
ostt -p clean -c
ostt transcribe meeting.mp3 -p summary -o summary.txt
ostt process 2 -a cmd
```

For users who live in the terminal, this is the main idea.

## Comparison

This table is a high-level comparison against common voice-to-text tools. Capabilities change over time, so treat it as positioning rather than a permanent claim.

| Capability | OSTT | Typical GUI Dictation Apps |
| --- | --- | --- |
| Linux-first setup | Yes | Usually no |
| macOS support | Yes | Usually yes |
| Open source | Yes | Usually no |
| BYO API key | Yes | Sometimes |
| Multiple transcription providers | Yes | Often one provider or model family |
| Terminal-native workflow | Yes | No |
| Global hotkey popup | Yes | Yes |
| File transcription | Yes | Sometimes |
| Local transcription history | Yes | Usually yes |
| Retry same recording with another model | Yes | Rare |
| AI post-processing | Yes | Often yes |
| Bash/shell post-processing | Yes | No |
| Context/screen awareness | No | Often yes |
| Streaming transcription | No | Often yes |
| Direct text injection | Clipboard by default | Often yes |
| On-device transcription | No | Sometimes |

## What OSTT Does Not Try To Be

OSTT is not trying to be a mobile dictation app, a real-time streaming transcription overlay, or a screen-aware assistant that reads every app you use. Those are valid tools, but they pull in a different direction from a terminal-native, scriptable tool.

OSTT optimizes for control, composability, provider choice, and developer workflows. If you want voice input that behaves like a command-line tool, OSTT is built for that niche.
