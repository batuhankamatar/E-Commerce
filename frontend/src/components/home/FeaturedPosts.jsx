import React, { useEffect, useState } from "react";
import BlogCard from "../common/BlogCard";

const MOCK_POSTS = [
  {
    id: 1,
    title: "Loudest à la Madison #1 (L'integral)",
    description:
      "Ames dit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie.",
    date: "22 April 2021",
    comments: 10,
    img: "post2.jpg",
  },
  {
    id: 2,
    title: "Loudest à la Madison #2 (L'integral)",
    description:
      "Ames dit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie.",
    date: "22 April 2021",
    comments: 10,
    img: "post3.jpg",
  },
  {
    id: 3,
    title: "Loudest à la Madison #3 (L'integral)",
    description:
      "Ames dit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie.",
    date: "22 April 2021",
    comments: 10,
    img: "post1.png",
  },
];

const FeaturedPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(MOCK_POSTS);
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

        {posts.length > 0 ? (
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-[30px] w-full">
            {posts.map((post) => (
              <BlogCard key={post.id} blog={post} />
            ))}
          </div>
        ) : (
          <div className="text-gray-400">No posts available at the moment.</div>
        )}
      </div>
    </section>
  );
};

export default FeaturedPosts;
