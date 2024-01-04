import signupImage from "../assets/signupImage.png";
import logo from "../assets/logo.png";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const validationSchema = Yup.object({
  email: Yup.string().required("Email is required"),
});

const initialValues = {
  email: "",
};

export default function ForgotPassword() {
  const [isEmailSent, setIsEmailSent] = useState(false);
  let navigate = useNavigate();

  const onSubmit = async (values) => {
    setIsEmailSent(true);
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
            <p className="text-white text-3xl mb-1">Forgot Password</p>
            <p className="text-white mb-1">
              Lost your password? Please enter your
            </p>
            <p className="text-white mb-3">registered email.</p>
            {!isEmailSent ? (
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                <Form>
                  <label className="mb-1 text-gray-300">Email</label>
                  <div className="mb-1 ">
                    <Field type="text" id="email" name="email" />
                    <ErrorMessage
                      className="text-gray-300 text-sm"
                      name="email"
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
                  Password reset email has been
                </p>
                <p className="text-white text-xs">
                  sent on your registered email
                </p>
                <p className="text-white mb-1 text-xs">address.</p>
              </>
            )}

            <p className="text-white text-xs mt-6">
              <Link to={"/signin"} className="text-white">
                Go back
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
