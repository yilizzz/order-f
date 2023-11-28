import { configureStore } from "@reduxjs/toolkit";
import platReducer from "./modules/platStore";

const store = configureStore({
  reducer: {
    plat: platReducer,
  },
});

export default store;
