import "../css/signup.css";
import signupImage from "../assets/signupImage.png";
import logo from "../assets/logo.png";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";

const validationSchema = Yup.object({
  fullname: Yup.string().required("Full name is required"),
  email: Yup.string().required("Email is required"),
  contact: Yup.string().required("Contact number is required"),
  password: Yup.string().required("Password is required"),
  confirm_password: Yup.string().required("Confirm password is required"),
});

const initialValues = {
  fullname: "",
  email: "",
  contact: "",
  password: "",
  confirm_password: "",
};

const onSubmit = async (values) => {
  console.log("Form data submitted:", values);
  await axios
    .post("http://62.72.0.179:5000/auth/register", values)
    .then((res) => {
      if (res.data.success) {
        alert("successfully registered");
      }
    })
    .catch(() => {
      alert("something went wrong");
    });
  // Add your form submission logic here
};

export default function Signup() {
  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="bg-black">
        <div className="mt-14 ml-14">
          <img src={logo} alt="logo.png" className="h-6 w-32" />
          <div className="mt-6">
            <p className="text-white text-3xl mb-1">Signup</p>
            <p className="text-white mb-1">Lorem ipsum dolor sit amet</p>
            <p className="text-white mb-3">
              consectetur. Nullamcorper feugiat.
            </p>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              <Form>
                <label className="mb-1 text-gray-300">Full name</label>
                <div className="mb-1 ">
                  <Field type="text" id="fullname" name="fullname" />
                  <ErrorMessage
                    className="text-gray-300 text-sm"
                    name="fullname"
                    component="div"
                  />
                </div>

                <label className="mb-1 text-gray-300">Email</label>
                <div className="mb-1 ">
                  <Field type="text" id="email" name="email" />
                  <ErrorMessage
                    className="text-gray-300 text-sm"
                    name="email"
                    component="div"
                  />
                </div>

                <label className="mb-1 text-gray-300">Contact number</label>
                <div className="mb-1 ">
                  <Field type="text" id="contact" name="contact" />
                  <ErrorMessage
                    className="text-gray-300 text-sm"
                    name="contact"
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

                <label className="mb-1 text-gray-300">Confirm password</label>
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
                  <button className="text-gray-300 mt-2" type="submit">
                    Submit
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
      <div>
        <img src={signupImage} alt="signup.png" />
      </div>
    </div>
  );
}
