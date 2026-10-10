import { createRoot } from "react-dom/client";
import { SpeedInsights } from "@vercel/speed-insights/react";
import App from "./App.tsx";
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

createRoot(rootElement).render(
  <>
    <App />
    <SpeedInsights />
  </>
);
