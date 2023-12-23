import { createContext, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

export const StripeContext = createContext();

export default function StripeProvider({ children }) {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [customer, setCustomer] = useState(null);

  const config = async () => {
    fetch("http://localhost:3001/payment/config").then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  };
  const createIntent = async (name, email) => {
    fetch("http://localhost:3001/payment/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    })
      .then((res) => res.json())
      .then(({ clientSecret, customer }) => {
        setClientSecret(clientSecret);
        setCustomer(customer);
      });
  };

  return (
    <StripeContext.Provider
      value={{ stripePromise, clientSecret, customer, config, createIntent }}
    >
      {children}
    </StripeContext.Provider>
  );
}
