import { Navigate, Outlet } from "react-router-dom";

export default function RestrictedMiddleware() {
  return !localStorage.getItem("_token") ? (
    <Outlet />
  ) : (
    <Navigate to={"/dashboard"} />
  );
}
