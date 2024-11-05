import React, { useEffect, useState } from 'react';
import OCRChart from '~/page/Statistical/OCRChart..tsx';
import TextChart from '~/page/Statistical/TextChart.tsx';
import Report from '../Report';

// Register chart.js modules

const Statistical: React.FC = () => {
  return (
    <div>
      <Report />
      <div className="flex">
        <OCRChart />
        <TextChart />
      </div>
    </div>
  );
};

export default Statistical;
