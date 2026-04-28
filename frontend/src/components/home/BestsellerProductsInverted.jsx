import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const BestsellerProductsInverted = () => {
  const [categories, setCategories] = useState([]);
  const [bestsellers, setBestsellers] = useState([]);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [activeGender, setActiveGender] = useState("MALE");
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
      const activeCategoryId = categories[activeCategoryIndex].id;
      const fetchBestsellers = async () => {
        try {
          const res = await axiosInstance.get(
            `/products/category/${activeCategoryId}/bestsellers`,
          );
          setBestsellers(res.data);
        } catch (err) {
          console.error("Bestseller çekme hatası:", err);
        }
      };
      fetchBestsellers();
    }
  }, [activeCategoryIndex, categories]);

  const activeCategory = categories[activeCategoryIndex];

  const filteredProducts = bestsellers.filter((item) => {
    const gender = item.gender ? item.gender.toUpperCase() : "UNISEX";
    if (activeGender === "MALE")
      return gender === "MALE" || gender === "UNISEX";
    if (activeGender === "FEMALE")
      return gender === "FEMALE" || gender === "UNISEX";
    if (activeGender === "ACCESSORY") return gender === "ACCESSORY";
    return false;
  });

  const getCategoryImageUrl = (img) => {
    if (!img)
      return new URL(`../../assets/categories/default.jpg`, import.meta.url)
        .href;
    return img.startsWith("http")
      ? img
      : new URL(`../../assets/categories/${img}`, import.meta.url).href;
  };

  const getProductImageUrl = (mainImage) => {
    if (!mainImage) return null;
    return mainImage.startsWith("http")
      ? mainImage
      : new URL(`/src/assets/products/${mainImage}`, import.meta.url).href;
  };

  const handlePrev = () => {
    setActiveCategoryIndex((prev) =>
      prev === 0 ? categories.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setActiveCategoryIndex((prev) =>
      prev === categories.length - 1 ? 0 : prev + 1,
    );
  };

  if (!activeCategory) return null;

  return (
    <section className="bg-white font-['Montserrat']">
      <div className="flex flex-col lg:hidden w-full">
        <div className="relative w-full h-[760px] overflow-hidden">
          <img
            src={getCategoryImageUrl(activeCategory.img)}
            alt={activeCategory.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent" />
          <div className="absolute top-0 left-0 right-0 flex flex-col gap-[5px] pt-12 pl-12 pr-6">
            <span className="font-bold text-[14px] leading-6 tracking-[0.2px] text-white">
              {activeCategory.title}
            </span>
            <span className="font-bold text-[14px] leading-6 tracking-[0.2px] text-white">
              {filteredProducts.length} Items
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 pt-20 pb-20 px-4">
          <span className="font-bold text-[24px] leading-8 tracking-[0.1px] text-[#252B42] text-center w-full">
            BESTSELLER PRODUCTS
          </span>
          <div className="flex flex-col items-center gap-6 py-6 w-full">
            <div className="flex items-center justify-center">
              {[
                { id: "MALE", label: "Men" },
                { id: "FEMALE", label: "Women" },
                { id: "ACCESSORY", label: "Accessories" },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveGender(filter.id)}
                  className={`w-[95px] h-[44px] font-bold text-[14px] transition-colors rounded-[37px] ${activeGender === filter.id ? "text-[#23A6F0]" : "text-[#737373] hover:text-[#23A6F0]"}`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            <div className="flex items-center justify-center gap-[15px]">
              <button
                onClick={handlePrev}
                className="w-[49px] h-[49px] rounded-full border border-[#ECECEC] flex items-center justify-center text-[20px]"
              >
                ‹
              </button>
              <button
                onClick={handleNext}
                className="w-[49px] h-[49px] rounded-full border border-[#ECECEC] flex items-center justify-center text-[20px]"
              >
                ›
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-[30px] py-2 items-center w-full">
            {filteredProducts.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/product/${item.id}`)}
                className="w-[348px] h-[589px] flex flex-col overflow-hidden cursor-pointer group hover:shadow-lg transition-all"
              >
                <div className="w-full h-[427px] overflow-hidden">
                  <img
                    src={getProductImageUrl(item.mainImage)}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </div>
                <div className="flex flex-col items-center justify-center flex-1 px-6 gap-[10px]">
                  <span className="font-bold text-[16px] text-[#252B42] text-center truncate w-full">
                    {item.name}
                  </span>
                  <div className="flex items-center gap-[5px]">
                    <span className="font-bold text-[#BDBDBD] line-through">
                      ${item.price}
                    </span>
                    <span className="font-bold text-[#23856D]">
                      ${item.discountPrice}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="hidden lg:block py-12">
        <div className="w-[1077px] mx-auto flex flex-row-reverse items-start gap-[30px]">
          <div className="relative flex-shrink-0 w-[389px] h-[796px] overflow-hidden rounded-md border border-[#ECECEC]">
            <img
              src={getCategoryImageUrl(activeCategory.img)}
              alt={activeCategory.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent" />
            <div className="absolute top-0 left-0 right-0 flex flex-col gap-[5px] pt-6 pl-12 text-white">
              <span className="font-bold text-[14px]">
                {activeCategory.title}
              </span>
              <span className="font-bold text-[14px]">
                {filteredProducts.length} Items
              </span>
            </div>
          </div>

          <div className="w-[658px] flex flex-col gap-[10px]">
            <div className="flex items-center justify-between h-[50px]">
              <span className="font-bold text-[16px] text-[#252B42]">
                Bestseller Products
              </span>
              <div className="flex items-center gap-[15px]">
                <div className="flex items-center">
                  {[
                    { id: "MALE", label: "Men" },
                    { id: "FEMALE", label: "Women" },
                    { id: "ACCESSORY", label: "Accessories" },
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setActiveGender(filter.id)}
                      className={`px-[20px] py-[10px] font-bold text-[14px] transition-colors rounded-[37px] ${activeGender === filter.id ? "text-[#23A6F0]" : "text-[#737373] hover:text-[#23A6F0]"}`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-[15px]">
                  <button
                    onClick={handlePrev}
                    className="w-[49px] h-[49px] rounded-full border border-[#ECECEC] flex items-center justify-center text-[20px] text-[#737373] hover:bg-[#23A6F0] hover:text-white transition-all"
                  >
                    ‹
                  </button>
                  <button
                    onClick={handleNext}
                    className="w-[49px] h-[49px] rounded-full border border-[#ECECEC] flex items-center justify-center text-[20px] text-[#737373] hover:bg-[#23A6F0] hover:text-white transition-all"
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>

            <div className="h-[2px] w-full bg-[#ECECEC]" />

            <div className="grid grid-cols-3 gap-x-[30px] gap-y-[15px] mt-[22px]">
              {filteredProducts.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/product/${item.id}`)}
                  className="w-[183px] h-[324px] flex flex-col overflow-hidden cursor-pointer group hover:shadow-lg transition-all"
                >
                  <div className="w-full h-[220px] overflow-hidden">
                    <img
                      src={getProductImageUrl(item.mainImage)}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      style={{ mixBlendMode: "multiply" }}
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center flex-1 p-4 gap-[10px]">
                    <span className="font-bold text-[14px] text-[#252B42] text-center truncate w-full">
                      {item.name}
                    </span>
                    <div className="flex items-center gap-[5px]">
                      <span className="font-bold text-[14px] text-[#BDBDBD] line-through">
                        ${item.price}
                      </span>
                      <span className="font-bold text-[14px] text-[#23856D]">
                        ${item.discountPrice}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {filteredProducts.length === 0 && (
                <div className="col-span-3 text-center py-20 text-gray-400">
                  No item to display.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestsellerProductsInverted;
