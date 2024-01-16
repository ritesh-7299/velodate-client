import {
  Button,
  Col,
  Divider,
  Flex,
  Modal,
  Row,
  Switch,
  Upload,
  notification,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { notificationConfig } from "../../config/NotificationConfig";
import chevronUp from "../../assets/chevronUp.svg";
import AdminLayout from "../../layouts/AdminLayout";
import { Content, Footer } from "antd/es/layout/layout";
import { FaPlus } from "react-icons/fa6";
import { RiAttachment2 } from "react-icons/ri";

const demoData = {
  date: "25/5/2023",
  user_type: "New users",
  subject: "New Function",
  body: "Lorem ipsum dolor sit amet consectetur. Viverra volutpat aliquam at fames ac enim.",
  file: "abc.png",
};

export default function EmailDetail() {
  const { notificationId } = useParams();
  const [data, setData] = useState(null);

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

  const fetchData = async () => {
    try {
      setData(demoData);
      //   const res = await axios.get(
      //     `http://62.72.0.179:5000/api/users/${userId}`
      //   );
      //   if (res.data.success) {
      //     setData(res.data.object);
      //   } else {
      //     notification.error({
      //       ...notificationConfig,
      //       message: "Something went wrong",
      //     });
      //   }
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
    <AdminLayout header={"Push Email"}>
      {data ? (
        <>
          <Content
            style={{
              background: "#000",
              overflow: "initial",
              color: "white",
            }}
          >
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
                Sent Emails
              </div>
              <Flex>
                <Button
                  style={{
                    borderRadius: 20,
                    color: "white",
                    marginRight: 16,
                    marginTop: 8,
                  }}
                >
                  Delete
                </Button>
                <Button
                  style={{
                    borderRadius: 20,
                    color: "white",
                    marginRight: 16,
                    marginTop: 8,
                  }}
                >
                  Resend
                </Button>
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
                  Date
                </Col>
                <Col
                  style={{ ...styles.answerStyle }}
                  span={20}
                  className="mt-4"
                >
                  {data?.date ? data.date : "-"}
                </Col>
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
                  {data?.user_type ? data.user_type : "-"}
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
                  {data?.subject ? data.subject : "-"}
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
                  {data?.body ? data.body : "-"}
                </Col>
                <Col
                  style={{ ...styles.headingStyle }}
                  span={4}
                  className="mt-4"
                >
                  File
                </Col>
                <Col
                  style={{ ...styles.answerStyle, display: "flex" }}
                  span={20}
                  className="mt-4"
                >
                  <RiAttachment2 />
                  {data?.file ? data.file : "-"}
                </Col>
              </Row>
            </div>
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
