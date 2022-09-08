import React from "react";
import Features from "../../components/Features/Features";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import Team from "../../components/Team/Team";

const LandingPage = () => {
  return (
    <>
      <Header />
      <Hero />
      <Features />
      <Team />
      <Footer />
    </>
  );
};

export default LandingPage;
