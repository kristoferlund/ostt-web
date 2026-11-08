---
layout: false
title: "Klang Pianissimo för svenska: lokalt eller via Berget"
description: "Kör Klang Pianissimo för svenska lokalt med OSTT på Linux och macOS, eller via Berget AI. Q8_0 GGUF, språkval, modellänkar och den danska Pianissimo-modellen."
---

<script setup>
import SiteFooter from '../.vitepress/theme/components/SiteFooter.vue'
import SiteHeader from '../.vitepress/theme/components/SiteHeader.vue'
</script>

<SiteHeader />

<main class="landing" lang="sv">

  <section class="landing-hero">
    <h1>Klang Pianissimo i terminalen.</h1>
    <p class="lede"><a href="https://klang.ai/pianissimo-sv/" target="_blank" rel="noopener">Pianissimo för svenska</a> är Klang AI:s öppna taligenkänningsmodell, finjusterad från NVIDIA Parakeet v3 för svenskt tal och svenska dialekter. Den sätter ut skiljetecken och stor bokstav.</p>
    <p class="lede">Med OSTT kör du modellen lokalt på din egen CPU eller GPU, utan API-nyckel, eller hos <a href="https://berget.ai" target="_blank" rel="noopener">Berget AI</a>. Prata in text med ett kortkommando eller transkribera filer i terminalen på Linux och macOS. Klang har också en <a href="https://klang.ai/pianissimo-da/" target="_blank" rel="noopener">modell för danska</a>.</p>
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
        <h2>Tränad för svenska. Körs på din dator.</h2>
        <p>Klang har finjusterat en modell med ungefär 600 miljoner parametrar på cirka 50 000 timmar svenskt tal. OSTT använder Klangs rekommenderade Q8_0 GGUF: 706 MiB, med verifierad kontrollsumma. Modellvikterna är öppna under CC BY 4.0. Efter nedladdningen kan du transkribera offline utan Python eller NeMo.</p>
        <p>Den lokala modellen heter <code>parakeet/pianissimo-sv</code> och behöver <code>language=sv</code>. Språkparametern kräver OSTT 0.0.35 eller senare. Se <a href="/guide/pianissimo#set-up-local-transcription">versionskrav och sparade språkinställningar</a> innan du börjar.</p>
      </div>
      <div class="command-card">
        <pre><code># Ladda ned den lokala svenska modellen&#10;ostt model local download parakeet/pianissimo-sv&#10;&#10;# Spela in och kopiera, med uttryckligt språkval&#10;ostt -m parakeet/pianissimo-sv --param language=sv -c&#10;&#10;# Transkribera en 16 kHz mono PCM16 WAV-fil&#10;ostt transcribe intervju.wav -m parakeet/pianissimo-sv --param language=sv</code></pre>
      </div>
    </section>
  </div>

  <section class="landing-grid">
    <article>
      <h3>Byggd för svenska</h3>
      <p>Läs om träningen hos <a href="https://klang.ai/pianissimo-sv/" target="_blank" rel="noopener">Klang AI</a>, i <a href="https://huggingface.co/KlangAI/pianissimo-sv" target="_blank" rel="noopener">modellkortet på Hugging Face</a> och bland <a href="https://huggingface.co/KlangAI/pianissimo-sv-gguf" target="_blank" rel="noopener">GGUF-filerna</a>. Klang rapporterar 4,46 % ordfel på Common Voice v26 och 6,51 % på FLEURS för originalmodellen. KB-Whisper large har lägre ordfel i samma utvärdering; jämför gärna på ditt eget ljud.</p>
    </article>
    <article>
      <h3>Byggd för snabb transkribering</h3>
      <p>Klang rapporterar 2 500 gånger realtid för originalmodellen på en NVIDIA A100 med optimerade batcher. Det är inte ett hastighetslöfte för din dator eller OSTT:s GGUF-version. <a href="/guide/daemon">Daemon-läget</a> håller modellen laddad mellan inspelningar så att du slipper laddningstiden.</p>
    </article>
    <article>
      <h3>Lokalt eller via Berget</h3>
      <p>Med <code>parakeet/pianissimo-sv</code> stannar ljudet på din dator. Molnalternativet <code>berget/klang/pianissimo</code> kräver en API-nyckel och skickar ljudet till Bergets europeiska infrastruktur. Se <a href="/reference/providers/berget#pianissimo-params">Berget-guiden</a> för inloggning och inställningar.</p>
    </article>
    <article>
      <h3>Hela texten när du är klar</h3>
      <p>OSTT transkriberar när du har slutat spela in, både lokalt och via Berget. Du ser alltså ingen text medan du pratar. Resultatet är vanlig text; den lokala modellen ger inte tidsstämplar eller talaruppdelning genom OSTT.</p>
    </article>
    <article>
      <h3>Behöver du nyckelord?</h3>
      <p>OSTT:s lokala Parakeet-motor och Berget-rutten använder inte dina sparade nyckelord eller kontextpromptar. Klang har ordförrådsstöd i andra implementationer, men det exponeras inte här. Använd <a href="/guide/configuration#text-replace">ersättningsregler</a> efter transkriberingen, eller jämför med <a href="/lp/berget-whisper-svenska">KB Whisper</a> om du behöver ordlistor.</p>
    </article>
    <article>
      <h3>Jämför utan att prata in igen</h3>
      <p>Spela in med en lokal modell och kör sedan <code>ostt retry -m whisper/kb-whisper-large</code> för att jämföra på samma ljud, när båda modellerna är nedladdade. Molninspelningar är normalt MP3 och behöver konverteras innan de kan transkriberas lokalt. Se <a href="/guide/local-models#audio-format">ljudformat</a>.</p>
    </article>
  </section>

  <section class="landing-section">
    <p class="eyebrow">Också för danska</p>
    <h2>Pianissimo för danska, i samma verktyg.</h2>
    <p><a href="https://klang.ai/pianissimo-da/" target="_blank" rel="noopener">Klangs danska Pianissimo</a> är finjusterad på cirka 70 000 timmar danskt tal. Den finns som <a href="https://huggingface.co/KlangAI/pianissimo-da" target="_blank" rel="noopener">öppen modell på Hugging Face</a> och som <a href="https://huggingface.co/KlangAI/pianissimo-da-gguf" target="_blank" rel="noopener">GGUF</a>. Välj <code>parakeet/pianissimo-da</code> och använd <code>language=da</code>. Den är en separat lokal modell, inte ett språkbyte i Bergets svenska modell. <a href="/guide/pianissimo">Guiden för båda modellerna</a> beskriver nedladdning, versionskrav och begränsningar.</p>
  </section>

  <div class="surface-band">
    <section class="landing-section">
      <p class="eyebrow">Arbetsflöde</p>
      <h2>Från tal till färdig text.</h2>
      <div class="steps">
        <div><strong>1. Spela in</strong><span>Tryck på ditt kortkommando eller kör <code>ostt</code> i terminalen.</span></div>
        <div><strong>2. Transkribera</strong><span>Pianissimo gör om ljudet till text på din dator, eller hos Berget om du väljer molnmodellen.</span></div>
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
      <pre><code># Transkribera ett möte lokalt och spara texten&#10;ostt transcribe mote.wav -m parakeet/pianissimo-sv --param language=sv -o mote.md&#10;&#10;# Spela in och skicka texten till ett eget skript&#10;ostt -m parakeet/pianissimo-sv --param language=sv | mitt-skript.sh&#10;&#10;# Molnalternativet, med Bergets API-nyckel&#10;ostt transcribe mote.mp3 -m berget/klang/pianissimo -o mote.md</code></pre>
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
      <a href="/guide/pianissimo">Pianissimo: svenska och danska</a>
      <a href="/reference/providers/berget#pianissimo-params">Pianissimo via Berget</a>
    </div>
  </section>

</main>

<SiteFooter tagline="Tal till text för utvecklare. Öppen källkod för Linux och macOS." />
