import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, ChevronLeft, Sparkles, Activity, ShieldCheck, 
  Smartphone, PlayCircle, Star, TrendingUp, Users, Target, CheckCircle2, Award, Zap, Camera, Check, Volume2, VolumeX
} from "lucide-react";
import beforeImg from '../assets/WEBP/PRIMA (2).webp';
import afterImg from '../assets/WEBP/DOPO (2).webp';
import emotionalVideo from '../assets/Video Per SITO 1080p 3-HACDulAw_compressed.mp4';

import logoBerlinesi from '../assets/LOGHI STUDI WEBP/BERLINESI 2 (1).png';
import logoFerretti from '../assets/LOGHI STUDI WEBP/FERRETTI GIACOMO.png';
import logoLaterza from '../assets/LOGHI STUDI WEBP/LATERZA (1).png';
import logoRanieri from '../assets/LOGHI STUDI WEBP/RANIERI (1).png';
import logoSMILE from '../assets/LOGHI STUDI WEBP/CLINICA DENTALE SAN MICHELE.png';
import logoAlvise from '../assets/LOGHI STUDI WEBP/ALVISE LI FONTI.png';
import logoEmanuele from '../assets/LOGHI STUDI WEBP/EMANUELE CALABRESI.png';
import logoAurelio from '../assets/LOGHI STUDI WEBP/AURELIO TRENITINI.png';

// Immagini per la sezione trattamenti
import imgSbiancamento from '../assets/WEBP/Sbiancamento prima e dopo2.webp';
import imgFaccette from '../assets/WEBP/FACCETTE (1).jpeg';
import imgImpianti from '../assets/WEBP/DOPO (2).webp'; // Temporaneo in attesa dell'immagine corretta
import imgOrtodonzia from '../assets/WEBP/TERMOSTAMPATA-CrUanAGb.jpg';
import logoFinale from '../assets/WEBP/SmileLive FINALE senza sfondo COLORI CORRETTI (1).webp';

const EmotionalVideo = () => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [imgAlign, setImgAlign] = useState({ x: 0, y: 0, scale: 1 });
  const sliderRef = useRef<HTMLDivElement>(null);
  
  // Imposta a true per mostrare i controlli di allineamento (X, Y, Scala)
  const showAlignmentControls = false;

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const updateSliderPosition = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('.alignment-controls')) return;
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updateSliderPosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updateSliderPosition(e.clientX);
  };

  const handlePointerUp = () => setIsDragging(false);

  const handleSliderKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      setSliderPosition((value) => Math.max(0, value - 5));
    }
    if (e.key === "ArrowRight") {
      setSliderPosition((value) => Math.min(100, value + 5));
    }
  };

  return (
    <section className="py-32 relative overflow-hidden bg-surface">
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Testo a sinistra */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass ghost-border border-primary/20 bg-primary/5">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-bold tracking-widest uppercase text-primary">L'Effetto Wow</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold leading-tight text-text-main">
            "Non ci credo... <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary italic font-serif font-normal">sono io!"</span>
          </h2>
          <p className="text-xl text-text-muted leading-relaxed">
            Visita finita. Piano di trattamento perfetto. Preventivo consegnato.<br/>
            <em className="text-text-main">"Ci penso e la richiamo, dottore."</em><br/>
            Porta che si chiude. Silenzio.
          </p>
          <p className="text-lg text-text-muted leading-relaxed">
            Non è che non volesse il trattamento. È che <strong className="text-text-main">non riusciva a vedersi con quel sorriso</strong>. Senza un'immagine concreta, la spesa sembra un salto nel buio.
          </p>
          <div className="pt-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-surface-elevated border border-secondary/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-gold" />
            </div>
            <p className="text-sm text-text-muted font-medium">
              L'emozione abbassa le barriere razionali <br/><strong className="text-text-main">e chiude il preventivo.</strong>
            </p>
          </div>
        </motion.div>

        {/* Slider Prima e Dopo (Spostato qui da sopra) */}
        <motion.div 
          initial={{ opacity: 0, y: 50, rotateZ: 2 }}
          whileInView={{ opacity: 1, y: 0, rotateZ: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto w-full max-w-[600px]"
        >
          <div className="relative w-full aspect-square rounded-[2rem] md:rounded-[2.5rem] overflow-hidden glass ghost-border shadow-2xl p-2 glow-cyan">
            <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-surface">
              <div 
                ref={sliderRef}
                className="group relative h-full w-full overflow-hidden select-none cursor-ew-resize"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onPointerLeave={handlePointerUp}
                onKeyDown={handleSliderKeyDown}
                role="slider"
                tabIndex={0}
                aria-label="Confronto prima e dopo"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(sliderPosition)}
                style={{ touchAction: "pan-y" }}
              >
                {/* AFTER Image */}
                <div className="absolute inset-0 w-full h-full bg-surface-elevated">
                  <img src={afterImg} alt="Sorriso Dopo" className="w-full h-full object-cover object-top" draggable="false" />
                </div>
                
                {/* BEFORE Image */}
                <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}>
                  {/* Il padding-top e il scale servono per allineare manualmente gli occhi del PRIMA rispetto al DOPO */}
                  <div className="absolute inset-y-0 left-0 w-full h-full bg-surface-elevated" style={{ width: `${sliderRef.current?.offsetWidth || 100}px` }}>
                    <img 
                      src={beforeImg} 
                      alt="Sorriso Prima" 
                      className="w-full h-full object-cover object-top origin-top transition-transform duration-75" 
                      draggable="false" 
                      style={{ 
                        transform: `scale(${imgAlign.scale}) translate(${imgAlign.x}%, ${imgAlign.y}%)` 
                      }}
                    />
                  </div>
                </div>
                
                {/* Alignment Controls Overlay */}
                {showAlignmentControls && (
                  <div className="alignment-controls absolute top-4 right-4 flex flex-col gap-2 z-50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-surface-elevated/60 backdrop-blur-md p-3 rounded-2xl border border-secondary/20 space-y-3 min-w-[140px]">
                      <div className="text-[10px] uppercase font-bold text-primary tracking-widest border-b border-secondary/20 pb-1 mb-2">Allineamento</div>
                      
                      {/* Y Axis */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] text-text-muted"><span>Sposta Y</span><span>{imgAlign.y.toFixed(1)}%</span></div>
                        <input type="range" aria-label="Sposta verticalmente l'immagine" min="-30" max="30" step="0.1" value={imgAlign.y} onChange={(e) => setImgAlign(p => ({...p, y: parseFloat(e.target.value)}))} className="w-full h-1 bg-secondary/20 rounded-lg appearance-none cursor-pointer accent-primary" />
                      </div>

                      {/* X Axis */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] text-text-muted"><span>Sposta X</span><span>{imgAlign.x.toFixed(1)}%</span></div>
                        <input type="range" aria-label="Sposta orizzontalmente l'immagine" min="-20" max="20" step="0.1" value={imgAlign.x} onChange={(e) => setImgAlign(p => ({...p, x: parseFloat(e.target.value)}))} className="w-full h-1 bg-secondary/20 rounded-lg appearance-none cursor-pointer accent-primary" />
                      </div>

                      {/* Scale */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] text-text-muted"><span>Scala</span><span>{imgAlign.scale.toFixed(2)}x</span></div>
                        <input type="range" aria-label="Scala l'immagine" min="0.8" max="1.5" step="0.01" value={imgAlign.scale} onChange={(e) => setImgAlign(p => ({...p, scale: parseFloat(e.target.value)}))} className="w-full h-1 bg-secondary/20 rounded-lg appearance-none cursor-pointer accent-primary" />
                      </div>

                      <button 
                        onClick={() => setImgAlign({x: 0, y: 0, scale: 1})}
                        className="w-full py-1.5 bg-primary/20 hover:bg-primary/30 text-primary text-[10px] font-bold rounded-lg transition-colors border border-primary/20"
                      >
                        RESET
                      </button>
                    </div>
                  </div>
                )}

                {/* Slider Handle */}
                <div className="pointer-events-none absolute top-0 bottom-0 -ml-[1px] w-[2px] bg-primary shadow-[0_0_10px_rgba(2,132,199,0.5)]" style={{ left: `${sliderPosition}%` }}>
                  <div className="absolute top-1/2 left-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_20px_rgba(2,132,199,0.5)] flex items-center justify-center text-text-main transition-transform md:h-12 md:w-12 group-hover:scale-110">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 9l-4 4 4 4"/><path d="M16 9l4 4-4 4"/></svg>
                </div>
                </div>

                {/* Labels */}
                <div className="absolute bottom-6 left-6 px-4 py-2 bg-background/80 backdrop-blur-md rounded-full text-xs uppercase tracking-widest text-text-main font-bold shadow-lg border border-secondary/20 pointer-events-none transition-opacity duration-300" style={{ opacity: sliderPosition > 20 ? 1 : 0 }}>Prima</div>
                <div className="absolute bottom-6 right-6 px-4 py-2 bg-primary/90 backdrop-blur-md rounded-full text-xs uppercase tracking-widest text-text-main font-bold shadow-lg pointer-events-none transition-opacity duration-300" style={{ opacity: sliderPosition < 80 ? 1 : 0 }}>Dopo</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// --- Components ---

const TopBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 inset-x-0 z-50 flex flex-col">
      {/* Announcement bar */}
      <div className="bg-primary text-background text-xs md:text-sm font-bold text-center py-2 px-4 flex items-center justify-center gap-2">
        <span>Il software è gratis. Per sempre.</span>
        <a href="#pricing" className="underline underline-offset-2 flex items-center gap-1 hover:opacity-80 transition-opacity">
          Inizia ora <ChevronRight className="w-3 h-3 inline" />
        </a>
      </div>
      {/* Nav */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-xl border-b border-secondary/10 py-3' : 'bg-transparent py-5'}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logoFinale} alt="SmileLive Logo" className="h-16 w-auto md:h-20 lg:h-24" fetchpriority="high" width="200" height="160" />
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-text-muted font-medium">
            <a href="#come-funziona" className="hover:text-primary transition-colors">Come funziona</a>
            <a href="#pricing" className="hover:text-primary transition-colors">Piani e Prezzi</a>
            <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
          </div>
          <div className="flex gap-4">
            <a href="#pricing" className="bg-primary/10 text-primary border border-primary/30 px-6 py-2 rounded-full font-bold text-sm hover:bg-primary hover:text-background transition-all">
              Inizia gratis
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const TrustMarquee = () => {
  // Recensioni complete e realistiche da mostrare con i loghi specificati
  const reviews = [
    {
      logo: logoBerlinesi,
      text: "Fantastico, il team è giovane e professionale. In pochissimo tempo il sistema è stato inserito nell'operatività della segreteria, e nel primo mese abbiamo fatto circa 30 preview che ci hanno portato in poltrona 3 casi extra: 6 faccette e 2 mock-up.",
      author: "Studi Associati Berlinesi"
    },
    {
      logo: logoLaterza,
      text: "Uso SmileLive ormai da sei mesi e non potrei farne a meno. La media è stabile: su 15 preview fatte dalla mia assistente in sala d'attesa, almeno un paziente prenota la visita estetica. Ottimo per aumentare le richieste spontanee.", 
      author: "Studio Dentistico Laterza"
    },
    {
      logo: logoFerretti,
      text: "Quello che apprezzo di più è che il software continua a migliorare. Le ragazze in reception lo propongono come se fosse un gioco, e noi ci troviamo i preventivi firmati sulla scrivania senza sforzo aggiuntivo.",
      author: "Dr. Giacomo Ferretti"
    },
    {
      logo: logoRanieri,
      text: "La nostra ASO ormai lo propone a chiunque entri per una detartrasi. Ci vogliono 10 secondi e il risultato lascia i pazienti a bocca aperta. Il mese scorso abbiamo chiuso 2 sbiancamenti e un ponte solo grazie alle preview.",
      author: "Studio Dentistico Ranieri"
    }
  ];
  
  // Duplichiamo per l'effetto loop continuo
  const items = [...reviews, ...reviews];

  return (
    <div className="w-full py-12 border-y border-secondary/10 bg-surface/50 overflow-hidden relative flex">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-surface/50 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-surface/50 to-transparent z-10 pointer-events-none"></div>
      
      <div className="flex animate-marquee min-w-max items-center gap-8 px-4" style={{ animationDuration: '60s' }}>
        {items.map((item, i) => (
          <div key={i} className="flex flex-col gap-4 bg-surface-elevated/50 border border-secondary/10 p-6 rounded-2xl w-[400px] md:w-[450px] shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between border-b border-secondary/10 pb-4">
              <div className="h-10 w-10 flex-shrink-0 bg-white rounded-full flex items-center justify-center overflow-hidden border border-secondary/20">
                <img src={item.logo} alt="Logo Partner" className="h-full w-full object-cover" width="40" height="40" loading="lazy" />
              </div>
              <div className="flex text-gold">
                {[1,2,3,4,5].map((star) => <Star key={star} className="w-4 h-4 fill-current" />)}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-text-main italic leading-relaxed mb-4">"{item.text}"</p>
              <p className="text-sm font-bold text-text-muted uppercase tracking-wider">{item.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <section className="relative overflow-x-clip pt-32 pb-24 mt-16 overflow-y-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-surface-elevated via-background to-background pointer-events-none -z-20"></div>
      <div className="absolute right-0 top-1/4 h-[320px] w-[320px] md:h-[800px] md:w-[800px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute left-0 bottom-1/4 h-[260px] w-[260px] md:h-[600px] md:w-[600px] bg-secondary/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center overflow-x-clip">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-8 relative z-10"
        >
          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-headline font-bold tracking-tight leading-[1.1] text-text-main">
            1 Foto. 1 Video. <br/>10 Secondi. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Il tuo staff converte.
            </span>
          </motion.h1>
          
          <motion.p variants={fadeUp} className="text-lg text-text-muted leading-relaxed max-w-lg">
            Ogni giorno escono dallo studio pazienti che volevano cambiare il loro sorriso. Non li hai persi perché il prezzo era troppo alto. Li hai persi perché <strong className="text-text-main font-semibold">non riuscivano a immaginarlo.</strong>
            <br /><br />
            SmileLive mostra loro il risultato. Prima che escano dalla porta. Il software è gratis. Per sempre.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-6 pt-4">
            <motion.a
              href="#pricing"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-text-main font-medium px-8 py-4 rounded-full flex items-center gap-2 glow-cyan transition-shadow shadow-[0_0_20px_rgba(14,165,233,0.4)]"
            >
              Inizia gratis <ChevronRight className="w-5 h-5" />
            </motion.a>
            <div className="flex items-center gap-2 text-sm text-text-muted">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <span>Nessuna carta richiesta. Setup in 10 minuti.</span>
            </div>
          </motion.div>

          {/* Trust badges */}
          <motion.div variants={fadeUp} className="pt-8 border-t border-secondary/10 flex items-center gap-6">
            <div className="flex -space-x-3">
              {[logoBerlinesi, logoFerretti, logoLaterza, logoRanieri].map((logo, i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-surface-elevated flex items-center justify-center overflow-hidden">
                  <img src={logo} alt={`Clinica ${i}`} className="w-full h-full object-cover rounded-full" width="40" height="40" loading="lazy" />
                </div>
              ))}
            </div>
            <div className="text-sm">
              <div className="flex text-gold">
                {[1,2,3,4,5].map((i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <span className="text-text-muted">Usato da oltre <strong className="text-text-main">340</strong> studi odontoiatrici in Italia</span>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Video Verticale a destra (Spostato qui dalla Hero) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 w-full overflow-x-clip perspective-1000"
        >
          <div className="relative mx-auto w-full max-w-[320px] md:max-w-[380px]">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-[2.5rem] blur-2xl opacity-30 animate-pulse"></div>
            
            <div className="relative rounded-[2.5rem] overflow-hidden glass ghost-border shadow-2xl p-2 bg-surface-elevated group">
              <div className="relative rounded-[2rem] overflow-hidden bg-surface-elevated aspect-[9/16] cursor-pointer" onClick={(e) => {
                const video = e.currentTarget.querySelector('video');
                if (video) {
                  if (video.paused) {
                    video.play();
                  } else {
                    video.pause();
                  }
                }
              }}>
                <video 
                  src={emotionalVideo} 
                  poster={beforeImg}
                  autoPlay={false}
                  controls={false}
                  muted={false}
                  playsInline
                  preload="none"
                  className="w-full h-full object-cover"
                  onPlay={(e) => {
                    e.currentTarget.parentElement?.querySelector('.play-button')?.classList.add('opacity-0', 'pointer-events-none');
                  }}
                  onPause={(e) => {
                    e.currentTarget.parentElement?.querySelector('.play-button')?.classList.remove('opacity-0', 'pointer-events-none');
                  }}
                />
                <div className="play-button absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-300">
                  <div className="w-16 h-16 rounded-full bg-primary/90 text-white flex items-center justify-center backdrop-blur-md shadow-lg transform group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 ml-1">
                      <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const AnimatedNumbers = () => {
  return (
    <section className="py-12 relative z-20">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center glass ghost-border rounded-[2rem] md:rounded-full py-8"
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6 text-gold" />
            <div className="text-2xl font-headline font-bold text-text-main">340+</div>
          </div>
          <div className="text-xs uppercase tracking-widest text-text-muted font-semibold">Studi Attivi in Italia</div>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-primary" />
            <div className="text-2xl font-headline font-bold text-text-main">+67%</div>
          </div>
          <div className="text-xs uppercase tracking-widest text-text-muted font-semibold">Conversione Media</div>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-secondary" />
            <div className="text-2xl font-headline font-bold text-text-main">€700k+</div>
          </div>
          <div className="text-xs uppercase tracking-widest text-text-muted font-semibold">Generati in Extra</div>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-text-main" />
            <div className="text-2xl font-headline font-bold text-text-main">10s</div>
          </div>
          <div className="text-xs uppercase tracking-widest text-text-muted font-semibold">Per Simulazione</div>
        </div>
      </motion.div>
    </section>
  );
};

const ProblemSection = () => {
  const [activeItem, setActiveItem] = useState(0);

  const items = [
    { image: imgSbiancamento, icon: "✨", title: "Sbiancamento", desc: "Da €300 a €800" },
    { image: imgFaccette, icon: "🦷", title: "Faccette", desc: "Da €800 a €2.500 per elemento" },
    { image: imgImpianti, icon: "🦴", title: "Implantologia", desc: "Da €1.500 a €5.000" },
    { image: null, icon: "📐", title: "Mock-up", desc: "Da €300 a €1.000" },
    { image: null, icon: "🔧", title: "Cerature", desc: "Da €400 a €1.200" },
    { image: imgOrtodonzia, icon: "📏", title: "Ortodonzia", desc: "Da €2.000 a €6.000" },
    { image: null, icon: "💎", title: "Zirconio", desc: "Da €500 a €1.800 per corona" },
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-500/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mb-24 text-center mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass ghost-border mb-8 border-red-500/20 bg-red-500/5">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span className="text-xs font-bold tracking-widest uppercase text-red-600">Il Problema Nascosto</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-headline font-bold leading-tight mb-8">
            Ogni <span className="text-red-600 italic">"ci penso"</span> è un preventivo da €1.500–€6.000 che <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">esce dalla porta.</span>
          </h2>
          <p className="text-xl text-text-muted leading-relaxed mb-4">
            Non una volta ogni tanto. <strong className="text-text-main">Ogni settimana.</strong>
          </p>
          <p className="text-lg text-text-muted leading-relaxed">
            In Italia solo il 34% dei pazienti va dal dentista con regolarità. Chi è già entrato nel tuo studio ha già fatto il passo più difficile. È a metà strada verso il sì. Ma senza uno strumento che trasformi il desiderio in decisione, il preventivo rimane un foglio su un tavolo.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Colonna Sinistra: Lista testuale pulita */}
          <div>
            <h3 className="text-2xl font-display font-bold mb-8 text-text-main">
              Aumenta l'accettazione su <span className="text-primary">qualsiasi trattamento</span>:
            </h3>
            
            <div className="space-y-3">
              {items.map((item, i) => {
                if (item.title === "Mock-up" || item.title === "Cerature") return null;
                
                return (
                <div 
                  key={i}
                  onMouseEnter={() => setActiveItem(i)}
                  className={`group flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all duration-300 ${activeItem === i ? 'bg-secondary/10 border-secondary/30 scale-[1.02] shadow-lg' : 'bg-transparent border-transparent hover:bg-secondary/5'} border`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-colors ${activeItem === i ? 'bg-primary/20 text-primary' : 'bg-secondary/5 text-text-muted group-hover:bg-secondary/10'}`}>
                      {item.icon}
                    </div>
                    <span className={`font-medium text-lg transition-colors ${activeItem === i ? 'text-text-main' : 'text-text-muted group-hover:text-text-main'}`}>
                      {item.title}
                    </span>
                  </div>
                  <span className={`text-sm font-medium transition-colors text-text-muted ${activeItem === i ? 'text-primary' : ''}`}>
                    {item.desc}
                  </span>
                </div>
              )})}
            </div>
          </div>

          {/* Colonna Destra: Immagine Dinamica (Molto più elegante) */}
          <div className="relative h-[400px] md:h-[600px] w-full rounded-3xl overflow-hidden glass border border-secondary/20 shadow-2xl flex items-center justify-center p-8 bg-gradient-to-br from-secondary/10 to-transparent">
            {/* Elemento decorativo dietro l'immagine */}
            <div className="absolute inset-0 bg-primary/5 blur-[80px] rounded-full pointer-events-none"></div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem}
                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                transition={{ duration: 0.4 }}
                className="relative z-10 w-full h-full flex items-center justify-center"
              >
                {items[activeItem].image ? (
                  <img 
                    src={items[activeItem].image} 
                    alt={items[activeItem].title} 
                    className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                    style={{ filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.5))' }}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-text-main/20">
                    <span className="text-8xl mb-4 opacity-50">{items[activeItem].icon}</span>
                    <p className="text-sm font-medium tracking-widest uppercase">Foto in arrivo</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  return (
    <section id="come-funziona" className="py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-headline font-bold mb-6">
            Non stai installando un software.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary italic font-serif">Stai attivando un protocollo.</span>
          </h2>
        </motion.div>

        {/* Bologna story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-20 glass ghost-border rounded-3xl p-8 border-primary/20 bg-primary/5 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 blur-[60px] rounded-full pointer-events-none"></div>
          <p className="text-text-muted leading-relaxed relative z-10 italic">
            Uno studio a Bologna lo usa così: Il poster in sala d'attesa dice una cosa sola — <strong className="text-text-main">"Vuoi vedere il tuo nuovo sorriso? Chiedilo alla reception."</strong> La paziente chiede. La segretaria apre SmileLive, carica la foto. 30 secondi. La paziente vede. Tre secondi di silenzio. Poi: <strong className="text-primary">"Quando possiamo iniziare?"</strong>
          </p>
          <p className="text-sm text-text-muted mt-4 relative z-10">
            Il dentista era in poltrona con un altro paziente. Non ha aggiunto nulla alla sua giornata.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
        >
          {[
            {
              num: "①",
              icon: <Users className="text-primary w-5 h-5" />,
              title: "Poster in sala d'attesa",
              desc: "Una sola frase. Nasce la curiosità nel paziente ancora prima di entrare in poltrona.",
              highlight: false,
            },
            {
              num: "②",
              icon: <Camera className="text-primary w-5 h-5" />,
              title: "Lo staff genera la preview",
              desc: "La segretaria o l'ASO — con il video corso incluso, pochi minuti — carica la foto e in 30 secondi la preview è pronta. Zero intervento del dentista.",
              highlight: true,
            },
            {
              num: "③",
              icon: <Sparkles className="text-primary w-5 h-5" />,
              title: "Il paziente vede il suo sorriso",
              desc: "Sul tablet, sul PC, sullo schermo della reception. Non un esempio generico. Il suo sorriso, trasformato.",
              highlight: false,
            },
            {
              num: "④",
              icon: <CheckCircle2 className="text-primary w-5 h-5" />,
              title: "Il dentista chiude il trattamento",
              desc: "Il paziente non sta firmando un preventivo astratto. Sta dicendo sì a qualcosa che ha già visto sul suo viso.",
              highlight: false,
            },
          ].map((step, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className={`glass ghost-border rounded-[2rem] p-7 relative ${step.highlight ? 'glow-cyan border-primary/30' : ''}`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-5 ${step.highlight ? 'bg-primary text-text-main shadow-[0_0_20px_rgba(14,165,233,0.5)]' : 'bg-surface-elevated border border-secondary/20 text-text-main shadow-xl'}`}>
                {step.num}
              </div>
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">{step.icon} {step.title}</h3>
              <p className="text-text-muted text-base leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 glass ghost-border rounded-3xl p-8 max-w-4xl mx-auto text-center border-gold/30 bg-gold/5 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold/20 blur-[50px] rounded-full"></div>
          <h3 className="text-2xl font-bold text-gold mb-4 relative z-10">Sulla precisione della simulazione</h3>
          <p className="text-text-muted relative z-10 leading-relaxed">
            SmileLive non è uno strumento diagnostico — è uno <strong className="text-text-main">strumento di desiderio</strong>. Il suo compito non è garantire il risultato clinico. Il suo compito è far nascere nel paziente la voglia di iniziare. Per i casi riproducibili, la preview è molto accurata. Per i casi complessi, sblocca la conversazione. <strong className="text-gold">Funziona in entrambi i casi.</strong>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const ROICalculator = () => {
  const [previews, setPreviews] = useState(100);
  const [conversion, setConversion] = useState(4);
  const [ticket, setTicket] = useState(1200);
  
  const monthlyPatients = Math.floor(previews * (conversion / 100));
  const extraRevenue = monthlyPatients * ticket;

  return (
    <section className="py-32 mesh-gradient">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto px-6"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-headline font-bold mb-4">
            Simula il tuo flusso di cassa
          </h2>
          <p className="text-xl text-text-muted">Gli studi che usano SmileLive chiudono in media 2–3 trattamenti estetici in più al mese nei primi 60 giorni.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="glass ghost-border rounded-3xl p-8 space-y-10">
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label htmlFor="previews-range" className="text-sm font-medium text-text-muted">Preview generate dallo staff al mese</label>
                <span className="text-2xl font-bold text-primary">{previews}</span>
              </div>
              <input id="previews-range" type="range" aria-label="Numero di preview mensili" min="10" max="200" step="10" value={previews} onChange={(e) => setPreviews(Number(e.target.value))} className="w-full h-2 bg-secondary/10 rounded-lg appearance-none cursor-pointer accent-primary" />
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label htmlFor="conversion-range" className="text-sm font-medium text-text-muted">Tasso di conversione stimato</label>
                <span className="text-2xl font-bold text-primary">{conversion}%</span>
              </div>
              <input id="conversion-range" type="range" aria-label="Tasso di conversione percentuale" min="1" max="50" step="1" value={conversion} onChange={(e) => setConversion(Number(e.target.value))} className="w-full h-2 bg-secondary/10 rounded-lg appearance-none cursor-pointer accent-primary" />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label htmlFor="ticket-range" className="text-sm font-medium text-text-muted">Ticket medio del trattamento estetico</label>
                <span className="text-2xl font-bold text-primary">€{ticket}</span>
              </div>
              <input id="ticket-range" type="range" aria-label="Valore del ticket medio" min="300" max="12000" step="100" value={ticket} onChange={(e) => setTicket(Number(e.target.value))} className="w-full h-2 bg-secondary/10 rounded-lg appearance-none cursor-pointer accent-primary" />
            </div>
          </div>

          <div className="glass ghost-border rounded-3xl p-10 flex flex-col justify-center relative overflow-hidden text-center h-full glow-cyan">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>
            <div className="relative z-10 space-y-10">
              <div>
                <p className="text-text-muted mb-2 font-medium">Nuovi pazienti al mese</p>
                <div className="text-5xl font-headline font-bold text-text-main">+{monthlyPatients}</div>
              </div>
              <div>
                <p className="text-text-muted mb-2 font-medium">Fatturato extra stimato (mensile)</p>
                <div className="text-6xl font-headline font-bold text-gold">€{extraRevenue.toLocaleString('it-IT')}</div>
              </div>
              <div className="pt-8 border-t border-secondary/20">
                <p className="text-base text-text-muted leading-relaxed">
                  Con <strong className="text-text-main">{previews}</strong> preview generate e un tasso di conversione del <strong className="text-text-main">{conversion}%</strong>, ottieni <strong className="text-text-main">+{monthlyPatients}</strong> pazienti al mese in più.
                  <br/>Con una media di <strong className="text-text-main">€{ticket}</strong> per trattamento, incrementi il tuo fatturato mensile di <strong className="text-gold">€{extraRevenue.toLocaleString('it-IT')}</strong>.
                </p>
                <p className="text-sm text-text-muted mt-4">
                  SmileLive Starter: <strong className="text-text-main">€39/mese</strong> annuale. Un solo trattamento in più lo ripaga in meno di un'ora di lavoro.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const WhatYouGet = () => {
  const features = [
    {
      icon: "📋",
      title: "Schede Paziente",
      subtitle: "sai sempre dove sei con ogni paziente",
      body: "Ogni scheda SmileLive ha tutto in un colpo d'occhio — simulazioni fatte, preventivi inviati, stato del trattamento, note. Una timeline cronologica dall'inizio.",
      states: ["In valutazione", "Preventivo inviato", "Accettato", "In trattamento"],
    },
    {
      icon: "🎙️",
      title: "Preventivo Intelligente",
      subtitle: "dalla voce alla firma digitale",
      body: "Detti a voce le voci del preventivo. L'AI trascrive e struttura automaticamente. Il paziente riceve un link sul telefono. Apre, legge, firma digitalmente. Nessun foglio stampato.",
      states: ["Bozza", "Inviato", "Firmato"],
    },
    {
      icon: "💬",
      title: "Promemoria WhatsApp",
      subtitle: "zero no-show, zero telefonate",
      body: "Ogni paziente riceve un WhatsApp 24 ore prima dell'appuntamento. E un altro 2 ore prima. Il sistema gira da solo, ogni ora, anche di notte.",
      states: null,
    },
    {
      icon: "📱",
      title: "Fatturazione Self-Service",
      subtitle: "il paziente compila da solo",
      body: "La segreteria invia un link via WhatsApp. Il paziente apre dal telefono — ancora in sala d'attesa — e inserisce i suoi dati fiscali. Nessun codice fiscale scritto a mano.",
      states: null,
    },
    {
      icon: "📊",
      title: "Export Commercialista",
      subtitle: "chiudi il mese in 3 click",
      body: "Fine mese. Selezioni il periodo, vedi tutti i preventivi accettati con i relativi importi, modifichi se serve, scarichi il file strutturato. Il commercialista riceve esattamente quello che gli serve.",
      states: null,
    },
    {
      icon: "📈",
      title: "Dashboard",
      subtitle: "una schermata che vale una riunione",
      body: "Apri SmileLive e in 5 secondi sai: preventivi generati, accettati, in attesa, valore in euro, crediti reminder disponibili. Non devi più aspettare la fine del mese.",
      states: null,
    },
  ];

  return (
    <section className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-6"
        >
          <h2 className="text-4xl md:text-5xl font-headline font-bold mb-4">
            Aspetta. Non è solo la preview del sorriso.
          </h2>
          <p className="text-xl text-text-muted max-w-2xl mx-auto mb-4">
            Mentre lo usavi per convertire pazienti indecisi, SmileLive lavorava anche su tutto il resto.
          </p>
          <p className="text-lg text-text-muted max-w-3xl mx-auto">
            Ogni studio perde soldi in tre modi silenziosi: pazienti che non firmano, appuntamenti dimenticati, burocrazia che mangia ore. SmileLive risolve tutti e tre. In un unico posto. <strong className="text-text-main">Partendo da gratis.</strong>
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16"
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="glass ghost-border p-7 rounded-3xl flex flex-col group hover:border-primary/30 hover:bg-surface-elevated transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{f.icon}</span>
                <div>
                  <h3 className="text-lg font-bold text-text-main">{f.title}</h3>
                  <p className="text-sm text-primary font-semibold tracking-wide">{f.subtitle}</p>
                </div>
              </div>
              <p className="text-text-muted text-base leading-relaxed flex-1">{f.body}</p>
              {f.states && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {f.states.map((s, j) => (
                    <span key={j} className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 glass ghost-border rounded-3xl p-8 text-center border-gold/20 bg-gold/5 max-w-3xl mx-auto"
        >
          <p className="text-text-muted leading-relaxed mb-2">
            Tutto questo normalmente costa €30–50 al mese per ogni singolo strumento. CRM, preventivi digitali, firma elettronica, promemoria automatici, gestione fiscale.
          </p>
          <p className="text-text-main font-bold text-lg">
            SmileLive li fa tutti. In uno. E il software base è <span className="text-gold">gratis, per sempre.</span>
          </p>
          <div className="mt-6">
            <motion.a
              href="#pricing"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-primary text-text-main font-headline font-bold uppercase tracking-wider px-10 py-4 rounded-full glow-cyan transition-all"
            >
              Inizia gratis — nessuna carta richiesta
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const getPrice = (monthlyPrice: number) => {
    return isAnnual ? Math.round(monthlyPrice * 0.8) : monthlyPrice;
  };

  return (
    <section id="pricing" className="py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-center mb-4">Scegli il tuo piano</h2>
          <p className="text-xl text-text-muted text-center mb-4">Inizia gratis. Scala quando vuoi.</p>
          <p className="text-base text-text-muted text-center max-w-2xl mb-8">Il software SmileLive è gratuito per sempre. Il primo mese ti regaliamo 10 foto e 3 video per testarlo con i tuoi pazienti reali — senza impegno, senza carta di credito.</p>
          <div className="flex items-center gap-4 bg-background ghost-border rounded-full p-2 relative">
            <button 
              onClick={() => setIsAnnual(false)} 
              className={`px-6 py-2 rounded-full font-medium transition-all relative z-10 ${!isAnnual ? 'text-text-main' : 'text-text-muted hover:text-text-main'}`}
            >
              Mensile
            </button>
            <button 
              onClick={() => setIsAnnual(true)} 
              className={`px-6 py-2 rounded-full font-medium transition-all flex items-center gap-2 relative z-10 ${isAnnual ? 'text-text-main' : 'text-text-muted hover:text-text-main'}`}
            >
              Annuale <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">-20%</span>
            </button>
            <div className={`absolute top-2 bottom-2 w-[calc(50%-8px)] bg-surface-elevated shadow-lg rounded-full transition-all duration-300 ${isAnnual ? 'left-[calc(50%+4px)]' : 'left-2'}`}></div>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch max-w-7xl mx-auto"
        >
          {/* FREE */}
          <motion.div variants={fadeUp} className="glass ghost-border rounded-[2rem] p-8 flex flex-col items-center text-center">
            <h3 className="text-xl font-medium mb-1">Free</h3>
            <p className="text-sm text-text-muted mb-4">Per sempre</p>
            <div className="text-4xl font-headline font-bold mb-1">€0<span className="text-sm text-text-muted font-normal">/mese</span></div>
            <div className="h-[1px] w-full bg-secondary/10 my-5"></div>
            <ul className="text-text-muted text-base space-y-3 mb-8 flex-grow text-left">
              <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span>Software completo</span></li>
              <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span><strong className="text-text-main">10 foto + 3 video</strong> nel primo mese</span></li>
              <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span><strong className="text-text-main">10 Promemoria WhatsApp</strong> nel primo mese</span></li>
            </ul>
            <a href="#" className="w-full py-3 rounded-full border border-secondary/30 hover:bg-secondary/5 transition-all font-medium text-sm text-center">Inizia gratis</a>
          </motion.div>

          {/* Starter */}
          <motion.div variants={fadeUp} className="glass ghost-border rounded-[2rem] p-8 flex flex-col items-center text-center">
            <h3 className="text-xl font-medium mb-1">Starter</h3>
            <p className="text-sm text-text-muted mb-4">Perfetto per iniziare</p>
            <div className="text-4xl font-headline font-bold mb-1">€{getPrice(49)}<span className="text-sm text-text-muted font-normal">/mese</span></div>
            {isAnnual && <div className="text-sm text-primary font-semibold mb-1">Risparmi €{(49-39)*12}/anno</div>}
            <div className="h-[1px] w-full bg-secondary/10 my-5"></div>
            <ul className="text-text-muted text-base space-y-3 mb-8 flex-grow text-left">
              <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span><strong className="text-text-main">30 foto</strong>/mese</span></li>
              <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span><strong className="text-text-main">5 video</strong>/mese</span></li>
              <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span><strong className="text-text-main">25 Promemoria</strong> WhatsApp/SMS</span></li>
              <li className="text-sm pt-2 border-t border-secondary/10 text-text-muted">Extra: €2/foto · €4/video · €0,20/promemoria</li>
            </ul>
            <a href="#" className="w-full py-3 rounded-full border border-secondary/30 hover:bg-secondary/5 transition-all font-medium text-sm text-center">Scegli Starter</a>
          </motion.div>

          {/* Premium */}
          <motion.div variants={fadeUp} className="bg-surface-elevated ghost-border rounded-[2rem] p-8 flex flex-col items-center text-center relative glow-cyan-strong border-primary/40">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-primary to-secondary text-background px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap">
              ⭐ Il più scelto
            </div>
            <div className="absolute inset-0 rounded-[2rem] border-2 border-primary/50 pointer-events-none"></div>
            <h3 className="text-xl font-bold mb-1 text-primary mt-3">Premium</h3>
            <p className="text-sm text-text-muted mb-4">Per studi attivi</p>
            <div className="text-5xl font-headline font-bold mb-1">€{getPrice(99)}<span className="text-sm text-text-muted font-normal">/mese</span></div>
            {isAnnual && <div className="text-sm text-primary font-semibold mb-1">Risparmi €{(99-79)*12}/anno</div>}
            <div className="h-[1px] w-full bg-secondary/10 my-5"></div>
            <ul className="text-text-main text-sm space-y-3 mb-8 flex-grow text-left">
              <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span><strong className="text-primary">100 foto</strong>/mese</span></li>
              <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span><strong className="text-primary">20 video</strong>/mese</span></li>
              <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span><strong className="text-primary">50 Promemoria</strong> WhatsApp/SMS</span></li>
              <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span>Supporto prioritario</span></li>
              <li className="text-sm text-text-muted pt-2 border-t border-secondary/20">Extra: €1/foto · €3/video · €0,19/promemoria</li>
            </ul>
            <a href="#" className="w-full py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-background hover:scale-105 transition-all font-bold text-sm shadow-[0_0_20px_rgba(14,165,233,0.4)] text-center">Scegli Premium</a>
          </motion.div>

          {/* Business */}
          <motion.div variants={fadeUp} className="glass ghost-border rounded-[2rem] p-8 flex flex-col items-center text-center">
            <h3 className="text-xl font-medium mb-1">Business</h3>
            <p className="text-sm text-text-muted mb-4">Per grandi studi</p>
            <div className="text-4xl font-headline font-bold mb-1">€{getPrice(139)}<span className="text-sm text-text-muted font-normal">/mese</span></div>
            {isAnnual && <div className="text-sm text-primary font-semibold mb-1">Risparmi €{(139-111)*12}/anno</div>}
            <div className="h-[1px] w-full bg-secondary/10 my-5"></div>
            <ul className="text-text-muted text-base space-y-3 mb-8 flex-grow text-left">
              <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span><strong className="text-text-main">200 foto</strong>/mese</span></li>
              <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span><strong className="text-text-main">40 video</strong>/mese</span></li>
              <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span><strong className="text-text-main">125 Promemoria</strong> WhatsApp/SMS</span></li>
              <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span>Supporto prioritario</span></li>
              <li className="text-sm pt-2 border-t border-secondary/10 text-text-muted">Extra: €0,50/foto · €2/video · €0,18/promemoria</li>
            </ul>
            <a href="#" className="w-full py-3 rounded-full border border-secondary/30 hover:bg-secondary/5 transition-all font-medium text-sm text-center">Scegli Business</a>
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-text-muted mt-8 max-w-2xl mx-auto"
        >
          Hai bisogno di più preview o promemoria in un mese intenso? Acquista pacchetti extra al volo — senza cambiare piano.
        </motion.p>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    {
      name: "Studi Associati Berlinesi",
      role: "Studio Dentistico",
      text: "Fantastico, il team di SmileLive è giovane e professionale. In pochissimo tempo il sistema è stato inserito nell'operatività della segreteria, e nel primo mese abbiamo fatto circa 30 preview che ci hanno portato in poltrona 3 casi extra: 6 faccette e 2 mock-up. Sono molto soddisfatto.",
      highlight: "3 casi extra nel primo mese"
    },
    {
      name: "Studio Dentistico Laterza",
      role: "Studio Dentistico",
      text: "Uso SmileLive ormai da sei mesi e non potrei farne a meno. La media è stabile: su 15 preview fatte dalla mia assistente in sala d'attesa, almeno un paziente prenota la visita estetica. Ora stiamo lavorando col loro supporto per migliorare la visibilità del poster in studio per aumentare le richieste spontanee.",
      highlight: "1 paziente nuovo ogni 15 preview"
    },
    {
      name: "Dr. Giacomo Ferretti",
      role: "Odontoiatra",
      text: "Quello che apprezzo di più, oltre al fatto che mi genera conversioni in automatico, è che il software continua a migliorare. L'ultimo aggiornamento ha reso i video ancora più realistici. Le ragazze in reception lo propongono come se fosse un gioco, e noi ci troviamo i preventivi firmati sulla scrivania.",
      highlight: "Aggiornamenti continui e utili"
    },
    {
      name: "Studio Dentistico Ranieri",
      role: "Studio Dentistico",
      text: "La nostra ASO ormai lo propone a chiunque entri per una detartrasi. Ci vogliono 10 secondi e il risultato sul tablet lascia i pazienti a bocca aperta. Non tutti comprano subito, ovvio, ma il seme del dubbio è piantato. Il mese scorso abbiamo chiuso 2 sbiancamenti e un ponte solo grazie alle preview spontanee.",
      highlight: "Integrazione perfetta post-igiene"
    }
  ];

  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-4xl font-headline font-bold text-center mb-16"
        >
          Risultati reali da studi reali.
        </motion.h2>
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {reviews.map((r, i) => (
            <motion.div key={i} variants={fadeUp} className="glass ghost-border p-8 rounded-[2rem] flex flex-col justify-between group hover:border-primary/30 transition-colors">
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map((star) => <Star key={star} className="w-5 h-5 text-gold fill-current" />)}
              </div>
              <p className="text-lg text-text-muted mb-8 italic">"{r.text}"</p>
              <div className="border-t border-secondary/20 pt-6 mt-auto flex justify-between items-end">
                <div>
                  <p className="font-bold text-text-main">{r.name}</p>
                  <p className="text-sm text-text-muted">{r.role}</p>
                </div>
                <div className="inline-block bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full border border-primary/20">
                  {r.highlight}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const ForWho = () => {
  return (
    <section className="py-32 bg-surface">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto px-6"
      >
        <h2 className="text-4xl md:text-5xl font-headline font-bold mb-12 text-center">Sei uno di loro?</h2>
        <div className="space-y-6 mb-12">
          <motion.div whileHover={{ scale: 1.02 }} className="glass ghost-border p-6 rounded-2xl flex gap-4 items-start">
            <Users className="w-8 h-8 text-primary shrink-0" />
            <div>
              <strong className="text-text-main text-lg">Dentista generalista</strong>
              <p className="text-text-muted text-base mt-1">Vuoi aumentare i casi estetici senza cambiare il tuo workflow.</p>
            </div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} className="glass ghost-border p-6 rounded-2xl flex gap-4 items-start">
            <Star className="w-8 h-8 text-gold shrink-0" />
            <div>
              <strong className="text-text-main text-lg">Specialista estetica</strong>
              <p className="text-text-muted text-base mt-1">Hai già i pazienti. Ti manca lo strumento che li fa decidere.</p>
            </div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} className="glass ghost-border p-6 rounded-2xl flex gap-4 items-start">
            <Award className="w-8 h-8 text-secondary shrink-0" />
            <div>
              <strong className="text-text-main text-lg">Clinic manager</strong>
              <p className="text-text-muted text-base mt-1">Vuoi uno standard di consulenza che funzioni su tutto il team.</p>
            </div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} className="glass ghost-border p-6 rounded-2xl flex gap-4 items-start">
            <TrendingUp className="w-8 h-8 text-primary shrink-0" />
            <div>
              <strong className="text-text-main text-lg">Studio giovane</strong>
              <p className="text-text-muted text-base mt-1">Stai costruendo la tua base pazienti e vuoi differenziarti subito.</p>
            </div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} className="glass ghost-border p-6 rounded-2xl flex gap-4 items-start">
            <Activity className="w-8 h-8 text-primary shrink-0" />
            <div>
              <strong className="text-text-main text-lg">Ortodontista / implantologo</strong>
              <p className="text-text-muted text-base mt-1">Vuoi integrare la visualizzazione nel percorso di accettazione del piano.</p>
            </div>
          </motion.div>
        </div>
        <div className="p-6 rounded-2xl bg-gradient-to-r from-gold/10 to-transparent border-l-4 border-gold">
          <p className="text-xl font-medium text-gold italic">
            Se ti riconosci anche in uno solo di questi — questo strumento è stato costruito per te.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

const FAQ = () => {
  const faqs = [
    {
      q: "Il software è davvero gratis? Cosa c'è di nascosto?",
      a: "Niente. Il software è gratis per sempre. Paghi le preview — foto e video — quando le usi. Come un taxi: paghi il tragitto, non il diritto di chiamarlo."
    },
    {
      q: "Il primo mese con 10 foto e 3 video basta per testarlo davvero?",
      a: "Sì. Con 10 foto puoi fare 10 preview su pazienti reali questa settimana. Se anche solo 2 di loro firmano un trattamento che senza SmileLive non avrebbero firmato, hai già visto il valore. Il resto è scala."
    },
    {
      q: "Chi genera le preview? Devo farlo io?",
      a: "No. Il protocollo è pensato per la segreteria o l'ASO. Il video corso incluso richiede pochi minuti. Da quel momento in poi lo staff lavora in autonomia — tu sei in poltrona."
    },
    {
      q: "Il 70% di accuratezza visiva non è troppo basso?",
      a: "SmileLive non è uno strumento diagnostico — è uno strumento di desiderio. Il suo compito non è garantire il risultato clinico, quello è il tuo. Il suo compito è far nascere nel paziente la voglia di iniziare. Per i casi riproducibili, la preview è molto accurata. Per i casi complessi, sblocca la conversazione. Funziona in entrambi i casi."
    },
    {
      q: "Posso usarlo per l'implantologia o solo per l'estetica?",
      a: "SmileLive lavora su qualsiasi trattamento che cambia visibilmente il sorriso — faccette, sbiancamento, ortodonzia, protesi, impianti su arcata. Se il risultato si vede, SmileLive lo può mostrare."
    }
  ];

  return (
    <section id="faq" className="py-32 bg-surface">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto px-6"
      >
        <h2 className="text-4xl font-headline font-bold mb-4 text-center">Domande frequenti</h2>
        <p className="text-text-muted text-center mb-12">Tutto quello che vuoi sapere.</p>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass ghost-border p-6 rounded-2xl hover:bg-surface-elevated transition-colors"
            >
              <h3 className="font-bold text-lg mb-2 text-text-main flex items-start gap-2">
                <ChevronRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                {faq.q}
              </h3>
              <p className="text-text-muted text-base pl-7 leading-relaxed">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

const Behind = () => {
  return (
    <section className="py-24 border-y border-secondary/10 bg-surface-elevated">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto px-6 text-center"
      >
        <p className="text-2xl font-serif italic text-gold mb-10">
          "Non vendo teoria. Ho costruito questo sistema lavorando fianco a fianco con studi dentistici reali, su problemi reali di consulenza."
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left max-w-2xl mx-auto mb-10">
          <div className="glass ghost-border rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">50+</div>
            <div className="text-sm font-medium text-text-muted">Cliniche Partner</div>
          </div>
          <div className="glass ghost-border rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">€700k+</div>
            <div className="text-sm font-medium text-text-muted">Trattamenti generati</div>
          </div>
          <div className="glass ghost-border rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">10s</div>
            <div className="text-sm font-medium text-text-muted">Per risultato</div>
          </div>
          <div className="glass ghost-border rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">0</div>
            <div className="text-sm font-medium text-text-muted">Carta richiesta</div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
          <div className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" /> <span className="text-text-muted text-base">Sviluppato con il feedback di odontotecnici e Odontoiatri italiani</span></div>
          <div className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" /> <span className="text-text-muted text-base">Testato su casi reali: faccette, sbiancamento, ortodonzia</span></div>
          <div className="flex items-start gap-3"><ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" /> <span className="text-text-muted text-base">GDPR nativo — nessun dato salvato mai</span></div>
          <div className="flex items-start gap-3"><Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" /> <span className="text-base font-bold text-text-main">IL TUO CONVERTITORE DI PAZIENTI INDECISI</span></div>
        </div>
      </motion.div>
    </section>
  );
};

const FinalCTA = () => {
  return (
    <section className="py-40 mesh-gradient relative overflow-hidden text-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[150px] rounded-full pointer-events-none"></div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto px-6 relative z-10"
      >
        <h2 className="text-5xl md:text-7xl font-headline font-bold mb-6 leading-tight">
          Il tuo prossimo paziente indeciso è già in sala d'attesa.
        </h2>
        <p className="text-xl text-text-muted mb-4">
          Ogni "ci penso" che senti oggi è un trattamento che potrebbe diventare un sì domani.
        </p>
        <p className="text-lg text-text-muted mb-10">
          Il software è gratis. Le prime 10 preview sono incluse. <span className="text-text-main font-semibold">Il primo risultato potrebbe arrivare questa settimana.</span>
        </p>
        <div>
          <motion.a
            href="#pricing"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-text-main font-headline font-bold uppercase tracking-widest px-12 py-5 rounded-full glow-cyan-strong transition-all duration-300 text-lg flex items-center gap-3 mx-auto w-fit"
          >
            Inizia gratis — nessuna carta richiesta <ChevronRight className="w-6 h-6" />
          </motion.a>
          <p className="mt-4 text-sm text-text-muted">Setup in 10 minuti. Il tuo staff è operativo oggi.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-text-muted font-medium">
            <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-primary" /> Accesso immediato</span>
            <span className="hidden md:inline">·</span>
            <span>GDPR Compliant</span>
            <span className="hidden md:inline">·</span>
            <span>Made in Italy</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-12 border-t border-secondary/10 text-sm text-text-muted bg-background">
    <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-6">
      <div className="flex items-center gap-2">
        <img src={logoFinale} alt="SmileLive" className="h-12 w-auto" width="120" height="48" loading="lazy" />
      </div>
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-text-muted">
        <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
        <span>·</span>
        <a href="#" className="hover:text-primary transition-colors">Termini di Servizio</a>
        <span>·</span>
        <a href="mailto:supporto@smilelive.it" className="hover:text-primary transition-colors">Contatti</a>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-secondary/20 text-xs font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-primary" /> GDPR Compliant
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-secondary/20 text-xs font-medium">
          🇮🇹 Made in Italy
        </span>
      </div>
      <p className="text-center text-xs text-text-muted/60">© {new Date().getFullYear()} SmileLive. Tutti i diritti riservati.</p>
    </div>
  </footer>
);

const FutureVision = () => {
  return (
    <section id="future" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none -z-10"></div>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto px-6 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass ghost-border mb-8">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
          <span className="text-xs font-bold tracking-widest uppercase text-secondary">La Visione</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-headline font-bold mb-4">
          Da strumento di conversione <br />
          <span className="italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-normal">a sistema di gestione.</span>
        </h2>
        <p className="text-xl text-text-muted leading-relaxed mb-3 max-w-2xl mx-auto">
          SmileLive non è solo preview. È il software che mancava al tuo studio.
        </p>
        <p className="text-lg text-text-muted leading-relaxed mb-12 max-w-2xl mx-auto">
          Chi è abbonato entrerà automaticamente nella nostra <strong className="text-text-main">Vetrina di Odontoiatri Specialisti</strong> — un vantaggio competitivo enorme per le richieste locali.
        </p>
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left"
        >
          <motion.div variants={fadeUp} className="glass ghost-border p-8 rounded-[2rem] hover:glow-cyan transition-all relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px] rounded-full"></div>
            <Target className="w-8 h-8 text-primary mb-4 relative z-10 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-2 relative z-10">Marketing e ADS Centralizzati</h3>
            <p className="text-text-muted text-base leading-relaxed relative z-10">
              Intercettiamo i pazienti indecisi o insoddisfatti del proprio sorriso tramite campagne digitali mirate, educandoli alle possibilità estetiche prima ancora che entrino in studio.
            </p>
          </motion.div>
          <motion.div variants={fadeUp} className="glass ghost-border p-8 rounded-[2rem] hover:glow-cyan transition-all relative overflow-hidden border-primary/30 group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 blur-[50px] rounded-full"></div>
            <div className="absolute top-4 right-4 bg-primary/20 text-primary text-xs uppercase tracking-widest font-bold px-2 py-1 rounded">Vantaggio Locale</div>
            <Award className="w-8 h-8 text-primary mb-4 relative z-10 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-2 relative z-10">Vetrina Specialisti Esclusiva</h3>
            <p className="text-text-muted text-base leading-relaxed relative z-10">
              I pazienti sceglieranno con chi effettuare il trattamento consultando il nostro network. <strong className="text-text-main">Posizionarsi per primi nella propria città garantisce un vantaggio competitivo enorme sulle richieste locali.</strong>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

const IntermediateCTA = () => (
  <section className="py-20 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 pointer-events-none"></div>
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto px-6 text-center relative z-10"
    >
      <h2 className="text-3xl md:text-5xl font-headline font-bold mb-4 leading-tight">
        Chi ti dice "ci penso" potrebbe dirti sì.
      </h2>
      <p className="text-xl text-text-muted mb-8">Se gli mostri il risultato.</p>
      <motion.a
        href="#pricing"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-flex items-center gap-2 bg-primary text-text-main font-headline font-bold uppercase tracking-wider px-10 py-4 rounded-full glow-cyan transition-all"
      >
        Inizia gratis — nessuna carta richiesta <ChevronRight className="w-5 h-5" />
      </motion.a>
    </motion.div>
  </section>
);

export default function Index() {
  return (
    <main className="min-h-screen w-full overflow-x-clip bg-background text-text-main selection:bg-primary/20 selection:text-text-main font-['Inter']">
      <TopBar />
      <Hero />
      <TrustMarquee />
      <EmotionalVideo />
      <AnimatedNumbers />
      <ProblemSection />
      <HowItWorks />
      <ROICalculator />
      <IntermediateCTA />
      <WhatYouGet />
      <Pricing />
      <FutureVision />
      <Testimonials />
      <ForWho />
      <FAQ />
      <FinalCTA />
      <Behind />
      <Footer />
    </main>
  );
}
