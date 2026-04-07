/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from "react";

// const usePagination = (initialPage = 1, itemsPerPages = 10) => {
//   const [currentPage, setCurrentPage] = useState(initialPage);
//   const [itemsPerPage] = useState(itemsPerPages);
//   const [totalPage, setTotalPage] = useState(0);
//   const handleNextPage = () =>
//     currentPage < totalPage && setCurrentPage(currentPage + 1);
//   const handlePrevPage = () =>
//     currentPage > 1 && setCurrentPage(currentPage - 1);
//   const handlePageChange = (pageNumber: any) => setCurrentPage(pageNumber);

//   return {
//     currentPage,
//     setCurrentPage,
//     itemsPerPage,
//     totalPage,
//     setTotalPage,
//     handleNextPage,
//     handlePrevPage,
//     handlePageChange,
//   };
// };

// export default usePagination;

/* eslint-disable @typescript-eslint/no-explicit-any */
// // /* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";

const useDynamicPagination = (initialPage = 1, initialItemsPerPage = "10") => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState<any>(initialItemsPerPage);
  const [totalPage, setTotalPage] = useState(0);
  const handleItemsPerPageChange = (size: string) => {
    setItemsPerPage(size);
    setCurrentPage(1);
  };

  const handleNextPage = () =>
    currentPage < totalPage && setCurrentPage(currentPage + 1);
  const handlePrevPage = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);
  const handlePageChange = (pageNumber: any) => setCurrentPage(pageNumber);

  return {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    totalPage,
    setTotalPage,
    handleItemsPerPageChange,
    handleNextPage,
    handlePageChange,
    handlePrevPage,
  };
};

export default useDynamicPagination;
