"use client";

import { apiRequest } from "@/src/lib/axiosSetup";
import { errorMessage } from "@/src/lib/ToastifyMessage/ToastifyMessage";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AiOutlineCheckCircle,
  AiOutlineClockCircle,
  AiOutlineUserAdd,
  AiOutlineUsergroupAdd,
  AiOutlineHome,
} from "react-icons/ai";
import { ImMobile } from "react-icons/im";
import { getCurrentUserInfo } from "@/src/utils/GetCurrentUser";

const AdminDashboard = () => {
  const router = useRouter();
  const [dashboardData, setDashboard] = useState([]);

  const hasFetched = useRef(false);
  const cureentUser = getCurrentUserInfo();

  const dashboardConfig = [
    {
      key: "totalStudent",
      label: "Total Student",
      icon: <AiOutlineUsergroupAdd size={28} />,
      bg: "bg-gradient-to-br from-indigo-600 to-blue-700",
      link: "/student",
    },
    {
      key: "totalUser",
      label: "Total User",
      icon: <AiOutlineUserAdd size={28} />,
      link: "/user",
      bg: "bg-gradient-to-br from-violet-600 to-purple-700",
    },
    {
      key: "pendingTask",
      label: "Pending Task",
      icon: <AiOutlineClockCircle size={28} />,
      bg: "bg-gradient-to-br from-amber-600 to-orange-700",
      link: "/council",
    },
    {
      key: "totalActiveStudent",
      label: "Active Student",
      icon: <AiOutlineCheckCircle size={28} />,
      bg: "bg-gradient-to-br from-emerald-600 to-teal-700",
      link: "/student",
    },
    {
      key: "totalHostelStudent",
      label: "Hostel Student",
      icon: <AiOutlineHome size={28} />,
      link: "/hostel/student",
      bg: "bg-gradient-to-br from-blue-600 to-cyan-700",
    },
    {
      key: "totalVerifiedAppStudent",
      label: "App User",
      icon: <ImMobile size={28} />,
      bg: "bg-gradient-to-br from-fuchsia-600 to-pink-700",
      link: "/student",
    },
  ];

  const handleGetDashBoardData = async () => {
    const params = {
      ...(cureentUser?.userType !== "ADMIN" &&
        cureentUser?.userType !== "MD" && { userId: cureentUser?.id }),
    };
    try {
      const res: any = await apiRequest.get("api/analytic/dashboard", {
        params,
      });

      const formattedData: any = dashboardConfig.map((item) => ({
        label: item.label,
        value: res?.data[item.key] || 0,
        icon: item.icon,
        bg: item.bg,
        link: item.link,
      }));

      setDashboard(formattedData);
    } catch (error) {
      errorMessage(error);
    }
  };

  useEffect(() => {
    if (cureentUser && !hasFetched.current) {
      handleGetDashBoardData();
      hasFetched.current = true; // mark as fetched
    }
  }, [cureentUser]);

  return (
    <div className="w-[95%] mx-auto">
      <div className="grid grid-cols-6 gap-3">
        {dashboardData?.map((v: any, index: number) => (
          <div
            key={index}
            onClick={() => router.push(v.link)}
            className={`cursor-pointer col-span-1 border rounded-lg py-3 text-white shadow-lg ${v.bg} hover:scale-105 transition-transform`}
          >
            <div className="flex justify-center items-center gap-x-2 pb-1">
              <div>{v.icon}</div>
              <div className="text-lg font-semibold">{v.value}</div>
            </div>
            <div className="flex justify-center items-center">{v.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
