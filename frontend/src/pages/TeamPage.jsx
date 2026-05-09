import React from "react";
import TeamGrid from "../components/team/TeamGrid";

const TeamPage = () => (
  <div className="bg-[#FAFAFA] font-['Montserrat'] min-h-screen">
    <div className="w-full max-w-[1050px] mx-auto px-4 lg:px-0 pt-[112px] pb-[112px] flex flex-col items-center gap-[112px]">
      <div className="flex flex-col items-center gap-[10px] w-full lg:w-[607px] text-center">
        <h1 className="font-bold text-[40px] leading-[50px] tracking-[0.2px] text-[#252B42]">
          Meet Our Team
        </h1>
        <p className="font-normal text-[14px] leading-5 tracking-[0.2px] text-[#737373] w-full lg:w-[469px]">
          Problems trying to resolve the conflict between the two major realms
          of Classical physics: Newtonian mechanics
        </p>
      </div>

      <TeamGrid />
    </div>
  </div>
);

export default TeamPage;
