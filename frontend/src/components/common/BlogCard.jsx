import React from "react";
import { useNavigate } from "react-router-dom";
import { Clock, BarChart2 } from "lucide-react";

const BlogCard = ({ blog, variant = "default" }) => {
  const navigate = useNavigate();

  const getImageUrl = (image) => {
    if (!image) return "https://via.placeholder.com/400x300?text=No+Image";
    if (image.startsWith("http")) return image;
    return new URL(`/src/assets/posts/${image}`, import.meta.url).href;
  };

  const formatDate = (dateStr) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    } catch (e) {
      return dateStr;
    }
  };

  const isPage = variant === "page";
  const containerClasses = isPage
    ? "w-full lg:w-[470px] lg:h-[606px]"
    : "w-full sm:w-[328px]";

  const imageContainerHeight = isPage ? "h-[300px] lg:h-[350px]" : "h-[300px]";

  return (
    <div
      className={`${containerClasses} flex flex-col border border-[#ECECEC] overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300`}
    >
      <div
        className={`relative w-full ${imageContainerHeight} overflow-hidden flex-shrink-0`}
      >
        {blog.isNew && (
          <span className="absolute top-5 left-5 z-10 bg-[#E74040] text-white font-bold text-[12px] leading-6 px-[10px] rounded-[3px]">
            NEW
          </span>
        )}
        <img
          src={getImageUrl(blog.img)}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="flex flex-col gap-[10px] pt-[25px] pr-[25px] pb-[35px] pl-[25px] flex-grow justify-between">
        <div className="flex flex-col gap-[10px]">
          <div className="flex items-center gap-[15px]">
            <span className="font-normal text-[12px] leading-4 tracking-[0.2px] text-[#8EC2F2]">
              Google
            </span>
            <span className="font-normal text-[12px] leading-4 tracking-[0.2px] text-[#737373]">
              Trending
            </span>
            <span className="font-normal text-[12px] leading-4 tracking-[0.2px] text-[#737373]">
              New
            </span>
          </div>

          <h3 className="font-normal text-[20px] leading-[30px] tracking-[0.2px] text-[#252B42] line-clamp-2">
            {blog.title}
          </h3>

          <p className="font-normal text-[14px] leading-5 tracking-[0.2px] text-[#737373] line-clamp-3">
            {blog.description}{" "}
          </p>
        </div>

        <div className="flex flex-col gap-[15px]">
          <div className="flex items-center justify-between pt-[15px]">
            <div className="flex items-center gap-[5px]">
              <Clock size={12} color="#737373" />
              <span className="font-normal text-[12px] leading-4 tracking-[0.2px] text-[#737373]">
                {formatDate(blog.date)}
              </span>
            </div>
            <div className="flex items-center gap-[5px]">
              <BarChart2 size={12} color="#737373" />
              <span className="font-normal text-[12px] leading-4 tracking-[0.2px] text-[#737373]">
                {blog.comments} comments{" "}
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate(`/blog/${blog.id}`)}
            className="flex items-center gap-[10px] w-fit"
          >
            <span className="font-bold text-[14px] leading-6 tracking-[0.2px] text-[#252B42]">
              Learn More
            </span>
            <span className="text-[#23A6F0] font-bold text-[14px]">›</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
