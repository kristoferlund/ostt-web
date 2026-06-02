---
layout: false
title: "Mistral Voxtral from the Command Line — OSTT"
description: "Use Mistral Voxtral Mini Transcribe from your terminal on Linux and macOS. OSTT connects Mistral's open-weight speech model to your hotkey, clipboard, and shell pipeline."
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
    <h1>Mistral Voxtral from the command line.</h1>
    <p class="lede">Voxtral Mini Transcribe is Mistral's speech-to-text model — open weights under Apache 2.0, best price-to-accuracy of any transcription API at $0.003/min, and built on a language model backbone that understands audio rather than just transcribing it. OSTT connects it to your terminal, hotkey, and shell on Linux and macOS.</p>
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
        <p class="eyebrow">Mistral Voxtral</p>
        <h2>Open weights. Best price-performance. Built on a language model.</h2>
        <p>Voxtral Mini Transcribe V2 delivers ~4% WER at $0.003/min — outperforming GPT-4o-mini-transcribe, Gemini 2.5 Flash, AssemblyAI Universal, and Deepgram Nova on accuracy, while processing audio roughly 3x faster than ElevenLabs Scribe v2. It's open-weight (Apache 2.0), supports 13 languages, speaker diarization, context biasing for technical vocabulary, and processes recordings up to 3 hours in a single request.</p>
      </div>
      <div class="command-card">
        <pre><code># ~/.config/ostt/ostt.toml&#10;&#91;transcription&#93;&#10;provider = &quot;mistral&quot;&#10;model = &quot;voxtral-mini-latest&quot;&#10;&#10;&#91;model_options.&quot;mistral/voxtral-mini-latest&quot;&#93;&#10;# language = &quot;en&quot;  # Optional: improves accuracy when known&#10;# context_bias = &#91;&quot;OSTT&quot;, &quot;Voxtral&quot;&#93;&#10;&#10;# Pick interactively&#10;ostt model&#10;&#10;# Record with hotkey, transcribe with Voxtral, copy to clipboard&#10;ostt launch -c</code></pre>
      </div>
    </section>
  </div>

  <section class="landing-grid">
    <article>
      <h3>Open weights, Apache 2.0</h3>
      <p>Voxtral is open-source. The 3B and 24B model weights are available on Hugging Face for self-hosting, private deployment, or on-premise use. The API routes to a transcription-optimised version of the mini model when you don't want to manage infrastructure.</p>
    </article>
    <article>
      <h3>Best price-performance</h3>
      <p>At $0.003/min, Voxtral Mini Transcribe V2 costs half of GPT-4o-mini-transcribe and one-fifth of ElevenLabs Scribe v2, while matching or beating both on accuracy benchmarks. For high-volume transcription work, no other API comes close on this ratio.</p>
    </article>
    <article>
      <h3>Context biasing for technical vocabulary</h3>
      <p>Provide up to 100 words or phrases to guide the model toward correct spellings of names, technical terms, and domain-specific vocabulary. OSTT sends your configured keywords as Voxtral <code>context_bias</code> terms automatically.</p>
    </article>
    <article>
      <h3>13 languages with speaker diarization</h3>
      <p>Voxtral Mini Transcribe V2 supports English, Chinese, Hindi, Spanish, Arabic, French, Portuguese, Russian, German, Japanese, Korean, Italian, and Dutch — with speaker diarization and word-level timestamps in all 13.</p>
    </article>
    <article>
      <h3>3-hour recordings in a single request</h3>
      <p>Unlike most transcription APIs that require chunking at 25MB or 25 minutes, Voxtral processes recordings up to 3 hours in one request. Transcribe a full workday of audio without writing chunking logic.</p>
    </article>
    <article>
      <h3>Global hotkey</h3>
      <p>Bind OSTT to a system-wide shortcut. Press to open the recorder, speak, press again to stop. Voxtral transcribes and the result lands in your clipboard or stdout — without touching the mouse.</p>
    </article>
  </section>

  <div class="surface-band">
    <section class="landing-section">
      <p class="eyebrow">Workflow</p>
      <h2>From speech to useful output.</h2>
      <div class="steps">
        <div><strong>1. Record</strong><span>Press your global hotkey or run <code>ostt</code> in the terminal.</span></div>
        <div><strong>2. Transcribe</strong><span>Voxtral Mini Transcribe processes the audio via the Mistral API.</span></div>
        <div><strong>3. Process</strong><span>Optionally run AI prompts or shell commands on the result.</span></div>
        <div><strong>4. Send</strong><span>Print to stdout, copy to clipboard, write to a file, or pipe onward.</span></div>
      </div>
    </section>
  </div>

  <section class="landing-section split pipeline-section">
    <div>
      <p class="eyebrow">Pipeline</p>
      <h2>Open-source accuracy in your shell.</h2>
      <p>OSTT routes Voxtral output to wherever your workflow needs it — stdout, clipboard, file, or piped to any CLI tool. Use the <code>-p</code> flag to chain processing actions. OSTT keywords map directly to Voxtral <code>context_bias</code>, so domain vocabulary you add once improves every recording automatically.</p>
    </div>
    <div class="command-card">
      <pre><code># Transcribe a 2-hour recording in one call&#10;ostt transcribe lecture.mp3 -o notes.md&#10;&#10;# Record, run processing action, copy result&#10;ostt -p clean -c&#10;&#10;# Transcribe and pipe to downstream command&#10;ostt | my-tool.sh</code></pre>
    </div>
  </section>

  <section class="landing-section final-cta">
    <h2>Voxtral accuracy at half the cost of the alternatives.</h2>
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
      <a href="/reference/providers/mistral">Mistral provider reference</a>
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
