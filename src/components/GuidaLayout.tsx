/*
 * COME SI SCRIVE UNA PAGINA DI CONTENUTO (protocollo, guide). Modello: pages/guide/MockUpDigitaleInjectionTechnique.tsx
 * - Cornice: <GuidaLayout titolo="<h1>" aggiornato="10 ottobre 2026" posizione="guida_nome" inBreve={...} nota={...}>.
 *   `inBreve` è il testo del paragrafo «In breve» (nel riquadro; non ripetere il titolo); `nota` è la riga piccola a piè di pagina, se la bozza ne ha una.
 * - Ogni «## titolo» della bozza è una <Section title="...">; ogni «### titolo» una <Subsection>; i paragrafi sono <p>; **grassetto** è <strong>.
 * - Tabella: <Tabella colonne={["A", "B"]} righe={[[..., ...], ...]} />; la prima cella di ogni riga è l'intestazione di riga. Cella vuota: "".
 * - Elenchi: <Elenco> per i puntati, <ElencoNumerato> per i numerati, con <li> dentro (i collegamenti interni stanno in <li>).
 * - Rimando a una fonte nel testo: <Rif n={1} /> per «[1]», <Rif n={[1, 3]} /> per «[1][3]» (anche dentro tabelle e «In breve»).
 * - Fonti: <Section title="Fonti"><ElencoFonti><Fonte n={1} prima="Autori. " titolo="Titolo" dopo=". Rivista, anno. DOI …." url="…" /></ElencoFonti></Section>
 *   (`prima` e `dopo` sono il testo prima e dopo il titolo, che è il collegamento; l'indirizzo scritto per esteso nella bozza non si ripete).
 * - Rimandi interni: <LinkInterno to="/percorso">testo</LinkInterno>; esterni: <LinkEsterno href="…">testo</LinkEsterno>.
 * Il testo si trascrive parola per parola dalla bozza; <title>, descrizione e dati strutturati vengono da src/seo/pagine.ts (non qui).
 */
import { ReactNode, useEffect } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { trackCta } from "@/lib/analytics";
import { PiedeSito, Section, Subsection, TestataSito } from "./LegalLayout";

export { Section, Subsection };

const URL_PROVA = "https://app.smilelive.it/";

type GuidaLayoutProps = {
  titolo: string;
  aggiornato: string;
  posizione: string;
  inBreve: ReactNode;
  nota?: ReactNode;
  children?: ReactNode;
};

export default function GuidaLayout({ titolo, aggiornato, posizione, inBreve, nota, children }: GuidaLayoutProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [titolo]);

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-background text-text-main font-['Inter']">
      <TestataSito />

      <article className="max-w-3xl mx-auto px-6 py-10 md:py-16">
        <header className="mb-8">
          <h1 className="font-headline font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight leading-tight mb-3 [text-wrap:balance]">
            {titolo}
          </h1>
          <p className="text-sm text-text-muted">Aggiornato il {aggiornato}</p>
        </header>

        <section className="mb-10 rounded-xl border border-primary/20 border-l-4 border-l-primary bg-primary/5 px-5 py-4 md:px-6 md:py-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-primary mb-2">In breve</h2>
          <p className="text-text-main leading-relaxed text-base md:text-lg">{inBreve}</p>
        </section>

        <div className="guida-contenuto text-text-muted leading-relaxed text-base space-y-5 [&_strong]:font-semibold [&_strong]:text-text-main [&_section]:scroll-mt-4">
          {children}
        </div>

        <aside className="mt-14 rounded-2xl border border-secondary/15 bg-surface px-6 py-8 text-center">
          <a
            href={URL_PROVA}
            onClick={() => trackCta("prova_gratis", posizione)}
            className="inline-block rounded-full bg-primary px-6 py-3.5 text-[15px] font-semibold leading-snug text-white shadow-sm transition-opacity hover:opacity-90 sm:px-7 sm:text-base [text-wrap:balance]"
          >
            Prova gratis: 5 foto e 2 video
          </a>
          <p className="mt-3 text-sm text-text-muted">senza carta di credito</p>
        </aside>

        {nota && <p className="mt-10 text-xs leading-relaxed text-text-muted/80">{nota}</p>}
      </article>

      <PiedeSito />
    </main>
  );
}

export function Elenco({ children }: { children: ReactNode }) {
  return <ul className="list-disc pl-6 space-y-2 marker:text-primary/60">{children}</ul>;
}

export function ElencoNumerato({ children }: { children: ReactNode }) {
  return <ol className="list-decimal pl-6 space-y-2 marker:font-semibold marker:text-primary">{children}</ol>;
}

const stileLink = "text-primary underline underline-offset-2 hover:opacity-80 break-words";

export function LinkInterno(props: LinkProps) {
  return <Link {...props} className={stileLink} />;
}

export function LinkEsterno({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={stileLink}>
      {children}
    </a>
  );
}

// «[1]» o «[1][3]» nel testo: porta alla voce dell'elenco «Fonti».
export function Rif({ n }: { n: number | number[] }) {
  return (
    <>
      {(Array.isArray(n) ? n : [n]).map((numero) => (
        <a key={numero} href={`#fonte-${numero}`} className="text-primary no-underline hover:underline">
          [{numero}]
        </a>
      ))}
    </>
  );
}

export function ElencoFonti({ children }: { children: ReactNode }) {
  return <ul className="space-y-3 text-sm leading-relaxed">{children}</ul>;
}

type FonteProps = { n: number; prima?: string; titolo: string; dopo?: string; url: string };

export function Fonte({ n, prima = "", titolo, dopo = "", url }: FonteProps) {
  return (
    <li id={`fonte-${n}`} className="scroll-mt-4 break-words">
      [{n}] {prima}«
      <a href={url} target="_blank" rel="noopener noreferrer" className={stileLink}>
        {titolo}
      </a>
      »{dopo}
    </li>
  );
}

type TabellaProps = { colonne: string[]; righe: ReactNode[][]; descrizione?: string };

// Sopra i 640 px è una tabella; sotto, ogni riga diventa una scheda («Colonna: valore») e la pagina non si allarga.
// Gli attributi role mantengono il significato di tabella anche quando il CSS cambia la visualizzazione.
export function Tabella({ colonne, righe, descrizione }: TabellaProps) {
  return (
    <div className="guida-tabella-contenitore">
      <table className="guida-tabella" role="table" aria-label={descrizione}>
        <thead role="rowgroup">
          <tr role="row">
            {colonne.map((c, i) => (
              <th key={i} scope="col" role="columnheader">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody role="rowgroup">
          {righe.map((riga, r) => (
            <tr key={r} role="row">
              {riga.map((cella, i) =>
                i === 0 ? (
                  <th key={i} scope="row" role="rowheader">
                    {cella}
                  </th>
                ) : (
                  <td key={i} role="cell" data-etichetta={colonne[i]}>
                    {cella}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
