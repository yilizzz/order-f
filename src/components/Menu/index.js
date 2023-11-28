import { useDispatch, useSelector } from "react-redux";
import { changeActiveCategory } from "../../store/modules/platStore";
import { TabMenu } from "primereact/tabmenu";
const Menu = () => {
  const categories = useSelector((state) => state.plat.categories);
  const items = [];
  for (let category of categories) {
    items.push({ label: category });
  }
  return (
    <TabMenu
      className=" menu flex flex-row align-items-center justify-content-around w-screen h-10rem p-5"
      model={items}
    />
  );
};
export default Menu;
