// import "./App.css";
import { Image } from "primereact/image";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";

import { fetchServiceList, addCart } from "../../store/modules/serviceStore";
import Menu from "../../components/Menu";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Count from "../../components/Count";
import Cart from "../../components/Cart";

const Home = () => {
  const navigate = useNavigate();
  const { serviceList, activeCategory, cartList } = useSelector(
    (state) => state.service
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchServiceList());
  }, [dispatch]);

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
      <Button onClick={() => navigate("/payment")}>Payment</Button>
    </div>
  );
};

export default Home;
