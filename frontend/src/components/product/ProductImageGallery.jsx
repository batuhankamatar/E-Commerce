import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductImageGallery = ({ images, getImageUrl }) => {
  const [activeImage, setActiveImage] = useState(0);

  const handlePrev = () =>
    setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const handleNext = () =>
    setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <div className="flex flex-col gap-4 w-full lg:w-[506px] flex-shrink-0">
      <div className="relative w-full lg:w-[506px] h-[300px] lg:h-[450px] overflow-hidden rounded-[5px] border border-[#ECECEC]">
        <img
          src={getImageUrl(images[activeImage])}
          alt="product"
          className="w-full h-full object-cover"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-[40px] h-[40px] bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-all shadow-md"
            >
              <ChevronLeft size={20} color="#252B42" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-[40px] h-[40px] bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-all shadow-md"
            >
              <ChevronRight size={20} color="#252B42" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-[19px]">
          {images.map((img, i) => (
            <div
              key={i}
              onClick={() => setActiveImage(i)}
              className={`w-[100px] h-[75px] overflow-hidden rounded cursor-pointer border-2 transition-all
                ${activeImage === i ? "border-[#23A6F0]" : "border-transparent"}`}
            >
              <img
                src={getImageUrl(img)}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
