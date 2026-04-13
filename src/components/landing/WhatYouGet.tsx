import { useScrollReveal } from "@/hooks/useScrollReveal";

const items = [
  { icon: "🦷", title: "Simulatore AI sorriso", desc: "Before/after realistici in 10 secondi", value: "€297" },
  { icon: "📋", title: "Workflow di consulenza", desc: "Come integrarlo nella visita senza rallentarla", value: "€97" },
  { icon: "🔒", title: "GDPR nativo", desc: "Nessun dato salvato, nessun rischio legale", value: "incluso" },
  { icon: "📱", title: "Accesso da qualsiasi browser", desc: "Nessuna installazione, funziona su tablet in sala visita", value: "incluso" },
];

export default function WhatYouGet() {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="section-padding py-20 md:py-28 noise-bg">
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="reveal font-display font-extrabold text-3xl md:text-5xl tracking-tight text-center mb-14">
          Tutto quello che ti serve.{" "}
          <span className="text-muted-foreground">Niente di superfluo.</span>
        </h2>

        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {items.map((item, i) => (
            <div key={i} className={`reveal stagger-${i + 1} card-surface p-5 flex gap-4 items-start hover:border-primary/20 transition-all duration-300`}>
              <span className="text-xl mt-0.5">{item.icon}</span>
              <div className="flex-1">
                <h3 className="font-display font-bold text-sm mb-0.5">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <span className="text-xs font-display font-semibold text-gold whitespace-nowrap">{item.value}</span>
            </div>
          ))}
        </div>

        <div className="reveal text-center">
          <p className="text-muted-foreground mb-2">
            Totale valore: <span className="line-through">€394</span>
          </p>
          <p className="font-display font-extrabold text-2xl mb-6">
            Solo <span className="text-gradient-cyan">€79/mese</span> annuale
          </p>
          <a href="#pricing" className="inline-block bg-primary text-primary-foreground font-display font-bold px-8 py-3.5 rounded-lg hover:shadow-[0_0_30px_hsl(190_100%_55%/0.3)] transition-all duration-300 active:scale-[0.97]">
            Inizia gratis 14 giorni
          </a>
        </div>
      </div>
    </section>
  );
}
