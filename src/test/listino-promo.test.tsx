// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import LaunchPromoBox from "@/components/LaunchPromoBox";
import { listinoFaqPriceAnswer } from "@/lib/pricing-copy";
import { trackCta } from "@/lib/analytics";

vi.mock("@/lib/analytics", () => ({ trackCta: vi.fn() }));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

// Testi approvati, copiati alla lettera.
describe("box «Promozione di lancio» (modalità listino)", () => {
  it("titolo e testo approvati, senza nessuna cifra di prezzo", () => {
    const { container } = render(<LaunchPromoBox />);
    expect(screen.getByRole("heading", { name: "Promozione di lancio per i primi 100 studi" })).toBeTruthy();
    expect(
      screen.getByText(
        "Chi attiva dopo la demo ha prezzi più bassi di quelli qui sotto e li mantiene per sempre, finché l'abbonamento resta attivo. Le condizioni te le comunica direttamente il fondatore.",
      ),
    ).toBeTruthy();
    expect(container.textContent).not.toMatch(/€|\beuro\b/i);
    expect(container.textContent?.match(/\d+/g)).toEqual(["100"]);
  });

  it("«Richiedi demo» apre WhatsApp col testo della demo del widget, in una scheda nuova", () => {
    render(<LaunchPromoBox />);
    const cta = screen.getByRole("link", { name: "Richiedi demo" });
    expect(cta.getAttribute("href")).toBe(
      "https://wa.me/393289598557?text=Ciao%2C%20vorrei%20vedere%20una%20demo%20di%20SmileLive%20per%20il%20mio%20studio.",
    );
    expect(cta.getAttribute("target")).toBe("_blank");
    expect(cta.getAttribute("rel")).toContain("noopener");
    fireEvent.click(cta);
    expect(trackCta).toHaveBeenCalledWith("prenota_demo", "pricing_promo");
  });
});

describe("FAQ «Quanto costa SmileLive?» (modalità listino)", () => {
  it("è il testo approvato, con le cifre della tabella di listino", () => {
    expect(listinoFaqPriceAnswer()).toBe(
      "La registrazione è gratuita: 2 foto e 2 video, senza carta di credito. Poi puoi pagare a consumo, 5 € a foto e 5 € a video senza canone, oppure scegliere un piano: Studio Piccolo a 87 € al mese (77 € con il piano annuale), Studio Medio a 147 € (127 €), Studio Grande a 197 € (167 €). Prezzi finali, nessuna IVA aggiunta. Per i primi 100 studi c'è una promozione di lancio riservata a chi prenota la demo.",
    );
  });
});
