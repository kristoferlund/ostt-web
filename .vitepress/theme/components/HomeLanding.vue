<script setup lang="ts">
import { ref } from 'vue'
import { useSpine } from '../spine'
import SpineNode from './SpineNode.vue'

const INSTALL = 'curl -fsSL https://ostt.ai/install | bash'

const { root, logo, end, spine, style, reduced } = useSpine()

const copied = ref(false)
function copyInstall() {
  navigator.clipboard?.writeText(INSTALL)
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}

// A terminal session, typed line by line once it comes into view. Each
// line starts when the one before it has finished.
type Line = { text: string; kind: 'cmd' | 'note' | 'gap'; delay: number; n: number }
function session(lines: string[]): Line[] {
  let at = 0.3
  return lines.map((text) => {
    const kind = text === '' ? 'gap' : text.startsWith('#') ? 'note' : 'cmd'
    const n = text.length
    const line = { text, kind, delay: at, n } as Line
    at += kind === 'cmd' ? n * 0.035 + 0.35 : kind === 'note' ? 0.25 : 0.1
    return line
  })
}

const gpus = [
  { name: 'CUDA', hardware: 'NVIDIA' },
  { name: 'Vulkan', hardware: 'AMD, Intel, NVIDIA' },
  { name: 'Metal', hardware: 'macOS' }
]

const localSession = session([
  '# Download and select a local model',
  'ostt model local download parakeet-ultra',
  'ostt model select parakeet/parakeet-ultra',
  '',
  '# Keep it loaded between recordings',
  'ostt daemon start',
  '',
  '# Dictate into the focused app, fully offline',
  'ostt launch --paste'
])

const routeSession = session([
  '# Record, clean up, paste into the focused app',
  'ostt launch --paste -p clean',
  '',
  '# Transcribe a meeting, summarise it into a file',
  'ostt transcribe meeting.mp3 -p summary -o notes.md',
  '',
  '# Run the "cmd" action on the second latest recording',
  'ostt process 2 cmd'
])

// The workflow as a pipeline: four stages, then the four places the text
// can go. Laid out across on wide screens and down on narrow ones; every
// stage is drawn around its own centre.
const stages = [
  { label: 'Record', note: 'hotkey or file' },
  { label: 'Transcribe', note: 'local or cloud' },
  { label: 'Process', note: 'AI or bash' },
  { label: 'Send', note: 'anywhere' }
]
const outputs = ['paste', 'clipboard', 'file', 'stdout']

function pipeline(wide: boolean) {
  const at = stages.map((_, i) => (wide ? { x: 100 + i * 210, y: 150 } : { x: 180, y: 80 + i * 190 }))
  const last = at[at.length - 1]
  const chips = outputs.map((label, i) =>
    wide ? { label, x: 930, y: 60 + i * 60 } : { label, x: 52 + i * 85, y: 800 }
  )
  const track = wide ? `M ${at[0].x} 150 H ${last.x}` : `M 180 ${at[0].y} V ${last.y}`
  const fans = chips.map((c) =>
    wide
      ? `M ${last.x} 150 H 820 C 860 150, 860 ${c.y}, 880 ${c.y}`
      : `M 180 ${last.y} V ${last.y + 70} C 180 ${last.y + 110}, ${c.x} ${c.y - 60}, ${c.x} ${c.y - 18}`
  )
  // A pulse runs the whole way for each output: along the track, then out.
  const dots = fans.map((f) => `${track} ${f.replace(/^M\s*[\d.]+\s+[\d.]+/, '')}`)
  return { at, chips, track, fans, dots, box: wide ? '0 0 1000 300' : '0 0 360 840' }
}
const across = pipeline(true)
const down = pipeline(false)

const features = [
  { title: 'Linux-first', text: 'Hotkeys for Omarchy and Hyprland, GNOME, KDE and other Linux desktops, with macOS support too.' },
  { title: 'Paste into any app', text: 'OSTT closes its popup, waits for focus to return, and pastes into the editor, browser, chat or terminal you were in.' },
  { title: 'Cloud or local models', text: 'OpenAI, Deepgram, Groq, DeepInfra, AssemblyAI, Berget, ElevenLabs, Mistral, or Parakeet and Whisper on your machine.' },
  { title: 'GPU acceleration', text: 'Metal on macOS, CUDA on NVIDIA, Vulkan on AMD and Intel. The install script picks the right build.' },
  { title: 'Daemon mode', text: 'Keep a local model loaded in the background, so every transcription starts at once.' },
  { title: 'Process with AI or bash', text: 'Run your own prompts on the agent you already use, or any shell command, before the text is sent on.' },
  { title: 'Retry without re-recording', text: 'Recordings are saved, so the same audio can be transcribed again with another model.' },
  { title: 'Keywords and replace rules', text: 'Teach the model your names and terms with ostt keyword, and fix casing with ostt replace.' },
  { title: 'File transcription in CI', text: 'Transcribe meetings, voicemails and audio files from scripts and pipelines, no microphone needed.' },
  { title: 'Terminal-native', text: 'Pipe the text through jq, sed or awk, and chain recording, processing and output in one line.' },
  { title: 'Agent-ready', text: 'Speak your prompts into OpenCode, Claude Code, Codex, Gemini CLI and other agents.' },
  { title: 'No subscription', text: 'Free and open source. The config is local, and the providers are the ones you choose.' }
]
// How far each card sits from the spine, so the two columns don't read as a
// grid.
const offsets = [36, 8, 64, 40, 12, 72, 48, 20, 0, 56, 28, 44]
</script>

<template>
  <main ref="root" class="spine-page home" :class="{ reduced }" :style="style">
    <div ref="spine" class="spine" aria-hidden="true"><div class="spine-lit"></div></div>

    <!-- Hero -->
    <section class="hero">
      <span ref="logo" class="hero-mark" role="img" aria-label="OSTT"></span>
      <div class="hero-text mask">
        <p class="kicker">Speech to text, in your terminal</p>
        <h1>Open source voice&#8209;to&#8209;text<br />for Linux. And macOS.</h1>
        <p class="lede">
          Record from a hotkey, transcribe on your own machine with Parakeet or Whisper or with a cloud model, then paste the
          text into the app you are in, or send it to your clipboard, a file, an AI prompt or any shell command.
        </p>
        <button class="install" type="button" :class="{ copied }" @click="copyInstall" aria-label="Copy the install command">
          <code><span class="dim">curl -fsSL https://</span><b>ostt.ai/install</b><span class="dim"> | bash</span></code>
          <span class="install-state">{{ copied ? 'Copied' : 'Copy' }}</span>
        </button>
        <p class="free">Free and open source <span aria-hidden="true">·</span> MIT</p>
      </div>
    </section>

    <!-- Local models -->
    <section class="chapter">
      <SpineNode />
      <header class="chapter-head mask" data-reveal>
        <p class="kicker">Local models</p>
        <h2>Runs offline, on your own hardware.</h2>
        <p>
          A built-in engine runs NVIDIA Parakeet and OpenAI Whisper with <strong>full GPU support</strong>, and the installer picks the right
          build for your hardware. Once a model is downloaded, no audio leaves your machine. See
          <a href="/guide/local-models">Local Models</a> and <a href="/guide/gpu-acceleration">GPU Acceleration</a>.
        </p>
      </header>
      <ul class="gpu mask" data-reveal aria-label="GPU backends">
        <li v-for="g in gpus" :key="g.name"><b>{{ g.name }}</b><span>{{ g.hardware }}</span></li>
      </ul>
      <div class="term" data-reveal>
        <p class="term-bar"><span></span><span></span><span></span></p>
        <pre><code><span
          v-for="(l, i) in localSession"
          :key="i"
          class="tl"
          :class="l.kind"
          :style="{ '--delay': `${l.delay}s`, '--n': l.n }"
        ><span v-if="l.kind === 'cmd'" class="prompt">$ </span><span class="tt">{{ l.text }}</span></span></code></pre>
      </div>
    </section>

    <!-- Workflow -->
    <section class="chapter">
      <SpineNode />
      <header class="chapter-head mask" data-reveal>
        <p class="kicker">Workflow</p>
        <h2>From speech to useful output.</h2>
        <p>Record, transcribe with the model that fits the job, optionally process the text, and send it where it is needed.</p>
      </header>
      <div class="flow mask" data-reveal>
        <svg v-for="layout in [across, down]" :key="layout.box" class="flow-svg" :class="layout === across ? 'wide' : 'narrow'"
          :viewBox="layout.box" role="img" aria-label="Record, transcribe, process, then send to paste, clipboard, file or stdout">
          <path class="track" :d="layout.track" />
          <path v-for="d in layout.fans" :key="d" class="track" :d="d" />
          <template v-if="!reduced">
            <circle v-for="(d, i) in layout.dots" :key="'dot' + i" class="pulse" r="4">
              <animateMotion :path="d" dur="3.6s" repeatCount="indefinite" />
            </circle>
          </template>
          <g v-for="(p, i) in layout.at" :key="i" class="stage" :transform="`translate(${p.x} ${p.y})`" :style="{ '--n': i }">
            <rect class="stage-box" x="-75" y="-50" width="150" height="100" rx="14" />
            <!-- Record: a level meter -->
            <g v-if="i === 0">
              <rect v-for="b in 9" :key="b" class="bar" :x="-38 + (b - 1) * 9.5" y="-20" width="4" height="40" rx="2" :style="{ '--b': b, '--h': 0.35 + ((b * 7) % 5) * 0.13 }" />
            </g>
            <!-- Transcribe: lines of text appear -->
            <g v-else-if="i === 1">
              <path v-for="(w, k) in [110, 88, 62]" :key="k" class="line" :d="`M -55 ${-20 + k * 20} h ${w}`" pathLength="1" :style="{ '--k': k }" />
            </g>
            <!-- Process: the text is rewritten -->
            <g v-else-if="i === 2">
              <path v-for="(w, k) in [110, 88, 62]" :key="'a' + k" class="line before" :d="`M -55 ${-20 + k * 20} h ${w}`" />
              <path v-for="(w, k) in [70, 104, 84]" :key="'b' + k" class="line after" :d="`M -55 ${-20 + k * 20} h ${w}`" pathLength="1" :style="{ '--k': k }" />
              <path class="spark" d="M 54 -38 l 3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3 z" />
            </g>
            <!-- Send: on its way -->
            <g v-else>
              <path v-for="k in 3" :key="k" class="chev" :d="`M ${-26 + (k - 1) * 18} -12 l 12 12 -12 12`" :style="{ '--k': k }" />
            </g>
            <text class="stage-label" y="76">{{ stages[i].label }}</text>
            <text class="stage-note" y="96">{{ stages[i].note }}</text>
          </g>
          <g v-for="(c, i) in layout.chips" :key="c.label" class="chip" :transform="`translate(${c.x} ${c.y})`" :style="{ '--n': i }">
            <rect :x="layout === across ? -50 : -40" y="-16" :width="layout === across ? 100 : 80" height="32" rx="9" />
            <text y="5">{{ c.label }}</text>
          </g>
        </svg>
      </div>
    </section>

    <!-- Pipeline -->
    <section class="chapter">
      <SpineNode />
      <header class="chapter-head mask" data-reveal>
        <p class="kicker">Pipeline</p>
        <h2>Transcribe once. Route anywhere.</h2>
        <p>
          Dictate straight into the focused app, process audio files from scripts, hand the text to an AI agent, or pipe it
          through your own commands. <a href="/guide/processing">Processing actions</a> are one flag away.
        </p>
      </header>
      <div class="term" data-reveal>
        <p class="term-bar"><span></span><span></span><span></span></p>
        <pre><code><span
          v-for="(l, i) in routeSession"
          :key="i"
          class="tl"
          :class="l.kind"
          :style="{ '--delay': `${l.delay}s`, '--n': l.n }"
        ><span v-if="l.kind === 'cmd'" class="prompt">$ </span><span class="tt">{{ l.text }}</span></span></code></pre>
      </div>
    </section>

    <!-- Features, around the spine -->
    <section class="chapter">
      <SpineNode />
      <header class="chapter-head mask" data-reveal>
        <p class="kicker">Everything else</p>
        <h2>Small tool, many uses.</h2>
      </header>
      <div class="features">
        <article
          v-for="(f, n) in features"
          :key="f.title"
          class="feature"
          :class="n % 2 ? 'right' : 'left'"
          data-reveal
          :style="{ '--n': n, '--dx': `${offsets[n]}px` }"
        >
          <span class="branch" data-draw aria-hidden="true"></span>
          <div class="feature-card">
            <h3>{{ f.title }}</h3>
            <p>{{ f.text }}</p>
          </div>
        </article>
      </div>
    </section>

    <!-- Omarchy -->
    <section class="chapter">
      <SpineNode />
      <header class="chapter-head mask" data-reveal>
        <p class="kicker">On Omarchy</p>
        <h2>Dictation that takes instructions.</h2>
        <p>
          On Omarchy, OSTT becomes the system's dictation, and <span class="action-pill"><span aria-hidden="true">👻</span>
          Ghostwriter</span> reads your screen and writes replies with the AI agent you already use.
        </p>
        <p class="see"><a href="/omarchy">See OSTT on Omarchy <span aria-hidden="true">→</span></a></p>
      </header>
    </section>

    <!-- Install -->
    <section class="chapter end">
      <SpineNode />
      <div class="get mask" data-reveal>
        <h2>Try it.</h2>
        <p class="get-sub">
          One command installs OSTT, with the right build for your hardware. OSTT is free, requires no account, and is open
          source and MIT licensed.
        </p>
        <button class="install big" type="button" :class="{ copied }" @click="copyInstall" aria-label="Copy the install command">
          <code><span class="dim">curl -fsSL https://</span><b>ostt.ai/install</b><span class="dim"> | bash</span></code>
          <span class="install-state">{{ copied ? 'Copied' : 'Copy' }}</span>
        </button>
      </div>
    </section>

    <nav ref="end" class="explore" aria-label="Learn more">
      <a class="primary" href="/guide/getting-started">Get started <span aria-hidden="true">→</span></a>
      <a href="/guide/choosing-a-model">Choose a model <span aria-hidden="true">→</span></a>
      <a href="https://github.com/kristoferlund/ostt">GitHub <span aria-hidden="true">↗</span></a>
    </nav>
  </main>
</template>

<style scoped>
.chapter-head p a,
.see a {
  color: var(--ink);
  text-decoration: underline;
  text-decoration-color: rgb(165 180 255 / 50%);
  text-underline-offset: 3px;
}
.see {
  margin-top: 22px !important;
}
.see a {
  font-weight: 500;
}
.action-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.3em;
  padding: 0.05em 0.6em 0.1em 0.45em;
  border: 1px solid rgb(165 180 255 / 35%);
  border-radius: 99px;
  background: rgb(165 180 255 / 10%);
  color: var(--ink);
  font-weight: 500;
  line-height: 1.35;
  white-space: nowrap;
}

/* Terminal sessions, typed once they come into view. */
.chapter-head strong {
  font-weight: 600;
  color: var(--ink);
}
.gpu {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin: -24px 0 40px;
  padding: 8px;
  list-style: none;
}
.gpu li {
  display: flex;
  align-items: baseline;
  gap: 8px;
  padding: 8px 16px;
  border: 1px solid rgb(165 180 255 / 30%);
  border-radius: 99px;
  background: rgb(165 180 255 / 8%);
  font-size: 0.92rem;
}
.gpu b {
  font-weight: 600;
  color: var(--ink);
}
.gpu span {
  color: var(--body);
}

.term {
  width: min(680px, 100%);
  border: 1px solid #26262a;
  border-radius: 14px;
  background: #0d0d0f;
  box-shadow: 0 40px 100px -40px rgb(0 0 0 / 90%);
  overflow: hidden;
}
.term-bar {
  display: flex;
  gap: 7px;
  margin: 0;
  padding: 12px 16px;
  border-bottom: 1px solid #1d1d20;
}
.term-bar span {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #2a2a2f;
}
.term pre {
  margin: 0;
  padding: 20px 22px 24px;
  overflow-x: auto;
}
.term code {
  font-family: var(--font-code);
  font-size: 13.5px;
  line-height: 1.75;
}
.tl {
  display: block;
  min-height: 1.75em;
  white-space: pre;
}
.tl.note {
  color: #5f6068;
}
.tl.cmd {
  color: #e8e8ee;
}
.prompt {
  color: var(--sig);
}
.tl .tt {
  display: inline-block;
  vertical-align: bottom;
  overflow: hidden;
}
/* Commands type out one character at a time; notes fade in. */
.term .tl.cmd .tt {
  width: 0;
}
.term .tl.note,
.term .tl.cmd .prompt {
  opacity: 0;
}
.term.in .tl.cmd .tt {
  animation: type calc(var(--n) * 0.035s) steps(var(--n), end) var(--delay) forwards;
}
.term.in .tl.note,
.term.in .tl.cmd .prompt {
  animation: appear 0.3s ease var(--delay) forwards;
}
@keyframes type {
  to {
    width: calc(var(--n) * 1ch);
  }
}
@keyframes appear {
  to {
    opacity: 1;
  }
}

/* Workflow pipeline */
.flow {
  width: min(1000px, 100%);
}
.flow-svg {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
}
.flow-svg.narrow {
  display: none;
  max-width: 360px;
  margin: 0 auto;
}
.track {
  fill: none;
  stroke: rgb(165 180 255 / 35%);
  stroke-width: 1.4;
  stroke-dasharray: 3 7;
}
.flow.in .track {
  animation: flow 0.9s linear infinite;
}
@keyframes flow {
  to {
    stroke-dashoffset: -10;
  }
}
.pulse {
  fill: var(--sig);
  filter: drop-shadow(0 0 5px var(--sig));
}
.stage-box {
  fill: #0e0e10;
  stroke: #2a2a2f;
  stroke-width: 1.2;
}
.stage-label {
  fill: var(--ink);
  font-size: 17px;
  font-weight: 600;
  text-anchor: middle;
}
.stage-note {
  fill: #6b6b73;
  font-family: var(--font-code);
  font-size: 12px;
  text-anchor: middle;
}
.bar {
  fill: #e8e8ee;
  transform-box: fill-box;
  transform-origin: center;
  transform: scaleY(0.15);
}
.flow.in .bar {
  animation: level 0.9s ease-in-out infinite;
  animation-delay: calc(var(--b) * -0.13s);
}
@keyframes level {
  0%,
  100% {
    transform: scaleY(0.15);
  }
  50% {
    transform: scaleY(var(--h));
  }
}
.line {
  fill: none;
  stroke: #c9c9cf;
  stroke-width: 5;
  stroke-linecap: round;
}
.stage .line[pathLength] {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
}
.flow.in .stage .line[pathLength] {
  animation: write 3.6s ease-in-out infinite;
  animation-delay: calc(var(--k) * 0.25s);
}
.line.before {
  stroke: #3a3a40;
}
.line.after {
  stroke: var(--sig);
}
.flow.in .line.after {
  animation-delay: calc(1.2s + var(--k) * 0.25s);
}
@keyframes write {
  0% {
    stroke-dashoffset: 1;
  }
  25%,
  80% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 0;
  }
}
.spark {
  fill: var(--sig);
  transform-box: fill-box;
  transform-origin: center;
}
.flow.in .spark {
  animation: twinkle 1.8s ease-in-out infinite;
}
@keyframes twinkle {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(0.7) rotate(0deg);
  }
  50% {
    opacity: 1;
    transform: scale(1.1) rotate(45deg);
  }
}
.chev {
  fill: none;
  stroke: #e8e8ee;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0.25;
}
.flow.in .chev {
  animation: chev 1.2s ease-in-out infinite;
  animation-delay: calc(var(--k) * 0.18s);
}
@keyframes chev {
  0%,
  100% {
    opacity: 0.2;
  }
  40% {
    opacity: 1;
  }
}
.chip rect {
  fill: #0e0e10;
  stroke: #2a2a2f;
  stroke-width: 1.2;
}
.chip text {
  fill: #c9c9cf;
  font-family: var(--font-code);
  font-size: 13px;
  text-anchor: middle;
}
.flow.in .chip rect {
  animation: chip 3.6s ease-in-out infinite;
  animation-delay: calc(2.4s + var(--n) * 0.05s);
}
@keyframes chip {
  0%,
  100% {
    stroke: #2a2a2f;
  }
  8% {
    stroke: var(--sig);
  }
  30% {
    stroke: #2a2a2f;
  }
}

/* Features, staggered on both sides of the spine and joined to it. */
.features {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 120px;
  width: min(1040px, 100%);
  padding-bottom: 140px;
}
.feature {
  position: relative;
  width: min(320px, 100%);
  margin-bottom: 28px;
}
.feature.left {
  justify-self: end;
  margin-right: var(--dx);
}
.feature.right {
  justify-self: start;
  margin-left: var(--dx);
  top: 120px;
}
/* The branch from the spine to the card. Its box starts at the line and is
   40px tall, so it grows out over the 40px the lit spine travels past it,
   and is never lit on its own. */
.branch {
  position: absolute;
  top: 46px;
  width: calc(60px + var(--dx));
  height: 40px;
}
.branch::before {
  content: '';
  position: absolute;
  inset: 0 0 auto;
  height: 1px;
  background: linear-gradient(var(--line-dir), var(--sig), rgb(165 180 255 / 25%));
  transform: scaleX(var(--draw, 0));
  transition: transform 0.12s linear;
}
.feature.left .branch {
  --line-dir: to left;
  left: 100%;
}
.feature.left .branch::before {
  transform-origin: right;
}
.feature.right .branch {
  --line-dir: to right;
  right: 100%;
}
.feature.right .branch::before {
  transform-origin: left;
}
.feature-card {
  padding: 22px 22px 24px;
  border: 1px solid #222226;
  border-radius: 14px;
  background: #0d0d0f;
  animation: float 6s ease-in-out infinite;
  animation-delay: calc(var(--n) * -0.9s);
  transition: border-color 0.2s;
}
.feature-card:hover {
  border-color: #3a3a42;
}
@keyframes float {
  0%,
  100% {
    translate: 0 0;
  }
  50% {
    translate: 0 -7px;
  }
}
.feature h3 {
  margin: 0 0 8px;
  font-size: 15.5px;
  font-weight: 600;
  color: var(--ink);
}
.feature p {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
}

@media (max-width: 760px) {
  .flow-svg.wide {
    display: none;
  }
  .flow-svg.narrow {
    display: block;
  }
  .features {
    grid-template-columns: 1fr;
    padding-bottom: 0;
  }
  .feature.left,
  .feature.right {
    justify-self: center;
    margin: 0 0 16px;
    top: 0;
  }
  .branch {
    display: none;
  }
}

.reduced .feature-card,
.reduced .branch::before {
  animation: none;
  transition: none;
}
.reduced .term .tl.cmd .tt {
  width: auto;
}
.reduced .term .tl.note,
.reduced .term .tl.cmd .prompt {
  opacity: 1;
}
.reduced .term.in .tl.cmd .tt,
.reduced .term.in .tl.note,
.reduced .term.in .tl.cmd .prompt {
  animation: none;
}
.reduced .stage .line[pathLength] {
  stroke-dashoffset: 0;
}
</style>
