// Il paragrafo prezzi di llms.txt. Importato solo dal server della build (tramite
// entry-server, che lo passa a scripts/prerender.mjs): non entra nel codice del browser.
import { annualMonthlyCents, pricesFor, type PricingMode } from "@/lib/pricing";
import { SITE_PRICING_MODE } from "@/lib/site-pricing";

const euro = (centesimi: number) => String(centesimi / 100);

// Lancio: la frase di sempre. Listino: le cifre e la formula della FAQ «Quanto costa SmileLive?».
export function llmsPricingText(mode: PricingMode): string {
  const { starter, premium, business } = pricesFor(mode);
  const listino = mode === "listino";
  const piani =
    `I piani sono Studio Piccolo a ${euro(starter.monthlyCents)} € al mese (${euro(annualMonthlyCents(starter))} con il piano annuale), ` +
    `Studio Medio a ${euro(premium.monthlyCents)} € (${euro(annualMonthlyCents(premium))}) ` +
    `e Studio Grande a ${euro(business.monthlyCents)} € (${euro(annualMonthlyCents(business))})`;
  return listino
    ? `La registrazione gratuita comprende 2 foto e 2 video, senza carta di credito. ${piani}: prezzi finali, nessuna IVA aggiunta. Per i primi 100 studi c'è una promozione di lancio riservata a chi prenota la demo.`
    : `La prova gratuita comprende 2 foto e 2 video, senza carta di credito. ${piani}: prezzi di lancio IVA inclusa, che chi si abbona ora mantiene finché l'abbonamento resta attivo.`;
}

/** Quello che la build scrive in llms.txt: modalità fissata al build da PRICING_MODE. */
export const testoPrezziLlms = llmsPricingText(SITE_PRICING_MODE);
