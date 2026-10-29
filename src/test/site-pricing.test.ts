import { afterEach, describe, expect, it, vi } from "vitest";
import { LANCIO_PRICES, LISTINO_PRICES } from "@/lib/pricing";

// La modalità del sito si fissa al build (PRICING_MODE, define in vite.config.ts), e
// senza variabile i test girano in «lancio». Qui si ricarica il modulo con la variabile
// impostata, come farebbe un build: se un refactor collega la modalità alla tabella
// sbagliata (per esempio il listino torna ai prezzi di lancio), il test lo vede.
async function loadSitePricing(mode: string) {
  vi.resetModules();
  vi.stubEnv("PRICING_MODE", mode);
  return import("@/lib/site-pricing");
}

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("modalità prezzi del sito (site-pricing)", () => {
  it("listino: tabella di listino e IS_LISTINO acceso", async () => {
    const m = await loadSitePricing("listino");
    expect(m.IS_LISTINO).toBe(true);
    expect(m.SITE_PRICING_MODE).toBe("listino");
    // Confronto per valore: resetModules ricarica anche pricing.ts, quindi oggetti nuovi.
    expect(m.SITE_PRICES).toEqual(LISTINO_PRICES);
  });

  it("lancio: tabella di lancio", async () => {
    const m = await loadSitePricing("lancio");
    expect(m.IS_LISTINO).toBe(false);
    expect(m.SITE_PRICING_MODE).toBe("lancio");
    expect(m.SITE_PRICES).toEqual(LANCIO_PRICES);
  });
});
