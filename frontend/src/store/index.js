import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import authReducer from "./authReducer";

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
  },
});
