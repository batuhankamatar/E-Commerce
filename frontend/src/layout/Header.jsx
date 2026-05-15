import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/reducers/authReducer";
import { setUser } from "../store/reducers/clientReducer";
import { fetchCategories } from "../store/actions/productActions";
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
  const authDropdownRef = useRef(null);

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
      if (
        authDropdownRef.current &&
        !authDropdownRef.current.contains(event.target)
      ) {
        setIsAuthOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axiosInstance.defaults.headers.common["Authorization"];
    dispatch(logout());
    dispatch(setUser({}));
    setIsMenuOpen(false);
    setIsAuthOpen(false);
  };

  const handleCategoryClick = (gender, catTitle, catId) => {
    const g = gender?.toLowerCase();
    const genderSlug =
      g === "k" || g === "female" || g === "kadin" ? "kadin" : "erkek";
    const categorySlug = catTitle.toLowerCase().replace(/\s+/g, "-");

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
        <div className="nav-actions flex items-center w-full max-w-[128px] lg:max-w-fit h-[24px] gap-[32px] lg:gap-[40px] mr-[40px] lg:mr-[100px] order-2">
          <div className="desktop-auth hidden lg:flex items-center relative">
            {isLoggedIn ? (
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
                  className="text-[#737373] font-bold text-sm hover:text-red-500 transition-all border-l-2 border-gray-100 pl-8 h-6 flex items-center bg-transparent border-none cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="relative" ref={authDropdownRef}>
                <button
                  onClick={() => setIsAuthOpen(!isAuthOpen)}
                  className="text-[#23A6F0] font-bold text-sm flex items-center gap-2 whitespace-nowrap bg-transparent border-none cursor-pointer p-0"
                >
                  <User size={16} /> Login / Register{" "}
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${isAuthOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isAuthOpen && (
                  <div className="absolute top-full right-0 mt-3 bg-white border border-gray-100 shadow-2xl rounded-lg py-3 z-[1002] min-w-[160px] animate-fadeIn">
                    <Link
                      to="/login"
                      onClick={() => setIsAuthOpen(false)}
                      className="block px-6 py-2 text-sm text-[#737373] hover:bg-[#F9F9F9] hover:text-[#23A6F0] font-bold no-underline transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsAuthOpen(false)}
                      className="block px-6 py-2 text-sm text-[#737373] hover:bg-[#F9F9F9] hover:text-[#23A6F0] font-bold no-underline transition-colors"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
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
            {isMenuOpen && (
              <div className="absolute top-full right-0 mt-4 bg-white border border-gray-100 shadow-xl rounded-lg py-3 min-w-[180px] z-[2001] animate-fadeIn">
                {isLoggedIn ? (
                  <div className="flex flex-col gap-1">
                    <div className="px-4 py-2 flex items-center gap-3 border-b border-gray-50 mb-1">
                      <Gravatar
                        email={user?.email || ""}
                        size={30}
                        className="rounded-full"
                      />
                      <span className="text-xs font-bold text-[#252B42]">
                        {user?.name}
                      </span>
                    </div>
                    <button className="px-4 py-2 text-sm text-[#737373] hover:text-[#23A6F0] flex items-center gap-2 bg-transparent border-none w-full text-left cursor-pointer">
                      <Heart size={14} /> Liked Products
                    </button>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 text-sm text-red-500 font-bold bg-transparent border-none w-full text-left cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col">
                    <Link
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="px-6 py-2 text-sm text-[#23A6F0] font-bold no-underline"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsMenuOpen(false)}
                      className="px-6 py-2 text-sm text-[#23A6F0] font-bold no-underline"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            )}
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

          <li className="hidden lg:block relative group" ref={dropdownRef}>
            <div
              onClick={() => setIsShopOpen(!isShopOpen)}
              className="no-underline font-['Montserrat'] text-[#737373] font-[550] text-[30px] lg:text-[14px] leading-[45px] tracking-[0.2px] text-center hover:text-[#23A6F0] transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              Shop{" "}
              {isShopOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
            {isShopOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white border border-gray-100 shadow-2xl rounded-lg p-6 flex gap-12 z-[1001] animate-fadeIn min-w-[220px]">
                <div className="flex flex-col gap-4 w-full">
                  <h4 className="text-[#252B42] font-bold text-[16px] text-left border-b pb-1">
                    Categories
                  </h4>
                  <ul className="flex flex-col gap-2 list-none p-0 m-0">
                    {categories.length > 0 ? (
                      categories.map((cat) => (
                        <li key={cat.id}>
                          <button
                            onClick={() =>
                              handleCategoryClick(cat.gender, cat.title, cat.id)
                            }
                            className="hover:text-[#23A6F0] text-[#737373] font-normal whitespace-nowrap text-left w-full bg-transparent border-none cursor-pointer p-0 transition-colors"
                          >
                            {cat.title}
                          </button>
                        </li>
                      ))
                    ) : (
                      <li className="text-xs text-gray-400 italic">
                        No categories found
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            )}
          </li>

          <li className="lg:hidden">
            <Link
              to="/shop"
              className="no-underline font-['Montserrat'] text-[#737373] font-[550] text-[30px] leading-[45px] text-center hover:text-[#23A6F0]"
            >
              Product
            </Link>
          </li>

          <li className="hidden lg:block">
            <Link
              to="/about"
              className="no-underline font-['Montserrat'] text-[#737373] font-[550] lg:text-[14px] leading-[45px] text-center hover:text-[#23A6F0]"
            >
              About
            </Link>
          </li>

          <li className="hidden lg:block">
            <Link
              to="/blog"
              className="no-underline font-['Montserrat'] text-[#737373] font-[550] lg:text-[14px] leading-[45px] text-center hover:text-[#23A6F0]"
            >
              Blog
            </Link>
          </li>

          <li className="lg:hidden">
            <Link
              to="/pricing"
              className="no-underline font-['Montserrat'] text-[#737373] font-[550] text-[30px] leading-[45px] text-center hover:text-[#23A6F0]"
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

          <li className="hidden lg:block">
            <Link
              to="/pages"
              className="no-underline font-['Montserrat'] text-[#737373] font-[550] lg:text-[14px] leading-[45px] text-center hover:text-[#23A6F0]"
            >
              Pages
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
