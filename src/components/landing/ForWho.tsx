import { useScrollReveal } from "@/hooks/useScrollReveal";

const personas = [
  { icon: "🦷", title: "Dentista generalista", desc: "Vuoi aumentare i casi estetici senza cambiare il tuo workflow." },
  { icon: "💎", title: "Specialista estetica", desc: "Hai già i pazienti. Ti manca lo strumento che li fa decidere." },
  { icon: "🏥", title: "Clinic manager", desc: "Vuoi uno standard di consulenza che funzioni su tutto il team." },
  { icon: "🎓", title: "Studio giovane", desc: "Stai costruendo la tua base pazienti e vuoi differenziarti subito." },
  { icon: "🔧", title: "Ortodontista / implantologo", desc: "Vuoi integrare la visualizzazione nel percorso di accettazione del piano." },
];

export default function ForWho() {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="section-padding py-20 md:py-28">
      <div className="max-w-4xl mx-auto">
        <h2 className="reveal font-display font-extrabold text-3xl md:text-5xl tracking-tight text-center mb-14">
          Sei uno di loro?
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {personas.map((p, i) => (
            <div key={i} className={`reveal stagger-${Math.min(i + 1, 5)} card-surface p-5 hover:border-primary/20 transition-all duration-300`}>
              <span className="text-xl block mb-2">{p.icon}</span>
              <h3 className="font-display font-bold text-sm mb-1">{p.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        <p className="reveal text-center text-secondary-foreground font-serif italic">
          Se ti riconosci anche in uno solo di questi — questo strumento è stato costruito per te.
        </p>
      </div>
    </section>
  );
}
