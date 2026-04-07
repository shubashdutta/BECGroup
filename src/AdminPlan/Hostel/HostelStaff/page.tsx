"use client";

import AddBtn from "@/src/Common/AddBtn";
import usePagination from "@/src/Common/Pagination/usePagination";
import { useModal } from "@/src/utils/Modal/OpenModalProvider";
import React, { useEffect, useState } from "react";
import HostelStaffForm from "./HostelStaffForm";
import {
  AdminAddHostelStaff,
  AdminDeleteHostelStaff,
  AdminGetHostelStaff,
} from "@/src/ApiList/AdminApi";
import {
  errorMessage,
  successMessage,
} from "@/src/lib/ToastifyMessage/ToastifyMessage";
import CustomTable from "@/src/Common/Table";
import { getFilteredHeader } from "@/src/utils/getFilteredHeader";
import { Hostel_Staff_Header } from "@/src/utils/TableHeader";
import { HtmlDateFormat } from "@/src/utils/formatArrayToLocalDate";
import RowAction from "@/src/lib/RowAction/RowAction";
import { ICONS } from "@/asstest/icons/icons";
import ShowActionColumn from "@/src/utils/ShowActionColumn";
import { useRouter } from "next/navigation";
import { useStaffInfo } from "@/store/useStaffInfo";
import { getCurrentUserInfo } from "@/src/utils/GetCurrentUser";

const HostelStaff = () => {
  const {
    currentPage,
    handleNextPage,
    handlePageChange,
    handlePrevPage,
    itemsPerPage,
    setCurrentPage,
    setTotalPage,
    totalPage,
    handleItemsPerPageChange,
  } = usePagination();
  const { openModal, closeModal } = useModal();
  const [staff, setSatff] = useState([]);
  const setStaffData = useStaffInfo((state) => state.setStaffData);
  const { userType, id } = getCurrentUserInfo();

  const router = useRouter();

  const handleGetSaff = async () => {
    const params = {
      statusIn: "ACTIVE",
      ...(itemsPerPage !== "all" && {
        page: currentPage - 1,
        size: Number(itemsPerPage),
      }),

      ...(userType !== "ADMIN" && userType !== "MD" && { userId: id }),
    };

    try {
      const res: any = await AdminGetHostelStaff(params);
      setSatff(res?.data);
      setTotalPage(res?.pageSize);
    } catch (error) {
      errorMessage({ error });
    }
  };

  useEffect(() => {
    handleGetSaff();
  }, [currentPage, itemsPerPage]);

  const TableBody = () =>
    staff?.map((v: any, index: number) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{v?.staffName}</td>
          <td>{v?.mobileNumber}</td>
          <td>{HtmlDateFormat(v?.joinDate)}</td>
          <td>{v?.position}</td>
          <td>{v?.salary}</td>
          <ShowActionColumn header={getFilteredHeader(Hostel_Staff_Header)}>
            {render(v)}
          </ShowActionColumn>{" "}
        </tr>
      );
    });

  const handelAddStaff = () => {
    openModal(
      "Add Hostel Staff",
      <HostelStaffForm fun={handleGetSaff} />,
      "xxl",
    );
  };

  const handleView = (row: any) => {
    setStaffData(row);
    router.push("staff/staff_details");
  };

  const handleEdit = (row: any) => {
    openModal(
      "Update Staff",
      <HostelStaffForm fun={handleGetSaff} row={row} />,
      "xxl",
    );
  };
  const handleDelete = async (row: any) => {
    try {
      const res: any = await AdminDeleteHostelStaff(row?.id);
      successMessage({ message: res?.message });
      handleGetSaff();
    } catch (error) {
      errorMessage({ error });
    }
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
      actionType: "Edit",
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
      <AddBtn lable="Add" fun={handelAddStaff} />

      <CustomTable
        TableData={staff}
        TableHeader={getFilteredHeader(Hostel_Staff_Header)}
        currentPage={currentPage}
        handleNext={handleNextPage}
        handlePageChange={handlePageChange}
        handlePrevPage={handlePrevPage}
        totalPage={totalPage}
        TableBody={TableBody}
        itemsPerPage={itemsPerPage}
        onSizeChange={handleItemsPerPageChange}
      />
    </>
  );
};

export default HostelStaff;
