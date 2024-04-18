import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./scss/style.scss";
import LandingPage from "./pages/Landingpage/LandingPage";
import AppPage from "./pages/AppPage/AppPage";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import MainContent from "./components/layout/Main/MainContent";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "",
      element: (
        <>
          <SignedIn>
            <AppPage />
          </SignedIn>
          <SignedOut>
            <LandingPage />
          </SignedOut>
        </>
      ),
      children: [
        {
          path: "taskList?/:id",
          element: (
            <>
              {/* <TaskListLayout /> */}
              <MainContent />
            </>
          ),
        },
      ],
    },
    {
      path: "product",
      element: <LandingPage />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
