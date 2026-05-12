---
layout: false
---

<main class="landing">
  <section class="landing-hero">
    <img class="logo" src="/logo.png" alt="OSTT" />
    <p class="eyebrow">Open source voice-to-text for developers</p>
    <h1>The open source speech-to-text tool for the terminal.</h1>
    <p class="lede">OSTT records from your microphone, transcribes with your chosen provider, and sends the result to stdout, the clipboard, a file, an AI prompt, or a shell command.</p>
    <div class="landing-actions">
      <a href="/guide/getting-started">Get started</a>
      <a href="/guide/why-ostt">Why OSTT?</a>
    </div>
    <pre><code>curl -fsSL https://ostt.ai/install | bash</code></pre>
  </section>

  <section class="landing-section split">
    <div>
      <p class="eyebrow">What is OSTT?</p>
      <h2>Voice input as a composable command-line tool.</h2>
    </div>
    <p>OSTT is for users who want speech-to-text without giving up normal developer workflows. It keeps the interface small and exposes the useful parts: provider selection, history, retry, file transcription, clipboard output, stdout, and process actions.</p>
  </section>

  <section class="landing-grid">
    <article>
      <h3>Linux-first</h3>
      <p>Global hotkey setup for Omarchy/Hyprland, GNOME, KDE, and other Linux desktops, with macOS support too.</p>
    </article>
    <article>
      <h3>Bring your own provider</h3>
      <p>Use OpenAI, Deepgram, Groq, DeepInfra, AssemblyAI, Berget, or ElevenLabs. Switch models when quality, latency, price, or data location matters.</p>
    </article>
    <article>
      <h3>Process with AI or bash</h3>
      <p>Run AI prompts or shell commands after transcription with `ostt -p` and `ostt process`.</p>
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
      <p>The code is public, the config is local, and the providers are the ones you choose.</p>
    </article>
  </section>

  <section class="landing-section">
    <p class="eyebrow">Workflow</p>
    <h2>From speech to text you can route.</h2>
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
      <h2>A transcription pipeline, not a closed text box.</h2>
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
      <h3>For provider testing</h3>
      <p>Compare models, retry recordings, and choose the backend that works for a language or workflow.</p>
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
