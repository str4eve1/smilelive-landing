import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { pricingMode } from "./src/lib/pricing";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  // PRICING_MODE (listino): "lancio" o "listino", già normalizzata qui come fa l'app
  // (assente o sconosciuta = lancio). La leggono il browser, la build del server
  // (prerender, JSON-LD, llms.txt) e i test: una sola fonte, la variabile del build.
  // Si fissa al BUILD: su Vercel, dopo aver cambiato PRICING_MODE, serve un Redeploy senza
  // cache di build, altrimenti il sito resta nella modalità di prima. Nei test vale «lancio»
  // se manca la variabile; src/test/site-pricing.test.ts prova anche «listino» con vi.stubEnv.
  define: {
    "import.meta.env.PRICING_MODE": JSON.stringify(pricingMode(process.env.PRICING_MODE)),
  },
  server: {
    host: "::",
    port: 8081,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  // Senza questo, nella build per il server le icone Phosphor si caricano a migliaia di file (30 s invece di 1 s).
  ssr: {
    noExternal: ["@phosphor-icons/react"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Elenco dei file prodotti (dist/.vite/manifest.json): lo legge scripts/prerender.mjs.
    manifest: true,
    rollupOptions: {
      output: {
        // Estrae le librerie pesanti e indipendenti in chunk dedicati: bundle
        // iniziale più piccolo e cache migliore tra deploy (cambiano di rado).
        // React/router/radix restano insieme in "vendor" per evitare chunk
        // circolari (react-router dipende da @remix-run/router e i pacchetti
        // vendor dipendono da react).
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("framer-motion")) return "framer-motion";
          if (id.includes("posthog-js")) return "posthog";
          if (id.includes("recharts") || id.includes("/d3-")) return "charts";
          return "vendor";
        },
      },
    },
  },
}));
