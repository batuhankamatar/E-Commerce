import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import BlogCard from "../common/BlogCard";

const FeaturedPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/blogs/featured")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Blog çekilemedi:", err));
  }, []);

  if (posts.length === 0)
    return (
      <section className="bg-white font-['Montserrat']">
        <div className="w-full max-w-[1050px] mx-auto px-4 lg:px-0 pt-[112px] pb-[112px] flex flex-col items-center gap-[80px]">
          <div className="flex flex-col items-center gap-[10px]">
            <span className="font-bold text-[14px] leading-6 tracking-[0.2px] text-[#23A6F0] text-center">
              Practice Advice
            </span>
            <h2 className="font-bold text-[40px] leading-[50px] tracking-[0.2px] text-[#252B42] text-center">
              Featured Posts
            </h2>
          </div>
        </div>
      </section>
    );

  return (
    <section className="bg-white font-['Montserrat']">
      <div className="w-full max-w-[1050px] mx-auto px-4 lg:px-0 pt-[112px] pb-[112px] flex flex-col items-center gap-[80px]">
        <div className="flex flex-col items-center gap-[10px]">
          <span className="font-bold text-[14px] leading-6 tracking-[0.2px] text-[#23A6F0] text-center">
            Practice Advice
          </span>
          <h2 className="font-bold text-[40px] leading-[50px] tracking-[0.2px] text-[#252B42] text-center">
            Featured Posts
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-[30px] w-full">
          {posts.map((post) => (
            <BlogCard key={post.id} blog={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;
