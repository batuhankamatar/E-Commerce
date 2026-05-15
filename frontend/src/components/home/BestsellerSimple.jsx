import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import ProductCard from "../shop/ProductCard";

const BestsellerSimple = ({ limit = 4 }) => {
  const [bestsellers, setBestsellers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axiosInstance.get(
          "/products/shop?sort=rating_desc&limit=20",
        );

        if (res.data && res.data.products) {
          const shuffled = [...res.data.products]
            .sort(() => 0.5 - Math.random())
            .slice(0, limit);
          setBestsellers(shuffled);
        }
      } catch (err) {
        console.error("Bestseller ürünler toplanamadı:", err);
      }
    };

    fetchAll();
  }, [limit]);

  return (
    <section className="w-full bg-white font-['Montserrat'] py-12">
      <div className="w-full max-w-[1050px] mx-auto px-4 lg:px-0">
        <h2 className="font-bold text-[24px] leading-[32px] tracking-[0.1px] text-[#252B42] mb-4 uppercase">
          BESTSELLER PRODUCTS
        </h2>
        <div className="w-full h-[2px] bg-[#ECECEC] mb-8" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[30px]">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {bestsellers.length === 0 && (
            <div className="col-span-full text-center py-10 text-gray-400 italic">
              No bestseller products found.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BestsellerSimple;
