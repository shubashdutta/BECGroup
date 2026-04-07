"use client";

import { useModal } from "@/src/utils/Modal/OpenModalProvider";
import React, { useEffect, useState } from "react";
import ClassesStudentPayment from "./ClassesStudentPayment";
import AddBtn from "@/src/Common/AddBtn";
import { useClassesStudent } from "@/store/useClassesStudent";
import useDynamicPagination from "@/src/Common/Pagination/usePagination";
import { GetHostelStudentPaymentList } from "@/src/ApiList/AdminApi";
import { errorMessage } from "@/src/lib/ToastifyMessage/ToastifyMessage";
import CustomTable from "@/src/Common/Table";
import { getFilteredHeader } from "@/src/utils/getFilteredHeader";
import { HostelStudentPaymentHeader } from "@/src/utils/TableHeader";
import ImagePreview from "@/src/lib/ImagePreview/ImagePreview";
import { HtmlDateFormat } from "@/src/utils/formatArrayToLocalDate";
import { ICONS } from "@/asstest/icons/icons";
import RowAction from "@/src/lib/RowAction/RowAction";
import SalaryStatement from "../../Employee/salary/SalaryStatement";
import { exportToExcelDynamic } from "@/src/Common/ExcelDobwload/test";
import ExcelDonwloadBtn from "@/src/Common/ExcelDonwloadBtn";

const ClassesStudentPaumentList = () => {
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
  const [studentPaymentList, setStudentPaymentList] = useState([]);
  const [donwload, setDownload] = useState([]);
  const student = useClassesStudent((state) => {
    return state?.student;
  });

  const handleGetPaymentList = async () => {
    const params = {
      statusIn: "ACTIVE",
      ...(itemsPerPage !== "all" && {
        page: currentPage - 1,
        size: Number(itemsPerPage),
      }),
      enrolledStudentId: student?.id,
    };

    try {
      const res: any = await GetHostelStudentPaymentList(params);
      const filteredData = res?.data?.map((item: any) => ({
        amount: item.amount,
        courseFee: item?.owner?.courseFee,
        paymentStatus: item.paymentStatus,
        year: item.year,
        studentName: item?.owner?.fullName,
        Number: item?.owner?.phoneNumber,
        shift: item?.owner?.shift,
        courseName: item?.owner?.courseName,
      }));
      setDownload(filteredData);
      setStudentPaymentList(res?.data);
      setTotalPage(res?.pageSize);
    } catch (error) {
      errorMessage({ error });
    }
  };

  useEffect(() => {
    handleGetPaymentList();
  }, [currentPage, itemsPerPage]);

  const handleAddClassesPayment = () => {
    openModal("Add Payment", <ClassesStudentPayment />, "xxl");
  };

  const TableBody = () =>
    studentPaymentList?.map((v: any, index: number) => (
      <tr key={index}>
        <td>{index + 1}</td>

        <td>{v?.year}</td>
        <td>{v?.month}</td>

        <td>{HtmlDateFormat(v?.paymentDate)}</td>

        <td dangerouslySetInnerHTML={{ __html: v?.remarks }}></td>
        <td>{v?.paymentStatus}</td>
        <td>{`रु ${v?.amount}`}</td>
        <td>{v?.file ? <ImagePreview File={v} /> : "No File Uplodade"}</td>

        <td>{v?.paymentMode}</td>

        <td>{student?.courseFee}</td>

        <td>रु {Number(student?.courseFee) - Number(v?.amount)}</td>
        <td>{render(v)}</td>
      </tr>
    ));

  const handleSatament = (row: any) => {
    openModal(
      "Classes Student Payment",
      <SalaryStatement
        paymentId={row?.id}
        isExcelDownload={true}
        isPrint={true}
        ExcelDowloadName="Classes Student Payment"
      />,
      "xxl",
    );
  };

  const action = [
    { lable: "salary", icons: ICONS.salary, handler: handleSatament },
  ];

  const render = (item: any) => <RowAction actions={action} item={item} />;
  return (
    <>
      <div
        className=" flex justify-end gap-3
     "
      >
        <ExcelDonwloadBtn
          fun={() =>
            exportToExcelDynamic(donwload, "ClassesStudentPayment.xlsx")
          }
        />
        <AddBtn lable="Payment" fun={handleAddClassesPayment} />
      </div>
      <CustomTable
        TableData={studentPaymentList}
        TableHeader={getFilteredHeader(HostelStudentPaymentHeader)}
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

export default ClassesStudentPaumentList;
