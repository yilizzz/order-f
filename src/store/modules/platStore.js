import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const platStore = createSlice({
  name: "plat",
  initialState: {
    platList: [],
    categories: [],
    activeCategory: "Plat",
    cartList: [],
  },
  reducers: {
    setPlats(state, action) {
      state.platList = action.payload;
      const categories = new Set(action.payload.map((plat) => plat.category));
      state.categories = Array.from(categories);
    },
    changeActiveCategory(state, action) {
      state.activeCategory = action.payload;
    },
    addCart(state, action) {
      const item = state.cartList.find(
        (item) => item.name === action.payload.name
      );
      // If this plat has been added
      if (item) {
        if (action.payload.State === "Plus") {
          item.count = item.count ? item.count + 1 : 1;
        } else if (action.payload.State === "Minus" && item.count > 0) {
          // Delete this plat from the list when it's minus action and number of this plat is 1
          if (item.count === 1) {
            let index = state.cartList.indexOf(item);
            state.cartList.splice(index, 1);
          }
          item.count--;
        }
        // Add a new plat
      } else {
        state.cartList.push({ name: action.payload.name, count: 1 });
      }
    },
  },
});

const { setPlats, changeActiveCategory, addCart, changeCount } =
  platStore.actions;

const fetchPlatList = () => {
  return async (dispatch) => {
    const res = await axios.get("http://localhost:3001/plats");
    dispatch(setPlats(res.data));
  };
};

export { fetchPlatList, changeActiveCategory, addCart, changeCount };
const reducer = platStore.reducer;
export default reducer;
