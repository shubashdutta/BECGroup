import AddBtn from "@/src/Common/AddBtn";
import React, { useEffect, useState } from "react";
import AddAfterVisaForm from "./AddAfterVisaForm";
import { useDrawer } from "@/src/utils/Modal/DrawerModalProvider";
import useDynamicPagination from "@/src/Common/Pagination/usePagination";
import { useConsultingStudent } from "@/store/useStudentConsulting";
import { apiRequest } from "@/src/lib/axiosSetup";
import { errorMessage } from "@/src/lib/ToastifyMessage/ToastifyMessage";
import CustomTable from "@/src/Common/Table";
import { getFilteredHeader } from "@/src/utils/getFilteredHeader";
import { After_Visa_Header } from "@/src/utils/TableHeader";
import RowAction from "@/src/lib/RowAction/RowAction";
import { ICONS } from "@/asstest/icons/icons";
import AfterVisaViewPage from "./AfterVisaViewPage";

const AfterVisaPage = () => {
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
  const { openDrawer } = useDrawer();

  const [afterVisa, setAfterVisa] = useState([]);
  const consultingStudent = useConsultingStudent(
    (state) => state?.consultingStudent,
  );

  const handleGetAfterVisa = async () => {
    const params = {
      statusIn: "ACTIVE",
      studentId: consultingStudent?.id,
    };

    try {
      const res: any = await apiRequest.get("api/payment/after-visa/all", {
        params,
      });
      setAfterVisa(res?.data);
      setTotalPage(res?.pageSize);
    } catch (error) {
      errorMessage({ error });
    }
  };

  useEffect(() => {
    handleGetAfterVisa();
  }, []);
  const handleAddAfterVisa = () =>
    openDrawer(
      "Add After Visa Charge",
      <AddAfterVisaForm fun={handleGetAfterVisa} />,
      "xl",
    );

  const TabelBody = () => {
    return afterVisa?.map((v: any, index: number) => (
      <tr key={index}>
        <td>{index + 1}</td>

        <td>{v?.flightTicket}</td>
        <td>{v?.serviceCharge}</td>
        <td>{v?.accommodationFee}</td>

        <td>{render(v)}</td>
      </tr>
    ));
  };

  const handleDelete = () => {};
  const handleEdit = (row: any) => {
    openDrawer(
      "Add After Visa Charge",
      <AddAfterVisaForm fun={handleGetAfterVisa} row={row} />,
      "xl",
    );
  };
  const handleView = (row: any) => {
    openDrawer("view", <AfterVisaViewPage rowData={row}  />, "xl");
  };

  const actions: any = [
    {
      label: "view",
      actionType: "view",
      icons: ICONS.View,
      handler: handleView,
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
    <>
      <AddBtn lable="Add" fun={handleAddAfterVisa} />

      <CustomTable
        TableData={afterVisa}
        TableHeader={getFilteredHeader(After_Visa_Header)}
        currentPage={currentPage}
        handleNext={handleNextPage}
        handlePageChange={handlePageChange}
        handlePrevPage={handlePrevPage}
        totalPage={totalPage}
        onSizeChange={handleItemsPerPageChange}
        TableBody={TabelBody}
        itemsPerPage={itemsPerPage}
      />
    </>
  );
};

export default AfterVisaPage;
