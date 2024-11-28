import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  wishlistModalIsOpen: boolean;
  cartModalIsOpen: boolean;
}

const initialState: ModalState = {
  wishlistModalIsOpen: false,
  cartModalIsOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<string>) => {
      // Map through all the keys in our state and close all modals except for the one we dispatched to open
      Object.keys(state).map((key) => {
        if (key !== `${action.payload}IsOpen`) {
          return (state[key] = false);
        } else {
          return (state[key] = true);
        }
      });
    },
    closeModal: (state) => {
      // Map through all the keys in our state and close all of them
      // (Only one should be opened, so we just close all and avoid an if rule)
      Object.keys(state).map((key) => {
        return (state[key] = false);
      });
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
