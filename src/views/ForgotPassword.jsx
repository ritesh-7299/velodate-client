import signupImage from "../assets/signupImage.png";
import backimg from "../assets/back.svg";
import logo from "../assets/logo.svg";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input, Typography, notification } from "antd";
import Loader from "../components/Loader";
import { notificationConfig } from "../config/NotificationConfig";

const validationSchema = Yup.object({
  email: Yup.string().required("Email is required"),
});

const initialValues = {
  email: "",
};

export default function ForgotPassword() {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [loader, setLoader] = useState(false);
  let navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      setLoader(true);
      const res = await axios.post(
        "https://api.velodate.com/auth/forgot-password",
        values
      );
      if (res.data.success) {
        setIsEmailSent(true);
      } else {
        notification.error({
          ...notificationConfig,
          message: "Something went wrong",
          description: "Email has not been sent",
        });
      }
    } catch (error) {
      notification.error({
        ...notificationConfig,
        message: "Something went wrong",
        description: "Email has not been sent",
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
              Forgot Password
            </p>
            {!isEmailSent && (
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
                  Lost your password? Please enter your <br />
                  <p className="text-white mb-3">registered email.</p>
                </p>
              </div>
            )}

            {!isEmailSent ? (
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
                      Email
                    </Typography.Title>
                    <Field
                      name="email"
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="email"
                          size="middle"
                          style={{ width: 328, borderRadius: 4 }}
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

                  <div className="mt-10 signinbtn">
                    <button
                      style={{
                        width: "328px",
                        color: "black",
                        padding: "6px 8px 5px 8px",
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
                  Password reset email has been <br />
                  sent on your registered email
                  <p className="text-white mb-3">address.</p>
                </p>
              </div>
            )}

            <p className="text-white text-xs mt-6">
              <Link to={"/signin"} className="text-white">
              <img src={backimg} alt="back.svg" className="d-inline" /> {" Go back"}
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div>
        <img src={signupImage} alt="signup.png" className="loginimg" />
      </div>
    </div>
  );
}
