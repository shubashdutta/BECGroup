import { useModal } from "@/src/utils/Modal/OpenModalProvider";
import React, { FC, useState } from "react";

interface AssigneeProps {
  row?: any;
  onConfirm: () => Promise<void>;
}

const AssigneeChange: FC<AssigneeProps> = ({ row, onConfirm }) => {
  const { closeModal } = useModal();
  const [sure, setSure] = useState(false);

  const handleDelete = async () => {
    setSure(true);
    try {
      await onConfirm(); // wait for async deletion
      closeModal(); // close modal after delete
    } catch (error) {
      console.error("Delete failed:", error);
      setSure(false); // stop loader if error
    }
  };

  return (
    <div>
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
        <div className="flex justify-center">
          {sure ? (
            // Spinner SVG
            <svg
              className="h-16 w-16 animate-spin text-red-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
              ></path>
            </svg>
          ) : (
            <img
              src="https://cdn-icons-png.flaticon.com/512/564/564619.png"
              alt="Delete warning"
              className="h-20 w-20"
            />
          )}
        </div>

        {/* Text */}
        <h3 className="mt-4 text-center text-lg font-semibold text-gray-800">
          {sure ? "Changing..." : "Change"}
        </h3>
        <p className="mt-2 text-center text-sm text-gray-600">
          {sure
            ? "Please wait while the file is being Change."
            : "Are you sure you want to change the assignee name?."}
        </p>

        {!sure && (
          <div className="mt-6 flex justify-between gap-3">
            <button
              onClick={closeModal}
              className="w-full cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              onClick={handleDelete}
              className="w-full cursor-pointer rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-red-700"
            >
              Change
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssigneeChange;
