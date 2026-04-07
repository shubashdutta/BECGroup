"use client";
import { RoleManager } from "@/components/role/RoleManager";
import { fetchRoles } from "@/lib/api/role";
import { useRoleStore } from "@/store/roleStore";
import { RoleCard } from "@/components/role/RoleCard";

export default function RolePage() {
  const { roles, createRole, deleteRole } = useRoleStore();
  return <RoleManager roles={roles} onCreate={createRole} onDelete={deleteRole} />;
}
