import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import CookieBanner from "@/components/CookieBanner";

// Ogni pagina è un file a parte: chi atterra su una pagina non scarica le altre.
const Index = lazy(() => import("./pages/Index.tsx"));
const IndexV2 = lazy(() => import("./pages/IndexV2.tsx"));
const IndexV3 = lazy(() => import("./pages/IndexV3.tsx"));
const IndexV4 = lazy(() => import("./pages/IndexV4.tsx"));
const IndexV5 = lazy(() => import("./pages/IndexV5.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const Privacy = lazy(() => import("./pages/Privacy.tsx"));
const Simulazione = lazy(() => import("./pages/Simulazione.tsx"));
const Dentisti = lazy(() => import("./pages/Dentisti.tsx"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy.tsx"));
const Terms = lazy(() => import("./pages/Terms.tsx"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <Routes>
            <Route path="/" element={<IndexV5 />} />
            <Route path="/v1" element={<Index />} />
            <Route path="/v2" element={<IndexV2 />} />
            <Route path="/v3" element={<IndexV3 />} />
            <Route path="/v4" element={<IndexV4 />} />
            <Route path="/v5" element={<IndexV5 />} />
            <Route path="/simulazione" element={<Simulazione />} />
            <Route path="/dentisti" element={<Dentisti />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/terms" element={<Terms />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <CookieBanner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
