// Dati strutturati della home. Importato solo dal server della build: non entra nel codice del browser.
import { SITO, paginaDi } from "./pagine";

const descrizione = paginaDi("/")!.description;

const prezzo = (valore: string) => ({
  "@type": "UnitPriceSpecification",
  price: valore,
  priceCurrency: "EUR",
  valueAddedTaxIncluded: true,
  unitCode: "MON",
});

const offerta = (name: string, valore: string, description: string) => ({
  "@type": "Offer",
  name,
  description,
  price: valore,
  priceCurrency: "EUR",
  priceSpecification: prezzo(valore),
  url: `${SITO}/`,
});

export const datiStrutturatiHome = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITO}/#organizzazione`,
      name: "SmileLive",
      url: `${SITO}/`,
      logo: `${SITO}/favicon.png`,
      vatID: "IT09125450727",
      email: "supporto@smilelive.it",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Casamassima",
        addressRegion: "BA",
        addressCountry: "IT",
      },
      sameAs: ["https://www.instagram.com/smilelive.it"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITO}/#sito`,
      name: "SmileLive",
      url: `${SITO}/`,
      inLanguage: "it",
    },
    {
      "@type": "SoftwareApplication",
      name: "SmileLive",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      inLanguage: "it",
      description: descrizione,
      featureList: [
        "Simulazione del sorriso con IA da una foto del paziente",
        "Video del sorriso generato dalla simulazione",
        "Preventivo, anche dettato a voce",
        "Firma del preventivo a schermo",
        "Fattura e invio al Sistema Tessera Sanitaria (piani Studio Medio e Studio Grande)",
        "Prescrizione vocale al laboratorio e portale per il laboratorio",
        "Anagrafica pazienti e agenda",
        "Vista clinica: scansione 3D sovrapposta alla foto",
      ],
      offers: [
        offerta("Prova gratuita", "0", "5 foto e 2 video, senza carta di credito."),
        offerta("Studio Piccolo", "57", "Al mese, IVA inclusa; 47 al mese con il piano annuale. 20 foto e 8 video al mese."),
        offerta("Studio Medio", "114", "Al mese, IVA inclusa; 94 al mese con il piano annuale. 50 foto e 18 video al mese."),
        offerta("Studio Grande", "157", "Al mese, IVA inclusa; 137 al mese con il piano annuale. 100 foto e 30 video al mese."),
      ],
    },
  ],
};
