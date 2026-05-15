import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    const gender = product.gender
      ? product.gender === "k"
        ? "kadin"
        : "erkek"
      : "unisex";

    const categoryName = (product.categoryName || "product")
      .toLowerCase()
      .trim()
      .replaceAll(" ", "-")
      .replaceAll("/", "-");

    const categoryId = product.category_id || product.categoryId || 0;
    const nameSlug = product.name
      .toLowerCase()
      .trim()
      .replaceAll(" ", "-")
      .replaceAll("/", "-")
      .replace(/[^a-z0-9-]/g, "");

    navigate(
      `/shop/${gender}/${categoryName}/${categoryId}/${nameSlug}/${product.id}`,
    );
  };

  const getImageUrl = (p) => {
    if (p.images && p.images.length > 0) {
      return p.images[0].url || p.images[0];
    }
    return "https://via.placeholder.com/300x400?text=No+Image";
  };

  return (
    <div
      onClick={handleCardClick}
      className="w-full flex flex-col border border-[#ECECEC] overflow-hidden cursor-pointer group hover:shadow-lg transition-all duration-300 bg-white h-full"
    >
      <div className="w-full h-[300px] overflow-hidden flex-shrink-0 bg-[#F3F3F3]">
        <img
          src={getImageUrl(product)}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/300x400?text=Image+Error";
          }}
        />
      </div>

      <div className="flex flex-col gap-[10px] pt-[25px] pr-[25px] pb-[35px] pl-[25px] text-center flex-grow">
        <h3 className="font-bold text-[16px] text-[#252B42] truncate uppercase">
          {product.name}
        </h3>
        <p className="font-bold text-[14px] text-[#737373] line-clamp-1">
          {product.description}
        </p>
        <div className="flex items-center justify-center gap-[5px] mt-auto">
          <span className="font-bold text-[16px] text-[#BDBDBD] line-through">
            ${(product.price * 1.2).toFixed(2)}
          </span>
          <span className="font-bold text-[16px] text-[#23856D]">
            ${product.price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
