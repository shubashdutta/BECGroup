"use client";

import { useModal } from "@/src/utils/Modal/OpenModalProvider";
import React, { useEffect, useState } from "react";
import EmployeeForm from "./EmployeeForm";
import AddBtn from "@/src/Common/AddBtn";
import usePagination from "@/src/Common/Pagination/usePagination";
import { DeleteEmployee, GetEmployee } from "@/src/ApiList/AdminApi";
import {
  errorMessage,
  successMessage,
} from "@/src/lib/ToastifyMessage/ToastifyMessage";
import CustomTable from "@/src/Common/Table";
import { Employee_Header } from "@/src/utils/TableHeader";
import { getFilteredHeader } from "@/src/utils/getFilteredHeader";
import { ICONS } from "@/asstest/icons/icons";
import RowAction from "@/src/lib/RowAction/RowAction";
import ShowActionColumn from "@/src/utils/ShowActionColumn";
import { useRouter } from "next/navigation";
import { useEmployee } from "@/store/useEmpolyeeInfo";
import EmployeeSalary from "./salary/EmployeeSalary";
import { useDebounce } from "@/src/utils/useDebounce";

const EmpoyeePage = () => {
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
  const { openModal } = useModal();
  const [employee, setEmployee] = useState([]);
  const [search, setSearch] = useState("");
  const debounce = useDebounce(search);

  const setEmployeeData = useEmployee((state) => state.setEmployee);
  const router = useRouter();

  const handleGetEmployee = async () => {
    const params = {
      statusIn: "ACTIVE",

      ...(itemsPerPage !== "all" && {
        page: currentPage - 1,
        size: Number(itemsPerPage),
      }),
      ...(debounce && { name: search }),
    };
    try {
      const res: any = await GetEmployee(params);
      const filteredEmployees = res?.data?.filter(
        (user: any) => user?.userType !== "ADMIN",
      );

      setEmployee(filteredEmployees);
      setTotalPage(res?.pageSize);
    } catch (error) {
      errorMessage({ error });
    }
  };

  useEffect(() => {
    handleGetEmployee();
  }, [currentPage, itemsPerPage, debounce]);

  const Table_body = () => {
    return employee?.map((v: any, index: number) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{v?.firstName ?? "-"}</td>
        <td>{v?.middleName ?? "-"}</td>
        <td>{v?.lastName ?? "-"}</td>
        <td>{v?.email ?? "-"}</td>
        <td>{v?.mobileNumber ?? "-"}</td>

        <ShowActionColumn header={getFilteredHeader(Employee_Header)}>
          {render(v)}
        </ShowActionColumn>
      </tr>
    ));
  };

  const handleAdd = () => {
    openModal("Add", <EmployeeForm fun={handleGetEmployee} />, "xxl");
  };

  const handleView = (row: any) => {
    setEmployeeData(row);
    router.push("user/empolyee_profile");
  };
  const handleEdit = (row: any) => {
    openModal(
      "Update Employee",
      <EmployeeForm fun={handleGetEmployee} rowData={row} />,
      "xxl",
    );
  };
  const handleDelete = async (row: any) => {
    try {
      const res: any = await DeleteEmployee(row?.id);
      handleGetEmployee();
      successMessage({ message: res?.message });
    } catch (error) {
      errorMessage({ error });
    }
  };

  const handleSalary = (row: any) => {
    openModal(
      "Empolyee Salary",
      <EmployeeSalary row={row} fun={handleGetEmployee} />,
      "sm",
    );
  };

  const action: any = [
    {
      label: "View",
      actionType: "view",
      icons: ICONS.View,
      handler: handleView,
    },
    {
      label: "Salary",
      actionType: "salary",
      icons: ICONS.salary,
      handler: handleSalary,
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
      <AddBtn lable="Add" fun={handleAdd} />

      <CustomTable
        TableData={employee}
        TableBody={Table_body}
        TableHeader={getFilteredHeader(Employee_Header)}
        currentPage={currentPage}
        handleNext={handleNextPage}
        handlePageChange={handlePageChange}
        handlePrevPage={handlePrevPage}
        totalPage={totalPage}
        itemsPerPage={itemsPerPage}
        onSizeChange={handleItemsPerPageChange}
        IsSearch
        SearchText={search}
        handleSearch={setSearch}
      />
    </>
  );
};

export default EmpoyeePage;
