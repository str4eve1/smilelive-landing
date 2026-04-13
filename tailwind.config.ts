import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: "#fafafa", // Grigio quasi bianco, molto luminoso
        surface: "#ffffff", // Bianco puro
        "surface-elevated": "#f1f5f9", // Grigio platino chiarissimo
        primary: "#0284c7", // Azzurro cielo, più saturo per risaltare sul chiaro
        "primary-glow": "rgba(2, 132, 199, 0.2)", // Bagliore più leggero
        secondary: "#64748b", // Grigio ardesia (argento) per dettagli secondari
        gold: "#d97706", // Oro più scuro/ambra per contrasto sul bianco
        "gold-dim": "#b45309",
        "text-main": "#0f172a", // Grigio scurissimo per il testo (quasi nero)
        "text-muted": "#374151", // Grigio scuro leggibile, alto contrasto su bianco
        border: "rgba(15, 23, 42, 0.08)", // Bordo scuro molto trasparente
      },
      fontFamily: {
        headline: ["Syne", "sans-serif"],
        body: ["Inter", "sans-serif"],
        serif: ["DM Serif Display", "serif"]
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "marquee": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "marquee": "marquee 100s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;