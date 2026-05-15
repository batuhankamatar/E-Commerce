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

const MostPopularInverted = () => {
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMostPopular = async () => {
      try {
        const res = await axiosInstance.get(
          "/products?sort=rating:desc&limit=1",
        );

        if (res.data && res.data.products && res.data.products.length > 0) {
          setProduct(res.data.products[0]);
        }
      } catch (err) {
        console.error("Most popular ürün çekilemedi:", err);
      }
    };
    fetchMostPopular();
  }, []);

  const handleProductClick = (p) => {
    if (!p) return;

    const gender = p.gender === "k" ? "kadin" : "erkek";
    const categoryName = (p.categoryName || "product")
      .toLowerCase()
      .trim()
      .replaceAll(" ", "-")
      .replaceAll("/", "-");

    const categoryId = p.category_id || p.categoryId || 0;
    const nameSlug = p.name
      .toLowerCase()
      .trim()
      .replaceAll(" ", "-")
      .replaceAll("/", "-")
      .replace(/[^a-z0-9-]/g, "");

    navigate(
      `/shop/${gender}/${categoryName}/${categoryId}/${nameSlug}/${p.id}`,
    );
  };

  const getProductImageUrl = (images) => {
    if (!images) return "https://via.placeholder.com/300x400?text=No+Image";
    if (Array.isArray(images) && images.length > 0)
      return images[0].url || images[0];
    if (typeof images === "string") return images;
    return "https://via.placeholder.com/300x400?text=No+Image";
  };

  const heroImageUrl =
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop";

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
            <span className="font-bold text-[24px] leading-8 tracking-[0.1px] text-[#252B42] text-center uppercase">
              MOST POPULAR
            </span>
            <p className="font-normal text-[14px] leading-5 tracking-[0.2px] text-[#737373] text-center w-[280px]">
              We focus on ergonomics and meeting you where you work. It's only a
              keystroke away.
            </p>

            {product && (
              <div
                onClick={() => handleProductClick(product)}
                className="flex flex-col items-center bg-white border border-[#ECECEC] w-full cursor-pointer group hover:shadow-lg transition-all duration-300"
              >
                <div className="w-full h-[294px] overflow-hidden">
                  <img
                    src={getProductImageUrl(product.images)}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col items-center gap-[10px] py-6 px-4">
                  <span className="font-bold text-[16px] text-[#252B42] text-center">
                    {product.name}
                  </span>
                  <div className="flex items-center gap-[5px]">
                    <span className="font-bold text-[#BDBDBD] line-through">
                      ${product.price}
                    </span>
                    <span className="font-bold text-[#23856D]">
                      ${(product.price * 0.9).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-col pt-12 pb-12 gap-[30px]">
        <div className="flex flex-row-reverse items-center justify-center gap-0 w-full">
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
              <span className="font-bold text-[24px] leading-8 tracking-[0.1px] text-[#252B42] text-center uppercase">
                MOST POPULAR
              </span>
              <p className="font-normal text-[14px] leading-5 tracking-[0.2px] text-[#737373] text-center w-[280px]">
                We focus on ergonomics and meeting you where you work. It's only
                a keystroke away.
              </p>

              {product && (
                <div
                  onClick={() => handleProductClick(product)}
                  className="flex flex-col items-center bg-white border border-[#ECECEC] w-full cursor-pointer group hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-full h-[240px] overflow-hidden">
                    <img
                      src={getProductImageUrl(product.images)}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-col items-center gap-[10px] py-6 px-4">
                    <span className="font-bold text-[16px] text-[#252B42] text-center truncate w-full uppercase">
                      {product.name}
                    </span>
                    <div className="flex items-center gap-[5px]">
                      <span className="font-bold text-[#BDBDBD] line-through">
                        ${product.price}
                      </span>
                      <span className="font-bold text-[#23856D]">
                        ${(product.price * 0.9).toFixed(2)}
                      </span>
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
              className="flex items-start gap-5 p-4"
              style={{ minHeight: "111px" }}
            >
              <span className="font-bold text-[40px] text-[#E74040] leading-none flex-shrink-0">
                {feature.number}
              </span>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-[14px] text-[#252B42]">
                  {feature.title}
                </span>
                <span className="font-normal text-[12px] text-[#737373]">
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

export default MostPopularInverted;
