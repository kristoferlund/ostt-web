---
layout: false
title: "Klang Pianissimo: svensk transkribering på Linux och macOS"
description: "Transkribera svenska med Klang AI Pianissimo via Berget i OSTT. Spela in i terminalen eller transkribera ljudfiler och skicka färdig text till urklipp, filer och skalkommandon."
---

<header class="site-header">
  <div class="header-inner">
    <a href="/" class="header-logo" aria-label="OSTT home"><span class="logo-mark" aria-hidden="true"></span></a>
    <nav class="header-nav">
      <a href="/guide/getting-started">Dokumentation</a>
      <a href="https://github.com/kristoferlund/ostt">GitHub</a>
    </nav>
  </div>
</header>

<main class="landing" lang="sv">
  <section class="landing-hero">
    <p class="eyebrow">Klang AI · Berget · OSTT</p>
    <h1>Pianissimo. Svenskt tal till text i terminalen.</h1>
    <p class="lede">Använd Klang AI:s svenska taligenkänningsmodell på Linux och macOS. Spela in med OSTT eller välj en ljudfil, låt Berget transkribera och skicka texten till urklipp, en fil eller nästa skalkommando.</p>
    <p>Stödet är ännu inte släppt. Exemplen kräver en OSTT-version som innehåller Pianissimo-integrationen. Se <a href="/guide/changelog">ändringsloggen</a> för releasestatus.</p>
    <div class="landing-actions">
      <a href="/reference/providers/berget#pianissimo-params">Konfiguration och parametrar</a>
      <a href="/guide/installation">Installera OSTT</a>
    </div>
  </section>

  <div class="surface-band">
    <section class="landing-section split">
      <div>
        <p class="eyebrow">Kom igång</p>
        <h2>Din Berget-nyckel. Dina ljudfiler.</h2>
        <p>Kör <code>ostt auth login</code> och välj Berget. Välj sedan Pianissimo i <code>ostt model</code>, eller ange <code>berget/klang/pianissimo</code> direkt i kommandot. Du behöver internetanslutning och ffmpeg; modellen körs hos Berget.</p>
      </div>
      <div class="command-card">
        <pre><code># Logga in hos Berget&#10;ostt auth login&#10;&#10;# Transkribera en ljudfil&#10;ostt transcribe samtal.mp3 -m berget/klang/pianissimo&#10;&#10;# Spela in och kopiera den färdiga texten&#10;ostt record -m berget/klang/pianissimo -c</code></pre>
      </div>
    </section>
  </div>

  <section class="landing-grid">
    <article>
      <h3>Utvecklad för svenska</h3>
      <p>Pianissimo är Klang AI:s finjustering av NVIDIA Parakeet v3, med stöd för svensk taligenkänning, interpunktion och stora bokstäver. På Hugging Face heter modellen <a href="https://huggingface.co/KlangAI/pianissimo-sv">KlangAI/pianissimo-sv</a>; Bergets modell-id är <code>klang/pianissimo</code>.</p>
    </article>
    <article>
      <h3>Text efter avslutad inspelning</h3>
      <p>OSTT väntar tills du har spelat in klart. Därefter skickas den sparade inspelningen i delar via Bergets WebSocket-API. OSTT skickar inte mikrofonljud medan du talar och visar inte löpande deltranskriptioner.</p>
    </article>
    <article>
      <h3>Två parametrar</h3>
      <p><code>language</code> är <code>sv</code> som standard. <code>chunk_seconds</code> styr serverns segmentlängd och är normalt 3 sekunder. Pianissimo stöder inte nyckelordsboostning, promptar eller temperatur; sparade OSTT-nyckelord skickas inte till modellen.</p>
    </article>
  </section>

  <div class="surface-band">
    <section class="landing-section">
      <p class="eyebrow">Från inspelning till text</p>
      <h2>Realtime-API, färdig inspelning.</h2>
      <p>Berget tillhandahåller Pianissimo via sitt realtime-API. OSTT använder API:et för att transkribera färdiga inspelningar: ffmpeg konverterar ljudet till 24 kHz mono PCM, OSTT skickar ljudet och avslutar en transkriptionstur, och den slutliga texten blir kommandots resultat. Berget visar samma filbaserade användning i sin <a href="https://berget.ai/en/blog/realtime-transcription-launch">lanseringsartikel</a>.</p>
      <p>Du kan skriva resultatet till en fil med <code>-o anteckningar.txt</code>, kopiera med <code>-c</code> eller använda en <a href="/guide/processing">bearbetningsåtgärd</a>. Vill du jämföra med KB Whisper kan du återtranskribera samma inspelning med <code>ostt retry -m berget/KBLab/kb-whisper-large</code>.</p>
    </section>
  </div>

  <section class="landing-section final-cta">
    <h2>Välj rätt svensk modell för ditt arbetsflöde.</h2>
    <p>Pianissimo ger dig ytterligare ett svenskt modellval i OSTT. Behöver du promptar eller nyckelordsboostning? Läs om <a href="/lp/berget-whisper-svenska">KB Whisper</a> och jämför på dina egna inspelningar.</p>
    <div class="landing-actions">
      <a href="/reference/providers/berget#pianissimo-params">Pianissimo-referens</a>
      <a href="/guide/choosing-a-model">Välj modell</a>
    </div>
  </section>
</main>

<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-brand"><strong>OSTT</strong><span>Öppen källkod. Tal till text på Linux och macOS.</span></div>
    <div class="footer-links">
      <a href="/guide/getting-started">Dokumentation</a>
      <a href="/reference/providers">Modeller och leverantörer</a>
      <a href="https://github.com/kristoferlund/ostt">GitHub</a>
    </div>
  </div>
</footer>
