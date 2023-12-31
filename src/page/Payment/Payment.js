import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { useContext } from "react";
import React from "react";
import { StripeContext } from "../../context/stripe";
import Banner from "../../components/Banner";
import Footer from "../../components/Footer";

const Payment = () => {
  const { stripePromise, clientSecret } = useContext(StripeContext);
  return (
    <div className="w-full h-full flex flex-column justify-content-start align-items-center">
      <Banner />

      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}

      <a
        className="w-10rem h-6rem text-3xl flex justify-content-center align-items-center"
        href="/"
      >
        <i className="pi pi-home text-4xl"></i>HOME
      </a>

      <Footer />
    </div>
  );
};
export default Payment;
