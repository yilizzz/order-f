import { useDispatch, useSelector } from "react-redux";

import Count from "../Count";

import { addCart } from "../../store/modules/serviceStore";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartList } = useSelector((state) => state.service);
  const totalPrice = cartList.reduce(
    (a, c) => a + parseFloat(c.service.price["$numberDecimal"]) * c.count,
    0
  );
  return (
    <div className="order-count flex justify-content-end align-items-end">
      <div>Total price: {totalPrice.toFixed(2)}</div>
      {cartList.length > 0 ? (
        cartList.map((item) => {
          return (
            <div key={item.service._id}>
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
        <div>Cart is empty</div>
      )}
    </div>
  );
};

export default Cart;
