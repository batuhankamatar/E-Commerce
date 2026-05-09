import React from "react";
import TeamMemberCard from "./TeamMemberCard";

const TEAM_MEMBERS = [
  { name: "Yalçın", title: "Project Manager", image: "yalcin.png" },
  { name: "Batuhan Kamatar", title: "Full Stack Developer", image: "bk.jpeg" },
  { name: "Jacob Jones", title: "Mitsubishi", image: "jacob.png" },
  { name: "Marvin McKinney", title: "Mitsubishi", image: "marvin.png" },
  { name: "Ronald Richards", title: "Mitsubishi", image: "ronald.png" },
  { name: "Kathryn Murphy", title: "Mitsubishi", image: "kathryn.png" },
  { name: "Floyd Miles", title: "Mitsubishi", image: "floyd.png" },
  { name: "Dianne Russell", title: "Mitsubishi", image: "dianne.png" },
  { name: "Eleanor Pena", title: "Mitsubishi", image: "eleanor.png" },
  { name: "Jenny Wilson", title: "Mitsubishi", image: "jenny.png" },
  { name: "Devon Lane", title: "Mitsubishi", image: "devon.png" },
];

const TeamGrid = () => {
  return (
    <div className="flex flex-col gap-8 pl-[50px] lg:pl-0 lg:grid lg:grid-cols-3 lg:gap-y-6 lg:gap-x-[30px] w-full">
      {TEAM_MEMBERS.map((member) => (
        <div key={member.name}>
          <TeamMemberCard {...member} />
        </div>
      ))}
    </div>
  );
};

export default TeamGrid;
