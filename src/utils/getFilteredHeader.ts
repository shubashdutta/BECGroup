// utils/getFilteredHeader.ts
import { getCurrentUserInfo } from "@/src/utils/GetCurrentUser";

const ACTION_NAMES = ["view", "edit", "delete"];

export const getFilteredHeader = (tableHeader: string[]) => {
  const currentUser = getCurrentUserInfo();

  if (!currentUser) return tableHeader;

  const { userType, role } = currentUser;

  if (userType === "ADMIN") return tableHeader;

  const allowedActions: string[] =
    role?.flatMap(
      (roleItem: any) =>
        roleItem?.permissionList?.flatMap(
          (perm: any) =>
            perm?.actions?.map((a: string) => a.toLowerCase()) || [],
        ) || [],
    ) || [];

  if (!allowedActions.some((a: any) => ACTION_NAMES.includes(a))) {
    return tableHeader.filter((h: any) => h.toLowerCase() !== "action");
  }

  return tableHeader;
};
