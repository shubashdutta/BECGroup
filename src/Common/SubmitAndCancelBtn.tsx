import React, { FC } from "react";

interface ButtonProps {
  isSubmiting?: any;
  fun?: any;
}

const SubmitAndCancelBtn: FC<ButtonProps> = ({ fun, isSubmiting }) => {
  return (
    <div className=" flex  justify-between ">
      <button
        className=" bg-rose-700 rounded py-2 px-3  text-white  cursor-pointer"
        type="button"
        onClick={fun}
      >
        Cancel
      </button>
      <button
        type="submit"
        className="bg-blue-500 text-white rounded py-2 px-3 flex items-center gap-2 cursor-pointer"
        disabled={isSubmiting}
      >
        {isSubmiting && (
          <svg
            aria-hidden="true"
            role="status"
            className="w-4 h-4 text-white animate-spin"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#E5E7EB"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871..."
              fill="currentColor"
            />
          </svg>
        )}

        {isSubmiting ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
};

export default SubmitAndCancelBtn;
