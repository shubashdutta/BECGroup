import { AdminNavList } from "../AdminNavList/AdminNavList";

// export const permissionOption = AdminNavList?.map((v) => ({
//   label: v?.label,
//   value: v?.id,
// }));

// export const permissionOption = AdminNavList?.filter(
//   (v) => !["dashboard", "userDashboard"].includes(v?.id)
// ).map((v) => ({
//   label: v.label,
//   value: v.id,
// }));

// export const permissionOption = AdminNavList.flatMap((item) => {
//   // Add the parent item
//   const parent = {
//     label: item.label,
//     value: item.id,
//   };

//   const children =
//     item.children?.map((child) => ({
//       label: ` ${parent?.label} (${child.label})`,
//       value: child.id,
//     })) || [];

//   return [parent, ...children];
// }).filter((v) => !["dashboard", "userDashboard"].includes(v.value));

export const permissionOption = AdminNavList.flatMap((item) => {
  // ❌ If item has children → return only children
  if (item.children && item.children.length > 0) {
    return item.children.map((child) => ({
      label: `${item.label} (${child.label})`,
      value: child.id,
    }));
  }

  // ✅ If no children → return parent
  return [
    {
      label: item.label,
      value: item.id,
    },
  ];
}).filter((v) => !["dashboard", "userDashboard"].includes(v.value));

export const Action = [
  { label: "Create", value: "Create" },
  { label: "View", value: "view" },
  { label: "Edit", value: "Edit" },
  { label: "Delete", value: "Delete" },
];
