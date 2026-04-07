"use client";

import AddBtn from "@/src/Common/AddBtn";
import { useModal } from "@/src/utils/Modal/OpenModalProvider";
import React, { useEffect, useState } from "react";
import AboutAdsForm from "./AboutAdsForm";
import usePagination from "@/src/Common/Pagination/usePagination";
import { DeleteAds, GetAboutAds } from "@/src/ApiList/AdminApi";
import {
  errorMessage,
  successMessage,
} from "@/src/lib/ToastifyMessage/ToastifyMessage";
import CustomTable from "@/src/Common/Table";
import { Ads_Header } from "@/src/utils/TableHeader";
import { getFilteredHeader } from "@/src/utils/getFilteredHeader";
import ImagePreview from "@/src/lib/ImagePreview/ImagePreview";
import { ICONS } from "@/asstest/icons/icons";
import RowAction from "@/src/lib/RowAction/RowAction";
import ShowActionColumn from "@/src/utils/ShowActionColumn";
import { FcCancel, FcOk } from "react-icons/fc";
import DeletedModal from "@/src/Common/DeletedModal";
import StudentDocumentPreview from "../Admin/Student/StudentDocumentPreview";
import ToggleBtnWithAction from "@/src/Common/ToggleBtn/ToggleBtnWithAction";
import { apiRequest } from "@/src/lib/axiosSetup";
import { message } from "antd";

const AdminAboutPage = () => {
  const { openModal } = useModal();

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

  const [ads, setAds] = useState([]);

  const [section, setSection] = useState<string[]>([]);

  const handleGetAds = async () => {
    const params = {
      statusIn: "ACTIVE",
      ...(itemsPerPage !== "all" && {
        page: currentPage - 1,
        size: Number(itemsPerPage),
      }),
    };
    try {
      const res: any = await GetAboutAds(params);
      const sectionValues = res?.data?.map((item: any) => item.section);
      setSection(sectionValues);
      setAds(res?.data);
      setTotalPage(res?.pageSize);
    } catch (error) {
      errorMessage({ error });
    }
  };

  useEffect(() => {
    handleGetAds();
  }, [currentPage, itemsPerPage]);
  const handleOpenAdsModal = () => {
    openModal("adsModal", <AboutAdsForm fun={handleGetAds} />, "xl");
  };

  const handleEdit = (row: any) => {
    openModal("Update", <AboutAdsForm fun={handleGetAds} row={row} />, "xl");
  };

  const ImagePreview = (image: any) => {
    openModal("Images", <StudentDocumentPreview images={image} />, "xl");
  };

  const handleToggle = async (item: any) => {
    const payload = {
      id: item?.id,
      isActive: "true",
    };
    try {
      const res: any = await apiRequest.post(
        "api/about-us/toggle/is-active",
        payload,
      );

      successMessage({ message: res?.message });
      handleGetAds();
    } catch (error) {
      errorMessage({ error });
    }
  };

  const Table_body = () => {
    return ads?.map((item: any, index: number) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{item?.title ?? "-"}</td>

          <td>{item?.section}</td>

          <td>
            <ToggleBtnWithAction
              defaultChecked={item?.isActive}
              onChange={() => handleToggle(item)}
            />
          </td>
          {/* <td className="  ">
            <div className=" flex  justify-center items-center">
              {item?.isActive ? <FcOk size={25} /> : <FcCancel size={25} />}
            </div>
          </td> */}

          <td
            className=" w-14 h-14 cursor-pointer"
            onClick={() => ImagePreview(item?.files)}
          >
            <img src={item?.files[0]?.path} alt="" />
          </td>

          {/* <ImagePreview File={item} /> */}

          <ShowActionColumn header={getFilteredHeader(Ads_Header)}>
            {render(item)}
          </ShowActionColumn>
        </tr>
      );
    });
  };

  const handleDeleteAds = async (rowData: any) => {
    try {
      const res: any = await DeleteAds(rowData?.id);
      successMessage({ message: res?.message });
      handleGetAds();
    } catch (error) {
      errorMessage({ error });
    }
  };

  const handleDelete = (row: any) => {
    openModal(
      "Delete",
      <DeletedModal onConfirm={() => handleDeleteAds(row)} />,
      "sm",
    );
  };

  const action: any = [
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
      <AddBtn lable="Add" fun={handleOpenAdsModal} />

      <CustomTable
        TableData={ads}
        TableHeader={getFilteredHeader(Ads_Header)}
        currentPage={currentPage}
        handleNext={handleNextPage}
        handlePageChange={handlePageChange}
        handlePrevPage={handlePrevPage}
        totalPage={totalPage}
        TableBody={Table_body}
        itemsPerPage={itemsPerPage}
        onSizeChange={handleItemsPerPageChange}
      />
    </>
  );
};

export default AdminAboutPage;
