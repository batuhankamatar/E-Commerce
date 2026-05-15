import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import BlogCard from "../common/BlogCard";

const FeaturedPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/blogs")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setPosts(res.data.slice(0, 3));
        }
      })
      .catch((err) => console.error("Featured posts çekilemedi:", err))
      .finally(() => setLoading(false));
  }, []);

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

        {loading ? (
          <div className="w-12 h-12 border-4 border-[#23A6F0] border-t-transparent rounded-full animate-spin"></div>
        ) : posts.length > 0 ? (
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-[30px] w-full">
            {posts.map((post) => (
              <BlogCard key={post.id} blog={post} />
            ))}
          </div>
        ) : (
          <div className="text-gray-400 italic">
            No posts available at the moment.
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedPosts;
