---
layout: false
title: "OSTT vs Superwhisper: A Free Superwhisper Alternative for Omarchy"
description: "What OSTT gives you free that Superwhisper puts behind Pro: context-aware dictation on your own AI agent subscription, optional screen context, local Parakeet with full GPU support, cloud providers and file transcription. Open source, no account."
---

<script setup>
import SiteFooter from '../.vitepress/theme/components/SiteFooter.vue'
import SiteHeader from '../.vitepress/theme/components/SiteHeader.vue'
</script>

<SiteHeader />

<main class="landing">

  <section class="landing-hero">
    <h1>OSTT vs Superwhisper</h1>
    <p class="lede">Dictation that takes instructions, free. OSTT runs on your own AI agent subscription, reads the window when you allow it, and transcribes on your own machine.</p>
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
      <a href="/omarchy">OSTT on Omarchy</a>
    </div>
  </section>

  <div class="surface-band">
    <section class="landing-section split">
      <div>
        <p class="eyebrow">The Short Answer</p>
        <h2>Superwhisper charges for context. OSTT gives it to you.</h2>
        <p>Superwhisper is the default dictation tool on fresh Omarchy 4.5 installs, set up to transcribe in the cloud. Its context-aware Super mode, Parakeet, cloud models and file transcription need a Pro license. OSTT does all of that without a license: local transcription with full GPU support, and context-aware dictation that runs on the AI agent subscription you already have.</p>
      </div>
      <div class="command-card">
        <pre><code># In Slack, say: "reply saying I can't make it"&#10;# OSTT pastes the reply, written by your agent&#10;&#10;# Local Parakeet on your GPU, free&#10;ostt model local download parakeet-ultra&#10;&#10;# Transcribe a meeting and summarize it&#10;ostt transcribe meeting.mp3 -p summary -o notes.md</code></pre>
      </div>
    </section>
  </div>

  <section class="landing-section">
    <p class="eyebrow">What OSTT Adds</p>
    <h2>What you get with OSTT, without a Pro license.</h2>
    <div class="comparison-scroll">
      <table class="comparison-table">
        <thead>
          <tr><th>Capability</th><th>OSTT</th><th>Superwhisper</th></tr>
        </thead>
        <tbody>
          <tr><td>Price</td><td>✅ Free, no account</td><td>⚠️ Free tier; Pro is $8.49 a month, $84.99 a year, or $249.99 once</td></tr>
          <tr><td>Context-aware dictation</td><td>✅ Free, per app</td><td>⚠️ Pro: Super mode and context awareness need a license</td></tr>
          <tr><td>Which AI writes</td><td>✅ Your own Claude Code, Codex, OpenCode, Gemini CLI or other agent, on the subscription you already pay for, with its tools switched off</td><td>⚠️ Superwhisper's hosted models, or your own API key on Pro</td></tr>
          <tr><td>Screen context</td><td>✅ Optional screenshot of the window, per app</td><td>⚠️ App, window title, input text, selection and clipboard; no screenshot documented</td></tr>
          <tr><td>Local Parakeet</td><td>✅ Free, with full GPU support</td><td>⚠️ Pro; local Whisper is free</td></tr>
          <tr><td>Cloud transcription</td><td>✅ Eight providers with your own key, billed by the provider</td><td>⚠️ Pro</td></tr>
          <tr><td>File transcription</td><td>✅ Free: <code>ostt transcribe</code></td><td>⚠️ Pro</td></tr>
          <tr><td>Shell pipelines</td><td>✅ stdout, files, and processing through any bash command</td><td>❌ Not documented</td></tr>
          <tr><td>Open source</td><td>✅ MIT</td><td>❌ Closed source</td></tr>
        </tbody>
      </table>
    </div>
    <p class="comparison-source">Checked against Superwhisper's <a href="https://superwhisper.com/docs/billing/plans">plans</a> and <a href="https://superwhisper.com/docs/modes/built-in">modes</a> documentation and the <a href="https://omarchy.org/manual/text-extraction-dictation/">Omarchy manual</a> on October 24, 2026.</p>
  </section>

  <section class="landing-grid compact">
    <article>
      <h3>No second AI subscription</h3>
      <p>You already pay for Claude, ChatGPT or another agent. OSTT runs its writing assistant through that agent's CLI, so context-aware dictation costs nothing extra.</p>
    </article>
    <article>
      <h3>It sees what you see</h3>
      <p>Turn on the screenshot for an app, and the agent reads the conversation or document you are replying to, so names, terms and tone come out right.</p>
    </article>
    <article>
      <h3>Safe with what is on screen</h3>
      <p>The agent runs with all its tools switched off, so text in a screenshot or transcript cannot make it run commands or touch files.</p>
    </article>
    <article>
      <h3>Local by choice, not by upgrade</h3>
      <p>Parakeet and Whisper run on your machine with Metal, CUDA or Vulkan, free. No audio leaves your computer unless you pick a cloud model.</p>
    </article>
    <article>
      <h3>Open and scriptable</h3>
      <p>MIT licensed, with a CLI built for pipes: transcripts go to stdout, files, the clipboard or any shell command.</p>
    </article>
    <article>
      <h3>History you can retry</h3>
      <p>Every dictation is saved. Retry one with another model, or run a different action on it, without speaking again.</p>
    </article>
  </section>

  <div class="surface-band">
    <section class="landing-section">
      <p class="eyebrow">On Omarchy</p>
      <h2>Switch Omarchy's dictation to OSTT.</h2>
      <div class="steps">
        <div><strong>1. Add the plugin</strong><span><code>omarchy plugin add https://github.com/kristoferlund/ostt-omarchy-dictate.git --enable</code></span></div>
        <div><strong>2. Click the microphone</strong><span>The setup installs OSTT, helps you pick a model, and makes OSTT the dictation backend.</span></div>
        <div><strong>3. Keep your keys</strong><span>Omarchy's dictation keys stay the same. Hold Right Alt or F9 and speak.</span></div>
        <div><strong>4. Choose per app</strong><span>Right-click the microphone to give apps their own action and screen context.</span></div>
      </div>
    </section>
  </div>

  <section class="landing-section final-cta">
    <h2>Try OSTT as your Superwhisper alternative.</h2>
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
      <a href="/guide/platforms/omarchy-dictation">Omarchy setup</a>
    </div>
  </section>

</main>

<SiteFooter />
