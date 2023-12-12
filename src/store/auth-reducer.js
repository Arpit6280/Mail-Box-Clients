import { createSlice } from "@reduxjs/toolkit";

let iniToken = localStorage.getItem("token");
let iniEmail = localStorage.getItem("email");
const initialAuthState = {
  token: iniToken,
  isLoggedIn: !!iniToken,
  email: iniEmail,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      let { idToken, email } = action.payload;
      let ind = email.indexOf("@");
      email = email.slice(0, ind);
      console.log(action.payload);
      localStorage.setItem("token", idToken);
      localStorage.setItem("email", email);
      state.token = action.payload.idToken;
      state.email = action.payload.email;
      state.isLoggedIn = true;
    },
    logout(state) {
      localStorage.removeItem("token");
      state.token = "";
      state.email = "";
      state.isLoggedIn = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
