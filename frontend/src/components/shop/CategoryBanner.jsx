import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const EXCLUDED = ["GROCERY"];

const CategoryBanner = () => {
  const navigate = useNavigate();
  const categories = useSelector((state) => state.product.categories).filter(
    (c) => !EXCLUDED.includes(c.code),
  );

  const getImgUrl = (img) => {
    if (!img) return null;
    if (img.startsWith("http")) return img;
    return new URL(`/src/assets/categories/${img}`, import.meta.url).href;
  };

  return (
    <div className="w-full flex justify-center py-8">
      <div className="flex flex-col lg:flex-row gap-[15px]">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => navigate(`/shop/${cat.code.toLowerCase()}`)}
            className="relative w-full lg:w-[205px] h-[223px] overflow-hidden cursor-pointer group"
          >
            <img
              src={getImgUrl(cat.img)}
              alt={cat.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
              <span className="font-bold text-[16px] leading-6 tracking-[0.1px] text-white text-center">
                {cat.title}
              </span>
              <span className="font-normal text-[14px] leading-5 tracking-[0.2px] text-white text-center">
                {cat.productCount ?? "5"} Items
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryBanner;
