import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../../store/actions/shoppingCartActions";
import { toggleProductFavorite } from "../../store/actions/favoritesActions";
import StarRating from "./StarRating";
import { Heart, ShoppingCart, Eye } from "lucide-react";

const ProductInfo = ({ product }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.client.user);
  const favorites = useSelector((state) => state.favorites?.favorites) || [];
  const isFavorite = product
    ? favorites.some((item) => item.id === product.id)
    : false;

  const handleAddToCart = () => {
    if (product) {
      dispatch(addProductToCart(product, 1, user?.id));
    }
  };

  const handleToggleFavorite = () => {
    if (product) {
      dispatch(toggleProductFavorite(product));
    }
  };

  return (
    <div className="flex flex-col gap-4 flex-1 font-['Montserrat'] px-4 lg:px-0">
      <h2 className="font-medium text-[20px] leading-[30px] tracking-[0.2px] text-[#252B42] uppercase">
        {product?.name}
      </h2>

      <div className="flex items-center gap-[10px]">
        <StarRating rating={product?.rating || 0} />
        <span className="font-bold text-[14px] leading-6 tracking-[0.2px] text-[#737373]">
          {product?.reviewCount || 0} Reviews
        </span>
      </div>

      <div className="flex flex-col gap-[5px] mt-2">
        <span className="font-bold text-[24px] leading-8 tracking-[0.1px] text-[#252B42]">
          ${product?.price?.toFixed(2)}
        </span>
        <div className="flex items-center gap-[5px]">
          <span className="font-bold text-[14px] leading-6 tracking-[0.2px] text-[#737373]">
            Availability :
          </span>
          <span
            className={`font-bold text-[14px] leading-6 tracking-[0.2px] ${product?.stock > 0 ? "text-[#23A6F0]" : "text-red-500"}`}
          >
            {product?.stock > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </div>

      <p className="font-normal text-[14px] leading-5 tracking-[0.2px] text-[#858585] max-w-[464px] border-b border-[#E8E8E8] pb-4">
        {product?.description || "No description available for this product."}
      </p>

      <div className="flex items-center gap-[10px] py-2">
        <div className="w-[30px] h-[30px] rounded-full bg-[#23A6F0] cursor-pointer ring-2 ring-offset-2 ring-[#23A6F0]"></div>
        <div className="w-[30px] h-[30px] rounded-full bg-[#2DC071] cursor-pointer"></div>
        <div className="w-[30px] h-[30px] rounded-full bg-[#E77C40] cursor-pointer"></div>
        <div className="w-[30px] h-[30px] rounded-full bg-[#252B42] cursor-pointer"></div>
      </div>

      <div className="flex items-center gap-3 mt-4">
        <button
          onClick={handleAddToCart}
          disabled={product?.stock <= 0}
          className="px-8 h-12 bg-[#23A6F0] hover:bg-[#1a7bb3] disabled:bg-gray-400 text-white font-bold text-[14px] rounded-[5px] transition-all shadow-md active:scale-95 border-none cursor-pointer uppercase"
        >
          Add to Cart
        </button>

        <button
          onClick={handleToggleFavorite}
          className={`w-12 h-12 rounded-full border border-[#E8E8E8] flex items-center justify-center transition-colors cursor-pointer
            ${isFavorite ? "bg-red-50 border-red-200 text-red-500" : "bg-white text-[#252B42] hover:bg-gray-50"}`}
        >
          <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
        </button>

        <button
          onClick={handleAddToCart}
          disabled={product?.stock <= 0}
          className="w-12 h-12 rounded-full border border-[#E8E8E8] bg-white flex items-center justify-center text-[#252B42] hover:text-[#23A6F0] hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <ShoppingCart size={20} />
        </button>

        <button className="w-12 h-12 rounded-full border border-[#E8E8E8] bg-white flex items-center justify-center text-[#252B42] hover:bg-gray-50 transition-colors cursor-pointer">
          <Eye size={20} />
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
