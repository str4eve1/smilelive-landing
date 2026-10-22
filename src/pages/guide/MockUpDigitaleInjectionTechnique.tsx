import GuidaLayout, { Elenco, ElencoFonti, Fonte, LinkInterno, Rif, Section, Tabella } from "@/components/GuidaLayout";

// Modello per le altre guide: vedi il commento in testa a GuidaLayout.tsx.
// Nel JSX non si va a capo prima o dopo <Rif />, <LinkInterno />, <strong>: lo spazio andrebbe perso.
export default function MockUpDigitaleInjectionTechnique() {
  return (
    <GuidaLayout
      titolo="Mock-up digitale, mock-up fisico e injection technique: cosa sono e come si collegano?"
      aggiornato="11 ottobre 2026"
      posizione="guida_mock_up_injection_technique"
      inBreve={
        <>
          La simulazione del sorriso (mock-up digitale) è l'anteprima a schermo del sorriso progettato. Il mock-up fisico, detto anche mock-up diagnostico, è la prova provvisoria in bocca per valutare estetica, fonetica e occlusione. L'injection technique è invece un restauro definitivo: un composito iniettato con la siringa attraverso una mascherina di silicone trasparente. Il mock-up fisico e l'injection technique sono passi clinici successivi alla simulazione, che li precede e non li sostituisce.
        </>
      }
      nota="DSD e il relativo logo sono marchi dei rispettivi titolari. Qui «digital smile design» è usato in senso descrittivo, per indicare la progettazione digitale del sorriso. SmileLive non è affiliata né collegata ai titolari di tali marchi."
    >
      <Section title="Che cos'è un mock-up fisico e come si ottiene?">
        <p>Il mock-up fisico riproduce in bocca, in modo provvisorio, il volume progettato, così che clinico e paziente possano valutarlo. Nel flusso digitale si ottiene in due modi:</p>
        <Elenco>
          <li><strong>Stampato in 3D.</strong> È già il manufatto fisico, rifinito, e si appoggia sui denti. Non serve la mascherina e non ci sono eccedenze da rimuovere.</li>
          <li><strong>Con una mascherina di silicone</strong> ricavata dal modello stampato in 3D. Si riempie di resina o composito, si applica sui denti, si tolgono le eccedenze e si rifinisce in bocca.</li>
        </Elenco>
        <p>Il mock-up analogico è la via classica: si fa la ceratura su modello, poi una mascherina di silicone normale (non trasparente), si mette il materiale dentro e si porta in bocca. Il materiale non si inietta mai: se si inietta attraverso una mascherina trasparente, è injection technique. Qui il termine «mock-up digitale» indica solo la simulazione a schermo, non il manufatto fisico che ne deriva.</p>
        <Tabella
          colonne={["", "Mock-up analogico", "Mock-up nel flusso digitale"]}
          righe={[
            ["Progetto", "Ceratura su modello", "Ceratura digitale nel software CAD"],
            ["Mock-up", "Resina nella mascherina di silicone", "Stampato in 3D: è già il manufatto fisico rifinito. Oppure resina nella mascherina di silicone ricavata dal modello stampato in 3D, da rifinire in bocca"],
            ["Punti deboli", "Il risultato dipende dall'abilità dell'odontotecnico", "Se stampato in 3D non ci sono eccessi. Con la mascherina sul modello stampato in 3D si ritorna al metodo analogico, ma con il riferimento 2D dell'eventuale simulazione; il risultato dipende dall'abilità dell'odontotecnico, come nel flusso analogico"],
          ]}
        />
      </Section>

      <Section title="Quali sono i passi dalla simulazione al manufatto?">
        <p>Sono le sette fasi del <LinkInterno to="/protocollo">protocollo SmileLive</LinkInterno>.</p>
        <Tabella
          colonne={["Fase", "Che cosa avviene", "Dove", "Con quale strumento"]}
          righe={[
            ["1. Acquisizione", "Foto del volto e scansione intraorale", "Studio", "Fotocamera e scanner intraorale"],
            ["2. Simulazione", "Si genera il possibile risultato (mock-up digitale)", "Studio", "Simulazione da foto"],
            ["3. Fattibilità", "Il clinico confronta attuale e simulato, con la scansione sovrapposta alla foto", "Studio", "Dentro SmileLive, o qualsiasi software di sovrapposizione"],
            ["4. Matching nel software CAD", "Si sovrappongono scansione, foto originale e foto simulata", "Laboratorio", "Software CAD"],
            ["5. Ceratura digitale", "Si modella la ceratura sul riferimento", "Laboratorio", "Software CAD"],
            ["6. Mock-up", "Prova in bocca: estetica, fonetica, occlusione", "Studio", "Mock-up fisico"],
            ["7. Manufatto finale", "Injection technique, faccette fresate o stampa 3D in materiali definitivi", "Laboratorio e studio", "Clinico e laboratorio"],
          ]}
        />
      </Section>

      <Section title="Come si arriva dal 2D al mock-up?">
        <p>La simulazione è un'immagine 2D: serve a far vedere e discutere una proposta. Nel software CAD il laboratorio sovrappone scansione, foto originale e foto simulata e su quel riferimento modella la ceratura digitale, copiando in tre dimensioni ciò che la simulazione mostra. Il risultato dipende dall'accuratezza della valutazione di fattibilità del clinico e dalla bravura dell'odontotecnico.</p>
      </Section>

      <Section title="Che cos'è l'injection technique e come si svolge?">
        <p>È una tecnica additiva che usa due materiali: un silicone trasparente per la mascherina e un composito iniettabile. Il manuale di un produttore <Rif n={1} /> (un manuale, non una prova di efficacia) la descrive così. Si parte da una ceratura diagnostica e si ricavano modelli stampati in 3D e mascherine di silicone trasparente di spessore minimo 3-4 mm. In bocca: isolamento con diga, mordenzatura selettiva dello smalto per 30 secondi, adesivo, un foro di accesso nella mascherina, iniezione del composito, polimerizzazione, rimozione dei residui, rifinitura e lucidatura <Rif n={1} />.</p>
        <p>Si lavora con due mascherine, a denti alternati <Rif n={1} />. La prima riproduce un dente sì e uno no: accanto a ogni dente modellato resta il dente naturale del paziente. Si inietta il composito su questi primi denti; poi si mette il teflon fra un dente e l'altro e si passa alla seconda mascherina, che ha la ceratura completa, per iniettare i denti rimasti. Così ogni dente resta singolo: i denti non si incollano l'uno all'altro, resta lo spazio per il filo interdentale e i micromovimenti di ciascun dente non rompono il manufatto, come potrebbe accadere se i denti fossero uniti fra loro come in un ponte.</p>
      </Section>

      <Section title="Mock-up, injection technique o faccette: in che ordine?">
        <p>Dipende dal caso. Mock-up e injection technique usano entrambi una mascherina di silicone, ma in modo diverso: nel mock-up il materiale si mette dentro una mascherina normale e si porta in bocca; nell'injection technique si inietta con la siringa attraverso una mascherina trasparente. Il mock-up è provvisorio e serve a provare il progetto; l'injection technique è definitiva, ma in genere non dura quanto le faccette. Si incontrano tre combinazioni:</p>
        <Elenco>
          <li>mock-up e poi injection technique;</li>
          <li>solo injection technique;</li>
          <li>mock-up e poi faccette.</li>
        </Elenco>
      </Section>

      <Section title="Quanto dura un restauro con injection technique?">
        <p>Non c'è un numero valido per tutti. Dipende dal materiale (la durata dichiarata la indica il produttore), dalla valutazione clinica, dall'occlusione e dalle abitudini del paziente: con cattive abitudini può durare molto meno. Vale lo stesso per le faccette. Quelle in disilicato o in composito hanno spesso una durata dichiarata del materiale maggiore.</p>
      </Section>

      <Section title="Dove si colloca SmileLive">
        <p>SmileLive sta all'inizio del percorso. Da una foto genera con l'IA una simulazione del sorriso (mock-up digitale), in foto e in video; richiede circa un minuto. È uno strumento di comunicazione con il paziente e non sostituisce diagnosi né progettazione clinica. La «Vista clinica» sovrappone la scansione 3D alla foto, per facilitare l'analisi e la verifica di fattibilità. Per il momento SmileLive non esegue ceratura, non fa misure e non esporta pacchetti per il laboratorio: dà al clinico il necessario per valutare la fattibilità delle simulazioni proposte. Ogni immagine generata è contrassegnata come generata con IA. Prova gratuita: 2 foto e 2 video, senza carta di credito.</p>
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
            prima="GC Italia. "
            titolo="Injection Moulding Technique. Guida clinica"
            dopo=" (documento del produttore, senza anno nel testo)."
            url="https://www.gc.dental/europe/sites/europe.gc.dental/files/products/downloads/gaenialuniversalinjectable/manual/MAN_Injection_Moulding_Technique_Clinical_Guide_it.pdf"
          />
        </ElencoFonti>
      </Section>
    </GuidaLayout>
  );
}
