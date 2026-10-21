import GuidaLayout, { Elenco, LinkEsterno, LinkInterno, Section, Tabella } from "@/components/GuidaLayout";

export default function FarAccettarePiuPreventivi() {
  return (
    <GuidaLayout
      titolo="Accettazione del preventivo odontoiatrico: come farlo capire in prima visita"
      aggiornato="11 ottobre 2026"
      posizione="guida_far_accettare_preventivi"
      inBreve="Un preventivo viene accettato quando il paziente capisce che cosa gli stai proponendo. In prima visita la simulazione del sorriso sul suo viso, in foto e in video, gli dà qualcosa di concreto da guardare e di cui parlare con te. La prepara la segreteria o l'assistente in circa un minuto, mentre tu resti in poltrona, e il preventivo, la firma a schermo e la fattura vivono nello stesso strumento."
    >
      <Section title="Perché un preventivo giusto resta senza risposta?">
        <p>Quasi sempre il motivo è che il paziente non ha visto niente. Gli hai spiegato un piano di cura corretto con parole che per te sono chiare. Lui ha sentito termini, numeri di elementi, tempi. Non ha visto nulla che somigli al suo sorriso. Esce con un foglio e un «ci devo pensare».</p>
        <p>Qui non ti diamo percentuali di accettazione e non ne promettiamo. Descriviamo il meccanismo: il paziente vede la proposta su di sé, la capisce, la discute con te. Se questo cambia qualcosa nel tuo studio, lo giudichi tu sui tuoi numeri.</p>
        <p>Il tema non è «avere più pazienti». È non perdere quelli che sono già seduti in studio con un piano di cura davanti.</p>
      </Section>

      <Section title="Perché il prima/dopo deve essere sul viso del paziente?">
        <p>Perché il paziente non decide su un'immagine generica: decide guardando sé stesso. Un caso da catalogo parla di un altro sorriso. La simulazione parte da una foto scattata in studio e mostra il possibile risultato sullo stesso viso, con un cursore da trascinare tra prima e dopo.</p>
        <p>Dalla stessa foto si può ottenere anche un breve video, circa 6 secondi e senza audio, in cui il paziente sorride e muove la testa. L'app lavora con due motori di IA in parallelo: tu confronti le versioni e scegli quella che somiglia di più al piano di cura. Se serve, puoi ritoccare il risultato nella modalità Designer, dente per dente, oppure con una richiesta a testo, e rifinirlo con l'IA (AI Refine).</p>
        <p>Prima di mostrarla al paziente, verifica che il risultato simulato sia realizzabile: è l'analisi di fattibilità, la terza fase del <LinkInterno to="/protocollo">protocollo</LinkInterno>. Nella «Vista clinica» puoi sovrapporre la scansione 3D alla foto, per facilitare l'analisi. Al paziente arriva solo una proposta che si può realizzare.</p>
        <p>Il paziente guarda, tu spieghi cosa è previsto e cosa no. La conversazione parte da un riferimento personale.</p>
      </Section>

      <Section title="E se non ho tempo in poltrona?">
        <p>La simulazione richiede circa un minuto. Il video richiede qualche minuto in più, e intanto si può continuare a lavorare: arriva nell'app quando è pronto.</p>
        <p>Non devi farla tu. La può preparare la segreteria o l'assistente: scatta la foto, avvia la simulazione, e tu trovi il risultato pronto da valutare e da mostrare mentre resti in poltrona. Il tempo del clinico va sulla spiegazione, non sul software.</p>
      </Section>

      <Section title="Cosa cambia avere tutto nello stesso strumento?">
        <p>Oggi molti studi pagano licenze separate per gestionale, firma, preventivi e prescrizioni, e il paziente passa da un programma all'altro. Qui lo stesso caso segue quattro passi nello stesso posto, più uno a valle per il laboratorio.</p>
        <Tabella
          colonne={["Passo", "Cosa succede", "Chi lo fa"]}
          righe={[
            ["1. Accoglienza e scatto", "Si fotografa il paziente e parte la simulazione, in foto e poi in video", "Segreteria o assistente"],
            ["2. Presentazione e preventivo", "Prima/dopo con il cursore, video; si compone il preventivo con PDF, anche dettandolo a voce (le voci compilate vanno riviste prima dell'invio)", "Clinico"],
            ["3. Firma a schermo", "Il paziente apre un link, da telefono o tablet, e firma con il dito o il mouse. Se firma su carta, il preventivo si segna come firmato", "Paziente, con la segreteria"],
            ["4. Fattura", "La fattura si emette dal preventivo accettato; l'invio al Sistema Tessera Sanitaria è nei piani Medio e Grande", "Segreteria"],
            ["5. Prescrizione vocale al laboratorio", "Si detta a voce, l'app compila la prescrizione; il laboratorio la riceve nel suo portale e resta collegato allo studio sullo stesso caso, anche con la scansione allegata e la chat", "Clinico o assistente"],
          ]}
        />
        <p>Il link di firma resta valido 7 giorni. I dati per la fattura può compilarli il paziente stesso da un link.</p>
        <p>Il vantaggio pratico: ogni dato viene inserito una volta sola, e nessun passaggio dipende dal ricordarsi di trasferire un file.</p>
      </Section>

      <Section title="Cosa dire al paziente e cosa non promettere?">
        <p>La simulazione è uno strumento di comunicazione: non sostituisce diagnosi, piano di cura né progettazione clinica. Quello che il paziente vede è un possibile risultato, e spetta a te spiegarlo e contestualizzarlo rispetto al suo caso. Ogni immagine porta l'etichetta «IMMAGINE GENERATA CON IA».</p>
        <p>In pratica: mostra, spiega cosa è clinicamente previsto, dichiara cosa la foto non può dire. Non serve altro.</p>
      </Section>

      <Section title="Come si prova senza impegno?">
        <p>La prova è gratuita: 2 foto e 2 video, senza carta di credito. Si usa dal browser, senza installare nulla; su telefono si può aggiungere alla schermata iniziale. Il modo più onesto di valutarla è su un tuo paziente reale, in una prima visita vera.</p>
        <p><LinkEsterno href="https://app.smilelive.it/">Prova gratuita su app.smilelive.it</LinkEsterno></p>
      </Section>

      <Section title="Per approfondire">
        <Elenco>
          <li><LinkInterno to="/protocollo">Il protocollo: dalla foto al manufatto</LinkInterno></li>
          <li><LinkInterno to="/guide/progettazione-digitale-del-sorriso">Progettazione digitale del sorriso</LinkInterno></li>
          <li><LinkInterno to="/guide/mock-up-digitale-injection-technique">Mock-up digitale, mock-up fisico e injection technique</LinkInterno></li>
          <li><LinkInterno to="/guide/simulazione-faccette-implantologia-protesi">Simulazione per faccette, protesi e arcate su impianti</LinkInterno></li>
        </Elenco>
      </Section>
    </GuidaLayout>
  );
}
