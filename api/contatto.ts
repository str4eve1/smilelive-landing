// api/contatto: riceve il modulo «Preferisci essere richiamato?» della pagina /dentisti.
// Tutta la logica sta in _contatto-regole.ts (provata con vitest); qui solo il collegamento alla rete
// e alle variabili d'ambiente CRM_SALVA_LEAD_URL, CRM_SALVA_LEAD_CHIAVE e CRM_ANTEPRIMA.
import { gestisci } from "./_contatto-regole.js";

export default {
  fetch(request: Request): Promise<Response> {
    return gestisci(request, process.env, fetch);
  },
};
