import { Flex, theme } from "antd";
import React from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { Content } from "antd/es/layout/layout";
import { FiUser } from "react-icons/fi";
import CanvasJSReact from "@canvasjs/react-charts";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const options = {
  animationEnabled: true,
  title: {
    text: "Monthly Sales - 2017",
  },
  axisX: {
    valueFormatString: "MMM",
  },
  axisY: {
    title: "Sales (in USD)",
    prefix: "$",
  },
  data: [
    {
      yValueFormatString: "$#,###",
      xValueFormatString: "MMMM",
      type: "spline",
      dataPoints: [
        { x: new Date(2017, 0), y: 25060 },
        { x: new Date(2017, 1), y: 27980 },
        { x: new Date(2017, 2), y: 42800 },
        { x: new Date(2017, 3), y: 32400 },
        { x: new Date(2017, 4), y: 35260 },
        { x: new Date(2017, 5), y: 33900 },
        { x: new Date(2017, 6), y: 40000 },
        { x: new Date(2017, 7), y: 52500 },
        { x: new Date(2017, 8), y: 32300 },
        { x: new Date(2017, 9), y: 42000 },
        { x: new Date(2017, 10), y: 37160 },
        { x: new Date(2017, 11), y: 38400 },
      ],
    },
  ],
};
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
          <Flex>
            <div>
              <CanvasJSChart options={options} />
            </div>
            <div>
              {/* ritesh
              <CanvasJSChart options={options} /> */}
            </div>
          </Flex>
        </div>
      </Content>
    </AdminLayout>
  );
}
