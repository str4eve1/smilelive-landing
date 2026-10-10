// Regole e gestore di api/contatto: riceve il modulo «Preferisci essere richiamato?», lo controlla e lo inoltra
// al CRM con la chiave che vive solo nelle variabili d'ambiente. La rete arriva come parametro (chiama), così
// tutto si prova con vitest senza toccare servizi veri. Il trattino basso nel nome: Vercel non trasforma
// questo file in una funzione.
import { TESTO_CONSENSO, VERSIONE_TESTO } from "./_consenso.js";

export type Esito = { ok: true; dati: Record<string, unknown> } | { ok: false; errore: string };
// Chiamata di rete: in produzione fetch (api/contatto.ts), nelle prove una finta.
export type Chiama = (url: string, init: RequestInit) => Promise<Response>;
type Env = Record<string, string | undefined>;

export const MAX_BYTE = 8 * 1024;
export const MAX_INVII = 5; // per indirizzo IP…
export const FINESTRA_MS = 10 * 60 * 1000; // …ogni 10 minuti
const ATTESA_CRM_MS = 8000; // in tutto, nuovo tentativo compreso
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

// Istanti degli ultimi invii per indirizzo IP. In memoria: vale per istanza e si azzera a ogni ripartenza.
const invii = new Map<string, number[]>();

function troppiInvii(ip: string, adesso: number): boolean {
  if (invii.size > 1000) invii.clear(); // la memoria non cresce senza fine
  const recenti = (invii.get(ip) ?? []).filter((t) => adesso - t < FINESTRA_MS);
  const troppi = recenti.length >= MAX_INVII;
  if (!troppi) recenti.push(adesso);
  invii.set(ip, recenti);
  return troppi;
}

function json(status: number, corpo: unknown, intestazioni: Record<string, string> = {}): Response {
  return Response.json(corpo, { status, headers: { "Cache-Control": "no-store", ...intestazioni } });
}

function rifiuto(status: number, errore: string, intestazioni: Record<string, string> = {}): Response {
  return json(status, { ok: false, errore }, intestazioni);
}

// Il gestore completo: richiesta -> risposta. Al browser solo { ok: true } oppure { ok: false, errore }.
export async function gestisci(
  request: Request,
  env: Env,
  chiama: Chiama,
  adesso: () => number = Date.now,
): Promise<Response> {
  if (request.method !== "POST") return rifiuto(405, "usare POST", { Allow: "POST" });

  const troppo = `richiesta troppo grande (massimo ${MAX_BYTE} byte)`;
  if (Number(request.headers.get("content-length") ?? 0) > MAX_BYTE) return rifiuto(413, troppo);
  const testo = await request.text();
  if (new TextEncoder().encode(testo).length > MAX_BYTE) return rifiuto(413, troppo);
  let corpo: unknown;
  try {
    corpo = JSON.parse(testo);
  } catch {
    return rifiuto(400, "richiesta non valida");
  }

  const origine = request.headers.get("origin");
  if (!origineAmmessa(origine, env)) return rifiuto(403, "origine non ammessa");

  // Campo trappola: una persona non lo vede e non lo compila. Si risponde «ok» e non si inoltra niente.
  if (typeof corpo === "object" && corpo !== null && pulito((corpo as Record<string, unknown>).sito_web) !== "") {
    return json(200, { ok: true });
  }

  const ip =
    request.headers.get("x-real-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "sconosciuto";
  if (troppiInvii(ip, adesso())) return rifiuto(429, "Troppi invii: riprova tra qualche minuto.");

  const v = valida(corpo, origine, adesso());
  if (!v.ok) return rifiuto(400, v.errore);

  const chiave = env.CRM_SALVA_LEAD_CHIAVE?.trim();
  const indirizzo = env.CRM_SALVA_LEAD_URL?.trim();
  if (!chiave || !indirizzo || !URL.canParse(indirizzo)) {
    console.error("contatto: configurazione mancante");
    return rifiuto(503, "servizio non disponibile");
  }
  const url = new URL(indirizzo);
  if (env.CRM_ANTEPRIMA === "1") url.searchParams.set("anteprima", "1");

  try {
    const signal = AbortSignal.timeout(ATTESA_CRM_MS);
    const invia = () =>
      chiama(url.toString(), {
        method: "POST",
        headers: { Authorization: `Bearer ${chiave}`, "Content-Type": "application/json" },
        body: JSON.stringify(v.dati),
        signal,
      });
    let risposta = await invia();
    if (risposta.status === 409) risposta = await invia(); // salvataggio contemporaneo: un solo nuovo tentativo
    const esito: unknown = risposta.status === 200 ? await risposta.json() : null;
    // ricevuto solo con 200 e «azione» nella risposta: altrimenti niente «grazie»
    if (typeof esito !== "object" || esito === null || (esito as Record<string, unknown>).azione == null) {
      throw new Error(`risposta ${risposta.status}`);
    }
    return json(200, { ok: true });
  } catch (e) {
    // il dettaglio solo nei log; al browser mai
    console.error("contatto: invio non riuscito:", e instanceof Error ? e.message : String(e));
    return rifiuto(502, "invio non riuscito");
  }
}
