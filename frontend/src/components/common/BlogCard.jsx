import React from "react";
import { useNavigate } from "react-router-dom";
import { Clock, BarChart2 } from "lucide-react";

import post1 from "../../assets/posts/post1.png";
import post2 from "../../assets/posts/post2.jpg";
import post3 from "../../assets/posts/post3.jpg";
import post4 from "../../assets/posts/post4.jpg";
import post5 from "../../assets/posts/post5.jpg";
import post6 from "../../assets/posts/post6.jpg";

const staticImages = [post1, post2, post3, post4, post5, post6];

const BlogCard = ({ blog, variant = "default" }) => {
  const navigate = useNavigate();

  if (!blog) return null;

  const isPage = variant === "page";

  const containerClasses = isPage
    ? "w-full lg:w-[470px] min-h-[630px]"
    : "w-full sm:w-[328px] min-h-[630px]";

  const imageContainerHeight = isPage ? "h-[300px] lg:h-[350px]" : "h-[300px]";

  const blogImg = staticImages[(blog.id - 1) % staticImages.length];

  return (
    <div
      className={`${containerClasses} flex flex-col border border-[#ECECEC] overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300 bg-white pb-8`}
    >
      <div
        className={`relative w-full ${imageContainerHeight} overflow-hidden flex-shrink-0 bg-[#F3F3F3]`}
      >
        {blog.isNew && (
          <span className="absolute top-5 left-5 z-10 bg-[#E74040] text-white font-bold text-[12px] leading-6 px-[10px] rounded-[3px]">
            NEW
          </span>
        )}

        <img
          src={blogImg}
          alt={blog.title || "Blog Post"}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="flex flex-col pt-[25px] px-[25px] flex-grow justify-between">
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

          <h3
            className="font-normal text-[20px] leading-[30px] tracking-[0.2px] text-[#252B42]"
            style={{ width: "247px", minHeight: "60px" }}
          >
            {blog.title || "Koudetat à la Maison #1 (L'intégrale)"}
          </h3>

          <p
            className="font-normal text-[14px] leading-[20px] tracking-[0.2px] text-[#737373] line-clamp-3"
            style={{ width: "280px", minHeight: "60px" }}
          >
            {blog.description ||
              "We focus on ergonomics and meeting you where you work. It's only a keystroke away."}
          </p>
        </div>

        <div className="flex flex-col gap-[20px] mt-6">
          <div className="flex items-center justify-between pt-[15px] border-t border-[#F3F3F3]">
            <div className="flex items-center gap-[5px]">
              <Clock size={16} className="text-[#23A6F0]" />
              <span className="font-normal text-[12px] leading-4 tracking-[0.2px] text-[#737373]">
                {blog.date || "22 April 2021"}
              </span>
            </div>
            <div className="flex items-center gap-[5px]">
              <BarChart2 size={16} className="text-[#23856D]" />
              <span className="font-normal text-[12px] leading-4 tracking-[0.2px] text-[#737373]">
                {blog.comments || 0} comments
              </span>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/blog/${blog.id}`);
            }}
            className="flex items-center gap-[10px] w-fit border-none bg-transparent p-0 pb-2 cursor-pointer hover:translate-x-1 transition-transform"
          >
            <span className="font-bold text-[14px] leading-6 tracking-[0.2px] text-[#252B42]">
              Learn More
            </span>
            <span className="text-[#23A6F0] font-bold text-[20px]">›</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
