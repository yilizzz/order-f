import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const platStore = createSlice({
  name: "plat",
  initialState: {
    platList: [],
    categories: [],
    activeCategory: 0,
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
  },
});

const { setPlats, changeActiveCategory } = platStore.actions;

const fetchPlatList = () => {
  return async (dispatch) => {
    const res = await axios.get("http://localhost:3001/plats");
    dispatch(setPlats(res.data));
  };
};

export { fetchPlatList, changeActiveCategory };
const reducer = platStore.reducer;
export default reducer;
