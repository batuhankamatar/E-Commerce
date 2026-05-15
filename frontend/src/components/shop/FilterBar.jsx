import React, { useState } from "react";
import { LayoutGrid, List } from "lucide-react";

const SORT_OPTIONS = [
  { value: "popularity", label: "Popularity" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating", label: "Rating" },
  { value: "newest", label: "Newest" },
];

const FilterBar = ({ totalCount, view, setView, sort, setSort, onFilter }) => {
  const [filterInput, setFilterInput] = useState("");

  return (
    <div className="w-full bg-white py-6">
      <div className="w-full max-w-[1050px] mx-auto px-4 lg:px-0 flex flex-col lg:flex-row items-center justify-between gap-4">
        <span className="font-bold text-[14px] leading-6 tracking-[0.2px] text-[#737373]">
          Showing all {totalCount} results
        </span>

        <div className="flex items-center gap-[15px]">
          <span className="font-bold text-[14px] leading-6 tracking-[0.2px] text-[#737373]">
            Views:
          </span>
          <div className="flex items-center gap-[15px]">
            <button
              onClick={() => setView("grid")}
              className={`w-[46px] h-[46px] flex items-center justify-center rounded-[5px] border transition-all
                ${view === "grid" ? "border-[#23A6F0] text-[#23A6F0]" : "border-[#ECECEC] text-[#737373]"}`}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setView("list")}
              className={`w-[46px] h-[46px] flex items-center justify-center rounded-[5px] border transition-all
                ${view === "list" ? "border-[#23A6F0] text-[#23A6F0]" : "border-[#ECECEC] text-[#737373]"}`}
            >
              <List size={16} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-[15px]">
          <input
            type="text"
            placeholder="Filter by name..."
            value={filterInput}
            onChange={(e) => setFilterInput(e.target.value)}
            className="w-[180px] h-[50px] border border-[#ECECEC] rounded px-4 font-normal text-[14px] outline-[#23A6F0]"
          />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-[141px] h-[50px] border border-[#ECECEC] rounded px-2 font-normal text-[14px] text-[#737373] outline-none cursor-pointer"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <button
            onClick={() => onFilter(filterInput)}
            className="w-[94px] h-[50px] bg-[#23A6F0] rounded-[5px] flex items-center justify-center font-bold text-[14px] text-white hover:bg-[#1a7bb3] transition-colors"
          >
            Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
