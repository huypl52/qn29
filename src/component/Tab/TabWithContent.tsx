import { useState } from 'react';
import { TabsProps } from './type';
import ColorOptionButton from '~/component/Button/ColorOptionButton.tsx';

export function TabWithContent({ tabs, defaultTabId, onTabChange, onClickHistory, showHistory }: TabsProps) {
  const [selectedId, setSelectedId] = useState(
    defaultTabId || tabs[0]?.id || ''
  );

  const handleChangeTab = (id: string) => {
    setSelectedId(id);
    onTabChange(id);
  };

  return (
    <div className="w-full h-full mx-auto">
      <div className="flex gap-2 mt-4 max-w-screen-xxl mx-12 justify-between mr-0">
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <ColorOptionButton
              active={selectedId === tab.id}
              onClick={() => handleChangeTab(tab.id)}
            >
              {tab.label}
            </ColorOptionButton>
          ))}
        </div>
        {!showHistory && <button className="text-blue-500" onClick={()=>onClickHistory(true)}>
          &lt; Xem lịch sử dịch
        </button>}
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
