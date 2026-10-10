// Tabella unica delle pagine che escono già scritte dalla build.
// La usano lo script di build (titoli, meta, sitemap) e il browser (titolo al cambio di pagina).
// /dentisti, /v1…/v5 non ci sono di proposito: restano pagine del solo browser.
export const SITO = "https://www.smilelive.it";

export type Pagina = {
  percorso: string;
  title: string;
  description: string;
  sitemap: boolean;
};

export const pagine: Pagina[] = [
  {
    percorso: "/",
    title: "Simulazione del sorriso con IA per dentisti | SmileLive",
    description:
      "Mostra al paziente il possibile risultato sul suo viso, in foto e in video, già in prima visita: circa un minuto. Prova gratis con 5 foto e 2 video, senza carta.",
    sitemap: true,
  },
  {
    percorso: "/simulazione",
    title: "Simulazione del sorriso · SmileLive",
    description:
      "La simulazione del sorriso è un'anteprima: dalla foto del sorriso, il dentista mostra in studio come potrebbe cambiare l'aspetto dei denti, prima di iniziare qualsiasi percorso.",
    sitemap: true,
  },
  {
    percorso: "/privacy",
    title: "Privacy Policy · SmileLive",
    description: "Informativa sul trattamento dei dati personali di SmileLive.",
    sitemap: true,
  },
  {
    percorso: "/cookie-policy",
    title: "Cookie Policy · SmileLive",
    description: "Informativa sull'uso di cookie e tecnologie simili sul sito di SmileLive.",
    sitemap: true,
  },
  {
    percorso: "/terms",
    title: "Termini di Servizio · SmileLive",
    description: "Termini e condizioni di utilizzo del sito di SmileLive.",
    sitemap: true,
  },
];

// Indirizzo assoluto della pagina, senza barra finale (la home resta «/»).
export const canonicoDi = (percorso: string) => (percorso === "/" ? `${SITO}/` : `${SITO}${percorso}`);

export const paginaDi = (percorso: string) => pagine.find((p) => p.percorso === percorso);
