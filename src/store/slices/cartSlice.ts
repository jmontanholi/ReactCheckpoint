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
      // Find product based on ID
      const product = state.products.find(
        (cartItem) => cartItem.product.id === action.payload.id
      );

      // If we have the product we just add 1 to the quantity
      if (product) {
        product.quantity += 1;
      } else {
        // If we don't have the product yet just push it to the cart
        state.products.push({ product: action.payload, quantity: 1 });
      }

      // Add to the total price of the cart
      state.totalPrice += action.payload.price;
    },
    removeItemFromCart: (state, action: PayloadAction<ProductInterface>) => {
      // Find product based on ID
      const product = state.products.find(
        (cartItem) => cartItem.product.id === action.payload.id
      );

      // If we don't have the product we just return the state
      if (!product) {
        return state;
      } else if (product.quantity === 1) {
        // If we find the product and we have only 1 in the cart we remove it completely
        state.products = state.products.filter(
          (item) => item.product.id !== action.payload.id
        );
      } else {
        // If there is more than one we remove one from the quantity
        product.quantity -= 1;
      }

      // Remove from the total price of the cart
      state.totalPrice -= action.payload.price;
    },
    removeAllFromCart: (state) => {
      // Reset cart and total price
      state.products = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItemToCart, removeItemFromCart, removeAllFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
