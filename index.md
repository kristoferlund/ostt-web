---
layout: false
---

<header class="site-header">
  <div class="header-inner">
    <a href="/" class="header-logo">OSTT</a>
    <nav class="header-nav">
      <a href="/guide/getting-started">Documentation</a>
      <a href="https://github.com/kristoferlund/ostt">GitHub</a>
    </nav>
  </div>
</header>

<main class="landing">
  <section class="landing-hero">
    <img class="logo logo-dark" src="/logo-white.png" alt="OSTT" />
    <img class="logo logo-light" src="/logo-black.png" alt="OSTT" />
    <h1>Open source voice-to-text for Linux. And macOS.</h1>
    <p className="lede">OSTT is a terminal-native speech-to-text tool. Record from a hotkey, transcribe with your chosen provider, then send the result to your clipboard, a file, stdout, an AI prompt, or any shell command.</p>
    <button class="install-block" onclick="navigator.clipboard.writeText('curl -fsSL https://ostt.ai/install | bash'); const t = this; t.classList.add('copied'); setTimeout(() => t.classList.remove('copied'), 2000);" aria-label="Copy install command">
      <code>
        <span class="dim">curl -fsSL https://</span><span class="highlight">ostt.ai/install</span><span class="dim"> | bash</span>
      </code>
      <span class="copy-icons">
        <svg class="icon-copy" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
        <svg class="icon-check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
      </span>
    </button>
  </section>

  <section class="landing-section split">
    <div>
      <p class="eyebrow">Why</p>
      <h2>Voice input for the terminal.</h2>
    </div>
    <p>OSTT gives you stdout, clipboard, files, history, retry, provider choice, and process actions that fit the shell workflows you already use. It is not a GUI dictation app -- it is a command-line tool for voice.</p>
  </section>

  <section class="landing-section split">
    <div class="command-card">
      <pre><code>ostt launch -c
# Press once to start. Press again to transcribe.</code></pre>
    </div>
    <div>
      <p class="eyebrow">Global hotkey</p>
      <h2>Pop up from any app.</h2>
      <p>OSTT is a terminal app that stays out of your way until you need it. Bind <code>ostt launch -c</code> to a keyboard shortcut in your desktop environment, macOS Shortcuts.app, or window manager. Press it once: a popup terminal appears and starts recording. Press it again: recording stops, the audio is transcribed, and the text lands on your clipboard.</p>
      <p>It works on Hyprland, GNOME, KDE, and macOS. The popup is configurable -- set the size, position, font size, and whether to show window decorations. OSTT auto-detects a supported terminal or you can set one explicitly.</p>
    </div>
  </section>

  <section class="landing-grid">
    <article>
      <h3>Linux-first</h3>
      <p>Global hotkey setup for Omarchy/Hyprland, GNOME, KDE, and other Linux desktops, with macOS support too.</p>
    </article>
    <article>
      <h3>Bring your own provider</h3>
      <p>Use OpenAI, Deepgram, Groq, DeepInfra, AssemblyAI, Berget, or ElevenLabs. Switch models when quality, latency, price, or data location matters.</p>
    </article>
    <article>
      <h3>Process with AI or bash</h3>
      <p>Run AI prompts or shell commands after transcription with `ostt -p` and `ostt process`.</p>
    </article>
    <article>
      <h3>Retry without re-recording</h3>
      <p>Recordings are saved locally, so you can re-transcribe the same audio with a different provider or model.</p>
    </article>
    <article>
      <h3>Recordings saved locally</h3>
      <p>Every recording stays on your machine. Replay them, retry with a different provider, or delete them. Nothing is uploaded unless you choose to transcribe.</p>
    </article>
    <article>
      <h3>Open source, no subscription</h3>
      <p>The code is public, the config is local, and the providers are the ones you choose.</p>
    </article>
  </section>

  <div class="surface-band">
    <section class="landing-section">
      <p class="eyebrow">Workflow</p>
      <h2>From speech to useful output.</h2>
      <div class="steps">
        <div><strong>1. Record</strong><span>Use the terminal or a global hotkey popup.</span></div>
        <div><strong>2. Transcribe</strong><span>Choose the provider and model that fit the job.</span></div>
        <div><strong>3. Process</strong><span>Optionally run AI prompts or shell commands.</span></div>
        <div><strong>4. Send</strong><span>Print, copy, write to a file, or pipe onward.</span></div>
      </div>
    </section>
  </div>

  <section class="landing-section split">
    <div>
      <p class="eyebrow">Pipeline</p>
      <h2>Transcribe once. Route anywhere.</h2>
      <p>OSTT's pipeline plugs transcription into anything you already run. Process audio files from scripts and CI jobs. Wire the output to OpenCode, Claude Code, or any AI tool. Pipe through custom bash commands. The <code>-p</code> flag puts it all one flag away.</p>
    </div>
    <div class="command-card">
      <pre><code>ostt -p clean -c
ostt transcribe meeting.mp3 -p summary -o notes.md
ostt process 2 -a cmd</code></pre>
    </div>
  </section>

  <section class="landing-grid">
    <article>
      <h3>File transcription in CI</h3>
      <p>Transcribe audio files from scripts, cron jobs, or CI pipelines without a microphone. Process meeting recordings, voicemails, or dictation files with the same provider choice and processing pipeline as live recording.</p>
    </article>
    <article>
      <h3>Agent-ready transcription</h3>
      <p>Connect OSTT to OpenCode, Claude Code, Gemini CLI, or Codex CLI. Your agent gets configurable, multi-provider transcription with per-action model selection and no vendor lock-in.</p>
    </article>
    <article>
      <h3>Terminal-native automation</h3>
      <p>Pipe transcription through <code>jq</code>, <code>sed</code>, <code>awk</code>, or any CLI tool. Chain recording, processing, and output into a single shell pipeline. Alias your most common workflow and run it from a hotkey.</p>
    </article>
  </section>

  <section class="landing-section final-cta">
    <p class="eyebrow">Start</p>
    <h2>Install OSTT and bind your first hotkey.</h2>
    <button class="install-block" onclick="navigator.clipboard.writeText('curl -fsSL https://ostt.ai/install | bash'); const t = this; t.classList.add('copied'); setTimeout(() => t.classList.remove('copied'), 2000);" aria-label="Copy install command">
      <code>
        <span class="dim">curl -fsSL https://</span><span class="highlight">ostt.ai/install</span><span class="dim"> | bash</span>
      </code>
      <span class="copy-icons">
        <svg class="icon-copy" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
        <svg class="icon-check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
      </span>
    </button>
    <div class="landing-actions">
      <a href="/guide/getting-started">Documentation</a>
      <a href="/guide/processing">Processing actions</a>
    </div>
  </section>
</main>

<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-brand">
      <strong>OSTT</strong>
      <span>Open source voice-to-text for developers. Linux-first, provider-agnostic, scriptable.</span>
    </div>
    <div class="footer-links">
      <a href="/guide/getting-started">Documentation</a>
      <a href="/guide/why-ostt">Why OSTT?</a>
      <a href="/guide/commands">Commands</a>
      <a href="/guide/platforms">Platforms</a>
    </div>
    <div class="footer-links">
      <a href="https://github.com/kristoferlund/ostt">GitHub</a>
      <a href="/reference/providers">Providers</a>
      <a href="/guide/troubleshooting">Troubleshooting</a>
    </div>
  </div>
</footer>
