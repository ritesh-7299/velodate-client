import {
  Col,
  DatePicker,
  Divider,
  Flex,
  Input,
  Row,
  Select,
  notification,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { notificationConfig } from "../../config/NotificationConfig";
import chevronUp from "../../assets/chevronUp.svg";
import AdminLayout from "../../layouts/AdminLayout";
import { Content, Footer } from "antd/es/layout/layout";
import { useSelector } from "react-redux";
import adminProfile from "../../assets/adminProfile.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";

const validationSchema = Yup.object({
  fullname: Yup.string().required("Full name is required"),
  email: Yup.string().required("Email is required"),
  contact: Yup.string().required("Contact number is required"),
  //   birthDate: Yup.string().required("Contact number is required"),
  //   gender: Yup.string().required("Contact number is required"),
});

export default function Index() {
  const user = useSelector((state) => state.user);
  const userId = user.id ? user.id : 11;
  const userName = user.name ? user.name : "Ritesh Macwan";
  const [data, setData] = useState(null);
  const [loader, setLoader] = useState(false);
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

  const dateFormat = "YYYY/MM/DD";

  const initialValues = {
    fullname: data?.fullname ? data.fullname : "",
    email: data?.email ? data.email : "",
    contact: data?.contact ? data.contact : "",
    dob: data?.birthDate ? dayjs(data.birthDate, dateFormat) : "",
    gender: data?.gender ? data.gender : "",
  };

  const onSubmit = async (values) => {
    alert("hii");
    setLoader(true);
    try {
      const res = await axios.post(
        "http://62.72.0.179:5000/auth/login",
        values
      );
      if (res.data.token) {
        console.log(
          "🚀 ~ file: Signin.jsx:42 ~ onSubmit ~ res.data:",
          res.data
        );

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
      setLoader(false);
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `http://62.72.0.179:5000/api/users/${userId}`
      );
      if (res.data.success) {
        setData(res.data.object);
      } else {
        notification.error({
          ...notificationConfig,
          message: "Something went wrong",
        });
      }
    } catch (error) {
      notification.error({
        ...notificationConfig,
        message: "Something went wrong",
      });
    } finally {
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AdminLayout header={userName}>
      {data ? (
        <>
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
                <Flex
                  style={{
                    marginTop: 16,
                    marginBottom: 16,
                    marginRight: 74,
                    marginLeft: 32,
                  }}
                  justify="space-between"
                >
                  <Flex>
                    <Flex>
                      <Link to={"/users"}>
                        <img src={chevronUp} alt="icon" />
                      </Link>
                      <img
                        className="rounded-full w-14 h-14"
                        src={adminProfile}
                        alt="profile"
                      />
                    </Flex>
                    <Flex vertical className="ml-4">
                      <p
                        style={{
                          fontSize: "32px",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "100%",
                          color: "yellow",
                        }}
                      >
                        {data?.fullname ? data.fullname : "-"}
                      </p>
                      <p
                        className="mt-1"
                        style={{
                          fontSize: "16px",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "100%",
                        }}
                      >
                        {data?.address ? data.address : "-"}
                      </p>
                    </Flex>
                  </Flex>
                  <Flex>
                    <button
                      type="submit"
                      style={{
                        borderRadius: 20,
                        color: "white",
                        marginRight: 16,
                        marginTop: 8,
                      }}
                    >
                      Save changes
                    </button>
                  </Flex>
                </Flex>
                <div
                  style={{
                    marginLeft: 32,
                    marginTop: 12,
                  }}
                >
                  <Row>
                    <Col
                      style={{ ...styles.headingStyle }}
                      span={4}
                      className="mt-8"
                    >
                      Full Name
                    </Col>
                    <Col
                      style={{ ...styles.answerStyle }}
                      span={20}
                      className="mt-6"
                    >
                      <Field
                        name="fullname"
                        render={({ field }) => (
                          <Input
                            {...field}
                            id="fullname"
                            size="middle"
                            style={{
                              width: 320,
                              borderRadius: 5,
                            }}
                            placeholder="Enter your full name"
                          />
                        )}
                      />
                      <ErrorMessage
                        className="text-gray-300 text-xs"
                        name="fullname"
                        component="div"
                      />
                    </Col>
                    <Col
                      style={{ ...styles.headingStyle }}
                      span={4}
                      className="mt-8"
                    >
                      Email
                    </Col>
                    <Col
                      style={{ ...styles.answerStyle }}
                      span={20}
                      className="mt-6"
                    >
                      <Field
                        name="email"
                        render={({ field }) => (
                          <Input
                            {...field}
                            id="email"
                            size="middle"
                            style={{
                              width: 320,
                              borderRadius: 5,
                            }}
                            placeholder="Enter your email"
                          />
                        )}
                      />
                      <ErrorMessage
                        className="text-gray-300 text-xs"
                        name="email"
                        component="div"
                      />
                    </Col>
                    <Col
                      style={{ ...styles.headingStyle }}
                      span={4}
                      className="mt-8"
                    >
                      Contact Number
                    </Col>
                    <Col
                      style={{ ...styles.answerStyle }}
                      span={20}
                      className="mt-6"
                    >
                      <Field
                        name="contact"
                        render={({ field }) => (
                          <Input
                            {...field}
                            id="contact"
                            size="middle"
                            style={{
                              width: 320,
                              borderRadius: 5,
                            }}
                            placeholder="Enter your contact number"
                          />
                        )}
                      />
                      <ErrorMessage
                        className="text-gray-300 text-xs"
                        name="contact"
                        component="div"
                      />
                    </Col>
                    <Col
                      style={{ ...styles.headingStyle }}
                      span={4}
                      className="mt-8"
                    >
                      DOB
                    </Col>
                    <Col
                      style={{ ...styles.answerStyle }}
                      span={20}
                      className="mt-6"
                    >
                      <Field
                        name="birtDate"
                        render={({ field }) => (
                          <DatePicker
                            {...field}
                            style={{
                              width: 320,
                              borderRadius: 5,
                            }}
                            format={dateFormat}
                          />
                        )}
                      />
                      <ErrorMessage
                        className="text-gray-300 text-xs"
                        name="birthDate"
                        component="div"
                      />
                    </Col>
                    <Col
                      style={{ ...styles.headingStyle }}
                      span={4}
                      className="mt-8"
                    >
                      Gender
                    </Col>
                    <Col
                      style={{ ...styles.answerStyle }}
                      span={20}
                      className="mt-6"
                    >
                      <Field
                        name="gender"
                        render={({ field }) => (
                          <Select
                            {...field}
                            style={{
                              width: 320,
                              borderRadius: 5,
                            }}
                            options={[
                              { value: "male", label: "Male" },
                              { value: "female", label: "Female" },
                            ]}
                          />
                        )}
                      />
                      <ErrorMessage
                        className="text-gray-300 text-xs"
                        name="gender"
                        component="div"
                      />
                    </Col>
                  </Row>

                  <div className="mt-4 mb-4 mr-16">
                    <Divider
                      style={{
                        backgroundColor: "gray",
                      }}
                    />
                  </div>

                  <Row>
                    <Col style={{ ...styles.headingStyle }} span={24}>
                      <Flex justify="space-between">
                        <div>Password</div>
                        <div className="mr-20">
                          <Link to={"/set-password"}>Reset Password</Link>
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
                      <Input.Password
                        placeholder="input password"
                        style={{ width: 320, borderRadius: 5 }}
                      ></Input.Password>
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
        </>
      ) : (
        <Loader />
      )}
    </AdminLayout>
  );
}
