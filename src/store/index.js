import { configureStore } from "@reduxjs/toolkit";
import serviceReducer from "./modules/serviceStore";
import accountReducer from "./modules/accountStore";

const store = configureStore({
  reducer: {
    service: serviceReducer,
    account: accountReducer,
  },
});

export default store;
