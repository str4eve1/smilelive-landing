import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Camera, CaretRight, Eye, Gift, Info,
  Sparkle, Tooth, UserFocus, WhatsappLogo,
} from "@phosphor-icons/react";
import logoFinale from "@/assets/WEBP/SmileLive FINALE senza sfondo COLORI CORRETTI (1).webp";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import { trackCta } from "@/lib/analytics";
import { openCookieBanner } from "@/lib/consent";

/**
 * Pagina pubblica rivolta ai PAZIENTI (traffico Facebook).
 * La home "/" resta il funnel B2B per gli studi: qui non si vende nulla.
 *
 * Vincoli di contenuto (legge 145/2018 commi 525 e 536, mod. 103/2023 —
 * pubblicità sanitaria solo informativa). NON modificare senza rileggerli:
 *  - "gratuita" si attacca SOLO alla parola "simulazione";
 *  - le parole "visita" e "consulenza" non devono comparire;
 *  - niente prezzi, nemmeno indicativi; niente promesse di risultato;
 *  - niente foto prima/dopo di denti;
 *  - le condizioni si descrivono in terza persona ("chi porta…", non "se hai…");
 *  - gli studi non sono mai "rete", "canale" o "partner": sono professionisti
 *    autonomi che usano la tecnologia.
 */

// Oggi coincide col numero del funnel studi (default di WhatsAppWidget).
// ponytail: unico punto da cambiare quando ci sarà una casella dedicata ai pazienti.
const PHONE = "393289598557";

const WA_MESSAGES = [
  { emoji: "ℹ️", text: "Ciao, vorrei informazioni sulla simulazione del sorriso." },
  { emoji: "🦷", text: "Ciao, vorrei sapere come funziona la simulazione del sorriso." },
];

const waHref = (text: string) =>
  `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;

// ─── Contenuti ─────────────────────────────────────────────────────────────

const PASSAGGI = [
  {
    Icon: Camera,
    titolo: "Una foto",
    testo: "In studio il dentista scatta una foto del sorriso. Non serve altro.",
  },
  {
    Icon: Sparkle,
    titolo: "L'elaborazione",
    testo:
      "SmileLive elabora l'immagine con l'intelligenza artificiale e costruisce l'anteprima, sul momento.",
  },
  {
    Icon: Eye,
    titolo: "Il possibile risultato",
    testo:
      "L'anteprima si guarda insieme al dentista: cosa si potrebbe fare, cosa no, cosa cambierebbe. Poi si decide con calma.",
  },
];

const MANUFATTI = [
  {
    nome: "Faccette",
    cosa: "Sottili rivestimenti in ceramica o composito, applicati sulla superficie esterna dei denti che si vedono quando si sorride.",
    serve:
      "A modificare l'aspetto del dente — forma, colore, dimensione — lasciandolo al suo posto: si lavora solo sulla faccia visibile.",
    quando:
      "Quando il tema è estetico e i denti sono sani: piccole scheggiature, macchie che non vanno via, spazi o forme irregolari nella zona del sorriso.",
  },
  {
    nome: "Corona (capsula)",
    cosa: "Un rivestimento che copre il dente per intero, come un cappuccio, e ne ricostruisce la parte visibile.",
    serve:
      "A proteggere e rimettere in funzione un dente che c'è ancora ma è indebolito. La faccetta riveste solo la faccia esterna, la corona avvolge il dente tutto intorno.",
    quando:
      "Quando un dente è molto ricostruito, fratturato o devitalizzato, e una semplice otturazione non basta più a tenerlo insieme.",
  },
  {
    nome: "Ponte",
    cosa: "Una struttura fissa che rimpiazza uno o più denti mancanti appoggiandosi ai denti vicini, preparati per fare da pilastri.",
    serve:
      "A richiudere uno spazio vuoto senza intervenire sull'osso. Una volta cementato non si toglie: lo rimuove solo il dentista.",
    quando:
      "Quando manca un dente e quelli ai lati sono in condizione di reggere il carico anche per lui.",
  },
  {
    nome: "Impianti",
    cosa: "Una piccola vite, di solito in titanio, inserita nell'osso: prende il posto della radice del dente che non c'è più.",
    serve:
      "A fare da appoggio a un dente nuovo. Sopra l'impianto si applica una corona; con più impianti si possono sostenere un ponte o un'arcata intera. I denti vicini non vengono toccati.",
    quando:
      "Quando mancano uno o più denti e si cerca una soluzione fissa che non coinvolga i denti accanto. Serve osso sufficiente, e questo lo stabilisce il dentista con gli esami del caso.",
  },
];

const PROTESI = [
  {
    nome: "Protesi mobile",
    cosa: "Un manufatto che sostituisce più denti, o un'arcata intera, e che la persona può togliere e rimettere.",
    serve:
      "A restituire masticazione e aspetto quando le assenze sono estese. Si appoggia sulla gengiva e, se restano denti naturali, si aggancia a loro.",
    quando:
      "Quando mancano molti denti, o quando si preferisce una strada meno invasiva.",
  },
  {
    nome: "Protesi fissa",
    cosa: "Un manufatto che sostituisce i denti mancanti restando ancorato stabilmente in bocca: a denti naturali preparati, come nel ponte, oppure a degli impianti.",
    serve:
      "A rimettere i denti mancanti senza doverli togliere per la pulizia: l'igiene si fa in bocca, come sui denti naturali.",
    quando:
      "Quando ci sono denti pilastro in buone condizioni, oppure quando si possono inserire impianti.",
  },
];

const DIFFERENZE = [
  {
    nome: "Mobile",
    punti: [
      "Si toglie ogni giorno per l'igiene.",
      "Scarica il peso soprattutto sulla gengiva.",
      "Chi la porta può sentirla muoversi mangiando o parlando, e ha bisogno di un periodo di adattamento.",
      "La gengiva cambia forma nel tempo: servono controlli e ritocchi periodici.",
    ],
  },
  {
    nome: "Fissa",
    punti: [
      "Resta in bocca: la rimuove solo il dentista.",
      "Scarica il peso su denti preparati o su impianti.",
      "La sensazione è più vicina a quella dei denti naturali.",
      "Richiede pilastri adatti o impianti, quindi valutazioni preliminari e tempi più lunghi.",
    ],
  },
];

const MOTIVI = [
  {
    titolo: "Diventa concreto",
    testo:
      "Faccetta, corona, impianto sono parole tecniche. Un'immagine rende visibile quello che a voce resta astratto.",
  },
  {
    titolo: "Le domande vengono meglio",
    testo:
      "Con una proposta davanti agli occhi è più facile dire cosa convince e cosa no, e chiedere il perché.",
  },
  {
    titolo: "Non impegna a nulla",
    testo:
      "L'anteprima è un punto di partenza per parlarne, non un percorso già iniziato. La simulazione è gratuita.",
  },
];

// ─── Blocchi riutilizzati ──────────────────────────────────────────────────

/** Titolo di sezione: kicker + h2 + sottotitolo, stessa gerarchia della home. */
const SectionHead = ({
  kicker, titolo, sottotitolo,
}: { kicker: string; titolo: React.ReactNode; sottotitolo?: string }) => (
  <div className="max-w-2xl">
    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">{kicker}</span>
    <h2 className="mt-3 text-2xl sm:text-4xl font-headline font-bold tracking-tight leading-[1.15] text-text-main">
      {titolo}
    </h2>
    {sottotitolo && (
      <p className="mt-3 text-base sm:text-lg text-text-muted leading-relaxed">{sottotitolo}</p>
    )}
  </div>
);

/** Scheda di un manufatto: cos'è / a cosa serve / quando se ne parla. */
const SchedaManufatto = ({
  nome, cosa, serve, quando,
}: { nome: string; cosa: string; serve: string; quando: string }) => (
  <article className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
    <h3 className="flex items-center gap-2 text-lg sm:text-xl font-headline font-bold text-text-main">
      <Tooth size={20} weight="light" className="shrink-0 text-primary" aria-hidden="true" />
      {nome}
    </h3>
    <dl className="mt-4 space-y-3 text-sm sm:text-base leading-relaxed">
      {([["Cos'è", cosa], ["A cosa serve", serve], ["Quando se ne parla", quando]] as const).map(
        ([label, testo]) => (
          <div key={label}>
            <dt className="text-[11px] font-bold uppercase tracking-widest text-primary/80">{label}</dt>
            <dd className="mt-1 text-text-muted">{testo}</dd>
          </div>
        )
      )}
    </dl>
  </article>
);

// ─── Pagina ────────────────────────────────────────────────────────────────

export default function Simulazione() {
  useEffect(() => {
    document.title = "Simulazione del sorriso · SmileLive";
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-background font-body text-text-main">
      {/* Header: solo logo, senza nav. Il visitatore arriva da una campagna
          pazienti: non va spinto dentro il funnel per studi. */}
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center px-5 py-3 sm:px-6">
          <img src={logoFinale} alt="SmileLive" className="h-9 w-auto sm:h-11" width="150" height="44" />
        </div>
      </header>

      {/* 1 — Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-white to-sky-50/60">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(70% 55% at 80% 10%, rgba(56,189,248,0.16), transparent 70%)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-5xl px-5 pb-14 pt-12 sm:px-6 sm:pb-20 sm:pt-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-white/95 px-3 py-1.5 text-xs font-bold text-primary shadow-[0_6px_20px_rgba(2,132,199,0.16)] sm:text-sm">
            <Sparkle size={15} weight="fill" className="text-gold" aria-hidden="true" />
            Simulazione del sorriso
          </span>

          <h1 className="mt-5 max-w-[16ch] text-3xl font-headline font-bold leading-[1.12] tracking-tight text-text-main sm:text-5xl md:text-6xl">
            Vedere il <span className="text-primary">possibile risultato</span> prima di decidere.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg">
            La simulazione del sorriso è un'anteprima: dalla foto del sorriso, il dentista mostra in
            studio come potrebbe cambiare l'aspetto dei denti, prima di iniziare qualsiasi percorso.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={waHref(WA_MESSAGES[0].text)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCta("whatsapp", "simulazione_hero")}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-primary px-6 py-3.5 text-base font-bold text-white shadow-[0_8px_32px_rgba(2,132,199,0.4)] transition-shadow duration-300 hover:shadow-[0_8px_48px_rgba(2,132,199,0.6)]"
            >
              <WhatsappLogo size={20} weight="fill" aria-hidden="true" />
              Scrivici su WhatsApp
            </a>
            <a
              href="#guida"
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-white px-6 py-3.5 text-base font-bold text-text-main transition-colors hover:border-slate-300"
            >
              Leggi la guida
              <CaretRight size={15} weight="bold" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* 2 — Come funziona */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <SectionHead
            kicker="Come funziona"
            titolo={<>Tre passaggi, <span className="text-primary">tutti in studio.</span></>}
          />
          <ol className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-3 sm:gap-6">
            {PASSAGGI.map(({ Icon, titolo, testo }, i) => (
              <li
                key={titolo}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon size={20} weight="light" aria-hidden="true" />
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-primary/70">
                    Passaggio {i + 1}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-headline font-bold text-text-main">{titolo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted sm:text-base">{testo}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 3 — Chi la esegue */}
      <section className="bg-gradient-to-b from-sky-50/70 to-white py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
            <div className="flex items-start gap-4">
              <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary sm:flex">
                <UserFocus size={24} weight="light" aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-2xl font-headline font-bold tracking-tight text-text-main sm:text-3xl">
                  La esegue il dentista, nel suo studio.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-text-muted sm:text-lg">
                  SmileLive è la tecnologia che il dentista usa per costruire l'anteprima. Non siamo
                  uno studio dentistico e non eseguiamo prestazioni sanitarie: il rapporto, le
                  valutazioni e le scelte cliniche restano fra la persona e il suo dentista.
                </p>
                <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-2 text-sm font-bold text-gold-dim sm:text-base">
                  <Gift size={17} weight="light" aria-hidden="true" />
                  La simulazione è gratuita.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 — Guida ai manufatti (cuore della pagina) */}
      <section id="guida" className="scroll-mt-4 bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <SectionHead
            kicker="Guida"
            titolo={<>Le parole che si sentono in studio, <span className="text-primary">spiegate.</span></>}
            sottotitolo="Faccette, corone, ponti, impianti, protesi: cosa sono, a cosa servono e in quali casi se ne parla. Niente consigli, solo informazione."
          />

          <div className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6">
            {MANUFATTI.map((m) => (
              <SchedaManufatto key={m.nome} {...m} />
            ))}
          </div>

          {/* Protesi: le due schede + il confronto, che è la domanda vera */}
          <h3 className="mt-12 text-xl font-headline font-bold tracking-tight text-text-main sm:mt-16 sm:text-2xl">
            Protesi mobile e protesi fissa
          </h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 sm:gap-6">
            {PROTESI.map((m) => (
              <SchedaManufatto key={m.nome} {...m} />
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-primary/20 bg-sky-50/70 p-5 sm:p-8">
            <h4 className="text-base font-headline font-bold text-text-main sm:text-lg">
              Cosa cambia davvero fra le due
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-text-muted sm:text-base">
              La differenza non è solo tecnica: si sente nella vita di tutti i giorni.
            </p>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 sm:gap-8">
              {DIFFERENZE.map(({ nome, punti }) => (
                <div key={nome}>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-primary">{nome}</span>
                  <ul className="mt-3 space-y-2.5">
                    {punti.map((p) => (
                      // Pallino neutro, non una spunta: sono caratteristiche, non vantaggi.
                      <li key={p} className="flex gap-2.5 text-sm leading-relaxed text-text-muted sm:text-base">
                        <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Chiusura obbligata della sezione informativa */}
          <p className="mt-8 flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-relaxed text-text-muted sm:text-base">
            <Info size={19} weight="light" className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
            <span>
              <strong className="font-bold text-text-main">
                Solo il tuo dentista può dirti cosa è adatto al tuo caso.
              </strong>{" "}
              Questa guida serve ad arrivare in studio sapendo di cosa si parla, non a sostituire il
              suo parere.
            </span>
          </p>
        </div>
      </section>

      {/* 5 — Perché vederlo prima */}
      <section className="bg-gradient-to-b from-white to-sky-50/60 py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <SectionHead kicker="Perché vederlo prima" titolo="Un'immagine cambia la conversazione." />
          <div className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-3 sm:gap-6">
            {MOTIVI.map(({ titolo, testo }) => (
              <div key={titolo} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <h3 className="text-base font-headline font-bold text-text-main sm:text-lg">{titolo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted sm:text-base">{testo}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — CTA WhatsApp */}
      <section className="bg-sky-50/60 py-14 text-center sm:py-20">
        <div className="mx-auto max-w-2xl px-5 sm:px-6">
          <h2 className="text-2xl font-headline font-bold leading-tight tracking-tight text-text-main sm:text-4xl">
            Una domanda sulla simulazione?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-muted sm:text-lg">
            Scrivici su WhatsApp: spieghiamo com'è fatta l'anteprima e come si svolge. Per tutto ciò
            che riguarda i denti, il riferimento resta il dentista.
          </p>
          <a
            href={waHref(WA_MESSAGES[0].text)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCta("whatsapp", "simulazione_cta")}
            className="mt-8 inline-flex items-center justify-center gap-2.5 rounded-full bg-primary px-7 py-4 text-base font-bold text-white shadow-[0_8px_40px_rgba(2,132,199,0.45)] transition-shadow duration-300 hover:shadow-[0_8px_60px_rgba(2,132,199,0.65)] sm:text-lg"
          >
            <WhatsappLogo size={22} weight="fill" aria-hidden="true" />
            Scrivici su WhatsApp
          </a>
        </div>
      </section>

      {/* 7 — Footer minimo + rimando al funnel studi */}
      <footer className="border-t border-slate-200 bg-white py-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 px-5 text-center sm:px-6">
          <Link
            to="/"
            onClick={() => trackCta("switch_b2b", "simulazione_footer")}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-opacity hover:opacity-75"
          >
            Sei un odontoiatra?
            <ArrowRight size={14} weight="bold" aria-hidden="true" />
          </Link>

          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-text-muted">
            <Link to="/privacy" className="transition-colors hover:text-primary">Privacy Policy</Link>
            <span aria-hidden="true">·</span>
            <Link to="/cookie-policy" className="transition-colors hover:text-primary">Cookie Policy</Link>
            <span aria-hidden="true">·</span>
            <Link to="/terms" className="transition-colors hover:text-primary">Termini di Servizio</Link>
            <span aria-hidden="true">·</span>
            <button type="button" onClick={openCookieBanner} className="transition-colors hover:text-primary">
              Gestione cookie
            </button>
          </div>

          <p className="text-xs text-text-muted/60">
            © {new Date().getFullYear()} SmileLive. Tutti i diritti riservati.
          </p>
        </div>
      </footer>

      <WhatsAppWidget phone={PHONE} messages={WA_MESSAGES} />
    </main>
  );
}
