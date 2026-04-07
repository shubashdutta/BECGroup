"use client";

import { useModal } from "@/src/utils/Modal/OpenModalProvider";
import React, { useEffect, useState } from "react";
import StudentForm from "./StudentForm";
import AddBtn from "@/src/Common/AddBtn";
import usePagination from "@/src/Common/Pagination/usePagination";
import {
  DeleteStudent,
  GetStudentList,
  GetUniversityFilter,
} from "@/src/ApiList/AdminApi";
import {
  errorMessage,
  successMessage,
} from "@/src/lib/ToastifyMessage/ToastifyMessage";
import CustomTable from "@/src/Common/Table";
import { getFilteredHeader } from "@/src/utils/getFilteredHeader";
import { Student_Header } from "@/src/utils/TableHeader";
import { ICONS } from "@/asstest/icons/icons";
import RowAction from "@/src/lib/RowAction/RowAction";
import ShowActionColumn from "@/src/utils/ShowActionColumn";
import {
  PublicApplicationFormDelete,
  PublicApplicationGet,
} from "@/src/ApiList/PublicApi";
import { useRouter } from "next/navigation";
import AddStudent from "./AddStudent";
import DeletedModal from "@/src/Common/DeletedModal";
import { getCurrentUserInfo } from "@/src/utils/GetCurrentUser";
import { useDebounce } from "@/src/utils/useDebounce";
import { useConsultingStudent } from "@/store/useStudentConsulting";
import { exportToExcelDynamic } from "@/src/Common/ExcelDobwload/test";
import ExcelDonwloadBtn from "@/src/Common/ExcelDonwloadBtn";
import AssigneeChange from "../../Reception/AssigneeChange";

const StudentPage = () => {
  const { openModal } = useModal();
  const {
    currentPage,
    handleNextPage,
    handlePageChange,
    handlePrevPage,
    itemsPerPage,
    setCurrentPage,
    setTotalPage,
    handleItemsPerPageChange,
    totalPage,
  } = usePagination();

  const [studentList, setStudentList] = useState([]);
  const router = useRouter();
  const currentUser = getCurrentUserInfo();
  const [search, setSearch] = useState("");
  const [sortValue, setSortValue] = useState<any>();
  const debounce = useDebounce(search);
  const [sortOption, setSortOpion] = useState();

  const getUniversityCountry = async () => {
    const params = {
      type: "COUNTRY",
    };
    try {
      const res: any = await GetUniversityFilter(params);
      const data = res?.data?.map((v: any) => ({ label: v, value: v }));
      setSortOpion(data);
    } catch (error) {
      errorMessage({ error });
    }
  };

  useEffect(() => {
    getUniversityCountry();
  }, []);

  const handleGetStudentList = async () => {
    const params = {
      statusNot: "DELETED",
      ...(itemsPerPage !== "all" && {
        page: currentPage - 1,
        size: Number(itemsPerPage),
      }),

      ...(currentUser?.userType !== "ADMIN" &&
        currentUser?.userType !== "MD" && {
          assigneeId: currentUser?.id,
        }),

      ...(debounce && { name: search }),

      ...(sortValue && { country: sortValue?.value }),
    };
    try {
      const res: any = await PublicApplicationGet(params);
      setTotalPage(res?.pageSize);
      setStudentList(res?.data);
    } catch (error) {
      errorMessage({ error });
    }
  };

  useEffect(() => {
    handleGetStudentList();
  }, [currentPage, itemsPerPage, debounce, sortValue?.value]);

  const Table_Body = () => {
    return studentList?.map((v: any, index: number) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{`${v?.firstName ?? v?.firstName} ${
          v?.lastName ?? v?.lastName
        }`}</td>

        <td>{v?.mobileNumber}</td>
        <td>{v?.email}</td>

        <td>{v?.study}</td>
        <td>{v?.studyLevel === "doctorate" ? "PHD" : v?.studyLevel}</td>
        <td>{v?.year}</td>
        <td>{v?.studentType ?? ""}</td>
        <td>
          {v?.assignees?.map((u: any, index: number) => (
            <span
              key={u?.id || index}
              className="inline-block px-2 py-1 mr-1 mb-1 text-xs bg-blue-100 text-blue-700 rounded-full"
            >
              {u?.firstName} {u?.lastName}
              {index !== v.assignees.length - 1 && ","}
            </span>
          ))}
        </td>
        <ShowActionColumn header={getFilteredHeader(Student_Header)}>
          {render(v)}
        </ShowActionColumn>
      </tr>
    ));
  };

  const handleAdd = () => {
    openModal("Add Student", <AddStudent fun={handleGetStudentList} />, "xxl");
  };

  const handleEdit = (row: any) => {
    const email = row?.email;

    localStorage.setItem("email", JSON.stringify(email));

    localStorage.setItem(
      "isStudentVerified",
      JSON.stringify(row?.isStudentVerified),
    );
    router.push("/student-application");
    // openModal("Update Student", <StudentForm />, "xxl");
  };

  const handleEditApplicationFrom = (row: any) => {
    openModal("Edit", <AddStudent row={row} fun={handleGetStudentList} />);
  };

  const handleDeleteApplicationForm = async (row: any) => {
    try {
      const res: any = await PublicApplicationFormDelete(row?.id);
      successMessage({ message: res?.message });
      handleGetStudentList();
    } catch (error) {
      errorMessage({ error });
    }
  };

  const handleDelete = (row: any) => {
    openModal(
      "Delete Application",
      <DeletedModal onConfirm={() => handleDeleteApplicationForm(row)} />,
      "sm",
    );
  };

  const handleView = (row: any) => {
    const email = row?.email;

    localStorage.setItem("email", JSON.stringify(email));
    localStorage.setItem(
      "isStudentVerified",
      JSON.stringify(row?.isStudentVerified),
    );
    router.push("/student-details");
  };

  const getRowActions: any = (row: any) => {
    const actions = [];

    {
      row?.isStudentCreated &&
        actions.push({
          label: "View",
          actionType: "view",
          icons: ICONS.View,
          handler: handleView,
        });
    }

    // Edit is always visible

    actions.push({
      label: "Edit",
      actionType: "edit",
      icons: ICONS.Edit,
      handler: handleEditApplicationFrom,
    });

    actions.push({
      label: "document",
      actionType: "document",
      icons: ICONS.studentDetails,
      handler: handleEdit,
    });
    // SHOW Delete ONLY if student is NOT created
    if (currentUser?.userType === "ADMIN") {
      actions.push({
        label: "Delete",
        actionType: "delete",
        icons: ICONS.Delete,
        handler: handleDelete,
      });
    }

    return actions;
  };

  const render = (item: any) => (
    <RowAction actions={getRowActions(item)} item={item} />
  );
  return (
    <>
      <div className=" flex gap-x-3 justify-end ">
        {currentUser?.userType === "ADMIN" && (
          <ExcelDonwloadBtn
            fun={() =>
              exportToExcelDynamic(studentList, "consultancyStudentList.xlsx")
            }
          />
        )}
        <AddBtn lable="Add" fun={handleAdd} />
      </div>

      <CustomTable
        TableData={studentList}
        TableHeader={getFilteredHeader(Student_Header)}
        currentPage={currentPage}
        handleNext={handleNextPage}
        handlePageChange={handlePageChange}
        handlePrevPage={handlePrevPage}
        totalPage={totalPage}
        TableBody={Table_Body}
        itemsPerPage={itemsPerPage}
        onSizeChange={handleItemsPerPageChange}
        IsSearch
        SearchText={search}
        handleSearch={setSearch}
        sortBy={true}
        sortOption={sortOption}
        sortOptionValue={setSortValue}
      />
    </>
  );
};

export default StudentPage;
