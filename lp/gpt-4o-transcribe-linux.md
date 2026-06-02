---
layout: false
title: "GPT-4o Transcribe on Linux"
description: "Use gpt-4o-transcribe on Linux from the terminal. OSTT connects OpenAI's most accurate transcription model to a global hotkey, clipboard, and shell pipeline."
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
    <h1>GPT-4o Transcribe on Linux.</h1>
    <p class="lede">gpt-4o-transcribe is OpenAI's most accurate transcription model — built on GPT-4o rather than Whisper, with a 4.1% word error rate and substantially fewer hallucinations on long recordings. OSTT is the fastest way to use it from a Linux or macOS terminal, bound to a hotkey and wired into your shell.</p>
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
        <p class="eyebrow">GPT-4o Transcribe</p>
        <h2>More accurate. Fewer hallucinations. Same price.</h2>
        <p>gpt-4o-transcribe delivers a 4.1% WER — a meaningful improvement over whisper-1's 5.3%, especially on noisy audio, accented speech, and long recordings. Whisper's documented hallucination problem on silence is eliminated. At $0.006/min — identical to whisper-1 — there is no cost reason to stay on the legacy model for standard transcription work.</p>
      </div>
      <div class="command-card">
        <pre><code># ~/.config/ostt/ostt.toml&#10;&#91;transcription&#93;&#10;provider = &quot;openai&quot;&#10;model = &quot;gpt-4o-transcribe&quot;&#10;&#10;&#91;model_options.&quot;openai/gpt-4o-transcribe&quot;&#93;&#10;language = &quot;en&quot;&#10;prompt = &quot;Technical dictation with project names.&quot;&#10;include = &#91;&quot;logprobs&quot;&#93;&#10;&#10;# Pick interactively&#10;ostt model&#10;&#10;# Record, transcribe with gpt-4o-transcribe, copy result&#10;ostt launch -c</code></pre>
      </div>
    </section>
  </div>

  <section class="landing-grid">
    <article>
      <h3>No more hallucinations</h3>
      <p>Whisper-1 has a documented problem generating text that was never spoken on silent or low-quality audio. gpt-4o-transcribe eliminates this. Long meeting recordings that previously hallucinated filler text now return accurate output.</p>
    </article>
    <article>
      <h3>Better formatting out of the box</h3>
      <p>gpt-4o-transcribe auto-inserts punctuation, sentence casing, and handles code-switching between languages — output that previously required a post-processing step with an LLM.</p>
    </article>
    <article>
      <h3>Promptable transcription</h3>
      <p>Pass a prompt to gpt-4o-transcribe to guide style, domain vocabulary, and formatting. Whisper's prompt support is limited to 224 tokens and ignores instructions; gpt-4o-transcribe follows them.</p>
    </article>
    <article>
      <h3>Logprobs when needed</h3>
      <p>OpenAI can return token log probabilities for <code>gpt-4o-transcribe</code> and <code>gpt-4o-mini-transcribe</code> with <code>include=logprobs</code>. OSTT validates the option and still emits clean transcript text for shell workflows.</p>
    </article>
    <article>
      <h3>Diarization model available</h3>
      <p>Switch to <code>openai/gpt-4o-transcribe-diarize</code> when you need OpenAI's diarized JSON response. OSTT returns the combined transcript text while preserving the model-specific request options.</p>
    </article>
    <article>
      <h3>Any output target</h3>
      <p>Send transcription to the clipboard with <code>-c</code>, write to a file with <code>-o</code>, print to stdout and pipe it wherever you like.</p>
    </article>
    <article>
      <h3>Switch models anytime</h3>
      <p>Run <code>ostt model</code> to switch between gpt-4o-transcribe, gpt-4o-mini-transcribe, and whisper-1. One command, no config file editing required.</p>
    </article>
  </section>

  <div class="surface-band">
    <section class="landing-section">
      <p class="eyebrow">Workflow</p>
      <h2>From speech to useful output.</h2>
      <div class="steps">
        <div><strong>1. Record</strong><span>Press your global hotkey or run <code>ostt</code> in the terminal.</span></div>
        <div><strong>2. Transcribe</strong><span>gpt-4o-transcribe processes the audio via the OpenAI API.</span></div>
        <div><strong>3. Process</strong><span>Optionally run AI prompts or shell commands on the result.</span></div>
        <div><strong>4. Send</strong><span>Print to stdout, copy to clipboard, write to a file, or pipe onward.</span></div>
      </div>
    </section>
  </div>

  <section class="landing-section split pipeline-section">
    <div>
      <p class="eyebrow">Pipeline</p>
      <h2>GPT-4o accuracy in your shell.</h2>
      <p>OSTT routes gpt-4o-transcribe output to wherever your workflow needs it. Print to stdout, copy to clipboard, write to a file, or pipe through any CLI. Use <code>--mo language=en</code>, <code>--mo prompt=...</code>, or <code>--mo include=logprobs</code> for per-run OpenAI options.</p>
    </div>
    <div class="command-card">
      <pre><code># Transcribe a recording, write to file&#10;ostt transcribe meeting.mp3 -o notes.md&#10;&#10;# Record, process with &quot;summary&quot; action, copy&#10;ostt -p summary -c&#10;&#10;# Transcribe and pipe to custom script&#10;ostt | ./process.sh</code></pre>
    </div>
  </section>

  <section class="landing-section final-cta">
    <h2>Run gpt-4o-transcribe from your terminal.</h2>
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
      <a href="/reference/providers/openai">OpenAI provider reference</a>
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
