---
layout: false
title: "OSTT vs Voxtype: Open Source Speech-to-Text Compared"
description: "Compare OSTT and Voxtype for open source speech-to-text, Linux dictation, macOS support, local models, cloud providers, paste output, custom engines, retry, and developer workflows."
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
    <h1>OSTT vs Voxtype: which open source speech-to-text tool should you choose?</h1>
    <p class="lede">Voxtype and OSTT are both open source speech-to-text tools for people who want voice input outside a proprietary dictation subscription. Voxtype is strongest as an integrated Linux dictation daemon with local engine setup. OSTT is strongest when you want provider choice, cloud or local models, paste output, saved recordings, retry, files, stdout, and shell or AI processing.</p>
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
      <a href="/guide/choosing-a-model">Choose a model</a>
    </div>
  </section>

  <div class="surface-band">
    <section class="landing-section split">
      <div>
        <p class="eyebrow">Short Answer</p>
        <h2>Choose OSTT when model choice and developer workflow matter.</h2>
        <p>Voxtype is a serious Rust-native dictation project with detailed local model, daemon, hotkey, output, GPU, and packaging docs. OSTT takes a different route: it treats speech-to-text as a terminal primitive that can paste into apps, write files, stream through stdout, call cloud or local providers, retry a saved recording, and post-process text through AI prompts or bash commands.</p>
      </div>
      <div class="command-card">
        <pre><code># Dictate into the focused app&#10;ostt launch --paste&#10;&#10;# Clean the transcript, then paste it&#10;ostt launch --paste -p clean&#10;&#10;# Transcribe a file and summarize it&#10;ostt transcribe meeting.mp3 -p summary -o notes.md&#10;&#10;# Retry the same saved audio with another model&#10;ostt retry -m deepgram/nova-3</code></pre>
      </div>
    </section>
  </div>

  <section class="landing-section">
    <p class="eyebrow">Feature Comparison</p>
    <h2>OSTT and Voxtype solve overlapping but different jobs.</h2>
    <div class="comparison-scroll">
      <table class="comparison-table">
        <thead>
          <tr><th>Capability</th><th>OSTT</th><th>Voxtype</th></tr>
        </thead>
        <tbody>
          <tr><td>Open source</td><td>✅ MIT, Rust</td><td>✅ MIT, Rust</td></tr>
          <tr><td>Linux support</td><td>✅ Linux-first docs for Omarchy/Hyprland, GNOME, KDE, and other desktops</td><td>✅ Linux-first, optimized for Wayland and documented for multiple distros</td></tr>
          <tr><td>macOS support</td><td>✅ macOS support with Homebrew and Shortcuts.app hotkeys</td><td>✅ Apple Silicon macOS support documented</td></tr>
          <tr><td>Focused app insertion</td><td>✅ <code>--paste</code> inserts into the focused app and can restore the previous clipboard</td><td>✅ Public docs describe typing/clipboard output backends and direct dictation flow</td></tr>
          <tr><td>Cloud transcription providers</td><td>✅ OpenAI, Deepgram, Groq, DeepInfra, AssemblyAI, Berget, ElevenLabs, Mistral</td><td>⚠️ Primarily local-engine oriented, with documented remote/OpenAI-style options</td></tr>
          <tr><td>Built-in local transcription</td><td>✅ Whisper-compatible local models through <code>whisper-rs</code></td><td>✅ Whisper and ONNX engine setup documented</td></tr>
          <tr><td>Custom local engines</td><td>✅ <code>command/&lt;profile&gt;</code> wrappers and <code>http/&lt;profile&gt;</code> OpenAI-compatible endpoints</td><td>✅ Public docs describe multiple local engines and engine variants</td></tr>
          <tr><td>Provider/model switching</td><td>✅ <code>ostt model</code>, <code>-m PROVIDER/MODEL</code>, and per-run <code>--param</code> overrides</td><td>✅ Engine/model configuration and setup flows</td></tr>
          <tr><td>Retry same recording with another model</td><td>✅ First-class <code>ostt retry -m PROVIDER/MODEL</code></td><td>⚠️ Not the main documented workflow</td></tr>
          <tr><td>File/stdout/shell pipelines</td><td>✅ Core workflow: stdout, files, clipboard, paste, scripts, and CI-friendly file transcription</td><td>⚠️ File transcription is documented, but the product focus is dictation</td></tr>
          <tr><td>AI and shell post-processing</td><td>✅ <code>ostt -p</code> and <code>ostt process</code> for AI prompts or bash commands</td><td>✅ Public docs describe profiles and post-processing hooks/configuration</td></tr>
          <tr><td>Text cleanup</td><td>✅ Keywords plus deterministic <code>ostt replace</code> rules for casing, acronyms, and names</td><td>✅ Public docs describe prompts, replacements, and spoken punctuation features</td></tr>
          <tr><td>Visual desktop integration</td><td>⚠️ Popup terminal and platform hotkey guides</td><td>✅ More desktop-dictation-oriented setup, notifications, and OSD options</td></tr>
        </tbody>
      </table>
    </div>
  </section>

  <section class="landing-grid compact">
    <article>
      <h3>Provider choice is the big difference</h3>
      <p>OSTT is not tied to one engine family. Use OpenAI, Deepgram, Groq, DeepInfra, AssemblyAI, Berget, ElevenLabs, Mistral, built-in local Whisper, or a custom command/HTTP engine.</p>
    </article>
    <article>
      <h3>Retry makes model choice testable</h3>
      <p>If one transcription is wrong, run <code>ostt retry -m openai/gpt-4o-transcribe</code> or <code>ostt retry -m deepgram/nova-3</code> on the same saved recording.</p>
    </article>
    <article>
      <h3>Paste is now first-class</h3>
      <p><code>ostt launch --paste</code> records from a popup, closes it, waits for focus to return, pastes into the focused app, and restores the previous clipboard when configured.</p>
    </article>
    <article>
      <h3>External engines without bundling bloat</h3>
      <p>Run faster-whisper, Parakeet, Speaches, LocalAI, Cohere Transcribe, or your own ASR wrapper separately, then connect OSTT with <code>command/*</code> or <code>http/*</code>.</p>
    </article>
    <article>
      <h3>Developer text cleanup</h3>
      <p>Use keywords to help recognition, <code>ostt replace</code> to fix final casing, and processing actions to clean, translate, summarize, or reshape text for code and AI tools.</p>
    </article>
    <article>
      <h3>Voxtype is still strong</h3>
      <p>If your priority is a dedicated Linux dictation daemon with deep local-engine and desktop-output setup, Voxtype may fit. If you want speech as a Unix-style pipeline, choose OSTT.</p>
    </article>
  </section>

  <div class="surface-band">
    <section class="landing-section">
      <p class="eyebrow">Use Cases</p>
      <h2>When OSTT is the better Voxtype alternative.</h2>
      <div class="steps">
        <div><strong>1. You use multiple providers</strong><span>Switch between cloud, local, and custom engines when quality, latency, language, or privacy changes.</span></div>
        <div><strong>2. You work in terminals</strong><span>Send voice to stdout, files, scripts, AI prompts, or shell commands without leaving the keyboard.</span></div>
        <div><strong>3. You compare models</strong><span>Save recordings and retry the same audio with a different provider instead of re-recording.</span></div>
        <div><strong>4. You need cleanup</strong><span>Combine keywords, replace rules, and processing actions for developer vocabulary and consistent formatting.</span></div>
      </div>
    </section>
  </div>

  <section class="landing-section final-cta">
    <h2>Try OSTT as your Voxtype alternative.</h2>
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
      <a href="/reference/providers">See providers</a>
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
      <a href="https://voxtype.io/docs/">Voxtype docs</a>
      <a href="/guide/choosing-a-model">Choosing a model</a>
    </div>
  </div>
</footer>
