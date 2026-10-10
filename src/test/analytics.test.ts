// @vitest-environment jsdom
import { readFileSync } from "node:fs";
import { describe, expect, it, vi } from "vitest";
import { trackCta, trackLead } from "@/lib/analytics";
import { ALL_REJECTED, saveConsent } from "@/lib/consent";

const pixelScripts = () => document.querySelectorAll('script[src*="fbevents.js"]');
const queue = () => (window.fbq as unknown as { queue: unknown[][] }).queue;

// Le prove sono in sequenza: il modulo ricorda se il pixel è già stato caricato.
describe("Meta Pixel solo dopo il sì ai cookie di marketing", () => {
  it("index.html non carica più il pixel", () => {
    const html = readFileSync("index.html", "utf8");
    expect(html).not.toMatch(/fbevents|fbq\(|facebook\.com\/tr/);
  });

  it("senza consenso: nessuno script, trackCta e trackLead non mandano niente", () => {
    expect(pixelScripts()).toHaveLength(0);
    expect(window.fbq).toBeUndefined();
    // anche se fbq esistesse già, senza consenso non va chiamato
    const fbq = vi.fn();
    window.fbq = fbq;
    trackCta("inizia_gratis", "dentisti");
    trackLead();
    expect(fbq).not.toHaveBeenCalled();
    delete window.fbq;
  });

  it("dopo il sì al marketing: script caricato una volta sola, init e PageView", () => {
    saveConsent({ statistics: false, marketing: true });
    expect(pixelScripts()).toHaveLength(1);
    expect(pixelScripts()[0].getAttribute("src")).toBe("https://connect.facebook.net/en_US/fbevents.js");
    expect(queue()).toEqual([
      ["init", "2010529443232237"],
      ["track", "PageView"],
    ]);
    saveConsent({ statistics: false, marketing: true });
    expect(pixelScripts()).toHaveLength(1);
  });

  it("con il consenso trackCta e trackLead arrivano a Meta", () => {
    trackCta("inizia_gratis", "dentisti");
    trackLead();
    expect(queue()).toContainEqual(["track", "InitiateCheckout", { content_name: "dentisti_inizia_gratis" }]);
    expect(queue()).toContainEqual(["track", "Lead"]);
  });

  it("consenso tolto: lo si dice a Meta e non parte più nessun evento", () => {
    saveConsent(ALL_REJECTED);
    const lunghezza = queue().length;
    expect(queue()[lunghezza - 1]).toEqual(["consent", "revoke"]);
    trackCta("inizia_gratis", "dentisti");
    trackLead();
    expect(queue()).toHaveLength(lunghezza);
  });
});
