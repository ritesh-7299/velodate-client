import { Col, Flex, Row, theme } from "antd";
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
    text: "Active users",
  },
  axisX: {
    valueFormatString: "MMM",
  },
  axisY: {
    title: "Days",
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
        <Row justify={"space-evenly"} className="mt-8 mb-8 h-24">
          <Col style={{ backgroundColor: "#3D3B35" }} span={4}>
            col-1
          </Col>
          <Col style={{ backgroundColor: "#3D3B35" }} span={4}>
            col-2
          </Col>
          <Col style={{ backgroundColor: "#3D3B35" }} span={4}>
            col-3
          </Col>
          <Col style={{ backgroundColor: "#3D3B35" }} span={4}>
            col-4
          </Col>
        </Row>

        <Row justify={"space-evenly"} className="mt-10 mb-8 h-auto">
          <Col style={{ backgroundColor: "#3D3B35" }} span={10}>
            <CanvasJSChart options={options} />
          </Col>
          <Col style={{ backgroundColor: "#3D3B35" }} span={10}>
            <CanvasJSChart options={options} />
          </Col>
        </Row>
      </Content>
    </AdminLayout>
  );
}
