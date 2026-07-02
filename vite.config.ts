import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
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
