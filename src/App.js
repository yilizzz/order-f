// import "./App.css";
import { Image } from "primereact/image";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlatList } from "./store/modules/platStore";
import Menu from "./components/Menu";
import { useEffect } from "react";
import "./styles/globals.css";
function App() {
  const { platList, activeCategory } = useSelector((state) => state.plat);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPlatList());
  }, [dispatch]);
  return (
    <div className="flex flex-column justify-content-center align-items-center h-screen w-screen">
      <Menu></Menu>
      <div className="plats">
        {platList.map(
          (item) =>
            activeCategory === item.category && (
              <div key={item.id}>
                <Image
                  src={item.image}
                  alt="Image"
                  width="200"
                  height="200"
                  preview
                />
                {item.name}
                {item.price}
                <button>+</button>
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default App;
