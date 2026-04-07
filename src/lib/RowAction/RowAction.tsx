"use client";

import { getCurrentUserInfo } from "@/src/utils/GetCurrentUser";
import { getAllowedActions } from "@/src/utils/permissionHelper";
import React, { FC, useEffect, useState, useMemo } from "react";

interface RowActionProps {
  actions: any[];
  item: any;
}

const RowAction: FC<RowActionProps> = ({ actions, item }) => {
  const currentUser = getCurrentUserInfo();
  const userType = currentUser?.userType;

  // ADMIN → show all
  if (userType === "ADMIN") {
    return (
      <div className="flex justify-center items-center gap-2">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={() => action.handler(item)}
            title={action.label}
            className="
            cursor-pointer
               group
             flex items-center justify-center
               w-9 h-9
        rounded-full
        border border-gray-200
        bg-white
        text-gray-600
        shadow-sm
        transition-all duration-200
        hover:bg-blue-50
        hover:text-blue-600
        hover:shadow-md
        focus:outline-none
        focus:ring-2 focus:ring-blue-400 focus:ring-offset-1
      "
          >
            <action.icons
              size={16}
              className="transition-transform duration-200 group-hover:scale-110"
            />
          </button>
        ))}
      </div>
    );
  }

  // ✅ reactive permissions
  const [allowedActions, setAllowedActions] = useState<any>([]);

  useEffect(() => {
    const updatePermissions = () => {
      setAllowedActions(getAllowedActions());
    };

    updatePermissions();

    // listen when permissions change
    window.addEventListener("permission-change", updatePermissions);
    window.addEventListener("storage", updatePermissions);

    return () => {
      window.removeEventListener("permission-change", updatePermissions);
      window.removeEventListener("storage", updatePermissions);
    };
  }, []);

  const actionsToShow = useMemo(() => {
    const hasView = allowedActions.includes("view");

    return actions.filter((action) => {
      const type = action.actionType?.toLowerCase();

      if (type === "download" || type === "salary" || type === "document") {
        return hasView;
      }

      return allowedActions.includes(type);
    });
  }, [actions, allowedActions]);

  return (
    <div className="flex justify-center items-center gap-2">
      {actionsToShow.map((action, index) => (
        <button
          key={index}
          onClick={() => action.handler(item)}
          title={action.label}
          className="
            cursor-pointer
               group
             flex items-center justify-center
               w-9 h-9
        rounded-full
        border border-gray-200
        bg-white
        text-gray-600
        shadow-sm
        transition-all duration-200
        hover:bg-blue-50
        hover:text-blue-600
        hover:shadow-md
        focus:outline-none
        focus:ring-2 focus:ring-blue-400 focus:ring-offset-1
      "
        >
          <action.icons size={16} />
        </button>
      ))}
    </div>
  );
};

export default RowAction;
