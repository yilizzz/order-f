import React, { useState } from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import StripeProvider from "./context/stripe";
import { PrimeReactProvider } from "primereact/api";
import { LanguageContext } from "./context/language";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "./styles/globals.css";

function Root() {
  const [language, setLanguage] = useState("Français");

  return (
    <React.StrictMode>
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <PrimeReactProvider>
          <Provider store={store}>
            <StripeProvider>
              <App />
            </StripeProvider>
          </Provider>
        </PrimeReactProvider>
      </LanguageContext.Provider>
    </React.StrictMode>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<Root />);
