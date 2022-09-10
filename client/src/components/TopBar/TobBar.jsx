import React from "react";
import logo from "../../assets/logo.png";
import { connectWallet } from "../../api/web3";

const TobBar = () => {
  return (
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
                  <li className="nav-item">{/* <a href="#blog">Blog</a> */}</li>
                  <li className="nav-item">
                    {/* <a href="#contact">Contact</a> */}
                  </li>
                </ul>
              </div>

              <div className="navbar-btn d-none d-sm-inline-block">
                <button className="main-btn" onClick={connectWallet}>
                  Connect Wallet
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TobBar;
