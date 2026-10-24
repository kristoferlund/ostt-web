---
layout: false
title: "OpenAI Whisper from the Command Line"
description: "Run OpenAI GPT Transcribe, GPT-4o Transcribe, and Whisper from your terminal. OSTT connects all five OpenAI transcription models to a global hotkey, clipboard, and shell pipeline on Linux and macOS."
---

<script setup>
import SiteFooter from '../.vitepress/theme/components/SiteFooter.vue'
import SiteHeader from '../.vitepress/theme/components/SiteHeader.vue'
</script>

<SiteHeader />

<main class="landing">

  <section class="landing-hero">
    <h1>OpenAI Whisper from the command line.</h1>
    <p class="lede">OpenAI offers GPT Transcribe, GPT-4o Transcribe, GPT-4o Mini, GPT-4o diarization, and the legacy hosted Whisper model through the same transcription API. gpt-transcribe is OpenAI's recommended file model; gpt-4o-transcribe and gpt-4o-mini-transcribe take prompts; gpt-4o-transcribe-diarize adds speaker-segment annotations; whisper-1 returns timestamp metadata. OSTT connects them to your terminal with a single config change.</p>
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
        <p class="eyebrow">OpenAI Speech Models</p>
        <h2>Five models, one API, one config.</h2>
        <p>OpenAI's transcription API covers GPT Transcribe with native keyword and language hints, faster GPT-4o Mini, higher-accuracy GPT-4o transcription, diarized GPT-4o output, and legacy whisper-1 timestamp metadata. OSTT lets you switch between them through <code>ostt model</code> without touching your workflow.</p>
      </div>
      <div class="command-card">
        <pre><code># ~/.config/ostt/ostt.toml&#10;&#91;transcription&#93;&#10;provider = &quot;openai&quot;&#10;model = &quot;gpt-4o-transcribe&quot;&#10;&#10;# Or use Whisper timestamps / GPT-4o diarization&#10;# model = &quot;whisper-1&quot;&#10;# model = &quot;gpt-4o-transcribe-diarize&quot;&#10;&#10;&#91;openai.gpt-4o-transcribe.params&#93;&#10;language = &quot;en&quot;&#10;include = &#91;&quot;logprobs&quot;&#93;&#10;&#10;# Pick interactively&#10;ostt model&#10;&#10;# Record with hotkey, transcribe with OpenAI, copy to clipboard&#10;ostt launch -c</code></pre>
      </div>
    </section>
  </div>

  <section class="landing-grid">
    <article>
      <h3>gpt-transcribe</h3>
      <p>OpenAI's recommended file-transcription model. Takes <code>languages</code> hints for multilingual audio and a native <code>keywords</code> list. Saved <code>ostt keyword</code> terms go to that field automatically.</p>
    </article>
    <article>
      <h3>gpt-4o-transcribe</h3>
      <p>Built on GPT-4o, not just Whisper. Produces lower word error rates on noisy audio, better formatting, and significantly fewer hallucinations than whisper-1 on long recordings. Same price per minute as the legacy model.</p>
    </article>
    <article>
      <h3>gpt-4o-mini-transcribe</h3>
      <p>Half the cost of gpt-4o-transcribe at $0.003/min, with accuracy that still exceeds whisper-1 on most audio types. The right default for high-volume transcription where cost matters.</p>
    </article>
    <article>
      <h3>whisper-1 (legacy)</h3>
      <p>The original OpenAI hosted Whisper model. Supports <code>verbose_json</code> with word or segment timestamps. OSTT reads the transcript text from the JSON response.</p>
    </article>
    <article>
      <h3>gpt-4o-transcribe-diarize</h3>
      <p>Use OpenAI's diarized JSON response for speaker-segment annotations. OSTT returns the combined transcript text and keeps model-specific params under <code>openai.gpt-4o-transcribe-diarize.params</code>.</p>
    </article>
    <article>
      <h3>Validated request options</h3>
      <p>Set OpenAI params per model with <code>--param</code> or persistent <code>openai.&lt;model&gt;.params</code>: <code>language</code>, <code>prompt</code>, <code>temperature</code>, GPT Transcribe <code>languages</code> and <code>keywords</code>, GPT-4o <code>include=logprobs</code>, Whisper timestamp granularities, and diarization fields.</p>
    </article>
    <article>
      <h3>Pipe to AI tools</h3>
      <p>Use <code>-p</code> to run a processing action after transcription. Route OpenAI output directly into OpenCode, Claude Code, Gemini CLI, or any shell command without manual copy-paste.</p>
    </article>
    <article>
      <h3>Retry without re-recording</h3>
      <p>OSTT keeps your last 10 recordings. Run <code>ostt retry</code> to re-transcribe the same audio with a different OpenAI model or another provider, without speaking again.</p>
    </article>
    <article>
      <h3>Local models and paste</h3>
      <p>OSTT also runs Parakeet and Whisper models locally, with Metal, CUDA, or Vulkan builds for GPU acceleration. Add <code>--paste</code> to send the transcript straight into the focused app.</p>
    </article>
  </section>

  <div class="surface-band">
    <section class="landing-section">
      <p class="eyebrow">Workflow</p>
      <h2>From speech to useful output.</h2>
      <div class="steps">
        <div><strong>1. Record</strong><span>Press your global hotkey or run <code>ostt</code> in the terminal.</span></div>
        <div><strong>2. Transcribe</strong><span>OpenAI transcribes the audio via the API.</span></div>
        <div><strong>3. Process</strong><span>Optionally run AI prompts or shell commands on the result.</span></div>
        <div><strong>4. Send</strong><span>Print to stdout, copy to clipboard, write to a file, or pipe onward.</span></div>
      </div>
    </section>
  </div>

  <section class="landing-section split pipeline-section">
    <div>
      <p class="eyebrow">Pipeline</p>
      <h2>OpenAI quality inside your shell.</h2>
      <p>OSTT turns OpenAI transcription into a standard Unix primitive. The output is plain text on stdout, so you can pipe it through <code>jq</code>, <code>sed</code>, or any CLI tool. Use <code>-p</code> to chain processing actions. Switch between OpenAI models via <code>ostt model</code> without changing your shell aliases.</p>
    </div>
    <div class="command-card">
      <pre><code># Transcribe a file with gpt-4o-transcribe&#10;ostt transcribe interview.mp3 -o transcript.txt&#10;&#10;# Record, clean with AI processing action, copy to clipboard&#10;ostt -p clean -c&#10;&#10;# Transcribe and pipe straight to your editor&#10;ostt | nvim -</code></pre>
    </div>
  </section>

  <section class="landing-section final-cta">
    <h2>Add OpenAI transcription to your terminal.</h2>
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

<SiteFooter />
