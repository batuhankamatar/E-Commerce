import React from "react";

const TeamMemberCard = ({ name, title, image }) => {
  const getImageUrl = (img) => {
    if (!img) return null;
    return new URL(`/src/assets/team/${img}`, import.meta.url).href;
  };

  return (
    <div className="flex items-center gap-4">
      <img
        src={getImageUrl(image)}
        alt={name}
        className="w-[70px] h-[76px] rounded-full object-cover flex-shrink-0"
      />
      <div className="flex flex-col gap-[5px]">
        <span className="font-normal text-[20px] leading-[30px] tracking-[0.2px] text-[#252B42]">
          {name}
        </span>
        <span className="font-normal text-[14px] leading-5 tracking-[0.2px] text-[#737373]">
          {title}
        </span>
      </div>
    </div>
  );
};

export default TeamMemberCard;
