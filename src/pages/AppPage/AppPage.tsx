import { useEffect } from "react";
import Aside from "../../components/layout/Aside/Aside";
import "./AppPage.scss";
import { Outlet } from "react-router";
import { useAuth } from "@clerk/clerk-react";
import { useDispatch } from "react-redux";
import { addUserToken } from "@/state/userSlice/userSlice";
const AppPage = () => {
  const { getToken } = useAuth();
  const dispatch = useDispatch();
  let ran = true;

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken({ template: "supabase" });
      token && dispatch(addUserToken(token));
    };
    if (ran) fetchToken();
    return () => {
      ran = false;
    };
  }, []);
  return (
    <div className="appPage">
      <Aside />
      <Outlet />
    </div>
  );
};

export default AppPage;
