import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/app-layout";
import LandingPage from "./pages/landing";
import Dashboard from "./pages/dashboad";
import Link from "./pages/link";
import RedirectLink from "./pages/redirect-link";
import Auth from "./pages/auth";
import UrlProvider from "./context/context";
import { RequireAuth } from "./auth/require-auth";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/dashboard",
        element: (
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        ),
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/link/:id",
        element: (
          <RequireAuth>
            <Link />
          </RequireAuth>
        ),
      },
      {
        path: "/:id",
        element: <RedirectLink />,
      },
    ],
  },
  {},
]);
function App() {
  return (
    <UrlProvider>
      <RouterProvider router={router} />
    </UrlProvider>
  );
}

export default App;
