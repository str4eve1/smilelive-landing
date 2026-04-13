import { createRoot } from "react-dom/client";
import { SpeedInsights } from "@vercel/speed-insights/react";
import App from "./App.tsx";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <>
    <App />
    <SpeedInsights />
  </>
);
