import { PaymentElement } from "@stripe/react-stripe-js";
import { useDispatch } from "react-redux";
import { useState, useContext } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { StripeContext } from "../../context/stripe";
import { saveCartToLocalStorage } from "../../store/modules/serviceStore";
import "./CheckoutForm.css";
import { LanguageContext } from "../../context/language";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { customer } = useContext(StripeContext);
  const { language } = useContext(LanguageContext);
  const lang = language === "English" ? "en" : "fr";
  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(saveCartToLocalStorage());
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Context state will be lost after redirecting
        return_url: `${window.location.origin}/completion?name=${customer.name}&email=${customer.email}&lang=${lang}`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }
    setIsLoading(false);
  };

  return (
    <form id="paymentForm" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button
        className="payButton"
        disabled={isLoading || !stripe || !elements}
        id="submit"
      >
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
