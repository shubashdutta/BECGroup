// import React, { type FC } from "react";

// interface PaginationType {
//   currentPage: number;
//   totalPage: number;
//   onNextPage: () => void;
//   onPrevPage: () => void;
//   onPageChange: (page: number) => void;
// }
// const Pagination: FC<PaginationType> = ({
//   currentPage,
//   totalPage,
//   onNextPage,
//   onPageChange,
//   onPrevPage,
// }) => {
//   const startPage = Math.max(1, currentPage - 1);
//   const endPage = Math.min(totalPage, startPage + 2);
//   const visiblePage = Array.from(
//     { length: endPage - startPage + 1 },
//     (_, i) => startPage + i,
//   );
//   return (
//     <div className="flex items-center justify-center my-3 space-x-2">
//       <button
//         type="button"
//         disabled={currentPage === 1}
//         onClick={() => {
//           onPrevPage();
//           window.scrollTo({
//             behavior: "smooth",
//             top: 0,
//           });
//         }}
//       >
//         Prev
//       </button>

//       {visiblePage?.map((page) => (
//         <button
//           type="button"
//           key={page}
//           className={`px-3 py-1 mx-1 border rounded ${
//             currentPage === page
//               ? "bg-blue-600 border-blue-400 text-white"
//               : "bg-white text-black"
//           }`}
//           onClick={() => {
//             onPageChange(page);
//             window.scrollTo({
//               behavior: "smooth",
//               top: 0,
//             });
//           }}
//         >
//           {page}
//         </button>
//       ))}

//       <button
//         type="button"
//         disabled={currentPage === totalPage}
//         onClick={() => {
//           onNextPage();
//           window.scrollTo({
//             behavior: "smooth",
//             top: 0,
//           });
//         }}
//       >
//         Next
//       </button>
//     </div>
//   );
// };

// export default Pagination;

// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, type FC, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { Size } from "./Size";

interface PaginationType {
  itemsPerPage?: string;
  onSizeChange: (size: string) => void;
  currentPage: number;
  totalPage: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  onPageChange: (page: number) => void;
}

const Dynamicpagination: FC<PaginationType> = ({
  itemsPerPage: propItemsPerPage = "10",
  onSizeChange,
  currentPage,
  totalPage,
  onNextPage,
  onPrevPage,
  onPageChange,
}) => {
  const { control, setValue, watch } = useForm<{ size: string }>({
    defaultValues: {
      size: propItemsPerPage,
    },
  });

  /* ---------------- PAGE WINDOW LOGIC ---------------- */
  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPage, startPage + 2);

  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  /* ---------------- SIZE CHANGE LOGIC ---------------- */
  const selectedSize = watch("size");
  const prevPropRef = useRef<string>(propItemsPerPage);

  useEffect(() => {
    if (selectedSize && selectedSize !== prevPropRef.current) {
      onSizeChange(selectedSize);
    }
  }, [selectedSize, onSizeChange]);

  useEffect(() => {
    if (
      propItemsPerPage !== prevPropRef.current &&
      propItemsPerPage !== selectedSize
    ) {
      const isValid = Size.some((opt) => opt.value === propItemsPerPage);
      setValue("size", isValid ? propItemsPerPage : "10");
    }
    prevPropRef.current = propItemsPerPage;
  }, [propItemsPerPage, selectedSize, setValue]);

  return (
    <div className="flex container flex-wrap items-center justify-between gap-4 my-4">
      {/* PAGE SIZE */}
      <div className="min-w-44 ">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Items Per Page
        </label>

        <Controller
          name="size"
          control={control}
          render={({ field }) => (
            <Select
              value={Size.find((opt) => opt.value === field.value)}
              onChange={(opt: any) => field.onChange(opt?.value ?? "10")}
              options={Size}
              menuPlacement="top"
              isSearchable={false}
              className="!cursor-pointer"
              styles={{
                control: (base) => ({
                  ...base,
                  cursor: "pointer",
                }),
                option: (base) => ({
                  ...base,
                  cursor: "pointer",
                }),
                singleValue: (base) => ({
                  ...base,
                  cursor: "pointer",
                }),
              }}
            />
          )}
        />
      </div>

      {/* PAGINATION */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => {
            onPrevPage();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="
    px-4 py-2 rounded-2xl border border-gray-300 
    bg-white text-gray-800 font-medium 
    hover:bg-gray-100 transition-all duration-200
    disabled:opacity-50 disabled:cursor-not-allowed
    shadow-sm
  "
        >
          Prev
        </button>

        {visiblePages.map((page) => (
          <button
            key={page}
            type="button"
            className={`px-3 py-1 border  cursor-pointer rounded ${
              currentPage === page
                ? "bg-blue-600 text-white border-blue-600 "
                : "bg-white"
            }`}
            onClick={() => {
              onPageChange(page);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          disabled={currentPage === totalPage}
          onClick={() => {
            onNextPage();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="
    px-4 py-2 rounded-2xl 
    bg-gradient-to-r from-blue-500 to-blue-600
    text-white font-semibold
    hover:from-blue-600 hover:to-blue-700
    transition-all duration-200
    disabled:opacity-50 disabled:cursor-not-allowed
    shadow-lg
  "
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Dynamicpagination;
