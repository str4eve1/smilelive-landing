import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { House } from "@phosphor-icons/react";
import logoFinale from '../assets/WEBP/SmileLive FINALE senza sfondo COLORI CORRETTI (1).webp';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404: Pagina non trovata:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-text-main px-6 text-center">
      <img src={logoFinale} alt="SmileLive" className="h-12 w-auto mb-12 opacity-60" width="160" height="48" />
      <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Errore 404</p>
      <h1 className="text-5xl md:text-7xl font-headline font-bold mb-4 tracking-display">
        Pagina non trovata
      </h1>
      <p className="text-xl text-text-muted max-w-md mb-10 leading-relaxed">
        Questa pagina non esiste o l'URL non e' corretto.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2.5 bg-primary text-background font-headline font-bold px-8 py-3.5 rounded-full hover:opacity-90 active:scale-95 transition-all duration-200"
      >
        <House size={18} weight="bold" />
        Torna alla Home
      </Link>
    </div>
  );
};

export default NotFound;
