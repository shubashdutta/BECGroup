import React, { FC, useState } from "react";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  icons?: React.ReactNode;
}

interface NavTabsProps {
  tabs: Tab[];
  defaultActiveTab?: string;
  onTabChange?: (id: string) => void; // ✅ add this
}

const EmpolyeeNavTab: FC<NavTabsProps> = ({
  tabs,
  defaultActiveTab,
  onTabChange,
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0]?.id);

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    onTabChange?.(id); // ✅ fire callback
  };

  return (
    <div>
      {/* Tabs Header */}
      <ul className="flex gap-1">
        {tabs.map((tab) => (
          <li
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`cursor-pointer truncate md:px-6 md:py-3 text-center flex items-center border-b-2 transition-all whitespace-nowrap gap-x-2
              ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600 md:font-semibold"
                  : "border-transparent text-gray-500 hover:text-blue-500"
              }`}
          >
            {tab.icons && <span className="text-xl">{tab.icons}</span>}
            <span className="md:text-lg text-[9px]">{tab.label}</span>
          </li>
        ))}
      </ul>

      {/* ✅ Only active tab mounts */}
      <div className="p-1">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};

export default EmpolyeeNavTab;
