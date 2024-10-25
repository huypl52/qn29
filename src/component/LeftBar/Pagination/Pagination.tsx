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


  const renderPages = () => {
    const pages = [];
    const range = 1; // Số trang liền kề mỗi bên

    for (let i = 1; i <= totalPages; i++) {
      // Luôn hiển thị trang đầu, trang cuối, và các trang gần `currentPage`
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - range && i <= currentPage + range)
      ) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-3 py-2 rounded-md ${
              currentPage === i ? 'bg-blue-500 text-white' : 'hover:bg-gray-400'
            }`}
          >
            {i}
          </button>
        );
      } else if (
        (i === currentPage - range - 1 && i > 1) ||
        (i === currentPage + range + 1 && i < totalPages)
      ) {
        pages.push(
          <button key={`ellipsis-${i}`} className="px-2 py-0 align-text-bottom">
            ...
          </button>
        );
      }
    }
    return pages;
  };

  return (
    <div className="flex justify-center w-full items-bottom">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-md hover:bg-gray-400 disabled:opacity-50"
      >
        &lt;
      </button>
      {renderPages()}
      {/* {getPageNumbers().map((page) => ( */}
      {/*   <button */}
      {/*     key={page} */}
      {/*     onClick={() => handlePageChange(page)} */}
      {/*     className={`px-3 py-2 rounded-md ${ */}
      {/*       currentPage === page */}
      {/*         ? 'bg-blue-500 text-white' */}
      {/*         : ' hover:bg-gray-400' */}
      {/*     }`} */}
      {/*   > */}
      {/*     {page} */}
      {/*   </button> */}
      {/* ))} */}
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

