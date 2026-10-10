import GuidaLayout, { Elenco, LinkEsterno, LinkInterno, Section, Tabella } from "@/components/GuidaLayout";

export default function SimulazioneFaccetteImplantologiaProtesi() {
  return (
    <GuidaLayout
      titolo="Simulazione del sorriso nei casi di faccette, protesi e riabilitazioni su impianti"
      aggiornato="10 ottobre 2026"
      posizione="guida_simulazione_faccette_impianti_protesi"
      inBreve="La simulazione del sorriso serve soprattutto nei casi in cui il cambiamento si vede: sbiancamento, ricostruzioni conservative, faccette, forma del dente, gengive, protesi mobile e riabilitazione dell'intera arcata su impianti. In ognuno mostra l'aspetto possibile del risultato sul viso del paziente, ed è un supporto alla conversazione. Non mostra la fattibilità clinica: quella resta una tua valutazione."
    >
      <Section title="Quali casi si possono simulare in SmileLive?">
        <p>Solo quelli che l'app offre davvero. Con la modalità «Personalizzato» scegli il tipo di anteprima:</p>
        <Elenco>
          <li><strong>Sbiancamento</strong>: cambia solo il colore dei denti, con la tonalità scelta sulla scala Vita (da BL1 a D4).</li>
          <li><strong>Ricostruzione conservativa</strong>: scheggiature, usura, diastemi, dente singolo mancante.</li>
          <li><strong>Ricostruzione estetica avanzata</strong>: faccette, protesi mobile, riabilitazione su impianti (Toronto/All-on-4).</li>
        </Elenco>
        <p>A queste si aggiungono la scelta della forma del dente (squadrata, triangolare, arrotondata, dominante) e la gestione delle gengive. Per un risultato rapido, la modalità «Naturale» lavora con un clic.</p>
        <p>Un chiarimento sul termine «implantologia»: qui significa la riabilitazione dell'arcata su impianti. Non c'è la simulazione del singolo impianto come funzione a sé.</p>
      </Section>

      <Section title="Quale caso, quale uso, quali limiti?">
        <Tabella
          colonne={["Tipo di caso", "Cosa mostra la simulazione", "A cosa serve col paziente", "Limiti da dichiarare"]}
          righe={[
            ["Sbiancamento", "Il colore dei denti nella tonalità scelta (scala Vita)", "Concordare un obiettivo di colore prima di cominciare", "Il colore su schermo dipende da luce e monitor; il risultato reale dipende dal dente di partenza"],
            ["Ricostruzione conservativa", "Scheggiature, usura, diastemi o un dente mancante chiusi", "Far vedere quanto poco serve per correggere", "Mostra l'aspetto, non la tecnica né lo spazio disponibile"],
            ["Faccette", "Forma, proporzioni e colore dei denti dell'arcata", "Allineare le aspettative sull'armonia del sorriso", "È un'immagine 2D: non mostra spessori né preparazione; la conferma arriva dalla prova in bocca"],
            ["Forma del dente", "Le quattro forme (squadrata, triangolare, arrotondata, dominante)", "Scegliere insieme il carattere del sorriso", "La forma deve restare compatibile con anatomia e occlusione del paziente"],
            ["Gestione delle gengive", "Linea gengivale nei sorrisi gengivali: mantenuta, allungata di poco o in modo deciso", "Spiegare perché e quanto cambierebbe il sorriso", "Non mostra la procedura né se i tessuti la consentono"],
            ["Protesi mobile", "Una dentiera completa nel sorriso", "Rendere concreto un cambiamento che il paziente fatica a immaginare", "Aspetto soltanto: funzione, fonetica e stabilità non si vedono"],
            ["Arcata su impianti (Toronto/All-on-4)", "Un ponte fisso sull'intera arcata", "Far capire il punto di arrivo di un percorso lungo", "Non mostra posizione degli impianti, osso né spazio disponibile"],
          ]}
        />
      </Section>

      <Section title="Come usarla nelle faccette?">
        <p>Le faccette sono il caso in cui la simulazione dà più da discutere: forma, lunghezza, colore, proporzioni. Il paziente guarda il prima/dopo con il cursore e può confrontare più versioni, perché l'app lavora con due motori di IA e tu scegli quella più vicina al piano.</p>
      </Section>

      <Section title="Come usarla nelle riabilitazioni su impianti?">
        <p>Nell'arcata su impianti il paziente ha davanti un percorso lungo e un cambiamento grande. La simulazione dà un punto di arrivo da guardare, e rende la conversazione meno astratta.</p>
        <p>Il limite va detto con chiarezza: l'immagine non è una pianificazione. Non mostra dove vanno gli impianti, non misura l'osso, non dice se lo spazio c'è. Questi elementi vengono dalla tua diagnosi e dagli esami. Se vuoi un controllo ulteriore prima di presentare il caso, il <LinkInterno to="/protocollo">protocollo</LinkInterno> descrive come sovrapporre la scansione intraorale alla foto; nell'app questa vista serve solo a vedere, non a misurare.</p>
      </Section>

      <Section title="E nelle protesi mobili e nello sbiancamento?">
        <p>Nella protesi mobile il valore è soprattutto comunicativo: chi non porta ancora una dentiera fatica a immaginare l'aspetto. La simulazione mostra l'estetica del sorriso con una dentiera completa. Non dice nulla su ritenzione, fonetica o masticazione.</p>
        <p>Nello sbiancamento il punto è il colore. Si sceglie una tonalità sulla scala Vita e il paziente vede come starebbe sul proprio volto. È il caso più semplice da spiegare, quindi anche quello in cui conviene essere più espliciti sui limiti di un'immagine a schermo.</p>
      </Section>

      <Section title="Cosa non fa la simulazione?">
        <p>La simulazione è uno strumento di comunicazione: non sostituisce diagnosi, piano di cura né progettazione clinica. Quello che il paziente vede è un possibile risultato, da spiegare e contestualizzare. Ogni immagine porta l'etichetta «IMMAGINE GENERATA CON IA».</p>
        <p>Una regola pratica: prima verifichi che il caso sia fattibile, poi mostri. La simulazione non fa questa verifica al posto tuo.</p>
      </Section>

      <Section title="Come si prova?">
        <p>La prova è gratuita: 5 foto e 2 video, senza carta di credito. La simulazione richiede circa un minuto, il video qualche minuto in più. Si usa dal browser, senza installare nulla.</p>
        <p><LinkEsterno href="https://app.smilelive.it/">Prova gratuita su app.smilelive.it</LinkEsterno></p>
      </Section>

      <Section title="Per approfondire">
        <Elenco>
          <li><LinkInterno to="/guide/far-accettare-piu-preventivi">Come far capire (e accettare) un preventivo in prima visita</LinkInterno></li>
          <li><LinkInterno to="/protocollo">Il protocollo: dalla foto al manufatto</LinkInterno></li>
        </Elenco>
      </Section>
    </GuidaLayout>
  );
}
