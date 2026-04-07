"use client";
import { useModal } from "@/src/utils/Modal/OpenModalProvider";
import React, { useEffect, useState } from "react";
import Form from "./Form";
import AddBtn from "@/src/Common/AddBtn";
import usePagination from "@/src/Common/Pagination/usePagination";
import { DeletePermission, GetPermission } from "@/src/ApiList/AdminApi";
import {
  errorMessage,
  successMessage,
} from "@/src/lib/ToastifyMessage/ToastifyMessage";
import CustomTable from "@/src/Common/Table";
import { Permission_Header } from "@/src/utils/TableHeader";
import { LocalYearMonthDate } from "@/src/utils/DateTimeFormate/LocalDateFormate";
import { ICONS } from "@/asstest/icons/icons";
import RowAction from "@/src/lib/RowAction/RowAction";
import ShowActionColumn from "@/src/utils/ShowActionColumn";
import { getFilteredHeader } from "@/src/utils/getFilteredHeader";
import { message } from "antd";

const Permissionpage = () => {
  const { openModal } = useModal();
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

  const [permission, setPermission] = useState([]);

  const handleGetPermission = async () => {
    const params = {
      statusIn: "ACTIVE",
      ...(itemsPerPage !== "all" && {
        page: currentPage - 1,
        size: Number(itemsPerPage),
      }),
    };
    try {
      const res: any = await GetPermission(params);

      setPermission(res?.data);
      setTotalPage(res?.pageSize);
    } catch (error) {
      errorMessage({ error });
    }
  };

  useEffect(() => {
    handleGetPermission();
  }, [currentPage, itemsPerPage]);

  const TableBody = () => {
    return permission?.map((v: any, index: number) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{v?.name ?? "-"}</td>
        <td>
          {v?.actions?.length > 0 && (
            <span className="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full">
              {v?.actions.join(", ")}
            </span>
          )}
        </td>

        <td>{LocalYearMonthDate(v?.createdDate)}</td>

        <ShowActionColumn header={getFilteredHeader(Permission_Header)}>
          {render(v)}
        </ShowActionColumn>
      </tr>
    ));
  };
  const handelOpenPermissionFrom = () => {
    openModal("Add Permission", <Form fun={handleGetPermission} />);
  };

  const handleEdit = (row: any) => {
    openModal(
      "Update Permission",
      <Form fun={handleGetPermission} rowData={row} />,
    );
  };

  const handleDelete = async (row: any) => {
    try {
      const res: any = await DeletePermission(row?.id);
      successMessage({ message: res?.message });
      handleGetPermission();
    } catch (error) {
      errorMessage({ error });
    }
  };
  const handleView = () => {};

  const action: any = [
    // {
    //   label: "View",
    //   actionType: "view",
    //   icons: ICONS.View,
    //   handler: handleView,
    // },
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
      <AddBtn lable="Add" fun={handelOpenPermissionFrom} />

      <CustomTable
        TableData={permission}
        TableHeader={getFilteredHeader(Permission_Header)}
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

export default Permissionpage;
