import { useEffect } from "react";
import Aside from "../../components/layout/Aside/Aside";
import "./AppPage.scss";
import { Outlet } from "react-router";
import { useAuth } from "@clerk/clerk-react";
import { useDispatch } from "react-redux";
import { addNewUser } from "@/state/userSlice/userSlice";
const AppPage = () => {
  const { getToken, userId } = useAuth();
  const dispatch = useDispatch();
  let ran = true;

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
  const colorScheme = JSON.parse(
    localStorage.getItem("prefer-color-theme") || ""
  );
  return (
    <div className={`appPage ${colorScheme}`}>
      <Aside />
      <Outlet />
    </div>
  );
};

export default AppPage;
