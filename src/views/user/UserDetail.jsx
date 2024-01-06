import { Button, Image, notification } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { notificationConfig } from "../../config/NotificationConfig";
import chevronUp from "../../assets/chevronUp.svg";

export default function UserDetail() {
  const { userId } = useParams();
  const [data, setData] = useState(null);
  const [loader, setLoader] = useState(false);

  const fetchData = async () => {
    try {
      setLoader(true);
      const res = await axios.get(
        `http://62.72.0.179:5000/api/users/${userId}`
      );
      if (res.data.success) {
        console.log("🚀 ~ file: UserDetail.jsx:12 ~ useEffect ~ res:", res);
        setData(res.data.object);
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
    fetchData();
  }, [userId]);

  return (
    <div className="bg-blue-400 ml-8">
      {data ? (
        <>
          <div className="mt-4 mb-2">
            <div className="flex">
              <img src={chevronUp} />
              <img
                src="http://62.72.0.179:5000/uploads/1704377924976-20210309105412.png"
                className="ml-2 rounded-full w-14 h-14"
              />
              <p className="ml-4"></p>
            </div>
          </div>
          <div className="mt-3 mb-4">Basic Details</div>
        </>
      ) : (
        console.log("noo")
      )}
      {loader && <Loader />}
      UserDetail - {userId}
    </div>
  );
}
