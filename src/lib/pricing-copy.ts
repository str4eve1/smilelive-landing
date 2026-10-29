// Testi della modalità listino che portano cifre: le cifre vengono dalla tabella,
// le parole sono quelle approvate, alla lettera.
// Sono funzioni, non costanti: nel build in modalità lancio nessuno le chiama e
// spariscono dal bundle insieme ai prezzi di listino.
import { LISTINO_PRICES, annualMonthlyCents, formatEuro } from "./pricing";

/** FAQ «Quanto costa SmileLive?» a listino. */
export function listinoFaqPriceAnswer(): string {
  const { starter, premium, business } = LISTINO_PRICES;
  const mese = (cents: number) => formatEuro(cents);
  return (
    "La registrazione è gratuita: 2 foto e 2 video, senza carta di credito. Poi puoi pagare a consumo, 5 € a foto e 5 € a video senza canone, oppure scegliere un piano: " +
    `Studio Piccolo a ${mese(starter.monthlyCents)} al mese (${mese(annualMonthlyCents(starter))} con il piano annuale), ` +
    `Studio Medio a ${mese(premium.monthlyCents)} (${mese(annualMonthlyCents(premium))}), ` +
    `Studio Grande a ${mese(business.monthlyCents)} (${mese(annualMonthlyCents(business))}). ` +
    "Prezzi finali, nessuna IVA aggiunta. Per i primi 100 studi c'è una promozione di lancio riservata a chi prenota la demo."
  );
}
