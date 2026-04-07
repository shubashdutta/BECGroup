/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { type FC } from "react";
import Image from "next/image";

import Pagination from "./Pagination/Pagination";
import NoDataFound from "@/asstest/Image/NoDataFound.avif";
import StartDateEndDateInput from "./StartDateEndDateInput";
import SortBy from "./SortBy";

interface TableProps {
  TableHeader: string[];
  TableBody?: () => React.ReactNode;
  TableData: any[];
  currentPage: number;
  totalPage: number;
  handleNext: () => void;
  handlePrevPage: () => void;
  handlePageChange: (page: number) => void;
  itemsPerPage?: any;
  onSizeChange?: any;
  IsSearch?: boolean;
  SearchText?: string;
  handleSearch?: (value: string) => void;
  filterDateWise?: boolean;
  onDateChange?: (startDate: string, endDate: string) => void;
  sortBy?: boolean;
  sortOption?: any;
  sortOptionValue?: any;
}

const CustomTable: FC<TableProps> = ({
  TableHeader,
  TableBody,
  TableData,
  currentPage,
  totalPage,
  handleNext,
  handlePrevPage,
  handlePageChange,
  itemsPerPage,
  onSizeChange,
  IsSearch,
  SearchText,
  handleSearch,
  filterDateWise,
  onDateChange,
  sortBy,
  sortOption,

  sortOptionValue,
}) => {
  return (
    <div className="w-full overflow-x-auto mt-1 px-1">
      <div className="flex justify-between items-end gap-3 mb-2">
        {IsSearch && (
          <div className="w-2/3">
            <input
              type="text"
              placeholder="Search..."
              value={SearchText || ""}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none transition"
              onChange={(e) => handleSearch?.(e.target.value)}
            />
          </div>
        )}

        {filterDateWise && (
          <StartDateEndDateInput onDateChange={onDateChange} />
        )}

        {sortBy && (
          <div className="w-1/5">
            <SortBy options={sortOption} onChange={sortOptionValue} />
          </div>
        )}
      </div>

      <table className="table-custom">
        <thead>
          <tr>
            {TableHeader.map((v, index) => (
              <th key={index}>{v}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {TableData.length ? (
            TableBody && TableBody()
          ) : (
            <tr>
              <td colSpan={TableHeader.length} className="table-nodata">
                <div className="flex flex-col items-center justify-center gap-2">
                  <Image
                    src={NoDataFound}
                    alt="No data"
                    className="w-auto h-64 rounded"
                  />
                  <span className="text-2xl">No data found</span>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {TableData.length > 0 && (
        <Pagination
          currentPage={currentPage}
          onNextPage={handleNext}
          onPageChange={handlePageChange}
          onPrevPage={handlePrevPage}
          totalPage={totalPage}
          onSizeChange={onSizeChange}
          itemsPerPage={itemsPerPage}
        />
      )}
    </div>
  );
};

export default CustomTable;
