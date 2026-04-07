import React, { FC, useState } from "react";

interface Tab {
  id: string;
  label: string;
  status?: string;
  statusColor?: string;
  content: React.ReactNode;
}

interface NavTabsProps {
  tabs: Tab[];
  defaultActiveTab?: string;
}

const NavTabs: FC<NavTabsProps> = ({ tabs, defaultActiveTab }) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0]?.id);

  return (
    <div className="container bg-white shadow rounded-2xl border-b px-2 md:px-4 border-gray-300 mb-4">
      {/* TAB HEADERS */}
      <ul className="flex justify-between px-2 md:px-6 overflow-x-auto">
        {tabs.map((tab) => (
          <li
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`cursor-pointer truncate md:px-6 md:py-3 text-center flex flex-col items-center border-b-2 transition-all whitespace-nowrap
              ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600 md:font-semibold"
                  : "border-transparent text-gray-500 hover:text-blue-500"
              }`}
          >
            <span className="md:text-lg text-[9px]">{tab.label}</span>
            {tab.status && (
              <span
                className={`md:text-sm text-[7px] truncate ${
                  tab.statusColor || "text-red-500"
                }`}
              >
                ({tab.status})
              </span>
            )}
          </li>
        ))}
      </ul>

      {/* TAB CONTENT (KEEP MOUNTED) */}
      <div className="p-1 md:p-4">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={activeTab === tab.id ? "block" : "hidden"}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavTabs;
