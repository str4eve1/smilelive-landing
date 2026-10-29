// Tabella prezzi del sito: SOLO VISUALIZZAZIONE. Il repo è pubblico: qui non
// vanno mai Price ID, Product ID o segreti. Chi paga lo decide l'app.
//
// Cifre e regole (risparmio, percentuale per difetto, formato «1.524 €») sono
// le stesse dell'app (app.smilelive.it): se cambiano lì, cambiano qui, e
// src/test/pricing.test.ts lo ricorda.
//
// Modalità prezzi (glossario dell'app):
//  - `lancio`: il sito com'era fino al passaggio (57/114/157 € al mese);
//  - `listino`: i prezzi ordinari (87/147/197 € al mese) e il box promo.
// Chiavi dei piani come nell'app: starter = Studio Piccolo,
// premium = Studio Medio, business = Studio Grande.

export type PricingMode = "lancio" | "listino";
export type StudioPlan = "starter" | "premium" | "business";

export interface PlanPrice {
  /** Canone mensile, in centesimi. */
  monthlyCents: number;
  /** Totale dell'annuale pagato in un'unica soluzione, in centesimi. */
  annualCents: number;
}

export type PriceTable = Record<StudioPlan, PlanPrice>;

/** Le due tabelle stanno separate: il build tiene solo quella della sua modalità (src/lib/site-pricing.ts). */
export const LISTINO_PRICES: PriceTable = {
  starter: { monthlyCents: 8700, annualCents: 92400 },
  premium: { monthlyCents: 14700, annualCents: 152400 },
  business: { monthlyCents: 19700, annualCents: 200400 },
};

/** Identica al sito di prima del listino, compreso il Grande annuale da 1.644 €. */
export const LANCIO_PRICES: PriceTable = {
  starter: { monthlyCents: 5700, annualCents: 56400 },
  premium: { monthlyCents: 11400, annualCents: 112800 },
  business: { monthlyCents: 15700, annualCents: 164400 },
};

export const STUDIO_PLANS: readonly StudioPlan[] = ["starter", "premium", "business"];

/** PRICING_MODE: vale `listino` solo se lo dice; assente o sconosciuta = `lancio` (come l'app). */
export function pricingMode(value: string | undefined): PricingMode {
  return (value ?? "").trim().toLowerCase() === "listino" ? "listino" : "lancio";
}

/** La tabella di una modalità. Solo per il codice della build sul server: nel browser si sceglie al build. */
export function pricesFor(mode: PricingMode): PriceTable {
  return mode === "listino" ? LISTINO_PRICES : LANCIO_PRICES;
}

/** Quanto viene al mese l'annuale (totale / 12), in centesimi. */
export function annualMonthlyCents(price: PlanPrice): number {
  return Math.round(price.annualCents / 12);
}

/** Risparmio dell'annuale rispetto a 12 mensilità, in centesimi. */
export function annualSavingsCents(price: PlanPrice): number {
  return price.monthlyCents * 12 - price.annualCents;
}

/**
 * Sconto massimo dell'annuale fra i piani, in punti percentuali arrotondati per
 * DIFETTO (mai dichiarare più del vero). Aritmetica intera, come nell'app.
 */
export function maxAnnualDiscountPercent(table: PriceTable): number {
  let max = 0;
  for (const plan of STUDIO_PLANS) {
    const price = table[plan];
    max = Math.max(max, Math.floor((annualSavingsCents(price) * 100) / (price.monthlyCents * 12)));
  }
  return max;
}

/**
 * «1.524 €»: punto delle migliaia e spazio prima dell'euro; «28,50 €» se ci
 * sono centesimi. Non usa toLocaleString('it-IT'), che per 4 cifre non mette
 * il punto («1524»). Chi lo mostra tiene numero ed euro sulla stessa riga.
 */
export function formatEuro(cents: number): string {
  const euros = Math.floor(cents / 100);
  const rest = cents % 100;
  const grouped = String(euros).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return rest === 0 ? `${grouped} €` : `${grouped},${String(rest).padStart(2, "0")} €`;
}
