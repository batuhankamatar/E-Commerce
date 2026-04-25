import React from "react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Hero = () => {
  const navigate = useNavigate();
  const categories = useSelector((state) => state.product.categories) || [];

  return (
    <section className="w-full max-w-[1440px] mx-auto h-[640px] mt-[91px] border border-gray-100 rounded-[5px] overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="h-full w-full"
      >
        {categories.length > 0 ? (
          categories.map((category) => {
            const imgUrl = category.img
              ? category.img.startsWith("http")
                ? category.img
                : new URL(
                    `../../assets/categories/${category.img}`,
                    import.meta.url,
                  ).href
              : new URL(`../../assets/categories/default.jpg`, import.meta.url)
                  .href;

            return (
              <SwiperSlide key={category.id}>
                <div
                  className="w-full h-full flex items-center justify-center bg-cover bg-center transition-all duration-500"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url("${imgUrl}")`,
                  }}
                >
                  <div className="w-full max-w-[701px] h-full flex flex-col items-center justify-center gap-10 lg:gap-[80px] px-4">
                    <div className="flex flex-col gap-4 lg:gap-[30px] items-center text-center">
                      <h1 className="font-['Montserrat'] font-bold text-[40px] lg:text-[58px] leading-[50px] lg:leading-[80px] tracking-[0.2px] text-white uppercase">
                        {category.title}
                      </h1>

                      <p className="font-['Montserrat'] font-normal text-[16px] lg:text-[20px] leading-[24px] lg:leading-[30px] tracking-[0.2px] text-white max-w-[550px]">
                        We provide the best quality products for your{" "}
                        {category.title.toLowerCase()} needs.
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        navigate(`/shop/${category.code.toLowerCase()}`)
                      }
                      className="w-[204px] h-[62px] bg-[#23A6F0] rounded-[5px] flex items-center justify-center py-[15px] px-[40px] hover:bg-[#1a7bb3] transition-all group"
                    >
                      <span className="font-['Montserrat'] font-bold text-[24px] leading-[32px] tracking-[0.1px] text-white">
                        SHOP NOW
                      </span>
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            );
          })
        ) : (
          <SwiperSlide>
            <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
              <span className="text-[#737373] font-bold">
                Loading Categories...
              </span>
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </section>
  );
};

export default Hero;
