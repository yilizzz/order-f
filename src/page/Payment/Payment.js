import Cart from "../../components/Cart";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { useContext } from "react";

import React from "react";

import { StripeContext } from "../../context/stripe";

const Payment = () => {
  const { stripePromise, clientSecret } = useContext(StripeContext);
  return (
    <div>
      <a href="/">home</a>
      <Cart />
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};
export default Payment;
