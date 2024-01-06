import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthMiddleware() {
  return localStorage.getItem("_token") ? (
    <Outlet />
  ) : (
    <Navigate to={"/signin"} />
  );
}
