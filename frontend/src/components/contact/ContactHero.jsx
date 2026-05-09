import React from "react";

const ContactHero = () => (
  <div className="flex flex-col items-center lg:items-start gap-[36px] w-full lg:w-[367px]">
    <h1 className="font-bold text-[40px] leading-[50px] tracking-[0.2px] text-white text-center lg:text-left">
      CONTACT US
    </h1>
    <p className="font-normal text-[14px] leading-5 tracking-[0.2px] text-white text-center lg:text-left w-full lg:w-[367px]">
      Problems trying to resolve the conflict between the two major realms of
      Classical physics: Newtonian mechanics
    </p>
    <button className="w-[176px] h-[52px] bg-[#23A6F0] rounded-[5px] flex items-center justify-center font-bold text-[14px] leading-[22px] tracking-[0.2px] text-white hover:bg-[#1a7bb3] transition-colors">
      CONTACT US
    </button>
  </div>
);

export default ContactHero;
