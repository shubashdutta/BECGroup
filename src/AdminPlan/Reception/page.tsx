"use client";

import React, { useEffect, useState } from "react";
import AddBtn from "@/src/Common/AddBtn";
import { useModal } from "@/src/utils/Modal/OpenModalProvider";
import ReceptonForm from "./ReceptonForm";
import usePagination from "@/src/Common/Pagination/usePagination";
import {
  DeleteReception,
  GetEmployee,
  GetReception,
} from "@/src/ApiList/AdminApi";
import {
  errorMessage,
  successMessage,
} from "@/src/lib/ToastifyMessage/ToastifyMessage";
import CustomTable from "@/src/Common/Table";
import { Recepition_Header } from "@/src/utils/TableHeader";
import { ICONS } from "@/asstest/icons/icons";
import RowAction from "@/src/lib/RowAction/RowAction";
import { getFilteredHeader } from "@/src/utils/getFilteredHeader";
import ShowActionColumn from "@/src/utils/ShowActionColumn";
import { generateStudentPDF } from "@/src/Common/StudentCertificatePDF";
import ReceptionQR from "@/src/lib/ReceptionQr/ReceptionQR";
import { apiRequest } from "@/src/lib/axiosSetup";
import { message } from "antd";
import AssigneeChange from "./AssigneeChange";
import DeletedModal from "@/src/Common/DeletedModal";
import { CheckCircle2, Clock } from "lucide-react";
import { FaHourglassHalf } from "react-icons/fa";
import CopyToClipboard from "@/src/lib/CopyToClipboard/CopyToClipboard";
import { getCurrentUserInfo } from "@/src/utils/GetCurrentUser";
import { useDebounce } from "@/src/utils/useDebounce";
import { ReceptionExcel } from "@/src/ExcelCollection/ReceptionExcel";
import ExcelDonwloadBtn from "@/src/Common/ExcelDonwloadBtn";

const Receptionpage = () => {
  const { openModal } = useModal();

  /* ---------------- PAGINATION ---------------- */
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

  const [data, setData] = useState<any[]>([]);
  const [employee, setEmployee] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const debounce = useDebounce(search);
  const currentUser = getCurrentUserInfo();
  const [excel, setExcel] = useState([]);
  const [date, setDate] = useState<any>({});

  const handleGetReception = async () => {
    const params = {
      statusIn: "ACTIVE",
      ...(itemsPerPage !== "all" && {
        page: currentPage - 1,
        size: Number(itemsPerPage),
      }),

      ...(date?.startDate && { startDate: date?.startDate }),
      ...(date?.endDate && { endDate: date?.endDate }),
      ...(debounce && { name: debounce }),
      ...(currentUser?.userType !== "ADMIN" &&
        currentUser?.userType !== "MD" && { userId: currentUser?.id }),
    };
    try {
      const res: any = await GetReception(params);
      const data = res?.data?.map((v: any, index: number) => ({
        SN: index + 1,
        StudentName: v?.fullName,
        PhoneNumber: v?.mobile,
        Email: v?.email,
        Language: v?.language,
        PreferredCountry: v?.preferredCountry,
      }));
      setExcel(data);

      const formattedData = res?.data?.map((v: any, index: number) => {
        const a = v?.assignee;
        const id = ++index;
        return {
          ...v,
          assigneeId: a?.id ?? "",
          sn:
            itemsPerPage === "all"
              ? id
              : (currentPage - 1) * Number(itemsPerPage) + id,
        };
      });

      setData(formattedData || []);
      setTotalPage(res?.pageSize);
    } catch (error) {
      errorMessage({ error });
    }
  };

  const handleGetEmployee = async () => {
    try {
      const res: any = await GetEmployee({ statusIn: "ACTIVE" });

      const users = res?.data?.filter((user: any) => {
        // Check if the user has a role with permission "Council"
        const hasCouncilPermission = user.role?.some((role: any) =>
          role.permissionList?.some(
            (perm: any) => perm.name.trim() === "Council",
          ),
        );

        return user.userType === "ADMIN" || hasCouncilPermission;
      });

      const empData = users?.map((v: any) => ({
        label: `${v.firstName} ${v.middleName ?? ""} ${v.lastName}`.trim(),
        value: v.id,
      }));

      setEmployee(empData || []);
    } catch (error) {
      errorMessage({ error });
    }
  };

  const handleChangeAssigner = async (
    receptionId: number,
    newAssigneeId: number,
  ) => {
    setData((prev) =>
      prev.map((row) =>
        row.id === receptionId ? { ...row, assigneeId: newAssigneeId } : row,
      ),
    );

    const payload = {
      id: receptionId,
      assigneeId: newAssigneeId,
    };

    try {
      const res: any = await apiRequest.post(
        "api/reception/form/assignee/add",
        payload,
      );
      successMessage({ message: res?.message });
    } catch (error) {
      errorMessage({ error });
    }
  };

  const handleAssignerChange = (receptionId: number, newAssigneeId: number) => {
    openModal(
      "Change Assigner",
      <AssigneeChange
        onConfirm={() => handleChangeAssigner(receptionId, newAssigneeId)}
      />,
      "sm",
    );
  };

  const TableBody = () => {
    return data?.map((v: any, index: number) => (
      <tr key={v.id}>
        <td>{v?.sn}</td>

        <td>
          <select
            className="border rounded px-2 py-1"
            value={v.assigneeId ?? ""}
            onChange={(e) => handleAssignerChange(v.id, Number(e.target.value))}
          >
            <option value="">Select Assignee</option>

            {employee.map((emp) => (
              <option key={emp.value} value={emp.value}>
                {emp.label}
              </option>
            ))}
          </select>
        </td>

        <td>{v?.fullName ?? "-"}</td>

        <td>{v?.preferredCountry ?? "-"}</td>
        <td>{v?.mobile ?? "-"}</td>
        <td>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span>{v?.email ?? "-"}</span>
            {v?.email && <CopyToClipboard text={v.email} />}
          </div>
        </td>

        <td>
          <div className=" flex justify-center items-center">
            {v?.verificationStatus === "PENDING" ? (
              <FaHourglassHalf size={20} className=" text-red-400" />
            ) : (
              <CheckCircle2 className=" text-green-600" />
            )}
          </div>
        </td>

        <ShowActionColumn header={getFilteredHeader(Recepition_Header)}>
          {render(v)}
        </ShowActionColumn>
      </tr>
    ));
  };

  const handleEdit = (row: any) => {
    openModal(
      "Update Reception",
      <ReceptonForm fun={handleGetReception} row={row} />,
      "xxl",
    );
  };

  const handelDeleteReception = async (row: any) => {
    try {
      const res: any = await DeleteReception(row.id);
      successMessage({ message: res?.message });
      handleGetReception();
    } catch (error) {
      errorMessage({ error });
    }
  };

  const handleDelete = async (row: any) => {
    openModal(
      "Delete",
      <DeletedModal onConfirm={() => handelDeleteReception(row)} />,
      "sm",
    );
  };

  const handleDownload = (row: any) => {
    generateStudentPDF(row);
  };

  const action: any = [
    {
      label: "Download",
      actionType: "download",
      icons: ICONS.Download,
      handler: handleDownload,
    },

    {
      label: "Edit",
      actionType: "Edit",
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

  useEffect(() => {
    handleGetEmployee();
  }, []);

  useEffect(() => {
    handleGetReception();
  }, [currentPage, itemsPerPage, debounce, date?.startDate, date?.endDate]);

  return (
    <div>
      <div className="flex justify-end gap-x-3 mb-4">
        {/* <button onClick={() => ReceptionExcel(data1, "ReceptionList")}>
          Download Excel
        </button> */}
        {currentUser?.userType === "ADMIN" && (
          <ExcelDonwloadBtn
            fun={() => ReceptionExcel(excel, "Reception_List")}
          />
        )}

        <ReceptionQR />
        <AddBtn
          lable="Add"
          fun={() =>
            openModal(
              "Add Student By Reception",
              <ReceptonForm fun={handleGetReception} />,
              "xxl",
            )
          }
        />
      </div>

      <CustomTable
        TableData={data}
        TableHeader={getFilteredHeader(Recepition_Header)}
        currentPage={currentPage}
        handleNext={handleNextPage}
        handlePageChange={handlePageChange}
        handlePrevPage={handlePrevPage}
        TableBody={TableBody}
        totalPage={totalPage}
        IsSearch={true}
        SearchText={search}
        handleSearch={setSearch}
        itemsPerPage={itemsPerPage}
        onSizeChange={handleItemsPerPageChange}
        filterDateWise={true}
        onDateChange={setDate}
      />
    </div>
  );
};

export default Receptionpage;
