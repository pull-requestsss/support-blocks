import React from "react";
import "./Header.css";
import Img from "../../assets/Hot-beverage.gif";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { _getSignature, connectWallet } from "../../api/web3";
import { verify, verifyJWT } from "../../api/web2";
import { setLandingSlug } from "../../redux/userDataSlice";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const { provider, signer, account } = useSelector(
    (state) => state.web3Config
  );
  const [JWT, setJWT] = useState(localStorage.getItem("JWT"));

  const [userSlug, setUserSlug] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const iniSignup = async () => {
    var _jwt = JWT;
    var _isNewUser = localStorage.getItem("isNewUser");
    var _signer = signer;
    var _account = account;
    try {
      if (provider == undefined || signer == undefined) {
        const res = await connectWallet(provider, signer, account, dispatch);
        _signer = res._signer;
        _account = res._account;
      }
      if (JWT == undefined || !verifyJWT(_jwt, _account)) {
        const { sig, message } = await _getSignature(_signer, _account);
        const payload = { ...message, signature: sig };
        const res = await verify(payload);
        localStorage.setItem("JWT", res.accessToken);
        setJWT(res.accessToken);
        _jwt = res.accessToken;
        dispatch(setLandingSlug({ landingSlug: userSlug }));
        _isNewUser = res.isNewUser;
      }
      localStorage.setItem("isNewUser", _isNewUser);
      _isNewUser ? navigate("/setup") : navigate("/dashboard");
    } catch (error) {
      console.log(error);
      window.alert(error);
    }
  };

  return (
    <header className="header-area">
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
                  <input
                    type="text"
                    placeholder="username"
                    value={userSlug}
                    onChange={(e) => setUserSlug(e.target.value)}
                  />
                  <button className="main-btn" onClick={iniSignup}>
                    Sign Up
                  </button>
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
