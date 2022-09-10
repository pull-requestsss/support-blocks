import React from "react";
import AboutUs from "../../components/AboutUs/AboutUs";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Team from "../../components/Team/Team";

const LandingPage = () => {
  return (
    <>
      <Header />
      <AboutUs />
      <Team />
      <Footer />
    </>
  );
};

export default LandingPage;
