import { Result } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Link to={"/dashboard"}>Back Home</Link>}
    />
  );
}
