import { Col, Flex, Row, notification } from "antd";
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
  const [visitorsData, setVisitorsData] = useState([]);

  const setCountData = async () => {
    try {
      const res = await axios.get("https://api.velodate.com/api/counts");
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

  const optionsForActiveUsers = {
    animationEnabled: true,
    backgroundColor: "#3D3B35",
    toolTip: {
      content: "<h1>Active Users</h1><center><b>{y}</b></center>",
    },
    title: {
      text: "Active users",
    },
    axisX: {
      title: "Days",
    },
    axisY: {
      title: "Users",
    },
    data: [
      {
        type: "spline",
        dataPoints: activeUsersData,
      },
    ],
  };

  const optionsForVisitors = {
    animationEnabled: true,
    backgroundColor: "#3D3B35",
    toolTip: {
      content: "<h1>Visitors</h1><center><b>{y}</b></center>",
    },
    title: {
      text: "Visitors",
    },
    axisX: {
      title: "Days",
    },
    axisY: {
      title: "Users",
    },
    data: [
      {
        type: "spline",
        dataPoints: visitorsData,
      },
    ],
  };

  const setActiveUsers = async () => {
    try {
      const res = await axios.get(
        "https://api.velodate.com/api/getActiveUsersCountByDay"
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
            if (Math.floor(timeDiff / (1000 * 60 * 60 * 24)) > 100) return null;
            return {
              x: Math.floor(timeDiff / (1000 * 60 * 60 * 24)),
              y: Number(element.active_count),
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

  const setVisitors = async () => {
    try {
      const res = await axios.get("https://api.velodate.com/api/getVisitors");
      if (res.data.success) {
        let tempData = res.data.data
          .map((element) => {
            const activeDate = new Date(element.visit_date);

            if (isNaN(activeDate)) {
              // Handle the case where element.active_date is not a valid date string
              console.error("Invalid date format:", element.active_date);
              return null; // or handle the error in a way that suits your application
            }

            const timeDiff = new Date() - activeDate;
            if (Math.floor(timeDiff / (1000 * 60 * 60 * 24)) > 100) return null;
            return {
              x: Math.floor(timeDiff / (1000 * 60 * 60 * 24)),
              y: Number(element.visitor_count),
            };
          })
          .filter((dataPoint) => dataPoint !== null);
        setVisitorsData(tempData);
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
  }, []);

  useEffect(() => {
    setActiveUsers();
    setVisitors();
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
          style={{
            marginTop: 16,
            marginBottom: 16,
            marginLeft: 42,
            marginRight: 42,
          }}
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
          <Col style={{ backgroundColor: "#3D3B35" }} span={11}>
            <CanvasJSChart options={optionsForActiveUsers} />
          </Col>
          <Col style={{ backgroundColor: "#3D3B35" }} span={11}>
            <CanvasJSChart options={optionsForVisitors} />
          </Col>
        </Row>
      </Content>
    </AdminLayout>
  );
}
