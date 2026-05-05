import posthog from "posthog-js";
import { getConsent, onConsentChange } from "./consent";

const POSTHOG_TOKEN = "phc_rDyX79RGSjPVPyjJNUBJmKHMv5dzmJyxfQEXAi7cAqsG";
const POSTHOG_HOST = "https://eu.i.posthog.com";

let posthogInitialized = false;

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

export function applyConsent() {
  const consent = getConsent();
  if (!consent) return;
  if (consent.choices.statistics) initPostHog();
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
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "InitiateCheckout", { content_name: `${section}_${cta}` });
  }
}
