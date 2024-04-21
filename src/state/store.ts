import { configureStore } from "@reduxjs/toolkit";
import tabSlice from "./tab/tabSlice";
import userSlice from "./userSlice/userSlice";
import taskSlice from "./taskSlice/taskSlice";
import modalActionsSlice from "./modalActions/modalActionsSlice";
import hamburgerSlice from "./hamburger/hamburgerSlice";
import favoritesSlice from "./favorites/favoritesSlice";

export const store = configureStore({
  reducer: {
    tab: tabSlice,
    user: userSlice,
    tasks: taskSlice,
    modalActions: modalActionsSlice,
    hamburger: hamburgerSlice,
    favorites: favoritesSlice
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
