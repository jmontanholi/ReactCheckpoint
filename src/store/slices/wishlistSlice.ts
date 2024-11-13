import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ProductInterface } from "../../pages/products/Products";

export interface WishlistInterface {
  products: ProductInterface[];
  showWishlistModal: boolean;
}

const initialState: WishlistInterface = {
  products: [],
  showWishlistModal: false,
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addItemToWishlist: (state, action: PayloadAction<ProductInterface>) => {
      state.products.push(action.payload);
    },
    removeItemFromWishlist: (
      state,
      action: PayloadAction<ProductInterface>
    ) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      );
    },
  },
});

export const { addItemToWishlist, removeItemFromWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
