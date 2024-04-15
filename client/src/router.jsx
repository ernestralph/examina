import { createBrowserRouter, Navigate } from "react-router-dom";
import { GuestLayout, MainLayout } from "./components";
import { Register, Login, AdminDashboard, ExamPortal } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/admin-dashboard",
        element: <Navigate to="/" />,
      },
      {
        path: "/",
        element: <AdminDashboard />,
      },
      {
        path: "/exams-portal",
        element: <ExamPortal />,
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
