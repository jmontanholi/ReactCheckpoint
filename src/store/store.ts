import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "./slices/wishlistSlice";
import modalReducer from "./slices/modalSlice";
import cartReducer from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    modal: modalReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
