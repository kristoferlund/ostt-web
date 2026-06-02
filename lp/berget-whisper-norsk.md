---
layout: false
title: "NB Whisper på kommandolinjen"
description: "Bruk NB Whisper — Nasjonalbibliotekets norske talegjenkjenningsmodell — direkte fra terminalen. OSTT kobler modellen til et globalt hurtigtast, utklippstavlen og skallkommandoer på Linux og macOS."
---

<header class="site-header">
  <div class="header-inner">
    <a href="/" class="header-logo" aria-label="OSTT home">
      <span class="logo-mark" aria-hidden="true"></span>
    </a>
    <nav class="header-nav">
      <a href="/guide/getting-started">Dokumentasjon</a>
      <a href="https://github.com/kristoferlund/ostt">GitHub</a>
    </nav>
  </div>
</header>

<main class="landing">

  <section class="landing-hero">
    <h1>NB Whisper på kommandolinjen.</h1>
    <p class="lede">NB Whisper er Nasjonalbibliotekets talegjenkjenningsmodell for norsk — trent på 66 000 timers norsk tale fra NRK-sendinger, Stortingets taler, lydbøker og dialektopptak. Modellen forstår bokmål, nynorsk og norske dialekter, og er utviklet spesielt for å håndtere norskens store dialektmangfold. OSTT kobler den til ditt hurtigtast og ditt skall på Linux og macOS, via Bergets norgesbaserte infrastruktur.</p>
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
        <p class="eyebrow">NB Whisper</p>
        <h2>Trent på 66 000 timers norsk tale. Forstår dialekter.</h2>
        <p>NB Whisper er utviklet av NB AI-Lab ved Nasjonalbiblioteket og trent på et unikt datasett: NRK-undertekster, Stortingskorpuset (over 5 200 timers transkribert parlamentstale), NST-databasen, og lydbøker fra Nasjonalbibliotekets digitale samling. Resultatet er en modell som forstår norsk som faktisk snakkes — med dialekter, nynorsk og bokmål. Modellen kjører på Bergets infrastruktur, noe som gir GDPR-kompatibel databehandling uten ekstra konfigurasjon.</p>
      </div>
      <div class="command-card">
        <pre><code># ~/.config/ostt/ostt.toml — velg NB Whisper som standardmodell&#10;&#91;transcription&#93;&#10;provider = &quot;berget&quot;&#10;model = &quot;NbAiLab/nb-whisper-large&quot;&#10;&#10;&#91;berget.&quot;NbAiLab/nb-whisper-large&quot;.params&#93;&#10;language = &quot;no&quot;&#10;hotwords = &#91;&quot;OSTT&quot;, &quot;Språkbanken&quot;&#93;&#10;align = true&#10;&#10;# Velg interaktivt&#10;ostt model&#10;&#10;# Ta opp med hurtigtast, transkriber med NB Whisper, kopier&#10;ostt launch -c</code></pre>
      </div>
    </section>
  </div>

  <section class="landing-grid">
    <article>
      <h3>Støtter bokmål og nynorsk</h3>
      <p>NB Whisper er trent til å transkribere til normalisert bokmål og nynorsk. Den håndterer begge målformene og produserer korrekt ortografi uavhengig av hvilken dialekt taleren bruker — noe generelle Whisper-modeller konsekvent sliter med på norsk.</p>
    </article>
    <article>
      <h3>Forstår norske dialekter</h3>
      <p>Treningsdataene dekker bred dialektal variasjon: NRK-sendinger fra hele landet, dialektopptak fra Språkbanken og spontantale fra ulike regioner. Modellen er spesifikt trent for å håndtere norskens dialektmangfold.</p>
    </article>
    <article>
      <h3>Data forblir i Europa</h3>
      <p>Berget er en europeisk skyleverandør. Alle transkripsjoner behandles på servere i Europa, noe som gir GDPR-kompatibel databehandling uten ekstra oppsett. Velg Berget der personvern og datasuverenitet er et krav.</p>
    </article>
    <article>
      <h3>Validerte Berget-valg</h3>
      <p>Legg til navn og fagtermer med <code>hotwords</code>, sett <code>language=no</code>, og aktiver <code>align=true</code> eller <code>diarize=true</code> når du trenger Bergets ordtidsstempler eller taleretiketter.</p>
    </article>
    <article>
      <h3>Rør til AI-verktøy</h3>
      <p>Bruk <code>-p</code>-flagget for å kjøre en behandlingshandling etter transkripsjon. Send NB Whisper-output direkte til OpenCode, Claude Code eller et vilkårlig skallkommando uten manuell kopiering og liming.</p>
    </article>
    <article>
      <h3>Retranskripsjon uten nytt opptak</h3>
      <p>OSTT lagrer alle opptak lokalt. Kjør <code>ostt retry</code> for å transkribere samme lyd med NB Whisper på nytt, eller bytt til en annen modell — uten å snakke igjen.</p>
    </article>
  </section>

  <div class="surface-band">
    <section class="landing-section">
      <p class="eyebrow">Arbeidsflyt</p>
      <h2>Fra tale til nyttig output.</h2>
      <div class="steps">
        <div><strong>1. Ta opp</strong><span>Trykk på ditt globale hurtigtast eller kjør <code>ostt</code> i terminalen.</span></div>
        <div><strong>2. Transkriber</strong><span>NB Whisper transkriberer lyden via Bergets API.</span></div>
        <div><strong>3. Behandle</strong><span>Kjør valgfrie AI-ledetekster eller skallkommandoer på resultatet.</span></div>
        <div><strong>4. Send</strong><span>Skriv til stdout, kopier til utklippstavle, skriv til fil eller rør videre.</span></div>
      </div>
    </section>
  </div>

  <section class="landing-section split pipeline-section">
    <div>
      <p class="eyebrow">Pipeline</p>
      <h2>Beste norske talegjenkjenning i skallet ditt.</h2>
      <p>OSTT gjør NB Whisper til et vanlig Unix-verktøy. Transkripsjonresultatet havner på stdout — rør det gjennom <code>jq</code>, <code>sed</code> eller et hvilket som helst CLI-verktøy. Bruk <code>-p</code> for å kjede behandlingshandlinger. Legg til tekniske termer og egennavn i OSTT keywords én gang og forbedre treffsikkerheten i alle fremtidige opptak.</p>
    </div>
    <div class="command-card">
      <pre><code># Transkriber et lydklipp&#10;ostt transcribe meeting.mp3 -o notater.md&#10;&#10;# Ta opp, behandle med AI-handling, kopier til utklippstavle&#10;ostt -p clean -c&#10;&#10;# Transkriber og rør videre&#10;ostt | mitt-skript.sh</code></pre>
    </div>
  </section>

  <section class="landing-section final-cta">
    <h2>Legg til NB Whisper i terminalen din med én kommando.</h2>
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
      <a href="/guide/getting-started">Dokumentasjon</a>
      <a href="/reference/providers/berget">Berget-leverandørreferanse</a>
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
      <a href="/guide/commands">Commands</a>
      <a href="/guide/platforms">Platforms</a>
    </div>
    <div class="footer-links">
      <a href="https://github.com/kristoferlund/ostt">GitHub</a>
      <a href="/reference/providers">Providers</a>
      <a href="/guide/troubleshooting">Troubleshooting</a>
    </div>
  </div>
</footer>
