import { configureStore } from "@reduxjs/toolkit";
import platReducer from "./modules/platStore";
import accountReducer from "./modules/accountStore";

const store = configureStore({
  reducer: {
    plat: platReducer,
    account: accountReducer,
  },
});

export default store;
