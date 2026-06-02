---
layout: false
title: "KB Whisper på kommandoraden"
description: "Använd KB Whisper — Kungliga bibliotekets svenska taligenkänningsmodell — direkt från terminalen. OSTT kopplar modellen till ett globalt kortkommando, urklipp och skalkommandon på Linux och macOS."
---

<header class="site-header">
  <div class="header-inner">
    <a href="/" class="header-logo" aria-label="OSTT home">
      <span class="logo-mark" aria-hidden="true"></span>
    </a>
    <nav class="header-nav">
      <a href="/guide/getting-started">Dokumentation</a>
      <a href="https://github.com/kristoferlund/ostt">GitHub</a>
    </nav>
  </div>
</header>

<main class="landing">

  <section class="landing-hero">
    <h1>KB Whisper på kommandoraden.</h1>
    <p class="lede">KB Whisper är Kungliga bibliotekets taligenkänningsmodell för svenska, tränad på över 50 000 timmars svenskt tal och optimerad för svenska dialekter, rikssvenska och parlamentsspråk. Den ger 47% lägre ordfelsnivå (WER) jämfört med OpenAIs whisper-large-v3 på svenska.</p>
    <p class="lede">OSTT hjälper dig transkribera i alla appar, kopplat till en snabbtangent, eller direkt via terminalen. Linux och macOS, via <a href="https://berget.ai" target="_blank" rel="noopener">Berget AI</a> svenska molninfrastruktur eller 100% lokalt på din dator.</p>
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
        <p class="eyebrow">KB Whisper</p>
        <h2>Tränad på 50 000 timmar svenska. 47% lägre WER.</h2>
        <p>KB Whisper är utvecklad av KBLab vid Kungliga biblioteket och tränad på ett unikt dataset: SVT-undertexter, riksdagsprotokoll, dialektinspelningar från Institutet för språk och folkminnen samt YouTube-kanaler med svenskt innehåll. Resultatet är en modell som förstår hela bredden av talad svenska — från formellt riksdagsspråk till regionala dialekter — och presterar långt bättre än generella Whisper-modeller på svenska. Modellen körs på Bergets infrastruktur i Sverige, vilket innebär att datan stannar i EU.</p>
      </div>
      <div class="command-card">
        <pre><code># ~/.config/ostt/ostt.toml — välj KB Whisper som standardmodell&#10;&#91;transcription&#93;&#10;provider = &quot;berget&quot;&#10;model = &quot;KBLab/kb-whisper-large&quot;&#10;&#10;&#91;berget.&quot;KBLab/kb-whisper-large&quot;.params&#93;&#10;language = &quot;sv&quot;&#10;hotwords = &#91;&quot;OSTT&quot;, &quot;KBLab&quot;&#93;&#10;align = true&#10;&#10;# Välj interaktivt&#10;ostt model&#10;&#10;# Spela in med kortkommando, transkribera med KB Whisper, kopiera&#10;ostt launch -c</code></pre>
      </div>
    </section>
  </div>

  <section class="landing-grid">
    <article>
      <h3>Bäst på svenska</h3>
      <p>KB Whisper Large-v3 uppnår 5,4% WER på FLEURS och 4,1% på CommonVoice — jämfört med OpenAIs whisper-large-v3 som ger 7,8% respektive 9,5%. Det är en förbättring som märks tydligt i vardaglig diktamen, mötesanteckningar och röstkommandon.</p>
    </article>
    <article>
      <h3>Förstår svenska dialekter</h3>
      <p>Träningsdatan täcker dialektinspelningar från hela Sverige, riksdagstal, SVT-sändningar och ljudböcker. Modellen hanterar regional variation som generella Whisper-modeller konsekvent missar.</p>
    </article>
    <article>
      <h3>Data stannar i Sverige</h3>
      <p><a href="https://berget.ai" target="_blank" rel="noopener">Berget</a> är en svensk molnleverantör. Alla transkriptioner behandlas på servrar i Sverige, vilket ger EU-lagstiftningsenlig datahantering utan att du behöver konfigurera något extra. Välj Berget när dataskydd och GDPR är krav.</p>
    </article>
    <article>
      <h3>Validerade Berget-optioner</h3>
      <p>Lägg till namn och facktermer med <code>hotwords</code>, sätt <code>language=sv</code> och aktivera <code>align=true</code> eller <code>diarize=true</code> när du behöver Bergets ordtidsstämplar eller talaretiketter.</p>
    </article>
    <article>
      <h3>Pipa till AI-verktyg</h3>
      <p>Använd <code>-p</code>-flaggan för att köra en bearbetningsåtgärd efter transkription. Skicka KB Whisper-output direkt till OpenCode, Claude Code eller vilket skalkommando som helst utan manuell kopiering.</p>
    </article>
    <article>
      <h3>Återtranskribera utan ny inspelning</h3>
      <p>OSTT sparar alla inspelningar lokalt. Kör <code>ostt retry</code> för att transkribera om samma ljud med KB Whisper eller byt till en annan modell — utan att tala igen.</p>
    </article>
  </section>

  <div class="surface-band">
    <section class="landing-section">
      <p class="eyebrow">Arbetsflöde</p>
      <h2>Från tal till användbar output.</h2>
      <div class="steps">
        <div><strong>1. Spela in</strong><span>Tryck på ditt globala kortkommando eller kör <code>ostt</code> i terminalen.</span></div>
        <div><strong>2. Transkribera</strong><span>KB Whisper transkriberar ljudet via Bergets API i Sverige.</span></div>
        <div><strong>3. Bearbeta</strong><span>Kör valfritt AI-prompt eller skalkommando på resultatet.</span></div>
        <div><strong>4. Skicka</strong><span>Skriv till stdout, kopiera till urklipp, skriv till fil eller pipa vidare.</span></div>
      </div>
    </section>
  </div>

  <section class="landing-section split pipeline-section">
    <div>
      <p class="eyebrow">Pipeline</p>
      <h2>Bästa svenska taligenkänningen i ditt skal.</h2>
      <p>OSTT gör KB Whisper till ett vanligt Unix-verktyg. Transkriptionsresultatet hamnar på stdout — pipa det genom <code>jq</code>, <code>sed</code> eller vilket CLI-verktyg som helst. Använd <code>-p</code> för att kedja bearbetningsåtgärder. Lägg till tekniska termer och egennamn i OSTT keywords en gång och förbättra träffsäkerheten i alla framtida inspelningar.</p>
    </div>
    <div class="command-card">
      <pre><code># Transkribera ett ljudklipp&#10;ostt transcribe meeting.mp3 -o anteckningar.md&#10;&#10;# Spela in, bearbeta med AI-åtgärd, kopiera till urklipp&#10;ostt -p clean -c&#10;&#10;# Transkribera och pipa vidare&#10;ostt | mitt-skript.sh</code></pre>
    </div>
  </section>

  <section class="landing-section final-cta">
    <h2>Lägg till KB Whisper i din terminal med ett kommando.</h2>
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
      <a href="/guide/getting-started">Dokumentation</a>
      <a href="/reference/providers/berget">Berget-leverantörens referens</a>
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
