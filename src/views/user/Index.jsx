import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import {
  Badge,
  Button,
  Checkbox,
  Divider,
  Flex,
  Pagination,
  Popover,
  Table,
  notification,
} from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import { FaSortAmountDown } from "react-icons/fa";
import { CiFilter } from "react-icons/ci";
import { notificationConfig } from "../../config/NotificationConfig.js";

import axios from "axios";
import Loader from "../../components/Loader.jsx";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "Name",
    dataIndex: "fullname",
    render: (text, record) =>
      text ? <Link to={"/users/" + record.id}>{text}</Link> : "-",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    render: (text) => (text ? text : "-"),
  },
  {
    title: "DOB",
    dataIndex: "birthdate",
    render: (text) => (text ? text.split("T")[0] : "-"),
  },
  {
    title: "Phone",
    dataIndex: "contact",
    render: (text) => (text ? text : "-"),
  },
  {
    title: "Email",
    dataIndex: "email",
    render: (text) => (text ? text : "-"),
  },
  {
    title: "Status",
    dataIndex: "isactive",
    render: (text) =>
      text ? (
        <Button style={{ borderColor: "green", color: "gray" }}>Active</Button>
      ) : (
        <Button style={{ borderColor: "red", color: "gray" }}>InActive</Button>
      ),
  },
];

export default function Index() {
  const [data, setData] = useState(null);
  const [filter, setFilter] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [loader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showBadge, setShowBadge] = useState(false);

  const onChange = (page, pageSize) => {
    setCurrentPage(page);
  };

  const getData = async (page) => {
    try {
      setLoader(true);
      const res = await axios.get(
        `https://api.velodate.com/api/users?page=${page}&pageSize=10`
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

  function areAllValuesEmpty(obj) {
    return obj ? Object.values(obj).every((value) => !value) : true;
  }

  const changeFilter = async (e) => {
    try {
      setLoader(true);
      let filterData = {};
      filterData[e.target.name] = e.target.checked ? e.target.value : undefined;

      setFilter({ ...filter, ...filterData });

      const res = await axios.post(
        "https://api.velodate.com/api/filterUsers",
        filterData
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

  const handleSort = async (type) => {
    try {
      setLoader(true);
      let orderType = type === "nto" ? "new_to_old_users" : "old_to_new_users";

      const res = await axios.get(
        "https://api.velodate.com/api/sortingUsers?order=" + orderType
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

  const onSearch = async (data) => {
    try {
      setLoader(true);
      const res = await axios.get(
        "https://api.velodate.com/api/search?fullname=" + data
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

  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);

  useEffect(() => {
    areAllValuesEmpty(filter) ? setShowBadge(false) : setShowBadge(true);
  }, [filter]);

  return (
    <AdminLayout header={"Users"} onSearch={onSearch}>
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
              <Popover
                content={
                  <div>
                    Gender
                    <p>
                      <Checkbox
                        name={"gender"}
                        value={"man"}
                        onChange={changeFilter}
                      >
                        Male
                      </Checkbox>
                    </p>
                    <p>
                      <Checkbox
                        name={"gender"}
                        value={"women"}
                        onChange={changeFilter}
                      >
                        Female
                      </Checkbox>
                    </p>
                    <Divider />
                    Status
                    <p>
                      <Checkbox
                        name={"status"}
                        value={true}
                        onChange={changeFilter}
                      >
                        Active
                      </Checkbox>
                    </p>
                    <p>
                      <Checkbox
                        name={"status"}
                        value={false}
                        onChange={changeFilter}
                      >
                        Inactive
                      </Checkbox>
                    </p>
                  </div>
                }
                trigger="click"
                className="cursor-pointer"
              >
                <Badge dot={showBadge}>
                  <CiFilter
                    style={{
                      height: 32,
                      width: 32,
                      padding: 5,
                      color: "white",
                      border: "1px solid gray",
                    }}
                  />
                </Badge>
              </Popover>
              <Popover
                trigger="click"
                className="cursor-pointer"
                placement="bottom"
                content={
                  <div>
                    <p>
                      <Button
                        type="link"
                        onClick={() => handleSort("otn")}
                        className="text-black "
                      >
                        old to new
                      </Button>
                    </p>
                    <Divider />
                    <p>
                      <Button
                        type="link"
                        onClick={() => handleSort("nto")}
                        className="text-black "
                      >
                        new to old
                      </Button>
                    </p>
                  </div>
                }
              >
                <FaSortAmountDown
                  style={{
                    height: 32,
                    width: 32,
                    padding: 5,
                    color: "white",
                    border: "1px solid gray",
                  }}
                />
              </Popover>
            </Flex>
          </div>
        </Flex>
        <div>
          <Table
            style={{
              marginLeft: 24,
              marginRight: 74,
            }}
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
