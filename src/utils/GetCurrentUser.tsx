"use client";

export const getCurrentUserInfo = () => {
  if (typeof window === "undefined") return null; // safe for SSR
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
};

export const UserPermission = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const userData = localStorage.getItem("currentUser");
  if (!userData) return null;

  // Parse the JSON string
  const user: any = JSON.parse(userData);

  // Extract role name

  const Permissions =
    user?.role
      ?.flatMap((role: any) => role.permissionList ?? []) // Flatten all permissionLists
      ?.map((perm: any) => ({
        name: perm.name,
        actions: perm.actions,
      })) ?? [];

  return Permissions
};
