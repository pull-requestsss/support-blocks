import React from "react";
import "./Team.css";

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
                <a href="blog-details.html">
                  <img src="assets/images/news-2.jpg" alt="news" />
                </a>
              </div>
              <div className="blog-content">
                <div className="blog-author d-flex align-items-center">
                  <div className="author-content media-body">
                    <p className="text">Elon Musk</p>
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
                <a href="blog-details.html">
                  <img src="assets/images/news-2.jpg" alt="news" />
                </a>
              </div>
              <div className="blog-content">
                <div className="blog-author d-flex align-items-center">
                  <div className="author-content media-body">
                    <p className="text">Elon Musk</p>
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
