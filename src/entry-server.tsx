import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Writable } from "node:stream";
import { AppRoutes, Provider } from "./App";

export { pagine, canonicoDi, SITO } from "./seo/pagine";
export { datiStrutturatiHome } from "./seo/dati-strutturati";

// HTML della pagina già scritto. Si aspetta che tutto sia pronto (pagine lazy comprese):
// renderToString si fermerebbe al segnaposto.
export function render(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let html = "";
    const uscita = new Writable({
      write(pezzo, _codifica, avanti) {
        html += pezzo;
        avanti();
      },
    });
    uscita.on("finish", () => resolve(html));
    const { pipe } = renderToPipeableStream(
      <Provider>
        <StaticRouter location={url}>
          <AppRoutes />
        </StaticRouter>
      </Provider>,
      {
        onAllReady: () => pipe(uscita),
        onShellError: reject,
        onError: reject,
      },
    );
  });
}
