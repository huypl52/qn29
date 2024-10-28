import React, { useEffect, useState } from 'react';
import OCRChart from '~/page/Statistical/OCRChart..tsx';
import TextChart from '~/page/Statistical/TextChart.tsx';


// Register chart.js modules

const Statistical: React.FC = () => {
  return (
    <div className="flex">
      {/* <TreeView /> */}
      <OCRChart/>
      <TextChart/>
    </div>
  );
};

export default Statistical;

