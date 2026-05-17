import React from "react";
import { Link } from "react-router-dom";
import { Phone, MapPin, Mail } from "lucide-react";

import fbIcon from "../assets/socials/fb.png";
import instaIcon from "../assets/socials/insta.png";
import twIcon from "../assets/socials/tw.png";
import fbMobile from "../assets/socials/fbmobile.png";
import instaMobile from "../assets/socials/instamobile.png";
import youtubeMobile from "../assets/socials/youtubemobile.png";

const Footer = () => {
  return (
    <footer className="w-full lg:h-[488px] mx-auto font-['Montserrat'] flex flex-col items-center opacity-100 bg-white">
      <div className="w-full h-auto lg:h-[142px] bg-[#252B42] flex justify-center items-center py-10 lg:py-0">
        <div className="w-[352px] h-[296px] lg:w-[1050px] lg:h-[62px] flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-[305px] px-4 lg:px-0 py-10 lg:py-0">
          <div className="w-[239px] h-[216px] lg:w-[509px] lg:h-auto flex flex-col justify-between lg:justify-start items-start text-left gap-[10px]">
            <div className="flex flex-col gap-[10px]">
              <h2 className="font-bold text-[20px] leading-[32px] tracking-[0.1px] text-white">
                Consulting Agency For Your Business
              </h2>
              <p className="font-normal text-[14px] leading-[20px] tracking-[0.2px] text-white">
                the quick fox jumps over <br className="block lg:hidden" />
                the lazy dog
              </p>
            </div>

            <div className="block lg:hidden w-full">
              <Link to="/contact" className="no-underline block w-[160px]">
                <button className="w-[160px] h-[52px] bg-[#23A6F0] rounded-[5px] font-bold text-[14px] leading-[22px] tracking-[0.2px] text-white flex items-center justify-center px-[40px] py-[15px] text-center cursor-pointer border-none">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex w-full lg:w-[236px] h-[52px] justify-end items-center">
            <Link to="/contact" className="no-underline block">
              <button className="h-[52px] bg-[#23A6F0] rounded-[5px] font-bold text-[14px] leading-[22px] tracking-[0.2px] text-white flex items-center justify-center px-[40px] py-[15px] text-center cursor-pointer border-none">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full h-auto lg:h-[272px] bg-[#252B42] flex justify-center items-center">
        <div className="w-[239px] lg:w-[1050px] h-auto lg:h-[270px] flex flex-col lg:flex-row justify-between py-[50px] px-4 lg:px-0 items-start lg:items-start text-left lg:text-left gap-10 lg:gap-[30px]">
          <div className="flex flex-col gap-5 w-full lg:w-[148px] h-auto lg:h-[170px]">
            <h5 className="font-bold text-[16px] leading-[24px] tracking-[0.1px] text-white">
              Company Info
            </h5>
            <div className="flex flex-col gap-[10px] font-bold text-[14px] leading-[24px] tracking-[0.2px] text-[#FFFFFF]/70">
              <Link to="/about" className="hover:text-white transition-colors">
                About Us
              </Link>
              <Link
                to="/carrier"
                className="hover:text-white transition-colors"
              >
                Carrier
              </Link>
              <Link to="/hiring" className="hover:text-white transition-colors">
                We are hiring
              </Link>
              <Link to="/blog" className="hover:text-white transition-colors">
                Blog
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-5 w-full lg:w-[152px] h-auto lg:h-[170px]">
            <h5 className="font-bold text-[16px] leading-[24px] tracking-[0.1px] text-white">
              Legal
            </h5>
            <div className="flex flex-col gap-[10px] font-bold text-[14px] leading-[24px] tracking-[0.2px] text-[#FFFFFF]/70">
              <Link to="/about" className="hover:text-white transition-colors">
                About Us
              </Link>
              <Link
                to="/carrier"
                className="hover:text-[#FFFFFF] transition-colors"
              >
                Carrier
              </Link>
              <Link
                to="/hiring"
                className="hover:text-[#FFFFFF] transition-colors"
              >
                We are hiring
              </Link>
              <Link
                to="/blog"
                className="hover:text-[#FFFFFF] transition-colors"
              >
                Blog
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-5 w-full lg:w-[148px] h-auto lg:h-[170px]">
            <h5 className="font-bold text-[16px] leading-[24px] tracking-[0.1px] text-white">
              Features
            </h5>
            <div className="flex flex-col gap-[10px] font-bold text-[14px] leading-[24px] tracking-[0.2px] text-[#FFFFFF]/70">
              <span>Business Marketing</span>
              <span>User Analytic</span>
              <span>Live Chat</span>
              <span>Unlimited Support</span>
            </div>
          </div>

          <div className="flex flex-col gap-5 w-full lg:w-[152px] h-auto lg:h-[170px]">
            <h5 className="font-bold text-[16px] leading-[24px] tracking-[0.1px] text-white">
              Resources
            </h5>
            <div className="flex flex-col gap-[10px] font-bold text-[14px] leading-[24px] tracking-[0.2px] text-[#FFFFFF]/70">
              <span>IOS & Android</span>
              <span>Watch a Demo</span>
              <span>Customers</span>
              <span>API</span>
            </div>
          </div>

          <div className="flex flex-col gap-5 w-full lg:w-[321px] h-auto lg:h-[152px]">
            <h5 className="font-bold text-[16px] leading-[24px] tracking-[0.1px] text-white">
              Get In Touch
            </h5>
            <div className="flex flex-col gap-[10px] font-bold text-[14px] leading-[24px] tracking-[0.2px] text-[#FFFFFF]/70 items-start lg:items-start">
              <div className="flex items-center gap-[10px]">
                <Phone size={24} className="text-[#23A6F0]" />
                <span className="hover:text-white">(480) 555-0103</span>
              </div>
              <div className="flex items-center gap-[10px]">
                <MapPin size={24} className="text-[#23A6F0]" />
                <span className="hover:text-white">4517 Washington Ave.</span>
              </div>
              <div className="flex items-center gap-[10px]">
                <Mail size={24} className="text-[#23A6F0]" />
                <span className="hover:text-white">debra.holt@example.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-auto lg:h-[74px] bg-[#252B42] flex justify-center items-center py-10 lg:py-0">
        <div className="w-[236px] lg:w-[1050px] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-[50px] lg:gap-0 px-4 lg:px-0">
          <p className="font-bold text-[13px] leading-[24px] tracking-[0.2px] text-white text-left lg:text-left">
            Made With Love By Finland All Right Reserved
          </p>
          <div className="flex items-center gap-5 lg:w-[112px] h-[24px] justify-start lg:justify-center">
            <img
              src={fbIcon}
              alt="facebook"
              className="hidden lg:block w-6 h-6 object-contain cursor-pointer"
            />
            <img
              src={fbMobile}
              alt="facebook"
              className="block lg:hidden w-6 h-6 object-contain cursor-pointer"
            />
            <img
              src={instaIcon}
              alt="instagram"
              className="hidden lg:block w-6 h-6 object-contain cursor-pointer"
            />
            <img
              src={instaMobile}
              alt="instagram"
              className="block lg:hidden w-6 h-6 object-contain cursor-pointer"
            />
            <img
              src={twIcon}
              alt="twitter"
              className="w-6 h-6 object-contain cursor-pointer"
            />
            <img
              src={youtubeMobile}
              alt="youtube"
              className="block lg:hidden w-6 h-6 object-contain cursor-pointer"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
