"use client";

import { useModal } from "@/src/utils/Modal/OpenModalProvider";
import React, { useEffect, useState } from "react";
import VisaGrantedForm from "./VisaGrantedForm";
import AddBtn from "@/src/Common/AddBtn";
import usePagination from "@/src/Common/Pagination/usePagination";
import { DeleteVisaGranted, GetVisaGranted } from "@/src/ApiList/AdminApi";
import {
  errorMessage,
  successMessage,
} from "@/src/lib/ToastifyMessage/ToastifyMessage";
import CustomTable from "@/src/Common/Table";
import { getFilteredHeader } from "@/src/utils/getFilteredHeader";
import { Visa_Header } from "@/src/utils/TableHeader";
import { ICONS } from "@/asstest/icons/icons";
import RowAction from "@/src/lib/RowAction/RowAction";
import ShowActionColumn from "@/src/utils/ShowActionColumn";
import ViewVisa from "./ViewVisa";
import { useDebounce } from "@/src/utils/useDebounce";

const AdminVisaGuidancePage = () => {
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
  const [visaList, setVisaList] = useState([]);
  const [search, setSearch] = useState("");
  const debounce = useDebounce(search);

  const handleGetVisa = async () => {
    const params = {
      statusIn: "ACTIVE",
      ...(itemsPerPage !== "all" && {
        page: currentPage - 1,
        size: Number(itemsPerPage),
      }),
      ...(debounce && { name: search }),
    };
    try {
      const res: any = await GetVisaGranted(params);
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
      setVisaList(data);
      setTotalPage(res?.pageSize);
    } catch (error) {
      errorMessage({ error });
    }
  };

  useEffect(() => {
    handleGetVisa();
  }, [currentPage, itemsPerPage, debounce]);

  const Table_Boday = () => {
    return visaList?.map((v: any, index: number) => (
      <tr key={index}>
        <td>{v?.sn}</td>
        <td>{v?.studentName ?? "-"}</td>
        <td>{v?.universityName ?? "-"}</td>
        <td>{v?.courseName ?? "-"}</td>
        <td>{v?.location ?? "-"}</td>

        <ShowActionColumn header={getFilteredHeader(Visa_Header)}>
          {render(v)}
        </ShowActionColumn>
      </tr>
    ));
  };
  const handelAdd = () => {
    openModal("Add ", <VisaGrantedForm fun={handleGetVisa} />, "xl");
  };

  const handleEdit = (row: any) => {
    openModal(
      "Update",
      <VisaGrantedForm fun={handleGetVisa} row={row} />,
      "xl",
    );
  };

  const handleDelete = async (row: any) => {
    try {
      const res: any = await DeleteVisaGranted(row?.id);
      successMessage({ mesage: res?.message });
      handleGetVisa();
    } catch (error) {
      errorMessage({ error });
    }
  };

  const handleView = (row: any) => {
    openModal("View ", <ViewVisa row={row} />, "sm");
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
      <AddBtn lable="Add" fun={handelAdd} />

      <CustomTable
        TableData={visaList}
        TableHeader={getFilteredHeader(Visa_Header)}
        currentPage={currentPage}
        handleNext={handleNextPage}
        handlePageChange={handlePageChange}
        handlePrevPage={handlePrevPage}
        totalPage={totalPage}
        TableBody={Table_Boday}
        onSizeChange={handleItemsPerPageChange}
        itemsPerPage={itemsPerPage}
        IsSearch
        SearchText={search}
        handleSearch={setSearch}
      />
    </>
  );
};

export default AdminVisaGuidancePage;
