import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState } from "react";

export default function ROICalculator() {
  const ref = useScrollReveal();
  const [value, setValue] = useState(1000);
  const annualCost = 79 * 12; // PRO annual
  const treatmentsNeeded = Math.ceil(annualCost / value);
  const weeksNeeded = Math.ceil((treatmentsNeeded / 12) * 52);

  return (
    <section ref={ref} id="roi" className="section-padding py-20 md:py-28">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="reveal font-display font-extrabold text-3xl md:text-5xl tracking-tight mb-4">
          Un trattamento in più al mese copre l'abbonamento annuale.
        </h2>
        <p className="reveal stagger-1 text-muted-foreground text-lg mb-12">Calcola il tuo ROI in 5 secondi.</p>

        <div className="reveal stagger-2 card-surface glow-border p-8 md:p-10">
          <label className="block text-sm text-muted-foreground mb-3">
            Valore medio trattamento estetico nel tuo studio
          </label>
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-muted-foreground text-sm">€500</span>
            <input
              type="range"
              min={500}
              max={2000}
              step={50}
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="flex-1 max-w-xs h-1.5 bg-secondary rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-[0_0_12px_hsl(190_100%_55%/0.4)] [&::-webkit-slider-thumb]:transition-shadow"
            />
            <span className="text-muted-foreground text-sm">€2.000</span>
          </div>
          <p className="font-display font-extrabold text-2xl mb-6 text-gradient-cyan tabular-nums">
            €{value.toLocaleString("it-IT")}
          </p>

          <div className="bg-background/50 rounded-lg p-5 border border-border/50 mb-4">
            <p className="text-foreground text-lg leading-relaxed">
              Basta <strong className="text-primary font-display font-bold text-2xl">{treatmentsNeeded}</strong> pazient{treatmentsNeeded === 1 ? 'e' : 'i'} in più ogni{" "}
              <strong className="text-primary font-display font-bold">{weeksNeeded <= 52 ? `${weeksNeeded} settiman${weeksNeeded === 1 ? 'a' : 'e'}` : 'anno'}</strong>{" "}
              per coprire i costi.
            </p>
          </div>
          <p className="text-sm text-muted-foreground font-serif italic">
            I tuoi colleghi ne convertono in media 3 in più al mese.
          </p>
        </div>
      </div>
    </section>
  );
}
