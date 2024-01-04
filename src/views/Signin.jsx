import signupImage from "../assets/signupImage.png";
import logo from "../assets/logo.png";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

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
          localStorage.setItem("_token", res.data.object.token);
          navigate("/dashboard");
        } else {
          alert("Something went wrong");
        }
      })
      .catch(() => {
        alert("something went wrong");
      });
  };

  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="bg-black">
        <div className="mt-14 ml-14">
          <img src={logo} alt="logo.png" className="h-6 w-32" />
          <div className="mt-6">
            <p className="text-white text-3xl mb-1">Sign in</p>
            <p className="text-white mb-1">
              Please provide required credentials to
            </p>
            <p className="text-white mb-3">access your account.</p>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              <Form>
                <label className="mb-1 text-gray-300">
                  Email/Contact number
                </label>
                <div className="mb-1 ">
                  <Field type="text" id="username" name="username" />
                  <ErrorMessage
                    className="text-gray-300 text-sm"
                    name="username"
                    component="div"
                  />
                </div>
                <label className="mb-1 text-gray-300">Password</label>
                <div className="mb-1 ">
                  <Field type="password" id="password" name="password" />
                  <ErrorMessage
                    className="text-gray-300 text-sm"
                    name="password"
                    component="div"
                  />
                </div>
                <div className="flex">
                  <Field type="checkbox" />
                  <p className="text-white ml-1">Remember me</p>
                  <Link
                    to={"/forgot-password"}
                    className="text-yellow-400 ml-2"
                  >
                    Forgot password{" "}
                  </Link>
                </div>

                <div>
                  <button
                    type="submit"
                    class="text-white w-52 mt-6 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Sign In
                  </button>
                </div>
              </Form>
            </Formik>

            <p className="text-white text-xs mt-6">
              Don't have an account?{" "}
              <Link to={"/signup"} className="text-yellow-400">
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
