import { configureStore } from "@reduxjs/toolkit";

import makeunitReducer from "./part.tsx";

export const data = configureStore({
  reducer: {
    area: makeunitReducer,
  },
});
