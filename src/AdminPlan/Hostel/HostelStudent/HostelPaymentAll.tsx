import { GetHostelStudentPaymentList } from "@/src/ApiList/AdminApi";
import useDynamicPagination from "@/src/Common/Pagination/usePagination";
import CustomTable from "@/src/Common/Table";
import ImagePreview from "@/src/lib/ImagePreview/ImagePreview";
import { errorMessage } from "@/src/lib/ToastifyMessage/ToastifyMessage";
import { HtmlDateFormat } from "@/src/utils/formatArrayToLocalDate";
import { getCurrentUserInfo } from "@/src/utils/GetCurrentUser";
import { getFilteredHeader } from "@/src/utils/getFilteredHeader";
import { NEPALI_MONTH_OPTIONS } from "@/src/utils/options/NepaliMonth";
import { removeHtmlTag } from "@/src/utils/removeHtmlTags";
import {
  HostelStudentPaymentHeader,
  HostelStudentPaymentHeader_All,
} from "@/src/utils/TableHeader";
import { useDebounce } from "@/src/utils/useDebounce";
import React, { FC, useEffect, useState } from "react";
type SelectOption = {
  label: string;
  value: string;
};

const HostelPaymentAll: FC = () => {
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
  const [search, setSearch] = useState("");
  const debounce = useDebounce(search);
  const [month, setMonth] = useState<SelectOption>();

  const [studentPaymentList, setStudentPaymentList] = useState([]);
  const { userType, id } = getCurrentUserInfo();

  const handleGetPaymentList = async () => {
    const params = {
      statusIn: "ACTIVE",
      ...(itemsPerPage !== "all" && {
        page: currentPage - 1,
        size: Number(itemsPerPage),
        transactionFor: "STUDENT",
      }),
      ...(debounce && { name: search }),
      ...(month?.value && { month: month?.value }),
      ...(userType !== "ADMIN" && userType !== "MD" && { userId: id }),
    };

    try {
      const res: any = await GetHostelStudentPaymentList(params);
      setStudentPaymentList(res?.data);
      setTotalPage(res?.pageSize);
    } catch (error) {
      errorMessage({ error });
    }
  };

  useEffect(() => {
    handleGetPaymentList();
  }, [debounce, currentPage, itemsPerPage, month?.value]);

  const TableBody = () =>
    studentPaymentList?.map((v: any, index: number) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{v?.owner?.studentName ?? ""}</td>
        <td>{v?.owner?.roomNumber ?? ""}</td>

        <td>{v?.year}</td>
        <td>{v?.month}</td>

        <td>{HtmlDateFormat(v?.paymentDate)}</td>

        <td className="  ">{removeHtmlTag(v?.remarks, 8)}</td>
        <td>{v?.paymentStatus}</td>
        <td>{`रु ${v?.amount}`}</td>
        <td>{v?.file ? <ImagePreview File={v} /> : "No File Uploaded"}</td>

        <td>{v?.paymentMode}</td>

        {/* <td>{student?.monthlyFee}</td> */}

        {/* <td>रु {Number(student?.monthlyFee || 0) - Number(v?.amount || 0)}</td> */}
      </tr>
    ));
  return (
    <CustomTable
      TableData={studentPaymentList}
      TableHeader={getFilteredHeader(HostelStudentPaymentHeader_All)}
      currentPage={currentPage}
      handleNext={handleNextPage}
      handlePageChange={handlePageChange}
      handlePrevPage={handlePrevPage}
      totalPage={totalPage}
      TableBody={TableBody}
      itemsPerPage={itemsPerPage}
      onSizeChange={handleItemsPerPageChange}
      IsSearch
      handleSearch={setSearch}
      sortBy
      sortOption={NEPALI_MONTH_OPTIONS}
      sortOptionValue={setMonth}
    />
  );
};

export default HostelPaymentAll;
