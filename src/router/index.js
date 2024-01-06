import React, { Suspense } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import AuthMiddleware from "./auth/AuthMiddleware";
const Home = React.lazy(() => import("../views/Home"));
const Signin = React.lazy(() => import("../views/Signin"));
const Signup = React.lazy(() => import("../views/Signup"));
const NotFound = React.lazy(() => import("../views/NotFound"));
const ForgotPassword = React.lazy(() => import("../views/ForgotPassword"));
const ResetPassword = React.lazy(() => import("../views/ResetPassword"));
const Dashboard = React.lazy(() => import("../views/dashboard/Dashboard"));

export default function Index() {
  const isLoggedIn = localStorage.getItem("_token") ? true : false;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Routes>
          <Route Component={AuthMiddleware}>
            <Route path="/" Component={isLoggedIn && Dashboard} />
            <Route path="/dashboard" Component={Dashboard} />
          </Route>
          <Route path="/signin" Component={Signin} />
          <Route path="/signup" Component={Signup} />
          <Route path="/forgot-password" Component={ForgotPassword} />
          <Route path="/reset-password" Component={ResetPassword} />
          <Route path="*" Component={NotFound} />
        </Routes>
      </Router>
    </Suspense>
  );
}
