/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { FC, Suspense, useEffect, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";

import Logo from "@/asstest/Image/DashbaordLogo.png";
import Image from "next/image";
import { AdminNavList } from "@/src/utils/AdminNavList/AdminNavList";
import Link from "next/link";
import Avatar from "@/src/Common/Avatar";
import { usePathname, useRouter } from "next/navigation";
import { getCurrentUserInfo } from "@/src/utils/GetCurrentUser";
import { getNavList } from "@/src/utils/getNavList";
import { GetCureentAdmin, GetCurrentUser } from "@/src/ApiList/AdminApi";
import Loader from "@/app/loading";
// import PushSetup from "@/src/Common/PushSetup";

const { Header, Sider, Content } = Layout;

interface AdminProps {
  children: any;
}

const AdminLayout: FC<AdminProps> = ({ children }) => {
  const pathName = usePathname();
  const [cureentUser, setCureentUser] = useState<any>([]);
  const userType = "USER";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = JSON.parse(
          localStorage.getItem("currentUser") || "null",
        );

        if (storedUser) {
          setCureentUser(storedUser);
        }

        if (!localStorage.getItem("currentUser")) {
          const res = await GetCurrentUser();

          const newUser = res?.data;
          if (JSON.stringify(storedUser) !== JSON.stringify(newUser)) {
            localStorage.setItem("currentUser", JSON.stringify(newUser));
            setCureentUser(newUser);
          }
        }

        // Compare old and new
      } catch (e) {
        console.log("User fetch error:", e);
      }
    };

    fetchUser();
  }, []);
  const userPermissions =
    cureentUser?.role
      ?.flatMap((role: any) => role.permissionList ?? []) // Flatten all permissionLists
      ?.map((perm: any) => ({
        name: perm.name,
        actions: perm.actions,
      })) ?? [];

  const filteredNav = getNavList(userType, userPermissions, cureentUser);
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(true);

  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const user = getCurrentUserInfo();

  const updatePermission = (menuItem: any, parentActions?: string[]) => {
    if (!menuItem) return;

    const finalActions = Array.from(
      new Set([...(menuItem.allowedActions || []), ...(parentActions || [])]),
    );

    const permissionPayload = {
      ...menuItem,
      allowedActions: finalActions,
    };

    localStorage.setItem("Permision", JSON.stringify(permissionPayload));

    // ❌ REMOVE isAllAction completely
    localStorage.removeItem("isAllAction");

    // 🔥 notify RowAction
    window.dispatchEvent(new Event("permission-change"));
  };

  return (
    <Layout className="h-auto">
      <Sider
        className="pt-3 overflow-y-auto h-screen "
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="demo-logo-vertical" />

        <div>
          <div className="flex justify-center items-center">
            <Image src={Logo} alt="" />
          </div>

          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            onOpenChange={(keys) => setOpenKeys(keys)}
            className="!mt-3 !text-lg !space-y-2"
            items={filteredNav?.map((item: any) => {
              if (item.children) {
                return {
                  key: item.id,
                  icon: <item.icon size={20} />,
                  label: item.label,

                  onTitleClick: () => {
                    const firstChild = item.children?.[0];

                    if (!firstChild) return;

                    updatePermission(firstChild, item.allowedActions);

                    router.push(firstChild.link);
                    setSelectedKeys([firstChild.id]);
                    setOpenKeys([item.id]);
                  },

                  children: item.children.map((child: any) => ({
                    key: child.id,
                    icon: child.icon && <child.icon size={18} />,
                    label: <Link href={child.link}>{child.label}</Link>,
                    onClick: () => {
                      updatePermission(child, item.allowedActions);

                      setSelectedKeys([child.id]);
                      setOpenKeys([item.id]);
                    },
                  })),
                };
              }

              return {
                key: item.id,
                icon: <item.icon size={20} />,
                label: <Link href={item.link}>{item.label}</Link>,
                onClick: () => {
                  updatePermission(item, item.allowedActions);
                  setSelectedKeys([item.id]);
                },
              };
            })}
          />
        </div>
      </Sider>

      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            height: 56,
          }}
        >
          <div className="flex justify-between items-center px-4 h-full">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 48,
                height: 48,
              }}
            />

            <Avatar
              email={user?.email}
              userType={user?.userType}
              image={user?.file}
            />
          </div>
        </Header>

        <Content
          style={{
            padding: 3,
            minHeight: 200,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
          className="mt-1"
        >
          <Suspense fallback={<Loader />}>{children}</Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
