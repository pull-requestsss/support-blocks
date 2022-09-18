import React from "react";
import { useState } from "react";
import "./SignUp.css";
import { useSelector, useDispatch } from "react-redux";
import { verify, users, verifyJWT } from "../../api/web2";
import { useEffect } from "react";
import { connectWallet, _getSignature } from "../../api/web3";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
const SignUp = () => {
  const { provider, signer, account } = useSelector(
    (state) => state.web3Config
  );
  const [JWT, setJWT] = useState(localStorage.getItem("JWT"));
  const { landingSlug } = useSelector((state) => state.userConfig);
  const [data, setData] = useState({
    slug: landingSlug,
    intro: "",
    industry: "",
    featuredUrl: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

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
      _isNewUser == true || _isNewUser == "true"
        ? navigate("/setup")
        : navigate("/dashboard");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      window.alert(error);
      navigate("/");
    }
  };

  useEffect(() => {
    launchApp();
  }, []);

  const isReady = () => {
    return isLoading;
  };

  const submitDetails = async (e) => {
    e.preventDefault();
    try {
      const res = await users(data, JWT);
      localStorage.setItem("isNewUser", false);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      window.alert(error.response.data.error);
    }
  };

  if (isReady()) return <Loading />;

  return (
    <div className="container signup-wrapper">
      <div className="row">
        <div className="col-lg-12">
          <div
            className="contact-wrapper-form pt-115  wow fadeInUpBig"
            data-wow-duration="1s"
            data-wow-delay="0.5s"
          >
            <h4 className="contact-title signup-title">
              First Time{" "}
              <span style={{ color: "#f14836", fontWeight: "800" }}>?</span>
            </h4>

            <h5
              style={{
                fontWeight: "bold",
                color: "gray",
                fontSize: "20px",
                textAlign: "center",
              }}
            >
              Lets get you <span style={{ color: "#f14836" }}>setup !</span>
            </h5>

            <form id="contact-form">
              <div className="row">
                <div className="col-md-6">
                  <div className="contact-form mt-45">
                    <label>
                      Your ETH Address{" "}
                      <span style={{ color: "#f14836" }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="0x883adf..."
                      value={account}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="contact-form mt-45">
                    <label>
                      Username <span style={{ color: "#f14836" }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="email"
                      placeholder="cryptea.club/username"
                      value={data.slug}
                      onChange={(e) =>
                        setData({ ...data, slug: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="contact-form mt-45">
                    <label>Your Industry</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Trader, Gamer, Developer..."
                      value={data.industry}
                      onChange={(e) =>
                        setData({ ...data, industry: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="contact-form mt-45">
                    <label>Featured URL</label>
                    <input
                      type="text"
                      name="email"
                      placeholder="linkedin.com/..."
                      value={data.featuredUrl}
                      onChange={(e) =>
                        setData({ ...data, featuredUrl: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="contact-form mt-45">
                    <label>Your description</label>
                    <textarea
                      name="message"
                      placeholder="your short intro..."
                      value={data.intro}
                      onChange={(e) =>
                        setData({ ...data, intro: e.target.value })
                      }
                    ></textarea>
                  </div>
                </div>
                <p className="form-message"></p>
                <div className="col-md-12">
                  <div className="contact-form mt-45">
                    <button
                      type="submit"
                      className="main-btn"
                      onClick={submitDetails}
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
