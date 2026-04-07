import React, { FC, useState } from "react";
import { useModal } from "../utils/Modal/OpenModalProvider";

interface DeleteProps {
  onConfirm: () => Promise<void>; // make it async so we can await deletion
}

const DeletedModal: FC<DeleteProps> = ({ onConfirm }) => {
  const { closeModal } = useModal();
  const [isDeleting, setIsDeleting] = useState(false); // track deleting state

  const handleDelete = async () => {
    setIsDeleting(true); // start loader
    try {
      await onConfirm(); // wait for async deletion
      closeModal(); // close modal after delete
    } catch (error) {
      console.error("Delete failed:", error);
      setIsDeleting(false); // stop loader if error
    }
  };

  return (
    <div>
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
        <div className="flex justify-center">
          {isDeleting ? (
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
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPH79kTc8dLkMxa07t-VcyB86Bpj5Tra0dJpO0Hyr7JNfDCKze"
              alt="Delete warning"
              className="h-20 w-20"
            />
          )}
        </div>

        {/* Text */}
        <h3 className="mt-4 text-center text-lg font-semibold text-gray-800">
          {isDeleting ? "Deleting..." : "Delete File"}
        </h3>
        <p className="mt-2 text-center text-sm text-gray-600">
          {isDeleting
            ? "Please wait while the file is being deleted."
            : "Are you sure you want to delete this file? This action cannot be undone."}
        </p>

        {/* Actions */}
        {!isDeleting && (
          <div className="mt-6 flex justify-between gap-3">
            <button
              onClick={closeModal}
              className="w-full cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              onClick={handleDelete}
              className="w-full cursor-pointer rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeletedModal;
