import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  wishlistModalIsOpen: boolean;
}

const initialState: ModalState = {
  wishlistModalIsOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<string>) => {
      switch (action.payload) {
        case "wishlist":
          state.wishlistModalIsOpen = true;
          break;

        default:
          break;
      }
    },
    closeModal: (state, action: PayloadAction<string>) => {
      switch (action.payload) {
        case "wishlist":
          state.wishlistModalIsOpen = false;
          break;

        default:
          break;
      }
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
