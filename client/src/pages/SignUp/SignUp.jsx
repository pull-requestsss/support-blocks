import React from "react";
import { useState } from "react";
import "./SignUp.css";
import { useSelector, useDispatch } from "react-redux";
import { verify } from "../../api/auth";
import { useEffect } from "react";
import { connectWallet, getSignature } from "../../api/web3";
import { useNavigate } from "react-router-dom";
import { setJWT } from "../../redux/userDataSlice";
import { users } from "../../api/setup";

const SignUp = () => {
  const { provider, signer, account } = useSelector(
    (state) => state.web3Config
  );
  const { landingSlug, JWT } = useSelector((state) => state.userConfig);
  const [data, setData] = useState({
    slug: landingSlug,
    intro: "",
    industry: "",
    featuredUrl: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        owner: account,
      };
      const sig = await getSignature(signer, message);
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
        navigate("/");
      }
    } else {
      navigate("/setup");
    }
  };

  useEffect(() => {
    if (provider == undefined) {
      launchApp();
    }
  }, []);

  const isReady = () => {
    return typeof JWT != "undefined";
  };

  const submitDetails = async (e) => {
    e.preventDefault();
    try {
      const res = await users(data, JWT);
      console.log("res", res);
    } catch (error) {
      console.log(error);
      window.alert(error.response.data.error);
      // window.location.reload();
    }
  };

  if (!isReady()) return <></>;

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
