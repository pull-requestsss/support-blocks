import React from "react";
import "./DonationPage.css";
import logo from "../../assets/logo.png";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const DonationPage = () => {
  return (
    <div className="main-content">
      <div className="container mt-15">
        <div className="row">
          <div className="col-xl-5 order-l-1 mb-5 mb-xl-0">
            <div className="card card-profile shadow">
              <div className="row justify-content-center dp-wrapper">
                <div className="col-lg-3 order-lg-2">
                  <div className="card-profile-image">
                    <a href="#">
                      <img
                        src="https://demos.creative-tim.com/argon-dashboard/assets-old/img/theme/team-4.jpg"
                        className="rounded-circle"
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div className="card-body pt-0 pt-md-4">
                <div className="text-center">
                  <h3>Jessica Jones</h3>
                  <div className="h5 font-weight-300">
                    buymeacryptea.club/
                    <i className="ni location_pin mr-2">username</i>
                  </div>
                  <div className="h5 mt-4">Industry</div>
                  <hr className="my-4" />
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quos, natus enim autem tempore placeat, provident obcaecati,
                    excepturi dolorem perspiciatis maiores molestias ipsum
                    velit. Et, delectus odit veritatis ipsa sit illum dolorem
                    quaerat quia sunt eveniet!
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-7 order-l-2">
            <div className="main-card card shadow">
              <div className="donations-wrapper">
                <h3>Buy USERNAME a Tea</h3>
              </div>
              <div className="counter-wrapper">
                <img src={logo} alt="" className="counter-img" />
                <span className="mult">x</span>
                <span className="donation-preset">1</span>
                <span className="donation-preset">1</span>
                <span className="donation-preset">1</span>
                <input type="number" value={"1"} />
              </div>
              <div className="token-wrapper">
                <img
                  src={logo}
                  alt=""
                  style={{ width: "4rem", margin: "1rem 3rem" }}
                />
                <DropdownButton
                  key={1}
                  id={`dropdown-button-drop-${1}`}
                  size="lg"
                  title="Select a token to pay"
                  variant="secondary"
                >
                  <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                  <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                  <Dropdown.Item eventKey="3">
                    Something else here
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                </DropdownButton>
              </div>

              <div className="tea-amount">1 tea = $ 5</div>
              <div className="tea-amount1">$ 5 ≈ 0.03 ETH</div>

              <button className="main-btn" style={{ margin: "0.1rem 1rem" }}>
                Support $5
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;
