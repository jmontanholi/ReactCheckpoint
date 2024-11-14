import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ProductInterface } from "../../pages/products/Products";

interface CartProduct {
  product: ProductInterface;
  quantity: number;
}

export interface CartInterface {
  products: CartProduct[];
  totalPrice: number;
}

const initialState: CartInterface = {
  products: [],
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<ProductInterface>) => {
      const product = state.products.find(
        (cartItem) => cartItem.product.id === action.payload.id
      );
      if (product) {
        product.quantity += 1;
      } else {
        state.products.push({ product: action.payload, quantity: 1 });
      }
    },
    removeItemFromCart: (state, action: PayloadAction<ProductInterface>) => {
      state.products = state.products.filter(
        (item) => item.product.id !== action.payload.id
      );
    },
    removeAllFromCart: (state) => {
      state.products = [];
    },
  },
});

export const { addItemToCart, removeItemFromCart, removeAllFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
