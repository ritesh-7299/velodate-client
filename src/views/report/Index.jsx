import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { Button, Flex, Pagination, Table, notification } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import { FaSortAmountDown } from "react-icons/fa";
import { CiFilter } from "react-icons/ci";
import { notificationConfig } from "../../config/NotificationConfig.js";

import axios from "axios";
import Loader from "../../components/Loader.jsx";

export default function Index() {
  const [data, setData] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [loader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const onChange = (page, pageSize) => {
    setCurrentPage(page);
  };

  const getData = async (page) => {
    try {
      setLoader(true);
      const res = await axios.get(
        `http://62.72.0.179:5000/api/getAllreports?page=${page}&pageSize=10`
      );
      if (res.data.success) {
        setData(res.data.data);
        setPagination(res.data.pagination);
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
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);

  const changeStatus = async (status, id) => {
    try {
      setLoader(true);
      const res = await axios.put("http://62.72.0.179:5000/api/reports/" + id, {
        report_status: status,
      });
      if (res.data?.success) {
        notification.success({
          ...notificationConfig,
          message: "Report status updated successfully",
        });
        getData(currentPage);
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
    } finally {
      setLoader(false);
    }
  };

  const columns = [
    {
      title: "User",
      dataIndex: "sender",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "Report type",
      dataIndex: "report_type",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "Receiver",
      dataIndex: "receiver",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "Date created",
      dataIndex: "contact",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "Status",
      dataIndex: "report_status",
      render: (text, record) =>
        text != "active" ? (
          <Button
            onClick={() => changeStatus("active", record.report_id)}
            style={{ borderColor: "green", color: "gray" }}
          >
            Resolved
          </Button>
        ) : (
          <Button
            onClick={() => changeStatus("resolved", record.report_id)}
            style={{ borderColor: "red", color: "gray" }}
          >
            Active
          </Button>
        ),
    },
  ];
  return (
    <AdminLayout header={"Reports"}>
      {loader && <Loader />}
      <Content
        style={{
          background: "#000",
          overflow: "initial",
        }}
      >
        <Flex
          style={{
            marginTop: 16,
            marginBottom: 16,
            marginRight: 74,
            marginLeft: 32,
          }}
        >
          <div
            style={{
              width: "70%",
            }}
          >
            1
          </div>
          <div
            style={{
              width: "30%",
            }}
          >
            <Flex justify="flex-end" gap={8}>
              <CiFilter
                style={{
                  height: 32,
                  width: 32,
                  padding: 5,
                  color: "white",
                  border: "1px solid gray",
                }}
              />
              <FaSortAmountDown
                style={{
                  height: 32,
                  width: 32,
                  padding: 5,
                  color: "white",
                  border: "1px solid gray",
                }}
              />
            </Flex>
          </div>
        </Flex>
        <div>
          <Table
            style={{
              marginLeft: 24,
              marginRight: 74,
            }}
            // rowClassName={"bg-black text-gray-300 m-1 border-1 "}
            sticky
            // scroll={{ y: "calc(100vh - 100px)" }}
            // height="300"
            responsive
            pagination={false}
            columns={columns}
            dataSource={data}
            rowKey="report_id"
          />
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
          background: "#000",
          //   background: "white",
          color: "white",
        }}
      >
        <Flex
          style={{
            marginTop: 16,
            marginBottom: 16,
            marginRight: 74,
          }}
          justify="space-between"
        >
          <div>Showing 10 rows per page</div>
          <div>
            {pagination && (
              <Pagination
                className="bg-dark text-white"
                onChange={onChange}
                defaultCurrent={pagination?.currentPage || 1}
                total={pagination?.totalItems || 1}
              />
            )}
          </div>
        </Flex>
      </Footer>
    </AdminLayout>
  );
}
