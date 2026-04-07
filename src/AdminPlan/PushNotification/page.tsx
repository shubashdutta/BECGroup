/* eslint-disable react-hooks/rules-of-hooks */

"use client";
import AddBtn from "@/src/Common/AddBtn";
import usePagination from "@/src/Common/Pagination/usePagination";
import { useModal } from "@/src/utils/Modal/OpenModalProvider";
import React, { useEffect, useState } from "react";
import NotificationForm from "./NotificationForm";
import { apiRequest } from "@/src/lib/axiosSetup";
import {
  errorMessage,
  successMessage,
} from "@/src/lib/ToastifyMessage/ToastifyMessage";
import CustomTable from "@/src/Common/Table";
import { getFilteredHeader } from "@/src/utils/getFilteredHeader";
import { Push_Notification_Header } from "@/src/utils/TableHeader";
import { LocalYearMonthDate } from "@/src/utils/DateTimeFormate/LocalDateFormate";
import { ICONS } from "@/asstest/icons/icons";
import RowAction from "@/src/lib/RowAction/RowAction";
import ShowActionColumn from "@/src/utils/ShowActionColumn";
import DeletedModal from "@/src/Common/DeletedModal";
import { DeleteNotification } from "@/src/ApiList/AdminApi";
import { useDrawer } from "@/src/utils/Modal/DrawerModalProvider";
import PushNotificationView from "./PushNotificationView";
import { getCurrentUserInfo } from "@/src/utils/GetCurrentUser";

const NotificationPage = () => {
  const {
    currentPage,
    handleNextPage,
    handlePageChange,
    handlePrevPage,
    itemsPerPage,
    setCurrentPage,
    setTotalPage,
    totalPage,
  } = usePagination();

  const { openModal, closeModal } = useModal();
  const { openDrawer, closeDrawer } = useDrawer();
  const [notification, setNotification] = useState([]);
  const { userType, id } = getCurrentUserInfo();

  const handleGetPushNotification = async () => {
    const params = {
      statusIn: "ACTIVE",
      ...(itemsPerPage !== "all" && {
        page: currentPage - 1,
        size: Number(itemsPerPage),
      }),
      ...(userType === "USER" && { userId: id }),
    };

    try {
      const res: any = await apiRequest.get("api/notice/all", { params });
      setNotification(res?.data);
      setTotalPage(res?.pageSize);
    } catch (error) {
      errorMessage({ error });
    }
  };

  useEffect(() => {
    handleGetPushNotification();
  }, [currentPage, itemsPerPage]);

  const TableBody = () =>
    notification?.map((v: any, index: number) => (
      <tr key={index}>
        <td>{index + 1}</td>

        <td>
          {v?.isAll
            ? "All Student"
            : v?.students
                ?.map(
                  (valu: any) =>
                    `${valu?.firstName} ${valu?.middleName ?? valu?.middleName} ${
                      valu?.lastName
                    }`,
                )
                .join(",")}
        </td>
        <td>{v?.title}</td>
        <td dangerouslySetInnerHTML={{ __html: v?.description }}></td>
        <td>{LocalYearMonthDate(v?.createdAt)}</td>

        <td>
          <ShowActionColumn
            header={getFilteredHeader(Push_Notification_Header)}
          >
            {render(v)}
          </ShowActionColumn>
        </td>
      </tr>
    ));

  const handleAddNotification = () => {
    openModal(
      "Add",
      <NotificationForm fun={handleGetPushNotification} />,
      "xxl",
    );
  };

  const handleDeleteNotification = async (row: any) => {
    try {
      const res: any = await DeleteNotification(row?.id);
      successMessage({ message: res?.message });
      handleGetPushNotification();
      closeModal();
    } catch (error) {
      errorMessage({ error });
    }
  };

  const handleView = (row: any) => {
    openDrawer("Notification View", <PushNotificationView row={row} />, "lg");
  };
  const handleDelete = (row: any) => {
    openModal(
      "Delete Student",
      <DeletedModal onConfirm={() => handleDeleteNotification(row)} />,
      "sm",
    );
  };
  const handleEdit = (row: any) => {
    openModal(
      "Update Notification",
      <NotificationForm fun={handleGetPushNotification} row={row} />,
      "xxl",
    );
  };
  const action: any = [
    {
      label: "View",
      actionType: "view",
      icons: ICONS.View,
      handler: handleView,
    },
    {
      label: "Edit",
      actionType: "edit",
      icons: ICONS.Edit,
      handler: handleEdit,
    },
    {
      label: "Delete",
      actionType: "delete",
      icons: ICONS.Delete,
      handler: handleDelete,
    },
  ];

  const render = (item: any) => <RowAction actions={action} item={item} />;

  return (
    <>
      <AddBtn lable="Add" fun={handleAddNotification} />

      <CustomTable
        TableData={notification}
        TableHeader={getFilteredHeader(Push_Notification_Header)}
        currentPage={currentPage}
        handleNext={handleNextPage}
        handlePageChange={handlePageChange}
        handlePrevPage={handlePrevPage}
        totalPage={totalPage}
        TableBody={TableBody}
      />
    </>
  );
};

export default NotificationPage;
