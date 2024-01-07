import { Flex, theme } from "antd";
import React from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { Content } from "antd/es/layout/layout";
import { FiUser } from "react-icons/fi";

export default function Dashboard() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <AdminLayout header={"Dashboard"}>
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
    </AdminLayout>
  );
}
