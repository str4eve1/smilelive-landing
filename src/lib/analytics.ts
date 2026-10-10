import posthog from "posthog-js";
import { getConsent, onConsentChange } from "./consent";

const POSTHOG_TOKEN = "phc_rDyX79RGSjPVPyjJNUBJmKHMv5dzmJyxfQEXAi7cAqsG";
const POSTHOG_HOST = "https://eu.i.posthog.com";
const META_PIXEL_ID = "2010529443232237";
const META_PIXEL_SRC = "https://connect.facebook.net/en_US/fbevents.js";

let posthogInitialized = false;
let pixelInitialized = false;

function initPostHog() {
  if (posthogInitialized) return;
  posthog.init(POSTHOG_TOKEN, {
    api_host: POSTHOG_HOST,
    defaults: "2026-01-30",
    person_profiles: "identified_only",
    cross_subdomain_cookie: true,
  });
  posthogInitialized = true;
}

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  push: unknown;
  loaded: boolean;
  version: string;
};

// Snippet standard di Meta, eseguito solo dopo il sì ai cookie di marketing:
// prima di allora fbevents.js non viene nemmeno scaricato.
function initPixel() {
  if (pixelInitialized) {
    window.fbq?.("consent", "grant"); // consenso ridato dopo una revoca
    return;
  }
  const fbq = ((...args: unknown[]) => {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  }) as Fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  window.fbq = fbq;
  window._fbq = fbq;
  const script = document.createElement("script");
  script.async = true;
  script.src = META_PIXEL_SRC;
  document.head.appendChild(script);
  fbq("init", META_PIXEL_ID);
  fbq("track", "PageView");
  pixelInitialized = true;
}

export function applyConsent() {
  const consent = getConsent();
  if (consent?.choices.statistics) initPostHog();
  if (consent?.choices.marketing) initPixel();
  else if (pixelInitialized) window.fbq?.("consent", "revoke");
}

if (typeof window !== "undefined") {
  applyConsent();
  onConsentChange(() => applyConsent());
}

export function trackCta(cta: string, section: string) {
  const consent = getConsent();
  if (consent?.choices.statistics && posthogInitialized) {
    try {
      posthog.capture("cta_click", { cta, section });
    } catch {
      /* posthog not ready */
    }
  }
  if (consent?.choices.marketing && window.fbq) {
    window.fbq("track", "InitiateCheckout", { content_name: `${section}_${cta}` });
  }
}

// Modulo inviato davvero: evento Lead a Meta, solo con il consenso ai cookie di marketing.
export function trackLead() {
  if (getConsent()?.choices.marketing && window.fbq) window.fbq("track", "Lead");
}
