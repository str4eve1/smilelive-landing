import { Link } from "react-router-dom";
import LegalLayout, { Section } from "@/components/LegalLayout";
import { openCookieBanner } from "@/lib/consent";

type CookieRow = {
  name: string;
  provider: string;
  purpose: string;
  duration: string;
};

const essentialCookies: CookieRow[] = [
  {
    name: "smilelive_cookie_consent_v1",
    provider: "smilelive.it (localStorage)",
    purpose: "Memorizza le preferenze dell'utente sui cookie statistici e di marketing.",
    duration: "Persistente fino a cancellazione manuale",
  },
  {
    name: "pagina-ricaricata",
    provider: "smilelive.it (sessionStorage)",
    purpose: "Segna che la pagina è già stata ricaricata una volta dopo un aggiornamento del Sito, per non ricaricarla di nuovo. Non identifica l'utente.",
    duration: "Fino alla chiusura della scheda",
  },
];

const statisticsCookies: CookieRow[] = [
  {
    name: "ph_phc_*_posthog",
    provider: "PostHog (eu.i.posthog.com)",
    purpose: "Identificativo anonimo del visitatore. Permette di ricostruire la sessione di navigazione e produrre statistiche aggregate.",
    duration: "12 mesi",
  },
  {
    name: "ph_phc_*_posthog_session_*",
    provider: "PostHog",
    purpose: "Identificativo della singola sessione di navigazione.",
    duration: "30 minuti dall'ultima attività",
  },
];

const marketingCookies: CookieRow[] = [
  {
    name: "_fbp",
    provider: "Meta Platforms Ireland Ltd. (facebook.com)",
    purpose: "Identificativo del browser per il targeting pubblicitario su Facebook e Instagram e per la misurazione delle conversioni.",
    duration: "90 giorni",
  },
  {
    name: "_fbc",
    provider: "Meta Platforms Ireland Ltd.",
    purpose: "Memorizza il riferimento alla campagna Meta che ha condotto l'utente al Sito (presente solo se l'utente arriva da un annuncio).",
    duration: "90 giorni",
  },
];

function CookieTable({ rows }: { rows: CookieRow[] }) {
  return (
    <div className="overflow-x-auto -mx-2 my-4">
      <table className="w-full text-sm border border-secondary/15 rounded-lg overflow-hidden">
        <thead className="bg-surface-elevated/50 text-text-main">
          <tr>
            <th className="text-left px-3 py-2 border-b border-secondary/15 font-bold">Cookie</th>
            <th className="text-left px-3 py-2 border-b border-secondary/15 font-bold">Fornitore</th>
            <th className="text-left px-3 py-2 border-b border-secondary/15 font-bold">Finalità</th>
            <th className="text-left px-3 py-2 border-b border-secondary/15 font-bold">Durata</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-secondary/10 last:border-b-0 align-top">
              <td className="px-3 py-2 font-mono text-xs text-text-main">{row.name}</td>
              <td className="px-3 py-2 text-xs">{row.provider}</td>
              <td className="px-3 py-2 text-xs">{row.purpose}</td>
              <td className="px-3 py-2 text-xs">{row.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function CookiePolicy() {
  return (
    <LegalLayout
      title="Cookie Policy"
      subtitle="Informativa sull'uso di cookie e tecnologie similari sul sito smilelive.it, ai sensi del provvedimento del Garante per la protezione dei dati personali del 10 giugno 2021."
      lastUpdate="11 ottobre 2026"
    >
      <Section title="1. Cosa sono i cookie">
        <p>
          I cookie sono piccoli file di testo che i siti visitati inviano al browser dell'utente,
          dove vengono memorizzati per essere ritrasmessi al sito alla visita successiva. In
          questa Cookie Policy il termine "cookie" comprende anche tecnologie analoghe quali
          pixel di tracciamento, fingerprinting e identificatori memorizzati nello storage locale
          del browser (localStorage, sessionStorage).
        </p>
        <p>
          A seconda della loro funzione, i cookie possono essere classificati in:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong className="text-text-main">tecnici</strong>, necessari al funzionamento del Sito o alla memorizzazione delle preferenze dell'utente, per i quali non è richiesto il consenso;</li>
          <li><strong className="text-text-main">di profilazione</strong> (statistici e di marketing), che richiedono il consenso preventivo dell'utente.</li>
        </ul>
      </Section>

      <Section title="2. Cookie utilizzati da questo Sito">
        <p>
          Il Sito utilizza le tipologie di cookie descritte di seguito. Per i cookie di
          profilazione, il consenso può essere espresso o revocato in qualsiasi momento tramite
          il banner cookie, riapribile dal link{" "}
          <button
            type="button"
            onClick={openCookieBanner}
            className="text-primary hover:underline"
          >
            "Gestione cookie"
          </button>
          {" "}presente in fondo a ogni pagina.
        </p>

        <h3 className="text-base md:text-lg font-bold text-text-main pt-4">2.1 Cookie tecnici (sempre attivi)</h3>
        <p>
          Sono indispensabili per il funzionamento del Sito e per memorizzare le preferenze
          dell'utente. Non richiedono consenso ai sensi dell'art. 122 del Codice Privacy.
        </p>
        <CookieTable rows={essentialCookies} />

        <h3 className="text-base md:text-lg font-bold text-text-main pt-4">2.2 Cookie statistici (PostHog)</h3>
        <p>
          Permettono di raccogliere informazioni aggregate sull'utilizzo del Sito, come pagine
          più visitate, percorsi di navigazione, errori e tempi di caricamento. I dati vengono
          utilizzati per migliorare l'esperienza utente. Il fornitore <strong className="text-text-main">PostHog</strong>{" "}
          opera con server in Unione Europea (Germania).
        </p>
        <CookieTable rows={statisticsCookies} />
        <p className="text-xs">
          Maggiori informazioni: <a href="https://posthog.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">posthog.com/privacy</a>
        </p>

        <h3 className="text-base md:text-lg font-bold text-text-main pt-4">2.3 Cookie di marketing (Meta Pixel)</h3>
        <p>
          Permettono di mostrare all'utente annunci pubblicitari pertinenti su piattaforme Meta
          (Facebook e Instagram) e di misurare l'efficacia delle campagne pubblicitarie. Il
          fornitore <strong className="text-text-main">Meta Platforms Ireland Ltd.</strong>{" "}
          può trasferire i dati al gruppo Meta negli Stati Uniti, sulla base del Data Privacy
          Framework EU-USA e di Clausole Contrattuali Standard.
        </p>
        <CookieTable rows={marketingCookies} />
        <p className="text-xs">
          Maggiori informazioni: <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">facebook.com/privacy/policy</a>
        </p>
      </Section>

      <Section title="3. Come gestire i cookie">
        <p>
          L'utente può gestire le proprie preferenze in due modi:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong className="text-text-main">Tramite il banner cookie</strong> di SmileLive,
            riapribile in qualsiasi momento dal link{" "}
            <button
              type="button"
              onClick={openCookieBanner}
              className="text-primary hover:underline"
            >
              "Gestione cookie"
            </button>
            {" "}in fondo a ogni pagina. Da qui è possibile concedere o revocare il consenso per
            le categorie statistiche e di marketing in modo separato.
          </li>
          <li>
            <strong className="text-text-main">Tramite le impostazioni del browser</strong>, che
            consentono di bloccare o eliminare i cookie. Si segnala che il blocco dei cookie
            tecnici può compromettere il funzionamento del Sito.
          </li>
        </ul>
        <p>Di seguito i link alle istruzioni dei principali browser:</p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Chrome</a></li>
          <li><a href="https://support.mozilla.org/it/kb/Attivare%20e%20disattivare%20i%20cookie" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Mozilla Firefox</a></li>
          <li><a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Safari</a></li>
          <li><a href="https://support.microsoft.com/it-it/microsoft-edge" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Microsoft Edge</a></li>
        </ul>
      </Section>

      <Section title="4. Trasferimento dei dati extra UE">
        <p>
          L'attivazione di cookie di marketing (Meta Pixel) comporta il possibile trasferimento
          di dati personali verso gli Stati Uniti. Il trasferimento avviene sulla base delle
          garanzie previste dagli artt. 44-49 GDPR, in particolare il EU-US Data Privacy
          Framework e le Clausole Contrattuali Standard adottate dalla Commissione Europea.
        </p>
      </Section>

      <Section title="5. Diritti dell'interessato">
        <p>
          L'utente può esercitare in qualsiasi momento i diritti previsti dagli artt. 15-22 del
          GDPR, tra cui il diritto di accesso, rettifica, cancellazione, opposizione,
          portabilità e revoca del consenso. Per il dettaglio si rimanda alla{" "}
          <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
        </p>
        <p>
          Per esercitare i propri diritti scrivere a{" "}
          <a href="mailto:privacy@smilelive.it" className="text-primary hover:underline">privacy@smilelive.it</a>.
        </p>
      </Section>

      <Section title="6. Modifiche alla Cookie Policy">
        <p>
          La Cookie Policy può essere aggiornata in qualsiasi momento per riflettere modifiche
          ai cookie utilizzati o adeguamenti normativi. Le modifiche saranno pubblicate su
          questa pagina con indicazione della data di ultimo aggiornamento.
        </p>
      </Section>
    </LegalLayout>
  );
}
