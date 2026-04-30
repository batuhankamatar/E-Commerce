import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import BlogCard from "../components/common/BlogCard";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/blogs")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error("Bloglar çekilemedi:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen font-['Montserrat'] text-[#737373]">
        Loading...
      </div>
    );

  return (
    <section className="bg-white font-['Montserrat'] min-h-screen">
      <div className="w-full max-w-[1050px] mx-auto px-4 lg:px-0 pt-[80px] pb-[80px] flex flex-col items-center gap-[60px]">
        <div className="flex flex-col items-center gap-[10px]">
          <span className="font-bold text-[14px] leading-6 tracking-[0.2px] text-[#23A6F0] text-center">
            Practice Advice
          </span>
          <h1 className="font-bold text-[40px] leading-[50px] tracking-[0.2px] text-[#252B42] text-center">
            Blog
          </h1>
        </div>

        <div
          className="grid grid-cols-1 lg:grid-cols-2 w-full justify-items-center"
          style={{ columnGap: "33px", rowGap: "80px" }}
        >
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} variant="page" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
