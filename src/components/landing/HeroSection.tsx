import { motion, type Variants } from "framer-motion";
import BeforeAfterSlider from "@/components/landing/BeforeAfterSlider";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

export default function TopBar() {
  return (
    <motion.div 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50"
    >
      <div className="max-w-7xl mx-auto section-padding py-2.5 flex items-center justify-between text-xs md:text-sm">
        <div className="flex items-center gap-2">
          <span className="text-base">🦷</span>
          <span className="font-display font-bold text-foreground tracking-wide">SmileLive</span>
        </div>
        <p className="hidden md:block text-muted-foreground">
          Già usato da <span className="text-foreground font-medium">1.200+ studi</span> dentistici italiani · Prova gratuita 14 giorni · Nessuna carta richiesta
        </p>
        <a href="#pricing" className="font-display font-semibold text-primary hover:text-primary/80 transition-colors">
          Prova gratis →
        </a>
      </div>
    </motion.div>
  );
}

export function HeroSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 15 }
    },
  };

  const badgeVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 10, delay: 0.2 }
    }
  };

  return (
    <section className="relative section-padding pt-16 pb-20 md:pt-24 md:pb-28 noise-bg overflow-hidden">
      {/* Abstract Glowing Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
        >
          <motion.div variants={badgeVariants} className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              <span>Il futuro dell'odontoiatria è qui</span>
            </div>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold leading-[1.05] tracking-tight mb-6"
          >
            Mostra al paziente il <br className="hidden md:block" /> sorriso finale.{" "}
            <span className="text-gradient-cyan relative inline-block">
              Prima ancora
              {/* Underline highlight */}
              <motion.span 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-cyan-400 origin-left rounded-full"
              />
            </span>{" "}
            di iniziare.
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8"
          >
            Carica una foto. L'AI genera la simulazione in 10 secondi.
            Il paziente vede. Capisce. Accetta il piano.
          </motion.p>

          <motion.ul 
            variants={itemVariants}
            className="flex flex-col gap-3 text-sm md:text-base text-secondary-foreground mb-10 max-w-lg mx-auto text-left"
          >
            {[
              "Da foto a simulazione professionale in meno di un minuto.",
              "Funziona per faccette, sbiancamento, ortodonzia, full-mouth.",
              "Da browser. Nessuna installazione. Nessun dato salvato."
            ].map((text, i) => (
              <motion.li 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + (i * 0.1) }}
                className="flex items-start gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" /> 
                <span>{text}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block"
          >
            <a href="#pricing" className="group relative inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-display font-bold text-base md:text-lg px-8 py-4 rounded-xl hover:shadow-[0_0_40px_hsl(190_100%_55%/0.4)] transition-all duration-300 overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                Prova gratis 14 giorni
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              {/* Shine effect */}
              <motion.div 
                animate={{ x: ["-100%", "200%"] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "linear", repeatDelay: 3 }}
                className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
              />
            </a>
            <p className="text-xs text-muted-foreground mt-4">Accesso immediato. Nessuna carta richiesta.</p>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 50, damping: 20 }}
          className="relative mt-12 md:mt-16"
        >
          {/* Decorative frame for slider */}
          <div className="absolute -inset-1 bg-gradient-to-b from-primary/20 to-transparent rounded-2xl blur-xl" />
          <div className="relative rounded-2xl border border-white/10 bg-background/50 backdrop-blur-sm p-2 shadow-2xl">
            <BeforeAfterSlider />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
