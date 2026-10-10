const APP_URL = "https://app.smilelive.it/";
const KEYS = ["source", "medium", "campaign", "content", "term"] as const;

export type Utm = Partial<Record<(typeof KEYS)[number], string>>;

// Gli utm_* dell'indirizzo, senza prefisso: { source: "facebook", medium: "paid", … }
export function readUtm(search: string = window.location.search): Utm {
  const params = new URLSearchParams(search);
  const utm: Utm = {};
  for (const key of KEYS) {
    const value = params.get(`utm_${key}`);
    if (value) utm[key] = value;
  }
  return utm;
}

// Link all'app che porta con sé gli UTM con cui si è arrivati sulla pagina.
// Se l'indirizzo non ne ha nessuno si usano quelli di riserva, quando la pagina li passa.
export function appLink(search: string = window.location.search, fallback: Utm = {}): string {
  const utm = readUtm(search);
  const url = new URL(APP_URL);
  for (const [key, value] of Object.entries(Object.keys(utm).length > 0 ? utm : fallback)) {
    url.searchParams.set(`utm_${key}`, value);
  }
  return url.toString();
}
