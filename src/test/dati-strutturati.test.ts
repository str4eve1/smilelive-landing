import { describe, expect, it } from "vitest";
import { homeStructuredData } from "@/seo/dati-strutturati";

const softwareOf = (dati: ReturnType<typeof homeStructuredData>) =>
  dati["@graph"].find((n) => n["@type"] === "SoftwareApplication") as { offers: unknown[] };

// Le offerte della home su origin/master 4eb9afd2, copiate dall'HTML prerenderizzato:
// in modalità lancio il JSON-LD deve restare identico, byte per byte.
const OFFERTE_LANCIO =
  '[{"@type":"Offer","name":"Prova gratuita","description":"2 foto e 2 video, senza carta di credito.","price":"0","priceCurrency":"EUR","priceSpecification":{"@type":"UnitPriceSpecification","price":"0","priceCurrency":"EUR","valueAddedTaxIncluded":true},"url":"https://www.smilelive.it/"},{"@type":"Offer","name":"Studio Piccolo","description":"Al mese, IVA inclusa; 47 al mese con il piano annuale. 20 foto e 8 video al mese.","price":"57","priceCurrency":"EUR","priceSpecification":{"@type":"UnitPriceSpecification","price":"57","priceCurrency":"EUR","valueAddedTaxIncluded":true,"unitCode":"MON"},"url":"https://www.smilelive.it/"},{"@type":"Offer","name":"Studio Medio","description":"Al mese, IVA inclusa; 94 al mese con il piano annuale. 50 foto e 18 video al mese.","price":"114","priceCurrency":"EUR","priceSpecification":{"@type":"UnitPriceSpecification","price":"114","priceCurrency":"EUR","valueAddedTaxIncluded":true,"unitCode":"MON"},"url":"https://www.smilelive.it/"},{"@type":"Offer","name":"Studio Grande","description":"Al mese, IVA inclusa; 137 al mese con il piano annuale. 100 foto e 30 video al mese.","price":"157","priceCurrency":"EUR","priceSpecification":{"@type":"UnitPriceSpecification","price":"157","priceCurrency":"EUR","valueAddedTaxIncluded":true,"unitCode":"MON"},"url":"https://www.smilelive.it/"}]';

// Listino: cifre del listino, nessuna «IVA inclusa» e niente valueAddedTaxIncluded.
const OFFERTE_LISTINO =
  '[{"@type":"Offer","name":"Registrazione gratuita","description":"2 foto e 2 video, senza carta di credito.","price":"0","priceCurrency":"EUR","priceSpecification":{"@type":"UnitPriceSpecification","price":"0","priceCurrency":"EUR"},"url":"https://www.smilelive.it/"},{"@type":"Offer","name":"Studio Piccolo","description":"Al mese, prezzo finale, nessuna IVA aggiunta; 77 al mese con il piano annuale. 20 foto e 8 video al mese.","price":"87","priceCurrency":"EUR","priceSpecification":{"@type":"UnitPriceSpecification","price":"87","priceCurrency":"EUR","unitCode":"MON"},"url":"https://www.smilelive.it/"},{"@type":"Offer","name":"Studio Medio","description":"Al mese, prezzo finale, nessuna IVA aggiunta; 127 al mese con il piano annuale. 50 foto e 18 video al mese.","price":"147","priceCurrency":"EUR","priceSpecification":{"@type":"UnitPriceSpecification","price":"147","priceCurrency":"EUR","unitCode":"MON"},"url":"https://www.smilelive.it/"},{"@type":"Offer","name":"Studio Grande","description":"Al mese, prezzo finale, nessuna IVA aggiunta; 167 al mese con il piano annuale. 100 foto e 30 video al mese.","price":"197","priceCurrency":"EUR","priceSpecification":{"@type":"UnitPriceSpecification","price":"197","priceCurrency":"EUR","unitCode":"MON"},"url":"https://www.smilelive.it/"}]';

describe("dati strutturati della home", () => {
  it("lancio: offerte identiche a origin/master", () => {
    expect(JSON.stringify(softwareOf(homeStructuredData("lancio")).offers)).toBe(OFFERTE_LANCIO);
  });

  it("listino: prezzi di listino, prezzi finali senza IVA aggiunta", () => {
    expect(JSON.stringify(softwareOf(homeStructuredData("listino")).offers)).toBe(OFFERTE_LISTINO);
  });

  it("listino: nessuna traccia di «IVA inclusa» né di valueAddedTaxIncluded in tutto il blocco", () => {
    const testo = JSON.stringify(homeStructuredData("listino"));
    expect(testo).not.toContain("IVA inclusa");
    expect(testo).not.toContain("valueAddedTaxIncluded");
  });

  it("fuori dalle offerte le due modalità coincidono", () => {
    const senzaOfferte = (dati: ReturnType<typeof homeStructuredData>) =>
      JSON.stringify(dati, (chiave, valore) => (chiave === "offers" ? undefined : valore));
    expect(senzaOfferte(homeStructuredData("listino"))).toBe(senzaOfferte(homeStructuredData("lancio")));
  });
});
