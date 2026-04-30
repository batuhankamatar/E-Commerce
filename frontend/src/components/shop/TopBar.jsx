import React from "react";
import instagram from "../../assets/shop/instagram.png";
import youtube from "../../assets/shop/youtube.png";
import facebook from "../../assets/shop/facebook.png";
import twitter from "../../assets/shop/twitter.png";
import { Phone, Mail } from "lucide-react";

const TopBar = () => (
  <div className="hidden lg:flex w-full h-[58px] bg-[#23856D] items-center justify-center">
    <div className="w-[1020px] flex items-center justify-between">
      <div className="flex items-center gap-[10px]">
        <div className="flex items-center gap-[5px] rounded-[5px] p-[10px]">
          <Phone size={12} color="white" />
          <span className="font-normal text-[12px] leading-4 tracking-[0.2px] text-white">
            (225) 555-0118
          </span>
        </div>
        <div className="flex items-center gap-[5px] rounded-[5px] p-[10px]">
          <Mail size={12} color="white" />
          <span className="font-normal text-[12px] leading-4 tracking-[0.2px] text-white">
            michelle.rivera@example.com
          </span>
        </div>
      </div>

      <div className="flex items-center p-[10px]">
        <span className="font-bold text-[14px] leading-6 tracking-[0.2px] text-white text-center">
          Follow Us and get a chance to win 80% off
        </span>
      </div>

      <div className="flex items-center gap-[10px] p-[10px]">
        <span className="font-bold text-[14px] leading-6 tracking-[0.2px] text-white">
          Follow Us
        </span>
        <div className="flex items-center gap-[5.5px]">
          {[instagram, youtube, facebook, twitter].map((icon, i) => (
            <div
              key={i}
              className="w-[26px] h-[26px] flex items-center justify-center p-[5px] cursor-pointer"
            >
              <img
                src={icon}
                alt="social"
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default TopBar;
