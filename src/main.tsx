import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import Providers from "./context/Providers";
import "./root.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <App/>
    </Providers>
  </StrictMode>,
);
