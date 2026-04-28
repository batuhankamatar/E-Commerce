import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const BestsellerSimple = () => {
  const [bestsellers, setBestsellers] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const res = await axiosInstance.get("/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Kategoriler çekilemedi:", err);
      }
    };
    fetchAllCategories();
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      const fetchAllBestsellers = async () => {
        try {
          const requests = categories.map((cat) =>
            axiosInstance.get(`/products/category/${cat.id}/bestsellers`),
          );
          const responses = await Promise.all(requests);
          const allProducts = responses.flatMap((res) => res.data);
          const randomFour = allProducts
            .sort(() => 0.5 - Math.random())
            .slice(0, 4);

          setBestsellers(randomFour);
        } catch (err) {
          console.error("Bestseller ürünler toplanamadı:", err);
        }
      };
      fetchAllBestsellers();
    }
  }, [categories]);

  const getProductImageUrl = (mainImage) => {
    if (!mainImage) return null;
    return mainImage.startsWith("http")
      ? mainImage
      : new URL(`/src/assets/products/${mainImage}`, import.meta.url).href;
  };

  return (
    <section className="w-full lg:w-[1440px] lg:h-[620px] mx-auto bg-white font-['Montserrat'] flex flex-col items-center py-12 lg:py-0 lg:justify-center">
      <div className="w-[324px] lg:w-[1040px] flex flex-col items-center lg:items-start gap-4 mb-10 lg:mb-12">
        <h2 className="font-bold text-[24px] leading-[32px] tracking-[0.1px] text-[#252B42] text-center lg:text-left whitespace-nowrap">
          BESTSELLER PRODUCTS
        </h2>
        <div className="w-[331px] lg:w-[1042px] h-0 lg:h-[2px] border-b border-[#ECECEC] lg:bg-[#ECECEC]" />
      </div>

      <div className="w-[328px] lg:w-[1049px] flex flex-col lg:flex-row gap-[30px]">
        {bestsellers.map((product) => (
          <div
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            className="w-[328px] h-[589px] lg:w-[238px] lg:h-[442px] flex flex-col overflow-hidden cursor-pointer group transition-all"
          >
            <div className="w-full lg:w-[239px] h-[427px] lg:h-[280px] overflow-hidden flex-shrink-0">
              <img
                src={getProductImageUrl(product.mainImage)}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                style={{ mixBlendMode: "multiply" }}
              />
            </div>

            <div className="w-full lg:w-[239px] h-[162px] pt-[25px] pr-[25px] pb-[35px] pl-[25px] flex flex-col items-center lg:items-start gap-[10px]">
              <span className="font-bold text-[16px] leading-6 tracking-[0.1px] text-[#252B42] text-center lg:text-left truncate w-full">
                {product.name}
              </span>
              <span className="font-bold text-[14px] leading-6 tracking-[0.2px] text-[#737373]">
                English Department
              </span>
              <div className="flex items-center gap-[5px] pt-1">
                <span className="font-bold text-[16px] leading-6 text-[#BDBDBD] line-through">
                  ${product.price}
                </span>
                <span className="font-bold text-[16px] leading-6 text-[#23856D]">
                  ${product.discountPrice}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestsellerSimple;
