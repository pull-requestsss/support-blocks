import React from "react";
import { useState } from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import "./DashboardPage.css";

const DashboardPage = () => {
  const [selector, setSelector] = useState(1);

  return (
    <div className="dashboard-outer-wrapper">
      <div className="container">
        <div className="dash-selector">
          <button
            className={`selector-btn ${selector == 1 ? "selector-active" : ""}`}
            onClick={() => setSelector(1)}
          >
            Dashboard
          </button>
          <button
            className={`selector-btn ${selector == 0 ? "selector-active" : ""}`}
            onClick={() => setSelector(0)}
          >
            Profile
          </button>
        </div>
        {selector == 0 ? (
          <div className="profile">Profile</div>
        ) : (
          <div className="dash">
            <Dashboard />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
