import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie, X } from "lucide-react";
import {
  ALL_ACCEPTED,
  ALL_REJECTED,
  getConsent,
  onOpenCookieBanner,
  saveConsent,
  type ConsentChoices,
} from "@/lib/consent";

export default function CookieBanner() {
  const [open, setOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [choices, setChoices] = useState<ConsentChoices>(ALL_ACCEPTED);

  // Mount: open if no consent stored yet
  useEffect(() => {
    const existing = getConsent();
    if (!existing) {
      setOpen(true);
    } else {
      setChoices(existing.choices);
    }
  }, []);

  // Listen for "Gestione cookie" trigger from footer
  useEffect(() => {
    const off = onOpenCookieBanner(() => {
      const existing = getConsent();
      if (existing) setChoices(existing.choices);
      setShowDetails(true);
      setOpen(true);
    });
    return off;
  }, []);

  const acceptAll = () => {
    saveConsent(ALL_ACCEPTED);
    setOpen(false);
    setShowDetails(false);
  };

  const rejectAll = () => {
    saveConsent(ALL_REJECTED);
    setOpen(false);
    setShowDetails(false);
  };

  const saveCustom = () => {
    saveConsent(choices);
    setOpen(false);
    setShowDetails(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-x-0 bottom-0 z-[100] p-3 md:p-4"
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-banner-title"
        >
          {/* Altezza massima + scorrimento interno: con «Personalizza» aperto, su telefono
              il riquadro usciva dallo schermo in alto e non si poteva scorrere. */}
          <div className="max-w-5xl mx-auto max-h-[calc(100dvh-1.5rem)] overflow-y-auto overscroll-contain bg-background/95 backdrop-blur-xl border border-secondary/20 rounded-2xl shadow-2xl">
            {/* Su telefono il banner è compatto (testo breve, due bottoni affiancati):
                a 360×640 copriva tre quarti dello schermo, titolo della pagina compreso.
                Le tre scelte restano tutte al primo livello. */}
            <div className="p-4 sm:p-5 md:p-6">
              <div className="flex items-start gap-3 mb-3 sm:mb-4">
                <div className="hidden sm:flex w-10 h-10 shrink-0 rounded-full bg-primary/10 items-center justify-center">
                  <Cookie className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 id="cookie-banner-title" className="font-headline font-bold text-lg text-text-main mb-1">
                    Privacy e cookie
                  </h2>
                  <p className="text-sm text-text-muted leading-relaxed">
                    Usiamo cookie tecnici essenziali e, con il tuo consenso, cookie di statistica e marketing
                    <span className="hidden sm:inline"> per migliorare il sito e personalizzare gli annunci</span>.
                    <span className="hidden sm:inline">
                      {" "}Puoi accettare tutti, rifiutare tutti o scegliere quali categorie attivare. Cambierai idea
                      quando vuoi dal link "Gestione cookie" in fondo alla pagina.
                    </span>
                    {" "}
                    <a href="/privacy" className="underline hover:text-primary transition-colors">Privacy Policy</a>
                    {" · "}
                    <a href="/cookie-policy" className="underline hover:text-primary transition-colors">Cookie Policy</a>
                  </p>
                </div>
                {showDetails && (
                  <button
                    type="button"
                    onClick={() => setShowDetails(false)}
                    className="shrink-0 p-1 text-text-muted hover:text-text-main transition-colors"
                    aria-label="Chiudi dettagli"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mb-5 space-y-3 overflow-hidden"
                >
                  <CategoryRow
                    title="Essenziali"
                    description="Cookie tecnici necessari al funzionamento del sito (es. preferenza cookie). Sempre attivi."
                    locked
                    enabled
                  />
                  <CategoryRow
                    title="Statistica"
                    description="PostHog — ci aiuta a capire come usi il sito (pagine viste, click, errori) per migliorarlo. I dati sono aggregati."
                    enabled={choices.statistics}
                    onToggle={(v) => setChoices((c) => ({ ...c, statistics: v }))}
                  />
                  <CategoryRow
                    title="Marketing"
                    description="Meta Pixel — permette di mostrarti annunci pertinenti su Facebook/Instagram e misurare l'efficacia delle campagne."
                    enabled={choices.marketing}
                    onToggle={(v) => setChoices((c) => ({ ...c, marketing: v }))}
                  />
                </motion.div>
              )}

              {/* Telefono: Accetta e Rifiuta affiancati e grandi uguali, Personalizza sotto. Da sm in su: come prima. */}
              <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={acceptAll}
                  className="min-h-[44px] px-5 py-2.5 rounded-full bg-primary text-text-main font-bold text-sm hover:scale-[1.02] active:scale-95 transition-transform shadow-[0_0_20px_rgba(14,165,233,0.3)]"
                >
                  Accetta tutti
                </button>
                {showDetails ? (
                  <button
                    type="button"
                    onClick={saveCustom}
                    className="col-span-2 order-last sm:order-none min-h-[44px] px-5 py-2.5 rounded-full border border-primary/30 bg-primary/10 hover:bg-primary/20 transition-colors font-medium text-sm text-primary"
                  >
                    Salva preferenze
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowDetails(true)}
                    className="col-span-2 order-last sm:order-none min-h-[44px] px-5 py-2.5 rounded-full border border-transparent sm:border-secondary/30 bg-transparent hover:bg-secondary/5 transition-colors font-medium text-sm text-text-main underline sm:no-underline"
                  >
                    Personalizza
                  </button>
                )}
                <button
                  type="button"
                  onClick={rejectAll}
                  className="min-h-[44px] px-5 py-2.5 rounded-full border border-secondary/30 bg-transparent hover:bg-secondary/5 transition-colors font-medium text-sm text-text-main"
                >
                  Rifiuta tutti
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type CategoryRowProps = {
  title: string;
  description: string;
  enabled: boolean;
  locked?: boolean;
  onToggle?: (value: boolean) => void;
};

function CategoryRow({ title, description, enabled, locked, onToggle }: CategoryRowProps) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-elevated/50 border border-secondary/10">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-bold text-sm text-text-main">{title}</span>
          {locked && (
            <span className="text-[10px] uppercase tracking-widest font-bold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">
              Sempre attivi
            </span>
          )}
        </div>
        <p className="text-xs text-text-muted leading-relaxed">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        disabled={locked}
        onClick={() => !locked && onToggle?.(!enabled)}
        className={`shrink-0 relative w-11 h-6 rounded-full transition-colors duration-200 ${
          enabled ? "bg-primary" : "bg-secondary/30"
        } ${locked ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
        aria-label={`Attiva ${title}`}
      >
        <span
          className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-200 ${
            enabled ? "translate-x-[22px]" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}
