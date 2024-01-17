import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { Flex, Pagination, Table, notification } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import { FaPlus, FaSortAmountDown } from "react-icons/fa";
import { CiFilter } from "react-icons/ci";
import { notificationConfig } from "../../config/NotificationConfig.js";
import axios from "axios";
import Loader from "../../components/Loader.jsx";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "Date",
    dataIndex: "date",
    render: (text) => (text ? text : "-"),
  },
  {
    title: "Subject",
    dataIndex: "subject",
    render: (text) => (text ? text : "-"),
  },
  {
    title: "User type",
    dataIndex: "user_type",
    render: (text, record) =>
      text ? <Link to={"/notifications/" + record.id}>{text}</Link> : "-",
  },
];

const data = [
  {
    id: 1,
    date: "2021-05-31",
    subject: "Fake",
    user_type: "New users",
  },
  {
    id: 2,
    date: "2021-05-31",
    subject: "Scam or commercial",
    user_type: "D7 users",
  },
  {
    id: 3,
    date: "2021-05-31",
    subject: "Scam or commercial",
    user_type: "New users",
  },
  {
    id: 4,
    date: "2021-05-31",
    subject: "Underage",
    user_type: "New users",
  },
  {
    id: 5,
    date: "2021-05-31",
    subject: "Underage",
    user_type: "New users",
  },
  {
    id: 6,
    date: "2021-05-31",
    subject: "Underage",
    user_type: "New users",
  },
  {
    id: 7,
    date: "2021-05-31",
    subject: "Underage",
    user_type: "New users",
  },
];

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === "Disabled User",
    // Column configuration not to be checked
    name: record.name,
  }),
};

export default function Index() {
  //   const [data, setData] = useState(null);
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
        // setData(res.data.data);
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
    // getData(currentPage);
  }, [currentPage]);

  return (
    <AdminLayout header={"Push Notification"}>
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
            className="text-3xl  text-white"
          >
            Sent Notifications
          </div>
          <div
            style={{
              width: "30%",
            }}
            className="mt-1"
          >
            <Flex justify="flex-end" gap={8}>
              <Link to={"/add-notification"}>
                <FaPlus
                  style={{
                    height: 24,
                    width: 24,
                    color: "white",
                    cursor: "pointer",
                    border: "1px solid gray",
                  }}
                />
              </Link>
              <CiFilter
                style={{
                  height: 24,
                  width: 24,
                  color: "white",
                  border: "1px solid gray",
                }}
              />
              <FaSortAmountDown
                style={{
                  height: 24,
                  width: 24,
                  padding: 3,
                  color: "white",
                  border: "1px solid gray",
                }}
              />
            </Flex>
          </div>
        </Flex>
        <div>
          <Table
            // rowSelection={{
            //   type: "checkbox",
            //   ...rowSelection,
            // }}
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
            rowKey="id"
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
                className="bg-white text-white"
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
