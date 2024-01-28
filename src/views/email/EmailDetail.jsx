import { Button, Col, Empty, Flex, Modal, Row, notification } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { notificationConfig } from "../../config/NotificationConfig";
import AdminLayout from "../../layouts/AdminLayout";
import { Content, Footer } from "antd/es/layout/layout";
import { RiAttachment2 } from "react-icons/ri";

export default function EmailDetail() {
  const navigate = useNavigate();
  const { emailId } = useParams();
  const [data, setData] = useState(null);
  const [loader, setLoader] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [empty, setEmpty] = useState(false);

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
      const res = await axios.get(
        `https://api.velodate.com/api/email/getEmailById/${emailId}`
      );
      if (res.data.success) {
        if (!res.data.object.length) {
          setEmpty(true);
        }
        setData(res.data.object[0]);
      } else {
        notification.error({
          ...notificationConfig,
          message: "Something went wrong",
        });
      }
    } catch (error) {
      setEmpty(true);
      notification.error({
        ...notificationConfig,
        message: "Something went wrong",
      });
    } finally {
    }
  };

  const showResendModal = () => {
    setIsModalOpen("resend");
  };

  const showDeleteModal = () => {
    setIsModalOpen("delete");
  };

  const handleOk = async () => {
    try {
      setLoader(true);
      let type = isModalOpen;
      setIsModalOpen(false);
      let res = {};
      let message = "";
      if (type == "resend") {
        res = await axios.post(
          "https://api.velodate.com/api/email/sendEmail",
          data
        );
        message = "Email has been sent successfully";
      } else {
        res = await axios.delete(
          "https://api.velodate.com/api/email/" + data.id
        );
        message = "Email has been deleted successfully";
      }

      if (res.data.success) {
        notification.success({
          ...notificationConfig,
          message: message,
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
    } finally {
      setLoader(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AdminLayout header={"Push Email"}>
      {loader && <Loader />}
      <Modal
        title="Resend email"
        open={isModalOpen == "resend"}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{
          background: "black",
        }}
      >
        <p>Are you sure want to resend this email?</p>
        <p className="text-xs">This action is non-revisable.</p>
      </Modal>
      <Modal
        title="Delete email"
        open={isModalOpen == "delete"}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{
          background: "black",
        }}
      >
        <p>Are you sure want to delete this email?</p>
        <p className="text-xs">This action is non-revisable.</p>
      </Modal>
      {!empty ? (
        data ? (
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
                    onClick={showDeleteModal}
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={showResendModal}
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
        )
      ) : (
        <Empty />
      )}
    </AdminLayout>
  );
}
