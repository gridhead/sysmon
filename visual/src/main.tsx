import "./cssc/core.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import Core from "./core.tsx";
import { data } from "./util/data.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={data}>
    <StrictMode>
      <Core />
    </StrictMode>
  </Provider>
);
