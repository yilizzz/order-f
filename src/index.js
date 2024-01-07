import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import StripeProvider from "./context/stripe";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "./styles/globals.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PrimeReactProvider>
      <Provider store={store}>
        <StripeProvider>
          <App />
        </StripeProvider>
      </Provider>
    </PrimeReactProvider>
  </React.StrictMode>
);
