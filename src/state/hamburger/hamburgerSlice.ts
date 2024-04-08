import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type hamburgerActionType = {
  isHamburgerMenuSelected: boolean;
};

const initialState = {
  isHamburgerMenuSelected: false,
};

const hamburgerSlice = createSlice({
  name: "hamburgerSlice",
  initialState: initialState,
  reducers: {
    toggleMenu: (state, action: PayloadAction<hamburgerActionType>) => {
      state.isHamburgerMenuSelected = action.payload.isHamburgerMenuSelected;
    },
  },
});

export const { toggleMenu } = hamburgerSlice.actions;

export default hamburgerSlice.reducer;
