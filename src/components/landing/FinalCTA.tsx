import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function FinalCTA() {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="section-padding py-20 md:py-28 noise-bg">
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2 className="reveal font-display font-extrabold text-3xl md:text-5xl tracking-tight leading-[1.05] mb-6">
          Il prossimo paziente che ti dice "ci penso"{" "}
          <span className="text-gradient-cyan">potrebbe dirti sì.</span>
        </h2>
        <p className="reveal stagger-1 text-lg text-muted-foreground mb-8">
          Se gli mostri il risultato.
        </p>
        <div className="reveal stagger-2">
          <a href="#pricing" className="inline-block bg-primary text-primary-foreground font-display font-bold text-base md:text-lg px-10 py-4 rounded-lg hover:shadow-[0_0_40px_hsl(190_100%_55%/0.35)] transition-all duration-300 active:scale-[0.97]">
            Prova gratis 14 giorni — nessuna carta richiesta
          </a>
          <p className="text-xs text-muted-foreground mt-4 flex flex-wrap items-center justify-center gap-3">
            <span>🔒 Accesso immediato</span>
            <span>·</span>
            <span>Nessun abbonamento automatico</span>
            <span>·</span>
            <span>GDPR Compliant</span>
            <span>·</span>
            <span>Cancelli quando vuoi</span>
          </p>
        </div>
      </div>
    </section>
  );
}
