"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { IoNotificationsCircleSharp } from "react-icons/io5";
import { getCurrentUserInfo } from "../utils/GetCurrentUser";
import { apiRequest } from "../lib/axiosSetup";
import { errorMessage } from "../lib/ToastifyMessage/ToastifyMessage";
import Link from "next/link";
interface AvatarProps {
  image?: any;
  firstLetter?: string;
  email?: any;
  userType?: string;
}

const Avatar: FC<AvatarProps> = ({ firstLetter, image, email, userType }) => {
  const router = useRouter();
  const [open, setopen] = useState(false);
  const [openNotification, setNotification] = useState(false);
  const [notificationList, setNotificationList] = useState([]);
  const [unread, setUnRead] = useState();

  const cureentUser = getCurrentUserInfo();

  const submenu = useRef<HTMLDivElement>(null);

  const notificationWrapperRef = useRef<HTMLDivElement>(null);
  const toggleMenu = () => setopen(!open);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationWrapperRef.current &&
        !notificationWrapperRef.current.contains(event.target as Node)
      ) {
        setNotification(false);
      }

      if (submenu.current && !submenu.current.contains(event.target as Node)) {
        setopen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    router.push("/");
  };
  firstLetter = email?.charAt(0).toUpperCase();

  const handleGetNotification = async () => {
    const params = {
      receiverType: "USER",
      currentUserId: cureentUser?.id,
      page: 1,
      size: 5,
    };
    try {
      const res: any = await apiRequest.get("api/notification/all", { params });
      setUnRead(res?.data?.unReadCount);
      setNotificationList(res?.data?.notifications);
      // hello
    } catch (error) {
      errorMessage({ error });
    }
  };

  useEffect(() => {
    handleGetNotification();
  }, []);

  return (
    <div className="flex items-center gap-3">
      <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 shadow-md">
        <div ref={notificationWrapperRef}>
          <IoNotificationsCircleSharp
            size={28}
            className="text-blue-600 cursor-pointer"
            onClick={() => setNotification(!openNotification)}
          />
        </div>

        {/* Ping animation behind the badge */}
        <span className="absolute top-0 right-0 -mt-1 -mr-1">
          {/* Outer pulse – bigger & slower */}
          <span className="absolute inline-flex h-6 w-6 animate-ping rounded-full bg-gradient-to-r from-red-500 to-pink-500 opacity-40"></span>

          {/* Inner pulse – faster */}
          <span className="absolute inline-flex h-5 w-5 animate-ping rounded-full bg-red-500 opacity-30 animation-delay-300"></span>

          {/* Badge itself */}
          <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-tr from-red-600 via-rose-500 to-pink-600 text-xs font-black text-white shadow-xl shadow-red-600/40 ring-2 ring-white ring-offset-1 ring-offset-gray-900/80 transform transition-all duration-300 hover:scale-110 active:scale-95">
            {unread}
          </span>
        </span>
      </div>

      {image?.path ? (
        <img
          src={image?.path}
          alt="avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
      ) : (
        <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-semibold">
          {firstLetter}
        </div>
      )}

      <div className="relative inline-block text-left" ref={submenu}>
        <div
          className="flex flex-col leading-tight cursor-pointer"
          onClick={toggleMenu}
        >
          <span className="text-gray-900 font-semibold">{email}</span>
          <span className="text-sm text-gray-500">{userType}</span>
        </div>

        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white  rounded-md shadow-lg z-50">
            <div className="block cursor-pointer w-full text-left px-4 py-1 text-gray-700 hover:bg-gray-100">
              Change Password
            </div>
            <div
              className="block cursor-pointer w-full text-left px-4  text-gray-700 hover:bg-gray-100"
              onClick={handleLogout}
            >
              Logout
            </div>
          </div>
        )}

        {openNotification && (
          <div className="absolute right-7 mt-3 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
            {/* Header */}
            <div className="px-4 py-3 text-sm font-semibold text-gray-700 border-b bg-gray-50">
              Notifications
            </div>

            {/* List */}
            <ul className="list-none p-0 m-0 max-h-60 overflow-y-auto">
              {notificationList?.map((v: any, index: number) => (
                <li
                  key={index}
                  className={`flex items-start gap-3 px-4 py-3 text-sm cursor-pointer border-b border-blue-600 hover:bg-gray-100  transition ${v?.isRead === false ? " bg-gray-100 " : ""}`}
                >
                  <span className="h-8 w-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    🔔
                  </span>

                  <div className={`flex flex-col `}>
                    <p className="font-medium text-gray-800">{v?.title}</p>
                    <p className="text-xs text-gray-500">{v?.content}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Footer */}
            <Link
              href="/all_notification"
              onClick={() => setNotification(false)}
              className="px-4 py-2 text-center text-sm text-blue-600 font-medium  bg-gray-50 cursor-pointer hover:underline"
            >
              View all notifications
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Avatar;
