import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import emailjs from "@emailjs/browser";
// import { StripeContext } from "../../context/stripe";

function Completion() {
  const url = new URL(window.location.href);
  const name = url.searchParams.get("name");
  const email = url.searchParams.get("email");
  const [messageBody, setMessageBody] = useState("");

  useEffect(() => {
    const sendMailOrderAndConfirmation = () => {
      emailjs.init("9gc1b1M2bIt0hI0jl");
      const templateParams = {
        order_page: "Z company service",
        name: name ? name : email,
        email_address: email,
        cartList: localStorage.getItem("cart"),
      };
      emailjs.send("service_xchoq99", "template_96yskkf", templateParams).then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
      const confirmTemplateParams = {
        client_email: email,
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
    sendMailOrderAndConfirmation();
    // if (!stripePromise) return;

    // stripePromise.then(async (stripe) => {
    //   const url = new URL(window.location);
    //   const clientSecret = url.searchParams.get("payment_intent_client_secret");
    //   const { error, paymentIntent } = await stripe.retrievePaymentIntent(
    //     clientSecret
    //   );

    //   setMessageBody(
    //     error ? (
    //       `> ${error.message}`
    //     ) : (
    //       <>
    //         &gt; Payment {paymentIntent.status}:{" "}
    //         <a
    //           href={`https://dashboard.stripe.com/test/payments/${paymentIntent.id}`}
    //           target="_blank"
    //           rel="noreferrer"
    //         >
    //           {paymentIntent.id}
    //         </a>
    //       </>
    //     )
    //   );
    // });
  }, [name, email]);

  return (
    <>
      <h1>Thank you!</h1>
      <a href="/">home</a>
      <div
        id="messages"
        role="alert"
        style={messageBody ? { display: "block" } : {}}
      >
        {messageBody}
      </div>
    </>
  );
}

export default Completion;
