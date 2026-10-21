import { useState, type FormEvent, type InputHTMLAttributes } from "react";
import { TESTO_CONSENSO } from "../../../api/_consenso.ts";
import { trackLead } from "@/lib/analytics";
import { readUtm } from "@/lib/utm";

type Props = {
  appUrl: string; // link della prova gratuita, con gli UTM
  onTry: () => void;
  waHref: string; // l'altra strada quando l'invio non riesce
};

function Campo({ label, ...input }: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="dn-campo">
      {label}
      <input required {...input} />
    </label>
  );
}

// Modulo della pagina /dentisti: gli stili stanno in dentisti.css (classi dn-*).
export default function ModuloRichiamata({ appUrl, onTry, waHref }: Props) {
  const [stato, setStato] = useState<"pronto" | "invio" | "fatto" | "errore">("pronto");
  const [errore, setErrore] = useState("");

  async function invia(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const dati = Object.fromEntries(new FormData(e.currentTarget));
    setStato("invio");
    let risposta: Response | undefined;
    let esito: { ok?: boolean; errore?: string } | null = null;
    try {
      risposta = await fetch("/api/contatto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...dati,
          consenso_assistente: dati.consenso_assistente === "on",
          pagina: window.location.href,
          utm: readUtm(),
        }),
      });
      esito = await risposta.json();
    } catch {
      // rete assente o risposta che non è JSON: resta un errore, mai un «grazie»
    }
    if (risposta?.ok && esito?.ok === true) {
      setStato("fatto");
      trackLead();
      return;
    }
    // 400 e 429 portano un messaggio scritto per chi compila; gli altri errori no
    setErrore(risposta && [400, 429].includes(risposta.status) ? (esito?.errore ?? "") : "");
    setStato("errore");
  }

  return (
    <section className="dn-modulo dn-wrap" aria-labelledby="dn-modulo-titolo" aria-live="polite">
      <div className="dn-modulo-box">
        <h2 id="dn-modulo-titolo">Preferisci essere richiamato?</h2>

        {stato === "fatto" ? (
          <>
            <p className="dn-grazie">Grazie, ti richiamiamo noi.</p>
            <a href={appUrl} onClick={onTry} className="dn-btn dn-btn--blue">
              Prova gratis: 2 simulazioni e 2 video
            </a>
          </>
        ) : (
          <form onSubmit={invia}>
            <fieldset>
              <legend>Titolo</legend>
              <div className="dn-scelte">
                {["Dott.", "Dott.ssa"].map((titolo) => (
                  <label key={titolo}>
                    <input type="radio" name="titolo" value={titolo} required />
                    {titolo}
                  </label>
                ))}
              </div>
            </fieldset>
            <Campo label="Nome" name="nome" autoComplete="given-name" maxLength={100} />
            <Campo label="Cognome" name="cognome" autoComplete="family-name" maxLength={100} />
            <Campo label="Nome dello studio" name="studio" autoComplete="organization" maxLength={200} />
            <Campo label="Città" name="citta" autoComplete="address-level2" maxLength={100} />
            <Campo
              label="Telefono"
              name="telefono"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              maxLength={40}
              pattern="(\D*\d){8,}\D*"
              title="Almeno 8 cifre"
            />
            <Campo label="Email" name="email" type="email" inputMode="email" autoComplete="email" maxLength={200} />

            {/* Campo trappola per i programmi automatici: le persone non lo vedono e non lo compilano. */}
            <div className="dn-trappola" aria-hidden="true">
              <label>
                Sito web
                <input type="text" name="sito_web" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <label className="dn-casella">
              <input type="checkbox" name="consenso_assistente" />
              <span>{TESTO_CONSENSO}</span>
            </label>

            <p className="dn-nota">
              Inviando il modulo chiedi a SmileLive di richiamarti al numero indicato e dichiari di aver letto l'
              <a href="/privacy" target="_blank" rel="noopener">
                informativa privacy
              </a>
              .
            </p>

            {stato === "errore" && (
              <div role="alert" className="dn-errore">
                <p>{errore || "Non siamo riusciti a inviare la richiesta. Riprova tra poco."}</p>
                <a href={waHref} target="_blank" rel="noopener noreferrer">
                  Oppure scrivici su WhatsApp
                </a>
              </div>
            )}

            <button type="submit" disabled={stato === "invio"} className="dn-btn dn-btn--navy">
              {stato === "invio" ? "Invio in corso…" : "Richiamatemi"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
