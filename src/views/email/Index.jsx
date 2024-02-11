import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { Flex, Pagination, Table, notification } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import { FaPlus, FaSortAmountDown } from "react-icons/fa";
import { CiFilter } from "react-icons/ci";
import { notificationConfig } from "../../config/NotificationConfig.js";
import axios from "axios";
import Loader from "../../components/Loader.jsx";
import { Link, useNavigate } from "react-router-dom";

const columns = [
  {
    title: "Date",
    dataIndex: "date",
    render: (text) => (text ? text.split("T")[0] : "-"),
  },
  {
    title: "Subject",
    dataIndex: "title",
    render: (text) => (text ? text : "-"),
  },
  {
    title: "User type",
    dataIndex: "target_to",
    render: (text, record) =>
      text ? <Link to={"/emails/" + record.id}>{text}</Link> : "-",
  },
];

export default function Index() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [loader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchData, setSearchData] = useState(null);

  const onChange = (page, pageSize) => {
    setCurrentPage(page);
  };

  const onSearch = async (data, page = 1) => {
    try {
      if (data && data.length) {
        setSearchData(data);
      } else {
        setSearchData(null);
      }
      setLoader(true);
      const res = await axios.get(
        "https://api.velodate.com/api/searchInEmail?term=" +
          data +
          "&page=" +
          page +
          "&pageSize=10"
      );

      if (res.data?.success) {
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

  const getData = async (page) => {
    try {
      setLoader(true);
      const res = await axios.get(
        `https://api.velodate.com/api/email/getAllEmailList?page=${page}&pageSize=10`
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
    if (searchData) {
      onSearch(searchData, currentPage);
    } else {
      getData(currentPage);
    }
  }, [currentPage]);

  return (
    <AdminLayout header={"Push Email"} onSearch={onSearch}>
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
            Sent Emails
          </div>
          <div
            style={{
              width: "30%",
            }}
            className="mt-1"
          >
            <Flex justify="flex-end" gap={8}>
              <Link to={"/add-email"}>
                <FaPlus
                  style={{
                    height: 32,
                    width: 32,
                    padding: 5,
                    color: "white",
                    cursor: "pointer",
                    border: "1px solid gray",
                  }}
                />
              </Link>
              {/* <CiFilter
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
              /> */}
            </Flex>
          </div>
        </Flex>
        <div>
          <Table
            style={{
              marginLeft: 24,
              marginRight: 74,
            }}
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  navigate("/emails/" + record.id);
                },
              };
            }}
            rowClassName={"cursor-pointer"}
            sticky
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
