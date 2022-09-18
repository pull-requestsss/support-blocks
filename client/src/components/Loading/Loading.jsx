import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading-wrapper">
      <div className="spinner-border text-secondary" role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  );
};

export default Loading;
