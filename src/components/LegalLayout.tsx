import { ReactNode, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ShieldCheck } from "lucide-react";
import logoFinale from "@/assets/WEBP/SmileLive FINALE senza sfondo COLORI CORRETTI (1).webp";
import { openCookieBanner } from "@/lib/consent";

type LegalLayoutProps = {
  title: string;
  subtitle?: string;
  lastUpdate: string;
  children: ReactNode;
};

export default function LegalLayout({ title, subtitle, lastUpdate, children }: LegalLayoutProps) {
  useEffect(() => {
    document.title = `${title} · SmileLive`;
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <main className="min-h-screen w-full bg-background text-text-main font-['Inter']">
      <TestataSito />

      <article className="max-w-3xl mx-auto px-6 py-12 md:py-16">
        <div className="mb-10 pb-8 border-b border-secondary/10">
          <h1 className="font-headline font-bold text-3xl md:text-4xl tracking-tight mb-3">{title}</h1>
          {subtitle && <p className="text-lg text-text-muted leading-relaxed mb-3">{subtitle}</p>}
          <p className="text-sm text-text-muted">Ultimo aggiornamento: {lastUpdate}</p>
        </div>

        <div className="legal-content text-text-muted leading-relaxed text-base space-y-5">
          {children}
        </div>

        <div className="mt-16 pt-8 border-t border-secondary/10 flex items-center gap-3 text-sm text-text-muted">
          <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
          <p>
            Hai dubbi sui tuoi diritti o vuoi esercitarli? Scrivici a{" "}
            <a href="mailto:privacy@smilelive.it" className="text-primary hover:underline">privacy@smilelive.it</a>.
          </p>
        </div>
      </article>

      <PiedeSito />
    </main>
  );
}

// Testata e piede comuni a tutte le pagine di testo (legali e guide).
export function TestataSito() {
  return (
    <header className="border-b border-secondary/10">
      <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          {/* Il file del logo ha molto margine: si ritaglia come nella testata della home, alla stessa grandezza. */}
          <img src={logoFinale} alt="SmileLive" className="w-[clamp(104px,30vw,128px)] h-[clamp(34px,9.77vw,42px)] sm:w-[172px] sm:h-[56px] object-cover object-[center_55%]" width="172" height="56" />
        </Link>
        <Link
          to="/"
          className="flex items-center gap-1 text-sm text-text-muted hover:text-primary transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Torna alla home
        </Link>
      </div>
    </header>
  );
}

export function PiedeSito() {
  return (
    <footer className="py-10 border-t border-secondary/10 text-sm text-text-muted">
      <div className="max-w-3xl mx-auto px-6 flex flex-col items-center gap-4">
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          <Link to="/chi-siamo" className="hover:text-primary transition-colors">Chi siamo</Link>
          <span>·</span>
          <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <span>·</span>
          <Link to="/cookie-policy" className="hover:text-primary transition-colors">Cookie Policy</Link>
          <span>·</span>
          <Link to="/terms" className="hover:text-primary transition-colors">Termini di Servizio</Link>
          <span>·</span>
          <button type="button" onClick={openCookieBanner} className="hover:text-primary transition-colors">
            Gestione cookie
          </button>
          <span>·</span>
          <a href="mailto:supporto@smilelive.it" className="hover:text-primary transition-colors">Contatti</a>
        </div>
        <p className="text-xs text-text-muted/60">© {new Date().getFullYear()} SmileLive · P.IVA 09125450727 · REA BA-673495. Tutti i diritti riservati.</p>
      </div>
    </footer>
  );
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl md:text-2xl font-headline font-bold text-text-main pt-4">{title}</h2>
      {children}
    </section>
  );
}

export function Subsection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-2 mt-4">
      <h3 className="text-base md:text-lg font-bold text-text-main">{title}</h3>
      {children}
    </div>
  );
}

