import GuidaLayout, { Elenco, ElencoNumerato, LinkEsterno, Section, Tabella } from "@/components/GuidaLayout";

export default function Protocollo() {
  return (
    <GuidaLayout
      titolo="Il protocollo SmileLive: dalla simulazione del sorriso al manufatto, in sette fasi"
      aggiornato="10 ottobre 2026"
      posizione="protocollo"
      inBreve="Il protocollo SmileLive è il flusso di lavoro in sette fasi che porta dalla foto clinica e dalla scansione intraorale al manufatto definitivo, passando per la simulazione del sorriso, la valutazione di fattibilità in studio e la progettazione in laboratorio. Serve a verificare ogni caso prima di mostrarlo al paziente: la simulazione aiuta l'accettazione del caso, la valutazione resta all'esperienza del clinico."
    >
      <Section title="Le sette fasi in una tabella">
        <Tabella
          colonne={["Fase", "Dove avviene", "Chi la fa", "Cosa produce"]}
          righe={[
            ["1. Acquisizione", "Studio clinico", "—", "Foto del volto secondo protocollo e scansione intraorale, nella stessa seduta"],
            ["2. Simulazione", "Studio clinico", "Il software di simulazione, come strumento del clinico", "Il possibile risultato, generato dalla foto originale"],
            ["3. Fattibilità", "Studio clinico", "Il clinico", "Il confronto fra situazione attuale e simulata, con scansione sovrapposta alla foto; solo un caso fattibile arriva al paziente"],
            ["4. Matching nel software CAD", "Laboratorio", "—", "Scansione, foto originale e foto simulata sovrapposte; la scansione dà la scala millimetrica"],
            ["5. Ceratura digitale", "Laboratorio", "—", "Wax-up, dal nuovo piano occlusale"],
            ["6. Mock-up o snap-on", "Studio clinico", "—", "Prova in bocca"],
            ["7. Manufatto definitivo", "Laboratorio", "—", "Dispositivo definitivo, con CAD/CAM o stampa 3D"],
          ]}
        />
      </Section>

      <Section title="La foto orienta, la scansione misura">
        <p>
          Si ritiene che una foto clinica richieda uno strumento di misurazione nell'inquadratura. Nei protocolli digitali
          validati la calibrazione arriva invece dalla scansione intraorale.
        </p>
        <Tabella
          colonne={["", "Approccio tradizionale: strumento di misurazione", "Protocollo digitale: scansione intraorale"]}
          righe={[
            ["Tipo di rilievo", "Riferimento bidimensionale", "Rilievo tridimensionale"],
            ["Scala", "Soggetto a prospettiva e parallasse", "Scala millimetrica nativa"],
            ["Precisione", "Precisione limitata", "Precisione trasferita al manufatto"],
          ]}
        />
        <p>Alla fotografia si chiede l'orientamento corretto del volto: un errore qui non si recupera a valle.</p>
      </Section>

      <Section title="Lo scatto: paziente e inquadratura">
        <p>Il volto va ripreso con tre riferimenti ben visibili: linea mediana, linea bipupillare e piano occlusale.</p>
        <Elenco>
          <li>
            <strong>Paziente in piedi</strong>, capo in posizione naturale, sguardo all'orizzonte.
          </li>
          <li>
            <strong>Fotocamera</strong> all'altezza del piano occlusale, asse ottico perpendicolare al viso.
          </li>
          <li>
            <strong>Piano occlusale parallelo</strong> all'orizzonte, verificato con la griglia.
          </li>
          <li>
            <strong>Nessuna rotazione</strong> o inclinazione del capo.
          </li>
        </Elenco>
        <p>Rotazione e inclinazione sono gli errori che il matching non compensa.</p>
      </Section>

      <Section title="Lo scatto: impostazioni dello smartphone">
        <p>Disattivare tutto ciò che elabora l'immagine in automatico.</p>
        <ElencoNumerato>
          <li>
            <strong>Fotocamera nativa.</strong> Modalità standard, senza filtri né app di ritocco.
          </li>
          <li>
            <strong>Niente automatismi.</strong> HDR intelligente, ritratto e sfocature disattivati.
          </li>
          <li>
            <strong>Niente zoom digitale.</strong> Allontanarsi e usare l'ottica 2x o 3x contro la distorsione.
          </li>
          <li>
            <strong>Distanza 1,5 m.</strong> Distanza indicativa per il ritratto frontale.
          </li>
          <li>
            <strong>Luce diffusa.</strong> Niente flash frontale diretto: appiattisce e riflette.
          </li>
          <li>
            <strong>Parametri costanti.</strong> Stessa distanza, altezza e luce tra gli scatti.
          </li>
        </ElencoNumerato>
      </Section>

      <Section title="Il flusso: sette fasi, dallo scatto al manufatto">
        <p>
          Le fasi 1, 2, 3 e 6 avvengono in studio clinico. Le fasi 4, 5 e 7 avvengono in laboratorio. L'affidabilità
          dell'intera catena dipende dal primo anello: lo scatto.
        </p>
      </Section>

      <Section title="Fase 1 · Acquisizione">
        <p>
          Si acquisiscono foto del volto e scansione intraorale, nella stessa seduta. Le foto seguono il protocollo
          fotografico descritto sopra. Avviene in studio clinico.
        </p>
      </Section>

      <Section title="Fase 2 · Simulazione">
        <p>
          Il software genera dalla foto originale il possibile risultato. È uno strumento del clinico, non ancora una
          proposta al paziente. Avviene in studio clinico.
        </p>
      </Section>

      <Section title="Fase 3 · Fattibilità">
        <p>
          Il clinico confronta la situazione attuale con quella simulata e verifica che il risultato sia realizzabile.
          Solo un caso fattibile arriva al paziente. Avviene in studio clinico.
        </p>
        <p>
          Nella valutazione il clinico sovrappone la scansione intraorale alla foto: la terza dimensione entra già qui.
          Questo matching si fa anche dentro SmileLive. Nello strumento «Vista clinica» la scansione 3D (file STL) si
          sovrappone alla foto: la valutazione clinica del caso si fa anche in tre dimensioni.
        </p>
        <p>
          I criteri di analisi e i tre possibili esiti sono descritti più sotto, nella sezione sui limiti della
          simulazione.
        </p>
      </Section>

      <Section title="Fase 4 · Matching nel software CAD">
        <p>
          Scansione, foto originale e foto simulata vengono sovrapposte sugli incisivi superiori. La scansione dà la
          scala millimetrica. Avviene in laboratorio, nel software CAD.
        </p>
        <p>Il matching fra scansione, foto originale e simulazione in ambiente CAD resta la base della ceratura digitale.</p>
      </Section>

      <Section title="Fase 5 · Ceratura digitale">
        <p>
          La simulazione diventa wax-up, dal nuovo piano occlusale, nel rispetto di linea mediana e bipupillare. Avviene
          in laboratorio.
        </p>
      </Section>

      <Section title="Fase 6 · Mock-up o snap-on">
        <p>
          Prova in bocca per verificare estetica, fonetica e funzione prima del definitivo. La conferma al paziente
          arriva dal mock-up in bocca.
        </p>
      </Section>

      <Section title="Fase 7 · Manufatto definitivo">
        <p>Dal progetto validato al dispositivo definitivo, con CAD/CAM o stampa 3D. Avviene in laboratorio.</p>
      </Section>

      <Section title="Cosa la simulazione non è: un'obiezione fondata">
        <p>
          Un'obiezione ricorrente fra i clinici dice: «La simulazione aiuta l'accettazione del caso, ma nella
          progettazione il paziente rimane disilluso.»
        </p>
        <p>Perché accade:</p>
        <Elenco>
          <li>
            La simulazione è un'immagine <strong>2D</strong>: non mostra volumi, spessori, spazio disponibile.
          </li>
          <li>
            Mostrata senza verifica, diventa una <strong>promessa</strong> che il progetto non può mantenere.
          </li>
        </Elenco>
        <p>
          La risposta del protocollo: la simulazione aiuta l'accettazione del caso, la valutazione rimane all'esperienza
          del clinico.
        </p>
        <p>Il problema non è la simulazione, ma mostrarla prima di averla analizzata.</p>
      </Section>

      <Section title="L'analisi prima del paziente: foto originale e simulazione, punto per punto">
        <p>Il clinico confronta le due immagini affiancate e verifica che ogni modifica proposta sia realizzabile.</p>
        <ElencoNumerato>
          <li>
            <strong>Dimensioni dentali.</strong> Lunghezze e larghezze proposte si ottengono aggiungendo materiale, o
            richiedono riduzione?
          </li>
          <li>
            <strong>Labbra ed esposizione.</strong> Esposizione incisale a riposo e nel sorriso, linea del sorriso,
            corridoi buccali.
          </li>
          <li>
            <strong>Mediana e piano occlusale.</strong> Lo spostamento proposto è compatibile con la posizione reale dei
            denti?
          </li>
          <li>
            <strong>Tessuti gengivali.</strong> Margini e zenith modificati richiedono un intervento parodontale?
          </li>
          <li>
            <strong>Volumi e posizione.</strong> Il 2D non mostra la profondità: verifica sulla scansione sovrapposta alla
            foto e sulle viste laterali e di tre quarti.
          </li>
          <li>
            <strong>Colore.</strong> Il colore simulato è ottenibile con il materiale e gli spessori previsti?
          </li>
        </ElencoNumerato>
        <p>L'occhio del clinico, guidato da un protocollo, colma i limiti della visualizzazione bidimensionale.</p>
      </Section>

      <Section title="I tre esiti dell'analisi: prima si verifica">
        <Tabella
          colonne={["Esito", "Cosa succede"]}
          righe={[
            ["Fattibile così com'è", "Il progetto si realizza per via additiva. La simulazione si presenta al paziente e si passa al mock-up."],
            ["Fattibile con trattamenti preliminari", "Il paziente sa fin dalla prima presentazione quali trattamenti preliminari servono, come la chirurgia gengivale o lo sbiancamento."],
            ["Non fattibile come simulata", "Si corregge la simulazione e si ripete l'analisi. Al paziente non arriva nulla di irrealizzabile."],
          ]}
        />
        <p>
          <strong>Cosa vede il paziente.</strong> Originale e simulazione affiancate, come proposta indicativa. La
          conferma arriva dal mock-up in bocca.
        </p>
        <p>
          Simulazione, wax-up, mock-up e manufatto sono passaggi in sequenza. Simulazione e wax-up/mock-up non sono
          alternativi, ma consecutivi.
        </p>
      </Section>

      <Section title="La terza dimensione: anticipare la lettura tridimensionale">
        <p>
          <strong>In studio, fase 3: matching integrato nella simulazione.</strong> La scansione intraorale si sovrappone
          alla foto nel software di simulazione: il confronto arriva già alla valutazione di fattibilità. In SmileLive
          questo avviene nello strumento «Vista clinica», dove la scansione 3D (file STL) si sovrappone alla foto. Già
          disponibile.
        </p>
        <p>
          <strong>In laboratorio, fase 4: matching per la progettazione.</strong> Il matching fra scansione, foto
          originale e simulazione in ambiente CAD, nel software CAD del laboratorio, resta la base della ceratura
          digitale.
        </p>
      </Section>

      <Section title="Ricadute per il laboratorio">
        <Elenco>
          <li>Un progetto riferito al volto, non solo alle arcate.</li>
          <li>Una guida condivisa fra clinico, tecnico e paziente.</li>
          <li>Meno prove cliniche e meno correzioni in corso d'opera.</li>
          <li>Forme e colore restano affidati al laboratorio di fiducia.</li>
        </Elenco>
        <p>La qualità dello scatto è il vero fattore decisivo dell'intero flusso digitale.</p>
      </Section>

      <Section title="Scarica il protocollo e prova SmileLive">
        <Elenco>
          <li>
            <LinkEsterno href="https://app.smilelive.it/protocollo-smilelive.pdf">Scarica il protocollo in PDF</LinkEsterno>
          </li>
          <li>
            <LinkEsterno href="https://app.smilelive.it/">Prova gratuita: 2 foto e 2 video, senza carta di credito</LinkEsterno>
          </li>
        </Elenco>
      </Section>
    </GuidaLayout>
  );
}
