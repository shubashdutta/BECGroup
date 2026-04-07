// "use client";
// import React, { FC } from "react";
// import { GrAddCircle } from "react-icons/gr";
// import { getCurrentUserInfo } from "../utils/GetCurrentUser";

// interface ButtonProps {
//   lable: string;
//   fun?: any;
// }

// const AddBtn: FC<ButtonProps> = ({ lable, fun }) => {
//   const getUser = getCurrentUserInfo();

//   return (
//     <>
//       <div className="flex justify-end items-center">
//         <button
//           type="button"
//           onClick={fun}
//           className="flex items-center justify-center gap-x-2.5 rounded bg-blue-600 text-white py-2 px-3 cursor-pointer"
//         >
//           <span>
//             <GrAddCircle size={20} />
//           </span>
//           {lable}
//         </button>
//       </div>
//     </>
//   );
// };

// export default AddBtn;

"use client";
import React, { FC } from "react";
import { GrAddCircle } from "react-icons/gr";
import { getCurrentUserInfo, UserPermission } from "../utils/GetCurrentUser";

interface ButtonProps {
  lable: string;
  fun?: any;
}

const AddBtn: FC<ButtonProps> = ({ lable, fun }) => {
  const currentUser = getCurrentUserInfo();

  if (!currentUser) return null;

  const { userType, role } = currentUser;

  if (userType === "ADMIN") {
    return (
      <div className="flex justify-end items-center">
        <button
          type="button"
          onClick={fun}
          className="flex items-center justify-center gap-x-2.5 rounded bg-blue-600 text-white py-2 px-3 cursor-pointer"
        >
          <GrAddCircle size={20} />
          {lable}
        </button>
      </div>
    );
  }

  const hasCreatePermission =
    currentUser?.role?.some((role: any) =>
      role.permissionList?.some((perm: any) =>
        perm.actions?.some(
          (action: string) => action.toLowerCase() === "create"
        )
      )
    ) ?? false;

  if (hasCreatePermission) {
    return (
      <div className="flex justify-end items-center">
        <button
          type="button"
          onClick={fun}
          className="flex items-center justify-center gap-x-2.5 rounded bg-blue-600 text-white py-2 px-3 cursor-pointer"
        >
          <GrAddCircle size={20} />
          {lable}
        </button>
      </div>
    );
  }

  return null;
};

export default AddBtn;
