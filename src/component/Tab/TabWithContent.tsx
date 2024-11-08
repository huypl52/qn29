import { useState } from 'react';
import { TabsProps } from './type';
import ColorOptionButton from '~/component/Button/ColorOptionButton.tsx';

export function TabWithContent({
  tabs,
  defaultTabId,
  onTabChange,
  onClickHistory,
  showHistory,
}: TabsProps) {
  const [selectedId, setSelectedId] = useState(
    defaultTabId || tabs[0]?.id || ''
  );

  const handleChangeTab = (id: string) => {
    setSelectedId(id);
    onTabChange(id);
  };

  return (
    <div className="w-full h-full mx-auto">
      <div className="flex gap-2 mt-4 max-w-screen-xxl mx-12 justify-between mr-0 relative">
        <div className="flex gap-2">
          {tabs.map((tab, i) => (
            <div key={i}>
              <ColorOptionButton
                active={selectedId === tab.id}
                onClick={() => handleChangeTab(tab.id)}
              >
                {tab.label}
              </ColorOptionButton>
            </div>
          ))}
        </div>
        {!showHistory && (
          <div className="group absolute right-0 top-1/2 transform -translate-y-1/2 p-2">
            <button
              className="flex items-center leading-1 bg-[#38a169] text-white font-semibold px-2 py-1 rounded-lg shadow-lg hover:bg-[#38a169] transition"
              onClick={() => onClickHistory(true)}
            >
              &lt;
              <span className="ml-2 hidden group-hover:inline px-2 py-1">
                Lịch sử
              </span>
            </button>
          </div>
        )}
      </div>
      <div className="mt-4">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={tab.id === selectedId ? 'block' : 'hidden'}
            role="tabpanel"
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}
