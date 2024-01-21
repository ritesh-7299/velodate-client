import React, { useEffect, useState } from "react";
import { Flex, Layout, Menu, Modal, Popover } from "antd";
import logoIcon from "../assets/icons/logoIcon.svg";
import { Link, useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FiUser } from "react-icons/fi";
import { LuFlagTriangleRight } from "react-icons/lu";
import { IoMdNotificationsOutline, IoIosLogOut } from "react-icons/io";
import Search from "antd/es/input/Search";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { removeUser, setUser } from "../redux/userSlice";
import axios from "axios";
import { MdOutlineEmail } from "react-icons/md";

const { Header, Sider } = Layout;
const items = [
  RxDashboard,
  FiUser,
  LuFlagTriangleRight,
  IoMdNotificationsOutline,
  MdOutlineEmail,
  IoIosLogOut,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));

const AdminLayout = ({ children, header, searchBar = true, onSearch }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.name);
  const [loader, setLoader] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showLogoutModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    handleLogout();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    setLoader(true);
    if (localStorage.getItem("_token")) {
      localStorage.removeItem("_token");
      dispatch(removeUser());
      setLoader(false);
      navigate("/signin");
    }
  };
  const setUserData = async () => {
    const res = await axios.get("http://62.72.0.179:5000/auth/getUser");
    if (res.data?.success) {
      dispatch(
        setUser({ name: res.data?.user?.fullname, id: res.data?.user?.id })
      );
    } else {
      localStorage.removeItem("_token");
    }
  };
  useEffect(() => {
    if (!username) {
      setUserData();
    }
  }, []);

  return (
    <Layout hasSider>
      {loader && <Loader />}
      <Modal
        title="Logout"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{
          background: "black",
        }}
      >
        <p>Are you sure want to logout?</p>
      </Modal>
      <Sider
        width="72px"
        style={{
          backgroundColor: "#3D3B35",
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <Link to={"/dashboard"}>
          <img className="ml-4 mt-6" src={logoIcon} alt="logo" />
        </Link>
        <Menu
          theme="dark"
          style={{
            background: "#3D3B35",
            marginBottom: "32px",
            fontSize: "30px",
          }}
          onClick={({ item, key, keyPath, selectedKeys, domEvent }) => {
            switch (key) {
              case "1":
                navigate("/dashboard");
                break;

              case "2":
                navigate("/users");
                break;

              case "3":
                navigate("/reports");
                break;

              case "4":
                navigate("/notifications");
                break;

              case "5":
                navigate("/emails");
                break;

              case "6":
                showLogoutModal();
                break;

              default:
                navigate("/notfound");
                break;
            }
          }}
          mode="inline"
          items={items}
        />
      </Sider>

      <Layout style={{ marginLeft: "72px" }}>
        <Header
          style={{
            height: "64px",
            background: "#000",
            position: "-webkit - sticky" /* Safari */,
            position: "sticky",
            top: 0,
            borderBottom: "1px solid gray",
          }}
        >
          <Flex justify="space-between" style={{ marginTop: 16 }}>
            <div
              style={{
                color: "white",
                fontSize: "20px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "100%",
              }}
            >
              {header}
            </div>
            <Flex>
              {searchBar && (
                <Search
                  placeholder="Search here..."
                  allowClear
                  onSearch={onSearch}
                  style={{
                    width: 200,
                    background: "#3D3B35",
                  }}
                />
              )}

              <FiUser
                className="user"
                style={{
                  fontSize: "24px",
                  marginLeft: 24,
                  marginTop: 2,
                  color: "white",
                }}
              />
              <p
                style={{
                  marginTop: 5,
                  marginLeft: 4,
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "100%",
                  color: "var(--Text-T1, #F6F6F6)",
                }}
              >
                <Popover
                  trigger="click"
                  className="cursor-pointer"
                  content={
                    <div>
                      <p>
                        <Link to={"/profile"}>View Profile</Link>
                      </p>
                      <hr></hr>
                      <p className="cursor-pointer" onClick={showLogoutModal}>
                        Logout
                      </p>
                    </div>
                  }
                >
                  {username ? username : ""}
                </Popover>
              </p>
              <IoMdNotificationsOutline
                className="user"
                style={{
                  fontSize: "24px",
                  marginLeft: 20,
                  marginTop: 2,
                  color: "white",
                }}
              />
            </Flex>
          </Flex>
        </Header>
        {children}
      </Layout>
    </Layout>
  );
};
export default AdminLayout;
