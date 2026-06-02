---
layout: false
title: "Groq Whisper from the Command Line — OSTT"
description: "Run Groq Whisper Large v3 and Turbo from the terminal on Linux and macOS. OSTT connects Groq's LPU-powered speech recognition to your hotkey, clipboard, and shell pipeline."
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
    <h1>Groq Whisper from the command line.</h1>
    <p class="lede">Groq runs OpenAI's Whisper models on its LPU hardware — purpose-built inference chips that transcribe a 10-minute recording in about 4 seconds, 4–5x faster than the OpenAI Whisper API at a fraction of the cost. OSTT connects Groq to your terminal, hotkey, and shell pipeline on Linux and macOS.</p>
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
        <p class="eyebrow">Groq Whisper</p>
        <h2>216x real-time speed. $0.04 per hour.</h2>
        <p>Groq's LPU (Language Processing Unit) infrastructure runs Whisper Large v3 Turbo at 216x real-time speed — a 10-minute recording returns in roughly 4 seconds. Independent benchmarks put Groq at 4–5x lower latency than the OpenAI Whisper endpoint, at about 9x lower cost. Two models: whisper-large-v3-turbo for speed and cost, whisper-large-v3 for maximum accuracy and translation support.</p>
      </div>
      <div class="command-card">
        <pre><code># ~/.config/ostt/ostt.toml&#10;&#91;transcription&#93;&#10;provider = &quot;groq&quot;&#10;model = &quot;whisper-large-v3-turbo&quot;&#10;&#10;# For maximum accuracy or audio translation support&#10;# model = &quot;whisper-large-v3&quot;&#10;&#10;&#91;model_options.&quot;groq/whisper-large-v3-turbo&quot;&#93;&#10;language = &quot;en&quot;&#10;response_format = &quot;verbose_json&quot;&#10;timestamp_granularities = &#91;&quot;word&quot;, &quot;segment&quot;&#93;&#10;&#10;# Pick interactively&#10;ostt model&#10;&#10;# Record with hotkey, transcribe with Groq, copy to clipboard&#10;ostt launch -c</code></pre>
      </div>
    </section>
  </div>

  <section class="landing-grid">
    <article>
      <h3>216x real-time transcription</h3>
      <p>Groq's LPU hardware processes audio dramatically faster than GPU-based providers. A 10-minute recording returns in ~4 seconds. For a hotkey dictation workflow, that means text in your clipboard before your hand reaches the keyboard.</p>
    </article>
    <article>
      <h3>Best cost/performance ratio</h3>
      <p>Whisper Large v3 Turbo costs $0.04/hr ($0.00067/min) — roughly 9x cheaper than OpenAI at the same price point. At high volume, that difference compounds quickly. Whisper Large v3 is available at $0.111/hr for translation and accuracy-critical work.</p>
    </article>
    <article>
      <h3>Two models, one decision</h3>
      <p>Groq documents <code>whisper-large-v3-turbo</code> as the best price/performance choice for multilingual transcription and <code>whisper-large-v3</code> as the accuracy-sensitive model with translation support. Switch between them via <code>ostt model</code>.</p>
    </article>
    <article>
      <h3>99+ languages</h3>
      <p>Groq Whisper supports the same 99+ language breadth as the base Whisper model. Turbo handles multilingual audio; Large v3 adds translation to English for non-English source audio.</p>
    </article>
    <article>
      <h3>Validated Groq options</h3>
      <p>Use <code>--mo language=en</code>, <code>--mo prompt=...</code>, <code>--mo temperature=0</code>, or timestamp metadata through <code>response_format=verbose_json</code> and <code>timestamp_granularities=word,segment</code>.</p>
    </article>
    <article>
      <h3>Retry without re-recording</h3>
      <p>OSTT saves every recording locally. Run <code>ostt retry</code> to re-transcribe with Groq, or switch to any other provider — without speaking again.</p>
    </article>
  </section>

  <div class="surface-band">
    <section class="landing-section">
      <p class="eyebrow">Workflow</p>
      <h2>From speech to useful output.</h2>
      <div class="steps">
        <div><strong>1. Record</strong><span>Press your global hotkey or run <code>ostt</code> in the terminal.</span></div>
        <div><strong>2. Transcribe</strong><span>Groq's LPU infrastructure processes the audio in seconds.</span></div>
        <div><strong>3. Process</strong><span>Optionally run AI prompts or shell commands on the result.</span></div>
        <div><strong>4. Send</strong><span>Print to stdout, copy to clipboard, write to a file, or pipe onward.</span></div>
      </div>
    </section>
  </div>

  <section class="landing-section split pipeline-section">
    <div>
      <p class="eyebrow">Pipeline</p>
      <h2>The fastest path from voice to shell.</h2>
      <p>Groq's throughput makes OSTT feel instant. Press your hotkey, speak, and the transcript is in your clipboard before you've switched windows. Pipe the output through any CLI tool. Use <code>ostt model options groq/whisper-large-v3-turbo</code> to list supported Groq <code>--mo</code> keys.</p>
    </div>
    <div class="command-card">
      <pre><code># Transcribe a 10-minute recording — returns in ~4 seconds&#10;ostt transcribe meeting.mp3 -o notes.md&#10;&#10;# Record, process with AI action, copy to clipboard&#10;ostt -p clean -c&#10;&#10;# Pipe directly to another command&#10;ostt | xargs -I{} notify-send &quot;Transcribed&quot; &quot;{}&quot;</code></pre>
    </div>
  </section>

  <section class="landing-section final-cta">
    <h2>Groq speed in your terminal.</h2>
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
      <a href="/reference/providers/groq">Groq provider reference</a>
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
