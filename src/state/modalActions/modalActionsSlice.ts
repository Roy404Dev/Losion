import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type modalActionsType = {
  actionsInitial: {
    selectedAction: string;
    selectedTabId: string;
  };
};

const initialState: modalActionsType = {
  actionsInitial: {
    selectedAction: "",
    selectedTabId: "",
  },
};

const modalActionsSlice = createSlice({
  name: "modalActions",
  initialState,
  reducers: {
    addModalAction: (state, action: PayloadAction<modalActionsType>) => {
      state.actionsInitial = action.payload.actionsInitial;
    },
  },
});

export const { addModalAction } = modalActionsSlice.actions;
export default modalActionsSlice.reducer;
