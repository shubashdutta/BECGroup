"use client";

import AddBtn from "@/src/Common/AddBtn";
import { useModal } from "@/src/utils/Modal/OpenModalProvider";
import React, { useEffect, useState } from "react";
import FooterForm from "./FooterForm";
import usePagination from "@/src/Common/Pagination/usePagination";
import { DeleteFooter, GetFooter } from "@/src/ApiList/AdminApi";
import {
  errorMessage,
  successMessage,
} from "@/src/lib/ToastifyMessage/ToastifyMessage";
import CustomTable from "@/src/Common/Table";
import { Footer_Header } from "@/src/utils/TableHeader";
import IsActive from "@/src/Common/IsActive";
import { LocalYearMonthDate } from "@/src/utils/DateTimeFormate/LocalDateFormate";
import { getFilteredHeader } from "@/src/utils/getFilteredHeader";
import { ICONS } from "@/asstest/icons/icons";
import ShowActionColumn from "@/src/utils/ShowActionColumn";
import RowAction from "@/src/lib/RowAction/RowAction";

const FooterPage = () => {
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

  const [footerList, setFootterList] = useState([]);

  const handleGetFooter = async () => {
    const params = {
      statusIn: "ACTIVE",
      ...(itemsPerPage !== "all" && {
        page: currentPage - 1,
        size: Number(itemsPerPage),
      }),
    };
    try {
      const res: any = await GetFooter(params);
      setFootterList(res?.data);
      setTotalPage(res?.pageSize);
    } catch (error) {
      errorMessage({ error });
    }
  };

  useEffect(() => {
    handleGetFooter();
  }, [currentPage, itemsPerPage]);

  const table_Body = () => {
    return footerList?.map((v: any, index: number) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>
          {v?.footerType === "COUNTRIES"
            ? "Explore Countries"
            : v?.footerType === "SERVICE"
              ? "Services"
              : v?.footerType === "TEST"
                ? "Test Preparation"
                : v?.footerType === "BRANCHES"
                  ? "Branches"
                  : v?.footerType === "INTERNATIONAL_BRANCH"
                    ? "Inter_Branch"
                    : ""}
        </td>

        <td>{v?.title ?? "-"}</td>

        <IsActive isActive={v?.isActive} />

        <td>{LocalYearMonthDate(v?.createdDate)}</td>

        <ShowActionColumn header={getFilteredHeader(Footer_Header)}>
          {render(v)}
        </ShowActionColumn>
      </tr>
    ));
  };

  const handleOpenModal = () => {
    openModal("Add Footer", <FooterForm fun={handleGetFooter} />, "xl");
  };

  const handleEdit = (row: any) => {
    openModal("Update", <FooterForm row={row} fun={handleGetFooter} />, "xl");
  };

  const handleDelete = async (row: any) => {
    try {
      const res: any = await DeleteFooter(row?.id);
      successMessage({ message: res?.message });
      handleGetFooter();
    } catch (error) {
      errorMessage({ error });
    }
  };

  const actions: any = [
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

  const render = (items: any) => <RowAction actions={actions} item={items} />;

  return (
    <>
      <AddBtn lable=" Add" fun={handleOpenModal} />

      <CustomTable
        TableData={footerList}
        TableHeader={getFilteredHeader(Footer_Header)}
        currentPage={currentPage}
        handleNext={handleNextPage}
        handlePageChange={handlePageChange}
        handlePrevPage={handlePrevPage}
        totalPage={totalPage}
        TableBody={table_Body}
        onSizeChange={handleItemsPerPageChange}
        itemsPerPage={itemsPerPage}
      />
    </>
  );
};

export default FooterPage;
