import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TodayMenuPreview from "../components/TodayMenuPreview";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <TodayMenuPreview />
    </>
  );
};

export default Home;
