import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Core from "./core.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Core />
  </StrictMode>
);
