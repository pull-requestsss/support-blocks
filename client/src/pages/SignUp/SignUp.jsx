import React from "react";
import "./SignUp.css";

const SignUp = () => {
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

            <form id="contact-form" action="assets/contact.php" method="post">
              <div className="row">
                <div className="col-md-6">
                  <div className="contact-form mt-45">
                    <label>
                      Your ETH Address{" "}
                      <span style={{ color: "#f14836" }}>*</span>
                    </label>
                    <input type="text" name="name" placeholder="0x883adf..." />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="contact-form mt-45">
                    <label>
                      Username <span style={{ color: "#f14836" }}>*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="cryptea.club/username"
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
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="contact-form mt-45">
                    <label>Featured URL</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="linkedin.com/..."
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="contact-form mt-45">
                    <label>Your description</label>
                    <textarea
                      name="message"
                      placeholder="your short intro..."
                    ></textarea>
                  </div>
                </div>
                <p className="form-message"></p>
                <div className="col-md-12">
                  <div className="contact-form mt-45">
                    <button type="submit" className="main-btn">
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
