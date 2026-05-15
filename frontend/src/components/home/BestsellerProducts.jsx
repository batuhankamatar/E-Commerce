import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../store/actions/productActions";
import ProductCard from "../shop/ProductCard";

const BestsellerProducts = () => {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.product.categories) || [];
  const productList = useSelector((state) => state.product.productList) || [];

  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [activeGender, setActiveGender] = useState("MALE");

  useEffect(() => {
    if (categories.length > 0) {
      const activeCategoryId = categories[activeCategoryIndex]?.id;
      if (!activeCategoryId) return;

      dispatch(
        fetchProducts({
          category: activeCategoryId,
          sort: "rating_desc",
          limit: 6,
          offset: 0,
        }),
      );
    }
  }, [activeCategoryIndex, categories, dispatch]);

  const activeCategory = categories[activeCategoryIndex];

  const filteredProducts = productList
    .filter((item) => {
      const gender = item.gender ? item.gender.toUpperCase() : "UNISEX";
      if (activeGender === "MALE")
        return gender === "MALE" || gender === "UNISEX";
      if (activeGender === "FEMALE")
        return gender === "FEMALE" || gender === "UNISEX";
      if (activeGender === "ACCESSORY")
        return gender === "ACCESSORY" || item.category_id === 1;
      return true;
    })
    .slice(0, 6);

  const getCategoryImageUrl = (img) => {
    if (!img) return "https://via.placeholder.com/400x800?text=No+Image";
    return img.startsWith("http")
      ? img
      : new URL(`../../assets/categories/${img}`, import.meta.url).href;
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

  if (categories.length === 0 || !activeCategory) return null;

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
          <div className="absolute top-0 left-0 right-0 flex flex-col gap-[5px] pt-12 pl-12 pr-6 text-white font-bold">
            <span className="text-[14px] uppercase">
              {activeCategory.title}
            </span>
            <span className="text-[14px]">{filteredProducts.length} Items</span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 pt-20 pb-20 px-4">
          <span className="font-bold text-[24px] text-[#252B42] text-center">
            BESTSELLER PRODUCTS
          </span>

          <div className="flex flex-col items-center gap-6 py-6 w-full">
            <div className="flex items-center">
              {[
                { id: "MALE", label: "Men" },
                { id: "FEMALE", label: "Women" },
                { id: "ACCESSORY", label: "Accessories" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActiveGender(f.id)}
                  className={`w-[95px] h-[44px] font-bold text-[14px] rounded-[37px] transition-colors ${activeGender === f.id ? "text-[#23A6F0]" : "text-[#737373]"}`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="flex gap-[15px]">
              <button
                onClick={handlePrev}
                className="w-[49px] h-[49px] rounded-full border border-[#ECECEC] text-[20px] text-[#737373] hover:bg-[#23A6F0] hover:text-white transition-all"
              >
                ‹
              </button>
              <button
                onClick={handleNext}
                className="w-[49px] h-[49px] rounded-full border border-[#ECECEC] text-[20px] text-[#737373] hover:bg-[#23A6F0] hover:text-white transition-all"
              >
                ›
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-[30px] w-full px-4">
            {filteredProducts.map((item) => (
              <div key={item.id} className="w-full max-w-[348px] mx-auto">
                <ProductCard product={item} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="hidden lg:block py-12">
        <div className="w-[1077px] mx-auto flex items-start gap-[30px]">
          <div className="relative flex-shrink-0 w-[389px] h-[796px] overflow-hidden rounded-md border border-[#ECECEC]">
            <img
              src={getCategoryImageUrl(activeCategory.img)}
              alt={activeCategory.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 right-0 flex flex-col gap-[5px] pt-6 pl-12 text-white font-bold">
              <span className="uppercase">{activeCategory.title}</span>
              <span>{filteredProducts.length} Items</span>
            </div>
          </div>

          <div className="w-[658px] flex flex-col gap-[10px]">
            <div className="flex items-center justify-between h-[50px]">
              <span className="font-bold text-[16px] text-[#252B42]">
                BESTSELLER PRODUCTS
              </span>
              <div className="flex items-center gap-[15px]">
                <div className="flex items-center">
                  {[
                    { id: "MALE", label: "Men" },
                    { id: "FEMALE", label: "Women" },
                    { id: "ACCESSORY", label: "Accessories" },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setActiveGender(f.id)}
                      className={`px-[20px] py-[10px] font-bold text-[14px] rounded-[37px] transition-colors ${activeGender === f.id ? "text-[#23A6F0]" : "text-[#737373]"}`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-[15px]">
                  <button
                    onClick={handlePrev}
                    className="w-[49px] h-[49px] rounded-full border border-[#ECECEC] text-[20px] text-[#737373] hover:bg-[#23A6F0] hover:text-white transition-all"
                  >
                    ‹
                  </button>
                  <button
                    onClick={handleNext}
                    className="w-[49px] h-[49px] rounded-full border border-[#ECECEC] text-[20px] text-[#737373] hover:bg-[#23A6F0] hover:text-white transition-all"
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>

            <div className="h-[2px] w-full bg-[#ECECEC]" />

            <div className="grid grid-cols-3 gap-x-[30px] gap-y-[30px] mt-[22px]">
              {filteredProducts.map((item) => (
                <div key={item.id} className="w-[183px]">
                  <ProductCard product={item} />
                </div>
              ))}
              {filteredProducts.length === 0 && (
                <div className="col-span-3 text-center py-20 text-gray-400 italic">
                  No items found in this category.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestsellerProducts;
