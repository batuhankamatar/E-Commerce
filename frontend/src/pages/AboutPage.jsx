import React from "react";
import AboutHero from "../components/about/AboutHero";
import AboutProblem from "../components/about/AboutProblem";
import AboutStats from "../components/about/AboutStats";
import AboutVideo from "../components/about/AboutVideo";
import TeamPage from "../pages/TeamPage";

const AboutPage = () => (
  <div className="flex flex-col bg-white">
    <AboutHero />
    <AboutProblem />
    <AboutStats />
    <AboutVideo />
    <TeamPage />
  </div>
);

export default AboutPage;
