import { Layout } from "antd";
import React from "react";
import SideMenu from "../Sidebar/SideMenu";
import Topbar from "../Topbar/Topbar";
import SideBar from "../../components/SideBar";

export default function Dashboard() {
  return (
    <div style={{ display: "flex", height: "100vh", width: "100%" }}>
      <Layout>
        {/* <SideMenu /> */}
        {/* <Topbar /> */}
        <SideBar />
      </Layout>
    </div>
  );
}
