import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CaretRight, Sparkle, Pulse, ShieldCheck,
  Star, TrendUp, Users, Target, CheckCircle, Medal, Lightning, Camera, Check,
  ArrowsHorizontal, ClipboardText, Microphone, ChatCircle, Receipt, FileArrowDown, ChartLineUp
} from "@phosphor-icons/react";
import beforeImg from '../assets/WEBP/PRIMA (2).webp';
import afterImg from '../assets/WEBP/DOPO (2).webp';
import emotionalVideo from '../assets/video per SITO 1080p FINITO.mp4';

import logoBerlinesi from '../assets/LOGHI STUDI WEBP/BERLINESI 2 (1).png';
import logoFerretti from '../assets/LOGHI STUDI WEBP/FERRETTI GIACOMO.png';
import logoLaterza from '../assets/LOGHI STUDI WEBP/LATERZA (1).png';
import logoRanieri from '../assets/LOGHI STUDI WEBP/RANIERI (1).png';
import logoSMILE from '../assets/LOGHI STUDI WEBP/CLINICA DENTALE SAN MICHELE.png';
import logoAlvise from '../assets/LOGHI STUDI WEBP/ALVISE LI FONTI.png';
import logoEmanuele from '../assets/LOGHI STUDI WEBP/EMANUELE CALABRESI.png';
import logoAurelio from '../assets/LOGHI STUDI WEBP/AURELIO TRENITINI.png';

import imgSbiancamento from '../assets/WEBP/Sbiancamento prima e dopo2.webp';
import imgFaccette from '../assets/WEBP/FACCETTE (1).jpeg';
import imgImpianti from '../assets/WEBP/DOPO (2).webp';
import imgOrtodonzia from '../assets/WEBP/TERMOSTAMPATA-CrUanAGb.jpg';
import logoFinale from '../assets/WEBP/SmileLive FINALE senza sfondo COLORI CORRETTI (1).webp';
import { trackCta } from "@/lib/analytics";
import { openCookieBanner } from "@/lib/consent";

// ─── Motion Variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

// ─── EmotionalVideo (preserved exactly) ────────────────────────────────────
const EmotionalVideo = () => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [imgAlign, setImgAlign] = useState({ x: 0, y: 0, scale: 1 });
  const sliderRef = useRef<HTMLDivElement>(null);
  const showAlignmentControls = false;

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const pointerStartRef = useRef<{ x: number; y: number; id: number } | null>(null);

  const updateSliderPosition = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('.alignment-controls')) return;
    pointerStartRef.current = { x: e.clientX, y: e.clientY, id: e.pointerId };
    if (e.pointerType === "mouse") {
      setIsDragging(true);
      e.currentTarget.setPointerCapture(e.pointerId);
      updateSliderPosition(e.clientX);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) { updateSliderPosition(e.clientX); return; }
    const start = pointerStartRef.current;
    if (!start || start.id !== e.pointerId) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    const adx = Math.abs(dx);
    const ady = Math.abs(dy);
    if (adx < 8 && ady < 8) return;
    if (adx > ady) {
      setIsDragging(true);
      try { e.currentTarget.setPointerCapture(e.pointerId); } catch { /* noop */ }
      updateSliderPosition(e.clientX);
    } else {
      pointerStartRef.current = null;
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const start = pointerStartRef.current;
    if (!isDragging && start && start.id === e.pointerId && e.pointerType !== "mouse") {
      const dx = Math.abs(e.clientX - start.x);
      const dy = Math.abs(e.clientY - start.y);
      if (dx < 8 && dy < 8) updateSliderPosition(e.clientX);
    }
    setIsDragging(false);
    pointerStartRef.current = null;
  };

  const handleSliderKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") setSliderPosition((v) => Math.max(0, v - 5));
    if (e.key === "ArrowRight") setSliderPosition((v) => Math.min(100, v + 5));
  };

  return (
    <section className="py-28 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-bold tracking-widest uppercase text-primary">L'Effetto Wow</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-headline font-black leading-tight tracking-display text-text-main">
            "Non ci credo...<br />
            <span className="italic font-serif font-normal text-transparent bg-clip-text bg-gradient-to-r from-primary to-sky-400">sono io!"</span>
          </h2>
          <p className="text-xl text-text-muted leading-relaxed">
            Visita finita. Piano di trattamento perfetto. Preventivo consegnato.<br />
            <em className="text-text-main">"Ci penso e la richiamo, dottore."</em><br />
            Porta che si chiude. Silenzio.
          </p>
          <p className="text-lg text-text-muted leading-relaxed">
            Non e' che non volesse il trattamento. E' che{" "}
            <strong className="text-text-main">non riusciva a vedersi con quel sorriso</strong>. Senza un'immagine concreta, la spesa sembra un salto nel buio.
          </p>
          <div className="pt-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
              <Lightning size={20} weight="fill" className="text-gold" />
            </div>
            <p className="text-sm text-text-muted font-medium">
              L'emozione abbassa le barriere razionali<br />
              <strong className="text-text-main">e chiude il preventivo.</strong>
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative mx-auto w-full max-w-[560px]"
        >
          <div className="relative w-full aspect-square rounded-3xl overflow-hidden border border-slate-200 shadow-[0_24px_80px_rgba(2,132,199,0.12)] p-2 bg-white">
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-50">
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
                <div className="absolute inset-0 w-full h-full bg-slate-100">
                  <img src={afterImg} alt="Sorriso Dopo" className="w-full h-full object-cover object-top" draggable="false" />
                </div>
                <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}>
                  <div className="absolute inset-y-0 left-0 w-full h-full bg-slate-100" style={{ width: `${sliderRef.current?.offsetWidth || 100}px` }}>
                    <img
                      src={beforeImg}
                      alt="Sorriso Prima"
                      className="w-full h-full object-cover object-top origin-top transition-transform duration-75"
                      draggable="false"
                      style={{ transform: `scale(${imgAlign.scale}) translate(${imgAlign.x}%, ${imgAlign.y}%)` }}
                    />
                  </div>
                </div>
                {showAlignmentControls && (
                  <div className="alignment-controls absolute top-4 right-4 flex flex-col gap-2 z-50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white/90 backdrop-blur-md p-3 rounded-2xl border border-slate-200 space-y-3 min-w-[140px]">
                      <div className="text-[10px] uppercase font-bold text-primary tracking-widest border-b border-slate-200 pb-1 mb-2">Allineamento</div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] text-text-muted"><span>Sposta Y</span><span>{imgAlign.y.toFixed(1)}%</span></div>
                        <input type="range" aria-label="Sposta verticalmente" min="-30" max="30" step="0.1" value={imgAlign.y} onChange={(e) => setImgAlign(p => ({ ...p, y: parseFloat(e.target.value) }))} className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] text-text-muted"><span>Sposta X</span><span>{imgAlign.x.toFixed(1)}%</span></div>
                        <input type="range" aria-label="Sposta orizzontalmente" min="-20" max="20" step="0.1" value={imgAlign.x} onChange={(e) => setImgAlign(p => ({ ...p, x: parseFloat(e.target.value) }))} className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] text-text-muted"><span>Scala</span><span>{imgAlign.scale.toFixed(2)}x</span></div>
                        <input type="range" aria-label="Scala immagine" min="0.8" max="1.5" step="0.01" value={imgAlign.scale} onChange={(e) => setImgAlign(p => ({ ...p, scale: parseFloat(e.target.value) }))} className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary" />
                      </div>
                      <button onClick={() => setImgAlign({ x: 0, y: 0, scale: 1 })} className="w-full py-1.5 bg-primary/10 hover:bg-primary/20 text-primary text-[10px] font-bold rounded-lg transition-colors border border-primary/20">RESET</button>
                    </div>
                  </div>
                )}
                <div className="pointer-events-none absolute top-0 bottom-0 -ml-px w-0.5 bg-white shadow-[0_0_12px_rgba(2,132,199,0.5)]" style={{ left: `${sliderPosition}%` }}>
                  <div className="absolute top-1/2 left-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_20px_rgba(2,132,199,0.5)] flex items-center justify-center text-white transition-transform md:h-12 md:w-12 group-hover:scale-110 border-2 border-white/30">
                    <ArrowsHorizontal size={18} weight="bold" />
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-xs uppercase tracking-widest text-text-main font-bold shadow-sm border border-slate-200 pointer-events-none transition-opacity duration-300" style={{ opacity: sliderPosition > 20 ? 1 : 0 }}>Prima</div>
                <div className="absolute bottom-6 right-6 px-4 py-2 bg-primary/90 backdrop-blur-md rounded-full text-xs uppercase tracking-widest text-white font-bold shadow-sm pointer-events-none transition-opacity duration-300" style={{ opacity: sliderPosition < 80 ? 1 : 0 }}>Dopo</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ─── TopBar ─────────────────────────────────────────────────────────────────
const TopBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 inset-x-0 z-50 flex flex-col">
      <div className="bg-primary text-white text-sm md:text-base font-semibold text-center py-2.5 px-4 flex items-center justify-center gap-2">
        <span>Inizia gratis: 3 anteprime in omaggio.</span>
        <a
          href="https://app.smilelive.it/"
          onClick={() => trackCta("inizia_ora", "announcement_bar")}
          className="inline-flex items-center gap-1 underline underline-offset-2 hover:opacity-75 active:opacity-60 transition-opacity duration-150"
        >
          Inizia ora <CaretRight size={12} weight="bold" />
        </a>
      </div>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200 py-4' : 'bg-transparent py-5'}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <img src={logoFinale} alt="SmileLive Logo" className="h-16 w-auto md:h-20" fetchpriority="high" width="180" height="130" />
          <div className="hidden md:flex items-center gap-8 text-base text-text-muted font-medium">
            <a href="#come-funziona" className="hover:text-primary transition-colors duration-200 relative after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-200 hover:after:w-full">Come funziona</a>
            <a href="#pricing" className="hover:text-primary transition-colors duration-200 relative after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-200 hover:after:w-full">Prezzi</a>
            <a href="#faq" className="hover:text-primary transition-colors duration-200 relative after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-200 hover:after:w-full">FAQ</a>
          </div>
          <a
            href="https://app.smilelive.it/"
            onClick={() => trackCta("inizia_gratis", "topbar_nav")}
            className="bg-primary text-white border border-primary px-7 py-2.5 rounded-full font-bold text-base hover:bg-sky-600 active:scale-95 transition-all duration-200"
          >
            Inizia gratis
          </a>
        </div>
      </motion.div>
    </div>
  );
};

// ─── Hero ────────────────────────────────────────────────────────────────────
const Hero = () => (
  <section className="relative overflow-hidden min-h-screen flex items-center bg-white pt-32 md:pt-36 lg:pt-40">
    {/* Background — soft brand aurora, la "luce" sul sorriso invece della texture a puntini */}
    <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(55% 55% at 82% 10%, rgba(56,189,248,0.22), transparent 68%), radial-gradient(50% 50% at 6% 92%, rgba(37,99,235,0.14), transparent 70%), radial-gradient(48% 42% at 52% 32%, rgba(186,230,253,0.30), transparent 76%)' }}></div>
    <div className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none" style={{ backgroundImage: 'linear-gradient(180deg, transparent, #ffffff 92%)' }}></div>

    <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center py-32 lg:py-0 lg:min-h-screen">
      {/* Copy */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-8 relative z-10"
      >
        <motion.h1 variants={fadeUp} className="font-headline font-black tracking-display leading-[0.9] text-text-main">
          <span className="block text-4xl sm:text-5xl md:text-6xl xl:text-7xl text-text-muted">
            1 Foto.<br />
            1 Video.<br />
            10 Secondi.
          </span>
          <span className="block mt-2 text-5xl sm:text-6xl md:text-7xl xl:text-[5.5rem] text-transparent bg-clip-text bg-gradient-to-r from-primary via-sky-400 to-blue-400">
            Il tuo staff converte.
          </span>
        </motion.h1>

        <motion.p variants={fadeUp} className="text-lg text-text-muted leading-relaxed max-w-lg">
          Ogni giorno escono dallo studio pazienti che volevano cambiare il loro sorriso. Non li hai persi perche' il prezzo era troppo alto. Li hai persi perche'{" "}
          <strong className="text-text-main font-semibold">non riuscivano a immaginarlo.</strong>
          <br /><br />
          SmileLive mostra loro il risultato. Prima che escano dalla porta.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-5 pt-1">
          <motion.a
            href="https://app.smilelive.it/"
            onClick={() => trackCta("inizia_gratis", "hero")}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="group bg-primary text-white font-bold px-7 py-4 rounded-full inline-flex items-center gap-3 shadow-[0_8px_32px_rgba(2,132,199,0.4)] hover:shadow-[0_8px_48px_rgba(2,132,199,0.6)] transition-shadow duration-300 text-base"
          >
            <span>Inizia gratis</span>
            <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center group-hover:translate-x-0.5 transition-transform duration-200">
              <CaretRight size={14} weight="bold" />
            </span>
          </motion.a>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <ShieldCheck size={16} weight="light" className="text-primary shrink-0" />
            <span>Nessuna carta. Setup in 10 minuti.</span>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="pt-6 flex items-center gap-5">
          <div className="flex -space-x-2.5">
            {[logoBerlinesi, logoFerretti, logoLaterza, logoRanieri].map((logo, i) => (
              <div key={i} className="w-9 h-9 rounded-full border-2 border-white bg-white flex items-center justify-center overflow-hidden shadow-sm ring-1 ring-slate-200">
                <img src={logo} alt={`Clinica ${i + 1}`} className="w-full h-full object-cover rounded-full" width="36" height="36" loading="lazy" />
              </div>
            ))}
          </div>
          <div className="text-sm">
            <div className="flex gap-0.5 text-gold mb-0.5">
              {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={14} weight="fill" />)}
            </div>
            <span className="text-slate-500">Usato da oltre <strong className="text-slate-900">50</strong> studi in Italia</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Phone mockup */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex justify-center lg:justify-end pb-16 lg:pb-0"
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[300px] h-[480px] bg-primary/20 blur-[90px] rounded-full"></div>
        </div>

        <div className="relative w-[260px] sm:w-[290px] md:w-[310px]">
          <div className="relative rounded-[3.5rem] bg-[#080810] p-[10px] shadow-[0_70px_120px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.07),inset_0_1px_0_rgba(255,255,255,0.05)] overflow-hidden">
            <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[88px] h-[26px] bg-[#080810] rounded-full z-20 flex items-center justify-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#1c1c2e]"></div>
              <div className="w-11 h-1.5 rounded-full bg-[#1c1c2e]"></div>
            </div>
            <div
              className="relative rounded-[2.8rem] overflow-hidden bg-[#0f172a] cursor-pointer"
              style={{ aspectRatio: '9/19.5' }}
              onClick={(e) => {
                const video = e.currentTarget.querySelector('video') as HTMLVideoElement | null;
                if (video) { if (video.paused) { video.play(); } else { video.pause(); } }
              }}
            >
              <video
                src={emotionalVideo}
                poster={beforeImg}
                autoPlay={false}
                controls={false}
                muted={false}
                playsInline
                preload="none"
                className="w-full h-full object-cover"
                onPlay={(e) => { e.currentTarget.parentElement?.querySelector('.play-button')?.classList.add('opacity-0', 'pointer-events-none'); }}
                onPause={(e) => { e.currentTarget.parentElement?.querySelector('.play-button')?.classList.remove('opacity-0', 'pointer-events-none'); }}
              />
              <div className="play-button absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 pt-8">
                <div className="w-14 h-14 rounded-full bg-primary/90 text-white flex items-center justify-center shadow-[0_0_30px_rgba(2,132,199,0.6)]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 ml-1">
                    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="absolute right-[-6px] top-[28%] w-[6px] h-10 bg-[#141420] rounded-l-sm shadow-[-1px_0_0_rgba(255,255,255,0.04)]"></div>
            <div className="absolute right-[-6px] top-[42%] w-[6px] h-16 bg-[#141420] rounded-l-sm shadow-[-1px_0_0_rgba(255,255,255,0.04)]"></div>
            <div className="absolute left-[-6px] top-[22%] w-[6px] h-9 bg-[#141420] rounded-r-sm shadow-[1px_0_0_rgba(255,255,255,0.04)]"></div>
            <div className="absolute left-[-6px] top-[34%] w-[6px] h-9 bg-[#141420] rounded-r-sm shadow-[1px_0_0_rgba(255,255,255,0.04)]"></div>
          </div>

          {/* Floating badges */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, type: "spring", stiffness: 180, damping: 18 }}
            className="absolute hidden sm:flex -left-[6.5rem] top-[22%] bg-white rounded-2xl px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.18)] border border-slate-100 items-center gap-3 min-w-[130px]"
          >
            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <TrendUp size={16} weight="fill" className="text-primary" />
            </div>
            <div>
              <div className="text-sm font-black text-text-main num-tabular leading-none">+67%</div>
              <div className="text-[10px] text-text-muted font-medium mt-0.5">conversione</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1, type: "spring", stiffness: 180, damping: 18 }}
            className="absolute hidden sm:flex -right-[6rem] top-[48%] bg-white rounded-2xl px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.18)] border border-slate-100 items-center gap-3 min-w-[120px]"
          >
            <div className="w-8 h-8 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
              <Lightning size={16} weight="fill" className="text-gold" />
            </div>
            <div>
              <div className="text-sm font-black text-text-main num-tabular leading-none">10 sec</div>
              <div className="text-[10px] text-text-muted font-medium mt-0.5">per preview</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, type: "spring", stiffness: 180, damping: 18 }}
            className="absolute hidden sm:flex left-1/2 -translate-x-1/2 -bottom-6 bg-white rounded-2xl px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.18)] border border-slate-100 items-center gap-2.5 whitespace-nowrap"
          >
            <div className="flex gap-0.5">
              {[1, 2, 3].map(i => <Star key={i} size={11} weight="fill" className="text-gold" />)}
            </div>
            <div className="text-xs font-bold text-text-main">50+ studi in Italia</div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </section>
);

// ─── TrustMarquee ─────────────────────────────────────────────────────────────
const TrustMarquee = () => {
  const reviews = [
    { logo: logoBerlinesi, text: "Fantastico, il team e' giovane e professionale. Nel primo mese abbiamo fatto circa 30 preview che ci hanno portato in poltrona 3 casi extra: 6 faccette e 2 mock-up.", author: "Studi Associati Berlinesi" },
    { logo: logoLaterza, text: "La media e' stabile: su 15 preview fatte dalla mia assistente in sala d'attesa, almeno un paziente prenota la visita estetica. Ottimo per aumentare le richieste spontanee.", author: "Studio Dentistico Laterza" },
    { logo: logoFerretti, text: "Quello che apprezzo di piu' e' che il software continua a migliorare. Le ragazze in reception lo propongono come se fosse un gioco, e noi ci troviamo i preventivi firmati sulla scrivania.", author: "Dr. Giacomo Ferretti" },
    { logo: logoRanieri, text: "La nostra ASO ormai lo propone a chiunque entri per una detartrasi. Ci vogliono 10 secondi e il risultato lascia i pazienti a bocca aperta.", author: "Studio Dentistico Ranieri" },
  ];
  const items = [...reviews, ...reviews];

  return (
    <div className="w-full py-10 border-y border-slate-100 bg-slate-50 overflow-hidden relative flex">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>
      <div className="flex animate-marquee min-w-max items-center gap-6 px-4" style={{ animationDuration: '60s' }}>
        {items.map((item, i) => (
          <div key={i} className="flex flex-col gap-3 bg-white p-6 rounded-2xl w-[380px] md:w-[420px] border border-slate-200 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="h-9 w-9 flex-shrink-0 bg-slate-50 rounded-full flex items-center justify-center overflow-hidden border border-slate-200">
                <img src={item.logo} alt="Logo" className="h-full w-full object-cover" width="36" height="36" loading="lazy" />
              </div>
              <div className="flex gap-0.5 text-gold">
                {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={13} weight="fill" />)}
              </div>
            </div>
            <p className="text-sm text-text-main italic leading-relaxed line-clamp-3">"{item.text}"</p>
            <p className="text-xs font-bold text-text-muted uppercase tracking-wider">{item.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── ProblemSection ────────────────────────────────────────────────────────────
const ProblemSection = () => {
  const [activeItem, setActiveItem] = useState(0);

  const items = [
    { image: imgSbiancamento, title: "Sbiancamento", desc: "Da €300 a €800" },
    { image: imgFaccette, title: "Faccette", desc: "Da €800 a €2.500 per elemento" },
    { image: imgImpianti, title: "Implantologia", desc: "Da €1.500 a €5.000" },
    { image: imgOrtodonzia, title: "Ortodonzia", desc: "Da €2.000 a €6.000" },
    { image: null, title: "Zirconio", desc: "Da €500 a €1.800 per corona" },
  ];

  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-200 bg-red-50 mb-8">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span className="text-xs font-bold tracking-widest uppercase text-red-600">Il Problema Nascosto</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-headline font-black leading-tight mb-8 tracking-display">
            Ogni <span className="text-red-500 italic">"ci penso"</span> e' un preventivo da{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">€1.500–€6.000</span>{" "}
            che esce dalla porta.
          </h2>
          <p className="text-xl text-text-muted leading-relaxed">
            Non una volta ogni tanto. <strong className="text-text-main">Ogni settimana.</strong> In Italia solo il 34% dei pazienti va dal dentista con regolarita'. Chi e' gia' entrato nel tuo studio ha gia' fatto il passo piu' difficile. Senza uno strumento che trasformi il desiderio in decisione, il preventivo rimane un foglio su un tavolo.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-2">
            <h3 className="text-xl font-headline font-bold mb-6 text-text-muted uppercase tracking-widest text-sm">Aumenta l'accettazione su qualsiasi trattamento:</h3>
            {items.map((item, i) => (
              <div
                key={i}
                onMouseEnter={() => setActiveItem(i)}
                className={`flex items-center justify-between gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-200 border ${activeItem === i ? 'bg-primary/5 border-primary/30 shadow-sm' : 'bg-transparent border-transparent hover:bg-slate-50 hover:border-slate-200'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full transition-colors ${activeItem === i ? 'bg-primary' : 'bg-slate-300'}`}></div>
                  <span className={`font-semibold text-lg transition-colors ${activeItem === i ? 'text-text-main' : 'text-text-muted'}`}>{item.title}</span>
                </div>
                <span className={`text-sm font-semibold transition-colors ${activeItem === i ? 'text-primary' : 'text-text-muted'}`}>{item.desc}</span>
              </div>
            ))}
          </div>

          <div className="relative h-[400px] md:h-[520px] w-full rounded-3xl overflow-hidden border border-slate-200 shadow-[0_24px_80px_rgba(0,0,0,0.08)] bg-slate-50 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.35 }}
                className="w-full h-full flex items-center justify-center p-8"
              >
                {items[activeItem].image ? (
                  <img
                    src={items[activeItem].image}
                    alt={items[activeItem].title}
                    className="max-w-full max-h-full object-contain rounded-xl"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-300">
                    <div className="text-7xl mb-4">🦷</div>
                    <p className="text-sm font-medium tracking-widest uppercase text-slate-400">Foto in arrivo</p>
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

// ─── AnimatedNumbers ───────────────────────────────────────────────────────────
const AnimatedNumbers = () => {
  const stats = [
    { icon: <Users size={28} weight="fill" className="text-gold" />, value: "50+", label: "Studi Attivi in Italia", color: "text-gold" },
    { icon: <TrendUp size={28} weight="fill" className="text-sky-300" />, value: "+67%", label: "Conversione Media", color: "text-sky-300" },
    { icon: <Pulse size={28} weight="fill" className="text-white" />, value: "€700k+", label: "Generati in Extra", color: "text-white" },
    { icon: <Lightning size={28} weight="fill" className="text-gold" />, value: "10s", label: "Per Simulazione", color: "text-white" },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-[#020c1a] via-[#041020] to-[#071830]">
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)', backgroundSize: '36px 36px' }}></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[180px] bg-primary/30 blur-[100px] rounded-full pointer-events-none"></div>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 text-center relative z-10"
      >
        {stats.map((s, i) => (
          <motion.div key={i} variants={fadeUp} className="flex flex-col items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/8 border border-white/10 flex items-center justify-center">
              {s.icon}
            </div>
            <div className={`text-4xl md:text-5xl font-headline font-black num-tabular ${s.color}`}>{s.value}</div>
            <div className="text-xs uppercase tracking-widest text-white/40 font-semibold leading-snug">{s.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

// ─── HowItWorks ────────────────────────────────────────────────────────────────
const HowItWorks = () => {
  const steps = [
    {
      num: "01",
      icon: <Users size={20} weight="light" className="text-primary" />,
      title: "Poster in sala d'attesa",
      desc: "Una sola frase. Nasce la curiosita' nel paziente ancora prima di entrare in poltrona.",
    },
    {
      num: "02",
      icon: <Camera size={20} weight="light" className="text-primary" />,
      title: "Lo staff genera la preview",
      desc: "La segretaria o l'ASO carica la foto e in 30 secondi la preview e' pronta. Zero intervento del dentista.",
      highlight: true,
    },
    {
      num: "03",
      icon: <Sparkle size={20} weight="light" className="text-primary" />,
      title: "Il paziente vede il suo sorriso",
      desc: "Sul tablet, sul PC, sullo schermo della reception. Non un esempio generico. Il suo sorriso, trasformato.",
    },
    {
      num: "04",
      icon: <CheckCircle size={20} weight="light" className="text-primary" />,
      title: "Il dentista chiude il trattamento",
      desc: "Il paziente non sta firmando un preventivo astratto. Sta dicendo si' a qualcosa che ha gia' visto sul suo viso.",
    },
  ];

  return (
    <section id="come-funziona" className="py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline font-black mb-6 tracking-display">
            Non stai installando un software.<br />
            <span className="italic font-serif font-normal text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Stai attivando un protocollo.</span>
          </h2>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            Uno studio a Bologna lo usa cosi': il poster in sala d'attesa dice una cosa sola. La segretaria apre SmileLive. 30 secondi. La paziente vede. Poi: <strong className="text-primary">"Quando possiamo iniziare?"</strong>
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className={`relative bg-white rounded-2xl border p-7 overflow-hidden group hover:shadow-[0_8px_32px_rgba(2,132,199,0.12)] transition-all duration-300 ${step.highlight ? 'border-primary/40 shadow-[0_4px_24px_rgba(2,132,199,0.1)]' : 'border-slate-200 shadow-sm'}`}
            >
              {/* Big background number */}
              <div className="absolute -top-4 -right-2 text-[7rem] font-black text-slate-100 leading-none select-none pointer-events-none group-hover:text-primary/8 transition-colors duration-300">
                {step.num}
              </div>
              {step.highlight && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-sky-400"></div>
              )}
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-5 relative z-10">
                {step.icon}
              </div>
              <h3 className="font-bold text-lg mb-3 text-text-main relative z-10">{step.title}</h3>
              <p className="text-text-muted text-base leading-relaxed relative z-10">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 bg-white rounded-2xl border border-gold/30 p-8 max-w-4xl mx-auto shadow-sm"
        >
          <div className="flex items-start gap-5">
            <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center shrink-0 mt-1">
              <Sparkle size={20} weight="fill" className="text-gold" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-text-main mb-2">Sulla precisione della simulazione</h3>
              <p className="text-text-muted leading-relaxed">
                SmileLive non e' uno strumento diagnostico — e' uno <strong className="text-text-main">strumento di desiderio</strong>. Il suo compito non e' garantire il risultato clinico. Il suo compito e' far nascere nel paziente la voglia di iniziare. Per i casi riproducibili, la preview e' molto accurata. Per i casi complessi, sblocca la conversazione. <strong className="text-gold">Funziona in entrambi i casi.</strong>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ─── WhatYouGet ───────────────────────────────────────────────────────────────
const WhatYouGet = () => {
  const features = [
    {
      iconComp: <ClipboardText size={22} weight="light" className="text-primary" />,
      iconBg: "bg-primary/10",
      topBorder: "border-t-primary",
      title: "Schede Paziente",
      subtitle: "sai sempre dove sei con ogni paziente",
      body: "Ogni scheda SmileLive ha tutto in un colpo d'occhio — simulazioni fatte, preventivi inviati, stato del trattamento, note. Una timeline cronologica dall'inizio.",
      states: ["In valutazione", "Preventivo inviato", "Accettato", "In trattamento"],
    },
    {
      iconComp: <Microphone size={22} weight="light" className="text-gold" />,
      iconBg: "bg-gold/10",
      topBorder: "border-t-gold",
      title: "Preventivo Intelligente",
      subtitle: "dalla voce alla firma digitale",
      body: "Detti a voce le voci del preventivo. L'AI trascrive e struttura automaticamente. Il paziente riceve un link sul telefono. Apre, legge, firma digitalmente.",
      states: ["Bozza", "Inviato", "Firmato"],
    },
    {
      iconComp: <ChatCircle size={22} weight="light" className="text-primary" />,
      iconBg: "bg-primary/10",
      topBorder: "border-t-sky-400",
      title: "Promemoria WhatsApp",
      subtitle: "zero no-show, zero telefonate",
      body: "Ogni paziente riceve un WhatsApp 24 ore prima dell'appuntamento. E un altro 2 ore prima. Il sistema gira da solo, ogni ora, anche di notte.",
      states: null,
    },
    {
      iconComp: <Receipt size={22} weight="light" className="text-secondary" />,
      iconBg: "bg-secondary/10",
      topBorder: "border-t-secondary",
      title: "Fatturazione Self-Service",
      subtitle: "il paziente compila da solo",
      body: "La segreteria invia un link via WhatsApp. Il paziente apre dal telefono — ancora in sala d'attesa — e inserisce i suoi dati fiscali. Nessun codice fiscale scritto a mano.",
      states: null,
    },
    {
      iconComp: <FileArrowDown size={22} weight="light" className="text-gold" />,
      iconBg: "bg-gold/10",
      topBorder: "border-t-gold",
      title: "Export Commercialista",
      subtitle: "chiudi il mese in 3 click",
      body: "Fine mese. Selezioni il periodo, vedi tutti i preventivi accettati con i relativi importi, modifichi se serve, scarichi il file strutturato.",
      states: null,
    },
    {
      iconComp: <ChartLineUp size={22} weight="light" className="text-primary" />,
      iconBg: "bg-primary/10",
      topBorder: "border-t-primary",
      title: "Dashboard",
      subtitle: "una schermata che vale una riunione",
      body: "Apri SmileLive e in 5 secondi sai: preventivi generati, accettati, in attesa, valore in euro, crediti reminder disponibili. Non devi piu' aspettare la fine del mese.",
      states: null,
    },
  ];

  const bentoSpan = [2, 1, 2, 1, 1, 2];

  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-headline font-black mb-4 tracking-display">
            Aspetta. Non e' solo la preview del sorriso.
          </h2>
          <p className="text-xl text-text-muted max-w-2xl mx-auto mb-4">
            Mentre lo usavi per convertire pazienti indecisi, SmileLive lavorava anche su tutto il resto.
          </p>
          <p className="text-lg text-text-muted max-w-3xl mx-auto">
            Ogni studio perde soldi in tre modi silenziosi: pazienti che non firmano, appuntamenti dimenticati, burocrazia che mangia ore. SmileLive risolve tutti e tre. In un unico posto.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className={`bg-white rounded-2xl border-t-2 border border-slate-200 p-7 flex flex-col group hover:border-primary/30 hover:shadow-[0_8px_32px_rgba(2,132,199,0.08)] transition-all duration-300 ${f.topBorder} ${bentoSpan[i] === 2 ? 'md:col-span-2' : ''}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-11 h-11 rounded-2xl ${f.iconBg} flex items-center justify-center shrink-0`}>
                  {f.iconComp}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-main">{f.title}</h3>
                  <p className="text-sm text-primary font-semibold tracking-wide">{f.subtitle}</p>
                </div>
              </div>
              <p className="text-text-muted text-base leading-relaxed flex-1">{f.body}</p>
              {f.states && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {f.states.map((s, j) => (
                    <span key={j} className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary/8 text-primary border border-primary/20">
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
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 bg-gradient-to-r from-gold/5 to-transparent border border-gold/20 rounded-2xl p-8 text-center max-w-3xl mx-auto"
        >
          <p className="text-text-muted leading-relaxed mb-2">
            Tutto questo normalmente costa €30–50 al mese per ogni singolo strumento. CRM, preventivi digitali, firma elettronica, promemoria automatici, gestione fiscale.
          </p>
          <p className="text-text-main font-bold text-lg mb-6">
            SmileLive li fa tutti. In uno. <span className="text-gold">Tutti inclusi nel tuo abbonamento.</span>
          </p>
          <motion.a
            href="https://app.smilelive.it/"
            onClick={() => trackCta("inizia_gratis", "what_you_get")}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="inline-flex items-center gap-3 bg-primary text-white font-bold px-8 py-4 rounded-full shadow-[0_8px_32px_rgba(2,132,199,0.3)] hover:shadow-[0_8px_48px_rgba(2,132,199,0.45)] transition-shadow duration-300"
          >
            Inizia gratis — nessuna carta richiesta
            <CaretRight size={16} weight="bold" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

// ─── ROICalculator ─────────────────────────────────────────────────────────────
const ROICalculator = () => {
  const [previews, setPreviews] = useState(100);
  const [conversion, setConversion] = useState(4);
  const [ticket, setTicket] = useState(1200);

  const monthlyPatients = Math.floor(previews * (conversion / 100));
  const extraRevenue = monthlyPatients * ticket;

  return (
    <section className="py-28 bg-slate-50">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-5xl mx-auto px-6"
      >
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-headline font-black mb-4 tracking-display">
            Simula il tuo flusso di cassa
          </h2>
          <p className="text-xl text-text-muted">Gli studi che usano SmileLive chiudono in media 2–3 trattamenti estetici in piu' al mese nei primi 60 giorni.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label htmlFor="previews-range" className="text-sm font-medium text-text-muted">Preview generate al mese</label>
                <span className="text-2xl font-black text-primary num-tabular">{previews}</span>
              </div>
              <input id="previews-range" type="range" aria-label="Numero di preview mensili" min="10" max="200" step="10" value={previews} onChange={(e) => setPreviews(Number(e.target.value))} className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary" />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label htmlFor="conversion-range" className="text-sm font-medium text-text-muted">Tasso di conversione stimato</label>
                <span className="text-2xl font-black text-primary num-tabular">{conversion}%</span>
              </div>
              <input id="conversion-range" type="range" aria-label="Tasso di conversione" min="1" max="50" step="1" value={conversion} onChange={(e) => setConversion(Number(e.target.value))} className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary" />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label htmlFor="ticket-range" className="text-sm font-medium text-text-muted">Ticket medio del trattamento</label>
                <span className="text-2xl font-black text-primary num-tabular">€{ticket}</span>
              </div>
              <input id="ticket-range" type="range" aria-label="Valore ticket medio" min="300" max="12000" step="100" value={ticket} onChange={(e) => setTicket(Number(e.target.value))} className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary" />
            </div>
          </div>

          <div className="bg-gradient-to-b from-[#020c1a] to-[#041832] rounded-2xl border border-primary/20 p-10 flex flex-col justify-center relative overflow-hidden text-center shadow-[0_8px_40px_rgba(2,132,199,0.2)]">
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/15 blur-[80px] rounded-full pointer-events-none"></div>
            <div className="relative z-10 space-y-8">
              <div>
                <p className="text-white/50 mb-2 font-medium text-sm uppercase tracking-widest">Nuovi pazienti al mese</p>
                <div className="text-5xl font-headline font-black text-white num-tabular">+{monthlyPatients}</div>
              </div>
              <div>
                <p className="text-white/50 mb-2 font-medium text-sm uppercase tracking-widest">Fatturato extra stimato</p>
                <div className="text-6xl font-headline font-black text-gold num-tabular">€{extraRevenue.toLocaleString('it-IT')}</div>
                <p className="text-white/30 text-sm mt-1">al mese</p>
              </div>
              <div className="pt-6 border-t border-white/10">
                <p className="text-sm text-white/40 leading-relaxed">
                  SmileLive Studio Piccolo: <strong className="text-white/60">€47/mese</strong> annuale.<br />Un solo trattamento in piu' lo ripaga in meno di un'ora di lavoro.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

// ─── IntermediateCTA ────────────────────────────────────────────────────────────
const IntermediateCTA = () => (
  <section className="py-24 relative overflow-hidden bg-gradient-to-r from-[#020c1a] to-[#041832]">
    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
    <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto px-6 text-center relative z-10"
    >
      <h2 className="text-4xl md:text-5xl font-headline font-black mb-4 leading-tight text-white tracking-display">
        Chi ti dice "ci penso"<br />potrebbe dirti si'.
      </h2>
      <p className="text-xl text-white/50 mb-10">Se gli mostri il risultato.</p>
      <motion.a
        href="https://app.smilelive.it/"
        onClick={() => trackCta("inizia_gratis", "intermediate_cta")}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="group inline-flex items-center gap-3 bg-primary text-white font-headline font-bold uppercase tracking-wider px-8 py-4 rounded-full shadow-[0_8px_40px_rgba(2,132,199,0.5)] hover:shadow-[0_8px_60px_rgba(2,132,199,0.7)] transition-shadow duration-300"
      >
        Inizia gratis — nessuna carta richiesta
        <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center group-hover:translate-x-0.5 transition-transform duration-200">
          <CaretRight size={14} weight="bold" />
        </span>
      </motion.a>
    </motion.div>
  </section>
);

// ─── Pricing ───────────────────────────────────────────────────────────────────
const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const studioPlans = [
    { name: "Studio Piccolo", tagline: "Per studi che iniziano", monthly: 57, annualMonthly: 47, annualTotal: 564, foto: 20, video: 8, promemoria: 25, extra: "5€/foto · 5€/video · €0,20/promemoria", cta: "Scegli Studio Piccolo", ctaId: "scegli_studio_piccolo", highlighted: false },
    { name: "Studio Medio", tagline: "Per studi attivi", monthly: 114, annualMonthly: 94, annualTotal: 1128, foto: 50, video: 18, promemoria: 50, extra: "5€/foto · 5€/video · €0,19/promemoria", cta: "Scegli Studio Medio", ctaId: "scegli_studio_medio", highlighted: true },
    { name: "Studio Grande", tagline: "Per grandi studi e cliniche", monthly: 157, annualMonthly: 137, annualTotal: 1644, foto: 120, video: 30, promemoria: 125, extra: "2€/foto · 3€/video · €0,18/promemoria", cta: "Scegli Studio Grande", ctaId: "scegli_studio_grande", highlighted: false },
  ];

  const rules = [
    { icon: Sparkle, title: "Inizi gratis", body: "3 foto + 1 video in omaggio alla registrazione. Senza abbonamento generi ancora a 5€/foto e 5€/video — nessun canone fisso." },
    { icon: ShieldCheck, title: "Errore nostro? Rigenerazione gratis entro 24h", body: "Se una generazione esce male la segnali con un tasto: la verifichiamo e, se l'errore e' nostro, la rifacciamo gratis entro 24 ore." },
    { icon: Camera, title: "Le modifiche creative scalano dal piano", body: "Le modifiche che chiedi tu (es. 'piu' bianchi', forma diversa) contano come una generazione normale e scalano dalle quote del piano." },
    { icon: Lightning, title: "Mai un blocco in poltrona", body: "Al raggiungimento del limite non si blocca nulla: addebito automatico dell'extra o passaggio al piano superiore. Col paziente davanti non ti fermi mai." },
  ];

  return (
    <section id="pricing" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-headline font-black text-center mb-4 tracking-display">Scegli il tuo piano</h2>
          <p className="text-xl text-text-muted text-center mb-4">Inizia gratis con 3 anteprime. Poi scegli il piano giusto per il tuo studio.</p>
          <p className="text-base text-text-muted text-center max-w-2xl mb-8">L'abbonamento sblocca tutto il software e le generazioni incluse ogni mese. L'opzione annuale si paga in un'unica soluzione anticipata, al prezzo piu' basso.</p>
          <div className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-full p-1.5">
            <button onClick={() => setIsAnnual(false)} className={`px-5 py-2 rounded-full font-medium transition-colors duration-200 ${!isAnnual ? 'bg-white shadow-sm text-text-main' : 'text-text-muted hover:text-text-main'}`}>Mensile</button>
            <button onClick={() => setIsAnnual(true)} className={`px-5 py-2 rounded-full font-medium transition-colors duration-200 flex items-center gap-2 ${isAnnual ? 'bg-white shadow-sm text-text-main' : 'text-text-muted hover:text-text-main'}`}>
              Annuale <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">anticipato</span>
            </button>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch max-w-7xl mx-auto"
        >
          {/* FREE */}
          <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 flex flex-col items-center text-center hover:shadow-md hover:border-slate-300 transition-all duration-200">
            <h3 className="text-xl font-semibold mb-1 text-text-main">Free</h3>
            <p className="text-sm text-text-muted mb-4">Per provare</p>
            <div className="text-4xl font-headline font-black mb-1 num-tabular text-text-main">€0<span className="text-sm text-text-muted font-normal">/mese</span></div>
            <div className="h-px w-full bg-slate-100 my-5"></div>
            <ul className="text-text-muted text-base space-y-3 mb-8 flex-grow text-left w-full">
              <li className="flex items-start gap-2"><Check size={16} weight="bold" className="text-primary shrink-0 mt-0.5" /><span><strong className="text-text-main">3 foto + 1 video</strong> in omaggio</span></li>
              <li className="flex items-start gap-2"><Check size={16} weight="bold" className="text-primary shrink-0 mt-0.5" /><span>Tab <strong className="text-text-main">SmileLive Preview</strong> attiva subito</span></li>
              <li className="flex items-start gap-2"><Check size={16} weight="bold" className="text-primary shrink-0 mt-0.5" /><span>Poi <strong className="text-text-main">5€/foto · 5€/video</strong>, senza canone</span></li>
              <li className="text-sm pt-2 border-t border-slate-100 text-text-muted">Il resto si sblocca con l'abbonamento.</li>
            </ul>
            <a href="https://app.smilelive.it/" onClick={() => trackCta("inizia_gratis", "pricing_free")} className="w-full py-3 rounded-full border border-slate-200 hover:bg-slate-50 transition-all font-medium text-sm text-center text-text-muted">Inizia gratis</a>
          </motion.div>

          {studioPlans.map((plan) => {
            const price = isAnnual ? plan.annualMonthly : plan.monthly;
            const saving = (plan.monthly - plan.annualMonthly) * 12;
            return (
              <motion.div
                key={plan.name}
                variants={fadeUp}
                className={`rounded-2xl p-8 flex flex-col items-center text-center relative ${plan.highlighted
                  ? 'bg-gradient-to-b from-[#020c1a] to-[#041832] border border-primary/30 shadow-[0_0_60px_rgba(2,132,199,0.25)]'
                  : 'bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200'
                }`}
              >
                {plan.highlighted && (
                  <>
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-sky-400 rounded-t-2xl"></div>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                      Il piu' scelto
                    </div>
                  </>
                )}
                <h3 className={`mb-1 ${plan.highlighted ? 'text-xl font-bold text-sky-300 mt-4' : 'text-xl font-semibold text-text-main'}`}>{plan.name}</h3>
                <p className={`text-sm mb-4 ${plan.highlighted ? 'text-white/40' : 'text-text-muted'}`}>{plan.tagline}</p>
                <div className={`${plan.highlighted ? 'text-5xl text-white' : 'text-4xl text-text-main'} font-headline font-black mb-1 num-tabular`}>€{price}<span className={`text-sm font-normal ${plan.highlighted ? 'text-white/40' : 'text-text-muted'}`}>/mese</span></div>
                {isAnnual && <div className={`text-sm font-semibold mb-0.5 ${plan.highlighted ? 'text-sky-300' : 'text-primary'}`}>€{plan.annualTotal.toLocaleString("it-IT")}/anno · risparmi €{saving}</div>}
                {isAnnual && <div className={`text-xs mb-1 ${plan.highlighted ? 'text-white/30' : 'text-text-muted'}`}>in un'unica soluzione anticipata</div>}
                <div className={`h-px w-full my-5 ${plan.highlighted ? 'bg-white/10' : 'bg-slate-100'}`}></div>
                <ul className={`${plan.highlighted ? 'text-white/60' : 'text-text-muted'} text-base space-y-3 mb-8 flex-grow text-left w-full`}>
                  <li className="flex items-start gap-2"><Check size={16} weight="bold" className="text-sky-400 shrink-0 mt-0.5" /><span><strong className={plan.highlighted ? 'text-white' : 'text-text-main'}>{plan.foto} foto</strong> (preview)/mese</span></li>
                  <li className="flex items-start gap-2"><Check size={16} weight="bold" className="text-sky-400 shrink-0 mt-0.5" /><span><strong className={plan.highlighted ? 'text-white' : 'text-text-main'}>{plan.video} video</strong>/mese</span></li>
                  <li className="flex items-start gap-2"><Check size={16} weight="bold" className="text-sky-400 shrink-0 mt-0.5" /><span><strong className={plan.highlighted ? 'text-white' : 'text-text-main'}>{plan.promemoria} promemoria</strong> WhatsApp/SMS</span></li>
                  {plan.highlighted && <li className="flex items-start gap-2"><Check size={16} weight="bold" className="text-sky-400 shrink-0 mt-0.5" /><span className="text-white/60">Supporto prioritario</span></li>}
                  <li className={`text-sm pt-2 border-t ${plan.highlighted ? 'border-white/10 text-white/30' : 'border-slate-100 text-text-muted'}`}>Extra: {plan.extra}</li>
                </ul>
                <a
                  href="https://app.smilelive.it/"
                  onClick={() => trackCta(plan.ctaId, "pricing")}
                  className={`w-full py-3 rounded-full transition-all text-sm text-center font-bold ${plan.highlighted ? 'bg-primary text-white hover:bg-sky-500 shadow-[0_4px_24px_rgba(2,132,199,0.4)]' : 'border border-slate-200 hover:bg-slate-50 text-text-main'}`}
                >
                  {plan.cta}
                </a>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20 max-w-5xl mx-auto text-center"
        >
          <h3 className="text-2xl md:text-3xl font-headline font-bold mb-3 tracking-display">Come funzionano le generazioni</h3>
          <p className="text-text-muted max-w-2xl mx-auto">Regole chiare, nessuna sorpresa in fattura — e nessun blocco col paziente in poltrona.</p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10 max-w-5xl mx-auto"
        >
          {rules.map((rule, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex items-start gap-4 hover:border-primary/30 hover:shadow-md transition-all duration-300 text-left"
            >
              <div className="w-11 h-11 shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                <rule.icon size={20} weight="light" className="text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-text-main mb-1">{rule.title}</h4>
                <p className="text-text-muted text-sm leading-relaxed">{rule.body}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 max-w-3xl mx-auto bg-amber-50 border border-gold/30 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6"
        >
          <div className="w-14 h-14 shrink-0 rounded-full bg-gold/15 flex items-center justify-center">
            <Sparkle size={26} weight="fill" className="text-gold" />
          </div>
          <div>
            <p className="font-bold text-lg text-text-main mb-1">Senza abbonamento? Paghi solo quando usi.</p>
            <p className="text-text-muted text-base leading-relaxed">
              Dopo le <strong className="text-text-main">3 anteprime in omaggio</strong> puoi generare a <strong className="text-text-main">5€/foto</strong> e <strong className="text-text-main">5€/video</strong>, senza canone fisso. Quando vedi che funziona, passi a un abbonamento.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ─── Testimonials ──────────────────────────────────────────────────────────────
const Testimonials = () => {
  const reviews = [
    { logo: logoBerlinesi, name: "Studi Associati Berlinesi", role: "Studio Dentistico", text: "Fantastico, il team di SmileLive e' giovane e professionale. In pochissimo tempo il sistema e' stato inserito nell'operativita' della segreteria, e nel primo mese abbiamo fatto circa 30 preview che ci hanno portato in poltrona 3 casi extra: 6 faccette e 2 mock-up. Sono molto soddisfatto.", highlight: "3 casi extra nel primo mese" },
    { logo: logoLaterza, name: "Studio Dentistico Laterza", role: "Studio Dentistico", text: "Uso SmileLive ormai da sei mesi e non potrei farne a meno. La media e' stabile: su 15 preview fatte dalla mia assistente in sala d'attesa, almeno un paziente prenota la visita estetica. Ora stiamo lavorando per migliorare la visibilita' del poster in studio.", highlight: "1 paziente nuovo ogni 15 preview" },
    { logo: logoFerretti, name: "Dr. Giacomo Ferretti", role: "Odontoiatra", text: "Quello che apprezzo di piu', oltre al fatto che mi genera conversioni in automatico, e' che il software continua a migliorare. L'ultimo aggiornamento ha reso i video ancora piu' realistici. Le ragazze in reception lo propongono come se fosse un gioco.", highlight: "Aggiornamenti continui e utili" },
    { logo: logoRanieri, name: "Studio Dentistico Ranieri", role: "Studio Dentistico", text: "La nostra ASO ormai lo propone a chiunque entri per una detartrasi. Ci vogliono 10 secondi e il risultato sul tablet lascia i pazienti a bocca aperta. Il mese scorso abbiamo chiuso 2 sbiancamenti e un ponte solo grazie alle preview spontanee.", highlight: "Integrazione perfetta post-igiene" },
  ];

  return (
    <section className="py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-headline font-black text-center mb-16 tracking-display"
        >
          Risultati reali da studi reali.
        </motion.h2>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="bg-white border-l-4 border-l-primary border border-slate-200 rounded-r-2xl p-8 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-l-sky-400 transition-all duration-300"
            >
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0">
                    <img src={r.logo} alt={r.name} className="w-full h-full object-cover" width="40" height="40" loading="lazy" />
                  </div>
                  <div>
                    <p className="font-bold text-text-main text-sm">{r.name}</p>
                    <p className="text-xs text-text-muted">{r.role}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={14} weight="fill" className="text-gold" />)}
                  </div>
                </div>
                <p className="text-text-muted leading-relaxed italic">"{r.text}"</p>
              </div>
              <div className="mt-6 pt-5 border-t border-slate-100">
                <span className="inline-block bg-primary/8 text-primary text-xs font-bold px-3 py-1 rounded-full border border-primary/20">
                  {r.highlight}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ─── ForWho ────────────────────────────────────────────────────────────────────
const ForWho = () => (
  <section className="py-28 bg-white">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto px-6"
    >
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline font-black mb-12 text-center tracking-display">Sei uno di loro?</h2>
      <div className="space-y-4 mb-12">
        {[
          { icon: <Users size={28} weight="light" className="text-primary shrink-0" />, title: "Dentista generalista", desc: "Vuoi aumentare i casi estetici senza cambiare il tuo workflow." },
          { icon: <Star size={28} weight="light" className="text-gold shrink-0" />, title: "Specialista estetica", desc: "Hai gia' i pazienti. Ti manca lo strumento che li fa decidere." },
          { icon: <Medal size={28} weight="light" className="text-secondary shrink-0" />, title: "Clinic manager", desc: "Vuoi uno standard di consulenza che funzioni su tutto il team." },
          { icon: <TrendUp size={28} weight="light" className="text-primary shrink-0" />, title: "Studio giovane", desc: "Stai costruendo la tua base pazienti e vuoi differenziarti subito." },
          { icon: <Pulse size={28} weight="light" className="text-primary shrink-0" />, title: "Ortodontista / implantologo", desc: "Vuoi integrare la visualizzazione nel percorso di accettazione del piano." },
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="bg-white border border-slate-200 rounded-2xl p-6 flex gap-4 items-start shadow-sm hover:border-primary/30 hover:shadow-md transition-all duration-200 cursor-default"
          >
            {item.icon}
            <div>
              <strong className="text-text-main text-lg block mb-1">{item.title}</strong>
              <p className="text-text-muted">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-50 to-transparent border-l-4 border-gold">
        <p className="text-xl font-semibold text-gold italic">
          Se ti riconosci anche in uno solo di questi — questo strumento e' stato costruito per te.
        </p>
      </div>
    </motion.div>
  </section>
);

// ─── FutureVision ──────────────────────────────────────────────────────────────
const FutureVision = () => (
  <section id="future" className="py-28 bg-slate-50">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto px-6 text-center"
    >
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-white shadow-sm mb-8">
        <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
        <span className="text-xs font-bold tracking-widest uppercase text-secondary">La Visione</span>
      </div>
      <h2 className="text-4xl md:text-5xl font-headline font-black mb-4 tracking-display">
        Da strumento di conversione<br />
        <span className="italic font-serif font-normal text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">a sistema di gestione.</span>
      </h2>
      <p className="text-xl text-text-muted leading-relaxed mb-3 max-w-2xl mx-auto">SmileLive non e' solo preview. E' il software che mancava al tuo studio.</p>
      <p className="text-lg text-text-muted leading-relaxed mb-12 max-w-2xl mx-auto">Chi e' abbonato entrera' automaticamente nella nostra <strong className="text-text-main">Vetrina di Odontoiatri Specialisti</strong> — un vantaggio competitivo enorme per le richieste locali.</p>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left"
      >
        <motion.div variants={fadeUp} className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:border-primary/30 hover:shadow-md transition-all duration-300">
          <Target size={28} weight="light" className="text-primary mb-4" />
          <h3 className="text-xl font-bold mb-2 text-text-main">Marketing e ADS Centralizzati</h3>
          <p className="text-text-muted leading-relaxed">Intercettiamo i pazienti indecisi o insoddisfatti del proprio sorriso tramite campagne digitali mirate, educandoli alle possibilita' estetiche prima ancora che entrino in studio.</p>
        </motion.div>
        <motion.div variants={fadeUp} className="bg-white border border-primary/30 rounded-2xl p-8 shadow-sm relative overflow-hidden hover:shadow-md transition-all duration-300">
          <div className="absolute top-4 right-4 bg-primary/10 text-primary text-xs uppercase tracking-widest font-bold px-2 py-1 rounded">Vantaggio Locale</div>
          <Medal size={28} weight="light" className="text-primary mb-4" />
          <h3 className="text-xl font-bold mb-2 text-text-main">Vetrina Specialisti Esclusiva</h3>
          <p className="text-text-muted leading-relaxed">I pazienti sceglieranno con chi effettuare il trattamento consultando il nostro network. <strong className="text-text-main">Posizionarsi per primi nella propria citta' garantisce un vantaggio competitivo enorme.</strong></p>
        </motion.div>
      </motion.div>
    </motion.div>
  </section>
);

// ─── FAQ ───────────────────────────────────────────────────────────────────────
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = [
    { q: "Posso provarlo senza abbonarmi?", a: "Si'. La registrazione e' gratuita e ti regaliamo 3 foto e 1 video in omaggio nella tab SmileLive Preview — senza carta, senza impegno. Il resto del software resta visibile e si sblocca quando attivi un abbonamento. Per generare ancora senza abbonarti, paghi 5€ a foto e 5€ a video." },
    { q: "Meglio l'abbonamento o pagare a consumo?", a: "Dipende dal volume. Senza abbonamento generi a 5€/foto e 5€/video — comodo per testare. Con un abbonamento Studio hai foto e video inclusi ogni mese a un costo unitario molto piu' basso, piu' i promemoria WhatsApp/SMS e tutto il software sbloccato. Sul piano Studio Grande anche gli extra costano meno: 2€/foto e 3€/video." },
    { q: "Cosa succede se una preview esce male (denti deformati, artefatti)?", a: "La generazione scala comunque dal piano, ma con un tasto la segnali: verifichiamo il caso e, se l'errore e' nostro, la rigeneriamo gratis entro 24 ore. Le modifiche creative che chiedi tu (piu' bianchi, forma diversa) contano invece come una generazione normale." },
    { q: "E se finisco le foto o i video inclusi nel mese?", a: "Non ti blocchiamo mai — soprattutto col paziente in poltrona. Al raggiungimento del limite scatta l'addebito automatico dell'extra (5€/foto · 5€/video, 2€/foto · 3€/video sullo Studio Grande) oppure puoi passare al piano superiore. Decidi tu." },
    { q: "Chi genera le preview? Devo farlo io?", a: "No. Il protocollo e' pensato per la segreteria o l'ASO. E' semplicissimo da usare — da quel momento lo staff lavora in autonomia, tu sei in poltrona." },
    { q: "Il 70% di accuratezza visiva non e' troppo basso?", a: "SmileLive non e' uno strumento diagnostico — e' uno strumento di desiderio. Il suo compito non e' garantire il risultato clinico, quello e' il tuo. Il suo compito e' far nascere nel paziente la voglia di iniziare. Per i casi riproducibili, la preview e' molto accurata. Per i casi complessi, sblocca la conversazione. Funziona in entrambi i casi." },
    { q: "Posso usarlo per l'implantologia o solo per l'estetica?", a: "SmileLive lavora su qualsiasi trattamento che cambia visibilmente il sorriso — faccette, sbiancamento, ortodonzia, protesi, impianti su arcata. Se il risultato si vede, SmileLive lo puo' mostrare." },
    { q: "Perche' SmileLive e non un semplice fotomontaggio o Photoshop?", a: "Un fotomontaggio richiede tempo, un grafico e va rifatto per ogni paziente. SmileLive genera l'anteprima dal volto reale del paziente in 10 secondi, direttamente in studio, senza competenze tecniche — e lo fa la segreteria, non tu." },
    { q: "In cosa e' diverso dal mostrare le foto 'prima e dopo' di altri pazienti?", a: "Le foto di altri pazienti chiedono al tuo di immaginare 'e se fossi io?'. SmileLive elimina quel salto: il paziente vede il proprio sorriso trasformato, sul proprio viso. E' la differenza tra un esempio generico e una promessa personale." },
    { q: "Come vi confrontate con gli altri software di simulazione del sorriso?", a: "Molti strumenti richiedono editing manuale, hardware dedicato o formazione. SmileLive parte da una singola foto scattata con qualsiasi smartphone e genera foto e video in pochi secondi. E' pensato per il flusso reale di uno studio italiano, non per un laboratorio." },
  ];

  return (
    <section id="faq" className="py-28 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto px-6"
      >
        <h2 className="text-4xl md:text-5xl font-headline font-black mb-4 text-center tracking-display">Domande frequenti</h2>
        <p className="text-text-muted text-center mb-12">Tutto quello che vuoi sapere.</p>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:border-slate-300 transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left flex items-center justify-between gap-3 p-5 hover:bg-slate-50 transition-colors duration-200"
                aria-expanded={openIndex === i}
              >
                <span className="font-bold text-base text-text-main">{faq.q}</span>
                <CaretRight
                  size={16}
                  weight="bold"
                  className={`text-primary shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-90' : ''}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    key="body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="text-text-muted text-base leading-relaxed px-5 pb-5">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

// ─── FinalCTA ──────────────────────────────────────────────────────────────────
const FinalCTA = () => (
  <section className="py-40 relative overflow-hidden text-center bg-gradient-to-b from-[#030e20] via-[#051628] to-[#0a2340]">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-primary/20 blur-[160px] rounded-full pointer-events-none"></div>
    <div className="absolute top-0 left-1/4 w-[400px] h-[300px] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="max-w-4xl mx-auto px-6 relative z-10"
    >
      <h2 className="text-5xl md:text-7xl font-headline font-black mb-6 leading-tight text-white tracking-display">
        Il tuo prossimo paziente indeciso e' gia' in sala d'attesa.
      </h2>
      <p className="text-xl text-white/50 mb-4">
        Ogni "ci penso" che senti oggi e' un trattamento che potrebbe diventare un si' domani.
      </p>
      <p className="text-lg text-white/50 mb-10">
        Provalo gratis: le prime <strong className="text-white">3 foto + 1 video</strong> sono in omaggio. <span className="text-white font-semibold">Il primo risultato potrebbe arrivare questa settimana.</span>
      </p>
      <motion.a
        href="https://app.smilelive.it/"
        onClick={() => trackCta("inizia_gratis", "final_cta")}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="group bg-primary text-white font-headline font-bold uppercase tracking-widest px-10 py-5 rounded-full shadow-[0_8px_40px_rgba(2,132,199,0.5)] hover:shadow-[0_8px_60px_rgba(2,132,199,0.7)] transition-shadow duration-300 text-lg inline-flex items-center gap-3 mx-auto"
      >
        Inizia gratis — nessuna carta richiesta
        <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center group-hover:translate-x-0.5 transition-transform duration-200">
          <CaretRight size={18} weight="bold" />
        </span>
      </motion.a>
      <p className="mt-4 text-sm text-white/30">Setup in 10 minuti. Il tuo staff e' operativo oggi.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-white/40 font-medium">
        <span className="flex items-center gap-1"><ShieldCheck size={15} weight="light" className="text-primary" /> Accesso immediato</span>
        <span className="hidden md:inline text-white/20">·</span>
        <span>GDPR Compliant</span>
        <span className="hidden md:inline text-white/20">·</span>
        <span>Made in Italy</span>
      </div>
    </motion.div>
  </section>
);

// ─── Behind ────────────────────────────────────────────────────────────────────
const Behind = () => (
  <section className="py-24 bg-slate-50 border-y border-slate-100">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto px-6 text-center"
    >
      <p className="text-2xl font-serif italic text-gold mb-10">
        "Non vendiamo teoria. Abbiamo costruito questo sistema lavorando fianco a fianco con studi dentistici reali, su problemi reali di consulenza."
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-10">
        {[
          { val: "50+", label: "Cliniche Partner" },
          { val: "€700k+", label: "Trattamenti generati" },
          { val: "10s", label: "Per risultato" },
          { val: "0", label: "Carta richiesta" },
        ].map((s, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-sm">
            <div className="text-2xl font-black text-primary mb-1 num-tabular">{s.val}</div>
            <div className="text-sm font-medium text-text-muted">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
        <div className="flex items-start gap-3"><CheckCircle size={18} weight="light" className="text-primary shrink-0 mt-0.5" /><span className="text-text-muted">Sviluppato con il feedback di odontotecnici e Odontoiatri italiani</span></div>
        <div className="flex items-start gap-3"><CheckCircle size={18} weight="light" className="text-primary shrink-0 mt-0.5" /><span className="text-text-muted">Testato su casi reali: faccette, sbiancamento, ortodonzia</span></div>
        <div className="flex items-start gap-3"><ShieldCheck size={18} weight="light" className="text-primary shrink-0 mt-0.5" /><span className="text-text-muted">GDPR nativo — nessun dato salvato mai</span></div>
        <div className="flex items-start gap-3"><Lightning size={20} weight="light" className="text-primary shrink-0 mt-0.5" /><span className="font-bold text-text-main">IL TUO CONVERTITORE DI PAZIENTI INDECISI</span></div>
      </div>
    </motion.div>
  </section>
);

// ─── Footer ────────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer className="py-12 border-t border-slate-100 text-sm text-text-muted bg-white">
    <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-6">
      <img src={logoFinale} alt="SmileLive" className="h-12 w-auto" width="120" height="48" loading="lazy" />
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-text-muted">
        <a href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</a>
        <span>·</span>
        <a href="/cookie-policy" className="hover:text-primary transition-colors">Cookie Policy</a>
        <span>·</span>
        <a href="/terms" className="hover:text-primary transition-colors">Termini di Servizio</a>
        <span>·</span>
        <button type="button" onClick={openCookieBanner} className="hover:text-primary transition-colors">Gestione cookie</button>
        <span>·</span>
        <a href="mailto:supporto@smilelive.it" className="hover:text-primary transition-colors">Contatti</a>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-200 text-xs font-medium">
          <ShieldCheck size={13} weight="light" className="text-primary" /> GDPR Compliant
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-200 text-xs font-medium">
          Made in Italy
        </span>
      </div>
      <p className="text-center text-xs text-text-muted/60">© {new Date().getFullYear()} SmileLive. Tutti i diritti riservati.</p>
    </div>
  </footer>
);

// ─── HeadToHead (v2) ───────────────────────────────────────────────────────────
const HeadToHead = () => (
  <section className="py-28 bg-slate-50">
    <div className="max-w-5xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline font-black mb-6 tracking-display">
          Lo stesso paziente.<br />
          <span className="italic font-serif font-normal text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Due finali diversi.</span>
        </h2>
        <p className="text-xl text-text-muted max-w-2xl mx-auto">
          Cambia una cosa sola: se il paziente <strong className="text-text-main">vede</strong> il suo sorriso, oppure no.
        </p>
      </motion.div>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl border border-slate-200 bg-white p-8"
        >
          <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-5">Senza SmileLive</div>
          <ul className="space-y-4">
            {["Il paziente sente parole e vede un preventivo. Deve immaginare il risultato da solo.",
              "\"Ci penso\" — ed esce dallo studio. Spesso non torna.",
              "La decisione slitta sul prezzo, non sul desiderio."].map((t, i) => (
              <li key={i} className="flex items-start gap-3 text-text-muted">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✕</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <div className="mt-7 pt-6 border-t border-slate-100">
            <div className="text-3xl font-headline font-black text-slate-400 num-tabular">30–40%</div>
            <div className="text-sm text-text-muted mt-1">conversione media di settore</div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-3xl border border-primary/30 bg-white p-8 shadow-[0_8px_40px_rgba(2,132,199,0.15)] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 blur-[80px] rounded-full pointer-events-none"></div>
          <div className="text-xs font-bold uppercase tracking-widest text-primary mb-5 relative">Con SmileLive</div>
          <ul className="space-y-4 relative">
            {["Vede il suo sorriso trasformato sul proprio viso, in 10 secondi.",
              "\"Quando possiamo iniziare?\" — la conversazione cambia subito.",
              "E' emotivamente coinvolto in un risultato che ha gia' visto."].map((t, i) => (
              <li key={i} className="flex items-start gap-3 text-text-main">
                <CheckCircle size={20} weight="fill" className="text-primary shrink-0 mt-0.5" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <div className="mt-7 pt-6 border-t border-slate-100 relative">
            <div className="text-3xl font-headline font-black text-primary num-tabular">+67%</div>
            <div className="text-sm text-text-muted mt-1">conversione media dei nostri studi</div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

// ─── PrivacySecurity (v2) ──────────────────────────────────────────────────────
// ponytail: claim GDPR/UE/consenso da confermare col legale prima della produzione
const PrivacySecurity = () => (
  <section className="py-28 relative overflow-hidden bg-white">
    <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #0f172a 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto px-6 relative z-10"
    >
      <div className="text-center mb-14">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-slate-50 mb-6">
          <ShieldCheck size={16} weight="fill" className="text-primary" />
          <span className="text-xs font-bold tracking-widest uppercase text-slate-500">Privacy & Sicurezza dati</span>
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline font-black mb-6 tracking-display">
          Le foto dei tuoi pazienti<br />
          <span className="italic font-serif font-normal text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">restano protette.</span>
        </h2>
        <p className="text-xl text-text-muted max-w-2xl mx-auto">
          Il volto di un paziente e' un dato sensibile. SmileLive e' nato conforme al GDPR: privacy-first, dati gestiti in Europa, nessuna foto conservata.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          { icon: <ShieldCheck size={24} weight="fill" className="text-primary" />, title: "Conforme GDPR", desc: "Nativamente allineato al regolamento europeo sul trattamento dei dati sanitari." },
          { icon: <Sparkle size={24} weight="fill" className="text-primary" />, title: "Nessuna foto conservata", desc: "La preview si genera al momento. La foto originale non resta sui nostri server." },
          { icon: <Target size={24} weight="fill" className="text-primary" />, title: "Dati trattati in UE", desc: "Infrastruttura europea. Nessun trasferimento dei dati fuori dallo Spazio Economico Europeo." },
        ].map((c, i) => (
          <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">{c.icon}</div>
            <h3 className="font-headline font-bold text-lg text-text-main mb-2">{c.title}</h3>
            <p className="text-text-muted leading-relaxed">{c.desc}</p>
          </motion.div>
        ))}
      </div>
      <p className="text-center text-sm text-text-muted/70 mt-8 max-w-2xl mx-auto">
        Il consenso del paziente al trattamento dell'immagine e' raccolto e revocabile in ogni momento.
      </p>
    </motion.div>
  </section>
);

// ─── ReassuranceStrip (v2) ─────────────────────────────────────────────────────
const ReassuranceStrip = () => (
  <section className="py-8 bg-white border-y border-slate-100">
    <div className="max-w-5xl mx-auto px-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium text-text-muted">
      {[
        "Senza carta di credito",
        "Nessun contratto — disdici quando vuoi",
        "Setup in 10 minuti",
        "3 foto + 1 video in omaggio",
      ].map((t, i) => (
        <span key={i} className="inline-flex items-center gap-2">
          <CheckCircle size={16} weight="fill" className="text-primary" /> {t}
        </span>
      ))}
    </div>
  </section>
);

// ─── WidgetTeaser (v2) ─────────────────────────────────────────────────────────
const WidgetTeaser = () => (
  <section className="py-28 bg-slate-50">
    <div className="max-w-5xl mx-auto px-6">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/5 mb-6">
            <Sparkle size={16} weight="fill" className="text-gold" />
            <span className="text-xs font-bold tracking-widest uppercase text-gold-dim">In arrivo</span>
          </span>
          <h2 className="text-4xl md:text-5xl font-headline font-black mb-6 tracking-display">
            Presto: cattura pazienti<br />
            <span className="italic font-serif font-normal text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">anche dal tuo sito.</span>
          </h2>
          <p className="text-xl text-text-muted mb-6">
            Un widget da installare sul sito dello studio. Chi sta per uscire vede un'anteprima del proprio sorriso e lascia i contatti. Ogni simulazione diventa un contatto pre-qualificato per faccette, ortodonzia o impianti.
          </p>
          <ul className="space-y-3">
            {["Trasforma le visite che rimbalzano in richieste di preventivo",
              "Pazienti che arrivano in studio gia' motivati",
              "Piu' casi ad alto valore dallo stesso traffico, senza aumentare la pubblicita'"].map((t, i) => (
              <li key={i} className="flex items-start gap-3 text-text-muted"><ChartLineUp size={18} weight="light" className="text-primary shrink-0 mt-1" /><span>{t}</span></li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">smilelive-widget · anteprima</div>
          <div className="rounded-2xl bg-slate-50 border border-slate-100 p-6 text-center">
            <Camera size={32} weight="light" className="text-primary mx-auto mb-3" />
            <div className="font-bold text-text-main mb-1">Vuoi vedere il tuo nuovo sorriso?</div>
            <div className="text-sm text-text-muted mb-4">Carica una foto — anteprima in 10 secondi.</div>
            <div className="bg-primary text-white font-bold text-sm px-5 py-3 rounded-full inline-block">Prova gratis →</div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function IndexV2() {
  return (
    <main className="min-h-screen w-full overflow-x-clip bg-white text-text-main selection:bg-primary/20 selection:text-text-main font-['Inter']">
      <TopBar />
      <Hero />
      <TrustMarquee />
      <ProblemSection />
      <EmotionalVideo />
      <AnimatedNumbers />
      <HeadToHead />
      <HowItWorks />
      <WhatYouGet />
      <ROICalculator />
      <IntermediateCTA />
      <PrivacySecurity />
      <Pricing />
      <ReassuranceStrip />
      <Testimonials />
      <ForWho />
      <WidgetTeaser />
      <FutureVision />
      <FAQ />
      <FinalCTA />
      <Behind />
      <Footer />
    </main>
  );
}
