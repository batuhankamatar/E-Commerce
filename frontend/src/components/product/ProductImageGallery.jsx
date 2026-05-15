import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductImageGallery = ({ images = [], getImageUrl }) => {
  const [activeImage, setActiveImage] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full lg:w-[506px] h-[450px] bg-[#F3F3F3] flex items-center justify-center rounded-[5px] border border-[#ECECEC]">
        <p className="text-[#BDBDBD] font-bold italic font-['Montserrat']">
          No images available
        </p>
      </div>
    );
  }

  const currentImgUrl = getImageUrl(images[activeImage]);

  const handlePrev = () =>
    setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const handleNext = () =>
    setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <div className="flex flex-col gap-4 w-full lg:w-[506px] flex-shrink-0">
      <div className="relative w-full lg:w-[506px] h-[300px] lg:h-[450px] overflow-hidden rounded-[5px] border border-[#ECECEC] bg-[#F3F3F3]">
        {currentImgUrl ? (
          <img
            src={currentImgUrl}
            alt="product"
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#737373]">
            Image not found
          </div>
        )}

        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-[40px] h-[40px] bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-all shadow-md z-10"
            >
              <ChevronLeft size={20} color="#252B42" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-[40px] h-[40px] bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-all shadow-md z-10"
            >
              <ChevronRight size={20} color="#252B42" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-[19px] overflow-x-auto pb-2 custom-scrollbar">
          {images.map((img, i) => {
            const thumbUrl = getImageUrl(img);
            return thumbUrl ? (
              <div
                key={i}
                onClick={() => setActiveImage(i)}
                className={`w-[100px] h-[75px] flex-shrink-0 overflow-hidden rounded cursor-pointer border-2 transition-all
                  ${activeImage === i ? "border-[#23A6F0]" : "border-transparent"}`}
              >
                <img
                  src={thumbUrl}
                  alt={`thumbnail-${i}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : null;
          })}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
