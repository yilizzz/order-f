import { useDispatch, useSelector } from "react-redux";
import { changeActiveCategory } from "../../store/modules/serviceStore";
import "./index.css";

const Menu = () => {
  const { categories, activeCategory } = useSelector((state) => state.service);
  const dispatch = useDispatch();
  return (
    <div className="menu">
      {categories.map((item) => {
        return (
          <div
            id={item}
            key={item}
            className="menuItem"
            style={{
              backgroundColor:
                activeCategory === item
                  ? "var(--orange-800)"
                  : "var(--main-blue)",
            }}
            onClick={() => dispatch(changeActiveCategory(item))}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
};
export default Menu;
