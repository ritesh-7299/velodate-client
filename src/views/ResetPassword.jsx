import signupImage from "../assets/signupImage.png";
import logo from "../assets/logo.png";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

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
  const [passwordSet, setIsPasswordSet] = useState(false);
  let navigate = useNavigate();

  const onSubmit = async (values) => {
    setIsPasswordSet(true);
    // await axios
    //   .post("http://62.72.0.179:5000/auth/forgot-password", values)
    //   .then((res) => {
    //     if (res.data.success) {
    //       navigate("/dashboard");
    //     } else {
    //       alert("Something went wrong");
    //     }
    //   })
    //   .catch(() => {
    //     alert("something went wrong");
    //   });
  };

  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="bg-black">
        <div className="mt-14 ml-14">
          <img src={logo} alt="logo.png" className="h-6 w-32" />
          <div className="mt-6">
            <p className="text-white text-3xl mb-3">Reset Password</p>
            {!passwordSet ? (
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                <Form>
                  <label className="mb-1 text-gray-300">New password</label>
                  <div className="mb-1 ">
                    <Field type="password" id="password" name="password" />
                    <ErrorMessage
                      className="text-gray-300 text-sm"
                      name="password"
                      component="div"
                    />
                  </div>

                  <label className="mb-1 text-gray-300">
                    Re-enter password
                  </label>
                  <div className="mb-1 ">
                    <Field
                      type="password"
                      id="confirm_password"
                      name="confirm_password"
                    />
                    <ErrorMessage
                      className="text-gray-300 text-sm"
                      name="confirm_password"
                      component="div"
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      class="text-white w-52 mt-6 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              </Formik>
            ) : (
              <>
                <p className="text-white mt-4 text-xs">
                  Your password reset has been
                </p>
                <p className="text-white text-xs">
                  completed successfully. Kindly
                </p>
                <p className="text-white mb-1 text-xs">
                  sign in to access your account.
                </p>
              </>
            )}

            <p className="text-white text-xs mt-6">
              <Link to={"/signin"} className="text-white">
                Go to sign in
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
