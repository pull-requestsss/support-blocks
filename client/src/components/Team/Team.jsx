import React from "react";
import "./Team.css";
import dp1 from "../../assets/Team1.png";
import dp2 from "../../assets/Team2.jpeg";

const Team = () => {
  return (
    <section id="blog" className="blog-area pt-115">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-4">
            <div
              className="section-title text-center pb-20 wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay="0.3s"
            >
              <h4 className="title">
                Our <span>Team</span>
              </h4>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-6 col-sm-8">
            <div
              className="single-blog mt-30 wow fadeInUpBig"
              data-wow-duration="1s"
              data-wow-delay="0.7s"
            >
              <div className="blog-image">
                <img src={dp1} alt="news" />
              </div>
              <div className="blog-content">
                <div className="blog-author d-flex align-items-center">
                  <div className="author-content media-body">
                    <p className="text">Priyam Anand</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-8">
            <div
              className="single-blog mt-30 wow fadeInUpBig"
              data-wow-duration="1s"
              data-wow-delay="0.7s"
            >
              <div className="blog-image">
                <img src={dp2} alt="news" />
              </div>
              <div className="blog-content">
                <div className="blog-author d-flex align-items-center">
                  <div className="author-content media-body">
                    <p className="text">Raghavendra Khare</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
