// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AppRoutes } from "@/App";

// Pagine finte: qui conta solo dove porta il router, non cosa mostra la home.
vi.mock("@/pages/IndexV5.tsx", () => ({ default: () => <h1>Home</h1> }));
vi.mock("@/pages/IndexV3.tsx", () => ({ default: () => <h1>Variante v3</h1> }));
vi.mock("@/pages/NotFound.tsx", () => ({ default: () => <h1>Non trovata</h1> }));

const Indirizzo = () => {
  const { pathname, search } = useLocation();
  return <output data-testid="indirizzo">{pathname + search}</output>;
};

const apri = (url: string) =>
  render(
    <MemoryRouter initialEntries={[url]}>
      <AppRoutes />
      <Indirizzo />
    </MemoryRouter>,
  );

afterEach(cleanup);

describe("varianti vecchie della home", () => {
  it.each(["/v1", "/v2", "/v4"])("%s rimanda alla home e tiene gli UTM", async (percorso) => {
    apri(`${percorso}?utm_source=prova`);
    expect(await screen.findByRole("heading", { name: "Home" })).toBeTruthy();
    expect(screen.getByTestId("indirizzo").textContent).toBe("/?utm_source=prova");
  });

  it("/v3 resta dov'è", async () => {
    apri("/v3");
    expect(await screen.findByRole("heading", { name: "Variante v3" })).toBeTruthy();
    expect(screen.getByTestId("indirizzo").textContent).toBe("/v3");
  });
});
