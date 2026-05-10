import React from "react";

const STATS = [
  { value: "15K", label: "Happy Customers" },
  { value: "150K", label: "Monthly Visitors" },
  { value: "15", label: "Countries Worldwide" },
  { value: "100+", label: "Top Partners" },
];

const AboutStats = () => (
  <section className="bg-white font-['Montserrat'] py-[80px]">
    <div className="w-full max-w-[1049px] mx-auto px-4 lg:px-0 flex flex-col lg:flex-row items-center justify-between gap-[100px] lg:gap-[30px]">
      {STATS.map((stat) => (
        <div key={stat.label} className="flex flex-col items-center gap-2">
          <span className="font-bold text-[58px] leading-[80px] tracking-[0.2px] text-[#252B42] text-center">
            {stat.value}
          </span>
          <span className="font-bold text-[16px] leading-6 tracking-[0.1px] text-[#737373] text-center">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  </section>
);

export default AboutStats;
