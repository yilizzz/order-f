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
            key={item}
            className="menuItem"
            style={{
              backgroundColor:
                activeCategory === item
                  ? "var(--orange-800)"
                  : "var(--blue-600)",
            }}
            onClick={() => dispatch(changeActiveCategory(item))}
          >
            {/* <i className=" pi pi-fw pi-list"></i> */}
            {item}
          </div>
        );
      })}
    </div>
  );
};
export default Menu;
