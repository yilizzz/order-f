import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { Image } from "primereact/image";
import icon from "../../assets/favicon.ico";
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
      emailjs.init(`${process.env.REACT_APP_EMAIL_SERVICE_ID}`);
      const templateParams = {
        order_page: "Z company service",
        name: name ? name : email,
        email_address: email,
        cartList: localStorage.getItem("cart"),
      };
      emailjs
        .send(
          `${process.env.REACT_APP_EMAIL_SEND_ID}`,
          `${process.env.REACT_APP_EMAIL_TEMPLATE_ORDER}`,
          templateParams
        )
        .then(
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
        .send(
          `${process.env.REACT_APP_EMAIL_SEND_ID}`,
          `${process.env.REACT_APP_EMAIL_TEMPLATE_CLIENT}`,
          confirmTemplateParams
        )
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
    clearTimeout(timer2);
    // return () => {
    //   // clearInterval(timer1);
    // }; // Clean up on unmount

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
    <div className="page">
      <div className="completion">
        <div className="flex flex-column align-items-center m-3 ">
          <h1>Payment successful!</h1>
          <p> Thank you for your order. </p>
          <p>We will contact you soon.</p>
          <p>Please check your email for the confirmation.</p>
        </div>
        <div className="homeLink">
          <a href="/">
            <Image width="50" height="50" src={icon} alt="Z Service" />
          </a>
          <p>You will be redirected to the home page in 5 seconds.</p>
        </div>

        {/* <div
        id="messages"
        role="alert"
        style={messageBody ? { display: "block" } : {}}
      >
        {messageBody}
      </div> */}
      </div>
    </div>
  );
}

export default Completion;
