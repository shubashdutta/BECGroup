"use client";

import { useModal } from "@/src/utils/Modal/OpenModalProvider";
import React, { useEffect, useState } from "react";
import AddOfferLatter from "./AddOfferLatter";
import AddBtn from "@/src/Common/AddBtn";
import useDynamicPagination from "@/src/Common/Pagination/usePagination";
import { apiRequest } from "@/src/lib/axiosSetup";
import {
  errorMessage,
  successMessage,
} from "@/src/lib/ToastifyMessage/ToastifyMessage";
import CustomTable from "@/src/Common/Table";
import { getFilteredHeader } from "@/src/utils/getFilteredHeader";
import { OfferLetter_Header } from "@/src/utils/TableHeader";
import ToggleBtnWithAction from "@/src/Common/ToggleBtn/ToggleBtnWithAction";
import { ICONS } from "@/asstest/icons/icons";
import RowAction from "@/src/lib/RowAction/RowAction";
import { useStudentinfo } from "@/store/useStudentInfo";
import { getCurrentUserInfo } from "@/src/utils/GetCurrentUser";
import { useConsultingStudent } from "@/store/useStudentConsulting";
import UniversityPaymentPage from "../universityPayment/UniversityPaymentPage";
import { useDrawer } from "@/src/utils/Modal/DrawerModalProvider";
import DeletedModal from "@/src/Common/DeletedModal";
import { useRouter } from "next/navigation";
import PaymentDetailsPage from "../universityPayment/PaymentDetailsPage";
import ImagePreview from "@/src/lib/ImagePreview/ImagePreview";

const OfferLatter = () => {
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
  const { openDrawer } = useDrawer();
  const router = useRouter();
  const consultingStudent = useConsultingStudent(
    (state) => state?.consultingStudent,
  );

  const [offerLetter, setOfferLetter] = useState([]);

  const handleGetOfferLetter = async () => {
    const params = {
      statusIn: "ACTIVE",
      ...(itemsPerPage !== "all" && {
        size: Number(itemsPerPage),
        page: currentPage - 1,
      }),
      studentId: consultingStudent?.id,
    };

    try {
      const res: any = await apiRequest.get("api/offer-letter/all", { params });
      setOfferLetter(res?.data);
      setTotalPage(res?.pageSize);
    } catch (error) {
      errorMessage({ error });
    }
  };

  const handleInterview = async (id: number) => {
    const payload = {
      id,
      isPassed: true,
    };

    try {
      const res: any = await apiRequest.post(
        "api/offer-letter/toggle/is-passed",
        payload,
      );
      successMessage({ message: res?.message });
      handleGetOfferLetter();
      // test
    } catch (error) {
      errorMessage({ error });
    }
  };

  useEffect(() => {
    if (consultingStudent) {
      handleGetOfferLetter();
    }
  }, [currentPage, itemsPerPage, consultingStudent]);

  const handleAddOfferLatter = () => {
    openModal(
      "Add Offer Latter",
      <AddOfferLatter fun={handleGetOfferLetter} />,
      "xl",
    );
  };

  const TableBody = () => {
    return offerLetter?.map((v: any, index: number) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{v?.title}</td>
          <td>{v?.country}</td>
          <td>{v?.universityName}</td>
          <td>{v?.courseName}</td>
          <td>
            {v?.files ? (
              <ImagePreview
                File={v?.files}
                isDonwload={true}
                print={true}
                key={v?.id}
              />
            ) : (
              "No Uplaoded"
            )}
          </td>
          <td>
            <ToggleBtnWithAction
              defaultChecked={v?.isPassed ?? false}
              onChange={() => handleInterview(v?.id)}
            />
          </td>

          <td>{render(v)}</td>
        </tr>
      );
    });
  };

  const handleView = (row: any) => {
    openDrawer(
      "University Payment",
      <PaymentDetailsPage id={row?.id} />,
      "xxl",
    );
  };

  const handleEdit = (row: any) => {
    openModal("Edit", <AddOfferLatter fun={handleGetOfferLetter} row={row} />);
  };
  const handleDeleteofferLetter = async (id: number) => {
    try {
      const res: any = await apiRequest.delete(`api/offer-letter/delete/${id}`);
      handleGetOfferLetter();
      successMessage({ message: res?.mesage });
    } catch (error) {
      errorMessage({ error });
    }
  };
  const handleDelete = (row: any) => {
    openModal(
      "Delete Offer_Letter",
      <DeletedModal onConfirm={() => handleDeleteofferLetter(row?.id)} />,
      "sm",
    );
  };
  const handleSalary = (row: any) => {
    openDrawer(
      "Add University Payment",
      <UniversityPaymentPage offerId={row} />,
      "xxl",
    );
  };

  const actions: any = [
    {
      label: "view",
      actionType: "view",
      icons: ICONS.View,
      handler: handleView,
    },
    {
      label: "payment",
      actionType: "salary",
      icons: ICONS.salary,
      handler: handleSalary,
    },
    {
      label: "edit",
      actionType: "edit",
      icons: ICONS.Edit,
      handler: handleEdit,
    },

    {
      label: "delete",
      actionType: "delete",
      icons: ICONS.Delete,
      handler: handleDelete,
    },
  ];

  const render = (item: any) => <RowAction actions={actions} item={item} />;
  return (
    <div className=" bg-gray-100 shadow  p-2 ">
      {/* <div className=" h-[600px] w-full flex  justify-center ">
        <img
          className="  h-auto"
          src={
            "https://img.freepik.com/free-vector/hand-drawn-construction-background_23-2147734520.jpg?t=st=1770551713~exp=1770555313~hmac=8c1365456df4ff72fc80aea33a7599243eb501cca16d42cf24ebe41880f5c600&w=1480"
          }
        />
      </div> */}
      <AddBtn lable="Add" fun={handleAddOfferLatter} />

      <CustomTable
        TableData={offerLetter}
        TableHeader={getFilteredHeader(OfferLetter_Header)}
        currentPage={currentPage}
        handleNext={handleNextPage}
        handlePageChange={handlePageChange}
        handlePrevPage={handlePrevPage}
        totalPage={totalPage}
        onSizeChange={handleItemsPerPageChange}
        itemsPerPage={itemsPerPage}
        TableBody={TableBody}
      />
    </div>
  );
};

export default OfferLatter;
