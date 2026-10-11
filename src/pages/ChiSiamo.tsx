import GuidaLayout, { Elenco, LinkEsterno, LinkInterno, Section } from "@/components/GuidaLayout";

const stileMail = "text-primary underline underline-offset-2 hover:opacity-80 break-words";

export default function ChiSiamo() {
  return (
    <GuidaLayout
      titolo="Chi siamo: la famiglia di odontotecnici dietro SmileLive"
      aggiornato="11 ottobre 2026"
      posizione="chi_siamo"
      firma={false}
      inBreve={
        <>
          SmileLive è un software per studi dentistici ideato da Giampiero Lombardi, in una famiglia di odontotecnici, con sede a Casamassima (Bari). Nasce dall'esperienza reale dei laboratori odontotecnici con i loro studi dentistici. Il protocollo in sette fasi è stato pensato da Giuseppe Lombardi, esperto di CAD/CAM e stampa 3D.
        </>
      }
    >
      <Section title="Da dove nasce SmileLive?">
        <p>Giampiero Lombardi ha quattro anni di esperienza nel settore odontotecnico. Ha conosciuto diverse realtà odontotecniche e vi ha notato difficoltà di comunicazione e di ordine. Per questo ha sviluppato SmileLive, basandosi sull'esperienza reale dei laboratori con i loro studi dentistici.</p>
        <p>Nel software questo si vede in due punti: la simulazione del sorriso, che mostra al paziente il possibile risultato sul suo viso, e gli strumenti che tengono in ordine il lavoro fra studio e laboratorio, come la prescrizione vocale e il portale per il laboratorio.</p>
      </Section>

      <Section title="Chi c'è dietro SmileLive?">
        <Elenco>
          <li><strong>Giampiero Lombardi</strong>: fondatore e ideatore di SmileLive. Ha quattro anni di esperienza nel settore odontotecnico.</li>
          <li><strong>Giuseppe Lombardi</strong>: esperto di CAD/CAM e stampa 3D, con più di otto anni di esperienza. È la mente del <LinkInterno to="/protocollo">protocollo SmileLive</LinkInterno>. Lavora in un laboratorio odontotecnico di Bari.</li>
          <li><strong>Nicola Lombardi</strong>: odontotecnico, con più di quarant'anni di esperienza. Ha avuto laboratori odontotecnici e studi dentistici; oggi fa ricerca in autonomia.</li>
        </Elenco>
        <p>Giuseppe è il fratello di Giampiero, Nicola è il padre.</p>
      </Section>

      <Section title="Chi scrive le guide di questo sito?">
        <p>Le guide e la pagina sul protocollo sono a cura di Giampiero Lombardi e nascono dall'esperienza di laboratorio della famiglia. Il punto di vista è quello dell'odontotecnico. Sono testi rivolti a professionisti e non sostituiscono la valutazione clinica dell'odontoiatra, a cui restano diagnosi e piano di cura.</p>
      </Section>

      <Section title="Webinar per dentisti e odontotecnici">
        <p>Stiamo preparando dei webinar per dentisti e odontotecnici, una pagina LinkedIn e un canale YouTube. Vuoi sapere quando partono? Scrivi a <a href="mailto:supporto@smilelive.it?subject=Webinar%20SmileLive" className={stileMail}>supporto@smilelive.it</a> con oggetto «Webinar»: ti mandiamo le novità.</p>
      </Section>

      <Section title="Contatti e dati dell'impresa">
        <Elenco>
          <li>SmileLive è sviluppato e gestito da Giampiero Lombardi, ditta individuale.</li>
          <li>Sede: Casamassima (BA), Italia.</li>
          <li>Partita IVA: 09125450727.</li>
          <li>Email: <a href="mailto:supporto@smilelive.it" className={stileMail}>supporto@smilelive.it</a>.</li>
          <li>Instagram: <LinkEsterno href="https://www.instagram.com/smilelive.it">@smilelive.it</LinkEsterno>.</li>
        </Elenco>
      </Section>

      <Section title="Per approfondire">
        <Elenco>
          <li><LinkInterno to="/protocollo">Protocollo SmileLive: dalla foto al manufatto</LinkInterno></li>
          <li><LinkInterno to="/guide/progettazione-digitale-del-sorriso">Progettazione digitale del sorriso</LinkInterno></li>
          <li><LinkInterno to="/guide/mock-up-digitale-injection-technique">Mock-up digitale, mock-up fisico e injection technique</LinkInterno></li>
          <li><LinkInterno to="/guide/far-accettare-piu-preventivi">Far accettare più preventivi</LinkInterno></li>
          <li><LinkInterno to="/guide/simulazione-faccette-implantologia-protesi">Simulazione per faccette, implantologia, protesi</LinkInterno></li>
          <li><LinkInterno to="/">Prova gratuita di SmileLive</LinkInterno></li>
        </Elenco>
      </Section>
    </GuidaLayout>
  );
}
