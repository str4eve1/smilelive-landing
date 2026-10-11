// Dopo la build: scrive in dist le pagine già pronte (HTML, titolo, meta, canonico, dati strutturati),
// il 404, la sitemap e spa.html (il modello vuoto, per le pagine che restano nel browser).
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

// Versione di produzione di React e del router: niente avvisi di sviluppo, render più rapido.
process.env.NODE_ENV = "production";

const radice = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(radice, "dist");
const spa = join(dist, "spa.html");

// Il modello è l'index.html di Vite; si salva una copia intatta prima di sovrascriverlo.
if (!existsSync(spa)) copyFileSync(join(dist, "index.html"), spa);
const modello = readFileSync(spa, "utf8");

const { render, pagine, canonicoDi, SITO, datiStrutturatiHome, datiStrutturatiArticolo } = await import(
  pathToFileURL(join(radice, "dist-server", "entry-server.js")).href
);

const attr = (testo) => testo.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const testoHtml = (testo) => testo.replace(/&/g, "&amp;").replace(/</g, "&lt;");

// Sostituisce una riga del modello; se non c'è, la build si ferma.
function sostituisci(html, regola, nuova) {
  if (!regola.test(html)) throw new Error(`Nel modello manca: ${regola}`);
  return html.replace(regola, () => nuova);
}

// Le pagine che hanno un foglio di stile proprio, caricato di norma solo insieme al loro programma.
// Senza collegarlo qui, la pagina già scritta comparirebbe per un attimo con lo stile di base e poi cambierebbe aspetto.
const SORGENTE_DI = { "/": "src/pages/IndexV5.tsx" };
const manifest = JSON.parse(readFileSync(join(dist, ".vite", "manifest.json"), "utf8"));

function stileDi(percorso) {
  const css = new Set();
  const font = new Set();
  const js = new Set();
  const visti = new Set();
  const visita = (chiave) => {
    const voce = manifest[chiave];
    if (!voce || visti.has(chiave)) return;
    visti.add(chiave);
    if (voce.file) js.add(voce.file);
    (voce.css ?? []).forEach((f) => css.add(f));
    (voce.assets ?? []).filter((f) => f.endsWith(".woff2")).forEach((f) => font.add(f));
    (voce.imports ?? []).forEach(visita);
  };
  if (SORGENTE_DI[percorso]) visita(SORGENTE_DI[percorso]);
  return [
    // il programma della pagina e quello che importa, caricati subito invece che a cascata dopo il primo
    ...[...js].filter((f) => !modello.includes(f)).map((f) => `<link rel="modulepreload" crossorigin href="/${encodeURI(f)}" />`),
    ...[...font].map((f) => `<link rel="preload" as="font" type="font/woff2" crossorigin href="/${f}" />`),
    // il foglio comune è già nel modello: qui solo quelli in più, che così restano dopo di lui
    ...[...css].filter((f) => !modello.includes(f)).map((f) => `<link rel="stylesheet" crossorigin href="/${f}" />`),
  ];
}

function impagina({ title, description, canonico, jsonLd, corpo, noindex, percorso, articolo }) {
  let h = modello;
  h = sostituisci(h, /<title>.*?<\/title>/, `<title>${testoHtml(title)}</title>`);
  h = sostituisci(h, /<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${attr(description)}" />`);
  h = sostituisci(h, /<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${attr(title)}" />`);
  h = sostituisci(h, /<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${attr(description)}" />`);
  h = sostituisci(h, /<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${attr(title)}" />`);
  h = sostituisci(h, /<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${attr(description)}" />`);
  if (articolo) h = sostituisci(h, /<meta property="og:type" content="website" \/>/, '<meta property="og:type" content="article" />');
  if (canonico) {
    h = sostituisci(h, /<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${attr(canonico)}" />`);
    h = sostituisci(h, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${attr(canonico)}" />`);
  } else {
    h = sostituisci(h, /\s*<meta property="og:url" content="[^"]*" \/>/, "");
    h = sostituisci(h, /\s*<link rel="canonical" href="[^"]*" \/>/, "");
  }
  const extra = percorso ? stileDi(percorso) : [];
  if (noindex) extra.push('<meta name="robots" content="noindex" />');
  if (jsonLd) extra.push(`<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>`);
  if (extra.length) h = sostituisci(h, /<\/head>/, `    ${extra.join("\n    ")}\n  </head>`);
  return sostituisci(h, /<div id="root"><\/div>/, `<div id="root">${corpo}</div>`);
}

function scrivi(file, contenuto) {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, contenuto);
}

for (const p of pagine) {
  const corpo = await render(p.percorso);
  const html = impagina({
    title: p.title,
    description: p.description,
    canonico: canonicoDi(p.percorso),
    jsonLd: p.percorso === "/" ? datiStrutturatiHome : p.articolo ? datiStrutturatiArticolo(p) : null,
    corpo,
    percorso: p.percorso,
    articolo: Boolean(p.articolo),
  });
  scrivi(p.percorso === "/" ? join(dist, "index.html") : join(dist, p.percorso, "index.html"), html);
  console.log(`prerender ${p.percorso} (${html.length} byte)`);
}

// 404 vero: stessa pagina «non trovata» del sito, fuori dall'indice dei motori.
const nonTrovata = impagina({
  title: "Pagina non trovata · SmileLive",
  description: "Questa pagina non esiste o l'indirizzo non è corretto.",
  canonico: null,
  jsonLd: null,
  corpo: await render("/non-trovata"),
  noindex: true,
});
scrivi(join(dist, "404.html"), nonTrovata);
console.log("prerender 404.html");

const voci = pagine
  .filter((p) => p.sitemap)
  .map((p) => `  <url><loc>${canonicoDi(p.percorso)}</loc>${p.articolo ? `<lastmod>${p.articolo.modificata}</lastmod>` : ""}</url>`);
scrivi(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${voci.join("\n")}\n</urlset>\n`,
);
console.log(`sitemap.xml (${voci.length} pagine, ${SITO})`);

// llms.txt: presentazione del sito per gli assistenti IA (formato llmstxt.org), generata dalla stessa tabella delle pagine.
const sezioniLlms = [
  ["Pagine principali", (p) => p.percorso === "/" || p.percorso === "/protocollo"],
  ["Guide", (p) => p.percorso.startsWith("/guide/")],
  ["Per i pazienti", (p) => p.percorso === "/simulazione"],
  ["Informazioni legali", (p) => ["/privacy", "/cookie-policy", "/terms"].includes(p.percorso)],
];
const collegamento = (p) => `- [${p.title}](${canonicoDi(p.percorso)}): ${p.description}`;
const llms = [
  "# SmileLive",
  "",
  "> SmileLive è un software per studi dentistici: da una foto del paziente genera con l'intelligenza artificiale una simulazione del sorriso, in foto e in video, da mostrare in prima visita. Nello stesso strumento ci sono preventivo, firma a schermo, fattura e prescrizione vocale al laboratorio.",
  "",
  "Una simulazione richiede circa un minuto. La prova gratuita comprende 5 foto e 2 video, senza carta di credito. I piani sono Studio Piccolo a 57 € al mese (47 con il piano annuale), Studio Medio a 114 € (94) e Studio Grande a 157 € (137), prezzi IVA inclusa. Si usa dal browser, senza installare nulla. La simulazione è uno strumento di comunicazione e non sostituisce diagnosi né progettazione clinica. Il sito è rivolto ai dentisti.",
  ...sezioniLlms.flatMap(([titolo, scelta]) => ["", `## ${titolo}`, "", ...pagine.filter(scelta).map(collegamento)]),
  "",
].join("\n");
const inLlms = new Set(sezioniLlms.flatMap(([, scelta]) => pagine.filter(scelta).map((p) => p.percorso)));
for (const p of pagine.filter((x) => x.sitemap)) {
  if (!inLlms.has(p.percorso)) throw new Error(`llms.txt: la pagina ${p.percorso} non rientra in nessuna sezione`);
}
scrivi(join(dist, "llms.txt"), llms);
console.log(`llms.txt (${inLlms.size} pagine)`);
