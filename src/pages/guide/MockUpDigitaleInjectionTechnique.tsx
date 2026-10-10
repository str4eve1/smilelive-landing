import GuidaLayout, { Elenco, ElencoFonti, Fonte, LinkInterno, Rif, Section, Tabella } from "@/components/GuidaLayout";

// Modello per le altre guide: vedi il commento in testa a GuidaLayout.tsx.
// Nel JSX non si va a capo prima o dopo <Rif />, <LinkInterno />, <strong>: lo spazio andrebbe perso.
export default function MockUpDigitaleInjectionTechnique() {
  return (
    <GuidaLayout
      titolo="Dal progetto alla prova in bocca: cosa sono mock-up digitale e injection technique?"
      aggiornato="10 ottobre 2026"
      posizione="guida_mock_up_injection_technique"
      inBreve={
        <>
          Il mock-up è la prova in bocca, a scopo diagnostico, del progetto estetico; è «digitale» quando la ceratura da cui deriva è progettata al computer e il mock-up è fresato o stampato anziché ottenuto da una mascherina in silicone <Rif n={1} />. L'injection technique (tecnica di iniezione del composito) è una tecnica diretta in cui un composito fluido iniettabile viene portato in bocca attraverso una mascherina di silicone trasparente, ricavata dalla ceratura diagnostica <Rif n={2} />. Sono passi clinici successivi alla simulazione del sorriso, che li precede e non li sostituisce.
        </>
      }
      nota="Digital Smile Design è un marchio di Digital Smile Design Consultoria Odontológica Ltda. SmileLive non è affiliata né collegata a tale società o al suo metodo."
    >
      <Section title="Che cos'è un mock-up e che cosa lo rende «digitale»?">
        <p>
          Il mock-up diagnostico riproduce in bocca, in modo provvisorio, il volume progettato, così che clinico e paziente possano valutarlo. Nel flusso tradizionale la ceratura diagnostica su modello produce una mascherina in silicone con cui si stampa in resina il mock-up; nel flusso digitale la ceratura è modellata al software CAD e il mock-up viene fresato o stampato <Rif n={1} />.
        </p>
      </Section>

      <Section title="Mock-up digitale o tradizionale: che cosa dicono gli studi?">
        <p>
          Le prove sono scarse e spesso su pochi casi. Nello studio in vitro <Rif n={1} /> la deviazione media rispetto al progetto era 0,0468 mm per i mock-up stampati da mascherina e 0,0109 mm per quelli fresati; gli autori concludono che i fresati erano più accurati e precisi, con i limiti di un solo paziente, un solo caso anteriore, un operatore inesperto, assenza di fattori clinici intraorali. In uno studio pilota su cinque pazienti <Rif n={3} />, mock-up compositi in bocca derivati da ceratura convenzionale e da ceratura digitale, valutati su fotografie da tre dentisti, hanno ricevuto punteggi simili; il giudizio generale era leggermente più alto per il convenzionale, senza differenza significativa. Gli autori osservano che i risultati dipendono dall'abilità dell'odontotecnico e che il campione è troppo piccolo per trarre conclusioni precise <Rif n={3} />.
        </p>
        <Tabella
          colonne={["", "Ceratura e mascherina tradizionali", "Ceratura digitale e mock-up fresato/stampato"]}
          righe={[
            ["Progetto", "Ceratura su modello", "Modellazione con software CAD"],
            ["Mock-up", "Resina in mascherina di silicone", "Fresato (PMMA) o stampato"],
            [
              "Punti deboli riportati",
              <>Eccesso di resina al margine cervicale, pressione variabile all'incisale <Rif n={1} /></>,
              <>Dipende dall'attrezzatura e dalla competenza di chi progetta <Rif n={3} /></>,
            ],
            [
              "Evidenza aperta in questa guida",
              <>In vitro, un caso <Rif n={1} />; pilota, cinque pazienti <Rif n={3} /></>,
              "idem",
            ],
          ]}
        />
      </Section>

      <Section title="Quali sono i passi dal progetto alla prova in bocca?">
        <p>
          Una sequenza di riferimento, sintesi del protocollo SmileLive e di <Rif n={[1, 3]} />:
        </p>
        <Tabella
          colonne={["Fase", "Che cosa avviene", "Con quale strumento"]}
          righe={[
            ["1. Foto e simulazione", "Si mostra e si discute una proposta", "Simulazione da foto"],
            ["2. Scansione", "Si acquisiscono le arcate", "Scanner intraorale"],
            ["3. Fattibilità", "Si sovrappongono scansione e foto", "Software di sovrapposizione"],
            ["4. Ceratura", "Digitale (software CAD) o su modello", "Laboratorio o studio"],
            ["5. Mock-up", "Fresato o stampato, oppure da mascherina", "Laboratorio o studio"],
            ["6. Prova in bocca", "Si valutano estetica, fonetica, funzione", "Clinico"],
            ["7. Restauro", "Diretto (anche con injection technique) o indiretto", "Clinico e laboratorio"],
          ]}
        />
      </Section>

      <Section title="Come si ricava il mock-up da una simulazione 2D?">
        <p>
          Non si ricava direttamente: la simulazione da foto è un'immagine bidimensionale, utile per far vedere e discutere una proposta. Si passa da scansione, sovrapposizione e ceratura. In uno studio su 30 pazienti <Rif n={4} /> le misure del piano 2D su foto differivano in modo significativo da quelle del piano 3D su scansione (eccetto le altezze degli incisivi), ma non dalle faccette finali: un motivo in più per verificare in bocca.
        </p>
      </Section>

      <Section title="Che cos'è l'injection technique e come si svolge?">
        <p>
          È una tecnica diretta additiva che usa due materiali: un silicone trasparente per la mascherina e un composito iniettabile <Rif n={2} />. La guida clinica di un produttore, qui citata solo per descrivere i materiali e i passi, indica come punto di partenza una ceratura diagnostica totale e una parziale a denti alternati (digitali o convenzionali), modelli stampati in 3D, due mascherine di silicone trasparente di spessore minimo 3-4 mm <Rif n={2} />. In bocca: isolamento con diga, mordenzatura selettiva dello smalto per 30 secondi, adesivo, un foro di accesso nella mascherina, iniezione del composito, polimerizzazione, rimozione dei residui, rifinitura e lucidatura; i denti si trattano in due tempi, alternati <Rif n={2} />. La guida afferma che la tecnica non richiede preparazioni, pur ammettendo una lieve preparazione se lo si ritiene opportuno <Rif n={2} />.
        </p>
      </Section>

      <Section title="Che legame c'è fra mock-up e injection technique?">
        <p>
          Entrambi possono partire dalla ceratura diagnostica e da una mascherina di silicone: nel mock-up il materiale è provvisorio e serve a valutare il progetto; nell'injection technique il composito iniettato forma il restauro <Rif n={[2, 3]} />.
        </p>
      </Section>

      <Section title="Quali sono i limiti delle fonti sull'injection technique?">
        <p>
          La fonte aperta per questa guida è il manuale di un produttore, che descrive procedimento e indicazioni (usura, morfologie complesse, ripristino della dimensione verticale) <Rif n={2} />. Non permette di dire nulla su durata o confronto con altre tecniche, e la pagina non lo fa.
        </p>
      </Section>

      <Section title="Dove si colloca SmileLive">
        <p>
          SmileLive sta all'inizio del percorso. Da una foto genera con l'IA una simulazione del sorriso, in foto e in video, da mostrare e discutere in prima visita; la simulazione richiede circa un minuto. È uno strumento di comunicazione con il paziente e non sostituisce diagnosi né progettazione clinica. La «Vista clinica» sovrappone la scansione 3D alla foto, per vedere. SmileLive non esegue ceratura, non fa misure, non esporta pacchetti per il laboratorio: ceratura, mock-up e injection technique restano passi clinici e di laboratorio, con altri strumenti. Prova gratuita: 5 foto e 2 video, senza carta di credito.
        </p>
      </Section>

      <Section title="Per approfondire">
        <Elenco>
          <li><LinkInterno to="/protocollo">Protocollo SmileLive: dalla foto al manufatto</LinkInterno></li>
          <li><LinkInterno to="/guide/progettazione-digitale-del-sorriso">Progettazione digitale del sorriso</LinkInterno></li>
          <li><LinkInterno to="/guide/far-accettare-piu-preventivi">Far accettare più preventivi</LinkInterno></li>
          <li><LinkInterno to="/guide/simulazione-faccette-implantologia-protesi">Simulazione per faccette, implantologia, protesi</LinkInterno></li>
          <li><LinkInterno to="/">Prova gratuita di SmileLive</LinkInterno></li>
        </Elenco>
      </Section>

      <Section title="Fonti">
        <ElencoFonti>
          <Fonte
            n={1}
            prima="Cattoni F., Teté G., Calloni A.M., Manazza F., Gastaldi G., Capparè P. "
            titolo="Milled versus moulded mock-ups based on the superimposition of 3D meshes from digital oral impressions: a comparative in vitro study in the aesthetic area"
            dopo=". BMC Oral Health, 2019;19:230. DOI 10.1186/s12903-019-0922-2."
            url="https://pmc.ncbi.nlm.nih.gov/articles/PMC6819647"
          />
          <Fonte
            n={2}
            prima="GC Italia. "
            titolo="Injection Moulding Technique. Guida clinica"
            dopo=" (documento del produttore, senza anno nel testo)."
            url="https://www.gc.dental/europe/sites/europe.gc.dental/files/products/downloads/gaenialuniversalinjectable/manual/MAN_Injection_Moulding_Technique_Clinical_Guide_it.pdf"
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
            prima="Ortensi L., Sigari G., La Rosa G.R.M., Ferri A., Grande F., Pedullà E. "
            titolo="Digital planning of composite customized veneers using Digital Smile Design: Evaluation of its accuracy and manufacturing"
            dopo=". Clinical and Experimental Dental Research, 2022;8(2):537-543. DOI 10.1002/cre2.570."
            url="https://iris.polito.it/bitstream/11583/2973722/1/Clinical%20%20%20Exp%20Dental%20Res%20-%202022%20-%20Ortensi%20-%20Digital%20planning%20of%20composite%20customized%20veneers%20using%20Digital%20Smile%20Design%20.pdf"
          />
        </ElencoFonti>
      </Section>
    </GuidaLayout>
  );
}
