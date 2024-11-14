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
      Object.keys(state).map((key) => {
        if (key !== `${action.payload}IsOpen`) {
          return (state[key] = false);
        } else {
          return (state[key] = true);
        }
      });
    },
    closeModal: (state, action: PayloadAction<string>) => {
      Object.keys(state).map((key) => {
        if (key === `${action.payload}IsOpen`) {
          return (state[key] = false);
        }

        return state;
      });
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
