import { combineReducers, configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "./slices/wishlistSlice";
import modalReducer from "./slices/modalSlice";
import cartReducer from "./slices/cartSlice";

const rootReducer = combineReducers({
  wishlist: wishlistReducer,
  modal: modalReducer,
  cart: cartReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export function setupStore(preloadedState: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
