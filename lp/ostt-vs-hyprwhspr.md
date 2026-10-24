---
layout: false
title: "OSTT vs Hyprwhspr: A Hyprwhspr Alternative That Takes Instructions"
description: "What OSTT adds over Hyprwhspr: dictation per app, optional screen context, spoken instructions carried out by your own AI agent, a history you can retry with another model, and macOS support."
---

<script setup>
import SiteFooter from '../.vitepress/theme/components/SiteFooter.vue'
import SiteHeader from '../.vitepress/theme/components/SiteHeader.vue'
</script>

<SiteHeader />

<main class="landing">

  <section class="landing-hero">
    <h1>OSTT vs Hyprwhspr</h1>
    <p class="lede">Both are free and open source dictation tools for Linux. OSTT also takes instructions: in the apps you choose, your own AI agent reads the window and writes what you ask for.</p>
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
        <h2>Hyprwhspr pastes what you say. OSTT knows where you are saying it.</h2>
        <p>Hyprwhspr is a capable Linux dictation tool with many local and cloud backends. OSTT adds dictation that adapts to the app you are in, sees the window when you allow it, and carries out spoken instructions through the AI agent you already use. It also keeps a history you can retry with another model, and runs on macOS too.</p>
      </div>
      <div class="command-card">
        <pre><code># In Slack, say: "reply saying I can't make it"&#10;# OSTT pastes the reply, written by your agent&#10;&#10;# Retry the last recording with another model&#10;ostt retry -m whisper/turbo&#10;&#10;# Run a different action on an earlier dictation&#10;ostt process 2 summary</code></pre>
      </div>
    </section>
  </div>

  <section class="landing-section">
    <p class="eyebrow">What OSTT Adds</p>
    <h2>Seven things you get with OSTT and not with Hyprwhspr.</h2>
    <div class="comparison-scroll">
      <table class="comparison-table">
        <thead>
          <tr><th>Capability</th><th>OSTT</th><th>Hyprwhspr</th></tr>
        </thead>
        <tbody>
          <tr><td>Omarchy's dictation keys</td><td>✅ The plugin makes OSTT the backend in Setup &gt; Defaults &gt; Dictation</td><td>❌ Not an Omarchy dictation backend; runs on its own hotkeys</td></tr>
          <tr><td>Different behavior per app</td><td>✅ Each app gets its own processing action, picked automatically from the focused window</td><td>❌ Per-app settings only change the paste shortcut</td></tr>
          <tr><td>Screen context</td><td>✅ Optional screenshot of the window, per app, sent to the agent with your words</td><td>❌ Not available</td></tr>
          <tr><td>Spoken instructions with context</td><td>✅ Say "reply saying I can't make it" and your agent writes the reply from what is on screen</td><td>⚠️ A converse mode sends speech to a realtime OpenAI or Gemini model and pastes its answer, without the app or screen</td></tr>
          <tr><td>Your own AI agent</td><td>✅ Claude Code, Codex, OpenCode, Gemini CLI and more, on the subscription you already have, with their tools switched off</td><td>❌ No agent support; converse mode uses the OpenAI or Gemini realtime APIs</td></tr>
          <tr><td>History and retry</td><td>✅ Every dictation is saved; <code>ostt retry -m</code> transcribes it again with another model, <code>ostt process</code> runs an action on it later</td><td>❌ No history; only the last text is kept, in memory</td></tr>
          <tr><td>macOS</td><td>✅ Supported, with Metal GPU acceleration</td><td>❌ Linux only</td></tr>
        </tbody>
      </table>
    </div>
    <p class="comparison-source">Checked against Hyprwhspr 1.49.2 and its <a href="https://github.com/goodroot/hyprwhspr/tree/main/docs">documentation</a> on October 24, 2026.</p>
  </section>

  <section class="landing-grid compact">
    <article>
      <h3>Dictation that fits the app</h3>
      <p>Plain transcription in the terminal, light cleanup in your notes, Ghostwriter writing for you in Slack and email. On Omarchy you pick it per app from the microphone in the bar.</p>
    </article>
    <article>
      <h3>It sees what you see</h3>
      <p>Turn on the screenshot for an app, and the agent reads the conversation or document you are replying to, so names, terms and tone come out right.</p>
    </article>
    <article>
      <h3>Runs on the agent you pay for</h3>
      <p>Processing goes through Claude Code, Codex, OpenCode or another agent CLI you already use. No API bill, and no tools that text on screen could trigger.</p>
    </article>
    <article>
      <h3>Named actions, not one hook</h3>
      <p>Define as many AI and bash processing actions as you like, pick one per app or per recording, and run any of them on an earlier dictation.</p>
    </article>
    <article>
      <h3>Never lose a recording</h3>
      <p>A misheard dictation is not gone. Retry it with a bigger model, or run a different action on it, without speaking again.</p>
    </article>
    <article>
      <h3>One tool on Linux and macOS</h3>
      <p>The same CLI, config and processing actions on both, with local models on the GPU through CUDA, Vulkan or Metal.</p>
    </article>
  </section>

  <div class="surface-band">
    <section class="landing-section">
      <p class="eyebrow">On Omarchy</p>
      <h2>Make OSTT Omarchy's dictation tool.</h2>
      <div class="steps">
        <div><strong>1. Add the plugin</strong><span><code>omarchy plugin add https://github.com/kristoferlund/ostt-omarchy-dictate.git --enable</code></span></div>
        <div><strong>2. Click the microphone</strong><span>The setup installs OSTT, helps you pick a model, and makes OSTT the dictation backend.</span></div>
        <div><strong>3. Use Omarchy's keys</strong><span>Hold Right Alt or F9 and speak.</span></div>
        <div><strong>4. Choose per app</strong><span>Right-click the microphone to give apps their own action and screen context.</span></div>
      </div>
    </section>
  </div>

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

<SiteFooter />
