import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CategoryBanner = () => {
  const navigate = useNavigate();
  const categories = useSelector((state) => state.product.categories) || [];

  const allCategories = [...categories].sort((a, b) => b.rating - a.rating);

  const getImgUrl = (img) => {
    if (!img) return null;
    return img.startsWith("http")
      ? img
      : new URL(`../../assets/categories/${img}`, import.meta.url).href;
  };

  const handleCategoryClick = (cat) => {
    const gender =
      cat.gender === "k" || cat.gender === "WOMEN" ? "kadin" : "erkek";
    const categoryName = cat.title.toLowerCase().replaceAll(" ", "-");
    navigate(`/shop/${gender}/${categoryName}/${cat.id}`);
  };

  return (
    <div className="w-full bg-[#FAFAFA] py-8">
      <div className="max-w-[1124px] mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-[15px] justify-items-center">
          {allCategories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat)}
              className="relative w-full h-[223px] overflow-hidden cursor-pointer group rounded-md shadow-sm bg-gray-200"
            >
              <img
                src={getImgUrl(cat.img)}
                alt={cat.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />

              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 p-2 text-center">
                <span className="font-bold text-[16px] leading-6 tracking-[0.1px] text-white drop-shadow-md uppercase">
                  {cat.title}
                </span>
                <span className="font-normal text-[14px] leading-5 tracking-[0.2px] text-white opacity-90">
                  {cat.productCount} Items
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryBanner;
