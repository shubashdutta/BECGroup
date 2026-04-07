"use client";

import { useModal } from "@/src/utils/Modal/OpenModalProvider";
import React, { useEffect, useState } from "react";
import RoleForm from "./RoleForm";
import AddBtn from "@/src/Common/AddBtn";
import usePagination from "@/src/Common/Pagination/usePagination";
import { DeleteRole, GetRole } from "@/src/ApiList/AdminApi";
import {
  errorMessage,
  successMessage,
} from "@/src/lib/ToastifyMessage/ToastifyMessage";
import CustomTable from "@/src/Common/Table";
import { Role_Header } from "@/src/utils/TableHeader";
import {
  LocalDateTime,
  LocalYearMonthDate,
} from "@/src/utils/DateTimeFormate/LocalDateFormate";
import RowAction from "@/src/lib/RowAction/RowAction";
import ShowActionColumn from "@/src/utils/ShowActionColumn";
import { getFilteredHeader } from "@/src/utils/getFilteredHeader";
import { ICONS } from "@/asstest/icons/icons";

const RolePage = () => {
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

  const [role, setRole] = useState([]);

  const handleGetRole = async () => {
    const params = {
      statusIn: "ACTIVE",
      ...(itemsPerPage !== "all" && {
        page: currentPage - 1,
        size: Number(itemsPerPage),
      }),
    };
    try {
      const res: any = await GetRole(params);

      const data = res?.data?.map((v: any, index: number) => {
        const id = ++index;
        return {
          ...v,
          sn:
            itemsPerPage === "all"
              ? id
              : (currentPage - 1) * Number(itemsPerPage) + id,
        };
      });
      setRole(data);
      setTotalPage(res?.pageSize);
    } catch (error) {
      errorMessage({ error });
    }
  };

  useEffect(() => {
    handleGetRole();
  }, [currentPage, itemsPerPage]);
  const handleAdd = () => {
    openModal("Add Role", <RoleForm fun={handleGetRole} />, "xl");
  };

  const TableBody = () => {
    return role?.map((v: any, index: number) => (
      <tr key={index}>
        <td>{v?.sn}</td>
        <td>{v?.name ?? "-"}</td>
        <td>
          <div className="flex flex-wrap gap-2">
            {v?.permissionList?.map((perm: any) =>
              perm?.actions?.map((action: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full whitespace-nowrap"
                >
                  {action}
                </span>
              )),
            )}
          </div>
        </td>

        <td>{LocalYearMonthDate(v?.createdAt)}</td>

        <ShowActionColumn header={getFilteredHeader(Role_Header)}>
          {render(v)}
        </ShowActionColumn>
      </tr>
    ));
  };

  const handleEdit = (row: any) => {
    openModal("update Role", <RoleForm fun={handleGetRole} rowData={row} />);
  };

  const handleDelete = async (row: any) => {
    try {
      const res: any = await DeleteRole(row?.id);
      successMessage({ message: res?.message });
      handleGetRole();
    } catch (error) {
      errorMessage({ error });
    }
  };

  const action: any = [
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
      <AddBtn lable="Add" fun={handleAdd} />

      <CustomTable
        TableData={role}
        TableHeader={getFilteredHeader(Role_Header)}
        currentPage={currentPage}
        handleNext={handleNextPage}
        handlePageChange={handlePageChange}
        handlePrevPage={handlePrevPage}
        totalPage={totalPage}
        TableBody={TableBody}
        onSizeChange={handleItemsPerPageChange}
        itemsPerPage={itemsPerPage}
      />
    </>
  );
};

export default RolePage;
