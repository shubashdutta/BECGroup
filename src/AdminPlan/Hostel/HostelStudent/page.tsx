"use client";

import { useModal } from "@/src/utils/Modal/OpenModalProvider";
import React, { FC, useEffect, useState } from "react";
import HostelStudentForm from "./HostelStudentForm";
import AddBtn from "@/src/Common/AddBtn";
import usePagination from "@/src/Common/Pagination/usePagination";
import {
  AdminDeleteHostelStudent,
  AdminGetHostelStudent,
} from "@/src/ApiList/AdminApi";
import {
  errorMessage,
  successMessage,
} from "@/src/lib/ToastifyMessage/ToastifyMessage";
import CustomTable from "@/src/Common/Table";
import { Hostel_Student_Header } from "@/src/utils/TableHeader";
import { getFilteredHeader } from "@/src/utils/getFilteredHeader";
import { formatArrayToYMD } from "@/src/utils/formatArrayToLocalDate";
import { ICONS } from "@/asstest/icons/icons";
import RowAction from "@/src/lib/RowAction/RowAction";
import ShowActionColumn from "@/src/utils/ShowActionColumn";
import DeletedModal from "@/src/Common/DeletedModal";
import { useRouter } from "next/navigation";
import { useStudentinfo } from "@/store/useStudentInfo";
import { hostelFormPdf } from "@/src/Common/HostelStudentFormPdf/HostelFormPdf";
import { useDebounce } from "@/src/utils/useDebounce";
import { getCurrentUserInfo } from "@/src/utils/GetCurrentUser";
import ToggleBtnWithAction from "@/src/Common/ToggleBtn/ToggleBtnWithAction";
import { apiRequest } from "@/src/lib/axiosSetup";
import ExcelDonwloadBtn from "@/src/Common/ExcelDonwloadBtn";
import { exportToExcelDynamic } from "@/src/Common/ExcelDobwload/test";

const HostelStudent = () => {
  const { openModal, closeModal } = useModal();
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

  const router = useRouter();
  const cureentUser = getCurrentUserInfo();

  const setStudentData = useStudentinfo((state) => state.setStudentData);

  const [studentList, setStudentList] = useState([]);
  const [search, setSearch] = useState("");
  const debounce = useDebounce(search);
  const { userType, id } = getCurrentUserInfo();

  const handelGetStudent = async () => {
    const params = {
      statusIn: "ACTIVE",
      ...(itemsPerPage !== "all" && {
        page: currentPage - 1,
        size: Number(itemsPerPage),
      }),
      ...(debounce && { name: search }),
      ...(userType !== "ADMIN" && userType !== "MD" && { userId: id }),
    };
    try {
      const res: any = await AdminGetHostelStudent(params);

      const data = res?.data?.map((v: any, index: number) => {
        const id = ++index;
        return {
          sn:
            itemsPerPage === "all"
              ? id
              : (currentPage - 1) * Number(itemsPerPage) + id,
          ...v,
        };
      });
      setStudentList(data);
      setTotalPage(res?.pageSize);
    } catch (error) {
      errorMessage({ error });
    }
  };

  useEffect(() => {
    handelGetStudent();
  }, [currentPage, itemsPerPage, debounce]);

  const handleToggle = async (item: any) => {
    const payload = {
      id: item?.id,
      isActive: item?.isActive ? "false" : "true",
    };

    try {
      const res: any = await apiRequest.post(
        "api/hostel/student/toggle/is-active",
        payload,
      );

      successMessage({ message: res?.message });
      handelGetStudent();
    } catch (error) {
      errorMessage({ error });
    }
  };

  const TableBody = () =>
    studentList?.map((v: any, index: number) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{v?.studentName ?? ""}</td>
        <td>{v?.studentMobileNumber ?? ""}</td>
        <td>{v?.fatherContactNumber ?? ""}</td>
        <td>{formatArrayToYMD(v?.admissionDate)}</td>
        <td>
          <ToggleBtnWithAction
            defaultChecked={v?.isActive}
            onChange={() => handleToggle(v)}
          />
        </td>

        <ShowActionColumn header={getFilteredHeader(Hostel_Student_Header)}>
          {render(v)}
        </ShowActionColumn>
      </tr>
    ));

  const handleDeleteStudent = async (row: any) => {
    try {
      const res: any = await AdminDeleteHostelStudent(row?.id);
      successMessage({ message: res?.message });
      handelGetStudent();
      closeModal();
    } catch (error) {
      errorMessage({ error });
    }
  };
  const handleAdd = () => {
    openModal(
      "Add Student",
      <HostelStudentForm fun={handelGetStudent} />,
      "xxl",
    );
  };

  const handleView = (row: any) => {
    setStudentData(row);

    router.push("/hostel/student_details");
  };
  const handleEdit = (row: any) => {
    openModal(
      "Update Hostel Student",
      <HostelStudentForm fun={handelGetStudent} row={row} />,
      "xxl",
    );
  };
  const handleDelete = (row: any) => {
    openModal(
      "Delete Student",
      <DeletedModal onConfirm={() => handleDeleteStudent(row)} />,
      "sm",
    );
  };

  const handleDownload = (row: any) => {
    hostelFormPdf(row);
  };

  const action: any = [
    {
      label: "Download",
      actionType: "download",
      icons: ICONS.Download,
      handler: handleDownload,
    },
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

  const render = (item: any) => {
    return <RowAction actions={action} item={item} />;
  };

  return (
    <>
      <div className=" flex justify-end gap-x-3">
        {cureentUser?.userType === "ADMIN" && (
          <ExcelDonwloadBtn
            fun={() =>
              exportToExcelDynamic(studentList, "HostelStudentList.xlsx")
            }
          />
        )}
        <AddBtn lable="Add" fun={handleAdd} />
      </div>

      <CustomTable
        TableData={studentList}
        TableHeader={getFilteredHeader(Hostel_Student_Header)}
        currentPage={currentPage}
        handleNext={handleNextPage}
        handlePageChange={handlePageChange}
        handlePrevPage={handlePrevPage}
        totalPage={totalPage}
        TableBody={TableBody}
        onSizeChange={handleItemsPerPageChange}
        itemsPerPage={itemsPerPage}
        IsSearch
        SearchText={search}
        handleSearch={setSearch}
      />
    </>
  );
};

export default HostelStudent;
