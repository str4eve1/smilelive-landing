// Controllo in coda alla build: se qualcosa dell'HTML prodotto non torna, la build si ferma.
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const radice = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(radice, "dist");
const { pagine, canonicoDi } = await import(pathToFileURL(join(radice, "dist-server", "entry-server.js")).href);

const errori = [];
const ko = (msg) => errori.push(msg);
const leggi = (rel) => readFileSync(join(dist, rel), "utf8");
const attr = (t) => t.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const testoHtml = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const prendi = (html, re) => html.match(re)?.[1];
const fileDi = (p) => (p.percorso === "/" ? "index.html" : `${p.percorso.slice(1)}/index.html`);

for (const f of ["spa.html", "404.html", "sitemap.xml", "robots.txt", ...pagine.map(fileDi)]) {
  if (!existsSync(join(dist, f))) ko(`manca dist/${f}`);
}

for (const p of pagine) {
  if (!existsSync(join(dist, fileDi(p)))) continue;
  const h = leggi(fileDi(p));
  const nH1 = (h.match(/<h1[\s>]/g) || []).length;
  if (nH1 !== 1) ko(`${p.percorso}: ci sono ${nH1} <h1>, ne serve esattamente uno`);
  if (prendi(h, /<title>(.*?)<\/title>/) !== testoHtml(p.title)) ko(`${p.percorso}: titolo diverso dalla tabella`);
  if (prendi(h, /<meta name="description" content="([^"]*)"/) !== attr(p.description)) ko(`${p.percorso}: description diversa dalla tabella`);
  if (prendi(h, /<link rel="canonical" href="([^"]*)"/) !== canonicoDi(p.percorso)) ko(`${p.percorso}: canonico diverso dalla tabella`);
  if (prendi(h, /<meta property="og:url" content="([^"]*)"/) !== canonicoDi(p.percorso)) ko(`${p.percorso}: og:url diverso dal canonico`);
  if (!h.includes('<div id="root"><')) ko(`${p.percorso}: la radice è vuota`);
}

// La home deve restare sulla frase che si vuole presidiare: se sparisce dal titolo, la build si ferma.
if (existsSync(join(dist, "index.html"))) {
  const titoloHome = (prendi(leggi("index.html"), /<h1[^>]*>(.*?)<\/h1>/s) ?? "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (!/simulazione del sorriso/i.test(titoloHome)) ko(`/: l'<h1> della home deve contenere «simulazione del sorriso», ora dice «${titoloHome}»`);
}

// Pagine di contenuto (protocollo, guide): un solo JSON-LD valido, con Article e BreadcrumbList coerenti con la tabella.
const decodifica = (t) =>
  t.replace(/<[^>]+>/g, " ").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
const contenuti = pagine.filter((p) => p.articolo);
for (const p of contenuti) {
  const file = fileDi(p);
  if (p.percorso.startsWith("/guide/") && file !== `guide/${p.percorso.slice("/guide/".length)}/index.html`) ko(`${p.percorso}: il file atteso è dist/guide/<slug>/index.html`);
  if (!existsSync(join(dist, file))) continue;
  const h = leggi(file);
  const blocchi = [...h.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
  if (blocchi.length !== 1) {
    ko(`${p.percorso}: ${blocchi.length} blocchi JSON-LD, ne serve uno`);
    continue;
  }
  if (blocchi[0][1].includes("<")) ko(`${p.percorso}: il JSON-LD contiene un '<' non escapato`);
  let dati;
  try {
    dati = JSON.parse(blocchi[0][1]);
  } catch (e) {
    ko(`${p.percorso}: JSON-LD non valido (${e.message})`);
    continue;
  }
  const grafo = dati["@graph"] ?? [];
  const art = grafo.find((n) => n["@type"] === "Article");
  const brif = grafo.find((n) => n["@type"] === "BreadcrumbList");
  if (!art) ko(`${p.percorso}: nel JSON-LD manca Article`);
  else {
    if (art.headline !== p.articolo.h1) ko(`${p.percorso}: headline diverso dall'h1 della tabella`);
    if (art.inLanguage !== "it") ko(`${p.percorso}: inLanguage non è "it"`);
    if (art.datePublished !== p.articolo.pubblicata || art.dateModified !== p.articolo.modificata) ko(`${p.percorso}: date dell'Article diverse dalla tabella`);
    if (art.mainEntityOfPage !== canonicoDi(p.percorso)) ko(`${p.percorso}: mainEntityOfPage diverso dal canonico`);
    if (!art.author?.["@id"] || !art.publisher?.["@id"]) ko(`${p.percorso}: author/publisher senza @id`);
  }
  const voci = brif?.itemListElement ?? [];
  if (voci.length !== 2 || voci[0]?.name !== "Home" || voci[1]?.item !== canonicoDi(p.percorso)) ko(`${p.percorso}: BreadcrumbList non è Home → pagina`);
  const h1 = decodifica(prendi(h, /<h1[^>]*>([\s\S]*?)<\/h1>/) ?? "");
  if (h1 !== p.articolo.h1) ko(`${p.percorso}: il testo dell'<h1> è diverso da quello della tabella`);
  if (!/<h2[^>]*>In breve<\/h2>/.test(h)) ko(`${p.percorso}: manca il riquadro «In breve» nell'HTML`);
}

if (existsSync(join(dist, "404.html"))) {
  const h = leggi("404.html");
  if (!/<meta name="robots" content="noindex"/.test(h)) ko("404.html: manca noindex");
  if ((h.match(/<h1[\s>]/g) || []).length !== 1) ko("404.html: serve esattamente un <h1>");
}

if (existsSync(join(dist, "index.html"))) {
  const home = leggi("index.html");
  const blocchi = [...home.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
  if (blocchi.length !== 1) ko(`home: ${blocchi.length} blocchi JSON-LD, ne serve uno`);
  for (const b of blocchi) {
    if (b[1].includes("<")) ko("home: il JSON-LD contiene un '<' non escapato");
    try {
      JSON.parse(b[1]);
    } catch (e) {
      ko(`home: JSON-LD non valido (${e.message})`);
    }
  }
  const h1 = prendi(home, /<h1[^>]*>([\s\S]*?)<\/h1>/)?.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() ?? "";
  if (h1.length < 10) ko("home: il testo dell'<h1> manca nell'HTML");
  if (!/<link rel="stylesheet" crossorigin href="\/assets\/IndexV5-[^"]+\.css" \/>/.test(home)) ko("home: manca il foglio di stile della pagina (comparirebbe con lo stile di base e poi cambierebbe)");
}

if (existsSync(join(dist, "spa.html"))) {
  const s = leggi("spa.html");
  if (!s.includes('<div id="root"></div>')) ko("spa.html: la radice non è vuota");
  if (!s.includes("<title>SmileLive - Il tuo sorriso il mio successo</title>")) ko("spa.html: titolo originale cambiato");
}

if (existsSync(join(dist, "sitemap.xml"))) {
  const m = leggi("sitemap.xml");
  for (const p of pagine.filter((x) => x.sitemap)) {
    if (!m.includes(`<loc>${canonicoDi(p.percorso)}</loc>`)) ko(`sitemap.xml: manca ${p.percorso}`);
  }
}

if (!existsSync(join(dist, "llms.txt"))) ko("manca dist/llms.txt");
else {
  const l = leggi("llms.txt");
  if (!l.startsWith("# SmileLive")) ko("llms.txt: non comincia con «# SmileLive»");
  for (const p of pagine.filter((x) => x.sitemap)) {
    if (!l.includes(`](${canonicoDi(p.percorso)})`)) ko(`llms.txt: manca ${p.percorso}`);
  }
}

if (errori.length) {
  console.error("Verifica prerender FALLITA:\n- " + errori.join("\n- "));
  process.exit(1);
}
console.log(`Verifica prerender ok (${pagine.length} pagine, di cui ${contenuti.length} di contenuto con dati strutturati, + 404, sitemap, llms.txt, spa.html)`);
