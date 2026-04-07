"use client";

import AddBtn from "@/src/Common/AddBtn";
import { useModal } from "@/src/utils/Modal/OpenModalProvider";
import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import UploadUniversitycsv from "./uploadUniversitycsv";
import { DeleteUniversity, GetUniversityCount } from "@/src/ApiList/AdminApi";
import {
  errorMessage,
  successMessage,
} from "@/src/lib/ToastifyMessage/ToastifyMessage";
import usePagination from "@/src/Common/Pagination/usePagination";
import CustomTable from "@/src/Common/Table";
import { University_Header } from "@/src/utils/TableHeader";
import { getFilteredHeader } from "@/src/utils/getFilteredHeader";
import RowAction from "@/src/lib/RowAction/RowAction";
import { ICONS } from "@/asstest/icons/icons";
import DeletedModal from "@/src/Common/DeletedModal";
import { message } from "antd";
import { apiRequest } from "@/src/lib/axiosSetup";

const AdminUniversityPage = () => {
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
  const { closeModal, openModal } = useModal();
  const [universityList, setUniversityList] = useState([]);

  const handleGetUniversityList = async () => {
    const params = {
      statusIn: "ACTIVE",
      ...(itemsPerPage !== "all" && {
        page: currentPage - 1,
        size: Number(itemsPerPage),
      }),
    };
    try {
      const res: any = await apiRequest.get(
        "api/analytic/country-wise/count/csv",
        { params },
      );
      setUniversityList(res?.data?.content);
      setTotalPage(res?.pageSize);
    } catch (error) {
      errorMessage(error);
    }
  };

  useEffect(() => {
    handleGetUniversityList();
  }, [currentPage, itemsPerPage]);

  const handleAdd = () => {};
  const handelUpload = () => {
    openModal(
      "Uplaod University Csv ",
      <UploadUniversitycsv fun={handleGetUniversityList} />,
      "xl",
    );
  };

  const Table_Body = () => {
    return universityList?.map((v: any, index: number) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{v?.country}</td>
        <td>{v?.totalUniversities}</td>
        <td>{v?.totalCourses}</td>
        <td>{render(v)}</td>
      </tr>
    ));
  };

  const handleDeleteUniversity = async (row: any) => {
    try {
      const res: any = await DeleteUniversity(row?.csvUploadId);
      successMessage({ message: res?.message });
      handleGetUniversityList();
    } catch (error) {
      errorMessage({ error });
    }
  };

  const handleDelete = (row: any) => {
    openModal(
      "Delete Contact",
      <DeletedModal onConfirm={() => handleDeleteUniversity(row)} />,
      "sm",
    );
  };
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
      <div className=" flex justify-end gap-x-5">
        <div>
          <button
            type="button"
            onClick={handelUpload}
            className="flex items-center justify-center gap-x-2.5 rounded bg-blue-600 text-white py-2 px-3 cursor-pointer"
          >
            <FaCloudUploadAlt size={20} />
          </button>
        </div>

        {/* <AddBtn lable="Add" fun={handleAdd} /> */}
      </div>

      <CustomTable
        TableData={universityList}
        TableHeader={getFilteredHeader(University_Header)}
        currentPage={currentPage}
        handleNext={handleNextPage}
        handlePageChange={handlePageChange}
        handlePrevPage={handlePrevPage}
        totalPage={totalPage}
        TableBody={Table_Body}
        itemsPerPage={itemsPerPage}
        onSizeChange={handleItemsPerPageChange}
      />
    </>
  );
};

export default AdminUniversityPage;
