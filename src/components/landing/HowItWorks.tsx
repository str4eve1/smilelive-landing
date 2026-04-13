import { useScrollReveal } from "@/hooks/useScrollReveal";

const steps = [
  { num: "01", title: "Carichi", desc: "La foto del paziente. Basta quella. Nessuna attrezzatura speciale." },
  { num: "02", title: "Mostri", desc: "La simulazione AI del sorriso finale. Realistica, calibrata sulla fisiologia reale. Non promesse impossibili — risultati credibili." },
  { num: "03", title: "Converti", desc: "Il paziente vede il suo sorriso. Non immagina più — vede. Il tasso di accettazione sale." },
];

export default function HowItWorks() {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="section-padding py-20 md:py-28 noise-bg">
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="reveal font-display font-extrabold text-3xl md:text-5xl tracking-tight text-center mb-4">
          Un sistema. Impari in un'ora.
        </h2>
        <p className="reveal stagger-1 text-center text-muted-foreground text-lg mb-16">Usi per ogni consulenza.</p>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent -translate-x-1/2" />

          <div className="flex flex-col gap-12 md:gap-16">
            {steps.map((step, i) => (
              <div key={i} className={`reveal stagger-${i + 1} flex flex-col md:flex-row items-center gap-6 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className="flex-1 text-center md:text-left">
                  <span className="font-display font-extrabold text-5xl text-gradient-cyan opacity-60">{step.num}</span>
                  <h3 className="font-display font-bold text-xl mt-1 mb-2">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto md:mx-0">{step.desc}</p>
                </div>
                <div className="relative z-10 w-14 h-14 rounded-full bg-card glow-border-strong flex items-center justify-center shrink-0">
                  <span className="font-display font-bold text-primary text-lg">{step.num}</span>
                </div>
                <div className="flex-1" />
              </div>
            ))}
          </div>
        </div>

        <div className="reveal mt-14 card-surface p-5 md:p-6 text-center max-w-2xl mx-auto glow-border">
          <p className="text-sm text-secondary-foreground leading-relaxed font-serif italic">
            Le simulazioni sono calibrate su parametri fisiologici reali. Non mostrano risultati impossibili — mostrano risultati raggiungibili.
            Questo protegge te da aspettative errate e rinforza la fiducia del paziente.
          </p>
        </div>
      </div>
    </section>
  );
}
