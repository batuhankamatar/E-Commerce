import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const BestsellerSimple = ({ limit = 4 }) => {
  const [bestsellers, setBestsellers] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get("/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Kategoriler çekilemedi:", err));
  }, []);

  useEffect(() => {
    if (categories.length === 0) return;
    const fetchAll = async () => {
      try {
        const responses = await Promise.all(
          categories.map((cat) =>
            axiosInstance.get(`/products/category/${cat.id}/bestsellers`),
          ),
        );
        const all = responses.flatMap((res) => res.data);
        setBestsellers(all.sort(() => 0.5 - Math.random()).slice(0, limit));
      } catch (err) {
        console.error("Bestseller ürünler toplanamadı:", err);
      }
    };
    fetchAll();
  }, [categories, limit]);

  const getProductImageUrl = (mainImage) => {
    if (!mainImage) return null;
    return mainImage.startsWith("http")
      ? mainImage
      : new URL(`/src/assets/products/${mainImage}`, import.meta.url).href;
  };

  return (
    <section className="w-full bg-white font-['Montserrat'] py-12">
      <div className="w-full max-w-[1050px] mx-auto px-4 lg:px-0">
        <h2 className="font-bold text-[24px] leading-[32px] tracking-[0.1px] text-[#252B42] mb-4">
          BESTSELLER PRODUCTS
        </h2>
        <div className="w-full h-[2px] bg-[#ECECEC] mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[30px]">
          {bestsellers.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              className="flex flex-col overflow-hidden cursor-pointer group hover:shadow-lg transition-all"
            >
              <div className="w-full h-[280px] overflow-hidden flex-shrink-0">
                <img
                  src={getProductImageUrl(product.mainImage)}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  style={{ mixBlendMode: "multiply" }}
                />
              </div>
              <div className="pt-[25px] pr-[25px] pb-[35px] pl-[25px] flex flex-col items-center lg:items-start gap-[10px]">
                <span className="font-bold text-[16px] leading-6 tracking-[0.1px] text-[#252B42] text-center lg:text-left truncate w-full">
                  {product.name}
                </span>
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestsellerSimple;
