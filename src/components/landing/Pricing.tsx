import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState } from "react";

const plans = [
  {
    name: "Starter",
    monthly: 49,
    annual: null,
    badge: null,
    note: "Perfetto per iniziare — aggiorna quando vuoi",
    cta: "Inizia gratis",
    features: ["Simulazioni base", "1 utente", "Supporto email"],
  },
  {
    name: "PRO",
    monthly: 89,
    annual: 79,
    badge: "Più scelto dagli studi",
    note: "Un trattamento in più copre i costi",
    cta: "Prova gratis 14 giorni",
    features: ["Simulazioni illimitate", "1 utente", "Supporto prioritario", "Workflow consulenza"],
    highlighted: true,
  },
  {
    name: "Clinic",
    monthly: 149,
    annual: 129,
    badge: null,
    note: "Per team e multi-riuniti — contattaci per demo",
    cta: "Richiedi una demo",
    features: ["Tutto del PRO", "Multi-utente", "Account manager dedicato", "Onboarding personalizzato"],
  },
];

export default function Pricing() {
  const ref = useScrollReveal();
  const [annual, setAnnual] = useState(true);

  return (
    <section ref={ref} id="pricing" className="section-padding py-20 md:py-28">
      <div className="max-w-5xl mx-auto">
        <h2 className="reveal font-display font-extrabold text-3xl md:text-5xl tracking-tight text-center mb-10">
          Scegli il tuo piano
        </h2>

        {/* Toggle */}
        <div className="reveal stagger-1 flex items-center justify-center gap-3 mb-14">
          <span className={`text-sm transition-colors ${!annual ? 'text-foreground' : 'text-muted-foreground'}`}>Mensile</span>
          <button
            onClick={() => setAnnual(!annual)}
            className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${annual ? 'bg-primary' : 'bg-secondary'}`}
            aria-label="Toggle pricing"
          >
            <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-primary-foreground transition-transform duration-300 ${annual ? 'left-[26px]' : 'left-0.5'}`} />
          </button>
          <span className={`text-sm transition-colors ${annual ? 'text-foreground' : 'text-muted-foreground'}`}>
            Annuale <span className="text-primary text-xs font-semibold">Risparmia</span>
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {plans.map((plan, i) => {
            const price = annual && plan.annual ? plan.annual : plan.monthly;
            const saving = annual && plan.annual ? (plan.monthly - plan.annual) * 12 : null;

            return (
              <div
                key={i}
                className={`reveal stagger-${i + 1} relative card-surface p-6 md:p-7 flex flex-col ${plan.highlighted ? 'glow-border-strong md:scale-105' : 'hover:border-primary/20'} transition-all duration-300`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-display font-bold uppercase tracking-widest px-3 py-1 rounded-full whitespace-nowrap">
                    🔥 {plan.badge}
                  </span>
                )}
                <h3 className="font-display font-bold text-lg mb-1">{plan.name}</h3>
                <div className="mb-4">
                  <span className="font-display font-extrabold text-4xl tabular-nums">{price}€</span>
                  <span className="text-muted-foreground text-sm">/mese</span>
                  {saving && (
                    <p className="text-xs text-primary mt-1">Risparmi €{saving}/anno</p>
                  )}
                </div>
                <ul className="flex-1 mb-6 space-y-2">
                  {plan.features.map((f, j) => (
                    <li key={j} className="text-sm text-secondary-foreground flex items-start gap-2">
                      <span className="text-primary text-xs mt-1">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#"
                  className={`block text-center font-display font-bold text-sm py-3 rounded-lg transition-all duration-300 active:scale-[0.97] ${
                    plan.highlighted
                      ? 'bg-primary text-primary-foreground hover:shadow-[0_0_30px_hsl(190_100%_55%/0.3)]'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {plan.cta}
                </a>
                <p className="text-[11px] text-muted-foreground mt-3 text-center font-serif italic">{plan.note}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
