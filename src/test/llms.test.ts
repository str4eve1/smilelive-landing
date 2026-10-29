import { describe, expect, it } from "vitest";
import { llmsPricingText } from "@/seo/llms";

describe("paragrafo prezzi di llms.txt", () => {
  it("lancio: identico a origin/master", () => {
    expect(llmsPricingText("lancio")).toBe(
      "La prova gratuita comprende 2 foto e 2 video, senza carta di credito. I piani sono Studio Piccolo a 57 € al mese (47 con il piano annuale), Studio Medio a 114 € (94) e Studio Grande a 157 € (137): prezzi di lancio IVA inclusa, che chi si abbona ora mantiene finché l'abbonamento resta attivo.",
    );
  });

  it("listino: cifre e formula della FAQ «Quanto costa SmileLive?»", () => {
    expect(llmsPricingText("listino")).toBe(
      "La registrazione gratuita comprende 2 foto e 2 video, senza carta di credito. I piani sono Studio Piccolo a 87 € al mese (77 con il piano annuale), Studio Medio a 147 € (127) e Studio Grande a 197 € (167): prezzi finali, nessuna IVA aggiunta. Per i primi 100 studi c'è una promozione di lancio riservata a chi prenota la demo.",
    );
  });
});
