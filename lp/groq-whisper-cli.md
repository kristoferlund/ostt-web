---
layout: false
title: "Groq Whisper from the Command Line"
description: "Run Groq Whisper Large v3 and Turbo from the terminal on Linux and macOS. OSTT connects Groq's LPU-powered speech recognition to your hotkey, clipboard, and shell pipeline."
---

<script setup>
import SiteFooter from '../.vitepress/theme/components/SiteFooter.vue'
import SiteHeader from '../.vitepress/theme/components/SiteHeader.vue'
</script>

<SiteHeader />

<main class="landing">

  <section class="landing-hero">
    <h1>Groq Whisper from the command line.</h1>
    <p class="lede">Groq runs OpenAI's Whisper models on its LPU hardware, purpose-built inference chips that transcribe a 10-minute recording in about 4 seconds, 4–5x faster than the OpenAI Whisper API. OSTT connects Groq to your terminal, hotkey, and shell pipeline on Linux and macOS.</p>
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
        <p>Groq's LPU (Language Processing Unit) infrastructure runs Whisper Large v3 Turbo at 216x real-time speed: a 10-minute recording returns in roughly 4 seconds. Independent benchmarks put Groq at 4–5x lower latency than the OpenAI Whisper endpoint, at about 9x lower cost. Two models: whisper-large-v3-turbo for speed and cost, whisper-large-v3 for higher accuracy.</p>
      </div>
      <div class="command-card">
        <pre><code># ~/.config/ostt/ostt.toml&#10;&#91;transcription&#93;&#10;provider = &quot;groq&quot;&#10;model = &quot;whisper-large-v3-turbo&quot;&#10;&#10;# For higher accuracy&#10;# model = &quot;whisper-large-v3&quot;&#10;&#10;&#91;groq.whisper-large-v3-turbo.params&#93;&#10;language = &quot;en&quot;&#10;response_format = &quot;verbose_json&quot;&#10;timestamp_granularities = &#91;&quot;word&quot;, &quot;segment&quot;&#93;&#10;&#10;# Pick interactively&#10;ostt model&#10;&#10;# Record with hotkey, transcribe with Groq, copy to clipboard&#10;ostt launch -c</code></pre>
      </div>
    </section>
  </div>

  <section class="landing-grid">
    <article>
      <h3>216x real-time transcription</h3>
      <p>A 10-minute recording returns in about 4 seconds. For hotkey dictation, short recordings come back with little wait.</p>
    </article>
    <article>
      <h3>Low cost per hour</h3>
      <p>Whisper Large v3 Turbo costs $0.04/hr ($0.00067/min), roughly 9x cheaper than OpenAI. Whisper Large v3 is available at $0.111/hr for accuracy-critical work.</p>
    </article>
    <article>
      <h3>Two models, one decision</h3>
      <p>Groq documents <code>whisper-large-v3-turbo</code> as the best price/performance choice for multilingual transcription and <code>whisper-large-v3</code> as the accuracy-sensitive model. Switch between them via <code>ostt model</code>.</p>
    </article>
    <article>
      <h3>99+ languages</h3>
      <p>Groq Whisper supports the same 99+ language breadth as the base Whisper model. Both models handle multilingual audio. OSTT uses Groq's transcription endpoint, so output stays in the source language.</p>
    </article>
    <article>
      <h3>Validated Groq options</h3>
      <p>Use <code>--param language=en</code>, <code>--param prompt=...</code>, <code>--param temperature=0</code>, or timestamp metadata through <code>response_format=verbose_json</code> and <code>timestamp_granularities=word,segment</code>.</p>
    </article>
    <article>
      <h3>Retry without re-recording</h3>
      <p>OSTT keeps your last 10 recordings. Run <code>ostt retry</code> to re-transcribe with Groq or another provider, without speaking again.</p>
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
      <h2>Voice to shell.</h2>
      <p>Press your hotkey, speak, and the transcript goes to your clipboard, or straight into the focused app with <code>--paste</code>. Pipe the output through any CLI tool. When you need to stay offline, OSTT also runs Parakeet and Whisper models locally. Use <code>ostt model params groq/whisper-large-v3-turbo</code> to list supported Groq <code>--param</code> keys.</p>
    </div>
    <div class="command-card">
      <pre><code># Transcribe a 10-minute recording (about 4 seconds)&#10;ostt transcribe meeting.mp3 -o notes.md&#10;&#10;# Record, process with AI action, copy to clipboard&#10;ostt -p clean -c&#10;&#10;# Pipe directly to another command&#10;ostt | xargs -I{} notify-send &quot;Transcribed&quot; &quot;{}&quot;</code></pre>
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

<SiteFooter />
