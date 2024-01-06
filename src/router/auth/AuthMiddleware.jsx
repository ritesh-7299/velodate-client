import axios from "axios";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthMiddleware() {
  const token = localStorage.getItem("_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  return token ? (
    window.location.pathname === "/" ? (
      <Navigate to={"/dashboard"} />
    ) : (
      <Outlet />
    )
  ) : (
    <Navigate to={"/signin"} />
  );
}
