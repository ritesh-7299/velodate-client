import signupImage from "../assets/signupImage.png";
import logo from "../assets/logo.svg";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Input, Typography, notification } from "antd";
import { notificationConfig } from "../config/NotificationConfig";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

const validationSchema = Yup.object({
  fullname: Yup.string()
    .required("Full name is required")
    .max(20, "Full name must be less then 20 characters"),
  email: Yup.string().email().required("Email is required"),
  contact: Yup.string()
    .required("Contact number is required")
    .max(15, "Contact number must be less than 10 digits")
    .matches(
      /^[0-9+]+$/,
      "Contact number must not contain alphabetic characters"
    ),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
      "Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, and one digit"
    ),
  confirm_password: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const initialValues = {
  fullname: "",
  email: "",
  contact: "",
  password: "",
  confirm_password: "",
};

export default function Signup() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = async (values) => {
    try {
      const res = await axios.post(
        "http://62.72.0.179:5000/auth/signup",
        values
      );
      if (res.data.success) {
        localStorage.setItem("_token", res.data.object.token);
        dispatch(
          setUser({
            name: res.data.object?.user?.fullname,
            id: res.data.object?.user?.id,
          })
        );
        navigate("/dashboard");
      } else {
        notification.error({
          ...notificationConfig,
          message: "Something went wrong",
        });
      }
    } catch (error) {
      if (!error.response.data.success) {
        notification.error({
          ...notificationConfig,
          message: error.response.data.message,
        });
      } else {
        notification.error({
          ...notificationConfig,
          message: "Something went wrong",
        });
      }
    }
  };

  return (
    <div className="grid grid-cols-2 h-screen">
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
              Signup
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
                Lorem ipsum dolor sit amet <br />
                <p className="text-white mb-3">
                  consectetur. Nullamcorper feugiat.
                </p>
              </p>
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
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
                    Full name
                  </Typography.Title>
                  <Field
                    id="fullname"
                    name="fullname"
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="fullname"
                        size="middle"
                        style={{ width: 320, borderRadius: 5 }}
                        placeholder="Enter your full name"
                      />
                    )}
                  />
                  <ErrorMessage
                    className="text-gray-300 text-xs"
                    name="fullname"
                    component="div"
                  />
                </div>

                <div className="mb-1">
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
                    Email
                  </Typography.Title>
                  <Field
                    id="email"
                    name="email"
                    render={({ field }) => (
                      <Input
                        {...field}
                        size="middle"
                        style={{ width: 320, borderRadius: 5 }}
                        placeholder="Enter your email"
                      />
                    )}
                  />
                  <ErrorMessage
                    className="text-gray-300 text-xs"
                    name="email"
                    component="div"
                  />
                </div>

                <div className="mb-1">
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
                    Contact number
                  </Typography.Title>
                  <Field
                    id="contact"
                    name="contact"
                    render={({ field }) => (
                      <Input
                        {...field}
                        size="middle"
                        style={{ width: 320, borderRadius: 5 }}
                        placeholder="Enter your contact number"
                      />
                    )}
                  />
                  <ErrorMessage
                    className="text-gray-300 text-xs"
                    name="contact"
                    component="div"
                  />
                </div>

                <div className="mb-1 ">
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
                        placeholder="Create password"
                        style={{ width: 320, borderRadius: 5 }}
                      />
                    )}
                  />

                  <ErrorMessage
                    className="text-gray-300 text-xs"
                    name="password"
                    component="div"
                  />
                </div>

                <div className="mb-1 ">
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
                    Confirm password
                  </Typography.Title>
                  <Field
                    id="confirm_password"
                    name="confirm_password"
                    render={({ field }) => (
                      <Input.Password
                        {...field}
                        placeholder="Confirm password"
                        style={{ width: 320, borderRadius: 5 }}
                      />
                    )}
                  />

                  <ErrorMessage
                    className="text-gray-300 text-xs"
                    name="confirm_password"
                    component="div"
                  />
                </div>

                <div className="mt-10">
                  <button
                    style={{
                      width: "320px",
                      color: "black",
                      padding: "12px 8px",
                      background:
                        "var(--Brand-Secondary_Light, color(display-p3 0.9529 0.8941 0.7098))",
                      borderRadius: "40px",
                      border: "2px solid var(--Brand-Secondary_Light, #FAE2A8)",
                    }}
                    type="submit"
                  >
                    Sign Up
                  </button>
                </div>
              </Form>
            </Formik>

            <p
              style={{
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "100%",
              }}
              className="text-white text-xs mt-6"
            >
              Already have an account?{" "}
              <Link
                to={"/signin"}
                style={{ color: "#D8A409" }}
                className="text-yellow-400"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div>
        <img src={signupImage} alt="signup.png" />
      </div>
    </div>
  );
}
