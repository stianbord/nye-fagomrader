import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@bi-digital/css/dist/index.css";
import "@bi-digital/css/dist/components.css";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
