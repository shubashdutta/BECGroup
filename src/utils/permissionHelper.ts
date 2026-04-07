// export const getAllowedActions = (): string[] => {
//   if (typeof window === "undefined") return [];

import { useMemo } from "react";

//   try {
//     const permissionStr = localStorage.getItem("Permision");
//     const isAllActionStr = localStorage.getItem("isAllAction");

//     const permissionData =
//       permissionStr && permissionStr !== "undefined"
//         ? JSON.parse(permissionStr)
//         : null;

//     const isAllActionData =
//       isAllActionStr && isAllActionStr !== "undefined"
//         ? JSON.parse(isAllActionStr)
//         : null;

//     const finalActions =
//       Array.isArray(isAllActionData) && isAllActionData.length > 0
//         ? isAllActionData
//         : permissionData?.allowedActions;

//     return finalActions?.map((v: string) => v.toLowerCase()) || [];
//   } catch {
//     return [];
//   }
// };

export const getAllowedActions: any = () => {
  if (typeof window === "undefined") return [];

  try {
    const permissionStr = localStorage.getItem("Permision");
    if (!permissionStr) return [];

    const permission = JSON.parse(permissionStr);
    return (
      permission?.allowedActions?.map((v: string) => v.toLowerCase()) || []
    );
  } catch {
    return [];
  }
};
