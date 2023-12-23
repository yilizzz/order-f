// import "./App.css";
import { Image } from "primereact/image";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";

import { fetchServiceList, addCart } from "../../store/modules/serviceStore";
import Menu from "../../components/Menu";
import { useEffect, useState, useContext } from "react";
import { StripeContext } from "../../context/stripe";
import { useNavigate } from "react-router-dom";
import Count from "../../components/Count";
import Cart from "../../components/Cart";
import { InputText } from "primereact/inputtext";

const Home = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailValide, setEmailValide] = useState(false);
  const { config, createIntent } = useContext(StripeContext);
  const navigate = useNavigate();
  const { serviceList, activeCategory, cartList } = useSelector(
    (state) => state.service
  );
  const hasNameService = cartList.find(
    (element) => element.service.name === "Your Customized Chinese Name"
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchServiceList());
  }, [dispatch]);

  const toPaymentPage = () => {
    config();
    createIntent(name, email);
    setTimeout(() => {
      navigate("/payment");
    }, 1000);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    const regExp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    regExp.test(email) ? setEmailValide(true) : setEmailValide(false);
  };
  return (
    <div className="page">
      <Menu></Menu>
      <div className="plats">
        {serviceList.map(
          (item) =>
            activeCategory === item.category && (
              <div
                key={item._id}
                className="flex flex-column justify-content-start align-items-center h-25rem w-16rem border-1 border-green-400 border-round-md m-2 p-3"
              >
                <Image
                  src={item.image}
                  alt="Image"
                  width="200"
                  height="200"
                  preview
                />

                <div className="flex flex-column m-5 gap-2">
                  <span>{item.name}</span>
                  <span>{item.description}</span>
                  <span>price: {item.price["$numberDecimal"].toString()}</span>
                  <Count
                    count={
                      cartList.find((list) => list.service._id === item._id)
                        ?.count || 0
                    }
                    onPlus={() =>
                      dispatch(
                        addCart({ _id: item._id, service: item, State: "Plus" })
                      )
                    }
                    onMinus={() =>
                      dispatch(
                        addCart({
                          _id: item._id,
                          service: item,
                          State: "Minus",
                        })
                      )
                    }
                  />
                </div>
              </div>
            )
        )}
      </div>
      <Cart />
      {hasNameService !== undefined ? (
        <InputText
          placeholder="Your name"
          onChange={(e) => setName(e.target.value)}
        />
      ) : null}
      <InputText placeholder="Email" onChange={handleEmail} />
      <Button disabled={!emailValide} onClick={toPaymentPage}>
        Payment
      </Button>
    </div>
  );
};

export default Home;
