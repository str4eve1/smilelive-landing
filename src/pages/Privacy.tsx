import { Link } from "react-router-dom";
import LegalLayout, { Section } from "@/components/LegalLayout";

export default function Privacy() {
  return (
    <LegalLayout
      title="Privacy Policy"
      subtitle="Informativa sul trattamento dei dati personali ai sensi degli artt. 13 e 14 del Regolamento (UE) 2016/679 (GDPR)."
      lastUpdate="14 ottobre 2026"
    >
      <p>
        La presente informativa descrive le modalità con cui i dati personali degli utenti che
        visitano il sito <strong className="text-text-main">smilelive.it</strong> (di seguito
        "Sito") vengono trattati dal Titolare. La Privacy Policy si applica esclusivamente a
        questo Sito, non a siti web di terzi che possano essere raggiunti tramite link. La
        sezione 8 riguarda invece i recapiti professionali degli studi odontoiatrici che il
        Titolare raccoglie da fonti pubbliche.
      </p>

      <Section title="1. Titolare del trattamento">
        <p>Il Titolare del trattamento è:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong className="text-text-main">Giampiero Lombardi</strong> — Ditta Individuale</li>
          <li>Partita IVA: 09125450727</li>
          <li>Numero REA: BA-673495</li>
          <li>Attività: sviluppo e gestione della piattaforma SaaS SmileLive per studi odontoiatrici</li>
          <li>Sede: Casamassima (BA), Italia</li>
          <li>Email: <a href="mailto:privacy@smilelive.it" className="text-primary hover:underline">privacy@smilelive.it</a></li>
        </ul>
        <p>
          Per qualsiasi richiesta relativa al trattamento dei dati o all'esercizio dei propri
          diritti, l'utente può scrivere all'email del Titolare indicata sopra.
        </p>
      </Section>

      <Section title="2. Tipologie di dati trattati">
        <p>Il Sito può trattare le seguenti categorie di dati:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong className="text-text-main">Dati di navigazione</strong> — indirizzo IP, tipo di
            browser, sistema operativo, pagine visitate, data e ora delle richieste, durata della
            visita. Questi dati sono raccolti automaticamente dai server di hosting per finalità
            di sicurezza, diagnostica e statistica anonima.
          </li>
          <li>
            <strong className="text-text-main">Cookie e identificatori</strong> — tecnici e, previo
            consenso, statistici e di marketing. Per il dettaglio si rimanda alla{" "}
            <Link to="/cookie-policy" className="text-primary hover:underline">Cookie Policy</Link>.
          </li>
          <li>
            <strong className="text-text-main">Dati forniti volontariamente</strong> — quando
            l'utente ci contatta tramite email o moduli, conferisce volontariamente nome,
            indirizzo email e contenuto del messaggio.
          </li>
          <li>
            <strong className="text-text-main">Dati del modulo «Preferisci essere richiamato?»</strong> —
            titolo professionale, nome, cognome, nome dello studio, città, numero di telefono e
            indirizzo email, forniti dal professionista che chiede di essere richiamato. Insieme al
            modulo registriamo la pagina da cui è stato inviato, la data e l'ora e, se è stata
            spuntata la casella facoltativa, il testo del consenso prestato.
          </li>
        </ul>
      </Section>

      <Section title="3. Finalità e basi giuridiche del trattamento">
        <p>I dati sono trattati per le seguenti finalità:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong className="text-text-main">Erogazione del Sito e sicurezza</strong> —
            funzionamento delle pagine, prevenzione abusi e attacchi informatici.<br />
            <em>Base giuridica:</em> legittimo interesse del Titolare (art. 6.1.f GDPR).
          </li>
          <li>
            <strong className="text-text-main">Statistica e miglioramento del Sito</strong> —
            analisi aggregata della navigazione tramite PostHog (analytics e session replay).<br />
            <em>Base giuridica:</em> consenso dell'interessato (art. 6.1.a GDPR).
          </li>
          <li>
            <strong className="text-text-main">Marketing e profilazione pubblicitaria</strong> —
            mostrare annunci pertinenti su piattaforme Meta (Facebook, Instagram) e misurare
            l'efficacia delle campagne tramite Meta Pixel.<br />
            <em>Base giuridica:</em> consenso dell'interessato (art. 6.1.a GDPR).
          </li>
          <li>
            <strong className="text-text-main">Risposta a richieste di contatto</strong> — gestione
            delle email inviate al Titolare.<br />
            <em>Base giuridica:</em> esecuzione di misure precontrattuali su richiesta
            dell'interessato (art. 6.1.b GDPR).
          </li>
          <li>
            <strong className="text-text-main">Richiamata su richiesta</strong> — contattare per
            telefono o per email il professionista che ha compilato il modulo, per presentare
            SmileLive e rispondere alle sue domande.<br />
            <em>Base giuridica:</em> esecuzione di misure precontrattuali su richiesta
            dell'interessato (art. 6.1.b GDPR).
          </li>
          <li>
            <strong className="text-text-main">Chiamata dal segretario/a digitale</strong> — solo
            per chi ha spuntato la casella facoltativa del modulo, la richiamata può essere fatta
            da un sistema vocale automatico basato su intelligenza artificiale, senza operatore.<br />
            <em>Base giuridica:</em> consenso dell'interessato (art. 6.1.a GDPR e art. 130 del
            D.Lgs. 196/2003). Il consenso è facoltativo e si può revocare in qualsiasi momento
            scrivendo a privacy@smilelive.it o chiedendolo durante la chiamata: da quel momento la
            richiamata è fatta da una persona.
          </li>
        </ul>
        <p>
          Il consenso per finalità statistiche e di marketing è raccolto tramite il banner cookie
          che compare alla prima visita. L'utente può modificare la propria scelta in qualsiasi
          momento dal link "Gestione cookie" presente in fondo a ogni pagina.
        </p>
      </Section>

      <Section title="4. Destinatari dei dati">
        <p>
          I dati personali possono essere comunicati ai seguenti soggetti, in qualità di
          responsabili del trattamento o titolari autonomi, esclusivamente per le finalità sopra
          indicate:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong className="text-text-main">Vercel Inc.</strong> — fornitore di hosting e CDN
            del Sito. Sede: USA. Trasferimento extra-UE basato su Clausole Contrattuali Standard
            (SCC) approvate dalla Commissione Europea.
          </li>
          <li>
            <strong className="text-text-main">PostHog Inc.</strong> — fornitore di servizi di
            analytics e session replay. Region: UE (server in Germania).
          </li>
          <li>
            <strong className="text-text-main">Meta Platforms Ireland Ltd.</strong> — fornitore
            del servizio Meta Pixel e dei pubblici personalizzati (sezione 8) per finalità di
            marketing. Sede del titolare europeo: Irlanda.
            I dati possono essere trasferiti al gruppo Meta (USA) sulla base del Data Privacy
            Framework EU-USA e delle Clausole Contrattuali Standard.
          </li>
          <li>
            <strong className="text-text-main">Supabase Inc.</strong> — fornitore del database in
            cui sono conservati i contatti raccolti con il modulo. Sede: USA. Eventuali
            trasferimenti extra-UE sono basati sulle Clausole Contrattuali Standard (SCC)
            approvate dalla Commissione Europea.
          </li>
          <li>
            <strong className="text-text-main">Fornitori del servizio telefonico e del sistema vocale automatico</strong> —
            solo per le chiamate del segretario/a digitale.
          </li>
          <li>
            <strong className="text-text-main">Soggetti terzi</strong> a cui la comunicazione sia
            obbligatoria per legge o per ordine dell'Autorità (ad es. Autorità giudiziaria,
            Garante per la protezione dei dati personali).
          </li>
        </ul>
      </Section>

      <Section title="5. Trasferimento dei dati extra UE">
        <p>
          Alcuni dei fornitori sopra elencati hanno sede negli Stati Uniti. Il trasferimento è
          legittimato da garanzie adeguate ai sensi degli artt. 44-49 GDPR, in particolare:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Clausole Contrattuali Standard (SCC) approvate dalla Commissione Europea;</li>
          <li>Adesione al EU-US Data Privacy Framework, ove applicabile;</li>
          <li>Misure tecniche e organizzative supplementari implementate dai fornitori.</li>
        </ul>
        <p>
          L'utente può richiedere copia delle garanzie applicate scrivendo all'indirizzo email
          del Titolare.
        </p>
      </Section>

      <Section title="6. Periodo di conservazione">
        <p>I dati sono conservati per i seguenti tempi:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Log di server: massimo 30 giorni;</li>
          <li>Dati statistici (PostHog): fino a 12 mesi dall'ultima interazione;</li>
          <li>Dati marketing (Meta Pixel): fino a 13 mesi dall'ultima interazione;</li>
          <li>Comunicazioni email: per il tempo necessario a evadere la richiesta e per i
            successivi 24 mesi a fini di archivio commerciale, salvo obblighi di legge differenti;</li>
          <li>Dati del modulo di richiamata: 24 mesi dall'ultimo contatto, salvo che ne nasca un
            rapporto contrattuale.</li>
        </ul>
        <p>
          Decorsi i termini sopra indicati, i dati sono cancellati o anonimizzati in modo
          irreversibile.
        </p>
      </Section>

      <Section title="7. Diritti dell'interessato">
        <p>
          In qualità di interessato, l'utente ha il diritto di esercitare in qualsiasi momento i
          diritti previsti dagli artt. 15-22 del GDPR, e in particolare:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>diritto di <strong className="text-text-main">accesso</strong> ai propri dati;</li>
          <li>diritto di <strong className="text-text-main">rettifica</strong> di dati inesatti;</li>
          <li>diritto alla <strong className="text-text-main">cancellazione</strong> ("diritto all'oblio");</li>
          <li>diritto alla <strong className="text-text-main">limitazione</strong> del trattamento;</li>
          <li>diritto alla <strong className="text-text-main">portabilità</strong> dei dati;</li>
          <li>diritto di <strong className="text-text-main">opposizione</strong> al trattamento basato su legittimo interesse;</li>
          <li>diritto di <strong className="text-text-main">revocare il consenso</strong> in qualsiasi momento (la revoca non pregiudica la liceità dei trattamenti già effettuati);</li>
          <li>diritto di proporre <strong className="text-text-main">reclamo all'Autorità Garante</strong> per la protezione dei dati personali (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.garanteprivacy.it</a>).</li>
        </ul>
        <p>
          Per esercitare i propri diritti l'utente può scrivere a{" "}
          <a href="mailto:privacy@smilelive.it" className="text-primary hover:underline">privacy@smilelive.it</a>.
          La richiesta sarà evasa entro 30 giorni.
        </p>
      </Section>

      <Section title="8. Contatti professionali e pubblicità su Meta">
        <p>
          Il Titolare raccoglie i recapiti professionali degli studi odontoiatrici pubblicati
          online da fonti accessibili a chiunque (siti web degli studi, schede di Google Maps,
          inserzioni pubbliche su Facebook): nome dello studio, telefono, email, città e nome del
          medico, se indicato. Li usa per proporre i servizi di SmileLive ai professionisti del
          settore. Questi recapiti possono essere caricati in forma cifrata su Meta Platforms
          Ireland Ltd. per mostrare le inserzioni di SmileLive su Facebook e Instagram agli stessi
          professionisti o a persone con caratteristiche simili.
        </p>
        <p>
          <em>Base giuridica:</em> legittimo interesse del Titolare a far conoscere i propri
          servizi ai professionisti del settore (art. 6, par. 1, lett. f, GDPR).
        </p>
        <p>
          Il professionista può opporsi in qualsiasi momento scrivendo a{" "}
          <a href="mailto:privacy@smilelive.it" className="text-primary hover:underline">privacy@smilelive.it</a>:
          lo togliamo dagli elenchi entro 30 giorni. I dati sono conservati per 24 mesi
          dall'ultimo aggiornamento.
        </p>
      </Section>

      <Section title="9. Modifiche alla Privacy Policy">
        <p>
          Il Titolare si riserva di modificare la presente Privacy Policy in qualsiasi momento per
          adeguarla a evoluzioni normative o organizzative. Le modifiche saranno pubblicate su
          questa pagina con indicazione della data di ultimo aggiornamento. Si invita l'utente a
          consultarla periodicamente.
        </p>
      </Section>
    </LegalLayout>
  );
}
