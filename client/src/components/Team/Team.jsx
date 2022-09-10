import React from "react";
import "./Team.css";

const Team = () => {
  return (
    <section id="blog" class="blog-area pt-115">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-4">
            <div
              class="section-title text-center pb-20 wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay="0.3s"
            >
              <h4 class="title">
                Our <span>Team</span>
              </h4>
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-lg-4 col-md-6 col-sm-8">
            <div
              class="single-blog mt-30 wow fadeInUpBig"
              data-wow-duration="1s"
              data-wow-delay="0.7s"
            >
              <div class="blog-image">
                <a href="blog-details.html">
                  <img src="assets/images/news-2.jpg" alt="news" />
                </a>
              </div>
              <div class="blog-content">
                <div class="blog-author d-flex align-items-center">
                  <div class="author-content media-body">
                    <p class="text">Elon Musk</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 col-sm-8">
            <div
              class="single-blog mt-30 wow fadeInUpBig"
              data-wow-duration="1s"
              data-wow-delay="0.7s"
            >
              <div class="blog-image">
                <a href="blog-details.html">
                  <img src="assets/images/news-2.jpg" alt="news" />
                </a>
              </div>
              <div class="blog-content">
                <div class="blog-author d-flex align-items-center">
                  <div class="author-content media-body">
                    <p class="text">Elon Musk</p>
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
