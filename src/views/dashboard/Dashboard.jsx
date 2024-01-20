import { Col, Flex, Row, notification, theme } from "antd";
import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { Content } from "antd/es/layout/layout";
import { FiUser } from "react-icons/fi";
import CanvasJSReact from "@canvasjs/react-charts";
import axios from "axios";
import { notificationConfig } from "../../config/NotificationConfig.js";

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
  const [counts, setCounts] = useState(null);

  const setCountData = async () => {
    try {
      const res = await axios.get("http://62.72.0.179:5000/api/counts");
      if (res.data.success) {
        setCounts(res.data.data);
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
  useEffect(() => {
    setCountData();
  }, [counts]);

  return (
    <AdminLayout header={"Dashboard"} searchBar={false}>
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
            className="cardbox"
            style={{
              // width: 260,
              // height: 88,
              background: "#3D3B35",
              alignItems: "center",
              borderRadius: 8,
              padding: 15,
            }}
          >
            <Flex gap={16}>
              <div className="iconbox">
                <FiUser style={{ fontSize: 24 }} />
              </div>
              <div>
                <h3>{counts?.new_users ? counts?.new_users : ""}</h3>
                <p>Users</p>
              </div>
            </Flex>
          </div>
          <div
            className="cardbox"
            style={{
              // width: 260,
              // height: 88,
              background: "#3D3B35",
              borderRadius: 8,
              padding: 15,
            }}
          >
            <Flex gap={16}>
              <div className="iconbox">
                <FiUser style={{ fontSize: 24 }} />
              </div>
              <div>
                <h3>{counts?.active_users ? counts?.active_users : ""}</h3>
                <p>Active Users</p>
              </div>
            </Flex>
          </div>
          <div
            className="cardbox"
            style={{
              // width: 260,
              // height: 88,
              background: "#3D3B35",
              borderRadius: 8,
              padding: 15,
            }}
          >
            <Flex gap={16}>
              <div className="iconbox">
                <FiUser style={{ fontSize: 24 }} />
              </div>
              <div>
                <h3>{counts?.meetups ? counts?.meetups : ""}</h3>
                <p>Meetups</p>
              </div>
            </Flex>
          </div>
          <div
            className="cardbox"
            style={{
              // width: 260,
              // height: 88,
              background: "#3D3B35",
              borderRadius: 8,
              padding: 15,
            }}
          >
            <Flex gap={16}>
              <div className="iconbox">
                <FiUser style={{ fontSize: 24 }} />
              </div>
              <div>
                <h3>
                  {counts?.match_ratio ? counts?.match_ratio + "%" : "0%"}
                </h3>
                <p>Match Ratio</p>
              </div>
            </Flex>
          </div>
        </Flex>

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
