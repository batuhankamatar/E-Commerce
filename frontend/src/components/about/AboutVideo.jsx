import React from "react";

const videoUrl = new URL("../../assets/about/video.png", import.meta.url).href;

const AboutVideo = () => (
  <section className="bg-white font-['Montserrat'] py-[112px]">
    <div className="flex justify-center">
      <div className="relative w-[307px] h-[316px] lg:w-[989px] lg:h-[540px] rounded-[20px] overflow-hidden cursor-pointer group">
        <img
          src={videoUrl}
          alt="Video"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[80px] h-[80px] lg:w-[95px] lg:h-[95px] bg-[#23A6F0] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <div
              className="w-0 h-0 ml-1"
              style={{
                borderTop: "10px solid transparent",
                borderBottom: "10px solid transparent",
                borderLeft: "18px solid white",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutVideo;
