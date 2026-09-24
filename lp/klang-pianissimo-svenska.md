---
layout: false
title: "Klang Pianissimo i terminalen"
description: "Använd Pianissimo, Klangs öppna taligenkänningsmodell för svenska, direkt från terminalen. OSTT kopplar modellen till ett kortkommando, urklipp, filer och dina egna skript på Linux och macOS, via Berget AI i Sverige."
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

<main class="landing" lang="sv">

  <section class="landing-hero">
    <h1>Klang Pianissimo i terminalen.</h1>
    <p class="lede">Pianissimo är Klangs öppna taligenkänningsmodell för svenska. Den bygger på Nvidia Parakeet, är tränad på svenska och svenska dialekter och är lika träffsäker som KB Whisper Large, men ungefär 60 gånger snabbare.</p>
    <p class="lede">Med OSTT pratar du in text i vilken app som helst med ett kortkommando, eller transkriberar direkt i terminalen. Modellen körs hos <a href="https://berget.ai" target="_blank" rel="noopener">Berget AI</a>, och ljudet lämnar aldrig Sverige. Fungerar på Linux och macOS.</p>
    <button class="install-block" onclick="navigator.clipboard.writeText('curl -fsSL https://ostt.ai/install | bash'); const t = this; t.classList.add('copied'); setTimeout(() => t.classList.remove('copied'), 2000);" aria-label="Kopiera installationskommandot">
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
        <p class="eyebrow">Klang Pianissimo</p>
        <h2>Lika träffsäker som KB Whisper. 60 gånger snabbare.</h2>
        <p>Pianissimo är utvecklad av Klang AI och släpptes som öppen källkod i september 2026. Klang har tagit Nvidias Parakeet-modell och anpassat den för svenska och svenska dialekter. I Klangs tester på Common Voice, FLEURS och Klangs egna dialektinspelningar är Pianissimo lika träffsäker som KB Whisper Large, Kungliga bibliotekets bästa öppna svenska modell. Samtidigt går den ungefär 60 gånger snabbare: en timmes ljud tar runt en sekund.</p>
      </div>
      <div class="command-card">
        <pre><code># Logga in och välj Berget&#10;ostt auth login&#10;&#10;# Välj Pianissimo som standardmodell&#10;ostt model&#10;&#10;# Spela in och kopiera texten&#10;ostt -m berget/klang/pianissimo -c&#10;&#10;# Transkribera en ljudfil&#10;ostt transcribe intervju.mp3 -m berget/klang/pianissimo</code></pre>
      </div>
    </section>
  </div>

  <section class="landing-grid">
    <article>
      <h3>Byggd för svenska</h3>
      <p>Pianissimo är tränad på svenska och svenska dialekter, och sätter själv ut skiljetecken och stor bokstav. Modellen finns öppet på Hugging Face som <a href="https://huggingface.co/KlangAI/pianissimo-sv" target="_blank" rel="noopener">KlangAI/pianissimo-sv</a>.</p>
    </article>
    <article>
      <h3>Snabb även på långa inspelningar</h3>
      <p>Klang mäter omkring 3600 gånger realtid. Det betyder att ett långt möte eller en intervju är transkriberad nästan direkt efter att ljudet har laddats upp.</p>
    </article>
    <article>
      <h3>Ljudet stannar i Sverige</h3>
      <p>Berget är en svensk molnleverantör. Allt ljud behandlas på servrar i Sverige och Berget sparar ingenting. Ett bra val när dataskydd och GDPR är viktigt.</p>
    </article>
    <article>
      <h3>Hela texten när du är klar</h3>
      <p>OSTT skickar ljudet till Berget när du har slutat spela in och ger dig sedan hela texten på en gång. Du ser alltså ingen text medan du pratar.</p>
    </article>
    <article>
      <h3>Behöver du nyckelord?</h3>
      <p>Pianissimo tar inte emot nyckelord, promptar eller temperatur, så dina OSTT-nyckelord skickas inte med. Behöver du lära modellen namn och facktermer passar <a href="/lp/berget-whisper-svenska">KB Whisper</a> bättre.</p>
    </article>
    <article>
      <h3>Jämför utan att prata in igen</h3>
      <p>OSTT sparar alla inspelningar lokalt. Kör <code>ostt retry -m berget/KBLab/kb-whisper-large</code> för att transkribera samma ljud med KB Whisper och se vilken modell som passar dig bäst.</p>
    </article>
  </section>

  <div class="surface-band">
    <section class="landing-section">
      <p class="eyebrow">Arbetsflöde</p>
      <h2>Från tal till färdig text.</h2>
      <div class="steps">
        <div><strong>1. Spela in</strong><span>Tryck på ditt kortkommando eller kör <code>ostt</code> i terminalen.</span></div>
        <div><strong>2. Transkribera</strong><span>Pianissimo gör om ljudet till text hos Berget i Sverige.</span></div>
        <div><strong>3. Bearbeta</strong><span>Låt en AI-prompt eller ett eget skript putsa texten, om du vill.</span></div>
        <div><strong>4. Använd</strong><span>Kopiera till urklipp, spara till fil eller skicka vidare till nästa program.</span></div>
      </div>
    </section>
  </div>

  <section class="landing-section split pipeline-section">
    <div>
      <p class="eyebrow">Pipeline</p>
      <h2>Svensk text som går att bygga vidare på.</h2>
      <p>OSTT fungerar som vilket kommandoradsverktyg som helst. Texten skrivs till stdout, så du kan skicka den vidare till <code>jq</code>, <code>sed</code> eller dina egna skript. Med <code>-p</code> kör du en <a href="/guide/processing">bearbetning</a> direkt efter transkriberingen, till exempel för att städa upp texten eller skicka den till Claude Code.</p>
    </div>
    <div class="command-card">
      <pre><code># Transkribera ett möte och spara texten&#10;ostt transcribe mote.mp3 -m berget/klang/pianissimo -o mote.md&#10;&#10;# Spela in, städa upp texten och kopiera&#10;ostt -m berget/klang/pianissimo -p clean -c&#10;&#10;# Skicka texten vidare till ett eget skript&#10;ostt -m berget/klang/pianissimo | mitt-skript.sh</code></pre>
    </div>
  </section>

  <section class="landing-section final-cta">
    <h2>Kom igång med Pianissimo på en minut.</h2>
    <button class="install-block" onclick="navigator.clipboard.writeText('curl -fsSL https://ostt.ai/install | bash'); const t = this; t.classList.add('copied'); setTimeout(() => t.classList.remove('copied'), 2000);" aria-label="Kopiera installationskommandot">
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
      <a href="/reference/providers/berget#pianissimo-params">Inställningar för Pianissimo</a>
    </div>
  </section>

</main>

<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-brand">
      <strong>OSTT</strong>
      <span>Tal till text för utvecklare. Öppen källkod för Linux och macOS.</span>
    </div>
    <div class="footer-links">
      <a href="/guide/getting-started">Dokumentation</a>
      <a href="/guide/why-ostt">Varför OSTT?</a>
      <a href="/guide/commands">Kommandon</a>
    </div>
    <div class="footer-links">
      <a href="https://github.com/kristoferlund/ostt">GitHub</a>
      <a href="/reference/providers">Modeller och leverantörer</a>
      <a href="/guide/troubleshooting">Felsökning</a>
    </div>
  </div>
</footer>
