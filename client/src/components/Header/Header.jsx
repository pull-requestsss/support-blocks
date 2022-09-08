import React from "react";
import "./Header.css";
import logo from "../../images/teaLogo.png";

const Header = () => {
  return (
    <header class="ud-header">
      <div class="container">
        <div class="row header-flex2">
          <div class="col-lg-10 header-wrapper">
            <nav class="navbar navbar-expand-lg header-flex1">
              <a class="navbar-brand" href="index.html">
                <img src={logo} alt="Logo" className="header-logo"/>
                <span className="header-text">Buy Me a CrypTea</span>
              </a>

              <div class="navbar-btn d-none d-sm-inline-block">
                <a class="ud-main-btn ud-white-btn" href="javascript:void(0)">
                  Sign Up
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
