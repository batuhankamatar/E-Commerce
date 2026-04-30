import React from "react";
import { useNavigate } from "react-router-dom";

const ProductListItem = ({ product }) => {
  const navigate = useNavigate();

  const getImageUrl = (mainImage) => {
    if (!mainImage) return null;
    if (mainImage.startsWith("http")) return mainImage;
    return new URL(`/src/assets/products/${mainImage}`, import.meta.url).href;
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="w-full flex items-center gap-6 border border-[#ECECEC] p-4 cursor-pointer group hover:shadow-lg transition-shadow duration-300"
    >
      <div className="w-[120px] h-[120px] flex-shrink-0 overflow-hidden">
        <img
          src={getImageUrl(product.mainImage)}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="flex flex-col gap-2 flex-1">
        <h3 className="font-bold text-[16px] leading-6 text-[#252B42]">
          {product.name}
        </h3>
        <span className="font-bold text-[14px] text-[#737373]">
          {product.categoryName}
        </span>
        <p className="font-normal text-[14px] text-[#737373] line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center gap-[5px]">
          <span className="font-bold text-[16px] text-[#BDBDBD] line-through">
            ${product.price}
          </span>
          {product.discountPrice && (
            <span className="font-bold text-[16px] text-[#23856D]">
              ${product.discountPrice}
            </span>
          )}
        </div>
      </div>
      <button className="flex-shrink-0 px-6 py-3 bg-[#23A6F0] text-white font-bold text-[14px] rounded-[5px] hover:bg-[#1a7bb3] transition-colors">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductListItem;
