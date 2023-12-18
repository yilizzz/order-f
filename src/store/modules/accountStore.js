import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Create a slice for the boss's login state
const accountStore = createSlice({
  name: "account",
  initialState: {
    loggedIn: false,
    email: "",
    // token: "",
    role: "",
  },
  reducers: {
    setUser(state, action) {
      state.loggedIn = true;
      state.email = action.payload.email;
      state.role = action.payload.role;
    },
  },
});
const logIn = (credentials) => {
  return async (dispatch) => {
    const res = await axios({
      method: "post",
      url: "http://localhost:3001/boss/login",
      data: credentials,
    });
    res.status === 200
      ? dispatch(setUser({ email: credentials.email, role: res.data.role }))
      : dispatch(setUser({ email: "", role: "" }));
  };
};
// Extract the action creators from the slice
const { setUser } = accountStore.actions;
export { logIn };
const reducer = accountStore.reducer;
export default reducer;
