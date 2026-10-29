// Dati strutturati della home. Importato solo dal server della build: non entra nel codice del browser.
import { SITO, canonicoDi, paginaDi, type Pagina } from "./pagine";
import { annualMonthlyCents, pricesFor, type PricingMode } from "@/lib/pricing";
import { SITE_PRICING_MODE } from "@/lib/site-pricing";

const descrizione = paginaDi("/")!.description;

// L'unità mensile c'è solo per i piani a pagamento: la prova gratuita non è un canone.
// «IVA inclusa» (valueAddedTaxIncluded) resta solo in modalità lancio: a listino i prezzi
// sono «finali, nessuna IVA aggiunta» e la chiave si toglie.
const prezzo = (valore: string, mensile: boolean, ivaInclusa: boolean) => ({
  "@type": "UnitPriceSpecification",
  price: valore,
  priceCurrency: "EUR",
  ...(ivaInclusa ? { valueAddedTaxIncluded: true } : {}),
  ...(mensile ? { unitCode: "MON" } : {}),
});

const offertaDi = (ivaInclusa: boolean) => (name: string, valore: string, description: string, mensile = true) => ({
  "@type": "Offer",
  name,
  description,
  price: valore,
  priceCurrency: "EUR",
  priceSpecification: prezzo(valore, mensile, ivaInclusa),
  url: `${SITO}/`,
});

const euro = (centesimi: number) => String(centesimi / 100);

// Le offerte di una modalità: cifre dalla tabella prezzi, quote dei piani come sulle card.
function offerte(mode: PricingMode) {
  const listino = mode === "listino";
  const offerta = offertaDi(!listino);
  const prezzi = pricesFor(mode);
  const formula = listino ? "Al mese, prezzo finale, nessuna IVA aggiunta" : "Al mese, IVA inclusa";
  const piano = (name: string, p: typeof prezzi.starter, quote: string) =>
    offerta(name, euro(p.monthlyCents), `${formula}; ${euro(annualMonthlyCents(p))} al mese con il piano annuale. ${quote}`);
  return [
    offerta(listino ? "Registrazione gratuita" : "Prova gratuita", "0", "2 foto e 2 video, senza carta di credito.", false),
    piano("Studio Piccolo", prezzi.starter, "20 foto e 8 video al mese."),
    piano("Studio Medio", prezzi.premium, "50 foto e 18 video al mese."),
    piano("Studio Grande", prezzi.business, "100 foto e 30 video al mese."),
  ];
}

const idOrganizzazione = { "@id": `${SITO}/#organizzazione` };

const idFondatore = { "@id": `${SITO}/chi-siamo#giampiero-lombardi` };

// Chi cura i contenuti. Come l'organizzazione, va ripetuto in ogni pagina che lo richiama.
const fondatore = {
  "@type": "Person",
  ...idFondatore,
  name: "Giampiero Lombardi",
  jobTitle: "Fondatore di SmileLive",
  url: `${SITO}/chi-siamo`,
  worksFor: idOrganizzazione,
};

// Chi pubblica il sito. Il nodo va ripetuto in ogni pagina che lo richiama: chi legge una pagina sola non vede la home.
const organizzazione = {
  "@type": "Organization",
  ...idOrganizzazione,
  name: "SmileLive",
  description:
    "Software per studi dentistici: simulazione del sorriso con intelligenza artificiale da una foto del paziente, in foto e in video.",
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
  founder: idFondatore,
  sameAs: ["https://www.instagram.com/smilelive.it"],
};

export const homeStructuredData = (mode: PricingMode) => ({
  "@context": "https://schema.org",
  "@graph": [
    organizzazione,
    fondatore,
    {
      "@type": "WebSite",
      "@id": `${SITO}/#sito`,
      name: "SmileLive",
      url: `${SITO}/`,
      inLanguage: "it",
      publisher: idOrganizzazione,
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITO}/#software`,
      name: "SmileLive",
      url: `${SITO}/`,
      publisher: idOrganizzazione,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      inLanguage: "it",
      description: descrizione,
      featureList: [
        "Simulazione del sorriso con IA da una foto del paziente, fino a 4 varianti per foto",
        "Video del sorriso generato dalla simulazione",
        "Preventivo, anche dettato a voce",
        "Firma del preventivo a schermo",
        "Fattura e invio al Sistema Tessera Sanitaria (piani Studio Medio e Studio Grande)",
        "Prescrizione vocale al laboratorio e portale per il laboratorio",
        "Agenda con medici e poltrone configurabili",
        "Scheda paziente con odontogramma, file e documenti",
        "Promemoria automatici degli appuntamenti su WhatsApp o SMS",
        "Designer: modifica della simulazione dente per dente",
        "Vista clinica: scansione 3D sovrapposta alla foto",
      ],
      offers: offerte(mode),
    },
  ],
});

// Quelli che la build scrive nella home: modalità fissata al build da PRICING_MODE.
export const datiStrutturatiHome = homeStructuredData(SITE_PRICING_MODE);

// Dati strutturati delle pagine di contenuto (protocollo, guide): tutto viene dalla voce della tabella.
// L'autore è la persona che cura i contenuti, l'editore è l'organizzazione: entrambi sono richiamati con il loro @id e descritti nello stesso blocco.
export const datiStrutturatiArticolo = (pagina: Pagina) => {
  const a = pagina.articolo;
  if (!a) throw new Error(`${pagina.percorso}: manca "articolo" nella tabella delle pagine`);
  const canonico = canonicoDi(pagina.percorso);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${canonico}#articolo`,
        headline: a.h1,
        description: pagina.description,
        inLanguage: "it",
        datePublished: a.pubblicata,
        dateModified: a.modificata,
        author: idFondatore,
        publisher: idOrganizzazione,
        mainEntityOfPage: canonico,
      },
      organizzazione,
      fondatore,
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITO}/` },
          { "@type": "ListItem", position: 2, name: a.nome, item: canonico },
        ],
      },
    ],
  };
};
