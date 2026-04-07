"use client";

import AddBtn from "@/src/Common/AddBtn";
import { useModal } from "@/src/utils/Modal/OpenModalProvider";
import React, { useEffect, useState } from "react";
import StaffPayment from "./StaffPayment";
import usePagination from "@/src/Common/Pagination/usePagination";
import { useStaffInfo } from "@/store/useStaffInfo";
import { errorMessage } from "@/src/lib/ToastifyMessage/ToastifyMessage";
import { GetHostelStudentPaymentList } from "@/src/ApiList/AdminApi";
import CustomTable from "@/src/Common/Table";
import { Hostel_Staff_Payment_Header } from "@/src/utils/TableHeader";
import { LocalYearMonthDate } from "@/src/utils/DateTimeFormate/LocalDateFormate";
import { HtmlDateFormat } from "@/src/utils/formatArrayToLocalDate";
import { getFilteredHeader } from "@/src/utils/getFilteredHeader";
import ImagePreview from "@/src/lib/ImagePreview/ImagePreview";
import { ICONS } from "@/asstest/icons/icons";
import RowAction from "@/src/lib/RowAction/RowAction";
import SalaryStatement from "../../Admin/Employee/salary/SalaryStatement";
import ExcelDonwloadBtn from "@/src/Common/ExcelDonwloadBtn";
import { exportToExcelDynamic } from "@/src/Common/ExcelDobwload/test";

const StaffDetails = () => {
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

  const [staffPayment, setStaffPayment] = useState([]);
  const [donwload, setDownload] = useState([]);

  const satff = useStaffInfo((state) => state.staff);

  const handleGetPaymentList = async () => {
    const params = {
      statsuIn: "ACTIVE",

      ...(itemsPerPage !== "all" && {
        page: currentPage - 1,
        size: Number(itemsPerPage),
      }),

      staffId: satff?.id,
    };

    try {
      const res: any = await GetHostelStudentPaymentList(params);
      const filteredData = res?.data?.map((item: any) => ({
        amount: item.amount,
        paymentStatus: item.paymentStatus,
        year: item.year,
        staffName: item.owner?.staffName,
      }));
      setDownload(filteredData);
      setStaffPayment(res?.data);
      setTotalPage(res?.pageSize);
    } catch (error) {
      errorMessage({ error });
    }
  };

  const TableBody = () =>
    staffPayment?.map((v: any, index: number) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{v?.year}</td>
        <td>{v?.month}</td>
        <td>{HtmlDateFormat(v?.paymentDate)}</td>
        <td>{v?.paymentStatus ?? ""}</td>
        <td dangerouslySetInnerHTML={{ __html: v?.remarks }}></td>

        <td>{v?.amount}</td>
        <td>{v?.file ? <ImagePreview File={v} /> : "No file uplaoded"}</td>
        <td>{satff?.salary}</td>

        <td>रु {Number(satff?.salary || 0) - Number(v?.amount || 0)}</td>
        <td>{render(v)}</td>
      </tr>
    ));

  useEffect(() => {
    handleGetPaymentList();
  }, [currentPage, itemsPerPage]);

  const handlePayment = (row: any) => {
    openModal(
      "Hostel Staff Payment",
      <SalaryStatement
        paymentId={row?.id}
        isExcelDownload={true}
        ExcelDowloadName="Staff Payment"
      />,
      "xxl",
    );
  };

  const actions = [
    {
      label: "payment",
      actionType: "salary",
      icons: ICONS.salary,
      handler: handlePayment,
    },
  ];

  const render = (item: any) => <RowAction actions={actions} item={item} />;

  const handleOpenPaymentForm = () => {
    openModal(
      "Staff Payment",
      <StaffPayment fun={handleGetPaymentList} />,
      "xxl",
    );
  };

  return (
    <>
      <div className=" flex justify-end gap-3">
        <ExcelDonwloadBtn
          fun={() => exportToExcelDynamic(donwload, "HostelStaff Payment.xlsx")}
        />
        <AddBtn lable="Staff Payment" fun={handleOpenPaymentForm} />
      </div>

      <CustomTable
        TableData={staffPayment}
        TableHeader={getFilteredHeader(Hostel_Staff_Payment_Header)}
        currentPage={currentPage}
        handleNext={handleNextPage}
        handlePageChange={handlePageChange}
        handlePrevPage={handlePrevPage}
        totalPage={totalPage}
        TableBody={TableBody}
        onSizeChange={handleItemsPerPageChange}
        itemsPerPage={itemsPerPage}
      />
    </>
  );
};

export default StaffDetails;
