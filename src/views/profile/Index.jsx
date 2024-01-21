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
});

export default function Index() {
  const user = useSelector((state) => state.user);
  const userName = user.name ? user.name : "";
  const [data, setData] = useState(null);
  const [dob, setDOB] = useState("2024/01/16");
  const [gender, setGender] = useState(null);
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

  const handleChange = (date, dateString) => {
    setDOB(dateString);
  };

  let initialValues = {
    id: data?.id ? data?.id : null,
    fullname: data?.fullname ? data.fullname : "",
    email: data?.email ? data.email : "",
    contact: data?.contact ? data.contact : "",
    dob: data?.dob ? data?.dob?.split("T")[0].replace(/-/g, "/") : "",
    gender: data?.gender ? data.gender : "",
  };

  const onSubmit = async (values) => {
    if (dob) {
      values["dob"] = dob;
    }
    if (gender) {
      values["gender"] = gender;
    }
    setLoader(true);
    try {
      const res = await axios.put(
        "http://62.72.0.179:5000/api/updateAdmin",
        values
      );
      if (res.data?.success) {
        setData(res.data.object[0]);
        notification.success({
          ...notificationConfig,
          message: "Profile data updated successfully",
        });
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
      setLoader(false);
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://62.72.0.179:5000/auth/getUser`);
      if (res.data.success) {
        setData(res.data?.user);
        setGender(res.data.user?.gender);
        setDOB(
          res.data.user?.dob
            ? res.data.user?.dob?.split("T")[0].replace(/-/g, "/")
            : null
        );
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
    <AdminLayout header={userName} searchBar={false}>
      {loader && <Loader />}
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
                        name="dob1"
                        render={({ field }) => (
                          <DatePicker
                            {...field}
                            disabledDate={(currentDate) =>
                              currentDate && currentDate > dayjs()
                            }
                            defaultValue={dayjs(dob, dateFormat)}
                            onChange={handleChange}
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
                        name="dob"
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
                            value={gender}
                            onChange={(e) => setGender(e)}
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
                    {/* <Col
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
                        autoComplete={false}
                        placeholder="input password"
                        style={{ width: 320, borderRadius: 5 }}
                      ></Input.Password>
                    </Col> */}
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
