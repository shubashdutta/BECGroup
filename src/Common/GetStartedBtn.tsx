// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { FC } from "react";

// interface ButtonValue {
//   label: string;
//   color?: any;
//   icon?: any;
//   disable?: boolean;
// }
// const GetStartedBtn: FC<ButtonValue> = ({ label, color, icon, disable }) => {
//   return (
//     <button
//       className={` w-full rounded-4xl flex  gap-2 justify-center items-center cursor-pointer px-8 py-3 text-white text-center text-md font-semibold hover:!bg-gray-500 `}
//       style={color ? { backgroundColor: color } : undefined}
//       disabled={disable}
//     >
//       <span>{icon}</span> {label}
//     </button>
//   );
// };

// export default GetStartedBtn;

/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { FC } from "react";

interface ButtonValue {
  label: string;
  color?: string;
  icon?: any;
  disable?: boolean;
  isSubmitting?: boolean;
}

const GetStartedBtn: FC<ButtonValue> = ({
  label,
  color,
  icon,
  disable,
  isSubmitting,
}) => {
  const defaultColor = color || "#4F46E5"; // default blue
  const disabledColor = "#A1A1AA"; // gray when disabled

  return (
    <button
      className={`w-full rounded-4xl flex gap-2 justify-center items-center cursor-pointer px-8 py-3 text-white text-center text-md font-semibold 
        ${
          disable || isSubmitting ? "cursor-not-allowed" : "hover:!bg-gray-500"
        }`}
      style={{
        backgroundColor: disable || isSubmitting ? disabledColor : defaultColor,
      }}
      disabled={disable || isSubmitting}
    >
      {isSubmitting && (
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

      <span className="ml-2 flex justify-center items-center gap-x-3">
        {isSubmitting ? (
          "Submitting..."
        ) : (
          <>
            {icon && <span>{icon}</span>} {label}
          </>
        )}
      </span>
    </button>
  );
};

export default GetStartedBtn;
