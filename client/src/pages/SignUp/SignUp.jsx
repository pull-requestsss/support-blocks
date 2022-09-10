import React from "react";
import "./SignUp.css";

const SignUp = () => {
  return (
    <div className="container signup-wrapper">
      <div class="row">
        <div class="col-lg-12">
          <div
            class="contact-wrapper-form pt-115  wow fadeInUpBig"
            data-wow-duration="1s"
            data-wow-delay="0.5s"
          >
            <h4 class="contact-title signup-title">
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
              <div class="row">
                <div class="col-md-6">
                  <div class="contact-form mt-45">
                    <label>
                      Your ETH Address{" "}
                      <span style={{ color: "#f14836" }}>*</span>
                    </label>
                    <input type="text" name="name" placeholder="0x883adf..." />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="contact-form mt-45">
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
                <div class="col-md-6">
                  <div class="contact-form mt-45">
                    <label>Your Industry</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Trader, Gamer, Developer..."
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="contact-form mt-45">
                    <label>Featured URL</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="linkedin.com/..."
                    />
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="contact-form mt-45">
                    <label>Your description</label>
                    <textarea
                      name="message"
                      placeholder="your short intro..."
                    ></textarea>
                  </div>
                </div>
                <p class="form-message"></p>
                <div class="col-md-12">
                  <div class="contact-form mt-45">
                    <button type="submit" class="main-btn">
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
