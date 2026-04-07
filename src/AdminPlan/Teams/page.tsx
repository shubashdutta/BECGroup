"use client";

import { useModal } from "@/src/utils/Modal/OpenModalProvider";
import React, { useEffect, useRef, useState } from "react";
import TeamsForm from "./TeamsForm";
import AddBtn from "@/src/Common/AddBtn";
import usePagination from "@/src/Common/Pagination/usePagination";
import { DeleteTeams, GetTeam } from "@/src/ApiList/AdminApi";
import {
  errorMessage,
  successMessage,
} from "@/src/lib/ToastifyMessage/ToastifyMessage";
import CustomTable from "@/src/Common/Table";
import { Team_Header } from "@/src/utils/TableHeader";
import { ICONS } from "@/asstest/icons/icons";
import { getFilteredHeader } from "@/src/utils/getFilteredHeader";
import RowAction from "@/src/lib/RowAction/RowAction";
import ShowActionColumn from "@/src/utils/ShowActionColumn";
import ImagePreview from "@/src/lib/ImagePreview/ImagePreview";
import ViewTeams from "./ViewTeams";
import { apiRequest } from "@/src/lib/axiosSetup";
import { useDebounce } from "@/src/utils/useDebounce";

interface DragItem {
  index: number;
  id: number;
}

const TeamsPage = () => {
  const { openModal } = useModal();

  const {
    currentPage,
    handleNextPage,
    handlePageChange,
    handlePrevPage,
    itemsPerPage,
    setTotalPage,
    totalPage,
    handleItemsPerPageChange,
  } = usePagination();

  const [teamList, setTeamList] = useState<any[]>([]);
  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const tableRef = useRef<HTMLTableElement>(null); // Ref for the table (or its scrollable container)
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null); // For scroll timer

  const [search, setSearch] = useState("");
  const debounce = useDebounce(search);

  const handleGetTeam = async () => {
    try {
      const params = {
        statusIn: "ACTIVE",
        ...(itemsPerPage !== "all" && {
          page: currentPage - 1,
          size: Number(itemsPerPage),
        }),
        ...(debounce && { name: search }),
      };
      const res: any = await GetTeam(params);
      setTeamList(res?.data || []);

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

      setTeamList(data);
      setTotalPage(res?.pageSize);
    } catch (error) {
      errorMessage({ error });
    }
  };

  useEffect(() => {
    handleGetTeam();
  }, [currentPage, itemsPerPage, debounce]);

  /* ================= DRAG & DROP ================= */
  const handleDragStart = (index: number) => {
    setDraggedItem({
      index,
      id: teamList[index]?.id,
    });
    setIsDragging(true); // ← Show scrollbar
  };

  const handleDragOver = (e: React.DragEvent<HTMLTableRowElement>) => {
    e.preventDefault(); // Required for drop

    // Auto-scroll logic
    if (!tableRef.current) return;

    const container = tableRef.current; // Or your scrollable div if table isn't the scroller
    const { clientY } = e; // Mouse Y position
    const { top, bottom, height } = container.getBoundingClientRect();
    const scrollSpeed = 20; // Pixels per tick (adjust for smoothness)
    const edgeThreshold = height * 0.1; // 10% of height as "edge zone"

    // Clear any existing interval
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }

    // Scroll up if near top
    if (clientY - top < edgeThreshold && container.scrollTop > 0) {
      scrollIntervalRef.current = setInterval(() => {
        container.scrollTop -= scrollSpeed;
      }, 20); // ~50fps
    }
    // Scroll down if near bottom
    else if (
      bottom - clientY < edgeThreshold &&
      container.scrollTop < container.scrollHeight - container.clientHeight
    ) {
      scrollIntervalRef.current = setInterval(() => {
        container.scrollTop += scrollSpeed;
      }, 20);
    }
  };

  const handleDragEnd = () => {
    // Cleanup scroll on drag end
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
    setDraggedItem(null);
    setIsDragging(false);
  };

  // const handleDragOver = (e: React.DragEvent<HTMLTableRowElement>) => {
  //   e.preventDefault(); // 🔥 REQUIRED
  // };

  const handleDrop = async (dropIndex: number) => {
    if (!draggedItem) return;

    const sourceIndex = draggedItem.index;

    const updatedList = [...teamList];
    const [movedItem] = updatedList.splice(sourceIndex, 1);
    updatedList.splice(dropIndex, 0, movedItem);
    const perPage =
      itemsPerPage === "all" ? teamList.length : Number(itemsPerPage);

    const pageOffset = (currentPage - 1) * perPage;

    // ✅ assign correct GLOBAL SN
    const reorderedList = updatedList.map((item, index) => ({
      ...item,
      sn: pageOffset + index + 1,
    }));

    const start = Math.min(sourceIndex, dropIndex);
    const end = Math.max(sourceIndex, dropIndex);

    const affectedPayload = reorderedList.slice(start, end + 1).map((item) => {
      return {
        id: item.id,
        newPosition: item.sn, // ✅ global position
      };
    });

    const res: any = await apiRequest.post("api/team/reorder", {
      teams: affectedPayload,
    });
    successMessage({ message: res?.message });

    setTeamList(reorderedList);
    // handleGetTeam();
    setDraggedItem(null);
    setIsDragging(false);
  };

  const handleAddTeams = () => {
    openModal("Add Teams", <TeamsForm fun={handleGetTeam} />);
  };

  const handleEdit = (row: any) => {
    openModal("Update Teams", <TeamsForm fun={handleGetTeam} rowData={row} />);
  };

  const handleDelete = async (row: any) => {
    try {
      const res: any = await DeleteTeams(row?.id);
      successMessage({ message: res?.message });
      handleGetTeam();
    } catch (error) {
      errorMessage({ error });
    }
  };

  const handleView = (row: any) => {
    openModal("View", <ViewTeams row={row} />, "sm");
  };
  const action: any = [
    {
      label: "View",
      actionType: "view",
      icons: ICONS.View,
      handler: handleView,
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

  const Table_Body = () => (
    <>
      {teamList.map((v: any, index: number) => (
        <tr
          key={v.id} // ✅ IMPORTANT
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(index)}
          onDragEnd={handleDragEnd} // ← Add this for cleanup
          className="cursor-move"
        >
          <td>{v?.sn}</td>
          <td>{v?.userName ?? "-"}</td>
          <td>{v?.designation ?? "-"}</td>
          <ImagePreview File={v} />
          <ShowActionColumn header={getFilteredHeader(Team_Header)}>
            {render(v)}
          </ShowActionColumn>
        </tr>
      ))}
    </>
  );

  const render = (item: any) => <RowAction actions={action} item={item} />;

  return (
    <>
      <AddBtn lable="Add" fun={handleAddTeams} />

      <div
        ref={tableRef}
        className=" w-full overflow-y-auto"
        style={{
          maxHeight: isDragging ? "70vh" : "auto",
        }}
      >
        <CustomTable
          TableData={teamList}
          TableHeader={getFilteredHeader(Team_Header)}
          currentPage={currentPage}
          handleNext={handleNextPage}
          handlePageChange={handlePageChange}
          handlePrevPage={handlePrevPage}
          totalPage={totalPage}
          TableBody={Table_Body}
          itemsPerPage={itemsPerPage}
          onSizeChange={handleItemsPerPageChange}
          IsSearch
          SearchText={search}
          handleSearch={setSearch}
        />
      </div>
    </>
  );
};

export default TeamsPage;
