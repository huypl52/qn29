import React from 'react';
import OCRChart from '~/page/Statistical/OCRChart..tsx';
import TextChart from '~/page/Statistical/TextChart.tsx';
import Report from '../Report';
import TreeLeftBar from '~/feature/unit/TreeLeftBar';

// Register chart.js modules

const Statistical: React.FC = () => {
  return (
    <TreeLeftBar>
      <div className="w-full px-16">
        <Report />
        <div className="flex gap-3">
          <OCRChart />
          <TextChart />
        </div>
      </div>
    </TreeLeftBar>
  );
};

export default Statistical;
