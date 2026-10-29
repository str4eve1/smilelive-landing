// Modalità prezzi di QUESTO build. PRICING_MODE arriva da vite.config.ts
// (define), già normalizzata in "lancio" o "listino": la stessa per il codice
// del browser, per la build del server (prerender, JSON-LD, llms.txt) e per i test.
//
// Il confronto resta un confronto fra due stringhe letterali, senza funzioni di
// mezzo: così il build lo risolve e butta via la tabella e i testi dell'altra
// modalità (nel listino il bundle non porta con sé i prezzi di lancio).
import { LANCIO_PRICES, LISTINO_PRICES, type PriceTable, type PricingMode } from "./pricing";

export const IS_LISTINO: boolean = import.meta.env.PRICING_MODE === "listino";

export const SITE_PRICING_MODE: PricingMode = IS_LISTINO ? "listino" : "lancio";

export const SITE_PRICES: PriceTable = IS_LISTINO ? LISTINO_PRICES : LANCIO_PRICES;
