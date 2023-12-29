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
    <div className="w-screen h-screen flex gap-3 flex-column justify-content-center align-items-center">
      <Banner />

      <div className="m-5 p-5 h-30rem flex justify-content-center">
        {clientSecret && stripePromise && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
      <a
        className="w-10rem h-20rem flex justify-content-center text-3xl"
        href="/"
      >
        <i className="pi pi-home text-4xl"></i>HOME
      </a>
      <Footer />
    </div>
  );
};
export default Payment;
