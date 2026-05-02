import React from "react";
import { Star } from "lucide-react";

const StarRating = ({ rating }) => (
  <div className="flex items-center gap-[2px]">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        size={16}
        className={
          star <= Math.round(rating)
            ? "fill-[#F3CD03] text-[#F3CD03]"
            : star - 0.5 <= rating
              ? "fill-[#F3CD03] text-[#F3CD03] opacity-60"
              : "fill-none text-[#BDBDBD]"
        }
      />
    ))}
  </div>
);

export default StarRating;
