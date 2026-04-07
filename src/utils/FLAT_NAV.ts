import { AdminNavList } from "./AdminNavList/AdminNavList";

export const getModuleIdFromPath = (path: any) => {
  // remove query params
  const cleanPath = path?.split("?")[0];

  // exact match parent
  const parent = AdminNavList.find((m) => m.link === cleanPath);
  if (parent) return parent.id;

  // match children
  for (const m of AdminNavList) {
    if (m.children) {
      const child = m.children.find((c) => c.link === cleanPath);
      if (child) return child.id;
    }
  }

  return null;
};
