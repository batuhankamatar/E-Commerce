import React from "react";
import Hero from "../components/home/Hero";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero />
        <section className="container mx-auto px-4 py-12"></section>
      </main>
    </div>
  );
};

export default HomePage;
