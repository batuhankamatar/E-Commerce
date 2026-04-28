import React from "react";

const Clients = () => {
  const desktopImg = new URL("../../assets/clients.png", import.meta.url).href;
  const mobileImg = new URL("../../assets/client-mobile.png", import.meta.url)
    .href;

  return (
    <section className="w-full bg-[#FAFAFA] font-['Montserrat']">
      <div className="hidden lg:flex items-center justify-center w-[1440px] h-[175px] mx-auto">
        <div className="w-[1054px] h-[175px] pt-[50px] pb-[50px] flex items-center justify-center">
          <img
            src={desktopImg}
            alt="Clients"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      <div className="flex lg:hidden flex-col items-center justify-center w-[419px] h-[1173px] mx-auto">
        <div className="relative w-[414px] h-[952px] mt-[110px] ml-[3px]">
          <img
            src={mobileImg}
            alt="Clients Mobile"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Clients;
