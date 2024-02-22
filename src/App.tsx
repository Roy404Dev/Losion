import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./scss/style.scss";
import LandingPage from "./pages/LandingPage";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "",
      element: <LandingPage />
    },
  ]);
  return <RouterProvider router={router} />
};

export default App;
