import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CategoryBanner = () => {
  const navigate = useNavigate();
  const categories = useSelector((state) => state.product.categories) || [];

  const topCategories = [...categories]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  const getImgUrl = (img) => {
    if (!img) return "https://via.placeholder.com/200x220?text=No+Category";
    if (img.startsWith("http")) return img;
    try {
      return new URL(`/src/assets/categories/${img}`, import.meta.url).href;
    } catch (e) {
      return "https://via.placeholder.com/200x220?text=Error+Loading";
    }
  };

  const handleCategoryClick = (cat) => {
    const gender = cat.gender === "k" ? "kadin" : "erkek";
    const categoryName = cat.title.toLowerCase();

    navigate(`/shop/${gender}/${categoryName}/${cat.id}`);
  };

  return (
    <div className="w-full flex justify-center py-8">
      <div className="flex flex-col lg:flex-row gap-[15px] flex-wrap justify-center">
        {topCategories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => handleCategoryClick(cat)}
            className="relative w-full lg:w-[205px] h-[223px] overflow-hidden cursor-pointer group rounded-md shadow-sm"
          >
            <img
              src={getImgUrl(cat.img)}
              alt={cat.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />

            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
              <span className="font-bold text-[16px] leading-6 tracking-[0.1px] text-white text-center drop-shadow-md">
                {cat.title}
              </span>
              <span className="font-normal text-[14px] leading-5 tracking-[0.2px] text-white text-center opacity-90">
                Rating: {cat.rating}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryBanner;
