import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";

export default function MainLayout() {
  const {  userToken } =
    useStateContext();

  if (!userToken) {
    return <Navigate to="/login" />;
  }
  return (
    <Outlet />
  );
}
