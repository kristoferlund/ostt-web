---
layout: false
---

<main class="landing">
  <section class="landing-hero">
    <img class="logo" src="/logo.png" alt="OSTT" />
    <p class="eyebrow">Open source voice-to-text for developers</p>
    <h1>Speak once. Choose the model. Shape the output.</h1>
    <p class="lede">OSTT is a terminal-native speech-to-text tool for Linux and macOS. Record from a hotkey, transcribe with your chosen provider, then send the result to your clipboard, a file, stdout, an AI prompt, or any shell command.</p>
    <div class="landing-actions">
      <a href="/guide/getting-started">Get started</a>
      <a href="/guide/why-ostt">Why OSTT?</a>
    </div>
    <pre><code>curl -fsSL https://ostt.ai/install | bash</code></pre>
  </section>

  <section class="landing-section split">
    <div>
      <p class="eyebrow">The point</p>
      <h2>Voice input that behaves like a developer tool.</h2>
    </div>
    <p>Most dictation apps optimize for a polished GUI and a single product workflow. OSTT optimizes for control: stdout, clipboard, files, history, retry, provider choice, and process actions that fit the shell workflows you already use.</p>
  </section>

  <section class="landing-grid">
    <article>
      <h3>Linux-first</h3>
      <p>Global hotkey setup for Omarchy/Hyprland, GNOME, KDE, and other Linux desktops, with macOS support too.</p>
    </article>
    <article>
      <h3>Bring your own provider</h3>
      <p>Use OpenAI, Deepgram, Groq, DeepInfra, AssemblyAI, Berget, or ElevenLabs. Switch models when quality, latency, price, or data residency matters.</p>
    </article>
    <article>
      <h3>Process with AI or bash</h3>
      <p>Clean dictation, translate notes, generate commands, summarize files, or pipe text through scripts with `ostt -p` and `ostt process`.</p>
    </article>
    <article>
      <h3>Retry without re-recording</h3>
      <p>Recordings are saved locally, so you can re-transcribe the same audio with a different provider or model.</p>
    </article>
    <article>
      <h3>Works from anywhere</h3>
      <p>Use `ostt launch -c` from a global hotkey. Press once to record, press again to transcribe and copy.</p>
    </article>
    <article>
      <h3>Open source, no subscription</h3>
      <p>The code is transparent, the config is local, and the providers are the ones you choose.</p>
    </article>
  </section>

  <section class="landing-section">
    <p class="eyebrow">Workflow</p>
    <h2>From speech to useful output.</h2>
    <div class="steps">
      <div><strong>1. Record</strong><span>Use the terminal or a global hotkey popup.</span></div>
      <div><strong>2. Transcribe</strong><span>Choose the provider and model that fit the job.</span></div>
      <div><strong>3. Process</strong><span>Optionally run AI prompts or shell commands.</span></div>
      <div><strong>4. Send</strong><span>Print, copy, write to a file, or pipe onward.</span></div>
    </div>
  </section>

  <section class="landing-section split">
    <div>
      <p class="eyebrow">Differentiator</p>
      <h2>A transcription pipeline, not just a text box.</h2>
    </div>
    <div class="command-card">
      <pre><code>ostt -p clean -c
ostt transcribe meeting.mp3 -p summary -o notes.md
ostt process 2 -a cmd</code></pre>
    </div>
  </section>

  <section class="landing-grid compact">
    <article>
      <h3>For Linux desktop users</h3>
      <p>Wayland-aware clipboard support, native packages, AUR, and desktop setup guides.</p>
    </article>
    <article>
      <h3>For terminal users</h3>
      <p>Pipe output, use aliases, generate completions, inspect logs, and automate the result.</p>
    </article>
    <article>
      <h3>For provider tinkerers</h3>
      <p>Compare models, retry recordings, and choose the best backend for each language or workflow.</p>
    </article>
  </section>

  <section class="landing-section final-cta">
    <p class="eyebrow">Start</p>
    <h2>Install OSTT and bind your first hotkey.</h2>
    <pre><code>curl -fsSL https://ostt.ai/install | bash
ostt auth
ostt launch -c</code></pre>
    <div class="landing-actions">
      <a href="/guide/getting-started">Read the guide</a>
      <a href="/guide/processing">Processing actions</a>
    </div>
  </section>
</main>
