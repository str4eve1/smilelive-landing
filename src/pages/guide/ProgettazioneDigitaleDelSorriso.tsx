import GuidaLayout, { Rif } from "@/components/GuidaLayout";

// SEGNAPOSTO: la cornice e «In breve» sono pronti, il corpo della pagina va ancora trascritto.
export default function ProgettazioneDigitaleDelSorriso() {
  return (
    <GuidaLayout
      titolo="Cos'è la progettazione digitale del sorriso e come si fa in studio?"
      aggiornato="10 ottobre 2026"
      posizione="guida_progettazione_digitale_sorriso"
      inBreve={
        <>
          La progettazione digitale del sorriso (in inglese digital smile design, qui usato solo in senso descrittivo) è un processo in cui il clinico, partendo da fotografie standardizzate, eventualmente da video e da scansioni, imposta su schermo un progetto estetico del sorriso da discutere con il paziente e con il laboratorio. Non coincide con un singolo software: la simulazione da foto è il primo passo del percorso, e ceratura, mock-up e restauro sono passi clinici successivi. Le evidenze disponibili sono in gran parte studi piccoli o revisioni narrative <Rif n={[1, 2]} />.
        </>
      }
    >
      {/* DA COMPLETARE: corpo dalla bozza progettazione-digitale-del-sorriso.md */}
    </GuidaLayout>
  );
}
