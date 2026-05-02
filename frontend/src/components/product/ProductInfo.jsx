import React, { useState } from "react";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { toast } from "react-toastify";
import StarRating from "./StarRating";

const COLORS = ["#23A6F0", "#2DC071", "#E77C40", "#252B42"];

const ProductInfo = ({ product, reviewCount }) => {
  const [selectedColor, setSelectedColor] = useState(0);

  return (
    <div className="flex flex-col gap-4 w-full lg:w-[510px]">
      <h1 className="font-normal text-[20px] leading-[30px] tracking-[0.2px] text-[#252B42]">
        {product.name}
      </h1>

      <div className="flex items-center gap-[10px]">
        <StarRating rating={product.rating || 0} />
        <span className="font-normal text-[14px] leading-6 tracking-[0.2px] text-[#737373]">
          {reviewCount} Reviews
        </span>
      </div>

      <div className="flex items-center gap-[5px]">
        {product.discountPrice ? (
          <>
            <span className="font-bold text-[24px] leading-8 text-[#BDBDBD] line-through">
              ${product.price}
            </span>
            <span className="font-bold text-[24px] leading-8 text-[#23856D]">
              ${product.discountPrice}
            </span>
          </>
        ) : (
          <span className="font-bold text-[24px] leading-8 text-[#252B42]">
            ${product.price}
          </span>
        )}
      </div>

      <div className="flex items-center gap-[5px]">
        <span className="font-bold text-[14px] leading-6 text-[#252B42]">
          Availability :
        </span>
        <span
          className={`font-bold text-[14px] leading-6 ${product.stock > 0 ? "text-[#23A6F0]" : "text-[#E74040]"}`}
        >
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      <p className="font-normal text-[14px] leading-5 tracking-[0.2px] text-[#737373] border-b border-[#ECECEC] pb-6">
        {product.description}
      </p>

      <div className="flex items-center gap-[10px]">
        {COLORS.map((color, i) => (
          <button
            key={i}
            onClick={() => setSelectedColor(i)}
            style={{ backgroundColor: color }}
            className={`w-[30px] h-[30px] rounded-full transition-all
              ${selectedColor === i ? "ring-2 ring-offset-2 ring-[#23A6F0]" : ""}`}
          />
        ))}
      </div>

      <div className="flex items-center gap-[10px] mt-4">
        <button
          onClick={() => toast.info("Cart functionality coming soon!")}
          className="w-[175px] h-[44px] bg-[#23A6F0] rounded-[5px] flex items-center justify-center font-bold text-[14px] leading-6 text-white hover:bg-[#1a7bb3] transition-colors"
        >
          Select Options
        </button>
        <button className="w-[44px] h-[44px] border border-[#ECECEC] rounded-full flex items-center justify-center hover:border-[#23A6F0] transition-all">
          <Heart size={16} color="#252B42" />
        </button>
        <button className="w-[44px] h-[44px] border border-[#ECECEC] rounded-full flex items-center justify-center hover:border-[#23A6F0] transition-all">
          <ShoppingCart size={16} color="#252B42" />
        </button>
        <button className="w-[44px] h-[44px] border border-[#ECECEC] rounded-full flex items-center justify-center hover:border-[#23A6F0] transition-all">
          <Eye size={16} color="#252B42" />
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
