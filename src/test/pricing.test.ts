import { describe, expect, it } from "vitest";
import {
  LANCIO_PRICES,
  LISTINO_PRICES,
  annualMonthlyCents,
  annualSavingsCents,
  formatEuro,
  maxAnnualDiscountPercent,
  pricingMode,
} from "@/lib/pricing";

// Valori attesi scritti a mano dal listino approvato, non ricalcolati: devono
// coincidere con quelli dell'app.
describe("tabella prezzi del sito", () => {
  it("listino: 87/147/197 € al mese, 924/1.524/2.004 € all'anno", () => {
    expect(LISTINO_PRICES).toEqual({
      starter: { monthlyCents: 8700, annualCents: 92400 },
      premium: { monthlyCents: 14700, annualCents: 152400 },
      business: { monthlyCents: 19700, annualCents: 200400 },
    });
  });

  it("lancio: identica al sito di oggi, compreso il Grande annuale da 1.644 €", () => {
    expect(LANCIO_PRICES).toEqual({
      starter: { monthlyCents: 5700, annualCents: 56400 },
      premium: { monthlyCents: 11400, annualCents: 112800 },
      business: { monthlyCents: 15700, annualCents: 164400 },
    });
  });

  it("equivalente mensile dell'annuale: 77/127/167 € a listino, 47/94/137 € al lancio", () => {
    expect([LISTINO_PRICES.starter, LISTINO_PRICES.premium, LISTINO_PRICES.business].map(annualMonthlyCents)).toEqual([7700, 12700, 16700]);
    expect([LANCIO_PRICES.starter, LANCIO_PRICES.premium, LANCIO_PRICES.business].map(annualMonthlyCents)).toEqual([4700, 9400, 13700]);
  });

  it("risparmio dell'annuale su 12 mensilità: 120/240/360 € a listino", () => {
    expect([LISTINO_PRICES.starter, LISTINO_PRICES.premium, LISTINO_PRICES.business].map(annualSavingsCents)).toEqual([12000, 24000, 36000]);
    expect([LANCIO_PRICES.starter, LANCIO_PRICES.premium, LANCIO_PRICES.business].map(annualSavingsCents)).toEqual([12000, 24000, 24000]);
  });

  it("percentuale del toggle, per difetto: 15 a listino, 17 al lancio (il «-17%» di oggi era giusto)", () => {
    expect(maxAnnualDiscountPercent(LISTINO_PRICES)).toBe(15);
    expect(maxAnnualDiscountPercent(LANCIO_PRICES)).toBe(17);
  });

  it("formato «1.524 €»: punto delle migliaia, spazio prima dell'euro", () => {
    expect(formatEuro(152400)).toBe("1.524 €");
    expect(formatEuro(92400)).toBe("924 €");
    expect(formatEuro(200400)).toBe("2.004 €");
    expect(formatEuro(12000)).toBe("120 €");
    expect(formatEuro(2850)).toBe("28,50 €");
    expect(formatEuro(0)).toBe("0 €");
  });
});

describe("modalità prezzi da PRICING_MODE", () => {
  it("è listino solo se lo dice", () => {
    expect(pricingMode("listino")).toBe("listino");
    expect(pricingMode(" Listino ")).toBe("listino");
  });

  it("assente, vuota o sconosciuta vale lancio", () => {
    expect(pricingMode(undefined)).toBe("lancio");
    expect(pricingMode("")).toBe("lancio");
    expect(pricingMode("lancio")).toBe("lancio");
    expect(pricingMode("listini")).toBe("lancio");
  });
});
