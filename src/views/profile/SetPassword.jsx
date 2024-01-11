import { Col, Flex, Input, Row, notification } from "antd";
import axios from "axios";
import Loader from "../../components/Loader";
import { notificationConfig } from "../../config/NotificationConfig";
import AdminLayout from "../../layouts/AdminLayout";
import { Content, Footer } from "antd/es/layout/layout";
import { useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
      "Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, and one digit"
    ),
  new_password: Yup.string()
    .required("New Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
      "New Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, and one digit"
    ),
  confirm_password: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("new_password"), null], "Passwords must match"),
});

export default function SetPassword() {
  const user = useSelector((state) => state.user);
  const userName = user.name ? user.name : "Ritesh Macwan";
  const styles = {
    headingStyle: {
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "100%",
    },
    answerStyle: {
      fontSize: "16px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "100%",
    },
  };

  let initialValues = {
    password: "",
    new_password: "",
    confirm_password: "",
  };

  const onSubmit = async (values) => {
    alert("Reset password api integration is remaining");
    return;

    try {
      const res = await axios.post(
        "http://62.72.0.179:5000/auth/login",
        values
      );
      if (res.data.token) {
        localStorage.setItem("_token", res.data.token);
        // navigate("/dashboard");
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
        : alert("something went wrong");
    } finally {
    }
  };

  return (
    <AdminLayout header={userName}>
      <Content
        style={{
          background: "#000",
          overflow: "initial",
          color: "white",
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <div
              style={{
                marginLeft: 32,
                marginTop: 12,
              }}
            >
              <Row>
                <Col style={{ ...styles.headingStyle }} span={24}>
                  <Flex justify="space-between">
                    <div className="text-3xl mt-4">Reset Password</div>
                    <div className="mr-20 mt-6">
                      <button
                        type="submit"
                        style={{
                          borderRadius: 20,
                          color: "white",
                          marginRight: 16,
                          marginTop: 8,
                        }}
                      >
                        Reset Password
                      </button>
                    </div>
                  </Flex>
                </Col>
                <Col
                  style={{ ...styles.answerStyle }}
                  span={4}
                  className="mt-8"
                >
                  Password
                </Col>
                <Col
                  style={{ ...styles.answerStyle }}
                  span={20}
                  className="mt-6"
                >
                  <Field
                    name="password"
                    render={({ field }) => (
                      <Input.Password
                        {...field}
                        autoComplete={false}
                        placeholder="Enter password"
                        style={{ width: 320, borderRadius: 5 }}
                      ></Input.Password>
                    )}
                  />
                  <ErrorMessage
                    className="text-gray-300 text-xs"
                    name="password"
                    component="div"
                  />
                </Col>
                <Col
                  style={{ ...styles.answerStyle }}
                  span={4}
                  className="mt-8"
                >
                  New Password
                </Col>
                <Col
                  style={{ ...styles.answerStyle }}
                  span={20}
                  className="mt-6"
                >
                  <Field
                    name="new_password"
                    render={({ field }) => (
                      <Input.Password
                        {...field}
                        autoComplete={false}
                        placeholder="Enter new password"
                        style={{ width: 320, borderRadius: 5 }}
                      ></Input.Password>
                    )}
                  />
                  <ErrorMessage
                    className="text-gray-300 text-xs"
                    name="new_password"
                    component="div"
                  />
                </Col>
                <Col
                  style={{ ...styles.answerStyle }}
                  span={4}
                  className="mt-8"
                >
                  Re-enter Password
                </Col>
                <Col
                  style={{ ...styles.answerStyle }}
                  span={20}
                  className="mt-6"
                >
                  <Field
                    name="confirm_password"
                    render={({ field }) => (
                      <Input.Password
                        {...field}
                        autoComplete={false}
                        placeholder="Re-enter password"
                        style={{ width: 320, borderRadius: 5 }}
                      ></Input.Password>
                    )}
                  />
                  <ErrorMessage
                    className="text-gray-300 text-xs"
                    name="confirm_password"
                    component="div"
                  />
                </Col>
              </Row>
            </div>
          </Form>
        </Formik>
      </Content>
      <Footer
        style={{
          background: "#000",
        }}
      ></Footer>
    </AdminLayout>
  );
}
