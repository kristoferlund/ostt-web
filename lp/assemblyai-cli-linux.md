---
layout: false
title: "AssemblyAI from the Command Line"
description: "Use AssemblyAI Universal 3.5 Pro from your terminal on Linux and macOS. OSTT connects AssemblyAI's recommended promptable speech model to your hotkey, clipboard, and shell pipeline."
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
    <h1>AssemblyAI Universal 3.5 Pro from the command line.</h1>
    <p class="lede">Universal 3.5 Pro is AssemblyAI's recommended model for recorded audio: guide transcription with a natural-language prompt before it listens, not after. It scores 3.0% on the Artificial Analysis AA-WER benchmark, switches languages mid-sentence, and labels speakers. OSTT connects it to your terminal, hotkey, and shell.</p>
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
        <p class="eyebrow">AssemblyAI Universal 3.5 Pro</p>
        <h2>Prompt it. Don't post-process it.</h2>
        <p>Universal 3.5 Pro accepts a natural-language <code>prompt</code> that shapes transcription during inference — not after. Tell it the domain, formatting style, or vocabulary before it listens. It covers 18 languages natively, and OSTT asks AssemblyAI to fall back to Universal 2 for the rest, so language detection spans 99 languages. OSTT surfaces all of this through your terminal with zero extra tooling.</p>
      </div>
      <div class="command-card">
        <pre><code># ~/.config/ostt/ostt.toml&#10;&#91;transcription&#93;&#10;provider = &quot;assemblyai&quot;&#10;model = &quot;universal-3-5-pro&quot;&#10;&#10;&#91;assemblyai.universal-3-5-pro.params&#93;&#10;punctuate = true&#10;format_text = true&#10;language_detection = true&#10;&#10;# Pick interactively&#10;ostt model&#10;&#10;# Record with hotkey, transcribe, copy to clipboard&#10;ostt launch -c</code></pre>
      </div>
    </section>
  </div>

  <section class="landing-grid">
    <article>
      <h3>Promptable transcription</h3>
      <p>Universal 3.5 Pro accepts natural-language instructions. Describe the domain, speaker roles, formatting preferences, or vocabulary before it transcribes. The model applies them at inference — no post-processing LLM call needed.</p>
    </article>
    <article>
      <h3>Accurate on the words that matter</h3>
      <p>AssemblyAI describes Universal 3.5 Pro as its highest-accuracy, fastest model, with state-of-the-art accuracy on entities, rare words, and domain terms — the names, numbers, and jargon that matter in medical, legal, or compliance recordings.</p>
    </article>
    <article>
      <h3>3.0% AA-WER</h3>
      <p>Universal 3.5 Pro scores 3.0% on the independent Artificial Analysis AA-WER benchmark, ahead of OpenAI GPT-4o Transcribe (4.0%) and Deepgram Nova-3 (5.2%).</p>
    </article>
    <article>
      <h3>Speaker diarization included</h3>
      <p>Turn on <code>speaker_labels</code> to identify and label speakers in the same request, with <code>speakers_expected</code> when you know the count. No separate API call needed.</p>
    </article>
    <article>
      <h3>99 languages with code-switching</h3>
      <p>Universal 3.5 Pro handles mixed-language audio natively in its 18 languages, and Universal 2 covers the rest of the 99. Set <code>language_code</code> in config to skip detection when you know the source language.</p>
    </article>
    <article>
      <h3>Keywords vocabulary boosting</h3>
      <p>Add technical terms, names, and domain vocabulary via OSTT's keywords feature. OSTT sends them as keyterm hints to Universal 3.5 Pro, reducing errors on the words that matter most in your workflow.</p>
    </article>
  </section>

  <div class="surface-band">
    <section class="landing-section">
      <p class="eyebrow">Workflow</p>
      <h2>From speech to useful output.</h2>
      <div class="steps">
        <div><strong>1. Record</strong><span>Press your global hotkey or run <code>ostt</code> in the terminal.</span></div>
        <div><strong>2. Transcribe</strong><span>Universal 3.5 Pro processes the audio via the AssemblyAI API.</span></div>
        <div><strong>3. Process</strong><span>Optionally run AI prompts or shell commands on the result.</span></div>
        <div><strong>4. Send</strong><span>Print to stdout, copy to clipboard, write to a file, or pipe onward.</span></div>
      </div>
    </section>
  </div>

  <section class="landing-section split pipeline-section">
    <div>
      <p class="eyebrow">Pipeline</p>
      <h2>Accurate transcription inside your shell.</h2>
      <p>OSTT routes Universal 3.5 Pro output to wherever your workflow needs it. Plain text on stdout, clipboard with <code>-c</code>, file with <code>-o</code>, or pipe through any CLI tool. Combine with OSTT's <code>-p</code> flag to run processing actions on the result without a separate tool.</p>
    </div>
    <div class="command-card">
      <pre><code># Transcribe a meeting recording&#10;ostt transcribe meeting.mp3 -o notes.md&#10;&#10;# Record, run &quot;clean&quot; processing action, copy&#10;ostt -p clean -c&#10;&#10;# Transcribe and pipe to downstream command&#10;ostt | my-tool.sh</code></pre>
    </div>
  </section>

  <section class="landing-section final-cta">
    <h2>Accurate, promptable transcription in your terminal.</h2>
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
      <a href="/reference/providers/assemblyai">AssemblyAI provider reference</a>
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
