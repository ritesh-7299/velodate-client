import signupImage from "../assets/signupImage.png";
import logo from "../assets/logo.png";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox, Input, Typography } from "antd";

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
  let navigate = useNavigate();

  const onSubmit = async (values) => {
    await axios
      .post("http://62.72.0.179:5000/auth/login", values)
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem("_token", res.data.token);
          navigate("/dashboard");
        } else {
          alert("Something went wrong");
        }
      })
      .catch(() => {
        alert("something went wrong");
      });
  };
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="bg-black">
        <div className="mt-14 ml-14">
          <img src={logo} alt="logo.png" className="h-6 w-32" />
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
                        style={{ width: 320, borderRadius: 5 }}
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
                        placeholder="input password"
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

                <div
                  style={{ alignItems: "center", display: "flex" }}
                  className="flex"
                >
                  <Checkbox onChange={onChange}>
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
                    Sign In
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
              Don't have an account?{" "}
              <Link
                to={"/signup"}
                style={{ color: "#D8A409" }}
                className="text-yellow-400"
              >
                Sign Up
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