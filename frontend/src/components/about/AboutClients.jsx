import React from "react";

const desktopImg = new URL("../../assets/clients.png", import.meta.url).href;
const mobileImg = new URL("../../assets/client-mobile.png", import.meta.url)
  .href;

const AboutClients = () => (
  <section className="bg-[#FAFAFA] font-['Montserrat']">
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-col items-center gap-[10px] w-full max-w-[864px] px-4 lg:px-0 text-center">
        <h2 className="font-bold text-[40px] leading-[50px] tracking-[0.2px] text-[#252B42]">
          Big Companies Are Here
        </h2>
        <p className="font-normal text-[14px] leading-5 tracking-[0.2px] text-[#737373] w-full lg:w-[547px]">
          Problems trying to resolve the conflict between the two major realms
          of Classical physics: Newtonian mechanics
        </p>
      </div>
      <div className="mt-6 w-full flex justify-center">
        <img
          src={desktopImg}
          alt="Clients"
          className="hidden lg:block w-full max-w-[1054px] object-contain px-4 lg:px-0"
        />
        <img
          src={mobileImg}
          alt="Clients Mobile"
          className="lg:hidden w-full max-w-[300px] object-contain"
        />
      </div>
    </div>
  </section>
);

export default AboutClients;
