import { describe, expect, it } from "vitest";
import { TESTO_CONSENSO, VERSIONE_TESTO } from "./_consenso.js";
import { origineAmmessa, valida } from "./_contatto-regole.js";

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
