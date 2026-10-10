import GuidaLayout, { Elenco, ElencoFonti, ElencoNumerato, Fonte, LinkInterno, Rif, Section, Tabella } from "@/components/GuidaLayout";

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
      nota="Digital Smile Design è un marchio di Digital Smile Design Consultoria Odontológica Ltda. SmileLive non è affiliata né collegata a tale società o al suo metodo."
    >
      <Section title="Che cos'è, e che cosa non è?">
        <p>È un metodo di pianificazione e di comunicazione, non un prodotto. Una revisione narrativa recente lo descrive come uno strumento di pianificazione e comunicazione nell'odontoiatria estetica interdisciplinare, che integra fotografie, video, scansioni intraorali e simulazioni 3D <Rif n={2} />. Non sostituisce la diagnosi né la progettazione clinica: l'immagine mostrata al paziente resta una proposta da verificare, non un risultato garantito.</p>
      </Section>

      <Section title="Quali dati servono?">
        <p>Il punto di partenza è la fotografia, ma la qualità dello scatto condiziona tutto il resto. In uno studio su 30 pazienti, il protocollo prevedeva due foto del volto (una con divaricatori, una con sorriso ampio) con il piano di Francoforte parallelo all'orizzonte, il piano bipupillare il più possibile orizzontale, fotocamera su treppiede a 150 cm e occhiali con marcatori per convertire i pixel in millimetri <Rif n={1} />. Gli stessi autori valutavano la posizione degli incisivi centrali superiori come punto di partenza e usavano un test fonetico (fonemi M e I) <Rif n={1} />. Altri autori indicano che video e fotografie servono a costruire una cornice 2D o 3D del sorriso integrata con i tratti del volto <Rif n={2} />.</p>
        <Tabella
          colonne={["Strumento", "Dati di partenza", "Che cosa permette", "Che cosa non permette"]}
          righe={[
            ["Simulazione da foto", "Una o più fotografie", "Mostrare e discutere una proposta", "Misurare volumi, spessori, spazio disponibile"],
            ["Progettazione su foto con riferimenti", "Foto calibrate, linee di riferimento", "Impostare proporzioni e allineamenti sull'immagine", "Sostituire la verifica su scansione"],
            ["Progettazione su scansione (software CAD)", "Scansione intraorale, foto", "Passare al progetto 3D e alla ceratura digitale", "È lavoro di studio o laboratorio, non una anteprima rapida"],
            ["Mock-up in bocca", "Ceratura e mascherina o fresatura/stampa", "Provare estetica, fonetica, funzione", "È un passo clinico successivo"],
          ]}
        />
      </Section>

      <Section title="Come si imposta in studio, passo per passo?">
        <p>Una sequenza ragionevole, coerente con il protocollo descritto in <Rif n={1} /> e con la letteratura sul passaggio dal progetto alla prova <Rif n={[3, 4]} />, è la seguente.</p>
        <ElencoNumerato>
          <li>Scatto delle foto standardizzate (volto con e senza divaricatori) e, se disponibile, scansione delle arcate.</li>
          <li>Verifica dei riferimenti: piano bipupillare, piano occlusale, linea mediana. In <Rif n={1} /> la foto con divaricatori serviva a controllare il parallelismo fra piano bipupillare e piano occlusale e la congruenza fra linea mediana e linea interincisiva.</li>
          <li>Proposta su schermo, da mostrare al paziente come ipotesi.</li>
          <li>Sovrapposizione della scansione alla foto, per fissarne la posizione nello spazio: in <Rif n={1} /> la foto era abbinata alla scansione prima della modellazione 3D.</li>
          <li>Ceratura diagnostica, digitale o tradizionale, e prova in bocca con mock-up <Rif n={[3, 4]} /> (vedi la guida su mock-up digitale e injection technique).</li>
        </ElencoNumerato>
      </Section>

      <Section title="Quanto è affidabile la progettazione digitale rispetto al risultato finale?">
        <p>Dipende dal dato che si confronta, e le prove sono limitate. Nello studio su 30 pazienti <Rif n={1} /> le misure lineari del piano 2D differivano in modo significativo da quelle del piano 3D (con l'eccezione delle altezze degli incisivi), mentre non emergevano differenze significative fra piani e faccette composite finali; gli autori segnalano come limiti il campione ridotto e l'unico materiale e software provati, e concludono che servono studi più ampi <Rif n={1} />. Una revisione narrativa sull'intelligenza artificiale in questo campo giudica la certezza delle prove bassa o moderata, senza valutazione formale del rischio di bias, e osserva che molti strumenti sono stati valutati senza verificare accuratezza diagnostica, usabilità o prevedibilità del risultato <Rif n={2} />.</p>
      </Section>

      <Section title="Che ruolo ha l'intelligenza artificiale?">
        <p>Secondo la stessa revisione <Rif n={2} />, l'IA viene usata per riconoscere punti di repere, segmentare e simulare, a partire da foto, scansioni intraorali e CBCT. Gli autori riportano una riduzione dei tempi di progetto in casi standardizzati e segnalano limiti nei pazienti con asimmetria facciale <Rif n={2} />. È un campo recente: la prudenza è d'obbligo nel presentare qualunque simulazione come previsione.</p>
      </Section>

      <Section title="Che differenza c'è fra progettare e ottenere il manufatto?">
        <p>La progettazione produce un'ipotesi; il manufatto richiede passi ulteriori. Gli studi sul tema descrivono la ceratura diagnostica (digitale o tradizionale) ricavata dal progetto, copiata in mascherine di silicone con cui si realizza il mock-up in bocca <Rif n={[3, 4]} />. Di questo ci occupiamo nella guida dedicata.</p>
      </Section>

      <Section title="Dove si colloca SmileLive">
        <p>SmileLive è uno strumento di comunicazione con il paziente: da una foto genera con l'IA una simulazione del sorriso, in foto e in video, da mostrare in prima visita. Non sostituisce diagnosi né progettazione clinica. La simulazione richiede circa un minuto; il video richiede alcuni minuti. Si può scegliere fra una modalità rapida, una personalizzata (tipo di anteprima, forma del dente, gestione gengivale) e un editor avanzato. La «Vista clinica» sovrappone la scansione 3D alla foto, per vedere e non per misurare. SmileLive non esegue ceratura, non fa misure e non esporta pacchetti per il laboratorio: quei passi si fanno con altri strumenti. Ogni immagine generata riporta l'etichetta «IMMAGINE GENERATA CON IA».</p>
        <p>Prova gratuita: 5 foto e 2 video, senza carta di credito.</p>
      </Section>

      <Section title="Digital smile design è un marchio?">
        <p>«Digital Smile Design» è usato come marchio da terzi. In questa pagina l'espressione compare in minuscolo, solo per descrivere il concetto, e usiamo come termine principale «progettazione digitale del sorriso».</p>
      </Section>

      <Section title="Per approfondire">
        <Elenco>
          <li><LinkInterno to="/protocollo">Protocollo SmileLive: dalla foto al manufatto</LinkInterno></li>
          <li><LinkInterno to="/guide/mock-up-digitale-injection-technique">Mock-up digitale e injection technique: dal progetto alla prova in bocca</LinkInterno></li>
          <li><LinkInterno to="/guide/far-accettare-piu-preventivi">Far accettare più preventivi</LinkInterno></li>
          <li><LinkInterno to="/guide/simulazione-faccette-implantologia-protesi">Simulazione per faccette, implantologia, protesi</LinkInterno></li>
          <li><LinkInterno to="/">Prova gratuita di SmileLive</LinkInterno></li>
        </Elenco>
      </Section>

      <Section title="Fonti">
        <ElencoFonti>
          <Fonte
            n={1}
            prima="Ortensi L., Sigari G., La Rosa G.R.M., Ferri A., Grande F., Pedullà E. "
            titolo="Digital planning of composite customized veneers using Digital Smile Design: Evaluation of its accuracy and manufacturing"
            dopo=". Clinical and Experimental Dental Research, 2022;8(2):537-543. DOI 10.1002/cre2.570."
            url="https://iris.polito.it/bitstream/11583/2973722/1/Clinical%20%20%20Exp%20Dental%20Res%20-%202022%20-%20Ortensi%20-%20Digital%20planning%20of%20composite%20customized%20veneers%20using%20Digital%20Smile%20Design%20.pdf"
          />
          <Fonte
            n={2}
            prima="Singh A.K., Ahuja D., Mallick S., Jose N.P., Bhardwaj I., Batra P., Rana A. "
            titolo="Artificial intelligence in digital smile design: a review of technological innovations and clinical integration"
            dopo=". Discover Artificial Intelligence, 2026;6:101. DOI 10.1007/s44163-025-00829-1."
            url="https://link.springer.com/article/10.1007/s44163-025-00829-1"
          />
          <Fonte
            n={3}
            prima="Chisnoiu A.M., Staicu A.C., Kui A., Chisnoiu R.M., Iacob S., Fluerașu M., Buduru S. "
            titolo="Smile Design and Treatment Planning—Conventional versus Digital—A Pilot Study"
            dopo=". Journal of Personalized Medicine, 2023;13(7):1028. DOI 10.3390/jpm13071028."
            url="https://pmc.ncbi.nlm.nih.gov/articles/PMC10381669"
          />
          <Fonte
            n={4}
            prima="Cattoni F., Teté G., Calloni A.M., Manazza F., Gastaldi G., Capparè P. "
            titolo="Milled versus moulded mock-ups based on the superimposition of 3D meshes from digital oral impressions: a comparative in vitro study in the aesthetic area"
            dopo=". BMC Oral Health, 2019;19:230. DOI 10.1186/s12903-019-0922-2."
            url="https://pmc.ncbi.nlm.nih.gov/articles/PMC6819647"
          />
        </ElencoFonti>
      </Section>
    </GuidaLayout>
  );
}
