"use client";

import { useModal } from "@/src/utils/Modal/OpenModalProvider";
import React, { use, useEffect, useState } from "react";
import StudentVideoForm from "./StudentVideoForm";
import AddBtn from "@/src/Common/AddBtn";
import axios from "axios";
import {
  errorMessage,
  successMessage,
} from "@/src/lib/ToastifyMessage/ToastifyMessage";
import usePagination from "@/src/Common/Pagination/usePagination";
import { DeleteVideo, GetVideo } from "@/src/ApiList/AdminApi";
import CustomTable from "@/src/Common/Table";
import { getFilteredHeader } from "@/src/utils/getFilteredHeader";
import { Video_Header } from "@/src/utils/TableHeader";
import { LocalYearMonthDate } from "@/src/utils/DateTimeFormate/LocalDateFormate";
import { ICONS } from "@/asstest/icons/icons";
import RowAction from "@/src/lib/RowAction/RowAction";
import ShowActionColumn from "@/src/utils/ShowActionColumn";
import VideoPreview from "@/src/lib/videoPreview/viedoPreview";

const StudentVideoPage = () => {
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
  const [videoList, setVideoList] = useState([]);

  // const getData = async () => {
  //   try {
  //     const res = await axios.get(
  //       "https://cms.studies-overseas.com/universities?_sort=priority:ASC,created_at:asc"
  //     );
  //     const countryOptions = res?.data?.map((item: any) => ({
  //       label: item.country,
  //       value: item.country, // or item.id if you prefer
  //     }));
  //   } catch (error) {
  //     errorMessage({ error });
  //   }
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  const handleGetVideo = async () => {
    const params = {
      statusIn: "ACTIVE",
      ...(itemsPerPage !== "all" && {
        page: currentPage - 1,
        size: Number(itemsPerPage),
      }),
    };

    try {
      const res: any = await GetVideo(params);
      const data = res?.data?.map((v: any, index: number) => {
        const id = ++index;
        return {
          ...v,
          sn:
            itemsPerPage === "all"
              ? id
              : (currentPage - 1) * Number(itemsPerPage) + id,
        };
      });
      setVideoList(data);
      setTotalPage(res?.pageSize);
    } catch (error) {
      errorMessage({ error });
    }
  };

  useEffect(() => {
    handleGetVideo();
  }, [currentPage, itemsPerPage]);

  const Table_Body = () => {
    return videoList?.map((v: any, index: number) => (
      <tr key={index}>
        <td>{v?.sn}</td>
        <td>{v?.title ?? "-"}</td>

        <VideoPreview file={v} />

        <td>{LocalYearMonthDate(v?.createdDate)}</td>
        <ShowActionColumn header={getFilteredHeader(Video_Header)}>
          {render(v)}
        </ShowActionColumn>
      </tr>
    ));
  };

  const handleAddVideo = () => {
    openModal("Add Video", <StudentVideoForm fun={handleGetVideo} />);
  };

  const handleEdit = () => {};

  const handleDelete = async (row: any) => {
    try {
      const res: any = await DeleteVideo(row?.id);
      successMessage({ message: res?.message });
      handleGetVideo();
    } catch (error) {
      errorMessage({ error });
    }
  };

  const handleView = () => {};

  const action: any = [
    // { label: "View", icons: ICONS.View, handler: handleView },
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
      <AddBtn lable="Add" fun={handleAddVideo} />

      <CustomTable
        TableData={videoList}
        TableHeader={getFilteredHeader(Video_Header)}
        currentPage={currentPage}
        handleNext={handleNextPage}
        handlePageChange={handlePageChange}
        handlePrevPage={handlePrevPage}
        totalPage={totalPage}
        TableBody={Table_Body}
        onSizeChange={handleItemsPerPageChange}
        itemsPerPage={itemsPerPage}
      />
    </>
  );
};

export default StudentVideoPage;
