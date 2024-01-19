import { Button, Col, Flex, Row, notification } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { notificationConfig } from "../../config/NotificationConfig";
import AdminLayout from "../../layouts/AdminLayout";
import { Content, Footer } from "antd/es/layout/layout";
import { RiAttachment2 } from "react-icons/ri";

export default function EmailDetail() {
  const { emailId } = useParams();
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

  const fetchData = async () => {
    try {
      setLoader(true);
      const res = await axios.get(
        `http://62.72.0.179:5000/api/email/getEmailById/${emailId}`
      );
      console.log("🚀 ~ fetchData ~ res:", res);
      if (res.data.success) {
        setData(res.data.object[0]);
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
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AdminLayout header={"Push Email"}>
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
                  {data?.date ? data.date.split("T")[0] : "-"}
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
                  {data?.target_to ? data.target_to : "-"}
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
                  {data?.title ? data.title : "-"}
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
                  {data?.message ? data.message : "-"}
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
                  {data?.file ? (
                    <>
                      <RiAttachment2 /> {data.file}
                    </>
                  ) : (
                    "-"
                  )}
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
