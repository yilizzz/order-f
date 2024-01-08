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
    <div className="fullPage">
      <div className="main">
        <Banner />
        <span className="w-11 h-3rem mt-5 text-orange-800 text-center">
          During the pre-opening period, please use your gift card number to pay
          :
        </span>
        <span className="w-11 h-3rem mt-2 text-orange-800 text-center">
          4242 4242 4242 4242
        </span>
        {clientSecret && stripePromise && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm />
          </Elements>
        )}

        <a
          className="w-10rem h-6rem text-2xl flex justify-content-center align-items-center"
          href="/"
        >
          <i className="pi pi-home text-4xl"></i>HOME
        </a>
      </div>
      <Footer />
    </div>
  );
};
export default Payment;
