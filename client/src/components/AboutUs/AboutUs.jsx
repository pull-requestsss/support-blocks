import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <section id="service" class="service-area pt-105">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 col-md-8">
            <div
              class="section-title wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay="0.2s"
            >
              <h6 class="sub-title">Why Us</h6>
              <h4 class="title">
                The reasons to choose us <span>as your business partner</span>
              </h4>
            </div>
          </div>
        </div>
        <div
          class="service-wrapper mt-60 wow fadeInUp"
          data-wow-duration="1s"
          data-wow-delay="0.6s"
        >
          <div class="row no-gutters justify-content-center">
            <div class="col-lg-4 col-md-7">
              <div class="single-service d-flex">
                <div class="service-icon">
                  <img src="assets/images/service-1.png" alt="Icon" />
                </div>
                <div class="service-content media-body">
                  <h4 class="service-title">Highly Experienced</h4>
                  <p class="text">
                    Lorem Ipsum is simply dummy tex of the printing and
                    typesetting industry. Lorem Ipsum .
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-7">
              <div class="single-service service-border d-flex">
                <div class="service-icon">
                  <img src="assets/images/service-2.png" alt="Icon" />
                </div>
                <div class="service-content media-body">
                  <h4 class="service-title">Bunch of Services</h4>
                  <p class="text">
                    Lorem Ipsum is simply dummy tex of the printing and
                    typesetting industry. Lorem Ipsum .
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-7">
              <div class="single-service d-flex">
                <div class="service-icon">
                  <img src="assets/images/service-3.png" alt="Icon" />
                </div>
                <div class="service-content media-body">
                  <h4 class="service-title">Quality Support</h4>
                  <p class="text">
                    Lorem Ipsum is simply dummy tex of the printing and
                    typesetting industry. Lorem Ipsum .
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12">
              <div class="service-btn text-center pt-25 pb-15">
                <button
                  class="main-btn main-btn-2"
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
