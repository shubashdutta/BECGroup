"use client";

import { useModal } from "@/src/utils/Modal/OpenModalProvider";
import React, { useEffect, useState } from "react";
import HeroSectionForm from "./HeroSectionForm";
import AddBtn from "@/src/Common/AddBtn";
import { DeleteHeroSection, GetHeroSection } from "@/src/ApiList/AdminApi";
import {
  errorMessage,
  successMessage,
} from "@/src/lib/ToastifyMessage/ToastifyMessage";
import usePagination from "@/src/Common/Pagination/usePagination";
import CustomTable from "@/src/Common/Table";
import { Hero_Header } from "@/src/utils/TableHeader";
import { LocalYearMonthDate } from "@/src/utils/DateTimeFormate/LocalDateFormate";
import { ICONS } from "@/asstest/icons/icons";
import RowAction from "@/src/lib/RowAction/RowAction";
import ShowActionColumn from "@/src/utils/ShowActionColumn";
import { getFilteredHeader } from "@/src/utils/getFilteredHeader";
import ImagePreview from "@/src/lib/ImagePreview/ImagePreview";

const AdminHeroSection = () => {
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
  const { closeModal, openModal } = useModal();

  const [heroData, setHeroData] = useState([]);

  const handleGetHeroSection = async () => {
    const params = {
      statusIn: "ACTIVE",
      ...(itemsPerPage !== "all" && {
        page: currentPage - 1,
        size: Number(itemsPerPage),
      }),
    };
    try {
      const res: any = await GetHeroSection(params);
      setHeroData(res?.data);
      setTotalPage(res?.pageSize);
    } catch (error) {
      errorMessage({ error });
    }
  };

  useEffect(() => {
    handleGetHeroSection();
  }, [currentPage, itemsPerPage]);

  const Table_body = () => {
    return heroData?.map((v: any, index: number) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{v?.title}</td>
          <ImagePreview File={v} />
          <td>{LocalYearMonthDate(v?.createdDate)}</td>
          <ShowActionColumn header={getFilteredHeader(Hero_Header)}>
            {render(v)}
          </ShowActionColumn>
        </tr>
      );
    });
  };
  const handelAddHeroSection = () => {
    openModal(
      "Add Banner",
      <HeroSectionForm fun={handleGetHeroSection} />,
      "xxl",
    );
  };

  const handleEdit = () => {};

  const handleDelete = async (row: any) => {
    try {
      const res: any = await DeleteHeroSection(row?.id);
      successMessage({ message: res?.message });
      handleGetHeroSection();
    } catch (error) {
      errorMessage({ error });
    }
  };
  const handleView = () => {};

  const action: any = [
    // {
    //   label: "View",
    //   actionType: "view",
    //   icons: ICONS.View,
    //   handler: handleView,
    // },
    // { label: "Edit", icons: ICONS.Edit, handler: handleEdit },
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
      <AddBtn lable="Add" fun={handelAddHeroSection} />

      <CustomTable
        TableData={heroData}
        TableHeader={getFilteredHeader(Hero_Header)}
        currentPage={currentPage}
        handleNext={handleNextPage}
        handlePageChange={handlePageChange}
        handlePrevPage={handlePrevPage}
        totalPage={totalPage}
        TableBody={Table_body}
        onSizeChange={handleItemsPerPageChange}
        itemsPerPage={itemsPerPage}
      />
    </>
  );
};

export default AdminHeroSection;
