// Regole di api/contatto: che cosa può arrivare dal modulo «Preferisci essere richiamato?» e che cosa si
// inoltra al CRM. Nessuna dipendenza esterna, così tutto si prova con vitest. Il trattino basso nel nome:
// Vercel non trasforma questo file in una funzione.
import { TESTO_CONSENSO, VERSIONE_TESTO } from "./_consenso.js";

export type Esito = { ok: true; dati: Record<string, unknown> } | { ok: false; errore: string };
type Env = Record<string, string | undefined>;

// Stessi limiti di chi riceve il contatto.
const MAX_TESTO: Record<string, number> = { titolo: 10, nome: 100, cognome: 100, studio: 200, citta: 100, email: 200 };
const ETICHETTE: Record<string, string> = {
  titolo: "Titolo", nome: "Nome", cognome: "Cognome", studio: "Nome dello studio", citta: "Città", email: "Email",
};
const TITOLI = ["Dott.", "Dott.ssa"];
const MAX_TELEFONO = 40;
const MIN_CIFRE = 8;
const MAX_PAGINA = 500;
const MAX_UTM = 100;
const UTM = ["source", "medium", "campaign", "content", "term"];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ORIGINI = ["https://www.smilelive.it", "https://smilelive.it"];
const LOCALE = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;

// Caratteri veri (punti di codice): un'emoji conta 1.
function caratteri(testo: string): number {
  return [...testo].length;
}

function taglia(testo: string, max: number): string {
  return [...testo].slice(0, max).join("");
}

function pulito(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

// Sito, anteprime di Vercel di questo progetto (indirizzo della pubblicazione e del suo ramo), computer locale.
export function origineAmmessa(origine: string | null, env: Env): origine is string {
  if (!origine) return false;
  if (ORIGINI.includes(origine) || LOCALE.test(origine)) return true;
  return [env.VERCEL_URL, env.VERCEL_BRANCH_URL].some((dominio) => !!dominio && origine === `https://${dominio}`);
}

// Controlla ciò che arriva dal browser e costruisce il contatto da inoltrare. I messaggi si mostrano a chi compila.
// Il testo del consenso e la sua versione vengono da _consenso.ts, mai dal corpo.
export function valida(corpo: unknown, origine: string, adesso: number): Esito {
  if (typeof corpo !== "object" || corpo === null || Array.isArray(corpo)) {
    return { ok: false, errore: "richiesta non valida" };
  }
  const c = corpo as Record<string, unknown>;

  const campi: Record<string, string> = {};
  for (const k of Object.keys(MAX_TESTO)) {
    const v = pulito(c[k]);
    if (v === "") return { ok: false, errore: `${ETICHETTE[k]}: campo obbligatorio` };
    if (caratteri(v) > MAX_TESTO[k]) return { ok: false, errore: `${ETICHETTE[k]}: massimo ${MAX_TESTO[k]} caratteri` };
    campi[k] = v;
  }
  if (!TITOLI.includes(campi.titolo)) return { ok: false, errore: "Titolo: Dott. oppure Dott.ssa" };
  if (!EMAIL.test(campi.email)) return { ok: false, errore: "Email: indirizzo non valido" };

  const telefono = pulito(c.telefono);
  if (caratteri(telefono) > MAX_TELEFONO || telefono.replace(/\D/g, "").length < MIN_CIFRE) {
    return { ok: false, errore: `Telefono: servono almeno ${MIN_CIFRE} cifre` };
  }

  // La pagina da cui parte il modulo è sempre una pagina di questo sito.
  const pagina = taglia(pulito(c.pagina), MAX_PAGINA);
  if (!pagina.startsWith(`${origine}/`)) return { ok: false, errore: "richiesta non valida" };

  const grezzi = typeof c.utm === "object" && c.utm !== null ? (c.utm as Record<string, unknown>) : {};
  const utm: Record<string, string> = {};
  for (const k of UTM) {
    const v = pulito(grezzi[k]);
    if (v !== "") utm[k] = taglia(v, MAX_UTM);
  }

  const consenso = c.consenso_assistente === true;
  return {
    ok: true,
    dati: {
      titolo: campi.titolo,
      nome: campi.nome,
      cognome: campi.cognome,
      studio: campi.studio,
      citta: campi.citta,
      telefoni: [telefono],
      email: campi.email,
      modulo: {
        pagina,
        inviato_at: new Date(adesso).toISOString(),
        utm,
        consenso_assistente: consenso,
        ...(consenso ? { testo_consenso: TESTO_CONSENSO, versione_testo: VERSIONE_TESTO } : {}),
      },
    },
  };
}
