---
layout: false
title: "OSTT vs Voxtype: A Voxtype Alternative That Takes Instructions"
description: "What OSTT adds over Voxtype: dictation per app, optional screen context, spoken instructions carried out by your own AI agent, eight cloud providers, and a history you can retry with another model."
---

<script setup>
import SiteFooter from '../.vitepress/theme/components/SiteFooter.vue'
import SiteHeader from '../.vitepress/theme/components/SiteHeader.vue'
</script>

<SiteHeader />

<main class="landing">

  <section class="landing-hero">
    <h1>OSTT vs Voxtype</h1>
    <p class="lede">Both are free, open source and run locally on Linux. OSTT also takes instructions: in the apps you choose, your own AI agent reads the window and writes what you ask for.</p>
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
        <h2>Voxtype types what you say. OSTT can also do what you say.</h2>
        <p>Voxtype is a fast, well-made local dictation daemon, and the other dictation choice in Omarchy. OSTT adds what it does not have: dictation that adapts to the app you are in, sees the window when you allow it, and carries out spoken instructions through the AI agent you already use. Around that sit eight cloud providers, a history you can retry with another model, and a CLI built for pipes.</p>
      </div>
      <div class="command-card">
        <pre><code># In Slack, say: "reply saying I can't make it"&#10;# OSTT pastes the reply, written by your agent&#10;&#10;# Retry the last recording with another model&#10;ostt retry -m whisper/turbo&#10;&#10;# Transcribe a meeting and summarize it&#10;ostt transcribe meeting.mp3 -p summary -o notes.md</code></pre>
      </div>
    </section>
  </div>

  <section class="landing-section">
    <p class="eyebrow">What OSTT Adds</p>
    <h2>Six things you get with OSTT and not with Voxtype.</h2>
    <div class="comparison-scroll">
      <table class="comparison-table">
        <thead>
          <tr><th>Capability</th><th>OSTT</th><th>Voxtype</th></tr>
        </thead>
        <tbody>
          <tr><td>Different behavior per app</td><td>✅ Each app gets its own processing action, picked automatically from the focused window</td><td>❌ Profiles are chosen by keybinding or modifier key, not by app</td></tr>
          <tr><td>Screen context</td><td>✅ Optional screenshot of the window, per app, sent to the agent with your words</td><td>❌ Not available; the only live context is the previous dictation</td></tr>
          <tr><td>Spoken instructions</td><td>✅ Say "reply saying I can't make it" and get the reply</td><td>❌ Transcribes only</td></tr>
          <tr><td>Your own AI agent</td><td>✅ Claude Code, Codex, OpenCode, Gemini CLI and more, on the subscription you already have, with their tools switched off</td><td>❌ No agent support; a post-process command can call a local LLM such as Ollama</td></tr>
          <tr><td>Cloud transcription</td><td>✅ OpenAI, Deepgram, Groq, DeepInfra, AssemblyAI, Berget, ElevenLabs, Mistral</td><td>⚠️ Soniox, or a Whisper-compatible HTTP endpoint</td></tr>
          <tr><td>History and retry</td><td>✅ Every dictation is saved; <code>ostt retry -m</code> transcribes it again with another model, <code>ostt process</code> runs an action on it later</td><td>❌ No dictation history (meeting mode keeps its own)</td></tr>
        </tbody>
      </table>
    </div>
    <p class="comparison-source">Checked against Voxtype 1.1.1 and its <a href="https://github.com/peteonrails/voxtype/blob/main/docs/CONFIGURATION.md">configuration reference</a> on October 24, 2026.</p>
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
      <p>Processing goes through Claude Code, Codex, OpenCode or another agent CLI you already use. No extra AI subscription, and no tools that text on screen could trigger.</p>
    </article>
    <article>
      <h3>Local first, cloud when you want it</h3>
      <p>Parakeet and Whisper run on your machine with full GPU support. When you need a cloud model, eight providers are a <code>ostt model</code> away.</p>
    </article>
    <article>
      <h3>Never lose a recording</h3>
      <p>A misheard dictation is not gone. Retry it with a bigger model, or run a different action on it, without speaking again.</p>
    </article>
    <article>
      <h3>Speech as a command-line tool</h3>
      <p>Send transcripts to stdout, files, the clipboard or any shell command, and transcribe audio files in scripts.</p>
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
      <a href="/guide/platforms/omarchy-dictation">Omarchy setup</a>
    </div>
  </section>

</main>

<SiteFooter />
