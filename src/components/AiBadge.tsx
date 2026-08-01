import { Sparkle } from "@phosphor-icons/react";

/**
 * Marchiatura "contenuto generato con AI" (AI Act art. 50 / DPIA).
 * Va inserito dentro un contenitore con `position: relative`.
 * ponytail: un badge solo per blocco visivo (es. uno slider prima/dopo = 1 badge, non 2).
 */
const AiBadge = ({ className = "bottom-2 right-2" }: { className?: string }) => (
  <span
    className={`absolute z-40 pointer-events-none flex items-center gap-0.5 rounded-full bg-black/55 px-1.5 py-0.5 text-[9px] font-bold leading-none tracking-wide text-white backdrop-blur-[2px] ring-1 ring-white/20 ${className}`}
  >
    <Sparkle size={9} weight="fill" aria-hidden="true" />
    AI
    <span className="sr-only"> — immagine generata con intelligenza artificiale</span>
  </span>
);

export default AiBadge;
