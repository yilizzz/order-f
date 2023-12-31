import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Create a slice for the boss's login state
const accountStore = createSlice({
  name: "account",
  initialState: {
    userId: "",
    token: "",
    role: "",
  },
  reducers: {
    setUser(state, action) {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
      state.role = action.payload.role;
    },
  },
});
// Extract the action creators from the slice
const { setUser } = accountStore.actions;
// Define the action creators for the boss's login state
const logIn = (credentials) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/boss/login`,
        data: credentials,
      });
      if (res.status === 200) {
        dispatch(
          setUser({
            userId: res.data.userId,
            token: res.data.token,
            role: res.data.role,
          })
        );
      } else {
        // If the server responds with a status other than 200, it will throw an error
        // The error message from the server can be accessed with `err.response.data.error`
        throw new Error();
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        // If the server responded with a status of 401
        alert(err.response.data.error);
      } else {
        // If the server didn't respond or if the status is not 401
        alert("server error");
      }
      console.log(err);
    }
  };
};

const logOut = () => {
  return async (dispatch) => {
    dispatch(setUser({ userId: "", token: "", role: "" }));
  };
};

export { logIn, logOut };
const reducer = accountStore.reducer;
export default reducer;
