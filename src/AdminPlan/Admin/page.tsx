"use client";

import { GetCureentAdmin, GetCurrentUser } from "@/src/ApiList/AdminApi";
import Greeting from "@/src/Common/Greeting";
import StudentApplicationQr from "@/src/lib/StudentApplicationQr/StudentApplicationQr";
import { errorMessage } from "@/src/lib/ToastifyMessage/ToastifyMessage";
import { useEffect, useState } from "react";
import AdminDashboard from "./AdminDashboard";
import PaiChart from "./PaiChart";
import LineChart from "./LineChart";
import { FcGraduationCap } from "react-icons/fc";

const AdminDashboardPage = () => {
  const [user, setUser] = useState([]);

  const handleGetUserInfo = async () => {
    try {
      const res: any = await GetCurrentUser();
      setUser(res?.data);
    } catch (error) {
      errorMessage({ error });
    }
  };

  useEffect(() => {
    handleGetUserInfo();
  }, []);
  return (
    <div>
      <div className=" p-3  grid grid-cols-12 mb-3 gap-x-3 shadow bg-gray-100 ">
        <div className=" col-span-8">
          <Greeting user={user} />
        </div>

        <div className=" col-span-4  rounded-2xl p-3 bg-white ">
          <StudentApplicationQr />
        </div>
      </div>

      <div>
        <AdminDashboard />
      </div>

      <div className=" grid grid-cols-12 mt-1.5    gap-x-5 ">
        <div className=" col-span-8 shadow p-3">
          <h3 className="mb-2 text-lg text-center flex items-center justify-center space-x-2 font-semibold">
            <FcGraduationCap size={20} />
            <span>Student Registration</span>
          </h3>

          <LineChart />
        </div>
        <div className=" col-span-4 shadow">
          <PaiChart />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
