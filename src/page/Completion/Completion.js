import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import "./Completion.css";

function Completion() {
  const url = new URL(window.location.href);
  const name = url.searchParams.get("name");
  const email = url.searchParams.get("email");
  const [messageBody, setMessageBody] = useState("");
  // const [count, setCount] = useState(10);

  const navigate = useNavigate();

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

    // const timer1 = setInterval(() => {
    //   setCount((prevCount) => prevCount - 1);
    // }, 5000);
    const timer2 = setTimeout(() => {
      navigate("/"); // Navigate to home after 3 seconds
    }, 5000);

    return () => {
      // clearInterval(timer1);
      clearTimeout(timer2);
    }; // Clean up on unmount
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
  }, [name, email, navigate]);

  return (
    <div className="completion">
      <div className="flex flex-column gap-3">
        <h2>Payment successful! Thank you for your order. </h2>
        <h2>We will contact you soon.</h2>
        <h2>Please check your email for the confirmation.</h2>
      </div>
      <div className="homeLink">
        <a
          className="w-10rem h-20rem flex justify-content-center text-3xl"
          href="/"
        >
          <i className="pi pi-home text-4xl"></i>HOME
        </a>
      </div>
      <p>You will be redirected to the home page in 5 seconds.</p>
      <div
        id="messages"
        role="alert"
        style={messageBody ? { display: "block" } : {}}
      >
        {messageBody}
      </div>
    </div>
  );
}

export default Completion;
