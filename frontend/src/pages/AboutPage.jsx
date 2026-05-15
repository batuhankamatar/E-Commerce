import React from "react";
import AboutHero from "../components/about/AboutHero";
import AboutProblem from "../components/about/AboutProblem";
import AboutStats from "../components/about/AboutStats";
import AboutVideo from "../components/about/AboutVideo";
import TeamPage from "../pages/TeamPage";
import AboutClients from "../components/about/AboutClients";
import AboutCTA from "../components/about/AboutCTA";

const AboutPage = () => (
  <div className="flex flex-col bg-white">
    <AboutHero />
    <AboutProblem />
    <AboutStats />
    <AboutVideo />
    <TeamPage />
    <AboutClients />
    <AboutCTA />
  </div>
);

export default AboutPage;
