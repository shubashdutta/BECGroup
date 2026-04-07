// // import { AdminNavList } from "./AdminNavList/AdminNavList";

// import { AdminNavList } from "./AdminNavList/AdminNavList";

// const ALLOWED_ACTIONS = ["view", "create", "edit"];

// export const getNavList = (
//   userType: string,
//   userPermissions: any[],
//   data?: any,
// ) => {
//   if (data?.userType === "ADMIN") {
//     return AdminNavList.filter((item) => item.id !== "userDashboard");
//   }

//   const getAllowedActions = (id: string) => {
//     const perm = userPermissions.find(
//       (p) => p?.name?.toLowerCase() === id.toLowerCase(),
//     );

//     if (!perm?.actions) return [];

//     return perm.actions
//       .map((a: string) => a.toLowerCase())
//       .filter((a: string) => ALLOWED_ACTIONS.includes(a));
//   };

//   return AdminNavList.map((item) => {
//     if (item.id === "userDashboard") return item;

//     const parentActions = getAllowedActions(item.id);

//     // if item has children
//     if (item.children) {
//       // if parent has access -> return full item with parent actions
//       if (parentActions.length > 0) {
//         return { ...item, allowedActions: parentActions };
//       }

//       // else filter children
//       const allowedChildren = item.children
//         .map((child: any) => {
//           const childActions = getAllowedActions(child.id);
//           if (childActions.length > 0) {
//             return { ...child, allowedActions: childActions };
//           }
//           return null;
//         })
//         .filter(Boolean);

//       if (allowedChildren.length > 0) {
//         return { ...item, children: allowedChildren };
//       }

//       return null;
//     }

//     // if no children, check parent
//     if (parentActions.length > 0) {
//       return { ...item, allowedActions: parentActions };
//     }

//     return null;
//   }).filter(Boolean);
// };

import { AdminNavList } from "./AdminNavList/AdminNavList";
import { MdOutlineDashboard } from "react-icons/md"; // make sure you have this

const ALLOWED_ACTIONS = ["view", "create", "edit"];

export const getNavList = (
  userType: string,
  userPermissions: any[],
  data?: any,
) => {
  const getAllowedActions = (id: string) => {
    const perm = userPermissions.find(
      (p) => p?.name?.toLowerCase() === id.toLowerCase(),
    );

    if (!perm?.actions) return [];

    return perm.actions
      .map((a: string) => a.toLowerCase())
      .filter((a: string) => ALLOWED_ACTIONS.includes(a));
  };

  return AdminNavList.map((item) => {
    // 🔹 Always show dashboard for both ADMIN and USER
    if (item.id === "dashboard") return item;

    // 🔹 If user is ADMIN → allow all items
    if (data?.userType === "ADMIN") {
      return item;
    }

    // 🔹 For normal users → check permissions
    const parentActions = getAllowedActions(item.id);

    // if item has children
    if (item.children) {
      // if parent has access -> return full item with parent actions
      if (parentActions.length > 0) {
        return { ...item, allowedActions: parentActions };
      }

      // else filter children
      const allowedChildren = item.children
        .map((child: any) => {
          const childActions = getAllowedActions(child.id);
          if (childActions.length > 0) {
            return { ...child, allowedActions: childActions };
          }
          return null;
        })
        .filter(Boolean);

      if (allowedChildren.length > 0) {
        return { ...item, children: allowedChildren };
      }

      return null;
    }

    // if no children, check parent permissions
    if (parentActions.length > 0) {
      return { ...item, allowedActions: parentActions };
    }

    return null;
  }).filter(Boolean);
};
