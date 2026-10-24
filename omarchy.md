---
layout: false
title: "Omarchy Dictation With Your Own AI Agent"
description: "OSTT dictation for Omarchy: hold Right Alt, speak, and paste. Local Parakeet and Whisper transcription, and a per-app writing assistant that runs on the Claude Code, Codex, OpenCode or other agent subscription you already have."
---

<header class="site-header">
  <div class="header-inner">
    <a href="/" class="header-logo" aria-label="OSTT home">
      <span class="logo-mark" aria-hidden="true"></span>
    </a>
    <nav class="header-nav">
      <a href="/guide/platforms/hyprland#dictation-backend">Documentation</a>
      <a href="https://github.com/kristoferlund/ostt-omarchy-dictate">GitHub</a>
    </nav>
  </div>
</header>

<main class="landing">
  <section class="landing-hero">
    <span class="logo hero-logo" aria-label="OSTT"></span>
    <h1>Dictation for Omarchy that writes with your own AI agent.</h1>
    <p class="lede">Hold Right Alt, speak, and OSTT pastes your words into the app you are in. Transcription runs on your machine with Parakeet or Whisper. In the apps you choose, your words then go to Claude Code, Codex, OpenCode or another agent you already use, which tidies them up or carries out what you asked for. No new account, and no API key.</p>
    <button class="install-block" onclick="navigator.clipboard.writeText('omarchy plugin add https://github.com/kristoferlund/ostt-omarchy-dictate.git --enable'); const t = this; t.classList.add('copied'); setTimeout(() => t.classList.remove('copied'), 2000);" aria-label="Copy the plugin install command">
      <code>
        <span class="dim">omarchy plugin add https://github.com/kristoferlund/</span><span class="highlight">ostt-omarchy-dictate</span><span class="dim">.git --enable</span>
      </code>
      <span class="copy-icons">
        <svg class="icon-copy" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
        <svg class="icon-check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
      </span>
    </button>
    <p>Then click the microphone that appears in the bar. Needs Omarchy 4.5 or later.</p>
  </section>

  <section class="landing-section split">
    <div>
      <p class="eyebrow">Your agent</p>
      <h2>Runs on the subscription you already pay for.</h2>
      <p>If you use an AI coding agent, you already have what the writing assistant needs. OSTT runs the agent's command-line tool, signed in as you, with every one of its tools switched off. The agent reads your words, and the window if you allow it, but it cannot run commands or open files, so text on screen cannot make it do either.</p>
      <p>Built in: Claude Code, Codex, OpenCode, Gemini CLI, GitHub Copilot, Cursor, Grok, Pi, Oh My Pi, Hermes and OpenClaw. Another command-line agent takes a few lines of config.</p>
    </div>
    <div class="command-card">
      <pre><code># The agents OSTT can run, and which you have&#10;ostt agent list&#10;&#10;claude-code — Claude Code&#10;codex-cli — Codex&#10;opencode — OpenCode&#10;gemini-cli — Gemini CLI (not installed)&#10;hermes — Hermes (no images)</code></pre>
    </div>
  </section>

  <div class="surface-band">
    <section class="landing-section split">
      <div>
        <p class="eyebrow">Per app</p>
        <h2>Each app gets the dictation it needs.</h2>
        <p>Right-click the microphone in the bar to choose what happens to your words in each app. Plain transcription pastes them as you said them. Text cleanup fixes misheard words, punctuation and filler. The Writing assistant does that too, and carries out spoken instructions: in Slack, say "reply saying I can't make it, and suggest Thursday instead" and the reply is pasted, ready to send. Processing takes a few seconds; a fast model such as Claude Haiku pastes sooner.</p>
        <p>Turn on the screenshot for an app and the agent also sees its window as it was when you started speaking, so it gets the names, terms and tone on screen right. It stays off until you turn it on, app by app.</p>
      </div>
      <div class="command-card">
        <pre><code># ~/.config/ostt/dictate.toml, kept by the card&#10;[apps]&#10;"Slack" = { action = "assistant", screenshot = true }&#10;"obsidian" = { action = "clean" }&#10;&#10;# Every other app: plain transcription</code></pre>
      </div>
    </section>
  </div>

  <section class="landing-grid">
    <article>
      <h3>Fast local transcription</h3>
      <p>NVIDIA Parakeet and OpenAI Whisper run on your CPU or, through Vulkan, your GPU. Parakeet punctuates and detects the language across 25 European languages. The setup can keep the model loaded, so dictation starts the moment you press the key. OpenAI, Deepgram, Groq, ElevenLabs, Mistral and other cloud models work too.</p>
    </article>
    <article>
      <h3>Your words are never lost</h3>
      <p>If the agent fails, is signed out or takes longer than a minute, OSTT pastes what you said as it heard it, and a notification says why. Every dictation is saved in <code>ostt history</code>, so you can process it again.</p>
    </article>
    <article>
      <h3>Part of Omarchy</h3>
      <p>OSTT becomes Omarchy's dictation backend, on the same keys: hold Right Alt or F9, or press Super + Ctrl + X to start and stop. A popup shows your level while you speak, and Super + Ctrl + Alt + X cancels.</p>
    </article>
    <article>
      <h3>Screenshots only where you allow them</h3>
      <p>A screenshot is taken only in the apps you turned it on for. It goes to your agent and nowhere else, and is kept, readable only by you, until the dictation is done. After a failure it stays until the next dictation, so you can retry.</p>
    </article>
    <article>
      <h3>Edit everything</h3>
      <p>The two actions the setup adds are plain prompts in <code>~/.config/ostt/ostt.toml</code>. Change them, add your own, or point an app at a bash command instead of an agent.</p>
    </article>
    <article>
      <h3>Open source</h3>
      <p>OSTT and the Omarchy plugin are MIT-licensed. Your settings are TOML files you can read, edit and keep with your dotfiles.</p>
    </article>
  </section>

  <div class="surface-band">
    <section class="landing-section">
      <p class="eyebrow">Get started</p>
      <h2>Set up from the bar.</h2>
      <div class="steps">
        <div><strong>1. Add the plugin</strong><span>Run the command above. A microphone appears in the bar.</span></div>
        <div><strong>2. Click the microphone</strong><span>The setup installs OSTT, helps you pick a transcription model, and offers the writing assistant with your agent.</span></div>
        <div><strong>3. Hold Right Alt and speak</strong><span>Let go, and the text is pasted where you were typing.</span></div>
        <div><strong>4. Choose your apps</strong><span>Right-click the microphone and pick an action for each app.</span></div>
      </div>
    </section>
  </div>

  <section class="landing-grid compact">
    <article>
      <h3>Do I need an AI agent?</h3>
      <p>No. Without one, OSTT is plain dictation, with local models or the cloud provider you choose. The agent only comes in for the apps you set up.</p>
    </article>
    <article>
      <h3>What does the agent cost?</h3>
      <p>OSTT is free. Each processed dictation is one short request to your agent, which counts toward your plan's usage like any other.</p>
    </article>
    <article>
      <h3>Already using Voxtype?</h3>
      <p>Voxtype is Omarchy's built-in dictation. OSTT adds per-app processing with your agent, cloud models, and saved recordings you can retry with another model. Switch between them in Setup &gt; Defaults &gt; Dictation.</p>
    </article>
  </section>

  <section class="landing-section final-cta">
    <h2>Talk to your apps, write with your agent.</h2>
    <button class="install-block" onclick="navigator.clipboard.writeText('omarchy plugin add https://github.com/kristoferlund/ostt-omarchy-dictate.git --enable'); const t = this; t.classList.add('copied'); setTimeout(() => t.classList.remove('copied'), 2000);" aria-label="Copy the plugin install command">
      <code>
        <span class="dim">omarchy plugin add https://github.com/kristoferlund/</span><span class="highlight">ostt-omarchy-dictate</span><span class="dim">.git --enable</span>
      </code>
      <span class="copy-icons">
        <svg class="icon-copy" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
        <svg class="icon-check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
      </span>
    </button>
    <div class="landing-actions">
      <a href="/guide/platforms/hyprland#dictation-backend">Read the setup guide</a>
      <a href="/guide/processing">See processing actions</a>
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
      <a href="/guide/local-models">Local models</a>
      <a href="/guide/processing">Processing actions</a>
    </div>
    <div class="footer-links">
      <a href="https://github.com/kristoferlund/ostt">OSTT on GitHub</a>
      <a href="https://github.com/kristoferlund/ostt-omarchy-dictate">Plugin on GitHub</a>
      <a href="/guide/troubleshooting">Troubleshooting</a>
    </div>
  </div>
</footer>
