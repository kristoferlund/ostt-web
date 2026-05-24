---
layout: false
title: "Deepgram Nova-3 on the Command Line — OSTT"
description: "Use Deepgram Nova-3 for speech-to-text from your terminal. OSTT connects Nova-3 to a global hotkey, clipboard, and shell pipeline on Linux and macOS."
---

<header class="site-header">
  <div class="header-inner">
    <a href="/" class="header-logo" aria-label="OSTT home">
      <span class="logo-mark" aria-hidden="true"></span>
    </a>
    <nav class="header-nav">
      <a href="/guide/getting-started">Documentation</a>
      <a href="https://github.com/kristoferlund/ostt">GitHub</a>
    </nav>
  </div>
</header>

<main class="landing">

  <section class="landing-hero">
    <h1>Deepgram Nova-3 from the command line.</h1>
    <p class="lede">OSTT gives you direct access to Deepgram Nova-3 from your terminal. Bind it to a global hotkey, pipe the transcript to your clipboard, a file, or an AI tool — on Linux and macOS.</p>
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

  <div class="surface-band">
    <section class="landing-section split">
      <div>
        <p class="eyebrow">Deepgram Nova-3</p>
        <h2>Fast, accurate, affordable transcription.</h2>
        <p>Nova-3 is Deepgram's flagship general-purpose speech model. It delivers low latency and high accuracy across a wide range of accents and audio conditions — at a fraction of the cost of comparable cloud models. OSTT connects it directly to your keyboard and shell.</p>
      </div>
      <div class="command-card">
        <pre><code># Set Nova-3 as your default in ~/.config/ostt/ostt.toml&#10;&#91;provider&#93;&#10;name = &quot;deepgram&quot;&#10;model = &quot;nova-3&quot;&#10;&#10;# Or pick it interactively&#10;ostt model&#10;&#10;# Record with a hotkey, transcribe with Nova-3, copy to clipboard&#10;ostt launch -c</code></pre>
      </div>
    </section>
  </div>

  <section class="landing-grid">
    <article>
      <h3>Global hotkey</h3>
      <p>Bind OSTT to a system-wide shortcut. Press to open the recorder, speak, press again to stop. Nova-3 transcribes and the result lands in your clipboard or stdout — without touching the mouse.</p>
    </article>
    <article>
      <h3>Any output target</h3>
      <p>Send Nova-3 transcription to the clipboard with <code>-c</code>, write to a file with <code>-o</code>, or print to stdout and pipe it wherever you like. One command, any destination.</p>
    </article>
    <article>
      <h3>File transcription</h3>
      <p>Transcribe existing audio files with <code>ostt transcribe meeting.mp3</code>. Run it in scripts, cron jobs, or CI pipelines. Nova-3 handles MP3, WAV, and most common formats.</p>
    </article>
    <article>
      <h3>Pipe to AI tools</h3>
      <p>Use <code>-p</code> to run a processing action after transcription. Route Nova-3 output directly into OpenCode, Claude Code, Gemini CLI, or any shell command without manual copy-paste.</p>
    </article>
    <article>
      <h3>Retry without re-recording</h3>
      <p>OSTT saves every recording locally. Run <code>ostt retry</code> to re-transcribe the same audio with Nova-3, or switch to any other provider — no need to speak again.</p>
    </article>
    <article>
      <h3>Switch providers freely</h3>
      <p>OSTT is provider-agnostic. Use Nova-3 as your default and override per-call when you need a different model or want to compare accuracy. One config file covers all providers.</p>
    </article>
  </section>

  <div class="surface-band">
    <section class="landing-section">
      <p class="eyebrow">Workflow</p>
      <h2>From speech to useful output.</h2>
      <div class="steps">
        <div><strong>1. Record</strong><span>Press your global hotkey or run <code>ostt</code> in the terminal.</span></div>
        <div><strong>2. Transcribe</strong><span>Nova-3 processes the audio via the Deepgram API.</span></div>
        <div><strong>3. Process</strong><span>Optionally run AI prompts or shell commands on the result.</span></div>
        <div><strong>4. Send</strong><span>Print to stdout, copy to clipboard, write to a file, or pipe onward.</span></div>
      </div>
    </section>
  </div>

  <section class="landing-section split pipeline-section">
    <div>
      <p class="eyebrow">Pipeline</p>
      <h2>Nova-3 inside your shell.</h2>
      <p>OSTT is a standard Unix tool. Nova-3 transcription is just text on stdout — pipe it through <code>jq</code>, <code>sed</code>, or any CLI tool. Use the <code>-p</code> flag to chain processing actions without leaving the terminal.</p>
    </div>
    <div class="command-card">
      <pre><code># Transcribe and pipe to a custom script&#10;ostt | my-script.sh&#10;&#10;# Transcribe mp3, summarize with AI, write to file&#10;ostt transcribe meeting.mp3 -p summary -o notes.md&#10;&#10;# Record, run &quot;clean&quot; processing action, copy to clipboard&#10;ostt -p clean -c</code></pre>
    </div>
  </section>

  <section class="landing-section final-cta">
    <h2>Add Nova-3 to your terminal in one command.</h2>
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
      <a href="/guide/getting-started">Read the docs</a>
      <a href="/reference/providers#deepgram">Deepgram provider reference</a>
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
