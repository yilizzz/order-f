import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { Image } from "primereact/image";
import icon from "../../assets/favicon.ico";
import "./Completion.css";
import { messages } from "../../script/langScript";

function Completion() {
  const url = new URL(window.location.href);
  const name = url.searchParams.get("name");
  const email = url.searchParams.get("email");
  const language = url.searchParams.get("lang");

  const navigate = useNavigate();

  useEffect(() => {
    const sendMailOrderAndConfirmation = () => {
      emailjs.init(`${process.env.REACT_APP_EMAIL_SERVICE_ID}`);
      const templateParams = {
        order_page: "Z service",
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
  }, [name, email, navigate]);

  return (
    <div className="cPage">
      <div className="completion">
        <div className="flex flex-column align-items-center m-3 ">
          {language === "en" ? (
            <>
              <h1>{messages.en.completionTipH}</h1>
              <p>{messages.en.completionTipP1}</p>
              <p>{messages.en.completionTipP2}</p>
            </>
          ) : (
            <>
              <h1>{messages.fr.completionTipH}</h1>
              <p>{messages.fr.completionTipP1}</p>
              <p>{messages.fr.completionTipP2}</p>
            </>
          )}
        </div>
        <div className="homeLink">
          <a href="/">
            <div className="flex justify-content-center align-items-center">
              <i className="pi pi-external-link"></i>
              {"\u00A0"}HOME
            </div>
            <Image width="80" height="80" src={icon} alt="Z Service" />
          </a>
          {/* <p>You will be redirected to the home page in 5 seconds.</p> */}
        </div>
      </div>
    </div>
  );
}

export default Completion;
