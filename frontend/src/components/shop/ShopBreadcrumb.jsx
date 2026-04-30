import React from "react";
import { Link } from "react-router-dom";

const ShopBreadcrumb = () => (
  <div className="w-full bg-[#FAFAFA] py-6">
    <div className="w-full max-w-[1049px] mx-auto px-4 lg:px-0 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <h1 className="font-bold text-[24px] leading-8 tracking-[0.1px] text-[#252B42] text-center lg:text-left">
        Shop
      </h1>
      <div className="flex items-center justify-center lg:justify-start gap-[15px] py-[10px]">
        <Link
          to="/"
          className="font-bold text-[14px] leading-6 tracking-[0.2px] text-[#252B42] hover:text-[#23A6F0] transition-colors"
        >
          Home
        </Link>
        <span className="text-[#BDBDBD] text-[12px]">›</span>
        <span className="font-bold text-[14px] leading-6 tracking-[0.2px] text-[#BDBDBD]">
          Shop
        </span>
      </div>
    </div>
  </div>
);

export default ShopBreadcrumb;
