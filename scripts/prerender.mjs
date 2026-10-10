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

const { render, pagine, canonicoDi, SITO, datiStrutturatiHome } = await import(
  pathToFileURL(join(radice, "dist-server", "entry-server.js")).href
);

const attr = (testo) => testo.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const testoHtml = (testo) => testo.replace(/&/g, "&amp;").replace(/</g, "&lt;");

// Sostituisce una riga del modello; se non c'è, la build si ferma.
function sostituisci(html, regola, nuova) {
  if (!regola.test(html)) throw new Error(`Nel modello manca: ${regola}`);
  return html.replace(regola, () => nuova);
}

function impagina({ title, description, canonico, jsonLd, corpo, noindex }) {
  let h = modello;
  h = sostituisci(h, /<title>.*?<\/title>/, `<title>${testoHtml(title)}</title>`);
  h = sostituisci(h, /<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${attr(description)}" />`);
  h = sostituisci(h, /<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${attr(title)}" />`);
  h = sostituisci(h, /<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${attr(description)}" />`);
  h = sostituisci(h, /<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${attr(title)}" />`);
  h = sostituisci(h, /<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${attr(description)}" />`);
  if (canonico) {
    h = sostituisci(h, /<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${attr(canonico)}" />`);
    h = sostituisci(h, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${attr(canonico)}" />`);
  } else {
    h = sostituisci(h, /\s*<meta property="og:url" content="[^"]*" \/>/, "");
    h = sostituisci(h, /\s*<link rel="canonical" href="[^"]*" \/>/, "");
  }
  const extra = [];
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
    jsonLd: p.percorso === "/" ? datiStrutturatiHome : null,
    corpo,
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

const voci = pagine.filter((p) => p.sitemap).map((p) => `  <url><loc>${canonicoDi(p.percorso)}</loc></url>`);
scrivi(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${voci.join("\n")}\n</urlset>\n`,
);
console.log(`sitemap.xml (${voci.length} pagine, ${SITO})`);
