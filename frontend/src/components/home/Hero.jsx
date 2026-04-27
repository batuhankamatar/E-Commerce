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
    <section className="w-full lg:min-w-[1440px] mx-auto h-[640px] border border-gray-100 rounded-[5px] overflow-hidden relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="h-full w-full hero-swiper"
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
                  className="w-full h-full flex flex-col items-center justify-end pb-[100px] lg:pb-[140px] bg-cover bg-center transition-all duration-500"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url("${imgUrl}")`,
                  }}
                >
                  <div className="w-full max-w-[699px] flex flex-col items-center gap-[30px] px-4">
                    <div className="flex flex-col gap-[30px] items-center text-center">
                      <h1 className="font-['Montserrat'] font-bold text-[40px] lg:text-[58px] leading-[50px] lg:leading-[80px] tracking-[0.2px] text-white uppercase drop-shadow-md">
                        {category.title} DELIVERY
                      </h1>

                      <p className="font-['Montserrat'] font-normal text-[16px] lg:text-[20px] leading-[24px] lg:leading-[30px] tracking-[0.2px] text-white max-w-[550px]">
                        We know how large objects will act, but things on a
                        small scale just do not act that way.
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        navigate(`/shop/${category.code.toLowerCase()}`)
                      }
                      className="w-[180px] h-[62px] bg-[#23A6F0] rounded-[5px] flex items-center justify-center hover:bg-[#1a7bb3] transition-all shadow-lg active:scale-95"
                    >
                      <span className="font-['Montserrat'] font-bold text-[24px] leading-[32px] tracking-[0.1px] text-white">
                        Start Now
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
              <span className="text-[#737373] font-bold">Loading...</span>
            </div>
          </SwiperSlide>
        )}
      </Swiper>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .hero-swiper .swiper-button-next, .hero-swiper .swiper-button-prev {
          color: white !important;
          transform: scale(0.7);
        }
        .hero-swiper .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.5;
          width: 40px;
          border-radius: 2px;
          height: 4px;
        }
        .hero-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          background: white !important;
        }
      `,
        }}
      />
    </section>
  );
};

export default Hero;
