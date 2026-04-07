"use client";

import React, { useEffect, useState } from "react";
import { Bell, CheckCheck } from "lucide-react";
import { apiRequest } from "../lib/axiosSetup";
import {
  errorMessage,
  successMessage,
} from "../lib/ToastifyMessage/ToastifyMessage";
import { getCurrentUserInfo } from "../utils/GetCurrentUser";
import { LocalYearMonthDate } from "../utils/DateTimeFormate/LocalDateFormate";
import Dynamicpagination from "./Pagination/Pagination";
import useDynamicPagination from "./Pagination/usePagination";

import Logo from "@/asstest/Image/DashbaordLogo.png";

export default function AllNotifications() {
  const {
    currentPage,
    handleItemsPerPageChange,
    handleNextPage,
    handlePageChange,
    handlePrevPage,
    itemsPerPage,
    setCurrentPage,
    setTotalPage,
    totalPage,
  } = useDynamicPagination();
  const [notificationList, setNotificationList] = useState([]);
  const cureentUser = getCurrentUserInfo();

  const handleGetNotification = async () => {
    const params = {
      receiverType: "USER",
      currentUserId: cureentUser?.id,
      ...(itemsPerPage !== "all" && {
        size: Number(itemsPerPage),
        page: currentPage - 1,
      }),
    };
    try {
      const res: any = await apiRequest.get("api/notification/all", { params });
      setTotalPage(res?.pageSize);
      setNotificationList(res?.data?.notifications);
    } catch (error) {
      errorMessage({ error });
    }
  };

  useEffect(() => {
    handleGetNotification();
  }, [currentPage, itemsPerPage]);

  const handleSeeAllNotification = async () => {
    const payload = {
      currentUserId: cureentUser?.id,
    };
    try {
      const res: any = await apiRequest.post(
        "api/notification/change/read-status",
        payload,
      );
      successMessage({ message: res?.message });
      handleGetNotification();
    } catch (error) {
      errorMessage({ error });
    }
  };
  return (
    <div className="min-h-screen overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="mx-auto w-[680px] bg-white shadow-2xl p-6 rounded-xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl p-3 bg-indigo-50">
              <Bell className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Notifications
              </h1>
              <p className="text-sm text-gray-500">
                Stay updated with system alerts
              </p>
            </div>
          </div>

          <button
            onClick={handleSeeAllNotification}
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700 transition"
          >
            <CheckCheck size={16} />
            Mark all as read
          </button>
        </div>

        {/* Notification List */}
        <div className="space-y-4">
          {notificationList?.map((item: any, indx: number) => (
            <div
              key={item.id}
              className={`group relative flex gap-4 items-start rounded-2xl p-4 transition-all hover:shadow-md cursor-pointer ${
                !item.isRead
                  ? "bg-indigo-50 border-l-4 border-indigo-600"
                  : "bg-white border border-gray-100"
              }`}
            >
              {/* Image */}
              <img
                src={Logo.src}
                alt={item.title}
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              />

              {/* Content */}
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{item?.title}</h3>
                <p className="text-sm text-gray-600">{item?.content}</p>
              </div>

              {/* Timestamp & New Badge */}
              <div className="flex flex-col items-end gap-1">
                <p className="text-xs text-gray-400">
                  {LocalYearMonthDate(item?.createdDate)}
                </p>
                {!item.isRead && (
                  <span className="mt-1 inline-block rounded-full bg-indigo-600 px-2 py-0.5 text-xs text-white">
                    New
                  </span>
                )}
              </div>
            </div>
          ))}

          <div>
            <Dynamicpagination
              currentPage={currentPage}
              onNextPage={handleNextPage}
              onPageChange={handlePageChange}
              onPrevPage={handlePrevPage}
              onSizeChange={handleItemsPerPageChange}
              totalPage={totalPage}
              itemsPerPage={itemsPerPage}
            />
          </div>
        </div>

        {notificationList?.length === 0 && (
          <div className="mt-20 text-center text-gray-500">
            No notifications available 🎉
          </div>
        )}
      </div>
    </div>
  );
}
