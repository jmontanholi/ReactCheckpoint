import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ProductInterface } from "../../pages/products/Products";

export interface WishlistInterface {
  products: ProductInterface[];
}

const initialState: WishlistInterface = {
  products: [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addItemToWishlist: (state, action: PayloadAction<ProductInterface>) => {
      // Add item to the wishlist
      state.products.push(action.payload);
    },
    removeItemFromWishlist: (
      state,
      action: PayloadAction<ProductInterface>
    ) => {
      // Filter state for all items except for the one we are removing
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      );
    },
  },
});

export const { addItemToWishlist, removeItemFromWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
