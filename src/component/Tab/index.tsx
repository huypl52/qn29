import { useState } from "react";

type Tab = {
  id: string;
  label: string;
  content: React.ReactNode;
};

type TabsProps = {
  tabs: Tab[];
  defaultTabId?: string;
};

export default function Tabs({ tabs, defaultTabId }: TabsProps) {
  const [selectedId, setSelectedId] = useState(
    defaultTabId || tabs[0]?.id || "",
  );

  return (
    <div className="">
      <div className="flex m-5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedId(tab.id)}
            className={`
              px-4 py-2 font-medium text-sm border-b-2 
              ${
                selectedId === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }
            `}
            aria-selected={selectedId === tab.id}
            role="tab"
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={tab.id === selectedId ? "block" : "hidden"}
            role="tabpanel"
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}
