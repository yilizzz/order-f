import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const ServiceStore = createSlice({
  name: "service",
  initialState: {
    serviceList: [],
    categories: [],
    activeCategory: "Year of the Dragon Special",
    cartList: [],
  },
  reducers: {
    setServices(state, action) {
      state.serviceList = action.payload;
      const categories = new Set(action.payload.map((item) => item.category));
      state.categories = Array.from(categories);
    },
    changeActiveCategory(state, action) {
      state.activeCategory = action.payload;
    },
    addCart(state, action) {
      const item = state.cartList.find(
        (item) => item.service._id === action.payload._id
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
        state.cartList.push({
          service: action.payload.service,
          count: 1,
        });
      }
    },
  },
});

const { setServices, changeActiveCategory, addCart } = ServiceStore.actions;

const fetchServiceList = () => {
  return async (dispatch) => {
    const res = await axios.get("http://localhost:3001/client/services");
    res.status === 200
      ? dispatch(setServices(res.data))
      : dispatch(setServices([]));
  };
};

export { fetchServiceList, changeActiveCategory, addCart };
const reducer = ServiceStore.reducer;
export default reducer;
