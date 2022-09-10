import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <section id="service" className="service-area pt-105">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-8">
            <div
              className="section-title wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay="0.2s"
            >
              <h6 className="sub-title">Why Us</h6>
              <h4 className="title">
                The reasons to choose us <span>as your business partner</span>
              </h4>
            </div>
          </div>
        </div>
        <div
          className="service-wrapper mt-60 wow fadeInUp"
          data-wow-duration="1s"
          data-wow-delay="0.6s"
        >
          <div className="row no-gutters justify-content-center">
            <div className="col-lg-4 col-md-7">
              <div className="single-service d-flex">
                <div className="service-icon">
                  <img src="assets/images/service-1.png" alt="Icon" />
                </div>
                <div className="service-content media-body">
                  <h4 className="service-title">Highly Experienced</h4>
                  <p className="text">
                    Lorem Ipsum is simply dummy tex of the printing and
                    typesetting industry. Lorem Ipsum .
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-7">
              <div className="single-service service-border d-flex">
                <div className="service-icon">
                  <img src="assets/images/service-2.png" alt="Icon" />
                </div>
                <div className="service-content media-body">
                  <h4 className="service-title">Bunch of Services</h4>
                  <p className="text">
                    Lorem Ipsum is simply dummy tex of the printing and
                    typesetting industry. Lorem Ipsum .
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-7">
              <div className="single-service d-flex">
                <div className="service-icon">
                  <img src="assets/images/service-3.png" alt="Icon" />
                </div>
                <div className="service-content media-body">
                  <h4 className="service-title">Quality Support</h4>
                  <p className="text">
                    Lorem Ipsum is simply dummy tex of the printing and
                    typesetting industry. Lorem Ipsum .
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="service-btn text-center pt-25 pb-15">
                <button
                  className="main-btn main-btn-2"
                  style={{ marginBottom: "2rem" }}
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
