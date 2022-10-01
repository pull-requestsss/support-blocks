import React from "react";
import logo from "../../assets/logo.svg";
import { connectWallet, _getSignature } from "../../api/web3";
import { verify, verifyJWT } from "../../api/web2";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const TobBar = ({ donation, dash }) => {
  const { provider, signer, account } = useSelector(
    (state) => state.web3Config
  );
  const [JWT, setJWT] = useState(localStorage.getItem("JWT"));
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

  const launchApp = async () => {
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
    <div className="navbar-area headroom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <nav className="navbar navbar-expand-lg">
              <Link to={"/"} className="navbar-brand">
                <img src={logo} alt="Logo" style={{ width: "4rem" }} />
                <span
                  style={{
                    fontWeight: "400",
                    marginLeft: "1.5rem",
                    fontSize: "1.5rem",
                  }}
                >
                  Support{" "}
                  <span style={{ color: "#f14836", fontWeight: "600" }}>
                    Blocks
                  </span>
                </span>
              </Link>

              <div
                className="collapse navbar-collapse sub-menu-bar"
                id="navbarSupportedContent"
              >
                <ul id="nav" className="navbar-nav m-auto">
                  <li className="nav-item"></li>
                  <li className="nav-item"></li>
                  <li className="nav-item"></li>
                  <li className="nav-item"></li>
                  <li className="nav-item"></li>
                </ul>
              </div>
              {donation ? (
                <></>
              ) : (
                <>
                  <div
                    className="navbar-btn d-none d-sm-inline-block"
                    style={{ marginRight: "2rem" }}
                  >
                    {dash ? (
                      <></>
                    ) : (
                      <button className="main-btn" onClick={launchApp}>
                        Launch App
                      </button>
                    )}
                  </div>
                  <div className="navbar-btn d-none d-sm-inline-block">
                    <button className="main-btn" onClick={init}>
                      {account == undefined
                        ? "Connect Wallet"
                        : getAccount(account)}
                    </button>
                  </div>
                </>
              )}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TobBar;
