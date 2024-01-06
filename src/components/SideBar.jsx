import React from "react";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import logoIcon from "../assets/icons/logoIcon.svg";
import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FiUser } from "react-icons/fi";
import { LuFlagTriangleRight } from "react-icons/lu";
import { IoMdNotificationsOutline, IoIosLogOut } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";

const { Header, Content, Footer, Sider } = Layout;
const items = [
  RxDashboard,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));

const SideBar = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout hasSider>
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
        <img className="ml-4 mt-8" src={logoIcon} />
        {/* <Link to="/dashboard" class="Active">
          <RxDashboard
            className="mb-8 ml-4"
            style={{
              fontSize: "25px",
            }}
          />
        </Link>
        <Link to="/userList">
          <FiUser className="mb-8 ml-4" style={{ fontSize: "25px" }} />
        </Link>
        <Link to="/reports">
          <LuFlagTriangleRight
            className="mb-8 ml-4"
            style={{ fontSize: "25px" }}
          />
        </Link>
        <Link to="/notification">
          <IoMdNotificationsOutline
            className="mb-8 ml-4"
            style={{ fontSize: "25px" }}
          />{" "}
        </Link>
        <Link to="/email">
          <MdOutlineEmail className="mb-8 ml-4" style={{ fontSize: "25px" }} />{" "}
        </Link>
        <Link to="/signin">
          <IoIosLogOut
            className="mb-8 ml-4"
            style={{ fontSize: "25px", marginTop: "200px" }}
          />
        </Link> */}
        <Menu
          theme="dark"
          style={{
            background: "#3D3B35",
            marginBottom: "32px",
            fontSize: "30px",
          }}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout
        style={{
          marginLeft: 200,
        }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
          }}
        >
          <div
            style={{
              padding: 24,
              textAlign: "center",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <p>long content</p>
            {
              // indicates very long content
              Array.from(
                {
                  length: 100,
                },
                (_, index) => (
                  <React.Fragment key={index}>
                    {index % 20 === 0 && index ? "more" : "..."}
                    <br />
                  </React.Fragment>
                )
              )
            }
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default SideBar;
