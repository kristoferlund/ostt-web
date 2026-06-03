---
layout: false
title: "OSTT vs Hyprwhspr: Linux Dictation Compared"
description: "Compare OSTT and Hyprwhspr for Linux speech-to-text, system-wide dictation, local and cloud models, paste output, custom external engines, retry, and terminal workflows."
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
    <h1>OSTT vs Hyprwhspr: Linux dictation or terminal-native speech-to-text?</h1>
    <p class="lede">Hyprwhspr is a polished Linux system-wide dictation project with Wayland-focused setup, visual feedback, local backends, model controls, and automatic paste into the active buffer. OSTT is the better fit when you want open speech-to-text that works as a developer tool: choose any provider, use local or cloud models, paste into apps, retry saved recordings, transcribe files, and process text with AI prompts or shell commands.</p>
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
      <a href="/guide/getting-started">Try OSTT</a>
      <a href="/guide/platforms/hyprland">Hyprland setup</a>
    </div>
  </section>

  <div class="surface-band">
    <section class="landing-section split">
      <div>
        <p class="eyebrow">Short Answer</p>
        <h2>Choose OSTT when you want speech-to-text to behave like a Unix tool.</h2>
        <p>Hyprwhspr is designed around fast Linux dictation: press a hotkey, speak, stop, and text appears in the active buffer. OSTT can also paste into the focused app, but its bigger advantage is what happens around the transcript: model switching, retry, history, file transcription, stdout, clipboard, custom engines, provider params, deterministic replace rules, and AI or bash processing.</p>
      </div>
      <div class="command-card">
        <pre><code># Hotkey-friendly dictation into the focused app&#10;ostt launch --paste&#10;&#10;# Use a different model for one recording&#10;ostt launch --paste -m openai/gpt-4o-transcribe&#10;&#10;# Retry the same recording with a local model&#10;ostt retry -m whisper/turbo&#10;&#10;# Send transcript through an action before paste&#10;ostt launch --paste -p clean</code></pre>
      </div>
    </section>
  </div>

  <section class="landing-section">
    <p class="eyebrow">Feature Comparison</p>
    <h2>Hyprwhspr is a Linux dictation app. OSTT is a speech-to-text pipeline.</h2>
    <div class="comparison-scroll">
      <table class="comparison-table">
        <thead>
          <tr><th>Capability</th><th>OSTT</th><th>Hyprwhspr</th></tr>
        </thead>
        <tbody>
          <tr><td>Open source</td><td>✅ MIT, Rust</td><td>✅ MIT, Python</td></tr>
          <tr><td>Linux support</td><td>✅ Linux-first platform guides for Omarchy/Hyprland, GNOME, KDE, and other desktops</td><td>✅ Linux system-wide dictation focus with Wayland/systemd setup</td></tr>
          <tr><td>macOS support</td><td>✅ macOS supported</td><td>❌ Public docs describe Linux support</td></tr>
          <tr><td>Focused app insertion</td><td>✅ <code>--paste</code> sends text to the focused app and can restore the previous clipboard</td><td>✅ Auto-paste into the active buffer is a core documented workflow</td></tr>
          <tr><td>Cloud transcription providers</td><td>✅ OpenAI, Deepgram, Groq, DeepInfra, AssemblyAI, Berget, ElevenLabs, Mistral</td><td>✅ REST API and realtime WebSocket backends are documented for cloud-style integrations</td></tr>
          <tr><td>Built-in local transcription</td><td>✅ Built-in Whisper-compatible local models</td><td>✅ Public docs describe Cohere Transcribe, Parakeet, Whisper, onnx-asr, and related local backends</td></tr>
          <tr><td>External local engines</td><td>✅ <code>command/&lt;profile&gt;</code> and <code>http/&lt;profile&gt;</code> integrations for user-managed engines</td><td>✅ Broad backend setup is a core Hyprwhspr feature</td></tr>
          <tr><td>Retry same recording with another model</td><td>✅ First-class <code>ostt retry -m PROVIDER/MODEL</code></td><td>⚠️ Not the main documented workflow</td></tr>
          <tr><td>File/stdout/shell workflows</td><td>✅ Core workflow: stdout, files, clipboard, paste, scripts, and processing actions</td><td>⚠️ Dictation-oriented, with command controls and capture workflows documented</td></tr>
          <tr><td>Recording modes</td><td>⚠️ Terminal recorder, popup launcher, pause/resume, file transcription, retry, replay</td><td>✅ Public docs describe toggle, push-to-talk, auto, and long-form modes</td></tr>
          <tr><td>Visual/audio feedback</td><td>⚠️ Terminal visualization and popup workflow</td><td>✅ Themed visualizer, notifications, audio cues, Waybar integration, and audio ducking are documented</td></tr>
          <tr><td>Text cleanup</td><td>✅ Keywords, deterministic replace rules, AI actions, and bash actions</td><td>✅ Word overrides, prompts, filler handling, and symbol replacement are documented</td></tr>
          <tr><td>Provider-neutral params</td><td>✅ <code>--param</code> validation and per-model config across cloud, local, command, and HTTP providers</td><td>⚠️ Backend-specific configuration rather than OSTT-style provider/model IDs</td></tr>
        </tbody>
      </table>
    </div>
  </section>

  <section class="landing-grid compact">
    <article>
      <h3>Use OSTT for provider choice</h3>
      <p>Switch between OpenAI, Deepgram, Groq, DeepInfra, AssemblyAI, Berget, ElevenLabs, Mistral, local Whisper, command engines, and HTTP endpoints.</p>
    </article>
    <article>
      <h3>Use OSTT for retry</h3>
      <p>Speak once, then compare models on the same saved audio with <code>ostt retry -m PROVIDER/MODEL</code>. This is useful for accents, technical vocabulary, and noisy rooms.</p>
    </article>
    <article>
      <h3>Use OSTT for files and scripts</h3>
      <p>Transcribe <code>meeting.mp3</code>, write <code>notes.md</code>, pipe stdout into tools, or process history entries without treating dictation as only an active-window feature.</p>
    </article>
    <article>
      <h3>Use OSTT for custom engines</h3>
      <p>Keep OSTT lean while calling your own Parakeet, faster-whisper, Speaches, LocalAI, Cohere Transcribe, or research-model wrapper.</p>
    </article>
    <article>
      <h3>Use OSTT for developer cleanup</h3>
      <p>Combine <code>ostt keyword</code>, <code>ostt replace</code>, and processing actions so transcripts spell product names, acronyms, code terms, and project vocabulary correctly.</p>
    </article>
    <article>
      <h3>Use Hyprwhspr for pure Linux dictation</h3>
      <p>If your priority is a Linux-only dictation daemon with visualizer, Waybar integration, long-form modes, and broad local backend setup, Hyprwhspr is strong.</p>
    </article>
  </section>

  <div class="surface-band">
    <section class="landing-section">
      <p class="eyebrow">Workflow Difference</p>
      <h2>OSTT turns dictation into reusable text operations.</h2>
      <div class="steps">
        <div><strong>1. Record</strong><span>Use the terminal, a popup hotkey, or an existing audio file.</span></div>
        <div><strong>2. Choose</strong><span>Select a cloud model, local Whisper model, command engine, or HTTP endpoint.</span></div>
        <div><strong>3. Transform</strong><span>Apply replace rules, AI processing, or bash commands.</span></div>
        <div><strong>4. Route</strong><span>Paste into the app, copy, write a file, print stdout, or retry with another model.</span></div>
      </div>
    </section>
  </div>

  <section class="landing-section split pipeline-section">
    <div>
      <p class="eyebrow">Model Choice</p>
      <h2>Local when you need privacy. Cloud when you need hosted quality. External when you want experiments.</h2>
      <p>OSTT does not ask you to bet everything on one backend. Start with a hosted model, use local Whisper for sensitive work, add Berget for Swedish and EU-focused transcription, or connect a custom local HTTP endpoint when you want newer ASR engines.</p>
    </div>
    <div class="command-card">
      <pre><code># Pick a provider interactively&#10;ostt model&#10;&#10;# Use OpenAI for one run&#10;ostt -m openai/gpt-4o-transcribe --paste&#10;&#10;# Use Berget for Swedish&#10;ostt -m berget/KBLab/kb-whisper-large --param language=sv -c&#10;&#10;# Use a custom local HTTP engine&#10;ostt -m http/speaches --paste</code></pre>
    </div>
  </section>

  <section class="landing-section final-cta">
    <h2>Try OSTT as your Hyprwhspr alternative.</h2>
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
      <a href="/guide/choosing-a-model">Choose a model</a>
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
      <a href="/guide/platforms/hyprland">Hyprland setup</a>
      <a href="/guide/commands">Commands</a>
      <a href="/guide/external-engines">External engines</a>
    </div>
    <div class="footer-links">
      <a href="https://github.com/kristoferlund/ostt">GitHub</a>
      <a href="https://github.com/goodroot/hyprwhspr">Hyprwhspr GitHub</a>
      <a href="/reference/providers">Providers</a>
    </div>
  </div>
</footer>
