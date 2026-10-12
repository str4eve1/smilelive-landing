import { useEffect, useRef, useState } from "react";
import logoFinale from "@/assets/WEBP/SmileLive FINALE senza sfondo COLORI CORRETTI (1).webp";
import poster from "@/assets/dentisti-poster.jpg";
import video from "@/assets/dentisti-video.mp4";
import { trackCta } from "@/lib/analytics";
import { openCookieBanner } from "@/lib/consent";
import { appLink } from "@/lib/utm";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import "./dentisti/dentisti.css";
import ModuloRichiamata from "./dentisti/ModuloRichiamata";

/**
 * Landing /dentisti — atterraggio dell'inserzione Facebook per gli studi.
 * Una strada sola: niente menu. Noindex (vedi vercel.json).
 * Vincoli di contenuto: sempre «possibile risultato», niente tempi in secondi,
 * niente numeri di risultato, niente garanzie.
 */

const PROTOCOL_URL = "https://app.smilelive.it/protocollo-smilelive.pdf";
const WA_PHONE = "393289598557"; // stesso numero di WhatsAppWidget
const WA_TEXT = "Buongiorno, sono un dentista e vorrei informazioni su SmileLive.";
const PAGE_TITLE = "SmileLive per i dentisti — la simulazione del sorriso in prima visita";

// Il link all'app porta con sé gli utm_* con cui il visitatore è arrivato; se mancano, questi.
const UTM_DI_RISERVA = { source: "sito", medium: "dentisti" };
// Il modulo si accende alla compilazione: la pagina può uscire prima del modulo.
const MODULO_ATTIVO = import.meta.env.VITE_MODULO_RICHIAMATA === "1";

const POINTS = [
  { title: "In prima visita", text: "Il paziente vede il possibile risultato sul proprio viso prima di parlare del piano di cura." },
  { title: "Circa un minuto", text: "Basta una foto dal telefono o dal tablet." },
  {
    title: "Prima si verifica, poi si mostra",
    text: "Un protocollo in sette fasi, dalla foto al manufatto, per mostrare al paziente solo ciò che è realizzabile.",
    link: { label: "Scarica il protocollo (PDF)", href: PROTOCOL_URL },
  },
];

export default function Dentisti() {
  const [appUrl, setAppUrl] = useState(() =>
    appLink(typeof window === "undefined" ? "" : window.location.search, UTM_DI_RISERVA),
  );
  const [barVisible, setBarVisible] = useState(false);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  // Titolo della scheda (solo per questa pagina), ripristinato all'uscita.
  useEffect(() => {
    const prevTitle = document.title;
    document.title = PAGE_TITLE;
    setAppUrl(appLink(window.location.search, UTM_DI_RISERVA));
    return () => {
      document.title = prevTitle;
    };
  }, []);

  // La barra fissa su telefono compare solo quando il bottone grande esce dallo schermo.
  useEffect(() => {
    const el = ctaRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setBarVisible(!entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onTry = () => trackCta("prova_gratis", "dentisti");
  const waHref = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(WA_TEXT)}`;

  return (
    <div className="dn-page">
      <header className="dn-hero">
        <div className="dn-wrap">
          <div className="dn-top">
            {/* il file ha molto margine trasparente: lo ritaglio sul solo logo */}
            <div className="dn-logo" role="img" aria-label="SmileLive">
              <img src={logoFinale} alt="" width="1177" height="991" />
            </div>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCta("whatsapp", "dentisti_testata")}
              className="dn-wa-top"
            >
              Scrivici su WhatsApp
            </a>
          </div>
          <div className="dn-grid">
            <div className="dn-text">
              <h1 className="dn-h1">Hai mai fatto una simulazione del sorriso in prima visita?</h1>
              <p className="dn-sub">
                Scatti una foto e in circa un minuto mostri al paziente il possibile risultato sul suo viso, in foto e in video. Guarda come funziona in meno di due minuti.
              </p>
            </div>
            <div className="dn-video">
              <video
                controls
                playsInline
                preload="metadata"
                poster={poster}
                aria-label="Come funziona SmileLive, video di meno di due minuti"
              >
                <source src={video} type="video/mp4" />
              </video>
            </div>
            <div className="dn-cta">
              <a ref={ctaRef} href={appUrl} onClick={onTry} className="dn-btn dn-btn--navy">
                Prova gratis: 5 simulazioni e 2 video
              </a>
              <p className="dn-small">Senza carta di credito.</p>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCta("whatsapp", "dentisti_testata")}
                className="dn-btn dn-btn--ghost dn-wa-hero"
              >
                Scrivici su WhatsApp
              </a>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="dn-points dn-wrap" aria-label="Perché SmileLive">
          <ul>
            {POINTS.map((p) => (
              <li key={p.title}>
                <h2>{p.title}</h2>
                <p>{p.text}</p>
                {p.link && (
                  <a href={p.link.href} target="_blank" rel="noopener noreferrer" className="dn-link">
                    {p.link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>

        {MODULO_ATTIVO && <ModuloRichiamata appUrl={appUrl} onTry={onTry} waHref={waHref} />}

        <section className="dn-wa dn-wrap" aria-label="Contatto WhatsApp">
          <h2>Preferisci parlarne prima?</h2>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCta("whatsapp", "dentisti")}
            className="dn-btn dn-btn--outline"
          >
            Scrivici su WhatsApp
          </a>
        </section>

        <p className="dn-disclaimer dn-wrap">
          Le immagini sono simulazioni generate con intelligenza artificiale: mostrano un possibile risultato e non sostituiscono la valutazione clinica.
        </p>
      </main>

      <footer className="dn-footer">
        <div className="dn-wrap">
          <p>© {new Date().getFullYear()} SmileLive — Giampiero Lombardi, Ditta Individuale — P.IVA 09125450727 — REA BA-673495 — Casamassima (BA), Italia</p>
          <nav aria-label="Informazioni legali">
            <a href="/privacy">Privacy</a>
            <a href="/cookie-policy">Cookie</a>
            <a href="/terms">Termini</a>
            <button type="button" onClick={openCookieBanner}>Gestione cookie</button>
          </nav>
        </div>
      </footer>

      <div className="dn-wa-float">
        <WhatsAppWidget />
      </div>

      <div className={`dn-bar${barVisible ? " is-visible" : ""}`} aria-hidden={!barVisible}>
        <a href={appUrl} onClick={onTry} className="dn-btn dn-btn--blue" tabIndex={barVisible ? 0 : -1}>
          Prova gratis: 5 simulazioni e 2 video
        </a>
      </div>
    </div>
  );
}
