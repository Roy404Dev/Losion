import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TabType } from "../tab/tabSlice";

type favoriteType = {
  favoriteTab: TabType[];
};

const initialStateFavorites: favoriteType = {
  favoriteTab: [
    {
      emoji: "",
      name: "",
      user_id: "",
      template_id: 0,
      content: "",
      id: "",
      favorite: true,
    },
  ],
};

const favoritesSlice = createSlice({
  name: "favoritesSlice",
  initialState: initialStateFavorites,
  reducers: {
    addNewFavoriteTab: (state, action: PayloadAction<favoriteType>) => {
      state.favoriteTab = [...state.favoriteTab, ...action.payload.favoriteTab];
    }
  },
});

export const { addNewFavoriteTab } = favoritesSlice.actions;

export default favoritesSlice.reducer;
