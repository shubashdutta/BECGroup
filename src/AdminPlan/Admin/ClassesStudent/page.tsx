"use client";

import AddBtn from "@/src/Common/AddBtn";
import { useModal } from "@/src/utils/Modal/OpenModalProvider";
import React, { useEffect, useState } from "react";
import ClassesStudentForm from "./ClassesStudentForm";
import { apiRequest } from "@/src/lib/axiosSetup";
import useDynamicPagination from "@/src/Common/Pagination/usePagination";
import {
  errorMessage,
  successMessage,
} from "@/src/lib/ToastifyMessage/ToastifyMessage";
import CustomTable from "@/src/Common/Table";
import { getFilteredHeader } from "@/src/utils/getFilteredHeader";
import { classStudent } from "@/src/utils/TableHeader";
import { ICONS } from "@/asstest/icons/icons";
import RowAction from "@/src/lib/RowAction/RowAction";
import ShowActionColumn from "@/src/utils/ShowActionColumn";
import { AdminDeleteClassesStudent } from "@/src/ApiList/AdminApi";
import DeletedModal from "@/src/Common/DeletedModal";
import { useRouter } from "next/navigation";
import { useClassesStudent } from "@/store/useClassesStudent";
import { getCurrentUserInfo } from "@/src/utils/GetCurrentUser";
import ToggleBtnWithAction from "@/src/Common/ToggleBtn/ToggleBtnWithAction";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { exportToExcelDynamic } from "@/src/Common/ExcelDobwload/test";
import ExcelDonwloadBtn from "@/src/Common/ExcelDonwloadBtn";
import { useDebounce } from "@/src/utils/useDebounce";

const ClassesRouterpage = () => {
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
  const { openModal } = useModal();
  const [student, setStudent] = useState([]);
  const [search, setSearch] = useState("");
  const debounce = useDebounce(search);
  const router = useRouter();

  const setClassesStudent = useClassesStudent((state) => state.setStudentData);
  const { userType, id } = getCurrentUserInfo();

  const handleGetStudent = async () => {
    const params = {
      statusIn: "ACTIVE",

      ...(itemsPerPage !== "all" && {
        size: Number(itemsPerPage),
        page: currentPage - 1,
      }),
      ...(userType !== "ADMIN" && { userId: id }),
      ...(debounce && { name: debounce }),
    };

    try {
      const res: any = await apiRequest.get("api/enrolled-student/all", {
        params,
      });

      setStudent(res?.data);
      setTotalPage(res?.pageSize);
    } catch (error) {
      errorMessage({ error });
    }
  };

  useEffect(() => {
    handleGetStudent();
  }, [currentPage, itemsPerPage, debounce]);

  const handleToggle = async (item: any) => {
    const payload = {
      id: item?.id,
      isActive: item?.isActive ? "false" : "true", // 🔁 toggle value
    };

    try {
      const res: any = await apiRequest.post(
        "api/enrolled-student/toggle/is-active",
        payload,
      );

      successMessage({ message: res?.message });
      handleGetStudent();
    } catch (error) {
      errorMessage({ error });
    }
  };

  const TableBody = () => {
    return student?.map((v: any, index: number) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{v?.fullName ?? ""}</td>

        <td>{v?.email ?? "-"}</td>
        <td>{v?.phoneNumber ?? ""}</td>

        <td>{v?.courseName ?? ""}</td>
        <td>{v?.shift ?? ""}</td>
        <td>{v?.visaType ?? ""}</td>
        <td>{v?.courseFee}</td>

        <td>
          <ToggleBtnWithAction
            defaultChecked={v?.isActive}
            onChange={() => handleToggle(v)}
          />
        </td>

        <ShowActionColumn header={getFilteredHeader(classStudent)}>
          {render(v)}
        </ShowActionColumn>
      </tr>
    ));
  };

  const handleAddClassesStudent = () => {
    openModal(
      "Add Classes Student",
      <ClassesStudentForm fun={handleGetStudent} />,
      "xxl",
    );
  };

  const handleView = (row: any) => {
    setClassesStudent(row);
    router.push("/student/classes/payment");
  };
  const handleEdit = (row: any) => {
    openModal(
      "Edit Classes Student",
      <ClassesStudentForm fun={handleGetStudent} row={row} />,
      "xxl",
    );
  };

  const handleDeleteStudent = async (row: any) => {
    try {
      const res: any = await AdminDeleteClassesStudent(row?.id);
      successMessage({ message: res?.message });
      handleGetStudent();
    } catch (error) {
      errorMessage({ error });
    }
  };
  const handleDelete = (row: any) => {
    openModal(
      "Delete",
      <DeletedModal onConfirm={() => handleDeleteStudent(row)} />,
      "sm",
    );
  };

  const actions: any = [
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
      lable: "Delete",
      actionType: "delete",
      icons: ICONS.Delete,
      handler: handleDelete,
    },
  ];

  const render = (item: any) => <RowAction actions={actions} item={item} />;

  return (
    <>
      <div className=" flex justify-end gap-x-3">
        {userType === "ADMIN" && (
          <ExcelDonwloadBtn
            fun={() => exportToExcelDynamic(student, "classesStudentList.xlsx")}
          />
        )}
        <AddBtn lable="Add" fun={handleAddClassesStudent} />
      </div>

      <CustomTable
        TableData={student}
        TableHeader={getFilteredHeader(classStudent)}
        currentPage={currentPage}
        handleNext={handleNextPage}
        handlePageChange={handlePageChange}
        handlePrevPage={handlePrevPage}
        totalPage={totalPage}
        onSizeChange={handleItemsPerPageChange}
        itemsPerPage={itemsPerPage}
        TableBody={TableBody}
        IsSearch={true}
        handleSearch={setSearch}
        SearchText={search}
      />
    </>
  );
};

export default ClassesRouterpage;
