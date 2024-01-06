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
import { Flex, Input, Layout, Menu, theme } from "antd";
import logoIcon from "../assets/icons/logoIcon.svg";
import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FiUser } from "react-icons/fi";
import { LuFlagTriangleRight } from "react-icons/lu";
import { IoMdNotificationsOutline, IoIosLogOut } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";
import Search from "antd/es/input/Search";

const { Header, Content, Footer, Sider } = Layout;
const items = [
  RxDashboard,
  FiUser,
  LuFlagTriangleRight,
  IoMdNotificationsOutline,
  IoIosLogOut,
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

      <Layout style={{ marginLeft: "72px" }}>
        <Header
          style={{
            height: "64px",
            background: "#000",
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
              Dashboard
            </div>
            <Flex>
              <Search
                placeholder="Search here..."
                allowClear
                // onSearch={onSearch}
                style={{
                  width: 200,
                  background: "#3D3B35",
                }}
              />
              <FiUser
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
                Ritesh Macwan
              </p>
              <IoMdNotificationsOutline
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
        <Content
          style={{
            background: "#000",
            overflow: "initial",
          }}
        >
          <Flex
            gap={49}
            style={{ marginTop: 16, marginBottom: 16, marginLeft: 32 }}
          >
            <div
              style={{
                width: 260,
                height: 88,
                background: "#3D3B35",
                alignItems: "center",
                borderRadius: 8,
              }}
            >
              <Flex gap={16}>
                <FiUser style={{ fontSize: 24 }} />
                <div>
                  <p>400</p>
                  <p>Users</p>
                </div>
              </Flex>
            </div>
            <div
              style={{
                width: 260,
                height: 88,
                background: "#3D3B35",
                borderRadius: 8,
              }}
            >
              2
            </div>
            <div
              style={{
                width: 260,
                height: 88,
                background: "#3D3B35",
                borderRadius: 8,
              }}
            >
              3
            </div>
            <div
              style={{
                width: 260,
                height: 88,
                background: "#3D3B35",
                borderRadius: 8,
              }}
            >
              4
            </div>
          </Flex>
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
