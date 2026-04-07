"use client";
import AddBtn from "@/src/Common/AddBtn";
import usePagination from "@/src/Common/Pagination/usePagination";
import CustomTable from "@/src/Common/Table";
import { useModal } from "@/src/utils/Modal/OpenModalProvider";
import React, { useEffect, useState } from "react";
import CouncilForm from "./CouncilForm";
import {
  DeleteCouncil,
  GetCouncil,
  GetReception,
} from "@/src/ApiList/AdminApi";
import {
  errorMessage,
  successMessage,
} from "@/src/lib/ToastifyMessage/ToastifyMessage";
import {
  council_Header,
  Council_Reception_Header,
} from "@/src/utils/TableHeader";
import { ICONS } from "@/asstest/icons/icons";
import RowAction from "@/src/lib/RowAction/RowAction";
import ShowActionColumn from "@/src/utils/ShowActionColumn";
import { getFilteredHeader } from "@/src/utils/getFilteredHeader";
import { getCurrentUserInfo } from "@/src/utils/GetCurrentUser";
import { useRouter } from "next/navigation";
import ReceptionView from "../Reception/ReceptionView";
import { FaHourglassHalf } from "react-icons/fa6";
import { CheckCircle2 } from "lucide-react";
import { useDebounce } from "@/src/utils/useDebounce";

const Councilpage = () => {
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
  const [CouncilList, setCounciList] = useState([]);
  const [search, setSearch] = useState("");
  const debounce = useDebounce(search);

  const router = useRouter();
  const { openModal, closeModal } = useModal();
  const CurrentUser = getCurrentUserInfo();

  const handleGet = async () => {
    const params = {
      statusIn: "ACTIVE",
      ...(itemsPerPage !== "all" && {
        page: currentPage - 1,
        size: Number(itemsPerPage),
      }),
      ...(debounce && { name: debounce }),
      ...(CurrentUser?.userType !== "ADMIN" && { assigneeId: CurrentUser?.id }),
    };
    try {
      const res: any = await GetReception(params);
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

      setCounciList(data);
      setTotalPage(res?.pageSize);
    } catch (error) {
      errorMessage({ error });
    }
  };

  useEffect(() => {
    handleGet();
  }, [currentPage, itemsPerPage, debounce]);
  const handleAddForm = () => {
    openModal("Add Council", <CouncilForm fun={handleGet} />, "xxl");
  };

  const Table_Body = () => {
    return CouncilList?.map((v: any, index: number) => (
      <tr key={index}>
        <td>{v?.sn}</td>
        <td>{v?.fullName ?? "-"}</td>
        <td>{v?.preferredCountry ?? "-"}</td>
        <td>{v?.email ?? "-"}</td>
        <td>{v?.mobile}</td>

        <td>
          <div className=" flex justify-center items-center">
            {v?.verificationStatus === "PENDING" ? (
              <FaHourglassHalf size={20} className=" text-red-400" />
            ) : (
              <CheckCircle2 color="green" />
            )}
          </div>
        </td>

        <ShowActionColumn header={getFilteredHeader(council_Header)}>
          {render(v)}
        </ShowActionColumn>
      </tr>
    ));
  };

  const handleEdit = (rowData: any) => {
    openModal(
      "Update Council",
      <CouncilForm fun={handleGet} rowData={rowData} />,
      "xxl",
    );
  };
  const handleDelete = async (row: any) => {
    try {
      const res: any = await DeleteCouncil(row?.id);
      successMessage({ message: res?.message });
      handleGet();
    } catch (error) {
      errorMessage({ error });
    }
  };
  const handleView = (row: any) => {
    openModal(
      "Councilling Details",
      <ReceptionView row={row} fun={handleGet} />,
      "xxl",
    );
  };

  const action: any = [
    {
      label: "View",
      actionType: "view",
      icons: ICONS.View,
      handler: handleView,
    },
    // {
    //   label: "Edit",
    //   actionType: "edit",
    //   icons: ICONS.Edit,
    //   handler: handleEdit,
    // },
    // {
    //   label: "Delete",
    //   actionType: "delete",
    //   icons: ICONS.Delete,
    //   handler: handleDelete,
    // },
  ];
  const render = (item: any) => <RowAction actions={action} item={item} />;

  return (
    <>
      <AddBtn lable="Add" fun={handleAddForm} />

      <CustomTable
        TableData={CouncilList}
        TableHeader={getFilteredHeader(Council_Reception_Header)}
        currentPage={currentPage}
        handleNext={handleNextPage}
        handlePageChange={handlePageChange}
        handlePrevPage={handlePrevPage}
        totalPage={totalPage}
        TableBody={Table_Body}
        itemsPerPage={itemsPerPage}
        onSizeChange={handleItemsPerPageChange}
        IsSearch={true}
        handleSearch={setSearch}
        SearchText={search}
      />
    </>
  );
};

export default Councilpage;
