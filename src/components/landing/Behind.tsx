import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Behind() {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="section-padding py-20 md:py-28">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="reveal font-display font-extrabold text-3xl md:text-4xl tracking-tight mb-6">
          Chi c'è dietro
        </h2>
        <p className="reveal stagger-1 text-secondary-foreground leading-relaxed mb-8 font-serif italic max-w-xl mx-auto">
          "Non vendo teoria. Ho costruito questo sistema lavorando fianco a fianco con studi dentistici reali, su problemi reali di consulenza."
        </p>
        <div className="reveal stagger-2 grid grid-cols-2 gap-3 max-w-lg mx-auto">
          {[
            "Sviluppato con il feedback di 200+ dentisti italiani",
            "Testato su casi reali: faccette, sbiancamento, ortodonzia",
            "GDPR nativo — conforme dal primo giorno",
            "Aggiornato con i modelli AI più accurati",
          ].map((item, i) => (
            <div key={i} className="card-surface p-3 text-xs text-secondary-foreground flex items-start gap-2">
              <span className="text-primary shrink-0">📌</span> {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
