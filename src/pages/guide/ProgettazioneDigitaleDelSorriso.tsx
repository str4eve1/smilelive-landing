import GuidaLayout, { Elenco, ElencoFonti, ElencoNumerato, Fonte, LinkInterno, Rif, Section, Tabella } from "@/components/GuidaLayout";

export default function ProgettazioneDigitaleDelSorriso() {
  return (
    <GuidaLayout
      titolo="Cos'è la progettazione digitale del sorriso e come si fa in studio?"
      aggiornato="11 ottobre 2026"
      posizione="guida_progettazione_digitale_sorriso"
      inBreve={
        <>
          La progettazione digitale del sorriso (in inglese digital smile design, qui usato solo in senso descrittivo) è un processo in cui il clinico, partendo da fotografie standardizzate e dalla scansione intraorale, imposta su schermo un progetto estetico da discutere con il paziente e con il laboratorio <Rif n={1} />. Il primo passo è la simulazione del sorriso (mock-up digitale). Ceratura, mock-up fisico e manufatto finale sono passi successivi, e la simulazione non li sostituisce.
        </>
      }
      nota="DSD e il relativo logo sono marchi dei rispettivi titolari. Qui «digital smile design» è usato in senso descrittivo, per indicare la progettazione digitale del sorriso. SmileLive non è affiliata né collegata ai titolari di tali marchi."
    >
      <Section title="Che cos'è, e che cosa non è?">
        <p>È un metodo di pianificazione e di comunicazione, non un prodotto e non un singolo software. Integra fotografie, video, scansioni intraorali e simulazioni <Rif n={1} />. Non sostituisce la diagnosi né la progettazione clinica: l'immagine mostrata al paziente è un possibile risultato, da verificare.</p>
      </Section>

      <Section title="Quali dati servono?">
        <p>Il punto di partenza è la fotografia, e la qualità dello scatto condiziona tutto il resto. Il <LinkInterno to="/protocollo">protocollo SmileLive</LinkInterno> chiede tre riferimenti ben visibili (linea mediana, linea bipupillare, piano occlusale), paziente in piedi con il capo in posizione naturale, fotocamera all'altezza del piano occlusale, nessuna rotazione o inclinazione del capo. La scala in millimetri non viene dalla foto ma dalla scansione intraorale, acquisita nella stessa seduta.</p>
        <Tabella
          colonne={["Strumento", "Dati di partenza", "Che cosa permette", "Che cosa non permette"]}
          righe={[
            ["Simulazione da foto", "Una o più fotografie", "Mostrare e discutere una proposta", "Misurare volumi, spessori, spazio disponibile"],
            ["Sovrapposizione di scansione e foto", "Scansione intraorale, foto", "Verificare la fattibilità anche in tre dimensioni", "Sostituire la ceratura"],
            ["Progettazione nel software CAD", "Scansione, foto originale e simulata", "Ceratura digitale in laboratorio", "Non è un'anteprima rapida ed è poco realistica alla vista: non è adatta da mostrare al paziente"],
            ["Mock-up fisico", "Ceratura digitale", "Provare in bocca estetica, fonetica, occlusione", "È un passo successivo"],
          ]}
        />
      </Section>

      <Section title="Come si imposta, passo per passo?">
        <p>Sono le sette fasi del <LinkInterno to="/protocollo">protocollo SmileLive</LinkInterno>.</p>
        <ElencoNumerato>
          <li>Acquisizione: foto del volto e scansione intraorale (studio).</li>
          <li>Simulazione (studio).</li>
          <li>Fattibilità: il clinico confronta situazione attuale e simulata, con la scansione sovrapposta alla foto (studio).</li>
          <li>Matching nel software CAD: scansione, foto originale e foto simulata sovrapposte (laboratorio).</li>
          <li>Ceratura diagnostica digitale (laboratorio).</li>
          <li>Mock-up fisico, la prova in bocca (studio).</li>
          <li>Manufatto finale (laboratorio e studio).</li>
        </ElencoNumerato>
      </Section>

      <Section title="Che ruolo ha l'intelligenza artificiale?">
        <p>Secondo una revisione recente <Rif n={1} />, l'IA viene usata per riconoscere punti di repere, segmentare e simulare, a partire da foto, scansioni intraorali e CBCT. È un campo recente, e per questo SmileLive non presenta la simulazione come previsione, ma come possibile risultato, previa verifica di fattibilità del clinico.</p>
      </Section>

      <Section title="Che differenza c'è fra progettare e ottenere il manufatto?">
        <p>La progettazione produce un'ipotesi; il manufatto richiede passi ulteriori. La simulazione è l'immagine 2D di riferimento. Nel software CAD il laboratorio sovrappone scansione, foto originale e simulazione, e su quel riferimento modella la ceratura digitale; da qui si arriva al mock-up fisico e al manufatto finale. Ne parla la guida su <LinkInterno to="/guide/mock-up-digitale-injection-technique">mock-up digitale, mock-up fisico e injection technique</LinkInterno>.</p>
      </Section>

      <Section title="Dove si colloca SmileLive">
        <p>SmileLive è uno strumento di comunicazione con il paziente: da una foto genera con l'IA una simulazione del sorriso, in foto e in video. Non sostituisce diagnosi né progettazione clinica. La simulazione richiede circa un minuto; il video alcuni minuti. Si può scegliere fra una modalità rapida, una personalizzata (tipo di anteprima, forma del dente, gestione gengivale) e un editor avanzato. La «Vista clinica» sovrappone la scansione 3D alla foto, per facilitare l'analisi e la verifica di fattibilità. Per il momento SmileLive non esegue ceratura, non fa misure e non esporta pacchetti per il laboratorio: dà al clinico il necessario per valutare la fattibilità delle simulazioni proposte. Ogni immagine generata è contrassegnata come generata con IA.</p>
        <p>Prova gratuita: 2 foto e 2 video, senza carta di credito.</p>
      </Section>

      <Section title="Digital smile design è un marchio?">
        <p>«Digital Smile Design» è usato come marchio da terzi. In questa pagina l'espressione compare in minuscolo, solo per descrivere il concetto, e usiamo come termine principale «progettazione digitale del sorriso».</p>
      </Section>

      <Section title="Per approfondire">
        <Elenco>
          <li><LinkInterno to="/protocollo">Protocollo SmileLive: dalla foto al manufatto</LinkInterno></li>
          <li><LinkInterno to="/guide/mock-up-digitale-injection-technique">Mock-up digitale, mock-up fisico e injection technique</LinkInterno></li>
          <li><LinkInterno to="/guide/far-accettare-piu-preventivi">Far accettare più preventivi</LinkInterno></li>
          <li><LinkInterno to="/guide/simulazione-faccette-implantologia-protesi">Simulazione per faccette, implantologia, protesi</LinkInterno></li>
          <li><LinkInterno to="/">Prova gratuita di SmileLive</LinkInterno></li>
        </Elenco>
      </Section>

      <Section title="Fonti">
        <ElencoFonti>
          <Fonte
            n={1}
            prima="Singh A.K., Ahuja D., Mallick S., Jose N.P., Bhardwaj I., Batra P., Rana A. "
            titolo="Artificial intelligence in digital smile design: a review of technological innovations and clinical integration"
            dopo=". Discover Artificial Intelligence, 2026;6:101. DOI 10.1007/s44163-025-00829-1."
            url="https://link.springer.com/article/10.1007/s44163-025-00829-1"
          />
        </ElencoFonti>
      </Section>
    </GuidaLayout>
  );
}
