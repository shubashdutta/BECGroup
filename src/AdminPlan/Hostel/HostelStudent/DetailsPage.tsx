"use client";

import SelectField from "@/src/Common/SelectField";
import TextInput from "@/src/Common/TextInput";
import { apiRequest } from "@/src/lib/axiosSetup";
import {
  errorMessage,
  successMessage,
} from "@/src/lib/ToastifyMessage/ToastifyMessage";
import { ErrorMessage } from "@/src/utils/FormErrorMessage";
import { FORM_TYPE } from "@/src/utils/InputType";
import { RoomType } from "@/src/utils/options/GenderOption";
import { useStudentinfo } from "@/store/useStudentInfo";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import StudentPayment from "./StudentPayment";
import usePagination from "@/src/Common/Pagination/usePagination";
import { GetHostelStudentPaymentList } from "@/src/ApiList/AdminApi";
import CustomTable from "@/src/Common/Table";
import { getFilteredHeader } from "@/src/utils/getFilteredHeader";
import { HostelStudentPaymentHeader } from "@/src/utils/TableHeader";
import { HtmlDateFormat } from "@/src/utils/formatArrayToLocalDate";
import { useModal } from "@/src/utils/Modal/OpenModalProvider";
import AddBtn from "@/src/Common/AddBtn";
import ImagePreview from "@/src/lib/ImagePreview/ImagePreview";
import { removeHtmlTag } from "@/src/utils/removeHtmlTags";
import RowAction from "@/src/lib/RowAction/RowAction";
import { ICONS } from "@/asstest/icons/icons";
import SalaryStatement from "../../Admin/Employee/salary/SalaryStatement";
import ExcelDonwloadBtn from "@/src/Common/ExcelDonwloadBtn";
import { exportToExcelDynamic } from "@/src/Common/ExcelDobwload/test";
import { getCurrentUserInfo } from "@/src/utils/GetCurrentUser";

const DetailsPage = () => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      roomType: "",
      monthlyFee: "",
      roomNumber: "",
    },
  });

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
  const student = useStudentinfo((state) => state.student);
  const setStudentData = useStudentinfo((state) => state.setStudentData);

  const { openModal } = useModal();
  const user = getCurrentUserInfo();

  const [studentPaymentList, setStudentPaymentList] = useState([]);
  const [donwload, setDownload] = useState([]);

  const room: any = RoomType.find((v: any) => v?.value === student?.roomType);
  useEffect(() => {
    if (student) {
      setValue("monthlyFee", student?.monthlyFee);
      setValue("roomType", room);
      setValue("roomNumber", student?.roomNumber);
    }
  }, []);

  const handleGetPaymentList = async () => {
    const params = {
      statusIn: "ACTIVE",
      ...(itemsPerPage !== "all" && {
        page: currentPage - 1,
        size: Number(itemsPerPage),
      }),
      studentId: student?.id,
    };

    try {
      const res: any = await GetHostelStudentPaymentList(params);
      const filteredData = res?.data?.map((item: any) => ({
        amount: item.amount,
        paymentStatus: item.paymentStatus,
        year: item.year,
        studentName: item.owner?.studentName,
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
  const handleAddStudentRoomDetails = async (data: any) => {
    const payload = {
      roomType: data?.roomType?.value,
      monthlyFee: data?.monthlyFee,
      roomNumber: data?.roomNumber,
      id: student?.id,
    };

    try {
      const res: any = await apiRequest.post(
        "api/hostel/student/room-plan/add",
        payload,
      );

      setStudentData({
        ...student,
        roomType: payload.roomType,
        monthlyFee: payload.monthlyFee,
        roomNumber: payload.roomNumber,
      });

      successMessage({ message: res?.message });
    } catch (error) {
      errorMessage({ error });
    }
  };

  const handleAddPaymet = () => {
    openModal(
      "Student Payment",
      <StudentPayment fun={handleGetPaymentList} />,
      "xxl",
    );
  };

  const TableBody = () =>
    studentPaymentList?.map((v: any, index: number) => (
      <tr key={index}>
        <td>{index + 1}</td>

        <td>{v?.year}</td>
        <td>{v?.month}</td>

        <td>{HtmlDateFormat(v?.paymentDate)}</td>

        <td className=" ">{removeHtmlTag(v?.remarks)}</td>
        <td>{v?.paymentStatus}</td>
        <td>{`रु ${v?.amount}`}</td>
        <td>{v?.file ? <ImagePreview File={v} /> : "No File Uploaded"}</td>

        <td>{v?.paymentMode}</td>

        <td>{student?.monthlyFee}</td>

        <td>रु {Number(student?.monthlyFee || 0) - Number(v?.amount || 0)}</td>

        <td>{render(v)}</td>
      </tr>
    ));

  const handleDelete = async (row: any) => {
    try {
      const res: any = await apiRequest.delete(`api/payment/delete/${row?.id}`);
      handleGetPaymentList();
      successMessage({ message: res?.message });
    } catch (error) {
      errorMessage({ error });
    }
  };
  const handlePayment = (row: any) => {
    openModal(
      "Hostel Payment",
      <SalaryStatement
        paymentId={row?.id}
        isExcelDownload
        isPrint 
        ExcelDowloadName="Hostel Student Payment"
      />,
      "xxl",
    );
  };

  const actions: any[] = [];

  // conditionally add delete
  actions.push({
    label: "payment",
    actionType: "salary",
    icons: ICONS.salary,
    handler: handlePayment,
  });
  if (user?.userType !== "USER") {
    actions.push({
      label: "delete",
      icons: ICONS.Delete,
      handler: handleDelete,
    });
  }

  const render = (item: any) => <RowAction actions={actions} item={item} />;

  return (
    <div className=" ">
      <form
        className=" wrapper p-2"
        onSubmit={handleSubmit(handleAddStudentRoomDetails)}
      >
        <div className=" grid grid-cols-3 gap-4">
          <SelectField
            control={control}
            errors={errors}
            name="roomType"
            options={RoomType}
            isRequired={true}
            label="Room Type"
            validation={{ required: ErrorMessage.RoomType }}
          />

          <TextInput
            errors={errors}
            label="Room Number"
            name="roomNumber"
            register={register}
            type={FORM_TYPE.NUMBER}
            required={true}
            validation={{ required: "Room Number is Required" }}
          />
          <TextInput
            errors={errors}
            label="Monthly Fee"
            name="monthlyFee"
            register={register}
            type={FORM_TYPE.NUMBER}
            required={true}
            validation={{ required: ErrorMessage.monthlyFee }}
          />
        </div>

        {student?.roomType === null && (
          <div className=" flex mt-1 justify-end">
            <button
              type="submit"
              className=" cursor-pointer bg-blue-600 text-white rounded py-2 px-4"
            >
              Submit
            </button>
          </div>
        )}
      </form>

      <div className=" flex justify-end gap-x-3 mt-3">
        <ExcelDonwloadBtn
          fun={() => exportToExcelDynamic(donwload, "Hostel Payment.xlsx")}
        />
        <AddBtn lable="Payment" fun={handleAddPaymet} />
      </div>

      <div className=" grid grid-cols-1 gap-3">
        <div className=" col-span-1">
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
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
