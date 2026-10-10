// Marcatura machine-readable "contenuto generato con AI" sugli asset (AI Act art. 50).
// Standard IPTC: DigitalSourceType = trainedAlgorithmicMedia.
// Uso: node scripts/stamp-ai-metadata.mjs [--check]
// ponytail: lista esplicita invece di auto-discovery — i loghi degli studi NON vanno marcati.
import { exiftool } from "exiftool-vendored";
import path from "node:path";

const A = "src/assets";
const FILES = [
  `${A}/WEBP/PRIMA (2).webp`,
  `${A}/WEBP/DOPO (2).webp`,
  `${A}/WEBP/Sbiancamento prima e dopo2.webp`,
  `${A}/WEBP/FACCETTE (1).jpeg`,
  `${A}/WEBP/TERMOSTAMPATA-CrUanAGb.jpg`,
  `${A}/trattamenti/sbiancamento-prima.webp`,
  `${A}/trattamenti/sbiancamento-dopo.webp`,
  `${A}/trattamenti/faccetta-prima.webp`,
  `${A}/trattamenti/faccetta-dopo.webp`,
  `${A}/trattamenti/implantologia-prima.webp`,
  `${A}/trattamenti/implantologia-dopo.webp`,
  `${A}/apertura/apertura-prima.webp`,
  `${A}/apertura/apertura-dopo.webp`,
  `${A}/steps/step-1-poster.webp`,
  `${A}/steps/step-2-preview.webp`,
  `${A}/steps/step-3-sorriso.webp`,
  `${A}/steps/step-4-dentista.webp`,
  `${A}/video per SITO 1080p FINITO.mp4`,
  `${A}/sorriso-video/sorriso-video.mp4`,
  `${A}/sorriso-video/sorriso-video-poster.webp`,
  `${A}/esempi/esempio-foto-prima.webp`,
  `${A}/esempi/esempio-foto-dopo.webp`,
  `${A}/esempi/caso1-mini.webp`,
  `${A}/esempi/caso1-video.mp4`,
  `${A}/esempi/caso1-video-poster.webp`,
  `${A}/esempi/caso2-mini.webp`,
  `${A}/esempi/caso2-prima.webp`,
  `${A}/esempi/caso2-dopo.webp`,
  `${A}/esempi/caso2-video.mp4`,
  `${A}/esempi/caso2-video-poster.webp`,
  `${A}/esempi/caso3-mini.webp`,
  `${A}/esempi/caso3-app.mp4`,
  `${A}/esempi/caso3-app-poster.webp`,
  `${A}/esempi/caso3-video.mp4`,
  `${A}/esempi/caso3-video-poster.webp`,
];

const SRC_TYPE = "http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia";
const TAGS = {
  "XMP-iptcExt:DigitalSourceType": SRC_TYPE,
  "XMP-dc:Description": "Immagine generata con intelligenza artificiale",
  "XMP-xmpRights:UsageTerms": "AI-generated content",
};

const check = process.argv.includes("--check");
let bad = 0;

for (const f of FILES) {
  const abs = path.resolve(f);
  try {
    if (!check) await exiftool.write(abs, TAGS, { writeArgs: ["-overwrite_original"] });
    const t = await exiftool.read(abs);
    const ok = t.DigitalSourceType === SRC_TYPE;
    if (!ok) bad++;
    console.log(`${ok ? "OK  " : "MISS"} ${f}`);
  } catch (e) {
    bad++;
    console.log(`ERR  ${f} — ${e.message.split("\n")[0]}`);
  }
}

await exiftool.end();
console.log(bad ? `\n${bad}/${FILES.length} non marcati` : `\nTutti marcati (${FILES.length})`);
process.exit(bad ? 1 : 0);
