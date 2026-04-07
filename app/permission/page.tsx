"use client";
import { PermissionManager } from "@/components/permission/PermissionManager";
import { fetchPermissions } from "@/lib/api/permission";
import { usePermissionStore } from "@/store/permissionStore";
import { RolePermissionMatrix } from "@/components/permission/RolePermissionMatrix";

export default function PermissionPage() {
  const { permissions, roles, updatePermission } = usePermissionStore();
  return <PermissionManager permissions={permissions} roles={roles} />;
}
