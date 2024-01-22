import {
  Button,
  Col,
  Divider,
  Empty,
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
import defaultProfile from "../../assets/defaultProfile.png";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function UserDetail() {
  const { userId } = useParams();
  const [data, setData] = useState(null);
  const [empty, setEmpty] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-2",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <FaPlus className="text-white text-4xl mt-8 ml-1" />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

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

  const changeNotificationChange = async (checked, event, payloadData) => {
    try {
      let data = {};
      data[payloadData] = checked;
      const res = await axios.post(
        "http://62.72.0.179:5000/api/users/updateNotificationEmailStatus/" +
          userId,
        data
      );
      if (res.data.success) {
        setData(res.data.object[0]);

        notification.success({
          ...notificationConfig,
          message: "Notification setting updated successfully",
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
      setEmpty(true);
    } finally {
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AdminLayout header={"User details"} searchBar={false}>
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
                <Flex>
                  <Flex>
                    <Link to={"/users"}>
                      <img src={chevronUp} alt="icon" />
                    </Link>
                    <img
                      className="rounded-full w-14 h-14"
                      src={
                        data.profile_img
                          ? "http://62.72.0.179:5000/" + data.profile_img
                          : defaultProfile
                      }
                      alt="profile"
                    />
                  </Flex>
                  <Flex vertical className="ml-4">
                    <p
                      style={{
                        fontSize: "26px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "100%",
                        color: "#D19D00",
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
                {/* <Flex>
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
                  Save changes
                </Button>
              </Flex> */}
              </Flex>
              <div
                style={{
                  marginLeft: 32,
                  marginTop: 12,
                }}
              >
                <Row>
                  <Col style={{ ...styles.headingStyle }} span={24}>
                    Basic Details
                  </Col>
                  <Col
                    style={{ ...styles.headingStyle }}
                    span={4}
                    className="mt-4"
                  >
                    Gender
                  </Col>
                  <Col
                    style={{ ...styles.answerStyle }}
                    span={20}
                    className="mt-4"
                  >
                    {data?.gender ? data.gender : "-"}
                  </Col>
                  <Col
                    style={{ ...styles.headingStyle }}
                    span={4}
                    className="mt-4"
                  >
                    Phone
                  </Col>
                  <Col
                    style={{ ...styles.answerStyle }}
                    span={20}
                    className="mt-4"
                  >
                    {data?.contact ? data.contact : "-"}
                  </Col>
                  <Col
                    style={{ ...styles.headingStyle }}
                    span={4}
                    className="mt-4"
                  >
                    Email
                  </Col>
                  <Col
                    style={{ ...styles.answerStyle }}
                    span={20}
                    className="mt-4"
                  >
                    {data?.email ? data.email : "-"}
                  </Col>
                  <Col
                    style={{ ...styles.headingStyle }}
                    span={4}
                    className="mt-4"
                  >
                    Like to date
                  </Col>
                  <Col
                    style={{ ...styles.answerStyle }}
                    span={20}
                    className="mt-4"
                  >
                    {data?.liketodate ? data.liketodate : "-"}
                  </Col>
                  <Col
                    style={{ ...styles.headingStyle }}
                    span={4}
                    className="mt-4"
                  >
                    Interests
                  </Col>
                  <Col
                    style={{ ...styles.answerStyle }}
                    span={20}
                    className="mt-4"
                  >
                    {data?.thingstodo ? data.thingstodo : "-"}
                  </Col>
                </Row>
                <div className="mt-8">
                  Images
                  <Upload
                    className="mt-4 mb-4"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    showUploadList={{ showRemoveIcon: false }}
                    onChange={handleChange}
                  ></Upload>
                  <Modal
                    open={previewOpen}
                    title={previewTitle}
                    footer={null}
                    onCancel={handleCancel}
                  >
                    <img
                      alt="preview"
                      style={{
                        width: "100%",
                      }}
                      src={previewImage}
                    />
                  </Modal>
                </div>

                <div className="mt-4 mb-4 mr-16">
                  <Divider
                    style={{
                      backgroundColor: "gray",
                    }}
                  />
                </div>

                <Row>
                  <Col style={{ ...styles.headingStyle }} span={24}>
                    Phone Notifications
                  </Col>
                  <Col
                    style={{ ...styles.answerStyle }}
                    span={4}
                    className="mt-4"
                  >
                    New Match
                  </Col>
                  <Col
                    style={{ ...styles.answerStyle }}
                    span={20}
                    className="mt-4"
                  >
                    <Switch
                      onChange={(checked, event) =>
                        changeNotificationChange(
                          checked,
                          event,
                          "noti_new_matches"
                        )
                      }
                      defaultChecked={
                        data?.noti_new_matches ? data?.noti_new_matches : false
                      }
                    />
                  </Col>
                  <Col
                    style={{ ...styles.answerStyle }}
                    span={4}
                    className="mt-4"
                  >
                    New Messages
                  </Col>
                  <Col
                    style={{ ...styles.answerStyle }}
                    span={20}
                    className="mt-4"
                  >
                    <Switch
                      onChange={(checked, event) =>
                        changeNotificationChange(checked, event, "noti_new_msg")
                      }
                      defaultChecked={
                        data?.noti_new_msg ? data?.noti_new_msg : false
                      }
                    />
                  </Col>
                  <Col
                    style={{ ...styles.answerStyle }}
                    span={4}
                    className="mt-4"
                  >
                    Announcements
                  </Col>
                  <Col
                    style={{ ...styles.answerStyle }}
                    span={20}
                    className="mt-4"
                  >
                    <Switch
                      onChange={(checked, event) =>
                        changeNotificationChange(
                          checked,
                          event,
                          "noti_announcements"
                        )
                      }
                      defaultChecked={
                        data?.noti_announcements
                          ? data?.noti_announcements
                          : false
                      }
                    />
                  </Col>
                  <Col className="text-gray-400 text-xs" span={4}>
                    What's new in ValoDate
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
                    Email Notifications
                  </Col>
                  <Col
                    style={{ ...styles.answerStyle }}
                    span={4}
                    className="mt-4"
                  >
                    New Match
                  </Col>
                  <Col
                    style={{ ...styles.answerStyle }}
                    span={20}
                    className="mt-4"
                  >
                    <Switch
                      onChange={(checked, event) =>
                        changeNotificationChange(
                          checked,
                          event,
                          "email_new_matches"
                        )
                      }
                      defaultChecked={
                        data?.email_new_matches
                          ? data?.email_new_matches
                          : false
                      }
                    />
                  </Col>
                  <Col
                    style={{ ...styles.answerStyle }}
                    span={4}
                    className="mt-4"
                  >
                    New Messages
                  </Col>
                  <Col
                    style={{ ...styles.answerStyle }}
                    span={20}
                    className="mt-4"
                  >
                    <Switch
                      onChange={(checked, event) =>
                        changeNotificationChange(
                          checked,
                          event,
                          "email_new_msg"
                        )
                      }
                      defaultChecked={
                        data?.email_new_msg ? data?.email_new_msg : false
                      }
                    />
                  </Col>
                  <Col
                    style={{ ...styles.answerStyle }}
                    span={4}
                    className="mt-4"
                  >
                    Announcements
                  </Col>
                  <Col
                    style={{ ...styles.answerStyle }}
                    span={20}
                    className="mt-4"
                  >
                    <Switch
                      onChange={(checked, event) =>
                        changeNotificationChange(
                          checked,
                          event,
                          "email_announcements"
                        )
                      }
                      defaultChecked={
                        data?.email_announcements
                          ? data?.email_announcements
                          : false
                      }
                    />
                  </Col>
                  <Col className="text-gray-400 text-xs" span={4}>
                    What's new in ValoDate
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
