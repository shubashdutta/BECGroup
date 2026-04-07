"use client";

import { ICONS } from "@/asstest/icons/icons";
import {
  DeletePublicContactList,
  GetPublicContactList,
} from "@/src/ApiList/AdminApi";
import DeletedModal from "@/src/Common/DeletedModal";
import ExcelDonwloadBtn from "@/src/Common/ExcelDonwloadBtn";
import usePagination from "@/src/Common/Pagination/usePagination";
import PrintDynamically from "@/src/Common/printDynaically/PrintDynamically";
import CustomTable from "@/src/Common/Table";
import RowAction from "@/src/lib/RowAction/RowAction";
import {
  errorMessage,
  successMessage,
} from "@/src/lib/ToastifyMessage/ToastifyMessage";
import { getCurrentUserInfo } from "@/src/utils/GetCurrentUser";
import { useModal } from "@/src/utils/Modal/OpenModalProvider";
import { Public_Contact_Header } from "@/src/utils/TableHeader";
import React, { useEffect, useState } from "react";

const GetContactList = () => {
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

  const { userType } = getCurrentUserInfo();

  const { closeModal, openModal } = useModal();

  const [contactList, setContactList] = useState([]);

  const [contactData, setContactData] = useState([]);

  const handleGetContactList = async () => {
    const params = {
      statusIn: "ACTIVE",
      ...(itemsPerPage !== "all" && {
        page: currentPage - 1,
        size: Number(itemsPerPage),
      }),
    };

    try {
      const res: any = await GetPublicContactList(params);
      setContactList(res?.data);
      const data = res?.data?.map((v: any) => ({
        fullName: v?.fullName,
        email: v?.email,
        mobile: v?.mobile,
        country: v?.country,
      }));

      setContactData(data);

      setTotalPage(res?.pageSize);
    } catch (error) {
      errorMessage({ error });
    }
  };

  useEffect(() => {
    handleGetContactList();
  }, [currentPage, itemsPerPage]);

  const handleDeleteContactList = async (row: any) => {
    try {
      const res: any = await DeletePublicContactList(row?.id);
      successMessage({ message: res?.message });
      handleGetContactList();
      closeModal();
    } catch (error) {
      errorMessage({ error });
    }
  };

  const handleDelete = (row: any) => {
    openModal(
      "Delete Contact",
      <DeletedModal onConfirm={() => handleDeleteContactList(row)} />,
      "sm",
    );
  };

  const TableBody = () =>
    contactList?.map((v: any, index: number) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{v?.fullName ?? ""}</td>
        <td>{v?.email}</td>
        <td>{v?.mobile ?? ""}</td>

        <td>{v?.country}</td>
        <td>{render(v)}</td>
      </tr>
    ));

  const action: any = [
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
      <div className=" flex justify-end">
        <PrintDynamically data={contactData} title="Student Contact List" />
      </div>
      <CustomTable
        TableData={contactList}
        TableHeader={Public_Contact_Header}
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

export default GetContactList;
