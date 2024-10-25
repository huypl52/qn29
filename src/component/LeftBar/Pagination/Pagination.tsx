import React, { useState } from 'react';
import _ from 'lodash';

interface PaginationProps {
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({ totalPages, onPageChange }: PaginationProps) {
  const [currentPage, setCurrentPage] = React.useState(1);

  const handlePageChange = (page: number) => {
    let pageInRange = _.min([page, totalPages]);
    pageInRange = _.max([pageInRange, 1]);

    if (!pageInRange) {
      pageInRange = 1;
    }

    setCurrentPage(pageInRange);
    onPageChange(pageInRange);
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-md hover:bg-gray-400 disabled:opacity-50"
      >
        &lt;
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-3 py-2 rounded-md ${
            currentPage === page
              ? 'bg-blue-500 text-white'
              : ' hover:bg-gray-400'
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-md hover:bg-gray-400 disabled:opacity-50"
      >
        &gt;
      </button>
    </div>
  );
}

export default Pagination;

