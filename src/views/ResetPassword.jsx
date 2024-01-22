import signupImage from "../assets/signupImage.png";
import logo from "../assets/logo.svg";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Input, Typography, notification } from "antd";
import Loader from "../components/Loader";
import { notificationConfig } from "../config/NotificationConfig";

const validationSchema = Yup.object({
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
  password: "",
  confirm_password: "",
};

export default function ResetPassword() {
  const [isPasswordSet, setIsPasswordSet] = useState(false);
  const [loader, setLoader] = useState(false);
  let navigate = useNavigate();
  let { resetToken } = useParams();

  const onSubmit = async (values) => {
    try {
      setLoader(true);
      values["resettoken"] = resetToken;
      values["isAdmin"] = true;

      const res = await axios.post(
        "http://62.72.0.179:5000/auth/reset-password",
        values
      );
      if (res.data.success) {
        setIsPasswordSet(true);
        notification.success({
          ...notificationConfig,
          message: "Your password has been reset successfully",
        });
      } else {
        notification.error({
          ...notificationConfig,
          message: "Something went wrong",
          description: "Your password has not been reset",
        });
      }
    } catch (error) {
      notification.error({
        ...notificationConfig,
        message: "Something went wrong",
        description: "Your password has not been reset",
      });
    } finally {
      setLoader(false);
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
              Reset Password
            </p>
            {!isPasswordSet ? (
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
                      New password
                    </Typography.Title>
                    <Field
                      id="password"
                      name="password"
                      render={({ field }) => (
                        <Input.Password
                          {...field}
                          placeholder="Enter password"
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
                      Re-enter password
                    </Typography.Title>
                    <Field
                      id="confirm_password"
                      name="confirm_password"
                      render={({ field }) => (
                        <Input.Password
                          {...field}
                          placeholder="Re - enter password"
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
                        border:
                          "2px solid var(--Brand-Secondary_Light, #FAE2A8)",
                      }}
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              </Formik>
            ) : (
              <div className="mt-8">
                <p
                  style={{
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "150%",
                    color: "#F6F6F6",
                  }}
                >
                  Your password reset has been <br />
                  completed successfully. Kindly
                  <p className="text-white mb-3">
                    sign in to access your account.
                  </p>
                </p>
              </div>
            )}

            {isPasswordSet && (
              <p className="text-white text-xs mt-6">
                <Link to={"/signin"} className="text-white">
                  {"< Go to sign in"}
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
      <div>
        <img src={signupImage} alt="signup.png" className="loginimg" />
      </div>
      {loader && <Loader />}
    </div>
  );
}
