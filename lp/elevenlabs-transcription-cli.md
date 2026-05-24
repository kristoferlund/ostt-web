---
layout: false
title: "ElevenLabs Scribe v2 from the Command Line — OSTT"
description: "Use ElevenLabs Scribe v2 from your terminal on Linux and macOS. OSTT connects the most accurate speech-to-text model available to your hotkey, clipboard, and shell pipeline."
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
    <h1>ElevenLabs Scribe v2 from the command line.</h1>
    <p class="lede">ElevenLabs Scribe v2 holds the top position on the Artificial Analysis speech-to-text benchmark with a 2.2% word error rate — lower than GPT-4o-transcribe, AssemblyAI, Deepgram, and Google. It transcribes in 99 languages, detects non-speech events, and identifies entities. OSTT connects it directly to your terminal, hotkey, and shell.</p>
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
        <p class="eyebrow">ElevenLabs Scribe v2</p>
        <h2>2.2% WER. The most accurate model available.</h2>
        <p>On the Artificial Analysis AA-WER v2 benchmark — which weights real-world audio including diverse accents and domain-specific language — Scribe v2 scores 2.2%, outperforming every major provider. It handles long-form audio with consistent accuracy across speaker changes, accents, and recording conditions. It detects non-speech events (laughter, footsteps), identifies entities across 56 categories, and supports smart speaker diarization. OSTT brings all of this to your keyboard.</p>
      </div>
      <div class="command-card">
        <pre><code># ~/.config/ostt/ostt.toml&#10;&#91;provider&#93;&#10;name = &quot;elevenlabs&quot;&#10;model = &quot;elevenlabs-scribe-v2&quot;&#10;&#10;&#91;providers.elevenlabs&#93;&#10;# language_code = &quot;eng&quot;  # Optional: set to force language&#10;&#10;# Pick interactively&#10;ostt model&#10;&#10;# Record with hotkey, transcribe with Scribe v2, copy to clipboard&#10;ostt launch -c</code></pre>
      </div>
    </section>
  </div>

  <section class="landing-grid">
    <article>
      <h3>#1 accuracy benchmark</h3>
      <p>Scribe v2 leads the Artificial Analysis AA-WER v2 leaderboard at 2.2% WER, ahead of AssemblyAI Universal-3 Pro (3.3%), GPT-4o-transcribe (4.1%), and Deepgram Nova-3 (5.3%). For work where every word matters — legal, medical, research — this gap is significant.</p>
    </article>
    <article>
      <h3>99 languages, auto-detected</h3>
      <p>Scribe v2 supports 99 languages with automatic language detection. It handles mid-file language switches without configuration. Set a <code>language_code</code> in ostt.toml to lock a specific language and improve accuracy when the source is known.</p>
    </article>
    <article>
      <h3>Non-speech event detection</h3>
      <p>Scribe v2 detects and labels non-speech events such as laughter, applause, and background noise — useful for meeting notes, research transcription, and media workflows where context matters beyond the words spoken.</p>
    </article>
    <article>
      <h3>Entity detection</h3>
      <p>Built-in detection across 56 entity categories including PII, health data, and payment details, with precise timestamps. Useful for redaction workflows and structured audio analysis.</p>
    </article>
    <article>
      <h3>Smart speaker diarization</h3>
      <p>Identify and label multiple speakers with precise word-level timestamps. Scribe v2 handles a wide range of speaker counts with accurate attribution across accents and delivery styles.</p>
    </article>
    <article>
      <h3>Keyterm prompting</h3>
      <p>Provide up to 100 domain-specific terms, product names, or technical vocabulary. Scribe v2 applies them in context — not just as keyword matching — for accurate transcription of the terms that matter most.</p>
    </article>
  </section>

  <div class="surface-band">
    <section class="landing-section">
      <p class="eyebrow">Workflow</p>
      <h2>From speech to useful output.</h2>
      <div class="steps">
        <div><strong>1. Record</strong><span>Press your global hotkey or run <code>ostt</code> in the terminal.</span></div>
        <div><strong>2. Transcribe</strong><span>Scribe v2 processes the audio via the ElevenLabs API.</span></div>
        <div><strong>3. Process</strong><span>Optionally run AI prompts or shell commands on the result.</span></div>
        <div><strong>4. Send</strong><span>Print to stdout, copy to clipboard, write to a file, or pipe onward.</span></div>
      </div>
    </section>
  </div>

  <section class="landing-section split pipeline-section">
    <div>
      <p class="eyebrow">Pipeline</p>
      <h2>Benchmark accuracy in your shell.</h2>
      <p>OSTT connects Scribe v2 to your shell like any other Unix tool. Transcription output lands on stdout — pipe it through <code>jq</code>, <code>sed</code>, or any CLI tool. Use <code>-p</code> to chain AI processing actions on the result. Add technical vocabulary to OSTT keywords once and improve accuracy across every recording.</p>
    </div>
    <div class="command-card">
      <pre><code># Transcribe an interview with Scribe v2&#10;ostt transcribe interview.mp3 -o transcript.txt&#10;&#10;# Record, process with AI action, copy result&#10;ostt -p clean -c&#10;&#10;# Transcribe a long recording, summarize, write to file&#10;ostt transcribe lecture.mp3 -p summary -o notes.md</code></pre>
    </div>
  </section>

  <section class="landing-section final-cta">
    <h2>The most accurate transcription model in your terminal.</h2>
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
      <a href="/reference/providers#elevenlabs">ElevenLabs provider reference</a>
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
