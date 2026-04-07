"use client";

import { GetCurrentUser } from "@/src/ApiList/AdminApi";
import Greeting from "@/src/Common/Greeting";
import StudentApplicationQr from "@/src/lib/StudentApplicationQr/StudentApplicationQr";
import { errorMessage } from "@/src/lib/ToastifyMessage/ToastifyMessage";
import React, { useEffect, useState } from "react";

const EmployeeDashboard = () => {
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
    <>
      <div className=" p-3  grid grid-cols-12 gap-x-3 shadow bg-gray-100">
        <div className=" col-span-8">
          <Greeting user={user} />
        </div>

        <div className=" col-span-4  rounded-2xl p-3 bg-white ">
          <StudentApplicationQr />
        </div>
      </div>
    </>
  );
};

export default EmployeeDashboard;
