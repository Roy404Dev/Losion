import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type TabType = {
  emoji: string;
  name: string;
  user_id: string;
  template_id: number;
  content?: string;
  id: string;
  favorite: boolean;
}

export type TabsState = {
  tabs: TabType[];
};

const initialState: TabsState = {
  tabs: [
    {
      emoji: "&#x1F44B",
      name: "tab",
      user_id: "",
      template_id: 0,
      content: "",
      id: "",
      favorite: false,
    },
  ],
};

const tabSlice = createSlice({
  name: "tab",
  initialState,
  reducers: {
    addNewTab: (state, action: PayloadAction<TabsState>) => {
      state.tabs = [...state.tabs, ...action.payload.tabs];
    },
    ModifyTab: (state, action: PayloadAction<TabType>) => {
      //Filter tabs
      const filtered = state.tabs.filter((tab) => tab.id !== action.payload.id);
      state.tabs = [...filtered, action.payload];
    },
  },
});

export const { addNewTab, ModifyTab } = tabSlice.actions;

export default tabSlice.reducer;
