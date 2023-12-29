import { useDispatch, useSelector } from "react-redux";
import Count from "../Count";
import { addCart } from "../../store/modules/serviceStore";
import "./index.css";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartList } = useSelector((state) => state.service);
  const totalPrice = cartList.reduce(
    (a, c) => a + parseFloat(c.service.price["$numberDecimal"]) * c.count,
    0
  );
  return (
    <div className="cart">
      <div className="text-blue-700 mb-3">
        Total: <span className="text-orange-700 ">{totalPrice.toFixed(2)}</span>{" "}
        EUR
      </div>
      {cartList.length > 0 ? (
        cartList.map((item) => {
          return (
            <div className="cartItem" key={item.service._id}>
              <span>{item.service.name}</span>
              <Count
                count={item.count}
                onPlus={() =>
                  dispatch(
                    addCart({
                      _id: item.service._id,
                      service: item.service,
                      State: "Plus",
                    })
                  )
                }
                onMinus={() =>
                  dispatch(
                    addCart({
                      _id: item.service._id,
                      service: item.service,
                      State: "Minus",
                    })
                  )
                }
              />
            </div>
          );
        })
      ) : (
        <div className="text-blue-700">Cart is empty</div>
      )}
    </div>
  );
};

export default Cart;
