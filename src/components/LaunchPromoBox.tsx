import { WhatsappLogo } from "@phosphor-icons/react";
import { trackCta } from "@/lib/analytics";
import { DEFAULT_PHONE, DEMO_TEXT } from "@/components/WhatsAppWidget";

// Box della promozione «primi 100 studi», sotto la griglia dei prezzi (solo modalità listino).
// Testi approvati, alla lettera. Nessuna cifra, nessun contatore di posti, nessuna scadenza:
// le condizioni si comunicano dopo la demo.
const DEMO_HREF = `https://wa.me/${DEFAULT_PHONE}?text=${encodeURIComponent(DEMO_TEXT)}`;

export default function LaunchPromoBox() {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-[0_10px_35px_rgba(15,23,42,0.06)] p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
      <div className="flex-1 min-w-0">
        <h3 className="text-xl font-bold mb-2 text-text-main">Promozione di lancio per i primi 100 studi</h3>
        <p className="text-sm text-text-muted leading-relaxed">
          Chi attiva dopo la demo mantiene per sempre il prezzo di lancio, finché l'abbonamento resta attivo. Le condizioni te le comunica direttamente il fondatore.
        </p>
      </div>
      <a
        href={DEMO_HREF}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackCta("prenota_demo", "pricing_promo")}
        className="shrink-0 inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-3 rounded-full text-sm font-bold text-white whitespace-nowrap hover:brightness-105 transition-all"
        style={{ background: "linear-gradient(135deg,#38bdf8,#4f46e5)", boxShadow: "0 8px 22px #2563eb55" }}
      >
        <WhatsappLogo size={18} weight="fill" aria-hidden="true" />
        Prenota la demo
      </a>
    </div>
  );
}
