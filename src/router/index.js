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
const Profile = React.lazy(() => import("../views/profile/Index"));
const SetPassword = React.lazy(() => import("../views/profile/SetPassword"));
const Notifications = React.lazy(() => import("../views/notification/Index"));
const NotificationDetail = React.lazy(() =>
  import("../views/notification/NotificationDetail")
);
const NewNotification = React.lazy(() =>
  import("../views/notification/NewNotification")
);
const Emails = React.lazy(() => import("../views/email/Index"));
const EmailDetail = React.lazy(() => import("../views/email/EmailDetail"));
const NewEmail = React.lazy(() => import("../views/email/NewEmail"));

export default function Index() {
  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <Routes>
          {/* {"open routes"} */}
          <Route path="/forgot-password" Component={ForgotPassword} />
          <Route path="/reset-password/:resetToken" Component={ResetPassword} />
          <Route path="*" Component={NotFound} />

          {/* restricted routes */}
          <Route Component={RestrictedMiddleware}>
            <Route path="/signin" Component={Signin} />
            {/* <Route path="/signup" Component={Signup} /> */}
          </Route>

          {/* authenticated routes */}
          <Route Component={AuthMiddleware}>
            <Route path="/" Component={Home} />
            <Route path="/dashboard" Component={Dashboard} />
            <Route path="/users" Component={Users} />
            <Route path="/users/:userId" Component={UserDetail} />
            <Route path="/reports" Component={Reports} />
            <Route path="/profile" Component={Profile} />
            <Route path="/set-password" Component={SetPassword} />
            <Route path="/notifications" Component={Notifications} />
            <Route path="/add-notification" Component={NewNotification} />
            <Route
              path="/notifications/:notificationId"
              Component={NotificationDetail}
            />
            <Route path="/emails" Component={Emails} />
            <Route path="/add-email" Component={NewEmail} />
            <Route path="/emails/:emailId" Component={EmailDetail} />
          </Route>
        </Routes>
      </Router>
    </Suspense>
  );
}
