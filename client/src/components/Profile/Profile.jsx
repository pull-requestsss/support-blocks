import React from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
const Profile = ({ userData }) => {
  const navigate = useNavigate();

  return (
    <div className="container mt-15">
      <div className="row">
        <div className="col-xl-5 order-l-1 mb-5 mb-xl-0">
          <div className="card card-profile shadow">
            <div className="row justify-content-center dp-wrapper">
              <div className="col-lg-3 order-lg-2">
                <div className="card-profile-image">
                  <a href="#">
                    <img
                      src="https://disaster-analytics.com/wp-content/uploads/2014/05/blank-profile-picture-973460_640.png"
                      className="rounded-circle"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="card-body pt-0 pt-md-4">
              <div className="text-center">
                <h4>{"You"}</h4>
                <div className="h5 font-weight-300">
                  supportblocks.club/
                  <i className="ni location_pin mr-2">{userData.slug}</i>
                </div>
                <div className="h5 mt-4">{userData.industry}</div>
                <hr className="my-4" />
                <p>{userData.intro}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-7 order-l-2">
          <div className="main-card card shadow">
            <div className="donations-wrapper">
              <h3>How to use...</h3>
            </div>
            <div className="counter-wrapper-2">
              <div className="step">1</div>
              <span className="step-text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                repellat recusandae dignissimos harum.
              </span>
            </div>
            <div className="counter-wrapper-2">
              <div className="step">2</div>
              <span className="step-text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                repellat recusandae dignissimos harum.
              </span>
            </div>
            <div className="counter-wrapper-2">
              <div className="step">3</div>
              <span className="step-text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                repellat recusandae dignissimos harum.
              </span>
            </div>
            <div className="counter-wrapper-2">
              <div className="step">4</div>
              <span className="step-text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                repellat recusandae dignissimos harum.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
