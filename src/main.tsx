import { createRoot, hydrateRoot } from "react-dom/client";
import { SpeedInsights } from "@vercel/speed-insights/react";
import App, { precaricaRotta } from "./App.tsx";
import "./lib/analytics"; // Auto-applies consent (loads tracker only if user accepted)
import "./index.css";

// Dopo una nuova pubblicazione i file delle pagine cambiano nome: se uno non si trova più,
// una sola ricarica prende quelli nuovi.
window.addEventListener("vite:preloadError", () => {
  if (sessionStorage.getItem("pagina-ricaricata")) return;
  sessionStorage.setItem("pagina-ricaricata", "1");
  window.location.reload();
});

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

const albero = (
  <>
    <App />
    <SpeedInsights />
  </>
);

if (rootElement.hasChildNodes()) {
  // Pagina già scritta dalla build: si scarica prima il pezzo della rotta e poi si idrata.
  precaricaRotta(window.location.pathname)
    .catch(() => undefined)
    .then(() => hydrateRoot(rootElement, albero));
} else {
  createRoot(rootElement).render(albero);
}
