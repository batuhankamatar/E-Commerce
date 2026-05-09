import React from "react";
import ContactHero from "../components/contact/ContactHero";
import ContactInfo from "../components/contact/ContactInfo";

const filterUrl = new URL("../assets/filter.png", import.meta.url).href;
const bgUrl = new URL("../assets/categories/clothing.jpg", import.meta.url)
  .href;

const ContactPage = () => (
  <div className="relative w-full min-h-screen overflow-hidden font-['Montserrat']">
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgUrl})` }}
    />
    <div
      className="absolute inset-0 hidden lg:block"
      style={{
        backgroundImage: `url(${filterUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
    <div className="absolute inset-0 bg-[#0D0D0D]/60" />
    <div className="relative z-10 w-full max-w-[1050px] mx-auto px-4 lg:px-0 pt-[112px] pb-[112px] flex flex-col gap-[96px]">
      <div className="flex flex-col lg:flex-row items-start gap-[30px]">
        <div className="w-full lg:w-[497px] flex-shrink-0">
          <ContactHero />
        </div>
        <div className="w-full lg:flex-1">
          <ContactInfo />
        </div>
      </div>
    </div>
  </div>
);

export default ContactPage;
