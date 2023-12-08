// import "./App.css";
import { Image } from "primereact/image";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlatList, addCart } from "../../store/modules/platStore";
import Menu from "../../components/Menu";
import { useEffect } from "react";
import Count from "../../components/Count";
import Cart from "../../components/Cart";

const Home = () => {
  const { platList, activeCategory, cartList } = useSelector(
    (state) => state.plat
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPlatList());
  }, [dispatch]);

  return (
    <div className="page">
      <Menu></Menu>
      <div className="plats">
        {platList.map(
          (item) =>
            activeCategory === item.category && (
              <div
                key={item.id}
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
                  <span>price: {item.price}</span>
                  <Count
                    count={
                      cartList.find((list) => list.plat.id === item.id)
                        ?.count || 0
                    }
                    onPlus={() =>
                      dispatch(
                        addCart({ id: item.id, plat: item, State: "Plus" })
                      )
                    }
                    onMinus={() =>
                      dispatch(
                        addCart({ id: item.id, plat: item, State: "Minus" })
                      )
                    }
                  />
                </div>
              </div>
            )
        )}
      </div>
      <Cart />
    </div>
  );
};

export default Home;
