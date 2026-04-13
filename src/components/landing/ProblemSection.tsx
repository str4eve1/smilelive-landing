import { useScrollReveal } from "@/hooks/useScrollReveal";

const pains = [
  {
    icon: "🗣️",
    title: '"Ci penso e ti faccio sapere"',
    text: "Il 60% dei pazienti indecisi non torna. Non perché non vogliano — perché non riescono a immaginare.",
  },
  {
    icon: "⏱️",
    title: "20 minuti di consulenza per ogni caso incerto",
    text: "Spieghi, mostri, convinci. Poi spieghi ancora. E non sempre funziona.",
  },
  {
    icon: "💸",
    title: "Un trattamento estetico perso al mese",
    text: "A €800-1.500 a caso, stiamo parlando di €10.000-18.000 l'anno che escono dallo studio.",
  },
];

export default function ProblemSection() {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="section-padding py-20 md:py-28">
      <div className="max-w-4xl mx-auto">
        <h2 className="reveal font-display font-extrabold text-3xl md:text-5xl leading-[1.05] tracking-tight text-center mb-4">
          Ogni settimana hai pazienti che "ci pensano".
        </h2>
        <p className="reveal stagger-1 text-center text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-6">
          Non è colpa loro. È colpa di come gli stai mostrando il risultato.
        </p>
        <p className="reveal stagger-2 text-center text-secondary-foreground max-w-2xl mx-auto mb-14 leading-relaxed">
          Il paziente che ieri ti ha detto "ci penso" non è indeciso. Non riesce a immaginare il risultato finale.
          Descrivi. Mostri foto su Google. Disegni su un foglio. Loro annuiscono. Poi escono e non tornano.
          Non è un problema di fiducia. <strong className="text-foreground">È un problema di visualizzazione.</strong>
        </p>

        <div className="grid md:grid-cols-3 gap-5">
          {pains.map((p, i) => (
            <div key={i} className={`reveal stagger-${i + 1} card-surface p-6 hover:border-primary/30 transition-all duration-300`}>
              <span className="text-2xl block mb-3">{p.icon}</span>
              <h3 className="font-display font-bold text-base mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
