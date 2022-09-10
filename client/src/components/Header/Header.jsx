import React from "react";
import "./Header.css";
import Img from "../../assets/Hot-beverage.gif";
import logo from "../../assets/logo.png";

const Header = () => {
  return (
    <header className="header-area">
      <div className="navbar-area headroom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <nav className="navbar navbar-expand-lg">
                <a className="navbar-brand" href="index.html">
                  <img src={logo} alt="Logo" style={{ width: "5.5rem" }} />
                  <span
                    style={{
                      fontWeight: "400",
                      marginLeft: "1.5rem",
                      fontSize: "1.5rem",
                    }}
                  >
                    Buy me a{" "}
                    <span style={{ color: "#f14836", fontWeight: "600" }}>
                      CrypTea
                    </span>
                  </span>
                </a>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="toggler-icon"></span>
                  <span className="toggler-icon"></span>
                  <span className="toggler-icon"></span>
                </button>

                <div
                  className="collapse navbar-collapse sub-menu-bar"
                  id="navbarSupportedContent"
                >
                  <ul id="nav" className="navbar-nav m-auto">
                    <li className="nav-item">
                      {/* <a href="#about">About </a> */}
                    </li>
                    <li className="nav-item">
                      {/* <a href="#services">Services</a> */}
                    </li>
                    <li className="nav-item">
                      {/* <a href="#portfolio">Portfolio</a> */}
                    </li>
                    <li className="nav-item">
                      {/* <a href="#blog">Blog</a> */}
                    </li>
                    <li className="nav-item">
                      {/* <a href="#contact">Contact</a> */}
                    </li>
                  </ul>
                </div>

                <div className="navbar-btn d-none d-sm-inline-block">
                  <button className="main-btn">Connect Wallet</button>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div
        id="home"
        className="header-hero bg_cover d-lg-flex align-items-center"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <div className="header-hero-content">
                <h1
                  className="hero-title wow fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay="0.2s"
                >
                  <span>Supporting</span> your <b>creative ideas</b> was never
                  this easy.
                </h1>
                <p
                  className="text wow fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay="0.5s"
                  style={{ textAlign: "center" }}
                >
                  Fueled by{" "}
                  <span
                    style={{
                      color: "#f14836",
                      fontWeight: "bold",
                      fontSize: "1.5rem",
                    }}
                  >
                    Ethereum
                  </span>
                  <img
                    src="https://cryptologos.cc/logos/versions/ethereum-eth-logo-animated.gif?v=023"
                    alt="ETH"
                    style={{
                      width: "6rem",
                      borderRadius: "50%",
                      marginLeft: "1rem",
                    }}
                  />
                </p>
                <div
                  className="header-singup wow fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay="0.8s"
                >
                  <span>buymeacryptea.club/</span>
                  <input type="text" placeholder="username" />
                  <button className="main-btn">Sign Up</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="header-hero-image d-flex align-items-center wow fadeInRightBig"
          data-wow-duration="1s"
          data-wow-delay="1.1s"
        >
          <div className="image">
            <img src={Img} alt="Hero Image" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
