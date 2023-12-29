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

const Home = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const { config, createIntent } = useContext(StripeContext);
  const navigate = useNavigate();
  const { cartList } = useSelector((state) => state.service);
  const hasNameService = cartList.find(
    (element) => element.service.name === "Your Customized Chinese Name"
  );
  const CartEmpty = cartList.length === 0;
  //其他服务暂时不能提供
  const hasNoOtherService =
    cartList.find(
      (element) => element.service.name !== "Your Customized Chinese Name"
    ) === undefined;

  const toPaymentPage = () => {
    config();
    createIntent(name, email);
    setTimeout(() => {
      navigate("/payment");
    }, 1000);
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
    <div className="w-screen h-screen flex flex-column justify-content-center">
      <Banner />
      <Service option="client" />

      <Cart />
      <div className="clientInfo">
        {hasNameService !== undefined ? (
          <InputText
            required
            className="w-20rem h-2rem"
            placeholder="Your name"
            onChange={(e) => setName(e.target.value)}
          />
        ) : null}
        <InputText
          required
          className="w-20rem h-2rem"
          placeholder="Email"
          onChange={handleEmail}
        />
        <Button
          className="bg-blue-900 w-6rem h-2rem"
          label="Payment"
          disabled={!(emailValid && hasNoOtherService && !CartEmpty)}
          onClick={toPaymentPage}
        ></Button>
        Pre-opening, only accepte 2024 special orders.
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Home;
