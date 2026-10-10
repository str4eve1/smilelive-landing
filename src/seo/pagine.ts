// Tabella unica delle pagine che escono già scritte dalla build.
// La usano lo script di build (titoli, meta, sitemap) e il browser (titolo al cambio di pagina).
// /dentisti, /v1…/v5 non ci sono di proposito: restano pagine del solo browser.
export const SITO = "https://www.smilelive.it";

// Le pagine di contenuto (protocollo, guide) hanno in più i dati dell'articolo:
// da qui si ricavano i dati strutturati, senza ripeterli pagina per pagina.
export type Articolo = {
  h1: string;
  nome: string; // nome breve, per la mappa dei percorsi (Home → pagina)
  pubblicata: string; // AAAA-MM-GG
  modificata: string; // AAAA-MM-GG
};

export type Pagina = {
  percorso: string;
  title: string;
  description: string;
  sitemap: boolean;
  articolo?: Articolo;
};

export const pagine: Pagina[] = [
  {
    percorso: "/",
    title: "Simulazione del sorriso con IA per dentisti | SmileLive",
    description:
      "Mostra al paziente il possibile risultato sul suo viso, in foto e in video, in prima visita: circa un minuto. Prova gratis con 5 foto e 2 video, senza carta.",
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
  {
    percorso: "/protocollo",
    title: "Protocollo SmileLive: simulazione del sorriso in 7 fasi",
    description:
      "Protocollo SmileLive in sette fasi: da foto e scansione alla simulazione del sorriso, alla fattibilità in studio e al manufatto in laboratorio.",
    sitemap: true,
    articolo: {
      h1: "Il protocollo SmileLive: dalla simulazione del sorriso al manufatto, in sette fasi",
      nome: "Protocollo SmileLive",
      pubblicata: "2026-10-10",
      modificata: "2026-10-10",
    },
  },
  {
    percorso: "/guide/progettazione-digitale-del-sorriso",
    title: "Progettazione digitale del sorriso: come si fa in studio",
    description:
      "Cos'è la progettazione digitale del sorriso, quali dati servono, come si imposta in studio e dove la simulazione da foto si ferma. Per odontoiatri.",
    sitemap: true,
    articolo: {
      h1: "Cos'è la progettazione digitale del sorriso e come si fa in studio?",
      nome: "Progettazione digitale del sorriso",
      pubblicata: "2026-10-10",
      modificata: "2026-10-10",
    },
  },
  {
    percorso: "/guide/mock-up-digitale-injection-technique",
    title: "Mock-up digitale e injection technique in studio",
    description:
      "Cosa sono mock-up digitale e injection technique, come si passa dal progetto alla prova in bocca e dove la simulazione da foto è solo l'inizio.",
    sitemap: true,
    articolo: {
      h1: "Dal progetto alla prova in bocca: cosa sono mock-up digitale e injection technique?",
      nome: "Mock-up digitale e injection technique",
      pubblicata: "2026-10-10",
      modificata: "2026-10-10",
    },
  },
  {
    percorso: "/guide/far-accettare-piu-preventivi",
    title: "Accettazione del preventivo odontoiatrico in prima visita",
    description:
      "Come far capire un preventivo in prima visita: il prima/dopo sul viso del paziente, un minuto per lo staff, preventivo e firma a schermo nello stesso posto.",
    sitemap: true,
    articolo: {
      h1: "Accettazione del preventivo odontoiatrico: come farlo capire in prima visita",
      nome: "Far accettare più preventivi",
      pubblicata: "2026-10-10",
      modificata: "2026-10-10",
    },
  },
  {
    percorso: "/guide/simulazione-faccette-implantologia-protesi",
    title: "Simulazione del sorriso: faccette, protesi, impianti",
    description:
      "In quali casi serve la simulazione del sorriso: faccette, protesi mobile, arcata su impianti, sbiancamento. Cosa mostra, a cosa serve, quali limiti dichiarare.",
    sitemap: true,
    articolo: {
      h1: "Simulazione del sorriso nei casi di faccette, protesi e riabilitazioni su impianti",
      nome: "Simulazione per faccette, implantologia, protesi",
      pubblicata: "2026-10-10",
      modificata: "2026-10-10",
    },
  },
];

// Indirizzo assoluto della pagina, senza barra finale (la home resta «/»).
export const canonicoDi = (percorso: string) => (percorso === "/" ? `${SITO}/` : `${SITO}${percorso}`);

export const paginaDi = (percorso: string) => pagine.find((p) => p.percorso === percorso);
