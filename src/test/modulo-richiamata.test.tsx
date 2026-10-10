// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import ModuloRichiamata from "@/pages/dentisti/ModuloRichiamata";
import { trackLead } from "@/lib/analytics";

vi.mock("@/lib/analytics", () => ({ trackLead: vi.fn(), trackCta: vi.fn() }));

const GRAZIE = "Grazie, ti richiamiamo noi.";
const APP = "https://app.smilelive.it/?utm_source=facebook&utm_campaign=dentisti-modulo";
const WHATSAPP = "https://wa.me/393289598557?text=Buongiorno";
const onTry = vi.fn();

function compilaEInvia(risposta: () => Promise<Response>) {
  const fetchFinto = vi.fn((_url: string, _init: RequestInit) => risposta());
  vi.stubGlobal("fetch", fetchFinto);
  render(<ModuloRichiamata appUrl={APP} onTry={onTry} waHref={WHATSAPP} />);
  fireEvent.click(screen.getByLabelText("Dott.ssa"));
  for (const [etichetta, valore] of [
    ["Nome", "Maria"],
    ["Cognome", "Rossi"],
    ["Nome dello studio", "Studio Rossi"],
    ["Città", "Bari"],
    ["Telefono", "3331234567"],
    ["Email", "maria@studiorossi.it"],
  ]) {
    fireEvent.change(screen.getByLabelText(etichetta), { target: { value: valore } });
  }
  return fetchFinto;
}

const invia = () => fireEvent.submit(screen.getByRole("button", { name: "Richiamatemi" }).closest("form")!);

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

describe("ModuloRichiamata", () => {
  it("invio riuscito: manda i campi a /api/contatto, mostra il grazie e segna il Lead", async () => {
    window.history.pushState({}, "", "/dentisti?utm_source=facebook&utm_campaign=dentisti-modulo");
    const fetchFinto = compilaEInvia(async () => Response.json({ ok: true }));
    invia();
    expect(await screen.findByText(GRAZIE)).toBeTruthy();
    expect(trackLead).toHaveBeenCalledTimes(1);
    expect(fetchFinto).toHaveBeenCalledTimes(1);
    const [url, init] = fetchFinto.mock.calls[0];
    expect(url).toBe("/api/contatto");
    expect(init.method).toBe("POST");
    expect(JSON.parse(String(init.body))).toEqual({
      titolo: "Dott.ssa",
      nome: "Maria",
      cognome: "Rossi",
      studio: "Studio Rossi",
      citta: "Bari",
      telefono: "3331234567",
      email: "maria@studiorossi.it",
      sito_web: "",
      consenso_assistente: false,
      pagina: window.location.href,
      utm: { source: "facebook", campaign: "dentisti-modulo" },
    });
  });

  it("dopo il grazie c'è il bottone della prova gratuita, con il link e il tracciamento della pagina", async () => {
    compilaEInvia(async () => Response.json({ ok: true }));
    invia();
    await screen.findByText(GRAZIE);
    const prova = screen.getByRole("link", { name: "Prova gratis: 5 simulazioni e 2 video" });
    expect(prova.getAttribute("href")).toBe(APP);
    prova.addEventListener("click", (e) => e.preventDefault()); // jsdom non sa navigare
    fireEvent.click(prova);
    expect(onTry).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("button", { name: "Richiamatemi" })).toBeNull();
  });

  it("la casella non è preselezionata e, se spuntata, parte come true", async () => {
    const fetchFinto = compilaEInvia(async () => Response.json({ ok: true }));
    const casella = screen.getByRole("checkbox") as HTMLInputElement;
    expect(casella.checked).toBe(false);
    expect(casella.required).toBe(false);
    fireEvent.click(casella);
    invia();
    await screen.findByText(GRAZIE);
    expect(JSON.parse(String(fetchFinto.mock.calls[0][1].body)).consenso_assistente).toBe(true);
  });

  it.each([
    ["risposta 200 che non è JSON", async () => new Response("<!doctype html>", { status: 200 })],
    ["risposta 200 con ok false", async () => Response.json({ ok: false })],
    ["errore del server", async () => Response.json({ ok: false, errore: "invio non riuscito" }, { status: 502 })],
    ["rete assente", async () => Promise.reject(new TypeError("Failed to fetch"))],
  ])("%s: nessun grazie, messaggio di errore e WhatsApp", async (_caso, risposta) => {
    compilaEInvia(risposta);
    invia();
    const avviso = await screen.findByRole("alert");
    expect(avviso.textContent).toContain("Non siamo riusciti a inviare la richiesta.");
    // l'alternativa è il link WhatsApp che la pagina ha già
    expect(screen.getByRole("link", { name: "Oppure scrivici su WhatsApp" }).getAttribute("href")).toBe(WHATSAPP);
    expect(screen.queryByText(GRAZIE)).toBeNull();
    expect(trackLead).not.toHaveBeenCalled();
    // il modulo resta lì, compilato, per riprovare
    expect((screen.getByLabelText("Nome") as HTMLInputElement).value).toBe("Maria");
  });

  it("campo rifiutato dal server: mostra il suo messaggio", async () => {
    compilaEInvia(async () => Response.json({ ok: false, errore: "Telefono: servono almeno 8 cifre" }, { status: 400 }));
    invia();
    expect((await screen.findByRole("alert")).textContent).toContain("Telefono: servono almeno 8 cifre");
    expect(screen.queryByText(GRAZIE)).toBeNull();
  });
});
