import { describe, expect, it } from "vitest";
import { appLink, readUtm } from "@/lib/utm";

describe("readUtm", () => {
  it("legge i cinque utm_* e toglie il prefisso", () => {
    expect(
      readUtm("?utm_source=facebook&utm_medium=paid&utm_campaign=dentisti-pagina&utm_content=video&utm_term=dentista"),
    ).toEqual({ source: "facebook", medium: "paid", campaign: "dentisti-pagina", content: "video", term: "dentista" });
  });

  it("ignora gli altri parametri e quelli vuoti", () => {
    expect(readUtm("?fbclid=abc&utm_source=facebook&utm_medium=&utm_altro=x")).toEqual({ source: "facebook" });
  });

  it("senza parametri restituisce un oggetto vuoto", () => {
    expect(readUtm("")).toEqual({});
  });

  it("decodifica i valori", () => {
    expect(readUtm("?utm_campaign=a%26b%20c")).toEqual({ campaign: "a&b c" });
  });
});

describe("appLink", () => {
  it("porta gli UTM sul link dell'app e lascia fuori il resto", () => {
    expect(appLink("?utm_source=facebook&utm_medium=paid&utm_campaign=dentisti-modulo&fbclid=abc")).toBe(
      "https://app.smilelive.it/?utm_source=facebook&utm_medium=paid&utm_campaign=dentisti-modulo",
    );
  });

  it("senza UTM è il link semplice dell'app", () => {
    expect(appLink("")).toBe("https://app.smilelive.it/");
  });

  it("codifica i valori", () => {
    expect(appLink("?utm_campaign=a%26b%20c")).toBe("https://app.smilelive.it/?utm_campaign=a%26b+c");
  });
});
