import { useDispatch, useSelector } from "react-redux";
import Count from "../Count";

import { addCart } from "../../store/modules/platStore";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartList } = useSelector((state) => state.plat);
  const totalPrice = cartList.reduce((a, c) => a + c.plat.price * c.count, 0);
  return (
    <div className="order-count flex justify-content-end align-items-end">
      <div>Total price: {totalPrice.toFixed(2)}</div>
      {cartList.length > 0 ? (
        cartList.map((item) => {
          return (
            <div key={item.plat.id}>
              <span>{item.plat.name}</span>
              <Count
                count={item.count}
                onPlus={() =>
                  dispatch(
                    addCart({
                      id: item.plat.id,
                      plat: item.plat,
                      State: "Plus",
                    })
                  )
                }
                onMinus={() =>
                  dispatch(
                    addCart({
                      id: item.plat.id,
                      plat: item.plat,
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
