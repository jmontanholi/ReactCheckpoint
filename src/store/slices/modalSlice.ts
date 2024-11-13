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
    toggleModal: (state, action: PayloadAction<string>) => {
      switch (action.payload) {
        case "wishlist":
          state.wishlistModalIsOpen = !state.wishlistModalIsOpen;
          break;

        default:
          break;
      }
    },
  },
});

export const { toggleModal } = modalSlice.actions;
export default modalSlice.reducer;
