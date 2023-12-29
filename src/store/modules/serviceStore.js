import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const ServiceStore = createSlice({
  name: "service",
  initialState: {
    serviceList: [],
    categories: [],
    activeCategory: "2024 Special",
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
      // If this service has been added
      if (item) {
        if (action.payload.State === "Plus") {
          item.count = item.count ? item.count + 1 : 1;
        } else if (action.payload.State === "Minus" && item.count > 0) {
          // Delete this service from the list when it's minus action and number of this service is 1
          if (item.count === 1) {
            let index = state.cartList.indexOf(item);
            state.cartList.splice(index, 1);
          }
          item.count--;
        }
        // Add a new service
      } else {
        state.cartList.push({
          service: action.payload.service,
          count: 1,
        });
      }
    },
    saveCartToLocalStorage(state) {
      try {
        const serializedState = JSON.stringify(state.cartList);
        localStorage.setItem("cart", serializedState);
      } catch (e) {
        console.log(e);
      }
    },
    clearCart(state) {
      state.cartList = [];
    },
  },
});

const {
  setServices,
  changeActiveCategory,
  addCart,
  saveCartToLocalStorage,
  clearCart,
} = ServiceStore.actions;

const fetchServiceList = () => {
  return async (dispatch) => {
    const res = await axios.get("http://localhost:3001/client/services");
    res.status === 200
      ? dispatch(setServices(res.data))
      : dispatch(setServices([]));
  };
};

export {
  fetchServiceList,
  changeActiveCategory,
  addCart,
  saveCartToLocalStorage,
  clearCart,
};
const reducer = ServiceStore.reducer;
export default reducer;
