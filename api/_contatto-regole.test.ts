import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TESTO_CONSENSO, VERSIONE_TESTO } from "./_consenso.js";
import { FINESTRA_MS, MAX_BYTE, MAX_INVII, gestisci, origineAmmessa, valida, type Chiama } from "./_contatto-regole.js";

const SITO = "https://www.smilelive.it";
const PAGINA = `${SITO}/dentisti?utm_source=facebook&utm_medium=paid&utm_campaign=dentisti-pagina`;
const ADESSO = Date.parse("2026-10-10T08:15:00.000Z");

// Ciò che il browser manda a /api/contatto.
const MODULO = {
  titolo: "Dott.ssa",
  nome: "Maria",
  cognome: "Rossi",
  studio: "Studio Rossi",
  citta: "Bari",
  telefono: "3331234567",
  email: "maria@studiorossi.it",
  consenso_assistente: true,
  sito_web: "",
  pagina: PAGINA,
  utm: { source: "facebook", medium: "paid", campaign: "dentisti-pagina" },
};

// Ciò che deve arrivare al CRM per quel modulo.
const CONTATTO = {
  titolo: "Dott.ssa",
  nome: "Maria",
  cognome: "Rossi",
  studio: "Studio Rossi",
  citta: "Bari",
  telefoni: ["3331234567"],
  email: "maria@studiorossi.it",
  modulo: {
    pagina: PAGINA,
    inviato_at: "2026-10-10T08:15:00.000Z",
    utm: { source: "facebook", medium: "paid", campaign: "dentisti-pagina" },
    consenso_assistente: true,
    testo_consenso: "Acconsento a essere chiamato dal segretario/a digitale di SmileLive.",
    versione_testo: "2026-10-10-bozza",
  },
};

describe("testo del consenso", () => {
  it("è quello approvato, con la sua versione", () => {
    expect(TESTO_CONSENSO).toBe("Acconsento a essere chiamato dal segretario/a digitale di SmileLive.");
    expect(VERSIONE_TESTO).toBe("2026-10-10-bozza");
  });
});

describe("valida", () => {
  const esito = (modifiche: Record<string, unknown> = {}) => valida({ ...MODULO, ...modifiche }, SITO, ADESSO);
  const errore = (modifiche: Record<string, unknown>) => {
    const e = esito(modifiche);
    return e.ok ? null : e.errore;
  };

  it("con la spunta costruisce il contatto con testo e versione del consenso", () => {
    expect(esito()).toStrictEqual({ ok: true, dati: CONTATTO });
  });

  it("senza la spunta testo e versione non ci sono", () => {
    const { testo_consenso, versione_testo, ...modulo } = CONTATTO.modulo;
    expect(esito({ consenso_assistente: false })).toStrictEqual({
      ok: true,
      dati: { ...CONTATTO, modulo: { ...modulo, consenso_assistente: false } },
    });
  });

  it("la spunta vale solo se è proprio true", () => {
    for (const valore of ["on", "true", 1, undefined]) {
      const e = esito({ consenso_assistente: valore });
      expect(e.ok && (e.dati.modulo as Record<string, unknown>).consenso_assistente).toBe(false);
    }
  });

  it("il testo del consenso non si prende mai dal browser", () => {
    const e = esito({ testo_consenso: "altro testo", versione_testo: "falsa" });
    expect(e).toStrictEqual({ ok: true, dati: CONTATTO });
  });

  it("toglie gli spazi attorno ai valori", () => {
    expect(esito({ nome: "  Maria ", telefono: " 3331234567 ", email: " maria@studiorossi.it " })).toStrictEqual({
      ok: true,
      dati: CONTATTO,
    });
  });

  it.each([
    ["titolo", "Titolo: campo obbligatorio"],
    ["nome", "Nome: campo obbligatorio"],
    ["cognome", "Cognome: campo obbligatorio"],
    ["studio", "Nome dello studio: campo obbligatorio"],
    ["citta", "Città: campo obbligatorio"],
    ["email", "Email: campo obbligatorio"],
  ])("%s mancante o vuoto", (campo, messaggio) => {
    expect(errore({ [campo]: undefined })).toBe(messaggio);
    expect(errore({ [campo]: "   " })).toBe(messaggio);
    expect(errore({ [campo]: 42 })).toBe(messaggio);
  });

  it.each([
    ["nome", 100, "Nome: massimo 100 caratteri"],
    ["cognome", 100, "Cognome: massimo 100 caratteri"],
    ["studio", 200, "Nome dello studio: massimo 200 caratteri"],
    ["citta", 100, "Città: massimo 100 caratteri"],
  ])("%s oltre %i caratteri", (campo, max, messaggio) => {
    expect(errore({ [campo]: "a".repeat(max) })).toBeNull();
    expect(errore({ [campo]: "a".repeat(max + 1) })).toBe(messaggio);
  });

  it("titolo: solo Dott. oppure Dott.ssa", () => {
    expect(errore({ titolo: "Dott." })).toBeNull();
    expect(errore({ titolo: "Prof." })).toBe("Titolo: Dott. oppure Dott.ssa");
  });

  it("email: forma valida e massimo 200 caratteri", () => {
    expect(errore({ email: "maria" })).toBe("Email: indirizzo non valido");
    expect(errore({ email: "maria@studio" })).toBe("Email: indirizzo non valido");
    expect(errore({ email: "ma ria@studio.it" })).toBe("Email: indirizzo non valido");
    expect(errore({ email: `${"a".repeat(195)}@ab.it` })).toBe("Email: massimo 200 caratteri");
  });

  it("telefono: almeno 8 cifre, al massimo 40 caratteri, inoltrato come scritto", () => {
    expect(errore({ telefono: undefined })).toBe("Telefono: servono almeno 8 cifre");
    expect(errore({ telefono: "333 1234" })).toBe("Telefono: servono almeno 8 cifre");
    expect(errore({ telefono: "1".repeat(41) })).toBe("Telefono: servono almeno 8 cifre");
    const e = esito({ telefono: "+39 333 123 4567" });
    expect(e.ok && e.dati.telefoni).toEqual(["+39 333 123 4567"]);
  });

  it("pagina: deve essere una pagina del sito da cui arriva la richiesta, tagliata a 500 caratteri", () => {
    expect(errore({ pagina: undefined })).toBe("richiesta non valida");
    expect(errore({ pagina: "https://altro.example/dentisti" })).toBe("richiesta non valida");
    expect(errore({ pagina: "javascript:alert(1)" })).toBe("richiesta non valida");
    const e = esito({ pagina: `${SITO}/dentisti?x=${"a".repeat(600)}` });
    expect(e.ok && [...String((e.dati.modulo as Record<string, unknown>).pagina)].length).toBe(500);
  });

  it("utm: solo le cinque chiavi note, ognuna tagliata a 100 caratteri", () => {
    const e = esito({ utm: { source: "facebook", campaign: "c".repeat(150), altro: "x", term: 7, content: "" } });
    expect(e.ok && (e.dati.modulo as Record<string, unknown>).utm).toEqual({ source: "facebook", campaign: "c".repeat(100) });
    const senza = esito({ utm: undefined });
    expect(senza.ok && (senza.dati.modulo as Record<string, unknown>).utm).toEqual({});
  });

  it("un corpo che non è un oggetto non è valido", () => {
    for (const corpo of [null, [], "testo", 3]) {
      expect(valida(corpo, SITO, ADESSO)).toEqual({ ok: false, errore: "richiesta non valida" });
    }
  });
});

describe("origineAmmessa", () => {
  it("sito, computer locale e anteprime di Vercel di questo progetto", () => {
    const env = { VERCEL_URL: "sito-abc123.vercel.app", VERCEL_BRANCH_URL: "sito-git-dentisti.vercel.app" };
    expect(origineAmmessa("https://www.smilelive.it", {})).toBe(true);
    expect(origineAmmessa("https://smilelive.it", {})).toBe(true);
    expect(origineAmmessa("http://localhost:8081", {})).toBe(true);
    expect(origineAmmessa("http://127.0.0.1:3000", {})).toBe(true);
    expect(origineAmmessa("https://sito-abc123.vercel.app", env)).toBe(true);
    expect(origineAmmessa("https://sito-git-dentisti.vercel.app", env)).toBe(true);
  });

  it("tutto il resto no", () => {
    expect(origineAmmessa(null, {})).toBe(false);
    expect(origineAmmessa("", {})).toBe(false);
    expect(origineAmmessa("https://altro.example", {})).toBe(false);
    expect(origineAmmessa("https://www.smilelive.it.altro.example", {})).toBe(false);
    expect(origineAmmessa("https://altro-progetto.vercel.app", { VERCEL_URL: "sito-abc123.vercel.app" })).toBe(false);
    expect(origineAmmessa("https://undefined", {})).toBe(false);
  });
});

describe("gestisci", () => {
  const ENV = {
    CRM_SALVA_LEAD_URL: "https://crm.example/contatti",
    CRM_SALVA_LEAD_CHIAVE: "chiave-di-prova-0123456789abcdef0123456789",
  };
  const orologio = () => ADESSO;
  let ultimoIp = 0;
  let log: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    log = vi.spyOn(console, "error").mockImplementation(() => {});
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  // Ogni richiesta arriva da un IP nuovo, così il limite di frequenza non lega le prove tra loro.
  function richiesta(corpo: unknown, opzioni: { method?: string; origine?: string | null; ip?: string } = {}): Request {
    const method = opzioni.method ?? "POST";
    const headers: Record<string, string> = {
      "content-type": "application/json",
      "x-real-ip": opzioni.ip ?? `10.0.0.${++ultimoIp}`,
    };
    if (opzioni.origine !== null) headers.origin = opzioni.origine ?? SITO;
    const body = method === "POST" ? (typeof corpo === "string" ? corpo : JSON.stringify(corpo)) : undefined;
    return new Request(`${SITO}/api/contatto`, { method, headers, body });
  }

  // CRM finto: registra le chiamate e risponde con le risposte date, poi con un 200 valido.
  function crm(...risposte: (Response | Error)[]) {
    const chiamate: { url: string; init: RequestInit }[] = [];
    const chiama: Chiama = async (url, init) => {
      chiamate.push({ url, init });
      const r = risposte.shift() ?? Response.json({ azione: "creato" });
      if (r instanceof Error) throw r;
      return r;
    };
    return { chiama, chiamate };
  }

  it("inoltra al CRM esattamente il contatto previsto, con la chiave", async () => {
    const { chiama, chiamate } = crm();
    const r = await gestisci(richiesta(MODULO), ENV, chiama, orologio);
    expect(r.status).toBe(200);
    expect(await r.json()).toStrictEqual({ ok: true });
    expect(r.headers.get("cache-control")).toBe("no-store");
    expect(chiamate).toHaveLength(1);
    expect(chiamate[0].url).toBe("https://crm.example/contatti");
    expect(chiamate[0].init.method).toBe("POST");
    expect(chiamate[0].init.headers).toEqual({
      Authorization: "Bearer chiave-di-prova-0123456789abcdef0123456789",
      "Content-Type": "application/json",
    });
    expect(chiamate[0].init.signal).toBeInstanceOf(AbortSignal);
    expect(JSON.parse(String(chiamate[0].init.body))).toStrictEqual(CONTATTO);
  });

  it("senza la spunta testo_consenso e versione_testo non partono", async () => {
    const { chiama, chiamate } = crm();
    await gestisci(richiesta({ ...MODULO, consenso_assistente: false }), ENV, chiama, orologio);
    const modulo = JSON.parse(String(chiamate[0].init.body)).modulo;
    expect(modulo.consenso_assistente).toBe(false);
    expect(modulo).not.toHaveProperty("testo_consenso");
    expect(modulo).not.toHaveProperty("versione_testo");
  });

  it("solo POST", async () => {
    const { chiama, chiamate } = crm();
    const r = await gestisci(richiesta(null, { method: "GET" }), ENV, chiama, orologio);
    expect(r.status).toBe(405);
    expect(r.headers.get("allow")).toBe("POST");
    expect(await r.json()).toEqual({ ok: false, errore: "usare POST" });
    expect(chiamate).toHaveLength(0);
  });

  it("corpo oltre 8 KB: 413", async () => {
    const { chiama, chiamate } = crm();
    const r = await gestisci(richiesta({ ...MODULO, nome: "a".repeat(MAX_BYTE) }), ENV, chiama, orologio);
    expect(r.status).toBe(413);
    expect((await r.json()).ok).toBe(false);
    expect(chiamate).toHaveLength(0);
  });

  it("corpo che non è JSON: 400", async () => {
    const { chiama, chiamate } = crm();
    const r = await gestisci(richiesta("{non json"), ENV, chiama, orologio);
    expect(r.status).toBe(400);
    expect(await r.json()).toEqual({ ok: false, errore: "richiesta non valida" });
    expect(chiamate).toHaveLength(0);
  });

  it("origine non ammessa o assente: 403", async () => {
    const { chiama, chiamate } = crm();
    for (const origine of ["https://altro.example", null]) {
      const r = await gestisci(richiesta(MODULO, { origine }), ENV, chiama, orologio);
      expect(r.status).toBe(403);
      expect(await r.json()).toEqual({ ok: false, errore: "origine non ammessa" });
    }
    expect(chiamate).toHaveLength(0);
  });

  it("anteprima di Vercel: origine ammessa e pagina di quell'origine", async () => {
    const { chiama, chiamate } = crm();
    const origine = "https://sito-abc123.vercel.app";
    const r = await gestisci(
      richiesta({ ...MODULO, pagina: `${origine}/dentisti` }, { origine }),
      { ...ENV, VERCEL_URL: "sito-abc123.vercel.app" },
      chiama,
      orologio,
    );
    expect(r.status).toBe(200);
    expect(chiamate).toHaveLength(1);
  });

  it("campo trappola pieno: risponde ok e non inoltra niente", async () => {
    const { chiama, chiamate } = crm();
    const r = await gestisci(richiesta({ ...MODULO, sito_web: "https://spam.example" }), ENV, chiama, orologio);
    expect(r.status).toBe(200);
    expect(await r.json()).toStrictEqual({ ok: true });
    expect(chiamate).toHaveLength(0);
  });

  it("limite di frequenza: 5 invii in 10 minuti per indirizzo IP", async () => {
    const { chiama, chiamate } = crm();
    let ora = ADESSO;
    const invia = (ip: string) => gestisci(richiesta(MODULO, { ip }), ENV, chiama, () => ora);
    for (let i = 0; i < MAX_INVII; i++) expect((await invia("203.0.113.5")).status).toBe(200);
    const sesto = await invia("203.0.113.5");
    expect(sesto.status).toBe(429);
    expect(await sesto.json()).toEqual({ ok: false, errore: "Troppi invii: riprova tra qualche minuto." });
    expect(chiamate).toHaveLength(MAX_INVII);
    // un altro indirizzo non è toccato
    expect((await invia("203.0.113.6")).status).toBe(200);
    // passata la finestra si può di nuovo
    ora = ADESSO + FINESTRA_MS;
    expect((await invia("203.0.113.5")).status).toBe(200);
  });

  it("campo non valido: 400 con il messaggio, niente CRM", async () => {
    const { chiama, chiamate } = crm();
    const r = await gestisci(richiesta({ ...MODULO, telefono: "333" }), ENV, chiama, orologio);
    expect(r.status).toBe(400);
    expect(await r.json()).toEqual({ ok: false, errore: "Telefono: servono almeno 8 cifre" });
    expect(chiamate).toHaveLength(0);
  });

  it("409 dal CRM: un solo nuovo tentativo", async () => {
    const riuscito = crm(Response.json({ errore: "conflitto" }, { status: 409 }));
    const r = await gestisci(richiesta(MODULO), ENV, riuscito.chiama, orologio);
    expect(await r.json()).toStrictEqual({ ok: true });
    expect(riuscito.chiamate).toHaveLength(2);
    expect(riuscito.chiamate[1].init.body).toBe(riuscito.chiamate[0].init.body);

    const fallito = crm(
      Response.json({ errore: "conflitto" }, { status: 409 }),
      Response.json({ errore: "conflitto" }, { status: 409 }),
    );
    const r2 = await gestisci(richiesta(MODULO), ENV, fallito.chiama, orologio);
    expect(r2.status).toBe(502);
    expect(await r2.json()).toEqual({ ok: false, errore: "invio non riuscito" });
    expect(fallito.chiamate).toHaveLength(2);
  });

  it.each([
    ["errore 500", Response.json({ errore: "errore interno" }, { status: 500 })],
    ["rifiuto 400 con dettagli", Response.json({ errore: "dettaglio che il visitatore non deve vedere" }, { status: 400 })],
    ["200 senza azione", Response.json({ anteprima: false })],
    ["200 che non è JSON", new Response("<html>", { status: 200 })],
    ["rete o tempo scaduto", new Error("The operation was aborted due to timeout")],
  ])("CRM: %s -> ok false, senza dettagli", async (_caso, risposta) => {
    const { chiama } = crm(risposta);
    const r = await gestisci(richiesta(MODULO), ENV, chiama, orologio);
    expect(r.status).toBe(502);
    expect(await r.json()).toStrictEqual({ ok: false, errore: "invio non riuscito" });
    expect(log).toHaveBeenCalled();
  });

  it.each([
    ["manca l'indirizzo", { CRM_SALVA_LEAD_CHIAVE: ENV.CRM_SALVA_LEAD_CHIAVE }],
    ["manca la chiave", { CRM_SALVA_LEAD_URL: ENV.CRM_SALVA_LEAD_URL }],
    ["indirizzo non valido", { ...ENV, CRM_SALVA_LEAD_URL: "non un indirizzo" }],
  ])("configurazione: %s -> 503 e lo scrive nei log", async (_caso, env) => {
    const { chiama, chiamate } = crm();
    const r = await gestisci(richiesta(MODULO), env, chiama, orologio);
    expect(r.status).toBe(503);
    expect(await r.json()).toEqual({ ok: false, errore: "servizio non disponibile" });
    expect(log).toHaveBeenCalledWith("contatto: configurazione mancante");
    expect(chiamate).toHaveLength(0);
  });

  it("CRM_ANTEPRIMA=1 aggiunge ?anteprima=1, altrimenti no", async () => {
    const con = crm();
    await gestisci(richiesta(MODULO), { ...ENV, CRM_ANTEPRIMA: "1" }, con.chiama, orologio);
    expect(con.chiamate[0].url).toBe("https://crm.example/contatti?anteprima=1");
    const senza = crm();
    await gestisci(richiesta(MODULO), { ...ENV, CRM_ANTEPRIMA: "0" }, senza.chiama, orologio);
    expect(senza.chiamate[0].url).toBe("https://crm.example/contatti");
  });
});
