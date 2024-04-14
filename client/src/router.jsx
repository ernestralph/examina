import { createBrowserRouter, Navigate } from "react-router-dom";
import { GuestLayout, MainLayout } from "./components";
import { Register, Login, Home } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/home",
        element: <Navigate to="/" />,
      },
      {
        path: "/",
        element: <Home />,
      },
      
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
