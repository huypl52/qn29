import { useState } from 'react';
import { TabsProps } from './type';
import ColorOptionButton from '~/component/Button/ColorOptionButton.tsx';

export function TabWithContent({ tabs, defaultTabId, onTabChange }: TabsProps) {
  const [selectedId, setSelectedId] = useState(
    defaultTabId || tabs[0]?.id || ''
  );

  const handleChangeTab = (id: string) => {
    setSelectedId(id);
    onTabChange(id);
  };

  return (
    <div className="w-full h-full mx-auto ">
      <div className="flex gap-2 mt-4 max-w-screen-xxl mx-12">
        {tabs.map((tab) => (
          <ColorOptionButton
            active={selectedId === tab.id}
            onClick={() => handleChangeTab(tab.id)}
          >
            {tab.label}
          </ColorOptionButton>
        ))}
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
