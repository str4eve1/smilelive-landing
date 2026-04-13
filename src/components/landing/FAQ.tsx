import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState } from "react";

const faqs = [
  {
    q: "Le simulazioni sembrano reali o fanno sembrare possibili cose impossibili?",
    a: "Le simulazioni sono calibrate su parametri fisiologici reali. Mostrano risultati raggiungibili con i trattamenti che proponi — non promesse impossibili. Questo protegge sia te che il paziente.",
  },
  {
    q: "I dati dei miei pazienti sono al sicuro?",
    a: "Le immagini non vengono mai salvate. Vengono elaborate e restituite in tempo reale. Nessun archivio, nessun database di immagini. Conforme GDPR by design.",
  },
  {
    q: "Quanto tempo ci vuole per impararlo?",
    a: "La maggior parte dei dentisti lo integra nel flusso di visita in meno di un'ora. Non richiede competenze tecniche.",
  },
  {
    q: "Funziona sul tablet che uso in sala visita?",
    a: "Sì, da qualsiasi browser su qualsiasi device. Nessuna installazione.",
  },
  {
    q: "Cosa succede dopo i 14 giorni di prova?",
    a: "Ti chiediamo se vuoi continuare. Nessun addebito automatico senza conferma.",
  },
  {
    q: "Posso usarlo su più riuniti o condividerlo con il team?",
    a: "Il piano Clinic include accesso multi-utente. Il piano PRO è per un singolo account.",
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`reveal stagger-${Math.min(index + 1, 5)} border-b border-border/50`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="font-display font-semibold text-sm md:text-base pr-4 group-hover:text-primary transition-colors">{q}</span>
        <span className={`text-muted-foreground transition-transform duration-300 shrink-0 ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-40 pb-5' : 'max-h-0'}`}>
        <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="section-padding py-20 md:py-28 noise-bg">
      <div className="max-w-2xl mx-auto relative z-10">
        <h2 className="reveal font-display font-extrabold text-3xl md:text-5xl tracking-tight text-center mb-14">
          Hai ancora dubbi? Leggi qui.
        </h2>
        {faqs.map((faq, i) => <FAQItem key={i} {...faq} index={i} />)}
      </div>
    </section>
  );
}
