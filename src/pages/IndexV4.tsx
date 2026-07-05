import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CaretRight, Sparkle, Pulse, ShieldCheck,
  Star, TrendUp, Users, Target, CheckCircle, Medal, Lightning, Camera, Check,
  ArrowsHorizontal, ClipboardText, Microphone, ChatCircle, Receipt, FileArrowDown, ChartLineUp,
  List, X, VideoCamera, EyeSlash, Gift, Headset,
  InstagramLogo, FacebookLogo, WhatsappLogo, EnvelopeSimple
} from "@phosphor-icons/react";
import beforeImg from '../assets/WEBP/PRIMA (2).webp';
import afterImg from '../assets/WEBP/DOPO (2).webp';
import prevSbiancamento from '../assets/WEBP/Sbiancamento prima e dopo2.webp';
import prevFaccette from '../assets/WEBP/FACCETTE (1).jpeg';
import prevOrtodonzia from '../assets/WEBP/TERMOSTAMPATA-CrUanAGb.jpg';
import sbiancamentoPrima from '../assets/trattamenti/sbiancamento-prima.webp';
import sbiancamentoDopo from '../assets/trattamenti/sbiancamento-dopo.webp';
import faccettePrima from '../assets/trattamenti/faccetta-prima.webp';
import faccetteDopo from '../assets/trattamenti/faccetta-dopo.webp';
import implantologiaPrima from '../assets/trattamenti/implantologia-prima.webp';
import implantologiaDopo from '../assets/trattamenti/implantologia-dopo.webp';
import emotionalVideo from '../assets/video per SITO 1080p FINITO.mp4';

import logoBerlinesi from '../assets/LOGHI STUDI WEBP/BERLINESI 2 (1).png';
import logoFerretti from '../assets/LOGHI STUDI WEBP/FERRETTI GIACOMO.png';
import logoLaterza from '../assets/LOGHI STUDI WEBP/LATERZA (1).png';
import logoRanieri from '../assets/LOGHI STUDI WEBP/RANIERI (1).png';
import logoSMILE from '../assets/LOGHI STUDI WEBP/CLINICA DENTALE SAN MICHELE.png';
import logoAlvise from '../assets/LOGHI STUDI WEBP/ALVISE LI FONTI.png';
import logoEmanuele from '../assets/LOGHI STUDI WEBP/EMANUELE CALABRESI.png';
import logoAurelio from '../assets/LOGHI STUDI WEBP/AURELIO TRENITINI.png';

import stepPoster from '../assets/steps/step-1-poster.webp';
import stepPreview from '../assets/steps/step-2-preview.webp';
import stepSorriso from '../assets/steps/step-3-sorriso.webp';
import stepDentista from '../assets/steps/step-4-dentista.webp';
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
  const [inView, setInView] = useState(false);
  const lastInteractRef = useRef(0);
  const nudgeTimers = useRef<number[]>([]);

  const markInteract = () => { lastInteractRef.current = Date.now(); };

  // Demo: muove lo slider da solo per far capire che è trascinabile.
  // Parte a ogni ingresso in vista e si ripete ogni 10s se non viene toccato.
  const runNudge = () => {
    nudgeTimers.current.forEach(clearTimeout);
    nudgeTimers.current = ([[400, 72], [1100, 30], [1800, 55]] as const)
      .map(([t, v]) => window.setTimeout(() => setSliderPosition(v), t));
  };

  // Rileva l'ingresso in vista (ogni volta, non una-tantum)
  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // In vista: demo subito + replay ogni 10s se l'utente non ha toccato
  useEffect(() => {
    if (!inView) return;
    runNudge();
    const id = window.setInterval(() => {
      if (Date.now() - lastInteractRef.current > 9500) runNudge();
    }, 10000);
    return () => {
      window.clearInterval(id);
      nudgeTimers.current.forEach(clearTimeout);
      nudgeTimers.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const pointerStartRef = useRef<{ x: number; y: number; id: number } | null>(null);

  const updateSliderPosition = (clientX: number) => {
    markInteract();
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('.alignment-controls')) return;
    markInteract();
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
    if (e.key === "ArrowLeft") { markInteract(); setSliderPosition((v) => Math.max(0, v - 5)); }
    if (e.key === "ArrowRight") { markInteract(); setSliderPosition((v) => Math.min(100, v + 5)); }
  };

  return (
    <section className="pt-12 pb-10 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary">L'Effetto Wow</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-headline font-bold leading-tight tracking-tight text-text-main">
            "Non ci credo...<br />
            <span className="italic font-serif font-normal text-transparent bg-clip-text bg-gradient-to-r from-primary to-sky-400">sono io!"</span>
          </h2>
          <p className="text-xl text-text-muted leading-relaxed">
            È la prima cosa che dicono quando si vedono col nuovo sorriso. Non devono più <em className="text-text-main">immaginare</em> il risultato: ce l'hanno davanti.
          </p>
          <p className="text-lg text-text-muted leading-relaxed">
            Trascina il cursore e guarda il cambiamento, da com'è oggi a come potrebbe essere. È lo stesso istante che vive il paziente in poltrona. E quando si vede, il preventivo non è più una spesa al buio: è{" "}
            <strong className="text-text-main">qualcosa che vuole</strong>.
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
                <img src={afterImg} alt="Sorriso Dopo" className="absolute inset-0 w-full h-full object-cover object-[center_62%]" draggable="false" />
                <img
                  src={beforeImg}
                  alt="Sorriso Prima"
                  className="absolute inset-0 w-full h-full object-cover object-[center_62%]"
                  draggable="false"
                  style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`, transition: isDragging ? "none" : "clip-path 0.5s ease" }}
                />
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
                <div className="pointer-events-none absolute top-0 bottom-0 -ml-[1.5px] w-[3px] bg-primary" style={{ left: `${sliderPosition}%`, transition: isDragging ? "none" : "left 0.5s ease" }}>
                  <div className="absolute top-1/2 left-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary flex items-center justify-center text-white transition-transform md:h-12 md:w-12 group-hover:scale-110">
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

// ─── GridBg (sfondo a quadratini riutilizzabile) ──────────────────────────────
// Il contenitore <section> deve avere `relative`. La griglia sta dietro al
// contenuto (-z-10) e sopra il colore di sfondo della sezione.
const GridBg = () => (
  <div className="grid-bg absolute inset-0 -z-10 pointer-events-none" aria-hidden="true"></div>
);

// ─── AISimShowcase ────────────────────────────────────────────────────────────
const AISimShowcase = () => {
  const benefits = [
    "Non se lo immagina: si vede davvero, in movimento",
    "L'emozione del video abbatte l'obiezione sul prezzo",
    "Accetta e paga subito, senza «ci penso»",
  ];
  return (
    <section className="pt-16 pb-16 md:pb-24 bg-white relative overflow-hidden isolate">
      <GridBg />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Titolo — su mobile va sopra le immagini (ponytail: duplicato del titolo desktop, nascosto da lg in su) */}
            <h2 className="lg:hidden text-center text-2xl sm:text-3xl font-headline font-bold tracking-tight leading-snug text-text-main mb-2">
              <VideoCamera weight="fill" size="1em" className="inline-block align-[-0.12em] mr-2 text-gold" />
              Non solo una <span className="text-primary">foto</span>.<br />Un <span className="text-gold whitespace-nowrap">video realistico</span> che favorisce il sì.
            </h2>

            {/* ── Illustrazione Prima → Dopo → Video (cerchi) ── */}
            <div className="relative w-full aspect-[4/3] [container-type:inline-size]">
              {/* frecce */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 400 300" fill="none" preserveAspectRatio="none">
                <defs>
                  <filter id="crayon" x="-30%" y="-30%" width="160%" height="160%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="4" result="n" />
                    <feDisplacementMap in="SourceGraphic" in2="n" scale="3" xChannelSelector="R" yChannelSelector="G" />
                  </filter>
                  <marker id="ah" markerUnits="userSpaceOnUse" markerWidth="16" markerHeight="14" refX="11" refY="6" orient="auto">
                    <path d="M1,1 L12,6 L1,11 z" fill="#38bdf8" />
                  </marker>
                </defs>
                <g filter="url(#crayon)">
                  <path d="M134,93 C168,85 206,82 232,80" stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round" markerEnd="url(#ah)" />
                  <path d="M320,156 C336,178 318,196 300,198" stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round" markerEnd="url(#ah)" />
                </g>
              </svg>

              {/* callout 67%+ — dimensione fluida (cqw) così scala con l'illustrazione
                  e resta centrato/ancorato sopra il punto medio della freccia a ogni size */}
              <div className="absolute top-[24%] left-[46%] -translate-x-1/2 -translate-y-full z-20 leading-none text-center">
                <div className="font-headline font-bold text-primary text-[11cqw]">67%+</div>
                <div className="text-text-muted font-medium mt-[0.5em] leading-tight text-[2.7cqw]">Accettazione<br />preventivi</div>
              </div>

              {/* Prima */}
              <div className="absolute left-[1%] top-[24%] w-[31%] z-10">
                <div className="rounded-full overflow-hidden shadow-lg ring-4 ring-white aspect-square">
                  <img src={beforeImg} alt="Prima" className="w-full h-full object-cover object-[center_28%]" loading="lazy" />
                </div>
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white text-[11px] font-bold text-text-muted shadow">Prima</span>
              </div>

              {/* Dopo */}
              <div className="absolute right-[2%] top-[4%] w-[34%] z-10">
                <div className="rounded-full overflow-hidden shadow-xl ring-4 ring-white aspect-square">
                  <img src={afterImg} alt="Dopo" className="w-full h-full object-cover object-[center_28%]" loading="lazy" />
                </div>
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-[11px] font-bold text-white shadow">Dopo</span>
              </div>

              {/* AI Video (in primo piano) — rettangolare, più grande */}
              <div className="absolute left-[33%] bottom-[2%] w-[38%] z-30">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white aspect-[4/5] bg-slate-900 group cursor-pointer">
                  <img src={afterImg} alt="AI Video" className="w-full h-full object-cover object-[center_30%] opacity-95" loading="lazy" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/15">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-0.5 text-primary"><path d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" /></svg>
                    </div>
                  </div>
                </div>
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-10 px-3 py-1 rounded-full bg-gold text-[11px] font-bold text-white shadow whitespace-nowrap">Video Realistico AI</span>
              </div>
            </div>

            {/* ── Testo ── */}
            <div>
              <h2 className="hidden lg:block text-4xl md:text-5xl font-headline font-bold tracking-tight leading-tight text-text-main">
                <VideoCamera weight="fill" size="1em" className="inline-block align-[-0.12em] mr-2.5 text-gold" />
                Non solo una <span className="text-primary">foto</span>. Un <span className="text-gold">video realistico</span> che favorisce il sì.
              </h2>
              <p className="mt-5 text-xl text-text-muted leading-relaxed">
                SmileLive non si limita a trasformare un'immagine: genera un <strong className="text-text-main font-semibold">video realistico</strong> del paziente con il suo nuovo sorriso. Vedersi, non doverlo solo immaginare, fa crollare l'esitazione e porta l'accettazione dei preventivi <strong className="text-text-main font-semibold">oltre il 67%</strong>.
              </p>
              <p className="mt-6 font-bold text-text-main">
                Quando il paziente si vede in video:
              </p>
              <ul className="mt-4 space-y-3.5">
                {benefits.map((t, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle size={22} weight="fill" className="text-primary shrink-0 mt-0.5" />
                    <span className="text-base md:text-lg text-text-main">{t}</span>
                  </li>
                ))}
              </ul>
              <a
                href="https://app.smilelive.it/"
                onClick={() => trackCta("guarda_demo", "ai_showcase")}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary text-white px-7 py-3.5 font-bold hover:bg-sky-600 active:scale-95 transition-all"
              >
                Guarda la demo <CaretRight size={16} weight="bold" />
              </a>
            </div>

          </div>
      </div>
    </section>
  );
};

// ─── TopBar ─────────────────────────────────────────────────────────────────
const TopBar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const setVar = () =>
      document.documentElement.style.setProperty("--header-h", `${el.offsetHeight}px`);
    setVar();
    const ro = new ResizeObserver(setVar);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className="fixed top-0 inset-x-0 z-50 flex flex-col">
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200 py-4' : 'bg-transparent py-5'}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <img src={logoFinale} alt="SmileLive Logo" className="h-20 w-auto md:h-24" fetchPriority="high" width="180" height="130" />
          <div className="hidden md:flex items-center gap-8 text-base text-text-muted font-medium">
            <a href="#come-funziona" className="hover:text-primary transition-colors duration-200 relative after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-200 hover:after:w-full">Come funziona</a>
            <a href="#pricing" className="hover:text-primary transition-colors duration-200 relative after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-200 hover:after:w-full">Prezzi</a>
            <a href="#faq" className="hover:text-primary transition-colors duration-200 relative after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-200 hover:after:w-full">FAQ</a>
          </div>
          <div className="flex items-center gap-3 md:gap-4">
            <a
              href="https://app.smilelive.it/"
              onClick={() => trackCta("login", "topbar_nav")}
              className="hidden md:inline-flex text-base font-bold text-text-muted hover:text-primary transition-colors duration-200"
            >
              Login
            </a>
            <a
              href="https://app.smilelive.it/"
              onClick={() => trackCta("inizia_gratis", "topbar_nav")}
              className="bg-sky-50 text-primary border border-sky-200 px-5 py-2.5 md:px-7 rounded-full font-bold text-sm md:text-base hover:bg-sky-100 active:scale-95 transition-all duration-200"
            >
              Inizia gratis
            </a>
            <button
              type="button"
              aria-label="Apri menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full text-primary hover:bg-sky-50 active:scale-95 transition-all duration-200"
            >
              {menuOpen ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
            </button>
          </div>
        </div>

        {/* Menu mobile a caduta */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-t border-slate-200"
            >
              <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1 text-base font-medium text-text-muted">
                <a href="#come-funziona" onClick={() => setMenuOpen(false)} className="py-3 border-b border-slate-100 hover:text-primary transition-colors">Come funziona</a>
                <a href="#pricing" onClick={() => setMenuOpen(false)} className="py-3 border-b border-slate-100 hover:text-primary transition-colors">Prezzi</a>
                <a href="#faq" onClick={() => setMenuOpen(false)} className="py-3 border-b border-slate-100 hover:text-primary transition-colors">FAQ</a>
                <a href="https://app.smilelive.it/" onClick={() => { trackCta("login", "topbar_mobile_menu"); setMenuOpen(false); }} className="py-3 font-bold hover:text-primary transition-colors">Login</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

// ─── Hero ────────────────────────────────────────────────────────────────────
const Hero = () => (
  <section className="relative overflow-hidden bg-gradient-to-b from-white via-white to-sky-50/50 pt-[calc(var(--header-h,7rem)+2.5rem)] pb-20 md:pb-28">
    {/* Background — glow azzurro morbido e diffuso su base bianca (niente griglia) */}
    <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(72% 62% at 86% 44%, rgba(56,189,248,0.16), transparent 72%), radial-gradient(64% 58% at 18% 92%, rgba(99,179,237,0.08), transparent 76%)' }}></div>
    {/* Cerchio morbido dietro al telefono (come nello screen) */}
    <div className="absolute top-[3%] right-[-12%] w-[560px] h-[560px] rounded-full bg-gradient-to-br from-sky-100/60 via-sky-50/40 to-indigo-100/25 pointer-events-none hidden lg:block" aria-hidden="true"></div>
    {/* Dot pattern a destra del telefono */}
    <div className="absolute top-[46%] right-[3%] w-28 h-28 pointer-events-none opacity-50 hidden lg:block" style={{ backgroundImage: 'radial-gradient(circle, rgba(2,132,199,0.22) 1.5px, transparent 1.5px)', backgroundSize: '15px 15px' }} aria-hidden="true"></div>

    <div className="relative z-[1] max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
      {/* Copy */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-8 relative z-10"
      >
        <motion.span variants={fadeUp} className="inline-flex items-center rounded-full bg-sky-100/80 text-primary px-4 py-1.5 text-xs font-bold tracking-[0.15em] uppercase ring-1 ring-sky-200/60">
          AI per studi dentistici
        </motion.span>
        <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-headline font-bold tracking-tight leading-[1.1] text-text-main">
          <span className="block">Il paziente vede</span>
          <span className="block text-primary">il suo nuovo sorriso.</span>
          <span className="block">Prima di decidere.</span>
        </motion.h1>

        <motion.p variants={fadeUp} className="text-lg text-text-muted leading-relaxed max-w-lg">
          Molti pazienti rinviano un trattamento estetico non per il costo, ma perche'{" "}
          <strong className="text-text-main font-semibold">non riescono a immaginare il risultato.</strong>
          <br /><br />
          SmileLive genera un'anteprima realistica del nuovo sorriso a partire da una foto: la decisione parte da qualcosa che il paziente puo' vedere. Prova gratuita, 3 anteprime incluse.
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
          <div className="flex items-center gap-2 text-sm font-medium text-text-muted">
            <ShieldCheck size={16} weight="fill" className="text-primary shrink-0" />
            <span>Nessuna carta. Setup in 10 minuti.</span>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="pt-3 flex items-center gap-5">
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
        className="relative z-10 flex justify-center pb-16 lg:pb-0"
      >
        <div className="phone-wrap relative w-[240px] sm:w-[290px] md:w-[310px]">
          <div className="phone-frame relative rounded-[3.5rem] bg-[#080810] p-[10px] shadow-[0_0_0_1px_rgba(255,255,255,0.07),inset_0_1px_0_rgba(255,255,255,0.05)] overflow-hidden rotate-[5deg] origin-center transition-transform duration-500 ease-out">
            <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[88px] h-[26px] bg-[#080810] rounded-full z-20 flex items-center justify-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#1c1c2e]"></div>
              <div className="w-11 h-1.5 rounded-full bg-[#1c1c2e]"></div>
            </div>
            <div
              className="group relative rounded-[2.8rem] overflow-hidden bg-[#0f172a] cursor-pointer"
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
                onPlay={(e) => {
                  const wrap = e.currentTarget.closest('.phone-wrap');
                  e.currentTarget.parentElement?.querySelector('.play-button')?.classList.add('opacity-0', 'pointer-events-none');
                  wrap?.querySelectorAll('.hero-badge').forEach((el) => { (el as HTMLElement).style.opacity = '0'; (el as HTMLElement).style.pointerEvents = 'none'; });
                  const frame = wrap?.querySelector('.phone-frame') as HTMLElement | null;
                  if (frame) frame.style.transform = 'rotate(0deg)';
                }}
                onPause={(e) => {
                  const wrap = e.currentTarget.closest('.phone-wrap');
                  e.currentTarget.parentElement?.querySelector('.play-button')?.classList.remove('opacity-0', 'pointer-events-none');
                  wrap?.querySelectorAll('.hero-badge').forEach((el) => { (el as HTMLElement).style.opacity = '1'; (el as HTMLElement).style.pointerEvents = ''; });
                  const frame = wrap?.querySelector('.phone-frame') as HTMLElement | null;
                  if (frame) frame.style.transform = 'rotate(5deg)';
                }}
                onEnded={(e) => {
                  const video = e.currentTarget;
                  const wrap = video.closest('.phone-wrap');
                  video.parentElement?.querySelector('.play-button')?.classList.remove('opacity-0', 'pointer-events-none');
                  wrap?.querySelectorAll('.hero-badge').forEach((el) => { (el as HTMLElement).style.opacity = '1'; (el as HTMLElement).style.pointerEvents = ''; });
                  const frame = wrap?.querySelector('.phone-frame') as HTMLElement | null;
                  if (frame) frame.style.transform = 'rotate(5deg)';
                  video.load(); // torna al poster (viso della ragazza), niente schermo nero
                }}
              />
              <div className="play-button absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300 pt-8">
                <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center ring-2 ring-white/60 transition-transform duration-200 group-hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9 ml-1">
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
            className="hero-badge transition-opacity duration-700 ease-out card-float-a absolute flex -left-8 sm:-left-[6.5rem] top-[22%] bg-white rounded-xl sm:rounded-2xl px-2.5 py-1.5 sm:px-4 sm:py-3 border border-slate-200 items-center gap-1.5 sm:gap-3 min-w-[104px] sm:min-w-[130px]"
          >
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <TrendUp size={14} weight="fill" className="text-primary sm:hidden" />
              <TrendUp size={16} weight="fill" className="text-primary hidden sm:block" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-text-main num-tabular leading-none">+67%</div>
              <div className="text-[9px] sm:text-[10px] text-text-muted font-medium mt-0.5">accettazione</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1, type: "spring", stiffness: 180, damping: 18 }}
            className="hero-badge transition-opacity duration-700 ease-out card-float-b absolute flex -right-8 sm:-right-[6rem] top-[48%] bg-white rounded-xl sm:rounded-2xl px-2.5 py-1.5 sm:px-4 sm:py-3 border border-slate-200 items-center gap-1.5 sm:gap-3 min-w-[100px] sm:min-w-[120px]"
          >
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
              <Lightning size={14} weight="fill" className="text-gold sm:hidden" />
              <Lightning size={16} weight="fill" className="text-gold hidden sm:block" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-text-main num-tabular leading-none">10 sec</div>
              <div className="text-[9px] sm:text-[10px] text-text-muted font-medium mt-0.5">per preview</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, type: "spring", stiffness: 180, damping: 18 }}
            className="hero-badge transition-opacity duration-700 ease-out card-float-c absolute flex left-1/2 -translate-x-1/2 -bottom-6 bg-white rounded-xl sm:rounded-2xl px-3 py-2 sm:px-4 sm:py-3 border border-slate-200 items-center gap-2 sm:gap-2.5 whitespace-nowrap"
          >
            <div className="flex gap-0.5">
              {[1, 2, 3].map(i => <Star key={i} size={11} weight="fill" className="text-gold" />)}
            </div>
            <div className="text-xs font-bold text-text-main">50+ studi in Italia</div>
          </motion.div>

          {/* Mini slider prima/dopo denti (statico, linea al centro) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, type: "spring", stiffness: 180, damping: 18 }}
            className="hero-badge transition-opacity duration-700 ease-out absolute -right-4 sm:-right-20 bottom-[9%] w-[132px] sm:w-[168px] rounded-2xl overflow-hidden bg-white p-1.5 shadow-[0_18px_46px_-16px_rgba(2,132,199,0.5)] ring-1 ring-slate-100"
          >
            <div className="relative rounded-xl overflow-hidden aspect-[3/2] bg-slate-100">
              <img src={afterImg} alt="Denti dopo" className="absolute inset-0 w-full h-full object-cover origin-center" style={{ objectPosition: '56% 57%', transform: 'scale(4.4)' }} loading="lazy" />
              <div className="absolute inset-0 overflow-hidden" style={{ clipPath: 'inset(0 50% 0 0)' }}>
                <img src={beforeImg} alt="Denti prima" className="absolute inset-0 w-full h-full object-cover origin-center" style={{ objectPosition: '56% 57%', transform: 'scale(4.4)' }} loading="lazy" />
              </div>
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-white/95 shadow-[0_0_6px_rgba(0,0,0,0.35)]" />
              <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-full bg-black/45 text-white text-[8px] font-bold tracking-wide">PRIMA</span>
              <span className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded-full bg-primary text-white text-[8px] font-bold tracking-wide">DOPO</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>

    {/* Wave divider: linea elegante che sale a destra + sfumatura morbida (non banda piatta) */}
    <div className="absolute inset-x-0 bottom-0 pointer-events-none leading-[0]" aria-hidden="true">
      <svg viewBox="0 0 1440 260" className="w-full h-[80px] md:h-[130px]" preserveAspectRatio="none">
        <defs>
          <linearGradient id="v3heroWave" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="1" />
          </linearGradient>
        </defs>
        <path d="M0,150 C360,232 760,212 1080,120 C1250,71 1352,44 1440,30 L1440,260 L0,260 Z" fill="url(#v3heroWave)" />
        <path d="M0,150 C360,232 760,212 1080,120 C1250,71 1352,44 1440,30" fill="none" stroke="rgba(56,189,248,0.55)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>
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
    <div className="w-full py-6 bg-transparent overflow-hidden relative flex">
      <div className="absolute inset-y-0 left-0 w-16 md:w-40 bg-gradient-to-r from-[#e9f2fb] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-16 md:w-40 bg-gradient-to-l from-[#e9f2fb] to-transparent z-10 pointer-events-none"></div>
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

// ─── WhyChoose (PERCHÉ SCEGLIERE SMILELIVE) ──────────────────────────────────────
const WhyChoose = () => {
  const items = [
    { icon: Camera, title: "1 Foto, 1 Video", desc: "Basta uno scatto. Il sistema genera anteprime realistiche in pochi secondi." },
    { icon: Sparkle, title: "Risultati realistici", desc: "Visualizzazioni AI avanzate che mostrano al paziente il suo nuovo sorriso." },
    { icon: Users, title: "Comunicazione più chiara", desc: "Uno strumento semplice per spiegare il piano di cura e far capire il risultato." },
    { icon: TrendUp, title: "Decisioni più consapevoli", desc: "Più chiarezza per il paziente e piani di cura compresi e accettati con serenità." },
  ];
  return (
    <section className="relative pt-4 md:pt-8 pb-16 md:pb-24 bg-white overflow-hidden">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-28 h-28 pointer-events-none opacity-50 hidden md:block" style={{ backgroundImage: 'radial-gradient(circle, rgba(2,132,199,0.20) 1.5px, transparent 1.5px)', backgroundSize: '15px 15px' }} aria-hidden="true"></div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-28 h-28 pointer-events-none opacity-50 hidden md:block" style={{ backgroundImage: 'radial-gradient(circle, rgba(2,132,199,0.20) 1.5px, transparent 1.5px)', backgroundSize: '15px 15px' }} aria-hidden="true"></div>
      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <span className="text-xs font-bold tracking-[0.18em] uppercase text-primary">Perché scegliere SmileLive</span>
          <h2 className="mt-3 text-3xl md:text-5xl font-headline font-bold tracking-tight text-text-main">
            Più chiarezza. Più fiducia. <span className="text-primary">Decisioni consapevoli.</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 lg:gap-y-0 lg:divide-x lg:divide-slate-100">
          {items.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center text-center px-6">
              <div className="w-16 h-16 rounded-full bg-sky-100/70 flex items-center justify-center mb-6">
                <Icon size={28} weight="regular" className="text-primary" />
              </div>
              <h3 className="text-lg font-bold text-text-main mb-3">{title}</h3>
              <p className="text-sm text-text-muted leading-relaxed max-w-[220px]">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── ReviewsSection (STUDI CHE GIÀ USANO SMILELIVE + carosello attuale) ──────────
const ReviewsSection = () => (
  <section className="relative py-16 md:py-24 bg-gradient-to-b from-[#eaf3fb] via-[#e9f1fb] to-[#eef2fc] rounded-t-[2.5rem] overflow-hidden">
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-7xl mx-auto px-6 text-center mb-10">
      <span className="text-xs font-bold tracking-[0.18em] uppercase text-primary">Studi che già usano SmileLive</span>
      <h2 className="mt-3 text-3xl md:text-5xl font-headline font-bold tracking-tight text-text-main">
        Loro lo usano. <span className="text-primary">E funziona.</span>
      </h2>
    </motion.div>
    <TrustMarquee />
    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 px-6">
      <a href="https://app.smilelive.it/" onClick={() => trackCta("inizia_gratis", "reviews")} className="bg-primary text-white font-bold px-8 py-3.5 rounded-full inline-flex items-center gap-2 shadow-[0_8px_32px_rgba(2,132,199,0.4)] hover:shadow-[0_8px_48px_rgba(2,132,199,0.6)] transition-shadow duration-300">
        Inizia gratis <CaretRight size={16} weight="bold" />
      </a>
      <div className="flex items-center gap-2 text-sm text-text-muted font-medium">
        <ShieldCheck size={16} weight="fill" className="text-primary" /> Nessuna carta. Setup in 10 minuti.
      </div>
    </div>
  </section>
);

// ─── TreatmentComparison (SALVATA: casistica + ricevute Senza/Con) ───────────────
// Non renderizzata ora: da riusare in una sezione "payoff" dedicata a tutti i
// trattamenti, da collocare piu' avanti (es. prima del Pricing).
const SENZA_PHRASES = ["Ci penso", "Costa troppo", "Ora vediamo", "Devo parlarne a casa", "Ci devo pensare", "Ne parliamo piu' avanti", "Fammi sapere"];
const CON_PHRASES = ["Quando iniziamo?", "Prenoto subito", "Facciamolo", "Quando possiamo partire?", "Mi hai convinto", "Lo voglio fare"];

const TreatmentComparison = () => {
  const [activeItem, setActiveItem] = useState(0);
  const [autoPaused, setAutoPaused] = useState(false);
  const pillRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pillBoxRef = useRef<HTMLDivElement>(null);
  const [senzaPhrase, setSenzaPhrase] = useState(SENZA_PHRASES[0]);
  const [conPhrase, setConPhrase] = useState(CON_PHRASES[0]);

  const items = [
    { title: "Sbiancamento", desc: "Da €300 a €800", line: "Sbiancamento professionale", qty: "×1", total: "€ 800", lowLine: "Sbiancamento casalingo", lowQty: "kit", lowTotal: "€ 300", ref: "0231", preview: prevSbiancamento },
    { title: "Faccette", desc: "Da €800 a €2.500 per elemento", line: "Faccette in ceramica", qty: "×6", total: "€ 12.000", lowLine: "Faccette in ceramica", lowQty: "×2", lowTotal: "€ 4.000", ref: "0247", preview: prevFaccette },
    { title: "Implantologia", desc: "Da €1.500 a €5.000", line: "Impianto + corona", qty: "×2", total: "€ 8.000", lowLine: "Impianto singolo", lowQty: "×1", lowTotal: "€ 3.500", ref: "0258", preview: afterImg },
    { title: "Ortodonzia", desc: "Da €2.000 a €6.000", line: "Percorso ortodontico", qty: "completo", total: "€ 6.000", lowLine: "Allineatori parziali", lowQty: "ridotto", lowTotal: "€ 2.500", ref: "0269", preview: prevOrtodonzia },
    { title: "Zirconio", desc: "Da €500 a €1.800 per corona", line: "Corona in zirconio", qty: "×3", total: "€ 5.400", lowLine: "Corona in zirconio", lowQty: "×1", lowTotal: "€ 1.800", ref: "0275", preview: afterImg },
  ];

  // La casistica scorre da sola; in pausa quando l'utente ci passa sopra
  useEffect(() => {
    if (autoPaused) return;
    const id = window.setInterval(() => setActiveItem((i) => (i + 1) % items.length), 4000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPaused]);

  // Centra la pillola attiva scrollando SOLO il contenitore orizzontale.
  // (scrollIntoView scrollava anche la finestra verticalmente, "risucchiando" la pagina.)
  useEffect(() => {
    const box = pillBoxRef.current;
    const pill = pillRefs.current[activeItem];
    if (!box || !pill) return;
    const boxRect = box.getBoundingClientRect();
    const pillRect = pill.getBoundingClientRect();
    const delta = (pillRect.left - boxRect.left) - (box.clientWidth - pill.clientWidth) / 2;
    box.scrollBy({ left: delta, behavior: "smooth" });
  }, [activeItem]);

  // Frasi del paziente randomizzate a ogni cambio trattamento
  useEffect(() => {
    setSenzaPhrase(SENZA_PHRASES[Math.floor(Math.random() * SENZA_PHRASES.length)]);
    setConPhrase(CON_PHRASES[Math.floor(Math.random() * CON_PHRASES.length)]);
  }, [activeItem]);

  return (
    <section className="py-16 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-10 md:mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-red-600">Il Problema Nascosto</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-headline font-bold leading-[1.1] tracking-tight">
            Ogni <span className="text-red-500 italic">"ci penso"</span> e' un preventivo da{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">€1.500–€6.000</span>{" "}
            che esce dalla porta.
          </h2>
          <p className="mt-5 text-lg text-text-muted leading-relaxed">
            Non una volta ogni tanto. <strong className="text-text-main">Ogni settimana.</strong> In Italia solo il 34% dei pazienti va dal dentista con regolarita'. Chi e' gia' entrato nel tuo studio ha gia' fatto il passo piu' difficile: e' a meta' strada verso il si'. Ma senza uno strumento che trasformi il desiderio in decisione, il preventivo rimane un foglio su un tavolo.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* Pillole a scorrimento */}
          <div onMouseEnter={() => setAutoPaused(true)} onMouseLeave={() => setAutoPaused(false)}>
            <h3 className="text-xs font-bold mb-3 text-text-muted uppercase tracking-[0.16em] text-center">Funziona su qualsiasi trattamento</h3>
            <div ref={pillBoxRef} className="overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex gap-2 w-max mx-auto">
                {items.map((item, i) => (
                  <button
                    key={i}
                    ref={(el) => { pillRefs.current[i] = el; }}
                    onMouseEnter={() => setActiveItem(i)}
                    onClick={() => setActiveItem(i)}
                    className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 ${activeItem === i ? 'bg-primary text-white border-primary shadow-sm' : 'bg-white text-text-muted border-slate-200 hover:border-primary/40'}`}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-center text-sm text-text-muted mt-3">
              <span className="font-semibold text-text-main">{items[activeItem].title}</span> · {items[activeItem].desc}
            </p>
          </div>

          {/* Due ricevute affiancate, sotto le pillole */}
          <div className="mt-8 max-w-lg mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-2 gap-3 md:gap-4 items-start"
              >
                {/* SENZA SmileLive — in forse */}
                <div>
                  <div className="text-[10px] font-bold tracking-[0.12em] uppercase text-slate-400 mb-2 text-center">Senza SmileLive</div>
                  <div className="relative rounded-md border border-slate-200 bg-slate-50 px-4 pt-3.5 pb-4 -rotate-1">
                    <div className="flex items-center justify-between border-b-2 border-slate-300 pb-2 mb-2">
                      <span className="font-headline font-extrabold text-sm text-slate-500">Preventivo</span>
                    </div>
                    <div className="flex items-center justify-between text-xs py-1 text-slate-400">
                      <span className="truncate pr-1">{items[activeItem].lowLine}</span><span className="font-semibold shrink-0">{items[activeItem].lowQty}</span>
                    </div>
                    <div className="mt-2 pt-2 border-t border-dashed border-slate-300">
                      <span className="block text-[9px] uppercase tracking-widest text-slate-400 font-bold">Totale</span>
                      <span className="font-headline font-extrabold text-xl md:text-2xl text-slate-400 num-tabular">{items[activeItem].lowTotal}</span>
                    </div>
                    <div className="mt-3 rounded-md bg-red-50 border border-red-100 px-2.5 py-1.5 min-h-[42px] flex flex-col justify-center gap-0.5">
                      <span className="flex items-center gap-1.5 text-[11px] font-bold text-red-500"><X size={12} weight="bold" className="shrink-0" /> In forse</span>
                      <span className="text-[10px] italic text-red-400 leading-tight">"{senzaPhrase}"</span>
                    </div>
                    <div className="mt-2 aspect-[4/3] rounded-md border-2 border-dashed border-slate-200 bg-slate-100/60 flex flex-col items-center justify-center gap-1 text-slate-300">
                      <EyeSlash size={20} weight="light" />
                      <span className="text-[9px] font-bold uppercase tracking-wider">Nessuna preview</span>
                    </div>
                  </div>
                </div>

                {/* CON SmileLive — chiuso */}
                <div>
                  <div className="text-[10px] font-bold tracking-[0.12em] uppercase text-primary mb-2 text-center">Con SmileLive</div>
                  <div className="relative rounded-md border-2 border-primary/40 bg-white px-4 pt-3.5 pb-4 rotate-1 shadow-[0_16px_40px_-22px_rgba(2,132,199,0.55)]">
                    <div
                      className="pointer-events-none absolute inset-0 rounded-md"
                      style={{ backgroundImage: 'repeating-linear-gradient(180deg, transparent, transparent 25px, rgba(15,23,42,0.035) 26px)' }}
                    />
                    <div className="relative">
                      <div className="flex items-center justify-between border-b-2 border-text-main pb-2 mb-2">
                        <span className="font-headline font-extrabold text-sm text-text-main">Preventivo</span>
                      </div>
                      <div className="flex items-center justify-between text-xs py-1 text-text-muted">
                        <span className="truncate pr-1">{items[activeItem].line}</span><span className="font-semibold shrink-0">{items[activeItem].qty}</span>
                      </div>
                      <div className="mt-2 pt-2 border-t border-dashed border-slate-200">
                        <span className="block text-[9px] uppercase tracking-widest text-slate-400 font-bold">Totale</span>
                        <span className="font-headline font-extrabold text-xl md:text-2xl text-text-main num-tabular">{items[activeItem].total}</span>
                      </div>
                      <div className="mt-3 rounded-md bg-green-50 border border-green-100 px-2.5 py-1.5 min-h-[42px] flex flex-col justify-center gap-0.5">
                        <span className="flex items-center gap-1.5 text-[11px] font-bold text-green-700"><Check size={12} weight="bold" className="shrink-0" /> Chiuso</span>
                        <span className="text-[10px] italic text-green-600 leading-tight">"{conPhrase}"</span>
                      </div>
                      <div className="mt-2 aspect-[4/3] rounded-md overflow-hidden border border-primary/20">
                        <img src={items[activeItem].preview} alt={`Preview ${items[activeItem].title}`} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, scale: 1.7, rotate: -30 }}
                      animate={{ opacity: 0.95, scale: 1, rotate: -12 }}
                      transition={{ delay: 0.22, type: 'spring', stiffness: 320, damping: 15 }}
                      className="absolute right-1.5 top-8 border-[2.5px] border-green-600 text-green-600 font-headline font-extrabold text-sm tracking-wider uppercase px-2 py-0.5 rounded"
                    >
                      Accettato
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── ProblemSection (Hormozi-cut: dolore puro + pila di preventivi rifiutati) ──
const ProblemSection = () => {
  const pileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pile = pileRef.current;
    if (!pile) return;
    // avvio pulito: rimuovi eventuali fogli residui (HMR/StrictMode)
    pile.querySelectorAll(".pl-sheet").forEach((n) => n.remove());
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const SVG = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8.5" cy="9" r="1.3"/><path d="M4 16l4.5-4 3 2.5L15 10l5 5"/><line x1="3" y1="20" x2="21" y2="4"/></svg>';
    const POOL = [
      { n: "0231", line: "Percorso ortodontico", qty: "compl.", total: "€ 6.000" },
      { n: "0239", line: "Impianto + corona", qty: "×2", total: "€ 8.000" },
      { n: "0247", line: "Faccette in ceramica", qty: "×6", total: "€ 12.000" },
      { n: "0253", line: "Sbiancamento professionale", qty: "×1", total: "€ 800" },
      { n: "0261", line: "Corona in zirconio", qty: "×3", total: "€ 5.400" },
      { n: "0268", line: "Faccette in ceramica", qty: "×8", total: "€ 16.000" },
    ];
    const STAMPS = [{ t: "In forse", alt: false }, { t: "Rifiutata", alt: true }];
    let z = 10;
    let timer: number | null = null;
    let started = false;
    let stampFlip = false;
    const timeouts: number[] = [];
    const rnd = (a: number, b: number) => a + Math.random() * (b - a);
    const pick = <T,>(a: T[]): T => a[Math.floor(Math.random() * a.length)];
    const html = (d: (typeof POOL)[number], s: (typeof STAMPS)[number]) =>
      '<div class="pl-paper"><div class="pl-in">'
      + '<div class="pl-head"><b>Preventivo</b><span>N° ' + d.n + '</span></div>'
      + '<div class="pl-line"><span>' + d.line + '</span><span>' + d.qty + '</span></div>'
      + '<div class="pl-line"><span>Studio / laboratorio</span><span>incl.</span></div>'
      + '<div class="pl-tot"><span class="pl-k">Totale</span><span class="pl-v">' + d.total + '</span></div>'
      + '<div class="pl-nopreview">' + SVG + '<span>Nessuna preview del paziente</span></div>'
      + '</div><div class="pl-stamp' + (s.alt ? ' pl-stamp-alt' : '') + '">' + s.t + '</div></div>';
    const spawn = () => {
      const d = pick(POOL), rot = rnd(-5, 5), tx = rnd(-16, 16);
      stampFlip = !stampFlip;
      const s = stampFlip ? STAMPS[0] : STAMPS[1];
      const el = document.createElement("div");
      el.className = "pl-sheet";
      el.style.zIndex = String(++z);
      el.setAttribute("data-tx", String(tx));
      el.setAttribute("data-rot", String(rot));
      el.innerHTML = html(d, s);
      const rest = "translate(" + tx + "px,0) rotate(" + rot + "deg)";
      if (reduce) {
        el.style.transform = rest;
        el.style.opacity = "1";
        pile.appendChild(el);
        el.querySelector(".pl-stamp")?.classList.add("show");
      } else {
        el.style.transform = "translate(" + tx + "px,-62px) rotate(" + rot + "deg)";
        el.style.opacity = "0";
        pile.appendChild(el);
        void el.offsetWidth;
        el.style.transform = rest;
        el.style.opacity = "1";
        timeouts.push(window.setTimeout(() => el.querySelector(".pl-stamp")?.classList.add("show"), 430));
      }
      const all = pile.querySelectorAll(".pl-sheet");
      if (all.length > 3) {
        const old = all[0] as HTMLElement;
        old.style.opacity = "0";
        old.style.transform = "translate(" + old.getAttribute("data-tx") + "px,28px) rotate(" + old.getAttribute("data-rot") + "deg) scale(.95)";
        timeouts.push(window.setTimeout(() => { if (old.parentNode) old.parentNode.removeChild(old); }, 520));
      }
    };
    const start = () => {
      if (!started) {
        started = true;
        spawn();
        timeouts.push(window.setTimeout(spawn, 470));
        timeouts.push(window.setTimeout(spawn, 940));
        if (!reduce) timer = window.setInterval(spawn, 2300);
      } else if (!reduce && !timer) {
        timer = window.setInterval(spawn, 2300);
      }
    };
    const stop = () => { if (timer) { window.clearInterval(timer); timer = null; } };
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => (e.isIntersecting ? start() : stop()));
    }, { threshold: 0.3 });
    io.observe(pile);
    return () => { stop(); io.disconnect(); timeouts.forEach((x) => window.clearTimeout(x)); pile.querySelectorAll(".pl-sheet").forEach((n) => n.remove()); };
  }, []);

  return (
    <section className="py-16 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-14 items-center">
          {/* copy — solo il dolore */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-5">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary">Il punto critico</span>
            </div>
            <h2 className="font-headline font-bold tracking-tight leading-[1.1] text-3xl md:text-4xl text-text-main">
              Dietro ogni <span className="text-primary italic">"ci penso"</span> c'e' un paziente che non riesce a immaginare il risultato.
            </h2>
            <p className="mt-6 text-lg text-text-muted leading-relaxed">
              In Italia solo il 34% dei pazienti va dal dentista con regolarita': chi e' gia' nel tuo studio ha fatto il passo piu' difficile. Spesso il trattamento estetico lo vorrebbe davvero, ma se non riesce a vedere come apparira', tende a rimandare.
            </p>
            <p className="mt-4 text-text-muted leading-relaxed">
              E' un'esitazione comprensibile: sta valutando qualcosa che riguarda il suo viso, e non ha modo di anticiparne l'effetto. Il preventivo resta un foglio di numeri, senza un'immagine a cui appoggiare la decisione.
            </p>
            <p className="mt-6 font-serif italic text-text-main text-xl md:text-[22px] leading-snug">
              Non e' che non voleva il trattamento.<br />E' che non riusciva a vedersi.
            </p>
          </motion.div>

          {/* nuvola di obiezioni + pila di preventivi rifiutati */}
          <div className="flex flex-col items-center">
            <div className="pl-stage">
            <div className="pl-excuses">
              <span>"Devo parlarne a casa"</span>
              <span>"Ci devo pensare"</span>
              <span>"Ti faccio sapere"</span>
            </div>
            <div className="pl-pile" ref={pileRef}>
              <div className="pl-sizer"><div className="pl-paper"><div className="pl-in">
                <div className="pl-head"><b>Preventivo</b><span>N° 0247</span></div>
                <div className="pl-line"><span>Faccette in ceramica</span><span>×6</span></div>
                <div className="pl-line"><span>Studio / laboratorio</span><span>incl.</span></div>
                <div className="pl-tot"><span className="pl-k">Totale</span><span className="pl-v">€ 12.000</span></div>
                <div className="pl-nopreview">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="14" rx="2" /><circle cx="8.5" cy="9" r="1.3" /><path d="M4 16l4.5-4 3 2.5L15 10l5 5" /><line x1="3" y1="20" x2="21" y2="4" /></svg>
                  <span>Nessuna preview del paziente</span>
                </div>
              </div></div></div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── OtSlider (mini prima/dopo trascinabile per le card trattamento) ──────────
const OtSlider = ({ prima, dopo, alt, focus = "center" }: { prima: string; dopo: string; alt: string; focus?: string }) => {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const start = useRef<{ x: number; y: number; id: number } | null>(null);

  const update = (clientX: number) => {
    const el = ref.current; if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPos((x / rect.width) * 100);
  };
  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    start.current = { x: e.clientX, y: e.clientY, id: e.pointerId };
    if (e.pointerType === "mouse") { setDragging(true); e.currentTarget.setPointerCapture(e.pointerId); update(e.clientX); }
  };
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragging) { update(e.clientX); return; }
    const s = start.current; if (!s || s.id !== e.pointerId) return;
    const dx = Math.abs(e.clientX - s.x), dy = Math.abs(e.clientY - s.y);
    if (dx < 8 && dy < 8) return;
    if (dx > dy) { setDragging(true); try { e.currentTarget.setPointerCapture(e.pointerId); } catch { /* noop */ } update(e.clientX); }
    else start.current = null;
  };
  const onUp = () => { setDragging(false); start.current = null; };

  return (
    <div
      ref={ref}
      className="group relative aspect-[16/9] overflow-hidden cursor-ew-resize select-none bg-slate-100"
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      onPointerLeave={onUp}
      style={{ touchAction: "pan-y" }}
    >
      <img src={dopo} alt={`${alt} dopo`} className="absolute inset-0 w-full h-full object-cover" draggable="false" style={{ objectPosition: focus }} />
      <img src={prima} alt={`${alt} prima`} className="absolute inset-0 w-full h-full object-cover" draggable="false"
        style={{ objectPosition: focus, clipPath: `inset(0 ${100 - pos}% 0 0)`, transition: dragging ? "none" : "clip-path 0.4s ease" }} />
      <span className="ot-tag ot-prima" style={{ opacity: pos > 18 ? 1 : 0 }}>Prima</span>
      <span className="ot-tag ot-dopo" style={{ opacity: pos < 82 ? 1 : 0 }}>Dopo</span>
      <div className="pointer-events-none absolute top-0 bottom-0 -ml-px w-0.5 bg-white shadow" style={{ left: `${pos}%`, transition: dragging ? "none" : "left 0.4s ease" }}>
        <span className="ot-handle">⇆</span>
      </div>
    </div>
  );
};

// ─── EveryTreatment (Hormozi: su ogni trattamento, crolla "il mio caso e' diverso") ──
const EveryTreatment = () => {
  const treatments = [
    { name: "Sbiancamento", price: "Da €300 a €800", copy: "Il “ci penso” piu' comune. Mostragli i denti gia' bianchi e diventa un appuntamento.", prima: sbiancamentoPrima, dopo: sbiancamentoDopo },
    { name: "Faccette", price: "Da €800 a €2.500 / elemento", copy: "Il caso da migliaia di euro che non parte per paura. Qui lo vede finito, prima di iniziare.", prima: faccettePrima, dopo: faccetteDopo },
    { name: "Implantologia", price: "Da €1.500 a €5.000", copy: "Il vuoto che lo blocca da mesi. Mostragli il sorriso completo e il preventivo si sblocca.", prima: implantologiaPrima, dopo: implantologiaDopo, focus: "center 60%" },
  ];
  return (
    <section className="py-10 md:py-14 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Su qualsiasi trattamento</span>
          <h2 className="font-headline font-bold tracking-tight leading-[1.08] text-3xl md:text-4xl max-w-[18ch]">
            Non funziona su un trattamento. <span className="font-serif font-normal italic text-primary">Funziona su tutti quelli che si vedono.</span>
          </h2>
          <p className="mt-4 text-base text-text-muted leading-relaxed max-w-[58ch]">
            Sbiancamento, faccette, ortodonzia, impianti, protesi, zirconio. Se il risultato cambia il sorriso, SmileLive lo fa <strong className="text-text-main">vedere al paziente prima di decidere</strong>, cosi' puo' valutarlo con consapevolezza.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mt-6">
          {treatments.map((t, i) => (
            <div key={i} className="group bg-white border border-slate-200 rounded-[20px] overflow-hidden shadow-sm hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgba(2,132,199,0.4)] transition-all duration-300">
              <OtSlider prima={t.prima} dopo={t.dopo} alt={t.name} focus={t.focus} />
              <div className="p-5">
                <h3 className="text-lg font-bold text-text-main">{t.name}</h3>
                <div className="text-xs font-bold text-primary mt-0.5">{t.price}</div>
                <p className="mt-2.5 text-sm text-text-muted leading-relaxed">{t.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── ManifestoBand (fascia scura di stacco tra le sezioni) ──────────────────────
const ManifestoBand = () => (
  <section className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-sky-50/60 via-white to-white">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[620px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto px-6 text-center relative z-10"
    >
      <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-5">Il principio</span>
      <h2 className="font-headline font-bold leading-[1.12] tracking-tight text-3xl md:text-5xl text-text-main">
        Il paziente non decide su un preventivo.<br className="hidden md:block" /> Decide su qualcosa che <span className="font-serif font-normal italic text-primary">ha potuto vedere</span>.
      </h2>
      <p className="mt-6 text-lg md:text-xl text-text-muted leading-relaxed">
        Un'immagine chiara del risultato rende la conversazione piu' semplice: per il paziente e per lo studio.
      </p>
      <p className="mt-8 font-headline font-bold text-2xl md:text-4xl text-gold">Chi vede, capisce.</p>
    </motion.div>
  </section>
);

// ─── HowItWorks ────────────────────────────────────────────────────────────────
const HowItWorks = () => {
  const steps = [
    {
      num: "01",
      icon: <Users size={20} weight="light" className="text-primary" />,
      title: "Poster in sala d'attesa",
      desc: "Una sola frase. Nasce la curiosita' nel paziente ancora prima di entrare in poltrona.",
      image: stepPoster,
    },
    {
      num: "02",
      icon: <Camera size={20} weight="light" className="text-primary" />,
      title: "Lo staff genera la preview",
      desc: "La segretaria o l'ASO carica la foto e in 30 secondi la preview e' pronta. Zero intervento del dentista.",
      image: stepPreview,
      highlight: true,
    },
    {
      num: "03",
      icon: <Sparkle size={20} weight="light" className="text-primary" />,
      title: "Il paziente vede il suo sorriso",
      desc: "Sul tablet, sul PC, sullo schermo della reception. Non un esempio generico. Il suo sorriso, trasformato.",
      image: stepSorriso,
    },
    {
      num: "04",
      icon: <CheckCircle size={20} weight="light" className="text-primary" />,
      title: "Il dentista chiude il trattamento",
      desc: "Il paziente non sta firmando un preventivo astratto. Sta dicendo si' a qualcosa che ha gia' visto sul suo viso.",
      image: stepDentista,
    },
  ];

  return (
    <section id="come-funziona" className="py-16 md:py-28 bg-white relative overflow-hidden isolate">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-headline font-bold mb-6 tracking-tight">
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className={`relative flex flex-col bg-white rounded-2xl p-7 overflow-hidden group border border-slate-200 hover:shadow-[0_14px_40px_rgba(2,132,199,0.16)] hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-300 ${step.highlight ? 'border-primary/30 shadow-[0_10px_34px_rgba(2,132,199,0.16)]' : 'shadow-[0_8px_28px_rgba(15,23,42,0.08)]'}`}
            >
              {step.highlight && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-sky-400"></div>
              )}
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-5 relative z-10">
                {step.icon}
              </div>
              <h3 className="font-bold text-lg mb-3 text-text-main relative z-10">{step.title}</h3>
              <p className="text-text-muted text-base leading-relaxed relative z-10 mb-6">{step.desc}</p>
              {step.image && (
                <div className="relative z-10 mt-auto -mx-7 -mb-7 aspect-[4/3] overflow-hidden bg-slate-100">
                  <img
                    src={step.image}
                    alt={step.title}
                    loading="lazy"
                    className="h-full w-full object-cover object-center"
                  />
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
          className="mt-16 bg-gold/5 rounded-2xl border border-gold/20 p-6 md:p-8 max-w-7xl mx-auto shadow-sm"
        >
          <div className="flex items-start gap-4 md:gap-5">
            <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center shrink-0 mt-1">
              <Sparkle size={20} weight="fill" className="text-gold" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-text-main mb-2">Sulla precisione della simulazione</h3>
              <p className="text-text-muted leading-relaxed">
                SmileLive non e' uno strumento diagnostico: e' uno <strong className="text-text-main">strumento di desiderio</strong>. Il suo compito non e' garantire il risultato clinico. Il suo compito e' far nascere nel paziente la voglia di iniziare. Per i casi riproducibili, la preview e' molto accurata. Per i casi complessi, sblocca la conversazione. <strong className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600 font-bold">Funziona in entrambi i casi.</strong>
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
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [demoStage, setDemoStage] = useState<"idle" | "listening" | "processing" | "ready" | "sent">("idle");

  const features = [
    {
      icon: ClipboardText,
      accent: "#0284c7",
      span: "lg:col-span-4",
      title: "Scheda paziente unica",
      label: "Pazienti",
      body: "Preview, preventivi, note, stato del trattamento e cronologia raccolti in una vista chiara.",
      states: ["Timeline", "Stato pratica", "Note cliniche"],
    },
    {
      icon: Microphone,
      accent: "#26a7c6",
      span: "lg:col-span-4",
      title: "Preventivo intelligente",
      label: "Preventivi",
      body: "Lo studio prepara le voci, il paziente apre il link dal telefono, legge e firma senza carta.",
      states: ["Bozza", "Invio link", "Firma digitale"],
    },
    {
      icon: ChatCircle,
      accent: "#14b8a6",
      span: "lg:col-span-4",
      title: "Promemoria WhatsApp",
      label: "Reminder",
      body: "Messaggi automatici 24 ore e 2 ore prima dell'appuntamento, per ridurre assenze e telefonate.",
      states: ["24h prima", "2h prima", "Automatico"],
    },
    {
      icon: Receipt,
      accent: "#d97706",
      span: "lg:col-span-5",
      title: "Fatturazione TS ed export",
      label: "Fisco",
      body: "Il paziente inserisce i dati fiscali dal telefono. Lo studio prepara fatture, bollo virtuale ed export per il commercialista.",
      states: ["Dati paziente", "Sistema TS", "File mese"],
    },
    {
      icon: ChartLineUp,
      accent: "#3b82f6",
      span: "lg:col-span-7",
      title: "Dashboard per capire cosa sta convertendo",
      label: "Controllo",
      body: "Preventivi generati, accettati, in attesa, valore economico e crediti reminder in una schermata pensata per decisioni veloci.",
      states: ["Accettati", "In attesa", "Valore totale", "Crediti reminder"],
    },
  ];

  const prescriptionFields = [
    ["Lavorazione", "Corona monolitica"],
    ["Elemento", "2.6 - primo molare sup. sx"],
    ["Materiale", "Zirconia monolitica"],
    ["Colore", "A2 - scala VITA"],
    ["Preparazione", "Spalla circolare"],
    ["Consegna", "Entro venerdi"],
    ["Laboratorio", "Odontotecnica Rossi"],
  ];
  const transcript = "Corona in zirconia monolitica sull'elemento due-sei, colore A2, spalla circolare. Consegna entro venerdi.";

  const runPrescriptionDemo = () => {
    setDemoStage("listening");
    window.setTimeout(() => setDemoStage("processing"), 1200);
    window.setTimeout(() => setDemoStage("ready"), 2600);
  };

  const openPrescriptionDemo = () => {
    setIsDemoOpen(true);
    setDemoStage("idle");
  };

  const closePrescriptionDemo = () => {
    setIsDemoOpen(false);
    setDemoStage("idle");
  };

  return (
    <section className="py-20 md:py-32 relative overflow-hidden isolate bg-[#07111f] text-white font-body">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(900px_520px_at_82%_10%,rgba(38,167,198,0.22),transparent_64%),radial-gradient(760px_420px_at_9%_82%,rgba(2,132,199,0.16),transparent_68%),radial-gradient(620px_420px_at_78%_86%,rgba(217,119,6,0.10),transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-[minmax(0,700px)_360px] gap-8 lg:gap-10 items-end mb-10"
        >
          <div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-body font-black tracking-tight leading-[0.98] text-balance">
              <span className="text-orange-500">Aspetta.</span><br className="sm:hidden" /> SmileLive non è solo la preview del sorriso.
            </h2>
            <p className="mt-4 text-xl md:text-2xl font-body font-bold tracking-tight leading-snug text-orange-500 max-w-2xl">
              È un gestionale con tutto incluso.
            </p>
            <p className="mt-3 text-base md:text-lg leading-relaxed text-slate-300 max-w-2xl">
              Mentre lo usavi per convertire i pazienti indecisi, lavorava già su tutto il resto: i tre modi silenziosi in cui ogni studio perde soldi. Pazienti che non firmano, appuntamenti dimenticati, burocrazia che mangia ore. Li risolve tutti e tre, in un unico posto.
            </p>
          </div>
          <aside className="relative overflow-hidden rounded-[22px] border border-orange-300/40 bg-[linear-gradient(150deg,rgba(249,115,22,0.16),rgba(18,28,43,0.6))] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_30px_78px_-58px_rgba(0,0,0,0.88)] backdrop-blur">
            <strong className="block text-3xl font-body font-black tracking-tight leading-none text-white">Sì, tutto incluso.</strong>
            <span className="block mt-3 text-sm leading-relaxed text-slate-200">
              CRM, preventivi, firma, reminder, fisco e prescrizione vocale nello stesso flusso commerciale.
            </span>
          </aside>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
            <motion.div
              key={feature.title}
              variants={fadeUp}
              className={`relative min-h-[255px] overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.065] p-6 shadow-[0_34px_86px_-58px_rgba(0,0,0,0.9)] backdrop-blur transition-all duration-300 hover:-translate-y-1 ${feature.span}`}
              style={{
                boxShadow: `0 34px 86px -58px rgba(0,0,0,.9), inset 0 1px 0 rgba(255,255,255,.11)`,
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none opacity-75"
                style={{
                  background: `radial-gradient(320px 180px at 16% 0%, ${feature.accent}36, transparent 68%), radial-gradient(260px 180px at 96% 100%, ${feature.accent}22, transparent 70%)`,
                }}
              />
              <div className="relative flex items-start justify-between gap-4">
                <div
                  className="w-[54px] h-[54px] rounded-[17px] grid place-items-center text-white text-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]"
                  style={{ background: `linear-gradient(145deg, ${feature.accent}, #0f172a)` }}
                >
                  <Icon size={25} weight="regular" />
                </div>
                <span
                  className="inline-flex items-center rounded-full px-3 py-1.5 text-[12px] font-extrabold"
                  style={{ background: `${feature.accent}24`, color: "#eaf8ff" }}
                >
                  {feature.label}
                </span>
              </div>
              <div className="relative">
                <h3 className="mt-6 text-2xl md:text-[34px] font-body font-black tracking-tight leading-[1.02] text-white">{feature.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-300">{feature.body}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {feature.states.map((s) => (
                    <span key={s} className="rounded-full border border-white/10 bg-white/[0.065] px-3 py-1.5 text-xs font-bold text-slate-100">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )})}

          <motion.div
            variants={fadeUp}
            className="relative min-h-[255px] overflow-hidden rounded-[22px] border border-orange-300/35 bg-[linear-gradient(145deg,rgba(42,20,7,0.96),rgba(18,28,43,0.96))] p-6 shadow-[0_34px_86px_-58px_rgba(0,0,0,0.9)] lg:col-span-12"
          >
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(560px_300px_at_10%_8%,rgba(249,115,22,0.42),transparent_64%),radial-gradient(520px_300px_at_92%_100%,rgba(217,119,6,0.34),transparent_66%),radial-gradient(420px_240px_at_72%_10%,rgba(251,191,36,0.16),transparent_70%)]" />
            <div className="relative flex items-start justify-between gap-4">
              <div className="w-[54px] h-[54px] rounded-[17px] grid place-items-center bg-gradient-to-br from-orange-400 to-amber-600 text-white shadow-[0_18px_48px_-24px_rgba(249,115,22,0.95)]">
                <Microphone size={25} />
              </div>
              <span className="rounded-full border border-orange-300/35 bg-orange-500/20 px-3 py-1.5 text-[12px] font-extrabold text-orange-100">
                Esclusiva
              </span>
            </div>
            <div className="relative">
              <h3 className="mt-6 text-2xl md:text-[34px] font-body font-black tracking-tight leading-[1.02] text-white">
                Prescrizione vocale al laboratorio
              </h3>
              <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-orange-50/80">
                Detti la lavorazione a voce: SmileLive struttura elemento, materiale, colore, consegna e laboratorio di riferimento. La prescrizione parte ordinata, senza messaggi dispersi.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Elemento", "Materiale", "Colore", "Consegna"].map((item) => (
                  <span key={item} className="rounded-full border border-orange-300/25 bg-orange-500/15 px-3 py-1.5 text-xs font-bold text-orange-50">
                    {item}
                  </span>
                ))}
              </div>
              <button
                type="button"
                onClick={openPrescriptionDemo}
                className="mt-6 inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-gradient-to-br from-orange-400 to-amber-600 px-5 py-3 font-extrabold text-white shadow-[0_24px_64px_-28px_rgba(249,115,22,0.95)] transition hover:-translate-y-0.5 hover:from-orange-300 hover:to-orange-600 active:scale-[0.98]"
              >
                <CaretRight size={17} weight="fill" />
                Demo prescrizione vocale
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isDemoOpen && (
          <motion.div
            className="fixed inset-0 z-[999] flex items-center justify-center bg-[#07111f]/75 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePrescriptionDemo}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="prescription-demo-title"
              className="w-full max-w-4xl max-h-[calc(100dvh-32px)] overflow-auto rounded-[28px] border border-white/10 bg-[linear-gradient(145deg,#07111f,#101c2f)] text-white shadow-[0_40px_120px_-60px_rgba(0,0,0,0.9)]"
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-5 p-6 pb-0">
                <div>
                  <span className="text-xs font-extrabold text-amber-300">Prova diretta</span>
                  <h3 id="prescription-demo-title" className="mt-2 text-3xl md:text-5xl font-body font-black tracking-tight leading-none">
                    Prescrizione vocale al laboratorio
                  </h3>
                  <p className="mt-3 text-slate-300">
                    Premi il microfono: SmileLive trasforma una dettatura in una prescrizione ordinata.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closePrescriptionDemo}
                  aria-label="Chiudi demo"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 bg-white/10 text-white"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                <div className="rounded-[22px] border border-white/10 bg-white/[0.06] p-5">
                  <p className="text-xs font-extrabold text-amber-300">Dettatura</p>
                  <p className="mt-4 min-h-[124px] text-lg leading-relaxed text-slate-200">
                    {demoStage === "idle" ? '"Premi il microfono e guarda come viene strutturata."' : `"${transcript}"`}
                  </p>
                  <div className="mt-5 flex items-center gap-4">
                    <button
                      type="button"
                      onClick={runPrescriptionDemo}
                      className="grid h-16 w-16 place-items-center rounded-full bg-amber-600 text-white shadow-[0_0_0_10px_rgba(217,119,6,0.13)]"
                      aria-label="Avvia demo prescrizione"
                    >
                      <Microphone size={28} weight="fill" />
                    </button>
                    {demoStage === "listening" && (
                      <div className="flex h-7 items-end gap-1 text-amber-300" aria-hidden="true">
                        {[8, 17, 25, 14, 21].map((height, index) => (
                          <span
                            key={index}
                            className="w-1 rounded-full bg-current animate-pulse"
                            style={{ height }}
                          />
                        ))}
                      </div>
                    )}
                    <span className="text-slate-300">
                      {demoStage === "idle" && "Tocca per iniziare"}
                      {demoStage === "listening" && "Sto ascoltando..."}
                      {demoStage === "processing" && "Strutturo la prescrizione..."}
                      {(demoStage === "ready" || demoStage === "sent") && "Fatto in pochi secondi."}
                    </span>
                  </div>
                </div>

                <div className="rounded-[22px] border border-white/10 bg-white/[0.06] p-5">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-xs font-extrabold text-slate-400">Prescrizione strutturata</p>
                    <span className="text-xs font-extrabold text-sky-300">
                      {demoStage === "idle" && "In attesa"}
                      {demoStage === "listening" && "In ascolto"}
                      {demoStage === "processing" && "Elaboro"}
                      {demoStage === "ready" && "Pronta"}
                      {demoStage === "sent" && "Inviata"}
                    </span>
                  </div>
                  <div className="mt-3">
                    {prescriptionFields.map(([key, value]) => (
                      <div key={key} className={`flex items-center justify-between gap-3 border-b border-white/10 py-3 ${demoStage === "ready" || demoStage === "sent" ? "opacity-100" : "opacity-40"}`}>
                        <small className="text-[11px] font-extrabold text-slate-400">{key}</small>
                        <b className="text-right text-sm">{demoStage === "ready" || demoStage === "sent" ? value : "-"}</b>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    disabled={demoStage !== "ready" && demoStage !== "sent"}
                    onClick={() => setDemoStage("sent")}
                    className={`mt-5 w-full rounded-2xl py-3 font-extrabold text-white transition ${demoStage === "sent" ? "bg-emerald-600" : "bg-primary disabled:cursor-not-allowed disabled:opacity-40"}`}
                  >
                    {demoStage === "sent" ? "Inviata al laboratorio" : "Invia al laboratorio"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
    <section className="py-16 md:py-28 relative overflow-hidden bg-gradient-to-b from-sky-50/60 via-white to-white">
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[760px] h-[220px] bg-gold/15 blur-[130px] rounded-full pointer-events-none"></div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-5xl mx-auto px-6 relative z-10"
      >
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/25 mb-6">
            <ChartLineUp size={16} weight="fill" className="text-gold" />
            <span className="text-xs font-bold tracking-widest uppercase text-gold">Calcolatore ROI</span>
          </span>
          <h2 className="text-4xl md:text-6xl font-headline font-black mb-4 tracking-tight text-text-main">
            Simula il tuo <span className="italic font-serif font-normal text-primary">flusso di cassa</span>
          </h2>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">Gli studi che usano SmileLive chiudono in media 2–3 trattamenti estetici in piu' al mese nei primi 60 giorni.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-[0_18px_50px_-28px_rgba(15,23,42,0.35)] p-8 space-y-7">
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <label htmlFor="previews-range" className="text-sm font-semibold text-text-main flex items-center gap-2"><Camera size={17} weight="fill" className="text-gold" /> Preview generate al mese</label>
                <span className="text-2xl font-headline font-bold text-gold num-tabular">{previews}</span>
              </div>
              <input id="previews-range" type="range" aria-label="Numero di preview mensili" min="10" max="200" step="10" value={previews} onChange={(e) => setPreviews(Number(e.target.value))} className="w-full h-2 bg-gold/15 rounded-lg appearance-none cursor-pointer accent-gold" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <label htmlFor="conversion-range" className="text-sm font-semibold text-text-main flex items-center gap-2"><TrendUp size={17} weight="fill" className="text-gold" /> Tasso di conversione stimato</label>
                <span className="text-2xl font-headline font-bold text-gold num-tabular">{conversion}%</span>
              </div>
              <input id="conversion-range" type="range" aria-label="Tasso di conversione" min="1" max="50" step="1" value={conversion} onChange={(e) => setConversion(Number(e.target.value))} className="w-full h-2 bg-gold/15 rounded-lg appearance-none cursor-pointer accent-gold" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <label htmlFor="ticket-range" className="text-sm font-semibold text-text-main flex items-center gap-2"><Receipt size={17} weight="fill" className="text-gold" /> Ticket medio del trattamento</label>
                <span className="text-2xl font-headline font-bold text-gold num-tabular">€{ticket}</span>
              </div>
              <input id="ticket-range" type="range" aria-label="Valore ticket medio" min="300" max="12000" step="100" value={ticket} onChange={(e) => setTicket(Number(e.target.value))} className="w-full h-2 bg-gold/15 rounded-lg appearance-none cursor-pointer accent-gold" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-gold/[0.10] via-white to-white rounded-3xl p-6 md:p-10 flex flex-col justify-center relative overflow-hidden text-center shadow-[0_18px_50px_-28px_rgba(15,23,42,0.35)] border border-gold/25">
            <div className="absolute top-0 right-0 w-56 h-56 bg-gold/15 blur-[80px] rounded-full pointer-events-none"></div>
            <div className="relative z-10 space-y-7">
              <div>
                <p className="text-text-muted mb-2 font-medium text-sm uppercase tracking-widest">Nuovi pazienti al mese</p>
                <div className="text-5xl font-headline font-black text-text-main num-tabular">+{monthlyPatients}</div>
              </div>
              <div>
                <p className="text-text-muted mb-2 font-medium text-sm uppercase tracking-widest">Fatturato extra stimato</p>
                <div className="text-[clamp(1.9rem,8vw,3.5rem)] font-headline font-black text-gold num-tabular leading-none tracking-tight whitespace-nowrap">€{extraRevenue.toLocaleString('it-IT')}</div>
                <p className="text-text-muted/70 text-sm mt-1">al mese</p>
              </div>
              <div className="pt-6 border-t border-slate-200">
                <p className="text-sm text-text-muted leading-relaxed">
                  SmileLive Studio Piccolo: <strong className="text-gold">€47/mese</strong> annuale.<br />Un solo trattamento in piu' lo ripaga in meno di un'ora di lavoro.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

// ─── IntermediateCTA (CTA + prova numerica, uniti) ───────────────────────────────
const IntermediateCTA = () => {
  const stats = [
    { icon: <Users size={22} weight="fill" className="text-gold" />, value: "50+", label: "Studi Attivi in Italia" },
    { icon: <TrendUp size={22} weight="fill" className="text-primary" />, value: "+67%", label: "Conversione Media" },
    { icon: <Pulse size={22} weight="fill" className="text-text-main" />, value: "€700k+", label: "Generati in Extra" },
    { icon: <Lightning size={22} weight="fill" className="text-text-main" />, value: "10s", label: "Per Simulazione" },
  ];

  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-sky-50/60 via-white to-white">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[620px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto px-6 text-center relative z-10"
      >
        <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-5">Non lasciarlo uscire indeciso</span>
        <h2 className="font-headline font-bold leading-[1.12] tracking-tight text-3xl md:text-5xl text-text-main max-w-3xl mx-auto">
          Chi ti dice <span className="font-serif font-normal italic text-primary">"ci penso"</span> potrebbe dirti di sì.<br className="hidden md:block" /> Se gli mostri il risultato.
        </h2>
        <div className="mt-10 flex flex-col items-center gap-3">
          <motion.a
            href="https://app.smilelive.it/"
            onClick={() => trackCta("inizia_gratis", "intermediate_cta")}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="group inline-flex items-center gap-3 bg-primary text-white font-bold text-lg px-9 py-4 rounded-full shadow-[0_8px_40px_rgba(2,132,199,0.5)] hover:shadow-[0_8px_60px_rgba(2,132,199,0.7)] transition-shadow duration-300"
          >
            Inizia gratis
            <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center group-hover:translate-x-0.5 transition-transform duration-200">
              <CaretRight size={14} weight="bold" />
            </span>
          </motion.a>
          <span className="text-sm text-text-muted">3 anteprime in omaggio · senza carta richiesta</span>
        </div>
        <div className="mt-14 bg-white rounded-[2.5rem] shadow-[0_20px_60px_-30px_rgba(15,23,42,0.25)] border border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-y-8 py-8 px-6 md:divide-x md:divide-slate-100">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5 text-center px-4">
              <div className="flex items-center gap-2">
                {s.icon}
                <span className="text-2xl font-headline font-bold num-tabular text-text-main">{s.value}</span>
              </div>
              <div className="text-[11px] md:text-xs uppercase tracking-widest text-text-muted font-semibold">{s.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

// ─── Pricing ───────────────────────────────────────────────────────────────────
const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const studioPlans = [
    { name: "Studio Piccolo", tagline: "Per studi che iniziano", monthly: 57, annualMonthly: 47, annualTotal: 564, foto: 20, video: 8, promemoria: 25, extra: "5€/foto · 5€/video · €0,20/promemoria", cta: "Scegli Studio Piccolo", ctaId: "scegli_studio_piccolo", highlighted: false, accent: "#0d9488", grad: "linear-gradient(135deg,#2dd4bf,#0d9488)" },
    { name: "Studio Medio", tagline: "Per studi attivi", monthly: 114, annualMonthly: 94, annualTotal: 1128, foto: 50, video: 18, promemoria: 50, extra: "5€/foto · 5€/video · €0,19/promemoria", cta: "Scegli Studio Medio", ctaId: "scegli_studio_medio", highlighted: true, accent: "#2563eb", grad: "linear-gradient(135deg,#38bdf8,#4f46e5)" },
    { name: "Studio Grande", tagline: "Per grandi studi e cliniche", monthly: 157, annualMonthly: 137, annualTotal: 1644, foto: 120, video: 30, promemoria: 125, extra: "2€/foto · 3€/video · €0,18/promemoria", cta: "Scegli Studio Grande", ctaId: "scegli_studio_grande", highlighted: false, accent: "#7c3aed", grad: "linear-gradient(135deg,#a78bfa,#7c3aed)" },
  ];

  const rules = [
    { icon: Sparkle, title: "Inizi gratis", body: "3 foto + 1 video in omaggio alla registrazione. Senza abbonamento generi ancora a 5€/foto e 5€/video, nessun canone fisso." },
    { icon: ShieldCheck, title: "Errore nostro? Rigenerazione gratis entro 24h", body: "Se una generazione esce male la segnali con un tasto: la verifichiamo e, se l'errore e' nostro, la rifacciamo gratis entro 24 ore." },
    { icon: Camera, title: "Le modifiche creative scalano dal piano", body: "Le modifiche che chiedi tu (es. 'piu' bianchi', forma diversa) contano come una generazione normale e scalano dalle quote del piano." },
    { icon: Lightning, title: "Mai un blocco in poltrona", body: "Al raggiungimento del limite non si blocca nulla: addebito automatico dell'extra o passaggio al piano superiore. Col paziente davanti non ti fermi mai." },
  ];

  const freeTokens = { accent: "#64748b", grad: "linear-gradient(135deg,#94a3b8,#64748b)" };
  const Feat = ({ icon: Icon, grad, children }: { icon: React.ElementType; grad: string; children: React.ReactNode }) => (
    <li className="flex items-center gap-3 text-[15px] text-text-muted text-left">
      <span className="w-9 h-9 shrink-0 rounded-full flex items-center justify-center text-white" style={{ background: grad }}>
        <Icon size={18} weight="regular" />
      </span>
      <span>{children}</span>
    </li>
  );

  return (
    <section id="pricing" className="py-16 md:py-28 bg-white relative overflow-hidden" style={{ backgroundImage: 'radial-gradient(50% 55% at 12% 18%, rgba(56,189,248,0.20), transparent 70%), radial-gradient(48% 55% at 88% 22%, rgba(129,140,248,0.20), transparent 70%), radial-gradient(60% 60% at 50% 108%, rgba(59,130,246,0.14), transparent 68%)', scrollMarginTop: 'var(--header-h, 7rem)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-center mb-4 tracking-tight">Scegli il tuo <span className="text-gold">piano</span></h2>
          <p className="text-xl text-text-muted text-center mb-4">Inizia gratis con 3 anteprime. Poi scegli il piano giusto per il tuo studio.</p>
          <p className="text-base text-text-muted text-center max-w-2xl mb-8">L'abbonamento sblocca tutto il software e le generazioni incluse ogni mese. L'opzione annuale si paga in un'unica soluzione, al prezzo piu' basso.</p>
          <div className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-full p-1.5">
            <button onClick={() => setIsAnnual(false)} className={`px-5 py-2 rounded-full font-medium transition-colors duration-200 ${!isAnnual ? 'bg-white shadow-sm text-text-main' : 'text-text-muted hover:text-text-main'}`}>Mensile</button>
            <button onClick={() => setIsAnnual(true)} className={`px-5 py-2 rounded-full font-medium transition-colors duration-200 flex items-center gap-2 ${isAnnual ? 'bg-white shadow-sm text-text-main' : 'text-text-muted hover:text-text-main'}`}>
              Annuale
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
          <motion.div variants={fadeUp} className="bg-white rounded-3xl border border-slate-200 shadow-[0_10px_35px_rgba(15,23,42,0.06)] p-8 flex flex-col text-center hover:shadow-[0_16px_50px_rgba(2,132,199,0.12)] hover:-translate-y-1 transition-all duration-300">
            <h3 className="text-xl font-bold mb-1" style={{ color: freeTokens.accent }}>Free</h3>
            <p className="text-sm text-text-muted mb-4">Per provare</p>
            <div className="text-4xl font-headline font-bold mb-1 num-tabular text-text-main">€0<span className="text-sm text-text-muted font-normal">/mese</span></div>
            <div className="h-px w-full bg-slate-100 my-5"></div>
            <ul className="space-y-3 mb-8 flex-grow w-full">
              <Feat icon={Gift} grad={freeTokens.grad}><strong className="text-text-main">3 foto + 1 video</strong> in omaggio</Feat>
              <Feat icon={Sparkle} grad={freeTokens.grad}>Tab <strong className="text-text-main">SmileLive Preview</strong> attiva subito</Feat>
              <Feat icon={Lightning} grad={freeTokens.grad}>Poi <strong className="text-text-main">5€/foto · 5€/video</strong>, senza canone</Feat>
              <li className="text-sm pt-2 border-t border-slate-100 text-text-muted text-left">Il resto si sblocca con l'abbonamento.</li>
            </ul>
            <a href="https://app.smilelive.it/" onClick={() => trackCta("inizia_gratis", "pricing_free")} className="w-full py-3 rounded-full border-[1.5px] hover:bg-slate-50 transition-all font-bold text-sm text-center" style={{ borderColor: freeTokens.accent, color: freeTokens.accent }}>Inizia gratis</a>
          </motion.div>

          {studioPlans.map((plan) => {
            const price = isAnnual ? plan.annualMonthly : plan.monthly;
            const saving = (plan.monthly - plan.annualMonthly) * 12;
            const feats = [
              { icon: Camera, node: <><strong className="text-text-main">{plan.foto} foto</strong> (preview)/mese</> },
              { icon: VideoCamera, node: <><strong className="text-text-main">{plan.video} video</strong>/mese</> },
              { icon: ChatCircle, node: <><strong className="text-text-main">{plan.promemoria} promemoria</strong> WhatsApp/SMS</> },
            ];
            if (plan.highlighted) feats.push({ icon: Headset, node: <><strong className="text-text-main">Supporto</strong> prioritario</> });

            const body = (
              <>
                <h3 className="text-xl font-bold mb-1" style={{ color: plan.accent }}>{plan.name}</h3>
                <p className="text-sm text-text-muted mb-4">{plan.tagline}</p>
                <div className="text-4xl font-headline font-bold mb-1 num-tabular text-text-main">€{price}<span className="text-sm font-normal text-text-muted">/mese</span></div>
                {isAnnual && <div className="text-sm font-semibold mb-0.5" style={{ color: plan.accent }}>€{plan.annualTotal.toLocaleString("it-IT")}/anno · risparmi €{saving}</div>}
                {isAnnual && <div className="text-xs mb-1 text-text-muted">in un'unica soluzione</div>}
                <div className="h-px w-full my-5 bg-slate-100"></div>
                <ul className="space-y-3 mb-8 flex-grow w-full">
                  {feats.map((f, i) => <Feat key={i} icon={f.icon} grad={plan.grad}>{f.node}</Feat>)}
                  <li className="text-sm pt-2 border-t border-slate-100 text-text-muted text-left">Extra: {plan.extra}</li>
                </ul>
                {plan.highlighted ? (
                  <a href="https://app.smilelive.it/" onClick={() => trackCta(plan.ctaId, "pricing")} className="w-full py-3 rounded-full transition-all text-sm text-center font-bold text-white hover:brightness-105" style={{ background: plan.grad, boxShadow: `0 8px 22px ${plan.accent}55` }}>{plan.cta}</a>
                ) : (
                  <a href="https://app.smilelive.it/" onClick={() => trackCta(plan.ctaId, "pricing")} className="w-full py-3 rounded-full border-[1.5px] hover:bg-slate-50 transition-all text-sm text-center font-bold" style={{ borderColor: plan.accent, color: plan.accent }}>{plan.cta}</a>
                )}
              </>
            );

            if (plan.highlighted) {
              return (
                <motion.div key={plan.name} variants={fadeUp} className="relative rounded-[26px] p-[2.5px] lg:scale-[1.04] lg:z-10" style={{ background: "conic-gradient(from 140deg,#38bdf8,#818cf8,#a855f7,#38bdf8)", boxShadow: "0 26px 60px rgba(99,102,241,0.35)" }}>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full whitespace-nowrap" style={{ background: "linear-gradient(135deg,#38bdf8,#4f46e5)", boxShadow: "0 8px 20px rgba(37,99,235,0.45)" }}>Il piu' scelto</div>
                  <div className="rounded-[23px] bg-white p-8 flex flex-col text-center h-full">{body}</div>
                </motion.div>
              );
            }
            return (
              <motion.div key={plan.name} variants={fadeUp} className="bg-white rounded-3xl border border-slate-200 shadow-[0_10px_35px_rgba(15,23,42,0.06)] p-8 flex flex-col text-center hover:shadow-[0_16px_50px_rgba(2,132,199,0.12)] hover:-translate-y-1 transition-all duration-300">{body}</motion.div>
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
          <h3 className="text-2xl md:text-3xl font-headline font-bold mb-3 tracking-tight">Come funzionano le generazioni</h3>
          <p className="text-text-muted max-w-2xl mx-auto">Regole chiare, nessuna sorpresa in fattura, nessun blocco col paziente in poltrona.</p>
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
    <section className="py-16 md:py-28 bg-[#e8f3fb]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold text-center mb-16 tracking-tight"
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
  <section className="py-16 md:py-28 bg-white relative overflow-hidden isolate">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto px-6"
    >
      <h2 className="text-4xl md:text-5xl font-headline font-bold mb-12 text-center tracking-tight">Sei uno di <span className="text-gold">loro?</span></h2>
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
          Se ti riconosci anche in uno solo di questi, questo strumento e' stato costruito per te.
        </p>
      </div>
    </motion.div>
  </section>
);

// ─── FutureVision ──────────────────────────────────────────────────────────────
const FutureVision = () => (
  <section id="future" className="py-16 md:py-28 bg-slate-50">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto px-6 text-center"
    >
      <div className="flex items-center justify-center gap-3 mb-6">
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-secondary">La Visione</span>
      </div>
      <h2 className="text-4xl md:text-5xl font-headline font-bold mb-4 tracking-tight">
        Da strumento di conversione<br />
        <span className="italic font-serif font-normal text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">a sistema di gestione.</span>
      </h2>
      <p className="text-xl text-text-muted leading-relaxed mb-3 max-w-2xl mx-auto">SmileLive non e' solo preview. E' il software che mancava al tuo studio.</p>
      <p className="text-lg text-text-muted leading-relaxed mb-12 max-w-2xl mx-auto">Chi e' abbonato entrera' automaticamente nella nostra <strong className="text-text-main">Vetrina di Odontoiatri Specialisti</strong>: un vantaggio competitivo enorme per le richieste locali.</p>

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
    { q: "Posso provarlo senza abbonarmi?", a: "Si'. La registrazione e' gratuita e ti regaliamo 3 foto e 1 video in omaggio nella tab SmileLive Preview, senza carta e senza impegno. Il resto del software resta visibile e si sblocca quando attivi un abbonamento. Per generare ancora senza abbonarti, paghi 5€ a foto e 5€ a video." },
    { q: "Meglio l'abbonamento o pagare a consumo?", a: "Dipende dal volume. Senza abbonamento generi a 5€/foto e 5€/video, comodo per testare. Con un abbonamento Studio hai foto e video inclusi ogni mese a un costo unitario molto piu' basso, piu' i promemoria WhatsApp/SMS e tutto il software sbloccato. Sul piano Studio Grande anche gli extra costano meno: 2€/foto e 3€/video." },
    { q: "Cosa succede se una preview esce male (denti deformati, artefatti)?", a: "La generazione scala comunque dal piano, ma con un tasto la segnali: verifichiamo il caso e, se l'errore e' nostro, la rigeneriamo gratis entro 24 ore. Le modifiche creative che chiedi tu (piu' bianchi, forma diversa) contano invece come una generazione normale." },
    { q: "E se finisco le foto o i video inclusi nel mese?", a: "Non ti blocchiamo mai, soprattutto col paziente in poltrona. Al raggiungimento del limite scatta l'addebito automatico dell'extra (5€/foto · 5€/video, 2€/foto · 3€/video sullo Studio Grande) oppure puoi passare al piano superiore. Decidi tu." },
    { q: "Chi genera le preview? Devo farlo io?", a: "No. Il protocollo e' pensato per la segreteria o l'ASO. E' semplicissimo da usare: da quel momento lo staff lavora in autonomia e tu resti in poltrona." },
    { q: "Il 70% di accuratezza visiva non e' troppo basso?", a: "SmileLive non e' uno strumento diagnostico: e' uno strumento di desiderio. Il suo compito non e' garantire il risultato clinico, quello e' il tuo. Il suo compito e' far nascere nel paziente la voglia di iniziare. Per i casi riproducibili, la preview e' molto accurata. Per i casi complessi, sblocca la conversazione. Funziona in entrambi i casi." },
    { q: "Posso usarlo per l'implantologia o solo per l'estetica?", a: "SmileLive lavora su qualsiasi trattamento che cambia visibilmente il sorriso: faccette, sbiancamento, ortodonzia, protesi, impianti su arcata. Se il risultato si vede, SmileLive lo puo' mostrare." },
  ];

  return (
    <section id="faq" className="py-16 md:py-28 bg-white relative overflow-hidden isolate">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto px-6"
      >
        <h2 className="text-4xl md:text-5xl font-headline font-bold mb-4 text-center tracking-tight">Domande frequenti</h2>
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
  <section className="py-20 md:py-40 relative overflow-hidden text-center bg-gradient-to-b from-white via-sky-50/50 to-sky-50">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-primary/10 blur-[160px] rounded-full pointer-events-none"></div>
    <div className="absolute top-0 left-1/4 w-[400px] h-[300px] bg-primary/[0.06] blur-[120px] rounded-full pointer-events-none"></div>
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="max-w-4xl mx-auto px-6 relative z-10"
    >
      <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-5">Pronto a partire</span>
      <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-headline font-bold mb-6 leading-tight text-text-main tracking-tight text-balance">
        Il tuo prossimo paziente <span className="text-gold">indeciso</span> e' gia' in sala d'attesa.
      </h2>
      <p className="text-lg md:text-xl text-text-muted leading-relaxed max-w-2xl mx-auto">
        Ogni "ci penso" che senti oggi e' un trattamento che potrebbe diventare un si' domani.
      </p>
      <p className="mt-3 text-base md:text-lg text-text-main font-semibold">
        Il primo risultato potrebbe arrivare questa settimana.
      </p>
      <div className="mt-10 flex flex-col items-center gap-3">
        <motion.a
          href="https://app.smilelive.it/"
          onClick={() => trackCta("inizia_gratis", "final_cta")}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="group bg-primary text-white font-bold text-lg px-9 py-4 rounded-full shadow-[0_8px_40px_rgba(2,132,199,0.5)] hover:shadow-[0_8px_60px_rgba(2,132,199,0.7)] transition-shadow duration-300 inline-flex items-center gap-3"
        >
          Inizia gratis
          <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center group-hover:translate-x-0.5 transition-transform duration-200">
            <CaretRight size={16} weight="bold" />
          </span>
        </motion.a>
        <span className="text-sm text-text-muted">3 foto + 1 video in omaggio · senza carta richiesta</span>
      </div>
      <p className="mt-6 text-sm text-text-muted/70">Setup in 10 minuti. Il tuo staff e' operativo oggi.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-text-muted font-medium">
        <span className="flex items-center gap-1"><ShieldCheck size={15} weight="light" className="text-primary" /> Accesso immediato</span>
        <span className="hidden md:inline text-slate-300">·</span>
        <span>GDPR Compliant</span>
        <span className="hidden md:inline text-slate-300">·</span>
        <span>Made in Italy</span>
      </div>
    </motion.div>
  </section>
);

// ─── Footer ────────────────────────────────────────────────────────────────────
const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/smilelive.it", Icon: InstagramLogo },
  { label: "Facebook", href: null, Icon: FacebookLogo, wip: true }, // pagina in arrivo
  { label: "WhatsApp", href: "https://wa.me/393289598557", Icon: WhatsappLogo },
];

const FooterCol = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-3">
    <h4 className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest">{title}</h4>
    <ul className="flex flex-col gap-2.5 text-sm text-slate-400">{children}</ul>
  </div>
);

const footerLink = "hover:text-white transition-colors";

const Footer = () => (
  <footer className="bg-[#0b1220] text-white">
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1.3fr] gap-12 lg:gap-8">
        {/* Brand + social */}
        <div className="flex flex-col gap-5">
          <img src={logoFinale} alt="SmileLive" className="h-11 w-auto object-contain object-left brightness-0 invert" width="120" height="44" loading="lazy" />
          <p className="text-sm text-slate-400 leading-relaxed max-w-[260px]">
            Il convertitore di pazienti indecisi: simulazioni del sorriso con l'AI che aumentano l'accettazione dei preventivi.
          </p>
          <div className="flex items-center gap-3">
            {SOCIALS.map(({ label, href, Icon, wip }) =>
              wip ? (
                <span key={label} aria-label={`${label} — Work in progress`} title="Work in progress"
                  className="w-9 h-9 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-slate-500 cursor-not-allowed">
                  <Icon size={16} weight="fill" />
                </span>
              ) : (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-slate-400 hover:bg-primary hover:border-primary hover:text-white transition-all duration-200">
                  <Icon size={16} weight="fill" />
                </a>
              )
            )}
          </div>
        </div>

        {/* Naviga */}
        <FooterCol title="Naviga">
          <li><a href="#come-funziona" className={footerLink}>Come funziona</a></li>
          <li><a href="#pricing" className={footerLink}>Prezzi</a></li>
          <li><a href="#faq" className={footerLink}>FAQ</a></li>
          <li><a href="https://app.smilelive.it/" target="_blank" rel="noopener noreferrer" className={footerLink}>Accedi</a></li>
        </FooterCol>

        {/* Legale */}
        <FooterCol title="Legale">
          <li><a href="/privacy" className={footerLink}>Privacy Policy</a></li>
          <li><a href="/cookie-policy" className={footerLink}>Cookie Policy</a></li>
          <li><a href="/terms" className={footerLink}>Termini di Servizio</a></li>
          <li><button type="button" onClick={openCookieBanner} className={`${footerLink} text-left`}>Gestione cookie</button></li>
        </FooterCol>

        {/* Contatti */}
        <FooterCol title="Contatti">
          <li>
            <a href="mailto:supporto@smilelive.it" className={`inline-flex items-center gap-2 ${footerLink}`}>
              <EnvelopeSimple size={16} weight="light" className="text-primary shrink-0" /> supporto@smilelive.it
            </a>
          </li>
          <li>
            <a href="https://wa.me/393289598557" target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 ${footerLink}`}>
              <WhatsappLogo size={16} weight="light" className="text-primary shrink-0" /> WhatsApp
            </a>
          </li>
          <li className="flex flex-wrap gap-2 pt-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 text-xs font-medium text-slate-300">
              <ShieldCheck size={13} weight="light" className="text-primary" /> GDPR Compliant
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 text-xs font-medium text-slate-300">
              Made in Italy
            </span>
          </li>
        </FooterCol>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <p>© {new Date().getFullYear()} SmileLive. Tutti i diritti riservati.</p>
        <div className="flex items-center gap-4">
          <a href="/privacy" className="hover:text-slate-300 transition-colors">Privacy</a>
          <a href="/terms" className="hover:text-slate-300 transition-colors">Termini</a>
        </div>
      </div>
    </div>
  </footer>
);

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function IndexV4() {
  return (
    <main className="min-h-screen w-full overflow-x-clip bg-white text-text-main selection:bg-primary/20 selection:text-text-main font-['Inter']">
      <TopBar />
      {/* ── Hormozi spine: Hook → Dolore (€ poi emotivo) → Reframe → Meccanismo → Prova → Facilità → CTA → Value stack → Prova → Ancora prezzo → Offerta → Qualifica → Urgenza → Obiezioni → Chiusura ── */}
      <Hero />                {/* Hook / dream outcome */}
      <WhyChoose />           {/* Perché scegliere: 4 icone (come screen) */}
      <ReviewsSection />      {/* Recensioni: heading + carosello attuale */}
      <ProblemSection />      {/* Dolore in €: costo dell'inazione (apre la ferita) */}
      <ManifestoBand />       {/* Reframe: "compra l'immagine di sé" */}
      <EmotionalVideo />      {/* Effetto Wow + slider — la soluzione */}
      <AISimShowcase />       {/* "Non solo una foto": video realistico (assieme all'Effetto Wow) */}
      <EveryTreatment />     {/* Su ogni trattamento: crolla "il mio caso e' diverso" */}
      <IntermediateCTA />     {/* CTA contestuale + prova numerica: se vede il risultato, non esce indeciso */}
      <HowItWorks />          {/* Facilità: quanto è semplice */}
      <WhatYouGet />          {/* Value stack: cosa ottieni */}
      <Testimonials />        {/* Prova sociale prima del prezzo */}
      <ROICalculator />       {/* Ancora prezzo: il costo di aspettare */}
      <Pricing />             {/* L'offerta */}
      <ForWho />              {/* Qualifica / esclusività */}
      <FutureVision />        {/* Urgenza: primo nella tua città */}
      <FAQ />                 {/* Gestione obiezioni */}
      <FinalCTA />            {/* Chiusura */}
      <Footer />
    </main>
  );
}
