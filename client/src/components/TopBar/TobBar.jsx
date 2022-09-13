import React from "react";
import logo from "../../assets/logo.png";
import { connectWallet, getSignature } from "../../api/web3";
import { verify } from "../../api/auth";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { setJWT } from "../../redux/userDataSlice";
import { useNavigate } from "react-router-dom";

const TobBar = () => {
  const { provider, signer, account } = useSelector(
    (state) => state.web3Config
  );
  const { JWT } = useSelector((state) => state.userConfig);
  const [_provider, setProvider] = useState(undefined);
  const [_signer, setSigner] = useState(undefined);
  const [_account, setAccount] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const init = async () => {
    const { _provider, _signer, _account } = await connectWallet(
      provider,
      signer,
      account,
      dispatch
    );
    setProvider(_provider);
    setSigner(_signer);
    setAccount(_account);
    return { _provider, _signer, _account };
  };

  const getAccount = (__account) => {
    return __account.substring(0, 10) + "...";
  };

  const _getSignature = async () => {
    const timeNow = Math.round(Date.now() / 1000);
    if (provider == undefined || signer == undefined) {
      const { _signer, _account } = await connectWallet(
        provider,
        signer,
        account,
        dispatch
      );
      const message = {
        message: "Welcome to buy me a CrypTea",
        createdAt: timeNow,
        owner: _account,
      };
      const sig = await getSignature(_signer, message);
      return { sig, message };
    } else {
      const message = {
        message: "Welcome to buy me a CrypTea",
        createdAt: timeNow,
        owner: _account,
      };
      const sig = await getSignature(_signer, message);
      return { sig, message };
    }
  };

  const launchApp = async () => {
    if (JWT == undefined) {
      try {
        const { sig, message } = await _getSignature();
        const payload = { ...message, signature: sig };
        const res = await verify(payload);
        console.log(res);

        dispatch(setJWT({ JWT: res.accessToken }));

        if (res.isNewUser) {
          navigate("/setup");
        } else {
          navigate("/dashboard");
        }
      } catch (error) {
        console.log(error);
        window.alert(error);
      }
    } else {
      navigate("/setup");
    }
  };

  return (
    <div className="navbar-area headroom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <nav className="navbar navbar-expand-lg">
              <a className="navbar-brand" href="index.html">
                <img src={logo} alt="Logo" style={{ width: "4rem" }} />
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
              <div
                className="navbar-btn d-none d-sm-inline-block"
                style={{ marginRight: "2rem" }}
              >
                <button className="main-btn" onClick={launchApp}>
                  Launch App
                </button>
              </div>
              <div className="navbar-btn d-none d-sm-inline-block">
                <button className="main-btn" onClick={init}>
                  {account == undefined
                    ? "Connect Wallet"
                    : getAccount(account)}
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
