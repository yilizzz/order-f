import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import Cart from "../../components/Cart";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";

import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

const Payment = (props) => {
  const { stripePromise } = props;
  const [clientSecret, setClientSecret] = useState("");
  const [name, setName] = useState();
  var templateParams = {
    order_page: "chinese name service",
    name: name,
    email_address: "ww@ww.com",
  };

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    // fetch("http://localhost:3001/payment/create-payment-intent")
    //   .then((res) => res.json())
    //   .then(({ clientSecret }) => setClientSecret(clientSecret));
    emailjs.init("9gc1b1M2bIt0hI0jl");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.send("service_xchoq99", "template_96yskkf", templateParams).then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);
      },
      function (error) {
        console.log("FAILED...", error);
      }
    );
    const confirmTemplateParams = {
      // 这里添加确认邮件的参数，如用户的名字、确认信息等
      client_email: "yilizhang3@gmail.com",
    };

    emailjs
      .send("service_xchoq99", "template_bpk3hu6", confirmTemplateParams)
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <div>
      <Cart />
      <InputText
        placeholder="Your name"
        onChange={(e) => setName(e.target.value)}
      />
      <Button onClick={handleSubmit}>Submit</Button>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};
export default Payment;
