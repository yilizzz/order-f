import { useSelector } from "react-redux";

const Cart = () => {
  const { cartList } = useSelector((state) => state.plat);
  return (
    <div className="order-count flex justify-content-end align-items-end">
      {cartList.length > 0 ? (
        cartList.map((item) => {
          return (
            <div key={item.name}>
              <span>{item.name}</span>
              <span>{item.count}</span>
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
