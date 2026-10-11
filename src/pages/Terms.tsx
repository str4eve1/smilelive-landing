import { Link } from "react-router-dom";
import LegalLayout, { Section } from "@/components/LegalLayout";

export default function Terms() {
  return (
    <LegalLayout
      title="Termini di Servizio"
      subtitle="Termini e condizioni di utilizzo del sito smilelive.it."
      lastUpdate="11 ottobre 2026"
    >
      <p>
        I presenti Termini di Servizio (di seguito "Termini") disciplinano l'accesso e
        l'utilizzo del sito web <strong className="text-text-main">smilelive.it</strong>{" "}
        (di seguito "Sito"). Accedendo al Sito l'utente accetta integralmente i presenti
        Termini. Si raccomanda di leggerli con attenzione.
      </p>

      <Section title="1. Titolare e contatti">
        <p>
          Il Sito è di proprietà di:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong className="text-text-main">Giampiero Lombardi</strong> — Ditta Individuale</li>
          <li>Partita IVA: 09125450727</li>
          <li>Attività: sviluppo e gestione della piattaforma SaaS SmileLive per studi odontoiatrici</li>
          <li>Sede: Casamassima (BA), Italia</li>
          <li>Email: <a href="mailto:privacy@smilelive.it" className="text-primary hover:underline">privacy@smilelive.it</a></li>
        </ul>
      </Section>

      <Section title="2. Oggetto e natura del Sito">
        <p>
          Il Sito ha natura puramente <strong className="text-text-main">informativa e
          promozionale</strong>: presenta SmileLive, il software dedicato agli studi
          odontoiatrici per la simulazione del sorriso con intelligenza artificiale, e i
          relativi piani commerciali. Pubblica inoltre guide e contenuti informativi rivolti ai
          professionisti del settore odontoiatrico e odontotecnico. La sottoscrizione del
          servizio e l'utilizzo del software avvengono esclusivamente sull'applicazione{" "}
          <a href="https://app.smilelive.it/" className="text-primary hover:underline">app.smilelive.it</a>,
          regolati da contratti separati.
        </p>
        <p>
          Sul Sito non è possibile creare account, acquistare prodotti o sottoscrivere
          abbonamenti. Le informazioni pubblicate hanno scopo descrittivo e non costituiscono
          offerta contrattuale ai sensi dell'art. 1336 c.c.
        </p>
      </Section>

      <Section title="3. Proprietà intellettuale">
        <p>
          Tutti i contenuti del Sito — inclusi, a titolo esemplificativo, testi, immagini,
          video, grafica, marchi, loghi, illustrazioni, codice sorgente e layout — sono di
          proprietà esclusiva del Titolare o dei rispettivi licenzianti e sono protetti dalle
          normative italiane e internazionali in materia di proprietà intellettuale e diritto
          d'autore.
        </p>
        <p>
          È vietata la riproduzione, modifica, distribuzione, comunicazione al pubblico,
          esposizione, esecuzione, pubblicazione o utilizzo dei contenuti senza preventiva
          autorizzazione scritta del Titolare. È consentito stampare singole pagine per uso
          personale e non commerciale, mantenendo intatte le indicazioni di copyright.
        </p>
      </Section>

      <Section title="4. Utilizzo del Sito">
        <p>
          L'utente si impegna a:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>utilizzare il Sito nel rispetto della legge italiana e delle norme sulla buona fede;</li>
          <li>non interferire con il funzionamento del Sito (attacchi DDoS, scraping massivo, exploit di vulnerabilità);</li>
          <li>non utilizzare il Sito per finalità illecite, fraudolente o lesive dei diritti di terzi;</li>
          <li>non aggirare le misure di sicurezza implementate dal Titolare.</li>
        </ul>
      </Section>

      <Section title="5. Disponibilità del Sito">
        <p>
          Il Titolare si impegna a mantenere il Sito accessibile in modo continuativo, ma non
          fornisce alcuna garanzia di disponibilità ininterrotta. Il Sito può essere
          temporaneamente sospeso per manutenzione, aggiornamenti, problemi tecnici o cause
          di forza maggiore, senza che ciò costituisca inadempimento contrattuale.
        </p>
      </Section>

      <Section title="6. Limitazione di responsabilità">
        <p>
          Le informazioni pubblicate sul Sito sono fornite "<em>as is</em>", in buona fede e
          con la massima diligenza, ma il Titolare non garantisce la loro completezza,
          accuratezza, attualità o adeguatezza a finalità specifiche. Le simulazioni mostrate
          a scopo dimostrativo non costituiscono diagnosi clinica né predizione di risultati
          terapeutici certi. Le guide e la pagina sul protocollo hanno scopo informativo, sono
          rivolte a professionisti e non sostituiscono la valutazione clinica dell'odontoiatra.
        </p>
        <p>
          Nei limiti consentiti dalla legge, il Titolare non sarà responsabile per:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>danni diretti o indiretti derivanti dall'uso o dall'impossibilità di usare il Sito;</li>
          <li>perdita di dati, mancato guadagno o altre conseguenze economiche;</li>
          <li>contenuti di siti web di terzi raggiungibili tramite link esterni.</li>
        </ul>
        <p>
          Quanto sopra non pregiudica i diritti inderogabili dei consumatori previsti dal
          Codice del Consumo (D.Lgs. 206/2005) ove applicabile.
        </p>
      </Section>

      <Section title="7. Link a siti di terzi">
        <p>
          Il Sito può contenere link a siti web di terzi non gestiti dal Titolare. Il Titolare
          non esercita alcun controllo sui contenuti, le politiche di privacy o le pratiche di
          tali siti e declina ogni responsabilità per gli stessi. L'accesso a tali siti avviene
          sotto l'esclusiva responsabilità dell'utente.
        </p>
      </Section>

      <Section title="8. Privacy e cookie">
        <p>
          Il trattamento dei dati personali dell'utente è disciplinato dalla{" "}
          <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link> e
          dalla{" "}
          <Link to="/cookie-policy" className="text-primary hover:underline">Cookie Policy</Link>,
          che costituiscono parte integrante dei presenti Termini.
        </p>
      </Section>

      <Section title="9. Modifiche dei Termini">
        <p>
          Il Titolare si riserva il diritto di modificare i presenti Termini in qualsiasi
          momento, anche per adeguarsi a evoluzioni normative o organizzative. Le modifiche
          saranno pubblicate su questa pagina con indicazione della data di ultimo
          aggiornamento e avranno effetto dal momento della pubblicazione. L'uso continuato
          del Sito dopo la pubblicazione costituirà accettazione dei nuovi Termini.
        </p>
      </Section>

      <Section title="10. Legge applicabile e foro competente">
        <p>
          I presenti Termini sono regolati dalla legge italiana. Per ogni controversia
          relativa all'interpretazione, esecuzione o risoluzione dei Termini è competente in
          via esclusiva il Foro di Bari, salvo il foro inderogabile del consumatore ove
          applicabile.
        </p>
      </Section>

      <Section title="11. Contatti">
        <p>
          Per qualsiasi domanda relativa ai presenti Termini, l'utente può scrivere a{" "}
          <a href="mailto:privacy@smilelive.it" className="text-primary hover:underline">privacy@smilelive.it</a>.
        </p>
      </Section>
    </LegalLayout>
  );
}
