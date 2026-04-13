import { useCountUp } from "@/hooks/useCountUp";

const stats = [
  { icon: "🦷", end: 1200, suffix: "+", label: "studi dentistici attivi" },
  { icon: "📈", end: 67, suffix: "%", prefix: "+", label: "tasso di accettazione medio" },
  { icon: "⚡", end: 10, suffix: " sec", label: "per ogni simulazione" },
  { icon: "💰", end: 4800, suffix: "", prefix: "€", label: "risparmiati in media ogni anno" },
];

function StatItem({ icon, end, suffix, prefix, label }: typeof stats[number]) {
  const { count, ref } = useCountUp(end, 2200);
  return (
    <div ref={ref} className="text-center">
      <span className="text-2xl mb-2 block">{icon}</span>
      <span className="font-display font-extrabold text-3xl md:text-4xl text-gradient-cyan tabular-nums animate-counter-glow">
        {prefix}{count.toLocaleString("it-IT")}{suffix}
      </span>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </div>
  );
}

export default function AnimatedCounters() {
  return (
    <section className="section-padding py-16 md:py-20 border-y border-border/50">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
        {stats.map((s) => <StatItem key={s.label} {...s} />)}
      </div>
    </section>
  );
}
