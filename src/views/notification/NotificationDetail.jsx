import { Button, Col, Empty, Flex, Modal, Row, notification } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { notificationConfig } from "../../config/NotificationConfig";
import AdminLayout from "../../layouts/AdminLayout";
import { Content, Footer } from "antd/es/layout/layout";

export default function NotificationDetail() {
  const navigate = useNavigate();
  const { notificationId } = useParams();
  const [data, setData] = useState(null);
  const [loader, setLoader] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        `https://api.velodate.com/api/notifications/${notificationId}`
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
        delete data.data;
        res = await axios.post(
          "https://api.velodate.com/api/notifications/send",
          { data }
        );
        message = "Notification has been sent successfully";
      } else {
        res = await axios.delete(
          "https://api.velodate.com/api/notifications/" + data.id
        );
        message = "Notification has been deleted successfully";
      }

      if (res.data.success) {
        setLoader(false);
        notification.success({
          ...notificationConfig,
          message: message,
        });
        navigate("/notifications");
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
    <AdminLayout searchBar={false} header={"Push Notification"}>
      <Modal
        title="Resend notification"
        open={isModalOpen == "resend"}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{
          background: "black",
        }}
      >
        <p>Are you sure want to resend this notification?</p>
        <p className="text-xs">This action is non-revisable.</p>
      </Modal>
      <Modal
        title="Delete"
        open={isModalOpen == "delete"}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{
          background: "black",
        }}
      >
        <p>Are you sure want to delete this notification?</p>
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
                  Sent Notifications
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
                    style={{
                      borderRadius: 20,
                      color: "white",
                      marginRight: 16,
                      marginTop: 8,
                    }}
                    onClick={showResendModal}
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
