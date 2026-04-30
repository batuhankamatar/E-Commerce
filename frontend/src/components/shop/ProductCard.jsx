import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const getImageUrl = (mainImage) => {
    if (!mainImage) return null;
    if (mainImage.startsWith("http")) return mainImage;
    return new URL(`/src/assets/products/${mainImage}`, import.meta.url).href;
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="w-full flex flex-col border border-[#ECECEC] overflow-hidden cursor-pointer group hover:shadow-lg transition-shadow duration-300"
    >
      <div className="w-full h-[300px] overflow-hidden flex-shrink-0">
        <img
          src={getImageUrl(product.mainImage)}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="flex flex-col gap-[10px] pt-[25px] pr-[25px] pb-[35px] pl-[25px]">
        <h3 className="font-bold text-[16px] leading-6 tracking-[0.1px] text-[#252B42] truncate">
          {product.name}
        </h3>
        <span className="font-bold text-[14px] leading-6 tracking-[0.2px] text-[#737373]">
          {product.categoryName}
        </span>
        <div className="flex items-center gap-[5px]">
          <span className="font-bold text-[16px] leading-6 text-[#BDBDBD] line-through">
            ${product.price}
          </span>
          {product.discountPrice && (
            <span className="font-bold text-[16px] leading-6 text-[#23856D]">
              ${product.discountPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
