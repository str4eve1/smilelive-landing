// Server locale che imita le regole di Vercel sulla cartella dist (vite preview riscriverebbe tutto su index.html).
// Uso: node scripts/servi-dist.mjs [porta]
import { createServer } from "node:http";
import { existsSync, readFileSync, statSync } from "node:fs";
import { extname, join, resolve } from "node:path";

const dist = resolve("dist");
const porta = Number(process.argv[2]) || 4180;
const tipi = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json",
  ".xml": "application/xml", ".txt": "text/plain; charset=utf-8", ".png": "image/png", ".jpg": "image/jpeg",
  ".webp": "image/webp", ".svg": "image/svg+xml", ".mp4": "video/mp4", ".woff2": "font/woff2",
};
const file = (p) => existsSync(p) && statSync(p).isFile();

createServer((req, res) => {
  const { pathname } = new URL(req.url, "http://x");
  const percorso = decodeURIComponent(pathname).replace(/\/+$/, "") || "/";
  const noindex = /^\/(dentisti|v[1-5]|spa\.html)$/.test(percorso);
  let stato = 200;
  // File statico, poi cartella con index.html, poi la riscrittura delle pagine solo-browser, altrimenti 404.
  let scelto = [join(dist, percorso), join(dist, percorso, "index.html")].find((c) => c.startsWith(dist) && file(c));
  if (!scelto && /^\/(dentisti|v[1-5])$/.test(percorso)) scelto = join(dist, "spa.html");
  if (!scelto) {
    scelto = join(dist, "404.html");
    stato = 404;
  }
  const intestazioni = { "Content-Type": tipi[extname(scelto)] || "application/octet-stream" };
  if (noindex) intestazioni["X-Robots-Tag"] = "noindex";
  res.writeHead(stato, intestazioni);
  res.end(readFileSync(scelto));
}).listen(porta, () => console.log(`dist su http://localhost:${porta}`));
