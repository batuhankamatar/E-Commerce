import React from "react";

const testimonialUrl = new URL(
  "../../assets/testimonial/testimonial.jpg",
  import.meta.url,
).href;

const AboutCTA = () => (
  <section className="font-['Montserrat'] w-full overflow-hidden">
    <div className="flex flex-col lg:flex-row lg:h-[636px]">
      {/* Sol — mavi kısım: %59 */}
      <div
        className="hidden lg:flex items-center w-full lg:w-[59%] flex-shrink-0"
        style={{ backgroundColor: "#2A7CC7" }}
      >
        <div className="flex flex-col gap-6 pl-[195px]">
          <span className="font-bold text-[16px] leading-6 tracking-[0.1px] text-white">
            WORK WITH US
          </span>
          <h2 className="font-bold text-[40px] leading-[50px] tracking-[0.2px] text-white max-w-[440px]">
            Now Let's grow Yours
          </h2>
          <p className="font-normal text-[14px] leading-5 tracking-[0.2px] text-white max-w-[440px]">
            The gradual accumulation of information about atomic and small-scale
            behavior during the first quarter of the 20th
          </p>
          <button className="w-[130px] h-[52px] border border-[#FAFAFA] rounded-[5px] flex items-center justify-center font-bold text-[14px] leading-[22px] tracking-[0.2px] text-[#FAFAFA] hover:bg-white/10 transition-colors">
            Button
          </button>
        </div>
      </div>

      {/* Sağ — görsel: %41 */}
      <div className="hidden lg:block lg:w-[41%] flex-shrink-0 overflow-hidden">
        <img
          src={testimonialUrl}
          alt="Work with us"
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Mobil */}
      <div
        className="lg:hidden flex items-center justify-center py-[60px] px-8 min-h-[520px]"
        style={{ backgroundColor: "#2A7CC7" }}
      >
        <div className="flex flex-col gap-6 items-center text-center w-[272px]">
          <span className="font-bold text-[16px] leading-6 tracking-[0.1px] text-white">
            WORK WITH US
          </span>
          <h2 className="font-bold text-[40px] leading-[50px] tracking-[0.2px] text-white">
            Now Let's grow Yours
          </h2>
          <p className="font-normal text-[14px] leading-5 tracking-[0.2px] text-white">
            The gradual accumulation of information about atomic and small-scale
            behavior during the first quarter of the 20th
          </p>
          <button className="w-[130px] h-[52px] border border-[#FAFAFA] rounded-[5px] flex items-center justify-center font-bold text-[14px] leading-[22px] tracking-[0.2px] text-[#FAFAFA] hover:bg-white/10 transition-colors">
            Button
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default AboutCTA;
