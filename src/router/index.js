import React, { Suspense } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import AuthMiddleware from "./auth/AuthMiddleware";
import RestrictedMiddleware from "./auth/RestrictedMiddleware";
const Loader = React.lazy(() => import("../components/Loader"));
const Home = React.lazy(() => import("../views/Home"));
const Signin = React.lazy(() => import("../views/Signin"));
const Signup = React.lazy(() => import("../views/Signup"));
const NotFound = React.lazy(() => import("../views/NotFound"));
const ForgotPassword = React.lazy(() => import("../views/ForgotPassword"));
const ResetPassword = React.lazy(() => import("../views/ResetPassword"));
const Dashboard = React.lazy(() => import("../views/dashboard/Dashboard"));
const Users = React.lazy(() => import("../views/user/Index"));
const UserDetail = React.lazy(() => import("../views/user/UserDetail"));
const Reports = React.lazy(() => import("../views/report/Index"));

export default function Index() {
  const isLoggedIn = localStorage.getItem("_token") ? true : false;
  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <Routes>
          {/* {"open routes"} */}
          <Route path="/forgot-password" Component={ForgotPassword} />
          <Route path="/reset-password" Component={ResetPassword} />
          <Route path="*" Component={NotFound} />

          {/* restricted routes */}
          <Route Component={RestrictedMiddleware}>
            <Route path="/signin" Component={Signin} />
            <Route path="/signup" Component={Signup} />
          </Route>

          {/* authenticated routes */}
          <Route Component={AuthMiddleware}>
            <Route path="/" Component={Home} />
            <Route path="/dashboard" Component={Dashboard} />
            <Route path="/users" Component={Users} />
            <Route path="/users/:userId" Component={UserDetail} />
            <Route path="/reports" Component={Reports} />
          </Route>
        </Routes>
      </Router>
    </Suspense>
  );
}
