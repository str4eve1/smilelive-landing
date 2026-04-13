import { useScrollReveal } from "@/hooks/useScrollReveal";

const testimonials = [
  {
    name: "Dr. Marco Venturi",
    role: "Odontoiatra · Milano",
    quote: "Ero scettico — pensavo generasse simulazioni irrealistiche che avrebbero creato aspettative sbagliate nei pazienti. Invece i risultati sono calibrati e credibili. Il primo mese ho chiuso 4 casi che prima avrei perso.",
    result: "4 trattamenti aggiuntivi al primo mese",
  },
  {
    name: "Dr.ssa Chiara Ferretti",
    role: "Estetica dentale · Roma",
    quote: "Il 'ci penso' era il mio problema principale. Ora quando un paziente esita, gli mostro la simulazione. Il 70% dei casi si chiude in quella stessa visita.",
    result: "Tasso di chiusura immediata passato al 70%",
  },
  {
    name: "Dr. Stefano Ricci",
    role: "Studio associato · Bologna",
    quote: "Lo usiamo su tutti e tre i riuniti. Ogni dentista del team ha lo stesso processo. La qualità della consulenza è salita e i 'ci penso' sono quasi spariti.",
    result: "Adottato su 3 riuniti, 0 problemi di implementazione",
  },
  {
    name: "Dr.ssa Anna Conte",
    role: "Clinica privata · Napoli",
    quote: "Pensavo fosse complicato da imparare. L'ho integrato nel flusso di visita in un pomeriggio. I pazienti lo adorano — molti chiedono di portarlo a casa per mostrarlo ai familiari.",
    result: "Setup completato in mezza giornata",
  },
];

export default function Testimonials() {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="section-padding py-20 md:py-28 noise-bg">
      <div className="max-w-5xl mx-auto relative z-10">
        <h2 className="reveal font-display font-extrabold text-3xl md:text-5xl tracking-tight text-center mb-14">
          Cosa dicono i tuoi colleghi
        </h2>

        <div className="grid md:grid-cols-2 gap-5">
          {testimonials.map((t, i) => (
            <div key={i} className={`reveal stagger-${Math.min(i + 1, 4)} card-surface p-6 hover:border-primary/20 transition-all duration-300`}>
              <div className="flex items-center gap-1 mb-3 text-gold text-sm">★★★★★</div>
              <blockquote className="text-sm text-secondary-foreground leading-relaxed mb-4 font-serif italic">
                "{t.quote}"
              </blockquote>
              <div className="flex items-center justify-between border-t border-border/50 pt-3">
                <div>
                  <p className="font-display font-bold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
                <span className="text-[10px] text-primary font-display font-semibold bg-primary/10 px-2 py-1 rounded">
                  → {t.result}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
