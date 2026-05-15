import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/reducers/authReducer";
import { setUser } from "../store/reducers/clientReducer";
import { fetchCategories } from "../store/reducers/productReducer";
import axiosInstance from "../api/axiosInstance";
import Gravatar from "../components/common/Gravatar";
import {
  User,
  Search,
  ShoppingCart,
  Heart,
  ChevronDown,
  ChevronUp,
  AlignRight,
} from "lucide-react";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.client.user);
  const categories = useSelector((state) => state.product.categories) || [];

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsShopOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const femaleCategories = categories.filter((c) => c.gender === "k");
  const maleCategories = categories.filter((c) => c.gender === "e");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axiosInstance.defaults.headers.common["Authorization"];
    dispatch(logout());
    dispatch(setUser({}));
    setIsMenuOpen(false);
  };

  const handleCategoryClick = (gender, catTitle, catId) => {
    const genderSlug = gender === "k" ? "kadin" : "erkek";
    const categorySlug = catTitle.toLowerCase();
    navigate(`/shop/${genderSlug}/${categorySlug}/${catId}`);
    setIsShopOpen(false);
  };

  return (
    <header className="flex flex-wrap items-center justify-between mb-[98px] lg:mb-0 lg:flex-nowrap lg:h-[91px] relative">
      <Link
        to="/"
        className="flex items-center mt-[23px] lg:mt-[16px] ml-[35px] lg:ml-[196px] w-[187px] h-[58px]"
      >
        <img
          src={logo}
          alt="Bandage Logo"
          className="flex w-[108px] h-[32px] object-contain"
        />
      </Link>

      <div className="flex items-center h-[58px] mt-[23px] lg:mt-[16px] lg:order-3">
        {/* mr-[100px] olan ana konteynerı koruyoruz ama iç gap'i 40px yaptık */}
        <div className="nav-actions flex items-center w-full max-w-[128px] lg:max-w-fit h-[24px] gap-[32px] lg:gap-[40px] mr-[40px] lg:mr-[100px] order-2">
          <div className="desktop-auth hidden lg:flex items-center relative">
            {isLoggedIn ? (
              /* gap-8 yaparak Logout ve Profil arasını iyice açtık */
              <div className="flex items-center gap-8 min-w-max">
                <div className="flex items-center gap-3 text-[#23A6F0]">
                  <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#23A6F0] shadow-sm">
                    <Gravatar
                      email={user?.email || ""}
                      size={36}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-bold text-sm whitespace-nowrap">
                    {user?.name}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-[#737373] font-bold text-sm hover:text-red-500 transition-all border-l-2 border-gray-100 pl-8 h-6 flex items-center"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-[#23A6F0] font-bold text-sm flex items-center gap-2 whitespace-nowrap"
              >
                <User size={16} /> Login / Register
              </Link>
            )}
          </div>

          <div className="flex items-center gap-[24px] lg:gap-[30px] text-[#252B42] lg:text-[#23A6F0]">
            <Search className="search flex w-[24px] h-[24px] lg:w-[16px] lg:h-[16px] cursor-pointer" />
            <div className="flex items-center gap-1 cursor-pointer">
              <ShoppingCart className="shopping-cart flex w-[24px] h-[24px] lg:w-[16px] lg:h-[16px]" />
            </div>
            <div className="hidden lg:flex items-center gap-1 cursor-pointer">
              <Heart className="desktop-favs w-[24px] h-[24px] lg:w-[16px] lg:h-[16px] shrink-0" />
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

      <nav className="flex w-full h-auto mt-[83px] lg:mt-[16px] order-3 lg:order-2 items-center justify-center">
        <ul className="list-none p-0 m-0 flex flex-col items-center gap-[30px] lg:gap-[15px] lg:flex-row">
          <li>
            <Link
              to="/"
              className="no-underline font-['Montserrat'] text-[#737373] font-[550] text-[30px] lg:text-[14px] leading-[45px] tracking-[0.2px] text-center hover:text-[#23A6F0] transition-all"
            >
              Home
            </Link>
          </li>
          <li className="relative group" ref={dropdownRef}>
            <div
              onClick={() => setIsShopOpen(!isShopOpen)}
              className="no-underline font-['Montserrat'] text-[#737373] font-[550] text-[30px] lg:text-[14px] leading-[45px] tracking-[0.2px] text-center hover:text-[#23A6F0] transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              Shop{" "}
              {isShopOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
            {isShopOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white border border-gray-100 shadow-2xl rounded-lg p-6 flex gap-12 z-[1001] animate-fadeIn min-w-[350px]">
                <div className="flex flex-col gap-4">
                  <h4 className="text-[#252B42] font-bold text-[16px] text-left">
                    Kadın
                  </h4>
                  <ul className="flex flex-col gap-2 list-none p-0 m-0">
                    {femaleCategories.map((cat) => (
                      <li key={cat.id}>
                        <button
                          onClick={() =>
                            handleCategoryClick("k", cat.title, cat.id)
                          }
                          className="hover:text-[#23A6F0] text-[#737373] font-normal whitespace-nowrap text-left w-full bg-transparent border-none cursor-pointer p-0"
                        >
                          {cat.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-4">
                  <h4 className="text-[#252B42] font-bold text-[16px] text-left">
                    Erkek
                  </h4>
                  <ul className="flex flex-col gap-2 list-none p-0 m-0">
                    {maleCategories.map((cat) => (
                      <li key={cat.id}>
                        <button
                          onClick={() =>
                            handleCategoryClick("e", cat.title, cat.id)
                          }
                          className="hover:text-[#23A6F0] text-[#737373] font-normal whitespace-nowrap text-left w-full bg-transparent border-none cursor-pointer p-0"
                        >
                          {cat.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </li>
          <li>
            <Link
              to="/about"
              className="no-underline font-['Montserrat'] text-[#737373] font-[550] text-[30px] lg:text-[14px] leading-[45px] tracking-[0.2px] text-center hover:text-[#23A6F0] transition-all"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/blog"
              className="no-underline font-['Montserrat'] text-[#737373] font-[550] text-[30px] lg:text-[14px] leading-[45px] tracking-[0.2px] text-center hover:text-[#23A6F0] transition-all"
            >
              Blog
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
          <li>
            <Link
              to="/pricing"
              className="no-underline font-['Montserrat'] text-[#737373] font-[550] text-[30px] lg:text-[14px] leading-[45px] tracking-[0.2px] text-center hover:text-[#23A6F0] transition-all"
            >
              Pricing
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
