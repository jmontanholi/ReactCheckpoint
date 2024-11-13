import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "./slices/wishlistSlice";
import modalReducer from "./slices/modalSlice";

export const store = configureStore({
  reducer: { wishlist: wishlistReducer, modal: modalReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
