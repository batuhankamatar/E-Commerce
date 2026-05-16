import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductCard from "../components/shop/ProductCard";
import { Heart, ChevronRight } from "lucide-react";

const FavoritesPage = () => {
  const favoriteItems =
    useSelector((state) => state.favorites?.favorites) || [];

  return (
    <div className="w-full bg-white font-['Montserrat'] min-h-[600px] pb-20">
      <div className="w-full bg-[#FAFAFA] py-6">
        <div className="w-full max-w-[1050px] mx-auto px-4 flex items-center gap-[15px] py-[10px]">
          <Link to="/" className="font-bold text-[14px] text-[#252B42]">
            Home
          </Link>
          <ChevronRight size={14} className="text-[#BDBDBD]" />
          <span className="font-bold text-[14px] text-[#BDBDBD]">
            Favorites
          </span>
        </div>
      </div>

      <div className="w-full max-w-[1050px] mx-auto px-4 mt-10">
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-8">
          <Heart size={24} className="text-red-500 fill-red-500" />
          <h2 className="font-bold text-[24px] text-[#252B42]">
            Favori Ürünlerim ({favoriteItems.length})
          </h2>
        </div>

        {favoriteItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
              <Heart size={32} />
            </div>
            <p className="text-[#737373] font-medium text-sm">
              Henüz favori ürününüz bulunmamaktadır.
            </p>
            <Link
              to="/shop"
              className="mt-2 px-6 py-3 bg-[#23A6F0] hover:bg-[#1a7bb3] text-white font-bold text-sm rounded-[5px] no-underline shadow-md transition-all active:scale-95"
            >
              Alışverişe Başla
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[30px]">
            {favoriteItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
