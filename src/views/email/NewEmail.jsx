import {
  Button,
  Col,
  Flex,
  Input,
  Row,
  Select,
  Upload,
  notification,
} from "antd";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { notificationConfig } from "../../config/NotificationConfig";
import AdminLayout from "../../layouts/AdminLayout";
import { Content, Footer } from "antd/es/layout/layout";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import TextArea from "antd/es/input/TextArea";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  message: Yup.string().required("Message is required"),
});

const initialValues = {
  user_type: "",
  title: "",
  message: "",
};

export default function NewEmail() {
  let navigate = useNavigate();
  const [userType, setUserType] = useState("all_users");
  const [attachment, setAttachment] = useState(null);
  const handleChange = (value) => {
    setUserType(value);
  };
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

  const uploadFileToServer = async (fileData) => {
    const formData = new FormData();
    formData.append("image", fileData);
    try {
      const res = await axios.post(
        "https://api.velodate.com/attachment",
        formData,
        {
          "Content-Type": "multipart/form-data",
        }
      );

      if (res.data.success) {
        setAttachment(res.data.file);
        notification.success({
          ...notificationConfig,
          message: "File uploaded",
        });
      } else {
        notification.error({
          ...notificationConfig,
          message: "File not uploaded",
        });
      }
    } catch (error) {}
  };

  const props = {
    name: "file",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
      authorization: "authorization-text",
    },

    onChange(info) {
      if (info.file.status === "done") {
        uploadFileToServer(info.file.originFileObj);
      } else if (info.file.status === "error") {
        notification.error({
          ...notificationConfig,
          message: `${info.file.name} file upload failed.`,
        });
      }
    },
  };

  const onSubmit = async (values) => {
    if (userType) {
      values["target_to"] = userType;
    }
    if (attachment) {
      values["attachment"] = attachment;
    }
    try {
      const res = await axios.post(
        "https://api.velodate.com/api/email/sendEmail",
        values
      );
      if (res.data.success) {
        notification.success({
          ...notificationConfig,
          message: "Email has been sent successfully",
        });
        navigate("/emails");
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
    }
  };

  return (
    <AdminLayout searchBar={false} header={"Push Email"}>
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
              <div
                style={{
                  width: "70%",
                }}
                className="text-3xl  text-white"
              >
                New Email
              </div>
              <Flex>
                <button
                  style={{
                    borderRadius: 20,
                    color: "yellow",
                    marginRight: 16,
                    marginTop: 8,
                  }}
                  type="submit"
                >
                  Send Notification
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
                  className="mt-4"
                >
                  To
                </Col>
                <Col
                  style={{ ...styles.answerStyle }}
                  span={20}
                  className="mt-4"
                >
                  <Field
                    id="user_type"
                    name="user_type"
                    render={({ field }) => (
                      <Select
                        {...field}
                        onChange={handleChange}
                        placeholder="Select User"
                        value={userType}
                        style={{ width: 320, borderRadius: 5 }}
                        options={[
                          { value: "new_users", label: "New Users" },
                          { value: "all_users", label: "All Users" },
                        ]}
                      />
                    )}
                  />
                  <ErrorMessage
                    className="text-gray-300 text-xs"
                    name="user_type"
                    component="div"
                  />
                </Col>
                <Col
                  style={{ ...styles.headingStyle }}
                  span={4}
                  className="mt-4"
                >
                  Title
                </Col>
                <Col
                  style={{ ...styles.answerStyle }}
                  span={20}
                  className="mt-4"
                >
                  <Field
                    id="title"
                    name="title"
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="title"
                        size="middle"
                        style={{ width: 320, borderRadius: 5 }}
                        placeholder="Enter the title"
                      />
                    )}
                  />
                  <ErrorMessage
                    className="text-gray-300 text-xs"
                    name="title"
                    component="div"
                  />
                </Col>
                <Col
                  style={{ ...styles.headingStyle }}
                  span={4}
                  className="mt-4"
                >
                  Message
                </Col>
                <Col
                  style={{ ...styles.answerStyle }}
                  span={20}
                  className="mt-4"
                >
                  <Field
                    id="message"
                    name="message"
                    render={({ field }) => (
                      <TextArea
                        {...field}
                        rows={4}
                        style={{ width: 320, borderRadius: 5 }}
                        placeholder="Enter Message"
                      />
                    )}
                  />
                  <ErrorMessage
                    className="text-gray-300 text-xs"
                    name="message"
                    component="div"
                  />
                </Col>
                <Col
                  style={{ ...styles.headingStyle }}
                  span={4}
                  className="mt-4"
                >
                  Add file
                </Col>
                <Col
                  style={{ ...styles.answerStyle }}
                  span={20}
                  className="mt-4"
                >
                  <Field
                    id="file"
                    name="file"
                    render={({ field }) => (
                      <Upload {...props} maxCount={1} className="text-white">
                        <Button className="text-white">Click to Upload</Button>
                      </Upload>
                    )}
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
