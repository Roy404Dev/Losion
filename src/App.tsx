import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./scss/style.scss";
import LandingPage from "./pages/Landingpage/LandingPage";
import AppPage from "./pages/AppPage/AppPage";
import { SignedIn } from "@clerk/clerk-react";
import TaskListLayout from "./components/layout/templates/taskList/TaskListLayout";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "",
      element: (
        <SignedIn>
          <AppPage />
        </SignedIn>
      ),
      children: [
        {
          path: "taskList?/:id",
          element: <><TaskListLayout /></>,
        },
      ]
    },
    {
      path: "product",
      element: <LandingPage />,
    },

  ]);
  return <RouterProvider router={router} />;
};

export default App;
