import { useEffect } from "react";
import Aside from "../../components/layout/Aside/Aside";
import "./AppPage.scss";
import { Outlet } from "react-router";
import { useAuth } from "@clerk/clerk-react";
import { useDispatch } from "react-redux";
import { addNewUser } from "@/state/userSlice/userSlice";
import { addFavoriteTabs } from "@/state/favorites/favoritesSlice";
const AppPage = () => {
  const { getToken, userId } = useAuth();
  const dispatch = useDispatch();
  let ran = true;
  //Get favorites from localstorage
  const favoriteTabsString = localStorage.getItem("fs-tabs");
  let favoriteTabs = favoriteTabsString ? JSON.parse(favoriteTabsString) : [];

  //Save results to redux
  favoriteTabs && dispatch(addFavoriteTabs(favoriteTabs));

  useEffect(() => {
    const setupUser = async () => {
      const token = await getToken({ template: "supabase" });
      token &&
        userId &&
        dispatch(
          addNewUser({
            token: token,
            userId: userId,
          })
        );
    };
    if (ran) setupUser();
    return () => {
      ran = false;
    };
  }, []);

  // Get selected color scheme from localStorage
  const storedValue = localStorage.getItem("prefer-color-theme");
  const parsed = storedValue ? JSON.parse(storedValue) : "";
  return (
    <div className={`appPage${parsed}`}>
      <Aside />
      <Outlet />
    </div>
  );
};

export default AppPage;
