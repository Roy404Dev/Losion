import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface userType {
  token: string | null;
}

const initialState: userType = {
  token: null,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    addNewUser: (state, action: PayloadAction<userType>) => {
      Object.assign(state, action.payload);
    },
    addUserToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { addNewUser, addUserToken } = userSlice.actions;

export default userSlice.reducer;
