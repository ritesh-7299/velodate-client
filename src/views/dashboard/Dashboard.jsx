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

export default function Dashboard() {
  const [counts, setCounts] = useState(null);
  const [activeUsersData, setActiveUsersData] = useState([]);

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

  const options = {
    animationEnabled: true,
    title: {
      text: "Active users",
    },
    axisX: {
      title: "Users",
    },
    axisY: {
      title: "Days",
    },
    data: [
      {
        type: "spline",
        dataPoints: activeUsersData,
      },
    ],
  };

  const setActiveUsers = async () => {
    try {
      const res = await axios.get(
        "http://62.72.0.179:5000/api/getActiveUsersCountByDay"
      );
      if (res.data.success) {
        let tempData = res.data.data
          .map((element) => {
            const activeDate = new Date(element.active_date);

            if (isNaN(activeDate)) {
              // Handle the case where element.active_date is not a valid date string
              console.error("Invalid date format:", element.active_date);
              return null; // or handle the error in a way that suits your application
            }

            const timeDiff = new Date() - activeDate;

            return {
              y: Number(element.active_count),
              x: Math.floor(timeDiff / (1000 * 60 * 60 * 24)),
            };
          })
          .filter((dataPoint) => dataPoint !== null);
        setActiveUsersData(tempData);
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

  useEffect(() => {
    setActiveUsers();
  }, []);

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
