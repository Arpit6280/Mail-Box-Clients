import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-reducer";
import mailReducer from "./mailReducer";

const store = configureStore({
  reducer: { auth: authReducer, mail: mailReducer },
});

export default store;
