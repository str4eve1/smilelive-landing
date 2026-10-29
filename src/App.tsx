import { lazy, Suspense, useEffect, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import CookieBanner from "@/components/CookieBanner";
import { paginaDi } from "@/seo/pagine";

// Ogni pagina è un file a parte: chi atterra su una pagina non scarica le altre.
// /v1, /v2 e /v4 (varianti vecchie della home, con i prezzi di prima) rimandano alla home:
// i loro file non si caricano più e non entrano nel build.
const caricaIndexV3 = () => import("./pages/IndexV3.tsx");
const caricaIndexV5 = () => import("./pages/IndexV5.tsx");
const caricaNotFound = () => import("./pages/NotFound.tsx");
const caricaPrivacy = () => import("./pages/Privacy.tsx");
const caricaSimulazione = () => import("./pages/Simulazione.tsx");
const caricaDentisti = () => import("./pages/Dentisti.tsx");
const caricaCookiePolicy = () => import("./pages/CookiePolicy.tsx");
const caricaTerms = () => import("./pages/Terms.tsx");
const caricaProtocollo = () => import("./pages/Protocollo.tsx");
const caricaChiSiamo = () => import("./pages/ChiSiamo.tsx");
const caricaProgettazione = () => import("./pages/guide/ProgettazioneDigitaleDelSorriso.tsx");
const caricaMockUp = () => import("./pages/guide/MockUpDigitaleInjectionTechnique.tsx");
const caricaPreventivi = () => import("./pages/guide/FarAccettarePiuPreventivi.tsx");
const caricaFaccette = () => import("./pages/guide/SimulazioneFaccetteImplantologiaProtesi.tsx");

const IndexV3 = lazy(caricaIndexV3);
const IndexV5 = lazy(caricaIndexV5);
const NotFound = lazy(caricaNotFound);
const Privacy = lazy(caricaPrivacy);
const Simulazione = lazy(caricaSimulazione);
const Dentisti = lazy(caricaDentisti);
const CookiePolicy = lazy(caricaCookiePolicy);
const Terms = lazy(caricaTerms);
const Protocollo = lazy(caricaProtocollo);
const ChiSiamo = lazy(caricaChiSiamo);
const Progettazione = lazy(caricaProgettazione);
const MockUp = lazy(caricaMockUp);
const Preventivi = lazy(caricaPreventivi);
const Faccette = lazy(caricaFaccette);

const caricatori: Record<string, () => Promise<unknown>> = {
  "/": caricaIndexV5,
  "/v3": caricaIndexV3,
  "/v5": caricaIndexV5,
  "/simulazione": caricaSimulazione,
  "/dentisti": caricaDentisti,
  "/privacy": caricaPrivacy,
  "/cookie-policy": caricaCookiePolicy,
  "/terms": caricaTerms,
  "/protocollo": caricaProtocollo,
  "/chi-siamo": caricaChiSiamo,
  "/guide/progettazione-digitale-del-sorriso": caricaProgettazione,
  "/guide/mock-up-digitale-injection-technique": caricaMockUp,
  "/guide/far-accettare-piu-preventivi": caricaPreventivi,
  "/guide/simulazione-faccette-implantologia-protesi": caricaFaccette,
};

// Scarica il file della pagina richiesta prima di idratare l'HTML già scritto,
// così il browser non lo sostituisce per un attimo con il segnaposto.
export const precaricaRotta = (percorso: string) =>
  (caricatori[percorso] ?? caricaNotFound)();

const queryClient = new QueryClient();

// Titolo della scheda: al cambio di pagina interno segue la tabella (le pagine fuori tabella non cambiano).
const TitoloPagina = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const pagina = paginaDi(pathname);
    if (pagina) document.title = pagina.title;
  }, [pathname]);
  return null;
};

declare global {
  interface Window {
    __paginaViva?: () => void;
  }
}

// Le varianti vecchie della home (/v1, /v2, /v4) rimandano alla home tenendo i parametri
// (UTM), come il redirect di vercel.json, che in produzione arriva prima.
const RedirectHome = () => {
  const { search } = useLocation();
  return <Navigate to={{ pathname: "/", search }} replace />;
};

// Un bottone toccato prima che la pagina fosse viva (vedi index.html) si preme adesso.
// Sta dentro Suspense: il suo effetto parte quando anche la pagina è idratata.
const PaginaViva = () => {
  useEffect(() => window.__paginaViva?.(), []);
  return null;
};

export const AppRoutes = () => (
  <Suspense fallback={<div className="min-h-screen bg-background" />}>
    <TitoloPagina />
    <Routes>
      <Route path="/" element={<IndexV5 />} />
      <Route path="/v1" element={<RedirectHome />} />
      <Route path="/v2" element={<RedirectHome />} />
      <Route path="/v3" element={<IndexV3 />} />
      <Route path="/v4" element={<RedirectHome />} />
      <Route path="/v5" element={<IndexV5 />} />
      <Route path="/simulazione" element={<Simulazione />} />
      <Route path="/dentisti" element={<Dentisti />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/cookie-policy" element={<CookiePolicy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/protocollo" element={<Protocollo />} />
      <Route path="/chi-siamo" element={<ChiSiamo />} />
      <Route path="/guide/progettazione-digitale-del-sorriso" element={<Progettazione />} />
      <Route path="/guide/mock-up-digitale-injection-technique" element={<MockUp />} />
      <Route path="/guide/far-accettare-piu-preventivi" element={<Preventivi />} />
      <Route path="/guide/simulazione-faccette-implantologia-protesi" element={<Faccette />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
    <PaginaViva />
  </Suspense>
);

// Albero comune a browser e build: cambia solo il router che lo avvolge.
export const Provider = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {children}
      <CookieBanner />
    </TooltipProvider>
  </QueryClientProvider>
);

const App = () => (
  <Provider>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppRoutes />
    </BrowserRouter>
  </Provider>
);

export default App;
