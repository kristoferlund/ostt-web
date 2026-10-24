<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { useSpine } from '../spine'
import SpineNode from './SpineNode.vue'

// The action that takes instructions and sees the screen. One place, so a
// new name is a one-line change.
const ASSISTANT = 'Ghostwriter'

const INSTALL = 'omarchy plugin add https://github.com/kristoferlund/ostt-omarchy-dictate.git --enable'

type Word = { w: string; hl: boolean; b: boolean; i: number }

// Splits text segments into words, keeping the spaces with them, so each word
// can appear on its own. A segment is [text, highlight?, bold?].
function words(segments: [string, boolean?, boolean?][]): Word[] {
  let i = 0
  return segments.flatMap(([text, hl, b]) =>
    text
      .split(/(?<=\s)/)
      .filter(Boolean)
      .map((w) => ({ w, hl: !!hl, b: !!b, i: i++ }))
  )
}

const issueText =
  'Reproduced on 2.3.1. Exporting a file with a space in its name writes an empty file. Renaming it fixes the export, so the path is probably not quoted.'
const issueWords = words([[issueText]])

const slackSpoken = words([["Tell her yes if the fix lands in time, and that I'll do the changelog tonight."]])
const slackReply = words([
  ['Yes, '],
  ['Thursday', true],
  [' works for '],
  ['2.4', true],
  [' as long as '],
  ["Jonas's export fix", true],
  [' lands '],
  ['tomorrow morning', true],
  [". I'll have the changelog ready tonight."]
])

const editorSpoken = words([['Rewrite this like the other points.']])
const editorAfter = words([['Export:', false, true], [' Files with spaces in their names no longer export empty.']])

const agents = [
  { name: 'Claude Code', icon: 'claude' },
  { name: 'Codex', icon: 'openai' },
  { name: 'OpenCode', icon: 'opencode' },
  { name: 'Gemini CLI', icon: 'googlegemini' },
  { name: 'GitHub Copilot', icon: 'githubcopilot' },
  { name: 'Cursor', icon: 'cursor' },
  { name: 'Grok', icon: 'grok' },
  { name: 'Pi', icon: 'pi' },
  { name: 'Hermes', icon: 'hermes' },
  { name: 'OpenClaw', icon: 'openclaw' }
]

const facts = [
  {
    title: 'Local and fast',
    text: 'Parakeet and Whisper on your CPU or GPU, kept loaded so dictation starts the moment you speak.',
    // a chip
    icon: ['M7 7h10v10H7z', 'M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4', 'M10.5 10.5h3v3h-3z']
  },
  {
    title: 'Never loses a word',
    text: 'If the agent fails or takes too long, your words are pasted as you said them.',
    // a speech bubble with a check
    icon: ['M4 5h16v11H9l-5 4z', 'M8.5 10.5l2.5 2.5 4.5-4.5']
  },
  {
    title: 'Screenshots on request',
    text: 'Only in the apps you choose, sent only to your agent, deleted when the dictation is done.',
    // a viewfinder around an eye
    icon: ['M3 8V4h4M17 4h4v4M21 16v4h-4M7 20H3v-4', 'M6.5 12s2-3.5 5.5-3.5 5.5 3.5 5.5 3.5-2 3.5-5.5 3.5S6.5 12 6.5 12z', 'M12 11v2']
  },
  {
    title: 'Free and open source',
    text: 'No price, no sign-up, no subscription. MIT-licensed, configured in plain TOML you keep with your dotfiles.',
    // angle brackets
    icon: ['M8.5 7L3.5 12l5 5', 'M15.5 7l5 5-5 5', 'M13.5 5l-3 14']
  }
]

// The spine's five branches through the agents: out from the centre above
// the two rows, straight down through each column, and back in below. In a
// 1000 × 400 box; the rows sit between y = 100 and y = 300.
const columns = [92, 296, 500, 704, 908]
const branches = columns.map(
  (x) => `M 500 0 C 500 60, ${x} 40, ${x} 100 L ${x} 300 C ${x} 360, 500 340, 500 400`
)

const apps = [
  { name: 'Ghostty', icon: 'ghostty', action: 'Plain transcription', shot: false },
  { name: 'Obsidian', icon: 'obsidian', action: 'Text cleanup', shot: false },
  { name: 'Slack', icon: 'slack', action: ASSISTANT, shot: true },
  { name: 'Typora', icon: 'typora', action: ASSISTANT, shot: true }
]




// One bar of the pill's level meter: its place in the wave and how high it
// swings, varied so the bars don't move in step.
function bar(n: number) {
  return { '--n': n, '--amp': `${5 + ((n * 7) % 13)}px` }
}

// Each scene plays a loop of phases while it is on screen.
const phase = reactive<Record<string, number>>({ issue: 0, slack: 0, editor: 0 })
const timelines: Record<string, [number, number][]> = {
  // 1 speaking, 2 transcribing, 3 pasted
  issue: [[1, 3400], [2, 1200], [3, 6000], [0, 900]],
  // 1 screenshot, 2 speaking, 3 writing, 4 pasted
  slack: [[1, 900], [2, 3000], [3, 2000], [4, 6500], [0, 900]],
  editor: [[1, 900], [2, 2000], [3, 1800], [4, 6000], [0, 900]]
}
const timers: Record<string, ReturnType<typeof setTimeout>> = {}
const running: Record<string, boolean> = {}

function play(name: string) {
  if (running[name]) return
  running[name] = true
  let k = 0
  const step = () => {
    if (!running[name]) return
    const [p, ms] = timelines[name][k]
    phase[name] = p
    k = (k + 1) % timelines[name].length
    timers[name] = setTimeout(step, ms)
  }
  step()
}

function stop(name: string) {
  running[name] = false
  clearTimeout(timers[name])
}

const copied = ref(false)
function copyInstall() {
  navigator.clipboard?.writeText(INSTALL)
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}

const { root, logo, end, spine, style, reduced } = useSpine((name, visible) => (visible ? play(name) : stop(name)))

// Without motion, every scene shows its result.
onMounted(() => {
  if (reduced.value) Object.assign(phase, { issue: 3, slack: 4, editor: 4 })
})

onBeforeUnmount(() => Object.keys(timelines).forEach(stop))
</script>

<template>
  <main ref="root" class="spine-page" :class="{ reduced }" :style="style">
    <div ref="spine" class="spine" aria-hidden="true"><div class="spine-lit"></div></div>

    <!-- Hero -->
    <section class="hero">
      <span ref="logo" class="hero-mark" role="img" aria-label="OSTT"></span>
      <div class="hero-text mask">
        <p class="kicker">OSTT for Omarchy</p>
        <h1>Dictation that takes<br />instructions.</h1>
        <p class="lede">
          Talk to any app on Omarchy. Ask for a reply instead of just a transcript, and your agent reads the screen and writes it
          for you.
        </p>
        <button class="install" type="button" :class="{ copied }" @click="copyInstall" aria-label="Copy the install command">
          <code><span class="dim">omarchy plugin add https://github.com/kristoferlund/</span><b>ostt-omarchy-dictate</b><span class="dim">.git --enable</span></code>
          <span class="install-state">{{ copied ? 'Copied' : 'Copy' }}</span>
        </button>
        <p class="free">Free and open source <span aria-hidden="true">·</span> MIT</p>
      </div>
    </section>

    <!-- 1. Plain dictation -->
    <section class="chapter">
      <SpineNode />
      <header class="chapter-head mask" data-reveal>
        <p class="kicker">Dictate</p>
        <h2>Speak into any app.</h2>
        <p>OSTT plugs into Omarchy's own dictation. Talk, and your words land where your cursor is, in any app.</p>
        <p class="local">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16v10H4zM9 20h6M12 16v4" /></svg>
          <span><b>Transcribed on your own machine.</b> <span class="dim-inline">Parakeet or Whisper, no cloud.</span></span>
        </p>
      </header>

      <div class="screen" data-scene="issue" :data-phase="phase.issue">
        <div class="win issue">
          <div class="issue-top">
            <span class="issue-state">Open</span>
            <span class="issue-title">Export fails for file names with spaces <span class="dim">#482</span></span>
          </div>
          <div class="comment">
            <span class="avatar a1">M</span>
            <div class="bubble">
              <p class="meta"><b>maya</b> opened this issue</p>
              <p>Exported files come out empty for some projects. Anyone else seeing this?</p>
            </div>
          </div>
          <div class="comment">
            <span class="avatar a0">K</span>
            <div class="bubble composer">
              <p class="meta"><b>Write</b> <span class="dim">Preview</span></p>
              <p class="typed">
                <span v-for="t in issueWords" :key="t.i" class="word" :style="{ '--i': t.i }">{{ t.w }}</span><span class="caret"></span>
              </p>
            </div>
          </div>
        </div>
        <div class="speech">
          <p class="speech-who"><span class="rec" aria-hidden="true"></span>You, speaking</p>
          <p class="said">
            <span v-for="t in issueWords" :key="t.i" class="word" :style="{ '--i': t.i }">{{ t.w }}</span>
          </p>
        </div>
        <div class="pill"><span class="bars"><i v-for="n in 18" :key="n" :style="bar(n)"></i></span></div>
      </div>
    </section>

    <!-- 2. Agents -->
    <section class="chapter">
      <SpineNode />
      <header class="chapter-head mask" data-reveal>
        <p class="kicker">Connect</p>
        <h2>Processing runs on the agent you already pay for.</h2>
        <p>
          Before your words are pasted, a <a href="/guide/processing">processing action</a> can clean them up, rewrite them or
          turn them into a reply. OSTT runs those actions on the coding agent you are already signed in to: no new account, no
          API key, and the agent's tools switched off.
        </p>
      </header>
      <div class="agents" data-reveal data-draw>
        <ul>
          <li v-for="(a, n) in agents" :key="a.name" :style="{ '--n': n }">
            <span class="agent-icon" :style="{ '--icon': `url(/agents/${a.icon}.svg)` }" aria-hidden="true"></span>
            <span class="agent-name">{{ a.name }}</span>
          </li>
        </ul>
        <svg class="branches" viewBox="0 0 1000 400" preserveAspectRatio="none" aria-hidden="true">
          <path v-for="d in branches" :key="d" class="lit" :d="d" pathLength="1" />
        </svg>
      </div>
    </section>

    <!-- 3. Instructions with screen context -->
    <section class="chapter">
      <SpineNode />
      <header class="chapter-head mask" data-reveal>
        <p class="kicker">Instruct</p>
        <h2>Say what you want written.</h2>
        <p>
          <span class="action-pill"><span aria-hidden="true">👻</span> {{ ASSISTANT }}</span> is the processing action that
          takes instructions. Turn it on for an app, and OSTT sends your agent a
          screenshot along with your words. The agent reads the conversation and writes the reply, names and dates included.
        </p>
      </header>

      <div class="screen" data-scene="slack" :data-phase="phase.slack">
        <div class="win slack">
          <aside class="slack-side">
            <p class="ws">Northwind</p>
            <p class="ch on"># release</p>
            <p class="ch"># design</p>
            <p class="ch"># support</p>
          </aside>
          <div class="slack-main">
            <p class="slack-top"># release</p>
            <div class="msg">
              <span class="avatar a1">M</span>
              <div>
                <p class="meta"><b>Maya</b> <span class="dim">10:14</span></p>
                <p>Can we still ship <em>2.4</em> on <em>Thursday</em>? QA found a crash in the export dialog.</p>
              </div>
            </div>
            <div class="msg">
              <span class="avatar a2">J</span>
              <div>
                <p class="meta"><b>Jonas</b> <span class="dim">10:21</span></p>
                <p>The <em>export fix</em> is in review, should land <em>tomorrow morning</em>.</p>
              </div>
            </div>
            <div class="msg">
              <span class="avatar a1">M</span>
              <div>
                <p class="meta"><b>Maya</b> <span class="dim">10:23</span></p>
                <p>@kristofer are we good, and who's on the changelog?</p>
              </div>
            </div>
            <div class="slack-composer">
              <p class="typed">
                <span v-for="t in slackReply" :key="t.i" class="word" :class="{ hl: t.hl }" :style="{ '--i': t.i }">{{ t.w }}</span><span class="caret"></span>
              </p>
              <span class="placeholder">Message #release</span>
            </div>
          </div>
          <div class="scan" aria-hidden="true"></div>
        </div>
        <div class="speech">
          <p class="speech-who"><span class="rec" aria-hidden="true"></span>You, speaking</p>
          <p class="said">
            <span v-for="t in slackSpoken" :key="t.i" class="word" :style="{ '--i': t.i }">{{ t.w }}</span>
          </p>
        </div>
        <div class="pill"><span class="bars"><i v-for="n in 18" :key="n" :style="bar(n)"></i></span><span class="pill-label">{{ ASSISTANT }}</span></div>
      </div>
    </section>

    <!-- 4. Edit a selection -->
    <section class="chapter">
      <SpineNode />
      <header class="chapter-head mask" data-reveal>
        <p class="kicker">Edit</p>
        <h2>Select and make changes.</h2>
        <p>Select a passage and say what to change. The agent sees the rest of the page, so the new text fits in.</p>
      </header>

      <div class="screen" data-scene="editor" :data-phase="phase.editor">
        <div class="win editor">
          <p class="editor-top">release-notes.md</p>
          <div class="doc">
            <h3>OSTT 2.4</h3>
            <ul>
              <li><b>Agents:</b> Gemini CLI and Copilot join the built-in agents.</li>
              <li><b>Popup:</b> The level meter follows your microphone's gain.</li>
              <li class="target">
                <span class="before">fixed exporting files that have spaces in the name, it wrote empty files before</span>
                <span class="after"
                  ><span v-for="t in editorAfter" :key="t.i" class="word" :style="{ '--i': t.i }"
                    ><b v-if="t.b">{{ t.w }}</b><template v-else>{{ t.w }}</template></span
                  ></span
                >
              </li>
              <li><b>Daemon:</b> Starts with your session when installed as a service.</li>
            </ul>
          </div>
          <div class="scan" aria-hidden="true"></div>
        </div>
        <div class="speech">
          <p class="speech-who"><span class="rec" aria-hidden="true"></span>You, speaking</p>
          <p class="said">
            <span v-for="t in editorSpoken" :key="t.i" class="word" :style="{ '--i': t.i }">{{ t.w }}</span>
          </p>
        </div>
        <div class="pill"><span class="bars"><i v-for="n in 18" :key="n" :style="bar(n)"></i></span><span class="pill-label">{{ ASSISTANT }}</span></div>
      </div>
    </section>

    <!-- 5. Per app -->
    <section class="chapter">
      <SpineNode />
      <header class="chapter-head mask" data-reveal>
        <p class="kicker">Choose</p>
        <h2>Choose what dictation does in each app.</h2>
        <p>
          Plain transcription in the terminal, Text cleanup in your notes, {{ ASSISTANT }} in Slack. Right-click OSTT's microphone
          in Omarchy's top bar and pick a processing action for each app, and whether it sees the screen.
        </p>
      </header>
      <div class="card" data-reveal>
        <div class="card-head">
          <span class="mark" role="img" aria-label="OSTT"></span>
          <div>
            <p class="card-title">Dictation</p>
            <p class="card-meta">Ready</p>
          </div>
        </div>
        <ul>
          <li v-for="(app, n) in apps" :key="app.name" :style="{ '--n': n }">
            <img class="app-icon" :src="`/apps/${app.icon}.png`" alt="" width="26" height="26" />
            <span class="app-name">{{ app.name }}</span>
            <span class="app-action" :class="{ strong: app.action === ASSISTANT }">
              <svg v-if="app.shot" class="cam" viewBox="0 0 16 16" aria-label="with screenshot"><rect x="1.5" y="4" width="13" height="9" rx="2" /><circle cx="8" cy="8.5" r="2.4" /><path d="M5.5 4l1-1.6h3l1 1.6" /></svg>
              {{ app.action }}
            </span>
          </li>
        </ul>
      </div>
    </section>

    <!-- Facts -->
    <section class="chapter end">
      <SpineNode />
      <div class="facts" data-reveal>
        <div v-for="(fact, n) in facts" :key="fact.title" class="fact" :style="{ '--n': n }">
          <span class="fact-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path v-for="d in fact.icon" :key="d" :d="d" pathLength="1" /></svg>
          </span>
          <h3>{{ fact.title }}</h3>
          <p>{{ fact.text }}</p>
        </div>
      </div>

      <div class="get mask" data-reveal>
        <h2>Try it.</h2>
        <p class="get-sub">
          Install the plugin to make OSTT Omarchy's default dictation tool. OSTT is free and requires no account. The plugin is open
          source and MIT licensed.
        </p>
        <button class="install big" type="button" :class="{ copied }" @click="copyInstall" aria-label="Copy the install command">
          <code><span class="dim">omarchy plugin add https://github.com/kristoferlund/</span><b>ostt-omarchy-dictate</b><span class="dim">.git --enable</span></code>
          <span class="install-state">{{ copied ? 'Copied' : 'Copy' }}</span>
        </button>
      </div>
    </section>

    <nav ref="end" class="explore" aria-label="Learn more">
      <a class="primary" href="/guide/platforms/omarchy-dictation">Setup guide <span aria-hidden="true">→</span></a>
      <a href="/guide/processing">Processing actions <span aria-hidden="true">→</span></a>
      <a href="https://github.com/kristoferlund/ostt-omarchy-dictate">GitHub <span aria-hidden="true">↗</span></a>
    </nav>
  </main>
</template>

<style scoped>
.local {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: fit-content;
  max-width: none !important;
  margin: 22px auto 0 !important;
  padding: 9px 18px;
  border: 1px solid rgb(165 180 255 / 30%);
  border-radius: 99px;
  background: rgb(165 180 255 / 8%);
  color: var(--ink);
  font-size: 0.95rem !important;
  line-height: 1.4 !important;
  text-align: left;
}
.local b {
  font-weight: 600;
}
.dim-inline {
  color: var(--body);
}
.local svg {
  flex: none;
  width: 18px;
  height: 18px;
  fill: none;
  stroke: var(--sig);
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}
/* An action named in running text: a pill that stays on the line. */
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
  vertical-align: baseline;
  white-space: nowrap;
}
.action-pill span {
  font-size: 0.95em;
}


/* A scene: an app window as Hyprland draws it, with the dictation pill below. */
.screen {
  position: relative;
  width: min(760px, 100%);
  padding: 34px 34px 58px;
  border-radius: 20px;
  background:
    radial-gradient(120% 90% at 50% 0%, #17181c 0%, #0c0c0d 55%),
    var(--color-canvas);
  border: 1px solid #1d1d20;
  box-shadow: 0 40px 120px -40px rgb(0 0 0 / 90%);
}
.screen::before {
  /* fine grain, like a lit screen */
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background-image: radial-gradient(rgb(255 255 255 / 4%) 1px, transparent 1px);
  background-size: 3px 3px;
  pointer-events: none;
}
.win {
  position: relative;
  overflow: hidden;
  border: 2px solid #3b3b40;
  border-radius: 10px;
  background: var(--win);
  color: #c9c9cf;
  font-size: 13.5px;
  line-height: 1.55;
  text-align: left;
}
.win p {
  margin: 0;
}
.meta {
  font-size: 12.5px;
  color: #8b8b93;
}
.meta b {
  color: #e4e4e8;
  font-weight: 600;
}
.avatar {
  flex: none;
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 7px;
  font-size: 12px;
  font-weight: 600;
  color: #0b0b0c;
}
.a0 {
  background: #e4e4e8;
}
.a1 {
  background: #f0b27a;
}
.a2 {
  background: #8fd3b6;
}

/* Words appear one by one once their phase begins. */
.word {
  opacity: 0;
  transition: opacity 0.18s ease;
  transition-delay: calc(var(--i) * 70ms);
}
.caret {
  display: inline-block;
  width: 1.5px;
  height: 1.05em;
  margin-left: 1px;
  vertical-align: -0.15em;
  background: var(--sig);
  opacity: 0;
}

/* GitHub-like issue */
.issue-top {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 18px;
  border-bottom: 1px solid var(--win-line);
}
.issue-title {
  font-size: 15px;
  font-weight: 600;
  color: #ededf0;
}
.issue-state {
  font-size: 11.5px;
  font-weight: 600;
  padding: 3px 9px;
  border-radius: 99px;
  background: #1f6f43;
  color: #e9fff2;
}
.comment {
  display: flex;
  gap: 12px;
  padding: 14px 18px 0;
}
.comment:last-child {
  padding-bottom: 18px;
}
.bubble {
  flex: 1;
  padding: 10px 14px;
  border: 1px solid var(--win-line);
  border-radius: 8px;
}
.bubble .meta {
  margin-bottom: 4px;
}
.composer {
  min-height: 112px;
  border-color: #4a4a52;
}
.composer .typed {
  margin-top: 6px;
}

/* Slack-like channel */
.slack {
  display: grid;
  grid-template-columns: 150px 1fr;
}
.slack-side {
  padding: 14px 12px;
  background: #18141c;
  border-right: 1px solid var(--win-line);
}
.slack-side .ws {
  font-weight: 700;
  color: #ededf0;
  margin-bottom: 14px;
}
.slack-side .ch {
  padding: 3px 8px;
  border-radius: 6px;
  color: #8b8b93;
  font-size: 13px;
}
.slack-side .ch.on {
  background: #2d2540;
  color: #ededf0;
}
.slack-main {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 0 18px 16px;
}
.slack-top {
  padding: 12px 0;
  border-bottom: 1px solid var(--win-line);
  font-weight: 700;
  color: #ededf0;
}
.msg {
  display: flex;
  gap: 10px;
}
.msg em {
  font-style: normal;
  border-radius: 3px;
  transition:
    background 0.4s ease,
    box-shadow 0.4s ease;
}
.slack-composer {
  position: relative;
  min-height: 68px;
  margin-top: 4px;
  padding: 10px 12px;
  border: 1px solid #4a4a52;
  border-radius: 8px;
}
.placeholder {
  position: absolute;
  left: 12px;
  top: 10px;
  color: #5f6068;
  transition: opacity 0.2s;
}
.word.hl {
  border-radius: 3px;
  box-shadow: inset 0 -1.5px 0 var(--sig);
}

/* Markdown editor */
.editor-top {
  padding: 10px 18px;
  border-bottom: 1px solid var(--win-line);
  font-family: var(--font-code);
  font-size: 12px;
  color: #8b8b93;
}
.doc {
  padding: 18px 26px 22px;
}
.doc h3 {
  margin: 0 0 10px;
  font-size: 22px;
  letter-spacing: -0.02em;
  color: #ededf0;
}
.doc ul {
  margin: 0;
  padding-left: 18px;
}
.doc li {
  margin: 6px 0;
}
.doc b {
  color: #ededf0;
}
.target {
  position: relative;
}
.target .before {
  border-radius: 3px;
  background: rgb(74 116 222 / 45%);
  transition: opacity 0.25s ease;
}
.target .after {
  position: absolute;
  left: 0;
  top: 0;
}

/* The screenshot: a light sweep over the window. */
.scan {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(to bottom, transparent 0%, rgb(165 180 255 / 0%) 40%, rgb(165 180 255 / 22%) 50%, transparent 52%);
  background-size: 100% 220%;
  background-position: 0 120%;
  opacity: 0;
}

/* What you say floats over the scene as a bubble, and OSTT's pill sits over
   the bottom edge of the window, as Omarchy shows it. */
.speech {
  position: absolute;
  left: -14px;
  bottom: 96px;
  z-index: 2;
  width: min(380px, 78%);
  padding: 12px 16px 14px;
  border: 1px solid rgb(165 180 255 / 28%);
  border-radius: 16px 16px 16px 4px;
  background: rgb(22 23 29 / 88%);
  backdrop-filter: blur(10px);
  box-shadow:
    0 24px 60px -18px rgb(0 0 0 / 90%),
    0 0 0 1px rgb(0 0 0 / 40%);
  text-align: left;
  opacity: 0;
  transform: translate(-18px, 26px) scale(0.92);
  transform-origin: bottom left;
  transition:
    opacity 0.35s ease,
    transform 0.35s cubic-bezier(0.2, 0.7, 0.2, 1);
}
.speech-who {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 6px;
  font-family: var(--font-code);
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--sig);
}
.rec {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #ff6b6b;
  box-shadow: 0 0 0 0 rgb(255 107 107 / 60%);
  animation: rec 1.4s ease-out infinite;
}
.said {
  margin: 0;
  font-size: 14.5px;
  line-height: 1.5;
  color: #ececf1;
}
.said .word {
  transition-delay: calc(var(--i) * 110ms);
}
.pill {
  position: absolute;
  left: 50%;
  bottom: 30px;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 10px;
  height: 38px;
  padding: 0 18px;
  border: 1px solid #34343a;
  border-radius: 99px;
  background: rgb(18 18 20 / 92%);
  backdrop-filter: blur(10px);
  box-shadow: 0 18px 40px -12px rgb(0 0 0 / 95%);
  opacity: 0;
  transform: translate(-50%, 22px) scale(0.9);
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.bars {
  display: flex;
  align-items: center;
  gap: 3px;
}
.pill i {
  display: block;
  width: 3px;
  height: 4px;
  border-radius: 2px;
  background: #e8e8ee;
}
.pill-label {
  max-width: 0;
  overflow: hidden;
  white-space: nowrap;
  font-family: var(--font-code);
  font-size: 11px;
  letter-spacing: 0.06em;
  color: var(--sig);
  opacity: 0;
  transition:
    max-width 0.4s ease,
    opacity 0.3s ease;
}

/* A slow drift while they are up; `translate` leaves `transform` to the
   fade in and out. */
@keyframes drift {
  0%,
  100% {
    translate: 0 0;
    rotate: -0.6deg;
  }
  50% {
    translate: 10px -12px;
    rotate: 0.6deg;
  }
}
@keyframes bob {
  0%,
  100% {
    translate: 0 0;
  }
  50% {
    translate: 0 -9px;
  }
}
.speech {
  animation: drift 3.8s ease-in-out infinite;
}
.pill {
  animation: bob 2.6s ease-in-out infinite;
  animation-delay: -0.9s;
}

/* After the paste they rise out of the way rather than drop back. */
[data-scene='issue'][data-phase='3'] .speech,
[data-scene='slack'][data-phase='4'] .speech,
[data-scene='editor'][data-phase='4'] .speech {
  transform: translate(12px, -34px) scale(0.96);
  transition-duration: 0.6s;
}
[data-scene='issue'][data-phase='3'] .pill,
[data-scene='slack'][data-phase='4'] .pill,
[data-scene='editor'][data-phase='4'] .pill {
  transform: translate(-50%, -26px) scale(0.94);
  transition-duration: 0.6s;
}

@keyframes rec {
  to {
    box-shadow: 0 0 0 8px rgb(255 107 107 / 0%);
  }
}
@keyframes talk {
  0%,
  100% {
    height: 4px;
  }
  50% {
    height: var(--amp);
  }
}
@keyframes think {
  0%,
  100% {
    opacity: 0.25;
    height: 4px;
  }
  50% {
    opacity: 1;
    height: 10px;
  }
}
@keyframes blink {
  50% {
    opacity: 0;
  }
}
@keyframes sweep {
  from {
    background-position: 0 120%;
    opacity: 1;
  }
  to {
    background-position: 0 -40%;
    opacity: 1;
  }
}
@keyframes glow {
  0%,
  100% {
    background: transparent;
  }
  40% {
    background: var(--sig-soft);
  }
}

/* Phases. Issue: 1 speaking, 2 transcribing, 3 pasted.
   Slack and editor: 1 screenshot, 2 speaking, 3 writing, 4 pasted. */
[data-scene='issue'][data-phase='1'] .said .word,
[data-scene='slack'][data-phase='2'] .said .word,
[data-scene='slack'][data-phase='3'] .said .word,
[data-scene='editor'][data-phase='2'] .said .word,
[data-scene='editor'][data-phase='3'] .said .word,
[data-scene='issue'][data-phase='2'] .said .word {
  opacity: 1;
}
[data-scene='issue'][data-phase='1'] .pill,
[data-scene='issue'][data-phase='2'] .pill,
[data-scene='slack'][data-phase='2'] .pill,
[data-scene='slack'][data-phase='3'] .pill,
[data-scene='editor'][data-phase='2'] .pill,
[data-scene='editor'][data-phase='3'] .pill {
  opacity: 1;
  transform: translate(-50%, 0);
}
[data-scene='issue'][data-phase='1'] .speech,
[data-scene='issue'][data-phase='2'] .speech,
[data-scene='slack'][data-phase='2'] .speech,
[data-scene='slack'][data-phase='3'] .speech,
[data-scene='editor'][data-phase='2'] .speech,
[data-scene='editor'][data-phase='3'] .speech {
  opacity: 1;
  transform: none;
}
[data-scene='issue'][data-phase='1'] .pill i,
[data-scene='slack'][data-phase='2'] .pill i,
[data-scene='editor'][data-phase='2'] .pill i {
  animation: talk 0.7s ease-in-out infinite;
  animation-delay: calc(var(--n) * -53ms);
}
[data-scene='issue'][data-phase='2'] .pill i,
[data-scene='slack'][data-phase='3'] .pill i,
[data-scene='editor'][data-phase='3'] .pill i {
  animation: think 1s ease-in-out infinite;
  animation-delay: calc(var(--n) * 55ms);
}
[data-scene='slack'][data-phase='3'] .pill-label,
[data-scene='editor'][data-phase='3'] .pill-label {
  max-width: 120px;
  opacity: 1;
}
[data-scene='issue'][data-phase='3'] .typed .word,
[data-scene='slack'][data-phase='4'] .typed .word,
[data-scene='editor'][data-phase='4'] .after .word {
  opacity: 1;
}
[data-scene='issue'][data-phase='3'] .caret,
[data-scene='slack'][data-phase='4'] .caret {
  opacity: 1;
  animation: blink 1s steps(1) infinite;
}
[data-scene='slack'][data-phase='4'] .placeholder {
  opacity: 0;
}
[data-scene='slack'][data-phase='1'] .scan,
[data-scene='editor'][data-phase='1'] .scan {
  animation: sweep 0.9s ease-in-out forwards;
}
[data-scene='slack'][data-phase='3'] .msg em,
[data-scene='slack'][data-phase='4'] .msg em {
  background: var(--sig-soft);
  box-shadow: inset 0 -1.5px 0 var(--sig);
}
[data-scene='editor'][data-phase='4'] .target .before {
  opacity: 0;
}

/* Agents: two rows of five, with the spine's branches running behind them.
   The block is as tall as the branches' box: 100px above, two 92px rows
   with 16px between, 100px below; columns sit at 2% gaps so their centres
   match the branches' x positions. */
.agents {
  position: relative;
  width: min(760px, 100%);
  height: 400px;
  padding: 100px 0;
}
.agents ul {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 92px 92px;
  column-gap: 2%;
  row-gap: 16px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.agents li {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-width: 0;
  border: 1px solid #1f1f22;
  border-radius: 12px;
  background: #0e0e0f;
  opacity: 0;
  transform: translateY(8px);
  transition:
    opacity 0.6s ease,
    transform 0.6s ease,
    border-color 0.2s;
  transition-delay: calc(var(--n) * 60ms);
}
.agents.in li {
  opacity: 1;
  transform: none;
}
.agents li:hover {
  border-color: #3a3a40;
}
.agent-icon {
  width: 24px;
  height: 24px;
  background: #d9d9de;
  mask: var(--icon) center / contain no-repeat;
  -webkit-mask: var(--icon) center / contain no-repeat;
}
.agent-name {
  padding: 0 6px;
  font-family: var(--font-code);
  font-size: 11.5px;
  color: #a1a1aa;
  text-align: center;
}
.branches {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.branches path {
  fill: none;
  stroke-width: 1;
  vector-effect: non-scaling-stroke;
}
/* Lit as far as the spine has reached, all five together. */
.branches .lit {
  stroke: var(--sig);
  stroke-dasharray: 1;
  stroke-dashoffset: calc(1 - var(--draw, 0));
  filter: drop-shadow(0 0 3px rgb(165 180 255 / 55%));
  transition: stroke-dashoffset 0.12s linear;
}

/* The per-app card, as the bar widget shows it */
.card {
  width: min(420px, 100%);
  padding: 18px;
  border: 1px solid #2a2a2d;
  border-radius: 14px;
  background: #0f0f10;
  box-shadow: 0 30px 80px -30px rgb(0 0 0 / 90%);
}
/* The header, as the bar card has it: the logo, with the title and status
   beside it, centred on it. Its left edge lines up with the app icons. */
.card-head {
  display: flex;
  align-items: center;
  gap: 14px;
  margin: 0 0 12px;
  padding: 4px 8px 16px;
  border-bottom: 1px solid #222225;
}
.card-head .mark {
  flex: none;
  width: 44px;
  height: 32px;
  background: var(--ink);
  mask: url('/logo.svg') left center / contain no-repeat;
  -webkit-mask: url('/logo.svg') left center / contain no-repeat;
}
.card-head p {
  margin: 0;
}
.card-title {
  font-size: 16px;
  font-weight: 600;
  line-height: 1.2;
  color: var(--ink);
}
.card-meta {
  margin-top: 2px !important;
  font-size: 12.5px;
  color: var(--mute);
}
.card ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
.card li {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 8px;
  border-radius: 8px;
  opacity: 0;
  transform: translateX(-8px);
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
  transition-delay: calc(0.3s + var(--n) * 120ms);
}
.card.in li {
  opacity: 1;
  transform: none;
}
.card li:hover {
  background: #17171a;
}
.app-icon {
  flex: none;
  width: 26px;
  height: 26px;
  border-radius: 6px;
  object-fit: contain;
}
.app-name {
  flex: 1;
  color: #e4e4e8;
}
.app-action {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #8b8b93;
}
.app-action.strong {
  color: var(--sig);
}
.cam {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.3;
}

/* Facts and install */
.facts {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  width: min(1000px, 100%);
  margin-top: 56px;
  border: 1px solid #1f1f22;
  border-radius: 14px;
  overflow: hidden;
  background: #1f1f22;
}
.fact {
  padding: 26px 24px;
  background: var(--color-canvas);
}
.fact-icon {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  margin-bottom: 18px;
  border: 1px solid #26262b;
  border-radius: 10px;
  background: #111113;
}
.fact-icon svg {
  width: 20px;
  height: 20px;
}
.fact-icon path {
  fill: none;
  stroke: var(--sig);
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  transition: stroke-dashoffset 1.2s ease;
  transition-delay: calc(0.3s + var(--n) * 120ms);
}
.facts.in .fact-icon path {
  stroke-dashoffset: 0;
}
.fact h3 {
  margin: 0 0 8px;
  font-size: 15px;
  font-weight: 600;
  color: var(--ink);
}
.fact p {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
}
@media (max-width: 760px) {
  .screen {
    padding: 16px 12px 52px;
    border-radius: 16px;
  }
  .slack {
    grid-template-columns: 1fr;
  }
  .slack-side {
    display: none;
  }
  .speech {
    left: 8px;
    bottom: 88px;
    width: calc(100% - 16px);
  }
  /* Names give way to the icons. */
  .agents .agent-name {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
  }

  .facts {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 480px) {
  .facts {
    grid-template-columns: 1fr;
  }
  .win {
    font-size: 12.5px;
  }
}

/* Without motion: everything in its final state. */
.reduced .word,
.reduced .fact-icon path,
.reduced .agents li,
.reduced .card li,
.reduced [data-reveal] {
  transition: none;
}
.reduced .speech,
.reduced .pill {
  display: none;
}

</style>
