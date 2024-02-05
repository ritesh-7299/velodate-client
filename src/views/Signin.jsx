import signupImage from "../assets/signupImage.png";
import logo from "../assets/logo.svg";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox, Input, Typography, notification } from "antd";
import Loader from "../components/Loader";
import { useState } from "react";
import { notificationConfig } from "../config/NotificationConfig.js";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice.js";

const validationSchema = Yup.object({
  username: Yup.string().required("Email or Contact number is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
      "Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, and one digit"
    ),
});

const initialValues = {
  username: "",
  password: "",
};

export default function Signin() {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  let navigate = useNavigate();

  const onSubmit = async (values) => {
    setLoader(true);
    try {
      const res = await axios.post(
        "https://api.velodate.com/auth/loginForAdmin",
        values
      );
      if (res.data.token) {
        dispatch(
          setUser({ name: res.data?.data?.fullname, id: res.data?.data?.id })
        );
        localStorage.setItem("_token", res.data.token);
        navigate("/dashboard");
      } else {
        notification.error({
          ...notificationConfig,
          message: "Invalid credentials",
          description: "Please check email/contact number and password",
        });
      }
    } catch (error) {
      error.response?.data?.message === "Unauthorized"
        ? notification.error({
            ...notificationConfig,
            message: "Invalid credentials",
            description: "Please check email/contact number and password",
          })
        : notification.error({
            ...notificationConfig,
            message: "Something went wrong",
          });
    } finally {
      setLoader(false);
    }
  };
  return (
    <div className="grid grid-cols-2 h-screen">
      {loader && <Loader />}
      <div className="bg-black">
        <div className="mt-14 ml-14">
          <img src={logo} alt="logo.svg" className="h-6 w-32" />
          <div className="mt-6">
            <p
              style={{
                fontSize: "32px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "100%",
                color: "#F6F6F6",
              }}
            >
              Sign in
            </p>
            <div className="mt-2">
              <p
                style={{
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "150%",
                  color: "#F6F6F6",
                }}
              >
                Please provide required credentials to <br />
                <p className="text-white mb-3">access your account.</p>
              </p>
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ isValid, dirty }) => (
                <Form>
                  <div className="mt-6 mb-4">
                    <Typography.Title
                      level={5}
                      style={{
                        color: "#949494",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "100%",
                      }}
                    >
                      Email/Contact number
                    </Typography.Title>
                    <Field
                      name="username"
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="username"
                          size="middle"
                          style={{
                            width: 328,
                            borderRadius: 4,
                          }}
                          placeholder="Enter email or contact number"
                        />
                      )}
                    />

                    <ErrorMessage
                      className="text-gray-300 text-xs"
                      name="username"
                      component="div"
                    />
                  </div>

                  <div className="mb-1 passwordinput">
                    <Typography.Title
                      level={5}
                      style={{
                        color: "#949494",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "100%",
                      }}
                    >
                      Password
                    </Typography.Title>
                    <Field
                      id="password"
                      name="password"
                      render={({ field }) => (
                        <Input.Password
                          {...field}
                          placeholder="input password"
                          style={{ width: 328, borderRadius: 4 }}
                        />
                      )}
                    />

                    <ErrorMessage
                      className="text-gray-300 text-xs password_errormsg"
                      name="password"
                      component="div"
                    />
                  </div>

                  <div
                    style={{ alignItems: "center", display: "flex" }}
                    className="flex"
                  >
                    <Checkbox>
                      <Typography.Title
                        level={8}
                        style={{
                          fontSize: "14px",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "100%",
                          color: "#F6F6F6",
                          textAlign: "center",
                          paddingTop: 5,
                        }}
                      >
                        Remember me
                      </Typography.Title>
                    </Checkbox>
                    <div style={{ paddingLeft: 62 }}>
                      <Link
                        to={"/forgot-password"}
                        className="text-yellow-400 "
                        style={{
                          fontSize: "14px",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "100%",
                          color: "#D8A409",
                          paddingLeft: 28,
                        }}
                      >
                        Forgot password
                      </Link>
                    </div>
                  </div>

                  <div className="mt-10 signinbtn">
                    <button
                      disabled={!isValid || !dirty}
                      style={{
                        width: "328px",
                        color: "black",
                        padding: "6px 8px 5px 8px",
                        background:
                          !isValid || !dirty
                            ? "var(--Brand-Secondary_Light, color(display-p3 0.9529 0.8941 0.7098))"
                            : "linear-gradient(45deg, rgb(209, 157, 0) 0%, rgb(255, 207, 64) 100%)",

                        borderRadius: "40px",
                        border:
                          "2px solid var(--Brand-Secondary_Light, #FAE2A8)",
                      }}
                      type="submit"
                    >
                      Sign In
                    </button>
                  </div>
                </Form>
              )}
            </Formik>

            {/* <p
              style={{
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "100%",
              }}
              className="text-white text-xs mt-6"
            >
              Don't have an account?{" "}
              <Link
                to={"/signup"}
                style={{ color: "#D8A409" }}
                className="text-yellow-400"
              >
                Sign Up
              </Link>
            </p> */}
          </div>
        </div>
      </div>
      <div>
        <img src={signupImage} alt="signup.png" className="loginimg" />
      </div>
    </div>
  );
}
