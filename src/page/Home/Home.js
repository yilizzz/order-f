import "./Home.css";

import { Button } from "primereact/button";
import { useSelector } from "react-redux";
import Cart from "../../components/Cart";
import { useState, useContext } from "react";
import { StripeContext } from "../../context/stripe";
import { useNavigate } from "react-router-dom";
import Service from "../../components/Service";
import { InputText } from "primereact/inputtext";
import Banner from "../../components/Banner";
import Footer from "../../components/Footer";
import LanguageSlide from "../../components/LanguageSlide";
import { LanguageContext } from "../../context/language";
import { messages } from "../../script/langScript";

const Home = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const { config, createIntent } = useContext(StripeContext);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { cartList } = useSelector((state) => state.service);
  const { language } = useContext(LanguageContext);
  const CartEmpty = cartList.length === 0;
  //pre-opening, only accepte name service
  //Array.every : In particular, for an empty array, it returns true.
  const hasOnlyNameService =
    !CartEmpty &&
    cartList.every(
      (element) =>
        element.service.name === "Your Customized Chinese Name" ||
        element.service.name === "Votre Nom Chinois Personnalisé"
    );

  const toPaymentPage = () => {
    setLoading(true);
    //configuration of stripe
    config();
    //create payment intent
    createIntent(name, email);
    //redirect to payment page
    const timerId = setTimeout(() => {
      setLoading(false);
    }, 1000);
    clearTimeout(timerId);
    navigate("/payment");
  };
  //setEmail(e.target.value) 是异步的，这意味着 email 的值不会立即更新。
  //因此，当你在 regExp.test(email) 中测试 email 时，你可能仍然在测试旧的 email 值，而不是用户刚刚输入的新值。
  //解决这个问题的一种方法是直接在 regExp.test 中测试 e.target.value
  const handleEmail = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    const regExp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    regExp.test(newEmail) ? setEmailValid(true) : setEmailValid(false);
  };
  return (
    <div className="fullPage">
      <div className="lang-option">
        <LanguageSlide />
      </div>
      <div className="main">
        <Banner />
        <Service option="client" />

        <Cart />
        <form className="clientInfo">
          {hasOnlyNameService ? (
            <span className="p-float-label">
              <InputText
                id="name"
                required
                className="w-20rem h-2rem"
                onChange={(e) => setName(e.target.value)}
                autoComplete="true"
              />
              <label htmlFor="name">Your name</label>
            </span>
          ) : null}
          <span className="p-float-label">
            <InputText
              id="email"
              required
              className="w-20rem h-2rem"
              placeholder="Email"
              onChange={handleEmail}
              autoComplete="true"
            />
            <label htmlFor="email">Your Email</label>
          </span>
          <Button
            className="bg-orange-700 w-8rem h-2rem"
            label="Payment"
            disabled={!(emailValid && hasOnlyNameService && name)}
            onClick={toPaymentPage}
            loading={loading}
          ></Button>
          <span className="text-center mb-5">
            {language === "English"
              ? messages.en.homePageTip
              : messages.fr.homePageTip}
          </span>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
