---
layout: false
title: "ElevenLabs Scribe v2 from the Command Line"
description: "Use ElevenLabs Scribe v2 from your terminal on Linux and macOS. OSTT connects ElevenLabs' Scribe speech-to-text models to your hotkey, clipboard, and shell pipeline."
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
    <p class="lede">ElevenLabs Scribe v2 scores a 2.2% word error rate on the Artificial Analysis speech-to-text benchmark, lower than OpenAI GPT Transcribe, AssemblyAI Universal 3.5 Pro, and Deepgram Nova-3. It transcribes in 90+ languages, tags audio events, and detects entities. OSTT connects it directly to your terminal, hotkey, and shell.</p>
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
        <h2>2.2% WER on Artificial Analysis AA-WER v2.</h2>
        <p>On the Artificial Analysis AA-WER v2 benchmark, which weights real-world audio including diverse accents and domain-specific language, Scribe v2 scores 2.2%, ahead of AssemblyAI Universal 3.5 Pro (3.0%), OpenAI GPT Transcribe (3.3%), and Deepgram Nova-3 (5.2%). It handles long-form audio with consistent accuracy across speaker changes, accents, and recording conditions. It tags audio events such as laughter and footsteps, detects 65 entity types, and labels up to 32 speakers. OSTT brings all of this to your keyboard.</p>
      </div>
      <div class="command-card">
        <pre><code># ~/.config/ostt/ostt.toml&#10;&#91;transcription&#93;&#10;provider = &quot;elevenlabs&quot;&#10;model = &quot;scribe_v2&quot;&#10;&#10;&#91;elevenlabs.scribe_v2.params&#93;&#10;# language_code = &quot;eng&quot;  # Optional: set to force language&#10;# diarize = true&#10;# keyterms = &#91;&quot;OSTT&quot;, &quot;Scribe&quot;&#93;&#10;&#10;# Pick interactively&#10;ostt model&#10;&#10;# Record with hotkey, transcribe with Scribe v2, copy to clipboard&#10;ostt launch -c</code></pre>
      </div>
    </section>
  </div>

  <section class="landing-grid">
    <article>
      <h3>Benchmark accuracy</h3>
      <p>Scribe v2 scores 2.2% on the Artificial Analysis AA-WER leaderboard, ahead of AssemblyAI Universal 3.5 Pro (3.0%), OpenAI GPT Transcribe (3.3%), and Deepgram Nova-3 (5.2%). Use <code>scribe_v2_medical</code> for clinical audio and medical terminology.</p>
    </article>
    <article>
      <h3>90+ languages, auto-detected</h3>
      <p>Scribe v2 supports 90+ languages with automatic language detection. It handles mid-file language switches without configuration. Set a <code>language_code</code> in ostt.toml to lock a specific language and improve accuracy when the source is known.</p>
    </article>
    <article>
      <h3>Audio event tagging</h3>
      <p>Turn on <code>tag_audio_events</code> and Scribe v2 labels non-speech events such as laughter, applause, and background noise. Useful for meeting notes, research transcription, and media workflows where context matters beyond the words spoken.</p>
    </article>
    <article>
      <h3>Entity detection</h3>
      <p>Built-in detection across 65 entity types including PII, health data, and payment details, with precise timestamps. Set <code>entity_detection</code>, or <code>entity_redaction</code> to redact them. Useful for redaction workflows and structured audio analysis.</p>
    </article>
    <article>
      <h3>Speaker diarization</h3>
      <p>Turn on <code>diarize</code> to identify and label up to 32 speakers with precise word-level timestamps. Set <code>num_speakers</code> when you know the count.</p>
    </article>
    <article>
      <h3>Keyterm prompting</h3>
      <p>Provide up to 1,000 domain-specific terms, product names, or technical vocabulary. Scribe v2 applies them in context, not just as keyword matching. OSTT sends your saved <code>ostt keyword</code> terms as <code>keyterms</code> unless you set <code>keyterms</code> yourself.</p>
    </article>
    <article>
      <h3>Local models and paste</h3>
      <p>OSTT also runs Parakeet and Whisper models locally, with Metal, CUDA, or Vulkan builds for GPU acceleration. Add <code>--paste</code> to send the transcript straight into the focused app.</p>
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
      <p>OSTT connects Scribe v2 to your shell like any other Unix tool. Transcription output lands on stdout, so you can pipe it through <code>jq</code>, <code>sed</code>, or any CLI tool. Use <code>-p</code> to chain AI processing actions on the result. Add technical vocabulary to OSTT keywords once and improve accuracy across every recording.</p>
    </div>
    <div class="command-card">
      <pre><code># Transcribe an interview with Scribe v2&#10;ostt transcribe interview.mp3 -o transcript.txt&#10;&#10;# Record, process with AI action, copy result&#10;ostt -p clean -c&#10;&#10;# Transcribe a long recording, summarize, write to file&#10;ostt transcribe lecture.mp3 -p summary -o notes.md</code></pre>
    </div>
  </section>

  <section class="landing-section final-cta">
    <h2>Scribe v2 in your terminal.</h2>
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
      <a href="/reference/providers/elevenlabs">ElevenLabs provider reference</a>
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
