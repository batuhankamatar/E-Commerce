import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i);

  return (
    <div className="flex items-center justify-center">
      <div className="flex border border-[#ECECEC] rounded-[6.73px] overflow-hidden">
        <button
          onClick={() => onPageChange(0)}
          disabled={currentPage === 0}
          className="h-[74px] px-6 font-bold text-[14px] leading-6 tracking-[0.2px] text-[#BDBDBD] border-r border-[#ECECEC] hover:bg-gray-50 disabled:opacity-50 transition-colors"
        >
          First
        </button>
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`h-[74px] px-5 font-bold text-[14px] leading-6 tracking-[0.2px] border-r border-[#ECECEC] transition-colors
              ${currentPage === p ? "bg-[#23A6F0] text-white" : "bg-white text-[#23A6F0] hover:bg-gray-50"}`}
          >
            {p + 1}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
          className="h-[74px] px-6 font-bold text-[14px] leading-6 tracking-[0.2px] text-[#23A6F0] hover:bg-gray-50 disabled:opacity-50 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
