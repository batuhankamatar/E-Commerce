import React from "react";

const imgUrl = new URL("../../assets/about/img.png", import.meta.url).href;
const ellipse1Url = new URL("../../assets/about/ellipse1.png", import.meta.url)
  .href;
const ellipse2Url = new URL("../../assets/about/ellipse2.png", import.meta.url)
  .href;
const ellipse3Url = new URL("../../assets/about/ellipse3.png", import.meta.url)
  .href;

const AboutHero = () => (
  <section className="bg-white font-['Montserrat'] overflow-hidden">
    <div className="w-full max-w-[1050px] mx-auto px-4 lg:px-0 pb-[112px] flex flex-col lg:flex-row items-center gap-[80px]">
      {/* Sol — Metin: mobilde üstte ve ortalı, desktop'ta solda */}
      <div className="flex flex-col gap-[35px] w-full lg:w-[599px] order-1 lg:order-1 items-center lg:items-start text-center lg:text-left">
        <span className="font-bold text-[16px] leading-6 tracking-[0.1px] text-[#252B42]">
          ABOUT COMPANY
        </span>
        <h1 className="font-bold text-[40px] lg:text-[58px] leading-[50px] lg:leading-[80px] tracking-[0.2px] text-[#252B42]">
          ABOUT US
        </h1>
        <p className="font-normal text-[16px] lg:text-[20px] leading-[26px] lg:leading-[30px] tracking-[0.2px] text-[#737373] w-[277px] lg:w-[376px]">
          We know how large objects will act, but things on a small scale just
          do not act that way.
        </p>
        <button className="w-[193px] h-[52px] bg-[#23A6F0] rounded-[5px] flex items-center justify-center font-bold text-[14px] leading-[22px] tracking-[0.2px] text-white hover:bg-[#1a7bb3] transition-colors py-[15px]">
          Get Quote Now
        </button>
      </div>

      {/* Sağ — Görsel: mobilde altında, desktop'ta sağda */}
      <div className="relative w-full h-[420px] lg:w-[571px] lg:h-[620px] order-2 lg:order-2 flex-shrink-0">
        {/* Büyük pembe daire */}
        <div
          className="absolute rounded-full z-0"
          style={{
            width: "55%",
            height: "55%",
            backgroundColor: "#FFE9EA",
            top: "50%",
            left: "50%",
            transform: "translate(-55%, -60%)",
          }}
        />

        {/* Ellipse 1 — sol üst */}
        <img
          src={ellipse1Url}
          alt=""
          className="absolute z-10"
          style={{ width: "13%", height: "13%", top: "15%", left: "13%" }}
        />

        {/* Ellipse 2 — mor sol alt */}
        <img
          src={ellipse2Url}
          alt=""
          className="absolute z-10"
          style={{ width: "3%", height: "3%", top: "65%", left: "16%" }}
        />

        {/* Ellipse 2 kopyası — mor sağ üst */}
        <img
          src={ellipse2Url}
          alt=""
          className="absolute z-10"
          style={{ width: "3%", height: "3%", top: "30%", right: "20%" }}
        />

        {/* Ellipse 3 — küçük pembe sağ orta */}
        <img
          src={ellipse3Url}
          alt=""
          className="absolute z-10"
          style={{ width: "5%", height: "5%", top: "48%", right: "18%" }}
        />

        {/* Ana görsel */}
        <img
          src={imgUrl}
          alt="About Us"
          className="absolute inset-0 w-full h-full object-contain z-[5]"
          style={{ mixBlendMode: "multiply" }}
        />
      </div>
    </div>
  </section>
);

export default AboutHero;
