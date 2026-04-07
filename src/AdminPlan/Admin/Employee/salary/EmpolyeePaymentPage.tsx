"use client";

import usePagination from "@/src/Common/Pagination/usePagination";
import { useModal } from "@/src/utils/Modal/OpenModalProvider";
import React, { useEffect, useState } from "react";
import EmployeeSalary from "./EmployeeSalary";
import AddBtn from "@/src/Common/AddBtn";
import EmployeePayment from "./EmployeePayment";
import { useEmployee } from "@/store/useEmpolyeeInfo";
import { GetHostelStudentPaymentList } from "@/src/ApiList/AdminApi";
import { errorMessage } from "@/src/lib/ToastifyMessage/ToastifyMessage";
import CustomTable from "@/src/Common/Table";
import { Employee_Salary_Header } from "@/src/utils/TableHeader";
import { HtmlDateFormat } from "@/src/utils/formatArrayToLocalDate";
import ImagePreview from "@/src/lib/ImagePreview/ImagePreview";
import { ICONS } from "@/asstest/icons/icons";
import RowAction from "@/src/lib/RowAction/RowAction";
import SalaryStatement from "./SalaryStatement";

const EmployeePaymentPage = () => {
  const {
    currentPage,
    handleNextPage,
    handlePageChange,
    handlePrevPage,
    itemsPerPage,
    setCurrentPage,
    setTotalPage,
    totalPage,
  } = usePagination();
  const { openModal } = useModal();
  const [salary, setSalary] = useState([]);
  const Empolyee = useEmployee((state) => state?.employee);

  const handleGetPaymentList = async () => {
    const params = {
      statsuIn: "ACTIVE",
      page: currentPage - 1,
      size: itemsPerPage,
      userId: Empolyee?.id,
    };

    try {
      const res: any = await GetHostelStudentPaymentList(params);
      setSalary(res?.data);
      setTotalPage(res?.pageSize);
    } catch (error) {
      errorMessage({ error });
    }
  };

  useEffect(() => {
    handleGetPaymentList();
  }, [currentPage, itemsPerPage]);

  const handleAddEmpolyeeSalary = () => {
    openModal(
      "Add Salary",
      <EmployeePayment fun={handleGetPaymentList} />,
      "lg",
    );
  };

  const Table_Body = () => {
    return salary?.map((v: any, index: number) => (
      <tr key={v?.id}>
        <td>{index + 1}</td>

        <td>{v?.year}</td>
        <td>{v?.month}</td>
        <td>{HtmlDateFormat(v?.paymentDate)}</td>
        <td dangerouslySetInnerHTML={{ __html: v?.remarks }}></td>
        <td>{v?.paymentMode}</td>
        <td>{v?.paymentStatus}</td>
        <td>{v?.amount}</td>
        <td>{v?.file ? <ImagePreview File={v} /> : "No uplaoded"}</td>
        <td>{Empolyee?.salary}</td>
        <td>
          {Number(Empolyee?.salary) - Number(v?.amount) === 0 ? (
            <div
              className="inline-flex items-center px-3 py-1 text-xs font-medium
                rounded-full bg-green-100 text-green-700
                border border-green-300"
            >
              Full Paid
            </div>
          ) : (
            Number(Empolyee?.salary) - Number(v?.amount)
          )}
        </td>
        <td>{render(v)}</td>
      </tr>
    ));
  };

  const handlePayment = (row: any) => {
    openModal(
      "Salary Statement",
      <SalaryStatement
        paymentId={row?.id}
        ExcelDowloadName="Empolyee Statement"
        isExcelDownload
        isPrint
      />,
      "xxl",
    );
  };

  const actions = [
    {
      label: "payment",
      icons: ICONS.salary,
      actionType: "salary",
      handler: handlePayment,
    },
  ];

  const render = (item: any) => <RowAction actions={actions} item={item} />;
  return (
    <>
      <AddBtn lable="Payment" fun={handleAddEmpolyeeSalary} />
      <CustomTable
        TableData={salary}
        TableHeader={Employee_Salary_Header}
        currentPage={currentPage}
        handleNext={handleNextPage}
        handlePageChange={handlePageChange}
        handlePrevPage={handlePrevPage}
        totalPage={totalPage}
        TableBody={Table_Body}
      />
    </>
  );
};

export default EmployeePaymentPage;
