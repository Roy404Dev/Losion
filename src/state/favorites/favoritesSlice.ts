import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Tab {
  tab_id: string;
}

interface FavoriteState {
  favoriteTab: Tab[];
}

const initialState: FavoriteState = {
  favoriteTab: [],
};

const favoritesSlice = createSlice({
  name: "favoritesSlice",
  initialState,
  reducers: {
    addFavoriteTabs: (state, action: PayloadAction<string[]>) => {
      const tabsToAdd: Tab[] = action.payload.map((tab_id) => ({ tab_id }));
      state.favoriteTab.push(...tabsToAdd);
    },
    addNewFavoriteTab: (state, action: PayloadAction<Tab>) => {
      state.favoriteTab.push(action.payload);
    },
    // removeFavoriteTab: (state, action: PayloadAction<string[]>) => {
      // TODO
    // }
  },
});

export const { addNewFavoriteTab, addFavoriteTabs, removeFavoriteTab } = favoritesSlice.actions;

export default favoritesSlice.reducer;
