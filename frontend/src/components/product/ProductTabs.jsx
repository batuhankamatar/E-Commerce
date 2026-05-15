import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import StarRating from "./StarRating";

const ProductTabs = ({ product, reviews = [] }) => {
  const [activeTab, setActiveTab] = useState("description");

  const getImageUrl = (product) => {
    if (product?.images && product.images.length > 0) {
      return product.images[0].url || product.images[0];
    }
    return "https://via.placeholder.com/400x400?text=No+Image";
  };

  return (
    <div className="w-full border-t border-[#ECECEC]">
      <div className="w-full max-w-[1050px] mx-auto px-4 lg:px-0">
        <div className="flex items-center gap-8 h-[91px] border-b border-[#ECECEC]">
          {["description", "additional", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`font-bold text-[14px] leading-6 tracking-[0.2px] transition-colors pb-1
                ${
                  activeTab === tab
                    ? "text-[#252B42] border-b-2 border-[#252B42]"
                    : "text-[#737373] hover:text-[#252B42]"
                }`}
            >
              {tab === "description" && "Description"}
              {tab === "additional" && "Additional Information"}
              {tab === "reviews" && `Reviews (${reviews?.length || 0})`}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full max-w-[1050px] mx-auto px-4 lg:px-0 py-12">
        {activeTab === "description" && (
          <div className="flex flex-col lg:flex-row gap-[50px]">
            <div className="w-full lg:w-[332px] h-[392px] flex-shrink-0 overflow-hidden rounded bg-[#F3F3F3]">
              <img
                src={getImageUrl(product)}
                alt={product?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-4 w-full lg:w-[332px]">
              <h3 className="font-bold text-[24px] leading-8 text-[#252B42]">
                the quick fox jumps over
              </h3>
              <p className="font-normal text-[14px] leading-5 text-[#737373]">
                {product?.description}
              </p>
              <p className="font-normal text-[14px] leading-5 text-[#737373]">
                Met minim Mollie non desert Alamo est sit cliquey dolor do met
                sent. RELIT official consequent door ENIM RELIT Mollie.
              </p>
            </div>
            <div className="flex flex-col gap-6 w-full lg:w-[332px]">
              {[
                { title: "the quick fox jumps over", count: 4 },
                { title: "the quick fox jumps over", count: 3 },
              ].map((section, si) => (
                <div key={si}>
                  <h3 className="font-bold text-[24px] leading-8 text-[#252B42] mb-3">
                    {section.title}
                  </h3>
                  {Array.from({ length: section.count }).map((_, i) => (
                    <div key={i} className="flex items-center gap-2 py-1">
                      <ChevronRight size={14} color="#23A6F0" />
                      <span className="font-bold text-[14px] leading-6 text-[#737373]">
                        the quick fox jumps over the lazy dog
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "additional" && (
          <div className="flex flex-col gap-4">
            {[
              { label: "Category ID", value: product?.category_id },
              { label: "Stock", value: product?.stock },
              { label: "Rating", value: `${product?.rating?.toFixed(1)} / 5` },
              { label: "Store ID", value: product?.store_id },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-4 border-b border-[#ECECEC] py-3"
              >
                <span className="font-bold text-[14px] leading-6 text-[#252B42] w-[150px]">
                  {item.label}
                </span>
                <span className="font-normal text-[14px] leading-6 text-[#737373]">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="flex flex-col gap-6">
            {!reviews || reviews.length === 0 ? (
              <p className="font-normal text-[14px] text-[#737373] text-center py-8">
                No reviews yet. Be the first to review!
              </p>
            ) : (
              reviews.map((review) => (
                <div
                  key={review.id}
                  className="flex flex-col gap-2 border-b border-[#ECECEC] pb-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[14px] text-[#252B42]">
                      {review.userName || "Anonymous"}
                    </span>
                    <span className="font-normal text-[12px] text-[#737373]">
                      {review.date}
                    </span>
                  </div>
                  <StarRating rating={review.rating} />
                  <p className="font-normal text-[14px] leading-5 text-[#737373]">
                    {review.comment}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
