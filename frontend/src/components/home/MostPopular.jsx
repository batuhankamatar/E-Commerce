import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const FEATURES = [
  {
    number: "1.",
    title: "Fast Delivery",
    description:
      "We deliver to your door within 24 hours, anywhere in the city.",
  },
  {
    number: "2.",
    title: "Easy Returns",
    description: "Not satisfied? Return within 30 days, no questions asked.",
  },
  {
    number: "3.",
    title: "Secure Payment",
    description: "Your payment information is always safe and encrypted.",
  },
  {
    number: "4.",
    title: "24/7 Support",
    description: "Our support team is always here to help you anytime.",
  },
];

const MostPopular = () => {
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMostPopular = async () => {
      try {
        const res = await axiosInstance.get("/products/most-popular");
        setProduct(res.data);
      } catch (err) {
        console.error("Most popular ürün çekilemedi:", err);
      }
    };
    fetchMostPopular();
  }, []);

  const getProductImageUrl = (mainImage) => {
    if (!mainImage) return null;
    return mainImage.startsWith("http")
      ? mainImage
      : new URL(`/src/assets/products/${mainImage}`, import.meta.url).href;
  };

  const heroImageUrl = new URL("../../assets/most-popular.jpg", import.meta.url)
    .href;

  return (
    <section className="bg-white font-['Montserrat']">
      <div className="flex flex-col lg:hidden w-full">
        <div className="w-full h-[505px] overflow-hidden">
          <img
            src={heroImageUrl}
            alt="Most Popular"
            className="w-full h-full object-cover"
          />
        </div>

        <div
          className="flex flex-col items-center pt-12 pb-12 gap-6 w-full"
          style={{ backgroundColor: "#FAFAFA" }}
        >
          <div className="flex flex-col items-center gap-[19px] w-[348px]">
            <span className="font-bold text-[24px] leading-8 tracking-[0.1px] text-[#252B42] text-center">
              MOST POPULAR
            </span>
            <p className="font-normal text-[14px] leading-5 tracking-[0.2px] text-[#737373] text-center w-[280px]">
              We focus on ergonomics and meeting you where you work. It's only a
              keystroke away.
            </p>

            {product && (
              <div
                onClick={() => navigate(`/product/${product.id}`)}
                className="flex flex-col items-center bg-white border border-[#ECECEC] w-full cursor-pointer group hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-full h-[294px] overflow-hidden">
                  <img
                    src={getProductImageUrl(product.mainImage)}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </div>
                <div className="flex flex-col items-center gap-[10px] py-6 px-4">
                  <span className="font-bold text-[16px] leading-6 tracking-[0.1px] text-[#252B42] text-center">
                    {product.name}
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
            )}
          </div>
        </div>

        <div className="flex flex-col w-full">
          {FEATURES.map((feature) => (
            <div
              key={feature.number}
              className="flex items-start gap-5 p-[25px] w-[349px] mx-auto"
              style={{ minHeight: "111px" }}
            >
              <span className="font-bold text-[40px] leading-[50px] tracking-[0.2px] text-[#E74040] flex-shrink-0">
                {feature.number}
              </span>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-[14px] leading-6 tracking-[0.2px] text-[#252B42]">
                  {feature.title}
                </span>
                <span className="font-normal text-[12px] leading-4 tracking-[0.2px] text-[#737373]">
                  {feature.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="hidden lg:flex flex-col pt-12 pb-12 gap-[30px]">
        <div className="flex items-center justify-center gap-0 w-full">
          <div className="w-[674px] h-[649px] flex-shrink-0 overflow-hidden">
            <img
              src={heroImageUrl}
              alt="Most Popular"
              className="w-full h-full object-cover"
            />
          </div>

          <div
            className="w-[401px] h-[649px] flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: "#FAFAFA" }}
          >
            <div className="flex flex-col items-center gap-[19px] w-[348px]">
              <span className="font-bold text-[24px] leading-8 tracking-[0.1px] text-[#252B42] text-center">
                MOST POPULAR
              </span>
              <p className="font-normal text-[14px] leading-5 tracking-[0.2px] text-[#737373] text-center w-[280px]">
                We focus on ergonomics and meeting you where you work. It's only
                a keystroke away.
              </p>

              {product && (
                <div
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="flex flex-col items-center bg-white border border-[#ECECEC] w-full cursor-pointer group hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-full h-[240px] overflow-hidden">
                    <img
                      src={getProductImageUrl(product.mainImage)}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      style={{ mixBlendMode: "multiply" }}
                    />
                  </div>
                  <div className="flex flex-col items-center gap-[10px] py-6 px-4">
                    <span className="font-bold text-[16px] leading-6 tracking-[0.1px] text-[#252B42] text-center">
                      {product.name}
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
              )}
            </div>
          </div>
        </div>

        <div className="w-[1066px] mx-auto grid grid-cols-4 gap-0">
          {FEATURES.map((feature) => (
            <div
              key={feature.number}
              className="flex items-start gap-5"
              style={{ minHeight: "111px" }}
            >
              <span className="font-bold text-[40px] leading-[50px] tracking-[0.2px] text-[#E74040] flex-shrink-0">
                {feature.number}
              </span>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-[14px] leading-6 tracking-[0.2px] text-[#252B42]">
                  {feature.title}
                </span>
                <span className="font-normal text-[12px] leading-4 tracking-[0.2px] text-[#737373]">
                  {feature.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MostPopular;
