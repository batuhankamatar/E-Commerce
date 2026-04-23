import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import {
  User,
  Search,
  ShoppingCart,
  Heart,
  ChevronDown,
  ChevronUp,
  AlignRight,
} from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="flex flex-wrap items-center justify-between lg:flex-nowrap lg:h-[91px]">
      <Link
        to="/"
        className="flex items-center mt-[23px] lg:mt-[16px] ml-[35px] lg:ml-[196px] w-[187px] h-[58px]"
      >
        <img
          src={logo}
          alt="Bandage Logo"
          className=" flex w-[108px] h-[32px] object-contain"
        />
      </Link>

      <div className="flex items-center h-[58px] mt-[23px] lg:mt-[16px] lg:order-3">
        <div className="nav-actions flex items-center w-full max-w-[128px] lg:max-w-[324px] h-[24px] gap-[32px] lg:gap-[30px] mr-[40px] lg:mr-[100px] order-2">
          <div className="desktop-auth hidden lg:flex items-center gap-1">
            {isLoggedIn ? (
              <button
                onClick={() => setIsLoggedIn(false)}
                className="text-[#23A6F0] font-bold text-sm"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="text-[#23A6F0] font-bold text-[14px] leading-[24px] tracking-[0.2px] whitespace-nowrap flex items-center gap-[5px] hover:text-[#1a7bb3] transition-all"
              >
                <User size={16} strokeWidth={2.5} />
                <span>Login / Register</span>
              </Link>
            )}
          </div>

          <div className="flex items-center gap-[24px] lg:gap-[30px] text-[#252B42] lg:text-[#23A6F0]">
            <Search className="search flex w-[24px] h-[24px] lg:w-[16px] lg:h-[16px] cursor-pointer" />

            <div className="flex items-center gap-1 cursor-pointer">
              <ShoppingCart className="shopping-cart flex w-[24px] h-[24px] lg:w-[16px] lg:h-[16px]" />
              <span className="hidden lg:block text-[12px]"></span>
            </div>

            <div className="hidden lg:flex items-center gap-1 cursor-pointer">
              <Heart className="desktop-favs w-[24px] h-[24px] lg:w-[16px] lg:h-[16px] shrink-0" />
              <span className="text-[12px]"></span>
            </div>
          </div>

          <div className="mobile-menu-container relative lg:hidden">
            <AlignRight
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="cursor-pointer"
              size={24}
            />
          </div>
        </div>
      </div>

      <nav className="flex w-full h-auto mt-[83px] lg:mt-[16px] order-3 lg:order-2 items-center justify-center lg:order-2">
        <ul className="list-none p-0 m-0 flex flex-col items-center gap-[30px] lg:gap-[15px] lg:flex-row">
          <li>
            <Link
              to="/"
              className="no-underline font-['Montserrat'] text-[#737373] font-[550] text-[30px] lg:text-[14px] leading-[45px] tracking-[0.2px] text-center hover:text-[#23A6F0] transition-all"
            >
              Home
            </Link>
          </li>
          <li className="relative hidden lg:block font-['Montserrat'] text-[#737373] font-[550] text-[30px] lg:text-[14px] leading-[45px] tracking-[0.2px] text-center hover:text-[#23A6F0] transition-all">
            <div
              onClick={() => setIsShopOpen(!isShopOpen)}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
              }}
            >
              Shop{" "}
              {isShopOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>

            {isShopOpen && (
              <ul className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl p-4 z-[999] flex flex-col gap-3 min-w-[120px] list-none">
                <li className="text-center">
                  {" "}
                  <Link
                    to="/shop/men"
                    className="hover:text-[#23A6F0] block whitespace-nowrap"
                  >
                    Men
                  </Link>
                </li>
                <li className="text-center">
                  <Link
                    to="/shop/women"
                    className="hover:text-[#23A6F0] block whitespace-nowrap"
                  >
                    Women
                  </Link>
                </li>
                <li className="text-center">
                  <Link
                    to="/shop/kids"
                    className="hover:text-[#23A6F0] block whitespace-nowrap"
                  >
                    Kids
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li className="hidden lg:block font-['Montserrat'] text-[#737373] font-[550] text-[30px] lg:text-[14px] leading-[45px] tracking-[0.2px] text-center hover:text-[#23A6F0] transition-all">
            <Link to="/">About</Link>
          </li>
          <li className="hidden lg:block font-['Montserrat'] text-[#737373] font-[550] text-[30px] lg:text-[14px] leading-[45px] tracking-[0.2px] text-center hover:text-[#23A6F0] transition-all">
            <Link to="/">Blog</Link>
          </li>
          <li>
            <Link
              to="/product"
              className="no-underline font-['Montserrat'] text-[#737373] font-[550] text-[30px] lg:text-[14px] leading-[45px] tracking-[0.2px] text-center hover:text-[#23A6F0] transition-all"
            >
              Product{" "}
            </Link>
          </li>
          <li>
            <Link
              to="/pricing"
              className="no-underline font-['Montserrat'] text-[#737373] font-[550] text-[30px] lg:text-[14px] leading-[45px] tracking-[0.2px] text-center hover:text-[#23A6F0] transition-all"
            >
              Pricing
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="no-underline font-['Montserrat'] text-[#737373] font-[550] text-[30px] lg:text-[14px] leading-[45px] tracking-[0.2px] text-center hover:text-[#23A6F0] transition-all"
            >
              Contact
            </Link>
          </li>
          <li className="hidden lg:block font-['Montserrat'] text-[#737373] font-[550] text-[30px] lg:text-[14px] leading-[45px] tracking-[0.2px] text-center hover:text-[#23A6F0] transition-all">
            <Link to="/">Pages</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
