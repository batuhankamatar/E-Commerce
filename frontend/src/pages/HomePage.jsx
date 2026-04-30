import React from "react";
import Hero from "../components/home/Hero";
import DailyDeals from "../components/home/DailyDeals";
import BestsellerProducts from "../components/home/BestsellerProducts";
import BestsellerProductsInverted from "../components/home/BestsellerProductsInverted";
import MostPopular from "../components/home/MostPopular";
import MostPopularInverted from "../components/home/MostPopularInverted";
import BestsellerSimple from "../components/home/BestsellerSimple";
import Clients from "../components/home/Clients";
import FeaturedPosts from "../components/home/FeaturedPosts";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero />
        <DailyDeals />
        <BestsellerProducts />
        <MostPopular />
        <BestsellerProductsInverted />
        <MostPopularInverted />
        <BestsellerSimple />
        <Clients />
        <FeaturedPosts />
      </main>
    </div>
  );
};

export default HomePage;
