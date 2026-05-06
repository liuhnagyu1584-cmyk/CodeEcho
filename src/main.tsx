import "./assets/css/reset.css";
import "./assets/css/main.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./router/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppRouter></AppRouter>
  </StrictMode>,
);
